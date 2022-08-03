using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic.FileIO;
using Newtonsoft.Json;
using NPOI.SS.Formula.Functions;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Capexs;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Dtos.NewApprovalSystem;
using PTT_GC_API.Models;
using PTT_GC_API.Models.CapexInformation;
using PTT_GC_API.Models.IF;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.Owner;
using PTT_GC_API.Models.ProgressAndMilestone;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace PTT_GC_API.Data.Repository
{
    public class IFRepository : IFInterface
    {
        private readonly DataContext _context;
        private readonly StoreProcedureInterface _storeProcedure;
        private readonly IHttpClientFactory _clientFactory;
        private readonly IOptions<SapInterface> _sapInterface;
        public IFRepository(DataContext context, StoreProcedureInterface storeProcedure, IHttpClientFactory clientFactory, IOptions<SapInterface> sapInterface)
        {
            _context = context;
            _storeProcedure = storeProcedure;
            _clientFactory = clientFactory;
            _sapInterface = sapInterface;
        }
        public async Task<bool> CAPEX_IF_001_SAPIM_CP(int initiativeId, DateTime nowDateTIme)
        {
            try
            {
                await InsertInitiativeIdToTempTable(initiativeId, "IF001");

                //startDateTime input only date  no need time !!!   eg.  '2020-06-29'
                DataTable datatable = await _storeProcedure.ExecuteReturnDatatable($"sp_CAPEX_IF_001_SAPIM_CP '{nowDateTIme.ToString("yyyy-MM-dd")}'");

                if (datatable.Rows.Count == 0) return false;

                string fileName = "IM-CPO-CP-1-" + nowDateTIme.Year.ToString() + "_" + nowDateTIme.ToString("ddMMyyyy") + ".txt";

                string myTableAsString = String.Join("\t", datatable.Columns.Cast<DataColumn>().
                                            Select(r => r.ColumnName).ToArray());

                myTableAsString += "\n";

                myTableAsString +=
                                        String.Join(Environment.NewLine, datatable.Rows.Cast<DataRow>().
                                            Select(r => r.ItemArray).ToArray().
                                            Select(x => String.Join("\t", x)));



                byte[] bytes = null;
                using (var ms = new MemoryStream())
                {
                    TextWriter tw = new StreamWriter(ms, Encoding.UTF8);

                    await tw.WriteAsync(myTableAsString);

                    await tw.FlushAsync();
                    ms.Position = 0;
                    bytes = ms.ToArray();
                    await ms.FlushAsync();

                }

                var _entityDelete = await _context.OutgoingFile.Where(i => i.FileName == fileName).ToListAsync();

                foreach (var entity in _entityDelete)
                {
                    _context.OutgoingFile.Remove(entity);
                }

                _context.OutgoingFile.Add(new OutgoingFile
                {
                    FileName = fileName,
                    DirectoryPath = "OBJECTIVE",
                    Data = bytes,
                    CreateDate = nowDateTIme,
                    CreateUser = "FRONTIS",
                    UpdateDate = nowDateTIme,
                    UpdateUser = "FRONTIS"

                });
            }
            catch (Exception ex)
            {

            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> CAPEX_IF_001_SAPIM_General(int initiativeId, DateTime nowDateTIme)
        {
            try
            {
                await InsertInitiativeIdToTempTable(initiativeId, "IF001");

                //startDateTime input only date  no need time !!!   eg.  '2020-06-29'
                DataTable datatable = await _storeProcedure.ExecuteReturnDatatable($"sp_CAPEX_IF_001_SAPIM_Genaral '{nowDateTIme:yyyy-MM-dd}'");

                if (datatable.Rows.Count == 0) return false;

                string fileName = "IM-CPO-File1-GeneralData-" + nowDateTIme.ToString("ddMMyyyy") + ".txt";

                string myTableAsString = String.Join("\t", datatable.Columns.Cast<DataColumn>().
                                            Select(r => r.ColumnName).ToArray());

                myTableAsString += "\n";

                myTableAsString +=
                                        String.Join(Environment.NewLine, datatable.Rows.Cast<DataRow>().
                                            Select(r => r.ItemArray).ToArray().
                                            Select(x => String.Join("\t", x)));



                byte[] bytes = null;
                using (var ms = new MemoryStream())
                {
                    TextWriter tw = new StreamWriter(ms, Encoding.UTF8);

                    await tw.WriteAsync(myTableAsString);

                    await tw.FlushAsync();
                    ms.Position = 0;
                    bytes = ms.ToArray();
                    await ms.FlushAsync();

                }

                var _entityDelete = await _context.OutgoingFile.Where(i => i.FileName == fileName).ToListAsync();

                foreach (var entity in _entityDelete)
                {
                    _context.OutgoingFile.Remove(entity);
                }

                _context.OutgoingFile.Add(new OutgoingFile
                {
                    FileName = fileName,
                    DirectoryPath = "GENERALDATA",
                    Data = bytes,
                    CreateDate = nowDateTIme,
                    CreateUser = "FRONTIS",
                    UpdateDate = nowDateTIme,
                    UpdateUser = "FRONTIS"

                });
            }
            catch (Exception ex)
            {

            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> CAPEX_IF_001_SAPIM_Monthly(int initiativeId, DateTime nowDateTIme)
        {
            try
            {
                await InsertInitiativeIdToTempTable(initiativeId, "IF001");

                //startDateTime input only date  no need time !!!   eg.  '2020-06-29'
                DataTable datatable = await _storeProcedure.ExecuteReturnDatatable($"sp_CAPEX_IF_001_SAPIM_Monthly '{nowDateTIme:yyyy-MM-dd}'");

                if (datatable.Rows.Count == 0) return false;

                string fileName = "IM-CPO-File3-MonthlyPlan-" + nowDateTIme.ToString("ddMMyyyy") + ".txt";

                string myTableAsString = String.Join("\t", datatable.Columns.Cast<DataColumn>().
                                            Select(r => r.ColumnName).ToArray());

                myTableAsString += "\n";

                myTableAsString +=
                                        String.Join(Environment.NewLine, datatable.Rows.Cast<DataRow>().
                                            Select(r => r.ItemArray).ToArray().
                                            Select(x => String.Join("\t", x)));



                byte[] bytes = null;
                using (var ms = new MemoryStream())
                {
                    TextWriter tw = new StreamWriter(ms, Encoding.UTF8);

                    await tw.WriteAsync(myTableAsString);

                    await tw.FlushAsync();
                    ms.Position = 0;
                    bytes = ms.ToArray();
                    await ms.FlushAsync();

                }

                var _entityDelete = await _context.OutgoingFile.Where(i => i.FileName == fileName).ToListAsync();

                foreach (var entity in _entityDelete)
                {
                    _context.OutgoingFile.Remove(entity);
                }

                _context.OutgoingFile.Add(new OutgoingFile
                {
                    FileName = fileName,
                    DirectoryPath = "MONTHLYPLAN",
                    Data = bytes,
                    CreateDate = nowDateTIme,
                    CreateUser = "FRONTIS",
                    UpdateDate = nowDateTIme,
                    UpdateUser = "FRONTIS"

                });
            }
            catch (Exception ex)
            {

            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> CAPEX_IF_001_SAPIM_Yearly(int initiativeId, DateTime nowDateTIme)
        {
            try
            {
                await InsertInitiativeIdToTempTable(initiativeId, "IF001");
                //startDateTime input only date  no need time !!!   eg.  '2020-06-29'
                DataTable datatable = await _storeProcedure.ExecuteReturnDatatable($"sp_CAPEX_IF_001_SAPIM_Yearly '{nowDateTIme:yyyy-MM-dd}'");

                if (datatable.Rows.Count == 0) return false;

                string fileName = "IM-CPO-File2-YearlyPlan-" + nowDateTIme.ToString("ddMMyyyy") + ".txt";

                string myTableAsString = String.Join("\t", datatable.Columns.Cast<DataColumn>().
                                            Select(r => r.ColumnName).ToArray());

                myTableAsString += "\n";

                myTableAsString +=
                                        String.Join(Environment.NewLine, datatable.Rows.Cast<DataRow>().
                                            Select(r => r.ItemArray).ToArray().
                                            Select(x => String.Join("\t", x)));



                byte[] bytes = null;
                using (var ms = new MemoryStream())
                {
                    TextWriter tw = new StreamWriter(ms, Encoding.UTF8);

                    await tw.WriteAsync(myTableAsString);

                    await tw.FlushAsync();
                    ms.Position = 0;
                    bytes = ms.ToArray();
                    await ms.FlushAsync();

                }

                var _entityDelete = await _context.OutgoingFile.Where(i => i.FileName == fileName).ToListAsync();

                foreach (var entity in _entityDelete)
                {
                    _context.OutgoingFile.Remove(entity);
                }

                _context.OutgoingFile.Add(new OutgoingFile
                {
                    FileName = fileName,
                    DirectoryPath = "YEARLYPLAN",
                    Data = bytes,
                    CreateDate = nowDateTIme,
                    CreateUser = "FRONTIS",
                    UpdateDate = nowDateTIme,
                    UpdateUser = "FRONTIS"

                });
            }
            catch (Exception ex)
            {

            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> IF_DAT(int initiativeId, DateTime nowDateTIme)
        {
            try
            {
                var initiative = await _context.Initiatives.Where(i => i.Id == initiativeId).FirstOrDefaultAsync();
                DataTable datatable = await _storeProcedure.ExecuteReturnDatatable($"sp_IF_DAT {initiativeId}");
                var initiativeCode = await ChangeInitiativeCodeLongString(initiative.InitiativeCode);
                if (datatable.Rows.Count == 0) return false;

                string fileName = $"2_DAT_{initiativeCode.PadLeft(15, '0')}.csv";

                //string myTableAsString = String.Join(",", datatable.Columns.Cast<DataColumn>().
                //                            Select(r => $"\"{r.ColumnName}\"").ToArray());

                //myTableAsString += "\n";

                string myTableAsString =
                                        String.Join(Environment.NewLine, datatable.Rows.Cast<DataRow>().
                                            Select(r => r.ItemArray).ToArray().
                                            Select(x => "" + String.Join(",", x) + ""));
                //Select(x => "\"" + String.Join("\",\"", x) + "\""));



                byte[] bytes = null;
                using (var ms = new MemoryStream())
                {
                    //TextWriter tw = new StreamWriter(ms, Encoding.UTF8);
                    TextWriter tw = new StreamWriter(ms);
                    await tw.WriteAsync(myTableAsString);

                    await tw.FlushAsync();
                    ms.Position = 0;
                    bytes = ms.ToArray();
                    await ms.FlushAsync();

                }

                _context.OutgoingFile.Add(new OutgoingFile
                {
                    FileName = fileName,
                    DirectoryPath = "CP/UPDATEPOC",
                    Data = bytes,
                    CreateDate = nowDateTIme,
                    CreateUser = "FRONTIS",
                    UpdateDate = nowDateTIme,
                    UpdateUser = "FRONTIS"

                });

            }
            catch (Exception ex)
            {

            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> IF_PLA(int initiativeId, DateTime nowDateTIme)
        {
            try
            {
                var initiative = await _context.Initiatives.Where(i => i.Id == initiativeId).FirstOrDefaultAsync();
                DataTable datatable = await _storeProcedure.ExecuteReturnDatatable($"sp_IF_PLA {initiativeId}");
                var initiativeCode = await ChangeInitiativeCodeLongString(initiative.InitiativeCode);
                if (datatable.Rows.Count == 0) return false;

                string fileName = $"4_PLA_{initiativeCode.PadLeft(15, '0')}.csv";

                //string myTableAsString = String.Join(",", datatable.Columns.Cast<DataColumn>().
                //                            Select(r => $"\"{r.ColumnName}\"").ToArray());

                //myTableAsString += "\n";

                string myTableAsString =
                                        String.Join(Environment.NewLine, datatable.Rows.Cast<DataRow>().
                                            Select(r => r.ItemArray).ToArray().
                                            Select(x => "" + String.Join(",", x) + ""));
                //Select(x => "\"" + String.Join("\",\"", x) + "\""));



                byte[] bytes = null;
                using (var ms = new MemoryStream())
                {
                    //TextWriter tw = new StreamWriter(ms, Encoding.UTF8);
                    TextWriter tw = new StreamWriter(ms);
                    await tw.WriteAsync(myTableAsString);

                    await tw.FlushAsync();
                    ms.Position = 0;
                    bytes = ms.ToArray();
                    await ms.FlushAsync();

                }

                _context.OutgoingFile.Add(new OutgoingFile
                {
                    FileName = fileName,
                    DirectoryPath = "CP/UPDATEPLAN",
                    Data = bytes,
                    CreateDate = nowDateTIme,
                    CreateUser = "FRONTIS",
                    UpdateDate = nowDateTIme,
                    UpdateUser = "FRONTIS"

                });
            }
            catch (Exception ex)
            {

            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> IF_POC(int initiativeId, DateTime nowDateTIme)
        {
            try
            {
                var initiative = await _context.Initiatives.Where(i => i.Id == initiativeId).FirstOrDefaultAsync();
                DataTable datatable = await _storeProcedure.ExecuteReturnDatatable($"sp_IF_POC {initiativeId}");
                var initiativeCode = await ChangeInitiativeCodeLongString(initiative.InitiativeCode);
                if (datatable.Rows.Count == 0) return false;

                string fileName = $"3_POC_{initiativeCode.PadLeft(15, '0')}.csv";

                //string myTableAsString = String.Join(",", datatable.Columns.Cast<DataColumn>().
                //                            Select(r => $"\"{r.ColumnName}\"").ToArray());

                //myTableAsString += "\n";

                string myTableAsString =
                                        String.Join(Environment.NewLine, datatable.Rows.Cast<DataRow>().
                                            Select(r => r.ItemArray).ToArray().
                                            Select(x => "" + String.Join(",", x) + ""));
                //Select(x => "\"" + String.Join("\",\"", x) + "\""));



                byte[] bytes = null;
                using (var ms = new MemoryStream())
                {
                    //TextWriter tw = new StreamWriter(ms, Encoding.UTF8);
                    TextWriter tw = new StreamWriter(ms);
                    await tw.WriteAsync(myTableAsString);

                    await tw.FlushAsync();
                    ms.Position = 0;
                    bytes = ms.ToArray();
                    await ms.FlushAsync();

                }

                _context.OutgoingFile.Add(new OutgoingFile
                {
                    FileName = fileName,
                    DirectoryPath = "CP/UPDATEPOC",
                    Data = bytes,
                    CreateDate = nowDateTIme,
                    CreateUser = "FRONTIS",
                    UpdateDate = nowDateTIme,
                    UpdateUser = "FRONTIS"

                });

            }
            catch (Exception ex)
            {

            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> IF_WBS(int initiativeId, DateTime nowDateTIme)
        {
            try
            {
                var initiative = await _context.Initiatives.Where(i => i.Id == initiativeId).FirstOrDefaultAsync();
                DataTable datatable = await _storeProcedure.ExecuteReturnDatatable($"sp_IF_WBS {initiativeId}");
                var initiativeCode = await ChangeInitiativeCodeLongString(initiative.InitiativeCode);
                if (datatable.Rows.Count == 0) return false;

                string fileName = $"1_WBS_{initiativeCode.PadLeft(15, '0')}.csv";

                //string myTableAsString = String.Join(",", datatable.Columns.Cast<DataColumn>().
                //                            Select(r => $"\"{r.ColumnName}\"").ToArray());

                //myTableAsString += "\n";

                string myTableAsString =
                                        String.Join(Environment.NewLine, datatable.Rows.Cast<DataRow>().
                                            Select(r => r.ItemArray).ToArray().
                                            Select(x => "" + String.Join(",", x) + ""));
                //Select(x => "\"" + String.Join("\",\"", x) + "\""));


                byte[] bytes = null;
                using (var ms = new MemoryStream())
                {
                    //TextWriter tw = new StreamWriter(ms, Encoding.UTF8);
                    TextWriter tw = new StreamWriter(ms);
                    await tw.WriteAsync(myTableAsString);

                    await tw.FlushAsync();
                    ms.Position = 0;
                    bytes = ms.ToArray();
                    await ms.FlushAsync();

                }

                _context.OutgoingFile.Add(new OutgoingFile
                {
                    FileName = fileName,
                    DirectoryPath = "CP/CREATION",
                    Data = bytes,
                    CreateDate = nowDateTIme,
                    CreateUser = "FRONTIS",
                    UpdateDate = nowDateTIme,
                    UpdateUser = "FRONTIS"

                });

            }
            catch (Exception ex)
            {

            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> InsertInitiativeIdToTempTable(int InitiativeId, string IFtype)
        {
            if (IFtype == "IF020")
            {
                //var entityToDelete = await _context.TmpInitiativeIdIFs.Where(i => i.CreatedDate < DateTime.Now.Date && i.IFType == IFtype).ToListAsync();

                //foreach (var entity in entityToDelete)
                //{
                //    _context.TmpInitiativeIdIFs.Remove(entity);
                //}

                var checkDuplicate = await _context.TmpInitiativeIdIFs.Where(i => i.InitiativeId == InitiativeId && i.IFType == IFtype && i.CreatedDate.Value.Date == DateTime.Now.Date).ToListAsync();

                if (!checkDuplicate.Any())
                {
                    await _context.TmpInitiativeIdIFs.AddAsync(
                    new TmpInitiativeCodeIF
                    {
                        InitiativeId = InitiativeId,
                        IFType = IFtype,
                        CreatedDate = DateTime.Now
                    });
                }
            }
            else
            {
                var entityToDelete = await _context.TmpInitiativeIdIFs.Where(i => i.CreatedDate < DateTime.Now.Date && i.IFType == IFtype).ToListAsync();

                foreach (var entity in entityToDelete)
                {
                    _context.TmpInitiativeIdIFs.Remove(entity);
                }

                var checkDuplicate = await _context.TmpInitiativeIdIFs.Where(i => i.InitiativeId == InitiativeId && i.IFType == IFtype).ToListAsync();


                if (!checkDuplicate.Any())
                {
                    await _context.TmpInitiativeIdIFs.AddAsync(
                    new TmpInitiativeCodeIF
                    {
                        InitiativeId = InitiativeId,
                        IFType = IFtype,
                        CreatedDate = DateTime.Now
                    });
                }
            }


            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<string> InsertIncomingFileData()
        {
            //int[]? getAllId;
            List<int?> getAllId = new List<int?>();
            var nowDatetime = DateTime.Now;
            try
            {
                //var filesToInsert = await _context.IncomingFile.Where(i => _context.IncomingFileData.Select(i => i.FileId).Contains(i.Id) == false).ToListAsync();

                //var getIncomDataId = await _context.IncomingFileData.Select(i => i.FileId).Distinct().ToListAsync();
                //var filesToInsert = await _context.IncomingFile.Where(i => getIncomDataId.Select(g => g).Contains(i.Id) == false).ToListAsync();

                var filesToInsert = await _context.IncomingFile.Where(i => i.Status != "Y").Take(1).ToListAsync();
                getAllId = filesToInsert.Select(x => x?.Id).ToList();
                int lineNumber = 0;
                string[] Delimiters = new string[] { };
                List<IncomingFileData> incomingFileData = new List<IncomingFileData>();
                foreach (var entity in filesToInsert)
                {

                    TextFieldParser parser = new TextFieldParser(new MemoryStream(entity.Data))
                    {
                        TextFieldType = FieldType.Delimited,
                        Delimiters = GetDelimitersByFileExtension(Path.GetExtension(entity.FileName))
                    };

                    string[] parserFields = new string[] { };

                    while (parser.EndOfData == false)
                    {
                        lineNumber = (int)parser.LineNumber - 1;  //need to start row with 0 instead of 1
                        parserFields = parser.ReadFields();

                        if (Path.GetExtension(entity.FileName) == ".txt" && lineNumber == 0)
                        {
                            goto nextLine; //if text file do not insert column name  -- go next loop record
                                           //Debug.WriteLine(parserFields[i]);
                        }

                        if (Path.GetExtension(entity.FileName) == ".txt")
                        {
                            lineNumber -= 1;
                            //change starting row number of data
                        }

                        IncomingFileData dataRecord = new IncomingFileData()
                        {
                            FileId = entity.Id,
                            FileName = entity.FileName,
                            CreatedDate = nowDatetime,
                            Row = lineNumber,
                            DirectoryPath = entity.DirectoryPath
                        };
                        // the line number start from 1  when call .ReadFields() the line will go next new line automatically (while reading line 1)
                        for (int i = 0; i < parserFields.Length; i++)
                        {
                            if (i + 1 > 30) break; //column more than column in model force break this record!

                            dataRecord.GetType().GetProperty($"Column{i + 1}").SetValue(dataRecord, parserFields[i].ToString()); // set column1-30  data

                        }

                        incomingFileData.Add(dataRecord);

                        nextLine:;
                        //Debug.WriteLine("Line Num :" + parser.LineNumber);
                    }
                }

                _context.IncomingFileData.AddRange(incomingFileData);
                await _context.SaveChangesAsync();


                // Flag Status = "Y" Table: IncomingFile
                foreach (var item in filesToInsert)
                {
                    item.Status = "Y";
                    _context.Update(item);
                    await _context.SaveChangesAsync();
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            try
            {
                await _storeProcedure.Execute_NoReturn("EXEC sp_IncomingProcess");
                //-- send revised bg if get return wbs code from sap

                //--query with not sent

                // var incomingFileData = await _context.IncomingFileData.Where(i => i.FileName == "IM-CPO-MappingCapexAppWbs.txt" && i.CreatedDate.Value.Date == nowDatetime.Date).ToListAsync();
                var incomingFileData = await _context.IncomingFileData.Where(i => i.FileName == "IM-CPO-MappingCapexAppWbs.txt" &&
                                       i.CreatedDate.Value == nowDatetime).ToListAsync();

                //var incomingFileData = (from a in await _context.IncomingFileData.Where(i => i.FileName == "IM-CPO-MappingCapexAppWbs.txt" &&
                //                         i.CreatedDate.Value == nowDatetime).ToListAsync()
                //                         select new IncomingFileData()
                //                         {
                //                             Column2 = a.Column2,
                //                             Column4 = a.Column4,
                //                             Column6 = a.Column6
                //                         }).ToList();

                //var incomingFileData = await _context.IncomingFileData.Where(i => i.FileName == "IM-CPO-MappingCapexAppWbs.txt" && getAllId.Contains(i.FileId)).ToListAsync();
                //var incomingFileData = await _context.IncomingFileData.Where(i => i.FileName == "IM-CPO-MappingCapexAppWbs.txt" && i.Column2 == "00000000B210032").ToListAsync();

                // Plan B
                //var iniIdArray = incomingFileData.Select(async i => await GetInitiativeIdFromPaddingInitiativeCode(i.Column2)).ToArray();
                //List<int?> getAllIdFile = new List<int?>();
                //foreach(var g in iniIdArray)
                //{
                //    getAllIdFile.Add(g);
                //}

                foreach (var incom in incomingFileData)
                {
                    if (!string.IsNullOrEmpty(incom.Column2))
                    {
                        var iniId = await GetInitiativeIdFromPaddingInitiativeCode(incom.Column2);

                        var initiative = await _context.Initiatives.Where(i => i.Id == iniId && (i.HistoryFlag == null || i.HistoryFlag == 0)).FirstOrDefaultAsync(); // เพิ่ม history flag เข้าไป


                        // Plan B
                        //var initiativeArray = await _context.Initiatives.Where(i => getAllIdFile.Contains(i.Id) && (i.HistoryFlag == null || i.HistoryFlag == 0)).FirstOrDefaultAsync();


                        ////IF BudgetPeriod == "Current year" && BetweenYear == "Contingency"  don't create RevisedBG
                        //var getCapexContingency = await _context.CapexInformation.Where(c => c.InitiativeId == initiative.Id
                        //&& c.BudgetPeriod == "Current year" && c.BetweenYear == "Contingency").OrderByDescending(x=>x.Sequent).FirstOrDefaultAsync();
                        //var getCapexByIniId = await _context.CapexInformation.Where(x=>x.InitiativeId == initiative.Id).ToListAsync();
                        //var getMaxCapex = getCapexByIniId.Max(x => x.Sequent);
                        //if(getCapexContingency.Sequent == getMaxCapex)
                        //{ }

                        if (initiative != null)
                        {
                            if (initiative.InitiativeType?.ToLower() == "request pool")
                            {
                                //request pool  send revised bg when recieved app code
                                if (!string.IsNullOrEmpty(incom.Column4)) //App Code
                                {
                                    var checkIsSentRevisedBG = await _context.TmpInitiativeIdIFs.Where(i => i.IFType == "IF020" && i.InitiativeId == iniId && i.CreatedDate.Value.Date == nowDatetime.Date).FirstOrDefaultAsync();

                                    if (checkIsSentRevisedBG == null) // not create revised bg
                                    {
                                        await CAPEX_IF_020_RevisedBG(iniId, nowDatetime);
                                    }
                                }
                            }
                            else
                            {
                                //other initiativetype
                                if (!string.IsNullOrEmpty(incom.Column6)) //WBS Code
                                {
                                    var checkIsSentRevisedBG = await _context.TmpInitiativeIdIFs.Where(i => i.IFType == "IF020" && i.InitiativeId == iniId && i.CreatedDate.Value.Date == nowDatetime.Date).FirstOrDefaultAsync();

                                    if (checkIsSentRevisedBG == null) // not create revised bg
                                    {
                                        await CAPEX_IF_020_RevisedBG(iniId, nowDatetime);
                                    }
                                }
                            }
                        }
                    }

                    // update Column30 here
                    //incom.Column30 = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
                    incom.Column30 = DateTime.Now.ToString();
                    _context.Update(incom);
                    await _context.SaveChangesAsync();
                }



            }
            catch (Exception ex)
            {
                return ex.Message;
            }



            return "success";
        }

        public string[] GetDelimitersByFileExtension(string fileExtension)
        {

            switch (fileExtension)
            {
                case ".txt":
                    return new string[] { "#" };

                case ".csv":
                    return new string[] { ",", "|" };

                default:
                    return new string[] { ",", "|" };
            }

        }

        public async Task<int> Interface_OutGoing(int id, string status, string stage, InitiativeTypeSubType initiativeTypeSubType = null, ApprovalNewSystemParam approvalNewSystemParam = null)
        {
            var nowDateTime = DateTime.Now;
            var initiative = await _context.Initiatives.Where(i => i.Id == id).FirstOrDefaultAsync();
            var capexInfo = await _context.CapexInformations.Where(i => i.InitiativeId == id).OrderByDescending(i => i.Sequent).FirstOrDefaultAsync();

            var contin = "contingency";
            var usepool = "pool budget";
            var midyear = "mid year";
            var transfer = "tranfer";
            var annual = "annual";
            var usepooler = "er";
            var bodApprove = "bod approval";
            var budgetType = await GetCapexBudgetType(capexInfo);

            string processType = "";
            //if (status == "wait for create" && new string[] { "Pre-DD-8", "Detail F/S-8" }.Contains(stage) == false) return 0;
            //if ((status == "wait for create App." && stage == "App. Request") == false) return 0;

            //createType = 0 , 1 , 2   ::     0 = send email request APP and WBS /  1 = send email request WBS Only AND Send App Request From Backend!  / 2 = No Send Email  Create App Request and WBS From BackEnd!!
            //sendmail to owner and creator

            if (initiativeTypeSubType != null)
            {
                processType = initiativeTypeSubType.ProcessType.ToLower();
            }

            //if (flagNewApprovalSystem == true)
            //{
            processType = approvalNewSystemParam.Process.ToLower();

            if (approvalNewSystemParam.FlowType != "initiative" && approvalNewSystemParam.FlowType != "requestcapex")
            {
                switch (approvalNewSystemParam.FlowType)
                {
                    case "addmore":
                        await CAPEX_IF_020_RevisedBG(id, nowDateTime);
                        await IF_PLA(id, nowDateTime);
                        await IF_POC(id, nowDateTime);
                        await IF_DAT(id, nowDateTime);
                        break;

                    case "revise":
                        await CAPEX_IF_020_RevisedBG(id, nowDateTime);
                        await IF_PLA(id, nowDateTime);
                        await IF_POC(id, nowDateTime);
                        await IF_DAT(id, nowDateTime);
                        break;
                }
            }
            else
            {
                switch (processType)
                {

                    case "max":
                        if (budgetType == annual || budgetType == midyear)
                        {
                        }
                        else if (budgetType == contin)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                        }
                        else if (budgetType == transfer)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                        }
                        else if (budgetType == usepool)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                            //await CAPEX_IF_020_RevisedBG(id, nowDateTime);  --change seq
                        }
                        break;

                    case "pimcapex":
                        if (budgetType == annual || budgetType == midyear)
                        {
                        }
                        else if (budgetType == contin)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                        }
                        else if (budgetType == transfer)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                        }
                        else if (budgetType == usepool)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                            //await CAPEX_IF_020_RevisedBG(id, nowDateTime);  --change seq
                        }
                        break;

                    case "dim":
                        if (budgetType == annual || budgetType == midyear)
                        {
                        }
                        else if (budgetType == contin)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                        }
                        else if (budgetType == transfer)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                        }
                        else if (budgetType == usepool)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                            //await CAPEX_IF_020_RevisedBG(id, nowDateTime);  --change seq
                        }
                        break;

                    case "pim":
                        if (capexInfo != null && capexInfo.CapexType?.ToLower() == "addmorecapex") // case add more on flow type = initiative
                        {
                            await CAPEX_IF_020_RevisedBG(id, nowDateTime);
                            await IF_PLA(id, nowDateTime);
                            await IF_POC(id, nowDateTime);
                            await IF_DAT(id, nowDateTime);
                            break;
                        }
                        else if (budgetType == annual || budgetType == midyear)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                            //await CAPEX_IF_020_RevisedBG(id, nowDateTime);  --change seq
                        }
                        else if (budgetType == contin)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                        }
                        else if (budgetType == transfer)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                        }
                        else if (budgetType == usepool)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                            //await CAPEX_IF_020_RevisedBG(id, nowDateTime);  --change seq
                        }
                        break;

                    case "cim":
                        if (budgetType == annual || budgetType == midyear)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                            //await CAPEX_IF_020_RevisedBG(id, nowDateTime);  --change seq
                        }
                        else if (budgetType == contin)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                        }
                        else if (budgetType == transfer)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                        }
                        else if (budgetType == usepool)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                            //await CAPEX_IF_020_RevisedBG(id, nowDateTime);  --change seq
                        }
                        else if (budgetType == bodApprove)
                        {
                            //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                            //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                            //await IF_WBS(id, nowDateTime);
                            //await IF_DAT(id, nowDateTime);
                            //await IF_POC(id, nowDateTime);
                            //await IF_PLA(id, nowDateTime);
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                            //await CAPEX_IF_020_RevisedBG(id, nowDateTime);  --change seq
                        }
                        break;

                    case "directcapex":
                        if (initiative.BudgetSource.Equals("er", StringComparison.InvariantCultureIgnoreCase))
                        {
                            await SendAppRequest(id, nowDateTime, initiative.CreateType);
                            await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                        }
                        else
                        {
                            if (budgetType == annual || budgetType == midyear)
                            {
                                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                                //await IF_WBS(id, nowDateTime);
                                //await IF_DAT(id, nowDateTime);
                                //await IF_POC(id, nowDateTime);
                                //await IF_PLA(id, nowDateTime);
                                await SendAppRequest(id, nowDateTime, initiative.CreateType);
                                //await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                                //await CAPEX_IF_020_RevisedBG(id, nowDateTime);  --change seq
                            }
                            else if (budgetType == contin)
                            {
                                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                                //await IF_WBS(id, nowDateTime);
                                //await IF_DAT(id, nowDateTime);
                                //await IF_POC(id, nowDateTime);
                                //await IF_PLA(id, nowDateTime);
                                await SendAppRequest(id, nowDateTime, initiative.CreateType);
                                //await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                            }
                            else if (budgetType == transfer)
                            {
                                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                                //await IF_WBS(id, nowDateTime);
                                //await IF_DAT(id, nowDateTime);
                                //await IF_POC(id, nowDateTime);
                                //await IF_PLA(id, nowDateTime);
                                await SendAppRequest(id, nowDateTime, initiative.CreateType);
                                //await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                            }
                            else if (budgetType == usepool)
                            {
                                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                                //await IF_WBS(id, nowDateTime);
                                //await IF_DAT(id, nowDateTime);
                                //await IF_POC(id, nowDateTime);
                                //await IF_PLA(id, nowDateTime);
                                await SendAppRequest(id, nowDateTime, initiative.CreateType);
                                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                                //await CAPEX_IF_020_RevisedBG(id, nowDateTime);  --change seq
                            }
                        }
                        break;

                    case "request pool":

                        /*
                        switch (initiative.PoolType.ToLower())
                        {
                            
                            case "er":
                                await SendAppRequest(id, nowDateTime, initiative.CreateType);
                                await CreteToProgressHeader(id);
                                //await SendWBSRequest(id, nowDateTime, initiative.CreateType);
                                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                                //await CAPEX_IF_020_RevisedBG(id, nowDateTime);  --change seq
                                break;
                            case "digital capex":
                                //do nothing
                                break;
                            case "it capex":
                                //do nothing
                                break;
                            case "pim":
                                //do nothing
                                break;
                            case "max":
                                //do nothing
                                break;
                            case "mtpi":
                                //do nothing
                                break;
                            default:
                                //do nothing
                                break;
                        }
                        */

                        // 2021-07-29 Revise by Ken
                        await SendAppRequest(id, nowDateTime, initiative.CreateType);
                        await CreteToProgressHeader(id);
                        break;
                }

            }


            //}
            //else
            //{



            //    switch (processType)
            //    {
            //        case "addmorecapex":
            //            await CAPEX_IF_020_RevisedBG(id, nowDateTime);
            //            await IF_PLA(id, nowDateTime);
            //            await IF_POC(id, nowDateTime);
            //            await IF_DAT(id, nowDateTime);
            //            break;

            //        case "returncapex":
            //            await CAPEX_IF_020_RevisedBG(id, nowDateTime);
            //            await IF_PLA(id, nowDateTime);
            //            await IF_POC(id, nowDateTime);
            //            await IF_DAT(id, nowDateTime);
            //            break;

            //        case "max":
            //            if (budgetType == annual || budgetType == midyear)
            //            {
            //            }
            //            else if (budgetType == contin)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //            }
            //            else if (budgetType == transfer)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //            }
            //            else if (budgetType == usepool)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //                await CAPEX_IF_020_RevisedBG(id, nowDateTime);
            //            }
            //            break;

            //        case "pimcapex":
            //            if (budgetType == annual || budgetType == midyear)
            //            {
            //            }
            //            else if (budgetType == contin)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //            }
            //            else if (budgetType == transfer)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //            }
            //            else if (budgetType == usepool)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //                await CAPEX_IF_020_RevisedBG(id, nowDateTime);
            //            }
            //            break;

            //        case "dim":
            //            if (budgetType == annual || budgetType == midyear)
            //            {
            //            }
            //            else if (budgetType == contin)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //            }
            //            else if (budgetType == transfer)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //            }
            //            else if (budgetType == usepool)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //                await CAPEX_IF_020_RevisedBG(id, nowDateTime);
            //            }
            //            break;

            //        case "pim":
            //            if (budgetType == annual || budgetType == midyear)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //                await CAPEX_IF_020_RevisedBG(id, nowDateTime);
            //            }
            //            else if (budgetType == contin)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //            }
            //            else if (budgetType == transfer)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //            }
            //            else if (budgetType == usepool)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //                await CAPEX_IF_020_RevisedBG(id, nowDateTime);
            //            }
            //            break;

            //        case "cim":
            //            if (budgetType == annual || budgetType == midyear)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //                await CAPEX_IF_020_RevisedBG(id, nowDateTime);
            //            }
            //            else if (budgetType == contin)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //            }
            //            else if (budgetType == transfer)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //            }
            //            else if (budgetType == usepool)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //                await CAPEX_IF_020_RevisedBG(id, nowDateTime);
            //            }
            //            break;

            //        case "directcapex":
            //            if (budgetType == annual || budgetType == midyear)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //                await CAPEX_IF_020_RevisedBG(id, nowDateTime);
            //            }
            //            else if (budgetType == contin)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //            }
            //            else if (budgetType == transfer)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //            }
            //            else if (budgetType == usepool)
            //            {
            //                //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                //await IF_WBS(id, nowDateTime);
            //                //await IF_DAT(id, nowDateTime);
            //                //await IF_POC(id, nowDateTime);
            //                //await IF_PLA(id, nowDateTime);
            //                await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                await SendWBSRequest(id, nowDateTime, initiative.CreateType);
            //                await CAPEX_IF_020_RevisedBG(id, nowDateTime);
            //            }
            //            break;

            //        case "request pool":
            //            switch (initiative.PoolType.ToLower())
            //            {
            //                case "er":
            //                    await SendAppRequest(id, nowDateTime, initiative.CreateType);
            //                    await CreteToProgressHeader(id);
            //                    //await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
            //                    //await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
            //                    //await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
            //                    //await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
            //                    await CAPEX_IF_020_RevisedBG(id, nowDateTime);
            //                    break;
            //                case "digital capex":
            //                    //do nothing
            //                    break;
            //                case "it capex":
            //                    //do nothing
            //                    break;
            //                case "pim":
            //                    //do nothing
            //                    break;
            //                case "max":
            //                    //do nothing
            //                    break;
            //                case "mtpi":
            //                    //do nothing
            //                    break;
            //                default:
            //                    //do nothing
            //                    break;
            //            }
            //            break;

            //    }
            //}

            return 0;
        }

        public async Task<int> SendAppRequest(int id, DateTime nowDateTime, int? createType)
        {
            //createType = 0 , 1 , 2   ::     0 = send email request APP and WBS /  1 = send email request WBS Only AND Send App Request From Backend!  / 2 = No Send Email  Create App Request and WBS From BackEnd!!
            var initiative = await _context.Initiatives.Where(i => i.Id == id).FirstOrDefaultAsync();

            if (initiative.IsCreatedApp == true)
                return 0;

            switch (createType)
            {
                case null:
                    await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                    await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                    await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                    await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                    initiative.IsCreatedApp = true;
                    break;

                case 0:
                    await CallMicrosoftFlow(id, "APP", "Mail_APP_WBS");
                    break;

                case 1:
                    await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                    await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                    await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                    await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                    initiative.IsCreatedApp = true;
                    break;

                case 2:
                    await CAPEX_IF_001_SAPIM_CP(id, nowDateTime);
                    await CAPEX_IF_001_SAPIM_General(id, nowDateTime);
                    await CAPEX_IF_001_SAPIM_Monthly(id, nowDateTime);
                    await CAPEX_IF_001_SAPIM_Yearly(id, nowDateTime);
                    initiative.IsCreatedApp = true;
                    break;
            }

            return await _context.SaveChangesAsync();
        }

        public async Task<int> SendWBSRequest(int id, DateTime nowDateTime, int? createType)
        {
            //createType = 0 , 1 , 2   ::     0 = send email request APP and WBS /  1 = send email request WBS Only AND Send App Request From Backend!  / 2 = No Send Email  Create App Request and WBS From BackEnd!!
            var initiative = await _context.Initiatives.Where(i => i.Id == id).FirstOrDefaultAsync();
            if (initiative.IsCreatedWbs == true)
                return 0;

            switch (createType)
            {
                case null:
                    await IF_WBS(id, nowDateTime);
                    await IF_DAT(id, nowDateTime);
                    await IF_POC(id, nowDateTime);
                    await IF_PLA(id, nowDateTime);
                    initiative.IsCreatedWbs = true;
                    break;

                case 0:
                    //send mail
                    await CallMicrosoftFlow(id, "WBS", "Mail_APP_WBS");
                    break;

                case 1:
                    //send mail
                    await CallMicrosoftFlow(id, "WBS", "Mail_APP_WBS");
                    break;

                case 2:
                    await IF_WBS(id, nowDateTime);
                    await IF_DAT(id, nowDateTime);
                    await IF_POC(id, nowDateTime);
                    await IF_PLA(id, nowDateTime);
                    initiative.IsCreatedWbs = true;
                    break;
            }

            return await _context.SaveChangesAsync();
        }

        public async Task<string> GetCapexBudgetType(CapexInformations capexsInformations)
        {
            if (capexsInformations.BudgetPeriod.ToLower() == "current year")
            {
                return await Task.FromResult(capexsInformations.BetweenYear.ToLower());
            }
            else
            {
                return await Task.FromResult(capexsInformations.BudgetPeriod.ToLower());
            }
        }

        public async Task<bool> CAPEX_IF_020_RevisedBG(int initiativeId, DateTime nowDateTIme)
        {
            try
            {
                await InsertInitiativeIdToTempTable(initiativeId, "IF020");

                //startDateTime input only date  no need time !!!   eg.  '2020-06-29'
                DataTable datatable = await _storeProcedure.ExecuteReturnDatatable($"sp_IF_RevisedBG '{nowDateTIme.ToString("yyyy-MM-dd")}'");

                if (datatable.Rows.Count == 0) return false;

                string fileName = "IM-CPO-File4-RevisedBG-" + nowDateTIme.ToString("ddMMyyyy") + ".txt";

                string myTableAsString = String.Join("\t", datatable.Columns.Cast<DataColumn>().
                                            Select(r => r.ColumnName).ToArray());

                myTableAsString += "\n";

                myTableAsString +=
                                        String.Join(Environment.NewLine, datatable.Rows.Cast<DataRow>().
                                            Select(r => r.ItemArray).ToArray().
                                            Select(x => String.Join("\t", x)));



                byte[] bytes = null;
                using (var ms = new MemoryStream())
                {
                    TextWriter tw = new StreamWriter(ms, Encoding.UTF8);

                    await tw.WriteAsync(myTableAsString);

                    await tw.FlushAsync();
                    ms.Position = 0;
                    bytes = ms.ToArray();
                    await ms.FlushAsync();

                }

                var _entityDelete = await _context.OutgoingFile.Where(i => i.FileName == fileName).ToListAsync();

                foreach (var entity in _entityDelete)
                {
                    _context.OutgoingFile.Remove(entity);
                }

                _context.OutgoingFile.Add(new OutgoingFile
                {
                    FileName = fileName,
                    DirectoryPath = "REVISEDBG",
                    Data = bytes,
                    CreateDate = nowDateTIme,
                    CreateUser = "FRONTIS",
                    UpdateDate = nowDateTIme,
                    UpdateUser = "FRONTIS"

                });

                var capexInformation = _context.CapexInformations.Where(x => x.InitiativeId == initiativeId).OrderByDescending(x => x.Revistion).FirstOrDefault();
                if(capexInformation != null)
                {
                    capexInformation.ReviseBgDate = nowDateTIme;
                }
            }
            catch (Exception ex)
            {

            }

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<string> SendRequestWithXML(string xapikey, string endPointURL, string XMLcontent)
        {
            var stringContent = new StringContent(XMLcontent, Encoding.UTF8, "text/xml");

            var client = _clientFactory.CreateClient();

            stringContent.Headers.Add("x-api-key", xapikey);

            var response = await client.PostAsync(endPointURL, stringContent);

            return await response.Content.ReadAsStringAsync();
        }

        public async Task CallMicrosoftFlow(int id, string action, string URLType)
        {
            string urlFlow = "";
            var iniType = await _context.Initiatives.Where(i => i.Id == id).FirstOrDefaultAsync();
            var context_url = await _context.URLTables.Where(i => i.URLType == URLType).ToListAsync();
            if (context_url.Any()) urlFlow = context_url.FirstOrDefault().URL;

            if (urlFlow != "")
            {

                var stringContent = new StringContent("[" + JsonConvert.SerializeObject(
                  new
                  {
                      INIID = id.ToString(),
                      ACTION = action,
                      INITYPE = iniType.InitiativeType,
                  }
              ) + "]", Encoding.UTF8, "application/json");

                var client = _clientFactory.CreateClient();

                var response = await client.PostAsync(urlFlow, stringContent);

            }
        }

        public async Task<string> ActulaPOCPercentUpdateToSAP(int InitiativeId, DateTime date, int diffDays = 10)
        {
            //Add Diff Date
            date = date.AddDays(diffDays * (-1));
            ProgressHeader progressHeader;
            List<ProgressPlan> progressPlans;
            List<ProgressPlanDate> ppD;
            InterfaceActionLog logData;
            string strBody = "";
            int sucessCount = 0;
            int callCount = 0;
            int skipCount = 0;
            List<string> errorMessages = new List<string>();
            progressHeader = await _context.ProgressHeader.Where(x => x.InitiativeId == InitiativeId).FirstOrDefaultAsync();
            progressPlans = await _context.ProgressPlan.Where(x => x.InitiativeId == InitiativeId && x.PlanActual.ToUpper().Equals("ACTUAL")
                               && x.Year == date.Year + "" && !x.ProgressPlanType.Replace(" ", string.Empty).ToUpper().Equals("OVERALL")).ToListAsync();
            ppD = await _context.ProgressPlanDate.Where(x => x.InitiativeId == InitiativeId).ToListAsync();

            if (progressHeader != null && progressPlans != null)
            {

                if (!string.IsNullOrEmpty(progressHeader.WbsNo))
                {
                    if (progressPlans.Count <= 0)
                    {
                        logData = new InterfaceActionLog()
                        {
                            InitiativeId = InitiativeId,
                            ActionDate = DateTime.Now,
                            InterfaceType = "ActulaPOCPercentUpdateToSAP2",
                            InterfaceAction = "progressPlan.Count",
                            ResponseData = "Progress Plan = 0"
                        };
                        await _context.InterfaceActionLog.AddAsync(logData);
                        await _context.SaveChangesAsync();
                        return "Progress Plan = 0";
                    }
                    try
                    {
                        //if EPCC then Add Overall Start Date
                        if (progressPlans.Count(o => o.ProgressPlanType.Equals("-")) == 0)
                        {
                            progressPlans.Add(new ProgressPlan
                            {
                                InitiativeId = progressPlans[0].InitiativeId,
                                PlanActual = progressPlans[0].PlanActual,
                                ProgressPlanType = "-",
                                ProgressPlanId = -1
                            });
                        }

                        HttpResponseMessage response = null;
                        foreach (ProgressPlan progressPlan in progressPlans)
                        {
                            string checkType_ppD = progressPlan.ProgressPlanType == "-" ? "OVERALL" : progressPlan.ProgressPlanType.Replace(" ", string.Empty).ToUpper();
                            callCount++;
                            if ((progressPlan.ProgressPlanId != -1 ||
                                (progressPlan.ProgressPlanId == -1 &&
                                 (skipCount+1) == callCount)) &&
                                progressPlan.GetByMonth(date.Month) == null ||
                                progressPlan.GetByMonth(date.Month) == 0)
                            {
                                skipCount++;
                                continue;
                            }

                            if (!HasActualStartDate(ppD.Where(x => x.ProgressPlanDateType.Replace(" ", string.Empty).ToUpper().Equals(checkType_ppD)).FirstOrDefault()))
                            {
                                logData = new InterfaceActionLog()
                                {
                                    InitiativeId = InitiativeId,
                                    ActionDate = DateTime.Now,
                                    InterfaceType = "ActulaPOCPercentUpdateToSAP2",
                                    InterfaceAction = "Check Actual Start Date",
                                    ResponseData = checkType_ppD.Replace(" ", string.Empty).ToUpper() + ": Actual start date not found!!!"
                                };
                                await _context.InterfaceActionLog.AddAsync(logData);
                                await _context.SaveChangesAsync();

                                return checkType_ppD.Replace(" ", string.Empty).ToUpper() + ": Actual start date not found!!!";
                            }

                            if (progressPlan.ProgressPlanId != -1 && !IsMorethanBefore(progressPlan,
                                ppD.Where(x => x.ProgressPlanDateType.Replace(" ", string.Empty).ToUpper().Equals(checkType_ppD)).FirstOrDefault(), date, 0))
                            {
                                logData = new InterfaceActionLog()
                                {
                                    InitiativeId = InitiativeId,
                                    ActionDate = DateTime.Now,
                                    InterfaceType = "ActulaPOCPercentUpdateToSAP2",
                                    InterfaceAction = "Check More Than Before",
                                    ResponseData = checkType_ppD.Replace(" ", string.Empty).ToUpper() + ": Actual POC less than previous peroid!!!"
                                };
                                await _context.InterfaceActionLog.AddAsync(logData);
                                await _context.SaveChangesAsync();
                                return checkType_ppD.Replace(" ", string.Empty).ToUpper() + ": Actual POC less than previous peroid!!!";
                            }


                            string changeWBS;
                            switch (checkType_ppD.Replace(" ", string.Empty).ToUpper())
                            {
                                case "ENGINEERING":
                                    changeWBS = progressHeader.WbsNo + "-W";
                                    break;
                                case "PROCUREMENT":
                                    changeWBS = progressHeader.WbsNo + "-X";
                                    break;
                                case "CONSTRUCTION":
                                    changeWBS = progressHeader.WbsNo + "-Y";
                                    break;
                                case "COMMISSIONING":
                                    changeWBS = progressHeader.WbsNo + "-Z";
                                    break;
                                default:
                                    changeWBS = progressHeader.WbsNo;
                                    break;
                            }

                            string body = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:urn=\"urn:sap-com:document:sap:rfc:functions\">";
                            body += "<soapenv:Header/>";
                            body += "<soapenv:Body>";
                            body += "<urn:ZPS_E022B>\r\n";
                            body += "   <P_ASDATE>" + ppD.Where(x => x.ProgressPlanDateType.ToUpper().Equals(checkType_ppD)).Select(x => DateTime.Parse(x.ActualStartDate.ToString()).ToString("yyyy-MM-dd")).FirstOrDefault() + "</P_ASDATE>\r\n";
                            body += "   <P_PA>" + "A" + "</P_PA>\r\n";
                            body += $"   <P_PERI{string.Format("{0:00}", date.Month)}>"
                                + string.Format("{0:0.##}", progressPlan.ProgressPlanId != -1 ? progressPlan.GetByMonth(date.Month) : 0)
                                + $"</P_PERI{string.Format("{0:00}", date.Month)}>\r\n";
                            body += "   <P_WPSPID>" + changeWBS + "</P_WPSPID>\r\n";
                            body += "   <P_YEAR>" + progressPlan.Year + "</P_YEAR>\r\n";
                            body += "</urn:ZPS_E022B>";
                            body += "</soapenv:Body>";
                            body += "</soapenv:Envelope>";
                            string errorMessage;
                            HttpClient client = _clientFactory.CreateClient("SAP");
                            var stringContent = new StringContent(body, Encoding.UTF8, "text/xml");
                            stringContent.Headers.Add("x-api-key", _sapInterface.Value.ActualPOCPercentUpdate_ApiKey);
                            string responseReturn = "";
                            response = await client.PostAsync(_sapInterface.Value.ActualPOCPercentUpdate, stringContent);
                            strBody += body + "\r\n";
                            responseReturn = await response.Content.ReadAsStringAsync() + "\r\n" + body;
                            if (IsSucess(responseReturn, out errorMessage))
                                sucessCount++;
                            else
                                errorMessages.Add(checkType_ppD.Replace(" ", string.Empty).ToUpper() + ": " + errorMessage);
                            //save log
                            logData = new InterfaceActionLog()
                            {
                                InitiativeId = InitiativeId,
                                ActionDate = DateTime.Now,
                                InterfaceType = "ActulaPOCPercentUpdateToSAP2",
                                InterfaceAction = "response " + checkType_ppD,
                                ResponseData = responseReturn
                            };
                            await _context.InterfaceActionLog.AddAsync(logData);
                            await _context.SaveChangesAsync();
                        }
                        return (sucessCount + skipCount) == callCount ? callCount > 2 ? "Successful EPCC" : "Successful"
                            : string.Join(",", errorMessages);
                    }
                    catch (Exception ex)
                    {
                        //save log
                        logData = new InterfaceActionLog()
                        {
                            InitiativeId = InitiativeId,
                            ActionDate = DateTime.Now,
                            InterfaceType = "ActulaPOCPercentUpdateToSAP2",
                            InterfaceAction = "response error",
                            ResponseData = ex.Message + "---" + ex.StackTrace
                        };
                        await _context.InterfaceActionLog.AddAsync(logData);
                        await _context.SaveChangesAsync();
                        return ex.Message + "---" + ex.StackTrace;
                    }
                }
                else
                {

                    //save log
                    logData = new InterfaceActionLog()
                    {
                        InitiativeId = InitiativeId,
                        ActionDate = DateTime.Now,
                        InterfaceType = "ActulaPOCPercentUpdateToSAP2",
                        InterfaceAction = "check WBS",
                        ResponseData = "WBS not Found!"
                    };
                    await _context.InterfaceActionLog.AddAsync(logData);
                    await _context.SaveChangesAsync();
                    return "WBS not Found!";
                }
            }
            else
            {
                //save log
                logData = new InterfaceActionLog()
                {
                    InitiativeId = InitiativeId,
                    ActionDate = DateTime.Now,
                    InterfaceType = "ActulaPOCPercentUpdateToSAP2",
                    InterfaceAction = "check Progress Plan",
                    ResponseData = "Progress Plan not Found!"
                };
                await _context.InterfaceActionLog.AddAsync(logData);
                await _context.SaveChangesAsync();
                return "Progress Plan not Found!";
            }
        }

        public async Task<string> ProjectManagerUpdateToSAP(int InitiativeId)
        {
            //InitiativeId = 101;
            ProgressHeader progressHeader = await _context.ProgressHeader.Where(x => x.InitiativeId == InitiativeId).FirstOrDefaultAsync();
            DetailInformation_Old detailInformation = await _context.DetailInformations.Where(x => x.InitiativeId == InitiativeId).FirstOrDefaultAsync();
            Owner owner = null;
            if (detailInformation != null)
                owner = await _context.Owners.Where(x => x.OwnerName.Equals(detailInformation.ProjectEngineer)).FirstOrDefaultAsync();

            DataTable datatable = new DataTable();

            if (owner == null)
            {
                //save log
                InterfaceActionLog logData = new InterfaceActionLog()
                {
                    InitiativeId = InitiativeId,
                    ActionDate = DateTime.Now,
                    InterfaceType = "ProjectManagerUpdate",
                    InterfaceAction = "find Project Manager",
                    ResponseData = "Project Manager Not Found (1)"
                };
                await _context.InterfaceActionLog.AddAsync(logData);
                await _context.SaveChangesAsync();
                return "Project Engineer Not Found";
            }

            string body = "";

            if (progressHeader != null)
            {
                if (!string.IsNullOrEmpty(progressHeader.WbsNo))
                {
                    try
                    {
                        body = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:urn=\"urn:sap-com:document:sap:rfc:functions\">";
                        body += "<soapenv:Header/>";
                        body += "<soapenv:Body>";
                        body += "<urn:ZPS_E025>\r\n";
                        body += "   <IV_APPROPRIATION_REQ></IV_APPROPRIATION_REQ>\r\n";
                        body += "   <IV_BUDGET_PROFILE></IV_BUDGET_PROFILE>\r\n";
                        body += "   <IV_PROJECT_MNG>" + owner.EmployeeID + "</IV_PROJECT_MNG>\r\n";  // sp_IF_WBS
                        body += "   <IV_WMS_ELEMENT>" + progressHeader.WbsNo + "</IV_WMS_ELEMENT>\r\n";  // progressHeader
                        body += "</urn:ZPS_E025>";
                        body += "</soapenv:Body>";
                        body += "</soapenv:Envelope>";

                        var client = _clientFactory.CreateClient("SAP");

                        var stringContent = new StringContent(body, Encoding.UTF8, "application/xml");
                        stringContent.Headers.Add("x-api-key", _sapInterface.Value.ProjectManagerUpdate_ApiKey);  //"aa39fd8e-bda4-4ec6-9055-116e2114e4be"
                        var response = await client.PostAsync(_sapInterface.Value.ProjectManagerUpdate, stringContent);  //"https://apiportal-dev.pttgcgroup.com:8082/GCinit/ProjectManagerUpdate"


                        var responseReturn = await response.Content.ReadAsStringAsync() + "\r\n" + body;
                        //save log
                        InterfaceActionLog logData = new InterfaceActionLog()
                        {
                            InitiativeId = InitiativeId,
                            ActionDate = DateTime.Now,
                            InterfaceType = "ProjectManagerUpdate",
                            InterfaceAction = "response",
                            ResponseData = responseReturn
                        };
                        await _context.InterfaceActionLog.AddAsync(logData);
                        await _context.SaveChangesAsync();
                        return IsSucess(responseReturn, out string error) ? "Successful" : error;
                    }
                    catch (Exception ex)
                    {
                        //save log
                        InterfaceActionLog logData = new InterfaceActionLog()
                        {
                            InitiativeId = InitiativeId,
                            ActionDate = DateTime.Now,
                            InterfaceType = "ProjectManagerUpdate",
                            InterfaceAction = "response error",
                            ResponseData = ex.Message + "---" + ex.StackTrace
                        };
                        await _context.InterfaceActionLog.AddAsync(logData);
                        await _context.SaveChangesAsync();
                        return ex.Message + "---" + ex.StackTrace;
                    }

                }
                else
                {
                    //save log
                    InterfaceActionLog logData = new InterfaceActionLog()
                    {
                        InitiativeId = InitiativeId,
                        ActionDate = DateTime.Now,
                        InterfaceType = "ProjectManagerUpdate",
                        InterfaceAction = "check WBS",
                        ResponseData = "WBS not Found!"
                    };
                    await _context.InterfaceActionLog.AddAsync(logData);
                    await _context.SaveChangesAsync();
                    return "WBS not Found!";
                }
            }
            else
            {
                //save log
                InterfaceActionLog logData = new InterfaceActionLog()
                {
                    InitiativeId = InitiativeId,
                    ActionDate = DateTime.Now,
                    InterfaceType = "ProjectManagerUpdate",
                    InterfaceAction = "check Header",
                    ResponseData = "Header not Found!"
                };
                await _context.InterfaceActionLog.AddAsync(logData);
                await _context.SaveChangesAsync();
                return "Header not Found!";
            }
        }

        public async Task<string> ProgressOfCompletionFromSAP(int InitiativeId, int diffDays = 10)
        {
            DateTime date = DateTime.Now.AddDays(diffDays * (-1));
            ProgressHeader progressHeader = await _context.ProgressHeader.Where(x => x.InitiativeId == InitiativeId).FirstOrDefaultAsync();
            ProgressPlan overAllPlan = await _context.ProgressPlan.Where(x => x.InitiativeId == InitiativeId
                && x.Year.Equals(date.Year.ToString())
                && x.ProgressPlanType.Replace(" ", string.Empty).ToUpper().Equals("OVERALL")
                && x.PlanActual.Replace(" ", string.Empty).ToUpper().Equals("PLAN")).FirstOrDefaultAsync();
            ProgressPlan overAllActual = await _context.ProgressPlan.Where(x => x.InitiativeId == InitiativeId
                && x.Year.Equals(date.Year.ToString())
                && x.ProgressPlanType.Replace(" ", string.Empty).ToUpper().Equals("OVERALL")
                && x.PlanActual.Replace(" ", string.Empty).ToUpper().Equals("ACTUAL")).FirstOrDefaultAsync();

            string body = "";
            if (progressHeader != null)
            {
                if (!string.IsNullOrEmpty(progressHeader.WbsNo))
                {
                    try
                    {
                        body = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:urn=\"urn:sap-com:document:sap:rfc:functions\">";
                        body += "<soapenv:Header/>";
                        body += "<soapenv:Body>";
                        body += "<urn:ZPS_I002>\r\n";
                        body += "   <FROM_PERIOD>" + "001" + "</FROM_PERIOD>\r\n";
                        body += "   <FROM_YEAR>" + date.Year + "</FROM_YEAR>\r\n";  // ปีปัจจุบัน
                        body += "   <PROGRESS_VERSION>" + "100" + "</PROGRESS_VERSION>\r\n";  // 100 เสมอ
                        body += "   <PROJECTDEFINITION>" + progressHeader.WbsNo + "</PROJECTDEFINITION>\r\n";
                        body += "   <TO_PERIOD>" + "012" + "</TO_PERIOD>\r\n";
                        body += "   <TO_YEAR>" + date.Year + "</TO_YEAR>\r\n";  // ปีปัจจุบัน
                        body += "</urn:ZPS_I002>";
                        body += "</soapenv:Body>";
                        body += "</soapenv:Envelope>";

                        var client = _clientFactory.CreateClient("SAP");
                        var stringContent = new StringContent(body, Encoding.UTF8, "text/xml");
                        stringContent.Headers.Add("x-api-key", _sapInterface.Value.ProgressOfCompletion_ApiKey);  //"4f8ff1fc-0258-4a76-b194-179eda6cd01f"
                        var response = await client.PostAsync(_sapInterface.Value.ProgressOfCompletion, stringContent);  //"https://apiportal-dev.pttgcgroup.com:8082/GCInit/ProgressOfCompletion"
                        string xmlString = response.Content.ReadAsStringAsync().Result;

                        XDocument doc = XDocument.Parse(xmlString);
                        XNamespace ns = doc.Root.GetDefaultNamespace();

                        var WBS_AGG_NONAGGR_COMPLETIONPER = doc.Descendants().Where(x => x.Name.LocalName == "WBS_AGG_NONAGGR_COMPLETIONPER").ToList();

                        if (WBS_AGG_NONAGGR_COMPLETIONPER.Count == 0)
                        {
                            InterfaceActionLog logDataNoAaa = new InterfaceActionLog()
                            {
                                InitiativeId = InitiativeId,
                                ActionDate = DateTime.Now,
                                InterfaceType = "ProgressOfCompletionFromSAP",
                                InterfaceAction = "response",
                                ResponseData = "Not Have Data is WBS_AGG_NONAGGR_COMPLETIONPER Tag"
                            };
                            await _context.InterfaceActionLog.AddAsync(logDataNoAaa);
                            await _context.SaveChangesAsync();
                            return "Not Have Data is WBS_AGG_NONAGGR_COMPLETIONPER Tag";
                        }


                        SoapResponse[] returnRes = WBS_AGG_NONAGGR_COMPLETIONPER.Descendants().Where(x => x.Name.LocalName == "item").Select(x => new SoapResponse()
                        {
                            PERIOD = (string)x.Element(x.Name.Namespace + "PERIOD"),
                            PLAN_POC = (decimal?)x.Element(x.Name.Namespace + "PLAN_POC"),
                            ACTUAL_POC = (decimal?)x.Element(x.Name.Namespace + "ACTUAL_POC")
                        }).ToArray();

                        if (overAllPlan != null)
                        {
                            overAllPlan.Jan = returnRes.Where(x => x.PERIOD == "001").Count() == 0 ? null : returnRes.Where(x => x.PERIOD == "001").Select(x => x.PLAN_POC).FirstOrDefault();
                            overAllPlan.Feb = returnRes.Where(x => x.PERIOD == "002").Count() == 0 ? null : returnRes.Where(x => x.PERIOD == "002").Select(x => x.PLAN_POC).FirstOrDefault();
                            overAllPlan.Mar = returnRes.Where(x => x.PERIOD == "003").Count() == 0 ? null : returnRes.Where(x => x.PERIOD == "003").Select(x => x.PLAN_POC).FirstOrDefault();
                            overAllPlan.Apr = returnRes.Where(x => x.PERIOD == "004").Count() == 0 ? null : returnRes.Where(x => x.PERIOD == "004").Select(x => x.PLAN_POC).FirstOrDefault();
                            overAllPlan.May = returnRes.Where(x => x.PERIOD == "005").Count() == 0 ? null : returnRes.Where(x => x.PERIOD == "005").Select(x => x.PLAN_POC).FirstOrDefault();
                            overAllPlan.Jun = returnRes.Where(x => x.PERIOD == "006").Count() == 0 ? null : returnRes.Where(x => x.PERIOD == "006").Select(x => x.PLAN_POC).FirstOrDefault();
                            overAllPlan.Jul = returnRes.Where(x => x.PERIOD == "007").Count() == 0 ? null : returnRes.Where(x => x.PERIOD == "007").Select(x => x.PLAN_POC).FirstOrDefault();
                            overAllPlan.Aug = returnRes.Where(x => x.PERIOD == "008").Count() == 0 ? null : returnRes.Where(x => x.PERIOD == "008").Select(x => x.PLAN_POC).FirstOrDefault();
                            overAllPlan.Sep = returnRes.Where(x => x.PERIOD == "009").Count() == 0 ? null : returnRes.Where(x => x.PERIOD == "009").Select(x => x.PLAN_POC).FirstOrDefault();
                            overAllPlan.Oct = returnRes.Where(x => x.PERIOD == "010").Count() == 0 ? null : returnRes.Where(x => x.PERIOD == "010").Select(x => x.PLAN_POC).FirstOrDefault();
                            overAllPlan.Nov = returnRes.Where(x => x.PERIOD == "011").Count() == 0 ? null : returnRes.Where(x => x.PERIOD == "011").Select(x => x.PLAN_POC).FirstOrDefault();
                            overAllPlan.Dec = returnRes.Where(x => x.PERIOD == "012").Count() == 0 ? null : returnRes.Where(x => x.PERIOD == "012").Select(x => x.PLAN_POC).FirstOrDefault();

                            overAllActual.Jan = returnRes.Where(x => x.PERIOD == "001").Count() == 0 ? null : returnRes.Where(x => x.PERIOD == "001").Select(x => x.ACTUAL_POC).FirstOrDefault();
                            overAllActual.Feb = returnRes.Where(x => x.PERIOD == "002").Count() == 0 || (returnRes.Where(x => x.PERIOD == "002").Count() != 0 && date.Date.Month < 2)
                                ? null : returnRes.Where(x => x.PERIOD == "002").Select(x => x.ACTUAL_POC).FirstOrDefault();
                            overAllActual.Mar = returnRes.Where(x => x.PERIOD == "003").Count() == 0 || (returnRes.Where(x => x.PERIOD == "003").Count() != 0 && date.Date.Month < 3)
                                ? null : returnRes.Where(x => x.PERIOD == "003").Select(x => x.ACTUAL_POC).FirstOrDefault();
                            overAllActual.Apr = returnRes.Where(x => x.PERIOD == "004").Count() == 0 || (returnRes.Where(x => x.PERIOD == "004").Count() != 0 && date.Date.Month < 4)
                                ? null : returnRes.Where(x => x.PERIOD == "004").Select(x => x.ACTUAL_POC).FirstOrDefault();
                            overAllActual.May = returnRes.Where(x => x.PERIOD == "005").Count() == 0 || (returnRes.Where(x => x.PERIOD == "005").Count() != 0 && date.Date.Month < 5)
                                ? null : returnRes.Where(x => x.PERIOD == "005").Select(x => x.ACTUAL_POC).FirstOrDefault();
                            overAllActual.Jun = returnRes.Where(x => x.PERIOD == "006").Count() == 0 || (returnRes.Where(x => x.PERIOD == "006").Count() != 0 && date.Date.Month < 6)
                                ? null : returnRes.Where(x => x.PERIOD == "006").Select(x => x.ACTUAL_POC).FirstOrDefault();
                            overAllActual.Jul = returnRes.Where(x => x.PERIOD == "007").Count() == 0 || (returnRes.Where(x => x.PERIOD == "007").Count() != 0 && date.Date.Month < 7)
                                ? null : returnRes.Where(x => x.PERIOD == "007").Select(x => x.ACTUAL_POC).FirstOrDefault();
                            overAllActual.Aug = returnRes.Where(x => x.PERIOD == "008").Count() == 0 || (returnRes.Where(x => x.PERIOD == "008").Count() != 0 && date.Date.Month < 8)
                                ? null : returnRes.Where(x => x.PERIOD == "008").Select(x => x.ACTUAL_POC).FirstOrDefault();
                            overAllActual.Sep = returnRes.Where(x => x.PERIOD == "009").Count() == 0 || (returnRes.Where(x => x.PERIOD == "009").Count() != 0 && date.Date.Month < 9)
                                ? null : returnRes.Where(x => x.PERIOD == "009").Select(x => x.ACTUAL_POC).FirstOrDefault();
                            overAllActual.Oct = returnRes.Where(x => x.PERIOD == "010").Count() == 0 || (returnRes.Where(x => x.PERIOD == "010").Count() != 0 && date.Date.Month < 10)
                                ? null : returnRes.Where(x => x.PERIOD == "010").Select(x => x.ACTUAL_POC).FirstOrDefault();
                            overAllActual.Nov = returnRes.Where(x => x.PERIOD == "011").Count() == 0 || (returnRes.Where(x => x.PERIOD == "011").Count() != 0 && date.Date.Month < 11)
                                ? null : returnRes.Where(x => x.PERIOD == "011").Select(x => x.ACTUAL_POC).FirstOrDefault();
                            overAllActual.Dec = returnRes.Where(x => x.PERIOD == "012").Count() == 0 || (returnRes.Where(x => x.PERIOD == "012").Count() != 0 && date.Date.Month < 12)
                                ? null : returnRes.Where(x => x.PERIOD == "012").Select(x => x.ACTUAL_POC).FirstOrDefault();
                            _context.SaveChanges();
                        }

                        //return new JsonStringResult returnRes.ToString;
                        var responseReturn = await response.Content.ReadAsStringAsync() + "\r\n" + body;
                        //save log
                        InterfaceActionLog logData = new InterfaceActionLog()
                        {
                            InitiativeId = InitiativeId,
                            ActionDate = DateTime.Now,
                            InterfaceType = "ProgressOfCompletionFromSAP",
                            InterfaceAction = "response",
                            ResponseData = responseReturn
                        };
                        await _context.InterfaceActionLog.AddAsync(logData);
                        await _context.SaveChangesAsync();
                        return "Successful";
                    }
                    catch (Exception ex)
                    {
                        //save log
                        InterfaceActionLog logData = new InterfaceActionLog()
                        {
                            InitiativeId = InitiativeId,
                            ActionDate = DateTime.Now,
                            InterfaceType = "ProgressOfCompletionFromSAP",
                            InterfaceAction = "response error",
                            ResponseData = ex.Message + "---" + ex.StackTrace
                        };
                        await _context.InterfaceActionLog.AddAsync(logData);
                        await _context.SaveChangesAsync();
                        return ex.Message + "---" + ex.StackTrace;
                    }

                }
                else
                {
                    //save log
                    InterfaceActionLog logData = new InterfaceActionLog()
                    {
                        InitiativeId = InitiativeId,
                        ActionDate = DateTime.Now,
                        InterfaceType = "ProgressOfCompletionFromSAP",
                        InterfaceAction = "check WBS",
                        ResponseData = "WBS not Found!"
                    };
                    await _context.InterfaceActionLog.AddAsync(logData);
                    await _context.SaveChangesAsync();
                    return "WBS not Found!";
                }
            }
            else
            {
                //save log
                InterfaceActionLog logData = new InterfaceActionLog()
                {
                    InitiativeId = InitiativeId,
                    ActionDate = DateTime.Now,
                    InterfaceType = "ProgressOfCompletionFromSAP",
                    InterfaceAction = "check Header",
                    ResponseData = "Header not Found!"
                };
                await _context.InterfaceActionLog.AddAsync(logData);
                await _context.SaveChangesAsync();
                return "Header not Found!";
            }
        }

        public async Task<int> GetInitiativeIdFromPaddingInitiativeCode(string initiativeCode)
        {
            if (initiativeCode != null && initiativeCode.Length > 11)
            {
                initiativeCode = initiativeCode.Substring(initiativeCode.Length - 11);
            }

            var initiative = await _context.Initiatives.Where(i => i.InitiativeCode == initiativeCode && (i.HistoryFlag == null || i.HistoryFlag == 0)).OrderByDescending(i => i.Id).FirstOrDefaultAsync();

            ////-- new ถ้า InitiativeCode หาไม่เจอเพราะไม่ถึง 11 หลัก
            if (initiative == null)
            {
                int ii = 0;
                while (ii <= 4)
                {
                    var initiativeLoop = await _context.Initiatives.Where(i => i.InitiativeCode == initiativeCode.Substring(ii)
                    && (i.HistoryFlag == null || i.HistoryFlag == 0)).OrderByDescending(i => i.Id).FirstOrDefaultAsync();
                    ii++;
                    if (initiativeLoop != null)
                    {
                        return initiativeLoop.Id;
                    }
                }
            }

            if (initiative == null)
            {
                return 0;
            }

            return initiative.Id;
        }

        public async Task<int> SendAppRequestList(DateTime nowDateTime)
        {
            var initiativeIdList = await _context.TmpInitiativeIdAppLists.Where(i => i.Mark == null).ToListAsync();

            foreach (var entity in initiativeIdList)
            {
                try
                {
                    await SendAppRequest(entity.InitiativeId, nowDateTime, null);
                    entity.Mark = "X";
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {

                }
            }

            return await Task.FromResult(initiativeIdList.Count);
        }

        public async Task<int> SendWBSRequestList(DateTime nowDateTime)
        {
            var initiativeIdList = await _context.TmpInitiativeIdWBSLists.Where(i => i.Mark == null).ToListAsync();

            foreach (var entity in initiativeIdList)
            {
                try
                {
                    await SendWBSRequest(entity.InitiativeId, nowDateTime, null);
                    entity.Mark = "X";
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {

                }
            }

            return await Task.FromResult(initiativeIdList.Count);
        }

        public async Task<bool> ValidateWBSRequest(int id)
        {
            bool isPass = false;

            try
            {
                DataTable dt = await _storeProcedure.ExecuteReturnDatatable($"sp_Validate_Data_for_WBS {id}");
                if (dt.Rows.Count <= 0)
                {
                    isPass = false;
                }
                else
                {
                    isPass = bool.Parse(dt.Rows[0][0] == null ? "false" : dt.Rows[0][0].ToString());
                }
            }
            catch
            {
                return await Task.FromResult(false);
            }



            return await Task.FromResult(isPass);
        }

        public async Task<string> ChangeInitiativeCodeLongString(string initiativeCode)
        {
            string reversedString = ReverseStringDirect(initiativeCode);
            int idxOfMinus = reversedString.IndexOf("-");

            if (idxOfMinus == -1)
            {
                reversedString = reversedString.Replace("/", "-");

                return await Task.FromResult(ReverseStringDirect(reversedString));
            }

            string subStringReversed = reversedString.Substring(0, idxOfMinus);

            if (subStringReversed.Length == 5 && reversedString.Length > 15)
            {
                string stringToReplace = reversedString.Substring(0, idxOfMinus + 1);
                string stringToJoin = stringToReplace.Substring(0, subStringReversed.Length - 2) + "-";


                reversedString = reversedString.Replace(stringToReplace, stringToJoin);
            }

            reversedString = reversedString.Replace("/", "-");
            return await Task.FromResult(ReverseStringDirect(reversedString));
        }

        public static string ReverseStringDirect(string s)
        {
            char[] array = new char[s.Length];
            int forward = 0;
            for (int i = s.Length - 1; i >= 0; i--)
            {
                array[forward++] = s[i];
            }
            return new string(array);
        }

        public async Task<int> CreteToProgressHeader(int initiativeId)
        {
            if (initiativeId == 0)
            {
                return 0;
            }

            var progressHeaderDetail = await _context.ProgressHeader.Where(i => i.InitiativeId == initiativeId).FirstOrDefaultAsync();
            if (progressHeaderDetail != null)
            {
                return 0;
            }
            //create
            var ProgressHeaderInsert = new ProgressHeader()
            {
                ProgressHeaderId = 0,
                InitiativeId = initiativeId
                //AppropriationNo = null,
                //WbsNo = null,
                //StandardProjectDef = null,
                //SolomonCategory = null,
                //AreaPlant = null,
                //PhysicalBu = null,
                //PhysicalUnit = null,
                //Responsible = null,

                //Engineering = null,
                //Construction = null,
                //Procurement = null,
                //CommissioningStartup = null,
                //ProjectManagement = null,
                //RiskAndConcern = null,
                //MitigationPlan = null,
                //ExecutiveSummary = null,
                //WorkForNextMonth = null,
                //EnvironmentKpi = null
            };
            await _context.ProgressHeader.AddAsync(ProgressHeaderInsert);


            return await _context.SaveChangesAsync();
        }

        private bool IsMorethanBefore(ProgressPlan progressPlan, ProgressPlanDate progressPlanDate, DateTime date, int diffDays)
        {
            ProgressPlan progressPlanOld = null;
            date = date.AddDays(diffDays * (-1));
            DateTime startDate = progressPlanDate.ActualStartDate != null ? progressPlanDate.ActualStartDate.Value :
                progressPlanDate.BasicStartDate.Value;
            int moreThanMonths = ((date.Year - startDate.Year) * 12) + date.Month - startDate.Month;
            decimal? valueLastPrevious = null;
            for (; moreThanMonths > 0; moreThanMonths--)
            {
                if (startDate.AddMonths(moreThanMonths).Year == date.Year
                   && startDate.AddMonths(moreThanMonths).Month > 1
                   && progressPlan.GetByMonth(startDate.AddMonths(moreThanMonths).Month - 1).HasValue)
                {
                    valueLastPrevious = progressPlan.GetByMonth(startDate.AddMonths(moreThanMonths).Month - 1);
                    break;
                }
                else if (startDate.AddMonths(moreThanMonths).Year != date.Year
                    && startDate.AddMonths(moreThanMonths).Month > 1
                    && progressPlanOld != null
                    && progressPlanOld.GetByMonth(startDate.AddMonths(moreThanMonths).Month - 1).HasValue)
                {
                    valueLastPrevious = progressPlanOld.GetByMonth(startDate.AddMonths(moreThanMonths).Month - 1);
                    break;
                }
                else if (startDate.AddMonths(moreThanMonths).Month == 1)
                {
                    progressPlanOld = _context.ProgressPlan.Where(x => x.InitiativeId == progressPlan.InitiativeId
                    && x.PlanActual.Equals(progressPlan.PlanActual)
                    && x.Year == (startDate.AddMonths(moreThanMonths).Year - 1) + ""
                    && (x.ProgressPlanType.Equals(progressPlan.ProgressPlanType))).FirstOrDefault();


                    if (progressPlanOld == null)
                        break;

                    if (progressPlan.GetByMonth(startDate.AddMonths(moreThanMonths).Month - 1).HasValue)
                    {
                        valueLastPrevious = progressPlan.GetByMonth(startDate.AddMonths(moreThanMonths).Month - 1);
                        break;
                    }
                }
            }
            if (!valueLastPrevious.HasValue ||
                (valueLastPrevious.HasValue &&
                valueLastPrevious.Value <= progressPlan.GetByMonth(date.Month)))
                return true;
            else
                return false;
        }

        public bool HasActualStartDate(ProgressPlanDate progressPlanDate)
        {
            if (progressPlanDate.ActualStartDate != null)
                return true;
            else
                return false;
        }

        private bool IsSucess(string response, out string message)
        {
            List<string> messages = new List<string>();

            response = $"<Envelopes>{response}</Envelopes>";
            XmlDocument doc = new XmlDocument();
            doc.LoadXml(response);
            try
            {
                UpdatePOC update = JsonConvert.DeserializeObject<UpdatePOC>(JsonConvert.SerializeXmlNode(doc));
                foreach (Envelope envelope in update.Envelopes.Envelope)
                {
                    if (envelope.Body != null && envelope.Body.ZPS_E022B_Response != null)
                    {
                        foreach (string item in envelope.Body.ZPS_E022B_Response.EV_RETURN.item)
                        {
                            if (item.Replace(" ", string.Empty).Contains("ERROR")
                                || item.Replace(" ", string.Empty).Contains("DOSENOTEXIST"))
                            {
                                messages.Add(item);
                            }

                        }
                    }
                }
            }
            catch
            {
                if (!doc.InnerText.Replace(" ", string.Empty).ToUpper().Contains("PROGRESSVERSION100CANNOT"))
                    messages.Add(doc.InnerText);
            }
            message = string.Join(",", messages);
            return messages.Count == 0;
        }
    }

    public class SoapResponse
    {
        public string PERIOD { get; set; }
        public decimal? PLAN_POC { get; set; }
        public decimal? ACTUAL_POC { get; set; }

    }
}
