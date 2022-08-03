

using Castle.Core.Internal;
using DocumentFormat.OpenXml.Office.CustomUI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.DetailInformation;
using PTT_GC_API.Models.EMOCs;
using PTT_GC_API.Models.IF;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace PTT_GC_API.Data.Repository
{
    public class EmocRepository : EmocInterface
    {
        private readonly DataContext _context;
        private readonly IHttpClientFactory _clientFactory;
        private readonly IOptions<UrlEMOC> _urlEMOC;

        public EmocRepository(DataContext context, IHttpClientFactory clientFactory,IOptions<UrlEMOC> urlEMOC)
        {
            _context = context;
            _clientFactory = clientFactory;
            _urlEMOC = urlEMOC;
        }

        public async Task<CreateMoCResult> CreateEmoc(int id)
        {
            try
            {


                var serializer = new XmlSerializer(typeof(CreateMoC));
                var emptyNs = new XmlSerializerNamespaces();
                emptyNs.Add("", "");
                var stringBuilder = new StringBuilder();
                string urlEmoc = "";
                string xapikey = "";
                string startSoapEnv = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns=\"http://tempuri.org/\"><soapenv:Header/><soapenv:Body>";
                string endSoapEnv = "</soapenv:Body></soapenv:Envelope>";

                if (String.IsNullOrEmpty(_urlEMOC.Value.Url) || String.IsNullOrEmpty(_urlEMOC.Value.ApiKey))
                    throw new Exception("EMOC Setting Not Found.");

                urlEmoc = _urlEMOC.Value.Url;
                xapikey = _urlEMOC.Value.ApiKey;

                var initaitive = await _context.Initiatives.Where(i => i.Id == id).FirstOrDefaultAsync();
                //var detailInfo = await _context.DetailInformations.Where(i => i.InitiativeId == id).FirstOrDefaultAsync();
                var mainPlant = await _context.MainPlant.Where(i => i.InitiativeId == initaitive.Id && string.IsNullOrEmpty(i.EmocNo) == true).ToListAsync();
                var IsmainPlant = await _context.MainPlant.Where(i => i.InitiativeId == initaitive.Id && i.IsMainPlant == true).FirstOrDefaultAsync();


                //-------------- Data To Send
                List<MoCPlant> moCPlants = new List<MoCPlant>();
                MoCRequest moCRequest = new MoCRequest();

                if (IsmainPlant != null)
                {
                    if (IsmainPlant.IsMainPlant == true)
                    {
                        moCRequest.ProjectName = IsmainPlant.EMocTitle;
                        moCRequest.Initiator = await GetEmployeeIdFromOwnerName(initaitive.OwnerName);
                        moCRequest.MainPlantID = await GetPlantIdToSendEMOC(IsmainPlant.Plant);
                        moCRequest.MoCType = "1";
                    }
                }


                foreach (var entity in mainPlant)
                {
                    MoCPlant moCPlant = new MoCPlant
                    {
                        PlantID = await GetPlantIdToSendEMOC(entity.Plant),
                        MoCChampion = await GetEmployeeIdFromOwnerName(entity.MocChampion)
                    };
                    moCPlants.Add(moCPlant);
                }

                moCRequest.Plants = moCPlants.ToArray();

                CreateMoC createMoC = new CreateMoC
                {
                    MoCRequest = moCRequest
                };

                //serializer.Serialize(stringBuilder, createMoC, emptyNs);

                MemoryStream strm = new MemoryStream();

                XmlSerializerNamespaces ns = new XmlSerializerNamespaces(); ns.Add("", "");
                XmlWriter writer = XmlWriter.Create(stringBuilder, new XmlWriterSettings { OmitXmlDeclaration = true });
                new XmlSerializer(typeof(CreateMoC)).Serialize(writer, createMoC, ns);

                if (urlEmoc != "" && xapikey != "")
                {

                    var stringContent = new StringContent(startSoapEnv + stringBuilder.ToString() + endSoapEnv, Encoding.UTF8, "text/xml");

                    var client = _clientFactory.CreateClient();

                    stringContent.Headers.Add("x-api-key", xapikey);
                    InterfaceActionLog logDataStringContent = new InterfaceActionLog()
                    {
                        InitiativeId = id,
                        ActionDate = DateTime.Now,
                        InterfaceType = "E-MOC",
                        InterfaceAction = "StringContent",
                        ResponseData = stringContent.ReadAsStringAsync().Result
                    };
                    await _context.InterfaceActionLog.AddAsync(logDataStringContent);
                    var response = await client.PostAsync(urlEmoc, stringContent);
                    if (response.IsSuccessStatusCode)
                    {
                        var responseStream = await response.Content.ReadAsStreamAsync();
                        InterfaceActionLog logDataResponseStream = new InterfaceActionLog()
                        {
                            InitiativeId = id,
                            ActionDate = DateTime.Now,
                            InterfaceType = "E-MOC",
                            InterfaceAction = "responseStream",
                            ResponseData = StreamToString(responseStream)
                        };
                        await _context.InterfaceActionLog.AddAsync(logDataResponseStream);
                    }
                    //else
                    //{
                    //    await response.Content.;
                    //}
                    response.EnsureSuccessStatusCode();

                    if (response != null && response.Content != null)
                    {
                        XDocument xml = XDocument.Parse(response.Content.ReadAsStringAsync().Result);

                        //XDocument xml = XDocument.Parse("<?xml version=\"1.0\" encoding=\"utf-8\"?><soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">    <soap:Body><CreateMoCResult>  <Status>Success</Status>  <Message></Message>  <MoCs>  <MoCResponse>  <MoCNo>MULTI-2015/017</MoCNo>  <PlantID>O-P1</PlantID>  <IsMainPlant>1</IsMainPlant>  </MoCResponse>  <MoCResponse>  <MoCNo>O-P1-2015/017</MoCNo>  <PlantID>O-P1</PlantID>  <IsMainPlant>0</IsMainPlant>  </MoCResponse>  <MoCResponse>  <MoCNo>O-P2-2015/017</MoCNo>  <PlantID>O-P2</PlantID>  <IsMainPlant>0</IsMainPlant>  </MoCResponse>  </MoCs> </CreateMoCResult>  </soap:Body></soap:Envelope>");
                        var aaa = xml.Descendants().Where(x => x.Name.LocalName == "CreateMoCResult").ToList();
                        CreateMoCResult createMoCResult = xml.Descendants().Where(x => x.Name.LocalName == "CreateMoCResult").Select(x => new CreateMoCResult()
                        {
                            Message = (string)x.Element(x.Name.Namespace + "Message"),
                            Status = (string)x.Element(x.Name.Namespace + "Status"),

                        }).FirstOrDefault();

                        //Save log

                        //await _context.SaveChangesAsync();

                        MoCs[] moCs = xml.Descendants().Where(x => x.Name.LocalName == "MoCResponse").Select(x => new MoCs()
                        {
                            MoCResponse = new MoCResponse()
                            {
                                MoCNo = (string)x.Element(x.Name.Namespace + "MoCNo"),
                                IsMainPlant = (string)x.Element(x.Name.Namespace + "IsMainPlant"),
                                PlantID = (string)x.Element(x.Name.Namespace + "PlantID"),
                            }
                        }).ToArray();

                        createMoCResult.MoCs = moCs;

                        if (createMoCResult.Status.ToString().ToLower() != "error")
                        {
                            // insert emoc to db
                            if (createMoCResult != null)
                                foreach (var moc in createMoCResult.MoCs)
                                {
                                    if (moc.MoCResponse != null)
                                    {
                                        var ourPlantId = await GetEmocPlantIdToOurPlant(moc.MoCResponse.PlantID);
                                        var mocPlantNoUpdate = await _context.MainPlant.Where(i => i.InitiativeId == id && i.Plant == ourPlantId && string.IsNullOrEmpty(i.EmocNo)).FirstOrDefaultAsync();
                                        if (mocPlantNoUpdate != null)
                                        {
                                            mocPlantNoUpdate.EmocNo = moc.MoCResponse.MoCNo;
                                        }
                                    }
                                }


                        }

                        await _context.SaveChangesAsync();
                        return createMoCResult;
                    }
                    else
                    {
                        return new CreateMoCResult() { };
                    }
                }
                else
                {
                    return new CreateMoCResult() { };
                }
            }
            catch (Exception ex)
            {
                InterfaceActionLog logData = new InterfaceActionLog()
                {
                    InitiativeId = id,
                    ActionDate = DateTime.Now,
                    InterfaceType = "E-MOC",
                    InterfaceAction = "Exception",
                    ResponseData = ex.ToString()
                };
                await _context.InterfaceActionLog.AddAsync(logData);
                await _context.SaveChangesAsync();
                CreateMoCResult createMoCResult = new CreateMoCResult()
                {
                    Message = "Internal Error!",
                    Status = "Internal Error",
                };
                return createMoCResult;
            }
        }

        public static string StreamToString(Stream stream)
        {
            stream.Position = 0;
            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }

        public static MemoryStream GenerateStreamFromString(string s)
        {
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(s);
            writer.Flush();
            stream.Position = 0;
            return stream;
        }

        public async Task<List<MainPlant>> CreateMainPlant(int id, List<MainPlant> data)
        {

            foreach (var item in data)
            {
                if (item.MainPlanId == 0 && item.Plant != null && item.EmocNo.IsNullOrEmpty())
                {
                    await _context.MainPlant.AddAsync(item);
                }
                if (item.EmocNo.IsNullOrEmpty() && item.MainPlanId != 0)
                {
                    _context.MainPlant.Update(item);
                }
            }
            await _context.SaveChangesAsync();
            //await CreateEmoc(id);
            var returnData = await _context.MainPlant.Where(x => x.InitiativeId == id).ToListAsync();
            //var check = false;
            //foreach (var item in returnData)
            //{
            //    if (item.EmocNo.IsNullOrEmpty())
            //    {
            //        _context.Remove(item);
            //        check = true;
            //    }
            //}
            //if (check)
            //{
            //    await _context.SaveChangesAsync();
            //    return new List<MainPlant>();
            //}
            //else
            //{
            return returnData;
            //}
        }
        public async Task<List<MainPlant>> CreateEmoc(int id, List<MainPlant> data)
        {

            foreach (var item in data)
            {
                if (item.MainPlanId == 0 && item.Plant != null && item.EmocNo.IsNullOrEmpty())
                {
                    await _context.MainPlant.AddAsync(item);
                }
                if (item.MainPlanId != 0)
                {
                    _context.MainPlant.Update(item);
                }
            }
            await _context.SaveChangesAsync();
            //CreateMoCResult createMoCResult =  await CreateEmoc(id);
            CreateMoCResult createMoCResult = await CreateEmoc(id);
            var returnData = new List<MainPlant>();
            if (createMoCResult.Status == "Success")
            {
                returnData = await _context.MainPlant.Where(x => x.InitiativeId == id).ToListAsync();

            }
            else
            {
                returnData = await _context.MainPlant.Where(x => x.InitiativeId == id).ToListAsync();
                returnData.Add(new MainPlant()
                {
                    MainPlanId = -1,
                    EMocTitle = createMoCResult.Status,
                    ReasonForChange = createMoCResult.Message
                });
            }
            return returnData;
            //var check = false;
            //foreach (var item in returnData)
            //{
            //    if (item.EmocNo.IsNullOrEmpty())
            //    {
            //        _context.Remove(item);
            //        check = true;
            //    }
            //}
            //if (check)
            //{
            //    await _context.SaveChangesAsync();
            //    return new List<MainPlant>();
            //}
            //else
            //{
            //}
        }
        public async Task<List<MainPlant>> GetMainPlant(int id)
        {
            return await _context.MainPlant.Where(x => x.InitiativeId == id).OrderBy(i => i.MainPlanId).ToListAsync();
        }
        public async Task<int> DeleteMainPlant(int id)
        {
            var returnData = await _context.MainPlant.Where(x => x.MainPlanId == id).FirstOrDefaultAsync();
            if (returnData.EmocNo.IsNullOrEmpty() && returnData != null)
            {
                _context.Remove(returnData);
            }
            return await _context.SaveChangesAsync();
        }

        public async Task<string> GetPlantIdToSendEMOC(string ourPlantId)
        {
            var commonDataPlant = await _context.CommonData.Where(i => i.DataType == "plant" && i.Attribute07 == ourPlantId).FirstOrDefaultAsync();
            if (commonDataPlant != null)
            {
                return commonDataPlant.Attribute08 == null ? "" : commonDataPlant.Attribute08;
            }

            return "";
        }


        public async Task<string> GetEmocPlantIdToOurPlant(string EmocPlantId)
        {
            var commonDataPlant = await _context.CommonData.Where(i => i.DataType == "plant" && i.Attribute08 == EmocPlantId).FirstOrDefaultAsync();
            if (commonDataPlant != null)
            {
                return commonDataPlant.Attribute08 == null ? "" : commonDataPlant.Attribute07;
            }

            return "";
        }

        public async Task<string> GetEmployeeIdFromOwnerName(string ownerName)
        {
            var own = await _context.Owners.Where(i => i.OwnerName == ownerName).FirstOrDefaultAsync();
            if (own != null)
            {
                return own.EmployeeID == null ? "0" : own.EmployeeID;
            }

            return "0";
        }
    }
}
