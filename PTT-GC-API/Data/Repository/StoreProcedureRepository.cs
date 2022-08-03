using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using PTT_GC_API.Models.StoreProcedure;
using PTT_GC_API.Data.Interface;
using System.Text;
using Newtonsoft.Json;
using System;
using PTT_GC_API.Helpers;

namespace PTT_GC_API.Data.Repository
{
    public class StoreProcedureRepository : StoreProcedureInterface
    {
        private readonly string _connectionString;

        public StoreProcedureRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
        }

        public async Task<DataTable> ExecuteReturnDatatable(string sqlcommandstring)
        {
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(sqlcommandstring, "StoreProcedure-27", SQLCommandType.EXECUTE, false);
            // End log
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    SqlCommand objCmd = new SqlCommand();
                    SqlDataAdapter dtAdapter = new SqlDataAdapter();
                    DataSet ds = new DataSet();
                    DataTable dt;
                    string strSQL;
                    strSQL = sqlcommandstring;
                    sql.ConnectionString = _connectionString;
                    await sql.OpenAsync();
                    objCmd.Connection = sql;
                    objCmd.CommandText = strSQL;
                    objCmd.CommandType = CommandType.Text;
                    objCmd.CommandTimeout = 1800;
                    dtAdapter.SelectCommand = objCmd;
                    dtAdapter.Fill(ds);
                    if (ds.Tables.Count > 0) //it will error if not check tables count
                    {
                        dt = ds.Tables[0];
                    }
                    else
                    {
                        dt = new DataTable();
                    }
                    dtAdapter = null;
                    sql.Close();
                    return dt;
                }
            }
            catch (Exception ex)
            {
                return new DataTable();
            }
        }

        public async Task<string> Execute(string sqlcommandstring)
        {
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(sqlcommandstring, "StoreProcedure-69", SQLCommandType.EXECUTE, false);
            // End log
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                SqlCommand objCmd = new SqlCommand();
                SqlDataAdapter dtAdapter = new SqlDataAdapter();
                DataSet ds = new DataSet();
                DataTable dt;
                string strSQL;
                strSQL = sqlcommandstring;
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
                return DataTableToJsonWithJsonNet(dt);
            }
        }

        public async Task<string> Execute_NoReturn(string sqlcommandstring)
        {
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(sqlcommandstring, "StoreProcedure-96", SQLCommandType.EXECUTE, false);
            // End log
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                SqlCommand objCmd = new SqlCommand();
                SqlDataAdapter dtAdapter = new SqlDataAdapter();
                DataSet ds = new DataSet();
                DataTable dt;
                string strSQL;
                strSQL = sqlcommandstring;
                sql.ConnectionString = _connectionString;
                await sql.OpenAsync();
                objCmd.Connection = sql;
                objCmd.CommandText = strSQL;
                objCmd.CommandType = CommandType.Text;
                objCmd.ExecuteNonQuery();
                sql.Close();
                return "";
            }
        }

        public async Task<string> Execute_NoReturnWithTryCatch(string sqlcommandstring)
        {
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(sqlcommandstring, "StoreProcedure-120", SQLCommandType.EXECUTE, false);
            // End log
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    SqlCommand objCmd = new SqlCommand();
                    SqlDataAdapter dtAdapter = new SqlDataAdapter();
                    DataSet ds = new DataSet();
                    DataTable dt;
                    string strSQL;
                    strSQL = sqlcommandstring;
                    sql.ConnectionString = _connectionString;
                    await sql.OpenAsync();
                    objCmd.Connection = sql;
                    objCmd.CommandText = strSQL;
                    objCmd.CommandType = CommandType.Text;
                    objCmd.ExecuteNonQuery();
                    sql.Close();
                }
            }
            catch (Exception ex)
            {
                return "";
            }
            return "";
        }

        public string DataTableToJsonWithJsonNet(DataTable table)
        {
            string jsonString = string.Empty;
            jsonString = JsonConvert.SerializeObject(table);
            return jsonString;
        }

        public string DataTableToJSONWithStringBuilder(DataTable table)
        {
            var JSONString = new StringBuilder();
            if (table.Rows.Count > 0)
            {
                JSONString.Append("[");
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    JSONString.Append("{");
                    for (int j = 0; j < table.Columns.Count; j++)
                    {
                        if (j < table.Columns.Count - 1)
                        {
                            JSONString.Append("\"" + table.Columns[j].ColumnName.ToString() + "\":" + "\"" + table.Rows[i][j].ToString() + "\",");
                        }
                        else if (j == table.Columns.Count - 1)
                        {
                            JSONString.Append("\"" + table.Columns[j].ColumnName.ToString() + "\":" + "\"" + table.Rows[i][j].ToString() + "\"");
                        }
                    }
                    if (i == table.Rows.Count - 1)
                    {
                        JSONString.Append("}");
                    }
                    else
                    {
                        JSONString.Append("},");
                    }
                }
                JSONString.Append("]");
            }
            return JSONString.ToString();
        }
        public async Task<List<StoreProcedure>> GetAll()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("GetAllValues", sql))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    var response = new List<StoreProcedure>();
                    await sql.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response.Add(MapToValue(reader));
                        }
                    }

                    return response;
                }
            }
        }

        public async Task<DataSet> ExecuteReturnDataSet(string sqlcommandstring)
        {
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(sqlcommandstring, "StoreProcedure-213", SQLCommandType.EXECUTE, false);
            // End log
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    SqlCommand objCmd = new SqlCommand();
                    SqlDataAdapter dtAdapter = new SqlDataAdapter();
                    DataSet ds = new DataSet();
                    DataTable dt;
                    string strSQL;
                    strSQL = sqlcommandstring;
                    sql.ConnectionString = _connectionString;
                    await sql.OpenAsync();
                    objCmd.Connection = sql;
                    objCmd.CommandText = strSQL;
                    objCmd.CommandType = CommandType.Text;
                    objCmd.CommandTimeout = 1800;
                    dtAdapter.SelectCommand = objCmd;
                    dtAdapter.Fill(ds);
                    dtAdapter = null;
                    sql.Close();
                    return ds;
                }
            }
            catch (Exception ex)
            {
                return new DataSet();
            }
        }

        private StoreProcedure MapToValue(SqlDataReader reader)
        {
            return new StoreProcedure()
            {
                Id = (int)reader["Id"],
                Value1 = (int)reader["Value1"],
                Value2 = reader["Value2"].ToString()
            };
        }
    }
}