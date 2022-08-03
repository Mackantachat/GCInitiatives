using Microsoft.Extensions.Hosting;
using PTT_GC_API.Data.Interface;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class IRRCalculateInterOp : IRRCalculationInterface
    {
        private readonly IHostEnvironment _hostingEnvironment;
        private Microsoft.Office.Interop.Excel.Application xlApp;
        private Microsoft.Office.Interop.Excel.Workbooks xlWorkBooks;
        private Microsoft.Office.Interop.Excel.Workbook xlWorkBook;
        private Microsoft.Office.Interop.Excel.Sheets xlSheets;
        private Microsoft.Office.Interop.Excel.Worksheet xlWorkSheet;

        public IRRCalculateInterOp(IHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public void LoadIrrExcel(string path, string fileName)
        {
            xlApp = new Microsoft.Office.Interop.Excel.Application();

            try
            {
                xlWorkBooks = xlApp.Workbooks;
                xlWorkBook = xlWorkBooks.Open(_hostingEnvironment.ContentRootPath + @$"/{path}{fileName}");
                xlSheets = xlWorkBook.Worksheets;
                xlWorkSheet = (Microsoft.Office.Interop.Excel.Worksheet)xlSheets["FORM"];
            }
            catch (Exception ex)
            {

            }
        }


        public void SaveIrrExcel(string path, string fileName)
        {
            xlWorkBook.Save();
        }

        public void SetCellValue(string sheetName, int rowIdx, int columnIdx, string valueToSet, string valueType = "double")
        {
            Microsoft.Office.Interop.Excel.Range cell = (Microsoft.Office.Interop.Excel.Range)xlWorkSheet.Cells[rowIdx, columnIdx];
            cell.Value2 = valueToSet;
        }

        public double GetResultFromWorkbook(string sheetName, int rowIdx, int columnIdx)
        {
            Microsoft.Office.Interop.Excel.Range cell = (Microsoft.Office.Interop.Excel.Range)xlWorkSheet.Cells[rowIdx, columnIdx];
            Microsoft.Office.Interop.Excel.Range cell2 = (Microsoft.Office.Interop.Excel.Range)xlWorkSheet.Cells[rowIdx, 1];

            return (double)cell.Value2;
        }

        public void EvaluateCell(string sheetName, int rowIdx, int columnIdx)
        {

        }

        public void LoopEvaluateWholeSheetWithIdx(string sheetName, int startRowIdx, int toRowIdx, int startColumnIdx, int toColumnIdx)
        {

        }

        public void CopyIrrExcel(string path, string fileName, string newFileName)
        {
            File.Copy(_hostingEnvironment.ContentRootPath + @$"/{path}{fileName}", _hostingEnvironment.ContentRootPath + @$"/{path}{newFileName}");
        }

        public void DeleteIrrExcel(string path, string fileName)
        {
            File.Delete(_hostingEnvironment.ContentRootPath + @$"/{path}{fileName}");
        }

        public void QuitProcess()
        {
            xlApp.Quit();

            Marshal.ReleaseComObject(xlWorkSheet);
            Marshal.ReleaseComObject(xlSheets);
            Marshal.ReleaseComObject(xlWorkBook);
            Marshal.ReleaseComObject(xlWorkBooks);
            Marshal.ReleaseComObject(xlApp);
        }

        public object GetResultFromWorkbook(string sheetName, int rowIdx, int columnIdx, string valueType)
        {
            throw new NotImplementedException();
        }
    }
}
