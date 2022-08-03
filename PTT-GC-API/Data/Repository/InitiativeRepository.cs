using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.CommonData;
using PTT_GC_API.Models.User;
using System;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Helpers;
using NPOI.SS.Formula.Functions;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using DocumentFormat.OpenXml.Office2010.Excel;
using System.Collections.Immutable;
using PTT_GC_API.Models.Owner;
using PTT_GC_API.Models.TypeofStage;
using DocumentFormat.OpenXml.ExtendedProperties;
using DocumentFormat.OpenXml.Office.CustomUI;
using PTT_GC_API.Migrations;
using System.Data;
using NPOI.XSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.HSSF.Util;
using PTT_GC_API.Models.Role;
using PTT_GC_API.Models.Permission;
using PTT_GC_API.Dtos.NewApprovalSystem;
using PTT_GC_API.Models.ApprovalFlow;
using PTT_GC_API.Dtos.VacPic;
using DocumentFormat.OpenXml.Drawing.Diagrams;
using DocumentFormat.OpenXml.Presentation;
using PTT_GC_API.Models.VacPic;
using System.Linq.Expressions;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using ExcelDataReader;
using NPOI.OpenXmlFormats.Spreadsheet;
using Microsoft.Extensions.Options;
using ImpactTracking = PTT_GC_API.Models.Initiative.ImpactTracking;

namespace PTT_GC_API.Data.Repository
{
    public class InitiativeRepository : InitiativeInterface
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IHttpClientFactory _clientFactory;
        private readonly StoreProcedureInterface _storeProcedure;
        private readonly ProgressInterface _repositoryProgress;
        private readonly PDDInterface _pDD;
        private readonly IFInterface _repositoryIF;
        private readonly IOptions<UrlPowerAutomate> _urlPowerAutomate;
        private readonly bool isOldApproveCapex = false;
        string[] InitiativeTypeCapex = { "directCapex", "Digital Survey", "Request Pool", "AddmoreCapex" };
        bool flagDimCapex = false;
        bool flagNewFeature = false;
        bool flagNewApprovalSystem = false;
        //dev
        // string Admin_01 = "z0007142@vpttgcgroup.corp";
        // string Approver_01 = "z0007155@vpttgcgroup.corp";
        // string Approver_02 = "z0007141@vpttgcgroup.corp";
        // string Approver_03 = "z0007142@vpttgcgroup.corp";
        // string Approver_04 = "z0007193@vpttgcgroup.corp";

        //qa
        //string Admin_01 = "Pongchayont.s@pttgcgroup.com";
        //string Approver_01 = "Pongchayont.s@pttgcgroup.com";
        //string Approver_02 = "Kewalin.k@pttgcgroup.com";
        //string Approver_03 = "Chakrid.N@pttgcgroup.com";
        //string Approver_04 = "Sawarin.P@pttgcgroup.com";

        public InitiativeRepository(DataContext context, IHttpClientFactory clientFactory, StoreProcedureInterface storeProcedure, PDDInterface pDD, IFInterface repositoryIF, IMapper mapper, ProgressInterface progressInterface, IOptions<UrlPowerAutomate> urlPowerAutomate)
        {
            _context = context;
            _clientFactory = clientFactory;
            _storeProcedure = storeProcedure;
            _pDD = pDD;
            _repositoryIF = repositoryIF;
            _mapper = mapper;
            _repositoryProgress = progressInterface;
            _urlPowerAutomate = urlPowerAutomate;
            var commonDimCapex = _context.CommonData.Where(i => i.DataType == "flagdimcapex").FirstOrDefault();
            if (commonDimCapex != null)
            {
                if (commonDimCapex.Attribute01 != null)
                    if (commonDimCapex.Attribute01.ToLower() == "true")
                    {
                        flagDimCapex = true;
                    }
            }
            var newFeature = _context.CommonData.Where(i => i.DataType == "newFeature").FirstOrDefault();
            if (newFeature != null)
            {
                if (newFeature.Attribute01 != null)
                    if (newFeature.Attribute01.ToLower() == "true")
                    {
                        // Temporary Log for Invetigate 2021-07-21
                        LogInsight.Log(newFeature, "Initiative-98", SQLCommandType.UPDATE, false);
                        // End log

                        flagNewFeature = true;

                        // Temporary Log for Invetigate 2021-07-21
                        LogInsight.Log(newFeature, "Initiative-104", SQLCommandType.UPDATE, true);
                        // End log
                    }
            }

            var commonNewApprovalSystem = _context.CommonData.Where(i => i.DataType == "flagnewapprovalsystem").FirstOrDefault();
            if (commonNewApprovalSystem != null)
            {
                if (commonNewApprovalSystem.Attribute01 != null)
                    if (commonNewApprovalSystem.Attribute01.ToLower() == "true")
                    {
                        flagNewApprovalSystem = true;
                    }
            }
            //flagNewApprovalSystem = true;

        }

        public async void Add<T>(T entity) where T : class
        {
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(entity, "Initiative-125", SQLCommandType.INSERT);
            // End log

            await _context.AddAsync(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            // Temporary Log foUPDATEr Invetigate 2021-07-21
            LogInsight.Log(entity, "Initiative-134", SQLCommandType.UPDATE, false);
            // End log
            _context.Update(entity);
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(entity, "Initiative-139", SQLCommandType.UPDATE, true);
            // End log

        }

        public void Delete<T>(T entity) where T : class
        {
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(entity, "Initiative-146", SQLCommandType.DELETE);
            // End log
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

        public async Task<Initiative> GetInitiative(int id)
        {
            var initiative = await _context.Initiatives.FirstOrDefaultAsync(i => i.Id == id);
            return initiative;
        }

        public async Task<List<initiativeMemberModel>> GetInitiative50(int[] initiativeIdList, string type)
        {
            //Expression<Func<int, string>> flowTypeFunction = e => GetFlowTypeOfInitiative(e).Result;
            //var initList = await
            //            (
            //            from ini in _context.Initiatives.Where(i => (i.HistoryFlag == null || i.HistoryFlag == 0))
            //            join det in _context.DetailInformations on ini.Id equals det.InitiativeId into p1

            //            from q1 in p1
            //            join inistage in _context.InitiativeStage
            //                                on new { IniId = q1.InitiativeId, Status = "wait for approval" } equals new { IniId = inistage.InitiativeId, Status = inistage.Status } into p2

            //            from q2 in p2.DefaultIfEmpty()
            //            where (
            //            (initiativeIdList.Contains(ini.Id) || (q2 == null ? ini.Stage.ToUpper().IndexOf(type.ToUpper()) >= 0 : q2.Stage.ToUpper().IndexOf(type.ToUpper()) >= 0))
            //            && (q2 == null ? ini.Status == "wait for approval" : q2.Status == "wait for approval")
            //            )
            //            select new initiativeMemberModel
            //            {
            //                InitiativeId = ini.Id,
            //                InitiativeCode = ini.InitiativeCode,
            //                Name = ini.Name,
            //                OwnerName = ini.OwnerName,
            //                InitiativeType = ini.InitiativeType,
            //                Plant = ini.Plant,
            //                EmocNo = "Emoc No",
            //                Gate = q2 == null ? ini.Stage.ToUpper().Trim().Substring(0, 5) : q2.Stage.ToUpper().Trim().Substring(0, 5),
            //                Presentation = "Link",
            //                Pdd = "Link",
            //                FxExchange = ini.FxExchange == null ? ini.FxExchange.Value.ToString() : null,
            //                CostEstCapexType = ini.CostEstCapexType,
            //                CostEstOpexType = ini.CostEstOpexType,
            //                //SmesRequest = q1.Smes,
            //                //BudgetSource = ini.BudgetSource.ToUpper(),
            //                //OverallBudget = ini.CostEstCapex.Value.ToString("#,##0.00#"),
            //                //RequestBudget = ini.CostEstCapex.Value.ToString("#,##0.00#")
            //                RequestCapex = ini.CostEstCapex == null ? ini.CostEstCapex.Value.ToString("#,##0.00#") : null,
            //                RequestOpex = ini.CostEstOpex == null ? ini.CostEstOpex.Value.ToString("#,##0.00#") : null,
            //            }).OrderByDescending(i => i.InitiativeId).Take(20).ToListAsync();


            DataTable dataTable = new DataTable();
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log("sp_GetInitiativesVACPIC", "Initiative-195", SQLCommandType.EXECUTE);
            // End log
            try
            {
                dataTable = await _storeProcedure.ExecuteReturnDatatable($"sp_GetInitiativesVACPIC '{string.Join(',', initiativeIdList)}','{type}'");  //sp_RequestPoolPimInitiativeList
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            List<initiativeMemberModel> initList = CommonMethod.ConvertToList<initiativeMemberModel>(dataTable);

            foreach (initiativeMemberModel initiativeMemberModel in initList)
            {
                DataTable Stages = new DataTable();
                DataTable Leaves = new DataTable();
                DataTable MoveBacks = new DataTable();

                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log("sp_GetStagesForVACPIC", "Initiative-230", SQLCommandType.EXECUTE);
                // End log
                try
                {
                    Stages = await _storeProcedure.ExecuteReturnDatatable($"sp_GetStagesForVACPIC '{initiativeMemberModel.InitiativeId}','{type}','stage'");  //
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
                try
                {
                    Leaves = await _storeProcedure.ExecuteReturnDatatable($"sp_GetStagesForVACPIC '{initiativeMemberModel.InitiativeId}','{type}','leave'");  //
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
                try
                {
                    MoveBacks = await _storeProcedure.ExecuteReturnDatatable($"sp_GetStagesForVACPIC '{initiativeMemberModel.InitiativeId}','{type}','moveback'");  //
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }

                initiativeMemberModel.Stages = CommonMethod.ConvertToList<Dtos.Initiative.InitiativeStage>(Stages).Select(i => i.Stage).ToList();
                initiativeMemberModel.Leaves = CommonMethod.ConvertToList<Dtos.Initiative.InitiativeStage>(Leaves).Select(i => i.Stage).ToList();
                initiativeMemberModel.MoveBacks = CommonMethod.ConvertToList<Dtos.Initiative.InitiativeStage>(MoveBacks).Select(i => i.Stage).ToList();
                //initiativeMemberModel.SwitchProcesses = null;

            }



            return initList;

        }

        public async Task<int> LastIdInitiative()
        {
            int id;
            if (_context.Initiatives.Any())
            {
                var max = await _context.Initiatives.OrderByDescending(p => p.Id).FirstOrDefaultAsync();
                id = max.Id;
            }
            else
            {
                id = 0;
            }
            return id;
        }

        public async Task<Initiative> LastInitiative()
        {
            //var initiative = await _context.Initiatives.Where(p => p.LagacyInitiativeId == null && (p.HistoryFlag == null || p.HistoryFlag == 0)).OrderByDescending(p => p.Id).FirstOrDefaultAsync();
            string getYear = DateTime.Now.ToString("yyyy");
            var initiative = await _context.Initiatives.Where(p => p.InitiativeCode.StartsWith(getYear) && p.LagacyInitiativeId == null
                             && (p.HistoryFlag == null || p.HistoryFlag == 0)).OrderByDescending(p => p.InitiativeCode).FirstOrDefaultAsync();

            return initiative;
        }
        public async Task<IEnumerable<string>> GetInitiativeList([FromQuery] OwnerParams param)
        {
            var list = _context.Initiatives.AsQueryable();
            if (!string.IsNullOrEmpty(param.Text))
            {
                list = list.Where(c => c.Name.Contains(param.Text));
            }

            list = list.OrderBy(c => c.Name).Take(50);

            var data = await list.Select(i => i.Name).ToListAsync();

            return data;
        }

        public async Task<PagedList<Initiative>> GetInitiatives(InitiativeParams initiativeParams)
        {
            var initiatives = _context.Initiatives.AsQueryable();
            initiatives = initiatives.Where(i => i.HistoryFlag == null || i.HistoryFlag == 0);
            switch (initiativeParams.Page)
            {
                case "myTask":

                    if (flagNewApprovalSystem == true)
                    {
                        initiatives = initiatives.Where(i => i.InitiativeActions.Any(i => (i.ActionBy == null ? i.ActionBy : i.ActionBy.Trim().ToLower()) == initiativeParams.Username.Trim().ToLower() && i.ActionResult == null && (i.IsInactive == null || i.IsInactive == false) && i.ConditionType != "permissionedit"));
                    }
                    else
                    {
                        initiatives = initiatives.Where(i => i.InitiativeActions.Any(i => i.ActionBy == initiativeParams.Username.Trim().ToLower()));

                        initiatives = initiatives.Where(i => i.Status != "wait for create App.");  //ปิดไม่ให้ stage app. request ใน my task  (IF001)

                        initiatives = initiatives.Where(i => i.Stage != "complete");  //ปิดไม่ให้ stage app. request ใน my task  (IF001)
                                                                                      //initiatives = initiatives.Where(i => i.Status != "principle approved" && i.Stage != "complete");  //remove where principle approved
                    }



                    initiatives = initiatives.OrderByDescending(i => i.UpdatedDate);
                    break;
                case "myOwn":



                    initiatives = initiatives.Where(i => i.CreatedBy.Trim().ToLower() == initiativeParams.Username.Trim().ToLower()
                    || i.OwnerName.ToLower() == initiativeParams.MyOwner.ToLower()).OrderByDescending(i => i.CreatedDate);
                    //---------- max - TO for Temporary -------------------------------------------------------------------------------
                    var userId = (from a in _context.UserManagements.AsQueryable()
                                  where a.Email == initiativeParams.Username
                                  select a.Id).FirstOrDefault();
                    var userRole = (from a in _context.UserRoles.AsQueryable()
                                    where a.UserId == userId
                                    select a.RoleId).ToList();
                    // Get Role MAX
                    var roleMAX = (from a in _context.RoleManagements.AsQueryable()
                                   where userRole.Contains(a.RoleId) && a.SectionId == "S00001"
                                   select a.SectionId).Count();

                    if (roleMAX > 0)
                    {
                        //initiatives = initiatives.Union(_context.Initiatives.AsQueryable().Where(i =>
                        //(i.Stage == "IL0" || i.Stage == "IL1" || i.Stage == "IL2" || i.Stage == "IL3" || i.Stage == "IL4" || i.Stage == "IL5")
                        //)).OrderByDescending(i => i.CreatedDate);
                    }
                    //--------------------------------------------------------------------------------------------------------
                    if (userId > 0)
                    {
                        // Get User-Workstream
                        var userWorkstream = (from a in _context.UserWorkstreams.AsQueryable()
                                              where a.UserId == userId
                                              select a.WorkstreamTitle).ToList();

                        if (userWorkstream.Count() > 0)
                        {
                            // Get Workstream from Table:DetailInformation
                            var detailWorkstream = (from a in _context.DetailInformations.AsQueryable()
                                                    where userWorkstream.Contains(a.Workstream)
                                                    select a.InitiativeId).ToList();

                            if (detailWorkstream.Count() > 0)
                            {
                                if (roleMAX > 0)
                                {
                                    // Get Max only and in Workstream from Detail !!!
                                    initiatives = initiatives.Union(_context.Initiatives.AsQueryable().Where(i =>
                                    i.InitiativeType == "max"
                                    && i.Stage != null
                                    && i.Stage != "draft"
                                    && detailWorkstream.Contains(i.Id)
                                    )).OrderByDescending(i => i.CreatedDate);

                                    // initiatives = initiatives.Where(i => !detailWorkstream.Contains(i.Id))
                                    //.Union(_context.Initiatives.AsQueryable().Where(i => detailWorkstream.Contains(i.Id)).OrderByDescending(i => i.CreatedDate)).OrderByDescending(i => i.CreatedDate);
                                }
                                else
                                {
                                    // initiatives = initiatives.Union(_context.Initiatives.AsQueryable().Where(i => detailWorkstream.Contains(i.Id))).OrderByDescending(i => i.CreatedDate);
                                }
                            }
                        }
                    }
                    //------------------------------------------------------------------------------------------------------------------

                    break;
                case "overview":
                    string userEmail = initiativeParams.Username;


                    //BudgetShareService 
                    var BudgetShareServiceList = _context.CommonData.Where(o =>
                                                                      (o.Attribute01.Trim().ToLower() == userEmail.Trim().ToLower() &&
                                                                       o.DataType.Trim().ToLower() == "budgetshareservice"));


                    //CIM 
                    var StrategyPartnerList = _context.CommonData.Where(o =>
                                                                     (o.Attribute01.Trim().ToLower() == userEmail.Trim().ToLower() &&
                                                                      o.DataType.Trim().ToLower() == "strategypartner"));


                    var getCompany = _context.Owners.Where(o => o.Email.ToLower() == userEmail.ToLower())
                           .Select(o => o.CompanyShortTxt).FirstOrDefault();

                    var countEmail = _context.CommonData.Where(o => o.Attribute05.Trim().ToLower() == userEmail.Trim().ToLower() && o.DataType.Trim().ToLower() == "budgetanalyst").Select(o => o.Attribute05).Count();

                    if (countEmail > 0)
                    {
                        initiatives = initiatives.OrderByDescending(i => i.Id);
                    }
                    else if (BudgetShareServiceList.Count() > 0)
                    {
                        CommonData BudgetShareService = (CommonData)BudgetShareServiceList.First();
                        initiatives = initiatives.Where(i => (
                                                                             (
                                                                                  i.Company == BudgetShareService.Attribute02
                                                                                  || i.Company == BudgetShareService.Attribute03
                                                                                  || i.Company == BudgetShareService.Attribute04
                                                                                  || i.Company == BudgetShareService.Attribute05
                                                                                  || i.Company == BudgetShareService.Attribute06
                                                                                  || i.Company == BudgetShareService.Attribute07
                                                                                  || i.Company == BudgetShareService.Attribute08
                                                                                  || i.Company == BudgetShareService.Attribute09
                                                                                  || BudgetShareService.Attribute02 == "*"
                                                                              )
                                                                              && i.Company != null

                                                                      )

                                                             ).OrderByDescending(i => i.Id);
                    }
                    else if (StrategyPartnerList.Count() > 0)
                    {
                        CommonData StrategyPartner = (CommonData)StrategyPartnerList.First();
                        initiatives = initiatives.Where(i => (
                                                                             (
                                                                                  i.Organization == StrategyPartner.Attribute02
                                                                                  || i.Organization == StrategyPartner.Attribute03
                                                                                  || i.Organization == StrategyPartner.Attribute04
                                                                                  || i.Organization == StrategyPartner.Attribute05
                                                                                  || i.Organization == StrategyPartner.Attribute06
                                                                                  || i.Organization == StrategyPartner.Attribute07
                                                                                  || i.Organization == StrategyPartner.Attribute08
                                                                                  || i.Organization == StrategyPartner.Attribute09
                                                                                  || StrategyPartner.Attribute02 == "*"
                                                                              )
                                                                              && (i.InitiativeType == "cim" || i.InitiativeType == "strategy")

                                                                          )

                                                                 ).OrderByDescending(i => i.Id);
                    }
                    else
                    {
                        if (getCompany != null)
                        {
                            initiatives = initiatives.Where(i => i.Company == getCompany).OrderByDescending(i => i.Id);
                        }
                    }




                    break;
                default:
                    //initiatives = initiatives.OrderByDescending(i => i.CreatedDate);
                    break;
            }

            if (!string.IsNullOrEmpty(initiativeParams.Text))
            {
                initiatives = initiatives.Where(i =>
                    i.InitiativeCode.Contains(initiativeParams.Text.Trim()) ||
                    i.Name.Contains(initiativeParams.Text.Trim()) ||
                    i.OwnerName.Contains(initiativeParams.Text.Trim()) ||
                    i.RegisteringDate.ToString().Contains(initiativeParams.Text.Trim()) ||
                    i.Organization.Contains(initiativeParams.Text.Trim()) ||
                    i.Status.Contains(initiativeParams.Text.Trim()) ||
                    i.InitiativeType.Contains(initiativeParams.Text.Trim().ToLower())
                );
            }

            if (!string.IsNullOrEmpty(initiativeParams.Id))
            {
                initiatives = initiatives.Where(i => i.InitiativeCode.Contains(initiativeParams.Id.Trim()));
            }

            if (!string.IsNullOrEmpty(initiativeParams.Workstream) && (!string.IsNullOrEmpty(initiativeParams.SubWorkstream1)))
            {
                var detail = _context.DetailInformations.AsQueryable();
                detail = detail.Where(i => i.Workstream == initiativeParams.Workstream);
                detail = detail.Where(i => i.SubWorkstream1 == initiativeParams.SubWorkstream1);
                List<int> iniIds = detail.Select(i => i.InitiativeId).ToList();
                initiatives = initiatives.Where(i => iniIds.Contains(i.Id));
            }

            if (!string.IsNullOrEmpty(initiativeParams.Name))
            {
                initiatives = initiatives.Where(i => i.Name.Contains(initiativeParams.Name.Trim()));
            }

            if (!string.IsNullOrEmpty(initiativeParams.Status))
            {
                initiatives = initiatives.Where(i => i.Status == initiativeParams.Status);
            }

            if (!string.IsNullOrEmpty(initiativeParams.Type))
            {
                switch (initiativeParams.Type)
                {
                    case "cim":
                        initiatives = initiatives.Where(i => i.Cim == true);
                        break;
                    case "pim":
                        initiatives = initiatives.Where(i => i.Pim == true);
                        break;
                    case "dim":
                        initiatives = initiatives.Where(i => i.Dim == true);
                        break;
                    case "cpi":
                        initiatives = initiatives.Where(i => i.Cpi == true);
                        break;
                    case "directCapex":
                        initiatives = initiatives.Where(i => i.DirectCapex == true);
                        break;
                    case "strategy":
                        initiatives = initiatives.Where(i => i.Strategy == true);
                        break;
                    case "randD":
                        initiatives = initiatives.Where(i => i.RandD == true);
                        break;
                    case "max":
                        initiatives = initiatives.Where(i => i.Max == true);
                        break;
                    case "other":
                        initiatives = initiatives.Where(i => i.Other == true);
                        break;
                    case "IT":
                        initiatives = initiatives.Where(i => i.InitiativeType == "IT");
                        break;
                    case "Digital":
                        initiatives = initiatives.Where(i => i.InitiativeType == "Digital");
                        break;
                    case "Request Pool":
                        initiatives = initiatives.Where(i => i.InitiativeType == "Request Pool");
                        break;
                }
            }

            if (!string.IsNullOrEmpty(initiativeParams.OwnerName))
            {
                initiatives = initiatives.Where(i => i.OwnerName == initiativeParams.OwnerName);
            }

            if (!string.IsNullOrEmpty(initiativeParams.Organization))
            {
                initiatives = initiatives.Where(i => i.Organization == initiativeParams.Organization);
            }

            if (!string.IsNullOrEmpty(initiativeParams.TypeOfInvestment))
            {
                initiatives = initiatives.Where(i => i.TypeOfInvestment == initiativeParams.TypeOfInvestment);
            }

            if (!string.IsNullOrEmpty(initiativeParams.Plant))
            {
                initiatives = initiatives.Where(i => i.Plant == initiativeParams.Plant);
            }

            if (initiativeParams.RegisterDateSince.HasValue)
            {
                initiatives = initiatives.Where(i => i.RegisteringDate.Value.Date >= initiativeParams.RegisterDateSince);
            }

            if (initiativeParams.RegisterDateTo.HasValue)
            {
                initiatives = initiatives.Where(i => i.RegisteringDate.Value.Date <= initiativeParams.RegisterDateTo);
            }

            if (initiativeParams.RegisterDateSince.HasValue && initiativeParams.RegisterDateTo.HasValue)
            {
                initiatives = initiatives.Where(i => i.RegisteringDate.Value.Date >= initiativeParams.RegisterDateSince && i.RegisteringDate.Value.Date <= initiativeParams.RegisterDateTo);
            }

            if (initiativeParams.Progress == false && initiativeParams.Complete == false && initiativeParams.Cancel == false)
            {
                initiatives = initiatives.Where(i =>
                    i.Status != "draft" &&
                    i.Status != "admin check" &&
                    i.Status != "wait for submission" &&
                    i.Status != "revise" &&
                    i.Status != "reject" &&
                    i.Status != "wait for approval" &&
                    i.Status != "wait for cancellation" &&
                    i.Status != "approved" &&
                    i.Status != "finish" &&
                    i.Status != "revised" &&
                    i.Status != "rejected" &&
                    i.Status != "cancelled" &&
                    i.Status != "wait for review" &&
                    i.Status != "wait for create App." &&
                    i.Status != "wait for create WBS" &&
                    i.Status != "wait for cancelled" &&
                    i.Status != "add more" &&
                    i.Status != "add more pool" &&
                    i.Status != "principle approved" &&
                    i.Status != "" &&
                    i.Status != "wait for assign" &&
                    i.Status != "wait for update" &&
                    i.Status != "wait for create" &&
                    i.Status != "update progress" &&
                    i.Status != "wait for DIM approval" &&
                    i.Status != "project planning" &&
                    i.Status != "baseline committed" &&
                    i.Status != "implementing in progress" &&
                    i.Status != "adopt" &&
                    i.Status != "closure"

                );
            }
            else if (initiativeParams.Progress == true && initiativeParams.Complete == true && initiativeParams.Cancel == true)
            {
                initiatives = initiatives.Where(i =>
                    i.Status == "draft" ||
                    i.Status == "admin check" ||
                    i.Status == "wait for submission" ||
                    i.Status == "wait for cancellation" ||
                    i.Status == "revise" ||
                    i.Status == "reject" ||
                    i.Status == "wait for approval" ||
                    i.Status == "approved" ||
                    i.Status == "finish" ||
                    i.Status == "revised" ||
                    i.Status == "rejected" ||
                    i.Status == "cancelled" ||
                    i.Status == "wait for review" ||
                    i.Status == "wait for create App." ||
                    i.Status == "wait for create WBS" ||
                    i.Status == "add more" ||
                    i.Status == "add more pool" ||
                    i.Status == "principle approved" ||
                    i.Status == "" ||
                    i.Status == "wait for assign" ||
                    i.Status == "wait for create" ||
                    i.Status == "in progress" ||
                    i.Status == "wait for update" ||
                    i.Status == "wait for create" ||
                    i.Status == "update progress" ||
                    i.Status == "wait for DIM approval" ||
                    i.Status == "project planning" ||
                    i.Status == "baseline committed" ||
                    i.Status == "implementing in progress" ||
                    i.Status == "adopt" ||
                    i.Status == "closure"
                );
            }
            else if (initiativeParams.Progress == true && initiativeParams.Complete == true)
            {
                initiatives = initiatives.Where(i =>
                    i.Status == "draft" ||
                    i.Status == "admin check" ||
                    i.Status == "wait for submission" ||
                    i.Status == "wait for cancellation" ||
                    i.Status == "revise" ||
                    i.Status == "wait for approval" ||
                    i.Status == "revised" ||
                    i.Status == "approved" ||
                    i.Status == "finish" ||
                    i.Status == "wait for review" ||
                    i.Status == "wait for create App." ||
                    i.Status == "wait for create WBS" ||
                    i.Status == "add more" ||
                    i.Status == "add more pool" ||
                    i.Status == "principle approved" ||
                    i.Status == "" ||
                    i.Status == "wait for assign" ||
                    i.Status == "in progress" ||
                    i.Status == "wait for update" ||
                    i.Status == "wait for create" ||
                    i.Status == "update progress" ||
                    i.Status == "wait for DIM approval" ||
                    i.Status == "project planning" ||
                    i.Status == "baseline committed" ||
                    i.Status == "implementing in progress" ||
                    i.Status == "adopt" ||
                    i.Status == "closure"
                );
            }
            else if (initiativeParams.Progress == true && initiativeParams.Cancel == true)
            {
                initiatives = initiatives.Where(i =>
                    i.Status == "draft" ||
                    i.Status == "admin check" ||
                    i.Status == "wait for submission" ||
                    i.Status == "wait for cancellation" ||
                    i.Status == "revise" ||
                    i.Status == "wait for approval" ||
                    i.Status == "reject" ||
                    i.Status == "rejected" ||
                    i.Status == "cancelled" ||
                    i.Status == "add more" ||
                    i.Status == "add more pool" ||
                    i.Status == "principle approved" ||
                    i.Status == "" ||
                    i.Status == "wait for assign" ||
                    i.Status == "in progress" ||
                    i.Status == "wait for update" ||
                    i.Status == "wait for create" ||
                    i.Status == "update progress"
                );
            }
            else if (initiativeParams.Complete == true && initiativeParams.Cancel == true)
            {
                initiatives = initiatives.Where(i =>
                    i.Status == "approved" ||
                    i.Status == "finish" ||
                    i.Status == "reject" ||
                    i.Status == "rejected" ||
                    i.Status == "cancelled" ||
                    i.Status == "principle approved"
                );
            }
            else if (initiativeParams.Progress == true)
            {
                initiatives = initiatives.Where(i =>
                    i.Status == "draft" ||
                    i.Status == "admin check" ||
                    i.Status == "wait for submission" ||
                    i.Status == "wait for cancellation" ||
                    i.Status == "revise" ||
                    i.Status == "wait for approval" ||
                    i.Status == "revised" ||
                    i.Status == "add more" ||
                    i.Status == "add more pool" ||
                    i.Status == "" ||
                    i.Status == "wait for assign" ||
                    i.Status == "in progress" ||
                    i.Status == "wait for update" ||
                    i.Status == "wait for create" ||
                    i.Status == "update progress" ||
                    i.Status == "wait for DIM approval" ||
                    i.Status == "project planning" ||
                    i.Status == "baseline committed" ||
                    i.Status == "implementing in progress" ||
                    i.Status == "adopt" ||
                    i.Status == "closure"
                );
            }
            else if (initiativeParams.Complete == true)
            {
                initiatives = initiatives.Where(i =>
                    i.Status == "approved" ||
                    i.Status == "finish" ||
                    i.Status == "principle approved"
                );
            }
            else if (initiativeParams.Cancel == true)
            {
                initiatives = initiatives.Where(i =>
                    i.Status == "reject" ||
                    i.Status == "rejected" ||
                    i.Status == "cancelled"
                );
            }

            switch (initiativeParams.Column)
            {
                case "id":
                    if (initiativeParams.OrderBy == "asc")
                    {
                        initiatives = initiatives.OrderBy(i => i.InitiativeCode);
                    }
                    else
                    {
                        initiatives = initiatives.OrderByDescending(i => i.InitiativeCode);
                    }
                    break;
                case "name":
                    if (initiativeParams.OrderBy == "asc")
                    {
                        initiatives = initiatives.OrderBy(i => i.Name);
                    }
                    else
                    {
                        initiatives = initiatives.OrderByDescending(i => i.Name);
                    }
                    break;
                case "owner":
                    if (initiativeParams.OrderBy == "asc")
                    {
                        initiatives = initiatives.OrderBy(i => i.OwnerName);
                    }
                    else
                    {
                        initiatives = initiatives.OrderByDescending(i => i.OwnerName);
                    }
                    break;
                case "stage":
                    if (initiativeParams.OrderBy == "asc")
                    {
                        initiatives = initiatives.OrderBy(i => i.SortStage);
                    }
                    else
                    {
                        initiatives = initiatives.OrderByDescending(i => i.SortStage);
                    }
                    break;
                case "register":
                    if (initiativeParams.OrderBy == "asc")
                    {
                        initiatives = initiatives.OrderBy(i => i.RegisteringDate);
                    }
                    else
                    {
                        initiatives = initiatives.OrderByDescending(i => i.RegisteringDate);
                    }
                    break;
                case "organization":
                    if (initiativeParams.OrderBy == "asc")
                    {
                        initiatives = initiatives.OrderBy(i => i.Organization);
                    }
                    else
                    {
                        initiatives = initiatives.OrderByDescending(i => i.Organization);
                    }
                    break;
                case "type":
                    if (initiativeParams.OrderBy == "asc")
                    {
                        initiatives = initiatives.OrderBy(i => i.InitiativeType);
                    }
                    else
                    {
                        initiatives = initiatives.OrderByDescending(i => i.InitiativeType);
                    }
                    break;
                case "status":
                    if (initiativeParams.OrderBy == "asc")
                    {
                        initiatives = initiatives.OrderBy(i => i.Status);
                    }
                    else
                    {
                        initiatives = initiatives.OrderByDescending(i => i.Status);
                    }
                    break;
            }

            //initiatives = await ReplaceStageNameOutput(await initiatives.ToListAsync(), initiativeParams.PageNumber, initiativeParams.PageSize);
            var dataStages = _context.CommonData.Where(x => x.DataType == "stage").AsQueryable();
            return await PagedList<Initiative>.CreateAsync(initiatives, initiativeParams.PageNumber, initiativeParams.PageSize, dataStages);
        }
        public async Task<PagedList<InitiativeList>> GetListsInitiative(InitiativeParams initiativeParams)
        {

            string userEmail = initiativeParams.Username;
            DataTable dtReturn = new DataTable();
            List<InitiativeList> initiativeListReturn = new List<InitiativeList>();
            var id = initiativeParams.Id == null ? "" : initiativeParams.Id;
            var name = initiativeParams.Name == null ? "" : initiativeParams.Name;
            var status = initiativeParams.Status == null ? "" : initiativeParams.Status;
            var type = initiativeParams.Type == null ? "" : initiativeParams.Type;
            var ownerName = initiativeParams.OwnerName == null ? "" : initiativeParams.OwnerName;
            var plant = initiativeParams.Plant == null ? "" : initiativeParams.Plant;
            var organization = initiativeParams.Organization == null ? "" : initiativeParams.Organization;
            var typeOfInvestment = initiativeParams.TypeOfInvestment == null ? "" : initiativeParams.TypeOfInvestment;
            var workstream = initiativeParams.Workstream == null ? "" : initiativeParams.Workstream;
            var subWorkstream1 = initiativeParams.SubWorkstream1 == null ? "" : initiativeParams.SubWorkstream1;
            var stage = initiativeParams.Stage == null ? "" : initiativeParams.Stage;
            var emocNo = initiativeParams.EmocNo == null ? "" : initiativeParams.EmocNo;
            var wbsNo = initiativeParams.WbsNo == null ? "" : initiativeParams.WbsNo;
            var appNo = initiativeParams.AppNo == null ? "" : initiativeParams.AppNo;
            var company = initiativeParams.Company == null ? "" : initiativeParams.Company;
            var text = initiativeParams.Text == null ? "" : initiativeParams.Text;
            var column = initiativeParams.Column == null ? "" : initiativeParams.Column;
            var orderBy = initiativeParams.OrderBy == null ? "" : initiativeParams.OrderBy;

            switch (initiativeParams.Page)
            {
                case "myTask":
                    dtReturn = await _storeProcedure.ExecuteReturnDatatable($"EXEC sp_List_MyTask " +
                        $"'{ id }'" +       //      @InitiativeCode
                        $",'{name}'" +        //      @InitiativeName
                        $",'{status}'" +        //      @Status
                        $",'{type}'" +        //      @InitiativeType
                        $",'{ownerName}'" +        //      @OwnerName
                        $",'{plant}'" +        //      @Plant
                        $",'{organization}'" +        //      @Organization
                        $",'{typeOfInvestment}'" +        //      @TypeofInvestment
                        $",'{initiativeParams.RegisterDateSince}'" +        //      @RegisteringDateSince
                        $",'{initiativeParams.RegisterDateTo}'" +        //      @RegisteringDateTo
                        $",'{workstream}'" +        //      @WorkStream
                        $",'{subWorkstream1}'" +        //      @SubWorkStream1
                        $",'{stage}'" +        //      @Stage
                        $",'{emocNo}'" +        //      @emocNo
                        $",'{wbsNo}'" +        //      @WBS
                        $",'{appNo}'" +        //      @AppNo
                        $",'{company}'" +        //      @Company
                        $",'{initiativeParams.Progress}'" +        //      @Onprogress
                        $",'{initiativeParams.Complete}'" +        //      @Complete
                        $",'{initiativeParams.Cancel}'" +        //      @Cancel
                        $",'{text}'" +        //      @KeyWord
                        $",'{column}'" +        //      @SortField
                        $",'{orderBy}'" +        //      @OrderBy
                        $",'{initiativeParams.PageNumber}'" +        //      @PageNo
                        $",'{initiativeParams.PageSize}'" +        //      @RowPerPage
                        $",'{initiativeParams.Username}'");         //     @email

                    if (dtReturn.Rows.Count > 0)
                    {
                        initiativeListReturn = CommonMethod.ConvertToList<InitiativeList>(dtReturn);
                    }
                    break;
                case "myOwn":
                    dtReturn = await _storeProcedure.ExecuteReturnDatatable($"EXEC sp_List_MyOwn " +
                        $"'{ id }'" +       //      @InitiativeCode
                        $",'{name}'" +        //      @InitiativeName
                        $",'{status}'" +        //      @Status
                        $",'{type}'" +        //      @InitiativeType
                        $",'{ownerName}'" +        //      @OwnerName
                        $",'{plant}'" +        //      @Plant
                        $",'{organization}'" +        //      @Organization
                        $",'{typeOfInvestment}'" +        //      @TypeofInvestment
                        $",'{initiativeParams.RegisterDateSince}'" +        //      @RegisteringDateSince
                        $",'{initiativeParams.RegisterDateTo}'" +        //      @RegisteringDateTo
                        $",'{workstream}'" +        //      @WorkStream
                        $",'{subWorkstream1}'" +        //      @SubWorkStream1
                        $",'{stage}'" +        //      @Stage
                        $",'{emocNo}'" +        //      @emocNo
                        $",'{wbsNo}'" +        //      @WBS
                        $",'{appNo}'" +        //      @AppNo
                        $",'{company}'" +        //      @Company
                        $",'{initiativeParams.Progress}'" +        //      @Onprogress
                        $",'{initiativeParams.Complete}'" +        //      @Complete
                        $",'{initiativeParams.Cancel}'" +        //      @Cancel
                        $",'{text}'" +        //      @KeyWord
                        $",'{column}'" +        //      @SortField
                        $",'{orderBy}'" +        //      @OrderBy
                        $",'{initiativeParams.PageNumber}'" +        //      @PageNo
                        $",'{initiativeParams.PageSize}'" +        //      @RowPerPage
                        $",'{initiativeParams.Username}'");         //     @email

                    if (dtReturn.Rows.Count > 0)
                    {
                        initiativeListReturn = CommonMethod.ConvertToList<InitiativeList>(dtReturn);
                    }
                    break;
                case "overview":
                    dtReturn = await _storeProcedure.ExecuteReturnDatatable($"EXEC sp_List_Overview " +
                        $"'{ id }'" +       //      @InitiativeCode
                        $",'{name}'" +        //      @InitiativeName
                        $",'{status}'" +        //      @Status
                        $",'{type}'" +        //      @InitiativeType
                        $",'{ownerName}'" +        //      @OwnerName
                        $",'{plant}'" +        //      @Plant
                        $",'{organization}'" +        //      @Organization
                        $",'{typeOfInvestment}'" +        //      @TypeofInvestment
                        $",'{initiativeParams.RegisterDateSince}'" +        //      @RegisteringDateSince
                        $",'{initiativeParams.RegisterDateTo}'" +        //      @RegisteringDateTo
                        $",'{workstream}'" +        //      @WorkStream
                        $",'{subWorkstream1}'" +        //      @SubWorkStream1
                        $",'{stage}'" +        //      @Stage
                        $",'{emocNo}'" +        //      @emocNo
                        $",'{wbsNo}'" +        //      @WBS
                        $",'{appNo}'" +        //      @AppNo
                        $",'{company}'" +        //      @Company
                        $",'{initiativeParams.Progress}'" +        //      @Onprogress
                        $",'{initiativeParams.Complete}'" +        //      @Complete
                        $",'{initiativeParams.Cancel}'" +        //      @Cancel
                        $",'{text}'" +        //      @KeyWord
                        $",'{column}'" +        //      @SortField
                        $",'{orderBy}'" +        //      @OrderBy
                        $",'{initiativeParams.PageNumber}'" +        //      @PageNo
                        $",'{initiativeParams.PageSize}'" +        //      @RowPerPage
                        $",'{initiativeParams.Username}'");         //     @email

                    if (dtReturn.Rows.Count > 0)
                    {
                        initiativeListReturn = CommonMethod.ConvertToList<InitiativeList>(dtReturn);
                    }
                    break;
            }


            //return await PagedList<InitiativeList>.CreateAsync(initiativeListReturn, initiativeParams.PageNumber, initiativeParams.PageSize);
            if (initiativeListReturn.Count > 0)
            {
                return await PagedList<InitiativeList>.CreateListsAsync(initiativeListReturn, initiativeListReturn[0].Counter, initiativeParams.PageNumber, initiativeParams.PageSize);

            }
            else
            {
                return await PagedList<InitiativeList>.CreateListsAsync(initiativeListReturn, 0, initiativeParams.PageNumber, initiativeParams.PageSize);

            }
        }

        public async Task<string[]> InitiativeCoDeveloperCreate(int id, string[] coDevelopers)
        {
            foreach (string item in coDevelopers)
            {
                var CoDeveloperList = new InitiativeCoDeveloper { CoDeveloperName = item, InitiativeId = id };

                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(CoDeveloperList, "Initiative-1019", SQLCommandType.INSERT);
                // End log

                await _context.InitiativeCoDevelopers.AddAsync(CoDeveloperList);
                await _context.SaveChangesAsync();
            }
            return coDevelopers;
        }

        public async Task<bool> InitiativeCoDeveloperDelete(int id)
        {
            var CoDevelopersList = await _context.InitiativeCoDevelopers.Where(i => i.InitiativeId == id).ToListAsync();
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(CoDevelopersList, "Initiative-1032", SQLCommandType.DELETE);
            // End log

            foreach (var entity in CoDevelopersList)
                _context.InitiativeCoDevelopers.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Attachment> InitiativeAttachmentCreate(int id, [FromForm] InitiativeCreateAttachment initiative)
        {
            DateTime now = DateTime.Now;
            var Day = now.Day;
            var Month = now.Month;
            var Year = now.Year;
            var Hour = now.Hour;
            var Minute = now.Minute;
            var Second = now.Second;
            string extension = Path.GetExtension(initiative.File.FileName);
            string result = Path.GetFileNameWithoutExtension(initiative.File.FileName);
            string NewFileName =
                result + "_" + Day.ToString() +
                Month.ToString() + Year.ToString() +
                Hour.ToString() + Minute.ToString() +
                Second.ToString() + extension.ToString();
            string FileName = result + extension.ToString();
            string contentType = initiative.File.ContentType;
            var attachment = new Attachment
            {
                Name = FileName,
                ContentType = contentType,
                InitiativeId = id,
                FileName = NewFileName,
                Extension = extension

            };
            //using (var memoryStream = new MemoryStream())
            //{
            //    initiative.File.CopyTo(memoryStream);
            //    attachment.File = memoryStream.ToArray();
            //}

            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(attachment, "Initiative-1075", SQLCommandType.INSERT);
            // End log

            await _context.Attachments.AddAsync(attachment);
            await _context.SaveChangesAsync();
            return attachment;
        }


        public async Task<Attachment> CategoryAttachmentCreate(int id, [FromForm] InitiativeCreateAttachment initiative, AttechmentCategory attechmentCategory)
        {
            DateTime now = DateTime.Now;
            var Day = now.Day;
            var Month = now.Month;
            var Year = now.Year;
            var Hour = now.Hour;
            var Minute = now.Minute;
            var Second = now.Second;
            string extension = Path.GetExtension(initiative.File.FileName);
            string result = Path.GetFileNameWithoutExtension(initiative.File.FileName);
            string NewFileName =
                result + "_" + Day.ToString() +
                Month.ToString() + Year.ToString() +
                Hour.ToString() + Minute.ToString() +
                Second.ToString() + extension.ToString();
            string FileName = result + extension.ToString();
            string contentType = initiative.File.ContentType;
            var attachment = new Attachment
            {
                Name = FileName,
                ContentType = contentType,
                InitiativeId = id,
                FileName = NewFileName,
                Extension = extension,
                CategoryId = attechmentCategory.CategoryId,
                CategoryName = attechmentCategory.CategoryType
            };
            //using (var memoryStream = new MemoryStream())
            //{
            //    initiative.File.CopyTo(memoryStream);
            //    attachment.File = memoryStream.ToArray();
            //}
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(attachment, "Initiative-1118", SQLCommandType.INSERT);
            // End log
            await _context.Attachments.AddAsync(attachment);
            await _context.SaveChangesAsync();
            return attachment;
        }

        public async Task<Attachment> GetAttachment(int id)
        {
            var attachment = await _context.Attachments.FirstOrDefaultAsync(i => i.Id == id);
            return attachment;
        }

        public async Task<List<Attachment>> GetCategoryAttachment(int id, AttechmentCategory attechmentCategory)
        {
            var attachment = await _context.Attachments.Where(i => i.InitiativeId == id && i.CategoryId == attechmentCategory.CategoryId && i.CategoryName == attechmentCategory.CategoryType).ToListAsync();
            return attachment;
        }

        public async Task<InitiativeCreateProduct> CreateInitiativeProduct(int id, InitiativeCreateProduct initiativeCreateProduct)
        {
            if (_context.Products.Any())
            {
                var ProductList = await _context.Products.Where(i => i.InitiativeId == id).ToListAsync();

                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(ProductList, "Initiative-1144", SQLCommandType.DELETE);
                // End log

                foreach (var entity in ProductList)
                    _context.Products.Remove(entity);
                await _context.SaveChangesAsync();
            }

            foreach (var item in initiativeCreateProduct.Products)
            {
                item.Id = 0;
                await _context.Products.AddAsync(item);
                await _context.SaveChangesAsync();
            }
            return initiativeCreateProduct;
        }

        public async Task<InitiativeCreateMilestone> CreateInitiativeMilestone(int id, InitiativeCreateMilestone initiativeCreateMilestone)
        {
            if (_context.Milestones.Any())
            {
                var MilestoneList = await _context.Milestones.Where(i => i.InitiativeId == id).ToListAsync();
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(MilestoneList, "Initiative1167", SQLCommandType.DELETE);
                // End log
                foreach (var entity in MilestoneList)
                    _context.Milestones.Remove(entity);
                await _context.SaveChangesAsync();
            }

            foreach (var item in initiativeCreateMilestone.Milestones)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(item, "Initiative-1177", SQLCommandType.INSERT);
                // End log

                await _context.Milestones.AddAsync(item);
                await _context.SaveChangesAsync();
            }
            return initiativeCreateMilestone;
        }

        public async Task<InitiativeProgressAndMilestone> CreateInitiativeProgressAndMilestone(int id, InitiativeProgressAndMilestone initiativeProgressAndMilestone)
        {
            if (_context.ProgressDetails.Any())
            {
                var ProgressAndMilestoneList = await _context.ProgressDetails.Where(i => i.InitiativeId == id).ToListAsync();

                if (ProgressAndMilestoneList != null)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(ProgressAndMilestoneList, "Initiative-1195", SQLCommandType.DELETE);
                    // End log

                    foreach (var entity in ProgressAndMilestoneList)
                        _context.ProgressDetails.Remove(entity);
                    await _context.SaveChangesAsync();
                }
            }

            foreach (var item in initiativeProgressAndMilestone.ProgressDetails)
            {
                item.Id = 0;
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(item, "Initiative-1208", SQLCommandType.INSERT);
                // End log

                await _context.ProgressDetails.AddAsync(item);

                await _context.SaveChangesAsync();
            }
            return initiativeProgressAndMilestone;
        }

        public async Task<InitiativeCreateFinancialIndicator> CreateFinancialIndicator(int id, InitiativeCreateFinancialIndicator initiativeFinancialIndicator)
        {
            if (_context.FinancialIndicators.Any())
            {
                var FinancialList = await _context.FinancialIndicators.Where(i => i.InitiativeId == id).ToListAsync();
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(FinancialList, "Initiative-1224", SQLCommandType.DELETE);
                // End log
                foreach (var entity in FinancialList)
                    _context.FinancialIndicators.Remove(entity);
                await _context.SaveChangesAsync();
            }

            foreach (var item in initiativeFinancialIndicator.Financials)
            {
                item.Id = 0;
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(item, "Initiative-1235", SQLCommandType.INSERT);
                // End log
                await _context.FinancialIndicators.AddAsync(item);
                await _context.SaveChangesAsync();
            }
            return initiativeFinancialIndicator;
        }

        public async Task<bool> InitiativeFinancialDelete(int id)
        {
            if (_context.Financials.Any())
            {
                var FinancialsList = await _context.Financials.Where(i => i.InitiativeId == id).ToListAsync();
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(FinancialsList, "Initiative-1249", SQLCommandType.DELETE);
                // End log
                foreach (var entity in FinancialsList)
                    _context.Financials.Remove(entity);
                await _context.SaveChangesAsync();
                return true;
            }
            return true;
        }

        public async Task<bool> InitiativeDetailDelete(int id)
        {
            var DetailsList = await _context.InitiativeDetails.Where(i => i.InitiativeId == id).ToListAsync();
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(DetailsList, "Initiative-1263", SQLCommandType.DELETE);
            // End log
            foreach (var entity in DetailsList)
                _context.InitiativeDetails.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<User> GetUserInitiative(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(i => i.Username == username);
            return user;
        }

        public async Task<bool> CheckApprove(int id, string actionBy)
        {
            int lastCounter = await GetLastCounterInitiativeAction(id);
            if (lastCounter != 0)
            {
                lastCounter--;
            }

            if (await _context.InitiativeActions.Where(a => a.ActionBy == actionBy && (a.Action == "approve" || a.Action == "approveEdit") && a.InitiativeId == id && a.Counter == lastCounter && a.ActionResult == null && (a.IsInactive == null || a.IsInactive == false)).AnyAsync())
                return true;
            return false;
        }

        public async Task<bool> CheckApproved(int id)
        {
            if (await _context.InitiativeActions.Where(a => a.InitiativeId == id && a.Status == "approved").AnyAsync())
                return true;
            return false;
        }

        public async Task<Initiative> SetActionBy(int id, string username, string status, string stage, InitiativeTypeSubType initiativeTypeSubType)
        {
            //string[] InitiativeTypeCapex = { "directCapex", "Digital Survey", "Request Pool" };
            var initiativeType = initiativeTypeSubType.ProcessType;
            var initiative = await _context.Initiatives.FirstOrDefaultAsync(i => i.Id == id);
            //var initiativeType = initiative.InitiativeType == null ? "max" : initiative.InitiativeType;  //if null force to MAX
            var ownerEmail = await GetEmailOwnerByInitiativeID(id);
            var approver = await _context.TypeStageApprover.Where(i => i.Stage == stage && i.Type == initiativeType && i.SubType == initiativeTypeSubType.SubType).ToListAsync();

            bool isTypeMaxAndRequestCapex = initiative.InitiativeType.Contains("max") && initiative.IsRequestCapex == true;

            //if (isTypeMaxAndRequestCapex == true)
            //{
            //    initiativeType = "directCapex";
            //}

            if (initiativeType == "pimcapex")
            {
                await RemoveInitiativeActions(id);
                if (status == "revised" || status == "draft")
                {
                    await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                    await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                    return initiative;
                }

                if (status == "reject" || status == "cancelled")
                {
                    await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                    await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                    return initiative;
                }

                //admin approver
                var stageApprovers = await _context.TypeStageApprover.Where(i => i.Type == initiativeType && i.Stage == stage && i.SubType == initiativeTypeSubType.SubType).ToListAsync();
                var budgetTeamApprover = await BudgetTeamApprover_CIM(initiativeTypeSubType);

                switch (stage)
                {
                    case "Gate2 : VAC Gate3":
                        foreach (var entity in stageApprovers)
                            await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                        break;
                    case "Gate2 : PIC Gate3":
                        foreach (var entity in stageApprovers)
                            await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                        break;
                    case "Gate3 : CAPEX-1":
                        await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                        await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                        break;
                    case "Gate3 : CAPEX-2":
                        foreach (var entity in stageApprovers)
                            await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                        break;
                    case "Gate3 : CAPEX-3":
                        if (budgetTeamApprover != null)
                            await AddInitiativeActions(budgetTeamApprover.Email, "approve", "approver", status, stage, id);
                        break;

                    default:
                        break;
                }

                return initiative;
            }

            string[] Capexstages = await _context.TypeStage.Where(i => i.Type == "directCapex").Select(i => i.Stage).ToArrayAsync();
            string[] CimStages = await _context.TypeStage.Where(i => i.Type == "cim" && i.SubType == initiativeTypeSubType.SubType).Select(i => i.Stage).ToArrayAsync();

            string[] stageForGetApprover = { "First Review-1", "First Review-2", "Initiative-1", "Initiative-2", "Pre-DD-1", "Pre-DD-2", "DD-1", "DD-2", "Seeking Potential-1", "Seeking Potential-2", "Detail F/S-1", "Detail F/S-2", "BEP-1", "BEP-2", "Pelim-1", "Pelim-2" };

            if (initiativeType == "cpi")
            {
                await RemoveInitiativeActions(id);
                if (status == "revised" || status == "draft")
                {
                    await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                    await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                    return initiative;
                }

                if (status == "reject" || status == "cancelled")
                {
                    return initiative;
                }

                var DMapprover = await DMApprover(initiativeTypeSubType);
                switch (stage)
                {
                    case "First Review":
                        //DM Approver                        
                        if (DMapprover != null)
                            await AddInitiativeActions(DMapprover.Email, "approve", "approver", status, stage, id);
                        break;
                    case "Initiative-2":
                        //DM Approver
                        if (DMapprover != null)
                            await AddInitiativeActions(DMapprover.Email, "approve", "approver", status, stage, id);
                        break;
                    default:
                        break;
                }
                return initiative;
            }

            if (initiativeType == "dim")
            {

                await RemoveInitiativeActions(id);
                if (status == "revised" || status == "draft" || status == "principle approved" || status == "project planning" || status == "implementing in progress" || status == "adopt")
                {
                    await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                    await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                    return initiative;
                }

                if (status == "reject" || status == "cancelled")
                {
                    return initiative;
                }

                //admin approver
                var adminApprovers = await _context.TypeStageApprover.Where(i => i.Type == initiativeType && i.Stage == "Admin Check" && i.SubType == initiativeTypeSubType.SubType).ToListAsync();
                var approversByStage = await _context.TypeStageApprover.Where(i => i.Type == initiativeType && i.Stage == stage && i.SubType == initiativeTypeSubType.SubType).ToListAsync();
                //var approversAdminHandOver = await _context.TypeStageApprover.Where(i => i.Type == initiativeType && i.Stage == "Admin Handover" && i.SubType == initiativeTypeSubType.SubType).ToListAsync();

                var budgetTeamApprover = await BudgetTeamApprover_CIM(initiativeTypeSubType);
                var sponsor = await DimMemberApprover(initiativeTypeSubType, "ProjectSponsor");
                var financeExpert = await DimFinanceExpert();
                //approver
                if (initiativeTypeSubType.SubType == null)
                {
                    switch (stage)
                    {
                        case "Admin Check":
                            //Admin
                            foreach (var entity in adminApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate-1":
                            //DM Approver
                            var DMapprover = await DMApprover(initiativeTypeSubType);
                            if (DMapprover != null)
                                await AddInitiativeActions(DMapprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate-2":
                            //VP Approver
                            var VPapprover = await VPOrgChartApprover(initiativeTypeSubType);
                            if (VPapprover != null)
                                await AddInitiativeActions(VPapprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate-3":
                            //SVP Approver
                            var SVPapprover = await EVPOrgChartApprover(initiativeTypeSubType);
                            if (SVPapprover != null)
                                await AddInitiativeActions(SVPapprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate-4":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Ideate-5":
                            //Admin
                            foreach (var entity in adminApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate-6":
                            //DIM Approver  *now force to admin  
                            foreach (var entity in adminApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate-7":
                            //VP
                            var vpDim = await VPDIMApprover(initiativeTypeSubType);
                            if (vpDim == null)
                            {
                                foreach (var entity in approversByStage)
                                    await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            }
                            else
                            {
                                await AddInitiativeActions(vpDim.Email, "approve", "approver", status, stage, id);
                            }
                            break;
                        case "Ideate-8":
                            //SVP
                            var evpDim = await EVPDIMApprover(initiativeTypeSubType);
                            if (evpDim == null)
                            {
                                foreach (var entity in approversByStage)
                                    await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            }
                            else
                            {
                                await AddInitiativeActions(evpDim.Email, "approve", "approver", status, stage, id);
                            }
                            break;
                        case "Budget Team":
                            //Budget Team
                            if (budgetTeamApprover != null)
                                await AddInitiativeActions(budgetTeamApprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Implementing-1":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Implementing-2":
                            //Admin
                            foreach (var entity in adminApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            break;
                        case "Implementing-3":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Adopt":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Closure":
                            //add admin handover to approve
                            //foreach (var entity in approversAdminHandOver)
                            //    await AddInitiativeActions(entity.Approver, "approve", "admin handover", status, "Admin Handover", id);

                            //Admin
                            foreach (var entity in approversByStage)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            break;
                        case "Completed":
                            break;

                        default:
                            break;
                    }
                }
                else if (initiativeTypeSubType.SubType == "direct")
                {
                    switch (stage)
                    {
                        case "IL0":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Admin Check":
                            //Admin
                            foreach (var entity in adminApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL1-1":
                            //DM Approver
                            var DMapprover = await DMApprover(initiativeTypeSubType);
                            if (DMapprover != null)
                                await AddInitiativeActions(DMapprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL1-2":
                            //VP Approver
                            var VPapprover = await VPOrgChartApprover(initiativeTypeSubType);
                            if (VPapprover != null)
                                await AddInitiativeActions(VPapprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL1-3":
                            //SVP Approver
                            var SVPapprover = await EVPOrgChartApprover(initiativeTypeSubType);
                            if (SVPapprover != null)
                                await AddInitiativeActions(SVPapprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL1-4":
                            //TO Team
                            var MaxApproversByStageSIL1_4 = await _context.MaxApprovers.Where(i => i.InitiativeId == initiative.Id
                                                                            && i.ApproverType == "TOTeam"
                                                                            ).OrderBy(i => i.Order).ToListAsync();

                            if (MaxApproversByStageSIL1_4.Any())
                            {
                                foreach (var entity in MaxApproversByStageSIL1_4)
                                {
                                    await AddInitiativeActions(entity.ApproverEmail, "approve", "approver", status, stage, id);
                                }
                            }
                            break;
                        case "Ideate IL1":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Ideate SIL2-1":
                            //Admin
                            foreach (var entity in adminApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            if (budgetTeamApprover != null)
                                await AddInitiativeActions(budgetTeamApprover.Email, "approve", "approver", status, stage, id);
                            //WSL
                            //TO Team
                            //TO Finance
                            var MaxApproversByStageSIL2_1 = await _context.MaxApprovers.Where(i => i.InitiativeId == initiative.Id
                                                                            && new string[] { "WorkstreamLead", "TO Finance", "TOTeam" }.Contains(i.ApproverType)
                                                                            ).OrderBy(i => i.Order).ToListAsync();

                            if (MaxApproversByStageSIL2_1.Any())
                            {
                                foreach (var entity in MaxApproversByStageSIL2_1)
                                {
                                    await AddInitiativeActions(entity.ApproverEmail, "approve", "approver", status, stage, id);
                                }
                            }
                            break;
                        case "Ideate SIL2-2":
                            //Admin
                            foreach (var entity in adminApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL2-3":
                            //VP
                            var vpDim = await VPDIMApprover(initiativeTypeSubType);
                            if (vpDim == null)
                            {
                                foreach (var entity in approversByStage)
                                    await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            }
                            else
                            {
                                await AddInitiativeActions(vpDim.Email, "approve", "approver", status, stage, id);
                            }
                            break;
                        case "Ideate SIL2-4":
                            //SVP
                            var evpDim = await EVPDIMApprover(initiativeTypeSubType);
                            if (evpDim == null)
                            {
                                foreach (var entity in approversByStage)
                                    await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            }
                            else
                            {
                                await AddInitiativeActions(evpDim.Email, "approve", "approver", status, stage, id);
                            }
                            break;
                        //case "Implementing IL2-1":
                        //    await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                        //    await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                        //    break;
                        case "Budget Team":
                            //Budget Team
                            if (budgetTeamApprover != null)
                                await AddInitiativeActions(budgetTeamApprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Implementing IL2":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Implementing SIL3":
                            var MaxApproversByStageSIL3 = await _context.MaxApprovers.Where(i => i.InitiativeId == initiative.Id
                                                                            && new string[] { "CTO", "TO Finance" }.Contains(i.ApproverType)
                                                                            ).OrderBy(i => i.Order).ToListAsync();

                            if (MaxApproversByStageSIL3.Any())
                            {
                                foreach (var entity in MaxApproversByStageSIL3)
                                {
                                    await AddInitiativeActions(entity.ApproverEmail, "approve", "approver", status, stage, id);
                                }
                            }

                            //sponsor
                            foreach (var entity in sponsor)
                                await AddInitiativeActions(entity.Email, "approve", "approver", status, stage, id);

                            break;
                        case "Implementing IL3":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Adopt IL3":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Adopt SIL4":
                            //add admin handover to approve
                            //foreach (var entity in approversAdminHandOver)
                            //    await AddInitiativeActions(entity.Approver, "approve", "admin handover", status, "Admin Handover", id);

                            //var MaxApproversByStageSIL4 = approversByStage;
                            var MaxApproversByStageSIL4 = await _context.MaxApprovers.Where(i => i.InitiativeId == initiative.Id
                                                                            && new string[] { "CTO", "CFO" }.Contains(i.ApproverType)
                                                                            ).OrderBy(i => i.Order).ToListAsync();

                            if (MaxApproversByStageSIL4.Any())
                            {
                                foreach (var entity in MaxApproversByStageSIL4)
                                {
                                    await AddInitiativeActions(entity.ApproverEmail, "approve", "approver", status, stage, id);
                                }
                            }

                            //sponsor
                            foreach (var entity in sponsor)
                                await AddInitiativeActions(entity.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Adopt IL4":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Adopt SIL5":
                            var MaxApproversByStageSIL5 = await _context.MaxApprovers.Where(i => i.InitiativeId == initiative.Id
                                                                            && new string[] { "Sponsor", "CTO", "CFO" }.Contains(i.ApproverType)
                                                                            ).OrderBy(i => i.Order).ToListAsync();

                            if (MaxApproversByStageSIL5.Any())
                            {
                                foreach (var entity in MaxApproversByStageSIL5)
                                {
                                    await AddInitiativeActions(entity.ApproverEmail, "approve", "approver", status, stage, id);
                                }
                            }

                            //sponsor
                            foreach (var entity in sponsor)
                                await AddInitiativeActions(entity.Email, "approve", "approver", status, stage, id);
                            break;
                        case "IL5":
                            break;
                    }
                }
                else if (initiativeTypeSubType.SubType == "indirect")
                {
                    switch (stage)
                    {
                        case "IL0":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Admin Check":
                            //Admin
                            foreach (var entity in adminApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL1-1":
                            //DM Approver
                            var DMapprover = await DMApprover(initiativeTypeSubType);
                            if (DMapprover != null)
                                await AddInitiativeActions(DMapprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL1-2":
                            //VP Approver
                            var VPapprover = await VPOrgChartApprover(initiativeTypeSubType);
                            if (VPapprover != null)
                                await AddInitiativeActions(VPapprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL1-3":
                            //SVP Approver
                            var SVPapprover = await EVPOrgChartApprover(initiativeTypeSubType);
                            if (SVPapprover != null)
                                await AddInitiativeActions(SVPapprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate IL1":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Ideate SIL2-1":
                            //Admin
                            foreach (var entity in adminApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            //"Finance Expert"
                            foreach (var entity in financeExpert)
                                await AddInitiativeActions(entity.Email, "approve", "approver", status, stage, id);

                            //var MaxApproversByStageSIL2_1 = await _context.MaxApprovers.Where(i => i.InitiativeId == initiative.Id
                            //                                                && new string[] { "Finance Expert" }.Contains(i.ApproverType)
                            //                                                ).OrderBy(i => i.Order).ToListAsync();

                            //if (MaxApproversByStageSIL2_1.Any())
                            //{
                            //    foreach (var entity in MaxApproversByStageSIL2_1)
                            //    {
                            //        await AddInitiativeActions(entity.ApproverEmail, "approve", "approver", status, stage, id);
                            //    }
                            //}
                            break;
                        case "Ideate SIL2-2":
                            //Admin
                            foreach (var entity in adminApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL2-3":
                            //VP
                            var vpDim = await VPDIMApprover(initiativeTypeSubType);
                            if (vpDim == null)
                            {
                                foreach (var entity in approversByStage)
                                    await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            }
                            else
                            {
                                await AddInitiativeActions(vpDim.Email, "approve", "approver", status, stage, id);
                            }
                            break;
                        case "Ideate SIL2-4":
                            //SVP
                            var evpDim = await EVPDIMApprover(initiativeTypeSubType);
                            if (evpDim == null)
                            {
                                foreach (var entity in approversByStage)
                                    await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            }
                            else
                            {
                                await AddInitiativeActions(evpDim.Email, "approve", "approver", status, stage, id);
                            }
                            break;
                        //case "Implementing IL2-1":
                        //    await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                        //    await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                        //    break;
                        case "Budget Team":
                            //Budget Team
                            if (budgetTeamApprover != null)
                                await AddInitiativeActions(budgetTeamApprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Implementing IL2":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Implementing SIL3":
                            //sponsor
                            foreach (var entity in sponsor)
                                await AddInitiativeActions(entity.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Implementing IL3":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Adopt IL3":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Adopt SIL4":
                            //sponsor
                            foreach (var entity in sponsor)
                                await AddInitiativeActions(entity.Email, "approve", "approver", status, stage, id);
                            break;
                        case "IL4":
                            break;
                    }
                }
                else if (initiativeTypeSubType.SubType == "direct,indirect")
                {
                    switch (stage)
                    {
                        case "IL0":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Admin Check":
                            //Admin
                            foreach (var entity in adminApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL1-1":
                            //DM Approver
                            var DMapprover = await DMApprover(initiativeTypeSubType);
                            if (DMapprover != null)
                                await AddInitiativeActions(DMapprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL1-2":
                            //VP Approver
                            var VPapprover = await VPOrgChartApprover(initiativeTypeSubType);
                            if (VPapprover != null)
                                await AddInitiativeActions(VPapprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL1-3":
                            //SVP Approver
                            var SVPapprover = await EVPOrgChartApprover(initiativeTypeSubType);
                            if (SVPapprover != null)
                                await AddInitiativeActions(SVPapprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL1-4":
                            //TO Team
                            var MaxApproversByStageSIL1_4 = await _context.MaxApprovers.Where(i => i.InitiativeId == initiative.Id
                                                                            && i.ApproverType == "TOTeam"
                                                                            ).OrderBy(i => i.Order).ToListAsync();

                            if (MaxApproversByStageSIL1_4.Any())
                            {
                                foreach (var entity in MaxApproversByStageSIL1_4)
                                {
                                    await AddInitiativeActions(entity.ApproverEmail, "approve", "approver", status, stage, id);
                                }
                            }
                            break;
                        case "Ideate IL1":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Ideate SIL2-1":
                            //Admin
                            foreach (var entity in adminApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            //WSL
                            //TO Team
                            //Finance Expert   
                            //TO Finance
                            var MaxApproversByStageSIL2_1 = await _context.MaxApprovers.Where(i => i.InitiativeId == initiative.Id
                                                                            && new string[] { "WorkstreamLead", "TO Finance", "TOTeam" }.Contains(i.ApproverType)
                                                                            ).OrderBy(i => i.Order).ToListAsync();

                            if (MaxApproversByStageSIL2_1.Any())
                            {
                                foreach (var entity in MaxApproversByStageSIL2_1)
                                {
                                    await AddInitiativeActions(entity.ApproverEmail, "approve", "approver", status, stage, id);
                                }
                            }

                            //finance expert
                            foreach (var entity in financeExpert)
                                await AddInitiativeActions(entity.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL2-2":
                            //Admin
                            foreach (var entity in adminApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            break;
                        case "Ideate SIL2-3":
                            //VP
                            var vpDim = await VPDIMApprover(initiativeTypeSubType);
                            if (vpDim == null)
                            {
                                foreach (var entity in approversByStage)
                                    await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            }
                            else
                            {
                                await AddInitiativeActions(vpDim.Email, "approve", "approver", status, stage, id);
                            }
                            break;
                        case "Ideate SIL2-4":
                            //SVP
                            var evpDim = await EVPDIMApprover(initiativeTypeSubType);
                            if (evpDim == null)
                            {
                                foreach (var entity in approversByStage)
                                    await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            }
                            else
                            {
                                await AddInitiativeActions(evpDim.Email, "approve", "approver", status, stage, id);
                            }
                            break;
                        //case "Implementing IL2-1":
                        //    await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                        //    await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                        //    break;
                        case "Budget Team":
                            //Budget Team
                            if (budgetTeamApprover != null)
                                await AddInitiativeActions(budgetTeamApprover.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Implementing IL2":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Implementing SIL3":
                            var MaxApproversByStageSIL3 = await _context.MaxApprovers.Where(i => i.InitiativeId == initiative.Id
                                                                            && new string[] { "Sponsor", "CTO", "TO Finance" }.Contains(i.ApproverType)
                                                                            ).OrderBy(i => i.Order).ToListAsync();

                            if (MaxApproversByStageSIL3.Any())
                            {
                                foreach (var entity in MaxApproversByStageSIL3)
                                {
                                    await AddInitiativeActions(entity.ApproverEmail, "approve", "approver", status, stage, id);
                                }
                            }
                            break;
                        case "Implementing IL3":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Adopt IL3":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Adopt SIL4":
                            //add admin handover to approve
                            //foreach (var entity in approversAdminHandOver)
                            //    await AddInitiativeActions(entity.Approver, "approve", "admin handover", status, "Admin Handover", id);


                            //var MaxApproversByStageSIL4 = approversByStage;
                            var MaxApproversByStageSIL4 = await _context.MaxApprovers.Where(i => i.InitiativeId == initiative.Id
                                                                            && new string[] { "CTO", "CFO" }.Contains(i.ApproverType)
                                                                            ).OrderBy(i => i.Order).ToListAsync();

                            if (MaxApproversByStageSIL4.Any())
                            {
                                foreach (var entity in MaxApproversByStageSIL4)
                                {
                                    await AddInitiativeActions(entity.ApproverEmail, "approve", "approver", status, stage, id);
                                }
                            }

                            //sponsor
                            foreach (var entity in sponsor)
                                await AddInitiativeActions(entity.Email, "approve", "approver", status, stage, id);
                            break;
                        case "Adopt IL4":
                            await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                            await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                            break;
                        case "Adopt SIL5":
                            var MaxApproversByStageSIL5 = await _context.MaxApprovers.Where(i => i.InitiativeId == initiative.Id
                                                                            && new string[] { "CTO", "CFO" }.Contains(i.ApproverType)
                                                                            ).OrderBy(i => i.Order).ToListAsync();

                            if (MaxApproversByStageSIL5.Any())
                            {
                                foreach (var entity in MaxApproversByStageSIL5)
                                {
                                    await AddInitiativeActions(entity.ApproverEmail, "approve", "approver", status, stage, id);
                                }
                            }

                            //sponsor
                            foreach (var entity in sponsor)
                                await AddInitiativeActions(entity.Email, "approve", "approver", status, stage, id);
                            break;
                        case "IL5":
                            break;
                    }
                }

                return initiative;
            }

            if (initiativeType == "pim")
            {
                await RemoveInitiativeActions(id);

                if (status == "wait for cancellation")
                {
                    var vpApprover = await VPOrgChartApprover(initiativeTypeSubType);
                    await AddInitiativeActions(vpApprover.Email, "approve", "approver", status, stage, id);
                    return initiative;
                }

                if (status == "revised" || status == "draft")
                {
                    await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                    await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                    return initiative;
                }

                //admin approver
                var stageApprovers = await _context.TypeStageApprover.Where(i => i.Type == initiativeType && i.Stage == stage && i.SubType == initiativeTypeSubType.SubType).ToListAsync();
                var budgetTeamApprover = await BudgetTeamApprover_CIM(initiativeTypeSubType);
                //approver zone

                //if (initiativeTypeSubType.SubType == "tpx")
                //{
                //    switch (stage)
                //    {
                //        case "Initiating-1":

                //            break;
                //        case "Initiating-2":

                //            break;
                //        case "Initiating-3":

                //            break;
                //        case "Gate0 : Phase1-1":

                //            break;
                //        case "Gate0 : Phase1-2":

                //            break;
                //        case "Gate0 : VAC Gate1":

                //            break;
                //        case "Gate0 : Sub-PIC Gate1":

                //            break;
                //        case "Gate1 : Phase2":

                //            break;
                //        case "Gate1 : VAC Gate2":

                //            break;
                //        case "Gate1 : PIC Gate2":

                //            break;
                //        case "Gate2 : CAPEX-1":

                //            break;
                //        case "Gate2 : CAPEX-2":

                //            break;
                //        case "Gate2 : CAPEX-3":

                //            break;
                //        case "Gate2 : CAPEX-4":

                //            break;
                //        case "Gate2 : CAPEX-5":

                //            break;
                //        case "Gate2 : CAPEX-6":

                //            break;
                //        case "Gate2 : Phase3":

                //            break;
                //        case "Gate2 : VAC Gate3":

                //            break;
                //        case "Gate2 : PIC Gate3":

                //            break;
                //        case "Gate3 : CAPEX-1":

                //            break;
                //        case "Gate3 : CAPEX-2":

                //            break;
                //        case "Gate3 : CAPEX-3":

                //            break;
                //        case "Gate3 : Phase4-1":

                //            break;
                //        case "Gate3 : Phase4-2":

                //            break;
                //        case "Gate3 : Phase4-3":

                //            break;
                //        case "Gate3 : VAC Gate4":

                //            break;
                //        case "Gate3 : PIC Gate4":

                //            break;
                //        case "Gate4 : Execution Lookback":

                //            break;

                //    }
                //}
                //else if (initiativeTypeSubType.SubType == "notpx")
                //{
                //    switch (stage)
                //    {
                //        case "Initiating-1":

                //            break;
                //        case "Initiating-2":

                //            break;
                //        case "Gate0 : Phase1":

                //            break;
                //        case "Gate0 : VAC Gate1":

                //            break;
                //        case "Gate0 : Sub-PIC Gate1":

                //            break;
                //        case "Gate1 : Phase2":

                //            break;
                //        case "Gate1 : VAC Gate2":

                //            break;
                //        case "Gate1 : PIC Gate2":

                //            break;
                //        case "Gate2 : CAPEX-1":

                //            break;
                //        case "Gate2 : CAPEX-2":

                //            break;
                //        case "Gate2 : CAPEX-3":

                //            break;
                //        case "Gate2 : CAPEX-4":

                //            break;
                //        case "Gate2 : CAPEX-5":

                //            break;
                //        case "Gate2 : CAPEX-6":

                //            break;
                //        case "Gate2 : Phase3":

                //            break;
                //        case "Gate2 : VAC Gate3":

                //            break;
                //        case "Gate2 : PIC Gate3":

                //            break;
                //        case "Gate3 : CAPEX-1":

                //            break;
                //        case "Gate3 : CAPEX-2":

                //            break;
                //        case "Gate3 : CAPEX-3":

                //            break;
                //        case "Gate3 : Phase4-1":

                //            break;
                //        case "Gate3 : Phase4-2":

                //            break;
                //        case "Gate3 : Phase4-3":

                //            break;
                //        case "Gate3 : VAC Gate4":

                //            break;
                //        case "Gate3 : PIC Gate4":

                //            break;
                //        case "Gate4 : Execution Lookback":

                //            break;
                //    }
                //}
                //else if (initiativeTypeSubType.SubType == "environment,notpx")
                //{
                //    switch (stage)
                //    {
                //        case "Initiating-1":

                //            break;
                //        case "Initiating-2":

                //            break;
                //        case "Gate0 : Phase1":

                //            break;
                //        case "Gate0 : VAC Gate1":

                //            break;
                //        case "Gate0 : Sub-PIC Gate1":

                //            break;
                //        case "Gate1 : Phase2":

                //            break;
                //        case "Gate1 : VAC Gate2":

                //            break;
                //        case "Gate1 : PIC Gate2":

                //            break;
                //        case "Gate2 : CAPEX-1":

                //            break;
                //        case "Gate2 : CAPEX-2":

                //            break;
                //        case "Gate2 : CAPEX-3":

                //            break;
                //        case "Gate2 : CAPEX-4":

                //            break;
                //        case "Gate2 : CAPEX-5":

                //            break;
                //        case "Gate2 : CAPEX-6":

                //            break;
                //        case "Gate2 : Phase3":

                //            break;
                //        case "Gate2 : VAC Gate3":

                //            break;
                //        case "Gate2 : PIC Gate3":

                //            break;
                //        case "Gate3 : CAPEX-1":

                //            break;
                //        case "Gate3 : CAPEX-2":

                //            break;
                //        case "Gate3 : CAPEX-3":

                //            break;
                //        case "Gate3 : Phase4-1":

                //            break;
                //        case "Gate3 : Phase4-2":

                //            break;
                //        case "Gate3 : Phase4-3":

                //            break;
                //        case "Gate3 : Phase4-4":

                //            break;
                //        case "Gate3 : Phase4-5":

                //            break;
                //        case "Gate3 : Phase4-6":

                //            break;
                //        case "Gate3 : Phase4-7":

                //            break;
                //        case "Gate3 : VAC Gate4":

                //            break;
                //        case "Gate3 : PIC Gate4":

                //            break;
                //        case "Gate4 : Execution Lookback":

                //            break;
                //    }
                //}
                //else if (initiativeTypeSubType.SubType == "environment,tpx")
                //{
                //    switch (stage)
                //    {
                //        case "Initiating-1":

                //            break;
                //        case "Initiating-2":

                //            break;
                //        case "Initiating-3":

                //            break;
                //        case "Gate0 : Phase1-1":

                //            break;
                //        case "Gate0 : Phase1-2":

                //            break;
                //        case "Gate0 : VAC Gate1":

                //            break;
                //        case "Gate0 : Sub-PIC Gate1":

                //            break;
                //        case "Gate1 : Phase2":

                //            break;
                //        case "Gate1 : VAC Gate2":

                //            break;
                //        case "Gate1 : PIC Gate2":

                //            break;
                //        case "Gate2 : CAPEX-1":

                //            break;
                //        case "Gate2 : CAPEX-2":

                //            break;
                //        case "Gate2 : CAPEX-3":

                //            break;
                //        case "Gate2 : CAPEX-4":

                //            break;
                //        case "Gate2 : CAPEX-5":

                //            break;
                //        case "Gate2 : CAPEX-6":

                //            break;
                //        case "Gate2 : Phase3":

                //            break;
                //        case "Gate2 : VAC Gate3":

                //            break;
                //        case "Gate2 : PIC Gate3":

                //            break;
                //        case "Gate3 : CAPEX-1":

                //            break;
                //        case "Gate3 : CAPEX-2":

                //            break;
                //        case "Gate3 : CAPEX-3":

                //            break;
                //        case "Gate3 : Phase4-1":

                //            break;
                //        case "Gate3 : Phase4-2":

                //            break;
                //        case "Gate3 : Phase4-3":

                //            break;
                //        case "Gate3 : Phase4-4":

                //            break;
                //        case "Gate3 : Phase4-5":

                //            break;
                //        case "Gate3 : Phase4-6":

                //            break;
                //        case "Gate3 : Phase4-7":

                //            break;
                //        case "Gate3 : VAC Gate4":

                //            break;
                //        case "Gate3 : PIC Gate4":

                //            break;
                //        case "Gate4 : Execution Lookback":

                //            break;
                //    }
                //}
                //else if (initiativeTypeSubType.SubType == "performance,tpx")
                //{
                //    switch (stage)
                //    {
                //        case "Initiating-1":

                //            break;
                //        case "Initiating-2":

                //            break;
                //        case "Initiating-3":

                //            break;
                //        case "Gate0 : Phase1-1":

                //            break;
                //        case "Gate0 : Phase1-2":

                //            break;
                //        case "Gate0 : VAC Gate1":

                //            break;
                //        case "Gate0 : Sub-PIC Gate1":

                //            break;
                //        case "Gate1 : Phase2-2":

                //            break;
                //        case "Gate1 : VAC Gate2":

                //            break;
                //        case "Gate1 : PIC Gate2":

                //            break;
                //        case "Gate2 : CAPEX-1":

                //            break;
                //        case "Gate2 : CAPEX-2":

                //            break;
                //        case "Gate2 : CAPEX-3":

                //            break;
                //        case "Gate2 : CAPEX-4":

                //            break;
                //        case "Gate2 : CAPEX-5":

                //            break;
                //        case "Gate2 : CAPEX-6":

                //            break;
                //        case "Gate2 : Phase3":

                //            break;
                //        case "Gate2 : VAC Gate3":

                //            break;
                //        case "Gate2 : PIC Gate3":

                //            break;
                //        case "Gate3 : CAPEX-1":

                //            break;
                //        case "Gate3 : CAPEX-2":

                //            break;
                //        case "Gate3 : CAPEX-3":

                //            break;
                //        case "Gate3 : Phase4-1":

                //            break;
                //        case "Gate3 : Phase4-2":

                //            break;
                //        case "Gate3 : Phase4-3":

                //            break;
                //        case "Gate3 : Phase4-4":

                //            break;
                //        case "Gate3 : Phase4-5":

                //            break;
                //        case "Gate3 : Phase4-6":

                //            break;
                //        case "Gate3 : Phase4-7":

                //            break;
                //        case "Gate3 : Phase4-8":

                //            break;
                //        case "Gate3 : VAC Gate4":

                //            break;
                //        case "Gate3 : PIC Gate4":

                //            break;
                //        case "Gate4 : Execution Lookback":

                //            break;
                //    }
                //}
                //else if (initiativeTypeSubType.SubType == "performance,notpx")
                //{
                //    switch (stage)
                //    {
                //        case "Initiating-1":

                //            break;
                //        case "Initiating-2":

                //            break;
                //        case "Gate0 : Phase1":

                //            break;
                //        case "Gate0 : VAC Gate1":

                //            break;
                //        case "Gate0 : Sub-PIC Gate1":

                //            break;
                //        case "Gate1 : Phase2":

                //            break;
                //        case "Gate1 : VAC Gate2":

                //            break;
                //        case "Gate1 : PIC Gate2":

                //            break;
                //        case "Gate2 : CAPEX-1":

                //            break;
                //        case "Gate2 : CAPEX-2":

                //            break;
                //        case "Gate2 : CAPEX-3":

                //            break;
                //        case "Gate2 : CAPEX-4":

                //            break;
                //        case "Gate2 : CAPEX-5":

                //            break;
                //        case "Gate2 : CAPEX-6":

                //            break;
                //        case "Gate2 : Phase3":

                //            break;
                //        case "Gate2 : VAC Gate3":

                //            break;
                //        case "Gate2 : PIC Gate3":

                //            break;
                //        case "Gate3 : CAPEX-1":

                //            break;
                //        case "Gate3 : CAPEX-2":

                //            break;
                //        case "Gate3 : CAPEX-3":

                //            break;
                //        case "Gate3 : Phase4-1":

                //            break;
                //        case "Gate3 : Phase4-2":

                //            break;
                //        case "Gate3 : Phase4-3":

                //            break;
                //        case "Gate3 : Phase4-4":

                //            break;
                //        case "Gate3 : Phase4-5":

                //            break;
                //        case "Gate3 : Phase4-6":

                //            break;
                //        case "Gate3 : Phase4-7":

                //            break;
                //        case "Gate3 : Phase4-8":

                //            break;
                //        case "Gate3 : VAC Gate4":

                //            break;
                //        case "Gate3 : PIC Gate4":

                //            break;
                //        case "Gate4 : Execution Lookback":

                //            break;
                //    }
                //}

                //return initiative;

                if (new string[] { "Initiative-2", "Gate0 : VAC Gate1", "Gate1 : VAC Gate2", "Gate1 : PIC Gate2", "Gate2 : VAC Gate3"
                ,"Gate2 : PIC Gate3","Gate3 : VAC Gate4","Gate3 : PIC Gate4"
                }.Contains(stage)) //admin approve
                {
                    foreach (var entity in stageApprovers)
                        await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                }
                else if (new string[] { "Gate0 : Sub-PIC Gate1" }.Contains(stage)) //Admin / Sub-PIC approve
                {
                    foreach (var entity in stageApprovers)
                        await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                }
                else if (new string[] { "Initiative-1" }.Contains(stage)) //DM
                {
                    foreach (var entity in stageApprovers)
                        await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                }
                else if (new string[] { "Initiative-3" }.Contains(stage)) //VP Plant
                {
                    foreach (var entity in stageApprovers)
                        await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                }
                else if (new string[] { "Gate2 : CAPEX-2", "Gate3 : CAPEX-2", "Gate4 : Execution Lookback-2" }.Contains(stage)) //PMO
                {
                    foreach (var entity in stageApprovers)
                        await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                }
                else if (new string[] { "Gate2 : CAPEX-3", "Gate3 : CAPEX-3" }.Contains(stage)) //Capex TEAM
                {
                    if (budgetTeamApprover != null)
                        await AddInitiativeActions(budgetTeamApprover.Email, "approve", "approver", status, stage, id);
                }
                else if (new string[] { "Gate0 : Phase1-1" }.Contains(stage)) //ProjectManager
                {
                    foreach (var entity in stageApprovers)
                        await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                }

                ////editor zone
                //if (new string[] { "Gate0 Phase1-2", "Gate1 Phase2-1", "Gate1 Phase2-2", "Gate2 CAPEX-1" }.Contains(stage)) //Project Engineer
                //{

                //    await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                //    await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                //    return initiative;
                //}


                return initiative;
            }

            if (initiativeType == "cim" && (status == "revised" || status == "draft"))
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                return initiative;
            }

            if (initiativeType == "cim" && stageForGetApprover.Contains(stage) && (status != "" && status != "draft" && status != "in progress"))
            {
                await RemoveInitiativeActions(id);
                if (stage.EndsWith("-1"))
                { // DM Approver                    
                    Owner DMApprover = await GetDMApproverFromInitiativeDetail(initiative.Id);
                    await AddInitiativeActions(DMApprover.Email, "approve", "approver", status, stage, id);
                }
                else if (stage.EndsWith("-2"))
                { // VP Approver
                    Owner VPApprover = await GetVPApproverFromInitiativeDetail(initiative.Id);
                    await AddInitiativeActions(VPApprover.Email, "approve", "approver", status, stage, id);
                }

                return initiative;
            }

            string[] stageForGetApproverFromApproved = { "Pre-DD-4", "Seeking Potential-4", "Detail F/S-4", "DD-4", "BEP-4", "Lookback-2" };
            if (initiativeType == "cim" && stageForGetApproverFromApproved.Contains(stage))
            {
                await RemoveInitiativeActions(id);
                Owner SSIM = await _context.Owners.Where(i => i.OwnerName == initiative.SSPIM).FirstOrDefaultAsync();
                if (new string[] { "", "draft" }.Contains(status))  //ให้ SSIM มา edit
                {
                    if (SSIM == null)
                    {
                        await AddInitiativeActions(ownerEmail, "draft", "owner", status, stage, id);
                    }
                    else
                    {
                        await AddInitiativeActions(SSIM.Email, "draft", "owner", status, stage, id);
                    }

                    return initiative;
                }


                if (SSIM == null)   //ให้ SSIM มา approve
                {
                    if (approver.Any())
                        foreach (var entity in approver)
                        {
                            await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                        }
                }
                else
                {
                    await AddInitiativeActions(SSIM.Email, "approve", "approver", status, stage, id);
                }


                return initiative;
            }

            if (initiativeType == "cim" && new string[] { "Pre-DD-8", "Seeking Potential-8", "Detail F/S-8" }.Contains(stage)) // cim stages  sending apprequest to SAP
            {
                await RemoveInitiativeActions(id);
                return initiative;
            }

            if (initiativeType == "cim" && new string[] { "Pre-DD-7", "Seeking Potential-7", "Detail F/S-7", "DD-7", "BEP-7" }.Contains(stage)) // cim stages  Budget Approver
            {
                await RemoveInitiativeActions(id);
                Owner budgetApprover = await BudgetTeamApprover_CIM(initiativeTypeSubType);
                if (budgetApprover == null)
                {
                    if (approver.Any())
                        foreach (var entity in approver)
                        {
                            await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                        }
                }
                else
                {
                    await AddInitiativeActions(budgetApprover.Email, "approve", "approver", status, stage, id);
                }
                return initiative;
            }

            if (initiativeType == "cim" && new string[] { "Commercial Operation-1", "Closing-1", "Lookback-2" }.Contains(stage) && (status == "" || status == "draft")) // cim stages  SSPIM take action edit
            {
                await RemoveInitiativeActions(id);
                Owner SSPIM = await _context.Owners.Where(i => i.OwnerName == initiative.SSPIM).FirstOrDefaultAsync();
                if (SSPIM == null)
                {
                    await AddInitiativeActions(ownerEmail, "draft", "owner", status, stage, id);
                }
                else
                {
                    await AddInitiativeActions(SSPIM.Email, "draft", "owner", status, stage, id);
                }

                return initiative;
            }

            if (initiativeType == "cim" && new string[] { "Commercial Operation-1", "Closing-1" }.Contains(stage) && (status == "wait for assign" || status == "wait for approval")) // cim stages  get approver from type stage approver
            {
                await RemoveInitiativeActions(id);
                if (approver.Any())
                    foreach (var entity in approver)
                    {
                        await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                    }

                return initiative;
            }

            if (initiativeType == "cim" && new string[] { "Lookback-1", "Commercial Operation-4", "Closing-4" }.Contains(stage) && status == "draft") // cim stages  lookbackowner take action edit
            {
                await RemoveInitiativeActions(id);
                Owner lookbackowner = await _context.Owners.Where(i => i.OwnerName == initiative.LookbackOwner).FirstOrDefaultAsync();
                if (lookbackowner == null)
                {
                    await AddInitiativeActions(ownerEmail, "draft", "owner", status, stage, id);
                }
                else
                {
                    await AddInitiativeActions(lookbackowner.Email, "draft", "owner", status, stage, id);
                }

                return initiative;
            }

            if (initiativeType == "cim" && new string[] { "Commercial Operation-2", "Closing-2", "Lookback-4" }.Contains(stage)) // cim stages  VP Plant Owner Approve
            {
                await RemoveInitiativeActions(id);
                Owner VPPlant = await _context.Owners.Where(i => i.OwnerName == initiative.VPPlantOwner).FirstOrDefaultAsync();
                if (VPPlant == null)
                {
                    if (approver.Any())
                        foreach (var entity in approver)
                        {
                            await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                        }
                }
                else
                {
                    await AddInitiativeActions(VPPlant.Email, "approve", "approver", status, stage, id);
                }

                return initiative;
            }

            if (initiativeType == "cim" && new string[] { "Commercial Operation-3", "Closing-3", "Lookback-3" }.Contains(stage) && (status == "wait for assign" || status == "wait for approval")) // cim stages  DM Plant Owner Approve
            {
                await RemoveInitiativeActions(id);
                Owner DMPlant = await _context.Owners.Where(i => i.OwnerName == initiative.DMPlantOwner).FirstOrDefaultAsync();
                if (DMPlant == null)
                {
                    if (approver.Any())
                        foreach (var entity in approver)
                        {
                            await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                        }
                }
                else
                {
                    await AddInitiativeActions(DMPlant.Email, "approve", "approver", status, stage, id);
                }

                return initiative;
            }

            if (initiativeType == "strategy")
            {
                if (status == "finish" || status == "rejected")
                {
                    await RemoveInitiativeActions(id);
                    return initiative;
                }

                if (status == "draft" || status == "revised")
                {
                    await RemoveInitiativeActions(id);
                    await AddInitiativeActions(ownerEmail, "draft", "owner", status, stage, id);
                    await AddInitiativeActions(initiative.CreatedBy, "draft", "owner", status, stage, id);
                    return initiative;
                }

                if (status == "wait for cancellation") // set approver for strategy
                {
                    await RemoveInitiativeActions(id);
                    Owner VPApprover = await GetVPApproverFromInitiativeDetail(initiative.Id);
                    await AddInitiativeActions(VPApprover.Email, "approve", "approver", status, stage, id);
                    return initiative;
                }

                if (stage == "First Review" || stage == "Initiative-2") // set approver for strategy
                {
                    await RemoveInitiativeActions(id);
                    Owner VPApprover = await GetVPApproverFromInitiativeDetail(initiative.Id);
                    await AddInitiativeActions(VPApprover.Email, "approve", "approver", status, stage, id);
                    return initiative;
                }

                if (stage == "Initiative-1")
                {
                    await RemoveInitiativeActions(id);
                    await AddInitiativeActions(ownerEmail, "draft", "owner", status, stage, id);
                    await AddInitiativeActions(initiative.CreatedBy, "draft", "owner", status, stage, id);
                    return initiative;
                }
            }


            if ((status == "" || status == "draft" || status == "in progress" || status == "wait for update") && CimStages.Contains(stage))
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "draft", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "draft", "owner", status, stage, id);
            }

            if (status == "draft" && stage == "draft")
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "draft", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "draft", "owner", status, stage, id);
            }

            if (status == "admin check" && stage == "waiting")
            {
                await RemoveInitiativeActions(id);
                if (approver.Any())
                    foreach (var entity in approver)
                    {
                        await AddInitiativeActions(entity.Approver, "approve", "admin", status, stage, id);
                    }
            }



            //CAPEX
            //if (status == "approved" && Capexstages.Contains(stage))
            //{
            //    await RemoveInitiativeActions(id);

            //    if (approver.Any())
            //        foreach (var entity in approver)
            //        {
            //            await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
            //        }
            //}
            //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------


            //Revised cim 
            if (status == "revised" && CimStages.Contains(stage))
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }

            //Revised Budget 
            if (status == "revised" && Capexstages.Contains(stage))
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }

            //Revised MAX
            if (status == "revised" && stage == "draft")
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }
            if (status == "revised" && stage == "IL0")
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }
            if (status == "revised" && stage == "IL1")
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }
            if (status == "revised" && stage == "IL2")
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }
            if (status == "revised" && stage == "IL3")
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }
            if (status == "revised" && stage == "IL4")
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }



            //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            if (initiativeType.Contains("max"))
            {
                await RemoveInitiativeActions(id);
                //if (status == "revised" || status == "draft")
                //{
                //    //Gate1 : Phase2-1  -- project engineer edit
                //    //Gate1 : Phase2-2  -- project engineer edit
                //    await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                //    await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
                //    return initiative;
                //}
                //admin approver
                var stageApprovers = await _context.TypeStageApprover.Where(i => i.Type == initiativeType && i.Stage == stage && i.SubType == initiativeTypeSubType.SubType).ToListAsync();
                if (initiativeTypeSubType.SubType == "gate1")
                {
                    switch (stage)
                    {
                        case "Gate0 : VAC Gate1":
                            foreach (var entity in stageApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            return initiative;
                            break;

                        case "Gate0 : Sub-PIC Gate1":
                            foreach (var entity in stageApprovers)
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);

                            return initiative;
                            break;
                            break;

                        default:
                            break;

                    }
                }
            }

            string[] stagesForMaxApprovers = { "SIL1", "SIL2", "SIL3", "SIL4", "SIL5" };
            string[] Capexstatuses = { "wait for review", "wait for create App.", "wait for create WBS", "wait for approval" };
            if (Capexstatuses.Contains(status) || status == "wait for approval" || status == "wait for assign" || status == "wait for create")
            {
                await RemoveInitiativeActions(id); // clear old approver

                if (stagesForMaxApprovers.Contains(stage))
                {// max approvers
                    string[] approverTypesUsage = { };
                    switch (initiative.Stage)
                    {
                        //TF-BT-TO
                        //TO Finance
                        //CFO
                        //CTO
                        //Sponsor
                        //WorkstreamLead
                        //TOFinanceIL5
                        //TOFinanceIL4
                        case "SIL1":
                            //TO Team , WorkstreamLead
                            approverTypesUsage = new string[] { "TOTeam", "WorkstreamLead" };
                            break;
                        case "SIL2":
                            //TF-BT-TO , WorkstreamLead , To Finance
                            approverTypesUsage = new string[] { "TF-BT-TO", "WorkstreamLead", "TO Finance" };
                            break;
                        case "SIL3":
                            //CTO, Sponsor, To Finance   ++ additionnal  waraporn.pu@pttgcgroup.com
                            approverTypesUsage = new string[] { "CTO", "Sponsor", "TO Finance", "AdditionalApprover" };
                            break;
                        case "SIL4":
                            //CTO, Sponsor, CFO   ++ additionnal  waraporn.pu@pttgcgroup.com
                            approverTypesUsage = new string[] { "CTO", "Sponsor", "TOFinanceIL4", "AdditionalApprover" };  //change CFO  to TOFINANCE IL4
                            break;
                        case "SIL5":
                            //CTO, Sponsor, CFO   ++ additionnal  waraporn.pu@pttgcgroup.com
                            approverTypesUsage = new string[] { "CTO", "Sponsor", "TOFinanceIL5", "AdditionalApprover" };  //change CFO  to TOFINANCE IL5
                            break;
                    }


                    //set new approver by Stage

                    var MaxApproversByStage = await _context.MaxApprovers.Where(i => i.InitiativeId == initiative.Id
                                                                            && approverTypesUsage.Contains(i.ApproverType)
                                                                            ).OrderBy(i => i.Order).ToListAsync();

                    if (MaxApproversByStage.Any())
                    {
                        foreach (var entity in MaxApproversByStage)
                        {
                            await AddInitiativeActions(entity.ApproverEmail, "approve", "approver", status, stage, id);
                        } // remove old approvers
                    }
                }
                else if (InitiativeTypeCapex.Contains(initiativeType))
                {
                    if (new string[] { "App. Request", "WBS Request" }.Contains(stage) == false)
                    {
                        initiativeTypeSubType.ProcessType = initiativeType;
                        var capexApprover = await GetCapexApproverByStage(initiativeTypeSubType, stage);
                        await AddInitiativeActions(capexApprover.Email, "approve", "approver", status, stage, id);
                    }
                }
                else if (initiativeType == "IT" || initiativeType == "Digital")
                {
                    initiativeTypeSubType.ProcessType = initiativeType;
                    var Approver = await GetOrgChartApproverByStage(initiativeTypeSubType, stage);

                    if (Approver == null)
                    {
                        if (approver.Any())
                            foreach (var entity in approver)
                            {
                                await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                            }
                    }
                    else
                    {
                        await AddInitiativeActions(Approver.Email, "approve", "approver", status, stage, id);
                    }

                }
                else
                {
                    if (approver.Any())
                        foreach (var entity in approver)
                        {
                            await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                        }
                }



            }
            if (status == "wait for cancellation")
            {
                var TOFinanceApprovers = await _context.MaxApprovers.Where(i => i.InitiativeId == initiative.Id
                                                                            && i.ApproverType == "TOTeam"
                                                                            ).OrderBy(i => i.Order).ToListAsync();

                if (TOFinanceApprovers.Any())
                {
                    await RemoveInitiativeActions(id);
                    foreach (var entity in TOFinanceApprovers)
                    {
                        await AddInitiativeActions(entity.ApproverEmail, "approve", "approver", status, stage, id);
                    } // remove old approvers
                }
                else
                {  // �������� TO Finance ���  ������� admin ���繤� cancel
                    var cancellator = await _context.TypeStageApprover.Where(i => i.Stage == "waiting" && i.Type == initiativeType && i.SubType == initiativeTypeSubType.SubType).ToListAsync();

                    await RemoveInitiativeActions(id);
                    if (cancellator.Any())
                        foreach (var entity in cancellator)
                        {
                            await AddInitiativeActions(entity.Approver, "approve", "approver", status, stage, id);
                        }
                }
            }
            ////wait for approval Budget
            //if (status == "wait for approval" && stage == "DM Approve")
            //{
            //    await RemoveInitiativeActions(id);
            //    await AddInitiativeActions(Approver_04, "approve", "approver", status, stage, id);

            //}

            ////wait for approval MAX
            //if (status == "wait for approval" && stage == "SIL1")
            //{
            //    await RemoveInitiativeActions(id);
            //    await AddInitiativeActions(Approver_01, "approve", "approver", status, stage, id);
            //    await AddInitiativeActions(Approver_02, "approve", "approver", status, stage, id);
            //}
            //if (status == "wait for approval" && stage == "SIL2")
            //{
            //    await RemoveInitiativeActions(id);
            //    await AddInitiativeActions(Approver_01, "approve", "approver", status, stage, id);
            //    await AddInitiativeActions(Approver_02, "approve", "approver", status, stage, id);
            //    await AddInitiativeActions(Approver_03, "approve", "approver", status, stage, id);
            //}
            //if (status == "wait for approval" && stage == "SIL3")
            //{
            //    await RemoveInitiativeActions(id);
            //    await AddInitiativeActions(Approver_01, "approve", "approver", status, stage, id);
            //    await AddInitiativeActions(Approver_02, "approve", "approver", status, stage, id);
            //    await AddInitiativeActions(Approver_03, "approve", "approver", status, stage, id);
            //}
            //if (status == "wait for approval" && stage == "SIL4")
            //{
            //    await RemoveInitiativeActions(id);
            //    await AddInitiativeActions(Approver_01, "approve", "approver", status, stage, id);
            //    await AddInitiativeActions(Approver_02, "approve", "approver", status, stage, id);
            //    await AddInitiativeActions(Approver_03, "approve", "approver", status, stage, id);
            //}
            //if (status == "wait for approval" && stage == "SIL5")
            //{
            //    await RemoveInitiativeActions(id);
            //    await AddInitiativeActions(Approver_01, "approve", "approver", status, stage, id);
            //    await AddInitiativeActions(Approver_02, "approve", "approver", status, stage, id);
            //    await AddInitiativeActions(Approver_03, "approve", "approver", status, stage, id);
            //}

            //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            //Approved
            if ((status == "wait for submission" || status == "approved") && stage == "IL0")
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "draft", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "draft", "owner", status, stage, id);
            }
            if (status == "approved" && stage == "IL1")
            {

                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }
            if (status == "approved" && stage == "IL2")
            {

                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }
            if (status == "approved" && (stage == "IL3" || stage == "IL3-1" || stage == "IL3-2"))
            {

                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }
            if (status == "approved" && stage == "IL4")
            {

                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }
            if (status == "approved" && stage == "IL5")
            {

                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }

            //Reject
            if (status == "reject" && stage == "cancelled")
            {
                await RemoveInitiativeActions(id);
            }

            //cancelled
            if (status == "cancelled" && stage == "cancelled")
            {

                await RemoveInitiativeActions(id);
            }

            //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            //Revised Budget
            if (status == "draft" && Capexstages.Contains(stage))
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }

            //Backward
            if (status == "draft" && stage == "IL0")
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }
            if (status == "draft" && stage == "IL1")
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }
            if (status == "draft" && stage == "IL2")
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }
            if (status == "draft" && stage == "IL3")
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }

            if (status == "draft" && stage == "IL4")
            {
                await RemoveInitiativeActions(id);
                await AddInitiativeActions(ownerEmail, "add detail", "owner", status, stage, id);
                await AddInitiativeActions(initiative.CreatedBy, "add detail", "owner", status, stage, id);
            }

            if (status == "finish")
            {
                await RemoveInitiativeActions(id);
            }

            return initiative;
        }

        public async Task<string> GetEmailOwnerByInitiativeID(int initiativeId)
        {
            var initiativeOwner = await _context.Initiatives.Where(i => i.Id == initiativeId).FirstOrDefaultAsync();
            var owner = await _context.Owners.Where(i => i.OwnerName == initiativeOwner.OwnerName).FirstOrDefaultAsync();
            return owner.Email;
        }

        public async Task<int> RemoveInitiativeActions(int initiativeId, string actionBy)
        {
            var InitiativeActionDelete = await _context.InitiativeActions.Where(i => i.InitiativeId == initiativeId && i.ActionBy.Trim().ToLower() == actionBy.Trim().ToLower()).ToListAsync();
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(InitiativeActionDelete, "Initiative-3322", SQLCommandType.DELETE);
            // End log

            foreach (var entity in InitiativeActionDelete)
                _context.InitiativeActions.Remove(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> CountInitiativeAction(int initiativeId)
        {
            var InitiativeActionList = await _context.InitiativeActions.Where(i => i.InitiativeId == initiativeId && i.Position != "admin handover").ToListAsync();
            return InitiativeActionList.Count;
        }

        public async Task<int> RemoveInitiativeActions(int initiativeId)
        {
            var InitiativeActionDelete = await _context.InitiativeActions.Where(i => i.InitiativeId == initiativeId && i.Position != "admin handover").ToListAsync();

            if (InitiativeActionDelete.Any())
            {

                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(InitiativeActionDelete, "Initiative-3344", SQLCommandType.DELETE);
                // End log
                foreach (var entity in InitiativeActionDelete)
                    _context.InitiativeActions.Remove(entity);
                return await _context.SaveChangesAsync();
            }
            else
            {
                return 0;
            }
        }


        public async Task<int> AddInitiativeActions(string actionBy, string action, string position, string status, string stage, int initiativeId)
        {
            var owner = await _context.Owners.Where(o => o.Email == actionBy).FirstOrDefaultAsync();

            var checkDupNoInsert = await _context.InitiativeActions.Where(i => i.ActionBy == actionBy
                                                                             && i.Action == action
                                                                             && i.Position == position
                                                                             && i.Status == status
                                                                             && i.Stage == stage
                                                                             && i.InitiativeId == initiativeId).ToListAsync();

            if (checkDupNoInsert.Count >= 1) // if duplicate then insert nothing
                return 0;

            var InitiativeAction = new InitiativeAction()
            {
                ActionBy = actionBy,
                ActionByName = owner.OwnerName,
                Action = action,
                Position = position,
                Status = status,
                Stage = stage,
                InitiativeId = initiativeId
            };
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(InitiativeAction, "Initiative-3382", SQLCommandType.INSERT);
            // End log
            await _context.InitiativeActions.AddAsync(InitiativeAction);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> AddInitiativeActionsNewSystem(string actionBy, string action, string position, string status, string stage, int initiativeId, int InitiativeStageDetailId, int counter, ApprovalNewSystemParam approvalNewSystemParam)
        {
            var owner = await _context.Owners.Where(o => o.Email == actionBy).FirstOrDefaultAsync();

            //var checkDupNoInsert = await _context.InitiativeActions.Where(i => i.ActionBy == actionBy
            //                                                                 && i.Action == action
            //                                                                 && i.Position == position
            //                                                                 && i.Status == status
            //                                                                 && i.Stage == stage
            //                                                                 && i.InitiativeId == initiativeId).ToListAsync();

            //if (checkDupNoInsert.Count >= 1) // if duplicate then insert nothing
            //    return 0;

            var InitiativeAction = new InitiativeAction()
            {
                ActionBy = actionBy,
                ActionByName = owner.OwnerName,
                Action = action,
                Position = position,
                Status = status,
                Stage = stage,
                InitiativeId = initiativeId,
                FlowType = approvalNewSystemParam.FlowType,
                Indicator = position,
                InitiativeStageDetailId = InitiativeStageDetailId,
                Counter = counter,
                SwitchToProcess = approvalNewSystemParam.SwitchToProcess
            };

            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(InitiativeAction, "Initiative-3419", SQLCommandType.INSERT);
            // End log

            await _context.InitiativeActions.AddAsync(InitiativeAction);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> LastHistoryId(int id)
        {
            if (_context.InitiativeStatusTrackings.Where(i => i.InitiativeId == id).Any())
            {
                var initiativeStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == id).OrderByDescending(p => p.HistoryId).FirstOrDefaultAsync();
                return initiativeStatusTracking.HistoryId + 1;
            }

            return 0;

        }

        public async Task<int> CreateStagesTracking(Initiative initiative, InitiativeTypeSubType initiativeTypeSubType)
        {
            //string[] InitiativeTypeCapex = { "directCapex", "Digital Survey", "Request Pool" };
            //var initiativeType = initiative.InitiativeType == null ? "max" : initiative.InitiativeType;  //if null force to MAX
            var _stages = await _context.TypeStage.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).OrderBy(i => i.Order).ToListAsync();
            var _statusTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.SubType == initiativeTypeSubType.SubType).ToListAsync();
            var queryMaxSeqStatusTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id).OrderByDescending(i => i.RunningSequence).FirstOrDefaultAsync();
            var maxSeqStatusTrackings = queryMaxSeqStatusTrackings == null ? 0 : queryMaxSeqStatusTrackings.RunningSequence;
            maxSeqStatusTrackings++;
            //delete all first
            if (_statusTrackings.Any())
            {
                foreach (var entity in _statusTrackings)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(entity, "Initiative-3453", SQLCommandType.DELETE);
                    // End log

                    _context.InitiativeStatusTrackings.Remove(entity);
                }
            }

            // insert stages if exist
            if (_stages.Any())
            {
                var _lastHistoryId = await LastHistoryId(initiative.Id);
                int iCounter = 1;
                var firstStageOfMax = await _context.TypeStage.Where(i => i.Type.Contains("max") && i.Order == 1 && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
                foreach (var entity in _stages) //loop stages
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(entity, "Initiative-3469", SQLCommandType.INSERT);
                    // End log
                    var _approver = await _context.TypeStageApprover.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.Stage == entity.Stage && i.SubType == initiativeTypeSubType.SubType).ToListAsync();
                    if (_approver != null && _approver.Count != 0)
                    {
                        foreach (var entityApprover in _approver) //loop insert approver
                        {
                            // Temporary Log for Invetigate 2021-07-21
                            LogInsight.Log(entityApprover, "Initiative-3477", SQLCommandType.INSERT);
                            // End log
                            var approverName = await _context.Owners.Where(i => i.Email == entityApprover.Approver).FirstOrDefaultAsync();
                            if (initiativeTypeSubType.ProcessType.Contains("max") || initiativeTypeSubType.ProcessType == "max")
                            {
                                _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                                {
                                    Sequence = iCounter,
                                    HistoryId = _lastHistoryId,
                                    InitiativeId = initiative.Id,
                                    Stage = entity.Stage,
                                    Status = "Not Start",
                                    ProcessType = initiativeTypeSubType.ProcessType,
                                    ApprovedBy = null, // case max  approvers change dynamically
                                    SubType = initiativeTypeSubType.SubType,
                                    RunningSequence = maxSeqStatusTrackings,
                                });
                            }
                            else if (InitiativeTypeCapex.Contains(initiative.InitiativeType))
                            {
                                var capexApprover = await GetCapexApproverByStage(initiativeTypeSubType, entity.Stage);

                                _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                                {
                                    Sequence = iCounter,
                                    HistoryId = _lastHistoryId,
                                    InitiativeId = initiative.Id,
                                    Stage = entity.Stage,
                                    Status = "Not Start",
                                    ProcessType = initiativeTypeSubType.ProcessType,
                                    ApprovedBy = (capexApprover == null ? null : capexApprover.OwnerName),
                                    SubType = initiativeTypeSubType.SubType,
                                    RunningSequence = maxSeqStatusTrackings,
                                });
                            }
                            else if (initiative.InitiativeType == "IT" || initiative.InitiativeType == "Digital")
                            {
                                var Approver = await GetOrgChartApproverByStage(initiativeTypeSubType, entity.Stage);

                                _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                                {
                                    Sequence = iCounter,
                                    HistoryId = _lastHistoryId,
                                    InitiativeId = initiative.Id,
                                    Stage = entity.Stage,
                                    Status = "Not Start",
                                    ProcessType = initiativeTypeSubType.ProcessType,
                                    ApprovedBy = (Approver == null ? (approverName != null ? approverName.OwnerName : entityApprover.Approver) : Approver.OwnerName),
                                    SubType = initiativeTypeSubType.SubType,
                                    RunningSequence = maxSeqStatusTrackings,
                                });
                            }
                            else if (initiative.InitiativeType == "strategy")
                            {
                                var VPApprover = await GetVPApproverFromInitiativeDetail(initiative.Id);
                                _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                                {
                                    Sequence = iCounter,
                                    HistoryId = _lastHistoryId,
                                    InitiativeId = initiative.Id,
                                    Stage = entity.Stage,
                                    Status = "Not Start",
                                    ProcessType = initiativeTypeSubType.ProcessType,
                                    ApprovedBy = (VPApprover == null ? null : VPApprover.OwnerName),
                                    SubType = initiativeTypeSubType.SubType,
                                    RunningSequence = maxSeqStatusTrackings,
                                });
                            }
                            else if (initiative.InitiativeType == "cim")
                            {
                                _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                                {
                                    Sequence = iCounter,
                                    HistoryId = _lastHistoryId,
                                    InitiativeId = initiative.Id,
                                    Stage = entity.Stage,
                                    Status = "Not Start",
                                    ProcessType = initiativeTypeSubType.ProcessType,
                                    ApprovedBy = null,
                                    SubType = initiativeTypeSubType.SubType,
                                    RunningSequence = maxSeqStatusTrackings,
                                });
                            }
                            else if (initiative.InitiativeType == "pim")
                            {
                                _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                                {
                                    Sequence = iCounter,
                                    HistoryId = _lastHistoryId,
                                    InitiativeId = initiative.Id,
                                    Stage = entity.Stage,
                                    Status = "Not Start",
                                    ProcessType = initiativeTypeSubType.ProcessType,
                                    ApprovedBy = null,
                                    SubType = initiativeTypeSubType.SubType,
                                    RunningSequence = maxSeqStatusTrackings,
                                });
                            }
                            else if (initiative.InitiativeType == "dim")
                            {
                                _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                                {
                                    Sequence = iCounter,
                                    HistoryId = _lastHistoryId,
                                    InitiativeId = initiative.Id,
                                    Stage = entity.Stage,
                                    Status = "Not Start",
                                    ProcessType = initiativeTypeSubType.ProcessType,
                                    ApprovedBy = null,
                                    SubType = initiativeTypeSubType.SubType,
                                    RunningSequence = maxSeqStatusTrackings,
                                });
                            }
                            else if (initiative.InitiativeType == "cpi")
                            {
                                _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                                {
                                    Sequence = iCounter,
                                    HistoryId = _lastHistoryId,
                                    InitiativeId = initiative.Id,
                                    Stage = entity.Stage,
                                    Status = "Not Start",
                                    ProcessType = initiativeTypeSubType.ProcessType,
                                    ApprovedBy = null,
                                    SubType = initiativeTypeSubType.SubType,
                                    RunningSequence = maxSeqStatusTrackings,
                                });
                            }
                            else
                            {
                                _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                                {
                                    Sequence = iCounter,
                                    HistoryId = _lastHistoryId,
                                    InitiativeId = initiative.Id,
                                    Stage = entity.Stage,
                                    Status = "Not Start",
                                    ProcessType = initiativeTypeSubType.ProcessType,
                                    ApprovedBy = (approverName != null ? approverName.OwnerName : entityApprover.Approver),
                                    SubType = initiativeTypeSubType.SubType,
                                    RunningSequence = maxSeqStatusTrackings,
                                });
                            }

                            iCounter++;
                            maxSeqStatusTrackings++;
                        }
                    }
                    else
                    {
                        _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                        {
                            Sequence = iCounter,
                            HistoryId = _lastHistoryId,
                            InitiativeId = initiative.Id,
                            Stage = entity.Stage,
                            Status = "Not Start",
                            ProcessType = initiativeTypeSubType.ProcessType,
                            SubType = initiativeTypeSubType.SubType,
                            RunningSequence = maxSeqStatusTrackings,
                            ApprovedDate = (firstStageOfMax != null ? (firstStageOfMax.Stage == entity.Stage ? DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss", new System.Globalization.CultureInfo("en-US")) : null) : null)
                        });

                        iCounter++;
                        maxSeqStatusTrackings++;
                    }

                }

                return await _context.SaveChangesAsync();
            }
            else
            {
                return 0;
            }
        }

        public async Task<int> UpdateStagesTracking_OnApprove(Initiative initiative, InitiativeSubmit initiativeSubmit, string subType)
        {
            try
            {
                if (initiativeSubmit.Status.Contains("cancellation")) return 0;

                string approveDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss", new System.Globalization.CultureInfo("en-US"));

                string[] initiativeTypeDIM = { "IT", "Digital" };

                var _lastHistoryId = await LastHistoryId(initiative.Id);
                //var initiativeType = initiative.InitiativeType == null ? "max" : initiative.InitiativeType;  //if null force to MAX
                var initiativeType = await GetProcessType(initiative.Id);  //if null force to MAX
                bool isTypeMaxAndRequestCapex = initiative.InitiativeType.Contains("max") && initiative.IsRequestCapex == true;
                var initiativeStage = initiative.Stage;
                if (isTypeMaxAndRequestCapex == true)
                {
                    initiativeType = "pimcapex";
                    initiativeStage = initiative.Stage;
                }

                var _nowStage = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Stage == initiativeStage && i.SubType == subType).FirstOrDefaultAsync();
                var _nowStageRevised = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Stage == initiativeSubmit.Stage && i.SubType == subType).FirstOrDefaultAsync();
                var _beginStageOfIT_Digital = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Order == 1 && i.SubType == subType).FirstOrDefaultAsync();


                var firstStageOfMax = await _context.TypeStage.Where(i => i.Type.Contains("max") && i.Order == 1 && i.SubType == subType).FirstOrDefaultAsync();
                if (firstStageOfMax != null)
                    if (initiativeSubmit.Stage == firstStageOfMax.Stage && (initiativeSubmit.Status == "wait for submission" || initiativeSubmit.Status == "approved") && initiativeType.Contains("max"))
                    {


                        var idToSetApprovedTime = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == firstStageOfMax.Stage && i.ProcessType == initiative.InitiativeType && i.SubType == subType).FirstOrDefaultAsync();

                        // Temporary Log foUPDATEr Invetigate 2021-07-21
                        LogInsight.Log(idToSetApprovedTime, "Initiative-3389", SQLCommandType.UPDATE, false);
                        // End log
                        if (idToSetApprovedTime != null)
                        {
                            idToSetApprovedTime.ApprovedDate = approveDate;
                        }

                        // Temporary Log for Invetigate 2021-07-21
                        LogInsight.Log(idToSetApprovedTime, "Initiative-3397", SQLCommandType.UPDATE, true);
                        // End log

                        return await _context.SaveChangesAsync();
                    }



                if (initiativeTypeDIM.Contains(initiativeType))
                {
                    _nowStageRevised = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Stage == _beginStageOfIT_Digital.Stage && i.SubType == subType).FirstOrDefaultAsync();
                }



                if (_nowStageRevised == null && initiativeSubmit.Status == "revised")
                    return 0;

                if (_nowStage == null)
                    return 0;

                var _stageToClear = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Order > _nowStage.Order && i.SubType == subType).ToListAsync();

                if (initiativeSubmit.Status == "revised")
                { //clear now stage
                    _nowStage = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Stage == initiativeSubmit.Stage && i.SubType == subType).FirstOrDefaultAsync();
                    _stageToClear = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Order >= _nowStage.Order && i.SubType == subType).ToListAsync();
                }


                var _allStatusTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();
                var _statusTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == initiativeStage && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();

                if (_stageToClear.Any()) //remove all forward stage
                {
                    if (_allStatusTrackings.Any())
                        foreach (var entity in _stageToClear)
                        {
                            var lst_ClearStatus = _allStatusTrackings.Where(i => i.Stage == entity.Stage && i.SubType == subType).ToList();

                            foreach (var entityClear in lst_ClearStatus)
                            {
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entityClear, "Initiative-3740", SQLCommandType.UPDATE, false);
                                // End log

                                entityClear.Status = "Not Start";
                                entityClear.ApprovedDate = null;
                                //entityClear.HistoryId = _lastHistoryId;

                                // Temporary Log for Invetigate 2021-07-21
                                LogInsight.Log(entityClear, "Initiative-3748", SQLCommandType.UPDATE, true);
                                // End log

                            }
                        }
                }


                if (initiativeSubmit.Status != "revised")
                { //update status tracking if not revise
                    var approverNames = await _context.Owners.Where(i => i.Email == initiativeSubmit.Username).ToListAsync();

                    foreach (var approverName in approverNames)
                    {
                        var _updateApproverQureyable = _context.InitiativeStatusTrackings.AsQueryable();

                        // Temporary Log foUPDATEr Invetigate 2021-07-21
                        LogInsight.Log(_updateApproverQureyable, "Initiative-3765", SQLCommandType.UPDATE, false);
                        // End log

                        _updateApproverQureyable = _updateApproverQureyable.Where(i => i.InitiativeId == initiative.Id
                        && i.Stage == initiativeStage
                        && i.ProcessType == initiativeType
                        && i.ApprovedBy == (approverName == null ? initiativeSubmit.Username : approverName.OwnerName)
                        && i.SubType == subType
                        ).OrderBy(i => i.Sequence);

                        if (isTypeMaxAndRequestCapex == true)
                        {
                            _updateApproverQureyable = _updateApproverQureyable.OrderByDescending(i => i.Sequence);
                        }

                        // Temporary Log for Invetigate 2021-07-21
                        LogInsight.Log(_updateApproverQureyable, "Initiative-3781", SQLCommandType.UPDATE, true);
                        // End log

                        var _updateApprover = await _updateApproverQureyable.FirstOrDefaultAsync();

                        // Temporary Log foUPDATEr Invetigate 2021-07-21
                        LogInsight.Log(_updateApprover, "Initiative-3787", SQLCommandType.UPDATE, false);
                        // End log

                        if (_updateApprover == null) continue;  // if not found then skip loop

                        if (initiativeSubmit.Status == "reject")
                        {
                            _updateApprover.Status = "Rejected";
                        }
                        else
                        {
                            _updateApprover.Status = "Complete";
                        }

                        _updateApprover.ApprovedDate = approveDate;

                        // Temporary Log foUPDATEr Invetigate 2021-07-21
                        LogInsight.Log(_updateApprover, "Initiative-3787", SQLCommandType.UPDATE, true);
                        // End log

                        break; // approve only 1 person
                    }

                    await _context.SaveChangesAsync();
                    //_updateApprover.HistoryId = _lastHistoryId;
                }

                int dimNextAddNextStage = 0;
                // only dim!!
                if (initiative.Stage == "Ideate-2" || initiative.Stage == "Ideate SIL1-2") // check now stage need to skip SVP ? 
                    if (await GetCostEstCapexAndCostEstOpex(initiative.Id) < 10) // if cost < 10 million then skip stage SVP 
                        dimNextAddNextStage = 1;
                //------

                var _stageNext = new TypeStage();
                if (initiativeSubmit.GoToStage != null && !string.IsNullOrEmpty(initiativeSubmit.GoToStage))
                {
                    _nowStage = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Stage == initiativeSubmit.GoToStage && i.SubType == subType).FirstOrDefaultAsync();
                    _stageNext = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Order == _nowStage.Order + dimNextAddNextStage && i.SubType == subType).FirstOrDefaultAsync(); // next stage is in go to stage
                }
                else
                {
                    _stageNext = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Order == _nowStage.Order + 1 + dimNextAddNextStage && i.SubType == subType).FirstOrDefaultAsync();
                }


                //update next Stage Forward In Progress  -- clear all status forward
                var _stageNextForward = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Order == _nowStage.Order + 2 + dimNextAddNextStage && i.SubType == subType).FirstOrDefaultAsync();
                var _updateNextForwardStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && i.Stage == (_stageNext == null ? null : _stageNext.Stage) && i.SubType == subType).ToListAsync();
                foreach (var entity in _updateNextForwardStatusTracking)
                {
                    // Temporary Log foUPDATEr Invetigate 2021-07-21
                    LogInsight.Log(entity, "Initiative-3839", SQLCommandType.UPDATE, false);
                    // End log
                    entity.Status = "Not Start";
                    entity.ApprovedDate = null;
                    // Temporary Log foUPDATEr Invetigate 2021-07-21
                    LogInsight.Log(entity, "Initiative-3844", SQLCommandType.UPDATE, true);
                    // End log
                }

                var _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && i.Stage == "" && i.SubType == subType).ToListAsync(); //mock variable to use in switch
                switch (initiativeSubmit.Status)
                {
                    case "approved":
                        if (await CountInitiativeAction(initiative.Id) <= 1)  //update next Stage In Progress
                        {
                            _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && i.Stage == _stageNext.Stage && i.SubType == subType).ToListAsync();
                            foreach (var entity in _updateNextStatusTracking)
                            {
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-3858", SQLCommandType.UPDATE, false);
                                // End log
                                entity.Status = "In Progress";
                                entity.ApprovedDate = approveDate;
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-3863", SQLCommandType.UPDATE, true);
                                // End log
                            }
                        }
                        break;

                    case "wait for approval":
                        if (await CountInitiativeAction(initiative.Id) <= 1) //update next Stage In Progress
                        {
                            _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && i.Stage == _stageNext.Stage && i.SubType == subType).ToListAsync();
                            foreach (var entity in _updateNextStatusTracking)
                            {
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-3875", SQLCommandType.UPDATE, false);
                                // End log
                                entity.Status = "In Progress";
                                entity.ApprovedDate = null;
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-3881", SQLCommandType.UPDATE, true);
                                // End log
                            }
                        }
                        break;

                    case "wait for create App.":
                        if (await CountInitiativeAction(initiative.Id) <= 1)  //update next Stage In Progress
                        {
                            _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && i.Stage == _stageNext.Stage && i.SubType == subType).ToListAsync();
                            foreach (var entity in _updateNextStatusTracking)
                            {
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-3894", SQLCommandType.UPDATE, false);
                                // End log
                                entity.Status = "In Progress";
                                entity.ApprovedDate = null;
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-3898", SQLCommandType.UPDATE, true);
                                // End log
                            }
                        }
                        break;

                    case "wait for assign":
                        if (await CountInitiativeAction(initiative.Id) <= 1)  //update next Stage In Progress
                        {
                            _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && i.Stage == _stageNext.Stage && i.SubType == subType).ToListAsync();
                            foreach (var entity in _updateNextStatusTracking)
                            {
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-3911", SQLCommandType.UPDATE, false);
                                // End log
                                entity.Status = "In Progress";
                                entity.ApprovedDate = null;
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-3917", SQLCommandType.UPDATE, true);
                                // End log
                            }
                        }
                        break;

                    case "wait for create WBS":
                        if (await CountInitiativeAction(initiative.Id) <= 1)  //update next Stage In Progress
                        {
                            _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && i.Stage == _stageNext.Stage && i.SubType == subType).ToListAsync();
                            foreach (var entity in _updateNextStatusTracking)
                            {
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-3930", SQLCommandType.UPDATE, false);
                                // End log
                                entity.Status = "In Progress";
                                entity.ApprovedDate = null;
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-3935", SQLCommandType.UPDATE, true);
                                // End log
                            }
                        }
                        break;

                    case "wait for review":
                        if (await CountInitiativeAction(initiative.Id) <= 1)  //update next Stage In Progress
                        {
                            _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && i.Stage == _stageNext.Stage && i.SubType == subType).ToListAsync();
                            foreach (var entity in _updateNextStatusTracking)
                            {
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-3948", SQLCommandType.UPDATE, false);
                                // End log
                                entity.Status = "In Progress";
                                entity.ApprovedDate = null;
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-3953", SQLCommandType.UPDATE, true);
                                // End log
                            }
                        }
                        break;

                    case "finish":
                        if (await CountInitiativeAction(initiative.Id) <= 1)  //update next Stage In Progress
                        {
                            _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && (i.Stage == _nowStage.Stage || i.Stage == (_stageNext == null ? _nowStage.Stage : _stageNext.Stage)) && i.SubType == subType).ToListAsync();
                            foreach (var entity in _updateNextStatusTracking)
                            {
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-3966", SQLCommandType.UPDATE, false);
                                // End log
                                entity.Status = "Complete";
                                entity.ApprovedDate = approveDate;
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-3971", SQLCommandType.UPDATE, true);
                                // End log
                            }
                        }
                        break;

                    case "reject":
                        //set everything in progress to not start
                        _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && i.Status == "In Progress" && i.ApprovedDate == null && i.SubType == subType).ToListAsync();
                        foreach (var entity in _updateNextStatusTracking)
                        {
                            // Temporary Log foUPDATEr Invetigate 2021-07-21
                            LogInsight.Log(entity, "Initiative-3983", SQLCommandType.UPDATE, false);
                            // End log
                            entity.Status = "Not Start";
                            entity.ApprovedDate = null;
                            // Temporary Log foUPDATEr Invetigate 2021-07-21
                            LogInsight.Log(entity, "Initiative-3988", SQLCommandType.UPDATE, true);
                            // End log
                        }
                        break;

                    case "revised":  //means cancelled
                                     //revert stage back  //like backward    //waiting fix 

                        ////clear stage from stage order -1
                        if (initiativeTypeDIM.Contains(initiativeType))
                        {  // Dim Revise Clear All Stage!
                            _updateNextForwardStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();
                        }

                        foreach (var entity in _updateNextForwardStatusTracking)
                        {
                            // Temporary Log foUPDATEr Invetigate 2021-07-21
                            LogInsight.Log(entity, "Initiative-4005", SQLCommandType.UPDATE, false);
                            // End log
                            entity.Status = "Not Start";
                            entity.ApprovedDate = null;
                            // Temporary Log foUPDATEr Invetigate 2021-07-21
                            LogInsight.Log(entity, "Initiative-4010", SQLCommandType.UPDATE, true);
                            // End log
                        }

                        var updateNowStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == _nowStageRevised.Stage && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();
                        foreach (var entity in updateNowStatusTracking)
                        {
                            // Temporary Log foUPDATEr Invetigate 2021-07-21
                            LogInsight.Log(entity, "Initiative-4018", SQLCommandType.UPDATE, false);
                            // End log
                            entity.Status = "In Progress";

                            if (firstStageOfMax != null)
                                if (entity.Stage != firstStageOfMax.Stage)  //stage IL0  not clear approved Date when revise or backward
                                    entity.ApprovedDate = null;
                            // Temporary Log foUPDATEr Invetigate 2021-07-21
                            LogInsight.Log(entity, "Initiative-4026", SQLCommandType.UPDATE, true);
                            // End log
                        }
                        break;
                    case "approve":
                        break;
                    default:
                        if (initiativeType == "directCapex" && await CountInitiativeAction(initiative.Id) <= 1 && _stageNext != null)  //update next Stage In Progress  for capex
                        {
                            _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == _stageNext.Stage && i.SubType == subType).ToListAsync();
                            foreach (var entity in _updateNextStatusTracking)
                            {
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-4039", SQLCommandType.UPDATE, false);
                                // End log
                                entity.Status = "In Progress";
                                entity.ApprovedDate = null;
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-4044", SQLCommandType.UPDATE, true);
                                // End log
                            }
                        }
                        else if (_stageNext != null)
                        {
                            _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == _stageNext.Stage && i.SubType == subType).ToListAsync();
                            foreach (var entity in _updateNextStatusTracking)
                            {
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-4054", SQLCommandType.UPDATE, false);
                                // End log
                                entity.Status = "In Progress";
                                entity.ApprovedDate = null;
                                // Temporary Log foUPDATEr Invetigate 2021-07-21
                                LogInsight.Log(entity, "Initiative-4059", SQLCommandType.UPDATE, true);
                                // End log
                            }
                        }
                        break;
                }
            }
            catch
            {

            }



            return await _context.SaveChangesAsync();
        }

        //public async Task<int> UpdateStagesTracking_OnApprove(Initiative initiative, InitiativeSubmit initiativeSubmit, string subType)
        //{
        //    if (initiativeSubmit.Status.Contains("cancellation")) return 0;

        //    string approveDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss", new System.Globalization.CultureInfo("en-US"));

        //    var _lastHistoryId = await LastHistoryId(initiative.Id);
        //    string initiativeType = await GetProcessType(initiative.Id);
        //    var _nowStage = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Stage == initiative.Stage && i.SubType == subType).FirstOrDefaultAsync();
        //    var _nowStageRevised = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Stage == initiativeSubmit.Stage && i.SubType == subType).FirstOrDefaultAsync();



        //    if (_nowStageRevised == null && initiativeSubmit.Status == "revised")
        //        return 0;

        //    if (_nowStage == null)
        //        return 0;

        //    var _stageToClear = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Order > _nowStage.Order && i.SubType == subType).ToListAsync();

        //    if (initiativeSubmit.Status == "revised")
        //    { //clear now stage
        //        _stageToClear = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Order >= _nowStage.Order && i.SubType == subType).ToListAsync();
        //    }


        //    var _allStatusTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();
        //    var _statusTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == initiative.Stage && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();

        //    if (_stageToClear.Any()) //remove all forward stage
        //    {
        //        if (_allStatusTrackings.Any())
        //            foreach (var entity in _stageToClear)
        //            {
        //                var lst_ClearStatus = _allStatusTrackings.Where(i => i.Stage == entity.Stage).ToList();
        //                foreach (var entityClear in lst_ClearStatus)
        //                {
        //                    entityClear.Status = "Not Start";
        //                    entityClear.ApprovedDate = null;
        //                    //entityClear.HistoryId = _lastHistoryId;
        //                }
        //            }
        //    }


        //    if (initiativeSubmit.Status != "revised")
        //    { //update status tracking if not revise
        //        var approverName = await _context.Owners.Where(i => i.Email == initiativeSubmit.Username).FirstOrDefaultAsync();
        //        var _updateApprover = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id
        //        && i.Stage == initiative.Stage
        //        && i.ProcessType == initiativeType
        //        && i.SubType == subType
        //        && i.ApprovedBy == (approverName == null ? initiativeSubmit.Username : approverName.OwnerName)
        //        ).OrderBy(i => i.Sequence).FirstOrDefaultAsync();


        //        if (initiativeSubmit.Status == "reject")
        //        {
        //            _updateApprover.Status = "Rejected";
        //        }
        //        else
        //        {
        //            _updateApprover.Status = "Complete";
        //        }

        //        _updateApprover.ApprovedDate = approveDate;
        //        await _context.SaveChangesAsync();
        //        //_updateApprover.HistoryId = _lastHistoryId;
        //    }

        //    var _stageNext = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Order == _nowStage.Order + 1 && i.SubType == subType).FirstOrDefaultAsync();

        //    //update next Stage Forward In Progress  -- clear all status forward
        //    var _stageNextForward = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Order == _nowStage.Order + 2 && i.SubType == subType).FirstOrDefaultAsync();
        //    var _updateNextForwardStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == (_stageNext == null ? null : _stageNext.Stage) && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();
        //    foreach (var entity in _updateNextForwardStatusTracking)
        //    {
        //        entity.Status = "Not Start";
        //        entity.ApprovedDate = null;
        //    }

        //    var _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == "" && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync(); //mock variable to use in switch
        //    switch (initiativeSubmit.Status)
        //    {
        //        case "approved":
        //            if (await CountInitiativeAction(initiative.Id) <= 1)  //update next Stage In Progress
        //            {
        //                _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == _stageNext.Stage && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();
        //                foreach (var entity in _updateNextStatusTracking)
        //                {
        //                    entity.Status = "In Progress";
        //                    entity.ApprovedDate = approveDate;
        //                }
        //            }
        //            break;

        //        case "wait for approval":
        //            if (await CountInitiativeAction(initiative.Id) <= 1) //update next Stage In Progress
        //            {
        //                _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == _stageNext.Stage && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();
        //                foreach (var entity in _updateNextStatusTracking)
        //                {
        //                    entity.Status = "In Progress";
        //                    entity.ApprovedDate = null;
        //                }
        //            }
        //            break;

        //        case "wait for create App.":
        //            if (await CountInitiativeAction(initiative.Id) <= 1)  //update next Stage In Progress
        //            {
        //                _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == _stageNext.Stage && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();
        //                foreach (var entity in _updateNextStatusTracking)
        //                {
        //                    entity.Status = "In Progress";
        //                    entity.ApprovedDate = null;
        //                }
        //            }
        //            break;

        //        case "wait for create WBS":
        //            if (await CountInitiativeAction(initiative.Id) <= 1)  //update next Stage In Progress
        //            {
        //                _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == _stageNext.Stage && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();
        //                foreach (var entity in _updateNextStatusTracking)
        //                {
        //                    entity.Status = "In Progress";
        //                    entity.ApprovedDate = null;
        //                }
        //            }
        //            break;

        //        case "wait for review":
        //            if (await CountInitiativeAction(initiative.Id) <= 1)  //update next Stage In Progress
        //            {
        //                _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == _stageNext.Stage && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();
        //                foreach (var entity in _updateNextStatusTracking)
        //                {
        //                    entity.Status = "In Progress";
        //                    entity.ApprovedDate = null;
        //                }
        //            }
        //            break;

        //        case "reject":
        //            //set everything in progress to not start
        //            _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Status == "In Progress" && i.ApprovedDate == null && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();
        //            foreach (var entity in _updateNextStatusTracking)
        //            {
        //                entity.Status = "Not Start";
        //                entity.ApprovedDate = null;
        //            }
        //            break;

        //        case "revised":  //means cancelled
        //                         //revert stage back  //like backward    //waiting fix 
        //            foreach (var entity in _updateNextForwardStatusTracking)
        //            {
        //                entity.Status = "Not Start";
        //                entity.ApprovedDate = null;
        //            }

        //            var updateNowStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == _nowStageRevised.Stage && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();
        //            foreach (var entity in updateNowStatusTracking)
        //            {
        //                entity.Status = "In Progress";
        //                entity.ApprovedDate = null;
        //            }
        //            break;
        //        default:
        //            if (await CountInitiativeAction(initiative.Id) <= 1 && _stageNext != null)  //update next Stage In Progress  for capex
        //            {
        //                _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == _stageNext.Stage && i.ProcessType == initiativeType && i.SubType == subType).ToListAsync();
        //                foreach (var entity in _updateNextStatusTracking)
        //                {
        //                    entity.Status = "In Progress";
        //                    entity.ApprovedDate = null;
        //                }
        //            }
        //            break;
        //    }


        //    return await _context.SaveChangesAsync();
        //}

        //public async Task<int> UpdateStagesTracking_NextStatus(Initiative initiative, InitiativeSubmitStageStatus initiativeSubmitStageStatus)
        //{
        //    var initiativeType = initiative.InitiativeType == null ? "max" : initiative.InitiativeType;  //if null force to MAX
        //    var _orderStagesForward = _context.TypeStage.Where(i => i.Type == initiativeType && i.Stage == initiative.Stage).FirstOrDefault();

        //    if (_orderStagesForward == null)
        //        return 0;

        //    var _stageNext = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Order == _orderStagesForward.Order + 1).FirstOrDefaultAsync();
        //    var _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == _stageNext.Stage).ToListAsync();

        //    foreach (var entity in _updateNextStatusTracking)
        //    {
        //        entity.Status = "In Progress";
        //    }

        //    return await _context.SaveChangesAsync();
        //}

        public async Task<int> UpdateStagesTracking_OnSubmit(Initiative initiative, InitiativeSubmitStageStatus initiativeSubmitStageStatus, string statusDirection, InitiativeTypeSubType initiativeTypeSubType)
        {
            try
            {
                bool isTypeMaxAndRequestCapex = initiative.InitiativeType.Contains("max") && initiative.IsRequestCapex == true;
                //if (isTypeMaxAndRequestCapex)
                //{
                //    await UpdateStageTrackingsMaxCapex_OnSubmit(initiative, initiativeSubmitStageStatus, statusDirection, subType);
                //    return 0;
                //}

                var _lastHistoryId = await LastHistoryId(initiative.Id);
                var initiativeType = initiativeTypeSubType.ProcessType;  //if null force to MAX
                string submittedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss", new System.Globalization.CultureInfo("en-US"));
                var firstStageOfMax = await _context.TypeStage.Where(i => i.Order == 1 && i.Type == "max" && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
                //var initiativeStage = isTypeMaxAndRequestCapex == true ? initiative.CapexStage : initiative.Stage;
                var initiativeStage = initiative.Stage;

                //if (isTypeMaxAndRequestCapex == true)  //insert Budget Team to MAX
                //{
                //    var IL3Sequence = await _context.InitiativeStatusTrackings.Where(i => i.Stage == "IL3" && i.InitiativeId == initiative.Id && i.SubType == subType).Select(i => i.Sequence).FirstOrDefaultAsync() - 1;
                //    var IL3RunningSequence = await _context.InitiativeStatusTrackings.Where(i => i.Stage == "IL3" && i.InitiativeId == initiative.Id && i.SubType == subType).Select(i => i.RunningSequence).FirstOrDefaultAsync() - 1;
                //    var reOrderTrackings = await _context.InitiativeStatusTrackings.Where(i => i.ProcessType == initiativeType && i.InitiativeId == initiative.Id && i.Sequence > IL3Sequence).ToListAsync();

                //    foreach (var entity in reOrderTrackings)  //re ordering for add Budget Team Stage
                //    {
                //        entity.Sequence = entity.Sequence + 1;
                //        entity.RunningSequence = entity.RunningSequence + 1;
                //    }

                //    // add Budget Team 
                //    await _context.InitiativeStatusTrackings.AddAsync(new InitiativeStatusTracking
                //    {
                //        ApprovedBy = null,
                //        ApprovedDate = null,
                //        HistoryId = _lastHistoryId,
                //        InitiativeId = initiative.Id,
                //        ProcessType = "directCapex",
                //        Sequence = IL3Sequence + 1,
                //        Stage = initiativeStage,
                //        Status = "In Progress",
                //        RunningSequence = IL3RunningSequence + 1,
                //        SubType = subType
                //    });

                //    return await _context.SaveChangesAsync();
                //}

                var _nowStage = await _context.TypeStage.Where(i => i.Order == -1).FirstOrDefaultAsync();
                var _prevStage = await _context.TypeStage.Where(i => i.Order == -1).FirstOrDefaultAsync();
                switch (statusDirection)
                {
                    case "backward":
                        _nowStage = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Stage == initiativeSubmitStageStatus.Stage && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
                        break;
                    default:
                        _nowStage = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Stage == initiativeStage && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
                        break;
                }
                //_nowStage = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Stage == initiative.Stage).FirstOrDefaultAsync();

                var _stageToClear = await _context.TypeStage.Where(i => i.Id == -1).ToListAsync(); //mock variable
                if (_nowStage == null)
                { //if stage == null then clear all approver date
                    _stageToClear = await _context.TypeStage.Where(i => i.Type == initiativeType && i.SubType == initiativeTypeSubType.SubType).ToListAsync();
                }
                else
                {
                    _stageToClear = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Order > _nowStage.Order && i.SubType == initiativeTypeSubType.SubType).ToListAsync();
                    _prevStage = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Order == _nowStage.Order - 1 && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
                }


                var _allStatusTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.SubType == initiativeTypeSubType.SubType).ToListAsync();
                var _nextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == initiativeSubmitStageStatus.Stage && i.SubType == initiativeTypeSubType.SubType).ToListAsync();
                var _nowStatusTrackingQueryable = _context.InitiativeStatusTrackings.AsQueryable();
                _nowStatusTrackingQueryable = _nowStatusTrackingQueryable.Where(i => i.InitiativeId == initiative.Id && i.Stage == (_nowStage == null ? "" : _nowStage.Stage) && i.SubType == initiativeTypeSubType.SubType);

                if (statusDirection == "cancelled")
                {
                    _nowStatusTrackingQueryable = _nowStatusTrackingQueryable.Where(i => i.Status == "In Progress");
                }

                var _nowStatusTracking = await _nowStatusTrackingQueryable.ToListAsync();

                if (_nowStatusTracking.Any())
                {
                    var _maxDateApprover = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == (_prevStage == null ? "" : _prevStage.Stage) && i.ApprovedBy != null && i.SubType == initiativeTypeSubType.SubType).OrderByDescending(i => i.ApprovedDate).FirstOrDefaultAsync();

                    foreach (var entity in _nowStatusTracking)
                    {
                        // Temporary Log foUPDATEr Invetigate 2021-07-21
                        LogInsight.Log(entity, "Initiative-4374", SQLCommandType.UPDATE, false);
                        // End log
                        if (statusDirection == "cancelled")
                        {
                            entity.Status = "Cancelled (By Owner)";
                        }
                        else
                        {
                            entity.Status = "Complete";
                        }

                        if (initiativeType.Contains("max"))
                        {
                            if (_maxDateApprover != null)
                                entity.ApprovedDate = _maxDateApprover.ApprovedDate;


                            //var firstStageMax = await _context.TypeStage.Where(i => i.Type == initiativeType).OrderBy(i => i.Order).FirstOrDefaultAsync();
                            //if (_maxDateApprover == null && entity.Stage == firstStageMax.Stage)
                            //{
                            //    if (entity.ApprovedDate == null)
                            //        entity.ApprovedDate = initiative.LastSubmittedDate.Value.ToString("yyyy-MM-dd HH:mm:ss", new System.Globalization.CultureInfo("en-US"));
                            //}
                        }
                        else
                        {
                            entity.ApprovedDate = submittedDate;
                        }
                        // Temporary Log foUPDATEr Invetigate 2021-07-21
                        LogInsight.Log(entity, "Initiative-4402", SQLCommandType.UPDATE, true);
                        // End log
                    }

                }

                if (_stageToClear.Any()) //remove all forward stage
                {
                    if (_allStatusTrackings.Any())
                        foreach (var entity in _stageToClear)
                        {
                            var lst_ClearStatus = _allStatusTrackings.Where(i => i.Stage == entity.Stage).ToList();
                            foreach (var entityClear in lst_ClearStatus)
                            {
                                entityClear.Status = "Not Start";
                                entityClear.ApprovedDate = firstStageOfMax != null ? (firstStageOfMax.Stage == entity.Stage ? entityClear.ApprovedDate : null) : null;
                                //entityClear.HistoryId = _lastHistoryId;
                            }
                        }
                }


                if (statusDirection != "cancelled")
                    if (_nextStatusTracking.Any())
                    { //next stage In Progress

                        foreach (var entity in _nextStatusTracking)
                        {
                            // Temporary Log foUPDATEr Invetigate 2021-07-21
                            LogInsight.Log(entity, "Initiative-4432", SQLCommandType.UPDATE, false);
                            // End log
                            entity.Status = "In Progress";
                            if (initiativeType.Contains("max"))
                            {
                                if (entity.Stage != firstStageOfMax.Stage)  //stage IL0  not clear approved Date when revise or backward
                                    entity.ApprovedDate = null;
                            }
                            else
                            {
                                entity.ApprovedDate = null;
                            }
                            // Temporary Log foUPDATEr Invetigate 2021-07-21
                            LogInsight.Log(entity, "Initiative-4445", SQLCommandType.UPDATE, true);
                            // End log
                        }
                    }
                    else
                    { // first stage In Progress
                        var _stageNext = await _context.TypeStage.Where(i => i.Type == initiativeType && i.Order == (_nowStage == null ? 1 : _nowStage.Order + 1) && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
                        var _updateNextStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Stage == _stageNext.Stage && i.SubType == initiativeTypeSubType.SubType).ToListAsync();

                        foreach (var entity in _updateNextStatusTracking)
                        {
                            // Temporary Log foUPDATEr Invetigate 2021-07-21
                            LogInsight.Log(entity, "Initiative-4457", SQLCommandType.UPDATE, false);
                            // End log
                            entity.Status = "In Progress";

                            if (initiativeType.Contains("max"))
                            {
                                if (entity.Stage != firstStageOfMax.Stage)  //stage IL0  not clear approved Date when revise or backward
                                    entity.ApprovedDate = null;
                            }
                            else
                            {
                                entity.ApprovedDate = null;
                            }
                            // Temporary Log foUPDATEr Invetigate 2021-07-21
                            LogInsight.Log(entity, "Initiative-4471", SQLCommandType.UPDATE, true);
                            // End log
                        }
                    }
            }
            catch
            {

            }

            return await _context.SaveChangesAsync();
        }

        public async Task<int> InsertStagesHistory(Initiative initiative, InitiativeSubmit initiativeSubmit, ApprovalNewSystemParam approvalNewSystemParam = null)
        {
            var approverName = await _context.Owners.Where(i => i.Email == initiativeSubmit.Username).FirstOrDefaultAsync();

            _context.InitiativeStatusHistory.Add(new InitiativeStatusHistory
            {
                InitiativeId = initiative.Id,
                Stage = (approvalNewSystemParam != null ? approvalNewSystemParam.NowStage : initiative.Stage),
                Status = (approvalNewSystemParam != null ? approvalNewSystemParam.Direction : initiativeSubmit.Status),
                ActionBy = approverName == null ? initiativeSubmit.Username : approverName.OwnerName,
                ActionDate = approvalNewSystemParam.nowDateTime.ToString("yyyy-MM-dd HH:mm:ss", new System.Globalization.CultureInfo("en-US")),
                Comment = initiativeSubmit.Remark,
                LastSubmittedDate = initiative.LastSubmittedDate,
                SubType = initiative.InitiativeSubType
            });
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(approverName, "Initiative-4500", SQLCommandType.INSERT);
            // End log

            return await _context.SaveChangesAsync();
        }

        public async Task CallMicrosoftFlow_SendMail(int id, string action)
        {
            //string urlFlow = "";
            var iniType = await _context.Initiatives.Where(i => i.Id == id).FirstOrDefaultAsync();
            string urlFlow = _urlPowerAutomate.Value.MSFLOW;
            if (!String.IsNullOrEmpty(urlFlow))
            {

                var stringContent = new StringContent("[" + JsonConvert.SerializeObject(
                  new
                  {
                      INIID = id.ToString(),
                      ACTION = action,
                      INITYPE = iniType.InitiativeType

                  }
              ) + "]", Encoding.UTF8, "application/json");

                var client = _clientFactory.CreateClient();

                var response = await client.PostAsync(urlFlow, stringContent);

            }
        }

        public async Task<int> ChangeApproverStatusTrackingFromSetActionBy(Initiative initiative, InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiativeType = initiativeTypeSubType.ProcessType;  //if null force to MAX

            if (initiative.Stage == null) return 0;
            if ((initiative.Stage.Contains("SIL") == false
                || (initiativeType.Contains("dim") == true))
                && ((initiativeType.Contains("max") && new string[] { "Gate0 : VAC Gate1", "Gate0 : Sub-PIC Gate1" }.Contains(initiative.Stage) == false))
                ) return 0;


            bool isTypeMaxAndRequestCapex = initiativeType.Contains("max") && initiative.IsRequestCapex == true;
            var initiativeStage = initiative.Stage;
            string subType = initiative.InitiativeSubType;
            if (isTypeMaxAndRequestCapex == true)
            {
                initiativeType = "pimcapex";
                initiativeStage = initiative.Stage;
            }

            var setActionByApprovers = await _context.InitiativeActions.Where(i => i.InitiativeId == initiative.Id && i.Action == "approve" && i.Position != "admin handover").ToListAsync();

            if (setActionByApprovers.Count == 0) return 0;

            var _lastHistoryId = await LastHistoryId(initiative.Id);
            var nowApproverOnStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && i.Stage == initiativeStage && i.SubType == subType).OrderByDescending(i => i.Sequence).ToListAsync();
            decimal? newSequence = 0;
            decimal? newRunningSequence = 0;
            foreach (var entity in nowApproverOnStatusTracking)
            {
                newSequence = entity.Sequence; //get smallest sequence for add in new approver sequence
                newRunningSequence = entity.RunningSequence;
                _context.InitiativeStatusTrackings.Remove(entity);
            } // remove old approvers

            var statusTrackingForSetNewSequence = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Sequence >= newSequence).OrderBy(i => i.Sequence).ToListAsync();



            foreach (var entity in setActionByApprovers)
            {
                var approverName = await _context.Owners.Where(i => i.Email == entity.ActionBy).FirstOrDefaultAsync();

                _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                {
                    Sequence = newSequence,
                    HistoryId = _lastHistoryId,
                    InitiativeId = initiative.Id,
                    Stage = entity.Stage,
                    Status = "In Progress",
                    ProcessType = initiativeType,
                    ApprovedBy = (approverName == null ? entity.ActionBy : approverName.OwnerName),
                    RunningSequence = newRunningSequence,
                    SubType = subType
                });

                newSequence++;
                newRunningSequence++;
            }

            foreach (var entity in statusTrackingForSetNewSequence)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(entity, "Initiative-4594", SQLCommandType.UPDATE, false);
                // End log

                entity.Sequence = newSequence;
                entity.RunningSequence = newRunningSequence;
                newSequence++;
                newRunningSequence++;
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(entity, "Initiative-4603", SQLCommandType.UPDATE, true);
                // End log

            }

            return await _context.SaveChangesAsync();
        }

        public async Task<bool> isRemainsActionBy(int initiativeId, string approverType)
        {
            var remainsActionBy = await _context.InitiativeActions.Where(i => i.InitiativeId == initiativeId).ToListAsync();

            foreach (var entity in remainsActionBy)
            {
                var checkApproverType = await _context.MaxApproverSettings.Where(i => i.ApproverEmail == entity.ActionBy && i.Indicator == approverType).FirstOrDefaultAsync();
                if (checkApproverType != null) return true;
            }

            return false;
        }

        public async Task<bool> isMatchedApproverType(int initiativeId, string approverEmail, string approverType)
        {
            var detailinformations = await _context.DetailInformations.Where(i => i.InitiativeId == initiativeId).FirstOrDefaultAsync();
            var checkMatched = await _context.MaxApproverSettings.Where(i => i.ApproverEmail == approverEmail && i.Indicator == approverType && i.WorkstreamValue == detailinformations.SubWorkstream2).FirstOrDefaultAsync();
            if (checkMatched != null)
            {
                return true;
            }

            return false;
        }

        public async Task<int> RemoveActionBy_ByApproverType(int initiativeId, string approverType, string approverEmail)
        {
            var detailinformations = await _context.DetailInformations.Where(i => i.InitiativeId == initiativeId).FirstOrDefaultAsync();
            var actionBys = await _context.InitiativeActions.Where(i => i.InitiativeId == initiativeId && i.Action == "approve" && i.ActionBy != approverEmail).ToListAsync();

            foreach (var entity in actionBys)
            {
                var checkApproverType = await _context.MaxApproverSettings.Where(i => i.ApproverEmail == entity.ActionBy && i.Indicator == approverType && i.WorkstreamValue == detailinformations.SubWorkstream2).FirstOrDefaultAsync();
                if (checkApproverType != null)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log((initiativeId, entity), "Initiative-4647", SQLCommandType.DELETE);
                    // End log

                    await RemoveInitiativeActions(initiativeId, entity.ActionBy);

                    var approverName = await _context.Owners.Where(i => i.Email == entity.ActionBy).FirstOrDefaultAsync();
                    var nowApproverOnStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiativeId && i.Status == "In Progress"
                                                                                                    && (i.ApprovedBy == (approverName == null ? "" : approverName.OwnerName) || i.ApprovedBy == entity.ActionBy)
                                                                                                    ).OrderByDescending(i => i.Sequence).ToListAsync();

                    foreach (var entityStatusTracking in nowApproverOnStatusTracking)
                    {
                        // Temporary Log for Invetigate 2021-07-21
                        LogInsight.Log(entityStatusTracking, "Initiative-4660", SQLCommandType.DELETE);
                        // End log

                        _context.InitiativeStatusTrackings.Remove(entityStatusTracking);
                    }  // remove in statustracking
                }
            }




            return await _context.SaveChangesAsync();
        }

        public async Task<int> RemoveActionBy_ByStage(int initiativeId, string stage, string approverEmail)
        {
            var actionBys = await _context.InitiativeActions.Where(i => i.InitiativeId == initiativeId && i.Action == "approve" && i.ActionBy != approverEmail).ToListAsync();

            foreach (var entity in actionBys)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log((initiativeId, entity), "Initiative-4681", SQLCommandType.DELETE);
                // End log

                await RemoveInitiativeActions(initiativeId, entity.ActionBy);

                var approverName = await _context.Owners.Where(i => i.Email == entity.ActionBy).FirstOrDefaultAsync();
                var nowApproverOnStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiativeId && i.Status == "In Progress"
                                                                                                && (i.ApprovedBy == (approverName == null ? "" : approverName.OwnerName) || i.ApprovedBy == entity.ActionBy)
                                                                                                && i.Stage == stage
                                                                                                ).OrderByDescending(i => i.Sequence).ToListAsync();

                foreach (var entityStatusTracking in nowApproverOnStatusTracking)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(entityStatusTracking, "Initiative-4695", SQLCommandType.DELETE);
                    // End log
                    _context.InitiativeStatusTrackings.Remove(entityStatusTracking);
                }  // remove in statustracking
            }

            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateLastestApproved(int initiativeId, string stage, DateTime? nowDateTime = null)
        {
            var impactRecord = await _context.ImpactTrackings.Where(i => i.InitiativeId == initiativeId).FirstOrDefaultAsync();

            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(impactRecord, "Initiative-4709", SQLCommandType.UPDATE, false);
            // End log

            switch (stage)
            {
                case "SIL4":
                    DateTime dateTime = nowDateTime == null ? DateTime.Now : nowDateTime.Value;
                    if (impactRecord.FirstApprovedIL4Date == null) impactRecord.FirstApprovedIL4Date = dateTime;
                    impactRecord.LastApprovedIL4Date = dateTime;
                    break;

                case "SIL5":
                    impactRecord.LastApprovedIL5Date = nowDateTime == null ? DateTime.Now : nowDateTime.Value;
                    break;
            }
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(impactRecord, "Initiative-4725", SQLCommandType.UPDATE, true);
            // End log
            _context.ImpactTrackings.Update(impactRecord);

            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateLastestSubmittedSIL(int initiativeId, string stage, DateTime? dateTime)
        {
            var impactRecord = await _context.ImpactTrackings.Where(i => i.InitiativeId == initiativeId).FirstOrDefaultAsync();
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(impactRecord, "Initiative-4736", SQLCommandType.UPDATE, false);
            // End log
            switch (stage)
            {
                case "SIL4":
                    impactRecord.LastSubmittedSIL4Date = dateTime;
                    break;

                case "SIL5":
                    impactRecord.LastSubmittedSIL5Date = dateTime;
                    break;
            }
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(impactRecord, "Initiative-4749", SQLCommandType.UPDATE, true);
            // End log
            _context.ImpactTrackings.Update(impactRecord);

            return await _context.SaveChangesAsync();
        }

        public async Task<DateTime> GetLastestUpdate(int id)
        {
            DateTime? lastestUpdate = await _context.Initiatives.Where(i => i.Id == id).Select(i => i.UpdatedDate).FirstOrDefaultAsync();
            DateTime getUpdateTime = (DateTime)lastestUpdate;
            return getUpdateTime;
        }

        // ----------------------- DashBoard Count ----------------------- //
        public async Task<int> MyTaskInProgress(MyInitiative MyInitiative)
        {
            try
            {
                int page = 1;
                DataTable dtReturn = new DataTable();
                List<InitiativeList> initiativeListReturn = new List<InitiativeList>();
                dtReturn = await _storeProcedure.ExecuteReturnDatatable($"EXEC sp_List_MyTask " +
                    $"''" +       //      @InitiativeCode
                    $",''" +        //      @InitiativeName
                    $",''" +        //      @Status
                    $",''" +        //      @InitiativeType
                    $",''" +        //      @OwnerName
                    $",''" +        //      @Plant
                    $",''" +        //      @Organization
                    $",''" +        //      @TypeofInvestment
                    $",''" +        //      @RegisteringDateSince
                    $",''" +        //      @RegisteringDateTo
                    $",''" +        //      @WorkStream
                    $",''" +        //      @SubWorkStream1
                    $",''" +        //      @Stage
                    $",''" +        //      @emocNo
                    $",''" +        //      @WBS
                    $",''" +        //      @AppNo
                    $",''" +        //      @Company
                    $",''" +        //      @Onprogress
                    $",''" +        //      @Complete
                    $",''" +        //      @Cancel
                    $",''" +        //      @KeyWord
                    $",''" +        //      @SortField
                    $",''" +        //      @OrderBy
                    $",'{page}'" +        //      @PageNo
                    $",'{ page * 1 }'" +        //      @RowPerPage
                    $",'{MyInitiative.Username}'");         //     @email

                if (dtReturn.Rows.Count > 0)
                {
                    initiativeListReturn = CommonMethod.ConvertToList<InitiativeList>(dtReturn);
                }
                if (initiativeListReturn.Count > 0)
                {
                    return initiativeListReturn[0].Counter;

                }
                else
                {
                    return 0;

                }
            }

            catch (Exception ex)
            {
                return 0;
            }
        }

        public async Task<int> MyTaskNotStarted(MyInitiative MyInitiative)
        {
            var Initiative = await _context.InitiativeActions.Where(i => i.ActionBy == MyInitiative.Username).Where(i =>
                i.Status == "admin check" ||
                i.Status == "wait for approval" ||
                i.Status == "wait for cancellation"
            ).ToListAsync();
            return Initiative.Count;
        }

        public async Task<int> MyInitiativeDraft(MyInitiative MyInitiative)
        {
            try
            {
                int page = 1;
                DataTable dtReturn = new DataTable();
                List<InitiativeList> initiativeListReturn = new List<InitiativeList>();

                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log("sp_List_MyOwn", "Initiative-4890", SQLCommandType.EXECUTE);
                // End log

                dtReturn = await _storeProcedure.ExecuteReturnDatatable($"EXEC sp_List_MyOwn " +
                    $"''" +       //      @InitiativeCode
                    $",''" +        //      @InitiativeName
                    $",'draft'" +        //      @Status
                    $",''" +        //      @InitiativeType
                    $",''" +        //      @OwnerName
                    $",''" +        //      @Plant
                    $",''" +        //      @Organization
                    $",''" +        //      @TypeofInvestment
                    $",''" +        //      @RegisteringDateSince
                    $",''" +        //      @RegisteringDateTo
                    $",''" +        //      @WorkStream
                    $",''" +        //      @SubWorkStream1
                    $",''" +        //      @Stage
                    $",''" +        //      @emocNo
                    $",''" +        //      @WBS
                    $",''" +        //      @AppNo
                    $",''" +        //      @Company
                    $",''" +        //      @Onprogress
                    $",''" +        //      @Complete
                    $",''" +        //      @Cancel
                    $",''" +        //      @KeyWord
                    $",''" +        //      @SortField
                    $",''" +        //      @OrderBy
                    $",'{page}'" +        //      @PageNo
                    $",'{ page * 1 }'" +        //      @RowPerPage
                    $",'{MyInitiative.Username}'");         //     @email

                if (dtReturn.Rows.Count > 0)
                {
                    initiativeListReturn = CommonMethod.ConvertToList<InitiativeList>(dtReturn);
                }
                if (initiativeListReturn.Count > 0)
                {
                    return initiativeListReturn[0].Counter;

                }
                else
                {
                    return 0;

                }
            }

            catch (Exception ex)
            {
                return 0;
            }

            //var owners = await _context.Owners.Where(i => i.Email.Trim().ToLower() == MyInitiative.Username).Select(i => i.OwnerName.ToLower()).Distinct().ToListAsync();
            //var initiative = _context.Initiatives.AsQueryable();
            //var initiativeList = await initiative.Where(i => (i.CreatedBy.Trim().ToLower() == MyInitiative.Username.Trim().ToLower() || owners.Contains(i.OwnerName.ToLower()))
            //                                            && i.Status == "draft" || i.Stage == null
            //                                            ).ToListAsync();

            ////var Initiative = await _context.Initiatives.Where(i => i.CreatedBy == MyInitiative.Username.Trim() || i.OwnerName == MyInitiative.Username).Where(i =>
            ////    i.Status == "draft" || i.Status == ""
            ////).ToListAsync();
            //return initiativeList.Count;
        }

        public async Task<int> MyInitiativeInProgress(MyInitiative MyInitiative)
        {
            try
            {
                int page = 1;
                bool isTrue = true;
                DataTable dtReturn = new DataTable();
                List<InitiativeList> initiativeListReturn = new List<InitiativeList>();
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log("sp_List_MyOwn", "Initiative-4963", SQLCommandType.EXECUTE);
                // End log
                dtReturn = await _storeProcedure.ExecuteReturnDatatable($"EXEC sp_List_MyOwn " +
                    $"''" +       //      @InitiativeCode
                    $",''" +        //      @InitiativeName
                    $",''" +        //      @Status
                    $",''" +        //      @InitiativeType
                    $",''" +        //      @OwnerName
                    $",''" +        //      @Plant
                    $",''" +        //      @Organization
                    $",''" +        //      @TypeofInvestment
                    $",''" +        //      @RegisteringDateSince
                    $",''" +        //      @RegisteringDateTo
                    $",''" +        //      @WorkStream
                    $",''" +        //      @SubWorkStream1
                    $",''" +        //      @Stage
                    $",''" +        //      @emocNo
                    $",''" +        //      @WBS
                    $",''" +        //      @AppNo
                    $",''" +        //      @Company
                    $",'{isTrue}'" +        //      @Onprogress
                    $",''" +        //      @Complete
                    $",''" +        //      @Cancel
                    $",''" +        //      @KeyWord
                    $",''" +        //      @SortField
                    $",''" +        //      @OrderBy
                    $",'{page}'" +        //      @PageNo
                    $",'{ page * 1 }'" +        //      @RowPerPage
                    $",'{MyInitiative.Username}'");         //     @email

                if (dtReturn.Rows.Count > 0)
                {
                    initiativeListReturn = CommonMethod.ConvertToList<InitiativeList>(dtReturn);
                }
                if (initiativeListReturn.Count > 0)
                {
                    return initiativeListReturn[0].Counter;

                }
                else
                {
                    return 0;

                }
            }

            catch (Exception ex)
            {
                return 0;
            }

            //var owners = await _context.Owners.Where(i => i.Email.Trim().ToLower() == MyInitiative.Username).Select(i => i.OwnerName.ToLower()).Distinct().ToListAsync();
            //var initiativeDraft = await _context.Initiatives.Where(i => (i.CreatedBy.Trim().ToLower() == MyInitiative.Username.Trim().ToLower() || owners.Contains(i.OwnerName.ToLower()))
            //                                            && i.Status == "draft" || i.Stage == null
            //                                            ).ToListAsync();

            //var InitiativeCancel = await _context.Initiatives.Where(i => i.CreatedBy == MyInitiative.Username.Trim() || i.OwnerName == MyInitiative.Username).Where(i =>
            //    i.Status == "reject" ||
            //    i.Status == "rejected" ||
            //    i.Status == "cancelled"
            //).ToListAsync();

            //var InitiativeFinish = await _context.Initiatives.Where(i => i.CreatedBy == MyInitiative.Username.Trim() || i.OwnerName == MyInitiative.Username).Where(i =>
            //    (i.Status == "approved" && i.Stage == "IL5") ||
            //    i.Status == "finish"
            ////|| i.Status == "principle approved"
            //).ToListAsync();


            //var initiativeList = await _context.Initiatives.Where(i => (i.CreatedBy.Trim().ToLower() == MyInitiative.Username.Trim().ToLower() || owners.Contains(i.OwnerName.ToLower()))
            //                                            ).ToListAsync();

            //initiativeList = initiativeList.Except(InitiativeFinish).Except(InitiativeCancel).Except(initiativeDraft).ToList();


            ////var Initiative = await _context.Initiatives.Where(i => i.CreatedBy == MyInitiative.Username.Trim() || i.OwnerName == MyInitiative.Username).Where(i =>
            ////    i.Status == "admin check" ||
            ////    i.Status == "wait for submission" ||
            ////    i.Status == "wait for cancellation" ||
            ////    i.Status == "revise" ||
            ////    i.Status == "wait for approval" ||
            ////    i.Status == "revised" ||
            ////    i.Status == "add more" ||
            ////    i.Status == "add more pool" ||
            ////    i.Status == "approved"
            ////).ToListAsync();
            //return initiativeList.Count;
        }

        public async Task<int> MyInitiativeCompleted(MyInitiative MyInitiative)
        {
            try
            {
                int page = 1;
                bool isTrue = true;
                DataTable dtReturn = new DataTable();
                List<InitiativeList> initiativeListReturn = new List<InitiativeList>();
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log("sp_List_MyOwn", "Initiative-5061", SQLCommandType.EXECUTE);
                // End log
                dtReturn = await _storeProcedure.ExecuteReturnDatatable($"EXEC sp_List_MyOwn " +
                    $"''" +       //      @InitiativeCode
                    $",''" +        //      @InitiativeName
                    $",''" +        //      @Status
                    $",''" +        //      @InitiativeType
                    $",''" +        //      @OwnerName
                    $",''" +        //      @Plant
                    $",''" +        //      @Organization
                    $",''" +        //      @TypeofInvestment
                    $",''" +        //      @RegisteringDateSince
                    $",''" +        //      @RegisteringDateTo
                    $",''" +        //      @WorkStream
                    $",''" +        //      @SubWorkStream1
                    $",''" +        //      @Stage
                    $",''" +        //      @emocNo
                    $",''" +        //      @WBS
                    $",''" +        //      @AppNo
                    $",''" +        //      @Company
                    $",''" +        //      @Onprogress
                    $",'{isTrue}'" +        //      @Complete
                    $",''" +        //      @Cancel
                    $",''" +        //      @KeyWord
                    $",''" +        //      @SortField
                    $",''" +        //      @OrderBy
                    $",'{page}'" +        //      @PageNo
                    $",'{ page * 1 }'" +        //      @RowPerPage
                    $",'{MyInitiative.Username}'");         //     @email

                if (dtReturn.Rows.Count > 0)
                {
                    initiativeListReturn = CommonMethod.ConvertToList<InitiativeList>(dtReturn);
                }
                if (initiativeListReturn.Count > 0)
                {
                    return initiativeListReturn[0].Counter;

                }
                else
                {
                    return 0;

                }
            }

            catch (Exception ex)
            {
                return 0;
            }

            //var Initiative = await _context.Initiatives.Where(i => i.CreatedBy == MyInitiative.Username.Trim() || i.OwnerName == MyInitiative.Username).Where(i =>
            //    (i.Status == "approved" && i.Stage == "IL5") ||
            //    i.Status == "finish"
            ////|| i.Status == "principle approved"
            //).ToListAsync();
            //return Initiative.Count;
        }

        public async Task<int> MyInitiativeCanceled(MyInitiative MyInitiative)
        {

            try
            {
                int page = 1;
                bool isTrue = true;
                DataTable dtReturn = new DataTable();
                List<InitiativeList> initiativeListReturn = new List<InitiativeList>();
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log("sp_List_MyOwn", "Initiative-5130", SQLCommandType.EXECUTE);
                // End log
                dtReturn = await _storeProcedure.ExecuteReturnDatatable($"EXEC sp_List_MyOwn " +
                    $"''" +       //      @InitiativeCode
                    $",''" +        //      @InitiativeName
                    $",''" +        //      @Status
                    $",''" +        //      @InitiativeType
                    $",''" +        //      @OwnerName
                    $",''" +        //      @Plant
                    $",''" +        //      @Organization
                    $",''" +        //      @TypeofInvestment
                    $",''" +        //      @RegisteringDateSince
                    $",''" +        //      @RegisteringDateTo
                    $",''" +        //      @WorkStream
                    $",''" +        //      @SubWorkStream1
                    $",''" +        //      @Stage
                    $",''" +        //      @emocNo
                    $",''" +        //      @WBS
                    $",''" +        //      @AppNo
                    $",''" +        //      @Company
                    $",''" +        //      @Onprogress
                    $",''" +        //      @Complete
                    $",'{isTrue}'" +        //      @Cancel
                    $",''" +        //      @KeyWord
                    $",''" +        //      @SortField
                    $",''" +        //      @OrderBy
                    $",'{page}'" +        //      @PageNo
                    $",'{ page * 1 }'" +        //      @RowPerPage
                    $",'{MyInitiative.Username}'");         //     @email

                if (dtReturn.Rows.Count > 0)
                {
                    initiativeListReturn = CommonMethod.ConvertToList<InitiativeList>(dtReturn);
                }
                if (initiativeListReturn.Count > 0)
                {
                    return initiativeListReturn[0].Counter;

                }
                else
                {
                    return 0;

                }
            }

            catch (Exception ex)
            {
                return 0;
            }

            //var Initiative = await _context.Initiatives.Where(i => i.CreatedBy == MyInitiative.Username.Trim() || i.OwnerName == MyInitiative.Username).Where(i =>
            //    i.Status == "reject" ||
            //    i.Status == "rejected" ||
            //    i.Status == "cancelled"
            //).ToListAsync();
            //return Initiative.Count;
        }

        public async Task<Owner> DMApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();
            if (isOldApproveCapex == true)
            {
                var approver = await _context.TypeStageApprover.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.Stage == "DM" && i.SubType == initiativeTypeSubType.SubType).Select(i => i.Approver).FirstOrDefaultAsync();
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.ToLower()).FirstOrDefaultAsync();
            }

            //var ownerName = initiative.OwnerName;
            //var DM = await _context.Owners.Where(i => i.OwnerName.ToLower() == ownerName.ToLower()).FirstOrDefaultAsync();

            var owner = await _context.Owners.Where(i => i.OwnerName == initiative.OwnerName).FirstOrDefaultAsync();
            var DM = await _context.Owners.Where(i => i.EmployeeID == owner.DivManagerEmpID.ToString()).FirstOrDefaultAsync();

            //get VP if data null
            if (DM == null)
                DM = await _context.Owners.Where(i => i.EmployeeID == owner.DepManagerEmpID.ToString()).FirstOrDefaultAsync();

            //get evp if null
            if (DM == null)
                DM = await _context.Owners.Where(i => i.EmployeeID == owner.FNManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (DM == null)
                DM = await _context.Owners.Where(i => i.EmployeeID == owner.FNGRPManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (DM == null)
                DM = await _context.Owners.Where(i => i.EmployeeID == owner.PSDManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (DM == null)
                DM = await _context.Owners.Where(i => i.EmployeeID == owner.CEOManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (DM == null)
            {
                var approver = await _context.TypeStageApprover.Where(i => i.Stage == "DM" && i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
                DM = await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();
            }

            return DM;
        }

        public async Task<Owner> VPApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();
            if (isOldApproveCapex == true)
            {
                var approver = await _context.TypeStageApprover.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Stage == "VP").Select(i => i.Approver).FirstOrDefaultAsync();
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.ToLower()).FirstOrDefaultAsync();
            }

            string VPName;
            var detailInformation = await _context.DetailInformations.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();
            if (!string.IsNullOrEmpty(detailInformation.President))
            {
                VPName = detailInformation.President;
            }
            else
            {
                var capexInformations = await _context.CapexInformation.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();
                VPName = capexInformations.CostCenterOfVP;
            }

            var VP = await _context.Owners.Where(i => i.OwnerName.ToLower() == VPName.ToLower()).FirstOrDefaultAsync();

            if (VP == null)
            {
                var approver = await _context.TypeStageApprover.Where(i => i.Stage == "VP" && i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
                VP = await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();
            }

            return VP;
        }

        public async Task<Owner> EVPApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();
            if (isOldApproveCapex == true)
            {
                var approver = await _context.TypeStageApprover.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Stage == "EVP/MD/SEVP/COE/PSD/CEO").Select(i => i.Approver).FirstOrDefaultAsync();
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.ToLower()).FirstOrDefaultAsync();
            }

            string VPName;
            var detailInformation = await _context.DetailInformations.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();
            if (!string.IsNullOrEmpty(detailInformation.President))
            {
                VPName = detailInformation.President;
            }
            else
            {
                var capexInformations = await _context.CapexInformation.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();
                VPName = capexInformations.CostCenterOfVP;
            }
            var VP = await _context.Owners.Where(i => i.OwnerName == VPName).FirstOrDefaultAsync();

            if (VP == null)
            {
                var approver = await _context.TypeStageApprover.Where(i => i.Stage == "EVP/MD/SEVP/COE/PSD/CEO" && i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
                VP = await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();
            }

            var EVP = await _context.Owners.Where(i => i.EmployeeID == VP.FNManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (EVP == null)
                EVP = await _context.Owners.Where(i => i.EmployeeID == VP.FNGRPManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (EVP == null)
                EVP = await _context.Owners.Where(i => i.EmployeeID == VP.PSDManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (EVP == null)
                EVP = await _context.Owners.Where(i => i.EmployeeID == VP.CEOManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (initiative.Company.ToLower() != "pttgc") // if company is not pttgc then use MD approve stage evp 
                EVP = await _context.Owners.Where(i => i.EmployeeID == VP.CEOManagerEmpID.ToString()).FirstOrDefaultAsync();

            return EVP;
        }

        public async Task<Owner> BudgetTeamApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();
            var initiativeType = initiative.InitiativeType.Contains("max") == true ? "directCapex" : initiativeTypeSubType.ProcessType;
            var approver = await _context.TypeStageApprover.Where(i => i.Stage == "Budget Team" && i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
            var statusTracking = new InitiativeStatusTracking();
            if (isOldApproveCapex == true)
            {
                var tableApprover = await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();
                statusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId && i.Stage == "Budget Team" && i.SubType == initiativeTypeSubType.SubType && i.ProcessType == initiativeType).OrderByDescending(i => i.RunningSequence).FirstOrDefaultAsync();
                if (statusTracking != null)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(statusTracking, "Initiative-5320", SQLCommandType.UPDATE, false);
                    // End log

                    statusTracking.ApprovedBy = tableApprover.OwnerName;

                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(statusTracking, "Initiative-5326", SQLCommandType.UPDATE, true);
                    // End log

                    await _context.SaveChangesAsync();
                }
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();
            }

            //CommonData  where  company Name from Initiatives
            var companyCode = await _context.CommonData.Where(i => i.DataType == "company" && (i.Attribute01 == initiative.Company || i.Attribute03 == initiative.Company)).FirstOrDefaultAsync();

            if (companyCode == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var budgetanalyst = await _context.CommonData.Where(i => i.DataType == "budgetanalyst" && i.Attribute03 == "Y" && i.Attribute02 == companyCode.Attribute01).FirstOrDefaultAsync();

            if (budgetanalyst == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var BudgetTeam = await _context.Owners.Where(i => i.EmployeeID == budgetanalyst.Attribute01).FirstOrDefaultAsync();

            if (BudgetTeam == null)
                await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            statusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId && i.Stage == "Budget Team" && i.SubType == initiativeTypeSubType.SubType && i.ProcessType == initiativeType).OrderByDescending(i => i.RunningSequence).FirstOrDefaultAsync();
            if (statusTracking != null)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTracking, "Initiative-5354", SQLCommandType.UPDATE, false);
                // End log
                statusTracking.ApprovedBy = BudgetTeam.OwnerName;

                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTracking, "Initiative-5359", SQLCommandType.UPDATE, true);
                // End log
                await _context.SaveChangesAsync();
            }

            return BudgetTeam;
        }

        public async Task<Owner> BODApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            //CommonData  where  company Name from Initiatives
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();
            var approver = await _context.TypeStageApprover.Where(i => i.Stage == "BOD" && i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();

            if (isOldApproveCapex == true)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var companyCode = await _context.CommonData.Where(i => i.DataType == "company" && (i.Attribute01 == initiative.Company || i.Attribute03 == initiative.Company)).FirstOrDefaultAsync();

            if (companyCode == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var budgetanalyst = await _context.CommonData.Where(i => i.DataType == "budgetanalyst" && i.Attribute03 == "Y" && i.Attribute02 == companyCode.Attribute01).FirstOrDefaultAsync();

            if (budgetanalyst == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var BOD = await _context.Owners.Where(i => i.EmployeeID == budgetanalyst.Attribute01).FirstOrDefaultAsync();

            if (BOD == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var statusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId && i.Stage == "BOD" && i.ProcessType == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
            if (statusTracking != null)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTracking, "Initiative-5394", SQLCommandType.UPDATE, false);
                // End log
                statusTracking.ApprovedBy = BOD.OwnerName;

                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTracking, "Initiative-5399", SQLCommandType.UPDATE, true);
                // End log
                await _context.SaveChangesAsync();
            }

            return BOD;
        }

        public async Task<Owner> AppRequestApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();

            var approver = await _context.TypeStageApprover.Where(i => i.Stage == "App. Request" && i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();

            var companyCode = await _context.CommonData.Where(i => i.DataType == "company" && (i.Attribute01 == initiative.Company || i.Attribute03 == initiative.Company)).FirstOrDefaultAsync();

            if (companyCode == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var budgetanalyst = await _context.CommonData.Where(i => i.DataType == "budgetanalyst" && i.Attribute03 == "Y" && i.Attribute02 == companyCode.Attribute01).FirstOrDefaultAsync();

            if (budgetanalyst == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var BOD = await _context.Owners.Where(i => i.EmployeeID == budgetanalyst.Attribute01).FirstOrDefaultAsync();

            if (BOD == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var statusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId && i.Stage == "App. Request" && i.ProcessType == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
            if (statusTracking != null)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTracking, "Initiative-5326", SQLCommandType.UPDATE, true);
                // End log
                statusTracking.ApprovedBy = BOD.OwnerName;
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTracking, "Initiative-5326", SQLCommandType.UPDATE, true);
                // End log
                await _context.SaveChangesAsync();
            }

            return BOD;

            //return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();
        }

        public async Task<Owner> WBSRequestApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();

            var approver = await _context.TypeStageApprover.Where(i => i.Stage == "WBS Request" && i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();

            var companyCode = await _context.CommonData.Where(i => i.DataType == "company" && (i.Attribute01 == initiative.Company || i.Attribute03 == initiative.Company)).FirstOrDefaultAsync();

            if (companyCode == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var budgetanalyst = await _context.CommonData.Where(i => i.DataType == "budgetanalyst" && i.Attribute03 == "Y" && i.Attribute02 == companyCode.Attribute01).FirstOrDefaultAsync();

            if (budgetanalyst == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var BOD = await _context.Owners.Where(i => i.EmployeeID == budgetanalyst.Attribute01).FirstOrDefaultAsync();

            if (BOD == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var statusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId && i.Stage == "WBS Request" && i.ProcessType == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
            if (statusTracking != null)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTracking, "Initiative-5472", SQLCommandType.UPDATE, false);
                // End log
                statusTracking.ApprovedBy = BOD.OwnerName;
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTracking, "Initiative-5476", SQLCommandType.UPDATE, true);
                // End log
                await _context.SaveChangesAsync();
            }

            return BOD;

            //return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();
        }

        public async Task<Owner> BudgetDistributeApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();

            var approver = await _context.TypeStageApprover.Where(i => i.Stage == "Budget Distribute" && i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();

            var companyCode = await _context.CommonData.Where(i => i.DataType == "company" && (i.Attribute01 == initiative.Company || i.Attribute03 == initiative.Company)).FirstOrDefaultAsync();

            if (companyCode == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var budgetanalyst = await _context.CommonData.Where(i => i.DataType == "budgetanalyst" && i.Attribute03 == "Y" && i.Attribute02 == companyCode.Attribute01).FirstOrDefaultAsync();

            if (budgetanalyst == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var BOD = await _context.Owners.Where(i => i.EmployeeID == budgetanalyst.Attribute01).FirstOrDefaultAsync();

            if (BOD == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var statusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId && i.Stage == "Budget Distribute" && i.ProcessType == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
            if (statusTracking != null)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTracking, "Initiative-5511", SQLCommandType.UPDATE, true);
                // End log
                statusTracking.ApprovedBy = BOD.OwnerName;
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTracking, "Initiative-5515", SQLCommandType.UPDATE, true);
                // End log
                await _context.SaveChangesAsync();
            }

            return BOD;

            //return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();
        }

        public async Task<Owner> BudgetExcellenceDistributeApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();

            var approver = await _context.TypeStageApprover.Where(i => i.Stage == "Budget Excellence Distribute" && i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();

            var companyCode = await _context.CommonData.Where(i => i.DataType == "company" && (i.Attribute01 == initiative.Company || i.Attribute03 == initiative.Company)).FirstOrDefaultAsync();

            if (companyCode == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var budgetanalyst = await _context.CommonData.Where(i => i.DataType == "budgetanalyst" && i.Attribute03 == "Y" && i.Attribute02 == companyCode.Attribute01).FirstOrDefaultAsync();

            if (budgetanalyst == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var BOD = await _context.Owners.Where(i => i.EmployeeID == budgetanalyst.Attribute01).FirstOrDefaultAsync();

            if (BOD == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var statusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId && i.Stage == "Budget Excellence Distribute" && i.ProcessType == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
            if (statusTracking != null)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTracking, "Initiative-5550", SQLCommandType.UPDATE, true);
                // End log
                statusTracking.ApprovedBy = BOD.OwnerName;
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTracking, "Initiative-5554", SQLCommandType.UPDATE, true);
                // End log
                await _context.SaveChangesAsync();
            }

            return BOD;

            //return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();
        }

        public async Task<Owner> BudgetPoolApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();

            var approver = await _context.TypeStageApprover.Where(i => i.Stage == "Budget Pool" && i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();

            var companyCode = await _context.CommonData.Where(i => i.DataType == "company" && (i.Attribute01 == initiative.Company || i.Attribute03 == initiative.Company)).FirstOrDefaultAsync();

            if (companyCode == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var budgetanalyst = await _context.CommonData.Where(i => i.DataType == "budgetanalyst" && i.Attribute03 == "Y" && i.Attribute02 == companyCode.Attribute01).FirstOrDefaultAsync();

            if (budgetanalyst == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var BOD = await _context.Owners.Where(i => i.EmployeeID == budgetanalyst.Attribute01).FirstOrDefaultAsync();

            if (BOD == null)
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();

            var statusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId && i.Stage == "Budget Pool" && i.ProcessType == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
            if (statusTracking != null)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTracking, "Initiative-5589", SQLCommandType.UPDATE, true);
                // End log
                statusTracking.ApprovedBy = BOD.OwnerName;
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTracking, "Initiative-5593", SQLCommandType.UPDATE, true);
                // End log
                await _context.SaveChangesAsync();
            }

            return BOD;

            //return await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();
        }

        public async Task<Owner> GetCapexApproverByStage(InitiativeTypeSubType initiativeTypeSubType, string stage)
        {
            switch (stage)
            {
                case "DM":
                    return await DMApprover(initiativeTypeSubType);

                case "VP":
                    return await VPApprover(initiativeTypeSubType);

                case "EVP/MD/SEVP/COE/PSD/CEO":
                    return await EVPApprover(initiativeTypeSubType);

                case "Budget Team":
                    return await BudgetTeamApprover(initiativeTypeSubType);

                case "BOD":
                    return await BODApprover(initiativeTypeSubType);

                case "App. Request":
                    return await AppRequestApprover(initiativeTypeSubType);

                case "WBS Request":
                    return await WBSRequestApprover(initiativeTypeSubType);

                case "Budget Distribute":
                    return await BudgetDistributeApprover(initiativeTypeSubType);

                case "Budget Excellence Distribute":
                    return await BudgetExcellenceDistributeApprover(initiativeTypeSubType);

                case "Budget Pool":
                    return await BudgetPoolApprover(initiativeTypeSubType);

                default:
                    return null;
            }
        }

        public async Task<string> GetUserCompany(string email)
        {
            var getCompany = await _context.Owners.Where(i => i.Email.ToLower() == email.ToLower()).Select(i => i.CompanyShortTxt).FirstOrDefaultAsync();

            return getCompany;
        }
        public async Task<bool> SetRequestCapex(int id)
        {
            var selectIni = await _context.Initiatives.Where(o => o.Id == id).FirstOrDefaultAsync();
            selectIni.IsRequestCapex = true;
            _context.SaveChanges();

            await _storeProcedure.Execute_NoReturnWithTryCatch($"sp_SetRequestCapexAction '{id}'");

            return true;
        }

        public async Task<string> GetSubType(int initiativeId)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeId).FirstOrDefaultAsync();
            var initiativeDetail = await _context.InitiativeDetails.Where(i => i.InitiativeId == initiativeId).FirstOrDefaultAsync();
            var detailInformation = await _context.DetailInformations.Where(i => i.InitiativeId == initiativeId).FirstOrDefaultAsync();
            string initiativeType;

            if (flagNewApprovalSystem == true)
            {
                switch (initiative.InitiativeType?.ToLower())
                {
                    case "max":
                        return "normal";
                        break;

                    case "directcapex":
                        return "normal";
                        break;

                    case "pim":
                        //wait logic from p'nok
                        if (initiative.TypeOfInvestment?.ToLower() == "environment")
                            return "environment";

                        return "performance";
                        break;

                    case "cim":
                        if (initiative.Divestment == true)
                            return "divest";

                        if (initiative.TypeOfInvestment.ToLower() == "divestment" && initiative.RequestCapex.ToLower() == "true")
                            return "divest";

                        string[] ma_cvc = { "m&a", "cvc" };
                        if (ma_cvc.Contains(initiative.TypeOfInvestment?.ToLower()))
                            return "m&a,cvc";

                        return "bigproject";
                        //return investment type of cim
                        break;

                    case "dim":
                        if (detailInformation == null)
                            return "normal";

                        //if ((detailInformation.requireDirectBenefit == null || detailInformation.requireDirectBenefit == false) && (detailInformation.RequireIndirectBenefit == null || detailInformation.RequireIndirectBenefit == false))
                        //    return "normal";

                        //if (detailInformation.requireDirectBenefit == true && (detailInformation.RequireIndirectBenefit == null || detailInformation.RequireIndirectBenefit == false))
                        //    return "normal";

                        //if ((detailInformation.requireDirectBenefit == null || detailInformation.requireDirectBenefit == false) && detailInformation.RequireIndirectBenefit == true)
                        //    return "normal";

                        //if (detailInformation.requireDirectBenefit == true && detailInformation.RequireIndirectBenefit == true)
                        if (initiative.TypeBenefit?.ToLower() == "financial")
                            return "financialbenefit";

                        return "normal";
                        break;

                    case "cpi":
                        return "normal";
                        break;

                    case "strategy":
                        return "normal";
                        break;

                    case "it":
                        return "normal";
                        break;

                    case "digital":
                        return "normal";
                        break;

                    case "request pool":
                        return "normal";
                        break;

                }
            }
            else
            {
                if (flagDimCapex == true)
                {
                    initiativeType = initiative.InitiativeType == "dim" ? "directCapex" : initiative.InitiativeType;
                }
                else
                {
                    initiativeType = initiative.InitiativeType;
                }

                //var initiativeType = initiative.InitiativeType == "dim" ? "directCapex" : initiative.InitiativeType;  //#Tempolary for Go-live New Structure
                //var initiativeType = initiative.InitiativeType; //initiative.InitiativeType == "dim" ? "directCapex" : initiative.InitiativeType;  //#Tempolary for Go-live New Structure
                //var initiativeDetail = await _context.InitiativeDetails.Where(i => i.InitiativeId == initiativeId).FirstOrDefaultAsync();
                //var detailInformation = await _context.DetailInformations.Where(i => i.InitiativeId == initiativeId).FirstOrDefaultAsync();
                if (initiativeType == "directCapex")
                {
                    var capexInfo = await _context.CapexInformations.Where(i => i.InitiativeId == initiativeId
                                     && i.Sequent == _context.CapexInformations.Where(i => i.InitiativeId == initiativeId).OrderByDescending(i => i.Sequent).FirstOrDefault().Sequent
                                     ).ToListAsync();

                    if (capexInfo.Any())
                    {
                        var capexInfo_First = capexInfo.FirstOrDefault();
                        return capexInfo_First.BetweenYear == null || capexInfo_First.BetweenYear == "" || capexInfo_First.BudgetPeriod.ToLower() != "current year" ? capexInfo_First.BudgetPeriod.ToLower() : capexInfo_First.BetweenYear.ToLower();
                    }

                    return null;
                }
                else if (initiativeType == "Request Pool")
                {
                    switch (initiative.PoolType.ToLower())
                    {
                        case "er":
                            return "er";
                            break;

                        default:
                            return "noner";
                            break;
                    }
                }
                else if (initiativeType == "cim")
                {

                    if (initiative.Divestment == true)
                        return "divestnocapex";

                    string[] ma_cvc = { "m&a", "cvc" };
                    if (ma_cvc.Contains(initiative.TypeOfInvestment.ToLower()))
                        return "m&a,cvc";

                    if (initiative.TypeOfInvestment.ToLower() == "divestment" && initiative.RequestCapex.ToLower() == "true")
                        return "divestcapex";

                    return "other";
                    //return investment type of cim
                }
                else if (initiativeType == "dim")
                {
                    if (detailInformation == null)
                        return null;

                    if ((detailInformation.requireDirectBenefit == null || detailInformation.requireDirectBenefit == false) && (detailInformation.RequireIndirectBenefit == null || detailInformation.RequireIndirectBenefit == false))
                        return null;

                    if (detailInformation.requireDirectBenefit == true && (detailInformation.RequireIndirectBenefit == null || detailInformation.RequireIndirectBenefit == false))
                        return "direct";

                    if ((detailInformation.requireDirectBenefit == null || detailInformation.requireDirectBenefit == false) && detailInformation.RequireIndirectBenefit == true)
                        return "indirect";

                    if (detailInformation.requireDirectBenefit == true && detailInformation.RequireIndirectBenefit == true)
                        return "direct,indirect";


                    return null;
                }
                else if (initiativeType.Contains("max"))
                {
                    if (initiative.RequestCapex == "true" && initiative.RequestOpex == "trueOpex")
                        if (initiative.Company.ToLower() == "others" || initiative.Company.ToLower() == "other")
                        {
                            return null;
                        }
                        else
                        {
                            return "gate1";
                        }

                    return null;
                }
                else
                {
                    return null;
                }
            }


            return null;

        }

        public async Task<string> GetProcessType(int initiativeId)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeId).FirstOrDefaultAsync();
            string initiativeType;

            if (flagNewApprovalSystem == true)
                return initiative.InitiativeType;

            if (flagDimCapex == true)
            {
                initiativeType = initiative.InitiativeType == "dim" ? "directCapex" : initiative.InitiativeType;
            }
            else
            {
                initiativeType = initiative.InitiativeType;
            }

            //var initiativeType = initiative.InitiativeType == "dim" ? "directCapex" : initiative.InitiativeType;  //#Tempolary for Go-live New Structure
            //var initiativeType = initiative.InitiativeType; //initiative.InitiativeType == "dim" ? "directCapex" : initiative.InitiativeType;  //#Tempolary for Go-live New Structure

            if (initiativeType.ToLower() != "directcapex")
                return initiativeType;


            //---------------------------------------   

            var chkExist = await _context.CapexInformations.Where(i => i.InitiativeId == initiativeId).ToListAsync();

            if (!chkExist.Any())
                return initiativeType;

            var capexInfo = await _context.CapexInformations.Where(i => i.InitiativeId == initiativeId
                            && i.Sequent == _context.CapexInformations.Where(i => i.InitiativeId == initiativeId).OrderByDescending(i => i.Sequent).FirstOrDefault().Sequent
                            ).FirstOrDefaultAsync();

            if (capexInfo.CapexType.ToLower() == "createnew")
            {
                if (flagDimCapex == true)
                {
                    return initiative.InitiativeType == "dim" ? "directCapex" : initiative.InitiativeType;
                }
                else
                {
                    return initiative.InitiativeType;
                }
            }
            //return initiative.InitiativeType;  // return directCapex

            return capexInfo.CapexType;  // return  AddmoreCapex
        }

        public async Task<int> GetOrderStage(string nowStage, InitiativeTypeSubType initiativeTypeSubType)
        {
            var typeStage = await _context.TypeStage.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Stage == nowStage).FirstOrDefaultAsync();

            if (typeStage != null)
            {
                return typeStage.Order;
            }
            else
            {
                return 0;
            }

        }

        public async Task<string> GetNextStage(int nowOrderStage, InitiativeTypeSubType initiativeTypeSubType)
        {
            nowOrderStage++;
            var initiative = await GetInitiative(initiativeTypeSubType.InitiativeId);
            //if (initiativeTypeSubType.ProcessType.Contains("max") && initiativeTypeSubType.SubType == "gate1" && initiative.Stage == "Gate1 : PIC Gate2") nowOrderStage = 7;  // pim approved  then goback to IL3

            var nextStage = await _context.TypeStage.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Order == nowOrderStage).FirstOrDefaultAsync();

            if (nextStage != null)
                if (nextStage.Stage == "Ideate-3" || nextStage.Stage == "Ideate SIL1-3")
                    if (await GetCostEstCapexAndCostEstOpex(initiativeTypeSubType.InitiativeId) < 10)
                    {
                        //skip stage if budger < 10 million
                        nowOrderStage++;
                        nextStage = await _context.TypeStage.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Order == nowOrderStage).FirstOrDefaultAsync();
                    }

            if (nextStage != null)
            {
                return nextStage.Stage;
            }

            if (initiativeTypeSubType.ProcessType == "pimcapex")
            {
                //case next stage null and max req capex
                if (initiative.InitiativeSubType == "gate1")
                    return "IL3-2";

                return "IL3";
            }

            return null;
        }
        public async Task<string> GetReviseStage(int nowOrderStage, InitiativeTypeSubType initiativeTypeSubType)
        {
            var typeStageQueryable = _context.TypeStage.AsQueryable();
            var returnStage = await typeStageQueryable.FirstOrDefaultAsync();
            if (initiativeTypeSubType.ProcessType.Contains("max"))
            {
                var nowStage = await _context.TypeStage.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Order == nowOrderStage).FirstOrDefaultAsync();

                if (nowStage == null) //no stage , stage waiting
                {
                    return "draft";
                }
                else if (nowStage.Stage.StartsWith("IL"))
                {
                    if (nowStage.Stage.EndsWith("-2")) //IL3-2   goto IL3-1
                    {
                        typeStageQueryable = typeStageQueryable.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Order == nowOrderStage - 3);
                    }
                    else
                    {
                        typeStageQueryable = typeStageQueryable.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Order == nowOrderStage - 2);
                    }
                }
                else if (nowStage.Stage.StartsWith("SIL"))
                {
                    typeStageQueryable = typeStageQueryable.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Order == nowOrderStage - 1);
                }
                else
                {
                    if (nowOrderStage <= 0) nowOrderStage = 1;
                    typeStageQueryable = typeStageQueryable.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Order == nowOrderStage);
                }
            }
            else
            {
                if (nowOrderStage <= 0) nowOrderStage = 1;
                typeStageQueryable = typeStageQueryable.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Order == nowOrderStage);
            }

            returnStage = await typeStageQueryable.FirstOrDefaultAsync();

            if (returnStage != null)
            {
                return returnStage.Stage;
            }

            return "draft";
        }

        public async Task<string> GetApproveStatus(InitiativeTypeSubType initiativeTypeSubType, InitiativeSubmit initiativeSubmit, string nextStage)
        {
            string tempInitiativeType = initiativeTypeSubType.ProcessType;
            if (initiativeTypeSubType.ProcessType.Contains("max"))
            {
                tempInitiativeType = "max";
            }

            if (initiativeSubmit.Status == "approve cancellation")
            {
                return "cancelled";
            }
            else if (initiativeSubmit.Status == "reject cancellation")
            {
                return "draft";
            }
            else if (initiativeSubmit.Status == "revise")
            {
                return "revised";
            }
            else if (initiativeSubmit.Status == "reject")
            {
                return "reject";
            }

            if (initiativeTypeSubType.ProcessType == "pimcapex")
            {
                switch (nextStage)
                {
                    case "Gate2 : VAC Gate3":
                        return "wait for approval";
                        break;
                    case "Gate2 : PIC Gate3":
                        return "wait for approval";
                        break;
                    case "Gate3 : CAPEX-1":
                        return "draft";
                        break;
                    case "Gate3 : CAPEX-2":
                        return "wait for approval";
                        break;
                    case "Gate3 : CAPEX-3":
                        return "wait for review";
                        break;
                    case "IL3":
                        return "draft";
                    case "IL3-2":
                        return "draft";

                    default:
                        return "wait for approval";
                }
            }

            //initiativeSubmit Status == "approve"
            //forward
            if (initiativeTypeSubType.ProcessType == "cpi")
            {
                switch (nextStage)
                {
                    case "Initiative-1":
                        return "draft";
                    case null:
                        return "finish";
                    default:
                        return "wait for approval";
                }
            }

            if (initiativeTypeSubType.ProcessType == "dim")
            {
                if (initiativeTypeSubType.SubType == null)
                {
                    switch (nextStage)
                    {
                        case "Admin Check":
                            return "wait for approval";
                        case "Ideate-1":
                            return "wait for approval";
                        case "Ideate-2":
                            return "wait for approval";
                        case "Ideate-3":
                            return "wait for approval";
                        case "Ideate-4":
                            return "principle approved";
                        case "Ideate-5":
                            return "wait for approval";
                        case "Ideate-6":
                            return "wait for DIM approval";
                        case "Ideate-7":
                            return "wait for approval";
                        case "Ideate-8":
                            return "wait for approval";
                        case "Budget Team":
                            return "wait for review";
                        case "Implementing-1":
                            return "project planning";
                        case "Implementing-2":
                            return "baseline committed";
                        case "Implementing-3":
                            return "implementing in progress";
                        case "Adopt":
                            return "wait for approval";
                        case "Closure":
                            return "wait for approval";
                        case "Completed":
                            return "finish";
                        case null:
                            return "finish";
                        //return "";
                        default:
                            return "wait for approval";
                    }
                }
                else if (initiativeTypeSubType.SubType == "direct" || initiativeTypeSubType.SubType == "direct,indirect")
                {
                    switch (nextStage)
                    {
                        case "IL0":
                            return "draft";
                        case "Admin Check":
                            return "wait for approval";
                        case "Ideate SIL1-1":
                            return "wait for approval";
                        case "Ideate SIL1-2":
                            return "wait for approval";
                        case "Ideate SIL1-3":
                            return "wait for approval";
                        case "Ideate SIL1-4":
                            return "wait for approval";
                        case "Ideate IL1":
                            return "principle approved";
                        case "Ideate SIL2-1":
                            return "wait for approval";
                        case "Ideate SIL2-2":
                            return "wait for DIM approval";
                        case "Ideate SIL2-3":
                            return "wait for approval";
                        case "Ideate SIL2-4":
                            return "wait for approval";
                        //case "Implementing IL2-1":
                        //    return "approved";
                        case "Budget Team":
                            return "wait for review";
                        case "Implementing IL2":
                            return "project planning";
                        case "Implementing SIL3":
                            return "wait for approval";
                        case "Implementing IL3":
                            return "implementing in progress";
                        case "Adopt IL3":
                            return "adopt";
                        case "Adopt SIL4":
                            return "wait for approval";
                        case "Adopt IL4":
                            return "adopt";
                        case "Adopt SIL5":
                            return "wait for approval";
                        case "IL5":
                            return "approved";
                        case null:
                            return "finish";
                        default:
                            return "wait for approval";
                    }
                }
                else if (initiativeTypeSubType.SubType == "indirect")
                {
                    switch (nextStage)
                    {
                        case "IL0":
                            return "draft";
                        case "Admin Check":
                            return "wait for approval";
                        case "Ideate SIL1-1":
                            return "wait for approval";
                        case "Ideate SIL1-2":
                            return "wait for approval";
                        case "Ideate SIL1-3":
                            return "wait for approval";
                        case "Ideate IL1":
                            return "principle approved";
                        case "Ideate SIL2-1":
                            return "wait for approval";
                        case "Ideate SIL2-2":
                            return "wait for DIM approval";
                        case "Ideate SIL2-3":
                            return "wait for approval";
                        case "Ideate SIL2-4":
                            return "wait for approval";
                        //case "Implementing IL2-1":
                        //    return "approved";
                        case "Budget Team":
                            return "wait for review";
                        case "Implementing IL2":
                            return "project planning";
                        case "Implementing SIL3":
                            return "wait for approval";
                        case "Implementing IL3":
                            return "implementing in progress";
                        case "Adopt IL3":
                            return "adopt";
                        case "Adopt SIL4":
                            return "wait for approval";
                        case "IL4":
                            return "approved";
                        case null:
                            return "finish";
                        default:
                            return "wait for approval";
                    }
                }
            }

            if (initiativeTypeSubType.ProcessType == "pim")
            {
                switch (nextStage)
                {
                    case "Gate0 : Phase1-1":
                        return "draft";
                    case "Gate0 : Phase1-2":
                        return "draft";
                    case "Gate1 : Phase2":
                        return "draft";
                    case "Gate2 : CAPEX-1":
                        return "draft";
                    case "Gate2 : Phase3":
                        return "draft";
                    case "Gate3 : CAPEX-1":
                        return "draft";
                    case "Gate3 : Phase4":
                        return "draft";
                    case "Gate4 : Execution Lookback-1":
                        return "draft";

                    case "Gate2 : CAPEX-3":
                        return "wait for review";
                    case "Gate3 : CAPEX-3":
                        return "wait for review";

                    //case "Initiatives-1":
                    //    return "wait for approval";
                    //case "Initiatives-2":
                    //    return "wait for approval";
                    //case "Initiatives-3":
                    //    return "wait for approval";
                    //case "Gate0 : Phase1-1":
                    //    return "wait for approval";                    
                    //case "Gate0 : VAC Gate1":
                    //    return "wait for approval";
                    //case "Gate0 : Sub-PIC Gate1":
                    //    return "wait for approval";
                    //case "Gate1 : VAC Gate2":
                    //    return "wait for approval";
                    //case "Gate1 : PIC Gate2":
                    //    return "wait for approval";

                    //case "Gate2 : CAPEX-2":
                    //    return "";


                    //case "Gate2 : VAC Gate3":
                    //    return "";
                    //case "Gate2 : PIC Gate3":
                    //    return "";

                    //case "Gate3 : CAPEX-2":
                    //    return "";


                    //case "Gate3 : VAC Gate4":
                    //    return "";
                    //case "Gate3 : PIC Gate4":
                    //    return "";

                    //case "Gate4 : Execution Lookback-2":
                    //    return "";
                    //case "Gate4 : Execution Lookback-3":
                    //    return "";

                    case null:
                        return "finish";

                    default:
                        return "wait for approval";
                }
            }

            switch (nextStage)
            {
                case "Gate0 : VAC Gate1":
                    return "wait for approval";

                case "Gate0 : Sub-PIC Gate1":
                    return "wait for approval";

                case "IL3-1":
                    return "approved";

                case "IL3-2":
                    return "approved";

                case "App. Request":
                    return "wait for create App.";
                    break;
                case "BOD":

                    if (initiativeTypeSubType.ProcessType == "AddmoreCapex" && new string[] { "annual", "mid year", "pool budget" }.Contains(initiativeTypeSubType.SubType))
                        return "finish";

                    if (initiativeTypeSubType.ProcessType == "AddmoreCapex" && new string[] { "transfer", "contingency" }.Contains(initiativeTypeSubType.SubType))
                        return "finish";

                    return "wait for approval";
                    break;
                case "Budget Distribute":
                    return "wait for approval";
                    break;
                case "Budget Pool":

                    if (initiativeTypeSubType.ProcessType == "Request Pool" && initiativeTypeSubType.SubType == "noner")
                        return "finish";

                    return "wait for approval";
                    break;
                case "Budget Excellence Distribute":
                    return "wait for approval";
                    break;
                case "Budget Team":
                    return "wait for review";
                    break;
                case "DM":
                    return "wait for approval";
                    break;
                case "EVP/MD/SEVP/COE/PSD/CEO":
                    return "wait for approval";
                    break;
                case "IL0":
                    return "approved";
                    break;
                case "IL1":
                    return "approved";
                    break;
                case "IL2":
                    return "approved";
                    break;
                case "IL3":
                    return "approved";
                    break;
                case "IL4":
                    return "approved";
                    break;
                case "IL5":
                    return "approved";
                    break;
                case "SIL1":
                    return "wait for approval";
                    break;
                case "SIL2":
                    return "wait for approval";
                    break;
                case "SIL3":
                    return "wait for approval";
                    break;
                case "SIL4":
                    return "wait for approval";
                    break;
                case "SIL5":
                    return "wait for approval";
                    break;
                case "VP":
                    return "wait for approval";
                    break;
                case "waiting":
                    return "admin check";
                    break;
                case "WBS Request":
                    return "wait for create WBS";
                    break;
                case "Admin Check":
                    return "wait for approval";
                    break;

                case "First Review-1":
                    return "wait for approval";
                    break;

                case "First Review-2":
                    return "wait for approval";
                    break;

                case "Initiative-1":
                    return "";
                    break;

                case "Initiative-2":
                    return "wait for approval";
                    break;

                case "Pelim-1":
                    return "";
                    break;

                case "Pelim-2":
                    return "wait for approval";
                    break;

                case "Detail F/S-1":
                    return "";
                    break;

                case "Detail F/S-2":
                    return "wait for approval";
                    break;

                case "Detail F/S-3":
                    return "wait for approval";
                    break;

                case "Detail F/S-4":
                    return "wait for approval";
                    break;

                case "Detail F/S-5":
                    return "wait for approval";
                    break;

                case "Detail F/S-6":
                    return "wait for approval";
                    break;

                case "Detail F/S-7":
                    return "wait for approval";
                    break;

                case "Detail F/S-8":
                    return "wait for create";
                    break;

                case "BEP-1":
                    return "";
                    break;

                case "BEP-2":
                    return "wait for approval";
                    break;

                case "BEP-3":
                    return "wait for approval";
                    break;

                case "BEP-4":
                    return "wait for approval";
                    break;

                case "BEP-5":
                    return "wait for approval";
                    break;

                case "BEP-6":
                    return "wait for approval";
                    break;

                case "BEP-7":
                    return "wait for approval";
                    break;

                case "Seeking Potential-1":
                    return "";
                    break;

                case "Seeking Potential-2":
                    return "wait for approval";
                    break;

                case "Seeking Potential-3":
                    return "wait for approval";
                    break;

                case "Seeking Potential-4":
                    return "wait for approval";
                    break;

                case "Seeking Potential-5":
                    return "wait for approval";
                    break;

                case "Seeking Potential-6":
                    return "wait for approval";
                    break;

                case "Seeking Potential-7":
                    return "wait for approval";
                    break;

                case "Seeking Potential-8":
                    return "wait for create";
                    break;

                case "Pre-DD-1":
                    return "";
                    break;

                case "Pre-DD-2":
                    return "wait for approval";
                    break;

                case "Pre-DD-3":
                    return "wait for approval";
                    break;

                case "Pre-DD-4":
                    return "wait for approval";
                    break;

                case "Pre-DD-5":
                    return "wait for approval";
                    break;

                case "Pre-DD-6":
                    return "wait for approval";
                    break;

                case "Pre-DD-7":
                    return "wait for approval";
                    break;

                case "Pre-DD-8":
                    return "wait for create";
                    break;

                case "DD-1":
                    return "";
                    break;

                case "DD-2":
                    return "wait for approval";
                    break;

                case "DD-3":
                    return "wait for approval";
                    break;

                case "DD-4":
                    return "wait for approval";
                    break;

                case "DD-5":
                    return "wait for approval";
                    break;

                case "DD-6":
                    return "wait for approval";
                    break;

                case "DD-7":
                    return "wait for approval";
                    break;

                case "Execution-1":
                    return "";
                    break;

                case "Execution-2":
                    return "wait for update";
                    break;

                case "Execution-3":
                    return "draft";
                    break;

                case "Commercial Operation-1":
                    return "";
                    break;

                case "Commercial Operation-2":
                    return "wait for assign";
                    break;

                case "Commercial Operation-3":
                    return "wait for assign";
                    break;

                case "Commercial Operation-4":
                    return "draft";
                    break;

                case "Lookback-1":
                    return "draft";
                    break;

                case "Lookback-2":
                    return "draft";
                    break;

                case "Lookback-3":
                    return "wait for approval";
                    break;

                case "Lookback-4":
                    return "wait for approval";
                    break;

                case "Lookback-5":
                    return "wait for approval";
                    break;

                case "Closing-1":
                    return "";
                    break;

                case "Closing-2":
                    return "wait for assign";
                    break;

                case "Closing-3":
                    return "wait for assign";
                    break;

                case "Closing-4":
                    return "draft";
                    break;



                case null:
                    if (InitiativeTypeCapex.Contains(tempInitiativeType)) //Last Stage
                    {
                        return "finish";
                    }
                    else if (tempInitiativeType == "cim" || tempInitiativeType == "strategy" || tempInitiativeType == "IT" || tempInitiativeType == "Digital") //Last Stage
                    {
                        return "finish";
                    }
                    else
                    {
                        return "wait for approval";
                    }
                    break;

                default:
                    return "wait for approval";
                    break;
            }
        }

        public async Task<string> GetSubmitNextStage(int nowOrderStage, InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await GetInitiative(initiativeTypeSubType.InitiativeId);
            //if (new string[] { "max" }.Contains(initiativeTypeSubType.ProcessType))
            //{
            //    if (initiative.IsRequestCapex == true)
            //    {
            //        switch (initiative.Stage)
            //        {
            //            case "IL3":
            //                return "";
            //                break;

            //            case "Gate3 : CAPEX-2":
            //                return "";
            //                break;

            //            case "Gate3 : CAPEX-3":
            //                return "";
            //                break;

            //            case "Gate3 : Phase4":
            //                return "";
            //                break;

            //            case "Gate3 : VAC Gate4":
            //                return "";
            //                break;

            //            case "Gate3 : PIC Gate4":
            //                return "";
            //                break;

            //            default:
            //                break;
            //        }
            //    }
            //}



            nowOrderStage++;

            if (initiative.Stage == "Commercial Operation-4") nowOrderStage++;  // force to next step
            if (initiative.Stage == "Lookback-1") nowOrderStage++;  // force to next step
            if (initiative.Stage == "Lookback-2") nowOrderStage++;  // force to next step
            if (initiative.Stage == "Closing-4") nowOrderStage++;  // force to next step
            if (initiative.Stage == "Execution-1") nowOrderStage++;  // force to next step
            if (initiative.Stage == "Execution-2") nowOrderStage++;  // force to next step
            if (initiativeTypeSubType.ProcessType == "strategy" && initiative.Stage == "Initiative-1") nowOrderStage++;  // force to next step
            if (initiativeTypeSubType.ProcessType == "pim" && new string[] { "Gate0 : Phase1-1", "Gate0 : Phase1-2", "Gate1 : Phase2", "Gate2 : CAPEX-1", "Gate2 : Phase3", "Gate3 : CAPEX-1", "Gate3 : Phase4", "Gate4 : Execution Lookback-1" }.Contains(initiative.Stage) == false) nowOrderStage--; //do not to next stage submit after revised
            //if (initiativeTypeSubType.ProcessType.Contains("max") && initiativeTypeSubType.SubType == "gate1" && initiative.Stage == "IL3" && (initiative.IsPassPimGate1 != null && initiative.IsPassPimGate1 > 0)) nowOrderStage = 12;  // pim approved  then skip pim gate 1 in max process   -- force to SIL4

            if (initiative.Stage == "Ideate-3")
            {
                if ((
                    (initiative.CostEstCapex == null ? 0 : initiative.CostEstCapex)
                    + (initiative.CostEstOpex == null ? 0 : initiative.CostEstOpex)
                    ) < 10)
                {
                    nowOrderStage++;
                    // if money more than 10 million then skip SVP approver  *only DIM
                }
            }

            var nextStage = await _context.TypeStage.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Order == nowOrderStage).FirstOrDefaultAsync();
            if (nextStage != null)
            {
                return nextStage.Stage;
            }
            return null;
        }
        public async Task<string> GetSubmitNextStatus(InitiativeTypeSubType initiativeTypeSubType, InitiativeSubmitStageStatus initiativeSubmitStageStatus, string nowStage)
        {
            var initiative = await GetInitiative(initiativeTypeSubType.InitiativeId);
            switch (initiativeSubmitStageStatus.Status)
            {
                case "backward":
                    return "draft";
                    break;

                case "cancelled":
                    if (initiativeTypeSubType.ProcessType.Contains("max") == true || initiativeTypeSubType.ProcessType == "strategy" || initiativeTypeSubType.ProcessType == "pim")
                    {
                        return "wait for cancellation";
                    }
                    else
                    {
                        return "cancelled";
                    }
                    break;
                default:
                    //forward

                    if (initiativeTypeSubType.ProcessType == "pimcapex")
                    {
                        switch (nowStage)
                        {
                            case "IL3":
                                return "wait for approval";

                            case "IL3-2":
                                return "wait for approval";

                            case "Gate2 : VAC Gate3":
                                return "wait for approval";
                                break;
                            case "Gate2 : PIC Gate3":
                                return "draft";
                                break;
                            case "Gate3 : CAPEX-1":
                                return "wait for approval";
                                break;
                            case "Gate3 : CAPEX-2":
                                return "wait for review";
                                break;
                            case "Gate3 : CAPEX-3":
                                return "wait for review";
                                break;

                            default:
                                return "wait for approval";
                        }
                    }

                    if (initiativeTypeSubType.ProcessType == "cpi")
                    {
                        switch (nowStage)
                        {
                            default:
                                return "wait for approval";
                        }
                    }

                    if (initiativeTypeSubType.ProcessType == "dim")
                    {
                        if (initiativeTypeSubType.SubType == null)
                        {
                            switch (nowStage)
                            {
                                case "Admin Check":
                                    return "wait for approval";
                                case "Ideate-1":
                                    return "wait for approval";
                                case "Ideate-2":
                                    return "wait for approval";
                                case "Ideate-3":
                                    return "wait for approval";
                                case "Ideate-4":
                                    return "wait for approval";
                                case "Ideate-5":
                                    return "wait for approval";
                                case "Ideate-6":
                                    return "wait for DIM approval";
                                case "Ideate-7":
                                    return "wait for approval";
                                case "Ideate-8":
                                    return "wait for approval";
                                case "Budget Team":
                                    return "wait for review";
                                case "Implementing-1":
                                    return "project planning";
                                case "Implementing-2":
                                    return "baseline committed";
                                case "Implementing-3":
                                    return "adopt";
                                case "Adopt":
                                    return "wait for approval";
                                case "Closure":
                                    return "wait for approval";
                                case "Completed":
                                //return "";
                                default:
                                    return "wait for approval";
                            }
                        }
                        else if (initiativeTypeSubType.SubType == "direct" || initiativeTypeSubType.SubType == "direct,indirect")
                        {
                            switch (nowStage)
                            {
                                case "IL0":
                                    return "wait for approval";
                                case "Admin Check":
                                    return "wait for approval";
                                case "Ideate SIL1-1":
                                    return "wait for approval";
                                case "Ideate SIL1-2":
                                    return "wait for approval";
                                case "Ideate SIL1-3":
                                    return "wait for approval";
                                case "Ideate SIL1-4":
                                    return "wait for approval";
                                case "Ideate IL1":
                                    return "wait for approval";
                                case "Ideate SIL2-1":
                                    return "wait for approval";
                                case "Ideate SIL2-2":
                                    return "wait for DIM approval";
                                case "Ideate SIL2-3":
                                    return "wait for approval";
                                case "Ideate SIL2-4":
                                    return "wait for approval";
                                //case "Implementing IL2-1":
                                //    return "wait for review";
                                case "Budget Team":
                                    return "wait for review";
                                case "Implementing IL2":
                                    return "wait for approval";
                                case "Implementing SIL3":
                                    return "wait for approval";
                                case "Implementing IL3":
                                    return "adopt";
                                case "Adopt IL3":
                                    return "wait for approval";
                                case "Adopt SIL4":
                                    return "wait for approval";
                                case "Adopt IL4":
                                    return "wait for approval";
                                case "Adopt SIL5":
                                    return "wait for approval";
                                case "IL5":
                                    return "approved";
                                case "draft":
                                    return "draft";
                                case null:
                                    return "draft";
                                default:
                                    return "wait for approval";
                            }
                        }
                        else if (initiativeTypeSubType.SubType == "indirect")
                        {
                            switch (nowStage)
                            {
                                case "IL0":
                                    return "wait for approval";
                                case "Admin Check":
                                    return "wait for approval";
                                case "Ideate SIL1-1":
                                    return "wait for approval";
                                case "Ideate SIL1-2":
                                    return "wait for approval";
                                case "Ideate SIL1-3":
                                    return "wait for approval";
                                case "Ideate IL1":
                                    return "wait for approval";
                                case "Ideate SIL2-1":
                                    return "wait for approval";
                                case "Ideate SIL2-2":
                                    return "wait for DIM approval";
                                case "Ideate SIL2-3":
                                    return "wait for approval";
                                case "Ideate SIL2-4":
                                    return "wait for approval";
                                //case "Implementing IL2-1":
                                //    return "wait for review";
                                case "Budget Team":
                                    return "wait for review";
                                case "Implementing IL2":
                                    return "wait for approval";
                                case "Implementing SIL3":
                                    return "wait for approval";
                                case "Implementing IL3":
                                    return "adopt";
                                case "Adopt IL3":
                                    return "wait for approval";
                                case "Adopt SIL4":
                                    return "wait for approval";
                                case "IL4":
                                    return "approved";
                                case "draft":
                                    return "draft";
                                case null:
                                    return "draft";
                                default:
                                    return "wait for approval";
                            }
                        }
                    }

                    if (initiativeTypeSubType.ProcessType == "pim")
                    {
                        switch (nowStage)
                        {
                            //case "Initiative-1":
                            //    return "wait for approval";

                            //case "Initiative-2":
                            //    return "wait for approval";

                            //case "Initiative-3":
                            //    return "wait for approval";

                            case "Gate0 : Phase1-1":
                                return "draft";

                            //case "Gate0 : Phase1-2":
                            //    return "wait for approval";

                            //case "Gate0 : VAC Gate1":
                            //    return "wait for approval";

                            //case "Gate0 : Sub-PIC Gate1":
                            //    return "wait for approval";

                            //case "Gate1 : Phase2":
                            //    return "draft";

                            //case "Gate1 : Phase2-2":
                            //    return "wait for approval";

                            //case "Gate1 : VAC Gate2":
                            //    return "wait for approval";

                            //case "Gate1 : PIC Gate2":
                            //    return "wait for approval";

                            //case "Gate2 : CAPEX-1":
                            //    return "wait for approval";

                            //case "Gate2 : CAPEX-2":
                            //    return "wait for approval";

                            //case "Gate2 : CAPEX-3":
                            //    return "wait for approval";  // stop here  wait for requrement

                            default:
                                return "wait for approval";
                        }
                    }

                    switch (nowStage)
                    {
                        case "Gate1 : Phase2":
                            return "draft";

                        case "App. Request":
                            return "wait for create App.";
                            break;
                        case "BOD":
                            return "wait for approval";
                            break;
                        case "Budget Distribute":
                            return "wait for approval";
                            break;
                        case "Budget Pool":
                            return "wait for approval";
                            break;
                        case "Budget Excellence Distribute":
                            return "wait for approval";
                            break;
                        case "Budget Team":
                            return "wait for review";
                            break;
                        case "DM":
                            return "wait for approval";
                            break;
                        case "EVP/MD/SEVP/COE/PSD/CEO":
                            return "wait for approval";
                            break;
                        case "IL0":
                            return "wait for approval";
                            break;
                        case "IL1":
                            return "wait for approval";
                            break;
                        case "IL2":
                            return "wait for approval";
                            break;
                        case "IL3-1":
                            return "wait for approval";
                        case "IL3-2":
                            return "wait for approval";
                        case "IL3":
                            return "wait for approval";
                            break;
                        case "IL4":
                            return "wait for approval";
                            break;
                        case "IL5":
                            return "wait for approval";
                            break;
                        case "SIL1":
                            return "wait for approval";
                            break;
                        case "SIL2":
                            return "wait for approval";
                            break;
                        case "SIL3":
                            return "wait for approval";
                            break;
                        case "SIL4":
                            return "wait for approval";
                            break;
                        case "SIL5":
                            return "wait for approval";
                            break;
                        case "VP":
                            return "wait for approval";
                            break;
                        case "waiting":
                            return "admin check";
                            break;
                        case "WBS Request":
                            return "wait for create WBS";
                            break;
                        case "Admin Check":
                            return "wait for approval";
                            break;

                        case "First Review":
                            return "wait for approval";
                            break;

                        case "Initiative":
                            return "wait for approval";
                            break;

                        case "Detail F/S":
                            return "wait for approval";
                            break;

                        case "BEP":
                            return "";
                            break;

                        case "Execution-1":
                            return "wait for update";
                            break;

                        case "Execution-2":
                            return "draft";
                            break;

                        case "Commercial Operation-1":
                            return "wait for assign";
                            break;

                        case "Commercial Operation-2":
                            return "wait for assign";
                            break;

                        case "Commercial Operation-3":
                            return "wait for assign";
                            break;

                        case "Commercial Operation-4":
                            return "draft";
                            break;

                        case "Closing-4":
                            return "draft";
                            break;

                        case "Lookback-1":
                            return "draft";
                            break;

                        case "Lookback-2":
                            return "wait for approval";
                            break;

                        case "Initiative-1":
                            if (initiativeTypeSubType.ProcessType == "strategy")
                                return "wait for approval";

                            return "wait for approval";
                            break;

                        case "Initiative-2":
                            return "wait for approval";
                            break;

                        default:
                            return "wait for approval";
                            break;
                    }
                    break;
            }
        }
        public async Task<string> GetSubmitBackwardStage(int nowOrderStage, InitiativeTypeSubType initiativeTypeSubType)
        {
            nowOrderStage--;
            if (nowOrderStage <= 0) nowOrderStage = 1;
            var nextStage = await _context.TypeStage.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Order == nowOrderStage).FirstOrDefaultAsync();
            if (nextStage != null)
            {
                return nextStage.Stage;
            }
            return null;
        }
        public async Task<string> GetFirstStageApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            var firstStage = await _context.TypeStage.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Order == (initiativeTypeSubType.ProcessType.Contains("max") == true ? 2 : 1)).FirstOrDefaultAsync();
            var firstApproverStage = await _context.TypeStageApprover.Where(i => i.Stage == firstStage.Stage && i.SubType == firstStage.SubType).FirstOrDefaultAsync();

            return firstApproverStage.Stage;
        }

        public async Task<Owner> GetDMApproverFromInitiativeDetail(int initiativeId)
        {
            var initiativeDetail = await _context.InitiativeDetails.Where(i => i.InitiativeId == initiativeId).FirstOrDefaultAsync();
            var returnDM = await _context.Owners.Where(i => i.OwnerName == initiativeDetail.Manager).FirstOrDefaultAsync();

            return returnDM;
        }
        public async Task<Owner> GetVPApproverFromInitiativeDetail(int initiativeId)
        {
            var initiativeDetail = await _context.InitiativeDetails.Where(i => i.InitiativeId == initiativeId).FirstOrDefaultAsync();
            var returnVP = await _context.Owners.Where(i => i.OwnerName == initiativeDetail.President).FirstOrDefaultAsync();

            return returnVP;
        }
        public async Task<Owner> GetDMApproverFromDetailInformation(int initiativeId)
        {
            var initiativeDetail = await _context.DetailInformations.Where(i => i.InitiativeId == initiativeId).FirstOrDefaultAsync();
            var returnDM = await _context.Owners.Where(i => i.OwnerName == initiativeDetail.Manager).FirstOrDefaultAsync();

            return returnDM;
        }
        public async Task<Owner> GetVPApproverFromDetailInformation(int initiativeId)
        {
            var initiativeDetail = await _context.DetailInformations.Where(i => i.InitiativeId == initiativeId).FirstOrDefaultAsync();
            var returnVP = await _context.Owners.Where(i => i.OwnerName == initiativeDetail.President).FirstOrDefaultAsync();

            return returnVP;
        }

        public async Task<int> UpdateInitiativeTypeFromFlag(int initiativeId)
        {
            //TODO : (Mail Lookback) Insert Send Mail for Lookback on Draft

            await SendEmailLookback(initiativeId, "", "", "", "Draft");

            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeId).FirstOrDefaultAsync();
            if (
                (initiative.Cim == null ? false : initiative.Cim) != false ||
                (initiative.Pim == null ? false : initiative.Pim) != false ||
                (initiative.Dim == null ? false : initiative.Dim) != false ||
                (initiative.DirectCapex == null ? false : initiative.DirectCapex) != false ||
                (initiative.Cpi == null ? false : initiative.Cpi) != false ||
                (initiative.Strategy == null ? false : initiative.Strategy) != false ||
                (initiative.RandD == null ? false : initiative.RandD) != false ||
                (initiative.Other == null ? false : initiative.Other) != false ||
                (initiative.Max == null ? false : initiative.Max) != false
                )
            {
                //Temporary
                var tmpInitiativeType = initiative.InitiativeType;
                initiative.InitiativeType = "";
                if (initiative.Cim == true) initiative.InitiativeType += "cim,";
                if (initiative.Pim == true) initiative.InitiativeType += "pim,";
                if (initiative.Dim == true) initiative.InitiativeType += "dim,";
                if (initiative.DirectCapex == true) initiative.InitiativeType += "directCapex,";
                if (initiative.Cpi == true) initiative.InitiativeType += "cpi,";
                if (initiative.Strategy == true) initiative.InitiativeType += "strategy,";
                if (initiative.RandD == true) initiative.InitiativeType += "randD,";
                if (initiative.Other == true) initiative.InitiativeType += "other,";
                if (initiative.Max == true) initiative.InitiativeType += "max,";

                initiative.InitiativeType += "|";
                initiative.InitiativeType = initiative.InitiativeType.Replace(",|", "");

                if (tmpInitiativeType == initiative.InitiativeType) return 0;

                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(initiative, "Initiative-7202", SQLCommandType.INSERT);
                // End log

                return await _context.SaveChangesAsync();
            }
            //Cim Pim Dim Max DirectCapex Cpi Strategy RandD   Other
            return 0;
        }

        public async Task<int> ChangeApproverStatusTrackingFromSetActionBy_NOMAX(Initiative initiative, InitiativeTypeSubType initiativeTypeSubType)
        {
            string[] exceptInitiativeType;

            if (flagDimCapex == true)
            {
                exceptInitiativeType = new string[] { "cim", "strategy", "pim", "cpi", "pimcapex", "dim" };
            }
            else
            {
                exceptInitiativeType = new string[] { "cim", "strategy", "pim", "cpi", "pimcapex" };
            }

            //string[] exceptInitiativeType = { "cim", "strategy", "pim", "cpi", "pimcapex" }; //#Tempolary for Go-live New Structure   remove "dim"    
            //string[] exceptInitiativeType = { "cim", "strategy", "pim", "cpi", "pimcapex", "dim" }; //#Tempolary for Go-live New Structure   remove "dim"    
            if (exceptInitiativeType.Contains(initiativeTypeSubType.ProcessType) == false)
                return 0;

            if (initiative.Status == "finish")
                return 0;

            var initiativeType = initiativeTypeSubType.ProcessType == null ? "max" : initiativeTypeSubType.ProcessType;
            var initiativeStage = initiative.Stage;
            string subType = initiativeTypeSubType.SubType;

            var checkIsApproverStage = await _context.TypeStageApprover.Where(i => i.Stage == initiative.Stage && i.Type == initiativeType && i.SubType == subType).FirstOrDefaultAsync();
            if (checkIsApproverStage == null)
                return 0;


            var setActionByApprovers = await _context.InitiativeActions.Where(i => i.InitiativeId == initiative.Id && i.Action == "approve" && i.Stage == initiativeStage).ToListAsync();

            if (!setActionByApprovers.Any())
                return 0;


            var _lastHistoryId = await LastHistoryId(initiative.Id);
            var nowApproverOnStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.ProcessType == initiativeType && i.Stage == initiativeStage && i.SubType == subType).OrderByDescending(i => i.Sequence).ToListAsync();
            decimal? newSequence = 0;
            decimal? newRunningSequence = 0;
            foreach (var entity in nowApproverOnStatusTracking)
            {
                newSequence = entity.Sequence; //get smallest sequence for add in new approver sequence
                newRunningSequence = entity.RunningSequence;
                _context.InitiativeStatusTrackings.Remove(entity);
            } // remove old approvers

            var statusTrackingForSetNewSequence = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && i.Sequence >= newSequence).OrderBy(i => i.Sequence).ToListAsync();



            foreach (var entity in setActionByApprovers)
            {
                var approverName = await _context.Owners.Where(i => i.Email == entity.ActionBy).FirstOrDefaultAsync();

                _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                {
                    Sequence = newSequence,
                    HistoryId = _lastHistoryId,
                    InitiativeId = initiative.Id,
                    Stage = entity.Stage,
                    Status = "In Progress",
                    ProcessType = initiativeType,
                    ApprovedBy = (approverName == null ? entity.ActionBy : approverName.OwnerName),
                    SubType = subType,
                    RunningSequence = newRunningSequence
                });

                newSequence++;
                newRunningSequence++;
            }

            foreach (var entity in statusTrackingForSetNewSequence)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(entity, "Initiative-7286", SQLCommandType.UPDATE, false);
                // End log

                entity.Sequence = newSequence;
                entity.RunningSequence = newRunningSequence;
                newSequence++;
                newRunningSequence++;

                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(entity, "Initiative-7295", SQLCommandType.UPDATE, true);
                // End log

            }

            return await _context.SaveChangesAsync();
        }

        public async Task<Owner> BudgetTeamApprover_CIM(InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();
            var initiativeType = initiative.InitiativeType.Contains("max") == true ? "directCapex" : initiativeTypeSubType.ProcessType;

            //CommonData  where  company Name from Initiatives
            var companyCode = await _context.CommonData.Where(i => i.DataType == "company" && (i.Attribute01 == initiative.Company || i.Attribute03 == initiative.Company)).FirstOrDefaultAsync();

            if (companyCode == null)
                return null;

            var budgetanalyst = await _context.CommonData.Where(i => i.DataType == "budgetanalyst" && i.Attribute03 == "Y" && i.Attribute02 == companyCode.Attribute01).FirstOrDefaultAsync();

            if (budgetanalyst == null)
                return null;

            var BudgetTeam = await _context.Owners.Where(i => i.EmployeeID == budgetanalyst.Attribute01).FirstOrDefaultAsync();

            if (BudgetTeam == null)
                return null;

            return BudgetTeam;
        }

        public async Task<Owner> VPOrgChartApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();
            if (isOldApproveCapex == true)
            {
                var approver = await _context.TypeStageApprover.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Stage == "VP").Select(i => i.Approver).FirstOrDefaultAsync();
                return await _context.Owners.Where(i => i.Email.ToLower() == approver.ToLower()).FirstOrDefaultAsync();
            }

            var owner = await _context.Owners.Where(i => i.OwnerName == initiative.OwnerName).FirstOrDefaultAsync();
            Owner VP = new Owner();

            VP = await _context.Owners.Where(i => i.EmployeeID == owner.DepManagerEmpID.ToString()).FirstOrDefaultAsync();

            //get evp if null
            if (VP == null)
                VP = await _context.Owners.Where(i => i.EmployeeID == owner.FNManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (VP == null)
                VP = await _context.Owners.Where(i => i.EmployeeID == owner.FNGRPManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (VP == null)
                VP = await _context.Owners.Where(i => i.EmployeeID == owner.PSDManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (VP == null)
                VP = await _context.Owners.Where(i => i.EmployeeID == owner.CEOManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (VP == null)
            {
                var approver = await _context.TypeStageApprover.Where(i => i.Stage == "VP" && i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType).FirstOrDefaultAsync();
                VP = await _context.Owners.Where(i => i.Email.ToLower() == approver.Approver.ToLower()).FirstOrDefaultAsync();
            }

            return VP;
        }

        public async Task<Owner> EVPOrgChartApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();
            //if (isOldApproveCapex == true)
            //{
            //    var approver = await _context.TypeStageApprover.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Stage == "VP").Select(i => i.Approver).FirstOrDefaultAsync();
            //    return await _context.Owners.Where(i => i.Email.ToLower() == approver.ToLower()).FirstOrDefaultAsync();
            //}

            var owner = await _context.Owners.Where(i => i.OwnerName == initiative.OwnerName).FirstOrDefaultAsync();
            Owner EVP = new Owner();

            EVP = await _context.Owners.Where(i => i.EmployeeID == owner.FNManagerEmpID.ToString()).FirstOrDefaultAsync();


            if (EVP == null)
                EVP = await _context.Owners.Where(i => i.EmployeeID == owner.FNGRPManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (EVP == null)
                EVP = await _context.Owners.Where(i => i.EmployeeID == owner.PSDManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (EVP == null)
                EVP = await _context.Owners.Where(i => i.EmployeeID == owner.CEOManagerEmpID.ToString()).FirstOrDefaultAsync();

            return EVP;
        }

        public async Task<Owner> GetOrgChartApproverByStage(InitiativeTypeSubType initiativeTypeSubType, string stage)
        {
            switch (stage)
            {
                case "DM":
                    return await DMApprover(initiativeTypeSubType);

                case "VP":
                    return await VPOrgChartApprover(initiativeTypeSubType);

                default:
                    return null;
            }
        }

        public async Task<string[]> GetInitiativeTypeCapex()
        {
            return await Task.FromResult(InitiativeTypeCapex);
        }

        public async Task<InitiativeActionStatusFromActionBy> GetInitiativeActionStatusFromActionBy(int initiativeId)
        {
            var action = await _context.InitiativeActions.Where(i => i.InitiativeId == initiativeId).OrderByDescending(i => i.Id).Select(i => i.Action).FirstOrDefaultAsync();
            if (action == null) action = "";
            return await Task.FromResult(new InitiativeActionStatusFromActionBy()
            {
                Status = action
            });
        }

        public async Task<int> RunStoreProcedureFixValueMissing(int initiativeId)
        {
            try { await _storeProcedure.Execute_NoReturn("EXEC sp_FIX_InCode"); } catch { };
            return 0;
        }

        public async Task<int> UpdateByUser(int initiativeId, string user)
        {
            try
            {
                var data = await _context.Initiatives.FirstOrDefaultAsync(x => x.Id == initiativeId);
                var historyData = await _context.Initiatives.Where(x => x.InitiativeCode == data.InitiativeCode && x.HistoryFlag == 1).OrderByDescending(o => o.Id).FirstOrDefaultAsync();
                data.UpdatedBy = user;
                _context.Initiatives.Update(data);

                InitiativeHistoryIndex initiativeHistoryIndex = new InitiativeHistoryIndex()
                {
                    InitiativeCode = data.InitiativeCode,
                    Stage = historyData != null ? historyData.Stage : data.Stage,
                    Status = historyData != null ? historyData.Status : data.Status,
                    SubmittedBy = user,
                    SubmittedDate = DateTime.Now,
                    InitiativeIdMain = initiativeId,
                    InitiativeIdHistory = historyData != null ? historyData.Id : data.Id
                };
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(initiativeHistoryIndex, "Initiative-7446", SQLCommandType.INSERT);
                // End log


                await _context.InitiativeHistoryIndex.AddAsync(initiativeHistoryIndex);
                int result = await _context.SaveChangesAsync();
                return result;
            }
            catch (Exception ex)
            {
                return await _context.SaveChangesAsync();

            }
        }

        public async Task<int> UpdateSubType(int initiativeId)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeId).FirstOrDefaultAsync();
            var subType = await GetSubType(initiativeId);
            if (initiative.isSetInitiativeSubType != 1)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(initiative, "Initiative-7467", SQLCommandType.UPDATE, false);
                // End log

                initiative.isSetInitiativeSubType = 1;
                initiative.InitiativeSubType = subType;
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(initiative, "Initiative-7473", SQLCommandType.UPDATE, true);
                // End log

            }

            return await _context.SaveChangesAsync();
        }

        public async Task<string> GetSubTypeFromInitiative(int initiativeId)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeId).FirstOrDefaultAsync();

            if (await GetProcessType(initiativeId) == "AddmoreCapex" && flagNewApprovalSystem == false) //temporary for add more capex --- directCapex
            {
                return await GetSubType(initiativeId);
            }

            return initiative.InitiativeSubType;
        }

        public async Task<decimal> GetCostEstCapexAndCostEstOpex(int initiativeId)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeId).FirstOrDefaultAsync();

            decimal costEstCapex = 0;
            decimal costEstOpex = 0;
            decimal FXcurrency = 1;
            if (initiative.RequestCapex != null && initiative.RequestCapex.ToLower() == "true")
            {
                if (initiative.CostEstCapexType != null && initiative.CostEstCapexType == "USD")
                    FXcurrency = initiative.FxExchange == null ? 1 : initiative.FxExchange.Value;

                costEstCapex = (initiative.CostEstCapex == null ? 0 : initiative.CostEstCapex.Value) * FXcurrency;
            }

            if (initiative.RequestOpex != null && initiative.RequestOpex.ToLower() == "trueopex")
            {
                if (initiative.CostEstOpexType != null && initiative.CostEstOpexType == "USD")
                    FXcurrency = initiative.FxExchange == null ? 1 : initiative.FxExchange.Value;

                costEstOpex = (initiative.CostEstOpex == null ? 0 : initiative.CostEstOpex.Value) * FXcurrency;
            }

            return costEstCapex + costEstOpex;

        }

        public async Task<string> GetNowStageByOrder(int nowOrderStage, InitiativeTypeSubType initiativeTypeSubType)
        {
            var nowStage = await _context.TypeStage.Where(i => i.Type == initiativeTypeSubType.ProcessType && i.SubType == initiativeTypeSubType.SubType && i.Order == nowOrderStage).FirstOrDefaultAsync();

            if (nowStage != null)
            {
                return nowStage.Stage;
            }
            return null;
        }

        public async Task<string> CheckApproverPosition(int initiativeId, string approverEmail)
        {
            var actionBys = await _context.InitiativeActions.Where(i => i.InitiativeId == initiativeId && i.ActionBy == approverEmail).FirstOrDefaultAsync();

            if (actionBys != null)
                return actionBys.Position;

            return "";
        }

        public async Task<int> RemoveActionBy_ByPosition(int initiativeId, string position, string approverEmail, string updateStage)
        {
            var actionBys = await _context.InitiativeActions.Where(i => i.InitiativeId == initiativeId && i.Stage == updateStage && i.Position == position && i.ActionBy == approverEmail).ToListAsync();

            foreach (var entity in actionBys)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(entity, "Initiative-7548", SQLCommandType.UPDATE, false);
                // End log

                await RemoveInitiativeActions(initiativeId, entity.ActionBy);

                var approverName = await _context.Owners.Where(i => i.Email == entity.ActionBy).ToListAsync();

                foreach (var owner in approverName)
                {
                    var nowApproverOnStatusTracking = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiativeId
                                                                                                    && (i.ApprovedBy == (approverName == null ? "" : owner.OwnerName) || i.ApprovedBy == entity.ActionBy)
                                                                                                    && i.Stage == updateStage
                                                                                                    ).OrderByDescending(i => i.Sequence).ToListAsync();

                    foreach (var statustracking in nowApproverOnStatusTracking)
                    {
                        statustracking.ApprovedDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss", new System.Globalization.CultureInfo("en-US"));
                        statustracking.Status = "Complete";

                        break;
                    }
                }
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(entity, "Initiative-7571", SQLCommandType.UPDATE, true);
                // End log

            }

            return await _context.SaveChangesAsync();
        }
        public async Task<FileStreamResult> PrintData(int id)
        {
            // call some stored and generate excel
            DataSet ds = new DataSet();
            var initiative = await _context.Initiatives.Where(i => i.Id == id).FirstOrDefaultAsync();
            string fileName = $"{initiative.InitiativeCode}-{DateTime.Now:yyyy-MM-dd-HH-mm-ss}";
            try
            {
                ds = await _storeProcedure.ExecuteReturnDataSet($"EXEC sp_PrintInitiative {id}");
            }
            catch (Exception ex)
            {

            }


            var stream = new MemoryStream();
            IWorkbook workbook = new XSSFWorkbook();
            ISheet sheet;
            if (ds.Tables.Count <= 0)
            {
                sheet = workbook.CreateSheet("Print");
                IRow row = sheet.CreateRow(0);
                ICell cell = row.CreateCell(0);
                cell.SetCellValue("No Data Found.");

                workbook.Write(stream);

                return new FileStreamResult(new MemoryStream(stream.ToArray()), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") { FileDownloadName = fileName };
            }


            foreach (DataTable dt in ds.Tables)
            {
                if (dt.Rows.Count <= 0)
                    continue;


                sheet = workbook.CreateSheet((string)dt.Rows[0][0]);

                IFont bigWhite = workbook.CreateFont();
                bigWhite.Color = HSSFColor.White.Index;
                bigWhite.IsBold = true;
                bigWhite.FontHeightInPoints = 10;
                bigWhite.FontName = "Calibri";

                ICellStyle styleHead_bgBlue = workbook.CreateCellStyle();
                styleHead_bgBlue.FillForegroundColor = HSSFColor.LightBlue.Index;
                styleHead_bgBlue.FillPattern = FillPattern.SolidForeground;
                styleHead_bgBlue.Alignment = HorizontalAlignment.Center;
                styleHead_bgBlue.BorderTop = BorderStyle.Medium;
                styleHead_bgBlue.BorderLeft = BorderStyle.Medium;
                styleHead_bgBlue.BorderRight = BorderStyle.Medium;
                styleHead_bgBlue.BorderBottom = BorderStyle.Medium;
                styleHead_bgBlue.SetFont(bigWhite);

                ICellStyle cellWithBorder = workbook.CreateCellStyle();
                cellWithBorder.BorderTop = BorderStyle.Thin;
                cellWithBorder.BorderLeft = BorderStyle.Thin;
                cellWithBorder.BorderRight = BorderStyle.Thin;
                cellWithBorder.BorderBottom = BorderStyle.Thin;

                for (int i = 0; i < dt.Rows.Count; i++)
                { // loop row
                    IRow row = sheet.CreateRow(i + 1);

                    if (i == 0)// create column header
                    {
                        IRow rowHeader = sheet.CreateRow(0);
                        for (int j = 1; j < dt.Columns.Count; j++)
                        { // loop column
                            ICell cellHeader = rowHeader.CreateCell(j - 1);
                            cellHeader.CellStyle = styleHead_bgBlue;
                            if (dt.Columns[j].ColumnName != null)
                                cellHeader.SetCellValue(dt.Columns[j].ColumnName.ToString());
                        }
                    }

                    for (int j = 1; j < dt.Columns.Count; j++)
                    { // loop column
                        ICell cell = row.CreateCell(j - 1);
                        cell.CellStyle = cellWithBorder;
                        if (dt.Rows[i][j] != null)
                            cell.SetCellValue(dt.Rows[i][j].ToString());
                    }
                }


                List<int?> maximumLengthForColumns =
               Enumerable.Range(0, dt.Columns.Count)
                 .Select(col => dt.AsEnumerable()
                                         .Select(row => row[col]).OfType<string>()
                                         .Max(val => val?.Length)).ToList();

                for (int i = 0; i < dt.Columns.Count; i++)
                {
                    //set auto column
                    if (maximumLengthForColumns[i] == null) maximumLengthForColumns[i] = dt.Columns[i].ColumnName.Length;  //if no string then use column length
                    if (maximumLengthForColumns[i] < dt.Columns[i].ColumnName.Length) maximumLengthForColumns[i] = dt.Columns[i].ColumnName.Length;   //if string less than column name then use column length

                    int width = ((int)(maximumLengthForColumns[i] * 1.14388)) * 256;
                    if (width > 65280) width = 65280; //maximum width of excel
                    sheet.SetColumnWidth(i, width);
                }

                sheet.CreateFreezePane(0, 1);
            }



            workbook.Write(stream);
            return new FileStreamResult(new MemoryStream(stream.ToArray()), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") { FileDownloadName = fileName };
        }

        public async Task<int> DuplicateInitiative(int id, string code, string userName)
        {
            var initiative = await _context.Initiatives.Where(x => x.Id.Equals(id)).FirstOrDefaultAsync();
            var initiativeCoDev = await _context.InitiativeCoDevelopers.Where(x => x.InitiativeId.Equals(id)).ToListAsync();
            var creator = await _context.Owners.Where(x => x.OwnerName.Equals(initiative.OwnerName)).FirstOrDefaultAsync();
            var ownerName = await _context.Owners.Where(x => x.Email.ToUpper().Equals(userName.ToUpper())).FirstOrDefaultAsync();
            var intiativeIdNew = string.Empty;
            try
            {
                //intiativeIdNew =  await _storeProcedure.Execute_NoReturn($"EXEC sp_DuplicateInitiative {id}  {code}");
                if (initiative.InitiativeType.Equals("IT") || initiative.InitiativeType.Equals("Digital"))
                {

                    Initiative newInitiative = new Initiative()
                    {
                        Id = 0,
                        InitiativeCode = code,
                        Name = initiative.Name,
                        Year = initiative.Year,
                        PoolType = initiative.PoolType,
                        OwnerName = ownerName.OwnerName,
                        Organization = initiative.Organization,
                        Integration = initiative.Integration,
                        Company = initiative.Company,
                        SpecifyCompany = initiative.SpecifyCompany,
                        Plant = initiative.Plant,
                        SpecifyPlant = initiative.SpecifyPlant,
                        Location = initiative.Location,
                        SpecifyLocation = initiative.SpecifyLocation,
                        RegisteringDate = null,
                        StartingDate = null,
                        FinishingDate = null,
                        Background = initiative.Background,
                        ResultObjective = initiative.ResultObjective,
                        ScopeOfWork = initiative.ScopeOfWork,
                        Remark = initiative.Remark,
                        InitiativeType = null,
                        RequestCapex = "true",
                        CostEstCapex = initiative.CostEstCapex,
                        CostEstCapexType = initiative.CostEstCapexType,
                        BudgetSource = "Capex",
                        RequestOpex = Convert.ToDecimal(initiative.CostEstOpex) > 0 ? "trueOpex" : "falseOpex",
                        CostEstOpex = initiative.CostEstOpex,
                        CostEstOpexType = initiative.CostEstOpexType,
                        TypeOfInvestment = initiative.InitiativeType.Equals("IT") ? "IT CAPEX" : "Digital CAPEX",
                        Divestment = initiative.Divestment,
                        InvolveItDigital = true,
                        RequestProjectEngineer = initiative.RequestProjectEngineer,
                        BudgetType = initiative.BudgetType,
                        Ram = initiative.Ram,
                        JFactor = initiative.JFactor,
                        TypeBenefit = initiative.TypeBenefit,
                        BenefitAmount = initiative.TypeBenefit.Equals("NON-FINANCIAL") ? null : initiative.BenefitAmount,
                        BenefitAmountType = initiative.TypeBenefit.Equals("NON-FINANCIAL") ? null : "THB",
                        PayBackPeriod = initiative.TypeBenefit.Equals("NON-FINANCIAL") ? null : initiative.PayBackPeriod,
                        Irr = initiative.Irr,
                        Wacc = initiative.Wacc,
                        FxExchange = initiative.FxExchange,
                        Cim = null,
                        Pim = null,
                        Dim = null,
                        Max = null,
                        DirectCapex = null,
                        Cpi = null,
                        Strategy = null,
                        RandD = null,
                        Other = null,
                        TrackMax = null,
                        ApprovedDate = null,
                        CreatedDate = null,
                        CreatedBy = creator.Email,
                        UpdatedDate = null,
                        UpdatedBy = null,
                        LastActivity = null,
                        DeletedFlag = null,
                        Status = "draft",
                        Stage = null,
                        CommentCancelled = null,
                        LastSubmittedDate = null,
                        LagacyInitiativeId = null,
                        LagacyInitiativeCode = initiative.InitiativeCode,
                        SecretProject = null,
                        GoToStage = null,
                        SSPIM = null,
                        ITDigital = initiative.ITDigital,
                        CapexStatus = null,
                        CapexStage = null,
                        IsRequestCapex = null,
                        VPPlantOwner = null,
                        DMPlantOwner = null,
                        LookbackOwner = null,
                        SortStage = null,
                        isSetInitiativeSubType = 0,
                        InitiativeSubType = null,
                        AlignWithCorpStrategy = null,
                        StrategicYear = null,
                        StrategicObjective = null,
                        StrategyType = null,
                        HistoryFlag = null,
                        IsPassPimGate1 = null,
                        CreateType = null,
                        IsCreatedApp = null,
                        IsCreatedWbs = null,
                        GeneralTabStatus = null,
                        DetailMaxDimCapexTabStatus = null,
                        ImpactTabStatus = null,
                        RiskTabStatus = null,
                        ResourceTabStatus = null,
                        CapexTabStatus = null,
                        ProgressTabStatus = null,
                        LessonLearnTabStatus = null,
                        LookbackTabStatus = null,
                        BestPracticeTabStatus = null,
                        StrategyTabStatus = null,
                        StatusTabStatus = null,
                        DetailCimStrategyTabStatus = null,
                        DetailPimTabStatus = null,
                        DetailCpiTabStatus = null,
                        IsNextButtonClicked = null,
                        ResidualValue = null,
                        UtilitiesCost = null,
                        MaintenanceCost = null,
                        CatalystChemicalsCost = null,
                        LabourCost = null,
                        UseIrrCalculate = null,
                        Likelihood = null,
                        Consequence = null,
                        BaseRisk = null,
                        RiskOfAlt = null,
                        RiskReduction = null,
                        PotentialConCost = null,
                        AnnualLikelihood = null,
                        AnnualLikelihoodRatio = null,
                        ExposureFactor = null,
                        ExposureFactorRatio = null,
                        Probability = null,
                        Effectiveness = null,
                        EffectivenessRatio = null,
                        ProductionLoss = null,
                        EconomicPenalties = null,
                        EconomicBenefits = null,
                        OpexPenaltiesCost = null,
                        JustifiableCost = null,
                        IsReviseFlow = null,
                        AppropriationNo = null,
                        WBSNo = null

                    };

                    await _context.Initiatives.AddAsync(newInitiative);
                    await _context.SaveChangesAsync();

                    //saveCodev
                    if (initiativeCoDev?.Count > 0)
                    {
                        foreach (var coDev in initiativeCoDev)
                        {
                            coDev.Id = 0;
                            coDev.InitiativeId = newInitiative.Id;
                            await _context.InitiativeCoDevelopers.AddAsync(coDev);
                            await _context.SaveChangesAsync();
                        }
                    }

                    return newInitiative.Id;

                    //intiativeIdNew = await _storeProcedure.Execute($"EXEC sp_DuplicateInitiativeITAndDigital {id} , '{code}'");
                }
                else
                {
                    intiativeIdNew = await _storeProcedure.Execute($"EXEC sp_DuplicateInitiative {id} , '{code}'");
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Duplicate error = {ex.Message}");
                return 0;
            }
            var res = intiativeIdNew.Split(':');
            var result = res[1].Substring(0, res[1].Length - 2);

            return Convert.ToInt32(result);

        }

        public async Task<List<InitiativeHistoryIndex>> GetHistoryIndex(int id)
        {
            var historyIdx = await _context.InitiativeHistoryIndex.Where(i => i.InitiativeIdMain == id).OrderBy(i => i.Id).ToListAsync();

            return historyIdx;
        }

        public async Task<int> AddStagesPimCapex(Initiative initiative, InitiativeTypeSubType initiativeTypeSubType)
        {
            var pimcapexStages = await _context.TypeStage.Where(i => i.Type == "pimcapex").ToListAsync();
            decimal? IL3Sequence = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == initiative.Id && (i.Stage == "IL3" || i.Stage == "IL3-2")).Select(i => i.RunningSequence).FirstOrDefaultAsync();
            int lastHistoryId = await LastHistoryId(initiative.Id);

            if (pimcapexStages.Any())
            {
                foreach (var entity in pimcapexStages)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(entity, "Initiative-7730", SQLCommandType.INSERT);
                    // End log

                    _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                    {
                        InitiativeId = initiative.Id,
                        ApprovedBy = null,
                        ApprovedDate = null,
                        ProcessType = entity.Type,
                        RunningSequence = (IL3Sequence.Value - 1) + (decimal)(entity.Order * 0.01),
                        Sequence = (IL3Sequence.Value - 1) + (decimal)(entity.Order * 0.01),
                        HistoryId = lastHistoryId,
                        Stage = entity.Stage,
                        Status = "Not Start",
                        SubType = null
                    });
                }
            }

            return await _context.SaveChangesAsync();
        }

        public async Task<PagedList<OwnerInitiativeList>> GetOwnerInitiativeList(InitiativeParams initiativeParams)
        {
            //var user = await _context.UserManagement2.Select(s => s).ToListAsync();

            //var initiatives = user
            //                    .GroupJoin(_context.BU,
            //                    owner => owner.BU,
            //                    bu => bu.BUID,
            //                    (owner, bu) => new
            //                    {
            //                        owner,
            //                        bu
            //                    })
            //                    .GroupJoin(_context.WorkStream2,
            //                    table => table.owner.Workstream,
            //                    ws => ws.WorkstreamID,
            //                    (table, workstream) => new
            //                    {
            //                        table.owner,
            //                        table.bu,
            //                        workstream
            //                    })
            //                    .GroupJoin(_context.UserRoles,
            //                    table => table.owner.Email,
            //                    role => role.Email,
            //                    (table, role) => new
            //                    {
            //                        table.owner,
            //                        table.bu,
            //                        table.workstream,
            //                        role
            //                    })
            //                    .GroupJoin(_context.Position,
            //                    table => table.owner.Position,
            //                    ps => ps.PositionID,
            //                    (table, position) => new
            //                    {
            //                        table.owner,
            //                        table.bu,
            //                        table.workstream,
            //                        table.role,
            //                        position
            //                    })
            //                    .ToList();

            //var result = initiatives
            //    .Select(s => new OwnerInitiativeList
            //    {
            //        EmployeeID = s.owner.EmployeeID,
            //        FirstName = s.owner.FirstName,
            //        LastName = s.owner.LastName,
            //        BUText = s.bu.FirstOrDefault()?.BUText,
            //        Email = s.owner.Email,
            //        OwnerName = $"{s.owner.FirstName} {s.owner.LastName}",
            //        PositionTextEN = s.position.FirstOrDefault()?.PositionTextEN,
            //        RoleName = s.role.FirstOrDefault()?.RoleId,
            //        WorkstreamTitle = s.workstream.FirstOrDefault()?.WorkstreamTitle,
            //        Remark = s.owner.Remark,
            //        CreateOn = "Admin"
            //    })
            //    .ToList();
            // var user = await _context.UserManagement2.Select(s => s).ToListAsync();
            var result = await (from u in _context.Owners
                                select new OwnerInitiativeList()
                                {
                                    EmployeeID = u.EmployeeID,
                                    FirstName = u.FirstName,
                                    LastName = u.LastName,
                                    BUText = "", //u.BU,
                                    Email = u.Email,
                                    OwnerName = $"{u.FirstName} {u.LastName}",
                                    PositionTextEN = "", //u.Position,
                                    RoleName = "",
                                    WorkstreamTitle = "", //u.Workstream,
                                    Remark = "",//u.Remark,
                                    CreateOn = "Admin"
                                }).ToListAsync();

            return PagedList<OwnerInitiativeList>.CreateAsyncAsList(result, initiativeParams?.PageNumber ?? 0, initiativeParams?.PageSize ?? result.Count);
        }
        public async Task<OwnerInitiativeDetail> GetOwnerInitiativeDetail(string employeeId)
        {

            var getUser = await _context.Owners.Where(s => s.EmployeeID == employeeId).ToListAsync();

            var getRoleId2 = _context.UserRoles.Where(x => getUser.Select(u => u.Email).Contains(x.Email)).Select(x => x.RoleId).ToArray();

            var getRoleName = await _context.RoleDetailSetting.Where(x => getRoleId2.Contains(x.Id.ToString())).Select(x => x.RoleName).ToArrayAsync();

            //var result = initiatives
            //    .Select(s => new OwnerInitiativeDetail
            //    {
            //        EmployeeID = s.owner.EmployeeID,
            //        FirstName = s.owner.FirstName,
            //        LastName = s.owner.LastName,
            //        BUID = s.bu.FirstOrDefault()?.BUID,
            //        Email = s.owner.Email,
            //        PositionID = s.position.FirstOrDefault()?.PositionID,
            //        RoleID = getRoleName, //s.role.Select(s => s.RoleId).ToArray(),
            //        WorkstreamID = s.workstream.FirstOrDefault()?.WorkstreamID,
            //        Remark = s.owner.Remark,
            //    })
            //    .FirstOrDefault();

            //var getBU = await _context.Owners.Select(s => new DropdownBu { Value = s.OrgShortTextEN, Text = s.OrgTextEN }).Distinct().ToListAsync();

            var getBU = await _context.Owners.Select(s => new DropdownBu { Value = s.FNShortTextEN, Text = s.FNShortTextEN }).Distinct().ToListAsync();
            var getPostion = await _context.Owners.Where(s => s.PositionShortTextEN != "-" || s.PositionShortTextEN != " ").Select(s => new DropdownPosition { Value = s.PositionShortTextEN, Text = s.PositionShortTextEN }).Distinct().ToListAsync();
            var getWorkstream = await _context.WorkStreams.Select(s => new DropdownWorkstream { Value = s.WorkStreamTitle, Text = s.WorkStreamTitle }).Distinct().ToListAsync();

            //IEnumerable<DropdownBu> noduplicates = getBU.Distinct();

            var result = getUser
               .Select(s => new OwnerInitiativeDetail
               {
                   EmployeeID = s.EmployeeID,
                   FirstName = s.FirstName,
                   LastName = s.LastName,
                   BUID = s.FNShortTextEN, //s.FirstOrDefault()?.BUID,
                   Email = s.Email,
                   PositionID = s.PositionShortTextEN,//s.position.FirstOrDefault()?.PositionID,
                   RoleID = getRoleName, //s.role.Select(s => s.RoleId).ToArray(),
                   WorkstreamID = s.Workstream, //s.workstream.FirstOrDefault()?.WorkstreamID,
                   Remark = "",//s.Remark,
                   DropdownBu = getBU,
                   DropdownPosition = getPostion,
                   DropdownWorkstream = getWorkstream

               })
               .FirstOrDefault();

            return result;
        }

        public async Task<PagedList<RoleDetailSetting>> GetRoleDetail(PagingParam Params)
        {
            var RoleList = _context.RoleDetailSetting.AsQueryable();
            return await PagedList<RoleDetailSetting>.CreateAsync(RoleList, 1, 50);
        }

        public async Task<Owner> UpdateOwnerInitiative(OwnerInitiativeDetail form)
        {
            if (form == null)
                return null;

            var initiative = await _context.Owners.Where(x => x.EmployeeID == form.EmployeeID).FirstOrDefaultAsync();

            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiative, "Initiative-7900", SQLCommandType.UPDATE, false);
            // End log


            if (initiative == null)
                return null;

            if (form.RoleID != null)  // && form.RoleID.Length > 0
            {
                var roleList = await _context.UserRoles.Where(x => x.Email == initiative.Email).ToListAsync();
                if (roleList != null)
                {
                    _context.UserRoles.RemoveRange(roleList);
                }

                var roleScreenList = new List<UserRole>();
                var role = await _context.RoleDetailSetting.Where(x => form.RoleID.Contains(x.Id.ToString())).ToListAsync();
                foreach (var item in role)
                {
                    roleScreenList.Add(new UserRole()
                    {
                        RoleId = item.Id.ToString(),
                        Email = form.Email
                    });
                }
                _context.UserRoles.AddRange(roleScreenList);
            }

            initiative.FNShortTextEN = form.BUID;
            initiative.Workstream = form.WorkstreamID;
            initiative.PositionShortTextEN = form.PositionID;

            //initiative.FirstName = form.FirstName;
            //initiative.LastName = form.LastName;
            //initiative.Position = form.PositionID;
            //initiative.BU = form.BUID;
            //initiative.Email = form.Email;
            //initiative.Workstream = form.WorkstreamID;


            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiative, "Initiative-7941", SQLCommandType.UPDATE, true);
            // End log

            _context.SaveChanges();

            return initiative;
        }

        public async Task<int> GetOrderStage_OnRevise(Initiative initiative, InitiativeTypeSubType initiativeTypeSubType)
        {


            var orderStagesOwnerAction = await GetOrderStagesOwnerAction(initiative, initiativeTypeSubType);
            int nowOrderStage = await GetOrderStage(initiative.Stage, initiativeTypeSubType);


            int closest_lower = orderStagesOwnerAction.Where(i => i <= nowOrderStage).OrderByDescending(i => i).FirstOrDefault();

            return closest_lower == 0 ? nowOrderStage : closest_lower;
        }

        public async Task<int[]> GetOrderStagesOwnerAction(Initiative initiative, InitiativeTypeSubType initiativeTypeSubType)
        {
            //stage order owner action
            int[] dimOrderStageOwnerAction_null = { 5, 11, 13, 14 };
            int[] dimOrderStageOwnerAction_indirect = { 1, 6, 12, 14, 15 };
            int[] dimOrderStageOwnerAction_directindirect = { 1, 6, 12, 14, 15 };
            int[] dimOrderStageOwnerAction_direct = { 1, 7, 13, 15, 16, 18 };

            int[] orderStagesOwnerAction = dimOrderStageOwnerAction_null;
            //define array to find
            switch (initiativeTypeSubType.ProcessType)
            {
                case "dim":
                    switch (initiativeTypeSubType.SubType)
                    {
                        case null:
                            orderStagesOwnerAction = dimOrderStageOwnerAction_null;
                            break;

                        case "indirect":
                            orderStagesOwnerAction = dimOrderStageOwnerAction_indirect;
                            break;

                        case "direct,indirect":
                            orderStagesOwnerAction = dimOrderStageOwnerAction_directindirect;
                            break;

                        case "direct":
                            orderStagesOwnerAction = dimOrderStageOwnerAction_direct;
                            break;
                    }

                    break;
            }

            return await Task.FromResult(orderStagesOwnerAction);
        }

        public async Task<Owner> VPDIMApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();

            string VPName;

            var capexInformations = await _context.CapexInformation.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId).OrderByDescending(i => i.Sequent).FirstOrDefaultAsync();
            if (capexInformations == null)
                return new Owner();

            VPName = capexInformations.CostCenterOfVP;

            var VP = await _context.Owners.Where(i => i.OwnerName.ToLower() == VPName.ToLower()).FirstOrDefaultAsync();

            if (VP == null)
                return new Owner();

            return VP;
        }

        public async Task<Owner> EVPDIMApprover(InitiativeTypeSubType initiativeTypeSubType)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == initiativeTypeSubType.InitiativeId).FirstOrDefaultAsync();

            string VPName;
            var capexInformations = await _context.CapexInformation.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId).OrderByDescending(i => i.Sequent).FirstOrDefaultAsync();
            VPName = capexInformations.CostCenterOfVP;

            var VP = await _context.Owners.Where(i => i.OwnerName == VPName).FirstOrDefaultAsync();

            if (VP == null)
                return new Owner();

            var EVP = await _context.Owners.Where(i => i.EmployeeID == VP.FNManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (EVP == null)
                EVP = await _context.Owners.Where(i => i.EmployeeID == VP.FNGRPManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (EVP == null)
                EVP = await _context.Owners.Where(i => i.EmployeeID == VP.PSDManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (EVP == null)
                EVP = await _context.Owners.Where(i => i.EmployeeID == VP.CEOManagerEmpID.ToString()).FirstOrDefaultAsync();

            if (EVP == null)
                return new Owner();

            return EVP;
        }

        public async Task<Owner[]> DimMemberApprover(InitiativeTypeSubType initiativeTypeSubType, string memberType)
        {
            var ownersDim = await _context.Owners.Where(i =>
                        _context.DimMembers.Where(i => i.InitiativeId == initiativeTypeSubType.InitiativeId && i.MemberType == memberType).Select(i => i.MemberName).Contains(i.OwnerName)
                        ).ToArrayAsync();

            if (ownersDim.Any())
                return ownersDim;

            return new Owner[] { };
        }

        public async Task<Owner[]> DimFinanceExpert()
        {
            var ownersDim = await _context.Owners.Where(i =>
                        _context.CommonData.Where(i => i.DataType == "dimfinanceexpert").Select(i => i.Attribute01).Contains(i.Email)
                        ).ToArrayAsync();


            if (ownersDim.Any())
                return ownersDim;

            return new Owner[] { };
        }

        public async Task<string> GetStageNameOutput(int id, string stage = null)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == id).FirstOrDefaultAsync();

            var dataStages = await _context.CommonData.Where(i => i.DataType == "stage"
            && i.Attribute08 != null
            && i.Attribute05 == initiative.InitiativeType
            && i.Attribute06 == initiative.InitiativeSubType
            && i.Attribute01 == (stage == null ? initiative.Stage : stage)
            ).FirstOrDefaultAsync();

            if (dataStages != null)
                return dataStages.Attribute08;

            return (stage == null ? initiative.Stage : stage);
        }

        public async Task<bool> CheckIsNextStageOwnerAction(int id, ApprovalNewSystemParam approvalNewSystemParam = null)
        {
            //return true = owner action
            // return false = approver action

            if (flagNewApprovalSystem == true && approvalNewSystemParam != null)
            {
                var maxCounterInitiativeActionByFlow = await GetLastCounterInitiativeActionByFlowType(approvalNewSystemParam);  // aon add approveEdit  2021-05-13 (i.Action == "approve" || i.Action == "approveEdit")

                var initiativeAction = await _context.InitiativeActions.Where(i => i.Action == "approve" && i.InitiativeId == id
                && i.FlowType == approvalNewSystemParam.FlowType && i.ActionResult == null && (i.IsInactive == null || i.IsInactive == false)
                && i.Counter == (maxCounterInitiativeActionByFlow == 0 ? 0 : maxCounterInitiativeActionByFlow - 1))
                    .OrderByDescending(i => i.Id).FirstOrDefaultAsync();

                if (initiativeAction == null)
                {
                    return true;

                }
                else
                {
                    return false;
                }
            }
            else
            {
                var initiativeAction = await _context.InitiativeActions.Where(i => i.Action == "approve" && i.InitiativeId == id).OrderByDescending(i => i.Id).FirstOrDefaultAsync();

                if (initiativeAction == null)
                {
                    return true;

                }
                else
                {
                    return false;
                }
            }


        }

        public async Task<bool> IsDimCapex()
        {
            return await Task.FromResult(flagDimCapex);
        }

        public async Task<bool> IsNewFeature()
        {
            return await Task.FromResult(flagNewFeature);
        }

        public async Task<bool> IsNewApprovalSystemx()
        {
            return await Task.FromResult(flagNewApprovalSystem);
        }

        public async Task<ApprovalNewSystemParam> OnInitiativeSubmitClick(ApprovalNewSystemParam approvalNewSystemParam, InitiativeSubmitStageStatus initiativeSubmitStageStatus)
        {
            //check permission and insert action


            //TODO : (Mail Lookback) Insert Send Mail for Lookback on Submit
            await SendEmailLookback(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.NowStage, approvalNewSystemParam.ActionType, initiativeSubmitStageStatus.Status, "Submit");

            var tmpapprovalNewSystemParamDirection = approvalNewSystemParam.Direction;

            if (approvalNewSystemParam.FlowType != "initiative")
            { // insert initiative stage for other flows
                await InsertOtherFlowTypeStageStatus(approvalNewSystemParam);
            }

            approvalNewSystemParam = await GetNowStageStatus(approvalNewSystemParam);

            if (approvalNewSystemParam.Event == "createnew")
            {
                await InsertInitiativeStageDetailAndAction(approvalNewSystemParam);
                await CreateStagesTracking(approvalNewSystemParam);
            }


            await UpdateActionByAfterAction(approvalNewSystemParam);


            approvalNewSystemParam = await GetNowStageStatus(approvalNewSystemParam);
            approvalNewSystemParam = await GetNextStageStatusToBe(approvalNewSystemParam);

            var nowDateTime = approvalNewSystemParam.nowDateTime;

            //ยังงง อยู่ว่าจะอัพเดท  ยังไง
            await UpdateStatusInitiativeStatusTrackings_Now(approvalNewSystemParam, nowDateTime);

        goNextStageRecursive:

            approvalNewSystemParam.FlowType = await GetFlowTypeOfInitiative(approvalNewSystemParam.InitiativeId);

            if (await GetPassCondition(approvalNewSystemParam) == true)
            {
                await ExecuteStoredPostStage(approvalNewSystemParam);

                await RemoveInitiativeStatusTrackingsInProgress(approvalNewSystemParam);

                await SetStageStatus(approvalNewSystemParam);
                await SetNextAction(approvalNewSystemParam);

                await UpdateApprovedByInitiativeStatusTrackings_ToBe(approvalNewSystemParam);
                await UpdateStatusNotStartInitiativeStatusTrackings_NextOfToBe(approvalNewSystemParam);




                //createPDD is directCapex
                if ((!string.IsNullOrEmpty(approvalNewSystemParam.NextStageToBe) && approvalNewSystemParam.NextStageToBe.Equals("Assign Project Eng.")) && approvalNewSystemParam.Process == "directcapex")
                {
                    await CallMicrosoftFlow(approvalNewSystemParam.InitiativeId, "PDD", _urlPowerAutomate.Value.CreatePDD);
                }


                approvalNewSystemParam.IsFirstPassStage = false;

                approvalNewSystemParam.FlowType = await GetFlowTypeOfInitiative(approvalNewSystemParam.InitiativeId);
                approvalNewSystemParam = await GetNowStageStatus(approvalNewSystemParam);
                approvalNewSystemParam = await GetNextStageStatusToBe(approvalNewSystemParam);

                await ExecuteStoredPreStage(approvalNewSystemParam);

                if (new string[] { "backward", "cancelled" }.Contains(approvalNewSystemParam.Direction) == true)
                    approvalNewSystemParam.Direction = "forward";

                //recursive call next stage
                if (await GetPassCondition(approvalNewSystemParam) == true && approvalNewSystemParam.IsUserAction == true)
                {
                    await UpdateStatusInitiativeStatusTrackings_Now(approvalNewSystemParam, nowDateTime, true); //change status trackings on skipped
                    goto goNextStageRecursive;
                }
                else
                { // if not pass next stage then send email
                    if (new string[] { "forward", "cancelled" }.Contains(tmpapprovalNewSystemParamDirection) == true) //check sendmail only forward and cancelled    without backward
                    {
                        if (await CheckIsNextStageOwnerAction(approvalNewSystemParam.InitiativeId, approvalNewSystemParam) == true)
                        { //send mail to owner / creator --------> projectEn error here

                            bool? reqTPX = await _context.Initiatives.Where(o => o.Id.Equals(approvalNewSystemParam.InitiativeId)).Select(s => s.RequestProjectEngineer).FirstOrDefaultAsync();

                            if (string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)
                                && approvalNewSystemParam.NowStage.Equals("Assign Project Eng.")
                                && approvalNewSystemParam.NowStatus.Equals("wait for update"))
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "createnew");
                            }

                            if (string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.Process)
                                && approvalNewSystemParam.NowStage.Equals("GATE0 : PHASE1-2")
                                && approvalNewSystemParam.NowStatus.Equals("draft")
                                && approvalNewSystemParam.Process.Equals("pim"))
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "projectmanager");
                            }
                            else if (string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)
                                && approvalNewSystemParam.NowStage.Equals("IL1")
                                && approvalNewSystemParam.NowStatus.Equals("approved")
                                && reqTPX.HasValue && reqTPX.Value)
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "projectengineer");   // MAX_EMAIL 2
                            }
                            else if (string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.Process)
                                && approvalNewSystemParam.NowStage.Equals("GATE0 : PHASE1-2")
                                && approvalNewSystemParam.NowStatus.Equals("draft")
                                && approvalNewSystemParam.Process.Equals("pim"))
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "projectengineer");   // PIM_EMAIL 1
                            }
                            else if (string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.Process)
                                && approvalNewSystemParam.NowStage.Equals("GATE0 : PHASE1-1")
                                && reqTPX.HasValue && reqTPX.Value
                                && approvalNewSystemParam.NowStatus.Equals("draft")
                                && approvalNewSystemParam.Process.Equals("pim"))
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "projectmanager");   // PIM_EMAIL 1
                            }
                            else if (string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStageToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.SubType)
                                && approvalNewSystemParam.NowStage.Equals("PMO")
                                && approvalNewSystemParam.NowStatus.Equals("wait for approval")
                                && approvalNewSystemParam.NextStageToBe.Equals("DM")
                                && approvalNewSystemParam.SubType.Equals("normal"))
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "approve");    // PIM_EMAIL 2
                            }
                            else if (string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStageToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStatusToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.Process)
                                && approvalNewSystemParam.NextStageToBe.Equals("GATE0 : SUB-PIC GATE1")
                                && approvalNewSystemParam.NextStatusToBe.Equals("wait for approval")
                                && approvalNewSystemParam.NowStage.Equals("GATE0 : VAC GATE1")
                                && approvalNewSystemParam.NowStatus.Equals("wait for approval")
                                && approvalNewSystemParam.Process.Equals("pim"))
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "approve");    // PIM_EMAIL 2.1 - 6
                            }
                            else if (string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStageToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStatusToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.Process)
                                && approvalNewSystemParam.NextStageToBe.Equals("GATE1 : PIC GATE2")
                                && approvalNewSystemParam.NextStatusToBe.Equals("wait for approval")
                                && approvalNewSystemParam.NowStage.Equals("GATE1 : VAC GATE2")
                                && approvalNewSystemParam.NowStatus.Equals("wait for approval")
                                && approvalNewSystemParam.Process.Equals("pim"))
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "approve");    // PIM_EMAIL 2.2 - 9
                            }
                            else if (string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStageToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStatusToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.Process)
                                && approvalNewSystemParam.NextStageToBe.Equals("Budget Team")
                                && approvalNewSystemParam.NextStatusToBe.Equals("wait for review")
                                && approvalNewSystemParam.NowStage.Equals("GATE2 : CAPEX-2")
                                && approvalNewSystemParam.NowStatus.Equals("wait for approval")
                                && approvalNewSystemParam.Process.Equals("pim"))
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "approve");    // PIM_EMAIL 2.3 - 12
                            }
                            else if (string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStageToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStatusToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.Process)
                                && approvalNewSystemParam.NextStageToBe.Equals("GATE2 : PIC GATE3")
                                && approvalNewSystemParam.NextStatusToBe.Equals("wait for approval")
                                && approvalNewSystemParam.NowStage.Equals("GATE2 : VAC GATE3")
                                && approvalNewSystemParam.NowStatus.Equals("wait for approval")
                                && approvalNewSystemParam.Process.Equals("pim"))
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "approve");    // PIM_EMAIL 2.4 - [18]
                            }
                            else if (string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStageToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStatusToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.Process)
                                && approvalNewSystemParam.NextStageToBe.StartsWith("Budget Team")
                                && approvalNewSystemParam.NextStatusToBe.Equals("wait for approval")
                                && approvalNewSystemParam.NowStage.Equals("GATE3 : CAPEX-2")
                                && approvalNewSystemParam.NowStatus.Equals("wait for approval")
                                && approvalNewSystemParam.Process.Equals("pim"))
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "approve");    // PIM_EMAIL 2.5 - [21]
                            }
                            else
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "owner");    // PIM_EMAIL 3
                            }


                        }
                        else
                        { //send mail to approver

                            if (approvalNewSystemParam.NowStatus.Equals("wait for cancellation"))
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "wait for cancellation"); // case 7 - send mail to to team   // // PIM_EMAIL 4
                            }
                            else
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "approve");   // PIM_EMAIL  5
                            }
                        }
                    }
                }
            }

            //save impact date LastApprovedIL4Date
            if (new string[] { "SIL4" }.Contains(approvalNewSystemParam.NowStage))
            {
                ImpactTracking impactTracking = await _context.ImpactTrackings.Where(x => x.InitiativeId.Equals(approvalNewSystemParam.InitiativeId)).FirstOrDefaultAsync();
                impactTracking.LastSubmittedSIL4Date = approvalNewSystemParam.nowDateTime;
                await _context.SaveChangesAsync();
            }
            //save impact date LastApprovedIL5Date
            else if (new string[] { "SIL5" }.Contains(approvalNewSystemParam.NowStage))
            {
                ImpactTracking impactTracking = await _context.ImpactTrackings.Where(x => x.InitiativeId.Equals(approvalNewSystemParam.InitiativeId)).FirstOrDefaultAsync();
                impactTracking.LastSubmittedSIL5Date = approvalNewSystemParam.nowDateTime;
                await _context.SaveChangesAsync();
            }



            return approvalNewSystemParam;
        }

        public async Task<ApprovalNewSystemParam> OnInitiativeApproveClick(ApprovalNewSystemParam approvalNewSystemParam, InitiativeSubmit initiativeSubmit)
        {
            //TODO : (Mail Lookback) Insert Send Mail for Lookback on Approve
            await SendEmailLookback(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.NowStage, approvalNewSystemParam.ActionType, initiativeSubmit.Status, "Approve");

            if (approvalNewSystemParam.FlowType != "initiative")
            { // insert initiative stage for other flows
                await InsertOtherFlowTypeStageStatus(approvalNewSystemParam);
            }

            approvalNewSystemParam = await GetNowStageStatus(approvalNewSystemParam);
            approvalNewSystemParam = await GetNextStageStatusToBe(approvalNewSystemParam);

            if (approvalNewSystemParam.Event == "createnew")
            {
                await InsertInitiativeStageDetailAndAction(approvalNewSystemParam);
                await CreateStagesTracking(approvalNewSystemParam);
            }

            await UpdateActionByAfterAction(approvalNewSystemParam);

            approvalNewSystemParam = await GetNowStageStatus(approvalNewSystemParam);

            await UpdateStatusInitiativeStatusTrackings_Now(approvalNewSystemParam, approvalNewSystemParam.nowDateTime, approvalNewSystemParam.ActionBy == "SYSTEM");  //case SYSTEM trigger approve then pass without condition

        goNextStageRecursive:

            approvalNewSystemParam.FlowType = await GetFlowTypeOfInitiative(approvalNewSystemParam.InitiativeId);

            //save impact date FirstApprovedIL4Date
            if (new string[] { "SIL4" }.Contains(approvalNewSystemParam.NowStage) && approvalNewSystemParam.Direction.Equals("approve"))
            {
                ImpactTracking impactTracking = await _context.ImpactTrackings.Where(x => x.InitiativeId.Equals(approvalNewSystemParam.InitiativeId)).FirstOrDefaultAsync();
                if (impactTracking.FirstApprovedIL4Date == null)
                {
                    impactTracking.FirstApprovedIL4Date = approvalNewSystemParam.nowDateTime;
                    await _context.SaveChangesAsync();
                }
            }

            if (await GetPassCondition(approvalNewSystemParam) == true || approvalNewSystemParam.ActionBy == "SYSTEM")  //case SYSTEM trigger approve then pass without condition
            {

                await ExecuteStoredPostStage(approvalNewSystemParam);

                await RemoveInitiativeStatusTrackingsInProgress(approvalNewSystemParam);

                await SetStageStatus(approvalNewSystemParam);
                await SetNextAction(approvalNewSystemParam);

                await UpdateApprovedByInitiativeStatusTrackings_ToBe(approvalNewSystemParam);
                await UpdateStatusNotStartInitiativeStatusTrackings_NextOfToBe(approvalNewSystemParam);


                if (approvalNewSystemParam.IsFirstPassStage == true)
                {
                    //if (new string[] { "SIL4", "SIL5" }.Contains(approvalNewSystemParam.NowStage)) //Date @ change stage to IL4 , IL5 (FROM SIL4 , SIL5)
                    //{
                    //    await UpdateLastestApproved(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.NowStage, approvalNewSystemParam.nowDateTime); //SIL4 , SIL5 only
                    //}

                    //createPDD is Pim
                    if (!string.IsNullOrEmpty(approvalNewSystemParam.NextStageToBe) && (approvalNewSystemParam.NextStageToBe.ToUpper().Equals("GATE1 : PHASE2"))) //|| new string[] { "PRE-DD-1", "SEEKING POTENTIAL-1", "DETAIL F/S-1" }.Contains(approvalNewSystemParam.NextStageToBe.ToUpper()))
                    {
                        await CallMicrosoftFlow(approvalNewSystemParam.InitiativeId, "PDD", _urlPowerAutomate.Value.CreatePDD);
                        //await _pDD.CreateFolderPDD(approvalNewSystemParam.InitiativeId);
                        //create folder PDD by calling ms flow 
                    }


                    Initiative Initiative = await _context.Initiatives.Where(x => x.Id.Equals(approvalNewSystemParam.InitiativeId)).FirstOrDefaultAsync();

                    //createPDD is Cim
                    if (!string.IsNullOrEmpty(approvalNewSystemParam.NextStageToBe) && approvalNewSystemParam.NextStageToBe.Equals("Admin Check") && approvalNewSystemParam.Process == "cim")
                    {
                        await CallMicrosoftFlow(approvalNewSystemParam.InitiativeId, "PDD", _urlPowerAutomate.Value.CreatePDD);
                    }

                    //createPDD is Max
                    if (!string.IsNullOrEmpty(approvalNewSystemParam.NextStageToBe) && approvalNewSystemParam.NextStageToBe.Equals("Assign Project Eng.")
                        && approvalNewSystemParam.Process == "max" && (Initiative.RequestCapex == "true" || Initiative.RequestOpex == "trueOpex"))
                    {
                        await CallMicrosoftFlow(approvalNewSystemParam.InitiativeId, "PDD", _urlPowerAutomate.Value.CreatePDD);
                    }


                    if (await IsSendMailToProjectEngineer(approvalNewSystemParam) == true) // send mail to project engineer on pass stage in to XXX stage
                    {
                        await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "projectengineer");     // PIM_EMAIL  6
                    }


                    if (approvalNewSystemParam.Direction == "revise"
                        || approvalNewSystemParam.Direction == "reject"
                        || approvalNewSystemParam.Direction == "approve cancellation"
                        || approvalNewSystemParam.Direction == "reject cancellation")
                        await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.Direction); // // PIM_EMAIL 7    // case 2 case 3  revise, reject  -  send mail to owner / creator

                }

                approvalNewSystemParam.IsFirstPassStage = false;


                if (await IsSendAppReqAndWBS_PimProcessAddmoreAndParallelFlow(approvalNewSystemParam) == true)  // check budget team approved on add more then send wbs update
                {
                    await _repositoryProgress.SubmitInvestmentCostFirstTime(approvalNewSystemParam.InitiativeId);
                    await _repositoryIF.Interface_OutGoing(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.NowStatus, approvalNewSystemParam.NowStage, null, approvalNewSystemParam);
                }


                approvalNewSystemParam.FlowType = await GetFlowTypeOfInitiative(approvalNewSystemParam.InitiativeId);
                approvalNewSystemParam = await GetNowStageStatus(approvalNewSystemParam);
                approvalNewSystemParam = await GetNextStageStatusToBe(approvalNewSystemParam);

                if (await IsSendAppReqAndWBS(approvalNewSystemParam) == true && await GetPassCondition(approvalNewSystemParam) == false)  // check app req and check if stage app-req not pass then gen interface
                {
                    await _repositoryProgress.SubmitInvestmentCostFirstTime(approvalNewSystemParam.InitiativeId);

                    //TODO : remove Wbs directCapex
                    await _repositoryIF.Interface_OutGoing(approvalNewSystemParam.InitiativeId, approvalNewSystemParam.NowStatus, approvalNewSystemParam.NowStage, null, approvalNewSystemParam);
                }

                await ExecuteStoredPreStage(approvalNewSystemParam);

                if (approvalNewSystemParam.ActionBy == "SYSTEM") // case system trigger once replace action by with empty
                {
                    approvalNewSystemParam.ActionBy = "";
                }

                //recursive call next stage
                if (await GetPassCondition(approvalNewSystemParam) == true && approvalNewSystemParam.Direction == "approve")  //skipped stage only on action "approve"   not revise , reject
                {
                    approvalNewSystemParam.IsUserAction = false;
                    await UpdateStatusInitiativeStatusTrackings_Now(approvalNewSystemParam, approvalNewSystemParam.nowDateTime, true); //change status trackings on skipped
                    goto goNextStageRecursive;
                }
                else
                { // if not pass next stage then send email
                    if (approvalNewSystemParam.Direction == "approve")
                    {
                        if (await CheckIsNextStageOwnerAction(approvalNewSystemParam.InitiativeId, approvalNewSystemParam) == true)
                        { //send mail to owner / creator
                            if (string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)
                                && approvalNewSystemParam.NowStage.Equals("Assign Project Eng.")
                                && approvalNewSystemParam.NowStatus.Equals("wait for update")) // MAX_EMAIL 1
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "projectmanager");
                            }
                            else if (string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStageToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStatusToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.Process)
                                && approvalNewSystemParam.NextStageToBe == "GATE2 : CAPEX-1"
                                && approvalNewSystemParam.NextStatusToBe == "draft"
                                && approvalNewSystemParam.NowStage == "GATE1 : PIC GATE2"
                                && approvalNewSystemParam.NowStatus == "wait for approval"
                                && approvalNewSystemParam.Process == "pim")
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "approve");    // PIM_EMAIL 8.1 - 10
                            }
                            else if (string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStageToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NextStatusToBe)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)
                                && string.IsNullOrWhiteSpace(approvalNewSystemParam.Process)
                                && approvalNewSystemParam.NextStageToBe == "GATE3 : CAPEX-1"
                                && approvalNewSystemParam.NextStatusToBe == "draft"
                                && approvalNewSystemParam.NowStage == "GATE2 : PIC GATE3"
                                && approvalNewSystemParam.NowStatus == "wait for approval"
                                && approvalNewSystemParam.Process == "pim")
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "approve");    // PIM_EMAIL 8.2 - [19]
                            }
                            else if (approvalNewSystemParam.NextStageToBe == "GATE1 : PHASE2" && approvalNewSystemParam.NextStatusToBe == "draft"
                                && approvalNewSystemParam.NowStage == "GATE0 : SUB-PIC GATE1" && approvalNewSystemParam.NowStatus == "wait for approval" && approvalNewSystemParam.Process == "pim")
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "approve");    // PIM_EMAIL 8.3 - [7]
                            }
                            else
                            {
                                await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "owner");   // PIM_EMAIL  8
                            }
                        }
                        else
                        { //send mail to approver
                            await CallMicrosoftFlow_SendMail(approvalNewSystemParam.InitiativeId, "approve");    // PIM_EMAIL   9
                        }
                    }
                }



            }
            //save impact date LastApprovedIL4Date
            if (new string[] { "IL4" }.Contains(approvalNewSystemParam.NowStage))
            {
                ImpactTracking impactTracking = await _context.ImpactTrackings.Where(x => x.InitiativeId.Equals(approvalNewSystemParam.InitiativeId)).FirstOrDefaultAsync();
                impactTracking.LastApprovedIL4Date = approvalNewSystemParam.nowDateTime;
                await _context.SaveChangesAsync();
            }
            //save impact date LastApprovedIL5Date
            else if (new string[] { "IL5" }.Contains(approvalNewSystemParam.NowStage))
            {
                ImpactTracking impactTracking = await _context.ImpactTrackings.Where(x => x.InitiativeId.Equals(approvalNewSystemParam.InitiativeId)).FirstOrDefaultAsync();
                impactTracking.LastApprovedIL5Date = approvalNewSystemParam.nowDateTime;
                await _context.SaveChangesAsync();
            }

            return approvalNewSystemParam;
        }

        public async Task<int> InsertInitiativeStageDetailAndAction(ApprovalNewSystemParam approvalNewSystemParam)
        {
            //check Event is need to insert ?

            var maxHistoryStageDetail = await _context.InitiativeStageDetail.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.FlowType == approvalNewSystemParam.FlowType && i.Event == "createnew" && i.Process == approvalNewSystemParam.Process && i.Subtype == approvalNewSystemParam.SubType && i.CurrentStage != null).OrderByDescending(i => i.HistoryId).FirstOrDefaultAsync();
            var StageMaster = await _context.StageMaster.Where(i => i.FlowType == approvalNewSystemParam.FlowType && i.Process == approvalNewSystemParam.Process && i.Subtype == approvalNewSystemParam.SubType).ToListAsync();
            if (StageMaster.Any())
            {
                var lastIdStageDetail = await GetLastInitiativeStageDetailId();

                foreach (var entitymaster in StageMaster)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(entitymaster, "Initiative-8411", SQLCommandType.INSERT);
                    // End log


                    _context.InitiativeStageDetail.Add(new InitiativeStageDetail()
                    {
                        InitiativeStageDetailId = lastIdStageDetail,
                        InitiativeId = approvalNewSystemParam.InitiativeId,
                        Event = entitymaster.Event,
                        Process = entitymaster.Process,
                        FlowType = entitymaster.FlowType,
                        Subtype = entitymaster.Subtype,
                        CurrentStage = entitymaster.CurrentStage,
                        CurrentStatus = entitymaster.CurrentStatus,
                        NextStage = entitymaster.NextStage,
                        NextStatus = entitymaster.NextStatus,
                        ReviseStage = entitymaster.ReviseStage,
                        ReviseStatus = entitymaster.ReviseStatus,
                        RejectStage = entitymaster.RejectStage,
                        RejectStatus = entitymaster.RejectStatus,
                        BackwardStage = entitymaster.BackwardStage,
                        BackwardStatus = entitymaster.BackwardStatus,
                        CancelStage = entitymaster.CancelStage,
                        CancelStatus = entitymaster.CancelStatus,
                        Sequence = entitymaster.Sequence,
                        NextCondition = entitymaster.NextCondition,
                        HistoryId = (maxHistoryStageDetail == null ? 0 : maxHistoryStageDetail.HistoryId + 1),
                        IsCreateType = entitymaster.IsCreateType,
                        IsSwitchProcess = entitymaster.IsSwitchProcess,
                        PostStageStoredProcedure = entitymaster.PostStageStoredProcedure,
                        PreStageStoredProcedure = entitymaster.PreStageStoredProcedure,
                        CurrentStageDisplay = entitymaster.CurrentStageDisplay,
                        CurrentActionInformation = entitymaster.CurrentActionInformation,
                        NextActionInformation = entitymaster.NextActionInformation,
                    });

                    var StageActionMaster = await _context.StageActionMaster.Where(i => i.StageMasterId == entitymaster.StageMasterId).ToListAsync();
                    if (StageActionMaster.Any())
                    {
                        foreach (var entityaction in StageActionMaster)
                        {
                            // Temporary Log for Invetigate 2021-07-21
                            LogInsight.Log(entityaction, "Initiative-8453", SQLCommandType.INSERT);
                            // End log

                            _context.InitiativeStageActionDetail.Add(new InitiativeStageActionDetail()
                            {
                                InitiativeId = approvalNewSystemParam.InitiativeId,
                                InitiativeStageDetailId = lastIdStageDetail,
                                ActionBy = entityaction.ActionBy,
                                ActionType = entityaction.ActionType,
                            });
                        }
                    }

                    //await _context.SaveChangesAsync(); //save every loop to get Detail Id
                    //commented @2021-02-08 save only exited loop
                    lastIdStageDetail++;
                }

            }

            return await _context.SaveChangesAsync();
        }

        public async Task<int> InsertStageDetailAndActionSwitchProcess(ApprovalNewSystemParam approvalNewSystemParam)
        {
            //check Event is need to insert ?

            var maxHistoryStageDetail = await _context.InitiativeStageDetail.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.FlowType == approvalNewSystemParam.FlowType && i.Event == "switchProcess" && i.Process == approvalNewSystemParam.Process && i.Subtype == approvalNewSystemParam.SubType && i.CurrentStage != null).OrderByDescending(i => i.HistoryId).FirstOrDefaultAsync();
            var StageMaster = await _context.StageMaster.Where(i => i.FlowType == approvalNewSystemParam.FlowType && i.Process == approvalNewSystemParam.Process && i.Subtype == approvalNewSystemParam.SubType).ToListAsync();
            if (StageMaster.Any())
            {
                var lastIdStageDetail = await GetLastInitiativeStageDetailId();

                foreach (var entitymaster in StageMaster)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(entitymaster, "Initiative-8489", SQLCommandType.INSERT);
                    // End log

                    _context.InitiativeStageDetail.Add(new InitiativeStageDetail()
                    {
                        InitiativeStageDetailId = lastIdStageDetail,
                        InitiativeId = approvalNewSystemParam.InitiativeId,
                        Event = entitymaster.Event,
                        Process = entitymaster.Process,
                        FlowType = entitymaster.FlowType,
                        Subtype = entitymaster.Subtype,
                        CurrentStage = entitymaster.CurrentStage,
                        CurrentStatus = entitymaster.CurrentStatus,
                        NextStage = entitymaster.NextStage,
                        NextStatus = entitymaster.NextStatus,
                        ReviseStage = entitymaster.ReviseStage,
                        ReviseStatus = entitymaster.ReviseStatus,
                        RejectStage = entitymaster.RejectStage,
                        RejectStatus = entitymaster.RejectStatus,
                        BackwardStage = entitymaster.BackwardStage,
                        BackwardStatus = entitymaster.BackwardStatus,
                        CancelStage = entitymaster.CancelStage,
                        CancelStatus = entitymaster.CancelStatus,
                        Sequence = entitymaster.Sequence,
                        NextCondition = entitymaster.NextCondition,
                        HistoryId = (maxHistoryStageDetail == null ? 0 : maxHistoryStageDetail.HistoryId + 1),
                        IsCreateType = entitymaster.IsCreateType,
                        IsSwitchProcess = entitymaster.IsSwitchProcess,
                        PostStageStoredProcedure = entitymaster.PostStageStoredProcedure,
                        PreStageStoredProcedure = entitymaster.PreStageStoredProcedure,
                        CurrentStageDisplay = entitymaster.CurrentStageDisplay,
                        CurrentActionInformation = entitymaster.CurrentActionInformation,
                        NextActionInformation = entitymaster.NextActionInformation,
                    });

                    var StageActionMaster = await _context.StageActionMaster.Where(i => i.StageMasterId == entitymaster.StageMasterId).ToListAsync();
                    if (StageActionMaster.Any())
                    {
                        foreach (var entityaction in StageActionMaster)
                        {
                            // Temporary Log for Invetigate 2021-07-21
                            LogInsight.Log(entityaction, "Initiative-8530", SQLCommandType.INSERT);
                            // End log
                            _context.InitiativeStageActionDetail.Add(new InitiativeStageActionDetail()
                            {
                                InitiativeId = approvalNewSystemParam.InitiativeId,
                                InitiativeStageDetailId = lastIdStageDetail,
                                ActionBy = entityaction.ActionBy,
                                ActionType = entityaction.ActionType,
                            });
                        }
                    }

                    //await _context.SaveChangesAsync(); //save every loop to get Detail Id
                    //commented @2021-02-08 save only exited loop
                    lastIdStageDetail++;
                }

            }

            return await _context.SaveChangesAsync();
        }

        public async Task<int> SetStageStatus(ApprovalNewSystemParam approvalNewSystemParam)
        {
            if (approvalNewSystemParam.NextStageToBe == null && approvalNewSystemParam.NextStatusToBe == null) // case on finish status  no next stage
                return 0;


            if (approvalNewSystemParam.FlowType == "initiative")
            {
                var initiatives = await GetInitiative(approvalNewSystemParam.InitiativeId);
                initiatives.Stage = approvalNewSystemParam.NextStageToBe;
                initiatives.Status = approvalNewSystemParam.NextStatusToBe;

            }
            else
            {
                var initiatives = await GetInitiative(approvalNewSystemParam.InitiativeId);
                var thisStageOfFlowType = await _context.InitiativeStage.Where(i => i.FlowType == approvalNewSystemParam.FlowType && i.InitiativeId == approvalNewSystemParam.InitiativeId).FirstOrDefaultAsync();
                if (thisStageOfFlowType != null)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(thisStageOfFlowType, "Initiative-8571", SQLCommandType.UPDATE, false);
                    // End log


                    thisStageOfFlowType.Stage = approvalNewSystemParam.NextStageToBe;
                    thisStageOfFlowType.Status = approvalNewSystemParam.NextStatusToBe;

                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(thisStageOfFlowType, "Initiative-8580", SQLCommandType.UPDATE, true);
                    // End log


                    if (new string[] { "requestcapex", "revise", "return", "addmore" }.Contains(approvalNewSystemParam.FlowType) && new string[] { "complete", "finish", "cancelled", "rejected", "reject" }.Contains(thisStageOfFlowType.Status))
                    {
                        // Temporary Log for Invetigate 2021-07-21
                        LogInsight.Log(initiatives, "Initiative-8588", SQLCommandType.UPDATE, true);
                        // End log


                        initiatives.IsRequestCapex = false;
                        if (initiatives.IsReviseFlow == true)
                        {
                            initiatives.IsReviseFlow = false;
                        }

                        // Temporary Log for Invetigate 2021-07-21
                        LogInsight.Log(initiatives, "Initiative-8598", SQLCommandType.UPDATE, true);
                        // End log

                    }
                }
            }

            return await _context.SaveChangesAsync();
        }
        public async Task<int> InsertOtherFlowTypeStageStatus(ApprovalNewSystemParam approvalNewSystemParam)
        {
            if (!_context.InitiativeStage.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.FlowType == approvalNewSystemParam.FlowType).Any())
                _context.InitiativeStage.Add(new Models.ApprovalFlow.InitiativeStage()
                {
                    InitiativeId = approvalNewSystemParam.InitiativeId,
                    Stage = null,
                    Status = "draft",
                    FlowType = approvalNewSystemParam.FlowType,
                });
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(approvalNewSystemParam, "Initiative-8618", SQLCommandType.INSERT);
            // End log

            return await _context.SaveChangesAsync();
        }

        public async Task<InitiativeStageDetail> GetDetailCurrentStageFromDetail(ApprovalNewSystemParam approvalNewSystemParam)
        {
            if (approvalNewSystemParam.ActionType == "switch process")
            {

                var maxHistoryStageDetail = await _context.InitiativeStageDetail.Where(
                i => i.InitiativeId == approvalNewSystemParam.InitiativeId
                && i.Process == approvalNewSystemParam.Process
                && i.Subtype == approvalNewSystemParam.SubType
                && i.CurrentStage == approvalNewSystemParam.NowStage
                && i.CurrentStatus == approvalNewSystemParam.NowStatus
                && i.FlowType == approvalNewSystemParam.FlowType
                ).OrderByDescending(i => i.HistoryId).FirstOrDefaultAsync();

                var nowStageDetail = await _context.InitiativeStageDetail.Where(
                    i => i.InitiativeId == approvalNewSystemParam.InitiativeId
                    && i.Process == approvalNewSystemParam.Process
                    && i.Subtype == approvalNewSystemParam.SubType
                    && i.CurrentStage == approvalNewSystemParam.NowStage
                    && i.CurrentStatus == approvalNewSystemParam.NowStatus
                    && i.FlowType == approvalNewSystemParam.FlowType
                    && i.HistoryId == (maxHistoryStageDetail == null ? 0 : maxHistoryStageDetail.HistoryId)
                    ).FirstOrDefaultAsync();

                return nowStageDetail;
            }
            else
            {
                var maxHistoryStageDetail = await _context.InitiativeStageDetail.Where(
                    i => i.InitiativeId == approvalNewSystemParam.InitiativeId
                    && i.Process == approvalNewSystemParam.Process
                    && i.Subtype == approvalNewSystemParam.SubType
                    && i.CurrentStage == approvalNewSystemParam.NowStage
                    && i.CurrentStatus == approvalNewSystemParam.NowStatus
                    && i.FlowType == approvalNewSystemParam.FlowType
                    ).OrderByDescending(i => i.HistoryId).FirstOrDefaultAsync();

                var nowStageDetail = await _context.InitiativeStageDetail.Where(
                    i => i.InitiativeId == approvalNewSystemParam.InitiativeId
                    && i.Process == approvalNewSystemParam.Process
                    && i.Subtype == approvalNewSystemParam.SubType
                    && i.CurrentStage == approvalNewSystemParam.NowStage
                    && i.CurrentStatus == approvalNewSystemParam.NowStatus
                    && i.FlowType == approvalNewSystemParam.FlowType
                    && i.HistoryId == (maxHistoryStageDetail == null ? 0 : maxHistoryStageDetail.HistoryId)
                    ).FirstOrDefaultAsync();
                return nowStageDetail;
            }

        }

        public async Task<ApprovalNewSystemParam> GetNextStageStatusToBe(ApprovalNewSystemParam approvalNewSystemParam)
        {
            var nowStageDetail = await GetDetailCurrentStageFromDetail(approvalNewSystemParam);

            if (nowStageDetail == null
                //string.IsNullOrWhiteSpace(approvalNewSystemParam.ActionType)
                //&& string.IsNullOrWhiteSpace(approvalNewSystemParam.Direction)
                //&& string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStage)
                //&& string.IsNullOrWhiteSpace(approvalNewSystemParam.NowStatus)

                && approvalNewSystemParam.ActionType.Equals("submit")
                && approvalNewSystemParam.Direction.Equals("cancelled")

                && (
                    (approvalNewSystemParam.NowStage.Equals("Budget Distribute") && approvalNewSystemParam.NowStatus.Equals("finish")) ||
                    (approvalNewSystemParam.NowStage.Equals("Complete") && approvalNewSystemParam.NowStatus.Equals("finish"))
                    )
                )
            {
                approvalNewSystemParam.NextStageToBe = "Cancelled";
                approvalNewSystemParam.NextStatusToBe = "cancelled";
            }


            if (nowStageDetail == null)
                return approvalNewSystemParam;

            if (approvalNewSystemParam.ActionType == "submit")
            {
                switch (approvalNewSystemParam.Direction)
                {
                    case "forward":
                        approvalNewSystemParam.NextStageToBe = nowStageDetail.NextStage;
                        approvalNewSystemParam.NextStatusToBe = nowStageDetail.NextStatus;
                        break;
                    case "backward":

                        if (string.IsNullOrEmpty(approvalNewSystemParam.GotoStage) == false) // if can go to stage then goto stage  and status = "draft"
                        {
                            approvalNewSystemParam.NextStageToBe = approvalNewSystemParam.GotoStage;
                            approvalNewSystemParam.NextStatusToBe = "draft";

                            approvalNewSystemParam.GotoStage = null; //prevent gotostage duplicate
                        }
                        else
                        {
                            approvalNewSystemParam.NextStageToBe = nowStageDetail.BackwardStage;
                            approvalNewSystemParam.NextStatusToBe = nowStageDetail.BackwardStatus;
                        }

                        break;
                    case "cancelled":

                        // nowStageDetail.CancelStage  nowStageDetail.CancelStatus
                        if (nowStageDetail.CancelStage == null)
                        {
                            nowStageDetail.CancelStage = "";
                        }
                        if (nowStageDetail.CancelStatus == null)
                        {
                            nowStageDetail.CancelStatus = "";
                        }

                        if (nowStageDetail.CancelStage == "" && nowStageDetail.CancelStatus == "")
                        {
                            approvalNewSystemParam.NextStageToBe = "Cancelled";
                            approvalNewSystemParam.NextStatusToBe = "cancelled";
                        }
                        else
                        {
                            approvalNewSystemParam.NextStageToBe = nowStageDetail.CancelStage;
                            approvalNewSystemParam.NextStatusToBe = nowStageDetail.CancelStatus;
                        }
                        break;
                    default: // default to forward
                        approvalNewSystemParam.NextStageToBe = nowStageDetail.NextStage;
                        approvalNewSystemParam.NextStatusToBe = nowStageDetail.NextStatus;
                        break;
                }
            }
            else if (approvalNewSystemParam.ActionType == "approve")
            {
                switch (approvalNewSystemParam.Direction)
                {
                    case "approve":

                        if (string.IsNullOrEmpty(approvalNewSystemParam.GotoStage) == false) // if can go to stage then goto stage  and status = "draft"
                        {
                            approvalNewSystemParam.NextStageToBe = approvalNewSystemParam.GotoStage;
                            approvalNewSystemParam.NextStatusToBe = "draft";

                            approvalNewSystemParam.GotoStage = null; //prevent gotostage duplicate
                        }
                        else
                        {
                            approvalNewSystemParam.NextStageToBe = nowStageDetail.NextStage;
                            approvalNewSystemParam.NextStatusToBe = nowStageDetail.NextStatus;
                        }
                        break;
                    case "revise":
                        approvalNewSystemParam.NextStageToBe = nowStageDetail.ReviseStage;
                        approvalNewSystemParam.NextStatusToBe = nowStageDetail.ReviseStatus;
                        break;
                    case "reject":
                        approvalNewSystemParam.NextStageToBe = nowStageDetail.RejectStage;
                        approvalNewSystemParam.NextStatusToBe = nowStageDetail.RejectStatus;
                        break;
                    case "approve cancellation":
                        approvalNewSystemParam.NextStageToBe = nowStageDetail.NextStage;
                        approvalNewSystemParam.NextStatusToBe = nowStageDetail.NextStatus;
                        break;
                    case "reject cancellation":
                        approvalNewSystemParam.NextStageToBe = nowStageDetail.RejectStage;
                        approvalNewSystemParam.NextStatusToBe = nowStageDetail.RejectStatus;
                        break;
                    default: // default approve
                        approvalNewSystemParam.NextStageToBe = nowStageDetail.NextStage;
                        approvalNewSystemParam.NextStatusToBe = nowStageDetail.NextStatus;
                        break;
                }
            }
            else if (approvalNewSystemParam.ActionType == "switch process")
            {
                approvalNewSystemParam.NextStageToBe = nowStageDetail.SwitchProcessStage;
                approvalNewSystemParam.NextStatusToBe = nowStageDetail.SwitchProcessStatus;
            }
            else
            {
            }

            return approvalNewSystemParam;
        }

        public async Task<List<InitiativeStageActionDetail>> GetDetailNextActionFromStageStatusToBe(ApprovalNewSystemParam approvalNewSystemParam)
        {
            var ToBeActionDetail = await _context.InitiativeStageDetail.Where(
                i => i.InitiativeId == approvalNewSystemParam.InitiativeId
                && i.FlowType == approvalNewSystemParam.FlowType
                && i.Process == approvalNewSystemParam.Process
                && i.Subtype == approvalNewSystemParam.SubType
                && i.CurrentStage == approvalNewSystemParam.NextStageToBe
                && i.CurrentStatus == approvalNewSystemParam.NextStatusToBe
                ).FirstOrDefaultAsync();

            if (ToBeActionDetail == null)
                return new List<InitiativeStageActionDetail>() { };

            var ToBeStageActionDetail = await _context.InitiativeStageActionDetail.Where(i => i.InitiativeStageDetailId == ToBeActionDetail.InitiativeStageDetailId
            && i.InitiativeId == ToBeActionDetail.InitiativeId).ToListAsync();

            return ToBeStageActionDetail;
        }

        public async Task<InitiativeStageDetail> GetDetailToBeStageFromStageStatusToBe(ApprovalNewSystemParam approvalNewSystemParam)
        {
            //if(approvalNewSystemParam.ActionBy == "switch process")
            //{
            //    var nextProcess = await _context.SwitchProcessStageMapping.Where(x => x.OldProcess == approvalNewSystemParam.Process
            //    && x.OldStage == approvalNewSystemParam.NowStage && x.NewProcess == approvalNewSystemParam.SwitchToProcess).FirstOrDefaultAsync();
            //    var ToBeStageDetail = await _context.InitiativeStageDetail.Where(
            //    i => i.InitiativeId == approvalNewSystemParam.InitiativeId
            //    && i.FlowType == approvalNewSystemParam.FlowType
            //    && i.Process == approvalNewSystemParam.SwitchToProcess
            //    //&& i.Subtype == approvalNewSystemParam.SubType
            //    && i.CurrentStage == approvalNewSystemParam.NextStageToBe
            //    && i.CurrentStatus == approvalNewSystemParam.NextStatusToBe
            //    ).FirstOrDefaultAsync();

            //    return ToBeStageDetail;
            //}
            //else
            //{
            var ToBeStageDetail = await _context.InitiativeStageDetail.Where(
            i => i.InitiativeId == approvalNewSystemParam.InitiativeId
            && i.FlowType == approvalNewSystemParam.FlowType
            && i.Process == approvalNewSystemParam.Process
            && i.Subtype == approvalNewSystemParam.SubType
            && i.CurrentStage == approvalNewSystemParam.NextStageToBe
            && i.CurrentStatus == approvalNewSystemParam.NextStatusToBe
            ).FirstOrDefaultAsync();

            return ToBeStageDetail;
            //}

        }

        public async Task<ApprovalNewSystemParam> GetNowStageStatus(ApprovalNewSystemParam approvalNewSystemParam)
        {
            if (approvalNewSystemParam.FlowType == "initiative")
            {
                var initiatives = await GetInitiative(approvalNewSystemParam.InitiativeId);
                approvalNewSystemParam.NowStage = initiatives.Stage;
                approvalNewSystemParam.NowStatus = initiatives.Status;
            }
            else
            {
                var thisStageOfFlowType = await _context.InitiativeStage.Where(i => i.FlowType == approvalNewSystemParam.FlowType && i.InitiativeId == approvalNewSystemParam.InitiativeId).FirstOrDefaultAsync();
                if (thisStageOfFlowType != null)
                {
                    if (new string[] { "complete", "finish", "rejected", "cancelled", null }.Contains(thisStageOfFlowType.Status) && approvalNewSystemParam.ActionType == "submit") // case submit capex more than once
                    {
                        approvalNewSystemParam.NowStage = null;
                        approvalNewSystemParam.NowStatus = "draft";
                    }
                    else
                    {
                        approvalNewSystemParam.NowStage = thisStageOfFlowType.Stage;
                        approvalNewSystemParam.NowStatus = thisStageOfFlowType.Status;
                    }
                }
            }

            return approvalNewSystemParam;
        }

        public async Task<Owner[]> SetNextAction(ApprovalNewSystemParam approvalNewSystemParam)
        {
            var toBeStageDetail = await GetDetailToBeStageFromStageStatusToBe(approvalNewSystemParam);
            var toBeStageActionDetail = await GetDetailNextActionFromStageStatusToBe(approvalNewSystemParam);
            var maxCounterInitiativeAction = await GetLastCounterInitiativeAction(approvalNewSystemParam.InitiativeId);
            var maxCounterInitiativeActionByFlow = await GetLastCounterInitiativeActionByFlowType(approvalNewSystemParam);
            Owner[] Actioner = { };

            var iniActionToInactive = await _context.InitiativeActions.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId
            && i.FlowType == approvalNewSystemParam.FlowType
            && i.ActionResult == null
            && (i.IsInactive == null || i.IsInactive == false)
            && i.Counter == (maxCounterInitiativeActionByFlow == 0 ? 0 : maxCounterInitiativeActionByFlow - 1)).ToListAsync();

            foreach (var iniaction in iniActionToInactive)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(iniaction, "Initiative-8882", SQLCommandType.UPDATE, false);
                // End log
                iniaction.IsInactive = true;
            }

            await _context.SaveChangesAsync();


            foreach (var entity in toBeStageActionDetail)
            {
                DataTable dataTable = await _storeProcedure.ExecuteReturnDatatable($"sp_GetActionByFromActionByCode {approvalNewSystemParam.InitiativeId},'{entity.ActionBy}' ");
                if (dataTable.Rows.Count > 0)
                {
                    Actioner = CommonMethod.ConvertToArray<Owner>(dataTable);
                    foreach (var action in Actioner)
                    {
                        await AddInitiativeActionsNewSystem(action.Email, entity.ActionType, entity.ActionBy, approvalNewSystemParam.NextStatusToBe, approvalNewSystemParam.NextStageToBe, approvalNewSystemParam.InitiativeId, toBeStageDetail.InitiativeStageDetailId, maxCounterInitiativeAction, approvalNewSystemParam);
                    }
                }
            }

            return Actioner;
        }

        public async Task<int> UpdateActionByAfterAction(ApprovalNewSystemParam approvalNewSystemParam)
        {
            var initiativeActions = await _context.InitiativeActions.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.FlowType == approvalNewSystemParam.FlowType && i.Stage == approvalNewSystemParam.NowStage && i.Status == approvalNewSystemParam.NowStatus).ToListAsync();
            var maxCounterInitiativeAction = await GetLastCounterInitiativeAction(approvalNewSystemParam.InitiativeId);
            var maxCounterInitiativeActionByFlowType = await GetLastCounterInitiativeActionByFlowType(approvalNewSystemParam);
            if (initiativeActions.Any())
            {
                var initiativeActionByWhoAction = await _context.InitiativeActions.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.FlowType == approvalNewSystemParam.FlowType && (i.ActionBy == null ? "" : i.ActionBy).ToLower() == (approvalNewSystemParam.ActionBy == null ? "" : approvalNewSystemParam.ActionBy).ToLower() && i.Stage == approvalNewSystemParam.NowStage && i.Status == approvalNewSystemParam.NowStatus && i.ActionResult == null && (i.IsInactive == null || i.IsInactive == false) && i.Counter == (maxCounterInitiativeActionByFlowType == 0 ? 0 : maxCounterInitiativeActionByFlowType - 1)).FirstOrDefaultAsync();
                if (initiativeActionByWhoAction != null)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(initiativeActionByWhoAction, "Initiative-8913", SQLCommandType.UPDATE, false);
                    // End log

                    initiativeActionByWhoAction.ActionResult = approvalNewSystemParam.Direction;
                    initiativeActionByWhoAction.ActionDate = DateTime.Now;
                    //await UpdateInitiativeActionByConditionType(initiativeActionByWhoAction.Indicator, approvalNewSystemParam);
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(initiativeActionByWhoAction, "Initiative-8920", SQLCommandType.UPDATE, true);
                    // End log

                }
            }

            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateInitiativeActionByConditionType(string indicator, ApprovalNewSystemParam approvalNewSystemParam)
        {


            //if (conditionType == "all")
            //{
            //}
            //else if (conditionType == "one") // if not  "one"  then  it must be "all" no need to disabled approver
            //{

            //    //disable all action in this indicator
            //    var initiativeActionByWhoAction = await _context.InitiativeActions.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.FlowType == approvalNewSystemParam.FlowType && i.Indicator == indicator && i.ActionBy != approvalNewSystemParam.ActionBy).ToListAsync();
            //    if (initiativeActionByWhoAction.Any())
            //    {
            //        foreach (var entity in initiativeActionByWhoAction)
            //        {
            //            entity.IsInactive = true;
            //        }
            //    }
            //}



            return 0;
        }

        public async Task<bool> GetPassCondition(ApprovalNewSystemParam approvalNewSystemParam)
        { //TODO: GetPassCondition FRom InitiativeActions

            if (approvalNewSystemParam.ActionType == "approve" && new string[] { "revise", "reject", "reject cancellation" }.Contains(approvalNewSystemParam.Direction) == true) return true;
            if (approvalNewSystemParam.ActionType == "submit" && new string[] { "backward", "cancelled" }.Contains(approvalNewSystemParam.Direction) == true) return true;


            bool isFirstLoop = true;
            var returnValue = false;
            var isSkip = false;
            var nowStageDetail = await GetDetailCurrentStageFromDetail(approvalNewSystemParam);
            string tmpNextConditions;

            //logic to get pass condition

            if (nowStageDetail != null)
            {
                /////////////////////////////////////////////////////// Check Skip Condition
                var skipCondition = nowStageDetail.NextCondition.Split("|")[0];
                if (skipCondition.StartsWith("#"))
                {
                    DataTable dtSkipCondition = await _storeProcedure.ExecuteReturnDatatable($"sp_GetPassCondititon {approvalNewSystemParam.InitiativeId}, '{approvalNewSystemParam.FlowType}','{skipCondition}'");
                    if (dtSkipCondition.Rows.Count <= 0)
                    {
                        isSkip = false;
                    }
                    else
                    {
                        isSkip = bool.Parse(dtSkipCondition.Rows[0][0] == null ? "false" : dtSkipCondition.Rows[0][0].ToString());
                    }
                }
                //////////////////////////////////////////////////

                //replaced skipcondition only in case start with "#"

                if (skipCondition.StartsWith("#"))
                {
                    tmpNextConditions = nowStageDetail.NextCondition.Replace(skipCondition, "").Replace("|", "");
                }
                else
                {
                    tmpNextConditions = nowStageDetail.NextCondition;
                }

                string[] nextConditions = tmpNextConditions.Split('&');
                DataTable dataTable = new DataTable();

                foreach (var nextCondition in nextConditions)
                {
                    dataTable.Clear();
                    dataTable = await _storeProcedure.ExecuteReturnDatatable($"sp_GetPassCondititon {approvalNewSystemParam.InitiativeId}, '{approvalNewSystemParam.FlowType}','{nextCondition}'");
                    if (dataTable.Rows.Count <= 0)
                    {
                        returnValue = (isFirstLoop == true ? false : returnValue && false);
                    }
                    else
                    {
                        // if isFirstLoop == true then need to   "AND"  with current value of returnValue
                        returnValue = (isFirstLoop == true ? (bool.Parse(dataTable.Rows[0][0] == null ? "false" : dataTable.Rows[0][0].ToString())) : returnValue && (bool.Parse(dataTable.Rows[0][0] == null ? "false" : dataTable.Rows[0][0].ToString())));
                    }

                    isFirstLoop = false;
                }
            }

            approvalNewSystemParam.IsSkipFromGetPassCondition = isSkip;


            return (isSkip || returnValue);
        }

        public async Task<int> GetLastInitiativeStageDetailId()
        {
            var stageDetail = await _context.InitiativeStageDetail.OrderByDescending(i => i.InitiativeStageDetailId).FirstOrDefaultAsync();
            if (stageDetail == null)
                return 1;


            return await Task.FromResult(stageDetail.InitiativeStageDetailId + 1);
        }

        public async Task<string> GetEventOfInitiative(int id)
        {
            var initiative = await _context.Initiatives.Where(i => i.Id == id).FirstOrDefaultAsync();
            var capexInformation = await _context.CapexInformations.Where(i => i.InitiativeId == id).OrderByDescending(i => i.Sequent).FirstOrDefaultAsync();

            var nowFlowType = await GetFlowTypeOfInitiative(id);

            var initiativeStage = await _context.InitiativeStage.Where(i => i.FlowType == nowFlowType && i.InitiativeId == id).FirstOrDefaultAsync();

            if (nowFlowType == "initiative")
            {
                if ((initiative.Stage == null || initiative.Stage == "draft") && (initiative.Stage == null && !initiative.Status.Equals("revised")))
                {
                    return "createnew";
                }
                else
                {
                    return "next";
                }
            }
            else
            {
                if (initiativeStage == null) return "createnew";

                if ((initiativeStage.Stage == null || initiativeStage.Stage == "draft") || (initiativeStage.Status == "complete" || initiativeStage.Status == "finish" || initiativeStage.Status == "cancelled" || initiativeStage.Status == "rejected" || initiativeStage.Status == "reject"))
                {
                    return "createnew";
                }
                else
                {
                    return "next";
                }
            }
        }

        public async Task<string> GetFlowTypeOfInitiative(int id)
        {
            try
            {
                var initiative = await _context.Initiatives.Where(i => i.Id == id).FirstOrDefaultAsync();
                var capexInformation = await _context.CapexInformations.Where(i => i.InitiativeId == id).OrderByDescending(i => i.Sequent).FirstOrDefaultAsync();

                switch (initiative?.InitiativeType?.ToLower())
                {
                    case "max":
                        if (initiative.IsReviseFlow == true) return "revise";
                        if (initiative.IsRequestCapex == true && capexInformation != null)
                        {
                            if (capexInformation.CapexType.ToLower() == "createnew") return "requestcapex";
                            if (capexInformation.CapexType.ToLower() == "addmorecapex") return "addmore";
                            if (capexInformation.CapexType.ToLower() == "returncapex") return "return";
                        }
                        else
                        {
                            return "initiative";
                        }
                        break;

                    case "directcapex":
                        if (initiative.IsReviseFlow == true) return "revise";
                        if (initiative.IsRequestCapex == true && capexInformation != null)
                        {
                            if (capexInformation.CapexType.ToLower() == "createnew") return "initiative";
                            if (capexInformation.CapexType.ToLower() == "addmorecapex") return "addmore";
                            if (capexInformation.CapexType.ToLower() == "returncapex") return "return";
                        }
                        else
                        {
                            return "initiative";
                        }
                        break;

                    case "pim":
                        if (initiative.IsReviseFlow == true) return "revise";
                        if (initiative.IsRequestCapex == true && capexInformation != null)
                        {
                            if (capexInformation.CapexType.ToLower() == "createnew") return "initiative";
                            if (capexInformation.CapexType.ToLower() == "addmorecapex")
                            {
                                if (capexInformation.Revistion.Equals(1))
                                {
                                    return "initiative";
                                }
                                else
                                {
                                    return "addmore";

                                }
                            }
                            if (capexInformation.CapexType.ToLower() == "returncapex") return "return";
                        }
                        else
                        {
                            return "initiative";
                        }
                        break;

                    case "cim":
                        if (initiative.IsReviseFlow == true) return "revise";
                        if (initiative.IsRequestCapex == true && capexInformation != null)
                        {
                            if (capexInformation.CapexType.ToLower() == "createnew") return "requestcapex";
                            if (capexInformation.CapexType.ToLower() == "addmorecapex") return "addmore";
                            if (capexInformation.CapexType.ToLower() == "returncapex") return "return";
                        }
                        else
                        {
                            return "initiative";
                        }
                        break;

                    case "dim":
                        if (initiative.IsReviseFlow == true) return "revise";
                        if (initiative.IsRequestCapex == true && capexInformation != null)
                        {
                            if (capexInformation.CapexType.ToLower() == "createnew") return "initiative";
                            if (capexInformation.CapexType.ToLower() == "addmorecapex") return "addmore";
                            if (capexInformation.CapexType.ToLower() == "returncapex") return "return";
                        }
                        else
                        {
                            return "initiative";
                        }
                        break;

                    case "cpi":
                        return "initiative";
                        break;

                    case "strategy":
                        return "initiative";
                        break;

                    case "it":
                        return "initiative";
                        break;

                    case "digital":
                        return "initiative";
                        break;

                    case "request pool":
                        if (initiative.IsReviseFlow == true) return "revise";
                        if (initiative.IsRequestCapex == true && capexInformation != null)
                        {
                            if (capexInformation.CapexType.ToLower() == "createnew") return "initiative";
                            if (capexInformation.CapexType.ToLower() == "requestpool") return "initiative";
                            if (capexInformation.CapexType.ToLower() == "addmorecapex") return "addmore";
                            if (capexInformation.CapexType.ToLower() == "returncapex") return "return";
                        }
                        else
                        {
                            return "initiative";
                        }
                        break;

                }

                return "initiative";
            }
            catch (Exception ex)
            {
                return "initiative";
            }
        }

        public async Task<int> CreateStagesTracking(ApprovalNewSystemParam approvalNewSystemParam)
        {
            var maxHistoryStageDetail = await _context.InitiativeStageDetail.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.FlowType == approvalNewSystemParam.FlowType && i.Event == "createnew" && i.Process == approvalNewSystemParam.Process && i.Subtype == approvalNewSystemParam.SubType && i.CurrentStage != null).OrderByDescending(i => i.HistoryId).FirstOrDefaultAsync();
            var stageDetail = await _context.InitiativeStageDetail.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.FlowType == approvalNewSystemParam.FlowType && i.Event == "createnew" && i.Process == approvalNewSystemParam.Process && i.Subtype == approvalNewSystemParam.SubType && i.CurrentStage != null && i.HistoryId == (maxHistoryStageDetail == null ? i.HistoryId : maxHistoryStageDetail.HistoryId)).OrderBy(i => i.Sequence).ToListAsync();
            var initiative = await _context.Initiatives.Where(i => i.Id == approvalNewSystemParam.InitiativeId).FirstOrDefaultAsync();
            var lastHistoryId = await LastHistoryId(approvalNewSystemParam.InitiativeId);
            if (approvalNewSystemParam.FlowType == "initiative")
            {
                var seq = 1;
                foreach (var entity in stageDetail)
                {
                    _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                    {
                        InitiativeId = entity.InitiativeId,
                        ProcessType = entity.Process,
                        SubType = entity.Subtype,
                        Sequence = seq,
                        RunningSequence = seq,
                        Stage = entity.CurrentStage,
                        Status = "Not Start",
                        ApprovedBy = null,
                        ApprovedDate = null,
                        HistoryId = lastHistoryId,
                        FlowType = approvalNewSystemParam.FlowType,
                    });

                    seq++;
                }
            }
            else
            {
                var initiativeStatusTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.Stage == initiative.Stage && i.SubType == approvalNewSystemParam.SubType).OrderByDescending(i => i.RunningSequence).FirstOrDefaultAsync();

                if (initiativeStatusTrackings != null)
                {
                    decimal addSequence = (decimal)0.01;
                    var seq = initiativeStatusTrackings.RunningSequence;
                    var statustrackingsforcheckMaxSequence = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.SubType == approvalNewSystemParam.SubType && i.RunningSequence >= seq && i.RunningSequence < seq + 1).OrderByDescending(i => i.RunningSequence).FirstOrDefaultAsync();
                    seq = statustrackingsforcheckMaxSequence.RunningSequence;
                    foreach (var entity in stageDetail)
                    {
                        _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                        {
                            InitiativeId = entity.InitiativeId,
                            ProcessType = entity.Process,
                            SubType = entity.Subtype,
                            Sequence = seq + addSequence,
                            RunningSequence = seq + addSequence,
                            Stage = entity.CurrentStage,
                            Status = "Not Start",
                            ApprovedBy = null,
                            ApprovedDate = null,
                            HistoryId = lastHistoryId,
                            FlowType = approvalNewSystemParam.FlowType,
                        });

                        addSequence += (decimal)0.01;
                    }
                }
            }
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(approvalNewSystemParam, "Initiative-9250", SQLCommandType.INSERT);
            // End log


            return await _context.SaveChangesAsync();
        }

        public async Task<int> CreateStagesTrackingSwitchProcess(ApprovalNewSystemParam approvalNewSystemParam)
        {
            var maxHistoryStageDetail = await _context.InitiativeStageDetail.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.FlowType == approvalNewSystemParam.FlowType && i.Event == "switchProcess" && i.Process == approvalNewSystemParam.Process && i.Subtype == approvalNewSystemParam.SubType && i.CurrentStage != null).OrderByDescending(i => i.HistoryId).FirstOrDefaultAsync();
            var stageDetail = await _context.InitiativeStageDetail.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.FlowType == approvalNewSystemParam.FlowType && i.Event == "switchProcess" && i.Process == approvalNewSystemParam.Process && i.Subtype == approvalNewSystemParam.SubType && i.CurrentStage != null && i.HistoryId == (maxHistoryStageDetail == null ? i.HistoryId : maxHistoryStageDetail.HistoryId)).OrderBy(i => i.Sequence).ToListAsync();
            var initiative = await _context.Initiatives.Where(i => i.Id == approvalNewSystemParam.InitiativeId).FirstOrDefaultAsync();
            var lastHistoryId = await LastHistoryId(approvalNewSystemParam.InitiativeId);
            if (approvalNewSystemParam.FlowType == "initiative")
            {
                var seq = 1;
                foreach (var entity in stageDetail)
                {
                    _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                    {
                        InitiativeId = entity.InitiativeId,
                        ProcessType = entity.Process,
                        SubType = entity.Subtype,
                        Sequence = seq,
                        RunningSequence = seq,
                        Stage = entity.CurrentStage,
                        Status = "Not Start",
                        ApprovedBy = null,
                        ApprovedDate = null,
                        HistoryId = lastHistoryId,
                        FlowType = approvalNewSystemParam.FlowType,
                    });

                    seq++;
                }
            }
            else
            {
                var initiativeStatusTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.Stage == initiative.Stage && i.SubType == approvalNewSystemParam.SubType).OrderByDescending(i => i.RunningSequence).FirstOrDefaultAsync();

                if (initiativeStatusTrackings != null)
                {
                    decimal addSequence = (decimal)0.01;
                    var seq = initiativeStatusTrackings.RunningSequence;
                    var statustrackingsforcheckMaxSequence = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.SubType == approvalNewSystemParam.SubType && i.RunningSequence >= seq && i.RunningSequence < seq + 1).OrderByDescending(i => i.RunningSequence).FirstOrDefaultAsync();
                    seq = statustrackingsforcheckMaxSequence.RunningSequence;
                    foreach (var entity in stageDetail)
                    {
                        _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                        {
                            InitiativeId = entity.InitiativeId,
                            ProcessType = entity.Process,
                            SubType = entity.Subtype,
                            Sequence = seq + addSequence,
                            RunningSequence = seq + addSequence,
                            Stage = entity.CurrentStage,
                            Status = "Not Start",
                            ApprovedBy = null,
                            ApprovedDate = null,
                            HistoryId = lastHistoryId,
                            FlowType = approvalNewSystemParam.FlowType,
                        });

                        addSequence += (decimal)0.01;
                    }
                }
            }
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(approvalNewSystemParam, "Initiative-9318", SQLCommandType.INSERT);
            // End log

            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateStatusInitiativeStatusTrackings_Now(ApprovalNewSystemParam approvalNewSystemParam, DateTime dateTime, bool isSkipped = false)
        {
            //if (approvalNewSystemParam.ActionType == "submit" && new string[] { "revised", "draft" }.Contains(approvalNewSystemParam.NowStatus) == true) return 0;
            if (approvalNewSystemParam.ActionType == "approve" && new string[] { "revise", "reject cancellation" }.Contains(approvalNewSystemParam.Direction) == true) return 0;
            //if (approvalNewSystemParam.ActionType == "switch process") return 0;

            string[] actionByNames = await GetOwnerName(approvalNewSystemParam.ActionBy);

            var initiativeTrackingQureyable = _context.InitiativeStatusTrackings.AsQueryable();

            if (isSkipped == true)
            {
                initiativeTrackingQureyable = initiativeTrackingQureyable.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.Stage == approvalNewSystemParam.NowStage && i.SubType == approvalNewSystemParam.SubType && i.FlowType == approvalNewSystemParam.FlowType).OrderByDescending(i => i.HistoryId).ThenByDescending(i => i.RunningSequence);
            }
            else
            {
                initiativeTrackingQureyable = initiativeTrackingQureyable.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.Stage == approvalNewSystemParam.NowStage && (actionByNames.Contains(i.ApprovedBy) || i.ApprovedBy == null) && i.SubType == approvalNewSystemParam.SubType && i.FlowType == approvalNewSystemParam.FlowType).OrderByDescending(i => i.HistoryId).ThenByDescending(i => i.RunningSequence);
            }

            var initiativeTrackings = await initiativeTrackingQureyable.FirstOrDefaultAsync();

            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiativeTrackings, "Initiative-9346", SQLCommandType.UPDATE, false);
            // End log

            if (initiativeTrackings == null)
                return 0;

            initiativeTrackings.Status = "Complete";
            initiativeTrackings.ApprovedDate = dateTime.ToString("yyyy-MM-dd HH:mm:ss", new System.Globalization.CultureInfo("en-US"));

            if (approvalNewSystemParam.ActionType == "submit")
            {
                initiativeTrackings.ApprovedBy = actionByNames.FirstOrDefault();
            }

            if (isSkipped == true)
            {
                //initiativeTrackings.Status = "Complete";
                //if (approvalNewSystemParam.NowStage.Contains("App. Request") || approvalNewSystemParam.NowStage.Contains("WBS Request"))

                if (approvalNewSystemParam.IsSkipFromGetPassCondition)
                {
                    initiativeTrackings.Status = "Skipped";
                    initiativeTrackings.ApprovedBy = null;
                    initiativeTrackings.ApprovedDate = null;
                }
                else
                {
                    initiativeTrackings.Status = "Complete";
                    if (approvalNewSystemParam.ActionBy == "SYSTEM")
                    {
                        initiativeTrackings.ApprovedBy = "SYSTEM";
                    }
                }
            }

            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiativeTrackings, "Initiative-9375", SQLCommandType.UPDATE, true);
            // End log
            return await _context.SaveChangesAsync();
        }


        public async Task<int> UpdateApprovedByInitiativeStatusTrackings_ToBe(ApprovalNewSystemParam approvalNewSystemParam)
        {
            // if stage mode edit then change only Stauts = "In Progress"
            //update / insert approved by in StatusTrackings
            //use actionbyname from initiativeaction   check isInaction == null or false
            var MaxHistoryInitiativeTrackingsToChangeApprovedBy = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.SubType == approvalNewSystemParam.SubType && i.Stage == approvalNewSystemParam.NextStageToBe && i.FlowType == approvalNewSystemParam.FlowType).OrderByDescending(i => i.HistoryId).FirstOrDefaultAsync();
            var maxCounterInitiativeActionByFlowType = await GetLastCounterInitiativeActionByFlowType(approvalNewSystemParam);
            var initiativeActions = await _context.InitiativeActions.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.Stage == approvalNewSystemParam.NextStageToBe && i.FlowType == approvalNewSystemParam.FlowType && i.ActionResult == null && (i.IsInactive == null || i.IsInactive == false) && i.Counter == (maxCounterInitiativeActionByFlowType == 0 ? 0 : maxCounterInitiativeActionByFlowType - 1)).ToListAsync();
            var startInitiativeTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.Stage == approvalNewSystemParam.NextStageToBe && i.SubType == approvalNewSystemParam.SubType && i.HistoryId == (MaxHistoryInitiativeTrackingsToChangeApprovedBy == null ? 0 : MaxHistoryInitiativeTrackingsToChangeApprovedBy.HistoryId)).OrderBy(i => i.RunningSequence).FirstOrDefaultAsync();
            var startInitiativeTrackingsChangeSeq = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.Stage == approvalNewSystemParam.NextStageToBe && i.SubType == approvalNewSystemParam.SubType && i.HistoryId == (MaxHistoryInitiativeTrackingsToChangeApprovedBy == null ? 0 : MaxHistoryInitiativeTrackingsToChangeApprovedBy.HistoryId)).OrderByDescending(i => i.RunningSequence).FirstOrDefaultAsync();

            if (!initiativeActions.Any())
                return 0;

            if (startInitiativeTrackings == null || startInitiativeTrackingsChangeSeq == null)
                return 0;

            if (initiativeActions[0].Action == "edit")  //mode edit do not change approved by
            {

                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(startInitiativeTrackings, "Initiative-9401", SQLCommandType.UPDATE, false);
                // End log
                startInitiativeTrackings.Status = "In Progress";

                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(startInitiativeTrackings, "Initiative-9407", SQLCommandType.UPDATE, true);
                // End log
                return await _context.SaveChangesAsync();
            }



            var startSeqToEdit = startInitiativeTrackings.RunningSequence;
            var startSeqToChangeSeq = startInitiativeTrackings.RunningSequence;
            //var initiativeTrackingsToChangeApprovedBy = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.SubType == approvalNewSystemParam.SubType && i.Stage == approvalNewSystemParam.NextStageToBe && i.FlowType == approvalNewSystemParam.FlowType && i.HistoryId == (MaxHistoryInitiativeTrackingsToChangeApprovedBy == null ? 0 : MaxHistoryInitiativeTrackingsToChangeApprovedBy.HistoryId)).OrderBy(i => i.RunningSequence).ToListAsync();
            var initiativeTrackingsToChangeApprovedBy = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.SubType == approvalNewSystemParam.SubType && i.Stage == approvalNewSystemParam.NextStageToBe && i.FlowType == approvalNewSystemParam.FlowType && i.HistoryId == (MaxHistoryInitiativeTrackingsToChangeApprovedBy == null ? 0 : MaxHistoryInitiativeTrackingsToChangeApprovedBy.HistoryId)).OrderBy(i => i.RunningSequence).ToListAsync();
            var initiativeTrackingsToChangeSequence = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.SubType == approvalNewSystemParam.SubType && i.RunningSequence > startSeqToChangeSeq).OrderBy(i => i.RunningSequence).ToListAsync();
            var lastHistory = await LastHistoryId(approvalNewSystemParam.InitiativeId);

            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiativeTrackingsToChangeApprovedBy, "Initiative-9422", SQLCommandType.DELETE);
            // End log

            _context.InitiativeStatusTrackings.RemoveRange(initiativeTrackingsToChangeApprovedBy);

            foreach (var iniAction in initiativeActions)
            {
                if (approvalNewSystemParam.Direction == "switch process")
                {
                    _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                    {
                        ApprovedBy = iniAction.ActionByName,
                        InitiativeId = approvalNewSystemParam.InitiativeId,
                        HistoryId = (MaxHistoryInitiativeTrackingsToChangeApprovedBy == null ? 0 : MaxHistoryInitiativeTrackingsToChangeApprovedBy.HistoryId),
                        ProcessType = approvalNewSystemParam.Process,
                        Stage = approvalNewSystemParam.NextStageToBe,
                        SubType = approvalNewSystemParam.SubType,
                        Status = "In Progress",
                        Sequence = startSeqToEdit,
                        RunningSequence = startSeqToEdit,
                        FlowType = approvalNewSystemParam.FlowType,
                    });
                }
                else
                {
                    _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                    {
                        ApprovedBy = iniAction.ActionByName,
                        InitiativeId = approvalNewSystemParam.InitiativeId,
                        HistoryId = (MaxHistoryInitiativeTrackingsToChangeApprovedBy == null ? 0 : MaxHistoryInitiativeTrackingsToChangeApprovedBy.HistoryId),
                        ProcessType = approvalNewSystemParam.Process,
                        Stage = approvalNewSystemParam.NextStageToBe,
                        SubType = approvalNewSystemParam.SubType,
                        Status = "In Progress",
                        Sequence = startSeqToEdit,
                        RunningSequence = startSeqToEdit,
                        FlowType = approvalNewSystemParam.FlowType,
                    });
                }

                startSeqToEdit += (approvalNewSystemParam.FlowType == "initiative" ? 1 : (decimal)0.01);
            }

            foreach (var statusTrackings in initiativeTrackingsToChangeSequence)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTrackings, "Initiative-9468", SQLCommandType.UPDATE, false);
                // End log

                statusTrackings.RunningSequence = startSeqToEdit += (statusTrackings.FlowType == "initiative" ? 1 : (decimal)0.01);
                statusTrackings.Sequence = startSeqToEdit += (statusTrackings.FlowType == "initiative" ? 1 : (decimal)0.01);
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(statusTrackings, "Initiative-9474", SQLCommandType.UPDATE, true);
                // End log

            }


            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateStatusNotStartInitiativeStatusTrackings_NextOfToBe(ApprovalNewSystemParam approvalNewSystemParam)
        {
            //check initiativeType = IT and DIgital
            if ((approvalNewSystemParam.Process.ToUpper().Equals("IT") || approvalNewSystemParam.Process.ToUpper().Equals("DIGITAL")) && approvalNewSystemParam.Direction.Equals("revise"))
            {
                //remove InitiativeStatusTrackings
                var startInitiativeTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId.Equals(approvalNewSystemParam.InitiativeId)).OrderByDescending(i => i.RunningSequence).ToListAsync();
                _context.InitiativeStatusTrackings.RemoveRange(startInitiativeTrackings);
                await _context.SaveChangesAsync();

                //add new 
                var stageDetail = await _context.InitiativeStageDetail.Where(x => x.InitiativeId.Equals(approvalNewSystemParam.InitiativeId) && !String.IsNullOrEmpty(x.CurrentStage) && x.Event.Equals("createnew")).OrderBy(i => i.Sequence).ToListAsync();
                var startSeqToEdit = (decimal)0.00;
                foreach (var list in stageDetail)
                {
                    _context.InitiativeStatusTrackings.Add(new InitiativeStatusTracking()
                    {
                        Id = 0,
                        ApprovedBy = null,
                        InitiativeId = approvalNewSystemParam.InitiativeId,
                        HistoryId = 0,
                        ProcessType = approvalNewSystemParam.Process,
                        Stage = list.CurrentStage,
                        SubType = approvalNewSystemParam.SubType,
                        Status = "Not Start",
                        Sequence = startSeqToEdit,
                        RunningSequence = startSeqToEdit,
                        FlowType = approvalNewSystemParam.FlowType,
                    });
                    startSeqToEdit += (approvalNewSystemParam.FlowType == "initiative" ? 1 : (decimal)0.01);
                }

            }
            else
            {
                //update status trackings of next now stage in progress to not start
                var startInitiativeTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.Stage == approvalNewSystemParam.NextStageToBe && i.SubType == approvalNewSystemParam.SubType).OrderByDescending(i => i.RunningSequence).FirstOrDefaultAsync();

                if (startInitiativeTrackings == null)
                    return 0;

                var startSeqToEdit = startInitiativeTrackings.RunningSequence;

                var initiativeTrackingsToChangeSequence = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.SubType == approvalNewSystemParam.SubType && i.RunningSequence > startSeqToEdit).OrderBy(i => i.RunningSequence).ToListAsync();

                foreach (var statusTrackings in initiativeTrackingsToChangeSequence)
                {
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(statusTrackings, "Initiative-9499", SQLCommandType.UPDATE, false);
                    // End log
                    statusTrackings.Status = "Not Start";
                    statusTrackings.ApprovedDate = null;
                    // Temporary Log for Invetigate 2021-07-21
                    LogInsight.Log(statusTrackings, "Initiative-9504", SQLCommandType.UPDATE, true);
                    // End log
                }
            }

            return await _context.SaveChangesAsync();
        }

        public async Task<int> RemoveInitiativeStatusTrackingsInProgress(ApprovalNewSystemParam approvalNewSystemParam)
        {
            if (approvalNewSystemParam.ActionType == "approve" && new string[] { "revise", "reject", "reject cancellation" }.Contains(approvalNewSystemParam.Direction) == true) return 0;
            if (approvalNewSystemParam.ActionType == "submit" && new string[] { "backward", "cancelled" }.Contains(approvalNewSystemParam.Direction) == true) return 0;

            if (new string[] { "revised", "draft" }.Contains(approvalNewSystemParam.NowStatus) == true)
            {
                return 0;
            }

            var MaxInitiativeStatusTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.Stage == approvalNewSystemParam.NowStage && i.SubType == approvalNewSystemParam.SubType && i.Status == "In Progress").OrderByDescending(i => i.HistoryId).FirstOrDefaultAsync();
            var initiativeStatusTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.ProcessType == approvalNewSystemParam.Process && i.Stage == approvalNewSystemParam.NowStage && i.SubType == approvalNewSystemParam.SubType && i.Status == "In Progress" && i.HistoryId == (MaxInitiativeStatusTrackings == null ? 0 : MaxInitiativeStatusTrackings.HistoryId)).OrderBy(i => i.RunningSequence).ToListAsync();

            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiativeStatusTrackings, "Initiative-9522", SQLCommandType.DELETE);
            // End log

            _context.InitiativeStatusTrackings.RemoveRange(initiativeStatusTrackings);

            return await _context.SaveChangesAsync();
        }

        public async Task<string[]> GetOwnerName(string email)
        {
            var owners = await _context.Owners.Where(i => i.Email == email).Select(i => i.OwnerName).ToArrayAsync();
            if (owners != null)
                return owners;

            return new string[] { };
        }

        public async Task<List<Initiative>> GetInitiativeKpi(string param)
        {
            // get selected year
            var getKpiInitiativeId = await _context.MaintainKpi.Select(x => x.InitiativeId).ToArrayAsync();
            var getByKpiyear = await _context.Initiatives.Where(x => getKpiInitiativeId.Contains(x.Id) && (x.HistoryFlag == null || x.HistoryFlag == 0))
                .Select(x => new Models.Initiative.Initiative { Id = x.Id, Name = x.InitiativeCode + " " + x.Name }).ToListAsync();

            if (param.Length > 0)
            {
                //var initiatives = await _context.Initiatives.Where(s => s.Name.Contains(param) && (s.Status != "cancelled" || s.Status != "draft" || s.Status != "reject")).Take(20).ToListAsync();
                var initiatives = await _context.Initiatives.Where(s => s.Name.Contains(param) && (s.HistoryFlag == null || s.HistoryFlag == 0)).Take(20)
                    .Select(x => new Models.Initiative.Initiative { Id = x.Id, Name = x.InitiativeCode + " " + x.Name }).ToListAsync();
                initiatives = initiatives.Union(getByKpiyear).ToList();
                return initiatives;
            }
            else
            {
                //var initiatives = await _context.Initiatives.Where(s => s.Status != "cancelled" || s.Status != "draft" || s.Status != "reject").OrderByDescending(i => i.Id).Take(20).ToListAsync();
                var initiatives = await _context.Initiatives.Where(x => (x.HistoryFlag == null || x.HistoryFlag == 0)).OrderByDescending(i => i.Id).Take(20)
                    .Select(x => new Models.Initiative.Initiative { Id = x.Id, Name = x.InitiativeCode + " " + x.Name }).ToListAsync();
                initiatives = initiatives.Union(getByKpiyear).ToList();
                return initiatives;
            }
        }

        public async Task CallMicrosoftFlow(int id, string action, string URLType)
        {
            var iniType = await _context.Initiatives.Where(i => i.Id == id).FirstOrDefaultAsync();
            if (!String.IsNullOrEmpty(URLType))
            {
                if (action.Equals("PDD"))
                {
                    var stringContent = new StringContent(JsonConvert.SerializeObject(
                      new
                      {
                          INIID = id.ToString()
                      }), Encoding.UTF8, "application/json");

                    var client = _clientFactory.CreateClient();

                    var response = await client.PostAsync(URLType, stringContent);
                }
                else
                {
                    var stringContent = new StringContent("[" + JsonConvert.SerializeObject(
                      new
                      {
                          INIID = id.ToString(),
                          ACTION = action,
                          INITYPE = iniType.InitiativeType
                      }
                        ) + "]", Encoding.UTF8, "application/json");

                    var client = _clientFactory.CreateClient();

                    var response = await client.PostAsync(URLType, stringContent);
                }


            }
        }

        public async Task<bool> UpdateCreateType(int id, int? createType)
        {
            var getinitiative = await _context.Initiatives.Where(x => x.Id == id).FirstOrDefaultAsync();
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(getinitiative, "Initiative-9594", SQLCommandType.UPDATE, false);
            // End log

            getinitiative.CreateType = createType;

            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(getinitiative, "Initiative-9600", SQLCommandType.UPDATE, true);
            // End log

            _context.Update(getinitiative);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<object> GetRequestPoolPimInitiativeList(SearchConditonPoolPim searchConditonPoolPim)
        {
            //var getinitiative = await _context.Initiatives.Where(x => x.Id == id).FirstOrDefaultAsync();
            //getinitiative.CreateType = createType;
            //_context.Update(getinitiative);
            //await _context.SaveChangesAsync();
            //(organization,plant,gate)
            var organization = searchConditonPoolPim.Organization != null ? searchConditonPoolPim.Organization : "";
            var plant = searchConditonPoolPim.Plant != null ? searchConditonPoolPim.Plant : "";
            var gate = searchConditonPoolPim.Gate != null ? searchConditonPoolPim.Gate : "";

            DataTable dataTable = new DataTable();
            try
            {
                dataTable = await _storeProcedure.ExecuteReturnDatatable($"sp_RequestPoolPimInitiativeList '{organization}','{plant}','{gate}'");  //sp_RequestPoolPimInitiativeList
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return dataTable;
        }

        public async Task<int> GetLastCounterInitiativeAction(int id)
        {
            //Use field counter for tag sequence of action
            var initiativeAction = await _context.InitiativeActions.Where(i => i.InitiativeId == id).OrderByDescending(i => i.Counter).FirstOrDefaultAsync();

            if (initiativeAction == null)
            {
                return 0;
            }

            return initiativeAction.Counter + 1;
        }

        public async Task<int> GetLastCounterInitiativeActionByFlowType(ApprovalNewSystemParam approvalNewSystemParam)
        {
            //Use field counter for tag sequence of action
            var initiativeAction = await _context.InitiativeActions.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId && i.FlowType == approvalNewSystemParam.FlowType).OrderByDescending(i => i.Counter).FirstOrDefaultAsync();

            if (initiativeAction == null)
            {
                return 0;
            }

            return initiativeAction.Counter + 1;
        }

        public async Task<int> UpdateFromFieldSSPIM(int id, string SSPIM, ApprovalNewSystemParam approvalNewSystemParam)
        {

            var initiative = await GetInitiative(id);

            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiative, "Initiative-9662", SQLCommandType.UPDATE, false);
            // End log

            if (approvalNewSystemParam.Process == "cim")
            {
                if (approvalNewSystemParam.NowStage == "Commercial Operation-2" || approvalNewSystemParam.NowStage == "Closing-2")
                {
                    initiative.VPPlantOwner = SSPIM;
                }
                else if (approvalNewSystemParam.NowStage == "Commercial Operation-3" || approvalNewSystemParam.NowStage == "Closing-3")
                {
                    initiative.DMPlantOwner = SSPIM;
                }
                else if (approvalNewSystemParam.NowStage == "Commercial Operation-4" || approvalNewSystemParam.NowStage == "Closing-4")
                {
                    initiative.LookbackOwner = SSPIM;
                }
                else
                {
                    if (SSPIM != null && initiative.SSPIM == null)
                        initiative.SSPIM = SSPIM;
                }
            }
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiative, "Initiative-9687", SQLCommandType.UPDATE, true);
            // End log

            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateUpdatedDate_UpdatedBy(int id, string updatedBy, DateTime? dateTime = null)
        {
            var initiative = await GetInitiative(id);
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiative, "Initiative-9697", SQLCommandType.UPDATE, false);
            // End log
            initiative.UpdatedDate = dateTime == null ? DateTime.Now : dateTime;
            initiative.UpdatedBy = updatedBy;
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiative, "Initiative-9701", SQLCommandType.UPDATE, true);
            // End log
            return await _context.SaveChangesAsync();
        }
        public async Task<int> UpdateLastSubmittedDate(int id, DateTime? dateTime = null)
        {
            var initiative = await GetInitiative(id);
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiative, "Initiative-9710", SQLCommandType.UPDATE, true);
            // End log
            initiative.LastSubmittedDate = dateTime == null ? DateTime.Now : dateTime;
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiative, "Initiative-9714", SQLCommandType.UPDATE, true);
            // End log
            return await _context.SaveChangesAsync();
        }

        public async Task<List<V_InitiativeStageDetail>> GetInitiativeStages(int id)
        {
            var initiatives = await GetInitiative(id);
            var stages = new List<V_InitiativeStageDetail>();
            if (initiatives.InitiativeType != null)
            {
                stages = await _context.V_InitiativeStageDetail.Where(i => i.Process.ToLower() == initiatives.InitiativeType.ToLower()).ToListAsync();

            }

            return stages;
        }
        public async Task<List<InitiativeStageDetail>> GetInitiativeStagesByInitiativeId(int id)
        {
            var initiatives = await GetInitiative(id);
            var stages = new List<InitiativeStageDetail>();
            if (initiatives.InitiativeType != null)
            {
                stages = await _context.InitiativeStageDetail.Where(i => i.Process.ToLower() == initiatives.InitiativeType.ToLower() && i.InitiativeId == id).ToListAsync();
            }

            return stages;
        }

        public async Task<bool> GetIsViewSubmittoForm(InitiativeIdEmail initiativeIdEmail)
        {
            bool returnValue = false;

            try
            {
                var initiative = await _context.Initiatives.Where(x => x.Id.Equals(initiativeIdEmail.Id)).FirstOrDefaultAsync();
                if (initiative != null && initiative.InitiativeType == "max")
                {
                    var owner = await _context.Owners.Where(x => x.Email.ToUpper().Equals(initiativeIdEmail.Email.ToUpper())).FirstOrDefaultAsync();
                    var detailInfo = await _context.DetailInformations.Where(x => x.InitiativeId.Equals(initiativeIdEmail.Id)).FirstOrDefaultAsync();
                    //var initiativeAction = await _context.InitiativeActions.Where(x => x.InitiativeId.Equals(initiativeIdEmail.Id)
                    //    && x.Counter.Equals(_context.InitiativeActions.Where(z => z.InitiativeId.Equals(initiativeIdEmail.Id)).Max(y => y.Counter)))
                    //    .ToListAsync();
                    //var havePermission = initiativeAction.Where(x => x.ActionBy.ToUpper().Equals(initiativeIdEmail.Email.ToUpper())).FirstOrDefault();

                    //get Permission not Owner and Creator
                    var getPermissions = await (from ur in _context.UserRoles
                                                join rp in _context.RolePermission on ur.RoleId equals rp.RoleId.ToString()
                                                join rs in _context.RoleSettingDetail on rp.PermissionMasterId equals rs.PermissionMasterId
                                                join rd in _context.RoleDetailSetting on rp.RoleId equals rd.Id
                                                where ur.Email.ToUpper().Trim().Equals(initiativeIdEmail.Email.ToUpper().Trim())
                                                select new RoleSettingDetail()
                                                {
                                                    Id = rs.Id,
                                                    PageId = rs.PageId,
                                                    SectionId = rs.SectionId,
                                                    FieldName = rs.FieldName,
                                                    IsVisible = rs.IsVisible,
                                                    IsEnable = rs.IsEnable,
                                                    IsIndividual = rs.IsIndividual,
                                                    Parameter01 = rs.Parameter01,
                                                    Parameter02 = rs.Parameter02,
                                                    Parameter03 = rs.Parameter03,
                                                    Parameter04 = rs.Parameter04,
                                                    Parameter05 = rs.Parameter05,
                                                    Parameter06 = rs.Parameter06,
                                                    Parameter07 = rs.Parameter07,
                                                    Parameter08 = rs.Parameter08,
                                                    Parameter09 = rs.Parameter09,
                                                    Parameter10 = rs.Parameter10,
                                                    Parameter11 = rs.Parameter11,
                                                    Parameter12 = rs.Parameter12,
                                                    Parameter13 = rs.Parameter13,
                                                    Parameter14 = rs.Parameter14,
                                                    Parameter15 = rs.Parameter15,
                                                    Parameter16 = rs.Parameter16,
                                                    Parameter17 = rs.Parameter17,
                                                    Parameter18 = rs.Parameter18,
                                                    Parameter19 = rs.Parameter19,
                                                    Parameter20 = rs.Parameter20,
                                                    RoleId = rd.Id.ToString(),
                                                    RoleName = rd.RoleName,
                                                    InitiativeType = rs.InitiativeType,
                                                    Stage = rs.Stage,
                                                    Status = rs.Status,
                                                    TypeOfInvestment = rs.TypeOfInvestment,
                                                    Priority = rs.Priority,
                                                    PermissionMasterId = rs.PermissionMasterId
                                                }).Distinct().ToListAsync();

                    //not have permission
                    if (getPermissions.Count <= 0)
                    {
                        //is Owner and Creator
                        if (((initiative != null
                            && owner != null
                            && initiative.OwnerName.Equals(owner.OwnerName))
                            || (initiative != null
                            && !String.IsNullOrEmpty(initiative.CreatedBy)
                            && initiative.CreatedBy.ToUpper().Equals(initiativeIdEmail.Email.ToUpper()))))
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    //check for not have data for submit
                    // SPOC All Workstream is SPOC
                    var spocPermission = getPermissions.Where(x => x.PageId.Equals("EDITALLTYPEMAX") && x.RoleName.ToLower().Equals("spoc all workstream") && x.InitiativeType.Equals(initiative.InitiativeType)).FirstOrDefault();
                    // Young Leader  All Sub Workstream
                    var youngLeadAllWorkStreamPermission = getPermissions.Where(x => x.PageId.Equals("EDITALLTYPEMAX")
                     && (x.RoleName.ToLower().Equals("young leader  all sub workstream")
                     || x.RoleName.ToLower().Equals(("TO Team   All Sub Workstream").ToLower())
                     || x.RoleName.ToLower().Equals(("TF-BT-TO   All Sub Workstream").ToLower())
                     || x.RoleName.ToLower().Equals(("TO Finance  All Sub Workstream").ToLower()))
                     && x.InitiativeType.Equals(initiative.InitiativeType)).FirstOrDefault();
                    // Young Leader  By Sub Workstream
                    var youngLeadByWorkStreamPermission = getPermissions.Where(x => x.PageId.Equals("EDITBYWORKSTREAM") && x.Parameter01.Equals(detailInfo.Workstream)).FirstOrDefault();


                    if (spocPermission != null || youngLeadAllWorkStreamPermission != null || youngLeadByWorkStreamPermission != null)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {

                    DataTable dataTable = await _storeProcedure.ExecuteReturnDatatable($"sp_GetIsViewSubmittoForm {initiativeIdEmail.Id},'{initiativeIdEmail.Email}'");
                    if (dataTable.Rows.Count <= 0)
                    {
                        returnValue = false;
                    }
                    else
                    {
                        returnValue = bool.Parse(dataTable.Rows[0][0] == null ? "false" : dataTable.Rows[0][0].ToString());
                    }
                }
            }
            catch (Exception ex)
            {

            }


            return returnValue;
        }

        public async Task<IEnumerable<InitiativeList>> Get3Dots(IEnumerable<InitiativeList> initiative)
        {

            foreach (var ini in initiative)
            {
                try
                {
                    var nowFlowType = await GetFlowTypeOfInitiative(ini.Id);
                    DataTable dataTable = await Get3Dots(ini.Id, nowFlowType);
                    ini.IsAddMore = await GetIsAddMore(ini.Id, nowFlowType, dataTable);
                    ini.IsRevise = await GetIsRevise(ini.Id, nowFlowType, dataTable);
                    ini.IsReturn = await GetIsReturn(ini.Id, nowFlowType, dataTable);
                }
                catch (Exception ex)
                {

                }
            }

            return initiative;
        }

        public async Task<IEnumerable<InitiativeList>> GetNowStatus(IEnumerable<InitiativeList> initiative)
        {

            foreach (var ini in initiative)
            {
                try
                {
                    var nowFlowType = await GetFlowTypeOfInitiative(ini.Id);

                    ApprovalNewSystemParam approvalNewSystemParam = new ApprovalNewSystemParam()
                    {
                        InitiativeId = ini.Id,
                        FlowType = nowFlowType,
                    };

                    approvalNewSystemParam = await GetNowStageStatus(approvalNewSystemParam);
                    ini.Stage = approvalNewSystemParam.NowStage;
                    ini.Status = approvalNewSystemParam.NowStatus;
                }
                catch (Exception ex)
                {

                }
            }

            return initiative;
        }

        public async Task<DataTable> Get3Dots(int id, string nowFlowType)
        {
            bool returnValue = false;

            try
            {
                DataTable dataTable = await _storeProcedure.ExecuteReturnDatatable($"sp_Get3Dots {id}, '{nowFlowType}'");
                return dataTable;
            }
            catch (Exception ex)
            {

            }


            return await Task.FromResult(new DataTable());
        }
        public async Task<bool> GetIsAddMore(int id, string nowFlowType, DataTable dataTable)
        {
            bool returnValue = false;

            if (dataTable.Rows.Count > 0)
            {
                try
                {
                    returnValue = bool.Parse(dataTable.Rows[0][0] == null ? "false" : dataTable.Rows[0][0].ToString());
                }
                catch (Exception ex)
                {

                }
            }
            else
            {
                try
                {
                    DataTable dataTableFromStored = await _storeProcedure.ExecuteReturnDatatable($"sp_GetIsAddMore {id}, '{nowFlowType}'");
                    if (dataTable.Rows.Count <= 0)
                    {
                        returnValue = false;
                    }
                    else
                    {
                        returnValue = bool.Parse(dataTable.Rows[0][0] == null ? "false" : dataTable.Rows[0][0].ToString());
                    }
                }
                catch (Exception ex)
                {

                }
            }


            return await Task.FromResult(returnValue);
        }
        public async Task<bool> GetIsRevise(int id, string nowFlowType, DataTable dataTable)
        {
            bool returnValue = false;

            if (dataTable.Rows.Count > 0)
            {
                try
                {
                    returnValue = bool.Parse(dataTable.Rows[0][0] == null ? "false" : dataTable.Rows[0][0].ToString());
                }
                catch (Exception ex)
                {

                }
            }
            else
            {
                try
                {
                    DataTable dataTableFromStored = await _storeProcedure.ExecuteReturnDatatable($"sp_GetIsRevise {id}, '{nowFlowType}'");
                    if (dataTable.Rows.Count <= 0)
                    {
                        returnValue = false;
                    }
                    else
                    {
                        returnValue = bool.Parse(dataTable.Rows[0][1] == null ? "false" : dataTable.Rows[0][0].ToString());
                    }
                }
                catch (Exception ex)
                {

                }
            }

            return await Task.FromResult(returnValue);
        }
        public async Task<bool> GetIsReturn(int id, string nowFlowType, DataTable dataTable)
        {
            bool returnValue = false;

            if (dataTable.Rows.Count > 0)
            {
                try
                {
                    returnValue = bool.Parse(dataTable.Rows[0][2] == null ? "false" : dataTable.Rows[0][0].ToString());
                }
                catch (Exception ex)
                {

                }
            }
            else
            {
                try
                {
                    DataTable dataTableFromStored = await _storeProcedure.ExecuteReturnDatatable($"sp_GetIsReturn {id}, '{nowFlowType}'");
                    if (dataTable.Rows.Count <= 0)
                    {
                        returnValue = false;
                    }
                    else
                    {
                        returnValue = bool.Parse(dataTable.Rows[0][0] == null ? "false" : dataTable.Rows[0][0].ToString());
                    }
                }
                catch (Exception ex)
                {

                }
            }

            return await Task.FromResult(returnValue);
        }

        public async Task<DateTime?> GetLastSubmittedDate(int id)
        {
            var result = await _context.Initiatives.Where(x => x.Id == id).FirstOrDefaultAsync();
            return result.LastSubmittedDate;
        }


        public async Task<string> GetButtonAction(InitiativeButtonAction initiativeButtonAction)
        {
            string returnValue = "view";

            try
            {


                // oat --------------------------------------------------------------------------
                var nowFlowType = await GetFlowTypeOfInitiative(initiativeButtonAction.Id);
                DataTable dataTable = await _storeProcedure.ExecuteReturnDatatable($"sp_GetButtonActionInitiative {initiativeButtonAction.Id},'{initiativeButtonAction.Email}','{nowFlowType}'");
                if (dataTable.Rows.Count <= 0)
                {
                    returnValue = "view";
                }
                else
                {
                    returnValue = dataTable.Rows[0][0] == null ? "view" : dataTable.Rows[0][0].ToString();
                }

                // ถ้าไม่ใช้ approve ก็มา check ที่เงื่อนไขนี้ เพื่อ return 'edit' --------------------------------------------------------------------------
                if (returnValue.Equals("edit") || returnValue.Equals("view"))
                {
                    //DataTable getButtonByRole = await _storeProcedure.ExecuteReturnDatatable($"sp_GetButtonEdit '{initiativeButtonAction.Email}', {initiativeButtonAction.Id}");
                    //if (getButtonByRole.Rows.Count > 0)
                    //{
                    // krit add 29-08-2021
                    var initiative = await _context.Initiatives.Where(x => x.Id.Equals(initiativeButtonAction.Id)).FirstOrDefaultAsync();
                    //if not max then return edit default
                    if(string.IsNullOrEmpty(initiative.InitiativeType))
                    {
                        return returnValue;
                    }
                    
                    if (!initiative.InitiativeType.Equals("max") )
                    {
                        return returnValue;
                    }
                    var owner = await _context.Owners.Where(x => x.Email.ToUpper().Equals(initiativeButtonAction.Email.ToUpper())).FirstOrDefaultAsync();
                    returnValue = "edit";

                    var detailInfo = await _context.DetailInformations.Where(x => x.InitiativeId.Equals(initiativeButtonAction.Id)).FirstOrDefaultAsync();
                    var initiativeAction = await _context.InitiativeActions.Where(x => x.InitiativeId.Equals(initiativeButtonAction.Id)
                        && x.Counter.Equals(_context.InitiativeActions.Where(z => z.InitiativeId.Equals(initiativeButtonAction.Id)).Max(y => y.Counter)))
                        .ToListAsync();
                    var havePermission = initiativeAction.Where(x => x.ActionBy.ToUpper().Equals(initiativeButtonAction.Email.ToUpper())).FirstOrDefault();

                    //get Permission not Owner and Creator
                    var getPermissions = await (from ur in _context.UserRoles
                                                join rp in _context.RolePermission on ur.RoleId equals rp.RoleId.ToString()
                                                join rs in _context.RoleSettingDetail on rp.PermissionMasterId equals rs.PermissionMasterId
                                                join rd in _context.RoleDetailSetting on rp.RoleId equals rd.Id
                                                where ur.Email.ToUpper().Trim().Equals(initiativeButtonAction.Email.ToUpper().Trim())
                                                select new RoleSettingDetail()
                                                {
                                                    Id = rs.Id,
                                                    PageId = rs.PageId,
                                                    SectionId = rs.SectionId,
                                                    FieldName = rs.FieldName,
                                                    IsVisible = rs.IsVisible,
                                                    IsEnable = rs.IsEnable,
                                                    IsIndividual = rs.IsIndividual,
                                                    Parameter01 = rs.Parameter01,
                                                    Parameter02 = rs.Parameter02,
                                                    Parameter03 = rs.Parameter03,
                                                    Parameter04 = rs.Parameter04,
                                                    Parameter05 = rs.Parameter05,
                                                    Parameter06 = rs.Parameter06,
                                                    Parameter07 = rs.Parameter07,
                                                    Parameter08 = rs.Parameter08,
                                                    Parameter09 = rs.Parameter09,
                                                    Parameter10 = rs.Parameter10,
                                                    Parameter11 = rs.Parameter11,
                                                    Parameter12 = rs.Parameter12,
                                                    Parameter13 = rs.Parameter13,
                                                    Parameter14 = rs.Parameter14,
                                                    Parameter15 = rs.Parameter15,
                                                    Parameter16 = rs.Parameter16,
                                                    Parameter17 = rs.Parameter17,
                                                    Parameter18 = rs.Parameter18,
                                                    Parameter19 = rs.Parameter19,
                                                    Parameter20 = rs.Parameter20,
                                                    RoleId = rd.Id.ToString(),
                                                    RoleName = rd.RoleName,
                                                    InitiativeType = rs.InitiativeType,
                                                    Stage = rs.Stage,
                                                    Status = rs.Status,
                                                    TypeOfInvestment = rs.TypeOfInvestment,
                                                    Priority = rs.Priority,
                                                    PermissionMasterId = rs.PermissionMasterId
                                                }).Distinct().ToListAsync();


                    //is Owner and Creator
                    //if (((initiative != null
                    //    && owner != null
                    //    && havePermission != null
                    //    && initiative.OwnerName.Equals(owner.OwnerName))
                    //    || (initiative != null
                    //    && !String.IsNullOrEmpty(initiative.CreatedBy)
                    //    && initiative.CreatedBy.ToUpper().Equals(initiativeButtonAction.Email.ToUpper()))))
                    //{
                    //    if (initiative.Status.ToLower().Equals(("wait for approval").ToLower()))
                    //    {
                    //        return "view";
                    //    }
                    //    else
                    //    {
                    //        return returnValue;
                    //    }
                    //}

                    //check for not have data for submit
                    // SPOC All Workstream is SPOC
                    var spocPermission = getPermissions.Where(x => x.PageId.Equals("EDITALLTYPEMAX") && x.RoleName.ToLower().Equals("spoc all workstream") && x.InitiativeType.Equals(initiative.InitiativeType)).FirstOrDefault();
                    // Young Leader  All Sub Workstream
                    var youngLeadAllWorkStreamPermission = getPermissions.Where(x => x.PageId.Equals("EDITALLTYPEMAX")
                    && (x.RoleName.ToLower().Equals("young leader  all sub workstream")
                    || x.RoleName.ToLower().Equals(("TO Team   All Sub Workstream").ToLower())
                    || x.RoleName.ToLower().Equals(("TF-BT-TO   All Sub Workstream").ToLower())
                    || x.RoleName.ToLower().Equals(("TO Finance  All Sub Workstream").ToLower()))
                    && x.InitiativeType.Equals(initiative.InitiativeType)).FirstOrDefault();
                    // Young Leader  By Sub Workstream
                    var youngLeadByWorkStreamPermission = getPermissions.Where(x => x.PageId.Equals("EDITBYWORKSTREAM") && x.Parameter01.Equals(detailInfo.Workstream)).FirstOrDefault();

                    //Yuan Add Admin-Progress 
                    var adminprogressValue = getPermissions.Where(x => x.PageId.Equals("ADMIN-PROGRESS")).FirstOrDefault();

                    //check stage is SIL for is not owner and creator
                    if (initiative.Status.ToLower().Equals(("wait for approval").ToLower()))
                    {
                        //return view when is Not SPOC and Stage is SIL
                        if (spocPermission != null)
                        {
                            return "edit";
                        }
                        else
                        {
                            return "view";
                        }

                    }
                    else if (spocPermission != null || youngLeadAllWorkStreamPermission != null || youngLeadByWorkStreamPermission != null)
                    {
                        //when stage is not SIL 

                        returnValue = "edit";
                        //is Owner and Creator
                        if (((initiative != null
                            && owner != null
                            //&& havePermission != null
                            && initiative.OwnerName.Equals(owner.OwnerName))
                            || (initiative != null
                            && !String.IsNullOrEmpty(initiative.CreatedBy)
                            && initiative.CreatedBy.ToUpper().Equals(initiativeButtonAction.Email.ToUpper()))))
                        {
                            return "edit";
                        }
                        return returnValue;
                    }
                    else
                    {
                        //is Owner and Creator
                        if (((initiative != null
                            && owner != null
                            //&& havePermission != null
                            && initiative.OwnerName.Equals(owner.OwnerName))
                            || (initiative != null
                            && !String.IsNullOrEmpty(initiative.CreatedBy)
                            && initiative.CreatedBy.ToUpper().Equals(initiativeButtonAction.Email.ToUpper()))
                            || havePermission != null)

                            || adminprogressValue != null)
                        {
                            return "edit";
                        }
                        return "view";
                    }
                    //}
                }
                return returnValue;
            }
            catch (Exception ex)
            {
                return "view";
            }

        }

        public async Task<bool> IsSendAppReqAndWBS(ApprovalNewSystemParam approvalNewSystemParam)
        {

            if (String.IsNullOrEmpty(approvalNewSystemParam.NowStage))
            {
                return await Task.FromResult(false);
            }
            if (approvalNewSystemParam.Process == "request pool" && approvalNewSystemParam.NowStage.ToLower().Contains("app")) // on vp approved
            { // Request Pool ส่ง WBS / APP เมื่อ  VP Approve
                return await Task.FromResult(true);
            }

            if (approvalNewSystemParam.Process != "request pool" && approvalNewSystemParam.NowStage.ToLower().Contains("app") && !approvalNewSystemParam.NowStage.ToLower().Contains("approve")) // on going to stage app request
            { // ทุก process ที่ไม่ใช่ request pool  เมื่อถึง stage app request จะส่ง WBS / APP
                return await Task.FromResult(true);
            }
            if (approvalNewSystemParam.Process.ToLower().Equals("directcapex") && (approvalNewSystemParam.FlowType.ToLower().Equals("addmore") || approvalNewSystemParam.FlowType.ToLower().Equals("return")) && (approvalNewSystemParam.NowStage.ToLower().Equals("budget distribute") || approvalNewSystemParam.NowStage.ToLower().Equals("budget return"))) // on going to stage budget distribute or budget return
            { // ทุก process ที่ไม่ใช่ request pool และ flowtype = addmore เมื่อถึง stage budget distribute และ budget return จะส่ง SAP
                return await Task.FromResult(true);
            }
            return await Task.FromResult(false);
        }

        public async Task<bool> IsSendAppReqAndWBS_PimProcessAddmoreAndParallelFlow(ApprovalNewSystemParam approvalNewSystemParam)
        {
            string[] flowTypeChecks = new string[] { "initiative", "requestcapex" };
            if (String.IsNullOrEmpty(approvalNewSystemParam.NowStage))
            {
                return await Task.FromResult(false);
            }
            if (flowTypeChecks.Contains(approvalNewSystemParam.FlowType) == false && approvalNewSystemParam.NowStage.ToLower().Contains("budget") && !approvalNewSystemParam.NowStage.ToLower().Contains("budget distribute")) // on budget team approved
            { // parallel flow และ เป็นเคส addmore / revise (ไม่ใช่ request capex) เมื่อ budget team approve  จะส่ง RevisedBG และ update wbs 
                return await Task.FromResult(true);
            }

            //case pim add more ใน flowtype = initiative ให้ส่ง wbs ไป update ด้วย โดยจะส่งเมื่อ budget team approve
            if (approvalNewSystemParam.Process == "pim")
            {
                var capexInfo = await _context.CapexInformations.Where(i => i.InitiativeId == approvalNewSystemParam.InitiativeId).OrderByDescending(i => i.Sequent).FirstOrDefaultAsync();
                if (capexInfo != null && capexInfo.CapexType?.ToLower() == "addmorecapex") // case add more on flow type = initiative
                {
                    if (approvalNewSystemParam.FlowType == "initiative" && approvalNewSystemParam.NowStage.ToLower().Contains("budget") && !approvalNewSystemParam.NowStage.ToLower().Contains("budget distribute")) // on budget team approved
                    { // parallel flow เมื่อ budget team approve  จะส่ง RevisedBG และ update wbs 
                        return await Task.FromResult(true);
                    }
                }
            }

            return await Task.FromResult(false);
        }

        public async Task<int> GetInitiativeIdFromInitiativeCode(InitiativeCOde initiativeCode)
        {
            if (initiativeCode.InitiativeCode != null && initiativeCode.InitiativeCode.Length > 11)
            {
                initiativeCode.InitiativeCode = initiativeCode.InitiativeCode.Substring(initiativeCode.InitiativeCode.Length - 11);
            }

            var initiative = await _context.Initiatives.Where(i => i.InitiativeCode == initiativeCode.InitiativeCode && (i.HistoryFlag == null || i.HistoryFlag == 0)).OrderByDescending(i => i.Id).FirstOrDefaultAsync();

            ////-- new
            if (initiative == null && initiativeCode.InitiativeCode.Length == 11)
            {
                int ii = 0;
                while (ii <= 4)
                {
                    var initiativeLoop = await _context.Initiatives.Where(i => i.InitiativeCode == initiativeCode.InitiativeCode.Substring(ii)
                    && (i.HistoryFlag == null || i.HistoryFlag == 0)).OrderByDescending(i => i.Id).FirstOrDefaultAsync();
                    ii++;
                    if (initiativeLoop != null)
                    {
                        return initiativeLoop.Id;
                    }
                }
            }

            ////-- old
            if (initiative == null)
            {
                return 0;
            }


            return initiative.Id;
        }

        public async Task<int> ExecuteStoredPreStage(ApprovalNewSystemParam approvalNewSystemParam)
        {
            try
            {

                var nowStageDetail = await GetDetailCurrentStageFromDetail(approvalNewSystemParam);

                if (nowStageDetail != null)
                {
                    if (nowStageDetail.PreStageStoredProcedure == null)
                        return 0;

                    var listStoredToExecute = nowStageDetail.PreStageStoredProcedure.Split(",");

                    foreach (string storedExe in listStoredToExecute)
                    {
                        if (storedExe == "sp_DisableCAPEXTab" && (nowStageDetail.FlowType == "initiative" || nowStageDetail.FlowType == "requestcapex"))
                        {
                            //call add cost spending
                            await _repositoryProgress.SubmitInvestmentCostFirstTime(approvalNewSystemParam.InitiativeId);
                        }
                        await _storeProcedure.Execute_NoReturnWithTryCatch($"{storedExe} '{approvalNewSystemParam.InitiativeId}','{approvalNewSystemParam.FlowType}'");
                    }

                    return 0;
                }
            }
            catch (Exception ex)
            {

            }
            return 1;

        }

        public async Task<int> ExecuteStoredProcedureInitiative(string storeName, int initiativeId)
        {
            try
            {
                await _storeProcedure.Execute_NoReturnWithTryCatch($"{storeName} '{initiativeId}'");
            }
            catch (Exception ex)
            {

            }
            return 1;

        }
        public async Task<int> ExecuteStoredPostStage(ApprovalNewSystemParam approvalNewSystemParam)
        {
            try
            {

                var nowStageDetail = await GetDetailCurrentStageFromDetail(approvalNewSystemParam);

                if (nowStageDetail != null)
                {
                    if (nowStageDetail.PostStageStoredProcedure == null)
                        return 0;

                    var listStoredToExecute = nowStageDetail.PostStageStoredProcedure.Split(",");

                    foreach (string storedExe in listStoredToExecute)
                    {
                        await _storeProcedure.Execute_NoReturnWithTryCatch($"{storedExe} '{approvalNewSystemParam.InitiativeId}','{approvalNewSystemParam.FlowType}'");
                    }

                    return 0;
                }
            }
            catch (Exception ex)
            {

            }
            return 1;

        }

        public async Task<bool> IsSendMailToProjectEngineer(ApprovalNewSystemParam approvalNewSystemParam)
        {
            var commonCheckSendmailProjectEn = await _context.CommonData.Where(i => i.DataType == "sendmailprojectengineer" && i.Attribute01 == (approvalNewSystemParam.NextStageToBe == null ? null : approvalNewSystemParam.NextStageToBe.ToLower())).FirstOrDefaultAsync();

            if (commonCheckSendmailProjectEn != null)
            {
                return await Task.FromResult(true);
            }

            return await Task.FromResult(false);
        }

        public async Task<int> UpdateApprovedDate(int id, string updatedBy, DateTime? dateTime = null)
        {
            var initiative = await GetInitiative(id);
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiative, "Initiative-10177", SQLCommandType.UPDATE, true);
            // End log
            initiative.ApprovedDate = dateTime == null ? DateTime.Now : dateTime;
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiative, "Initiative-10181", SQLCommandType.UPDATE, true);
            // End log
            return await _context.SaveChangesAsync();
        }

        public async Task<List<initiativeMemberModel>> GetStages_SwitchProcessVAC(List<initiativeMemberModel> initiativeMemberModels)
        {

            foreach (var initiativeMemberModel in initiativeMemberModels)
            {
                try
                {
                    var iniId = await _context.Initiatives.Where(i => i.InitiativeCode == initiativeMemberModel.InitiativeCode && (i.HistoryFlag == null || i.HistoryFlag == 0)).Select(i => i.Id).FirstOrDefaultAsync();
                    var flowType = await GetFlowTypeOfInitiative(iniId);
                    initiativeMemberModel.Stages = await _context.InitiativeStageDetail.Where(i => i.InitiativeId == iniId && i.CurrentStage != null && i.Event == "createnew" && i.FlowType == flowType).Select(i => i.CurrentStage).Distinct().ToListAsync();
                    initiativeMemberModel.Leaves = await _context.InitiativeStageDetail.Where(i => i.InitiativeId == iniId && i.CurrentStage != null && i.Event == "createnew" && i.FlowType == flowType).Select(i => i.CurrentStage).Distinct().ToListAsync();
                    initiativeMemberModel.MoveBacks = await _context.InitiativeStageDetail.Where(i => i.InitiativeId == iniId && i.CurrentStage != null && i.Event == "createnew" && i.FlowType == flowType).Select(i => i.CurrentStage).Distinct().ToListAsync();
                    initiativeMemberModel.SwitchProcesses = await _context.StageMaster.Select(i => i.Process).Distinct().ToListAsync();
                }
                catch (Exception ex)
                {

                }
            }


            return await Task.FromResult(initiativeMemberModels);
        }

        public async Task<int> VACActionSubmit(int id, InitiativeSubmitStageStatus initiativeSubmitStageStatus, string gotoStage)
        {
            string subType = await GetSubTypeFromInitiative(id);
            var initiativeType = await GetProcessType(id);

            var initiative = await GetInitiative(id);


            ApprovalNewSystemParam approvalNewSystemParam = new ApprovalNewSystemParam()
            {
                ActionBy = initiativeSubmitStageStatus.Username,
                ActionType = "submit",
                Direction = initiativeSubmitStageStatus.Status,
                GotoStage = gotoStage == null ? "" : gotoStage,
                Event = await GetEventOfInitiative(id),
                Process = initiative.InitiativeType?.ToLower(),
                InitiativeId = id,
                FlowType = await GetFlowTypeOfInitiative(id),
                //SubType = subType,
                SubType = subType,
                IsUserAction = true,
                IsFirstPassStage = true,
                nowDateTime = DateTime.Now,
            };

            //NewApproval FLOW SYSTEM
            approvalNewSystemParam = await OnInitiativeSubmitClick(approvalNewSystemParam, initiativeSubmitStageStatus);

            await UpdateUpdatedDate_UpdatedBy(id, initiativeSubmitStageStatus.Username, approvalNewSystemParam.nowDateTime);

            await UpdateLastSubmittedDate(id, approvalNewSystemParam.nowDateTime);


            ////NewApproval FLOW SYSTEM
            //ApprovalNewSystemParam approvalNewSystemParam = new ApprovalNewSystemParam()
            //{
            //    ActionBy = initiativeSubmit.Username,
            //    ActionType = "approve",
            //    Direction = initiativeSubmit.Status,
            //    GotoStage = initiativeSubmit.GoToStage,
            //    Event = await GetEventOfInitiative(id),
            //    Process = initiativeType,
            //    InitiativeId = id,
            //    FlowType = await GetFlowTypeOfInitiative(id),
            //    SubType = subType,
            //    IsUserAction = true,
            //    IsFirstPassStage = true,
            //    nowDateTime = initiativeSubmit.ApprovedDate == null ? DateTime.Now : initiativeSubmit.ApprovedDate.Value,
            //};

            //DateTime nowDateTime = approvalNewSystemParam.nowDateTime;

            //var nowStageStatus = await GetNowStageStatus(approvalNewSystemParam);

            //await InsertStagesHistory(initiative, initiativeSubmit, nowStageStatus);

            //await UpdateUpdatedDate_UpdatedBy(id, initiativeSubmit.UpdatedBy, nowDateTime);

            //approvalNewSystemParam = await OnInitiativeApproveClick(approvalNewSystemParam, initiativeSubmit);

            return 0;
        }

        public async Task<bool> CreateReferenceIniPoolPim(int id, InitiativeListPoolPim[] initiativeList)
        {
            if (_context.InitiativeListPoolPim.Any())
            {
                var List = await _context.InitiativeListPoolPim.Where(i => i.PoolId == id).ToListAsync();
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(List, "Initiative-10279", SQLCommandType.DELETE);
                // End log
                foreach (var entity in List)

                    _context.Remove(entity);
            }

            foreach (var item in initiativeList)
            {
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(item, "Initiative-10289", SQLCommandType.INSERT);
                // End log

                await _context.AddAsync(item);
            }
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<InitiativeListPoolPim>> GetReferenceIniPoolPim(int id)
        {
            var List = await _context.InitiativeListPoolPim.Where(i => i.PoolId == id).ToListAsync();
            return List;
        }

        public async Task<InitiativeListPoolPim> GetReferenceIniPoolPimById(int id)
        {
            var List = await _context.InitiativeListPoolPim.Where(i => i.InitiativeId == id).FirstOrDefaultAsync();
            return List;
        }

        public async Task<FileStreamResult> ExportAnyExcelFromDatatable(DataTable dt, string fileName)
        {
            var stream = new MemoryStream();
            IWorkbook workbook = new XSSFWorkbook();
            var sheet = workbook.CreateSheet("Print");


            if (dt.Rows.Count <= 0)
            {
                IRow row = sheet.CreateRow(0);
                ICell cell = row.CreateCell(0);
                cell.SetCellValue("No Data Found.");

                workbook.Write(stream);

                return await Task.FromResult(new FileStreamResult(new MemoryStream(stream.ToArray()), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") { FileDownloadName = fileName });
            }

            IFont bigWhite = workbook.CreateFont();
            bigWhite.Color = HSSFColor.White.Index;
            bigWhite.IsBold = true;
            bigWhite.FontHeightInPoints = 10;
            bigWhite.FontName = "Calibri";

            ICellStyle styleHead_bgBlue = workbook.CreateCellStyle();
            styleHead_bgBlue.FillForegroundColor = HSSFColor.LightBlue.Index;
            styleHead_bgBlue.FillPattern = FillPattern.SolidForeground;
            styleHead_bgBlue.Alignment = HorizontalAlignment.Center;
            styleHead_bgBlue.BorderTop = BorderStyle.Medium;
            styleHead_bgBlue.BorderLeft = BorderStyle.Medium;
            styleHead_bgBlue.BorderRight = BorderStyle.Medium;
            styleHead_bgBlue.BorderBottom = BorderStyle.Medium;
            styleHead_bgBlue.SetFont(bigWhite);

            ICellStyle cellWithBorder = workbook.CreateCellStyle();
            cellWithBorder.BorderTop = BorderStyle.Thin;
            cellWithBorder.BorderLeft = BorderStyle.Thin;
            cellWithBorder.BorderRight = BorderStyle.Thin;
            cellWithBorder.BorderBottom = BorderStyle.Thin;

            for (int i = 0; i < dt.Rows.Count; i++)
            { // loop row
                IRow row = sheet.CreateRow(i + 1);

                if (i == 0)// create column header
                {
                    IRow rowHeader = sheet.CreateRow(0);
                    for (int j = 0; j < dt.Columns.Count; j++)
                    { // loop column
                        ICell cellHeader = rowHeader.CreateCell(j);
                        cellHeader.CellStyle = styleHead_bgBlue;
                        if (dt.Columns[j].ColumnName != null)
                            cellHeader.SetCellValue(dt.Columns[j].ColumnName.ToString());
                    }
                }

                for (int j = 0; j < dt.Columns.Count; j++)
                { // loop column
                    ICell cell = row.CreateCell(j);
                    cell.CellStyle = cellWithBorder;
                    if (dt.Rows[i][j] != null)
                        cell.SetCellValue(dt.Rows[i][j].ToString());
                }
            }


            List<int?> maximumLengthForColumns =
           Enumerable.Range(0, dt.Columns.Count)
             .Select(col => dt.AsEnumerable()
                                     .Select(row => row[col]).OfType<string>()
                                     .Max(val => val?.Length)).ToList();

            for (int i = 0; i < dt.Columns.Count; i++)
            {
                //set auto column
                if (maximumLengthForColumns[i] == null) maximumLengthForColumns[i] = dt.Columns[i].ColumnName.Length;  //if no string then use column length
                if (maximumLengthForColumns[i] < dt.Columns[i].ColumnName.Length) maximumLengthForColumns[i] = dt.Columns[i].ColumnName.Length;   //if string less than column name then use column length

                int width = ((int)(maximumLengthForColumns[i] * 1.14388)) * 256;
                if (width > 65280) width = 65280; //maximum width of excel
                sheet.SetColumnWidth(i, width);
            }

            sheet.CreateFreezePane(0, 1);

            workbook.Write(stream);
            return await Task.FromResult(new FileStreamResult(new MemoryStream(stream.ToArray()), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") { FileDownloadName = fileName });
        }

        public async Task<int> ApproveSystemTrigger(int id)
        {
            string subType = await GetSubTypeFromInitiative(id);
            var initiativeType = await GetProcessType(id);

            var initiative = await GetInitiative(id);

            var isPass = false;

            InitiativeSubmit initiativeSubmit = new InitiativeSubmit()
            {
                UpdatedBy = "SYSTEM",
                Username = "SYSTEM",
                Status = "approve"
            };

            //NewApproval FLOW SYSTEM
            ApprovalNewSystemParam approvalNewSystemParam = new ApprovalNewSystemParam()
            {
                ActionBy = "SYSTEM",
                ActionType = "approve",
                Direction = "approve",
                GotoStage = "",
                Event = await GetEventOfInitiative(id),
                Process = initiativeType,
                InitiativeId = id,
                FlowType = await GetFlowTypeOfInitiative(id),
                SubType = subType,
                IsUserAction = true,
                IsFirstPassStage = true,
                nowDateTime = DateTime.Now,
            };


            DataTable dtSkipCondition = await _storeProcedure.ExecuteReturnDatatable($"sp_GetPassConditionSystem {approvalNewSystemParam.InitiativeId}, '{approvalNewSystemParam.FlowType}'");
            if (dtSkipCondition.Rows.Count <= 0)
            {
                isPass = false;
            }
            else
            {
                isPass = bool.Parse(dtSkipCondition.Rows[0][0] == null ? "false" : dtSkipCondition.Rows[0][0].ToString());
            }

            if (isPass)
            {
                DateTime nowDateTime = approvalNewSystemParam.nowDateTime;

                ApprovalNewSystemParam nowStageStatus = new ApprovalNewSystemParam();
                _mapper.Map(await GetNowStageStatus(approvalNewSystemParam), nowStageStatus);

                approvalNewSystemParam = await OnInitiativeApproveClick(approvalNewSystemParam, initiativeSubmit);

                if (nowStageStatus?.NowStage != approvalNewSystemParam?.NowStage)
                {
                    await InsertStagesHistory(initiative, initiativeSubmit, nowStageStatus);
                    await UpdateUpdatedDate_UpdatedBy(id, initiativeSubmit.UpdatedBy, nowDateTime);
                }
            }



            return 0;
        }

        public async Task<int> UpdateCancelledComment(int id, InitiativeSubmitStageStatus initiativeSubmitStageStatus)
        {
            if (initiativeSubmitStageStatus.Status == "cancelled")
            {
                var initiative = await GetInitiative(id);
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(initiative, "Initiative-10470", SQLCommandType.UPDATE, false);
                // End log

                initiative.CommentCancelled = initiativeSubmitStageStatus.CommentCancelled;
                initiative.UpdatedBy = initiativeSubmitStageStatus.Username;
                // Temporary Log for Invetigate 2021-07-21
                LogInsight.Log(initiative, "Initiative-10476", SQLCommandType.UPDATE, true);
                // End log
                return await _context.SaveChangesAsync();
            }

            return 0;
        }

        public async Task<bool> SyncExcelToImpact(ImpactExcel file)
        {
            IFormFile excelFile = file.File;
            string uploads = "";
            string strSQL = "";
            if (excelFile != null)
            {
                try
                {

                }
                catch { }
            }
            return true;
        }

        public async Task<List<Owner>> GetOwnerNameByActionCode(int InitiativeId, string actionCode)
        {
            try
            {
                List<Owner> owners = new List<Owner>();
                DataTable dataTable = await _storeProcedure.ExecuteReturnDatatable($"sp_GetActionByFromActionByCode {InitiativeId},'{actionCode}' ");
                if (dataTable.Rows.Count > 0)
                {
                    var Actioner = CommonMethod.ConvertToArray<Owner>(dataTable);

                    foreach (Owner owner in Actioner)
                    {
                        if (owner != null)
                        {
                            var own = await _context.Owners.Where(i => i.Email == owner.Email).ToListAsync();
                            if (own.Any())
                            {
                                owners.AddRange(own);
                            }
                        }
                    }
                }
                return owners;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<int> SetInitiativeFlowRevise(int id)
        {
            Initiative initiative = await GetInitiative(id);
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiative, "Initiative-10533", SQLCommandType.UPDATE, false);
            // End log
            initiative.IsReviseFlow = true;
            // Temporary Log for Invetigate 2021-07-21
            LogInsight.Log(initiative, "Initiative-104", SQLCommandType.UPDATE, true);
            // End log
            return await _context.SaveChangesAsync();
        }

        public async Task<string> GetPlantMappingCommonData(string plant)
        {
            var commondata = await _context.CommonData.Where(i => i.DataType == "plant" && i.Attribute07 == plant).FirstOrDefaultAsync();

            if (commondata == null)
            {
                return null;
            }

            return commondata.Attribute08;
        }

        public async Task<string> CheckPlantMappingRamJFactor(string plant)
        {
            var commondata = await _context.CommonData.Where(i => i.DataType == "plantramjfactor" && i.Attribute01 == plant).FirstOrDefaultAsync();

            if (commondata == null)
            {
                return null;
            }

            return plant;
        }
        public async Task<Object> GetDataFromInterface(int id)
        {
            DataTable dataTable = await _storeProcedure.ExecuteReturnDatatable($"sp_GetDataFromInterface {id}");
            if (dataTable.Rows.Count > 0)
            {
                return dataTable;
            }

            return new Object() { };
        }

        //TODO : (Mail Lookback) CallMicrosoftFlow_OnSubmit_Lookback
        public async Task CallMicrosoftFlow_OnSubmit_Lookback(int initiativeId, string SpName, string ActionType, string ActionStatus, string urlType)
        {

            if (!String.IsNullOrEmpty(urlType))
            {

                var stringContent = new StringContent("[" + JsonConvert.SerializeObject(
                      new
                      {
                          INIID = initiativeId.ToString(),
                          ACTION = SpName,
                          ACTIONTYPE = ActionType,
                          ACTIONSTATUS = ActionStatus
                      }
                  ) + "]", Encoding.UTF8, "application/json");

                var client = _clientFactory.CreateClient();

                var response = await client.PostAsync(urlType, stringContent);

            }
        }

        //TODO : (Mail Lookback) Function Sending Email for Lookback
        public async Task SendEmailLookback(int id, string Stage, string ActionType, string ActionStatus, string OnClick)
        {
            ActionType = ActionType == null ? "" : ActionType;
            ActionStatus = ActionStatus == null ? "" : ActionStatus;

            var lookbackData = await _context.ProjectLookback.Where(x => x.InitiativeId.Equals(id)).FirstOrDefaultAsync();

            if (lookbackData == null)
            {
                return;
            }

            // int initiativeId,string ActionType, string ActionStatus, string urlType
            //save
            if (OnClick == "Draft")
            {
                await CallMicrosoftFlow_OnSubmit_Lookback(id, "ExeLookbackPerLookbackDate", ActionType, ActionStatus, _urlPowerAutomate.Value.EmailProjectLookback);  // #3
            }

            //submit
            if (OnClick == "Submit")
            {
                await CallMicrosoftFlow_OnSubmit_Lookback(id, "ExeLookbackProjectInfo", ActionType, ActionStatus, _urlPowerAutomate.Value.EmailProjectLookback);  // #4
                await CallMicrosoftFlow_OnSubmit_Lookback(id, "PerLookbackPersonInfo", ActionType, ActionStatus, _urlPowerAutomate.Value.EmailProjectLookback);  // #10
                await CallMicrosoftFlow_OnSubmit_Lookback(id, "EnviLookbackEngineerUpdate", ActionType, ActionStatus, _urlPowerAutomate.Value.EmailProjectLookback);  // #18

                await CallMicrosoftFlow_OnSubmit_Lookback(id, "EnviLookbackFocalPointEnvi2", ActionType, ActionStatus, _urlPowerAutomate.Value.EmailProjectLookback);  // #22
            }

            //approve , pass
            if (OnClick == "Approve" && ActionType == "Approve" && ActionStatus == "approve")
            {
                await CallMicrosoftFlow_OnSubmit_Lookback(id, "EnviLookbackFocalPointEnvi1", ActionType, ActionStatus, _urlPowerAutomate.Value.EmailProjectLookback);  // #21
            }



            // (int initiativeId, string direction, string urlType)
            /* ----------  6 Cases  ----------
             * 1 ExeLookbackPerLookbackDate  | Save   |
             * 2 ExeLookbackProjectInfo      | Submit |
             * 3 PerLookbackPersonInfo       | Submit |
             * 4 EnviLookbackEngineerUpdate  | Submit |
             * 5 EnviLookbackFocalPointEnvi1 | Submit |
             * 6 EnviLookbackFocalPointEnvi2 | Submit |
             * 
             * id = InitiativeId
             * action = save/submit
             * stage = ""
             * urlType = ""
             */
            //var get_ExeLookbackPerLookbackDate = await _context.ProjectLookback.Where(x => x.InitiativeId == id 
            //&& x.PerformancePlanLookbackDate.ToString() != "").FirstOrDefaultAsync();

            // var get_ExeLookbackProjectInfo = 



        }

        public async Task<int> CheckOwnerOnInitiativeAction(Initiative initiative, InitiativeUpdate initiativeUpdate)
        {

            var flowType = await GetFlowTypeOfInitiative(initiative.Id);
            var initiativeStage = await _context.InitiativeStage.Where(i => i.InitiativeId == initiative.Id && i.FlowType == flowType).FirstOrDefaultAsync();
            var newOwnerData = await _context.Owners.Where(i => i.OwnerName == initiativeUpdate.OwnerName).FirstOrDefaultAsync();


            var stageToWhere = "";
            var statusToWhere = "";

            if (flowType == "initiative" || initiativeStage == null)
            {
                stageToWhere = initiative.Stage;
                statusToWhere = initiative.Status;
            }
            else
            {
                stageToWhere = initiativeStage.Stage;
                statusToWhere = initiativeStage.Status;
            }

            var actionData = await _context.InitiativeActions.Where(i => i.InitiativeId == initiative.Id && i.Stage == stageToWhere & i.Status == statusToWhere && i.IsInactive != true && i.ActionResult == null && i.FlowType == flowType && i.ActionByName == initiative.OwnerName).ToListAsync();
            if (actionData.Any())
            {
                var actionIndex = actionData.FindIndex(x => x.ActionByName.ToLower() == initiative.OwnerName.ToLower());
                actionData[actionIndex].ActionByName = initiativeUpdate.OwnerName;
                actionData[actionIndex].ActionBy = newOwnerData.Email;
                //var actionDataUpdate = _mapper.Map<InitiativeAction>(actionData);
                //_mapper.Map(InitiativeAddmore, actionData);
                //_context.InitiativeActions.Update(actionDataUpdate);
                return await _context.SaveChangesAsync();
            }

            return 0;

        }
        public async Task<int> UpdateIntiativeStageDetail(int id, string initiativeType)
        {

            var initiativeStageDetails = await _context.InitiativeStageDetail.Where(i => i.InitiativeId == id).ToListAsync();
            var initiativeStatusTrackings = await _context.InitiativeStatusTrackings.Where(i => i.InitiativeId == id).ToListAsync();
            if (initiativeStageDetails.Count() > 0)
            {
                foreach (var list in initiativeStageDetails)
                {
                    switch (initiativeType)
                    {
                        case "it":
                            initiativeType = "IT";
                            break;
                        case "digital":
                            initiativeType = "Digital";
                            break;
                    }
                    list.Process = initiativeType;
                    _context.InitiativeStageDetail.Update(list);
                }
            }

            if (initiativeStatusTrackings.Count() > 0)
            {
                foreach (var list in initiativeStatusTrackings)
                {
                    switch (initiativeType)
                    {
                        case "it":
                            initiativeType = "IT";
                            break;
                        case "digital":
                            initiativeType = "Digital";
                            break;
                    }
                    list.ProcessType = initiativeType;
                    _context.InitiativeStatusTrackings.Update(list);
                }
            }
            return await _context.SaveChangesAsync();
        }
        public async Task<int> CheckPermissionAndInsertAction(ApprovalNewSystemParam approvalNewSystemParam)
        {
            int returnValue = 0;
            // krit add 29-08-2021
            var initiative = await _context.Initiatives.Where(x => x.Id.Equals(approvalNewSystemParam.InitiativeId)).FirstOrDefaultAsync();
            var owner = await _context.Owners.Where(x => x.Email.ToUpper().Equals(approvalNewSystemParam.ActionBy.ToUpper())).FirstOrDefaultAsync();

            var detailInfo = await _context.DetailInformations.Where(x => x.InitiativeId.Equals(approvalNewSystemParam.InitiativeId)).FirstOrDefaultAsync();
            var initiativeAction = await _context.InitiativeActions.Where(x => x.InitiativeId.Equals(approvalNewSystemParam.InitiativeId)
                && x.Counter.Equals(_context.InitiativeActions.Where(z => z.InitiativeId.Equals(approvalNewSystemParam.InitiativeId)).Max(y => y.Counter)))
                .ToListAsync();

            if (initiativeAction.Count <= 0)
            {
                return 0;
            }

            var havePermission = initiativeAction.Where(x => x.ActionBy.ToUpper().Equals(approvalNewSystemParam.ActionBy.ToUpper()) && string.IsNullOrEmpty(x.ActionResult) && (x.IsInactive == null || x.IsInactive == false)).FirstOrDefault();

            //get Permission not Owner and Creator
            var getPermissions = await (from ur in _context.UserRoles
                                        join rp in _context.RolePermission on ur.RoleId equals rp.RoleId.ToString()
                                        join rs in _context.RoleSettingDetail on rp.PermissionMasterId equals rs.PermissionMasterId
                                        join rd in _context.RoleDetailSetting on rp.RoleId equals rd.Id
                                        where ur.Email.ToUpper().Trim().Equals(approvalNewSystemParam.ActionBy.ToUpper().Trim())
                                        select new RoleSettingDetail()
                                        {
                                            Id = rs.Id,
                                            PageId = rs.PageId,
                                            SectionId = rs.SectionId,
                                            FieldName = rs.FieldName,
                                            IsVisible = rs.IsVisible,
                                            IsEnable = rs.IsEnable,
                                            IsIndividual = rs.IsIndividual,
                                            Parameter01 = rs.Parameter01,
                                            Parameter02 = rs.Parameter02,
                                            Parameter03 = rs.Parameter03,
                                            Parameter04 = rs.Parameter04,
                                            Parameter05 = rs.Parameter05,
                                            Parameter06 = rs.Parameter06,
                                            Parameter07 = rs.Parameter07,
                                            Parameter08 = rs.Parameter08,
                                            Parameter09 = rs.Parameter09,
                                            Parameter10 = rs.Parameter10,
                                            Parameter11 = rs.Parameter11,
                                            Parameter12 = rs.Parameter12,
                                            Parameter13 = rs.Parameter13,
                                            Parameter14 = rs.Parameter14,
                                            Parameter15 = rs.Parameter15,
                                            Parameter16 = rs.Parameter16,
                                            Parameter17 = rs.Parameter17,
                                            Parameter18 = rs.Parameter18,
                                            Parameter19 = rs.Parameter19,
                                            Parameter20 = rs.Parameter20,
                                            RoleId = rd.Id.ToString(),
                                            RoleName = rd.RoleName,
                                            InitiativeType = rs.InitiativeType,
                                            Stage = rs.Stage,
                                            Status = rs.Status,
                                            TypeOfInvestment = rs.TypeOfInvestment,
                                            Priority = rs.Priority,
                                            PermissionMasterId = rs.PermissionMasterId
                                        }).Distinct().ToListAsync();


            //is Owner and Creator
            if (((initiative != null
                && owner != null
                && havePermission != null
                && initiative.OwnerName.Equals(owner.OwnerName))
                || (initiative != null
                && !String.IsNullOrEmpty(initiative.CreatedBy)
                && initiative.CreatedBy.ToUpper().Equals(approvalNewSystemParam.ActionBy.ToUpper()))))
            {
                if (initiative.Status.ToLower().Equals(("wait for approval").ToLower()))
                {
                    //insert initiativeAction when is Owner and Creator for backWard and cancelled
                    var initiativeActionOwner = new InitiativeAction()
                    {
                        Id = 0,
                        ActionBy = approvalNewSystemParam.ActionBy.ToUpper(),
                        Action = "edit",
                        Position = "@owner/@creator/@projecteng",
                        Status = initiativeAction.ElementAt(0).Status,
                        Stage = initiativeAction.ElementAt(0).Stage,
                        InitiativeId = approvalNewSystemParam.InitiativeId,
                        ActionByName = owner.OwnerName,
                        ConditionType = "permissionedit",
                        Counter = initiativeAction.ElementAt(0).Counter,
                        Indicator = "@owner/@creator/@projecteng",
                        ActionResult = null,
                        FlowType = initiativeAction.ElementAt(0).FlowType,
                        InitiativeStageDetailId = initiativeAction.ElementAt(0).InitiativeStageDetailId,
                        IsInactive = null,
                        ActionDate = null,
                        SwitchToProcess = null
                    };
                    await _context.InitiativeActions.AddAsync(initiativeActionOwner);
                    return await _context.SaveChangesAsync();
                }
                else
                {
                    return 0;
                }
            }
            //check for not have data for submit
            // SPOC All Workstream is SPOC
            var spocPermission = getPermissions.Where(x => x.PageId.Equals("EDITALLTYPEMAX") && x.RoleName.ToLower().Equals("spoc all workstream") && x.InitiativeType.Equals(initiative.InitiativeType)).FirstOrDefault();
            // Young Leader  All Sub Workstream
            var youngLeadAllWorkStreamPermission = getPermissions.Where(x => x.PageId.Equals("EDITALLTYPEMAX")
                    && x.RoleName.ToLower().Equals("young leader  all sub workstream")
                    && x.InitiativeType.Equals(initiative.InitiativeType)).FirstOrDefault();
            // Young Leader  All Sub Workstream
            var toteamAllWorkStreamPermission = getPermissions.Where(x => x.PageId.Equals("EDITALLTYPEMAX")
                    && x.RoleName.ToLower().Equals(("TO Team   All Sub Workstream").ToLower())
                    && x.InitiativeType.Equals(initiative.InitiativeType)).FirstOrDefault();
            // Young Leader  All Sub Workstream
            var tfbttoAllWorkStreamPermission = getPermissions.Where(x => x.PageId.Equals("EDITALLTYPEMAX")
                    && x.RoleName.ToLower().Equals(("TF-BT-TO   All Sub Workstream").ToLower())
                    && x.InitiativeType.Equals(initiative.InitiativeType)).FirstOrDefault();
            // Young Leader  All Sub Workstream
            var toFinanceAllWorkStreamPermission = getPermissions.Where(x => x.PageId.Equals("EDITALLTYPEMAX")
                    && x.RoleName.ToLower().Equals(("TO Finance  All Sub Workstream").ToLower())
                    && x.InitiativeType.Equals(initiative.InitiativeType)).FirstOrDefault();
            // Young Leader  By Sub Workstream
            var youngLeadByWorkStreamPermission = getPermissions.Where(x => x.PageId.Equals("EDITBYWORKSTREAM") && x.Parameter01.Equals(detailInfo.Workstream)).FirstOrDefault();

            var position = "";
            if (spocPermission != null)
            {
                position = "@spocAllWorkstream";
            }
            else if (youngLeadAllWorkStreamPermission != null)
            {
                position = "@youngLeaderAllWorkstream";
            }
            else if (toteamAllWorkStreamPermission != null)
            {
                position = "@toteam";
            }
            else if (tfbttoAllWorkStreamPermission != null)
            {
                position = "@tf-bt-to";
            }
            else if (toFinanceAllWorkStreamPermission != null)
            {
                position = "@tofinance";
            }
            else if (youngLeadByWorkStreamPermission != null)
            {
                position = "@youngLeaderByWorkstream";
            }

            //check stage is SIL for is not owner and creator
            if (initiative.Status.ToLower().Equals(("wait for approval").ToLower()))
            {
                //return view when is Not SPOC and Stage is SIL
                if (spocPermission != null)
                {
                    returnValue = 0;
                }
                else
                {
                    returnValue = 0;
                }
                //insert initiativeAction when have SPOC Permission
                var initiativeActionAdd = new InitiativeAction()
                {
                    Id = 0,
                    ActionBy = approvalNewSystemParam.ActionBy.ToUpper(),
                    Action = "edit",
                    Position = position,
                    Status = initiativeAction.ElementAt(0).Status,
                    Stage = initiativeAction.ElementAt(0).Stage,
                    InitiativeId = approvalNewSystemParam.InitiativeId,
                    ActionByName = owner.OwnerName,
                    ConditionType = "permissionedit",
                    Counter = initiativeAction.ElementAt(0).Counter,
                    Indicator = position,
                    ActionResult = null,
                    FlowType = initiativeAction.ElementAt(0).FlowType,
                    InitiativeStageDetailId = initiativeAction.ElementAt(0).InitiativeStageDetailId,
                    IsInactive = null,
                    ActionDate = null,
                    SwitchToProcess = null
                };
                await _context.InitiativeActions.AddAsync(initiativeActionAdd);
                await _context.SaveChangesAsync();
                return returnValue;
            }
            else if (spocPermission != null
                || youngLeadAllWorkStreamPermission != null
                || toteamAllWorkStreamPermission != null
                || toFinanceAllWorkStreamPermission != null
                || tfbttoAllWorkStreamPermission != null
                || youngLeadByWorkStreamPermission != null
                )
            {
                //when stage is not SIL
                var initiativeActionAdd = new InitiativeAction()
                {
                    Id = 0,
                    ActionBy = approvalNewSystemParam.ActionBy.ToUpper(),
                    Action = "edit",
                    Position = position,
                    Status = initiativeAction.ElementAt(0).Status,
                    Stage = initiativeAction.ElementAt(0).Stage,
                    InitiativeId = approvalNewSystemParam.InitiativeId,
                    ActionByName = owner.OwnerName,
                    ConditionType = "permissionedit",
                    Counter = initiativeAction.ElementAt(0).Counter,
                    Indicator = position,
                    ActionResult = null,
                    FlowType = initiativeAction.ElementAt(0).FlowType,
                    InitiativeStageDetailId = initiativeAction.ElementAt(0).InitiativeStageDetailId,
                    IsInactive = null,
                    ActionDate = null,
                    SwitchToProcess = null
                };
                await _context.InitiativeActions.AddAsync(initiativeActionAdd);
                await _context.SaveChangesAsync();
                return returnValue;
            }
            else
            {
                return 0;
            }
        }


        public async Task<List<Models.ApprovalFlow.InitiativeStage>> GetInitiativeStageForMaxPermission(int initiativeId)
        {
            var initiativeStage = await _context.InitiativeStage.Where(i => i.InitiativeId.Equals(initiativeId)).ToListAsync();
            return initiativeStage;
        }

        public async Task<List<Owner>> GetOwnerNameByIndicatorByPlant(int InitiativeId, string actionCode, string plant)
        {
            try
            {
                List<Owner> owners = new List<Owner>();
                CommonData commonData = await _context.CommonData.Where(x => x.DataType.Equals("plant") && (x.Attribute07.Equals(plant) || x.Attribute01.Equals(plant)) && !string.IsNullOrEmpty(x.Attribute07)).FirstOrDefaultAsync();
                if (commonData != null && !string.IsNullOrEmpty(commonData.Attribute18))
                {
                    var own = await _context.Owners.Where(i => i.Email == commonData.Attribute18).ToListAsync();
                    if (own.Any())
                    {
                        owners.AddRange(own);
                    }
                }
                else if (commonData != null && !string.IsNullOrEmpty(commonData.Attribute10))
                {
                    var own = await _context.Owners.Where(i => i.Email == commonData.Attribute10).ToListAsync();
                    if (own.Any())
                    {
                        owners.AddRange(own);
                    }
                }

                return owners;


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

public static class CommonMethod
{
    public static List<T> ConvertToList<T>(DataTable dt)
    {
        var columnNames = dt.Columns.Cast<DataColumn>().Select(c => c.ColumnName.ToLower()).ToList();
        var properties = typeof(T).GetProperties();
        return dt.AsEnumerable().Select(row =>
        {
            var objT = Activator.CreateInstance<T>();
            foreach (var pro in properties)
            {
                if (columnNames.Contains(pro.Name.ToLower()))
                {
                    try
                    {
                        pro.SetValue(objT, row[pro.Name]);
                    }
                    catch (Exception ex) { }
                }
            }
            return objT;
        }).ToList();
    }

    public static T[] ConvertToArray<T>(DataTable dt)
    {
        var columnNames = dt.Columns.Cast<DataColumn>().Select(c => c.ColumnName.ToLower()).ToList();
        var properties = typeof(T).GetProperties();
        return dt.AsEnumerable().Select(row =>
        {
            var objT = Activator.CreateInstance<T>();

            //for (int i = 0; i < properties.Count() - 1; i++)
            //{
            //    if (columnNames.Contains(properties[i].Name.ToLower()))
            //    {
            //        try
            //        {
            //            properties[i].SetValue(objT, row[properties[i].Name]);
            //        }
            //        catch (Exception ex) { }
            //    }
            //}

            foreach (var pro in properties)
            {
                if (columnNames.Contains(pro.Name.ToLower()))
                {
                    try
                    {
                        pro.SetValue(objT, row[pro.Name]);
                    }
                    catch (Exception ex) { }
                }
            }
            return objT;
        }).ToArray();
    }
}

public class InitiativeActionDistinct
{
    public string ActionBy { get; set; }
    public string Action { get; set; }
    public string Position { get; set; }
    public string Status { get; set; }
    public string Stage { get; set; }
    public int InitiativeId { get; set; }
    public string ConditionType { get; set; }
    public int Counter { get; set; }
    public string Indicator { get; set; }
    public string ActionResult { get; set; }
    public string FlowType { get; set; }
    public int? InitiativeStageDetailId { get; set; }
    public bool? IsInactive { get; set; }
    public DateTime? ActionDate { get; set; }
}
