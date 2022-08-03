using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using PTT_GC_API.Data;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.SettingChart;
using PTT_GC_API.Models.Chart;
using PTT_GC_API.Models.SettingChart;

namespace PTT_GC_API.Controllers
{
    public class Graph
    {
        public int Id { get; set; }
        public string GraphName { get; set; }
        public string[] Garray { get; set; }
        public int SeriesId { get; set; }
    }
    public class Series
    {
        public int SeriesId { get; set; }
        public string Name { get; set; }
        public int Value { get; set; }

    }

    [Route("api/[controller]")]
    [ApiController]
    public class ChartController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly DataContext _context;
        private readonly CustomReportHeaderInterface _CustomReportrepository;
        public ChartController(IConfiguration config, CustomReportHeaderInterface CustomReportrepository, DataContext context)
        {
            configuration = config;
            _CustomReportrepository = CustomReportrepository;
            _context = context;
        }
        public DataTable Select_SQLCommand(string reportid)
        {
            var connectionString = configuration.GetConnectionString("SQLConnection");  // DefaultConnection
            if (string.IsNullOrEmpty(connectionString))
            {
                connectionString = configuration.GetConnectionString("DefaultConnection");
            }

            CustomReportHeader customReportHeader = _context.CustomReportHeader.Where(i => i.ReportID.ToString() == reportid).FirstOrDefault();

            string storeProcedureName = "";

            switch (customReportHeader.GraphType)
            {
                case "GraphHistoricalIL5":
                    storeProcedureName = "sp_CustomReportChart_Historical_IL5";
                    break;

                case "GraphHistoricalIL5_COE":
                    storeProcedureName = "sp_CustomReportChart_Historical_IL5_COE";
                    break;

                case "GraphHistoricalIL5_SEVP-D":
                    storeProcedureName = "sp_CustomReportChart_Historical_IL5_SEVP-D";
                    break;

                case "GraphHistoricalIL5_SEVP-U/MCS":
                    storeProcedureName = "sp_CustomReportChart_Historical_IL5_SEVP-U/MCS";
                    break;

                case "GraphHistoricalIL4":
                    storeProcedureName = "sp_CustomReportChart_Historical_IL4";
                    break;

                case "GraphHistoricalIL4_COE":
                    storeProcedureName = "sp_CustomReportChart_Historical_IL4_COE";
                    break;

                case "GraphHistoricalIL4_SEVP-D":
                    storeProcedureName = "sp_CustomReportChart_Historical_IL4_SEVP-D";
                    break;

                case "GraphHistoricalIL4_SEVP-U/MCS":
                    storeProcedureName = "sp_CustomReportChart_Historical_IL4_SEVP-U/MCS";
                    break;

                default:
                    storeProcedureName = "sp_CustomReportChart";
                    break;
            }

            // if (string.IsNullOrEmpty(connectionString)) throw new ArgumentException("No connection string in config.json");

            var resultTable = new DataTable();
            using (var conn = new SqlConnection(connectionString))
            {
                string Sql = "";
                Sql = $"exec [{storeProcedureName}] ";
                Sql += $"'{reportid}'";

                using (var cmd = new SqlCommand(Sql, conn))
                {
                    using (var adapter = new SqlDataAdapter(cmd))
                    {
                        adapter.Fill(resultTable);
                    }
                }
            }
            return resultTable;
        }

        [HttpGet("BarChartJS_Count_2")]
        public object Select_SQLCommand_For_Count_2(string reportid)
        {
            var connectionString = configuration.GetConnectionString("SQLConnection");  // DefaultConnection
            if (string.IsNullOrEmpty(connectionString))
            {
                connectionString = configuration.GetConnectionString("DefaultConnection");
            }

            string storeProcedureName = "";

            storeProcedureName = "sp_CustomReportChart_For_Count_2";

            var resultTable = new DataTable();
            using (var conn = new SqlConnection(connectionString))
            {
                string Sql = "";
                Sql = $"exec [{storeProcedureName}] ";
                //Sql += $"'{reportid}'";

                using (var cmd = new SqlCommand(Sql, conn))
                {
                    using (var adapter = new SqlDataAdapter(cmd))
                    {
                        adapter.Fill(resultTable);
                    }
                }
            }
            return resultTable;
        }

        public DataTable Select_SQLCommand_For_Count(string reportid)
        {
            var connectionString = configuration.GetConnectionString("SQLConnection");  // DefaultConnection
            if (string.IsNullOrEmpty(connectionString))
            {
                connectionString = configuration.GetConnectionString("DefaultConnection");
            }

            CustomReportHeader customReportHeader = _context.CustomReportHeader.Where(i => i.ReportID.ToString() == reportid).FirstOrDefault();

            string storeProcedureName = "";

            storeProcedureName = "sp_CustomReportChart_For_Count_2";

            // if (string.IsNullOrEmpty(connectionString)) throw new ArgumentException("No connection string in config.json");

            var resultTable = new DataTable();
            using (var conn = new SqlConnection(connectionString))
            {
                string Sql = "";
                Sql = $"exec [{storeProcedureName}] ";
                //Sql += $"'{reportid}'";

                using (var cmd = new SqlCommand(Sql, conn))
                {
                    using (var adapter = new SqlDataAdapter(cmd))
                    {
                        adapter.Fill(resultTable);
                    }
                }
            }
            return resultTable;
        }

        public DataTable SelectSQLCommandTable(string sp,string reportId)
        {
            var connectionString = configuration.GetConnectionString("SQLConnection");  // DefaultConnection
            if (string.IsNullOrEmpty(connectionString))
            {
                connectionString = configuration.GetConnectionString("DefaultConnection");
            }

            // if (string.IsNullOrEmpty(connectionString)) throw new ArgumentException("No connection string in config.json");

            var resultTable = new DataTable();
            using (var conn = new SqlConnection(connectionString))
            {
                string Sql = "";
                Sql = "exec ["+ sp + "] ";
                Sql += $"'{reportId}'";

                using (var cmd = new SqlCommand(Sql, conn))
                {
                    cmd.CommandTimeout = 1200;
                    using (var adapter = new SqlDataAdapter(cmd))
                    {

                        adapter.Fill(resultTable);
                    }
                }
            }
            return resultTable.AsEnumerable().Take(5000).CopyToDataTable();
        }

        [HttpGet("customtable")]
        public object CustomTable([FromQuery] string storeName, string reportid)
        {
            DataTable myDataTable = SelectSQLCommandTable(storeName, reportid);
            return myDataTable;
        }

        public class DataHeader  //Bar,Line,Stacked
        {
            public string TitleText { get; set; }
            public string LabelX { get; set; }
            public string LabelY { get; set; }
            public bool? ShowLabel { get; set; }
            public bool? ShowTargetLine { get; set; }
            public bool? ShowTable { get; set; }
            public bool? ShowSumLabel { get; set; }
            public new List<string> DataLabel { get; set; }
            public new List<object> Datasets { get; set; }

            public new List<string> BlankableValue { get; set; }
            public new List<decimal> TargetLine { get; set; }
            public decimal? HorizonLineValue { get; set; }
        }
        public class DatasetsChart
        {
            public List<string> labels { get; set; }
            public string label { get; set; }
            public new List<double> data { get; set; }
            public new List<string> backgroundColor { get; set; }
            public new List<string> borderColor { get; set; }
            public Boolean fill { get; set; }
            public int borderWidth { get; set; }

            //For Line
            public string type { get; set; }
            public int pointRadius { get; set; }
        }
        List<string> colors = new List<string> { "#5667AB", "#007227", "#D08845", "#71549A", "#A45251", "#E37647" };
        //List<string> colors = new List<string> {
        //    "rgba(255, 99, 132, 0.2)",
        //    "rgba(54, 162, 235, 0.2)",
        //    "rgba(255, 206, 86, 0.2)",
        //    "rgba(75, 192, 192, 0.2)",
        //    "rgba(153, 102, 255, 0.2)",
        //};

        [HttpGet("BarChartJS")]
        public object BarChartJS([FromQuery] string reportid)
        {
            DataTable myDataTable = Select_SQLCommand(reportid);
            var columnsName = new List<string>();
            var columnsNameX = new List<string>();
            var columnsNameY = new List<string>();
            var blankableValue = new List<string>();
            var targetLine = new List<string>();

            for (int i = 0; i < myDataTable.Columns.Count; i++)
            {
                columnsName.Add(myDataTable.Columns[i].ColumnName.ToString());
            }
            columnsNameX = columnsName.Where(q => q.StartsWith("X_") && (!q.Contains("Label"))).ToList();
            columnsNameY = columnsName.Where(q => q.StartsWith("Y_") && (!q.Contains("Label")) && (!q.Contains("Plan")) && (!q.Contains("Target Line"))).ToList();
            blankableValue = columnsName.Where(q => q.Contains("Plan")).ToList();
            targetLine = columnsName.Where(q => q.Contains("Target")).ToList();
            //columnsNameY = columnsName.Where(q => q.StartsWith("Y_") && (!q.Contains("Label")) && (!q.Contains("BlankableValue")) && (!q.Contains("Target Line"))).ToList();
            
            columnsNameY = blankableValue.Union(columnsNameY).ToList();

            List<string> listX = new List<string>();
            foreach (string str in columnsNameX)
            {
                foreach (DataRow rw in myDataTable.Rows)
                {
                    listX.Add(rw[str].ToString());
                }
            }

            if(listX.Count == 3)  // for reportId 6
            {
                listX.Add("Total");
            }

            List<string> listBlankableValue = new List<string>();
            foreach (string str in blankableValue)
            {
                foreach (DataRow rw in myDataTable.Rows)
                {
                    listBlankableValue.Add(rw[str].ToString());
                }
            }
            List<decimal> listTargetLine = new List<decimal>();
            foreach (string str in targetLine)
            {
                foreach (DataRow rw in myDataTable.Rows)
                {
                    listTargetLine.Add(decimal.Parse(rw[str].ToString() == "" ? "0" : rw[str].ToString()));
                }
            }


            var resultsTitle = (from p in myDataTable.AsEnumerable() select new { ReportName = p.Field<string>("ReportName")}).FirstOrDefault();
            var labelX = (from p in myDataTable.AsEnumerable() select new { labelX = p.Field<string>("X_Label") }).FirstOrDefault();
            var labelY = (from p in myDataTable.AsEnumerable() select new { labelY = p.Field<string>("Y_Label") }).FirstOrDefault();

            DataHeader header = new DataHeader();
            header.TitleText = resultsTitle.ReportName.ToString();
            header.LabelX = labelX.labelX.ToString();
            header.LabelY = labelY.labelY.ToString();
            header.DataLabel = listX;
            header.Datasets = new List<object>();
            header.BlankableValue = listBlankableValue;
            header.TargetLine = listTargetLine;
            header.ShowSumLabel = false;
            if (columnsNameX.Contains("X_Sub-Workstream_1") || columnsNameX.Contains("X_Workstream"))
            {
                header.ShowLabel = false;
                header.ShowTargetLine = false;
                header.ShowSumLabel = true;
                // header.TargetLine = new List<string> { "0" };

            }
            else
            {
                header.ShowLabel = true;
                header.ShowTargetLine = true;
            }

            if (columnsNameX.Contains("X_Sub-Workstream_1") || columnsNameX.Contains("X_Workstream") || columnsNameX.Contains("X_C-level"))
            {
                header.ShowTable = true;
                header.ShowSumLabel = true;
            }
            else
            {
                header.ShowTable = false;
            }

            // แสดงเส้นแนวนอน
            if ( columnsNameX.Contains("X_C-level") || listBlankableValue.Count > 40)
            {
                //header.HorizonLineValue = listTargetLine.Sum() == 0 ? 0 : listTargetLine.Sum();
                header.HorizonLineValue = listTargetLine.Count == 0 ? 0 : listTargetLine.Max();
            }

            double sumTotal = 0;
            List<double> dataChartTotal = new List<double>();
            int iColor = 0;
            foreach (string str in columnsNameY)
            {
                DatasetsChart dataSets = new DatasetsChart();
                dataSets.label = str.Substring(2); //str.Substring(11);
                List<double> dataChart = new List<double>();
                List<string> c = new List<string>();
                
                foreach (DataRow rw in myDataTable.Rows)
                {
                    if(rw[str].ToString() == "")
                    {
                        dataChart.Add(0);
                    }
                    else
                    {
                        dataChart.Add(Math.Round(double.Parse(rw[str].ToString()), 2));
                    }
                    
                    //c.Add(colors[iColor]);
                    c.Add(ColorChart(str.Substring(2)));
                    //sumTotal += double.Parse(rw[str].ToString());
                }
                sumTotal = dataChart.Sum();

                if (listX.Count == 4) // for reportId 6
                {
                    c.Add(ColorChart(str.Substring(2)));
                    dataChart.Add(sumTotal);
                }
               

                if (str.Contains("Plan") && listTargetLine.Count() > 40)
                {
                    dataSets.type = "line";
                    dataSets.borderWidth = 3;
                    dataSets.pointRadius = 0;
                    // 'rgba(255, 99, 132, 1)'
                    dataSets.borderColor = new List<string> { "red" };
                    dataSets.data = dataChart;
                    //dataSets.backgroundColor = c;
                }
                else
                {
                    dataSets.type = "bar";
                    dataSets.data = dataChart;
                    dataSets.backgroundColor = c;
                    dataSets.borderColor = c;
                    
                }

                iColor++;
                // iColor = 0;
              
                header.Datasets.Add(dataSets);
                //sumTotal = 0;

            }  //end for loop
            



            return header;
        }

        [HttpGet("BarChartJS_Count")]
        public object BarChartJS_Count([FromQuery] string reportid)
        {
            DataTable myDataTable = Select_SQLCommand_For_Count(reportid);
            var columnsName = new List<string>();
            var columnsNameX = new List<string>();
            var columnsNameY = new List<string>();
            var blankableValue = new List<string>();
            var targetLine = new List<string>();

            for (int i = 0; i < myDataTable.Columns.Count; i++)
            {
                columnsName.Add(myDataTable.Columns[i].ColumnName.ToString());
            }
            columnsNameX = columnsName.Where(q => q.StartsWith("X_") && (!q.Contains("Label"))).ToList();
            columnsNameY = columnsName.Where(q => q.StartsWith("Y_") && (!q.Contains("Label")) && (!q.Contains("Plan")) && (!q.Contains("Target Line"))).ToList();
            blankableValue = columnsName.Where(q => q.Contains("Plan")).ToList();
            targetLine = columnsName.Where(q => q.Contains("Target")).ToList();
            //columnsNameY = columnsName.Where(q => q.StartsWith("Y_") && (!q.Contains("Label")) && (!q.Contains("BlankableValue")) && (!q.Contains("Target Line"))).ToList();

            columnsNameY = blankableValue.Union(columnsNameY).ToList();

            List<string> listX = new List<string>();
            foreach (string str in columnsNameX)
            {
                foreach (DataRow rw in myDataTable.Rows)
                {
                    listX.Add(rw[str].ToString());
                }
            }
            List<string> listBlankableValue = new List<string>();
            foreach (string str in blankableValue)
            {
                foreach (DataRow rw in myDataTable.Rows)
                {
                    listBlankableValue.Add(rw[str].ToString());
                }
            }
            List<decimal> listTargetLine = new List<decimal>();
            foreach (string str in targetLine)
            {
                foreach (DataRow rw in myDataTable.Rows)
                {
                    listTargetLine.Add(decimal.Parse(rw[str].ToString() == "" ? "0" : rw[str].ToString()));
                }
            }


            var resultsTitle = (from p in myDataTable.AsEnumerable() select new { ReportName = p.Field<string>("ReportName") }).FirstOrDefault();
            var labelX = (from p in myDataTable.AsEnumerable() select new { labelX = p.Field<string>("X_Label") }).FirstOrDefault();
            var labelY = (from p in myDataTable.AsEnumerable() select new { labelY = p.Field<string>("Y_Label") }).FirstOrDefault();

            DataHeader header = new DataHeader();
            header.TitleText = resultsTitle.ReportName.ToString();
            header.LabelX = labelX.labelX.ToString();
            header.LabelY = labelY.labelY.ToString();
            header.DataLabel = listX;
            header.Datasets = new List<object>();
            header.BlankableValue = listBlankableValue;
            header.TargetLine = listTargetLine;
            header.ShowSumLabel = false;
            if (columnsNameX.Contains("X_Sub-Workstream_1") || columnsNameX.Contains("X_Workstream"))
            {
                header.ShowLabel = false;
                header.ShowTargetLine = false;
                header.ShowSumLabel = true;
                // header.TargetLine = new List<string> { "0" };
            }
            else
            {
                header.ShowLabel = true;
                header.ShowTargetLine = true;
            }

            if (columnsNameX.Contains("X_Sub-Workstream_1") || columnsNameX.Contains("X_Workstream") || columnsNameX.Contains("X_C-level"))
            {
                header.ShowTable = true;
                header.ShowSumLabel = true;
            }
            else
            {
                header.ShowTable = false;
            }

            // แสดงเส้นแนวนอน
            if (columnsNameX.Contains("X_C-level") || listBlankableValue.Count > 40)
            {
                //header.HorizonLineValue = listTargetLine.Sum() == 0 ? 0 : listTargetLine.Sum();
                header.HorizonLineValue = listTargetLine.Count == 0 ? 0 : listTargetLine.Max();
            }

            double sumTotal = 0;
            List<double> dataChartTotal = new List<double>();
            int iColor = 0;
            foreach (string str in columnsNameY)
            {
                DatasetsChart dataSets = new DatasetsChart();
                dataSets.label = str.Substring(2); //str.Substring(11);
                List<double> dataChart = new List<double>();
                List<string> c = new List<string>();

                foreach (DataRow rw in myDataTable.Rows)
                {
                    if (rw[str].ToString() == "")
                    {
                        dataChart.Add(0);
                    }
                    else
                    {
                        dataChart.Add(Math.Round(double.Parse(rw[str].ToString()), 2));
                    }

                    //c.Add(colors[iColor]);
                    c.Add(ColorChart(str.Substring(2)));
                    //sumTotal += double.Parse(rw[str].ToString());
                }
                sumTotal = dataChart.Sum();

                if (str.Contains("Plan") && listTargetLine.Count() > 40)
                {
                    dataSets.type = "line";
                    dataSets.borderWidth = 3;
                    dataSets.pointRadius = 0;
                    // 'rgba(255, 99, 132, 1)'
                    dataSets.borderColor = new List<string> { "red" };
                    dataSets.data = dataChart;
                    //dataSets.backgroundColor = c;
                }
                else
                {
                    dataSets.type = "bar";
                    dataSets.data = dataChart;
                    dataSets.backgroundColor = c;
                    dataSets.borderColor = c;

                }

                iColor++;
                // iColor = 0;


                header.Datasets.Add(dataSets);
                //sumTotal = 0;
            }

            return header;
        }

        [HttpGet("PieChartJS")]
        public object PieChartJS([FromQuery] string reportid)
        {
            DataTable myDataTable = Select_SQLCommand(reportid);
            var columnsName = new List<string>();
            var columnsNameX = new List<string>();
            var columnsNameY = new List<string>();

            for (int i = 0; i < myDataTable.Columns.Count; i++)
            {
                columnsName.Add(myDataTable.Columns[i].ColumnName.ToString());
            }
            columnsNameX = columnsName.Where(q => q.StartsWith("X_") && (!q.Contains("Label"))).ToList();
            columnsNameY = columnsName.Where(q => q.StartsWith("Y_") && (!q.Contains("Label"))).ToList();

            List<string> listX = new List<string>();
            foreach (string str in columnsNameX)
            {
                foreach (DataRow rw in myDataTable.Rows)
                {
                    listX.Add(rw[str].ToString());
                }
            }

            var resultsTitle = (from p in myDataTable.AsEnumerable() select new { ReportName = p.Field<string>("ReportName") }).FirstOrDefault();

            DataHeader header = new DataHeader();
            header.TitleText = resultsTitle.ReportName.ToString();
            header.DataLabel = columnsNameY;
            header.Datasets = new List<object>();
            DatasetsChart dataSets = new DatasetsChart();
            List<double> dataChart = new List<double>();
            double SumDataChart = 0;
            int iColor = 0;
            
            foreach (string str in columnsNameY)
            {
                List<string> c = new List<string>();
                foreach (DataRow rw in myDataTable.Rows)
                {
                    SumDataChart += Math.Round(double.Parse(rw[str].ToString()), 2);
                    c.Add(colors[iColor]);
                    iColor++;
                }
                iColor = 0;
                dataChart.Add(SumDataChart);
                dataSets.label = "ssss";
                dataSets.data = dataChart;
                dataSets.backgroundColor = c;
                dataSets.borderColor = c;
                dataSets.fill = false;
                dataSets.borderWidth = 1;
                SumDataChart = 0;
            }
            header.Datasets.Add(dataSets);
            return header;
            //foreach (string str in columnsNameY)
            //{
            //    DatasetsChart dataSets = new DatasetsChart();
            //    List<double> dataChart = new List<double>();
            //    labelChart.Add(str.Substring(2));
            //    //header.DataLabel = labelChart;
            //    double SumDataChart = 0;
            //    foreach (DataRow rw in myDataTable.Rows)
            //    {
            //        SumDataChart += Math.Round(double.Parse(rw[str].ToString()), 2);
            //    }
            //    dataChart.Add(SumDataChart);
            //    dataSets.data = dataChart;
            //    header.Datasets.Add(dataSets);
            //}
        }

        public string ColorChart(string label)
        {
            string color = "";

            switch (label)
            {
                case "Y_IL0-IL2":
                case "IL0-IL2":
                    color = "#A5A5A5";
                    break;
                case "IL3":
                case "Y_IL3":
                    color = "#F3D603";
                    break;
                case "Y_SIL4":
                case "SIL4":
                    color = "#B3ED4C";
                    break;
                case "Y_IL4":
                case "IL4":
                    color = "#228F05";
                    break;
                case "Unconverted_IL4":
                    color = "#92D050";
                    break;
                case "Y_SIL5":
                case "SIL5":
                    color = "#8AA5FA";
                    break;
                case "Y_IL5":
                case "IL5":
                    color = "#16096D";
                    break;
                default:
                    color = "pink";
                    break;
            }

            return color;
        }

        [HttpGet("PieChart")]
        public object PieChart([FromQuery] string reportid)
        {
            DataTable myDataTable = Select_SQLCommand(reportid);
            string titleText = "";
            //Get Columns Names
            var columnsName = new List<string>();
            var columnsNameX = new List<string>();
            var columnsNameY = new List<string>();

            for (int i = 0; i < myDataTable.Columns.Count; i++)
            {
                columnsName.Add(myDataTable.Columns[i].ColumnName.ToString());
            }
            columnsNameX = columnsName.Where(q => q.StartsWith("X_") && (!q.Contains("Label"))).ToList();
            columnsNameY = columnsName.Where(q => q.StartsWith("Y_") && (!q.Contains("Label"))).ToList();

            Dictionary<string, List<decimal>> dictY = new Dictionary<string, List<decimal>>();

            List<string> listX = new List<string>();
            foreach (string str in columnsNameX)
            {
                foreach (DataRow rw in myDataTable.Rows)
                {
                    listX.Add(rw[str].ToString());
                }
            }

            var resultsTitle = (from p in myDataTable.AsEnumerable()
                                select new
                                {
                                    ReportName = p.Field<string>("ReportName"),
                                }).FirstOrDefault();

            PatternSeriesPie pattern = new PatternSeriesPie();
            pattern.Titletext = resultsTitle.ReportName.ToString();
            pattern.Series = new List<PatternDataPie>();
           
            PatternDataPie dataP = new PatternDataPie();
            dataP.Data = new List<object>();

            pattern.Series.Add(dataP);
            //pattern.Series.Add(dataP.Data);

            //name, y
            foreach (string str in columnsNameY)
            {
                DataPie dataPie = new DataPie();
                dataPie.name = str.Substring(2);
                dataPie.y = 20;

                foreach (DataRow rw in myDataTable.Rows)
                {
                    dataPie.y += (Math.Round(double.Parse(rw[str].ToString()), 2));
                }
                dataP.Data.Add(dataPie);
            }

            return pattern;
        }

        // GET: api/Chart
        [HttpGet]
        public object Get([FromQuery] string reportid)
        {
            DataTable myDataTable = Select_SQLCommand(reportid);
            string titleText = "";
            //Get Columns Names
            var columnsName = new List<string>();
            var columnsNameX = new List<string>();
            var columnsNameY = new List<string>();

            for (int i = 0; i < myDataTable.Columns.Count; i++)
            {
                columnsName.Add(myDataTable.Columns[i].ColumnName.ToString());
            }
            columnsNameX = columnsName.Where(q => q.StartsWith("X_") && (!q.Contains("Label"))).ToList();
            columnsNameY = columnsName.Where(q => q.StartsWith("Y_") && (!q.Contains("Label"))).ToList();
            Dictionary<string, List<decimal>> dictY = new Dictionary<string, List<decimal>>();

            List<string> listX = new List<string>();
            foreach (string str in columnsNameX)
            {
                foreach (DataRow rw in myDataTable.Rows)
                {
                    listX.Add(rw[str].ToString());
                }
            }

            var resultsTitle = (from p in myDataTable.AsEnumerable()
                          select new
                          {
                              ReportName = p.Field<string>("ReportName"),
                          }).FirstOrDefault();

            PatternData pattern = new PatternData();
            pattern.Titletext = resultsTitle.ReportName.ToString();
            pattern.Catagories = listX;
            pattern.Series = new List<object>();
            foreach (string str in columnsNameY)
            {
                SeriesData series = new SeriesData();
                series.name = str.Substring(2);//str.Substring(11);
                series.data = new List<object>();

                foreach (DataRow rw in myDataTable.Rows)
                {
                    series.data.Add(Math.Round(double.Parse(rw[str].ToString()), 2));
                }
                pattern.Series.Add(series);
            }
            return pattern;
        }

        [HttpGet("GCTable")]  //ไม่ได้ใช้แล้ว
        public object GCTable()
        {
            List<string> SubGroup = new List<string>();
            SubGroup.Add("BUA");
            SubGroup.Add("Sustain Core < 300");
            SubGroup.Add("R&D");
            SubGroup.Add("Max Infinity");
            SubGroup.Add("Digital&IT");
            SubGroup.Add("MTPi");
            SubGroup.Add("Large Project");
            SubGroup.Add("MAX Large Project (>300 MB)");
            SubGroup.Add("Growth");


            var CapexInfo = (from a in _context.Initiatives.Where(i => (i.HistoryFlag == null || i.HistoryFlag == 0))
                             join b in _context.CapexInformations
                               on a.Id equals b.InitiativeId
                               select new
                               {
                                   id = a.Id,
                                   company = a.Company,
                                   typeOfInvestment = a.TypeOfInvestment,
                                   projectCost = b.ProjectCost
                               }).ToList();


            var bua = from a in SubGroup
                      where a.ToString() == "BUA"
                      select new
                      {
                          CAPEX = a.ToString(),
                          Count_GCOnly = (from b in CapexInfo where b.company == "GC" &&
                                          (b.typeOfInvestment == "Environment" || b.typeOfInvestment == "Safty" || 
                                          b.typeOfInvestment == "Law & Regulation" || b.typeOfInvestment == "Maintain Reliability" || 
                                          b.typeOfInvestment == "Replacement") select b.id).Count(),
                          Sum_GCOnly = (from b in CapexInfo
                                        where b.company == "GC" &&
                                        (b.typeOfInvestment == "Environment" || b.typeOfInvestment == "Safty" ||
                                        b.typeOfInvestment == "Law & Regulation" || b.typeOfInvestment == "Maintain Reliability" ||
                                        b.typeOfInvestment == "Replacement")
                                        select b.projectCost).Sum(),
                      };


            return bua;
        }

        // GET: api/Chart/5
        //[HttpGet("{id}", Name = "Get")]
        //public object Get(int id)
        //{
        //    DataTable myDataTable = Select_SQLCommand(id);
        //    string titleText = "";
        //    //Get Columns Names
        //    var columnsName = new List<string>();
        //    var columnsNameX = new List<string>();
        //    var columnsNameY = new List<string>();

        //    for (int i = 0; i < myDataTable.Columns.Count; i++)
        //    {
        //        columnsName.Add(myDataTable.Columns[i].ColumnName.ToString());
        //    }
        //    columnsNameX = columnsName.Where(q => q.StartsWith("X_") && (!q.Contains("Label"))).ToList();
        //    columnsNameY = columnsName.Where(q => q.StartsWith("Y_") && (!q.Contains("Label"))).ToList();
        //    Dictionary<string, List<decimal>> dictY = new Dictionary<string, List<decimal>>();
        //    List<string> listX = new List<string>();
        //    foreach (string str in columnsNameX)
        //    {
        //        foreach (DataRow rw in myDataTable.Rows)
        //        {
        //            listX.Add(rw[str].ToString());
        //        }
        //    }
        //    PatternData pattern = new PatternData();
        //    pattern.Titletext = "";
        //    pattern.Catagories = listX;
        //    pattern.Series = new List<object>();
        //    foreach (string str in columnsNameY)
        //    {
        //        SeriesData series = new SeriesData();
        //        series.name = str.Substring(13);
        //        series.data = new List<object>();

        //        foreach (DataRow rw in myDataTable.Rows)
        //        {
        //            series.data.Add(double.Parse(rw[str].ToString()));
        //        }
        //        pattern.Series.Add(series);
        //    }
        //    return pattern;
        //}

        // POST: api/Chart
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Chart/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

    }

   

    public  class PatternData
    {
        public string Titletext { get; set; }
        public new List<string> Catagories { get; set; }
        public new List<object> Series { get; set; }

    }

    public class SeriesData
    {
        public string name { get; set; }
        public new List<object> data { get; set; }
    }


    public class PatternSeriesPie
    {
        public string Titletext { get; set; }
        public new List<PatternDataPie> Series { get; set; }

    }

    public class PatternDataPie
    {
        public new List<object> Data { get; set; }
    }

    public class DataPie
    {
        public string name { get; set; }
        public double y { get; set; }
    }

}
