using PTT_GC_API.Controllers;
using PTT_GC_API.Dtos.Initiative;
using System;
using System.Data;
using System.IO;
using Xunit;

namespace XUnitTestInitiatives
{
    public class UnitTest2
    {
        [Fact]
        public void TestTest()
        {
            var PIM = new SuggestionController();
            var DIM = new SuggestionController();
            var CIM = new SuggestionController();
            var MAX = new SuggestionController();
            var CAPEX = new SuggestionController();
            Suggestion ss = new Suggestion();
            ss.RequestCapex = true;
            ss.TypeOfInvestment = "Others";
            ss.CostEstCapex = 32;
            //ss.JFactor = 0.3;
            ss.Irr = 77;
            ss.PayBackPeriod = 2.08;
            ss.BudgetType = "By initiative";
            //ss.Ram = "Medium / High";
            ss.TypeBenefit = "EBITDA";
            var xy = DIM.MAX_ItCapex_DigitalCapex(ss);
            var xx = PIM.PIM_SustainCore_Criteria_PayBackPeriod(ss);
            var xz = CIM.CIM_Divest_MnA(ss);
            var xa = MAX.MAX_SustainCore(ss);
            var xb = CAPEX.CAPEX_Criteria(ss);
            Assert.True(xb);

        }

        [Fact]
        public void Test1()
        { Assert.Equal(TestExcelRow(1), TestCode(1)); }
        [Fact]
        public void Test2()
        { Assert.Equal(TestExcelRow(2), TestCode(2)); }
        [Fact]
        public void Test3()
        { Assert.Equal(TestExcelRow(3), TestCode(3)); }
        [Fact]
        public void Test4()
        { Assert.Equal(TestExcelRow(4), TestCode(4)); }
        [Fact]
        public void Test5()
        { Assert.Equal(TestExcelRow(5), TestCode(5)); }
        [Fact]
        public void Test6()
        { Assert.Equal(TestExcelRow(6), TestCode(6)); }
        [Fact]
        public void Test7()
        { Assert.Equal(TestExcelRow(7), TestCode(7)); }
        [Fact]
        public void Test8()
        { Assert.Equal(TestExcelRow(8), TestCode(8)); }
        [Fact]
        public void Test9()
        { Assert.Equal(TestExcelRow(9), TestCode(9)); }
        [Fact]
        public void Test10()
        { Assert.Equal(TestExcelRow(10), TestCode(10)); }
        [Fact]
        public void Test11()
        { Assert.Equal(TestExcelRow(11), TestCode(11)); }

        [Fact]
        public void Test12()
        { Assert.Equal(TestExcelRow(12), TestCode(12)); }
        [Fact]
        public void Test13()
        { Assert.Equal(TestExcelRow(13), TestCode(13)); }

        [Fact]
        public void Test14()
        { Assert.Equal(TestExcelRow(14), TestCode(14)); }
        [Fact]
        public void Test15()
        { Assert.Equal(TestExcelRow(15), TestCode(15)); }
        [Fact]
        public void Test16()
        { Assert.Equal(TestExcelRow(16), TestCode(16)); }
        [Fact]
        public void Test17()
        { Assert.Equal(TestExcelRow(17), TestCode(17)); }
        [Fact]
        public void Test18()
        { Assert.Equal(TestExcelRow(18), TestCode(18)); }
        [Fact]
        public void Test19()
        { Assert.Equal(TestExcelRow(19), TestCode(19)); }
        [Fact]
        public void Test20()
        { Assert.Equal(TestExcelRow(20), TestCode(20)); }
        [Fact]
        public void Test21()
        { Assert.Equal(TestExcelRow(21), TestCode(21)); }
        [Fact]
        public void Test22()
        { Assert.Equal(TestExcelRow(22), TestCode(22)); }
        [Fact]
        public void Test23()
        { Assert.Equal(TestExcelRow(23), TestCode(23)); }
        [Fact]
        public void Test24()
        { Assert.Equal(TestExcelRow(24), TestCode(24)); }
        [Fact]
        public void Test25()
        { Assert.Equal(TestExcelRow(25), TestCode(25)); }
        [Fact]
        public void Test26()
        { Assert.Equal(TestExcelRow(26), TestCode(26)); }
        [Fact]
        public void Test27()
        { Assert.Equal(TestExcelRow(27), TestCode(27)); }
        [Fact]
        public void Test28()
        { Assert.Equal(TestExcelRow(28), TestCode(28)); }
        [Fact]
        public void Test29()
        { Assert.Equal(TestExcelRow(29), TestCode(29)); }
        [Fact]
        public void Test30()
        { Assert.Equal(TestExcelRow(30), TestCode(30)); }
        [Fact]
        public void Test31()
        { Assert.Equal(TestExcelRow(31), TestCode(31)); }
        [Fact]
        public void Test32()
        { Assert.Equal(TestExcelRow(32), TestCode(32)); }
        [Fact]
        public void Test33()
        { Assert.Equal(TestExcelRow(33), TestCode(33)); }
        [Fact]
        public void Test34()
        { Assert.Equal(TestExcelRow(34), TestCode(34)); }
        [Fact]
        public void Test35()
        { Assert.Equal(TestExcelRow(35), TestCode(35)); }
        [Fact]
        public void Test36()
        { Assert.Equal(TestExcelRow(36), TestCode(36)); }
        [Fact]
        public void Test37()
        { Assert.Equal(TestExcelRow(37), TestCode(37)); }
        [Fact]
        public void Test38()
        { Assert.Equal(TestExcelRow(38), TestCode(38)); }
        [Fact]
        public void Test39()
        { Assert.Equal(TestExcelRow(39), TestCode(39)); }
        [Fact]
        public void Test40()
        { Assert.Equal(TestExcelRow(40), TestCode(40)); }
        [Fact]
        public void Test41()
        { Assert.Equal(TestExcelRow(41), TestCode(41)); }
        [Fact]
        public void Test42()
        { Assert.Equal(TestExcelRow(42), TestCode(42)); }
        [Fact]
        public void Test43()
        { Assert.Equal(TestExcelRow(43), TestCode(43)); }
        [Fact]
        public void Test44()
        { Assert.Equal(TestExcelRow(44), TestCode(44)); }
        [Fact]
        public void Test45()
        { Assert.Equal(TestExcelRow(45), TestCode(45)); }
        [Fact]
        public void Test46()
        { Assert.Equal(TestExcelRow(46), TestCode(46)); }
        [Fact]
        public void Test47()
        { Assert.Equal(TestExcelRow(47), TestCode(47)); }
        [Fact]
        public void Test48()
        { Assert.Equal(TestExcelRow(48), TestCode(48)); }
        [Fact]
        public void Test49()
        { Assert.Equal(TestExcelRow(49), TestCode(49)); }
        [Fact]
        public void Test50()
        { Assert.Equal(TestExcelRow(50), TestCode(50)); }


        private string TestExcelRow(int i)
        {
            string returnvalie = string.Empty;
            DataTable dt = ReadCsvFile("C:\\Data test Sprint X3.csv");
            DataRow dr = dt.Rows[i];
            if (dr[23].ToString() == "Y") { returnvalie += " CIM[Y]"; } else { returnvalie += ""; }
            if (dr[24].ToString() == "Y") { returnvalie += " PIM[Y]"; } else { returnvalie += ""; }
            if (dr[25].ToString() == "Y") { returnvalie += " DIM[Y]"; } else { returnvalie += ""; }
            if (dr[26].ToString() == "Y") { returnvalie += " MAX[Y]"; } else { returnvalie += ""; }
            if (dr[27].ToString() == "Y") { returnvalie += " CAPEX[Y]"; } else { returnvalie += ""; }
            if (dr[28].ToString() == "Y") { returnvalie += " CPI[Y]"; } else { returnvalie += ""; }
            if (dr[28].ToString() == "Y") { returnvalie += " Strategy[Y]"; } else { returnvalie += ""; }
            if (dr[29].ToString() == "Y") { returnvalie += " R&D[Y]"; } else { returnvalie += ""; }
            return returnvalie;
        }

        private string TestCode(int i)
        {
            string returnvalie = string.Empty;
            DataTable dt = ReadCsvFile("C:\\Data test Sprint X3.csv");
            DataRow dr = dt.Rows[i];
            var PIM = new SuggestionController();
            Suggestion ini = new Suggestion();

            //ini.name = dr[1].ToString();
            //ini.code = dr[2].ToString();

            //if (ini.name.Contains("and")) 
            //{
            //    ini.name = ini.name.Replace("and","&");
            //}

            //ini.RequestCapex = true;
            //ini.TypeOfInvestment = "Environment";
            //ini.JFactor = 0.3;
            //ini.Ram = "Medium / High";

            if (dr[12].ToString() == "Y") //Request CAPEX
            { ini.RequestCapex = true; }
            else
            { ini.RequestCapex = false; }

            if (dr[13].ToString() == "") //CAPEX estimate
            { ini.CostEstCapex = 0; }
            else
            { ini.CostEstCapex = double.Parse(dr[13].ToString()); }

            if (dr[18].ToString() == "") // IRR
            { ini.Irr = 0; }
            else
            { ini.Irr = double.Parse(dr[18].ToString()); }

            if (dr[21].ToString() == "") //Payback 
            { ini.PayBackPeriod = 0; }
            else
            { ini.PayBackPeriod = double.Parse(dr[21].ToString()); }

            //if (dr[14].ToString() == "MandA") // Investment type
            //{ ini.TypeOfInvestment = "M&A"; }
            //else
            //{ ini.TypeOfInvestment = dr[14].ToString(); }
            ini.TypeOfInvestment = dr[14].ToString();
            if (ini.TypeOfInvestment.Contains("and"))
            {
                ini.TypeOfInvestment = ini.TypeOfInvestment.Replace("and", "&");
            }

            ini.TypeBenefit = dr[15].ToString(); // type of benefit
            if (dr[20].ToString() == "") //Jfactor
            { ini.JFactor = 0; }
            else
            { ini.JFactor = double.Parse(dr[20].ToString()); }
            ini.Ram = dr[19].ToString(); //Ram
            ini.CostEstCapexType = dr[17].ToString(); //Cost CAPEX type
            ini.BudgetType = dr[22].ToString(); //budget type

            returnvalie = GetSuggestString(ini);
            return returnvalie;
        }

        private string GetSuggestString(Suggestion ini)

        {
            var PIM = new SuggestionController();
            var CIM = new SuggestionController();
            var DIM = new SuggestionController();
            var MAX = new SuggestionController();
            var CAPEX = new SuggestionController();

            string returnvalie = string.Empty;
            //bool pels, pmain1;
            //pels = PIM.PIM_RAM_FACTOR_JFactor(ini);
            var pels = PIM.PIM_RAM_FACTOR(ini);
            var pmain1 = PIM.PIM_Maintain(ini);
            var pmain2 = PIM.PIM_Maintain_Criteria_PayBackPeriod(ini);
            var pmain3 = PIM.PIM_Maintain_Criteria_TypeBenefit(ini);
            var pgrow1 = PIM.PIM_Growth_Criteria_PayBackPeriod(ini);
            var pgrow2 = PIM.PIM_Growth_Criteria_TypeBenefit(ini);
            var psus1 = PIM.PIM_SustainCore_Criteria_PayBackPeriod(ini);
            var psus2 = PIM.PIM_SustainCore_Criteria_TypeBenefit(ini);
            var pene1 = PIM.PIM_SustainCore_EnergySaving_Criteria_PayBackPeriod(ini);
            var pene2 = PIM.PIM_SustainCore_EnergySaving_Criteria_TypeBenefit(ini);
            var mmain = PIM.MAX_Maintain(ini);
            var msus = MAX.MAX_SustainCore(ini);
            var csus = CIM.CIM_SustainCore(ini);
            var cgrow = CIM.CIM_Growth(ini);
            var mgrow = MAX.MAX_Growth(ini);
            var mrep = MAX.MAX_Replacement(ini);
            var mmai = MAX.MAX_Maintain(ini);
            var mene = MAX.MAX_SustainCore_EnergySaving(ini);
            var mcap = MAX.MAX_CostCapex(ini);
            var meng = MAX.MAX_Engineering(ini);
            var ccvc = CIM.CIM_CVC(ini);
            var cdi = CIM.CIM_Divest_MnA(ini);
            var cit = CIM.CIM_ItCapex_DigitalCapex(ini);
            var ceng = CIM.CIM_SustainCore_EnergySaving(ini);
            //var dim1 = DIM.DIM_ItCapex_DigitalCapex_Criteria(ini);
            var dim2 = DIM.DIM_ItCapex_DigitalCapex_Criteria_PayBackPeriod(ini);
            var dim3 = DIM.DIM_ItCapex_DigitalCapex_Criteria_TypeBenefit(ini);
            var dmax = DIM.MAX_ItCapex_DigitalCapex(ini);
            //var cper1 = CAPEX.CAPEX_Engineering_Criteria(ini);
            var cper2 = CAPEX.CAPEX_Engineering_Criteria_PayBackPeriod(ini);
            var cper3 = CAPEX.CAPEX_Engineering_Criteria_TypeBenefit(ini);

            var cothe1 = CAPEX.CAPEX_Criteria_PayBackPeriod(ini);
            var cothe2 = CAPEX.CAPEX_Criteria_TypeBenefit(ini);
            var crep1 = CAPEX.CAPEX_Replacement_Cost(ini);
            var crep2 = CAPEX.CAPEX_Replacement_Criteria_PayBackPeriod(ini);
            var crep3 = CAPEX.CAPEX_Replacement_Criteria_TypeBenefit(ini);

            if (pels || pmain2 || pmain3 || pmain1 || pgrow1 || pgrow2 || psus1 || psus2 || pene1 || pene2 == true) // Pim no MAX
            { returnvalie += " PIM[Y]"; }
            else { returnvalie += ""; }

            if (crep1 || crep2 || crep3 || cothe1 || cothe2 || cper2 || cper3 == true) // CAPEX No max
            { returnvalie += " CAPEX[Y]"; }
            else { returnvalie += ""; }

            if (mmain || msus || mgrow || msus || mmai || mene == true) // PIM MAX
            { returnvalie += " PIM[Y] MAX[Y]"; }
            else { returnvalie += ""; }


            if (mcap || meng || mrep == true) //CAPEX MAX
            { returnvalie += "CAPEX[Y] MAX[Y]"; }
            else { returnvalie += ""; }

            if (csus || cit || cgrow || ccvc || cdi || ceng == true) // CIM
            { returnvalie += " CIM[Y]"; }
            else { returnvalie += ""; }


            if (dim2 || dim3 == true) // dim no max
            { returnvalie += " DIM[Y]"; }
            else { returnvalie += ""; }
            if (dmax == true) // dim MAX
            { returnvalie += " DIM[Y] MAX[Y]"; }
            else { returnvalie += ""; }
            //if (ini.IsDIM()) { returnvalie += ":DIM[Y]"; } else { returnvalie += ":DIM[N]"; }
            //if (ini.IsCPI()) { returnvalie += ":CPI[Y]"; } else { returnvalie += ":CPI[N]"; }
            return returnvalie;
        }




        public DataTable ReadCsvFile(string Path)
        {

            DataTable dtCsv = new DataTable();
            string Fulltext;
            using (StreamReader sr = new StreamReader(Path))
            {
                while (!sr.EndOfStream)
                {
                    Fulltext = sr.ReadToEnd().ToString(); //read full file text  
                                                          //string[] rows = Fulltext.Split('\n'); //split full file text into rows
                    string[] rows = Fulltext.Split('\n'); //split full file text into rows  
                    for (int i = 0; i < rows.Length - 1; i++)
                    {
                        string[] rowValues = rows[i].Split(','); //split each row with comma to get individual values  
                        {
                            if (i == 0)
                            {
                                for (int j = 0; j < rowValues.Length; j++)
                                {
                                    dtCsv.Columns.Add(rowValues[j]); //add headers  
                                }
                            }
                            else
                            {
                                DataRow dr = dtCsv.NewRow();
                                //for (int k = 0; k < rowValues.Count(); k++)
                                //{
                                //    dr[k] = rowValues[k].ToString();
                                //}

                                for (int k = 0; k < rowValues.Length; k++)
                                {
                                    try
                                    {
                                        dr[k] = rowValues[k].ToString().Replace("๖", ",").Replace("&", "and").Replace("\"", "");
                                    }
                                    catch (Exception ex)
                                    {
                                        try
                                        {
                                            dr[k] = string.Empty;
                                        }
                                        catch (Exception ex2)
                                        {
                                        }
                                    }

                                }


                                dtCsv.Rows.Add(dr); //add other rows  
                            }
                        }
                    }
                }
            }
            return dtCsv;
        }


    }

}

