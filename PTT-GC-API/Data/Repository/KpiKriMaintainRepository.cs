using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Kri;
using PTT_GC_API.Models.KRI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class KpiKriMaintainRepository : IKpiKriMaintain
    {
        private readonly DataContext _context;
        private readonly IHttpClientFactory _clientFactory;

        public KpiKriMaintainRepository(DataContext context, IHttpClientFactory clientFactory)
        {
            _context = context;
            _clientFactory = clientFactory;
        }

        public async Task<List<KriProgressMitigation>> GetProgreessMitigationByMaintainId(int maintainId)
        {
            var data = await _context.KriProgressMitigation.Where(k => k.KpiMaintainId == maintainId).ToListAsync();
            return data;
        }

        public async Task<List<MaintainKpi>> GetMaintainKpiByYear(string year)
        {
            var data = await _context.MaintainKpi.Where(k => k.Year == year).ToListAsync();
            return data;
        }

        public async Task<List<KriDetailMonth>> GetKriDetailMonthByMaintainId(int maintainId)
        {
            var data = await _context.KriDetailMonth.Where(x => x.KpiMaintainId == maintainId).ToListAsync();
            return data;
        }

        // kpi-maintain
        public async Task<int> AddRangeAsync(IEnumerable<MaintainKpi> entities, string year)
        {
            //Remove all in Year
            if (entities.Count() == 0)
            {
                // Remove MaintainKpi
                var getAllInYear = await _context.MaintainKpi.Where(x => x.Year == year).ToListAsync();
                if (getAllInYear.Count > 0)
                {
                    foreach (var e in getAllInYear)
                    {
                        _context.Remove(e);
                    }
                    await _context.SaveChangesAsync();
                }

                // Remove KriDetailMonth
                var getAllInYear_kriMonth = await _context.KriDetailMonth.Where(x => x.Year == year && x.KriType == "kpi_name").ToListAsync();
                if (getAllInYear_kriMonth.Count > 0)
                {
                    foreach (var entity in getAllInYear_kriMonth)
                    {
                        _context.Remove(entity);
                    }
                    await _context.SaveChangesAsync();
                }

                // Remove KriProgressMitigation
                var getAllInYear_PM = await _context.KriProgressMitigation.Where(x => x.Year == year).ToListAsync();
                if (getAllInYear_PM.Count > 0)
                {
                    //foreach (var entity in getAllInYear_PM)
                    //{
                    //    _context.Remove(entity);
                    //}
                    //await _context.SaveChangesAsync();
                }

                // Remove KriModel
                var getAllInYear_KriModel = await _context.Kri.Where(x => x.Year == int.Parse(year)).ToListAsync();
                if (getAllInYear_KriModel.Count > 0)
                {
                    //foreach (var entity in getAllInYear_KriModel)
                    //{
                    //    _context.Remove(entity);
                    //}
                    //await _context.SaveChangesAsync();
                }

                // Remove All InformKri ???
                var getIK = await _context.InformKri.Where(x => x.Year == year).ToListAsync();
                //foreach (var entity in getIK)
                //{
                //    _context.Remove(entity);
                //}
                //await _context.SaveChangesAsync();

            }



            var getByYear = await _context.MaintainKpi.Where(
                x => entities.Select(o => o.KpiMaintainId).Contains((int)x.KpiMaintainId) == false && x.Year == entities.Select(e => e.Year).FirstOrDefault()
                ).ToListAsync();

            // Remove
            if (getByYear.Count > 0)
            {
                //Remove MaintainKpi
                foreach (var entity in getByYear)
                {
                    _context.Remove(entity);
                }
                await _context.SaveChangesAsync();

                // Remove KriDetailMonth
                var getMonthByYear = await _context.KriDetailMonth.
                    Where(x => getByYear.Select(y => y.KpiMaintainId).ToList().Contains((int)x.KpiMaintainId)
                    && x.KriType == "kpi_name").ToListAsync();
                if (getMonthByYear.Count > 0)
                {
                    foreach (var entity in getMonthByYear)
                    {
                        _context.Remove(entity);
                    }
                    await _context.SaveChangesAsync();
                }

                // Remove KriProgressMitigation
                //var getProgressMitigationByYear = await _context.KriProgressMitigation.Where(x => getByYear.Select(y => y.KpiMaintainId).ToList().Contains((int)x.KpiMaintainId)).ToListAsync();
                //if (getProgressMitigationByYear.Count > 0)
                //{
                //    foreach (var entity in getProgressMitigationByYear)
                //    {
                //        _context.Remove(entity);
                //    }
                //    await _context.SaveChangesAsync();
                //}

                // Remove KriModel
                var getKriModel = await _context.Kri.Where(x => x.Year.ToString() == getByYear.Select(o => o.Year).FirstOrDefault() && x.InitiativeId == getByYear.Select(o => o.InitiativeId).FirstOrDefault()).ToListAsync();
                if (getKriModel.Count > 0)
                {
                    //foreach (var entity in getKriModel)
                    //{
                    //    _context.Remove(entity);
                    //}
                    //await _context.SaveChangesAsync();
                }

                // Remove InformKri ???
                var getIK = await _context.InformKri.Where(x => x.Year == getByYear.Select(y => y.Year).FirstOrDefault() && x.InitiativeId == getByYear.Select(o => o.InitiativeId).FirstOrDefault()).ToListAsync();
                //foreach (var entity in getIK)
                //{
                //    _context.Remove(entity);
                //}
                //await _context.SaveChangesAsync();

            }

            foreach (var kpi in entities)
            {

                if (kpi?.KpiMaintainId == 0)
                {
                    // add new KPI
                    await _context.MaintainKpi.AddAsync(kpi);
                    await _context.SaveChangesAsync();

                    // get Lastest Id
                    var kpiLastestId = await _context.MaintainKpi.Where(x => x.Year == kpi.Year)
                        .OrderByDescending(x => x.KpiMaintainId).Select(x => x.KpiMaintainId).FirstOrDefaultAsync();


                    //var getIniitiaveAndYearKriDetailMonth = await _context.KriDetailMonth.Where(
                    //    x => x.InitiativeId == kpi.InitiativeId && x.Year == kpi.Year).CountAsync();
                    //if(getIniitiaveAndYearKriDetailMonth == 0)
                    //{

                    //}
                    // add KriDetailMonth
                    KriDetailMonth kdm = new KriDetailMonth();
                    kdm.InitiativeId = kpi.InitiativeId;
                    kdm.Year = kpi.Year;
                    kdm.KriType = "kpi_name";
                    kdm.KriDetail = kpi.KpiName;
                    kdm.KpiMaintainId = kpiLastestId;
                    kdm.IsAction = kpi.IsActive;
                    await _context.KriDetailMonth.AddAsync(kdm);
                    await _context.SaveChangesAsync();

                    var getInitiativeIdAndYear = await _context.KriProgressMitigation.Where(
                        x => x.InitiativeId == kpi.InitiativeId && x.Year == kpi.Year).CountAsync();
                    if (getInitiativeIdAndYear == 0)
                    {
                        // add KriProgressMitigation - progress
                        KriProgressMitigation kpm1 = new KriProgressMitigation();
                        kpm1.InitiativeId = kpi.InitiativeId;
                        kpm1.Year = kpi.Year;
                        kpm1.KriType = "progress";
                        kpm1.KpiMaintainId = kpiLastestId;
                        await _context.KriProgressMitigation.AddAsync(kpm1);
                        await _context.SaveChangesAsync();

                        // add KriProgressMitigation - mitigation
                        KriProgressMitigation kpm2 = new KriProgressMitigation();
                        kpm2.InitiativeId = kpi.InitiativeId;
                        kpm2.Year = kpi.Year;
                        kpm2.KriType = "mitigation";
                        kpm2.KpiMaintainId = kpiLastestId;
                        await _context.KriProgressMitigation.AddAsync(kpm2);
                        await _context.SaveChangesAsync();

                        KriModel kri = new KriModel();
                        kri.InitiativeId = (int)kpi.InitiativeId;
                        kri.Year = int.Parse(kpi.Year);
                        kri.Status = "Draft";
                        kri.UpdateDate = DateTime.Now;
                        kri.Owner = "";
                        kri.IsDeleted = false;
                        await _context.Kri.AddAsync(kri);
                        await _context.SaveChangesAsync();
                    }
                }
                else
                {
                    var getForEdit = await _context.MaintainKpi.Where(
                        x => entities.Select(o => o.KpiMaintainId).Contains((int)kpi.KpiMaintainId) == true && x.Year == kpi.Year).ToListAsync();

                    if (getForEdit.Count > 0)
                    {
                        // update KPI
                        var old_kpi = await _context.MaintainKpi.Where(o => o.KpiMaintainId == kpi.KpiMaintainId).FirstOrDefaultAsync();
                        old_kpi.KpiName = kpi.KpiName;
                        old_kpi.ScoreLevel1 = kpi.ScoreLevel1;
                        old_kpi.ScoreText1 = kpi.ScoreText1;
                        old_kpi.ScoreLevel2 = kpi.ScoreLevel2;
                        old_kpi.ScoreText2 = kpi.ScoreText2;
                        old_kpi.ScoreLevel3 = kpi.ScoreLevel3;
                        old_kpi.ScoreText3 = kpi.ScoreText3;
                        old_kpi.ScoreLevel4 = kpi.ScoreLevel4;
                        old_kpi.ScoreText4 = kpi.ScoreText4;
                        old_kpi.ScoreLevel5 = kpi.ScoreLevel5;
                        old_kpi.ScoreText5 = kpi.ScoreText5;
                        old_kpi.Year = kpi.Year;
                        old_kpi.InitiativeId = kpi.InitiativeId;
                        old_kpi.IsActive = kpi.IsActive;
                        _context.Update(old_kpi);
                        await _context.SaveChangesAsync();

                        // update KriDetailMonth - kpi_name
                        var old_KriDetailMonth = await _context.KriDetailMonth.Where(o => o.KpiMaintainId == kpi.KpiMaintainId && o.KriType == "kpi_name").FirstOrDefaultAsync();
                        if (old_KriDetailMonth != null)
                        {
                            old_KriDetailMonth.KriDetail = kpi.KpiName;
                            old_KriDetailMonth.InitiativeId = kpi.InitiativeId;
                            old_KriDetailMonth.IsAction = kpi.IsActive;
                            _context.Update(old_KriDetailMonth);
                            await _context.SaveChangesAsync();
                        }

                        // update KriProgressMitigation6
                        var old_KriProgressMitigation_1 = await _context.KriProgressMitigation.Where(o => o.Year == kpi.Year && o.InitiativeId == kpi.InitiativeId && o.KriType == "progress").FirstOrDefaultAsync();
                        if (old_KriProgressMitigation_1 == null)
                        {
                            // add KriProgressMitigation - progress 
                            KriProgressMitigation kpm1 = new KriProgressMitigation();
                            kpm1.InitiativeId = kpi.InitiativeId;
                            kpm1.Year = kpi.Year;
                            kpm1.KriType = "progress";
                            //kpm1.KpiMaintainId = kpiLastestId;
                            await _context.KriProgressMitigation.AddAsync(kpm1);
                            await _context.SaveChangesAsync();

                            //add KriProgressMitigation - mitigation
                            KriProgressMitigation kpm2 = new KriProgressMitigation();
                            kpm2.InitiativeId = kpi.InitiativeId;
                            kpm2.Year = kpi.Year;
                            kpm2.KriType = "mitigation";
                            //kpm2.KpiMaintainId = kpiLastestId;
                            await _context.KriProgressMitigation.AddAsync(kpm2);
                            await _context.SaveChangesAsync();
                        }
                    }
                }
            }
            return 0;
        }
        public async Task<List<MaintainKpi>> GetMaintainKpis(string year)
        {
            return await _context.MaintainKpi.Where(x => x.Year == year).ToListAsync();
        }
        public async Task<MaintainKpi> GetMaintainKpiById(int id)
        {
            return await _context.MaintainKpi.Where(x => x.KpiMaintainId == id).FirstOrDefaultAsync();
        }

        public async Task<object> GetKriKpiModel(string year, int id, string username)
        {
            KpiKriModel km = new KpiKriModel();
            km.StatusKri = await _context.Kri.Where(x => x.InitiativeId == id && x.Year == int.Parse(year)).Select(x => x.Status).FirstOrDefaultAsync();
            km.DateKri = await _context.Kri.Where(x => x.InitiativeId == id && x.Year == int.Parse(year)).Select(x => x.UpdateDate.ToString("dd/MM/yyyy HH:mm")).FirstOrDefaultAsync();

            var get_A = await _context.InformKri.Where(x => x.Year == year && x.InitiativeId == id && x.InformType == "A").Select(x => x.OwnerName).ToArrayAsync();
            var get_B = await _context.InformKri.Where(x => x.Year == year && x.InitiativeId == id && x.InformType == "B").Select(x => x.OwnerName).ToArrayAsync();

            km.InformName = get_A;  // View
            km.EditableName = get_B;  // Edit


            km.MaintainKpi = await _context.MaintainKpi.Where(x => x.Year == year && x.InitiativeId == id).ToListAsync();

            //km.KriProgressMitigation = await _context.KriProgressMitigation.Where(x => x.Year == year && x.InitiativeId == id).ToListAsync();
            km.KriProgressMitigation = await _context.KriProgressMitigation.Where(x => x.Year == year && x.InitiativeId == id && x.KriType == "progress").Take(1)
                .Union(_context.KriProgressMitigation.Where(x => x.Year == year && x.InitiativeId == id && x.KriType == "mitigation").Take(1)).ToListAsync();


            km.KriDetailMonth = await _context.KriDetailMonth.Where(x => x.Year == year && x.InitiativeId == id).OrderBy(x => x.KriOrder).ToListAsync();

            //get Email
            km.InformKri = await _context.InformKri.Where(x => x.Year == year && x.InitiativeId == id).ToListAsync();

            //get Year
            km.InitiativeYears = await _context.KriDetailMonth.Where(x => x.InitiativeId == id).GroupBy(g => g.Year).Select(y => y.Key.ToString()).ToArrayAsync();

            // check Admin
            //km.IsAdmin = await _context.UserRoles.Where(u=>u.Email.ToLower() == em)

            //get OwnerName by InitiativeId
            var getOwnerName = await _context.Initiatives.Where(x => x.Id == id && (x.HistoryFlag == null || x.HistoryFlag == 0)).Select(x => x.OwnerName).FirstOrDefaultAsync();
            if (getOwnerName != null)
            {
                // Get Email
                var getEmail = await _context.Owners.Where(o => o.OwnerName.ToLower() == getOwnerName.ToLower()).Select(o => o.Email).FirstOrDefaultAsync();
                km.OwnerEmail = getEmail;
                var getAdmin = await _context.UserRoles.Where(u => u.Email.ToLower() == username.ToLower() && u.RoleId == "R111").FirstOrDefaultAsync();
                var getAdmin2 = await (
                                       from a in _context.UserRoles
                                       join b in _context.RolePermission on a.RoleId equals b.RoleId.ToString()
                                       join c in _context.RoleSettingDetail on b.PermissionMasterId equals c.PermissionMasterId
                                       where a.Email.ToLower() == username.ToLower() && c.PageId.ToUpper() == "KPI-MAINTAIN"
                                       select new { username = a.Email }
                                       ).ToListAsync();
                if (getAdmin == null && (getAdmin2 == null || getAdmin2.Count == 0))
                {
                    km.IsAdmin = false;
                }
                else
                {
                    km.IsAdmin = true;
                }
            }

            return km;
        }

        public async Task<int> PostKpiKriModel(int id, KpiKriModel km)
        {
            // KriProgressMitigation
            var getPM = await _context.KriProgressMitigation.Where(x => x.Year == km.KriProgressMitigation.Select(y => y.Year).FirstOrDefault() && x.InitiativeId == id).ToListAsync();
            foreach (var entity in getPM)
            {
                _context.Remove(entity);
            }

            // KriDetailMonth
            var getKDM = await _context.KriDetailMonth.Where(x => x.Year == km.KriDetailMonth.Select(y => y.Year).FirstOrDefault() && x.InitiativeId == id).ToListAsync();
            foreach (var entity in getKDM)
            {
                _context.Remove(entity);
            }

            // InformKri
            var getIK = await _context.InformKri.Where(x => x.Year == km.KriDetailMonth.Select(y => y.Year).FirstOrDefault() && x.InitiativeId == id).ToListAsync();
            foreach (var entity in getIK)
            {
                _context.Remove(entity);
            }

            // Remove KriModel
            var getKriModel = await _context.Kri.Where(x => x.Year.ToString() == km.KriDetailMonth.Select(y => y.Year).FirstOrDefault() && x.InitiativeId == id).ToListAsync();
            if (getKriModel.Count > 0)
            {
                foreach (var entity in getKriModel)
                {
                    _context.Remove(entity);
                }
            }

            //await _context.SaveChangesAsync();

            // Get Email
            var getEmail = await (from e in _context.Owners
                                  where km.InformName.Select(x => x.ToLower()).Contains(e.OwnerName.ToLower())
                                  || km.EditableName.Select(x => x.ToLower()).Contains(e.OwnerName.ToLower())
                                  select new
                                  {
                                      Name = e.OwnerName,
                                      Email = e.Email
                                  }).ToListAsync();

            var add_InformName = (from a in km.InformName
                                  select new InformKri()
                                  {
                                      InformType = "A", // View
                                      OwnerName = a,
                                      InitiativeId = km.KriDetailMonth.Select(y => y.InitiativeId).FirstOrDefault(),
                                      Year = km.KriDetailMonth.Select(y => y.Year).FirstOrDefault(),
                                      Email = getEmail.Where(e => e.Name.ToLower() == a.ToLower()).Select(e => e.Email).FirstOrDefault()
                                  }).ToList();

            var add_EditableName = (from a in km.EditableName
                                    select new InformKri()
                                    {
                                        InformType = "B", // Editable
                                        OwnerName = a,
                                        InitiativeId = km.KriDetailMonth.Select(y => y.InitiativeId).FirstOrDefault(),
                                        Year = km.KriDetailMonth.Select(y => y.Year).FirstOrDefault(),
                                        Email = getEmail.Where(e => e.Name.ToLower() == a.ToLower()).Select(e => e.Email).FirstOrDefault()
                                    }).ToList();

            for (int i = 0; i < km.KriDetailMonth.Count(); i++)
            {
                km.KriDetailMonth[i].KriOrder = i;
            }

            // KRI
            KriModel kri = new KriModel();
            kri.InitiativeId = (int)km.KriDetailMonth.Select(y => y.InitiativeId).FirstOrDefault();
            kri.Year = int.Parse(km.KriDetailMonth.Select(y => y.Year).FirstOrDefault());
            kri.Status = "Save";
            kri.UpdateDate = DateTime.Now;
            kri.Owner = km.OwnerEmail;
            kri.IsDeleted = false;
            await _context.Kri.AddAsync(kri);

            await _context.KriProgressMitigation.AddRangeAsync(km.KriProgressMitigation);
            await _context.KriDetailMonth.AddRangeAsync(km.KriDetailMonth);
            await _context.InformKri.AddRangeAsync(add_InformName);
            await _context.InformKri.AddRangeAsync(add_EditableName);

            return await _context.SaveChangesAsync();
        }

        public async Task SendMailInform(InformKri informKri)
        {
            //var getKriModel = await _context.Kri.Where(m=>m.InitiativeId == informKri.InitiativeId
            //&& m.Year.ToString() == informKri.Year).FirstOrDefaultAsync();
            //if(getKriModel != null)
            //{
            //    getKriModel.Status = "Inform";
            //    await _context.SaveChangesAsync();
            //}

            string urlFlow = "";
            var context_url = await _context.URLTables.Where(i => i.URLType == "MAILINFORM").ToListAsync();
            if (context_url.Any()) urlFlow = context_url.FirstOrDefault().URL;

            if (urlFlow != "")
            {

                var stringContent = new StringContent(JsonConvert.SerializeObject(
                  new
                  {
                      INIID = informKri.InitiativeId.ToString(),
                      INFORMTYPE = informKri.InformType == null ? "" : informKri.InformType,
                      YEAR = informKri.Year.ToString(),
                  }
              ), Encoding.UTF8, "application/json");

                var client = _clientFactory.CreateClient();

                var response = await client.PostAsync(urlFlow, stringContent);

            }
        }

        public async Task<object> CheckkpiExist(int id)
        {
            var getId = await (from a in _context.MaintainKpi
                               where a.InitiativeId == id
                               select new
                               {
                                   initiativeId = a.InitiativeId,
                                   year = a.Year
                               }).FirstOrDefaultAsync();

            if (getId != null)
            {
                return getId;
            }
            else
            {
                return null;
            }
        }

    }
}
public class KpiKriModel
{
    public string StatusKri { get; set; }
    public string DateKri { get; set; }
    public string[] InformName { get; set; }
    public string[] EditableName { get; set; }
    public string OwnerEmail { get; set; }
    public bool? IsAdmin { get; set; }
    public string[] InitiativeYears { get; set; }
    public List<MaintainKpi> MaintainKpi { get; set; }
    public List<KriProgressMitigation> KriProgressMitigation { get; set; }
    public List<KriDetailMonth> KriDetailMonth { get; set; }
    public List<InformKri> InformKri { get; set; }
}