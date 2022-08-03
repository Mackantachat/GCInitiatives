using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace PTT_GC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetNowDateTimeController : ControllerBase
    {
        private readonly string _connectionString;

        public GetNowDateTimeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
        }

        [HttpGet("GetNowDateTime")]
        public async Task<IActionResult> GetNowDateTime()
        {
            return Ok(DateTime.Now);
        }

        [HttpGet("GetNowDateTimeDB")]
        public async Task<IActionResult> GetNowDateTimeDB()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                SqlCommand objCmd = new SqlCommand();
                SqlDataAdapter dtAdapter = new SqlDataAdapter();
                DataSet ds = new DataSet();
                DataTable dt;
                string strSQL;
                strSQL = "SELECT GETDATE() AS NowDate";
                sql.ConnectionString = _connectionString;
                await sql.OpenAsync();
                objCmd.Connection = sql;
                objCmd.CommandText = strSQL;
                objCmd.CommandType = CommandType.Text;
                dtAdapter.SelectCommand = objCmd;
                dtAdapter.Fill(ds);
                dt = ds.Tables[0];
                dtAdapter = null;
                sql.Close();
                return Ok(dt.Rows[0]["NowDate"]);
            }

        }
    }
}