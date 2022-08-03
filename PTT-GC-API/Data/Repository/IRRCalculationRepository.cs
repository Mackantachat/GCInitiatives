using Microsoft.Extensions.Hosting;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using PTT_GC_API.Data.Interface;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class IRRCalculationRepository : IRRCalculationInterface
    {
        private readonly IHostEnvironment _hostingEnvironment;
        private IWorkbook book;
        private XSSFFormulaEvaluator formula;

        public IRRCalculationRepository(IHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public void LoadIrrExcel(string path, string fileName)
        {
            book = new XSSFWorkbook();

            try
            {
                FileStream fs = new FileStream(_hostingEnvironment.ContentRootPath + @$"/{path}{fileName}", FileMode.Open, FileAccess.ReadWrite, FileShare.ReadWrite);


                // Try to read workbook as XLSX:
                try
                {
                    book = new XSSFWorkbook(fs);

                }
                catch
                {
                    book = null;
                }

                // If reading fails, try to read workbook as XLS:
                if (book == null)
                {
                    book = new HSSFWorkbook(fs);
                }
            }
            catch (Exception ex)
            {
            }
        }

        public void SaveIrrExcel(string path, string fileName)
        {
            using (var fileData = new FileStream(_hostingEnvironment.ContentRootPath + @$"/{path}{fileName}", FileMode.Create))
            {
                book.Write(fileData);
                book.Close();
            }

        }

        public void SetCellValue(string sheetName, int rowIdx, int columnIdx, string valueToSet, string valueType = "double")
        {
            formula = new XSSFFormulaEvaluator(book);

            ISheet sheet = book.GetSheet(sheetName);
            sheet.ForceFormulaRecalculation = true;
            IRow row = sheet.GetRow(rowIdx);
            ICell cell = row.Cells[columnIdx];


            switch (valueType)
            {
                case "datetime":
                    cell.SetCellValue(DateTime.Parse(valueToSet));
                    cell.SetCellType(CellType.String);
                    break;

                case "string":
                    cell.SetCellValue(valueToSet);
                    cell.SetCellType(CellType.String);
                    break;

                default:
                    cell.SetCellValue(double.Parse(valueToSet));
                    cell.SetCellType(CellType.Numeric);
                    break;
            }


        }

        public double GetResultFromWorkbook(string sheetName, int rowIdx, int columnIdx)
        {
            formula = new XSSFFormulaEvaluator(book);

            ISheet sheet = book.GetSheet(sheetName);
            IRow rowResult = sheet.GetRow(rowIdx);
            ICell cellResult = rowResult.Cells[columnIdx];

            CellValue cellVal = formula.Evaluate(cellResult);

            if(cellVal != null && cellVal.CellType != CellType.Error)
            {
                return cellVal.NumberValue;
            }

            throw new Exception("Data not match criteria.");
        }

        public object GetResultFromWorkbook(string sheetName, int rowIdx, int columnIdx, string valueType)
        {
            formula = new XSSFFormulaEvaluator(book);

            ISheet sheet = book.GetSheet(sheetName);
            IRow rowResult = sheet.GetRow(rowIdx);
            ICell cellResult = rowResult.Cells[columnIdx];

            CellValue cellVal = formula.Evaluate(cellResult);

            switch (valueType)
            {
                case "number":
                    return cellVal.NumberValue;
                    break;
                case "string":
                    return cellVal.StringValue;
                    break;
                default:
                    return cellVal.StringValue;
                    break;
            }

            throw new Exception("Data not match criteria.");
        }

        public void EvaluateCell(string sheetName, int rowIdx, int columnIdx)
        {
            formula = new XSSFFormulaEvaluator(book);

            ISheet sheet = book.GetSheet(sheetName);
            IRow rowResult = sheet.GetRow(rowIdx);

            if (rowResult.Count() <= columnIdx)
                return;

            ICell cellResult = rowResult.Cells[columnIdx];

            //if (cellResult.CellType == CellType.String && cellResult.StringCellValue == null)
            //    return;

            //if (cellResult.CellType == CellType.Boolean && cellResult.BooleanCellValue == null)
            //    return;

            //if (cellResult.CellType == CellType.Blank && cellResult.StringCellValue == null)
            //    return;

            //if (cellResult.CellType == CellType.Error && cellResult.StringCellValue == null)
            //    return;

            //if (cellResult.CellType == CellType.Formula && cellResult.CellFormula == null)
            //    return;

            //if (cellResult.CellType == CellType.Numeric && cellResult.NumericCellValue == null)
            //    return;

            //if (cellResult.CellType == CellType.Unknown && cellResult.StringCellValue == null)
            //    return;

            //if (cellResult.StringCellValue == null)
            //    return;

            formula.Evaluate(cellResult);
        }

        public void LoopEvaluateWholeSheetWithIdx(string sheetName, int startRowIdx, int toRowIdx, int startColumnIdx, int toColumnIdx)
        {
            List<int> lstRow = new List<int>();
            List<int> lstCol = new List<int>();
            try
            {
                for (int i = startRowIdx; i < toRowIdx; i++)
                {
                    lstRow.Add(i);
                    for (int j = startColumnIdx; j < toColumnIdx; j++)
                    {
                        lstCol.Add(j);
                        Console.WriteLine($"sheet={sheetName} => i={i};j={j}");
                        EvaluateCell(sheetName, i, j);
                    }
                }
            }
            catch (Exception ex)
            {

            }
        }

        public void CopyIrrExcel(string path, string fileName, string newFileName)
        {
            throw new NotImplementedException();
        }

        public void DeleteIrrExcel(string path, string fileName)
        {
            File.Delete(_hostingEnvironment.ContentRootPath + @$"/{path}{fileName}");
        }

        public void QuitProcess()
        {
            throw new NotImplementedException();
        }
    }
}
