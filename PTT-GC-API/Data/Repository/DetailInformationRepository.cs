using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.DetailMaxInformation;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.DetailInformation;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.VacPic;

namespace PTT_GC_API.Data.Repository
{
    public class DetailInformationRepository : DetailInformationInterface
    {
        private readonly DataContext _context;
        private readonly IHttpClientFactory _clientFactory;
        private readonly StoreProcedureInterface _storeProcedure;
        public DetailInformationRepository(DataContext context, IHttpClientFactory clientFactory, StoreProcedureInterface storeProcedure)
        {
            _context = context;
            _clientFactory = clientFactory;
            _storeProcedure = storeProcedure;
        }

        public async void Add<T>(T entity) where T : class
        {
            await _context.AddAsync(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Any()
        {
            return await _context.Initiatives.AnyAsync();
        }

        public async Task<bool> DetailInformationDelete(int id)
        {
            if (_context.DetailInformations.Any())
            {
                var List = await _context.DetailInformations.Where(i => i.InitiativeId == id).ToListAsync();

                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(List, "DetailInformations-59", SQLCommandType.DELETE, false);
                // End log

                foreach (var entity in List)
                    _context.DetailInformations.Remove(entity);

                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(List, "DetailInformations-59", SQLCommandType.DELETE, true);
                // End log
                await _context.SaveChangesAsync();
                return true;
            }
            return true;
        }

        public async Task<DetailInformation_Old> GetDetailInformation(int id)
        {
            return await _context.DetailInformations.FirstOrDefaultAsync(i => i.InitiativeId == id);
        }

        public async Task<CreateKpiDetailInformation> CreateKpiDetailInformation(int id, CreateKpiDetailInformation CreateKpiDetailInformation)
        {
            if (_context.KpiDetailInformations.Any())
            {
                var List = await _context.KpiDetailInformations.Where(i => i.InitiativeId == id).ToListAsync();
                
                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(List, "DetailInformations-86", SQLCommandType.DELETE, false);
                // End log

                foreach (var entity in List)
                    _context.KpiDetailInformations.Remove(entity);

                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(List, "DetailInformations-86", SQLCommandType.DELETE, true);
                // End log

                await _context.SaveChangesAsync();
            }

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(CreateKpiDetailInformation.kpis, "DetailInformations-103", SQLCommandType.INSERT, false);
            // End log

            foreach (var item in CreateKpiDetailInformation.kpis)
            {
                await _context.KpiDetailInformations.AddAsync(item);
                await _context.SaveChangesAsync();
            }
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(CreateKpiDetailInformation.kpis, "DetailInformations-103", SQLCommandType.INSERT, true);
            // End log
            return CreateKpiDetailInformation;
        }

        public async Task<PimGate> CreateDetailPimGate(PimGateCreate pgCreate, int id)
        {

            PimGate pimGate = new PimGate()
            {
                PimGateId = 0,
                InitiativeId = id,
                PimGateStatus = pgCreate.PimGateStatus,
                ReviseBudgetRevision = pgCreate.ReviseBudgetRevision,
                Gate = pgCreate.Gate,
                CostEstimate = pgCreate.CostEstimate,
                OverallCapex = pgCreate.OverallCapex,
                RequestOpex = pgCreate.RequestOpex,
                Benefit = pgCreate.Benefit,
                Irr = pgCreate.Irr,
                SimplePayback = pgCreate.SimplePayback,
                Ram = pgCreate.Ram,
                JFactor = pgCreate.JFactor,
                PresentationLink = pgCreate.PresentationLink,
                PicMomLink = pgCreate.PicMomLink,
                RequestPool = pgCreate.RequestPool,
                Note = pgCreate.Note,
                SimplefiedProject = pgCreate.SimplefiedProject,
                ReceivedOpexBudget = pgCreate.ReceivedOpexBudget,
                ReceivedCapexGate2 = pgCreate.ReceivedCapexGate2,
                RequestCapexGate3 = pgCreate.RequestCapexGate3,
                AdditionalOpexBudget = pgCreate.AdditionalOpexBudget,
                TieInLongLeadItemsBudget = pgCreate.TieInLongLeadItemsBudget,
                EmocStatus = pgCreate.EmocStatus,
                ExecutionLookbackStatus = pgCreate.ExecutionLookbackStatus,
                SapStatus = pgCreate.ExecutionLookbackStatus,
                // VAC
                VacDate = pgCreate.VacDate,
                VacStatus = pgCreate.VacStatus,
                // PIC
                GateDate = pgCreate.GateDate,
                GateStatus = pgCreate.GateStatus,
                SubPicMomLink = pgCreate.SubPicMomLink,
                VacCheckListLink = pgCreate.VacCheckListLink,
                ProjectCharterLink = pgCreate.ProjectCharterLink,
                RequestPoolStatus = pgCreate.RequestPoolStatus
            };
            await _context.PimGate.AddAsync(pimGate);

            //create up / center / down / 

            foreach (var entityUpStream in pgCreate.UpStream)
            {
                _context.PicMember.Add(new PicMember()
                {
                    PicListId = 0,
                    MemberName = entityUpStream,
                    MemberType = "upStream",
                    InitiativeId = id,
                    Gate = pgCreate.Gate
                });
            }
            foreach (var entityCemterStream in pgCreate.CenterStream)
            {
                _context.PicMember.Add(new PicMember()
                {
                    PicListId = 0,
                    MemberName = entityCemterStream,
                    MemberType = "centerStream",
                    InitiativeId = id,
                    Gate = pgCreate.Gate
                });
            }

            foreach (var entityDownStream in pgCreate.DownStream)
            {
                _context.PicMember.Add(new PicMember()
                {
                    PicListId = 0,
                    MemberName = entityDownStream,
                    MemberType = "downStream",
                    InitiativeId = id,
                    Gate = pgCreate.Gate
                });
            }

            await _context.SaveChangesAsync();
            return pimGate;
        }

        public async Task<PimGate> UpdateDetailPimGate(PimGateCreate pgUpdate, int id)
        {
            PimGate pimGate = new PimGate()
            {
                PimGateId = pgUpdate.PimGateId,
                InitiativeId = id,
                PimGateStatus = pgUpdate.PimGateStatus,
                ReviseBudgetRevision = pgUpdate.ReviseBudgetRevision,
                Gate = pgUpdate.Gate,
                CostEstimate = pgUpdate.CostEstimate,
                OverallCapex = pgUpdate.OverallCapex,
                RequestOpex = pgUpdate.RequestOpex,
                Benefit = pgUpdate.Benefit,
                Irr = pgUpdate.Irr,
                SimplePayback = pgUpdate.SimplePayback,
                Ram = pgUpdate.Ram,
                JFactor = pgUpdate.JFactor,
                PresentationLink = pgUpdate.PresentationLink,
                PicMomLink = pgUpdate.PicMomLink,
                RequestPool = pgUpdate.RequestPool,
                Note = pgUpdate.Note,
                SimplefiedProject = pgUpdate.SimplefiedProject,
                ReceivedOpexBudget = pgUpdate.ReceivedOpexBudget,
                ReceivedCapexGate2 = pgUpdate.ReceivedCapexGate2,
                RequestCapexGate3 = pgUpdate.RequestCapexGate3,
                AdditionalOpexBudget = pgUpdate.AdditionalOpexBudget,
                TieInLongLeadItemsBudget = pgUpdate.TieInLongLeadItemsBudget,
                EmocStatus = pgUpdate.EmocStatus,
                ExecutionLookbackStatus = pgUpdate.ExecutionLookbackStatus,
                SapStatus = pgUpdate.ExecutionLookbackStatus,
                // VAC
                VacDate = pgUpdate.VacDate,
                VacStatus = pgUpdate.VacStatus,
                // PIC
                GateDate = pgUpdate.GateDate,
                GateStatus = pgUpdate.GateStatus,
                SubPicMomLink = pgUpdate.SubPicMomLink,
                VacCheckListLink = pgUpdate.VacCheckListLink,
                ProjectCharterLink = pgUpdate.ProjectCharterLink,
                RequestPoolStatus = pgUpdate.RequestPoolStatus
            };
            _context.PimGate.Update(pimGate);

            //update up / center / down / 

            var picMembersRemove = await _context.PicMember.Where(i => i.InitiativeId.Equals(id) && i.Gate.Equals(pgUpdate.Gate)).ToListAsync();
            foreach (var dataEntity in picMembersRemove)
            {
                _context.PicMember.Remove(dataEntity);
            }
            await _context.SaveChangesAsync();

            foreach (var entityUpStream in pgUpdate.UpStream)
            {
                _context.PicMember.Add(new PicMember()
                {
                    PicListId = 0,
                    MemberName = entityUpStream,
                    MemberType = "upStream",
                    InitiativeId = id,
                    Gate = pgUpdate.Gate
                });
            }
            foreach (var entityCemterStream in pgUpdate.CenterStream)
            {
                _context.PicMember.Add(new PicMember()
                {
                    PicListId = 0,
                    MemberName = entityCemterStream,
                    MemberType = "centerStream",
                    InitiativeId = id,
                    Gate = pgUpdate.Gate
                });
            }

            foreach (var entityDownStream in pgUpdate.DownStream)
            {
                _context.PicMember.Add(new PicMember()
                {
                    PicListId = 0,
                    MemberName = entityDownStream,
                    MemberType = "downStream",
                    InitiativeId = id,
                    Gate = pgUpdate.Gate
                });
            }



            await _context.SaveChangesAsync();
            return pimGate;
        }

        public async Task<PimGateCreate> GetDetailPimGate(int id, int gate)
        {
            var pimGate = await _context.PimGate.FirstOrDefaultAsync(i => i.InitiativeId.Equals(id) && i.Gate.Equals(gate));
            if(pimGate == null)
            {
                return new PimGateCreate();
            }
            var picMembers = await _context.PicMember.Where(i => i.InitiativeId.Equals(id) && i.Gate.Equals(gate)).ToListAsync();
            //var UpStream = picMembers.Where(u => u.MemberType.Equals("upStream")).ToList();
            //var CenterStream = picMembers.Where(u => u.MemberType.Equals("upStream")).ToList();
            //var DownStream = picMembers.Where(u => u.MemberType.Equals("upStream")).ToList();
            PimGateCreate pimGateData = new PimGateCreate()
            {
                PimGateId = pimGate.PimGateId,
                InitiativeId = id,
                PimGateStatus = pimGate.PimGateStatus,
                ReviseBudgetRevision = pimGate.ReviseBudgetRevision,
                Gate = pimGate.Gate,
                CostEstimate = pimGate.CostEstimate,
                OverallCapex = pimGate.OverallCapex,
                RequestOpex = pimGate.RequestOpex,
                Benefit = pimGate.Benefit,
                Irr = pimGate.Irr,
                SimplePayback = pimGate.SimplePayback,
                Ram = pimGate.Ram,
                JFactor = pimGate.JFactor,
                PresentationLink = pimGate.PresentationLink,
                PicMomLink = pimGate.PicMomLink,
                RequestPool = pimGate.RequestPool,
                Note = pimGate.Note,
                SimplefiedProject = pimGate.SimplefiedProject,
                ReceivedOpexBudget = pimGate.ReceivedOpexBudget,
                ReceivedCapexGate2 = pimGate.ReceivedCapexGate2,
                RequestCapexGate3 = pimGate.RequestCapexGate3,
                AdditionalOpexBudget = pimGate.AdditionalOpexBudget,
                TieInLongLeadItemsBudget = pimGate.TieInLongLeadItemsBudget,
                EmocStatus = pimGate.EmocStatus,
                ExecutionLookbackStatus = pimGate.ExecutionLookbackStatus,
                SapStatus = pimGate.ExecutionLookbackStatus,
                // VAC
                VacDate = pimGate.VacDate,
                VacStatus = pimGate.VacStatus,
                // PIC
                GateDate = pimGate.GateDate,
                GateStatus = pimGate.GateStatus,
                SubPicMomLink = pimGate.SubPicMomLink,
                VacCheckListLink = pimGate.VacCheckListLink,
                ProjectCharterLink = pimGate.ProjectCharterLink,
                RequestPoolStatus = pimGate.RequestPoolStatus,

                // up / center / down
                UpStream = picMembers != null ? picMembers.Where(u => u.MemberType.Equals("upStream")).Select(s=>s.MemberName).ToList() : new List<string>(),
                CenterStream = picMembers != null ? picMembers.Where(u => u.MemberType.Equals("centerStream")).Select(s => s.MemberName).ToList() : new List<string>(),
                DownStream = picMembers != null ? picMembers.Where(u => u.MemberType.Equals("downStream")).Select(s => s.MemberName).ToList() : new List<string>()
            };
            return pimGateData;


        }

        public async Task<int> UpdateHighlightWork(int id, HighlightWork data)
        {
            var getData = await _context.DetailInformations.Where(x => x.InitiativeId == id).FirstOrDefaultAsync();
            
            
            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(getData, "DetailInformations-152", SQLCommandType.UPDATE, false);
            // End log
            
            if (getData == null)
            {
                return 0;
            }

            getData.HighlightWorkStatus = data.HighlightWorkStatus;
            getData.HighlightWorkConCern = data.HighlightWorkConCern;
            getData.NextActivities = data.NextActivities;
            _context.DetailInformations.Update(getData);

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(getData, "DetailInformations-164", SQLCommandType.UPDATE, true);
            // End log

            return await _context.SaveChangesAsync();
        }

        public async Task<int> CreateTeamSupports(int id, List<string> dataCreate)
        {
            List<TeamSupports> teamSupports = await _context.TeamSupports.Where(x => x.InitiativeId == id).ToListAsync();

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(teamSupports, "DetailInformations-178", SQLCommandType.UPDATE, false);
            // End log

            if (teamSupports.Count > 0)
            {

                foreach (var entity in teamSupports)
                {
                    _context.TeamSupports.Remove(entity);
                }
                //await _context.SaveChangesAsync();
            }

            if (dataCreate != null)
            {
                foreach (var item in dataCreate)
                {
                    TeamSupports teamSupport = new TeamSupports();
                    teamSupport.TeamSupportName = item.Trim();
                    var userData = await _context.Owners.Where(x => x.OwnerName.Trim() == item.Trim()).FirstOrDefaultAsync();
                    if (userData != null)
                    {
                        teamSupport.InitiativeId = id;
                        teamSupport.EmployeeID = userData.EmployeeID.Trim();
                        teamSupport.Email = userData.Email.Trim();
                    }
                    await _context.TeamSupports.AddAsync(teamSupport);
                    //await _context.SaveChangesAsync();
                }

            }

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(dataCreate, "DetailInformations-178", SQLCommandType.UPDATE, true);
            // End log

            return await _context.SaveChangesAsync();
        }

        public async Task<int> CreateTeamSupportComments(int id, List<TeamSupportComments> dataCreate)
        {
            List<TeamSupportComments> teamSupports = await _context.TeamSupportComments.Where(x => x.InitiativeId == id).ToListAsync();

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(teamSupports, "DetailInformations-222", SQLCommandType.UPDATE, false);
            // End log

            if (teamSupports != null)
            {

                foreach (var entity in teamSupports)
                {
                    _context.TeamSupportComments.Remove(entity);
                }
                //await _context.SaveChangesAsync();
            }

            if (dataCreate.Count > 0)
            {
                foreach (var item in dataCreate)
                {
                    item.Id = 0;
                    var userData = await _context.Owners.Where(x => x.OwnerName == item.TeamSupportName).FirstOrDefaultAsync();
                    if (userData != null)
                    {
                        item.EmployeeID = userData.EmployeeID;
                    }
                    await _context.TeamSupportComments.AddAsync(item);
                    //await _context.SaveChangesAsync();
                }

            }

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(dataCreate, "DetailInformations-222", SQLCommandType.UPDATE, true);
            // End log

            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteTeamSupportComment(int id)
        {
            TeamSupportComments teamSupports = await _context.TeamSupportComments.Where(x => x.Id == id).FirstOrDefaultAsync();

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(teamSupports, "DetailInformations-262", SQLCommandType.DELETE, false);
            // End log

            if (teamSupports != null)
            {
                _context.TeamSupportComments.Remove(teamSupports);
            }

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(teamSupports, "DetailInformations-265", SQLCommandType.UPDATE, true);
            // End log

            return await _context.SaveChangesAsync();
        }
        public async Task<List<TeamSupports>> GetTeamSupports(int id)
        {
            return await _context.TeamSupports.Where(x => x.InitiativeId == id).ToListAsync();
        }
        public async Task<List<TeamSupportComments>> GetTeamSupportComments(int id)
        {
            return await _context.TeamSupportComments.Where(x => x.InitiativeId == id).ToListAsync();
        }
        public async Task<int> SendEmailTeamSupport(int id)
        {
            string urlFlow = "";
            var context_url = await _context.URLTables.Where(i => i.URLType == "SendEmailTeamSupport").ToListAsync();
            List<TeamSupports> team = await _context.TeamSupports.Where(x => x.InitiativeId == id && x.SendEmailStatus == null).ToListAsync();

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(team, "DetailInformations-290", SQLCommandType.UPDATE, false);
            // End log

            try
            {
                if (team != null)
                {
                    foreach (var item in team)
                    {
                        if (context_url.Any()) urlFlow = context_url.FirstOrDefault().URL;

                        if (urlFlow != "")
                        {

                            var stringContent = new StringContent(JsonConvert.SerializeObject(
                              new
                              {
                                  INIID = id.ToString(),
                                  EMAIL = item.Email
                              }
                          ), Encoding.UTF8, "application/json");

                            var client = _clientFactory.CreateClient();
                            var response = await client.PostAsync(urlFlow, stringContent);

                            if (response.IsSuccessStatusCode)
                            {
                                item.SendEmailStatus = 1;
                                _context.TeamSupports.Update(item);
                            }
                        }
                    }

                }

                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(team, "DetailInformations-290", SQLCommandType.UPDATE, true);
                // End log

                return await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return 0;
            }

        }

        public async Task<PimGateConfig> ShowPimGate(int initiativeId)
        {
            PimGateConfig pimGateConfig = new PimGateConfig();
            try
            {
                // oat --------------------------------------------------------------------------
                DataTable dataTable = await _storeProcedure.ExecuteReturnDatatable($"sp_ShowHideGatePIMDetail {initiativeId}");
                if (dataTable.Rows.Count <= 0)
                {
                    return pimGateConfig;
                }
                else
                {
                    pimGateConfig.Gate0 = dataTable.Rows[0][0] == null ? "false" : dataTable.Rows[0][0].ToString();
                    pimGateConfig.Gate1 = dataTable.Rows[0][1] == null ? "false" : dataTable.Rows[0][1].ToString();
                    pimGateConfig.Gate2 = dataTable.Rows[0][2] == null ? "false" : dataTable.Rows[0][2].ToString();
                    pimGateConfig.Gate3 = dataTable.Rows[0][3] == null ? "false" : dataTable.Rows[0][3].ToString();
                    pimGateConfig.Gate4 = dataTable.Rows[0][4] == null ? "false" : dataTable.Rows[0][4].ToString();
                    return pimGateConfig;
                }

            }
            catch (Exception ex)
            {
                return pimGateConfig;
            }

        }


    }
}