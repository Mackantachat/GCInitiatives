using System.Data;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Interface
{
    public interface StoreProcedureInterface
    {
        Task<DataTable> ExecuteReturnDatatable(string sqlcommandstring);
        Task<string> Execute(string value);
        Task<string> Execute_NoReturn(string sqlcommandstring);
        Task<string> Execute_NoReturnWithTryCatch(string sqlcommandstring);
        Task<DataSet> ExecuteReturnDataSet(string sqlcommandstring);
    }
}