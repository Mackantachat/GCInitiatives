using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface IRRCalculationInterface
    {
        public void LoadIrrExcel(string path, string fileName);
        public void SetCellValue(string sheetName, int rowIdx, int columnIdx, string valueToSet, string valueType = "double");
        public double GetResultFromWorkbook(string sheetName, int rowIdx, int columnIdx);
        public object GetResultFromWorkbook(string sheetName, int rowIdx, int columnIdx, string valueType);
        public void SaveIrrExcel(string path, string fileName);
        public void CopyIrrExcel(string path, string fileName, string newFileName);
        public void LoopEvaluateWholeSheetWithIdx(string sheetName, int startRowIdx, int toRowIdx, int startColumnIdx, int toColumnIdx);
        public void DeleteIrrExcel(string path, string fileName);
        public void QuitProcess();

    }
}
