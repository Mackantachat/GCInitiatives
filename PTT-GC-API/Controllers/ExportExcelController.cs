using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.Streaming;
using NPOI.XSSF.UserModel;
using PTT_GC_API.Data;
using PTT_GC_API.Data.Interface;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExportExcelController : ControllerBase
    {
        private readonly IHostEnvironment _hostingEnvironment;
        private readonly StoreProcedureInterface _repository;
        private readonly DataContext _context;


        public ExportExcelController(IHostEnvironment hostingEnvironment, StoreProcedureInterface repository, DataContext context)
        {
            _hostingEnvironment = hostingEnvironment;
            _repository = repository;
            _context = context;
        }

        [HttpGet("GenerateExcelCapex")]
        public async Task<ActionResult> GenerateExcelCapex([FromQuery]string storeName, [FromQuery] string param, [FromQuery] int reportID)
        {
            if (storeName == null)
            {
                return NoContent();
            }

            try
            {
                //sp_CAPEX_Report_Used_Pool
                string nowTime = DateTime.Now.ToString("yyyyMMddHHmmss");
                string newFile = @$"Report_{nowTime}.xlsx";
                DataTable datatable = await _repository.ExecuteReturnDatatable($"EXEC {storeName} '{reportID}'");

                if (datatable.Rows.Count <= 0)
                {
                    return Ok("Data was not found.");
                }

                return GenerateExcelFromDatatableCAPEX(datatable, newFile);
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GenerateExcelTpx")]
        public async Task<ActionResult> GenerateExcelTpx([FromQuery] string storeName, [FromQuery] string param, [FromQuery] int reportID)
        {
            if (storeName == null)
            {
                return NoContent();
            }

            try
            {
                //sp_CAPEX_Report_Used_Pool
                string nowTime = DateTime.Now.ToString("yyyyMMddHHmmss");
                string newFile = @$"Report_{nowTime}.xlsx";
                DataTable datatable = await _repository.ExecuteReturnDatatable($"EXEC {storeName} ");

                if (datatable.Rows.Count <= 0)
                {
                    return Ok("Data was not found.");
                }

                return GenerateExcelFromDatatableCAPEX(datatable, newFile);
            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpGet("GenerateCustomExcel")]
        public async Task<ActionResult> GenerateCustomExcel([FromQuery]int reportID)
        {
            try
            {

                var reportHeader = _context.CustomReportHeader.Where(i => i.ReportID == reportID).FirstOrDefault();

                string nowTime = DateTime.Now.ToString("yyyyMMddHHmmss");
                string newFile = @$"Report_{nowTime}.xlsx";
                string reportName = reportHeader.ReportName;
                DataTable datatable = await _repository.ExecuteReturnDatatable($"EXEC sp_CustomExcel '{reportID}'");

                if (datatable.Rows.Count <= 0)
                {
                    return Ok("Data was not found.");
                }

                datatable.Columns.Remove("initiativeidparam");

                return GenerateExcelFromDatatable(datatable, newFile, reportName);

            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GenerateApproverDashboard")]
        public async Task<ActionResult> GenerateApproverDashboard([FromQuery]int reportID)
        {
            try
            {
                string nowTime = DateTime.Now.ToString("yyyyMMddHHmmss");
                string newFile = @$"Report_{nowTime}.xlsx";

                DataTable datatable = await _repository.ExecuteReturnDatatable($"EXEC sp_ApproverDashboard '{reportID}'");

                if (datatable.Rows.Count <= 0)
                {
                    return Ok("Data was not found.");
                }

                datatable.Columns.Remove("initiativeidparam");

                return GenerateExcelFromDatatable(datatable, newFile, "");

            }

            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private FileStreamResult GenerateExcelFromDatatable(DataTable dt, string fileName, string reportName)
        {
            var startRow = 2;
            //var nowRow = startRow++;
            var stream = new MemoryStream();
            IWorkbook workbook = new XSSFWorkbook();
            //SXSSFWorkbook workbook = new SXSSFWorkbook(new XSSFWorkbook(), 100);
            ISheet sheet = workbook.CreateSheet("Report");

            string[] columnToDecimal3Places = { "costestcapex", "benefitamount", "paybackperiod", "irr", "fxexchange", "costestopex", "projectirrbasecase", "npvbasecase", "paybackbasecase", "ebitdabasecase", "il4blended", "il5blended", "il5fixedfxonetime", "il5fixedfxrecurring", "il5floatfxonetime", "il5floatfxrecurring", "il4runrateonetime", "il4runraterecurring", "il5runraterecurring", "il5runrateonetime", "totalonetime", "totalrecurring", "totalblended", "implementationcost" };

            IFont bigWhite = workbook.CreateFont();
            bigWhite.Color = HSSFColor.White.Index;
            bigWhite.IsBold = true;
            bigWhite.FontHeightInPoints = 10;
            bigWhite.FontName = "Calibri";

            IFont bigRed = workbook.CreateFont();
            bigRed.Color = HSSFColor.Red.Index;
            //bigRed.IsBold = true;
            bigRed.FontHeightInPoints = 20;
            bigRed.FontName = "Calibri";

            IFont smallBlack = workbook.CreateFont();
            smallBlack.Color = HSSFColor.Black.Index;
            smallBlack.IsBold = true;
            smallBlack.FontHeightInPoints = 11;
            smallBlack.FontName = "Calibri";

            ICellStyle styleHead_bgBlue = workbook.CreateCellStyle();
            styleHead_bgBlue.FillForegroundColor = HSSFColor.LightBlue.Index;
            styleHead_bgBlue.FillPattern = FillPattern.SolidForeground;
            styleHead_bgBlue.Alignment = HorizontalAlignment.Center;
            styleHead_bgBlue.BorderTop = BorderStyle.Thin;
            styleHead_bgBlue.BorderLeft = BorderStyle.Thin;
            styleHead_bgBlue.BorderRight = BorderStyle.Thin;
            styleHead_bgBlue.BorderBottom = BorderStyle.Thin;
            styleHead_bgBlue.SetFont(bigWhite);

            ICellStyle styleHead_bgLightBlue = workbook.CreateCellStyle();
            styleHead_bgLightBlue.Alignment = HorizontalAlignment.Center;
            styleHead_bgLightBlue.FillForegroundColor = HSSFColor.PaleBlue.Index;
            styleHead_bgLightBlue.FillPattern = FillPattern.SolidForeground;
            styleHead_bgLightBlue.BorderTop = BorderStyle.Thin;
            styleHead_bgLightBlue.BorderLeft = BorderStyle.Thin;
            styleHead_bgLightBlue.BorderRight = BorderStyle.Thin;
            styleHead_bgLightBlue.BorderBottom = BorderStyle.Thin;
            styleHead_bgLightBlue.DataFormat = workbook.CreateDataFormat().GetFormat("#,###,###,##0.000");

            ICellStyle styleHead_bgLightBlue_noDecimal = workbook.CreateCellStyle();
            styleHead_bgLightBlue_noDecimal.Alignment = HorizontalAlignment.Center;
            styleHead_bgLightBlue_noDecimal.FillForegroundColor = HSSFColor.PaleBlue.Index;
            styleHead_bgLightBlue_noDecimal.FillPattern = FillPattern.SolidForeground;
            styleHead_bgLightBlue_noDecimal.BorderTop = BorderStyle.Thin;
            styleHead_bgLightBlue_noDecimal.BorderLeft = BorderStyle.Thin;
            styleHead_bgLightBlue_noDecimal.BorderRight = BorderStyle.Thin;
            styleHead_bgLightBlue_noDecimal.BorderBottom = BorderStyle.Thin;
            styleHead_bgLightBlue_noDecimal.DataFormat = workbook.CreateDataFormat().GetFormat("#,###,###,##0");

            ICellStyle cellStyle2DecimalPlaces = workbook.CreateCellStyle();
            cellStyle2DecimalPlaces.BorderTop = BorderStyle.Thin;
            cellStyle2DecimalPlaces.BorderLeft = BorderStyle.Thin;
            cellStyle2DecimalPlaces.BorderRight = BorderStyle.Thin;
            cellStyle2DecimalPlaces.BorderBottom = BorderStyle.Thin;
            cellStyle2DecimalPlaces.DataFormat = workbook.CreateDataFormat().GetFormat("#,###,###,##0.00");

            ICellStyle cellStyle3DecimalPlaces = workbook.CreateCellStyle();
            cellStyle3DecimalPlaces.BorderTop = BorderStyle.Thin;
            cellStyle3DecimalPlaces.BorderLeft = BorderStyle.Thin;
            cellStyle3DecimalPlaces.BorderRight = BorderStyle.Thin;
            cellStyle3DecimalPlaces.BorderBottom = BorderStyle.Thin;
            cellStyle3DecimalPlaces.DataFormat = workbook.CreateDataFormat().GetFormat("#,###,###,##0.000");

            ICellStyle cellStyle0DecimalPlaces = workbook.CreateCellStyle();
            cellStyle0DecimalPlaces.BorderTop = BorderStyle.Thin;
            cellStyle0DecimalPlaces.BorderLeft = BorderStyle.Thin;
            cellStyle0DecimalPlaces.BorderRight = BorderStyle.Thin;
            cellStyle0DecimalPlaces.BorderBottom = BorderStyle.Thin;
            cellStyle0DecimalPlaces.DataFormat = workbook.CreateDataFormat().GetFormat("#,###,###,##0");

            ICellStyle cellWithBorder = workbook.CreateCellStyle();
            cellWithBorder.BorderTop = BorderStyle.Thin;
            cellWithBorder.BorderLeft = BorderStyle.Thin;
            cellWithBorder.BorderRight = BorderStyle.Thin;
            cellWithBorder.BorderBottom = BorderStyle.Thin;
            //using (var fs = new FileStream(newFile, FileMode.Create, FileAccess.Write))
            //{


            ICellStyle styleHead_BigRed = workbook.CreateCellStyle();
            styleHead_BigRed.SetFont(bigRed);

            ICellStyle styleHead_Bold = workbook.CreateCellStyle();
            styleHead_Bold.SetFont(smallBlack);

            IRow tmpRow;
            ICell tmpCell;
            if (reportName != "")
            {
                tmpRow = sheet.CreateRow(0); //create reportName
                tmpCell = tmpRow.CreateCell(0);
                tmpCell.SetCellValue(reportName);
                tmpCell.CellStyle = styleHead_BigRed;
            }


            //string exportedDate = DateTime.Now.ToString("dd-MMM-yyyy");

            //tmpRow = sheet.CreateRow(1); //create create Exported On
            //tmpCell = tmpRow.CreateCell(0);
            //tmpCell.SetCellValue("Exported on : " + exportedDate);
            //tmpCell.CellStyle = styleHead_Bold;

            IRow row = sheet.CreateRow(startRow); //create rowHeader

            //create Header Row
            for (int i = 0; i < dt.Columns.Count; i++)
            {
                // col.ColumnName.ToString();
                ICell cell = row.CreateCell(i);
                cell.SetCellValue(dt.Columns[i].ColumnName.ToString());
                cell.CellStyle = styleHead_bgBlue;
            }

            //ICellStyle _doubleCellStyle = workbook.CreateCellStyle();
            //_doubleCellStyle.DataFormat = workbook.CreateDataFormat().GetFormat("#,##0.###");

            //loop fill data
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                IRow loopRow = sheet.CreateRow(startRow + 1 + i); //create rowDetail               

                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    ICell cell = loopRow.CreateCell(j);
                    cell.CellStyle = cellWithBorder;
                    //cell.CellStyle = _doubleCellStyle;
                    double tmpDouble = 0;
                    double tmpYear = 0;
                    if (double.TryParse(dt.Rows[i][j].ToString(), out tmpDouble))
                    {
                        cell.SetCellValue(tmpDouble);
                        if (columnToDecimal3Places.Contains(dt.Columns[j].ColumnName.ToLower()))
                            cell.CellStyle = cellStyle3DecimalPlaces;  //if column  decimal 3 places
                    }
                    else
                    {
                        cell.SetCellValue(dt.Rows[i][j].ToString());
                        cell.CellStyle = cellWithBorder;
                    }

                    //Set Border All Cells
                    //CellRangeAddress tmpRangeAddr = new CellRangeAddress(i + 1, i + 1, j, j);
                    //RegionUtil.SetBorderTop(1, tmpRangeAddr, sheet, workbook);
                    //RegionUtil.SetBorderBottom(1, tmpRangeAddr, sheet, workbook);
                    //RegionUtil.SetBorderLeft(1, tmpRangeAddr, sheet, workbook);
                    //RegionUtil.SetBorderRight(1, tmpRangeAddr, sheet, workbook);
                }
            }

            //AutoSizeColumnTracker autoSizeColumnTracker = sheet._autoSizeColumnTracker;
            //autoSizeColumnTracker.TrackAllColumns();


            List<int?> maximumLengthForColumns =
           Enumerable.Range(0, dt.Columns.Count)
             .Select(col => dt.AsEnumerable()
                                     .Select(row => row[col]).OfType<string>()
                                     .Max(val => val?.Length)).ToList();

            for (int i = 0; i < dt.Columns.Count; i++)
            {
                //set auto column
                if (maximumLengthForColumns[i] == null) maximumLengthForColumns[i] = dt.Columns[i].ColumnName.Length;  //if no string then use column length
                if (maximumLengthForColumns[i] < dt.Columns[i].ColumnName.Length) maximumLengthForColumns[i] = dt.Columns[i].ColumnName.Length;   //if string less than column name then use column length

                int width = ((int)(maximumLengthForColumns[i] * 1.14388)) * 256;
                if (width > 65280) width = 65280; //maximum width of excel
                sheet.SetColumnWidth(i, width);
            }


            sheet.CreateFreezePane(0, startRow + 1);



            workbook.Write(stream);

            return File(new MemoryStream(stream.ToArray()), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }

        private FileStreamResult GenerateExcelFromDatatableCAPEX(DataTable dt, string fileName)
        {
            string[] months = { "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" };
            var stream = new MemoryStream();
            IWorkbook workbook = new XSSFWorkbook();
            var sheet = workbook.CreateSheet("Report");

            IFont bigWhite = workbook.CreateFont();
            bigWhite.Color = HSSFColor.White.Index;
            bigWhite.IsBold = true;
            bigWhite.FontHeightInPoints = 10;
            bigWhite.FontName = "Calibri";

            ICellStyle styleHead_bgBlue = workbook.CreateCellStyle();
            styleHead_bgBlue.FillForegroundColor = HSSFColor.LightBlue.Index;
            styleHead_bgBlue.FillPattern = FillPattern.SolidForeground;
            styleHead_bgBlue.Alignment = HorizontalAlignment.Center;
            styleHead_bgBlue.BorderTop = BorderStyle.Medium;
            styleHead_bgBlue.BorderLeft = BorderStyle.Medium;
            styleHead_bgBlue.BorderRight = BorderStyle.Medium;
            styleHead_bgBlue.BorderBottom = BorderStyle.Medium;
            styleHead_bgBlue.SetFont(bigWhite);

            ICellStyle styleHead_bgLightBlue = workbook.CreateCellStyle();
            styleHead_bgLightBlue.Alignment = HorizontalAlignment.Center;
            styleHead_bgLightBlue.FillForegroundColor = HSSFColor.PaleBlue.Index;
            styleHead_bgLightBlue.FillPattern = FillPattern.SolidForeground;
            styleHead_bgLightBlue.BorderTop = BorderStyle.Thin;
            styleHead_bgLightBlue.BorderLeft = BorderStyle.Thin;
            styleHead_bgLightBlue.BorderRight = BorderStyle.Thin;
            styleHead_bgLightBlue.BorderBottom = BorderStyle.Thin;
            styleHead_bgLightBlue.DataFormat = workbook.CreateDataFormat().GetFormat("#,###,###,##0.00");

            ICellStyle styleSubTotalInt = workbook.CreateCellStyle();
            styleSubTotalInt.FillForegroundColor = HSSFColor.PaleBlue.Index;
            styleSubTotalInt.FillPattern = FillPattern.SolidForeground;
            styleSubTotalInt.BorderTop = BorderStyle.Thin;
            styleSubTotalInt.BorderLeft = BorderStyle.Thin;
            styleSubTotalInt.BorderRight = BorderStyle.Thin;
            styleSubTotalInt.BorderBottom = BorderStyle.Thin;
            styleSubTotalInt.DataFormat = workbook.CreateDataFormat().GetFormat("#,###,###,##0");

            ICellStyle styleGrandTotalInt = workbook.CreateCellStyle();
            styleGrandTotalInt.Alignment = HorizontalAlignment.Center;
            styleGrandTotalInt.FillForegroundColor = HSSFColor.PaleBlue.Index;
            styleGrandTotalInt.FillPattern = FillPattern.SolidForeground;
            styleGrandTotalInt.BorderTop = BorderStyle.Thin;
            styleGrandTotalInt.BorderLeft = BorderStyle.Thin;
            styleGrandTotalInt.BorderRight = BorderStyle.Thin;
            styleGrandTotalInt.BorderBottom = BorderStyle.Thin;
            styleGrandTotalInt.DataFormat = workbook.CreateDataFormat().GetFormat("#,###,###,##0");

            ICellStyle styleSubTotalDecimal2 = workbook.CreateCellStyle();
            styleSubTotalDecimal2.FillForegroundColor = HSSFColor.PaleBlue.Index;
            styleSubTotalDecimal2.FillPattern = FillPattern.SolidForeground;
            styleSubTotalDecimal2.BorderTop = BorderStyle.Thin;
            styleSubTotalDecimal2.BorderLeft = BorderStyle.Thin;
            styleSubTotalDecimal2.BorderRight = BorderStyle.Thin;
            styleSubTotalDecimal2.BorderBottom = BorderStyle.Thin;
            styleSubTotalDecimal2.DataFormat = workbook.CreateDataFormat().GetFormat("#,###,###,##0.00");

            ICellStyle styleGrandTotalDecimal2 = workbook.CreateCellStyle();
            styleGrandTotalDecimal2.Alignment = HorizontalAlignment.Center;
            styleGrandTotalDecimal2.FillForegroundColor = HSSFColor.PaleBlue.Index;
            styleGrandTotalDecimal2.FillPattern = FillPattern.SolidForeground;
            styleGrandTotalDecimal2.BorderTop = BorderStyle.Thin;
            styleGrandTotalDecimal2.BorderLeft = BorderStyle.Thin;
            styleGrandTotalDecimal2.BorderRight = BorderStyle.Thin;
            styleGrandTotalDecimal2.BorderBottom = BorderStyle.Thin;
            styleGrandTotalDecimal2.DataFormat = workbook.CreateDataFormat().GetFormat("#,###,###,##0.00");



            ICellStyle styleHead_bgLightBlue_noDecimal = workbook.CreateCellStyle();
            styleHead_bgLightBlue_noDecimal.Alignment = HorizontalAlignment.Center;
            styleHead_bgLightBlue_noDecimal.FillForegroundColor = HSSFColor.PaleBlue.Index;
            styleHead_bgLightBlue_noDecimal.FillPattern = FillPattern.SolidForeground;
            styleHead_bgLightBlue_noDecimal.BorderTop = BorderStyle.Thin;
            styleHead_bgLightBlue_noDecimal.BorderLeft = BorderStyle.Thin;
            styleHead_bgLightBlue_noDecimal.BorderRight = BorderStyle.Thin;
            styleHead_bgLightBlue_noDecimal.BorderBottom = BorderStyle.Thin;
            styleHead_bgLightBlue_noDecimal.DataFormat = workbook.CreateDataFormat().GetFormat("#,###,###,##0");

            ICellStyle cellStyle2DecimalPlaces = workbook.CreateCellStyle();
            cellStyle2DecimalPlaces.BorderTop = BorderStyle.Thin;
            cellStyle2DecimalPlaces.BorderLeft = BorderStyle.Thin;
            cellStyle2DecimalPlaces.BorderRight = BorderStyle.Thin;
            cellStyle2DecimalPlaces.BorderBottom = BorderStyle.Thin;
            cellStyle2DecimalPlaces.DataFormat = workbook.CreateDataFormat().GetFormat("#,###,###,##0.00");


            ICellStyle cellStyle0DecimalPlaces = workbook.CreateCellStyle();
            cellStyle0DecimalPlaces.BorderTop = BorderStyle.Thin;
            cellStyle0DecimalPlaces.BorderLeft = BorderStyle.Thin;
            cellStyle0DecimalPlaces.BorderRight = BorderStyle.Thin;
            cellStyle0DecimalPlaces.BorderBottom = BorderStyle.Thin;
            cellStyle0DecimalPlaces.DataFormat = workbook.CreateDataFormat().GetFormat("#,###,###,##0");

            ICellStyle cellWithBorder = workbook.CreateCellStyle();
            cellWithBorder.BorderTop = BorderStyle.Thin;
            cellWithBorder.BorderLeft = BorderStyle.Thin;
            cellWithBorder.BorderRight = BorderStyle.Thin;
            cellWithBorder.BorderBottom = BorderStyle.Thin;
            //using (var fs = new FileStream(newFile, FileMode.Create, FileAccess.Write))
            //{

            ICellStyle styleBgBlue = workbook.CreateCellStyle();
            styleBgBlue.FillForegroundColor = HSSFColor.PaleBlue.Index;
            styleBgBlue.FillPattern = FillPattern.SolidForeground;
            styleBgBlue.BorderTop = BorderStyle.Thin;
            styleBgBlue.BorderLeft = BorderStyle.Thin;
            styleBgBlue.BorderRight = BorderStyle.Thin;
            styleBgBlue.BorderBottom = BorderStyle.Thin;

            IRow row = sheet.CreateRow(0); //create rowHeader

            //create Header Row
            for (int i = 0; i < dt.Columns.Count; i++)
            {
                // col.ColumnName.ToString();
                ICell cell = row.CreateCell(i);
                cell.SetCellValue(dt.Columns[i].ColumnName.ToString());
                cell.CellStyle = styleHead_bgBlue;
            }

            //ICellStyle _doubleCellStyle = workbook.CreateCellStyle();
            //_doubleCellStyle.DataFormat = workbook.CreateDataFormat().GetFormat("#,##0.###");

            //loop fill data
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                IRow loopRow = sheet.CreateRow(i + 1); //create rowDetail               

                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    ICell cell = loopRow.CreateCell(j);
                    //set Color by pool type
                    if (dt.Rows[i][1].ToString().ToLower().Contains("request pool"))
                    {
                        cell.CellStyle = styleBgBlue;
                    }
                    else
                    {
                        cell.CellStyle = cellWithBorder;
                    }
                    //cell.CellStyle = cellWithBorder;
                    //cell.CellStyle = _doubleCellStyle;
                    double tmpDouble = 0;
                    double tmpYear = 0;
                    if (double.TryParse(dt.Rows[i][j].ToString(), out tmpDouble) ||
                        (dt.Columns[j].ColumnName.ToLower().Contains("cost") && dt.Columns[j].ColumnName.ToLower().Contains("center") == false))
                    {
                        

                        // cost with 2 decimal
                        if ((dt.Columns[j].ColumnName.ToLower().Contains("cost") &&
                            dt.Columns[j].ColumnName.ToLower().Contains("center") == false) ||
                            dt.Columns[j].ColumnName.ToLower().Contains("budget") // columnheader contain budget
                            ) cell.CellStyle = cellStyle2DecimalPlaces;  //if column cost   decimal 2 places


                        if (double.TryParse(dt.Columns[j].ColumnName, out tmpYear))
                        {
                            if (tmpYear >= 1900 && tmpYear <= 2300) cell.CellStyle = cellStyle2DecimalPlaces;  //if column year  (2020 2021)   decimal 0 places   length between   1900 - 2300 [400 years]
                        }

                        if (months.Contains(dt.Columns[j].ColumnName.Split("-")[0].ToLower()))     //if column month   decimal  0 places     )
                        {
                            //cell.CellStyle = cellStyle0DecimalPlaces;
                            cell.CellStyle = cellStyle0DecimalPlaces;
                        }

                        //if (dt.Columns[j].ColumnName.ToLower().Contains("total")  )
                        //{  //if column total   decimal 0  places  )
                        //    //cell.CellStyle = cellStyle0DecimalPlaces;
                        //    cell.CellStyle = cellStyle2DecimalPlaces;
                        //}

                        if (dt.Columns[j].ColumnName.ToLower().Contains("จำนวนโครงการ"))
                        {
                            //cell.CellStyle = cellStyle0DecimalPlaces;
                            cell.CellStyle = cellStyle0DecimalPlaces;
                        }

                        if (dt.Columns[j].ColumnName.ToLower().Contains("งบประมาณ"))
                        {
                            //cell.CellStyle = cellStyle0DecimalPlaces;
                            cell.CellStyle = cellStyle2DecimalPlaces;
                        }

                        cell.SetCellValue(tmpDouble);
                        if (dt.Rows[i][1].ToString().ToLower().Contains("request pool"))
                        {
                            cell.CellStyle = styleBgBlue;
                        }
                        else
                        {
                            cell.CellStyle = cellWithBorder;
                        }
                    }
                    else
                    {
                        cell.SetCellValue(dt.Rows[i][j].ToString());
                        if (dt.Rows[i][1].ToString().ToLower().Contains("request pool"))
                        {
                            cell.CellStyle = styleBgBlue;
                        }
                        else
                        {
                            cell.CellStyle = cellWithBorder;
                        }
                        //cell.CellStyle = cellWithBorder;
                    }

                    //finding  "Total" and add color
                    if (dt.Rows[i][0].ToString().ToLower().Contains("total") || dt.Rows[i][1].ToString().ToLower().Contains("total") ||
                        dt.Rows[i][0].ToString().ToLower().Contains("sum") ||
                        (dt.Columns[0].ColumnName.ToLower().ToString() == "no" && dt.Rows[i][0].ToString().ToLower().Length == 0)
                        )
                    {
                        if (months.Contains(dt.Columns[j].ColumnName.Split("-")[0].ToLower()))     //if column month   decimal  0 places 
                        {  //if column total   decimal 0  places  )
                            cell.CellStyle = styleGrandTotalInt;
                        }
                        else if (double.TryParse(dt.Columns[j].ColumnName, out tmpYear))
                        {
                            if (tmpYear >= 1900 && tmpYear <= 2300) cell.CellStyle = styleGrandTotalDecimal2;  //if column year  (2020 2021)   decimal 0 places   length between   1900 - 2300 [400 years]
                        }
                        else
                        {
                            cell.CellStyle = styleSubTotalDecimal2;
                        }

                        //for total month of report project detail
                        if (dt.Columns[j].ColumnName.ToLower().Contains("total") && months.Contains(dt.Columns[j + 1].ColumnName.Split("-")[0].ToLower()))
                        {
                            cell.CellStyle = styleGrandTotalDecimal2;
                        }

                        if (dt.Columns[j].ColumnName.ToLower().Contains("จำนวนโครงการ"))
                        {
                            //cell.CellStyle = cellStyle0DecimalPlaces;
                            cell.CellStyle = styleSubTotalInt;
                            if (dt.Rows[i][0].ToString().ToLower().Contains("grand")) cell.CellStyle = styleGrandTotalInt;
                        }

                        if (dt.Columns[j].ColumnName.ToLower().Contains("งบประมาณ"))
                        {
                            //cell.CellStyle = cellStyle0DecimalPlaces;
                            cell.CellStyle = styleSubTotalDecimal2;
                            if (dt.Rows[i][0].ToString().ToLower().Contains("grand")) cell.CellStyle = styleGrandTotalDecimal2;
                        }

                        if (dt.Rows[i][1].ToString().ToLower().Contains("request pool"))
                        {
                            cell.CellStyle = styleBgBlue;
                        }
                        else
                        {
                            cell.CellStyle = cellWithBorder;
                        }
                    }

                    //Set Border All Cells
                    //CellRangeAddress tmpRangeAddr = new CellRangeAddress(i + 1, i + 1, j, j);
                    //RegionUtil.SetBorderTop(1, tmpRangeAddr, sheet, workbook);
                    //RegionUtil.SetBorderBottom(1, tmpRangeAddr, sheet, workbook);
                    //RegionUtil.SetBorderLeft(1, tmpRangeAddr, sheet, workbook);
                    //RegionUtil.SetBorderRight(1, tmpRangeAddr, sheet, workbook);


                    
                }
            }


            //for (int i = 0; i < dt.Columns.Count; i++)
            //{
            //    //set auto column
            //    sheet.AutoSizeColumn(i);
            //}
            List<int?> maximumLengthForColumns =
           Enumerable.Range(0, dt.Columns.Count)
             .Select(col => dt.AsEnumerable()
                                     .Select(row => row[col]).OfType<string>()
                                     .Max(val => val?.Length)).ToList();

            for (int i = 0; i < dt.Columns.Count; i++)
            {
                //set auto column
                if (maximumLengthForColumns[i] == null) maximumLengthForColumns[i] = dt.Columns[i].ColumnName.Length;  //if no string then use column length
                if (maximumLengthForColumns[i] < dt.Columns[i].ColumnName.Length) maximumLengthForColumns[i] = dt.Columns[i].ColumnName.Length;   //if string less than column name then use column length

                int width = ((int)(maximumLengthForColumns[i] * 1.14388)) * 256;
                if (width > 65280) width = 65280; //maximum width of excel
                sheet.SetColumnWidth(i, width);
            }

            sheet.CreateFreezePane(0, 1);

            workbook.Write(stream);

            return File(new MemoryStream(stream.ToArray()), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }
    }
}