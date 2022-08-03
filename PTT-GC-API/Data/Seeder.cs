using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using PTT_GC_API.Models.Milestone;
using PTT_GC_API.Models.Product;
using PTT_GC_API.Models.TypeOfInvestment;
using PTT_GC_API.Models.Organization;
using PTT_GC_API.Models.CoDeveloper;
using PTT_GC_API.Models.EntryMode;
using PTT_GC_API.Models.Owner;
using PTT_GC_API.Models.Plant;
using PTT_GC_API.Models.Strategy;
using PTT_GC_API.Models.TypeOfBenefit;
using PTT_GC_API.Models.WorkStream;
using PTT_GC_API.Models.DetailInformation;
using PTT_GC_API.Models.PoolBudget;
using PTT_GC_API.Models.Currency;
using PTT_GC_API.Models.SettingChart;
using PTT_GC_API.Models.TypeofStage;
using PTT_GC_API.Models.OverviewPermission;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.TempHRWebService;
using PTT_GC_API.Models.URLTableSetting;
using PTT_GC_API.Models.ITBudget;
using PTT_GC_API.Models.CommonData;

namespace PTT_GC_API.Data
{
    public class Seeder
    {
        private static Random random = new Random();

        private static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public static void SeedOverviewPermission(DataContext context)
        {
            if (!context.OverviewPermissions.Any())
            {
                var data   = System.IO.File.ReadAllText("Json/OverviewPermission.json");
                var result = JsonConvert.DeserializeObject<List<OverviewPermission>>(data);
                foreach (var item in result)
                {
                    context.OverviewPermissions.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedMaxApproverSetting(DataContext context)
        {
            if (!context.MaxApproverSettings.Any())
            {
                var data   = System.IO.File.ReadAllText("Json/MaxApprover.json");
                var result = JsonConvert.DeserializeObject<List<MaxApproverSetting>>(data);
                foreach (var item in result)
                {
                    context.MaxApproverSettings.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedPlans(DataContext context)
        {
            if (!context.Plants.Any())
            {
                var data = System.IO.File.ReadAllText("Json/Plants.json");
                var result = JsonConvert.DeserializeObject<List<Plant>>(data);
                foreach (var item in result)
                {
                    context.Plants.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedOrganization(DataContext context)
        {
            if (!context.Organizations.Any())
            {
                var data = System.IO.File.ReadAllText("Json/Organization.json");
                var result = JsonConvert.DeserializeObject<List<Organization>>(data);
                foreach (var item in result)
                {
                    context.Organizations.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedCoDeveloper(DataContext context)
        {
            if (!context.CoDevelopers.Any())
            {
                var data = System.IO.File.ReadAllText("Json/CoDevelopers.json");
                var result = JsonConvert.DeserializeObject<List<CoDeveloper>>(data);
                foreach (var item in result)
                {
                    context.CoDevelopers.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedOwner(DataContext context)
        {
            if (!context.Owners.Any())
            {
                var data = System.IO.File.ReadAllText("Json/Owners.json");
                var result = JsonConvert.DeserializeObject<List<Owner>>(data);
                foreach (var item in result)
                {
                    context.Owners.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedTypeOfInvestment(DataContext context)
        {
            if (!context.TypeOfInvestments.Any())
            {
                var data = System.IO.File.ReadAllText("Json/TypeOfInvestments.json");
                var result = JsonConvert.DeserializeObject<List<TypeOfInvestment>>(data);
                foreach (var item in result)
                {
                    context.TypeOfInvestments.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedMilestoneStatus(DataContext context)
        {
            if (!context.MilestoneStatuses.Any())
            {
                var data = System.IO.File.ReadAllText("Json/MilestoneStatus.json");
                var result = JsonConvert.DeserializeObject<List<MilestoneStatus>>(data);
                foreach (var item in result)
                {
                    context.MilestoneStatuses.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedProductUnit(DataContext context)
        {
            if (!context.ProductUnits.Any())
            {
                var data = System.IO.File.ReadAllText("Json/ProductUnit.json");
                var result = JsonConvert.DeserializeObject<List<ProductUnit>>(data);
                foreach (var item in result)
                {
                    context.ProductUnits.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedStrategy(DataContext context)
        {
            if (!context.Strategies.Any())
            {
                var data = System.IO.File.ReadAllText("Json/Strategy.json");
                var result = JsonConvert.DeserializeObject<List<Strategy>>(data);
                foreach (var item in result)
                {
                    context.Strategies.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedEntryMode(DataContext context)
        {
            if (!context.EntryModes.Any())
            {
                var data = System.IO.File.ReadAllText("Json/EntryMode.json");
                var result = JsonConvert.DeserializeObject<List<EntryMode>>(data);
                foreach (var item in result)
                {
                    context.EntryModes.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedStrategicObjective(DataContext context)
        {
            if (!context.StrategicObjectives.Any())
            {
                var data = System.IO.File.ReadAllText("Json/StrategicObjective.json");
                var result = JsonConvert.DeserializeObject<List<StrategicObjective>>(data);
                foreach (var item in result)
                {
                    context.StrategicObjectives.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedTypeOfBenefit(DataContext context)
        {
            if (!context.TypeOfBenefits.Any())
            {
                var data = System.IO.File.ReadAllText("Json/TypeOfBenefit.json");
                var result = JsonConvert.DeserializeObject<List<TypeOfBenefit>>(data);
                foreach (var item in result)
                {
                    context.TypeOfBenefits.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedWorkStream(DataContext context)
        {
            if (!context.WorkStreams.Any())
            {
                var data = System.IO.File.ReadAllText("Json/WorkStream.json");
                var result = JsonConvert.DeserializeObject<List<WorkStream>>(data);
                foreach (var item in result)
                {
                    context.WorkStreams.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedInitiativeTypeMax(DataContext context)
        {
            if (!context.InitiativeTypeMaxs.Any())
            {
                IList<InitiativeTypeMax> item = new List<InitiativeTypeMax>();
                item.Add(new InitiativeTypeMax() { InitiativeTypeMaxTitle = "MAX Infinity" });
                item.Add(new InitiativeTypeMax() { InitiativeTypeMaxTitle = "MAX" });
                item.Add(new InitiativeTypeMax() { InitiativeTypeMaxTitle = "Enhancement" });
                item.Add(new InitiativeTypeMax() { InitiativeTypeMaxTitle = "MTPI" });
                context.AddRange(item);
                context.SaveChanges();
            }
        }
        public static void SeedSubWorkstream(DataContext context)
        {
            if (!context.SubWorkstreams.Any())
            {
                var data = System.IO.File.ReadAllText("Json/SubWorkstream.json");
                var result = JsonConvert.DeserializeObject<List<SubWorkstream>>(data);
                foreach (var item in result)
                {
                    context.SubWorkstreams.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedFrequency(DataContext context)
        {
            if (!context.Frequencies.Any())
            {
                IList<Frequency> item = new List<Frequency>();
                item.Add(new Frequency() { FrequencyTitle = "Month" });
                item.Add(new Frequency() { FrequencyTitle = "Quarter" });
                item.Add(new Frequency() { FrequencyTitle = "Year" });
                item.Add(new Frequency() { FrequencyTitle = "Project Completion" });
                context.AddRange(item);
                context.SaveChanges();
            }
        }
        public static void SeedKpis(DataContext context)
        {
            if (!context.Kpises.Any())
            {
                IList<Kpis> item = new List<Kpis>();
                item.Add(new Kpis() { KpisTitle = "Useful life" });
                item.Add(new Kpis() { KpisTitle = "IRR" });
                item.Add(new Kpis() { KpisTitle = "NPV" });
                item.Add(new Kpis() { KpisTitle = "Payback" });
                item.Add(new Kpis() { KpisTitle = "Project Cost" });
                item.Add(new Kpis() { KpisTitle = "Schedule" });
                item.Add(new Kpis() { KpisTitle = "ISR" });
                item.Add(new Kpis() { KpisTitle = "IFR" });
                item.Add(new Kpis() { KpisTitle = "Average EBITDA per year (EBITDA Uplift)" });
                item.Add(new Kpis() { KpisTitle = "Other" });
                context.AddRange(item);
                context.SaveChanges();
            }
        }
        public static void SeedPoolBudgetFrom(DataContext context)
        {
            if (!context.PoolBudgetFrom.Any())
            {
                var data = System.IO.File.ReadAllText("Json/PoolBudget.json");
                var result = JsonConvert.DeserializeObject<List<PoolBudgetFrom>>(data);
                foreach (var item in result)
                {
                    context.PoolBudgetFrom.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedCurrency(DataContext context)
        {
            if (!context.Currency.Any())
            {
                IList<Currency> item = new List<Currency>();
                item.Add(new Currency() { CurrencyTitle = "Million Dollar" });
                item.Add(new Currency() { CurrencyTitle = "Million Yen" });
                item.Add(new Currency() { CurrencyTitle = "Million Euro" });
                item.Add(new Currency() { CurrencyTitle = "Million Dong" });
                item.Add(new Currency() { CurrencyTitle = "Million Pond" });
                item.Add(new Currency() { CurrencyTitle = "Million SG Dollar" });
                item.Add(new Currency() { CurrencyTitle = "Million Yuan" });
                context.AddRange(item);
                context.SaveChanges();
            }
        }
        public static void SeedCustomGraph(DataContext context)
        {
            if (!context.CustomReportDetail.Any())
            {
                var data = System.IO.File.ReadAllText("Json/CustomGraphDetail.json");
                var result = JsonConvert.DeserializeObject<List<CustomReportDetail>>(data);
                foreach (var item in result)
                {
                    context.CustomReportDetail.Add(item);
                    context.SaveChanges();
                }
            }
            if (!context.CustomReportHeader.Any())
            {
                var data = System.IO.File.ReadAllText("Json/CustomGraphHeader.json");
                var result = JsonConvert.DeserializeObject<List<CustomReportHeader>>(data);
                foreach (var item in result)
                {
                    context.CustomReportHeader.Add(item);
                    context.SaveChanges();
                }
            }
            if (!context.CustomReportParameter.Any())
            {
                var data = System.IO.File.ReadAllText("Json/CustomGraphParameter.json");
                var result = JsonConvert.DeserializeObject<List<CustomReportParameter>>(data);
                foreach (var item in result)
                {
                    context.CustomReportParameter.Add(item);
                    context.SaveChanges();
                }
            }

            if (!context.CustomReportReportType.Any())
            {
                var data = System.IO.File.ReadAllText("Json/CustomGraphReportType.json");
                var result = JsonConvert.DeserializeObject<List<CustomReportReportType>>(data);
                foreach (var item in result)
                {
                    context.CustomReportReportType.Add(item);
                    context.SaveChanges();
                }
            }
            if (!context.CustomReportStageType.Any())
            {
                var data = System.IO.File.ReadAllText("Json/CustomGraphStageType.json");
                var result = JsonConvert.DeserializeObject<List<CustomReportStageType>>(data);
                foreach (var item in result)
                {
                    context.CustomReportStageType.Add(item);
                    context.SaveChanges();
                }
            }

            if (!context.TypeStage.Any())
            {
                var data = System.IO.File.ReadAllText("Json/TypeStage.json");
                var result = JsonConvert.DeserializeObject<List<TypeStage>>(data);
                foreach (var item in result)
                {
                    context.TypeStage.Add(item);
                    context.SaveChanges();
                }
            }

            if (!context.TypeStageApprover.Any())
            {
                var data = System.IO.File.ReadAllText("Json/TypeStageApprover.json");
                var result = JsonConvert.DeserializeObject<List<TypeStageApprover>>(data);
                foreach (var item in result)
                {
                    context.TypeStageApprover.Add(item);
                    context.SaveChanges();
                }
            }
        }
        public static void SeedAudit(DataContext context)
        {
            //if (!context.V_Audits.Any())
            //{
            //    Random gen = new Random();
            //    DateTime pastDate   = DateTime.Today.AddDays(- gen.Next(2*365));
            //    DateTime futureDate = DateTime.Today.AddDays(gen.Next(2*365));
            //    var Initiatives = context.Initiatives.ToList();
            //    for (int a = 0; a < 50; a = a + 1)
            //    {
            //        var V_Audit = new V_Audit
            //        {
            //            ChangeSetId    = 1233,
            //            InitiativeCode = "2020-000001",
            //            FieldName      = RandomString(8),
            //            OldValue       = RandomString(4),
            //            NewValue       = RandomString(4),
            //            ActionDate     = a % 2 == 0 ? pastDate : futureDate,
            //            ActionBy       = "tinnakornchoompee@gmail.com"
            //        };
            //        context.V_Audits.Add(V_Audit);
            //        context.SaveChanges();
            //    }
            //}
        }
        public static void SeedTempHrWebService(DataContext context)
        {
            if (!context.TempHRWebServices.Any())
            {
                var data = System.IO.File.ReadAllText("Json/TempHRWebService.json");
                var result = JsonConvert.DeserializeObject<List<TempHRWebService>>(data);
                foreach (var item in result)
                {
                    context.TempHRWebServices.Add(item);
                    context.SaveChanges();
                }
            }
        }

        public static void SeedURLTable(DataContext context)
        {
            if (!context.URLTables.Any())
            {
                var data = System.IO.File.ReadAllText("Json/URLTable.json");
                var result = JsonConvert.DeserializeObject<List<URLTable>>(data);
                foreach (var item in result)
                {
                    context.URLTables.Add(item);
                    context.SaveChanges();
                }
            }
        }

        public static void SeedITBudgetSurveyAsset(DataContext context)
        {
            // Hardware & Software
            if (!context.ITAssets.Any())
            {
                IList<ITAsset> item = new List<ITAsset>();
                item.Add(new ITAsset() { AssetId = "H0001", AssetType = "Hardware", AssetName = "Server", CostPerUnit = 500 });
                item.Add(new ITAsset() { AssetId = "H0002", AssetType = "Hardware", AssetName = "Workstation", CostPerUnit = 600 });
                item.Add(new ITAsset() { AssetId = "H0003", AssetType = "Hardware", AssetName = "Network", CostPerUnit = 200 });

                item.Add(new ITAsset() { AssetId = "S0001", AssetType = "Software", AssetName = "AutoCAD", CostPerUnit = 450 });
                item.Add(new ITAsset() { AssetId = "S0002", AssetType = "Software", AssetName = "LiveLink", CostPerUnit = 150 });
                item.Add(new ITAsset() { AssetId = "S0003", AssetType = "Software", AssetName = "Photoshop", CostPerUnit = 700 });
                item.Add(new ITAsset() { AssetId = "S0004", AssetType = "Software", AssetName = "Illustrator", CostPerUnit = 120 });

                context.AddRange(item);
                context.SaveChanges();
            }

        }

        public static void SeedCapexTopic(DataContext context)
        {
            if (!context.CapexTopics.Any())
            {
                IList<CapexTopic> item = new List<CapexTopic>();
                item.Add(new CapexTopic() { TopicId = "T0001", TopicName = "Law and/or Regulation force?",                                              IsYesOrNo = false });
                item.Add(new CapexTopic() { TopicId = "T0002", TopicName = "To develop Report/Form?",                                                   IsYesOrNo = false });
                item.Add(new CapexTopic() { TopicId = "T0003", TopicName = "Estimated number of users that will use this system/application.",          IsYesOrNo = false });
                item.Add(new CapexTopic() { TopicId = "T0004", TopicName = "Estimated number of transactions/month.",                                   IsYesOrNo = false });
                item.Add(new CapexTopic() { TopicId = "T0005", TopicName = "Does it impact to 'Corporate governance' if this project not implemented?", IsYesOrNo = false });
                item.Add(new CapexTopic() { TopicId = "T0006", TopicName = "Does it impact to 'Customers' if this project not implemented?",            IsYesOrNo = false });

                context.AddRange(item);
                context.SaveChanges();
            }
        }

        public static void SeedCapexChoice(DataContext context)
        {
            if (!context.CapexChoices.Any())
            {
                IList<CapexChoice> item = new List<CapexChoice>();
                //Topic 1
                item.Add(new CapexChoice() { CapexTopicId = 1, TopicId = "T0001", ChoiceId = "CH0001", ChoiceName = "Law/Regulation detail", ChoiceType = "Text" });
                item.Add(new CapexChoice() { CapexTopicId = 1, TopicId = "T0001", ChoiceId = "CH0002", ChoiceName = "Impact if not apply",   ChoiceType = "Text" });
                item.Add(new CapexChoice() { CapexTopicId = 1, TopicId = "T0001", ChoiceId = "CH0003", ChoiceName = "Effective date",        ChoiceType = "Date" });
                //Topic 2
                item.Add(new CapexChoice() { CapexTopicId = 2, TopicId = "T0002", ChoiceId = "CH0004", ChoiceName = "Use within your department only",                  ChoiceType = "Radio" });
                item.Add(new CapexChoice() { CapexTopicId = 2, TopicId = "T0002", ChoiceId = "CH0005", ChoiceName = "Use with other departments, strategy/KPI related", ChoiceType = "Radio" });
                item.Add(new CapexChoice() { CapexTopicId = 2, TopicId = "T0002", ChoiceId = "CH0006", ChoiceName = "Use across BU",                                    ChoiceType = "Radio" });
                item.Add(new CapexChoice() { CapexTopicId = 2, TopicId = "T0002", ChoiceId = "CH0007", ChoiceName = "Use GC wide or public",                            ChoiceType = "Radio" });
                //Topic 3
                item.Add(new CapexChoice() { CapexTopicId = 3, TopicId = "T0003", ChoiceId = "CH0008", ChoiceName = "<30",    ChoiceType = "Radio" });
                item.Add(new CapexChoice() { CapexTopicId = 3, TopicId = "T0003", ChoiceId = "CH0009", ChoiceName = "31-50",  ChoiceType = "Radio" });
                item.Add(new CapexChoice() { CapexTopicId = 3, TopicId = "T0003", ChoiceId = "CH0010", ChoiceName = "50-100", ChoiceType = "Radio" });
                item.Add(new CapexChoice() { CapexTopicId = 3, TopicId = "T0003", ChoiceId = "CH0011", ChoiceName = ">100",   ChoiceType = "Radio" });
                //Topic 4
                item.Add(new CapexChoice() { CapexTopicId = 4, TopicId = "T0004", ChoiceId = "CH0012", ChoiceName = "<100 transactions /month",    ChoiceType = "Radio" });
                item.Add(new CapexChoice() { CapexTopicId = 4, TopicId = "T0004", ChoiceId = "CH0013", ChoiceName = "101-200 transactions /month", ChoiceType = "Radio" });
                item.Add(new CapexChoice() { CapexTopicId = 4, TopicId = "T0004", ChoiceId = "CH0014", ChoiceName = "200-300 transactions /month", ChoiceType = "Radio" });
                item.Add(new CapexChoice() { CapexTopicId = 4, TopicId = "T0004", ChoiceId = "CH0015", ChoiceName = ">300 transactions /month",    ChoiceType = "Radio" });
                //Topic 5
                item.Add(new CapexChoice() { CapexTopicId = 5, TopicId = "T0005", ChoiceId = "CH0016", ChoiceName = "Small impact",    ChoiceType = "Radio" });
                item.Add(new CapexChoice() { CapexTopicId = 5, TopicId = "T0005", ChoiceId = "CH0017", ChoiceName = "Local impact",    ChoiceType = "Radio" });
                item.Add(new CapexChoice() { CapexTopicId = 5, TopicId = "T0005", ChoiceId = "CH0018", ChoiceName = "Regional impact", ChoiceType = "Radio" });
                item.Add(new CapexChoice() { CapexTopicId = 5, TopicId = "T0005", ChoiceId = "CH0019", ChoiceName = "National impact", ChoiceType = "Radio" });
                //Topic 6
                item.Add(new CapexChoice() { CapexTopicId = 6, TopicId = "T0006", ChoiceId = "CH0020", ChoiceName = "Customer will complain or had complaint cases in the past", ChoiceType = "Radio" });
                item.Add(new CapexChoice() { CapexTopicId = 6, TopicId = "T0006", ChoiceId = "CH0021", ChoiceName = "Customer will have lower product/service usage",            ChoiceType = "Radio" });
                item.Add(new CapexChoice() { CapexTopicId = 6, TopicId = "T0006", ChoiceId = "CH0022", ChoiceName = "Customer will terminate service/contract",                  ChoiceType = "Radio" });

                context.AddRange(item);
                context.SaveChanges();
            }
        }

        public static void SeedProcurement(DataContext context)
        {
            if (!context.Procurements.Any())
            {
                IList<Procurement> item = new List<Procurement>();
                item.Add(new Procurement() { ProcurementName = "Admin", ProcurementType = "Category" });
                item.Add(new Procurement() { ProcurementName = "Chemical/Oil/Gas", ProcurementType = "Category" });
                item.Add(new Procurement() { ProcurementName = "Electrical", ProcurementType = "Category" });
                item.Add(new Procurement() { ProcurementName = "Electrical service", ProcurementType = "Category" });
                item.Add(new Procurement() { ProcurementName = "Instrument", ProcurementType = "Category" });
                item.Add(new Procurement() { ProcurementName = "IT", ProcurementType = "Category" });
                item.Add(new Procurement() { ProcurementName = "Laboratory", ProcurementType = "Category" });
                item.Add(new Procurement() { ProcurementName = "Logistics", ProcurementType = "Category" });
                item.Add(new Procurement() { ProcurementName = "Mechanical", ProcurementType = "Category" });
                item.Add(new Procurement() { ProcurementName = "Others", ProcurementType = "Category" });
                item.Add(new Procurement() { ProcurementName = "Packaging", ProcurementType = "Category" });
                item.Add(new Procurement() { ProcurementName = "Safety & Health", ProcurementType = "Category" });
                item.Add(new Procurement() { ProcurementName = "Service", ProcurementType = "Category" });
                item.Add(new Procurement() { ProcurementName = "Warehouse", ProcurementType = "Category" });
                item.Add(new Procurement() { ProcurementName = "Additives", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Admin", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Bearing", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Catalysts", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Chemical", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Compressor & Parts", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Consumable", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Electrical", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Electrical service", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Filters", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Fittings (pipe)", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "General", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Hardware & Fasteners", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Instrument", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Insurance", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "IT Hardware", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "IT Services", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "IT Software", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Lab consumable", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Lab glassware", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Lab service sale", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Laboratory chemicals", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Laboratory equipment", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Large project service", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Mechanical", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Operational maintenance service", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Other logistics", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Others", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Packaging", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Pump & Parts", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Pure/standard gas", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Rent", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Safety & Health", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "SD/TA maintenance project service", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Serv. - Laboratory", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Serv. - SHE", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Serv.- Administration", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Serv.- Communication", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Services & Others", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Small project service", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Solvents", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Transportation", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Utility", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Valves", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Warehouse", ProcurementType = "Sub-Category" });
                item.Add(new Procurement() { ProcurementName = "Benchmarking", ProcurementType = "Lever" });
                item.Add(new Procurement() { ProcurementName = "Clean sheet analysis", ProcurementType = "Lever" });
                item.Add(new Procurement() { ProcurementName = "Contract terms negotiation", ProcurementType = "Lever" });
                item.Add(new Procurement() { ProcurementName = "Demand management", ProcurementType = "Lever" });
                item.Add(new Procurement() { ProcurementName = "E-auction/Negotiation", ProcurementType = "Lever" });
                item.Add(new Procurement() { ProcurementName = "Introduce competitive supplier (incl LCC)", ProcurementType = "Lever" });
                item.Add(new Procurement() { ProcurementName = "Market index pricing", ProcurementType = "Lever" });
                item.Add(new Procurement() { ProcurementName = "Others", ProcurementType = "Lever" });
                item.Add(new Procurement() { ProcurementName = "Process improvement", ProcurementType = "Lever" });
                item.Add(new Procurement() { ProcurementName = "Specification optimization", ProcurementType = "Lever" });
                item.Add(new Procurement() { ProcurementName = "Volume consolidation", ProcurementType = "Lever" });

                context.AddRange(item);
                context.SaveChanges();
            }
        }

        public static void SeedCommonData(DataContext context)
        {
            if (!context.CommonData.Any())
            {
                var data = System.IO.File.ReadAllText("Json/CommonData.json");
                var result = JsonConvert.DeserializeObject<List<CommonData>>(data);
                foreach (var item in result)
                {
                    context.CommonData.Add(item);
                    context.SaveChanges();
                }
            }
        }

        public static void SeedCommonDataSetting(DataContext context)
        {
            if (!context.CommonDataSetting.Any())
            {
                var data = System.IO.File.ReadAllText("Json/CommonDataSetting.json");
                var result = JsonConvert.DeserializeObject<List<CommonDataSetting>>(data);
                foreach (var item in result)
                {
                    context.CommonDataSetting.Add(item);
                    context.SaveChanges();
                }
            }
        }

        public static void SeedCAPEX_ReportParameter(DataContext context)
        {
            if (!context.CAPEX_ReportParameter.Any())
            {
                var data = System.IO.File.ReadAllText("Json/CAPEX_ReportParameter.json");
                var result = JsonConvert.DeserializeObject<List<CAPEX_ReportParameter>>(data);
                foreach (var item in result)
                {
                    context.CAPEX_ReportParameter.Add(item);
                    context.SaveChanges();
                }
            }
        }
    }
}