using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FastReport.Data;
using FastReport.Export.PdfSimple;
using FastReport.Utils;
using FastReport.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace PTT_GC_API.Controllers
{
    [Route("[controller]")]
    public class ReportTest01Controller : Controller
    {
        private readonly IConfiguration configuration;
        public ReportTest01Controller(IConfiguration config)
        {
            configuration = config;
        }

        [HttpGet("")]
        public IActionResult Index()
        {


            //webReport.
            ViewBag.WebReport = GetReportTest01();
            return View();
        }

        [HttpGet("exportPdf")]
        public IActionResult Pdf()
        {
            PDFSimpleExport export = new PDFSimpleExport();
            using (MemoryStream ms = new MemoryStream())
            {
                export.Export(GetReportTest01().Report, ms);
                ms.Flush();
                return File(ms.ToArray(), "application/pdf", Path.GetFileNameWithoutExtension("Simple List") + ".pdf");
            }
        }

        
        public WebReport GetReportTest01()
        {
            RegisteredObjects.AddConnection(typeof(MsSqlDataConnection));
            WebReport webReport = new WebReport();
            MsSqlDataConnection sqlConnection = new MsSqlDataConnection();
            sqlConnection.ConnectionString = configuration.GetConnectionString("defaultConnection");
            webReport.Report.Load($@"Reports/test1.frx");
            webReport.Report.Dictionary.Connections[0].ConnectionString = configuration.GetConnectionString("defaultConnection");
            webReport.Report.Prepare();
            webReport.ShowPreparedReport = false;

            return webReport;
        }

    }
}