using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.Initiative;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;


namespace PTT_GC_API.Data.Repository
{
    public class PDDRepository : PDDInterface
    {
        private readonly DataContext _context;
        private readonly IHttpClientFactory _clientFactory;
        private readonly IOptions<UrlCreatePDD> _urlCreatePDD;

        public PDDRepository(DataContext context, IHttpClientFactory clientFactory, IOptions<UrlCreatePDD> urlCreatePDD)
        {
            _context = context;
            _clientFactory = clientFactory;
            _urlCreatePDD = urlCreatePDD;
        }

        public async Task<int> CreateFolderPDD(int id)
        {
            

            var siteNames = _urlCreatePDD.Value.SiteNames;
            var clientIds = _urlCreatePDD.Value.ClientIds;
            var clientSecrets = _urlCreatePDD.Value.ClientSecrets;
            var tenant_ids = _urlCreatePDD.Value.Tenant_IDS;
            var prefixs = _urlCreatePDD.Value.Prefixs;

            if (String.IsNullOrEmpty(siteNames))
                return 0;
            if (String.IsNullOrEmpty(clientIds))
                return 0;
            if (String.IsNullOrEmpty(clientSecrets))
                return 0;
            if (String.IsNullOrEmpty(tenant_ids))
                return 0;
            if (String.IsNullOrEmpty(prefixs))
                return 0;

            var structureFolder = _context.CommonData.AsQueryable();
            structureFolder = structureFolder.Where(i => i.DataType == "pddstructurefolder");
            var initiative = await _context.Initiatives.Where(i => i.Id == id).FirstOrDefaultAsync();
            var detailInfo = await _context.DetailInformations.Where(i => i.InitiativeId == id).FirstOrDefaultAsync();
            var initiativeDetail = await _context.InitiativeDetails.Where(i => i.InitiativeId == id).FirstOrDefaultAsync();
            var costCapex = GetCostCapexFromInitiative(initiative);

            //check if found link return immediately no create pdd
            if (detailInfo != null)
            {
                if (detailInfo.ProjectDocumentDatabase != null)
                {
                    return 0;
                }
            }
            
            

            switch (costCapex >= 30)
            {
                case true:
                    structureFolder = structureFolder.Where(i => i.Attribute01 == ">=");
                    break;

                case false:
                    structureFolder = structureFolder.Where(i => i.Attribute01 == "<");
                    break;

                default:
            }
            var listStructureFolder = await structureFolder.ToListAsync();
            listStructureFolder = listStructureFolder.OrderBy(i => i.Attribute03 == null ? 0 : i.Attribute03.Split("/").Count()).ToList();


            var Login_Client = new Login_Client();
            var token = Login_Client.Return_Token_Client(
                clientIds,
                clientSecrets,
                tenant_ids,
                prefixs
                );
            var Site = new Site_Client();
            var value = Site.Return_FormDigestValue(token, siteNames);


            Site.create_document_library(value, token, initiative.InitiativeCode, siteNames, initiative.Name); //mainfolder  initiative code

            //insert document link to initiative
            if(detailInfo != null)
            {
                detailInfo.ProjectDocumentDatabase = siteNames + "/" + initiative.InitiativeCode.Replace("-", "") + "/Forms/AllItems.aspx";
                await _context.SaveChangesAsync();
            }


            Site.remove_and_breakinherit_permission_all_in_lists(value, token, initiative.InitiativeCode, siteNames);

            List<string> emails = await _context.Owners.Where(i => i.OwnerName == initiative.OwnerName || i.Email == initiative.CreatedBy).Select(i => i.Email).Distinct().ToListAsync();
            
            if (detailInfo != null)
            {
                emails.AddRange(await _context.Owners.Where(i => i.OwnerName == detailInfo.ProjectDirector
                                                                 || i.OwnerName == detailInfo.ProjectManager
                                                                 || i.OwnerName == detailInfo.ProjectEngineer
                                                                 || i.OwnerName == detailInfo.ProcessEngineer
                                                                 || i.OwnerName == detailInfo.DivMgrOfProcessEngineer
                                                                 || i.OwnerName == detailInfo.Smes                                                                 
                                                                 || i.OwnerName == detailInfo.SponsorEvp
                                                                 ).Select(i => i.Email).Distinct().ToArrayAsync());
            }
            if(initiativeDetail != null)
            {
                emails.AddRange(await _context.Owners.Where(i => i.OwnerName == initiativeDetail.ProjectDirector
                                                                 || i.OwnerName == initiativeDetail.ProjectManager
                                                                 || i.OwnerName == initiativeDetail.ProjectEngineer
                                                                 || i.OwnerName == initiativeDetail.ProcessEngineer
                                                                 || i.OwnerName == initiativeDetail.MgrOfProcessEngineer
                                                                 ).Select(i => i.Email).Distinct().ToArrayAsync());
            }

            

            foreach (var email in emails)
            {
                var userId = Site.get_userId_from_email(value, token, siteNames, email == null ? "" : email.ToLower());
                if (userId != "")
                    Site.add_permission_for_lists(value, token, initiative.InitiativeCode, siteNames, userId, RoleDefId.Edit);
            }

            foreach (var entity in listStructureFolder)  //take long time
            {
                //need repalce libraryname with no "dash" 
                Site.create_folder(value, token, initiative.InitiativeCode.Replace("-", "") + "/" + entity.Attribute03, entity.Attribute02, siteNames);
            }



            //Console.WriteLine(value);
            //Site.add_file(value, token, "Eiei", "Shared Documents", "FileTest_Zaza.txt");
            //Site.delete_file(value, token, "/sites/Test/Shared Documents", "FileTest_Zaza.txt");
            //Site.create_folder(value, token, "Shared Documents", "TestFolders/test/test/test", siteName);
            //Site.delete_folder(value, token, "Shared Documents", "TestFolders");

            return 1;
        }

        public decimal GetCostCapexFromInitiative(Initiative initiative)
        {
            decimal costEstCapex = 0;
            decimal FXcurrency = 1;
            if (initiative.RequestCapex != null && initiative.RequestCapex.ToLower() == "true")
            {
                if (initiative.CostEstCapexType != null && initiative.CostEstCapexType == "USD")
                    FXcurrency = initiative.FxExchange == null ? 1 : initiative.FxExchange.Value;

                costEstCapex = (initiative.CostEstCapex == null ? 0 : initiative.CostEstCapex.Value) * FXcurrency;
            }

            return costEstCapex;
        }

        public async Task CallMicrosoftFlow_CreatePDD(int id)
        {
            string urlFlow = "";
            var iniType = await _context.Initiatives.Where(i => i.Id == id).FirstOrDefaultAsync();
            var context_url = await _context.URLTables.Where(i => i.URLType == "CreatePDD").ToListAsync();
            if (context_url.Any()) urlFlow = context_url.FirstOrDefault().URL;
            if (urlFlow != "")
            {
                var stringContent = new StringContent("" + JsonConvert.SerializeObject(
                  new
                  {
                      INIID = id
                  }
              ) + "", Encoding.UTF8, "application/json");

                var client = _clientFactory.CreateClient();

                var response = await client.PostAsync(urlFlow, stringContent);

            }
        }

        class Site
        {
            public (string, IList<RestResponseCookie>) Return_FormDigestValue(IList<RestResponseCookie> cookie, string token)
            {
                var client = new RestClient("https://frontisconsulting.sharepoint.com/sites/Test/_api/contextinfo");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Content-Type", "text/plain");
                request.AddCookie(cookie[0].Name, cookie[0].Value);
                request.AddCookie(cookie[1].Name, cookie[1].Value);
                request.AddCookie(cookie[2].Name, cookie[2].Value);
                request.AddParameter("text/plain",
                    token,
                    ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);

                string start_string = "<d:FormDigestValue>";
                int start_index = response.Content.IndexOf(start_string);
                int end_index = response.Content.IndexOf("</d:FormDigestValue>");
                start_index = start_index + start_string.Length;

                string string_digestvalue = response.Content.Substring(start_index, end_index - start_index);
                return (string_digestvalue, response.Cookies);
            }
            public (string, IList<RestResponseCookie>) Return_FormDigestValue_Client(IList<RestResponseCookie> cookie, string token)
            {
                var client = new RestClient("https://frontisconsulting.sharepoint.com/sites/Test/_api/contextinfo");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Authorization", "Bearer " + token);
                request.AddParameter("text/plain", "", ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                Console.WriteLine(response.Content);

                string start_string = "<d:FormDigestValue>";
                int start_index = response.Content.IndexOf(start_string);
                int end_index = response.Content.IndexOf("</d:FormDigestValue>");
                start_index = start_index + start_string.Length;

                string string_digestvalue = response.Content.Substring(start_index, end_index - start_index);
                return (string_digestvalue, response.Cookies);
            }
            public bool delete_file(string digestvalue, IList<RestResponseCookie> cookie, string path, string filename)
            {
                var client = new RestClient("https://frontisconsulting.sharepoint.com/sites/Test/_api/web/GetFileByServerRelativeUrl('" +
                    path + "/" + filename + "')");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Accept", "application/json;odata=verbose");
                request.AddHeader("If-Match", "*");
                request.AddHeader("X-HTTP-Method", "DELETE");
                request.AddHeader("Content-Type", "application/json;odata=verbose");
                request.AddHeader("X-RequestDigest", digestvalue);

                request.AddCookie(cookie[0].Name, cookie[0].Value);
                request.AddCookie(cookie[1].Name, cookie[1].Value);
                request.AddCookie("RpsContextCookie", "");
                IRestResponse response = client.Execute(request);

                return false;
            }
            public bool delete_folder(string digestvalue, IList<RestResponseCookie> cookie, string path, string foldername)
            {
                var client = new RestClient("https://frontisconsulting.sharepoint.com/sites/Test/_api/web/GetFolderByServerRelativeUrl" +
                    "('" + path + "/" + foldername + "')");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Accept", "application/json;odata=verbose");
                request.AddHeader("If-Match", "*");
                request.AddHeader("X-HTTP-Method", "DELETE");
                request.AddHeader("Content-Type", "application/json;odata=verbose");
                request.AddHeader("X-RequestDigest", digestvalue);

                request.AddCookie(cookie[0].Name, cookie[0].Value);
                request.AddCookie(cookie[1].Name, cookie[1].Value);
                request.AddCookie("RpsContextCookie", "");

                IRestResponse response = client.Execute(request);

                return true;
            }
            public bool create_folder(string digestvalue, IList<RestResponseCookie> cookie, string path, string foldername)
            {
                var client = new RestClient("https://frontisconsulting.sharepoint.com/sites/Test/_api/Web/Folders/add('" + path + "/" + foldername + "')");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddCookie(cookie[0].Name, cookie[0].Value);
                request.AddCookie(cookie[1].Name, cookie[1].Value);
                request.AddCookie("RpsContextCookie", "");

                request.AddHeader("Content-Type", "application/json;odata=verbose");
                request.AddHeader("Accept", "application/json;odata=verbose");
                request.AddHeader("X-RequestDigest", digestvalue);

                request.AddParameter("application/json;odata=verbose", "", ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);

                return true;
            }
            public bool add_file(string digestvalue, IList<RestResponseCookie> cookie, string data, string path, string filename)
            {
                var client = new RestClient(
                    "https://frontisconsulting.sharepoint.com/sites/Test/_api/web/GetFolderByServerRelativeUrl" +
                        "('" + path + "')" +
                        "/Files/add" +
                        "(url='" +
                        filename +
                        "',overwrite=true)"
                    );
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("X-RequestDigest",
                        digestvalue
                    );
                request.AddCookie(cookie[0].Name, cookie[0].Value);
                request.AddCookie(cookie[1].Name, cookie[1].Value);
                request.AddCookie("RpsContextCookie", "");
                request.AddParameter("text/plain",
                    data,
                    ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                return true;
            }
        }
        class Logins
        {
            public string Return_Token(string username, string password, string siteurl)
            {
                var client = new RestClient("https://login.microsoftonline.com/extSTS.srf");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Accept", " \"application/json; odata=verbose\"");
                request.AddParameter("application/xml",
                    "<s:Envelope xmlns:s=\"http://www.w3.org/2003/05/soap-envelope\"  \r\n  " +
                    "xmlns:a=\"http://www.w3.org/2005/08/addressing\"  \r\n  " +
                    "xmlns:u=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">  \r\n" +
                    "<s:Header>  \r\n" +
                    "<a:Action s:mustUnderstand=\"1\">http://schemas.xmlsoap.org/ws/2005/02/trust/RST/Issue" +
                    "</a:Action>  \r\n<a:ReplyTo>  \r\n  " +
                    "<a:Address>http://www.w3.org/2005/08/addressing/anonymous</a:Address>  \r\n</a:ReplyTo>  \r\n" +
                    "<a:To s:mustUnderstand=\"1\">https://login.microsoftonline.com/extSTS.srf</a:To>  \r\n" +
                    "<o:Security s:mustUnderstand=\"1\"  \r\n   " +
                    "xmlns:o=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">  \r\n  " +
                    "<o:UsernameToken>  \r\n    " +
                    "<o:Username>" + username + "</o:Username>  \r\n    " +
                    "<o:Password>" + password + "</o:Password>  \r\n  " +
                    "</o:UsernameToken>  \r\n</o:Security>  \r\n</s:Header>  \r\n" +
                    "<s:Body>  \r\n" +
                    "<t:RequestSecurityToken xmlns:t=\"http://schemas.xmlsoap.org/ws/2005/02/trust\">  \r\n  " +
                    "<wsp:AppliesTo xmlns:wsp=\"http://schemas.xmlsoap.org/ws/2004/09/policy\">  \r\n    <a:EndpointReference>  \r\n      " +
                    "<a:Address>" + siteurl + "</a:Address>  \r\n    </a:EndpointReference>  \r\n  </wsp:AppliesTo>  \r\n  " +
                    "<t:KeyType>http://schemas.xmlsoap.org/ws/2005/05/identity/NoProofKey</t:KeyType>  \r\n  " +
                    "<t:RequestType>http://schemas.xmlsoap.org/ws/2005/02/trust/Issue</t:RequestType>  \r\n  " +
                    "<t:TokenType>urn:oasis:names:tc:SAML:1.0:assertion</t:TokenType>  \r\n</t:RequestSecurityToken>  \r\n</s:Body>  \r\n</s:Envelope> "
                    , ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);

                string start_string = "xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">";
                int start_index = response.Content.IndexOf(start_string);
                int end_index = response.Content.IndexOf("</wsse:BinarySecurityToken>");
                start_index = start_index + start_string.Length;

                string string_token = response.Content.Substring(start_index, end_index - start_index);

                return string_token;
            }
            public IList<RestResponseCookie> Return_Cookie(string string_token)
            {
                var client = new RestClient("https://frontisconsulting.sharepoint.com/_forms/default.aspx?wa=wsignin1.0");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Content-Type", "application/xml");
                request.AddParameter("application/xml",
                    string_token
                    , ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                return response.Cookies;
            }

        }

        class Login_Client
        {
            public string Return_Token_Client(string client_id, string client_secret, string tenant_id, string prefix)
            {
                client_secret = System.Web.HttpUtility.UrlEncode(client_secret);
                var client = new RestClient("https://accounts.accesscontrol.windows.net/" + tenant_id + "/tokens/OAuth/2");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
                request.AddParameter("application/x-www-form-urlencoded",
                    "grant_type=client_credentials&client_id=\r\n" +
                    client_id + "@" + tenant_id +
                    "&client_secret=" +
                    client_secret +
                    "&resource=00000003-0000-0ff1-ce00-000000000000/" +
                    prefix + ".sharepoint.com@" + tenant_id, ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                string start_string = "\"access_token\":";
                int start_index = response.Content.IndexOf(start_string);
                int end_index = response.Content.IndexOf("\"}");
                start_index = start_index + start_string.Length + 1;

                string string_token = response.Content.Substring(start_index, end_index - start_index);

                return string_token;
            }


        }

        class Site_Client
        {
            public string Return_FormDigestValue(string token, string siteName)
            {
                var client = new RestClient($"{siteName}/_api/contextinfo");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                request.AddHeader("Authorization", "Bearer " + token);
                request.AddParameter("text/plain", "", ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);

                string start_string = "<d:FormDigestValue>";
                int start_index = response.Content.IndexOf(start_string);
                int end_index = response.Content.IndexOf("</d:FormDigestValue>");
                start_index = start_index + start_string.Length;

                string string_digestvalue = response.Content.Substring(start_index, end_index - start_index);

                return string_digestvalue;
            }
            public bool add_file(string digestvalue, string token, string data, string path, string filename, string siteName)
            {
                var client = new RestClient(
                    $"{siteName}/_api/web/GetFolderByServerRelativeUrl" +
                        "('" + path + "')" +
                        "/Files/add" +
                        "(url='" +
                        filename +
                        "',overwrite=true)"
                    );
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("X-RequestDigest",
                        digestvalue
                    );
                request.AddHeader("Authorization", "Bearer " + token);
                request.AddParameter("text/plain",
                    data,
                    ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                return true;
            }
            public bool delete_file(string digestvalue, string token, string path, string filename, string siteName)
            {
                var client = new RestClient($"{siteName}/_api/web/GetFileByServerRelativeUrl('" +
                    path + "/" + filename + "')");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Accept", "application/json;odata=verbose");
                request.AddHeader("If-Match", "*");
                request.AddHeader("X-HTTP-Method", "DELETE");
                request.AddHeader("Content-Type", "application/json;odata=verbose");
                request.AddHeader("X-RequestDigest", digestvalue);
                request.AddHeader("Authorization", "Bearer " + token);

                IRestResponse response = client.Execute(request);

                return false;
            }
            public bool create_folder(string digestvalue, string token, string path, string foldername, string siteName)
            {
                var client = new RestClient($"{siteName}/_api/Web/Folders/add('" + path + "/" + foldername + "')");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                request.AddHeader("Content-Type", "application/json;odata=verbose");
                request.AddHeader("Accept", "application/json;odata=verbose");
                request.AddHeader("X-RequestDigest", digestvalue);
                request.AddHeader("Authorization", "Bearer " + token);

                request.AddParameter("application/json;odata=verbose", "", ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);

                return true;
            }
            public bool delete_folder(string digestvalue, string token, string path, string foldername, string siteName)
            {
                var client = new RestClient($"{siteName}/_api/web/GetFolderByServerRelativeUrl" +
                    "('" + path + "/" + foldername + "')");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);
                request.AddHeader("Accept", "application/json;odata=verbose");
                request.AddHeader("If-Match", "*");
                request.AddHeader("X-HTTP-Method", "DELETE");
                request.AddHeader("Content-Type", "application/json;odata=verbose");
                request.AddHeader("X-RequestDigest", digestvalue);
                request.AddHeader("Authorization", "Bearer " + token);

                IRestResponse response = client.Execute(request);

                return true;
            }

            public bool remove_and_breakinherit_permission_all_in_lists(string digestvalue, string token, string documentLibName, string siteName)
            {
                var client = new RestClient($"{siteName}/_api/Web/lists/getByTitle('{documentLibName}')/breakroleinheritance(copyRoleAssignments=true, clearSubscopes=false)");
                //var client = new RestClient($"{siteName}/_api/Web/lists/getByTitle('{documentLibName}')/breakroleinheritance(copyRoleAssignments=false, clearSubscopes=true)");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                request.AddHeader("Content-Type", "application/json;odata=verbose");
                request.AddHeader("Accept", "application/json;odata=verbose");
                request.AddHeader("X-RequestDigest", digestvalue);
                request.AddHeader("Authorization", "Bearer " + token);

                request.AddParameter("application/json;odata=verbose", "", ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);

                return true;
            }

            public bool add_permission_for_lists(string digestvalue, string token, string documentLibName, string siteName, string userId, string roledefid)
            {
                var client = new RestClient($"{siteName}/_api/Web/lists/getByTitle('{documentLibName}')/roleassignments/addroleassignment(principalid={userId}, roledefid={roledefid})");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                request.AddHeader("Content-Type", "application/json;odata=verbose");
                request.AddHeader("Accept", "application/json;odata=verbose");
                request.AddHeader("X-RequestDigest", digestvalue);
                request.AddHeader("Authorization", "Bearer " + token);

                request.AddParameter("application/json;odata=verbose", "", ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);

                return true;
            }
            public string get_userId_from_email(string digestvalue, string token, string siteName, string email)
            {
                var client = new RestClient($"{siteName}/_api/web/siteusers?$select=Id&$filter=Email eq '{email}'");
                client.Timeout = -1;
                var request = new RestRequest(Method.GET);

                request.AddHeader("Content-Type", "application/json;odata=verbose");
                request.AddHeader("Accept", "application/json;odata=verbose");
                request.AddHeader("X-RequestDigest", digestvalue);
                request.AddHeader("Authorization", "Bearer " + token);

                request.AddParameter("application/json;odata=verbose", "", ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);

                if (response.StatusCode != HttpStatusCode.OK)
                {
                    return "";
                }

                string start_string = "\"Id\":";
                int start_index = response.Content.IndexOf(start_string);

                if(start_index == -1)
                {
                    //user id not found then exit
                    return ""; 
                }

                int end_index = response.Content.IndexOf("}]");
                start_index = start_index + start_string.Length;

                string string_token = response.Content.Substring(start_index, end_index - start_index);

                return string_token;
            }
            public bool create_document_library(string digestvalue, string token, string libraryName, string siteName, string libraryDescription)
            {
                var client = new RestClient($"{siteName}/_api/Web/lists");
                client.Timeout = -1;
                var request = new RestRequest(Method.POST);

                request.AddHeader("Content-Type", "application/json;odata=verbose");
                request.AddHeader("Accept", "application/json;odata=verbose");
                request.AddHeader("X-RequestDigest", digestvalue);
                request.AddHeader("Authorization", "Bearer " + token);

                string body = "{                                                      " +
                              "     \"__metadata\": {                                 " +
                              "         \"type\": \"SP.List\"                         " +
                              "     },                                                " +
                              "     \"AllowContentTypes\": true,                      " +
                              "     \"BaseTemplate\": 101,                            " +
                              "     \"ContentTypesEnabled\": true,                    " +
                              "     \"Description\": \"@libraryDescription\",    " +
                              "     \"Title\": \"@libraryName\"                         " +
                              "}                                                       ";

                body = body.Replace("@libraryName", libraryName);
                body = body.Replace("@libraryDescription", libraryDescription);

                request.AddParameter("application/json", body, ParameterType.RequestBody);

                IRestResponse response = client.Execute(request);

                return true;
            }
        }

        public class RoleDefId
        {
            //https://frontisconsulting.sharepoint.com/sites/TestSiteForPDD/_api/web/roledefinitions
            public static string FullControl { get { return "1073741829"; } }
            public static string Manage { get { return "1073741828"; } }
            public static string Edit { get { return "1073741830"; } }
            public static string Support { get { return "1073741827"; } }
            public static string Read { get { return "1073741826"; } }
            public static string View_Restrict { get { return "1073741832"; } }
            public static string Access_Restrict { get { return "1073741825"; } }
            public static string LimitedView { get { return "1073741924"; } }
            public static string LimitedEdit { get { return "1073741925"; } }
        }
    }
}
