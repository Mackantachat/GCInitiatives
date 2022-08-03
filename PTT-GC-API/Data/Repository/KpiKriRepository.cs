using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Models.EMOCs;
using PTT_GC_API.Models.KRI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class KpiKriRepository : KpiKriInterface
    {
        private readonly DataContext _context;

        public KpiKriRepository(DataContext context)
        {
            _context = context;
        }

        // kpi-maintain
        public virtual void AddRange(IEnumerable<MaintainKpi> entities)
        {
            _context.MaintainKpi.AddRange(entities.Where(x=>x.KpiName != ""));
            _context.SaveChanges();
        }

        public async Task<List<MaintainKpi>> GetMaintainKpis(string year)
        {
            return await _context.MaintainKpi.Where(x=>x.Year == year).ToListAsync();
        }

        public async Task<List<KriDetailMonth>> GetKpiEvaluate(int id, string year)
        {
            //TODO : GetKpiEvaluate
            //var getKpi_progress = _context.KriProgressDetails.Where(x => x.InitiativeId == id && x.Year == int.Parse(year)).ToListAsync();
            //var getKpi_mitigration = _context.KriMitigations.Where(x => x.InitiativeId == id && x.Year == int.Parse(year)).ToListAsync();
            var getkpi_detail = await _context.KriDetailMonth.Where(x => x.InitiativeId == id && x.Year == year).ToListAsync();

            return getkpi_detail;
        }


    }
}

public class KpiKriData
{
    public string Status { get; set; }
    public string Date { get; set; }
    public List<ObjectYears> Years { get; set; }
}
public class ObjectYears
{
    public int Year { get; set; }
    public Information Information { get; set; }
    public List<Details> Details { get; set; }
}

public class Information
{
    public ProgressMintigation Jan { get; set; }
    public ProgressMintigation Feb { get; set; }
    public ProgressMintigation Mar { get; set; }
    public ProgressMintigation Apr { get; set; }
    public ProgressMintigation May { get; set; }
    public ProgressMintigation Jun { get; set; }
    public ProgressMintigation Jul { get; set; }
    public ProgressMintigation Aug { get; set; }
    public ProgressMintigation Sep { get; set; }
    public ProgressMintigation Oct { get; set; }
    public ProgressMintigation Nov { get; set; }
    public ProgressMintigation Dec { get; set; }
}
public class ProgressMintigation
{
    public string Progress { get; set; }
    public string Mitigration { get; set; }
}

public class Details
{
    public string type { get; set; }
    public bool? status { get; set; }
    public List<Detail> Detail { get; set; }

    public NumberKri Jan { get; set; }
    public NumberKri Feb { get; set; }
    public NumberKri Mar { get; set; }
    public NumberKri Apr { get; set; }
    public NumberKri May { get; set; }
    public NumberKri Jun { get; set; }
    public NumberKri Jul { get; set; }
    public NumberKri Aug { get; set; }
    public NumberKri Sep { get; set; }
    public NumberKri Oct { get; set; }
    public NumberKri Nov { get; set; }
    public NumberKri Dec { get; set; }
}

public class Detail
{
    public string Name { get; set; }
    public NumberKri NumberKri { get; set; }
}
public class NumberKri
{
    public string Text { get; set; }
    public string Colour { get; set; }
}
