using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;
using PTT_GC_API.Data.Interface;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExportCashInReportController : ControllerBase
    {
        private readonly StoreProcedureInterface _repository;
        private int currentColumnIndex = 0;
        private int currentRowIndex = 0;
        private IWorkbook workbook;

        // GET: /<controller>/
        public ExportCashInReportController(StoreProcedureInterface repository)
        {
            _repository = repository;
        }

        [HttpGet("GenerateCashIn")]
        public async Task<ActionResult> GenerateCashIn([FromQuery]string reportID)
        {

            string nowTime = DateTime.Now.ToString("yyyyMMddHHmmss");
            string exportedDate = DateTime.Now.ToString("dd-MMM-yyyy");
            DataTable dt = new DataTable();
            try
            {
                dt = await _repository.ExecuteReturnDatatable($"EXEC [sp_GetCashInById] '{reportID}'");

                if (dt.Rows.Count <= 0)
                {
                    return Ok("Data was not found.");
                }





                var newFile = @$"Refine Cash-in Report_{nowTime}.xlsx";

                var col = dt.Select("", "FirstRunRateMonth ASC");
                string minDate = col.First()["FirstRunRateMonth"].ToString();
                string maxDate = col.Last()["FirstRunRateMonth"].ToString();
                DateTime minDateTime = DateTime.Parse(minDate);
                DateTime maxDateTime = DateTime.Parse(maxDate);

                int monthCounter = GetMonthDifference(minDateTime, maxDateTime);

                MemoryStream memoryStream = new MemoryStream();
                workbook = new XSSFWorkbook();

                ISheet _sheet1 = null;
                ISheet _sheet2 = null;
                ISheet _sheet3 = null;

                CreateSheet("Incentive cash-in", "12 month cash-in for incentive calculation", minDateTime, maxDateTime, monthCounter, exportedDate, ref _sheet1);
                CreateSheet("Monthly cash-in", "Monthly IL5 cash-in", minDateTime, maxDateTime, monthCounter, exportedDate, ref _sheet2);
                CreateSheet("Monthly cash-in 12 data point", "Monthly IL5 cash-in", minDateTime, maxDateTime, monthCounter, exportedDate, ref _sheet3);



                SheetAddData(_sheet1, minDateTime, dt, currentRowIndex, 1);
                SheetAddData(_sheet2, minDateTime, dt, currentRowIndex, 2);
                SheetAddData(_sheet3, minDateTime, dt, currentRowIndex, 3);




                //XSSFFormulaEvaluator.EvaluateAllFormulaCells(workbook);
                workbook.Write(memoryStream);

                return File(new MemoryStream(memoryStream.ToArray()), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", newFile);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("GenerateUFDD")]
        public async Task<ActionResult> GenerateUFDD([FromQuery]string reportID)
        {

            string nowTime = DateTime.Now.ToString("yyyyMMddHHmmss");
            string exportedDate = DateTime.Now.ToString("dd-MMM-yyyy");
            DataTable dt = new DataTable();
            try
            {
                dt = await _repository.ExecuteReturnDatatable($"EXEC [sp_GetUFDDById] '{reportID}'");

                if (dt.Rows.Count <= 0)
                {
                    return Ok("Data was not found.");
                }





                var newFile = @$"UFDD Report_{nowTime}.xlsx";

                var col = dt.Select("", "FirstRunRateMonth ASC");
                string minDate = col.First()["FirstRunRateMonth"].ToString();
                string maxDate = col.Last()["FirstRunRateMonth"].ToString();
                DateTime minDateTime = DateTime.Parse(minDate);
                DateTime maxDateTime = DateTime.Parse(maxDate);

                int monthCounter = GetMonthDifference(minDateTime, maxDateTime);

                MemoryStream memoryStream = new MemoryStream();
                workbook = new XSSFWorkbook();

                ISheet _sheet1 = null;

                CreateSheet("Impact", "Impact Data", minDateTime, maxDateTime, monthCounter, exportedDate, ref _sheet1, "UFDD");



                SheetAddDataUFDD(_sheet1, minDateTime, dt, currentRowIndex, 1);




                //XSSFFormulaEvaluator.EvaluateAllFormulaCells(workbook);
                workbook.Write(memoryStream);

                return File(new MemoryStream(memoryStream.ToArray()), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", newFile);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private void SheetAddData(ISheet sheet, DateTime minDateTime, DataTable dt, int currentRowNow, int sheetNum)
        {
            int columnHeaderCount = 17; //including 0   = 18 column  minus zero-index = 17
            int currentRow = currentRowIndex + 1;
            int currentColumn = 0;
            int startColumn = 0; // for month
            DataTable dataTable = new DataTable();

            int monthRange = 0;
            switch (sheetNum)
            {
                case 1:
                    monthRange = 12;
                    dataTable = dt.AsEnumerable().Where(i => i["VersionPrice"].ToString().Contains("Float") || i["VersionPrice"].ToString().Contains("Actual")).OrderBy(i => i["InitiativeId"]).ThenBy(i => i["IncentiveOrder"]).CopyToDataTable();
                    break;

                case 2:
                    monthRange = 36;
                    dataTable = dt.AsEnumerable().Where(i => i["VersionPrice"].ToString().Contains("Float") || i["VersionPrice"].ToString().Contains("Actual") || i["VersionPrice"].ToString().Contains("Revise") || i["VersionPrice"].ToString().Contains("Potential")).OrderBy(i => i["InitiativeId"]).ThenBy(i => i["InitiativeCodeOrder"]).CopyToDataTable();
                    break;

                case 3:
                    monthRange = 12;
                    dataTable = dt.AsEnumerable().Where(i => i["VersionPrice"].ToString().Contains("Float") || i["VersionPrice"].ToString().Contains("Actual") || i["VersionPrice"].ToString().Contains("Revise") || i["VersionPrice"].ToString().Contains("Potential")).OrderBy(i => i["InitiativeId"]).ThenBy(i => i["InitiativeCodeOrder"]).CopyToDataTable();
                    break;
            }

            for (int j = 0; j < dataTable.Columns.Count; j++) // column
            {
                currentRow = currentRowIndex + 1;

                if (j > columnHeaderCount && Math.Abs(j - columnHeaderCount) > monthRange)
                {
                    break;
                }

                for (int i = 0; i < dataTable.Rows.Count; i++) // row
                {
                    IRow nowRow = sheet.GetRow(currentRow);
                    if (nowRow == null)
                    {
                        nowRow = sheet.CreateRow(currentRow);
                    }

                    //starting filling months  IF column over 16
                    if (j > columnHeaderCount && Math.Abs(j - columnHeaderCount) <= monthRange)
                    {

                        //// j - column 0-16 and start month 1 to 36

                        if (i > 0) //if now row > 0  ..
                        {
                            // check this row is revise ? and value of actual > 0
                            if (dataTable.Rows[i]["grpNumber"].ToString() == dataTable.Rows[i - 1]["grpNumber"].ToString() && dataTable.Rows[i - 1]["Month" + (j - columnHeaderCount)].ToString().Length > 0)
                            {
                                if (sheetNum > 1 && dataTable.Rows[i]["VersionPrice"].ToString().Contains("Float"))  // for merge row FloatFX and Actual -  do not generate new row
                                {
                                }
                                else
                                {
                                    currentRow++;
                                }

                                continue;
                            }
                        }

                        if (i > 1) //if now row > 0  ..
                        {
                            // check this row is revise ? and value of actual > 0
                            if (dataTable.Rows[i]["grpNumber"].ToString() == dataTable.Rows[i - 2]["grpNumber"].ToString() && dataTable.Rows[i - 2]["Month" + (j - columnHeaderCount)].ToString().Length > 0)
                            {
                                if (sheetNum > 1 && dataTable.Rows[i]["VersionPrice"].ToString().Contains("Float"))  // for merge row FloatFX and Actual -  do not generate new row
                                {
                                }
                                else
                                {
                                    currentRow++;
                                }
                                continue;
                            }
                        }

                        if (dataTable.Rows[i]["Month" + (j - columnHeaderCount)].ToString().Length == 0)
                        {
                            if (sheetNum > 1 && dataTable.Rows[i]["VersionPrice"].ToString().Contains("Float"))   // for merge row FloatFX and Actual -  do not generate new row
                            {
                            }
                            else
                            {
                                currentRow++;
                            }
                            continue; //if value = 0 then skip row
                        }


                        startColumn = GetMonthDifference(minDateTime, DateTime.Parse(dataTable.Rows[i]["FirstRunRateMonth"].ToString()));
                        ICell nowCell = nowRow.CreateCell(startColumn + j);
                        nowCell.SetCellValue(double.Parse(dataTable.Rows[i]["Month" + (j - columnHeaderCount)].ToString()));
                        //}                        
                    }
                    else
                    {
                        ICell nowCell = nowRow.CreateCell(j); //create cell according to column index

                        switch (j)
                        {
                            case 0:
                                nowCell.SetCellValue(dataTable.Rows[i]["InitiativeCode"].ToString());
                                break;
                            case 1:
                                // sub-id
                                nowCell.SetCellValue(dataTable.Rows[i]["SubId"].ToString());
                                break;

                            case 2:
                                nowCell.SetCellValue(dataTable.Rows[i]["NAME"].ToString());
                                break;

                            case 3:
                                nowCell.SetCellValue(dataTable.Rows[i]["Stage"].ToString());
                                break;

                            case 4:
                                nowCell.SetCellValue(dataTable.Rows[i]["FinancialImpactArea"].ToString());
                                break;

                            case 5:
                                nowCell.SetCellValue(dataTable.Rows[i]["WorkStreamTitle"].ToString());
                                break;

                            case 6:
                                nowCell.SetCellValue(dataTable.Rows[i]["SubWorkStream"].ToString());
                                break;

                            case 7:
                                nowCell.SetCellValue(dataTable.Rows[i]["Organization"].ToString());
                                break;

                            case 8:
                                nowCell.SetCellValue(dataTable.Rows[i]["TypeOfBenefitGroup"].ToString());
                                break;

                            case 9:
                                nowCell.SetCellValue(dataTable.Rows[i]["Type of Benefit"].ToString());
                                break;

                            case 10:
                                if (dataTable.Rows[i]["IL4RunRateRecurring"].ToString().Length > 0)
                                    nowCell.SetCellValue(double.Parse(dataTable.Rows[i]["IL4RunRateRecurring"].ToString()));
                                break;

                            case 11:
                                if (dataTable.Rows[i]["IL4RunRateOnetime"].ToString().Length > 0)
                                    nowCell.SetCellValue(double.Parse(dataTable.Rows[i]["IL4RunRateOnetime"].ToString()));

                                break;

                            case 12:
                                if (dataTable.Rows[i]["IL5RunRateRecurring"].ToString().Length > 0)
                                    nowCell.SetCellValue(double.Parse(dataTable.Rows[i]["IL5RunRateRecurring"].ToString()));
                                break;

                            case 13:
                                if (dataTable.Rows[i]["IL5RunRateOnetime"].ToString().Length > 0)
                                    nowCell.SetCellValue(double.Parse(dataTable.Rows[i]["IL5RunRateOnetime"].ToString()));
                                break;

                            case 14:
                                if (dataTable.Rows[i]["LastApprovedIL4Date"].ToString().Length > 0)
                                    nowCell.SetCellValue(DateTime.Parse(dataTable.Rows[i]["LastApprovedIL4Date"].ToString()).ToString("dd-MMM-yyyy"));
                                break;

                            case 15:
                                if (dataTable.Rows[i]["IL4Date"].ToString().Length > 0)
                                    nowCell.SetCellValue(DateTime.Parse(dataTable.Rows[i]["IL4Date"].ToString()).ToString("dd-MMM-yyyy"));
                                break;

                            case 16:
                                if (dataTable.Rows[i]["FirstRunRateMonth"].ToString().Length > 0)
                                    nowCell.SetCellValue(DateTime.Parse(dataTable.Rows[i]["FirstRunRateMonth"].ToString()).ToString("dd-MMM-yyyy"));
                                break;

                            case 17:
                                nowCell.SetCellValue(dataTable.Rows[i]["VersionPrice"].ToString());
                                break;

                        }
                    }

                    if (sheetNum > 1 && dataTable.Rows[i]["VersionPrice"].ToString().Contains("Float"))  // for merge row FloatFX and Actual -  do not generate new row
                    {
                    }
                    else
                    {
                        currentRow++;
                    }
                }
            }

            //for (int i = 0; i < dt.Rows.Count; i++)
            //{

            //    int startColumn = 0;


            //    IRow row = sheet.CreateRow(currentRowNow += 1);
            //    // Finding Start Column Month 1 to 36
            //    startColumn = GetMonthDifference(minDateTime, DateTime.Parse(dt.Rows[i]["FirstRunRateMonth"].ToString()));
            //    //for each column
            //    for (int j = 0; j < 36; j++)
            //    {
            //        if ((decimal)dt.Rows[i]["Month" + (j + 1)] == 0)
            //        {
            //            //continue;
            //        }
            //        row.CreateCell(j + startColumn + currentColumnIndex).SetCellValue(double.Parse(dt.Rows[i]["Month" + (j + 1).ToString()].ToString()));
            //    };

            //    currentRowNow++;
            //}
        }

        private void SetHeader(ISheet sheet, DateTime minDateTime, DateTime maxDateTime, int monthCounter, string headSheetName, string exportedDate)
        {

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

            IFont smallRed = workbook.CreateFont();
            smallRed.Color = HSSFColor.Red.Index;
            smallRed.IsBold = true;
            smallRed.FontHeightInPoints = 11;
            smallRed.FontName = "Calibri";


            //IFont font = workbook.CreateFont();
            //font.Color = HSSFColor.White.Index;

            ICellStyle styleHead_BigRed = workbook.CreateCellStyle();
            styleHead_BigRed.SetFont(bigRed);

            ICellStyle styleHead_Bold = workbook.CreateCellStyle();
            styleHead_Bold.SetFont(smallBlack);

            ICellStyle styleHead_bgPlaeBlue = workbook.CreateCellStyle();
            styleHead_bgPlaeBlue.FillForegroundColor = HSSFColor.PaleBlue.Index;
            styleHead_bgPlaeBlue.FillPattern = FillPattern.SolidForeground;
            styleHead_bgPlaeBlue.BorderLeft = BorderStyle.Thin;
            styleHead_bgPlaeBlue.BorderTop = BorderStyle.Thin;
            styleHead_bgPlaeBlue.BorderRight = BorderStyle.Thin;
            styleHead_bgPlaeBlue.BorderBottom = BorderStyle.Thin;
            styleHead_bgPlaeBlue.Alignment = HorizontalAlignment.Center;
            styleHead_bgPlaeBlue.SetFont(smallBlack);

            ICellStyle styleHead_black_bgFlowerBlue = workbook.CreateCellStyle();
            styleHead_black_bgFlowerBlue.FillForegroundColor = HSSFColor.LightCornflowerBlue.Index;
            styleHead_black_bgFlowerBlue.FillPattern = FillPattern.SolidForeground;
            styleHead_black_bgFlowerBlue.BorderLeft = BorderStyle.Thin;
            styleHead_black_bgFlowerBlue.BorderTop = BorderStyle.Thin;
            styleHead_black_bgFlowerBlue.BorderRight = BorderStyle.Thin;
            styleHead_black_bgFlowerBlue.BorderBottom = BorderStyle.Thin;
            styleHead_black_bgFlowerBlue.Alignment = HorizontalAlignment.Center;
            styleHead_black_bgFlowerBlue.SetFont(smallBlack);

            ICellStyle styleHead_red_bgFlowerBlue = workbook.CreateCellStyle();
            styleHead_red_bgFlowerBlue.FillForegroundColor = HSSFColor.LightCornflowerBlue.Index;
            styleHead_red_bgFlowerBlue.FillPattern = FillPattern.SolidForeground;
            styleHead_red_bgFlowerBlue.BorderLeft = BorderStyle.Thin;
            styleHead_red_bgFlowerBlue.BorderTop = BorderStyle.Thin;
            styleHead_red_bgFlowerBlue.BorderRight = BorderStyle.Thin;
            styleHead_red_bgFlowerBlue.BorderBottom = BorderStyle.Thin;
            styleHead_red_bgFlowerBlue.Alignment = HorizontalAlignment.Center;
            styleHead_red_bgFlowerBlue.SetFont(smallRed);


            currentRowIndex = 0;
            currentColumnIndex = 0;

            CellRangeAddress tmpRangeAddr;
            ICell tmpCell;
            IRow tmpRow;
            tmpRow = sheet.CreateRow(currentRowIndex);
            tmpCell = tmpRow.CreateCell(0);
            tmpCell.SetCellValue(headSheetName);
            tmpCell.CellStyle = styleHead_BigRed;

            tmpRow = sheet.CreateRow(currentRowIndex += 1);
            tmpCell = tmpRow.CreateCell(0);
            tmpCell.SetCellValue("Exported on : " + exportedDate);
            tmpCell.CellStyle = styleHead_Bold;


            IRow rowHeader1 = sheet.CreateRow(currentRowIndex += 1);

            tmpCell = rowHeader1.CreateCell(currentColumnIndex);
            tmpCell.SetCellValue("Key initiative details");
            tmpCell.CellStyle = styleHead_bgPlaeBlue;
            tmpRangeAddr = new CellRangeAddress(currentRowIndex, currentRowIndex, currentColumnIndex, currentColumnIndex += 4);
            sheet.AddMergedRegion(tmpRangeAddr);
            RegionUtil.SetBorderTop(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderLeft(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderRight(1, tmpRangeAddr, sheet, workbook);



            tmpCell = rowHeader1.CreateCell(currentColumnIndex += 1);
            tmpCell.SetCellValue("Accountability");
            tmpCell.CellStyle = styleHead_bgPlaeBlue;
            tmpRangeAddr = new CellRangeAddress(currentRowIndex, currentRowIndex, currentColumnIndex, currentColumnIndex += 4);
            sheet.AddMergedRegion(tmpRangeAddr);
            RegionUtil.SetBorderTop(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderLeft(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderRight(1, tmpRangeAddr, sheet, workbook);



            tmpCell = rowHeader1.CreateCell(currentColumnIndex += 1);
            tmpCell.SetCellValue("Value");
            tmpCell.CellStyle = styleHead_bgPlaeBlue;
            tmpRangeAddr = new CellRangeAddress(currentRowIndex, currentRowIndex, currentColumnIndex, currentColumnIndex += 3);
            sheet.AddMergedRegion(tmpRangeAddr);
            RegionUtil.SetBorderTop(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderLeft(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderRight(1, tmpRangeAddr, sheet, workbook);

            tmpCell = rowHeader1.CreateCell(currentColumnIndex += 1);
            tmpCell.SetCellValue("Timing");
            tmpCell.CellStyle = styleHead_bgPlaeBlue;
            tmpRangeAddr = new CellRangeAddress(currentRowIndex, currentRowIndex, currentColumnIndex, currentColumnIndex += 2);
            sheet.AddMergedRegion(tmpRangeAddr);
            RegionUtil.SetBorderTop(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderLeft(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderRight(1, tmpRangeAddr, sheet, workbook);

            tmpCell = rowHeader1.CreateCell(currentColumnIndex += 1);
            tmpCell.SetCellValue("ImpactData");
            tmpCell.CellStyle = styleHead_bgPlaeBlue;
            tmpRangeAddr = new CellRangeAddress(currentRowIndex, currentRowIndex, currentColumnIndex, currentColumnIndex + monthCounter + 36);
            sheet.AddMergedRegion(tmpRangeAddr);
            RegionUtil.SetBorderTop(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderLeft(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderRight(1, tmpRangeAddr, sheet, workbook);


            currentColumnIndex = 0;

            IRow rowHeader2 = sheet.CreateRow(currentRowIndex += 1);



            string[] strHeader2 = { "ID", "Sub-ID", "Title", "Stage Gate", "Financial Impact Area", "Workstream", "Sub-Workstream", "BU", "Type Of Benefit Group", "Type of Benefit", "IL4 Total Recurring Benefit", "IL4 Total One-Time Benefit", "IL5 Total Recurring Benefit", "IL5 Total One-Time Benefit", "Actual IL4 Date", "Target IL4 Date", "First Run Rate Month", "Cash-In Type" };


            for (int x = 0; x < strHeader2.Length; x++)
            {
                ICell createCol = rowHeader2.CreateCell(x);
                createCol.SetCellValue(strHeader2[x]);

                if (x == 0) //head ซ้าย
                {
                    styleHead_red_bgFlowerBlue.BorderLeft = BorderStyle.Thin;
                    styleHead_red_bgFlowerBlue.BorderRight = BorderStyle.None;
                }
                else if (x == strHeader2.Length) //head ขวา
                {
                    styleHead_red_bgFlowerBlue.BorderLeft = BorderStyle.None;
                    styleHead_red_bgFlowerBlue.BorderRight = BorderStyle.Thin;
                }
                else
                { // head ตรงกลาง
                    styleHead_red_bgFlowerBlue.BorderLeft = BorderStyle.None;
                    styleHead_red_bgFlowerBlue.BorderRight = BorderStyle.None;
                };

                createCol.CellStyle = styleHead_black_bgFlowerBlue;


                currentColumnIndex++;
            }

            styleHead_red_bgFlowerBlue.BorderLeft = BorderStyle.None;
            styleHead_red_bgFlowerBlue.BorderRight = BorderStyle.Thin;

            for (int i = 0; i < monthCounter + 36; i++)
            {
                ICell createCol = rowHeader2.CreateCell(i + currentColumnIndex);
                createCol.SetCellValue(CultureInfo.CurrentCulture.DateTimeFormat.GetAbbreviatedMonthName(minDateTime.AddMonths(i).Month) + "-" + minDateTime.AddMonths(i).Year);
                createCol.CellStyle = styleHead_black_bgFlowerBlue;
            }


            sheet.CreateFreezePane(0, 4);

            //currentRowIndex++;
            //currentColumnIndex++;
        }

        public int GetMonthDifference(DateTime startDate, DateTime endDate)
        {
            int monthsApart = 12 * (startDate.Year - endDate.Year) + startDate.Month - endDate.Month;
            return Math.Abs(monthsApart);
        }

        public void CreateSheet(string sheetName, string headerName, DateTime minDateTime, DateTime maxDateTime, int monthCounter, string exportedDate, ref ISheet _sheet, string reportType = null)
        {

            _sheet = workbook.CreateSheet(sheetName);
            if (reportType == null)
            {
                SetHeader(_sheet, minDateTime, maxDateTime, monthCounter, headerName, exportedDate);

            }
            else if (reportType == "UFDD")
            {
                SetHeader_UFDD(_sheet, minDateTime, maxDateTime, monthCounter, headerName, exportedDate);
            }
            else
            {
                SetHeader(_sheet, minDateTime, maxDateTime, monthCounter, headerName, exportedDate);
            }

        }

        private void SheetAddDataUFDD(ISheet sheet, DateTime minDateTime, DataTable dt, int currentRowNow, int sheetNum)
        {
            int columnHeaderCount = 21; //including 0   = 21 column  minus zero-index = 20
            int currentRow = currentRowIndex + 1;
            int currentColumn = 0;
            int startColumn = 0; // for month
            DataTable dataTable = new DataTable();

            int monthRange = 0;
            switch (sheetNum)
            {
                case 1:
                    monthRange = 36;
                    dataTable = dt.AsEnumerable().CopyToDataTable();
                    break;
            }

            for (int j = 0; j < dataTable.Columns.Count; j++) // column
            {
                currentRow = currentRowIndex + 1;

                if (j > columnHeaderCount && Math.Abs(j - columnHeaderCount) > monthRange)
                {
                    break;
                }

                for (int i = 0; i < dataTable.Rows.Count; i++) // row
                {
                    IRow nowRow = sheet.GetRow(currentRow);
                    if (nowRow == null)
                    {
                        nowRow = sheet.CreateRow(currentRow);
                    }

                    //starting filling months  IF column over 16
                    if (j > columnHeaderCount && Math.Abs(j - columnHeaderCount) <= monthRange)
                    {

                        //// j - column 0-16 and start month 1 to 36

                        //if (i > 0) //if now row > 0  ..
                        //{
                        //    // check this row is revise ? and value of actual > 0
                        //    if (dataTable.Rows[i]["grpNumber"].ToString() == dataTable.Rows[i - 1]["grpNumber"].ToString() && dataTable.Rows[i - 1]["Month" + (j - columnHeaderCount)].ToString().Length > 0)
                        //    {
                        //        if (sheetNum > 1 && dataTable.Rows[i]["VersionPrice"].ToString().Contains("Float"))  // for merge row FloatFX and Actual -  do not generate new row
                        //        {
                        //        }
                        //        else
                        //        {
                        //            currentRow++;
                        //        }

                        //        continue;
                        //    }
                        //}

                        //if (i > 1) //if now row > 0  ..
                        //{
                        //    // check this row is revise ? and value of actual > 0
                        //    if (dataTable.Rows[i]["grpNumber"].ToString() == dataTable.Rows[i - 2]["grpNumber"].ToString() && dataTable.Rows[i - 2]["Month" + (j - columnHeaderCount)].ToString().Length > 0)
                        //    {
                        //        if (sheetNum > 1 && dataTable.Rows[i]["VersionPrice"].ToString().Contains("Float"))  // for merge row FloatFX and Actual -  do not generate new row
                        //        {
                        //        }
                        //        else
                        //        {
                        //            currentRow++;
                        //        }
                        //        continue;
                        //    }
                        //}

                        //if (dataTable.Rows[i]["Month" + (j - columnHeaderCount)].ToString().Length == 0)
                        //{
                        //    if (sheetNum > 1 && dataTable.Rows[i]["VersionPrice"].ToString().Contains("Float"))   // for merge row FloatFX and Actual -  do not generate new row
                        //    {
                        //    }
                        //    else
                        //    {
                        //        currentRow++;
                        //    }
                        //    continue; //if value = 0 then skip row
                        //}

                        if (dataTable.Rows[i]["Month" + (j - columnHeaderCount)].ToString().Length == 0)
                        {
                            currentRow++;
                            continue;//if value = 0 then skip row
                        }
                            startColumn = GetMonthDifference(minDateTime, DateTime.Parse(dataTable.Rows[i]["FirstRunRateMonth"].ToString()));
                        ICell nowCell = nowRow.CreateCell(startColumn + j);
                        nowCell.SetCellValue(double.Parse(dataTable.Rows[i]["Month" + (j - columnHeaderCount)].ToString()));
                        //}                        
                    }
                    else
                    {
                        ICell nowCell = nowRow.CreateCell(j); //create cell according to column index

                        switch (j)
                        {
                            case 0:
                                nowCell.SetCellValue(dataTable.Rows[i]["InitiativeCode"].ToString());
                                break;
                            case 1:
                                // sub-id
                                nowCell.SetCellValue(dataTable.Rows[i]["Sub-Initiative Code"].ToString());
                                break;

                            case 2:
                                nowCell.SetCellValue(dataTable.Rows[i]["NAME"].ToString());
                                break;

                            case 3:
                                nowCell.SetCellValue(dataTable.Rows[i]["Stage"].ToString());
                                break;

                            case 4:
                                nowCell.SetCellValue(dataTable.Rows[i]["InitiativeType"].ToString());
                                break;

                            case 5:
                                nowCell.SetCellValue(dataTable.Rows[i]["FinancialImpactArea"].ToString());
                                break;

                            case 6:
                                if (dataTable.Rows[i]["CostCapex"].ToString().Length > 0)
                                    nowCell.SetCellValue(double.Parse(dataTable.Rows[i]["CostCapex"].ToString()));
                                break;
                            
                            case 7:
                                if (dataTable.Rows[i]["CostOpex"].ToString().Length > 0)
                                    nowCell.SetCellValue(double.Parse(dataTable.Rows[i]["CostOpex"].ToString()));
                                break;

                            case 8:
                                nowCell.SetCellValue(dataTable.Rows[i]["WorkStreamTitle"].ToString());
                                break;

                            case 9:
                                nowCell.SetCellValue(dataTable.Rows[i]["SubWorkStream1"].ToString());
                                break;

                            case 10:
                                nowCell.SetCellValue(dataTable.Rows[i]["SubWorkStream2"].ToString());
                                break;

                            case 11:
                                nowCell.SetCellValue(dataTable.Rows[i]["InitiativeOwner"].ToString());
                                break;

                            case 12:
                                nowCell.SetCellValue(dataTable.Rows[i]["Creator"].ToString());
                                break;

                            case 13:
                                nowCell.SetCellValue(dataTable.Rows[i]["TO Finance"].ToString());
                                break;

                            case 14:
                                nowCell.SetCellValue(dataTable.Rows[i]["Sponsor"].ToString());
                                break;

                            case 15:
                                if (dataTable.Rows[i]["IL3Date"].ToString().Length > 0)
                                    nowCell.SetCellValue(DateTime.Parse(dataTable.Rows[i]["IL3Date"].ToString()).ToString("dd-MMM-yyyy"));
                                break;

                            case 16:
                                if (dataTable.Rows[i]["IL4Date"].ToString().Length > 0)
                                    nowCell.SetCellValue(DateTime.Parse(dataTable.Rows[i]["IL4Date"].ToString()).ToString("dd-MMM-yyyy"));
                                break;

                            case 17:
                                if (dataTable.Rows[i]["IL5Date"].ToString().Length > 0)
                                    nowCell.SetCellValue(DateTime.Parse(dataTable.Rows[i]["IL5Date"].ToString()).ToString("dd-MMM-yyyy"));
                                break;

                            case 18:
                                nowCell.SetCellValue(dataTable.Rows[i]["TypeOfBenefitGroup"].ToString());
                                break;

                            case 19:
                                nowCell.SetCellValue(dataTable.Rows[i]["Type of Benefit"].ToString());
                                break;

                            case 20:
                                nowCell.SetCellValue(dataTable.Rows[i]["VersionPrice"].ToString());
                                break;
                            case 21:
                                nowCell.SetCellValue(dataTable.Rows[i]["RunRateSum"].ToString());
                                break;

                        }
                    }

                    //if (sheetNum > 1 && dataTable.Rows[i]["VersionPrice"].ToString().Contains("Float"))  // for merge row FloatFX and Actual -  do not generate new row
                    //{
                    //}
                    //else
                    //{
                    //    currentRow++;
                    //}
                    currentRow++;
                }
            }

            //for (int i = 0; i < dt.Rows.Count; i++)
            //{

            //    int startColumn = 0;


            //    IRow row = sheet.CreateRow(currentRowNow += 1);
            //    // Finding Start Column Month 1 to 36
            //    startColumn = GetMonthDifference(minDateTime, DateTime.Parse(dt.Rows[i]["FirstRunRateMonth"].ToString()));
            //    //for each column
            //    for (int j = 0; j < 36; j++)
            //    {
            //        if ((decimal)dt.Rows[i]["Month" + (j + 1)] == 0)
            //        {
            //            //continue;
            //        }
            //        row.CreateCell(j + startColumn + currentColumnIndex).SetCellValue(double.Parse(dt.Rows[i]["Month" + (j + 1).ToString()].ToString()));
            //    };

            //    currentRowNow++;
            //}
        }

        private void SetHeader_UFDD(ISheet sheet, DateTime minDateTime, DateTime maxDateTime, int monthCounter, string headSheetName, string exportedDate)
        {

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

            IFont smallRed = workbook.CreateFont();
            smallRed.Color = HSSFColor.Red.Index;
            smallRed.IsBold = true;
            smallRed.FontHeightInPoints = 11;
            smallRed.FontName = "Calibri";


            //IFont font = workbook.CreateFont();
            //font.Color = HSSFColor.White.Index;

            ICellStyle styleHead_BigRed = workbook.CreateCellStyle();
            styleHead_BigRed.SetFont(bigRed);

            ICellStyle styleHead_Bold = workbook.CreateCellStyle();
            styleHead_Bold.SetFont(smallBlack);

            ICellStyle styleHead_bgPlaeBlue = workbook.CreateCellStyle();
            styleHead_bgPlaeBlue.FillForegroundColor = HSSFColor.PaleBlue.Index;
            styleHead_bgPlaeBlue.FillPattern = FillPattern.SolidForeground;
            styleHead_bgPlaeBlue.BorderLeft = BorderStyle.Thin;
            styleHead_bgPlaeBlue.BorderTop = BorderStyle.Thin;
            styleHead_bgPlaeBlue.BorderRight = BorderStyle.Thin;
            styleHead_bgPlaeBlue.BorderBottom = BorderStyle.Thin;
            styleHead_bgPlaeBlue.Alignment = HorizontalAlignment.Center;
            styleHead_bgPlaeBlue.SetFont(smallBlack);

            ICellStyle styleHead_black_bgFlowerBlue = workbook.CreateCellStyle();
            styleHead_black_bgFlowerBlue.FillForegroundColor = HSSFColor.LightCornflowerBlue.Index;
            styleHead_black_bgFlowerBlue.FillPattern = FillPattern.SolidForeground;
            styleHead_black_bgFlowerBlue.BorderLeft = BorderStyle.Thin;
            styleHead_black_bgFlowerBlue.BorderTop = BorderStyle.Thin;
            styleHead_black_bgFlowerBlue.BorderRight = BorderStyle.Thin;
            styleHead_black_bgFlowerBlue.BorderBottom = BorderStyle.Thin;
            styleHead_black_bgFlowerBlue.Alignment = HorizontalAlignment.Center;
            styleHead_black_bgFlowerBlue.SetFont(smallBlack);

            ICellStyle styleHead_red_bgFlowerBlue = workbook.CreateCellStyle();
            styleHead_red_bgFlowerBlue.FillForegroundColor = HSSFColor.LightCornflowerBlue.Index;
            styleHead_red_bgFlowerBlue.FillPattern = FillPattern.SolidForeground;
            styleHead_red_bgFlowerBlue.BorderLeft = BorderStyle.Thin;
            styleHead_red_bgFlowerBlue.BorderTop = BorderStyle.Thin;
            styleHead_red_bgFlowerBlue.BorderRight = BorderStyle.Thin;
            styleHead_red_bgFlowerBlue.BorderBottom = BorderStyle.Thin;
            styleHead_red_bgFlowerBlue.Alignment = HorizontalAlignment.Center;
            styleHead_red_bgFlowerBlue.SetFont(smallRed);


            currentRowIndex = 0;
            currentColumnIndex = 0;

            CellRangeAddress tmpRangeAddr;
            ICell tmpCell;
            IRow tmpRow;
            tmpRow = sheet.CreateRow(currentRowIndex);
            tmpCell = tmpRow.CreateCell(0);
            tmpCell.SetCellValue(headSheetName);
            tmpCell.CellStyle = styleHead_BigRed;

            tmpRow = sheet.CreateRow(currentRowIndex += 1);
            tmpCell = tmpRow.CreateCell(0);
            tmpCell.SetCellValue("Exported on : " + exportedDate);
            tmpCell.CellStyle = styleHead_Bold;


            IRow rowHeader1 = sheet.CreateRow(currentRowIndex += 1);

            tmpCell = rowHeader1.CreateCell(currentColumnIndex);
            tmpCell.SetCellValue("Key initiative details");
            tmpCell.CellStyle = styleHead_bgPlaeBlue;
            tmpRangeAddr = new CellRangeAddress(currentRowIndex, currentRowIndex, currentColumnIndex, currentColumnIndex += 7);
            sheet.AddMergedRegion(tmpRangeAddr);
            RegionUtil.SetBorderTop(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderLeft(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderRight(1, tmpRangeAddr, sheet, workbook);



            tmpCell = rowHeader1.CreateCell(currentColumnIndex += 1);
            tmpCell.SetCellValue("Accountability");
            tmpCell.CellStyle = styleHead_bgPlaeBlue;
            tmpRangeAddr = new CellRangeAddress(currentRowIndex, currentRowIndex, currentColumnIndex, currentColumnIndex += 2);
            sheet.AddMergedRegion(tmpRangeAddr);
            RegionUtil.SetBorderTop(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderLeft(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderRight(1, tmpRangeAddr, sheet, workbook);



            tmpCell = rowHeader1.CreateCell(currentColumnIndex += 1);
            tmpCell.SetCellValue("Responsibility");
            tmpCell.CellStyle = styleHead_bgPlaeBlue;
            tmpRangeAddr = new CellRangeAddress(currentRowIndex, currentRowIndex, currentColumnIndex, currentColumnIndex += 3);
            sheet.AddMergedRegion(tmpRangeAddr);
            RegionUtil.SetBorderTop(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderLeft(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderRight(1, tmpRangeAddr, sheet, workbook);

            tmpCell = rowHeader1.CreateCell(currentColumnIndex += 1);
            tmpCell.SetCellValue("Timing");
            tmpCell.CellStyle = styleHead_bgPlaeBlue;
            tmpRangeAddr = new CellRangeAddress(currentRowIndex, currentRowIndex, currentColumnIndex, currentColumnIndex += 2);
            sheet.AddMergedRegion(tmpRangeAddr);
            RegionUtil.SetBorderTop(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderLeft(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderRight(1, tmpRangeAddr, sheet, workbook);

            tmpCell = rowHeader1.CreateCell(currentColumnIndex += 1);
            tmpCell.SetCellValue("ImpactData");
            tmpCell.CellStyle = styleHead_bgPlaeBlue;
            tmpRangeAddr = new CellRangeAddress(currentRowIndex, currentRowIndex, currentColumnIndex, (currentColumnIndex += 3) + monthCounter + 36);
            sheet.AddMergedRegion(tmpRangeAddr);
            RegionUtil.SetBorderTop(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderLeft(1, tmpRangeAddr, sheet, workbook);
            RegionUtil.SetBorderRight(1, tmpRangeAddr, sheet, workbook);


            currentColumnIndex = 0;

            IRow rowHeader2 = sheet.CreateRow(currentRowIndex += 1);



            string[] strHeader2 = { "Initiative ID", "Sub-Initiative ID", "Initiative Name", "Stage", "Initiative Type", "Financial Impact Area", "Cost CAPEX", "Cost OPEX", "Workstream", "Sub-Workstream 1", "Sub-Workstream 2", "Initiative Owner", "Creator", "TO Finance", "Sponsor", "Target IL3 Date", "Target IL4 Date", "Target IL5 Date", "Type Of Benefit Group", "Type of Benefit", "Type" , "RunRateSum" };


            for (int x = 0; x < strHeader2.Length; x++)
            {
                ICell createCol = rowHeader2.CreateCell(x);
                createCol.SetCellValue(strHeader2[x]);

                if (x == 0) //head ซ้าย
                {
                    styleHead_red_bgFlowerBlue.BorderLeft = BorderStyle.Thin;
                    styleHead_red_bgFlowerBlue.BorderRight = BorderStyle.None;
                }
                else if (x == strHeader2.Length) //head ขวา
                {
                    styleHead_red_bgFlowerBlue.BorderLeft = BorderStyle.None;
                    styleHead_red_bgFlowerBlue.BorderRight = BorderStyle.Thin;
                }
                else
                { // head ตรงกลาง
                    styleHead_red_bgFlowerBlue.BorderLeft = BorderStyle.None;
                    styleHead_red_bgFlowerBlue.BorderRight = BorderStyle.None;
                };

                createCol.CellStyle = styleHead_black_bgFlowerBlue;


                currentColumnIndex++;
            }

            styleHead_red_bgFlowerBlue.BorderLeft = BorderStyle.None;
            styleHead_red_bgFlowerBlue.BorderRight = BorderStyle.Thin;

            for (int i = 0; i < monthCounter + 36; i++)
            {
                ICell createCol = rowHeader2.CreateCell(i + currentColumnIndex);
                createCol.SetCellValue(CultureInfo.CurrentCulture.DateTimeFormat.GetAbbreviatedMonthName(minDateTime.AddMonths(i).Month) + "-" + minDateTime.AddMonths(i).Year);
                createCol.CellStyle = styleHead_black_bgFlowerBlue;
            }


            sheet.CreateFreezePane(0, 4);

            //currentRowIndex++;
            //currentColumnIndex++;
        }
    }
}