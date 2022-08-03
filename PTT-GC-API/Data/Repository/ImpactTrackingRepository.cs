using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.ImpactTracking;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Helpers;
using PTT_GC_API.Models.CommonData;
using PTT_GC_API.Models.ImpactTracking;
using PTT_GC_API.Models.Initiative;

namespace PTT_GC_API.Data.Repository
{
    public class ImpactTrackingRepository : ImpactTrackingInterface
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ImpactTrackingRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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

        public async Task<bool> ImpactTrackingDelete(int id)
        {
            if (_context.ImpactTrackings.Any())
            {
                var ImpactTrackingList = await _context.ImpactTrackings.Where(i => i.InitiativeId == id).ToListAsync();

                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(ImpactTrackingList, "ImpactTracking-54", SQLCommandType.DELETE, false);
                // End log

                foreach (var entity in ImpactTrackingList)
                    _context.ImpactTrackings.Remove(entity);

                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(ImpactTrackingList, "ImpactTracking-54", SQLCommandType.DELETE, true);
                // End log

                await _context.SaveChangesAsync();
                return true;
            }
            return true;
        }

        public async Task<ImpactTracking> GetImpactTracking(int id)
        {
            var impactTrackings = await _context.ImpactTrackings.FirstOrDefaultAsync(i => i.InitiativeId == id);
            return impactTrackings;
        }

        public async Task<FirstRunRateCreate> CreateFirstRunRate(int id, FirstRunRateCreate firstRunRateCreate)
        {
            if (_context.ImpactTypeOfBenefits.Any())
            {
                var ImpactTypeOfBenefitsList = await _context.ImpactTypeOfBenefits
                .Where(i => i.InitiativeId == id)
                .Where(i => i.ImpactTypeOfBenefitTable == "FirstRunRate")
                .ToListAsync();

                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(ImpactTypeOfBenefitsList, "ImpactTracking-80", SQLCommandType.INSERT, false);
                // End log

                foreach (var entity in ImpactTypeOfBenefitsList)
                    _context.ImpactTypeOfBenefits.Remove(entity);
                //await _context.SaveChangesAsync();
            }

            List<string> runrateType = new List<string> { "Target", "Revise", "Actual" };

            foreach (var item in firstRunRateCreate.FirstRunRateTable)
            {


                for (int i = 1; i <= 3; i++)
                {
                    var impactTypeOfBenefit = new ImpactTypeOfBenefit();
                    switch (i)
                    {
                        case 1:
                            impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRate";
                            impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                            impactTypeOfBenefit.InitiativeId = id;
                            impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row1 : null;
                            impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row1 : null;
                            if (item.monthRows1 == null) break;
                            impactTypeOfBenefit.Month1 = item.monthRows1.Month1;
                            impactTypeOfBenefit.Month2 = item.monthRows1.Month2;
                            impactTypeOfBenefit.Month3 = item.monthRows1.Month3;
                            impactTypeOfBenefit.Month4 = item.monthRows1.Month4;
                            impactTypeOfBenefit.Month5 = item.monthRows1.Month5;
                            impactTypeOfBenefit.Month6 = item.monthRows1.Month6;
                            impactTypeOfBenefit.Month7 = item.monthRows1.Month7;
                            impactTypeOfBenefit.Month8 = item.monthRows1.Month8;
                            impactTypeOfBenefit.Month9 = item.monthRows1.Month9;
                            impactTypeOfBenefit.Month10 = item.monthRows1.Month10;
                            impactTypeOfBenefit.Month11 = item.monthRows1.Month11;
                            impactTypeOfBenefit.Month12 = item.monthRows1.Month12;
                            impactTypeOfBenefit.Month13 = item.monthRows1.Month13;
                            impactTypeOfBenefit.Month14 = item.monthRows1.Month14;
                            impactTypeOfBenefit.Month15 = item.monthRows1.Month15;
                            impactTypeOfBenefit.Month16 = item.monthRows1.Month16;
                            impactTypeOfBenefit.Month17 = item.monthRows1.Month17;
                            impactTypeOfBenefit.Month18 = item.monthRows1.Month18;
                            impactTypeOfBenefit.Month19 = item.monthRows1.Month19;
                            impactTypeOfBenefit.Month20 = item.monthRows1.Month20;
                            impactTypeOfBenefit.Month21 = item.monthRows1.Month21;
                            impactTypeOfBenefit.Month22 = item.monthRows1.Month22;
                            impactTypeOfBenefit.Month23 = item.monthRows1.Month23;
                            impactTypeOfBenefit.Month24 = item.monthRows1.Month24;
                            impactTypeOfBenefit.Month25 = item.monthRows1.Month25;
                            impactTypeOfBenefit.Month26 = item.monthRows1.Month26;
                            impactTypeOfBenefit.Month27 = item.monthRows1.Month27;
                            impactTypeOfBenefit.Month28 = item.monthRows1.Month28;
                            impactTypeOfBenefit.Month29 = item.monthRows1.Month29;
                            impactTypeOfBenefit.Month30 = item.monthRows1.Month30;
                            impactTypeOfBenefit.Month31 = item.monthRows1.Month31;
                            impactTypeOfBenefit.Month32 = item.monthRows1.Month32;
                            impactTypeOfBenefit.Month33 = item.monthRows1.Month33;
                            impactTypeOfBenefit.Month34 = item.monthRows1.Month34;
                            impactTypeOfBenefit.Month35 = item.monthRows1.Month35;
                            impactTypeOfBenefit.Month36 = item.monthRows1.Month36;
                            break;
                        case 2:
                            impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRate";
                            impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                            impactTypeOfBenefit.InitiativeId = id;
                            impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row2 : null;
                            impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row2 : null;
                            if (item.monthRows2 == null) break;
                            impactTypeOfBenefit.Month1 = item.monthRows2.Month1;
                            impactTypeOfBenefit.Month2 = item.monthRows2.Month2;
                            impactTypeOfBenefit.Month3 = item.monthRows2.Month3;
                            impactTypeOfBenefit.Month4 = item.monthRows2.Month4;
                            impactTypeOfBenefit.Month5 = item.monthRows2.Month5;
                            impactTypeOfBenefit.Month6 = item.monthRows2.Month6;
                            impactTypeOfBenefit.Month7 = item.monthRows2.Month7;
                            impactTypeOfBenefit.Month8 = item.monthRows2.Month8;
                            impactTypeOfBenefit.Month9 = item.monthRows2.Month9;
                            impactTypeOfBenefit.Month10 = item.monthRows2.Month10;
                            impactTypeOfBenefit.Month11 = item.monthRows2.Month11;
                            impactTypeOfBenefit.Month12 = item.monthRows2.Month12;
                            impactTypeOfBenefit.Month13 = item.monthRows2.Month13;
                            impactTypeOfBenefit.Month14 = item.monthRows2.Month14;
                            impactTypeOfBenefit.Month15 = item.monthRows2.Month15;
                            impactTypeOfBenefit.Month16 = item.monthRows2.Month16;
                            impactTypeOfBenefit.Month17 = item.monthRows2.Month17;
                            impactTypeOfBenefit.Month18 = item.monthRows2.Month18;
                            impactTypeOfBenefit.Month19 = item.monthRows2.Month19;
                            impactTypeOfBenefit.Month20 = item.monthRows2.Month20;
                            impactTypeOfBenefit.Month21 = item.monthRows2.Month21;
                            impactTypeOfBenefit.Month22 = item.monthRows2.Month22;
                            impactTypeOfBenefit.Month23 = item.monthRows2.Month23;
                            impactTypeOfBenefit.Month24 = item.monthRows2.Month24;
                            impactTypeOfBenefit.Month25 = item.monthRows2.Month25;
                            impactTypeOfBenefit.Month26 = item.monthRows2.Month26;
                            impactTypeOfBenefit.Month27 = item.monthRows2.Month27;
                            impactTypeOfBenefit.Month28 = item.monthRows2.Month28;
                            impactTypeOfBenefit.Month29 = item.monthRows2.Month29;
                            impactTypeOfBenefit.Month30 = item.monthRows2.Month30;
                            impactTypeOfBenefit.Month31 = item.monthRows2.Month31;
                            impactTypeOfBenefit.Month32 = item.monthRows2.Month32;
                            impactTypeOfBenefit.Month33 = item.monthRows2.Month33;
                            impactTypeOfBenefit.Month34 = item.monthRows2.Month34;
                            impactTypeOfBenefit.Month35 = item.monthRows2.Month35;
                            impactTypeOfBenefit.Month36 = item.monthRows2.Month36;
                            break;
                        case 3:

                            impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRate";
                            impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                            impactTypeOfBenefit.InitiativeId = id;
                            impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row3 : null;
                            impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row3 : null;
                            if (item.monthRows3 == null) break;
                            impactTypeOfBenefit.Month1 = item.monthRows3.Month1;
                            impactTypeOfBenefit.Month2 = item.monthRows3.Month2;
                            impactTypeOfBenefit.Month3 = item.monthRows3.Month3;
                            impactTypeOfBenefit.Month4 = item.monthRows3.Month4;
                            impactTypeOfBenefit.Month5 = item.monthRows3.Month5;
                            impactTypeOfBenefit.Month6 = item.monthRows3.Month6;
                            impactTypeOfBenefit.Month7 = item.monthRows3.Month7;
                            impactTypeOfBenefit.Month8 = item.monthRows3.Month8;
                            impactTypeOfBenefit.Month9 = item.monthRows3.Month9;
                            impactTypeOfBenefit.Month10 = item.monthRows3.Month10;
                            impactTypeOfBenefit.Month11 = item.monthRows3.Month11;
                            impactTypeOfBenefit.Month12 = item.monthRows3.Month12;
                            impactTypeOfBenefit.Month13 = item.monthRows3.Month13;
                            impactTypeOfBenefit.Month14 = item.monthRows3.Month14;
                            impactTypeOfBenefit.Month15 = item.monthRows3.Month15;
                            impactTypeOfBenefit.Month16 = item.monthRows3.Month16;
                            impactTypeOfBenefit.Month17 = item.monthRows3.Month17;
                            impactTypeOfBenefit.Month18 = item.monthRows3.Month18;
                            impactTypeOfBenefit.Month19 = item.monthRows3.Month19;
                            impactTypeOfBenefit.Month20 = item.monthRows3.Month20;
                            impactTypeOfBenefit.Month21 = item.monthRows3.Month21;
                            impactTypeOfBenefit.Month22 = item.monthRows3.Month22;
                            impactTypeOfBenefit.Month23 = item.monthRows3.Month23;
                            impactTypeOfBenefit.Month24 = item.monthRows3.Month24;
                            impactTypeOfBenefit.Month25 = item.monthRows3.Month25;
                            impactTypeOfBenefit.Month26 = item.monthRows3.Month26;
                            impactTypeOfBenefit.Month27 = item.monthRows3.Month27;
                            impactTypeOfBenefit.Month28 = item.monthRows3.Month28;
                            impactTypeOfBenefit.Month29 = item.monthRows3.Month29;
                            impactTypeOfBenefit.Month30 = item.monthRows3.Month30;
                            impactTypeOfBenefit.Month31 = item.monthRows3.Month31;
                            impactTypeOfBenefit.Month32 = item.monthRows3.Month32;
                            impactTypeOfBenefit.Month33 = item.monthRows3.Month33;
                            impactTypeOfBenefit.Month34 = item.monthRows3.Month34;
                            impactTypeOfBenefit.Month35 = item.monthRows3.Month35;
                            impactTypeOfBenefit.Month36 = item.monthRows3.Month36;
                            break;
                    }
                    await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                    await _context.SaveChangesAsync();
                }
            }

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(firstRunRateCreate, "ImpactTracking-236", SQLCommandType.INSERT, true);
            // End log


            await _context.SaveChangesAsync();
            return firstRunRateCreate;
        }

        public async Task<IEnumerable<ImpactTypeOfBenefit>> GetFirstRunRate(int id)
        {
            var impactTypeOfBenefits = await _context.ImpactTypeOfBenefits
            .Where(i => i.InitiativeId == id)
            .Where(i => i.ImpactTypeOfBenefitTable == "FirstRunRate")
            .ToListAsync();
            return impactTypeOfBenefits;
        }

        public async Task<IndirectCreate> CreateIndirect(int id, IndirectCreate IndirectCreate)
        {
            if (_context.ImpactTypeOfBenefits.Any())
            {
                var ImpactTypeOfBenefitsList = await _context.ImpactTypeOfBenefits
                .Where(i => i.InitiativeId == id)
                .Where(i => i.ImpactTypeOfBenefitTable == "IndirectBenefit")
                .ToListAsync();

                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(ImpactTypeOfBenefitsList, "ImpactTracking-257", SQLCommandType.INSERT, false);
                // End log


                foreach (var entity in ImpactTypeOfBenefitsList)
                    _context.ImpactTypeOfBenefits.Remove(entity);
                //await _context.SaveChangesAsync();
            }

            foreach (var item in IndirectCreate.IndirectTable)
            {
                for (int i = 1; i <= 2; i++)
                {
                    var impactTypeOfBenefit = new ImpactTypeOfBenefit
                    {
                        ImpactTypeOfBenefitTable = "IndirectBenefit",
                        TypeOfBenefit = item.TypeOfBenefit,
                        InitiativeId = id
                    };
                    switch (i)
                    {
                        case 1:
                            impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row1 : null;
                            impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row1 : null;
                            break;
                        case 2:
                            impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row2 : null;
                            impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row2 : null;
                            break;
                    }
                    await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                    await _context.SaveChangesAsync();
                }
            }

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(IndirectCreate, "ImpactTracking-296", SQLCommandType.INSERT, true);
            // End log


            await _context.SaveChangesAsync();
            return IndirectCreate;
        }

        public async Task<IEnumerable<ImpactTypeOfBenefit>> GetIndirect(int id)
        {
            var impactTypeOfBenefits = await _context.ImpactTypeOfBenefits
            .Where(i => i.InitiativeId == id)
            .Where(i => i.ImpactTypeOfBenefitTable == "IndirectBenefit")
            .ToListAsync();
            return impactTypeOfBenefits;
        }

        public async Task<ImpiemantCostCreate> CreateImpiemantCost(int id, ImpiemantCostCreate impiemantCostCreate)
        {
            if (_context.ImpactTypeOfBenefits.Any())
            {
                var ImpactTypeOfBenefitsList = await _context.ImpactTypeOfBenefits
                .Where(i => i.InitiativeId == id)
                .Where(i => i.ImpactTypeOfBenefitTable == "ImpiemantCost")
                .ToListAsync();

                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(ImpactTypeOfBenefitsList, "ImpactTracking-317", SQLCommandType.INSERT, false);
                // End log


                foreach (var entity in ImpactTypeOfBenefitsList)
                    _context.ImpactTypeOfBenefits.Remove(entity);
                //await _context.SaveChangesAsync();
            }

            for (int i = 1; i <= 2; i++)
            {
                var impactTypeOfBenefit = new ImpactTypeOfBenefit
                {
                    ImpactTypeOfBenefitTable = "ImpiemantCost",
                    TypeOfBenefit = impiemantCostCreate.TypeOfBenefit,
                    InitiativeId = id
                };

                switch (i)
                {
                    case 1:
                        impactTypeOfBenefit.VersionPrice = impiemantCostCreate.VersionPrice != null ? impiemantCostCreate.VersionPrice.Row1 : null;
                        impactTypeOfBenefit.RunRate = impiemantCostCreate.RunRate != null ? impiemantCostCreate.RunRate.Row1 : null;
                        if (impiemantCostCreate.monthRows1 == null) break;
                        impactTypeOfBenefit.Month1 = impiemantCostCreate.monthRows1.Month1;
                        impactTypeOfBenefit.Month2 = impiemantCostCreate.monthRows1.Month2;
                        impactTypeOfBenefit.Month3 = impiemantCostCreate.monthRows1.Month3;
                        impactTypeOfBenefit.Month4 = impiemantCostCreate.monthRows1.Month4;
                        impactTypeOfBenefit.Month5 = impiemantCostCreate.monthRows1.Month5;
                        impactTypeOfBenefit.Month6 = impiemantCostCreate.monthRows1.Month6;
                        impactTypeOfBenefit.Month7 = impiemantCostCreate.monthRows1.Month7;
                        impactTypeOfBenefit.Month8 = impiemantCostCreate.monthRows1.Month8;
                        impactTypeOfBenefit.Month9 = impiemantCostCreate.monthRows1.Month9;
                        impactTypeOfBenefit.Month10 = impiemantCostCreate.monthRows1.Month10;
                        impactTypeOfBenefit.Month11 = impiemantCostCreate.monthRows1.Month11;
                        impactTypeOfBenefit.Month12 = impiemantCostCreate.monthRows1.Month12;
                        impactTypeOfBenefit.Month13 = impiemantCostCreate.monthRows1.Month13;
                        impactTypeOfBenefit.Month14 = impiemantCostCreate.monthRows1.Month14;
                        impactTypeOfBenefit.Month15 = impiemantCostCreate.monthRows1.Month15;
                        impactTypeOfBenefit.Month16 = impiemantCostCreate.monthRows1.Month16;
                        impactTypeOfBenefit.Month17 = impiemantCostCreate.monthRows1.Month17;
                        impactTypeOfBenefit.Month18 = impiemantCostCreate.monthRows1.Month18;
                        impactTypeOfBenefit.Month19 = impiemantCostCreate.monthRows1.Month19;
                        impactTypeOfBenefit.Month20 = impiemantCostCreate.monthRows1.Month20;
                        impactTypeOfBenefit.Month21 = impiemantCostCreate.monthRows1.Month21;
                        impactTypeOfBenefit.Month22 = impiemantCostCreate.monthRows1.Month22;
                        impactTypeOfBenefit.Month23 = impiemantCostCreate.monthRows1.Month23;
                        impactTypeOfBenefit.Month24 = impiemantCostCreate.monthRows1.Month24;
                        impactTypeOfBenefit.Month25 = impiemantCostCreate.monthRows1.Month25;
                        impactTypeOfBenefit.Month26 = impiemantCostCreate.monthRows1.Month26;
                        impactTypeOfBenefit.Month27 = impiemantCostCreate.monthRows1.Month27;
                        impactTypeOfBenefit.Month28 = impiemantCostCreate.monthRows1.Month28;
                        impactTypeOfBenefit.Month29 = impiemantCostCreate.monthRows1.Month29;
                        impactTypeOfBenefit.Month30 = impiemantCostCreate.monthRows1.Month30;
                        impactTypeOfBenefit.Month31 = impiemantCostCreate.monthRows1.Month31;
                        impactTypeOfBenefit.Month32 = impiemantCostCreate.monthRows1.Month32;
                        impactTypeOfBenefit.Month33 = impiemantCostCreate.monthRows1.Month33;
                        impactTypeOfBenefit.Month34 = impiemantCostCreate.monthRows1.Month34;
                        impactTypeOfBenefit.Month35 = impiemantCostCreate.monthRows1.Month35;
                        impactTypeOfBenefit.Month36 = impiemantCostCreate.monthRows1.Month36;
                        break;
                    case 2:
                        impactTypeOfBenefit.VersionPrice = impiemantCostCreate.VersionPrice != null ? impiemantCostCreate.VersionPrice.Row2 : null;
                        impactTypeOfBenefit.RunRate = impiemantCostCreate.RunRate != null ? impiemantCostCreate.RunRate.Row2 : null;
                        if (impiemantCostCreate.monthRows2 == null) break;
                        impactTypeOfBenefit.Month1 = impiemantCostCreate.monthRows2.Month1;
                        impactTypeOfBenefit.Month2 = impiemantCostCreate.monthRows2.Month2;
                        impactTypeOfBenefit.Month3 = impiemantCostCreate.monthRows2.Month3;
                        impactTypeOfBenefit.Month4 = impiemantCostCreate.monthRows2.Month4;
                        impactTypeOfBenefit.Month5 = impiemantCostCreate.monthRows2.Month5;
                        impactTypeOfBenefit.Month6 = impiemantCostCreate.monthRows2.Month6;
                        impactTypeOfBenefit.Month7 = impiemantCostCreate.monthRows2.Month7;
                        impactTypeOfBenefit.Month8 = impiemantCostCreate.monthRows2.Month8;
                        impactTypeOfBenefit.Month9 = impiemantCostCreate.monthRows2.Month9;
                        impactTypeOfBenefit.Month10 = impiemantCostCreate.monthRows2.Month10;
                        impactTypeOfBenefit.Month11 = impiemantCostCreate.monthRows2.Month11;
                        impactTypeOfBenefit.Month12 = impiemantCostCreate.monthRows2.Month12;
                        impactTypeOfBenefit.Month13 = impiemantCostCreate.monthRows2.Month13;
                        impactTypeOfBenefit.Month14 = impiemantCostCreate.monthRows2.Month14;
                        impactTypeOfBenefit.Month15 = impiemantCostCreate.monthRows2.Month15;
                        impactTypeOfBenefit.Month16 = impiemantCostCreate.monthRows2.Month16;
                        impactTypeOfBenefit.Month17 = impiemantCostCreate.monthRows2.Month17;
                        impactTypeOfBenefit.Month18 = impiemantCostCreate.monthRows2.Month18;
                        impactTypeOfBenefit.Month19 = impiemantCostCreate.monthRows2.Month19;
                        impactTypeOfBenefit.Month20 = impiemantCostCreate.monthRows2.Month20;
                        impactTypeOfBenefit.Month21 = impiemantCostCreate.monthRows2.Month21;
                        impactTypeOfBenefit.Month22 = impiemantCostCreate.monthRows2.Month22;
                        impactTypeOfBenefit.Month23 = impiemantCostCreate.monthRows2.Month23;
                        impactTypeOfBenefit.Month24 = impiemantCostCreate.monthRows2.Month24;
                        impactTypeOfBenefit.Month25 = impiemantCostCreate.monthRows2.Month25;
                        impactTypeOfBenefit.Month26 = impiemantCostCreate.monthRows2.Month26;
                        impactTypeOfBenefit.Month27 = impiemantCostCreate.monthRows2.Month27;
                        impactTypeOfBenefit.Month28 = impiemantCostCreate.monthRows2.Month28;
                        impactTypeOfBenefit.Month29 = impiemantCostCreate.monthRows2.Month29;
                        impactTypeOfBenefit.Month30 = impiemantCostCreate.monthRows2.Month30;
                        impactTypeOfBenefit.Month31 = impiemantCostCreate.monthRows2.Month31;
                        impactTypeOfBenefit.Month32 = impiemantCostCreate.monthRows2.Month32;
                        impactTypeOfBenefit.Month33 = impiemantCostCreate.monthRows2.Month33;
                        impactTypeOfBenefit.Month34 = impiemantCostCreate.monthRows2.Month34;
                        impactTypeOfBenefit.Month35 = impiemantCostCreate.monthRows2.Month35;
                        impactTypeOfBenefit.Month36 = impiemantCostCreate.monthRows2.Month36;
                        break;
                }
                await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                await _context.SaveChangesAsync();
            }

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(impiemantCostCreate, "ImpactTracking-317", SQLCommandType.INSERT, true);
            // End log


            await _context.SaveChangesAsync();

            return impiemantCostCreate;
        }

        public async Task<bool> DeleteImpiemantCost(int id)
        {
            if (_context.ImpactTypeOfBenefits.Any())
            {
                var ImpactTrackingList = await _context.ImpactTypeOfBenefits.Where(i => i.InitiativeId == id && i.ImpactTypeOfBenefitTable == "ImpiemantCost").ToListAsync();

                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(ImpactTrackingList, "ImpactTracking-443", SQLCommandType.DELETE, false);
                // End log

                foreach (var entity in ImpactTrackingList)
                    _context.ImpactTypeOfBenefits.Remove(entity);

                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(ImpactTrackingList, "ImpactTracking-450", SQLCommandType.DELETE, true);
                // End log

                await _context.SaveChangesAsync();
                return true;
            }
            return true;
        }

        public async Task<IEnumerable<ImpactTypeOfBenefit>> GetImpiemantCost(int id)
        {
            var impactTypeOfBenefits = await _context.ImpactTypeOfBenefits
            .Where(i => i.InitiativeId == id)
            .Where(i => i.ImpactTypeOfBenefitTable == "ImpiemantCost")
            .ToListAsync();
            return impactTypeOfBenefits;
        }

        public async Task<TypeBenefitCreate> CreateTypeOfBenefit(int id, TypeBenefitCreate typeBenefitCreate)
        {
            if (_context.ImpactTypeOfBenefits.Any())
            {
                var ImpactTypeOfBenefitsList = await _context.ImpactTypeOfBenefits
                .Where(i => i.InitiativeId == id)
                .Where(i => i.ImpactTypeOfBenefitTable == "TypeBenefit")
                .ToListAsync();

                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(ImpactTypeOfBenefitsList, "ImpactTracking-475", SQLCommandType.INSERT, false);
                // End log


                foreach (var entity in ImpactTypeOfBenefitsList)
                    _context.ImpactTypeOfBenefits.Remove(entity);
                //await _context.SaveChangesAsync();
            }

            foreach (var item in typeBenefitCreate.TypeBenefitTable)
            {
                for (int i = 1; i <= 2; i++)
                {
                    var impactTypeOfBenefit = new ImpactTypeOfBenefit
                    {
                        ImpactTypeOfBenefitTable = "TypeBenefit",
                        TypeOfBenefit = item.TypeOfBenefit,
                        InitiativeId = id
                    };

                    switch (i)
                    {
                        case 1:
                            impactTypeOfBenefit.VersionPrice = "FixedFX";
                            impactTypeOfBenefit.currencyFloatFx = item.CurrencyFloatFx;
                            impactTypeOfBenefit.FixedFX = item.VersionPrice != null ? item.VersionPrice.Row1 : null;
                            impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row1 : null;
                            if (item.monthRows1 == null) break;
                            impactTypeOfBenefit.Month1 = item.monthRows1.Month1;
                            impactTypeOfBenefit.Month2 = item.monthRows1.Month2;
                            impactTypeOfBenefit.Month3 = item.monthRows1.Month3;
                            impactTypeOfBenefit.Month4 = item.monthRows1.Month4;
                            impactTypeOfBenefit.Month5 = item.monthRows1.Month5;
                            impactTypeOfBenefit.Month6 = item.monthRows1.Month6;
                            impactTypeOfBenefit.Month7 = item.monthRows1.Month7;
                            impactTypeOfBenefit.Month8 = item.monthRows1.Month8;
                            impactTypeOfBenefit.Month9 = item.monthRows1.Month9;
                            impactTypeOfBenefit.Month10 = item.monthRows1.Month10;
                            impactTypeOfBenefit.Month11 = item.monthRows1.Month11;
                            impactTypeOfBenefit.Month12 = item.monthRows1.Month12;
                            impactTypeOfBenefit.Month13 = item.monthRows1.Month13;
                            impactTypeOfBenefit.Month14 = item.monthRows1.Month14;
                            impactTypeOfBenefit.Month15 = item.monthRows1.Month15;
                            impactTypeOfBenefit.Month16 = item.monthRows1.Month16;
                            impactTypeOfBenefit.Month17 = item.monthRows1.Month17;
                            impactTypeOfBenefit.Month18 = item.monthRows1.Month18;
                            impactTypeOfBenefit.Month19 = item.monthRows1.Month19;
                            impactTypeOfBenefit.Month20 = item.monthRows1.Month20;
                            impactTypeOfBenefit.Month21 = item.monthRows1.Month21;
                            impactTypeOfBenefit.Month22 = item.monthRows1.Month22;
                            impactTypeOfBenefit.Month23 = item.monthRows1.Month23;
                            impactTypeOfBenefit.Month24 = item.monthRows1.Month24;
                            impactTypeOfBenefit.Month25 = item.monthRows1.Month25;
                            impactTypeOfBenefit.Month26 = item.monthRows1.Month26;
                            impactTypeOfBenefit.Month27 = item.monthRows1.Month27;
                            impactTypeOfBenefit.Month28 = item.monthRows1.Month28;
                            impactTypeOfBenefit.Month29 = item.monthRows1.Month29;
                            impactTypeOfBenefit.Month30 = item.monthRows1.Month30;
                            impactTypeOfBenefit.Month31 = item.monthRows1.Month31;
                            impactTypeOfBenefit.Month32 = item.monthRows1.Month32;
                            impactTypeOfBenefit.Month33 = item.monthRows1.Month33;
                            impactTypeOfBenefit.Month34 = item.monthRows1.Month34;
                            impactTypeOfBenefit.Month35 = item.monthRows1.Month35;
                            impactTypeOfBenefit.Month36 = item.monthRows1.Month36;
                            break;
                        case 2:
                            impactTypeOfBenefit.VersionPrice = "FloatFX";
                            impactTypeOfBenefit.currencyFloatFx = null;
                            impactTypeOfBenefit.FixedFX = item.VersionPrice != null ? item.VersionPrice.Row2 : null;
                            impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row2 : null;
                            if (item.monthRows2 == null) break;
                            impactTypeOfBenefit.Month1 = item.monthRows2.Month1;
                            impactTypeOfBenefit.Month2 = item.monthRows2.Month2;
                            impactTypeOfBenefit.Month3 = item.monthRows2.Month3;
                            impactTypeOfBenefit.Month4 = item.monthRows2.Month4;
                            impactTypeOfBenefit.Month5 = item.monthRows2.Month5;
                            impactTypeOfBenefit.Month6 = item.monthRows2.Month6;
                            impactTypeOfBenefit.Month7 = item.monthRows2.Month7;
                            impactTypeOfBenefit.Month8 = item.monthRows2.Month8;
                            impactTypeOfBenefit.Month9 = item.monthRows2.Month9;
                            impactTypeOfBenefit.Month10 = item.monthRows2.Month10;
                            impactTypeOfBenefit.Month11 = item.monthRows2.Month11;
                            impactTypeOfBenefit.Month12 = item.monthRows2.Month12;
                            impactTypeOfBenefit.Month13 = item.monthRows2.Month13;
                            impactTypeOfBenefit.Month14 = item.monthRows2.Month14;
                            impactTypeOfBenefit.Month15 = item.monthRows2.Month15;
                            impactTypeOfBenefit.Month16 = item.monthRows2.Month16;
                            impactTypeOfBenefit.Month17 = item.monthRows2.Month17;
                            impactTypeOfBenefit.Month18 = item.monthRows2.Month18;
                            impactTypeOfBenefit.Month19 = item.monthRows2.Month19;
                            impactTypeOfBenefit.Month20 = item.monthRows2.Month20;
                            impactTypeOfBenefit.Month21 = item.monthRows2.Month21;
                            impactTypeOfBenefit.Month22 = item.monthRows2.Month22;
                            impactTypeOfBenefit.Month23 = item.monthRows2.Month23;
                            impactTypeOfBenefit.Month24 = item.monthRows2.Month24;
                            impactTypeOfBenefit.Month25 = item.monthRows2.Month25;
                            impactTypeOfBenefit.Month26 = item.monthRows2.Month26;
                            impactTypeOfBenefit.Month27 = item.monthRows2.Month27;
                            impactTypeOfBenefit.Month28 = item.monthRows2.Month28;
                            impactTypeOfBenefit.Month29 = item.monthRows2.Month29;
                            impactTypeOfBenefit.Month30 = item.monthRows2.Month30;
                            impactTypeOfBenefit.Month31 = item.monthRows2.Month31;
                            impactTypeOfBenefit.Month32 = item.monthRows2.Month32;
                            impactTypeOfBenefit.Month33 = item.monthRows2.Month33;
                            impactTypeOfBenefit.Month34 = item.monthRows2.Month34;
                            impactTypeOfBenefit.Month35 = item.monthRows2.Month35;
                            impactTypeOfBenefit.Month36 = item.monthRows2.Month36;
                            break;
                    }
                    await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                    await _context.SaveChangesAsync();
                }
            }

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(typeBenefitCreate, "ImpactTracking-595", SQLCommandType.INSERT, true);
            // End log



            await _context.SaveChangesAsync();
            return typeBenefitCreate;
        }

        public async Task<IEnumerable<ImpactTypeOfBenefit>> GetTypeOfBenefit(int id)
        {
            var impactTypeOfBenefits = await _context.ImpactTypeOfBenefits
            .Where(i => i.InitiativeId == id)
            .Where(i => i.ImpactTypeOfBenefitTable == "TypeBenefit")
            .ToListAsync();
            return impactTypeOfBenefits;
        }

        public async Task<CreateWorkstream> CreateWorkstream(int id, CreateWorkstream CreateWorkstream)
        {
            if (_context.ShareBenefitWorkstreams.Any())
            {
                var List = await _context.ShareBenefitWorkstreams.Where(i => i.InitiativeId == id).ToListAsync();


                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(List, "ImpactTracking-621", SQLCommandType.INSERT, false);
                // End log


                foreach (var entity in List)
                    _context.ShareBenefitWorkstreams.Remove(entity);
                await _context.SaveChangesAsync();
            }

            foreach (var item in CreateWorkstream.ShareBenefitWorkstreams)
            {
                await _context.ShareBenefitWorkstreams.AddAsync(item);
                await _context.SaveChangesAsync();
            }

            // Temporary Log for Invetigate 2021-07-13
            LogInsight.Log(CreateWorkstream.ShareBenefitWorkstreams, "ImpactTracking-630", SQLCommandType.INSERT, true);
            // End log

            return CreateWorkstream;
        }

        public async Task<bool> DeleteShareBenefitWorkstream(int id)
        {
            if (_context.ShareBenefitWorkstreams.Any())
            {
                var List = await _context.ShareBenefitWorkstreams.Where(i => i.InitiativeId == id).ToListAsync();

                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(List, "ImpactTracking-647", SQLCommandType.DELETE, false);
                // End log


                foreach (var entity in List)
                    _context.ShareBenefitWorkstreams.Remove(entity);

                // Temporary Log for Invetigate 2021-07-13
                LogInsight.Log(List, "ImpactTracking-655", SQLCommandType.DELETE, true);
                // End log

                await _context.SaveChangesAsync();
                return true;
            }
            return true;
        }

        public async Task<decimal?> GetTotalRecurring(int initiativeId)
        {
            decimal? recurring_Actual = null;
            decimal? recurring_Revise = null;
            decimal? recurring_Target = null;
            List<decimal?> lst_recurring_Actual = await _context.ImpactTypeOfBenefits.Where(i => i.InitiativeId == initiativeId && i.VersionPrice == "Actual" && i.TypeOfBenefit.StartsWith("RE")).Select(i => i.RunRate).ToListAsync();
            List<decimal?> lst_recurring_Revise = await _context.ImpactTypeOfBenefits.Where(i => i.InitiativeId == initiativeId && i.VersionPrice == "Revise" && i.TypeOfBenefit.StartsWith("RE")).Select(i => i.RunRate).ToListAsync();
            List<decimal?> lst_recurring_Target = await _context.ImpactTypeOfBenefits.Where(i => i.InitiativeId == initiativeId && i.VersionPrice == "Target" && i.TypeOfBenefit.StartsWith("RE")).Select(i => i.RunRate).ToListAsync();

            foreach (decimal? actual in lst_recurring_Actual)
            {
                if (actual == null) continue;
                recurring_Actual = recurring_Actual ?? 0;
                recurring_Actual += actual;
            }

            foreach (decimal? revise in lst_recurring_Revise)
            {
                if (revise == null) continue;
                recurring_Revise = recurring_Revise ?? 0;
                recurring_Revise += revise;
            }

            foreach (decimal? target in lst_recurring_Target)
            {
                if (target == null) continue;
                recurring_Target = recurring_Target ?? 0;
                recurring_Target += target;
            }

            if (recurring_Actual != null) return await Task.FromResult(recurring_Actual);
            if (recurring_Revise != null) return await Task.FromResult(recurring_Revise);
            if (recurring_Target != null) return await Task.FromResult(recurring_Target);

            return null;
        }

        public async Task<decimal?> GetTotalOnetime(int initiativeId)
        {
            decimal? onetime_Actual = null;
            decimal? onetime_Revise = null;
            decimal? onetime_Target = null;
            List<decimal?> lst_onetime_Actual = await _context.ImpactTypeOfBenefits.Where(i => i.InitiativeId == initiativeId && i.VersionPrice == "Actual" && i.TypeOfBenefit.StartsWith("ONE")).Select(i => i.RunRate).ToListAsync();
            List<decimal?> lst_onetime_Revise = await _context.ImpactTypeOfBenefits.Where(i => i.InitiativeId == initiativeId && i.VersionPrice == "Revise" && i.TypeOfBenefit.StartsWith("ONE")).Select(i => i.RunRate).ToListAsync();
            List<decimal?> lst_onetime_Target = await _context.ImpactTypeOfBenefits.Where(i => i.InitiativeId == initiativeId && i.VersionPrice == "Target" && i.TypeOfBenefit.StartsWith("ONE")).Select(i => i.RunRate).ToListAsync();

            foreach (decimal? actual in lst_onetime_Actual)
            {
                if (actual == null) continue;
                onetime_Actual = onetime_Actual ?? 0;
                onetime_Actual += actual;
            }

            foreach (decimal? revise in lst_onetime_Revise)
            {
                if (revise == null) continue;
                onetime_Revise = onetime_Revise ?? 0;
                onetime_Revise += revise;
            }

            foreach (decimal? target in lst_onetime_Target)
            {
                if (target == null) continue;
                onetime_Target = onetime_Target ?? 0;
                onetime_Target += target;
            }

            if (onetime_Actual != null) return await Task.FromResult(onetime_Actual = (decimal?)((double)onetime_Actual * 0.1));
            if (onetime_Revise != null) return await Task.FromResult(onetime_Revise = (decimal?)((double)onetime_Revise * 0.1));
            if (onetime_Target != null) return await Task.FromResult(onetime_Target = (decimal?)((double)onetime_Target * 0.1));

            return null;
        }

        public async Task<ImpactTrackingAll> GetImpactAllTracking(int initiativeId)
        {
            try
            {
                ImpactTrackingAll impactTrackingAll = new ImpactTrackingAll();
                var initiative = await _context.Initiatives.Where(x => x.Id.Equals(initiativeId)).FirstOrDefaultAsync();
                var detailInfomation = await _context.DetailInformations.Where(x => x.InitiativeId.Equals(initiativeId)).FirstOrDefaultAsync();
                //get One time benefit (Portion)
                var impact = await _context.ImpactTrackings.Where(x => x.InitiativeId.Equals(initiativeId)).FirstOrDefaultAsync();
                var recurringAndOneTime = await _context.TypeOfBenefits.Where(t => (t.TypeOfBenefitGroup.Equals("Recurring") || t.TypeOfBenefitGroup.Equals("One time"))).ToListAsync();


                if (impact == null)
                {
                    impactTrackingAll.DetailInformation = detailInfomation;
                    impactTrackingAll.RecurringAndOneTime = recurringAndOneTime;
                    return impactTrackingAll;
                }
                var impactTypeOfBenefits = await _context.ImpactTypeOfBenefits.Where(x => x.InitiativeId.Equals(initiativeId)).ToListAsync();
                var setting = await _context.Setting.OrderBy(x => x.SettingId).FirstOrDefaultAsync();
                var shareBenefit = await _context.ShareBenefitWorkstreams.Where(x => x.InitiativeId.Equals(initiativeId)).ToListAsync();



                List<string> runrateType = new List<string> { "Target", "Revise", "Actual" };
                List<string> typeBenefitType = new List<string> { "FixedFX", "FloatFX" };
                List<string> indirectBenefitType = new List<string> { "Target", "Revise" };
                //List<decimal> list = new List<decimal>();
                List<decimal> fixedFXRecurringLists = new List<decimal>();
                List<decimal> floateFXRecurringLists = new List<decimal>();
                List<decimal> fixedFXOnetimeLists = new List<decimal>();
                List<decimal> floateFXOnetimeLists = new List<decimal>();

                //get Runrate
                var runrateTarget = impactTypeOfBenefits.Where(x => x.ImpactTypeOfBenefitTable.ToLower().Equals(("FirstRunRate").ToLower()) && x.VersionPrice.ToLower().Equals(("Target").ToLower())).ToList();
                var runrateRevise = impactTypeOfBenefits.Where(x => x.ImpactTypeOfBenefitTable.ToLower().Equals(("FirstRunRate").ToLower()) && x.VersionPrice.ToLower().Equals(("Revise").ToLower())).ToList();
                var runrateActual = impactTypeOfBenefits.Where(x => x.ImpactTypeOfBenefitTable.ToLower().Equals(("FirstRunRate").ToLower()) && x.VersionPrice.ToLower().Equals(("Actual").ToLower())).ToList();

                //implement cost
                var impiemantCostList = impactTypeOfBenefits.Where(x => x.ImpactTypeOfBenefitTable.ToLower().Equals(("ImpiemantCost").ToLower())).ToList();

                //IndirectBenefit
                var indirectBenefitTargets = impactTypeOfBenefits.Where(x => x.ImpactTypeOfBenefitTable.ToLower().Equals(("IndirectBenefit").ToLower()) && x.VersionPrice.ToLower().Equals(("Target").ToLower())).ToList();
                var indirectBenefitRevises = impactTypeOfBenefits.Where(x => x.ImpactTypeOfBenefitTable.ToLower().Equals(("IndirectBenefit").ToLower()) && x.VersionPrice.ToLower().Equals(("Revise").ToLower())).ToList();

                //TypeBenefit
                var typeBenefitFixedFX = impactTypeOfBenefits.Where(x => x.ImpactTypeOfBenefitTable.ToLower().Equals(("TypeBenefit").ToLower()) && x.VersionPrice.ToLower().Equals(("FixedFX").ToLower())).ToList();
                var typeBenefitFloatFX = impactTypeOfBenefits.Where(x => x.ImpactTypeOfBenefitTable.ToLower().Equals(("TypeBenefit").ToLower()) && x.VersionPrice.ToLower().Equals(("FloatFX").ToLower())).ToList();

                impactTrackingAll = new ImpactTrackingAll()
                {
                    Id = impact.Id,
                    FinancialImpactArea = impact.FinancialImpactArea,
                    HaveShareBenefit = impact.HaveShareBenefit,
                    IL4RunRateRecurring = impact.IL4RunRateRecurring,
                    IL5RunRateRecurring = impact.IL5RunRateRecurring,
                    IL4RunRateOnetime = impact.IL4RunRateOnetime,
                    IL5RunRateOnetime = impact.IL5RunRateOnetime,
                    IL5FixedFxRecurring = impact.IL5FixedFxRecurring,
                    IL5FloatFxRecurring = impact.IL5FloatFxRecurring,
                    IL5FixedFxOnetime = impact.IL5FixedFxOnetime,
                    IL5FloatFxOnetime = impact.IL5FloatFxOnetime,
                    TotalRecurring = impact.TotalRecurring,
                    TotalOnetime = impact.TotalOnetime,
                    FirstRunRateMonth = impact.FirstRunRateMonth,
                    AutoCalculate = impact.AutoCalculate,
                    IndirectBenefit = impact.IndirectBenefit,
                    Explanation = impact.Explanation,
                    ImpiemantCost = impact.ImpiemantCost,
                    TotalCostOPEX = impact.TotalCostOPEX,
                    ToComment = impact.ToComment,
                    Remark1 = impact.Remark1,
                    Remark2 = impact.Remark2,
                    Remark3 = impact.Remark3,
                    Remark4 = impact.Remark4,
                    Remark5 = impact.Remark5,
                    InitiativeId = impact.InitiativeId,
                    InitiativeCode = impact.InitiativeCode,
                    SIL4Achievement = impact.SIL4Achievement,
                    SIL5Achievement = impact.SIL5Achievement,
                    ContactIO = impact.ContactIO,
                    LastApprovedIL4Date = impact.LastApprovedIL4Date,
                    LastApprovedIL5Date = impact.LastApprovedIL5Date,
                    ContactIOBy = impact.ContactIOBy,
                    FirstApprovedIL4Date = impact.FirstApprovedIL4Date,
                    LastSubmittedSIL4Date = impact.LastSubmittedSIL4Date,
                    LastSubmittedSIL5Date = impact.LastSubmittedSIL5Date
                };

                impactTrackingAll.DetailInformation = detailInfomation;
                impactTrackingAll.RecurringAndOneTime = recurringAndOneTime;

                if (impactTypeOfBenefits == null)
                {
                    return impactTrackingAll;
                }


                List<ImpactTypeOfBenefits> firstRunrates = new List<ImpactTypeOfBenefits>();
                List<ImpactTypeOfBenefits> firstRunrateTotal = new List<ImpactTypeOfBenefits>();
                List<ImpactTypeOfBenefits> implementCost = new List<ImpactTypeOfBenefits>();
                List<ImpactTypeOfBenefits> indirectBenefits = new List<ImpactTypeOfBenefits>();
                List<ImpactTypeOfBenefits> typeOfBenefits = new List<ImpactTypeOfBenefits>();
                List<ImpactTypeOfBenefits> typeOfBenefitTotal = new List<ImpactTypeOfBenefits>();

                //cal total
                ImpactTypeOfBenefits impactTypeOfBenefitsTargetTotal = new ImpactTypeOfBenefits();
                ImpactTypeOfBenefits impactTypeOfBenefitsReviseTotal = new ImpactTypeOfBenefits();
                ImpactTypeOfBenefits impactTypeOfBenefitsActualTotal = new ImpactTypeOfBenefits();
                ImpactTypeOfBenefits typeBenefitFixedFXTotal = new ImpactTypeOfBenefits();
                ImpactTypeOfBenefits typeBenefitFloatFXTotal = new ImpactTypeOfBenefits();

                for (int i = 0; i < runrateTarget.Count; i++)
                {
                    //add runrate
                    ImpactTypeOfBenefits impactTypeOfBenefitsTarget = new ImpactTypeOfBenefits()
                    {
                        Id = runrateTarget[i].Id,
                        ImpactTypeOfBenefitTable = runrateTarget[i].ImpactTypeOfBenefitTable,
                        TypeOfBenefit = runrateTarget[i].TypeOfBenefit,
                        VersionPrice = runrateTarget[i].VersionPrice,
                        FixedFX = runrateTarget[i].FixedFX,
                        RunRate = runrateTarget[i].RunRate,
                        Month1 = runrateTarget[i].Month1,
                        Month2 = runrateTarget[i].Month2,
                        Month3 = runrateTarget[i].Month3,
                        Month4 = runrateTarget[i].Month4,
                        Month5 = runrateTarget[i].Month5,
                        Month6 = runrateTarget[i].Month6,
                        Month7 = runrateTarget[i].Month7,
                        Month8 = runrateTarget[i].Month8,
                        Month9 = runrateTarget[i].Month9,
                        Month10 = runrateTarget[i].Month10,
                        Month11 = runrateTarget[i].Month11,
                        Month12 = runrateTarget[i].Month12,
                        Month13 = runrateTarget[i].Month13,
                        Month14 = runrateTarget[i].Month14,
                        Month15 = runrateTarget[i].Month15,
                        Month16 = runrateTarget[i].Month16,
                        Month17 = runrateTarget[i].Month17,
                        Month18 = runrateTarget[i].Month18,
                        Month19 = runrateTarget[i].Month19,
                        Month20 = runrateTarget[i].Month20,
                        Month21 = runrateTarget[i].Month21,
                        Month22 = runrateTarget[i].Month22,
                        Month23 = runrateTarget[i].Month23,
                        Month24 = runrateTarget[i].Month24,
                        Month25 = runrateTarget[i].Month25,
                        Month26 = runrateTarget[i].Month26,
                        Month27 = runrateTarget[i].Month27,
                        Month28 = runrateTarget[i].Month28,
                        Month29 = runrateTarget[i].Month29,
                        Month30 = runrateTarget[i].Month30,
                        Month31 = runrateTarget[i].Month31,
                        Month32 = runrateTarget[i].Month32,
                        Month33 = runrateTarget[i].Month33,
                        Month34 = runrateTarget[i].Month34,
                        Month35 = runrateTarget[i].Month35,
                        Month36 = runrateTarget[i].Month36,
                        InitiativeId = runrateTarget[i].InitiativeId,
                        InitiativeCode = runrateTarget[i].InitiativeCode,
                        CurrencyFloatFx = runrateTarget[i].currencyFloatFx,
                        OrderIndex = i,
                        RunrateForSumTotal = !String.IsNullOrEmpty(runrateTarget[i].TypeOfBenefit) && (bool)(runrateTarget[i].TypeOfBenefit?.StartsWith("ONE")) ? (runrateTarget[i].RunRate != null ? ConvertMethod.Round(runrateTarget[i].RunRate * setting.OneTimeBenefit) : null) : (runrateTarget[i].RunRate != null ? runrateTarget[i].RunRate : null)
                    };
                    firstRunrates.Add(impactTypeOfBenefitsTarget);

                    if (initiative.Stage.StartsWith("IL3") && runrateRevise[i].RunRate == null)
                    {
                        ImpactTypeOfBenefits impactTypeOfBenefitsRevise = new ImpactTypeOfBenefits()
                        {
                            Id = runrateRevise[i].Id,
                            ImpactTypeOfBenefitTable = runrateRevise[i].ImpactTypeOfBenefitTable,
                            TypeOfBenefit = runrateRevise[i].TypeOfBenefit,
                            VersionPrice = runrateRevise[i].VersionPrice,
                            FixedFX = runrateTarget[i].FixedFX,
                            RunRate = runrateTarget[i].RunRate,
                            Month1 = runrateTarget[i].Month1,
                            Month2 = runrateTarget[i].Month2,
                            Month3 = runrateTarget[i].Month3,
                            Month4 = runrateTarget[i].Month4,
                            Month5 = runrateTarget[i].Month5,
                            Month6 = runrateTarget[i].Month6,
                            Month7 = runrateTarget[i].Month7,
                            Month8 = runrateTarget[i].Month8,
                            Month9 = runrateTarget[i].Month9,
                            Month10 = runrateTarget[i].Month10,
                            Month11 = runrateTarget[i].Month11,
                            Month12 = runrateTarget[i].Month12,
                            Month13 = runrateTarget[i].Month13,
                            Month14 = runrateTarget[i].Month14,
                            Month15 = runrateTarget[i].Month15,
                            Month16 = runrateTarget[i].Month16,
                            Month17 = runrateTarget[i].Month17,
                            Month18 = runrateTarget[i].Month18,
                            Month19 = runrateTarget[i].Month19,
                            Month20 = runrateTarget[i].Month20,
                            Month21 = runrateTarget[i].Month21,
                            Month22 = runrateTarget[i].Month22,
                            Month23 = runrateTarget[i].Month23,
                            Month24 = runrateTarget[i].Month24,
                            Month25 = runrateTarget[i].Month25,
                            Month26 = runrateTarget[i].Month26,
                            Month27 = runrateTarget[i].Month27,
                            Month28 = runrateTarget[i].Month28,
                            Month29 = runrateTarget[i].Month29,
                            Month30 = runrateTarget[i].Month30,
                            Month31 = runrateTarget[i].Month31,
                            Month32 = runrateTarget[i].Month32,
                            Month33 = runrateTarget[i].Month33,
                            Month34 = runrateTarget[i].Month34,
                            Month35 = runrateTarget[i].Month35,
                            Month36 = runrateTarget[i].Month36,
                            InitiativeId = runrateTarget[i].InitiativeId,
                            InitiativeCode = runrateTarget[i].InitiativeCode,
                            CurrencyFloatFx = runrateTarget[i].currencyFloatFx,
                            OrderIndex = i,
                            RunrateForSumTotal = !String.IsNullOrEmpty(runrateTarget[i].TypeOfBenefit) && (bool)(runrateTarget[i].TypeOfBenefit?.StartsWith("ONE")) ? (runrateTarget[i].RunRate != null ? ConvertMethod.Round(runrateTarget[i].RunRate * setting.OneTimeBenefit) : null) : (runrateTarget[i].RunRate != null ? runrateTarget[i].RunRate : null)
                        };
                        firstRunrates.Add(impactTypeOfBenefitsRevise);
                    }
                    else
                    {
                        ImpactTypeOfBenefits impactTypeOfBenefitsRevise = new ImpactTypeOfBenefits()
                        {
                            Id = runrateRevise[i].Id,
                            ImpactTypeOfBenefitTable = runrateRevise[i].ImpactTypeOfBenefitTable,
                            TypeOfBenefit = runrateRevise[i].TypeOfBenefit,
                            VersionPrice = runrateRevise[i].VersionPrice,
                            FixedFX = runrateRevise[i].FixedFX,
                            RunRate = runrateRevise[i].RunRate,
                            Month1 = runrateRevise[i].Month1,
                            Month2 = runrateRevise[i].Month2,
                            Month3 = runrateRevise[i].Month3,
                            Month4 = runrateRevise[i].Month4,
                            Month5 = runrateRevise[i].Month5,
                            Month6 = runrateRevise[i].Month6,
                            Month7 = runrateRevise[i].Month7,
                            Month8 = runrateRevise[i].Month8,
                            Month9 = runrateRevise[i].Month9,
                            Month10 = runrateRevise[i].Month10,
                            Month11 = runrateRevise[i].Month11,
                            Month12 = runrateRevise[i].Month12,
                            Month13 = runrateRevise[i].Month13,
                            Month14 = runrateRevise[i].Month14,
                            Month15 = runrateRevise[i].Month15,
                            Month16 = runrateRevise[i].Month16,
                            Month17 = runrateRevise[i].Month17,
                            Month18 = runrateRevise[i].Month18,
                            Month19 = runrateRevise[i].Month19,
                            Month20 = runrateRevise[i].Month20,
                            Month21 = runrateRevise[i].Month21,
                            Month22 = runrateRevise[i].Month22,
                            Month23 = runrateRevise[i].Month23,
                            Month24 = runrateRevise[i].Month24,
                            Month25 = runrateRevise[i].Month25,
                            Month26 = runrateRevise[i].Month26,
                            Month27 = runrateRevise[i].Month27,
                            Month28 = runrateRevise[i].Month28,
                            Month29 = runrateRevise[i].Month29,
                            Month30 = runrateRevise[i].Month30,
                            Month31 = runrateRevise[i].Month31,
                            Month32 = runrateRevise[i].Month32,
                            Month33 = runrateRevise[i].Month33,
                            Month34 = runrateRevise[i].Month34,
                            Month35 = runrateRevise[i].Month35,
                            Month36 = runrateRevise[i].Month36,
                            InitiativeId = runrateRevise[i].InitiativeId,
                            InitiativeCode = runrateRevise[i].InitiativeCode,
                            CurrencyFloatFx = runrateRevise[i].currencyFloatFx,
                            OrderIndex = i,
                            RunrateForSumTotal = !String.IsNullOrEmpty(runrateRevise[i].TypeOfBenefit) && (bool)(runrateRevise[i].TypeOfBenefit?.StartsWith("ONE")) ? (runrateRevise[i].RunRate != null ? ConvertMethod.Round(runrateRevise[i].RunRate * setting.OneTimeBenefit) : null) : (runrateRevise[i].RunRate != null ? runrateRevise[i].RunRate : null)
                        };
                        firstRunrates.Add(impactTypeOfBenefitsRevise);
                    }

                    ImpactTypeOfBenefits impactTypeOfBenefitsActual = new ImpactTypeOfBenefits()
                    {
                        Id = runrateActual[i].Id,
                        ImpactTypeOfBenefitTable = runrateActual[i].ImpactTypeOfBenefitTable,
                        TypeOfBenefit = runrateActual[i].TypeOfBenefit,
                        VersionPrice = runrateActual[i].VersionPrice,
                        FixedFX = runrateActual[i].FixedFX,
                        RunRate = runrateActual[i].RunRate,
                        Month1 = runrateActual[i].Month1,
                        Month2 = runrateActual[i].Month2,
                        Month3 = runrateActual[i].Month3,
                        Month4 = runrateActual[i].Month4,
                        Month5 = runrateActual[i].Month5,
                        Month6 = runrateActual[i].Month6,
                        Month7 = runrateActual[i].Month7,
                        Month8 = runrateActual[i].Month8,
                        Month9 = runrateActual[i].Month9,
                        Month10 = runrateActual[i].Month10,
                        Month11 = runrateActual[i].Month11,
                        Month12 = runrateActual[i].Month12,
                        Month13 = runrateActual[i].Month13,
                        Month14 = runrateActual[i].Month14,
                        Month15 = runrateActual[i].Month15,
                        Month16 = runrateActual[i].Month16,
                        Month17 = runrateActual[i].Month17,
                        Month18 = runrateActual[i].Month18,
                        Month19 = runrateActual[i].Month19,
                        Month20 = runrateActual[i].Month20,
                        Month21 = runrateActual[i].Month21,
                        Month22 = runrateActual[i].Month22,
                        Month23 = runrateActual[i].Month23,
                        Month24 = runrateActual[i].Month24,
                        Month25 = runrateActual[i].Month25,
                        Month26 = runrateActual[i].Month26,
                        Month27 = runrateActual[i].Month27,
                        Month28 = runrateActual[i].Month28,
                        Month29 = runrateActual[i].Month29,
                        Month30 = runrateActual[i].Month30,
                        Month31 = runrateActual[i].Month31,
                        Month32 = runrateActual[i].Month32,
                        Month33 = runrateActual[i].Month33,
                        Month34 = runrateActual[i].Month34,
                        Month35 = runrateActual[i].Month35,
                        Month36 = runrateActual[i].Month36,
                        InitiativeId = runrateActual[i].InitiativeId,
                        InitiativeCode = runrateActual[i].InitiativeCode,
                        CurrencyFloatFx = runrateActual[i].currencyFloatFx,
                        OrderIndex = i,
                        RunrateForSumTotal = !String.IsNullOrEmpty(runrateActual[i].TypeOfBenefit) && (bool)(runrateActual[i].TypeOfBenefit?.StartsWith("ONE")) ? (runrateActual[i].RunRate != null ? ConvertMethod.Round(runrateActual[i].RunRate * setting.OneTimeBenefit) : null) : (runrateActual[i].RunRate != null ? runrateActual[i].RunRate : null)
                    };
                    firstRunrates.Add(impactTypeOfBenefitsActual);

                    //add type of benefit
                    ImpactTypeOfBenefits impactTypeBenefitFixedFX = new ImpactTypeOfBenefits()
                    {
                        Id = typeBenefitFixedFX[i].Id,
                        ImpactTypeOfBenefitTable = typeBenefitFixedFX[i].ImpactTypeOfBenefitTable,
                        TypeOfBenefit = typeBenefitFixedFX[i].TypeOfBenefit,
                        VersionPrice = typeBenefitFixedFX[i].VersionPrice,
                        FixedFX = typeBenefitFixedFX[i].FixedFX,
                        RunRate = typeBenefitFixedFX[i].RunRate,
                        Month1 = typeBenefitFixedFX[i].Month1,
                        Month2 = typeBenefitFixedFX[i].Month2,
                        Month3 = typeBenefitFixedFX[i].Month3,
                        Month4 = typeBenefitFixedFX[i].Month4,
                        Month5 = typeBenefitFixedFX[i].Month5,
                        Month6 = typeBenefitFixedFX[i].Month6,
                        Month7 = typeBenefitFixedFX[i].Month7,
                        Month8 = typeBenefitFixedFX[i].Month8,
                        Month9 = typeBenefitFixedFX[i].Month9,
                        Month10 = typeBenefitFixedFX[i].Month10,
                        Month11 = typeBenefitFixedFX[i].Month11,
                        Month12 = typeBenefitFixedFX[i].Month12,
                        Month13 = typeBenefitFixedFX[i].Month13,
                        Month14 = typeBenefitFixedFX[i].Month14,
                        Month15 = typeBenefitFixedFX[i].Month15,
                        Month16 = typeBenefitFixedFX[i].Month16,
                        Month17 = typeBenefitFixedFX[i].Month17,
                        Month18 = typeBenefitFixedFX[i].Month18,
                        Month19 = typeBenefitFixedFX[i].Month19,
                        Month20 = typeBenefitFixedFX[i].Month20,
                        Month21 = typeBenefitFixedFX[i].Month21,
                        Month22 = typeBenefitFixedFX[i].Month22,
                        Month23 = typeBenefitFixedFX[i].Month23,
                        Month24 = typeBenefitFixedFX[i].Month24,
                        Month25 = typeBenefitFixedFX[i].Month25,
                        Month26 = typeBenefitFixedFX[i].Month26,
                        Month27 = typeBenefitFixedFX[i].Month27,
                        Month28 = typeBenefitFixedFX[i].Month28,
                        Month29 = typeBenefitFixedFX[i].Month29,
                        Month30 = typeBenefitFixedFX[i].Month30,
                        Month31 = typeBenefitFixedFX[i].Month31,
                        Month32 = typeBenefitFixedFX[i].Month32,
                        Month33 = typeBenefitFixedFX[i].Month33,
                        Month34 = typeBenefitFixedFX[i].Month34,
                        Month35 = typeBenefitFixedFX[i].Month35,
                        Month36 = typeBenefitFixedFX[i].Month36,
                        InitiativeId = typeBenefitFixedFX[i].InitiativeId,
                        InitiativeCode = typeBenefitFixedFX[i].InitiativeCode,
                        CurrencyFloatFx = typeBenefitFixedFX[i].currencyFloatFx,
                        OrderIndex = i,
                        RunrateForSumTotal = !String.IsNullOrEmpty(typeBenefitFixedFX[i].TypeOfBenefit) && (bool)(typeBenefitFixedFX[i].TypeOfBenefit?.StartsWith("ONE")) ? (typeBenefitFixedFX[i].RunRate != null ? ConvertMethod.Round(typeBenefitFixedFX[i].RunRate * setting.OneTimeBenefit) : null) : (typeBenefitFixedFX[i].RunRate != null ? typeBenefitFixedFX[i].RunRate : null)
                    };
                    typeOfBenefits.Add(impactTypeBenefitFixedFX);
                    ImpactTypeOfBenefits impactTypeBenefitFloatFX = new ImpactTypeOfBenefits()
                    {
                        Id = typeBenefitFloatFX[i].Id,
                        ImpactTypeOfBenefitTable = typeBenefitFloatFX[i].ImpactTypeOfBenefitTable,
                        TypeOfBenefit = typeBenefitFloatFX[i].TypeOfBenefit,
                        VersionPrice = typeBenefitFloatFX[i].VersionPrice,
                        FixedFX = typeBenefitFloatFX[i].FixedFX,
                        RunRate = typeBenefitFloatFX[i].RunRate,
                        Month1 = typeBenefitFloatFX[i].Month1,
                        Month2 = typeBenefitFloatFX[i].Month2,
                        Month3 = typeBenefitFloatFX[i].Month3,
                        Month4 = typeBenefitFloatFX[i].Month4,
                        Month5 = typeBenefitFloatFX[i].Month5,
                        Month6 = typeBenefitFloatFX[i].Month6,
                        Month7 = typeBenefitFloatFX[i].Month7,
                        Month8 = typeBenefitFloatFX[i].Month8,
                        Month9 = typeBenefitFloatFX[i].Month9,
                        Month10 = typeBenefitFloatFX[i].Month10,
                        Month11 = typeBenefitFloatFX[i].Month11,
                        Month12 = typeBenefitFloatFX[i].Month12,
                        Month13 = typeBenefitFloatFX[i].Month13,
                        Month14 = typeBenefitFloatFX[i].Month14,
                        Month15 = typeBenefitFloatFX[i].Month15,
                        Month16 = typeBenefitFloatFX[i].Month16,
                        Month17 = typeBenefitFloatFX[i].Month17,
                        Month18 = typeBenefitFloatFX[i].Month18,
                        Month19 = typeBenefitFloatFX[i].Month19,
                        Month20 = typeBenefitFloatFX[i].Month20,
                        Month21 = typeBenefitFloatFX[i].Month21,
                        Month22 = typeBenefitFloatFX[i].Month22,
                        Month23 = typeBenefitFloatFX[i].Month23,
                        Month24 = typeBenefitFloatFX[i].Month24,
                        Month25 = typeBenefitFloatFX[i].Month25,
                        Month26 = typeBenefitFloatFX[i].Month26,
                        Month27 = typeBenefitFloatFX[i].Month27,
                        Month28 = typeBenefitFloatFX[i].Month28,
                        Month29 = typeBenefitFloatFX[i].Month29,
                        Month30 = typeBenefitFloatFX[i].Month30,
                        Month31 = typeBenefitFloatFX[i].Month31,
                        Month32 = typeBenefitFloatFX[i].Month32,
                        Month33 = typeBenefitFloatFX[i].Month33,
                        Month34 = typeBenefitFloatFX[i].Month34,
                        Month35 = typeBenefitFloatFX[i].Month35,
                        Month36 = typeBenefitFloatFX[i].Month36,
                        InitiativeId = typeBenefitFloatFX[i].InitiativeId,
                        InitiativeCode = typeBenefitFloatFX[i].InitiativeCode,
                        CurrencyFloatFx = typeBenefitFloatFX[i].currencyFloatFx,
                        OrderIndex = i,
                        RunrateForSumTotal = !String.IsNullOrEmpty(typeBenefitFloatFX[i].TypeOfBenefit) && (bool)(typeBenefitFloatFX[i].TypeOfBenefit?.StartsWith("ONE")) ? (typeBenefitFloatFX[i].RunRate != null ? ConvertMethod.Round(typeBenefitFloatFX[i].RunRate * setting.OneTimeBenefit) : null) : (typeBenefitFloatFX[i].RunRate != null ? typeBenefitFloatFX[i].RunRate : null)
                    };
                    typeOfBenefits.Add(impactTypeBenefitFloatFX);

                    //cal runrate
                    impactTypeOfBenefitsTargetTotal = new ImpactTypeOfBenefits()
                    {
                        Id = i + 1,
                        ImpactTypeOfBenefitTable = runrateTarget[i].ImpactTypeOfBenefitTable,
                        VersionPrice = runrateTarget[i].VersionPrice,
                        FixedFX = runrateTarget[i].FixedFX,
                        RunRate = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && x.RunrateForSumTotal != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0))).Sum(x => x.RunrateForSumTotal) : null,
                        Month1 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month1 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month1) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month1 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month1 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month1 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month1 * setting.OneTimeBenefit))) : null),
                        Month2 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month2 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month2) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month2 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month2 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month2 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month2 * setting.OneTimeBenefit))) : null),
                        Month3 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month3 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month3) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month3 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month3 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month3 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month3 * setting.OneTimeBenefit))) : null),
                        Month4 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month4 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month4) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month4 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month4 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month4 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month4 * setting.OneTimeBenefit))) : null),
                        Month5 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month5 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month5) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month5 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month5 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month5 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month5 * setting.OneTimeBenefit))) : null),
                        Month6 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month6 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month6) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month6 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month6 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month6 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month6 * setting.OneTimeBenefit))) : null),
                        Month7 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month7 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month7) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month7 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month7 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month7 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month7 * setting.OneTimeBenefit))) : null),
                        Month8 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month8 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month8) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month8 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month8 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month8 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month8 * setting.OneTimeBenefit))) : null),
                        Month9 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month9 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month9) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month9 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month9 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month9 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month9 * setting.OneTimeBenefit))) : null),
                        Month10 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month10 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month10) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month10 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month10 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month10 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month10 * setting.OneTimeBenefit))) : null),
                        Month11 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month11 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month11) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month11 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month11 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month11 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month11 * setting.OneTimeBenefit))) : null),
                        Month12 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month12 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month12) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month12 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month12 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month12 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month12 * setting.OneTimeBenefit))) : null),
                        Month13 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month13 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month13) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month13 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month13 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month13 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month13 * setting.OneTimeBenefit))) : null),
                        Month14 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month14 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month14) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month14 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month14 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month14 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month14 * setting.OneTimeBenefit))) : null),
                        Month15 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month15 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month15) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month15 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month15 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month15 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month15 * setting.OneTimeBenefit))) : null),
                        Month16 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month16 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month16) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month16 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month16 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month16 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month16 * setting.OneTimeBenefit))) : null),
                        Month17 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month17 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month17) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month17 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month17 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month17 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month17 * setting.OneTimeBenefit))) : null),
                        Month18 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month18 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month18) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month18 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month18 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month18 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month18 * setting.OneTimeBenefit))) : null),
                        Month19 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month19 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month19) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month19 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month19 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month19 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month19 * setting.OneTimeBenefit))) : null),
                        Month20 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month20 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month20) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month20 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month20 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month20 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month20 * setting.OneTimeBenefit))) : null),
                        Month21 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month21 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month21) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month21 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month21 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month21 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month21 * setting.OneTimeBenefit))) : null),
                        Month22 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month22 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month22) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month22 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month22 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month22 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month22 * setting.OneTimeBenefit))) : null),
                        Month23 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month23 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month23) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month23 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month23 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month23 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month23 * setting.OneTimeBenefit))) : null),
                        Month24 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month24 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month24) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month24 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month24 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month24 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month24 * setting.OneTimeBenefit))) : null),
                        Month25 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month25 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month25) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month25 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month25 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month25 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month25 * setting.OneTimeBenefit))) : null),
                        Month26 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month26 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month26) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month26 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month26 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month26 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month26 * setting.OneTimeBenefit))) : null),
                        Month27 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month27 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month27) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month27 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month27 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month27 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month27 * setting.OneTimeBenefit))) : null),
                        Month28 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month28 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month28) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month28 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month28 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month28 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month28 * setting.OneTimeBenefit))) : null),
                        Month29 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month29 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month29) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month29 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month29 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month29 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month29 * setting.OneTimeBenefit))) : null),
                        Month30 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month30 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month30) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month30 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month30 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month30 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month30 * setting.OneTimeBenefit))) : null),
                        Month31 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month31 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month31) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month31 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month31 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month31 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month31 * setting.OneTimeBenefit))) : null),
                        Month32 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month32 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month32) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month32 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month32 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month32 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month32 * setting.OneTimeBenefit))) : null),
                        Month33 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month33 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month33) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month33 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month33 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month33 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month33 * setting.OneTimeBenefit))) : null),
                        Month34 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month34 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month34) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month34 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month34 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month34 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month34 * setting.OneTimeBenefit))) : null),
                        Month35 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month35 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month35) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month35 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month35 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month35 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month35 * setting.OneTimeBenefit))) : null),
                        Month36 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month36 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month36) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month36 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month36 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month36 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month36 * setting.OneTimeBenefit))) : null),
                        InitiativeId = runrateTarget[i].InitiativeId
                    };

                    impactTypeOfBenefitsReviseTotal = new ImpactTypeOfBenefits()
                    {
                        Id = i + 2,
                        ImpactTypeOfBenefitTable = runrateTarget[i].ImpactTypeOfBenefitTable,
                        VersionPrice = runrateTarget[i].VersionPrice,
                        FixedFX = runrateTarget[i].FixedFX,
                        RunRate = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && x.RunrateForSumTotal != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1))).Sum(x => x.RunrateForSumTotal) : null,
                        Month1 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month1 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month1) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month1 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month1 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month1 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month1 * setting.OneTimeBenefit))) : null),
                        Month2 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month2 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month2) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month2 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month2 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month2 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month2 * setting.OneTimeBenefit))) : null),
                        Month3 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month3 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month3) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month3 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month3 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month3 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month3 * setting.OneTimeBenefit))) : null),
                        Month4 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month4 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month4) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month4 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month4 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month4 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month4 * setting.OneTimeBenefit))) : null),
                        Month5 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month5 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month5) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month5 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month5 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month5 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month5 * setting.OneTimeBenefit))) : null),
                        Month6 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month6 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month6) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month6 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month6 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month6 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month6 * setting.OneTimeBenefit))) : null),
                        Month7 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month7 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month7) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month7 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month7 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month7 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month7 * setting.OneTimeBenefit))) : null),
                        Month8 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month8 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month8) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month8 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month8 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month8 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month8 * setting.OneTimeBenefit))) : null),
                        Month9 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month9 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month9) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month9 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month9 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month9 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month9 * setting.OneTimeBenefit))) : null),
                        Month10 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month10 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month10) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month10 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month10 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month10 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month10 * setting.OneTimeBenefit))) : null),
                        Month11 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month11 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month11) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month11 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month11 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month11 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month11 * setting.OneTimeBenefit))) : null),
                        Month12 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month12 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month12) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month12 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month12 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month12 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month12 * setting.OneTimeBenefit))) : null),
                        Month13 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month13 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month13) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month13 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month13 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month13 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month13 * setting.OneTimeBenefit))) : null),
                        Month14 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month14 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month14) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month14 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month14 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month14 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month14 * setting.OneTimeBenefit))) : null),
                        Month15 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month15 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month15) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month15 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month15 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month15 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month15 * setting.OneTimeBenefit))) : null),
                        Month16 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month16 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month16) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month16 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month16 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month16 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month16 * setting.OneTimeBenefit))) : null),
                        Month17 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month17 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month17) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month17 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month17 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month17 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month17 * setting.OneTimeBenefit))) : null),
                        Month18 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month18 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month18) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month18 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month18 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month18 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month18 * setting.OneTimeBenefit))) : null),
                        Month19 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month19 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month19) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month19 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month19 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month19 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month19 * setting.OneTimeBenefit))) : null),
                        Month20 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month20 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month20) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month20 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month20 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month20 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month20 * setting.OneTimeBenefit))) : null),
                        Month21 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month21 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month21) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month21 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month21 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month21 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month21 * setting.OneTimeBenefit))) : null),
                        Month22 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month22 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month22) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month22 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month22 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month22 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month22 * setting.OneTimeBenefit))) : null),
                        Month23 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month23 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month23) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month23 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month23 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month23 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month23 * setting.OneTimeBenefit))) : null),
                        Month24 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month24 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month24) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month24 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month24 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month24 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month24 * setting.OneTimeBenefit))) : null),
                        Month25 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month25 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month25) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month25 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month25 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month25 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month25 * setting.OneTimeBenefit))) : null),
                        Month26 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month26 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month26) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month26 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month26 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month26 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month26 * setting.OneTimeBenefit))) : null),
                        Month27 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month27 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month27) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month27 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month27 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month27 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month27 * setting.OneTimeBenefit))) : null),
                        Month28 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month28 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month28) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month28 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month28 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month28 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month28 * setting.OneTimeBenefit))) : null),
                        Month29 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month29 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month29) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month29 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month29 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month29 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month29 * setting.OneTimeBenefit))) : null),
                        Month30 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month30 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month30) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month30 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month30 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month30 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month30 * setting.OneTimeBenefit))) : null),
                        Month31 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month31 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month31) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month31 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month31 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month31 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month31 * setting.OneTimeBenefit))) : null),
                        Month32 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month32 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month32) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month32 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month32 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month32 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month32 * setting.OneTimeBenefit))) : null),
                        Month33 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month33 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month33) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month33 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month33 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month33 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month33 * setting.OneTimeBenefit))) : null),
                        Month34 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month34 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month34) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month34 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month34 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month34 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month34 * setting.OneTimeBenefit))) : null),
                        Month35 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month35 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month35) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month35 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month35 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month35 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month35 * setting.OneTimeBenefit))) : null),
                        Month36 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month36 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month36) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month36 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month36 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month36 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month36 * setting.OneTimeBenefit))) : null),
                        InitiativeId = runrateTarget[i].InitiativeId
                    };

                    impactTypeOfBenefitsActualTotal = new ImpactTypeOfBenefits()
                    {
                        Id = i + 3,
                        ImpactTypeOfBenefitTable = runrateTarget[i].ImpactTypeOfBenefitTable,
                        VersionPrice = runrateTarget[i].VersionPrice,
                        RunRate = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && x.RunrateForSumTotal != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2))).Sum(x => x.RunrateForSumTotal) : null,
                        Month1 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month1 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month1) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month1 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month1 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month1 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month1 * setting.OneTimeBenefit))) : null),
                        Month2 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month2 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month2) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month2 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month2 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month2 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month2 * setting.OneTimeBenefit))) : null),
                        Month3 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month3 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month3) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month3 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month3 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month3 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month3 * setting.OneTimeBenefit))) : null),
                        Month4 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month4 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month4) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month4 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month4 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month4 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month4 * setting.OneTimeBenefit))) : null),
                        Month5 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month5 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month5) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month5 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month5 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month5 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month5 * setting.OneTimeBenefit))) : null),
                        Month6 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month6 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month6) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month6 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month6 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month6 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month6 * setting.OneTimeBenefit))) : null),
                        Month7 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month7 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month7) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month7 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month7 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month7 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month7 * setting.OneTimeBenefit))) : null),
                        Month8 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month8 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month8) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month8 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month8 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month8 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month8 * setting.OneTimeBenefit))) : null),
                        Month9 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month9 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month9) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month9 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month9 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month9 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month9 * setting.OneTimeBenefit))) : null),
                        Month10 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month10 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month10) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month10 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month10 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month10 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month10 * setting.OneTimeBenefit))) : null),
                        Month11 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month11 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month11) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month11 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month11 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month11 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month11 * setting.OneTimeBenefit))) : null),
                        Month12 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month12 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month12) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month12 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month12 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month12 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month12 * setting.OneTimeBenefit))) : null),
                        Month13 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month13 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month13) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month13 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month13 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month13 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month13 * setting.OneTimeBenefit))) : null),
                        Month14 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month14 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month14) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month14 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month14 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month14 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month14 * setting.OneTimeBenefit))) : null),
                        Month15 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month15 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month15) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month15 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month15 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month15 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month15 * setting.OneTimeBenefit))) : null),
                        Month16 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month16 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month16) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month16 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month16 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month16 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month16 * setting.OneTimeBenefit))) : null),
                        Month17 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month17 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month17) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month17 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month17 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month17 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month17 * setting.OneTimeBenefit))) : null),
                        Month18 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month18 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month18) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month18 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month18 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month18 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month18 * setting.OneTimeBenefit))) : null),
                        Month19 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month19 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month19) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month19 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month19 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month19 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month19 * setting.OneTimeBenefit))) : null),
                        Month20 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month20 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month20) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month20 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month20 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month20 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month20 * setting.OneTimeBenefit))) : null),
                        Month21 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month21 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month21) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month21 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month21 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month21 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month21 * setting.OneTimeBenefit))) : null),
                        Month22 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month22 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month22) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month22 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month22 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month22 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month22 * setting.OneTimeBenefit))) : null),
                        Month23 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month23 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month23) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month23 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month23 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month23 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month23 * setting.OneTimeBenefit))) : null),
                        Month24 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month24 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month24) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month24 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month24 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month24 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month24 * setting.OneTimeBenefit))) : null),
                        Month25 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month25 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month25) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month25 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month25 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month25 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month25 * setting.OneTimeBenefit))) : null),
                        Month26 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month26 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month26) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month26 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month26 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month26 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month26 * setting.OneTimeBenefit))) : null),
                        Month27 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month27 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month27) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month27 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month27 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month27 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month27 * setting.OneTimeBenefit))) : null),
                        Month28 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month28 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month28) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month28 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month28 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month28 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month28 * setting.OneTimeBenefit))) : null),
                        Month29 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month29 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month29) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month29 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month29 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month29 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month29 * setting.OneTimeBenefit))) : null),
                        Month30 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month30 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month30) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month30 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month30 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month30 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month30 * setting.OneTimeBenefit))) : null),
                        Month31 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month31 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month31) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month31 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month31 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month31 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month31 * setting.OneTimeBenefit))) : null),
                        Month32 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month32 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month32) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month32 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month32 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month32 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month32 * setting.OneTimeBenefit))) : null),
                        Month33 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month33 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month33) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month33 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month33 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month33 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month33 * setting.OneTimeBenefit))) : null),
                        Month34 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month34 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month34) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month34 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month34 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month34 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month34 * setting.OneTimeBenefit))) : null),
                        Month35 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month35 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month35) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month35 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month35 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month35 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month35 * setting.OneTimeBenefit))) : null),
                        Month36 = firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month36 != null).Count() > 0 ? firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month36) + (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month36 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month36 * setting.OneTimeBenefit))) : 0) : (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month36 != null).Count() > 0 ? (firstRunrates.Where(x => x.VersionPrice.Equals(runrateType.ElementAt(2)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month36 * setting.OneTimeBenefit))) : null),
                        InitiativeId = runrateTarget[i].InitiativeId
                    };


                    //cal TO Finance only
                    typeBenefitFixedFXTotal = new ImpactTypeOfBenefits()
                    {
                        Id = i + 1,
                        ImpactTypeOfBenefitTable = typeBenefitFixedFX[i].ImpactTypeOfBenefitTable,
                        VersionPrice = typeBenefitFixedFX[i].VersionPrice,
                        FixedFX = typeBenefitFixedFX[i].FixedFX,
                        RunRate = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && x.RunrateForSumTotal != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0))).Sum(x => x.RunrateForSumTotal) : null,
                        Month1 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month1 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month1) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month1 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month1 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month1 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month1 * setting.OneTimeBenefit))) : null),
                        Month2 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month2 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month2) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month2 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month2 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month2 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month2 * setting.OneTimeBenefit))) : null),
                        Month3 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month3 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month3) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month3 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month3 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month3 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month3 * setting.OneTimeBenefit))) : null),
                        Month4 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month4 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month4) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month4 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month4 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month4 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month4 * setting.OneTimeBenefit))) : null),
                        Month5 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month5 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month5) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month5 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month5 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month5 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month5 * setting.OneTimeBenefit))) : null),
                        Month6 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month6 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month6) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month6 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month6 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month6 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month6 * setting.OneTimeBenefit))) : null),
                        Month7 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month7 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month7) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month7 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month7 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month7 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month7 * setting.OneTimeBenefit))) : null),
                        Month8 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month8 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month8) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month8 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month8 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month8 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month8 * setting.OneTimeBenefit))) : null),
                        Month9 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month9 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month9) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month9 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month9 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month9 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month9 * setting.OneTimeBenefit))) : null),
                        Month10 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month10 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month10) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month10 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month10 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month10 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month10 * setting.OneTimeBenefit))) : null),
                        Month11 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month11 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month11) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month11 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month11 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month11 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month11 * setting.OneTimeBenefit))) : null),
                        Month12 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month12 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month12) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month12 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month12 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month12 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month12 * setting.OneTimeBenefit))) : null),
                        Month13 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month13 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month13) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month13 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month13 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month13 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month13 * setting.OneTimeBenefit))) : null),
                        Month14 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month14 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month14) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month14 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month14 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month14 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month14 * setting.OneTimeBenefit))) : null),
                        Month15 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month15 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month15) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month15 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month15 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month15 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month15 * setting.OneTimeBenefit))) : null),
                        Month16 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month16 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month16) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month16 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month16 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month16 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month16 * setting.OneTimeBenefit))) : null),
                        Month17 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month17 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month17) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month17 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month17 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month17 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month17 * setting.OneTimeBenefit))) : null),
                        Month18 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month18 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month18) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month18 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month18 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month18 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month18 * setting.OneTimeBenefit))) : null),
                        Month19 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month19 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month19) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month19 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month19 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month19 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month19 * setting.OneTimeBenefit))) : null),
                        Month20 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month20 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month20) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month20 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month20 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month20 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month20 * setting.OneTimeBenefit))) : null),
                        Month21 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month21 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month21) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month21 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month21 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month21 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month21 * setting.OneTimeBenefit))) : null),
                        Month22 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month22 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month22) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month22 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month22 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month22 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month22 * setting.OneTimeBenefit))) : null),
                        Month23 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month23 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month23) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month23 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month23 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month23 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month23 * setting.OneTimeBenefit))) : null),
                        Month24 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month24 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month24) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month24 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month24 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month24 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month24 * setting.OneTimeBenefit))) : null),
                        Month25 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month25 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month25) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month25 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month25 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month25 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month25 * setting.OneTimeBenefit))) : null),
                        Month26 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month26 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month26) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month26 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month26 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month26 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month26 * setting.OneTimeBenefit))) : null),
                        Month27 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month27 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month27) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month27 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month27 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month27 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month27 * setting.OneTimeBenefit))) : null),
                        Month28 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month28 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month28) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month28 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month28 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month28 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month28 * setting.OneTimeBenefit))) : null),
                        Month29 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month29 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month29) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month29 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month29 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month29 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month29 * setting.OneTimeBenefit))) : null),
                        Month30 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month30 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month30) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month30 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month30 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month30 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month30 * setting.OneTimeBenefit))) : null),
                        Month31 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month31 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month31) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month31 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month31 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month31 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month31 * setting.OneTimeBenefit))) : null),
                        Month32 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month32 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month32) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month32 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month32 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month32 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month32 * setting.OneTimeBenefit))) : null),
                        Month33 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month33 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month33) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month33 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month33 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month33 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month33 * setting.OneTimeBenefit))) : null),
                        Month34 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month34 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month34) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month34 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month34 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month34 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month34 * setting.OneTimeBenefit))) : null),
                        Month35 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month35 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month35) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month35 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month35 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month35 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month35 * setting.OneTimeBenefit))) : null),
                        Month36 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month36 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month36) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month36 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month36 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month36 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(0)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month36 * setting.OneTimeBenefit))) : null),
                        InitiativeId = typeBenefitFixedFX[i].InitiativeId
                    };

                    typeBenefitFloatFXTotal = new ImpactTypeOfBenefits()
                    {
                        Id = i + 2,
                        ImpactTypeOfBenefitTable = typeBenefitFloatFX[i].ImpactTypeOfBenefitTable,
                        VersionPrice = typeBenefitFloatFX[i].VersionPrice,
                        FixedFX = typeBenefitFloatFX[i].FixedFX,
                        RunRate = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && x.RunrateForSumTotal != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1))).Sum(x => x.RunrateForSumTotal) : null,
                        Month1 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month1 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month1) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month1 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month1 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month1 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month1 * setting.OneTimeBenefit))) : null),
                        Month2 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month2 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month2) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month2 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month2 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month2 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month2 * setting.OneTimeBenefit))) : null),
                        Month3 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month3 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month3) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month3 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month3 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month3 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month3 * setting.OneTimeBenefit))) : null),
                        Month4 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month4 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month4) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month4 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month4 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month4 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month4 * setting.OneTimeBenefit))) : null),
                        Month5 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month5 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month5) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month5 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month5 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month5 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month5 * setting.OneTimeBenefit))) : null),
                        Month6 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month6 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month6) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month6 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month6 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month6 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month6 * setting.OneTimeBenefit))) : null),
                        Month7 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month7 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month7) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month7 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month7 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month7 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month7 * setting.OneTimeBenefit))) : null),
                        Month8 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month8 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month8) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month8 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month8 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month8 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month8 * setting.OneTimeBenefit))) : null),
                        Month9 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month9 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month9) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month9 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month9 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month9 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month9 * setting.OneTimeBenefit))) : null),
                        Month10 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month10 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month10) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month10 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month10 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month10 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month10 * setting.OneTimeBenefit))) : null),
                        Month11 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month11 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month11) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month11 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month11 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month11 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month11 * setting.OneTimeBenefit))) : null),
                        Month12 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month12 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month12) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month12 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month12 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month12 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month12 * setting.OneTimeBenefit))) : null),
                        Month13 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month13 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month13) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month13 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month13 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month13 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month13 * setting.OneTimeBenefit))) : null),
                        Month14 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month14 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month14) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month14 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month14 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month14 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month14 * setting.OneTimeBenefit))) : null),
                        Month15 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month15 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month15) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month15 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month15 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month15 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month15 * setting.OneTimeBenefit))) : null),
                        Month16 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month16 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month16) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month16 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month16 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month16 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month16 * setting.OneTimeBenefit))) : null),
                        Month17 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month17 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month17) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month17 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month17 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month17 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month17 * setting.OneTimeBenefit))) : null),
                        Month18 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month18 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month18) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month18 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month18 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month18 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month18 * setting.OneTimeBenefit))) : null),
                        Month19 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month19 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month19) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month19 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month19 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month19 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month19 * setting.OneTimeBenefit))) : null),
                        Month20 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month20 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month20) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month20 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month20 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month20 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month20 * setting.OneTimeBenefit))) : null),
                        Month21 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month21 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month21) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month21 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month21 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month21 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month21 * setting.OneTimeBenefit))) : null),
                        Month22 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month22 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month22) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month22 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month22 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month22 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month22 * setting.OneTimeBenefit))) : null),
                        Month23 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month23 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month23) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month23 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month23 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month23 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month23 * setting.OneTimeBenefit))) : null),
                        Month24 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month24 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month24) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month24 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month24 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month24 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month24 * setting.OneTimeBenefit))) : null),
                        Month25 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month25 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month25) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month25 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month25 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month25 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month25 * setting.OneTimeBenefit))) : null),
                        Month26 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month26 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month26) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month26 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month26 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month26 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month26 * setting.OneTimeBenefit))) : null),
                        Month27 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month27 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month27) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month27 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month27 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month27 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month27 * setting.OneTimeBenefit))) : null),
                        Month28 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month28 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month28) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month28 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month28 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month28 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month28 * setting.OneTimeBenefit))) : null),
                        Month29 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month29 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month29) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month29 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month29 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month29 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month29 * setting.OneTimeBenefit))) : null),
                        Month30 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month30 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month30) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month30 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month30 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month30 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month30 * setting.OneTimeBenefit))) : null),
                        Month31 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month31 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month31) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month31 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month31 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month31 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month31 * setting.OneTimeBenefit))) : null),
                        Month32 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month32 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month32) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month32 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month32 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month32 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month32 * setting.OneTimeBenefit))) : null),
                        Month33 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month33 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month33) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month33 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month33 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month33 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month33 * setting.OneTimeBenefit))) : null),
                        Month34 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month34 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month34) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month34 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month34 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month34 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month34 * setting.OneTimeBenefit))) : null),
                        Month35 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month35 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month35) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month35 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month35 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month35 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month35 * setting.OneTimeBenefit))) : null),
                        Month36 = typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE") && x.Month36 != null).Count() > 0 ? typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.Month36) + (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month36 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month36 * setting.OneTimeBenefit))) : 0) : (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE") && x.Month36 != null).Count() > 0 ? (typeOfBenefits.Where(x => x.VersionPrice.Equals(typeBenefitType.ElementAt(1)) && !String.IsNullOrEmpty(x.TypeOfBenefit) && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => ConvertMethod.Round(x.Month36 * setting.OneTimeBenefit))) : null),
                        InitiativeId = typeBenefitFixedFX[i].InitiativeId
                    };

                    if (typeBenefitFixedFX[i].ImpactTypeOfBenefitTable.Equals("TypeBenefit")
                        && !String.IsNullOrEmpty(typeBenefitFixedFX[i].TypeOfBenefit)
                        && typeBenefitFixedFX[i].TypeOfBenefit.StartsWith("RE")
                        && typeBenefitFixedFX[i].VersionPrice.Equals("FixedFX"))
                    {
                        if (typeBenefitFixedFX[i].RunRate != null)
                            fixedFXRecurringLists.Add((decimal)typeBenefitFixedFX[i].RunRate);
                    }
                    if (typeBenefitFixedFX[i].ImpactTypeOfBenefitTable.Equals("TypeBenefit")
                        && !String.IsNullOrEmpty(typeBenefitFixedFX[i].TypeOfBenefit)
                        && typeBenefitFixedFX[i].TypeOfBenefit.StartsWith("ONE")
                        && typeBenefitFixedFX[i].VersionPrice.Equals("FixedFX"))
                    {
                        if (typeBenefitFixedFX[i].RunRate != null)
                            fixedFXOnetimeLists.Add((decimal)(typeBenefitFixedFX[i].RunRate * setting.OneTimeBenefit));
                    }

                    if (typeBenefitFloatFX[i].ImpactTypeOfBenefitTable.Equals("TypeBenefit")
                        && !String.IsNullOrEmpty(typeBenefitFloatFX[i].TypeOfBenefit)
                        && typeBenefitFloatFX[i].TypeOfBenefit.StartsWith("RE")
                        && typeBenefitFloatFX[i].VersionPrice.Equals("FloatFX"))
                    {
                        if (typeBenefitFloatFX[i].RunRate != null)
                            floateFXRecurringLists.Add((decimal)typeBenefitFloatFX[i].RunRate);
                    }
                    if (typeBenefitFloatFX[i].ImpactTypeOfBenefitTable.Equals("TypeBenefit")
                        && !String.IsNullOrEmpty(typeBenefitFloatFX[i].TypeOfBenefit)
                        && typeBenefitFloatFX[i].TypeOfBenefit.StartsWith("ONE")
                        && typeBenefitFloatFX[i].VersionPrice.Equals("FloatFX"))
                    {
                        if (typeBenefitFloatFX[i].RunRate != null)
                            floateFXOnetimeLists.Add((decimal)(typeBenefitFloatFX[i].RunRate * setting.OneTimeBenefit));
                    }


                }

                for (int i = 0; i < impiemantCostList.Count; i++)
                {
                    //add implement cost
                    ImpactTypeOfBenefits impiemantCost = new ImpactTypeOfBenefits()
                    {
                        Id = impiemantCostList[i].Id,
                        ImpactTypeOfBenefitTable = impiemantCostList[i].ImpactTypeOfBenefitTable,
                        TypeOfBenefit = impiemantCostList[i].TypeOfBenefit,
                        VersionPrice = impiemantCostList[i].VersionPrice,
                        FixedFX = impiemantCostList[i].FixedFX,
                        RunRate = impiemantCostList[i].RunRate,
                        Month1 = impiemantCostList[i].Month1,
                        Month2 = impiemantCostList[i].Month2,
                        Month3 = impiemantCostList[i].Month3,
                        Month4 = impiemantCostList[i].Month4,
                        Month5 = impiemantCostList[i].Month5,
                        Month6 = impiemantCostList[i].Month6,
                        Month7 = impiemantCostList[i].Month7,
                        Month8 = impiemantCostList[i].Month8,
                        Month9 = impiemantCostList[i].Month9,
                        Month10 = impiemantCostList[i].Month10,
                        Month11 = impiemantCostList[i].Month11,
                        Month12 = impiemantCostList[i].Month12,
                        Month13 = impiemantCostList[i].Month13,
                        Month14 = impiemantCostList[i].Month14,
                        Month15 = impiemantCostList[i].Month15,
                        Month16 = impiemantCostList[i].Month16,
                        Month17 = impiemantCostList[i].Month17,
                        Month18 = impiemantCostList[i].Month18,
                        Month19 = impiemantCostList[i].Month19,
                        Month20 = impiemantCostList[i].Month20,
                        Month21 = impiemantCostList[i].Month21,
                        Month22 = impiemantCostList[i].Month22,
                        Month23 = impiemantCostList[i].Month23,
                        Month24 = impiemantCostList[i].Month24,
                        Month25 = impiemantCostList[i].Month25,
                        Month26 = impiemantCostList[i].Month26,
                        Month27 = impiemantCostList[i].Month27,
                        Month28 = impiemantCostList[i].Month28,
                        Month29 = impiemantCostList[i].Month29,
                        Month30 = impiemantCostList[i].Month30,
                        Month31 = impiemantCostList[i].Month31,
                        Month32 = impiemantCostList[i].Month32,
                        Month33 = impiemantCostList[i].Month33,
                        Month34 = impiemantCostList[i].Month34,
                        Month35 = impiemantCostList[i].Month35,
                        Month36 = impiemantCostList[i].Month36,
                        InitiativeId = impiemantCostList[i].InitiativeId,
                        InitiativeCode = impiemantCostList[i].InitiativeCode,
                        CurrencyFloatFx = impiemantCostList[i].currencyFloatFx,
                        OrderIndex = 0
                    };
                    implementCost.Add(impiemantCost);
                }

                for (int i = 0; i < indirectBenefitTargets.Count; i++)
                {
                    ImpactTypeOfBenefits indirectBenefitTarget = new ImpactTypeOfBenefits()
                    {
                        Id = indirectBenefitTargets[i].Id,
                        ImpactTypeOfBenefitTable = indirectBenefitTargets[i].ImpactTypeOfBenefitTable,
                        TypeOfBenefit = indirectBenefitTargets[i].TypeOfBenefit,
                        VersionPrice = indirectBenefitTargets[i].VersionPrice,
                        FixedFX = indirectBenefitTargets[i].FixedFX,
                        RunRate = indirectBenefitTargets[i].RunRate,
                        Month1 = indirectBenefitTargets[i].Month1,
                        Month2 = indirectBenefitTargets[i].Month2,
                        Month3 = indirectBenefitTargets[i].Month3,
                        Month4 = indirectBenefitTargets[i].Month4,
                        Month5 = indirectBenefitTargets[i].Month5,
                        Month6 = indirectBenefitTargets[i].Month6,
                        Month7 = indirectBenefitTargets[i].Month7,
                        Month8 = indirectBenefitTargets[i].Month8,
                        Month9 = indirectBenefitTargets[i].Month9,
                        Month10 = indirectBenefitTargets[i].Month10,
                        Month11 = indirectBenefitTargets[i].Month11,
                        Month12 = indirectBenefitTargets[i].Month12,
                        Month13 = indirectBenefitTargets[i].Month13,
                        Month14 = indirectBenefitTargets[i].Month14,
                        Month15 = indirectBenefitTargets[i].Month15,
                        Month16 = indirectBenefitTargets[i].Month16,
                        Month17 = indirectBenefitTargets[i].Month17,
                        Month18 = indirectBenefitTargets[i].Month18,
                        Month19 = indirectBenefitTargets[i].Month19,
                        Month20 = indirectBenefitTargets[i].Month20,
                        Month21 = indirectBenefitTargets[i].Month21,
                        Month22 = indirectBenefitTargets[i].Month22,
                        Month23 = indirectBenefitTargets[i].Month23,
                        Month24 = indirectBenefitTargets[i].Month24,
                        Month25 = indirectBenefitTargets[i].Month25,
                        Month26 = indirectBenefitTargets[i].Month26,
                        Month27 = indirectBenefitTargets[i].Month27,
                        Month28 = indirectBenefitTargets[i].Month28,
                        Month29 = indirectBenefitTargets[i].Month29,
                        Month30 = indirectBenefitTargets[i].Month30,
                        Month31 = indirectBenefitTargets[i].Month31,
                        Month32 = indirectBenefitTargets[i].Month32,
                        Month33 = indirectBenefitTargets[i].Month33,
                        Month34 = indirectBenefitTargets[i].Month34,
                        Month35 = indirectBenefitTargets[i].Month35,
                        Month36 = indirectBenefitTargets[i].Month36,
                        InitiativeId = indirectBenefitTargets[i].InitiativeId,
                        InitiativeCode = indirectBenefitTargets[i].InitiativeCode,
                        CurrencyFloatFx = indirectBenefitTargets[i].currencyFloatFx,
                        OrderIndex = i
                    };
                    indirectBenefits.Add(indirectBenefitTarget);

                    ImpactTypeOfBenefits indirectBenefitRevise = new ImpactTypeOfBenefits()
                    {
                        Id = indirectBenefitRevises[i].Id,
                        ImpactTypeOfBenefitTable = indirectBenefitRevises[i].ImpactTypeOfBenefitTable,
                        TypeOfBenefit = indirectBenefitRevises[i].TypeOfBenefit,
                        VersionPrice = indirectBenefitRevises[i].VersionPrice,
                        FixedFX = indirectBenefitRevises[i].FixedFX,
                        RunRate = indirectBenefitRevises[i].RunRate,
                        Month1 = indirectBenefitRevises[i].Month1,
                        Month2 = indirectBenefitRevises[i].Month2,
                        Month3 = indirectBenefitRevises[i].Month3,
                        Month4 = indirectBenefitRevises[i].Month4,
                        Month5 = indirectBenefitRevises[i].Month5,
                        Month6 = indirectBenefitRevises[i].Month6,
                        Month7 = indirectBenefitRevises[i].Month7,
                        Month8 = indirectBenefitRevises[i].Month8,
                        Month9 = indirectBenefitRevises[i].Month9,
                        Month10 = indirectBenefitRevises[i].Month10,
                        Month11 = indirectBenefitRevises[i].Month11,
                        Month12 = indirectBenefitRevises[i].Month12,
                        Month13 = indirectBenefitRevises[i].Month13,
                        Month14 = indirectBenefitRevises[i].Month14,
                        Month15 = indirectBenefitRevises[i].Month15,
                        Month16 = indirectBenefitRevises[i].Month16,
                        Month17 = indirectBenefitRevises[i].Month17,
                        Month18 = indirectBenefitRevises[i].Month18,
                        Month19 = indirectBenefitRevises[i].Month19,
                        Month20 = indirectBenefitRevises[i].Month20,
                        Month21 = indirectBenefitRevises[i].Month21,
                        Month22 = indirectBenefitRevises[i].Month22,
                        Month23 = indirectBenefitRevises[i].Month23,
                        Month24 = indirectBenefitRevises[i].Month24,
                        Month25 = indirectBenefitRevises[i].Month25,
                        Month26 = indirectBenefitRevises[i].Month26,
                        Month27 = indirectBenefitRevises[i].Month27,
                        Month28 = indirectBenefitRevises[i].Month28,
                        Month29 = indirectBenefitRevises[i].Month29,
                        Month30 = indirectBenefitRevises[i].Month30,
                        Month31 = indirectBenefitRevises[i].Month31,
                        Month32 = indirectBenefitRevises[i].Month32,
                        Month33 = indirectBenefitRevises[i].Month33,
                        Month34 = indirectBenefitRevises[i].Month34,
                        Month35 = indirectBenefitRevises[i].Month35,
                        Month36 = indirectBenefitRevises[i].Month36,
                        InitiativeId = indirectBenefitRevises[i].InitiativeId,
                        InitiativeCode = indirectBenefitRevises[i].InitiativeCode,
                        CurrencyFloatFx = indirectBenefitRevises[i].currencyFloatFx,
                        OrderIndex = i
                    };
                    indirectBenefits.Add(indirectBenefitRevise);
                }


                firstRunrateTotal.Add(impactTypeOfBenefitsTargetTotal);
                firstRunrateTotal.Add(impactTypeOfBenefitsReviseTotal);
                firstRunrateTotal.Add(impactTypeOfBenefitsActualTotal);

                typeOfBenefitTotal.Add(typeBenefitFixedFXTotal);
                typeOfBenefitTotal.Add(typeBenefitFloatFXTotal);

                //total fixed and floate TypeOfBenefit
                // IL5FixedFxRecurring
                if (fixedFXRecurringLists.Count() <= 0)
                {
                    impactTrackingAll.IL5FixedFxRecurring = null;
                }
                else
                {
                    impactTrackingAll.IL5FixedFxRecurring = fixedFXRecurringLists.Sum(x => x);
                }

                // IL5FixedFxOnetime
                if (fixedFXOnetimeLists.Count() <= 0)
                {
                    impactTrackingAll.IL5FixedFxOnetime = null;
                }
                else
                {
                    impactTrackingAll.IL5FixedFxOnetime = fixedFXOnetimeLists.Sum(x => x);
                }
                // IL5FixedFxRecurring
                if (floateFXRecurringLists.Count() <= 0)
                {
                    impactTrackingAll.IL5FloatFxRecurring = null;
                }
                else
                {
                    impactTrackingAll.IL5FloatFxRecurring = floateFXRecurringLists.Sum(x => x);
                }

                // IL5FixedFxOnetime
                if (floateFXOnetimeLists.Count() <= 0)
                {
                    impactTrackingAll.IL5FloatFxOnetime = null;
                }
                else
                {
                    impactTrackingAll.IL5FloatFxOnetime = floateFXOnetimeLists.Sum(x => x);
                }

                impactTrackingAll.FirstRunrates = firstRunrates;
                impactTrackingAll.FirstRunrateTotal = firstRunrateTotal;
                impactTrackingAll.ImpiemantCosts = implementCost;
                impactTrackingAll.IndirectBenefits = indirectBenefits;
                impactTrackingAll.TypeBenefits = typeOfBenefits;
                impactTrackingAll.TypeBenefitTotal = typeOfBenefitTotal;
                impactTrackingAll.ShareBenefit = shareBenefit;
                return impactTrackingAll;
            }
            catch (Exception ex)
            {
                return new ImpactTrackingAll();
            }
        }

        public async Task<ImpactTrackingCreate> CreateImpactAllTracking(ImpactTrackingCreate impactTrackingCreate, string actionType)
        {
            // query initiative and Detail
            var initaitve = await _context.Initiatives.Where(x => x.Id.Equals(impactTrackingCreate.InitiativeId)).FirstOrDefaultAsync();
            var setting = await _context.Setting.FirstOrDefaultAsync();
            var detailInfo = await _context.DetailInformations.Where(x => x.InitiativeId.Equals(impactTrackingCreate.InitiativeId)).FirstOrDefaultAsync();


            var fxExchange = !String.IsNullOrEmpty(initaitve.CostEstOpexType) && initaitve.CostEstOpexType.Equals("USD") ? (decimal)initaitve.FxExchange : 1;
            var costEstOpex = initaitve.CostEstOpex.HasValue ? (decimal)initaitve.CostEstOpex * fxExchange : 0;
            //check implementCost
            if (impactTrackingCreate.ImpiemantCost && (impactTrackingCreate.ImpiemantCostForm.RunRate.Row1.HasValue || impactTrackingCreate.ImpiemantCostForm.RunRate.Row2.HasValue))
            {
                decimal? runrate = impactTrackingCreate.ImpiemantCostForm.RunRate.Row2.HasValue ? impactTrackingCreate.ImpiemantCostForm.RunRate.Row2 : impactTrackingCreate.ImpiemantCostForm.RunRate.Row1;
                costEstOpex = runrate.HasValue ? (decimal)(runrate * fxExchange) : 0;
            }

            var costEstCapex = initaitve.CostEstCapex.HasValue ? (decimal)initaitve.CostEstCapex * fxExchange : 0;



            //calculate
            //RunRate and oneTime IL4
            decimal? runrateRecurringIL4 = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
            && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Count() > 0 ?
             impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
            && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.RunRate.Row2) : null;

            decimal? runrateOnetimeIL4 = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
            && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
            && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => x.RunRate.Row2) : null;

            //RunRate and oneTime IL5
            decimal? runrateRecurringIL5 = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
            && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
            && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.RunRate.Row3) : null;

            decimal? runrateOnetimeIL5 = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => x.RunRate.Row3) : null;

            //Total Runrate
            //Target
            decimal? runrateTotalRecurringTarget = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.RunRate.Row1) : null;

            decimal? runrateTotalOnetimeTarget = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => x.RunRate.Row1) : null;

            //Revise
            decimal? runrateTotalRecurringRevise = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.RunRate.Row2) : null;

            decimal? runrateTotalOnetimeRevise = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Count() > 0 ?
             impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => x.RunRate.Row2) : null;

            //actual
            decimal? runrateTotalRecurringActual = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.RunRate.Row3) : null;

            decimal? runrateTotalOnetimeActual = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => x.RunRate.Row3) : null;

            //Total Fixed and Float
            decimal? fixedFXTotalRecurring = impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Count() > 0 ?
            impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.RunRate.Row1) : null;

            decimal? fixedFXTotalOnetime = impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Count() > 0 ?
            impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => x.RunRate.Row1) : null;

            decimal? floatFXTotalRecurring = impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
             && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Count() > 0 ?
            impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
             && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.RunRate.Row2) : null;

            decimal? floatFXTotalOnetime = impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
            && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Count() > 0 ?
            impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
            && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => x.RunRate.Row2) : null;


            //Assign var
            decimal? IL4RunRateOnetime = runrateOnetimeIL4 == null ? null : runrateOnetimeIL4;
            decimal? IL4RunRateRecurring = runrateRecurringIL4;
            decimal? IL5RunRateOnetime = runrateOnetimeIL5 == null ? null : runrateOnetimeIL5;
            decimal? IL5RunRateRecurring = runrateRecurringIL5;
            decimal? IL5FixedFxOnetime = fixedFXTotalOnetime == null ? null : fixedFXTotalOnetime;
            decimal? IL5FixedFxRecurring = fixedFXTotalRecurring;
            decimal? IL5FloatFxOnetime = floatFXTotalOnetime == null ? null : floatFXTotalOnetime;
            decimal? IL5FloatFxRecurring = floatFXTotalRecurring;

            decimal? TotalOnetime = null;
            decimal? TotalRecurring = null;
            if (runrateTotalOnetimeActual != null)
            {
                TotalOnetime = runrateTotalOnetimeActual;
            }
            else if (runrateTotalOnetimeRevise != null)
            {
                TotalOnetime = runrateTotalOnetimeRevise;
            }
            else if (runrateTotalOnetimeTarget != null)
            {
                TotalOnetime = runrateTotalOnetimeTarget;
            }
            else
            {
                TotalOnetime = null;
            }

            if (runrateTotalRecurringActual != null)
            {
                TotalRecurring = runrateTotalRecurringActual;
            }
            else if (runrateTotalRecurringRevise != null)
            {
                TotalRecurring = runrateTotalRecurringRevise;
            }
            else if (runrateTotalRecurringTarget != null)
            {
                TotalRecurring = runrateTotalRecurringTarget;
            }
            else
            {
                TotalRecurring = null;
            }



            //patch for impact
            impactTrackingCreate.IL4RunRateOnetime = IL4RunRateOnetime;
            impactTrackingCreate.IL4RunRateRecurring = IL4RunRateRecurring;
            impactTrackingCreate.IL5RunRateOnetime = IL5RunRateOnetime;
            impactTrackingCreate.IL5RunRateRecurring = IL5RunRateRecurring;
            impactTrackingCreate.IL5FixedFxOnetime = IL5FixedFxOnetime;
            impactTrackingCreate.IL5FixedFxRecurring = IL5FixedFxRecurring;
            impactTrackingCreate.IL5FloatFxOnetime = IL5FloatFxOnetime;
            impactTrackingCreate.IL5FloatFxRecurring = IL5FloatFxRecurring;
            impactTrackingCreate.TotalRecurring = TotalRecurring;
            impactTrackingCreate.TotalOnetime = TotalOnetime;

            //save Impact 
            var CreateImpactTracking = _mapper.Map<ImpactTracking>(impactTrackingCreate);
            _context.ImpactTrackings.Update(CreateImpactTracking);
            await _context.SaveChangesAsync();

            //save Share Benefit
            //remove Share Benefit
            var List = await _context.ShareBenefitWorkstreams.Where(i => i.InitiativeId.Equals(impactTrackingCreate.InitiativeId)).ToListAsync();
            if (List.Count > 0)
            {
                foreach (var entity in List)
                    _context.ShareBenefitWorkstreams.Remove(entity);
                await _context.SaveChangesAsync();
            }

            //Save Share Benefit
            if (impactTrackingCreate.HaveShareBenefit && impactTrackingCreate.ShareBenefitFrom.ShareBenefitWorkstreams.Count > 1)
            {
                //insert by frontend 
                foreach (var item in impactTrackingCreate.ShareBenefitFrom.ShareBenefitWorkstreams)
                {
                    decimal Percent = item.Percent.HasValue ? (decimal)item.Percent : 0;

                    decimal? IL4RRBlended = null;
                    if (IL4RunRateOnetime != null && IL4RunRateRecurring != null)
                    {
                        IL4RRBlended = ((ConvertMethod.Round(IL4RunRateOnetime * setting.OneTimeBenefit)) + IL4RunRateRecurring) * (Percent / 100);
                    }
                    else if (IL4RunRateOnetime != null && IL4RunRateRecurring == null)
                    {
                        IL4RRBlended = (ConvertMethod.Round(IL4RunRateOnetime * setting.OneTimeBenefit)) * (Percent / 100);
                    }
                    else if (IL4RunRateOnetime == null && IL4RunRateRecurring != null)
                    {
                        IL4RRBlended = IL4RunRateRecurring * (Percent / 100);
                    }

                    decimal? IL5RRBlended = null;
                    if (IL5RunRateOnetime != null && IL5RunRateRecurring != null)
                    {
                        IL5RRBlended = ((ConvertMethod.Round(IL5RunRateOnetime * setting.OneTimeBenefit)) + IL5RunRateRecurring) * (Percent / 100);
                    }
                    else if (IL5RunRateOnetime != null && IL5RunRateRecurring == null)
                    {
                        IL5RRBlended = (ConvertMethod.Round(IL5RunRateOnetime * setting.OneTimeBenefit)) * (Percent / 100);
                    }
                    else if (IL5RunRateOnetime == null && IL5RunRateRecurring != null)
                    {
                        IL5RRBlended = IL5RunRateRecurring * (Percent / 100);
                    }

                    decimal? TotalRRBlended = null;
                    if (TotalOnetime != null && TotalRecurring != null)
                    {
                        TotalRRBlended = ((ConvertMethod.Round(TotalOnetime * setting.OneTimeBenefit)) + TotalRecurring) * (Percent / 100);
                    }
                    else if (TotalOnetime != null && TotalRecurring == null)
                    {
                        TotalRRBlended = (ConvertMethod.Round(TotalOnetime * setting.OneTimeBenefit)) * (Percent / 100);
                    }
                    else if (TotalOnetime == null && TotalRecurring != null)
                    {
                        TotalRRBlended = TotalRecurring * (Percent / 100);
                    }
                    else
                    {
                        TotalRRBlended = initaitve.BenefitAmount != null ? initaitve.BenefitAmount * (Percent / 100) : null;
                    }


                    var shareBenefitDefault = new ShareBenefitWorkstream()
                    {
                        Id = 0,
                        InitiativeId = impactTrackingCreate.InitiativeId,
                        Workstream = item.Workstream,
                        Percent = Percent,
                        IL4RRBlended = IL4RRBlended, //(il4runrateonetime + il4runraterecurring) * (percent/100)
                        IL5RRBlended = IL5RRBlended, //(il5runrateonetime + il5runraterecurring) * (percent/100)
                        IL5FixedFXOnetime = IL5FixedFxOnetime == null ? null : IL5FixedFxOnetime * (Percent / 100), //il5fixedfxonetime * (percent/100)
                        IL5FixedFxRecurring = IL5FixedFxRecurring == null ? null : IL5FixedFxRecurring * (Percent / 100), //il5fixedfxrecurring * (percent/100)
                        IL5FloatFxOnetime = IL5FloatFxOnetime == null ? null : IL5FloatFxOnetime * (Percent / 100), //il5floatfxonetime * (percent/100)
                        IL5FloatFxRecurring = IL5FloatFxRecurring == null ? null : IL5FloatFxRecurring * (Percent / 100), //il5floatfxrecurring * (percent/100)
                        IL4RROneTime = IL4RunRateOnetime == null ? null : IL4RunRateOnetime * (Percent / 100), //(il4runrateonetime * 10) * (percent/100)
                        IL4RRRecurring = IL4RunRateRecurring == null ? null : IL4RunRateRecurring * (Percent / 100), //il4runraterecurring * (percent/100)
                        IL5RROneTime = IL5RunRateOnetime == null ? null : IL5RunRateOnetime * (Percent / 100), //(il5runrateonetime * 10) * (percent/100) 
                        IL5RRRecurring = IL5RunRateRecurring == null ? null : IL5RunRateRecurring * (Percent / 100), //il5runraterecurring * (percent/100) 
                        TotalRROnetime = TotalOnetime == null ? null : TotalOnetime * (Percent / 100), //(totalonetime * 10) * (percent/100)
                        TotalRRRecurring = TotalRecurring == null ? null : TotalRecurring * (Percent / 100), //totalrecurring  * (percent/100)
                        TotalRRBlended = TotalRRBlended, //(totalrecurring + totalonetime)  * (percent/100)
                        OnetimeImplementationCost = (decimal)(costEstOpex + costEstCapex) * (Percent / 100)
                    };
                    await _context.ShareBenefitWorkstreams.AddAsync(shareBenefitDefault);
                    await _context.SaveChangesAsync();
                }
            }
            else
            {
                decimal? IL4RRBlended = null;
                if (IL4RunRateOnetime != null && IL4RunRateRecurring != null)
                {
                    IL4RRBlended = (ConvertMethod.Round(IL4RunRateOnetime * setting.OneTimeBenefit)) + IL4RunRateRecurring;
                }
                else if (IL4RunRateOnetime != null && IL4RunRateRecurring == null)
                {
                    IL4RRBlended = ConvertMethod.Round(IL4RunRateOnetime * setting.OneTimeBenefit);
                }
                else if (IL4RunRateOnetime == null && IL4RunRateRecurring != null)
                {
                    IL4RRBlended = IL4RunRateRecurring;
                }

                decimal? IL5RRBlended = null;
                if (IL5RunRateOnetime != null && IL5RunRateRecurring != null)
                {
                    IL5RRBlended = (ConvertMethod.Round((IL5RunRateOnetime * setting.OneTimeBenefit)) + IL5RunRateRecurring);
                }
                else if (IL5RunRateOnetime != null && IL5RunRateRecurring == null)
                {
                    IL5RRBlended = ConvertMethod.Round(IL5RunRateOnetime * setting.OneTimeBenefit);
                }
                else if (IL5RunRateOnetime == null && IL5RunRateRecurring != null)
                {
                    IL5RRBlended = IL5RunRateRecurring;
                }

                decimal? TotalRRBlended = null;
                if (TotalOnetime != null && TotalRecurring != null)
                {
                    TotalRRBlended = (ConvertMethod.Round(TotalOnetime * setting.OneTimeBenefit)) + TotalRecurring;
                }
                else if (TotalOnetime != null && TotalRecurring == null)
                {
                    TotalRRBlended = ConvertMethod.Round(TotalOnetime * setting.OneTimeBenefit);
                }
                else if (TotalOnetime == null && TotalRecurring != null)
                {
                    TotalRRBlended = TotalRecurring;
                }
                else
                {
                    TotalRRBlended = initaitve.BenefitAmount != null ? initaitve.BenefitAmount : null;
                }

                //insert 100 % default
                var shareBenefitDefault = new ShareBenefitWorkstream()
                {
                    Id = 0,
                    InitiativeId = impactTrackingCreate.InitiativeId,
                    Workstream = detailInfo.SubWorkstream1,
                    Percent = 100,
                    IL4RRBlended = IL4RRBlended, //(il4runrateonetime + il4runraterecurring) * (percent/100)
                    IL5RRBlended = IL5RRBlended, //(il5runrateonetime + il5runraterecurring) * (percent/100)
                    IL5FixedFXOnetime = IL5FixedFxOnetime == null ? null : IL5FixedFxOnetime, //il5fixedfxonetime * (percent/100)
                    IL5FixedFxRecurring = IL5FixedFxRecurring == null ? null : IL5FixedFxRecurring, //il5fixedfxrecurring * (percent/100)
                    IL5FloatFxOnetime = IL5FloatFxOnetime == null ? null : IL5FloatFxOnetime, //il5floatfxonetime * (percent/100)
                    IL5FloatFxRecurring = IL5FloatFxRecurring == null ? null : IL5FloatFxRecurring, //il5floatfxrecurring * (percent/100)
                    IL4RROneTime = IL4RunRateOnetime == null ? null : IL4RunRateOnetime, //(il4runrateonetime * 10) * (percent/100)
                    IL4RRRecurring = IL4RunRateRecurring == null ? null : IL4RunRateRecurring, //il4runraterecurring * (percent/100)
                    IL5RROneTime = IL5RunRateOnetime == null ? null : IL5RunRateOnetime, //(il5runrateonetime * 10) * (percent/100) 
                    IL5RRRecurring = IL5RunRateRecurring == null ? null : IL5RunRateRecurring, //il5runraterecurring * (percent/100) 
                    TotalRROnetime = TotalOnetime == null ? null : TotalOnetime, //(totalonetime * 10) * (percent/100)
                    TotalRRRecurring = TotalRecurring == null ? null : TotalRecurring, //totalrecurring  * (percent/100)
                    TotalRRBlended = TotalRRBlended, //(totalrecurring + totalonetime)  * (percent/100)
                    OnetimeImplementationCost = costEstOpex + costEstCapex
                };
                await _context.ShareBenefitWorkstreams.AddAsync(shareBenefitDefault);
                await _context.SaveChangesAsync();
            }

            //firstRunrate
            //remove All Old Data
            var ImpactTypeOfBenefitsList = await _context.ImpactTypeOfBenefits
                .Where(i => i.InitiativeId.Equals(impactTrackingCreate.InitiativeId)).ToListAsync();
            if (ImpactTypeOfBenefitsList.Count > 0)
            {
                foreach (var entity in ImpactTypeOfBenefitsList)
                    _context.ImpactTypeOfBenefits.Remove(entity);
                await _context.SaveChangesAsync();
            }

            //save First Runrate
            List<string> runrateType = new List<string> { "Target", "Revise", "Actual" };
            if (impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Count > 0)
            {
                foreach (var item in impactTrackingCreate.FirstRunRateForm.FirstRunRateTable)
                {
                    for (int i = 1; i <= 3; i++)
                    {
                        var impactTypeOfBenefit = new ImpactTypeOfBenefit();
                        switch (i)
                        {
                            case 1:
                                impactTypeOfBenefit.Id = 0;
                                impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRate";
                                impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                                impactTypeOfBenefit.InitiativeId = impactTrackingCreate.InitiativeId;
                                impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row1 : null;
                                impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row1 : null;
                                if (item.monthRows1 == null) break;
                                impactTypeOfBenefit.Month1 = item.monthRows1.Month1;
                                impactTypeOfBenefit.Month2 = item.monthRows1.Month2;
                                impactTypeOfBenefit.Month3 = item.monthRows1.Month3;
                                impactTypeOfBenefit.Month4 = item.monthRows1.Month4;
                                impactTypeOfBenefit.Month5 = item.monthRows1.Month5;
                                impactTypeOfBenefit.Month6 = item.monthRows1.Month6;
                                impactTypeOfBenefit.Month7 = item.monthRows1.Month7;
                                impactTypeOfBenefit.Month8 = item.monthRows1.Month8;
                                impactTypeOfBenefit.Month9 = item.monthRows1.Month9;
                                impactTypeOfBenefit.Month10 = item.monthRows1.Month10;
                                impactTypeOfBenefit.Month11 = item.monthRows1.Month11;
                                impactTypeOfBenefit.Month12 = item.monthRows1.Month12;
                                impactTypeOfBenefit.Month13 = item.monthRows1.Month13;
                                impactTypeOfBenefit.Month14 = item.monthRows1.Month14;
                                impactTypeOfBenefit.Month15 = item.monthRows1.Month15;
                                impactTypeOfBenefit.Month16 = item.monthRows1.Month16;
                                impactTypeOfBenefit.Month17 = item.monthRows1.Month17;
                                impactTypeOfBenefit.Month18 = item.monthRows1.Month18;
                                impactTypeOfBenefit.Month19 = item.monthRows1.Month19;
                                impactTypeOfBenefit.Month20 = item.monthRows1.Month20;
                                impactTypeOfBenefit.Month21 = item.monthRows1.Month21;
                                impactTypeOfBenefit.Month22 = item.monthRows1.Month22;
                                impactTypeOfBenefit.Month23 = item.monthRows1.Month23;
                                impactTypeOfBenefit.Month24 = item.monthRows1.Month24;
                                impactTypeOfBenefit.Month25 = item.monthRows1.Month25;
                                impactTypeOfBenefit.Month26 = item.monthRows1.Month26;
                                impactTypeOfBenefit.Month27 = item.monthRows1.Month27;
                                impactTypeOfBenefit.Month28 = item.monthRows1.Month28;
                                impactTypeOfBenefit.Month29 = item.monthRows1.Month29;
                                impactTypeOfBenefit.Month30 = item.monthRows1.Month30;
                                impactTypeOfBenefit.Month31 = item.monthRows1.Month31;
                                impactTypeOfBenefit.Month32 = item.monthRows1.Month32;
                                impactTypeOfBenefit.Month33 = item.monthRows1.Month33;
                                impactTypeOfBenefit.Month34 = item.monthRows1.Month34;
                                impactTypeOfBenefit.Month35 = item.monthRows1.Month35;
                                impactTypeOfBenefit.Month36 = item.monthRows1.Month36;
                                await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                                await _context.SaveChangesAsync();
                                break;
                            case 2:
                                impactTypeOfBenefit.Id = 0;
                                impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRate";
                                impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                                impactTypeOfBenefit.InitiativeId = impactTrackingCreate.InitiativeId;
                                impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row2 : null;
                                impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row2 : null;
                                if (item.monthRows2 == null) break;
                                impactTypeOfBenefit.Month1 = item.monthRows2.Month1;
                                impactTypeOfBenefit.Month2 = item.monthRows2.Month2;
                                impactTypeOfBenefit.Month3 = item.monthRows2.Month3;
                                impactTypeOfBenefit.Month4 = item.monthRows2.Month4;
                                impactTypeOfBenefit.Month5 = item.monthRows2.Month5;
                                impactTypeOfBenefit.Month6 = item.monthRows2.Month6;
                                impactTypeOfBenefit.Month7 = item.monthRows2.Month7;
                                impactTypeOfBenefit.Month8 = item.monthRows2.Month8;
                                impactTypeOfBenefit.Month9 = item.monthRows2.Month9;
                                impactTypeOfBenefit.Month10 = item.monthRows2.Month10;
                                impactTypeOfBenefit.Month11 = item.monthRows2.Month11;
                                impactTypeOfBenefit.Month12 = item.monthRows2.Month12;
                                impactTypeOfBenefit.Month13 = item.monthRows2.Month13;
                                impactTypeOfBenefit.Month14 = item.monthRows2.Month14;
                                impactTypeOfBenefit.Month15 = item.monthRows2.Month15;
                                impactTypeOfBenefit.Month16 = item.monthRows2.Month16;
                                impactTypeOfBenefit.Month17 = item.monthRows2.Month17;
                                impactTypeOfBenefit.Month18 = item.monthRows2.Month18;
                                impactTypeOfBenefit.Month19 = item.monthRows2.Month19;
                                impactTypeOfBenefit.Month20 = item.monthRows2.Month20;
                                impactTypeOfBenefit.Month21 = item.monthRows2.Month21;
                                impactTypeOfBenefit.Month22 = item.monthRows2.Month22;
                                impactTypeOfBenefit.Month23 = item.monthRows2.Month23;
                                impactTypeOfBenefit.Month24 = item.monthRows2.Month24;
                                impactTypeOfBenefit.Month25 = item.monthRows2.Month25;
                                impactTypeOfBenefit.Month26 = item.monthRows2.Month26;
                                impactTypeOfBenefit.Month27 = item.monthRows2.Month27;
                                impactTypeOfBenefit.Month28 = item.monthRows2.Month28;
                                impactTypeOfBenefit.Month29 = item.monthRows2.Month29;
                                impactTypeOfBenefit.Month30 = item.monthRows2.Month30;
                                impactTypeOfBenefit.Month31 = item.monthRows2.Month31;
                                impactTypeOfBenefit.Month32 = item.monthRows2.Month32;
                                impactTypeOfBenefit.Month33 = item.monthRows2.Month33;
                                impactTypeOfBenefit.Month34 = item.monthRows2.Month34;
                                impactTypeOfBenefit.Month35 = item.monthRows2.Month35;
                                impactTypeOfBenefit.Month36 = item.monthRows2.Month36;
                                await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                                await _context.SaveChangesAsync();
                                break;
                            case 3:
                                impactTypeOfBenefit.Id = 0;
                                impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRate";
                                impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                                impactTypeOfBenefit.InitiativeId = impactTrackingCreate.InitiativeId;
                                impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row3 : null;
                                impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row3 : null;
                                if (item.monthRows3 == null) break;
                                impactTypeOfBenefit.Month1 = item.monthRows3.Month1;
                                impactTypeOfBenefit.Month2 = item.monthRows3.Month2;
                                impactTypeOfBenefit.Month3 = item.monthRows3.Month3;
                                impactTypeOfBenefit.Month4 = item.monthRows3.Month4;
                                impactTypeOfBenefit.Month5 = item.monthRows3.Month5;
                                impactTypeOfBenefit.Month6 = item.monthRows3.Month6;
                                impactTypeOfBenefit.Month7 = item.monthRows3.Month7;
                                impactTypeOfBenefit.Month8 = item.monthRows3.Month8;
                                impactTypeOfBenefit.Month9 = item.monthRows3.Month9;
                                impactTypeOfBenefit.Month10 = item.monthRows3.Month10;
                                impactTypeOfBenefit.Month11 = item.monthRows3.Month11;
                                impactTypeOfBenefit.Month12 = item.monthRows3.Month12;
                                impactTypeOfBenefit.Month13 = item.monthRows3.Month13;
                                impactTypeOfBenefit.Month14 = item.monthRows3.Month14;
                                impactTypeOfBenefit.Month15 = item.monthRows3.Month15;
                                impactTypeOfBenefit.Month16 = item.monthRows3.Month16;
                                impactTypeOfBenefit.Month17 = item.monthRows3.Month17;
                                impactTypeOfBenefit.Month18 = item.monthRows3.Month18;
                                impactTypeOfBenefit.Month19 = item.monthRows3.Month19;
                                impactTypeOfBenefit.Month20 = item.monthRows3.Month20;
                                impactTypeOfBenefit.Month21 = item.monthRows3.Month21;
                                impactTypeOfBenefit.Month22 = item.monthRows3.Month22;
                                impactTypeOfBenefit.Month23 = item.monthRows3.Month23;
                                impactTypeOfBenefit.Month24 = item.monthRows3.Month24;
                                impactTypeOfBenefit.Month25 = item.monthRows3.Month25;
                                impactTypeOfBenefit.Month26 = item.monthRows3.Month26;
                                impactTypeOfBenefit.Month27 = item.monthRows3.Month27;
                                impactTypeOfBenefit.Month28 = item.monthRows3.Month28;
                                impactTypeOfBenefit.Month29 = item.monthRows3.Month29;
                                impactTypeOfBenefit.Month30 = item.monthRows3.Month30;
                                impactTypeOfBenefit.Month31 = item.monthRows3.Month31;
                                impactTypeOfBenefit.Month32 = item.monthRows3.Month32;
                                impactTypeOfBenefit.Month33 = item.monthRows3.Month33;
                                impactTypeOfBenefit.Month34 = item.monthRows3.Month34;
                                impactTypeOfBenefit.Month35 = item.monthRows3.Month35;
                                impactTypeOfBenefit.Month36 = item.monthRows3.Month36;
                                await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                                await _context.SaveChangesAsync();
                                break;
                        }
                    }
                }
            }


            //save first Runrate total
            if (impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Count > 0)
            {

                var item = impactTrackingCreate.FirstRunRateTotalForm;
                for (int i = 1; i <= 3; i++)
                {
                    var impactTypeOfBenefit = new ImpactTypeOfBenefit();
                    switch (i)
                    {
                        case 1:
                            impactTypeOfBenefit.Id = 0;
                            impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRateTotal";
                            impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                            impactTypeOfBenefit.InitiativeId = impactTrackingCreate.InitiativeId;
                            impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row1 : null;
                            impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row1 : null;
                            if (item.monthRows1 == null) break;
                            impactTypeOfBenefit.Month1 = item.monthRows1.Month1;
                            impactTypeOfBenefit.Month2 = item.monthRows1.Month2;
                            impactTypeOfBenefit.Month3 = item.monthRows1.Month3;
                            impactTypeOfBenefit.Month4 = item.monthRows1.Month4;
                            impactTypeOfBenefit.Month5 = item.monthRows1.Month5;
                            impactTypeOfBenefit.Month6 = item.monthRows1.Month6;
                            impactTypeOfBenefit.Month7 = item.monthRows1.Month7;
                            impactTypeOfBenefit.Month8 = item.monthRows1.Month8;
                            impactTypeOfBenefit.Month9 = item.monthRows1.Month9;
                            impactTypeOfBenefit.Month10 = item.monthRows1.Month10;
                            impactTypeOfBenefit.Month11 = item.monthRows1.Month11;
                            impactTypeOfBenefit.Month12 = item.monthRows1.Month12;
                            impactTypeOfBenefit.Month13 = item.monthRows1.Month13;
                            impactTypeOfBenefit.Month14 = item.monthRows1.Month14;
                            impactTypeOfBenefit.Month15 = item.monthRows1.Month15;
                            impactTypeOfBenefit.Month16 = item.monthRows1.Month16;
                            impactTypeOfBenefit.Month17 = item.monthRows1.Month17;
                            impactTypeOfBenefit.Month18 = item.monthRows1.Month18;
                            impactTypeOfBenefit.Month19 = item.monthRows1.Month19;
                            impactTypeOfBenefit.Month20 = item.monthRows1.Month20;
                            impactTypeOfBenefit.Month21 = item.monthRows1.Month21;
                            impactTypeOfBenefit.Month22 = item.monthRows1.Month22;
                            impactTypeOfBenefit.Month23 = item.monthRows1.Month23;
                            impactTypeOfBenefit.Month24 = item.monthRows1.Month24;
                            impactTypeOfBenefit.Month25 = item.monthRows1.Month25;
                            impactTypeOfBenefit.Month26 = item.monthRows1.Month26;
                            impactTypeOfBenefit.Month27 = item.monthRows1.Month27;
                            impactTypeOfBenefit.Month28 = item.monthRows1.Month28;
                            impactTypeOfBenefit.Month29 = item.monthRows1.Month29;
                            impactTypeOfBenefit.Month30 = item.monthRows1.Month30;
                            impactTypeOfBenefit.Month31 = item.monthRows1.Month31;
                            impactTypeOfBenefit.Month32 = item.monthRows1.Month32;
                            impactTypeOfBenefit.Month33 = item.monthRows1.Month33;
                            impactTypeOfBenefit.Month34 = item.monthRows1.Month34;
                            impactTypeOfBenefit.Month35 = item.monthRows1.Month35;
                            impactTypeOfBenefit.Month36 = item.monthRows1.Month36;
                            await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                            await _context.SaveChangesAsync();
                            break;
                        case 2:
                            impactTypeOfBenefit.Id = 0;
                            impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRateTotal";
                            impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                            impactTypeOfBenefit.InitiativeId = impactTrackingCreate.InitiativeId;
                            impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row2 : null;
                            impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row2 : null;
                            if (item.monthRows2 == null) break;
                            impactTypeOfBenefit.Month1 = item.monthRows2.Month1;
                            impactTypeOfBenefit.Month2 = item.monthRows2.Month2;
                            impactTypeOfBenefit.Month3 = item.monthRows2.Month3;
                            impactTypeOfBenefit.Month4 = item.monthRows2.Month4;
                            impactTypeOfBenefit.Month5 = item.monthRows2.Month5;
                            impactTypeOfBenefit.Month6 = item.monthRows2.Month6;
                            impactTypeOfBenefit.Month7 = item.monthRows2.Month7;
                            impactTypeOfBenefit.Month8 = item.monthRows2.Month8;
                            impactTypeOfBenefit.Month9 = item.monthRows2.Month9;
                            impactTypeOfBenefit.Month10 = item.monthRows2.Month10;
                            impactTypeOfBenefit.Month11 = item.monthRows2.Month11;
                            impactTypeOfBenefit.Month12 = item.monthRows2.Month12;
                            impactTypeOfBenefit.Month13 = item.monthRows2.Month13;
                            impactTypeOfBenefit.Month14 = item.monthRows2.Month14;
                            impactTypeOfBenefit.Month15 = item.monthRows2.Month15;
                            impactTypeOfBenefit.Month16 = item.monthRows2.Month16;
                            impactTypeOfBenefit.Month17 = item.monthRows2.Month17;
                            impactTypeOfBenefit.Month18 = item.monthRows2.Month18;
                            impactTypeOfBenefit.Month19 = item.monthRows2.Month19;
                            impactTypeOfBenefit.Month20 = item.monthRows2.Month20;
                            impactTypeOfBenefit.Month21 = item.monthRows2.Month21;
                            impactTypeOfBenefit.Month22 = item.monthRows2.Month22;
                            impactTypeOfBenefit.Month23 = item.monthRows2.Month23;
                            impactTypeOfBenefit.Month24 = item.monthRows2.Month24;
                            impactTypeOfBenefit.Month25 = item.monthRows2.Month25;
                            impactTypeOfBenefit.Month26 = item.monthRows2.Month26;
                            impactTypeOfBenefit.Month27 = item.monthRows2.Month27;
                            impactTypeOfBenefit.Month28 = item.monthRows2.Month28;
                            impactTypeOfBenefit.Month29 = item.monthRows2.Month29;
                            impactTypeOfBenefit.Month30 = item.monthRows2.Month30;
                            impactTypeOfBenefit.Month31 = item.monthRows2.Month31;
                            impactTypeOfBenefit.Month32 = item.monthRows2.Month32;
                            impactTypeOfBenefit.Month33 = item.monthRows2.Month33;
                            impactTypeOfBenefit.Month34 = item.monthRows2.Month34;
                            impactTypeOfBenefit.Month35 = item.monthRows2.Month35;
                            impactTypeOfBenefit.Month36 = item.monthRows2.Month36;
                            await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                            await _context.SaveChangesAsync();
                            break;
                        case 3:
                            impactTypeOfBenefit.Id = 0;
                            impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRateTotal";
                            impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                            impactTypeOfBenefit.InitiativeId = impactTrackingCreate.InitiativeId;
                            impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row3 : null;
                            impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row3 : null;
                            if (item.monthRows3 == null) break;
                            impactTypeOfBenefit.Month1 = item.monthRows3.Month1;
                            impactTypeOfBenefit.Month2 = item.monthRows3.Month2;
                            impactTypeOfBenefit.Month3 = item.monthRows3.Month3;
                            impactTypeOfBenefit.Month4 = item.monthRows3.Month4;
                            impactTypeOfBenefit.Month5 = item.monthRows3.Month5;
                            impactTypeOfBenefit.Month6 = item.monthRows3.Month6;
                            impactTypeOfBenefit.Month7 = item.monthRows3.Month7;
                            impactTypeOfBenefit.Month8 = item.monthRows3.Month8;
                            impactTypeOfBenefit.Month9 = item.monthRows3.Month9;
                            impactTypeOfBenefit.Month10 = item.monthRows3.Month10;
                            impactTypeOfBenefit.Month11 = item.monthRows3.Month11;
                            impactTypeOfBenefit.Month12 = item.monthRows3.Month12;
                            impactTypeOfBenefit.Month13 = item.monthRows3.Month13;
                            impactTypeOfBenefit.Month14 = item.monthRows3.Month14;
                            impactTypeOfBenefit.Month15 = item.monthRows3.Month15;
                            impactTypeOfBenefit.Month16 = item.monthRows3.Month16;
                            impactTypeOfBenefit.Month17 = item.monthRows3.Month17;
                            impactTypeOfBenefit.Month18 = item.monthRows3.Month18;
                            impactTypeOfBenefit.Month19 = item.monthRows3.Month19;
                            impactTypeOfBenefit.Month20 = item.monthRows3.Month20;
                            impactTypeOfBenefit.Month21 = item.monthRows3.Month21;
                            impactTypeOfBenefit.Month22 = item.monthRows3.Month22;
                            impactTypeOfBenefit.Month23 = item.monthRows3.Month23;
                            impactTypeOfBenefit.Month24 = item.monthRows3.Month24;
                            impactTypeOfBenefit.Month25 = item.monthRows3.Month25;
                            impactTypeOfBenefit.Month26 = item.monthRows3.Month26;
                            impactTypeOfBenefit.Month27 = item.monthRows3.Month27;
                            impactTypeOfBenefit.Month28 = item.monthRows3.Month28;
                            impactTypeOfBenefit.Month29 = item.monthRows3.Month29;
                            impactTypeOfBenefit.Month30 = item.monthRows3.Month30;
                            impactTypeOfBenefit.Month31 = item.monthRows3.Month31;
                            impactTypeOfBenefit.Month32 = item.monthRows3.Month32;
                            impactTypeOfBenefit.Month33 = item.monthRows3.Month33;
                            impactTypeOfBenefit.Month34 = item.monthRows3.Month34;
                            impactTypeOfBenefit.Month35 = item.monthRows3.Month35;
                            impactTypeOfBenefit.Month36 = item.monthRows3.Month36;
                            await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                            await _context.SaveChangesAsync();
                            break;
                    }

                }
            }


            //TypeOfBenefit
            //save TypeOfBenefit
            if (impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Count > 0)
            {
                foreach (var item in impactTrackingCreate.TypeBenefitForm.TypeBenefitTable)
                {
                    for (int i = 1; i <= 2; i++)
                    {
                        var impactTypeOfBenefit = new ImpactTypeOfBenefit
                        {
                            Id = 0,
                            ImpactTypeOfBenefitTable = "TypeBenefit",
                            TypeOfBenefit = item.TypeOfBenefit,
                            InitiativeId = impactTrackingCreate.InitiativeId
                        };

                        switch (i)
                        {
                            case 1:
                                impactTypeOfBenefit.VersionPrice = "FixedFX";
                                impactTypeOfBenefit.currencyFloatFx = item.CurrencyFloatFx;
                                impactTypeOfBenefit.FixedFX = item.VersionPrice != null ? item.VersionPrice.Row1 : null;
                                impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row1 : null;
                                if (item.monthRows1 == null) break;
                                impactTypeOfBenefit.Month1 = item.monthRows1.Month1;
                                impactTypeOfBenefit.Month2 = item.monthRows1.Month2;
                                impactTypeOfBenefit.Month3 = item.monthRows1.Month3;
                                impactTypeOfBenefit.Month4 = item.monthRows1.Month4;
                                impactTypeOfBenefit.Month5 = item.monthRows1.Month5;
                                impactTypeOfBenefit.Month6 = item.monthRows1.Month6;
                                impactTypeOfBenefit.Month7 = item.monthRows1.Month7;
                                impactTypeOfBenefit.Month8 = item.monthRows1.Month8;
                                impactTypeOfBenefit.Month9 = item.monthRows1.Month9;
                                impactTypeOfBenefit.Month10 = item.monthRows1.Month10;
                                impactTypeOfBenefit.Month11 = item.monthRows1.Month11;
                                impactTypeOfBenefit.Month12 = item.monthRows1.Month12;
                                impactTypeOfBenefit.Month13 = item.monthRows1.Month13;
                                impactTypeOfBenefit.Month14 = item.monthRows1.Month14;
                                impactTypeOfBenefit.Month15 = item.monthRows1.Month15;
                                impactTypeOfBenefit.Month16 = item.monthRows1.Month16;
                                impactTypeOfBenefit.Month17 = item.monthRows1.Month17;
                                impactTypeOfBenefit.Month18 = item.monthRows1.Month18;
                                impactTypeOfBenefit.Month19 = item.monthRows1.Month19;
                                impactTypeOfBenefit.Month20 = item.monthRows1.Month20;
                                impactTypeOfBenefit.Month21 = item.monthRows1.Month21;
                                impactTypeOfBenefit.Month22 = item.monthRows1.Month22;
                                impactTypeOfBenefit.Month23 = item.monthRows1.Month23;
                                impactTypeOfBenefit.Month24 = item.monthRows1.Month24;
                                impactTypeOfBenefit.Month25 = item.monthRows1.Month25;
                                impactTypeOfBenefit.Month26 = item.monthRows1.Month26;
                                impactTypeOfBenefit.Month27 = item.monthRows1.Month27;
                                impactTypeOfBenefit.Month28 = item.monthRows1.Month28;
                                impactTypeOfBenefit.Month29 = item.monthRows1.Month29;
                                impactTypeOfBenefit.Month30 = item.monthRows1.Month30;
                                impactTypeOfBenefit.Month31 = item.monthRows1.Month31;
                                impactTypeOfBenefit.Month32 = item.monthRows1.Month32;
                                impactTypeOfBenefit.Month33 = item.monthRows1.Month33;
                                impactTypeOfBenefit.Month34 = item.monthRows1.Month34;
                                impactTypeOfBenefit.Month35 = item.monthRows1.Month35;
                                impactTypeOfBenefit.Month36 = item.monthRows1.Month36;
                                break;
                            case 2:
                                impactTypeOfBenefit.VersionPrice = "FloatFX";
                                impactTypeOfBenefit.currencyFloatFx = null;
                                impactTypeOfBenefit.FixedFX = item.VersionPrice != null ? item.VersionPrice.Row2 : null;
                                impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row2 : null;
                                if (item.monthRows2 == null) break;
                                impactTypeOfBenefit.Month1 = item.monthRows2.Month1;
                                impactTypeOfBenefit.Month2 = item.monthRows2.Month2;
                                impactTypeOfBenefit.Month3 = item.monthRows2.Month3;
                                impactTypeOfBenefit.Month4 = item.monthRows2.Month4;
                                impactTypeOfBenefit.Month5 = item.monthRows2.Month5;
                                impactTypeOfBenefit.Month6 = item.monthRows2.Month6;
                                impactTypeOfBenefit.Month7 = item.monthRows2.Month7;
                                impactTypeOfBenefit.Month8 = item.monthRows2.Month8;
                                impactTypeOfBenefit.Month9 = item.monthRows2.Month9;
                                impactTypeOfBenefit.Month10 = item.monthRows2.Month10;
                                impactTypeOfBenefit.Month11 = item.monthRows2.Month11;
                                impactTypeOfBenefit.Month12 = item.monthRows2.Month12;
                                impactTypeOfBenefit.Month13 = item.monthRows2.Month13;
                                impactTypeOfBenefit.Month14 = item.monthRows2.Month14;
                                impactTypeOfBenefit.Month15 = item.monthRows2.Month15;
                                impactTypeOfBenefit.Month16 = item.monthRows2.Month16;
                                impactTypeOfBenefit.Month17 = item.monthRows2.Month17;
                                impactTypeOfBenefit.Month18 = item.monthRows2.Month18;
                                impactTypeOfBenefit.Month19 = item.monthRows2.Month19;
                                impactTypeOfBenefit.Month20 = item.monthRows2.Month20;
                                impactTypeOfBenefit.Month21 = item.monthRows2.Month21;
                                impactTypeOfBenefit.Month22 = item.monthRows2.Month22;
                                impactTypeOfBenefit.Month23 = item.monthRows2.Month23;
                                impactTypeOfBenefit.Month24 = item.monthRows2.Month24;
                                impactTypeOfBenefit.Month25 = item.monthRows2.Month25;
                                impactTypeOfBenefit.Month26 = item.monthRows2.Month26;
                                impactTypeOfBenefit.Month27 = item.monthRows2.Month27;
                                impactTypeOfBenefit.Month28 = item.monthRows2.Month28;
                                impactTypeOfBenefit.Month29 = item.monthRows2.Month29;
                                impactTypeOfBenefit.Month30 = item.monthRows2.Month30;
                                impactTypeOfBenefit.Month31 = item.monthRows2.Month31;
                                impactTypeOfBenefit.Month32 = item.monthRows2.Month32;
                                impactTypeOfBenefit.Month33 = item.monthRows2.Month33;
                                impactTypeOfBenefit.Month34 = item.monthRows2.Month34;
                                impactTypeOfBenefit.Month35 = item.monthRows2.Month35;
                                impactTypeOfBenefit.Month36 = item.monthRows2.Month36;
                                break;
                        }
                        await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                        await _context.SaveChangesAsync();
                    }
                }

            }

            //save TypeOfBenefit Total
            if (impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Count > 0)
            {
                var typeBenefitTotalForm = impactTrackingCreate.TypeBenefitTotalForm;
                for (int i = 1; i <= 2; i++)
                {
                    var impactTypeOfBenefit = new ImpactTypeOfBenefit
                    {
                        Id = 0,
                        ImpactTypeOfBenefitTable = "TypeBenefitTotal",
                        TypeOfBenefit = typeBenefitTotalForm.TypeOfBenefit,
                        InitiativeId = impactTrackingCreate.InitiativeId
                    };

                    switch (i)
                    {
                        case 1:
                            impactTypeOfBenefit.VersionPrice = "FixedFX";
                            impactTypeOfBenefit.currencyFloatFx = typeBenefitTotalForm.CurrencyFloatFx;
                            impactTypeOfBenefit.FixedFX = typeBenefitTotalForm.VersionPrice != null ? typeBenefitTotalForm.VersionPrice.Row1 : null;
                            impactTypeOfBenefit.RunRate = typeBenefitTotalForm.RunRate != null ? typeBenefitTotalForm.RunRate.Row1 : null;
                            if (typeBenefitTotalForm.monthRows1 == null) break;
                            impactTypeOfBenefit.Month1 = typeBenefitTotalForm.monthRows1.Month1;
                            impactTypeOfBenefit.Month2 = typeBenefitTotalForm.monthRows1.Month2;
                            impactTypeOfBenefit.Month3 = typeBenefitTotalForm.monthRows1.Month3;
                            impactTypeOfBenefit.Month4 = typeBenefitTotalForm.monthRows1.Month4;
                            impactTypeOfBenefit.Month5 = typeBenefitTotalForm.monthRows1.Month5;
                            impactTypeOfBenefit.Month6 = typeBenefitTotalForm.monthRows1.Month6;
                            impactTypeOfBenefit.Month7 = typeBenefitTotalForm.monthRows1.Month7;
                            impactTypeOfBenefit.Month8 = typeBenefitTotalForm.monthRows1.Month8;
                            impactTypeOfBenefit.Month9 = typeBenefitTotalForm.monthRows1.Month9;
                            impactTypeOfBenefit.Month10 = typeBenefitTotalForm.monthRows1.Month10;
                            impactTypeOfBenefit.Month11 = typeBenefitTotalForm.monthRows1.Month11;
                            impactTypeOfBenefit.Month12 = typeBenefitTotalForm.monthRows1.Month12;
                            impactTypeOfBenefit.Month13 = typeBenefitTotalForm.monthRows1.Month13;
                            impactTypeOfBenefit.Month14 = typeBenefitTotalForm.monthRows1.Month14;
                            impactTypeOfBenefit.Month15 = typeBenefitTotalForm.monthRows1.Month15;
                            impactTypeOfBenefit.Month16 = typeBenefitTotalForm.monthRows1.Month16;
                            impactTypeOfBenefit.Month17 = typeBenefitTotalForm.monthRows1.Month17;
                            impactTypeOfBenefit.Month18 = typeBenefitTotalForm.monthRows1.Month18;
                            impactTypeOfBenefit.Month19 = typeBenefitTotalForm.monthRows1.Month19;
                            impactTypeOfBenefit.Month20 = typeBenefitTotalForm.monthRows1.Month20;
                            impactTypeOfBenefit.Month21 = typeBenefitTotalForm.monthRows1.Month21;
                            impactTypeOfBenefit.Month22 = typeBenefitTotalForm.monthRows1.Month22;
                            impactTypeOfBenefit.Month23 = typeBenefitTotalForm.monthRows1.Month23;
                            impactTypeOfBenefit.Month24 = typeBenefitTotalForm.monthRows1.Month24;
                            impactTypeOfBenefit.Month25 = typeBenefitTotalForm.monthRows1.Month25;
                            impactTypeOfBenefit.Month26 = typeBenefitTotalForm.monthRows1.Month26;
                            impactTypeOfBenefit.Month27 = typeBenefitTotalForm.monthRows1.Month27;
                            impactTypeOfBenefit.Month28 = typeBenefitTotalForm.monthRows1.Month28;
                            impactTypeOfBenefit.Month29 = typeBenefitTotalForm.monthRows1.Month29;
                            impactTypeOfBenefit.Month30 = typeBenefitTotalForm.monthRows1.Month30;
                            impactTypeOfBenefit.Month31 = typeBenefitTotalForm.monthRows1.Month31;
                            impactTypeOfBenefit.Month32 = typeBenefitTotalForm.monthRows1.Month32;
                            impactTypeOfBenefit.Month33 = typeBenefitTotalForm.monthRows1.Month33;
                            impactTypeOfBenefit.Month34 = typeBenefitTotalForm.monthRows1.Month34;
                            impactTypeOfBenefit.Month35 = typeBenefitTotalForm.monthRows1.Month35;
                            impactTypeOfBenefit.Month36 = typeBenefitTotalForm.monthRows1.Month36;
                            break;
                        case 2:
                            impactTypeOfBenefit.VersionPrice = "FloatFX";
                            impactTypeOfBenefit.currencyFloatFx = null;
                            impactTypeOfBenefit.FixedFX = typeBenefitTotalForm.VersionPrice != null ? typeBenefitTotalForm.VersionPrice.Row2 : null;
                            impactTypeOfBenefit.RunRate = typeBenefitTotalForm.RunRate != null ? typeBenefitTotalForm.RunRate.Row2 : null;
                            if (typeBenefitTotalForm.monthRows2 == null) break;
                            impactTypeOfBenefit.Month1 = typeBenefitTotalForm.monthRows2.Month1;
                            impactTypeOfBenefit.Month2 = typeBenefitTotalForm.monthRows2.Month2;
                            impactTypeOfBenefit.Month3 = typeBenefitTotalForm.monthRows2.Month3;
                            impactTypeOfBenefit.Month4 = typeBenefitTotalForm.monthRows2.Month4;
                            impactTypeOfBenefit.Month5 = typeBenefitTotalForm.monthRows2.Month5;
                            impactTypeOfBenefit.Month6 = typeBenefitTotalForm.monthRows2.Month6;
                            impactTypeOfBenefit.Month7 = typeBenefitTotalForm.monthRows2.Month7;
                            impactTypeOfBenefit.Month8 = typeBenefitTotalForm.monthRows2.Month8;
                            impactTypeOfBenefit.Month9 = typeBenefitTotalForm.monthRows2.Month9;
                            impactTypeOfBenefit.Month10 = typeBenefitTotalForm.monthRows2.Month10;
                            impactTypeOfBenefit.Month11 = typeBenefitTotalForm.monthRows2.Month11;
                            impactTypeOfBenefit.Month12 = typeBenefitTotalForm.monthRows2.Month12;
                            impactTypeOfBenefit.Month13 = typeBenefitTotalForm.monthRows2.Month13;
                            impactTypeOfBenefit.Month14 = typeBenefitTotalForm.monthRows2.Month14;
                            impactTypeOfBenefit.Month15 = typeBenefitTotalForm.monthRows2.Month15;
                            impactTypeOfBenefit.Month16 = typeBenefitTotalForm.monthRows2.Month16;
                            impactTypeOfBenefit.Month17 = typeBenefitTotalForm.monthRows2.Month17;
                            impactTypeOfBenefit.Month18 = typeBenefitTotalForm.monthRows2.Month18;
                            impactTypeOfBenefit.Month19 = typeBenefitTotalForm.monthRows2.Month19;
                            impactTypeOfBenefit.Month20 = typeBenefitTotalForm.monthRows2.Month20;
                            impactTypeOfBenefit.Month21 = typeBenefitTotalForm.monthRows2.Month21;
                            impactTypeOfBenefit.Month22 = typeBenefitTotalForm.monthRows2.Month22;
                            impactTypeOfBenefit.Month23 = typeBenefitTotalForm.monthRows2.Month23;
                            impactTypeOfBenefit.Month24 = typeBenefitTotalForm.monthRows2.Month24;
                            impactTypeOfBenefit.Month25 = typeBenefitTotalForm.monthRows2.Month25;
                            impactTypeOfBenefit.Month26 = typeBenefitTotalForm.monthRows2.Month26;
                            impactTypeOfBenefit.Month27 = typeBenefitTotalForm.monthRows2.Month27;
                            impactTypeOfBenefit.Month28 = typeBenefitTotalForm.monthRows2.Month28;
                            impactTypeOfBenefit.Month29 = typeBenefitTotalForm.monthRows2.Month29;
                            impactTypeOfBenefit.Month30 = typeBenefitTotalForm.monthRows2.Month30;
                            impactTypeOfBenefit.Month31 = typeBenefitTotalForm.monthRows2.Month31;
                            impactTypeOfBenefit.Month32 = typeBenefitTotalForm.monthRows2.Month32;
                            impactTypeOfBenefit.Month33 = typeBenefitTotalForm.monthRows2.Month33;
                            impactTypeOfBenefit.Month34 = typeBenefitTotalForm.monthRows2.Month34;
                            impactTypeOfBenefit.Month35 = typeBenefitTotalForm.monthRows2.Month35;
                            impactTypeOfBenefit.Month36 = typeBenefitTotalForm.monthRows2.Month36;
                            break;
                    }
                    await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                    await _context.SaveChangesAsync();
                }

            }


            //indirect 
            //save indirect
            if (impactTrackingCreate.IndirectBenefit && impactTrackingCreate.IndirectForm.IndirectTable.Count > 0)
            {
                foreach (var item in impactTrackingCreate.IndirectForm.IndirectTable)
                {
                    for (int i = 1; i <= 2; i++)
                    {
                        var impactTypeOfBenefit = new ImpactTypeOfBenefit
                        {
                            Id = 0,
                            ImpactTypeOfBenefitTable = "IndirectBenefit",
                            TypeOfBenefit = item.TypeOfBenefit,
                            InitiativeId = impactTrackingCreate.InitiativeId
                        };
                        switch (i)
                        {
                            case 1:
                                impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row1 : null;
                                impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row1 : null;
                                break;
                            case 2:
                                impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row2 : null;
                                impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row2 : null;
                                break;
                        }
                        await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                        await _context.SaveChangesAsync();
                    }
                }
            }

            //ImpiemantCost
            //save ImpiemantCost
            if (impactTrackingCreate.ImpiemantCost)
            {
                for (int i = 1; i <= 2; i++)
                {
                    var impactTypeOfBenefit = new ImpactTypeOfBenefit
                    {
                        Id = 0,
                        ImpactTypeOfBenefitTable = "ImpiemantCost",
                        TypeOfBenefit = impactTrackingCreate.ImpiemantCostForm.TypeOfBenefit,
                        InitiativeId = impactTrackingCreate.InitiativeId
                    };

                    switch (i)
                    {
                        case 1:
                            impactTypeOfBenefit.VersionPrice = impactTrackingCreate.ImpiemantCostForm.VersionPrice != null ? impactTrackingCreate.ImpiemantCostForm.VersionPrice.Row1 : null;
                            impactTypeOfBenefit.RunRate = impactTrackingCreate.ImpiemantCostForm.RunRate != null ? impactTrackingCreate.ImpiemantCostForm.RunRate.Row1 : null;
                            if (impactTrackingCreate.ImpiemantCostForm.monthRows1 == null) break;
                            impactTypeOfBenefit.Month1 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month1;
                            impactTypeOfBenefit.Month2 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month2;
                            impactTypeOfBenefit.Month3 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month3;
                            impactTypeOfBenefit.Month4 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month4;
                            impactTypeOfBenefit.Month5 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month5;
                            impactTypeOfBenefit.Month6 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month6;
                            impactTypeOfBenefit.Month7 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month7;
                            impactTypeOfBenefit.Month8 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month8;
                            impactTypeOfBenefit.Month9 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month9;
                            impactTypeOfBenefit.Month10 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month10;
                            impactTypeOfBenefit.Month11 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month11;
                            impactTypeOfBenefit.Month12 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month12;
                            impactTypeOfBenefit.Month13 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month13;
                            impactTypeOfBenefit.Month14 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month14;
                            impactTypeOfBenefit.Month15 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month15;
                            impactTypeOfBenefit.Month16 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month16;
                            impactTypeOfBenefit.Month17 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month17;
                            impactTypeOfBenefit.Month18 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month18;
                            impactTypeOfBenefit.Month19 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month19;
                            impactTypeOfBenefit.Month20 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month20;
                            impactTypeOfBenefit.Month21 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month21;
                            impactTypeOfBenefit.Month22 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month22;
                            impactTypeOfBenefit.Month23 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month23;
                            impactTypeOfBenefit.Month24 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month24;
                            impactTypeOfBenefit.Month25 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month25;
                            impactTypeOfBenefit.Month26 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month26;
                            impactTypeOfBenefit.Month27 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month27;
                            impactTypeOfBenefit.Month28 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month28;
                            impactTypeOfBenefit.Month29 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month29;
                            impactTypeOfBenefit.Month30 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month30;
                            impactTypeOfBenefit.Month31 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month31;
                            impactTypeOfBenefit.Month32 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month32;
                            impactTypeOfBenefit.Month33 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month33;
                            impactTypeOfBenefit.Month34 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month34;
                            impactTypeOfBenefit.Month35 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month35;
                            impactTypeOfBenefit.Month36 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month36;
                            break;
                        case 2:
                            impactTypeOfBenefit.VersionPrice = impactTrackingCreate.ImpiemantCostForm.VersionPrice != null ? impactTrackingCreate.ImpiemantCostForm.VersionPrice.Row2 : null;
                            impactTypeOfBenefit.RunRate = impactTrackingCreate.ImpiemantCostForm.RunRate != null ? impactTrackingCreate.ImpiemantCostForm.RunRate.Row2 : null;
                            if (impactTrackingCreate.ImpiemantCostForm.monthRows2 == null) break;
                            impactTypeOfBenefit.Month1 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month1;
                            impactTypeOfBenefit.Month2 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month2;
                            impactTypeOfBenefit.Month3 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month3;
                            impactTypeOfBenefit.Month4 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month4;
                            impactTypeOfBenefit.Month5 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month5;
                            impactTypeOfBenefit.Month6 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month6;
                            impactTypeOfBenefit.Month7 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month7;
                            impactTypeOfBenefit.Month8 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month8;
                            impactTypeOfBenefit.Month9 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month9;
                            impactTypeOfBenefit.Month10 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month10;
                            impactTypeOfBenefit.Month11 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month11;
                            impactTypeOfBenefit.Month12 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month12;
                            impactTypeOfBenefit.Month13 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month13;
                            impactTypeOfBenefit.Month14 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month14;
                            impactTypeOfBenefit.Month15 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month15;
                            impactTypeOfBenefit.Month16 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month16;
                            impactTypeOfBenefit.Month17 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month17;
                            impactTypeOfBenefit.Month18 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month18;
                            impactTypeOfBenefit.Month19 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month19;
                            impactTypeOfBenefit.Month20 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month20;
                            impactTypeOfBenefit.Month21 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month21;
                            impactTypeOfBenefit.Month22 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month22;
                            impactTypeOfBenefit.Month23 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month23;
                            impactTypeOfBenefit.Month24 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month24;
                            impactTypeOfBenefit.Month25 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month25;
                            impactTypeOfBenefit.Month26 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month26;
                            impactTypeOfBenefit.Month27 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month27;
                            impactTypeOfBenefit.Month28 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month28;
                            impactTypeOfBenefit.Month29 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month29;
                            impactTypeOfBenefit.Month30 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month30;
                            impactTypeOfBenefit.Month31 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month31;
                            impactTypeOfBenefit.Month32 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month32;
                            impactTypeOfBenefit.Month33 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month33;
                            impactTypeOfBenefit.Month34 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month34;
                            impactTypeOfBenefit.Month35 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month35;
                            impactTypeOfBenefit.Month36 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month36;
                            break;
                    }
                    await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                    await _context.SaveChangesAsync();
                }
            }
            await _context.SaveChangesAsync();
            impactTrackingCreate.Id = CreateImpactTracking.Id;
            return impactTrackingCreate;
        }

        public async Task<ImpactTrackingCreate> UpdateImpactAllTracking(ImpactTrackingCreate impactTrackingCreate, string actionType)
        {
            // query initiative and Detail
            var initaitve = await _context.Initiatives.Where(x => x.Id.Equals(impactTrackingCreate.InitiativeId)).FirstOrDefaultAsync();
            var setting = await _context.Setting.FirstOrDefaultAsync();
            var detailInfo = await _context.DetailInformations.Where(x => x.InitiativeId.Equals(impactTrackingCreate.InitiativeId)).FirstOrDefaultAsync();


            var fxExchange = !String.IsNullOrEmpty(initaitve.CostEstOpexType) && initaitve.CostEstOpexType.Equals("USD") ? (decimal)initaitve.FxExchange : 1;
            var costEstOpex = initaitve.CostEstOpex.HasValue ? (decimal)initaitve.CostEstOpex * fxExchange : 0;
            //check implementCost
            if (impactTrackingCreate.ImpiemantCost && (impactTrackingCreate.ImpiemantCostForm.RunRate.Row1.HasValue || impactTrackingCreate.ImpiemantCostForm.RunRate.Row2.HasValue))
            {
                decimal? runrate = impactTrackingCreate.ImpiemantCostForm.RunRate.Row2.HasValue ? impactTrackingCreate.ImpiemantCostForm.RunRate.Row2 : impactTrackingCreate.ImpiemantCostForm.RunRate.Row1;
                costEstOpex = runrate.HasValue ? (decimal)(runrate * fxExchange) : 0;
            }

            var costEstCapex = initaitve.CostEstCapex.HasValue ? (decimal)initaitve.CostEstCapex * fxExchange : 0;

           
            if (new string[] { "SIL5", "IL5", "Adopt SIL5" }.Contains(initaitve.Stage) || (actionType.Equals("submit") && new string[] { "IL4", "Adopt IL4" }.Contains(initaitve.Stage)))
            {
                //calculate fixed and float
                List<CommonData> TOFinanceFX = await _context.CommonData.Where(x => x.DataType.Equals("TOFinanceFX")).ToListAsync();
                DateTime firstMonth = (DateTime)impactTrackingCreate.FirstRunRateMonth;

                var fixedFloatFx = impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.ToList();
                var runrateActual = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.ToList();

                for (var i = 0; i < fixedFloatFx.Count; i++)
                {
                    if (fixedFloatFx[i].VersionPrice.Row1 != null && fixedFloatFx[i].VersionPrice.Row1 > 0)
                    {
                        //var minFxRateYear = TOFinanceFX.Where(x=>x.Attribute01.Equals(fixedFloatFx[i].CurrencyFloatFx)).Min(m => m.Attribute02).FirstOrDefault();
                        //var minFxMonth = TOFinanceFX.Where(x => x.Attribute02.Equals(minFxRateYear)).Min(m => m.Attribute03).FirstOrDefault();

                        var minFxRateYear = TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx)).Min(m => m.Attribute02);
                        var minFxMonth = TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(minFxRateYear)).Min(m => m.Attribute03);
                        var maxFxRateYear = TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx)).Max(m => m.Attribute02);
                        var maxFxMonth = TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(maxFxRateYear)).Max(m => m.Attribute03);
                        CommonData minFxRate = TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(minFxRateYear) && x.Attribute03.Equals(minFxMonth)).FirstOrDefault();
                        CommonData maxFxRate = TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(maxFxRateYear) && x.Attribute03.Equals(maxFxMonth)).FirstOrDefault();



                        var runrate = new List<decimal?>();
                        //var test = Convert.ToDecimal(TOFinanceFX.Where(x => x.Attribute01.Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.Year.ToString()) && x.Attribute03.Equals(firstMonth.Month.ToString())).Select(s => s.Attribute04).FirstOrDefault());
                        fixedFloatFx[i].monthRows2.Month1 = fixedFloatFx[i].monthRows1.Month1 != null ? (fixedFloatFx[i].monthRows1.Month1 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.Month <= Convert.ToInt32(maxFxMonth) && firstMonth.Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.Year.ToString()) && x.Attribute03.Equals(firstMonth.Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.Year <= Convert.ToInt32(minFxRateYear) && firstMonth.Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month2 = fixedFloatFx[i].monthRows1.Month2 != null ? (fixedFloatFx[i].monthRows1.Month2 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(1).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(1).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(1).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(1).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(1).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(1).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(1).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month3 = fixedFloatFx[i].monthRows1.Month3 != null ? (fixedFloatFx[i].monthRows1.Month3 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(2).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(2).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(2).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(2).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(2).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(2).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(2).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month4 = fixedFloatFx[i].monthRows1.Month4 != null ? (fixedFloatFx[i].monthRows1.Month4 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(3).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(3).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(3).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(3).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(3).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(3).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(3).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month5 = fixedFloatFx[i].monthRows1.Month5 != null ? (fixedFloatFx[i].monthRows1.Month5 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(4).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(4).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(4).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(4).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(4).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(4).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(4).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month6 = fixedFloatFx[i].monthRows1.Month6 != null ? (fixedFloatFx[i].monthRows1.Month6 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(5).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(5).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(5).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(5).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(5).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(5).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(5).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month7 = fixedFloatFx[i].monthRows1.Month7 != null ? (fixedFloatFx[i].monthRows1.Month7 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(6).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(6).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(6).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(6).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(6).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(6).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(6).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month8 = fixedFloatFx[i].monthRows1.Month8 != null ? (fixedFloatFx[i].monthRows1.Month8 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(7).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(7).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(7).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(7).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(7).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(7).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(7).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month9 = fixedFloatFx[i].monthRows1.Month9 != null ? (fixedFloatFx[i].monthRows1.Month9 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(8).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(8).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(8).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(8).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(8).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(8).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(8).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month10 = fixedFloatFx[i].monthRows1.Month10 != null ? (fixedFloatFx[i].monthRows1.Month10 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(9).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(9).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(9).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(9).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(9).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(9).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(9).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month11 = fixedFloatFx[i].monthRows1.Month11 != null ? (fixedFloatFx[i].monthRows1.Month11 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(10).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(10).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(10).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(10).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(10).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(10).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(10).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month12 = fixedFloatFx[i].monthRows1.Month12 != null ? (fixedFloatFx[i].monthRows1.Month12 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(11).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(11).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(11).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(11).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(11).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(11).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(11).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month13 = fixedFloatFx[i].monthRows1.Month13 != null ? (fixedFloatFx[i].monthRows1.Month13 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(12).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(12).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(12).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(12).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(12).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(12).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(12).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month14 = fixedFloatFx[i].monthRows1.Month14 != null ? (fixedFloatFx[i].monthRows1.Month14 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(13).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(13).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(13).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(13).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(13).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(13).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(13).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month15 = fixedFloatFx[i].monthRows1.Month15 != null ? (fixedFloatFx[i].monthRows1.Month15 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(14).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(14).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(14).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(14).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(14).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(14).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(14).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month16 = fixedFloatFx[i].monthRows1.Month16 != null ? (fixedFloatFx[i].monthRows1.Month16 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(15).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(15).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(15).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(15).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(15).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(15).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(15).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month17 = fixedFloatFx[i].monthRows1.Month17 != null ? (fixedFloatFx[i].monthRows1.Month17 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(16).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(16).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(16).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(16).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(16).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(16).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(16).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month18 = fixedFloatFx[i].monthRows1.Month18 != null ? (fixedFloatFx[i].monthRows1.Month18 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(17).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(17).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(17).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(17).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(17).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(17).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(17).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month19 = fixedFloatFx[i].monthRows1.Month19 != null ? (fixedFloatFx[i].monthRows1.Month19 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(18).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(18).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(18).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(18).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(18).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(18).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(18).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month20 = fixedFloatFx[i].monthRows1.Month20 != null ? (fixedFloatFx[i].monthRows1.Month20 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(19).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(19).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(19).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(19).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(19).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(19).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(19).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month21 = fixedFloatFx[i].monthRows1.Month21 != null ? (fixedFloatFx[i].monthRows1.Month21 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(20).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(20).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(20).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(20).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(20).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(20).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(20).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month22 = fixedFloatFx[i].monthRows1.Month22 != null ? (fixedFloatFx[i].monthRows1.Month22 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(21).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(21).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(21).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(21).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(21).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(21).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(21).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month23 = fixedFloatFx[i].monthRows1.Month23 != null ? (fixedFloatFx[i].monthRows1.Month23 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(22).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(22).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(22).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(22).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(22).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(22).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(22).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month24 = fixedFloatFx[i].monthRows1.Month24 != null ? (fixedFloatFx[i].monthRows1.Month24 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(23).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(23).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(23).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(23).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(23).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(23).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(23).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month25 = fixedFloatFx[i].monthRows1.Month25 != null ? (fixedFloatFx[i].monthRows1.Month25 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(24).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(24).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(24).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(24).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(24).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(24).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(24).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month26 = fixedFloatFx[i].monthRows1.Month26 != null ? (fixedFloatFx[i].monthRows1.Month26 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(25).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(25).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(25).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(25).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(25).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(25).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(25).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month27 = fixedFloatFx[i].monthRows1.Month27 != null ? (fixedFloatFx[i].monthRows1.Month27 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(26).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(26).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(26).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(26).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(26).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(26).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(26).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month28 = fixedFloatFx[i].monthRows1.Month28 != null ? (fixedFloatFx[i].monthRows1.Month28 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(27).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(27).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(27).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(27).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(27).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(27).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(27).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month29 = fixedFloatFx[i].monthRows1.Month29 != null ? (fixedFloatFx[i].monthRows1.Month29 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(28).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(28).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(28).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(28).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(28).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(28).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(28).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month30 = fixedFloatFx[i].monthRows1.Month30 != null ? (fixedFloatFx[i].monthRows1.Month30 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(29).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(29).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(29).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(29).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(29).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(29).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(29).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month31 = fixedFloatFx[i].monthRows1.Month31 != null ? (fixedFloatFx[i].monthRows1.Month31 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(30).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(30).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(30).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(30).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(30).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(30).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(30).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month32 = fixedFloatFx[i].monthRows1.Month32 != null ? (fixedFloatFx[i].monthRows1.Month32 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(31).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(31).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(31).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(31).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(31).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(31).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(31).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month33 = fixedFloatFx[i].monthRows1.Month33 != null ? (fixedFloatFx[i].monthRows1.Month33 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(32).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(32).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(32).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(32).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(32).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(32).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(32).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month34 = fixedFloatFx[i].monthRows1.Month34 != null ? (fixedFloatFx[i].monthRows1.Month34 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(33).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(33).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(33).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(33).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(33).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(33).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(33).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month35 = fixedFloatFx[i].monthRows1.Month35 != null ? (fixedFloatFx[i].monthRows1.Month35 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(34).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(34).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(34).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(34).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(34).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(34).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(34).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;
                        fixedFloatFx[i].monthRows2.Month36 = fixedFloatFx[i].monthRows1.Month36 != null ? (fixedFloatFx[i].monthRows1.Month36 / fixedFloatFx[i].VersionPrice.Row1) * Convert.ToDecimal(firstMonth.AddMonths(35).Year <= Convert.ToInt32(maxFxRateYear) && firstMonth.AddMonths(35).Month <= Convert.ToInt32(maxFxMonth) && firstMonth.AddMonths(35).Year >= Convert.ToInt32(minFxRateYear) ? TOFinanceFX.Where(x => x.Attribute01.ToUpper().Equals(fixedFloatFx[i].CurrencyFloatFx) && x.Attribute02.Equals(firstMonth.AddMonths(35).Year.ToString()) && x.Attribute03.Equals(firstMonth.AddMonths(35).Month.ToString())).Select(s => s.Attribute04).FirstOrDefault() : firstMonth.AddMonths(35).Year <= Convert.ToInt32(minFxRateYear) && firstMonth.AddMonths(35).Month <= Convert.ToInt32(minFxMonth) ? minFxRate.Attribute04 : maxFxRate.Attribute04) : null;

                        runrate.Add(fixedFloatFx[i].monthRows2.Month1);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month2);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month3);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month4);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month5);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month6);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month7);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month8);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month9);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month10);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month11);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month12);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month13);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month14);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month15);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month16);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month17);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month18);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month19);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month20);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month21);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month22);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month23);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month24);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month25);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month26);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month27);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month28);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month29);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month30);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month31);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month32);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month33);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month34);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month35);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month36);
                    }
                    else
                    {
                        var runrate = new List<decimal?>();
                        fixedFloatFx[i].monthRows2.Month1 = fixedFloatFx[i].monthRows1.Month1;
                        fixedFloatFx[i].monthRows2.Month2 = fixedFloatFx[i].monthRows1.Month2;
                        fixedFloatFx[i].monthRows2.Month3 = fixedFloatFx[i].monthRows1.Month3;
                        fixedFloatFx[i].monthRows2.Month4 = fixedFloatFx[i].monthRows1.Month4;
                        fixedFloatFx[i].monthRows2.Month5 = fixedFloatFx[i].monthRows1.Month5;
                        fixedFloatFx[i].monthRows2.Month6 = fixedFloatFx[i].monthRows1.Month6;
                        fixedFloatFx[i].monthRows2.Month7 = fixedFloatFx[i].monthRows1.Month7;
                        fixedFloatFx[i].monthRows2.Month8 = fixedFloatFx[i].monthRows1.Month8;
                        fixedFloatFx[i].monthRows2.Month9 = fixedFloatFx[i].monthRows1.Month9;
                        fixedFloatFx[i].monthRows2.Month10 = fixedFloatFx[i].monthRows1.Month10;
                        fixedFloatFx[i].monthRows2.Month11 = fixedFloatFx[i].monthRows1.Month11;
                        fixedFloatFx[i].monthRows2.Month12 = fixedFloatFx[i].monthRows1.Month12;
                        fixedFloatFx[i].monthRows2.Month13 = fixedFloatFx[i].monthRows1.Month13;
                        fixedFloatFx[i].monthRows2.Month14 = fixedFloatFx[i].monthRows1.Month14;
                        fixedFloatFx[i].monthRows2.Month15 = fixedFloatFx[i].monthRows1.Month15;
                        fixedFloatFx[i].monthRows2.Month16 = fixedFloatFx[i].monthRows1.Month16;
                        fixedFloatFx[i].monthRows2.Month17 = fixedFloatFx[i].monthRows1.Month17;
                        fixedFloatFx[i].monthRows2.Month18 = fixedFloatFx[i].monthRows1.Month18;
                        fixedFloatFx[i].monthRows2.Month19 = fixedFloatFx[i].monthRows1.Month19;
                        fixedFloatFx[i].monthRows2.Month20 = fixedFloatFx[i].monthRows1.Month20;
                        fixedFloatFx[i].monthRows2.Month21 = fixedFloatFx[i].monthRows1.Month21;
                        fixedFloatFx[i].monthRows2.Month22 = fixedFloatFx[i].monthRows1.Month22;
                        fixedFloatFx[i].monthRows2.Month23 = fixedFloatFx[i].monthRows1.Month23;
                        fixedFloatFx[i].monthRows2.Month24 = fixedFloatFx[i].monthRows1.Month24;
                        fixedFloatFx[i].monthRows2.Month25 = fixedFloatFx[i].monthRows1.Month25;
                        fixedFloatFx[i].monthRows2.Month26 = fixedFloatFx[i].monthRows1.Month26;
                        fixedFloatFx[i].monthRows2.Month27 = fixedFloatFx[i].monthRows1.Month27;
                        fixedFloatFx[i].monthRows2.Month28 = fixedFloatFx[i].monthRows1.Month28;
                        fixedFloatFx[i].monthRows2.Month29 = fixedFloatFx[i].monthRows1.Month29;
                        fixedFloatFx[i].monthRows2.Month30 = fixedFloatFx[i].monthRows1.Month30;
                        fixedFloatFx[i].monthRows2.Month31 = fixedFloatFx[i].monthRows1.Month31;
                        fixedFloatFx[i].monthRows2.Month32 = fixedFloatFx[i].monthRows1.Month32;
                        fixedFloatFx[i].monthRows2.Month33 = fixedFloatFx[i].monthRows1.Month33;
                        fixedFloatFx[i].monthRows2.Month34 = fixedFloatFx[i].monthRows1.Month34;
                        fixedFloatFx[i].monthRows2.Month35 = fixedFloatFx[i].monthRows1.Month35;
                        fixedFloatFx[i].monthRows2.Month36 = fixedFloatFx[i].monthRows1.Month36;


                        runrate.Add(fixedFloatFx[i].monthRows2.Month1);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month2);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month3);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month4);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month5);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month6);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month7);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month8);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month9);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month10);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month11);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month12);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month13);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month14);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month15);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month16);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month17);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month18);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month19);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month20);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month21);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month22);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month23);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month24);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month25);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month26);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month27);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month28);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month29);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month30);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month31);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month32);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month33);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month34);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month35);
                        runrate.Add(fixedFloatFx[i].monthRows2.Month36);
                    }
                }



            }

            //calculate
            //RunRate and oneTime IL4
            decimal? runrateRecurringIL4 = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
            && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Count() > 0 ?
             impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
            && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.RunRate.Row2) : null;

            decimal? runrateOnetimeIL4 = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
            && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
            && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => x.RunRate.Row2) : null;

            //RunRate and oneTime IL5
            decimal? runrateRecurringIL5 = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
            && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
            && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.RunRate.Row3) : null;

            decimal? runrateOnetimeIL5 = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => x.RunRate.Row3) : null;

            //Total Runrate
            //Target
            decimal? runrateTotalRecurringTarget = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.RunRate.Row1) : null;

            decimal? runrateTotalOnetimeTarget = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => x.RunRate.Row1) : null;

            //Revise
            decimal? runrateTotalRecurringRevise = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.RunRate.Row2) : null;

            decimal? runrateTotalOnetimeRevise = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Count() > 0 ?
             impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => x.RunRate.Row2) : null;

            //actual
            decimal? runrateTotalRecurringActual = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.RunRate.Row3) : null;

            decimal? runrateTotalOnetimeActual = impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Count() > 0 ?
            impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("FirstRunRate")
             && !String.IsNullOrEmpty(x.RunRate.Row3.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => x.RunRate.Row3) : null;

            //Total Fixed and Float
            decimal? fixedFXTotalRecurring = impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Count() > 0 ?
            impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.RunRate.Row1) : null;

            decimal? fixedFXTotalOnetime = impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Count() > 0 ?
            impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
             && !String.IsNullOrEmpty(x.RunRate.Row1.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => x.RunRate.Row1) : null;

            decimal? floatFXTotalRecurring = impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
             && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Count() > 0 ?
            impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
             && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("RE")).Sum(x => x.RunRate.Row2) : null;

            decimal? floatFXTotalOnetime = impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
            && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Count() > 0 ?
            impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Where(x =>
            !String.IsNullOrEmpty(x.ImpactTypeOfBenefitTable)
            && !String.IsNullOrEmpty(x.TypeOfBenefit)
            && x.ImpactTypeOfBenefitTable.Equals("TypeBenefit")
            && !String.IsNullOrEmpty(x.RunRate.Row2.ToString())
            && x.TypeOfBenefit.StartsWith("ONE")).Sum(x => x.RunRate.Row2) : null;


            //Assign var
            decimal? IL4RunRateOnetime = runrateOnetimeIL4 == null ? null : runrateOnetimeIL4;
            decimal? IL4RunRateRecurring = runrateRecurringIL4;
            decimal? IL5RunRateOnetime = runrateOnetimeIL5 == null ? null : runrateOnetimeIL5;
            decimal? IL5RunRateRecurring = runrateRecurringIL5;
            decimal? IL5FixedFxOnetime = fixedFXTotalOnetime == null ? null : fixedFXTotalOnetime;
            decimal? IL5FixedFxRecurring = fixedFXTotalRecurring;
            decimal? IL5FloatFxOnetime = floatFXTotalOnetime == null ? null : floatFXTotalOnetime;
            decimal? IL5FloatFxRecurring = floatFXTotalRecurring;


            decimal? TotalOnetime = null;
            decimal? TotalRecurring = null;
            if (runrateTotalOnetimeActual != null)
            {
                TotalOnetime = runrateTotalOnetimeActual;
            }
            else if (runrateTotalOnetimeRevise != null)
            {
                TotalOnetime = runrateTotalOnetimeRevise;
            }
            else if (runrateTotalOnetimeTarget != null)
            {
                TotalOnetime = runrateTotalOnetimeTarget;
            }
            else
            {
                TotalOnetime = null;
            }

            if (runrateTotalRecurringActual != null)
            {
                TotalRecurring = runrateTotalRecurringActual;
            }
            else if (runrateTotalRecurringRevise != null)
            {
                TotalRecurring = runrateTotalRecurringRevise;
            }
            else if (runrateTotalRecurringTarget != null)
            {
                TotalRecurring = runrateTotalRecurringTarget;
            }
            else
            {
                TotalRecurring = null;
            }



            //patch for impact
            impactTrackingCreate.IL4RunRateOnetime = IL4RunRateOnetime != null ? ConvertMethod.Round(IL4RunRateOnetime * setting.OneTimeBenefit) : null;
            impactTrackingCreate.IL4RunRateRecurring = IL4RunRateRecurring;
            impactTrackingCreate.IL5RunRateOnetime = IL5RunRateOnetime != null ? ConvertMethod.Round(IL5RunRateOnetime * setting.OneTimeBenefit) : null;
            impactTrackingCreate.IL5RunRateRecurring = IL5RunRateRecurring;
            impactTrackingCreate.IL5FixedFxOnetime = IL5FixedFxOnetime;
            impactTrackingCreate.IL5FixedFxRecurring = IL5FixedFxRecurring;
            impactTrackingCreate.IL5FloatFxOnetime = IL5FloatFxOnetime;
            impactTrackingCreate.IL5FloatFxRecurring = IL5FloatFxRecurring;
            impactTrackingCreate.TotalRecurring = TotalRecurring;
            impactTrackingCreate.TotalOnetime = TotalOnetime != null ? ConvertMethod.Round(TotalOnetime * setting.OneTimeBenefit) : null;

            //save Impact 
            var CreateImpactTracking = _mapper.Map<ImpactTracking>(impactTrackingCreate);
            _context.ImpactTrackings.Update(CreateImpactTracking);
            await _context.SaveChangesAsync();

            //save Share Benefit
            //remove Share Benefit
            var List = await _context.ShareBenefitWorkstreams.Where(i => i.InitiativeId.Equals(impactTrackingCreate.InitiativeId)).ToListAsync();
            if (List.Count > 0)
            {
                foreach (var entity in List)
                    _context.ShareBenefitWorkstreams.Remove(entity);
                await _context.SaveChangesAsync();
            }

            //Save Share Benefit
            if (impactTrackingCreate.HaveShareBenefit && impactTrackingCreate.ShareBenefitFrom.ShareBenefitWorkstreams.Count > 1)
            {
                //insert by frontend 
                foreach (var item in impactTrackingCreate.ShareBenefitFrom.ShareBenefitWorkstreams)
                {
                    decimal Percent = item.Percent.HasValue ? (decimal)item.Percent : 0;

                    decimal? IL4RRBlended = null;
                    if (IL4RunRateOnetime != null && IL4RunRateRecurring != null)
                    {
                        IL4RRBlended = ((ConvertMethod.Round(IL4RunRateOnetime * setting.OneTimeBenefit)) + IL4RunRateRecurring) * (Percent / 100);
                    }
                    else if (IL4RunRateOnetime != null && IL4RunRateRecurring == null)
                    {
                        IL4RRBlended = (ConvertMethod.Round(IL4RunRateOnetime * setting.OneTimeBenefit)) * (Percent / 100);
                    }
                    else if (IL4RunRateOnetime == null && IL4RunRateRecurring != null)
                    {
                        IL4RRBlended = IL4RunRateRecurring * (Percent / 100);
                    }

                    decimal? IL5RRBlended = null;
                    if (IL5RunRateOnetime != null && IL5RunRateRecurring != null)
                    {
                        IL5RRBlended = ((ConvertMethod.Round(IL5RunRateOnetime * setting.OneTimeBenefit)) + IL5RunRateRecurring) * (Percent / 100);
                    }
                    else if (IL5RunRateOnetime != null && IL5RunRateRecurring == null)
                    {
                        IL5RRBlended = (ConvertMethod.Round(IL5RunRateOnetime * setting.OneTimeBenefit)) * (Percent / 100);
                    }
                    else if (IL5RunRateOnetime == null && IL5RunRateRecurring != null)
                    {
                        IL5RRBlended = IL5RunRateRecurring * (Percent / 100);
                    }

                    decimal? TotalRRBlended = null;
                    if (TotalOnetime != null && TotalRecurring != null)
                    {
                        TotalRRBlended = ((ConvertMethod.Round(TotalOnetime * setting.OneTimeBenefit)) + TotalRecurring) * (Percent / 100);
                    }
                    else if (TotalOnetime != null && TotalRecurring == null)
                    {
                        TotalRRBlended = (ConvertMethod.Round(TotalOnetime * setting.OneTimeBenefit)) * (Percent / 100);
                    }
                    else if (TotalOnetime == null && TotalRecurring != null)
                    {
                        TotalRRBlended = TotalRecurring * (Percent / 100);
                    }
                    else
                    {
                        TotalRRBlended = initaitve.BenefitAmount != null ? initaitve.BenefitAmount * (Percent / 100) : null;
                    }



                    var shareBenefitDefault = new ShareBenefitWorkstream()
                    {
                        Id = 0,
                        InitiativeId = impactTrackingCreate.InitiativeId,
                        Workstream = item.Workstream,
                        Percent = Percent,
                        IL4RRBlended = IL4RRBlended, //(il4runrateonetime + il4runraterecurring) * (percent/100)
                        IL5RRBlended = IL5RRBlended, //(il5runrateonetime + il5runraterecurring) * (percent/100)
                        IL5FixedFXOnetime = IL5FixedFxOnetime == null ? null : IL5FixedFxOnetime * (Percent / 100), //il5fixedfxonetime * (percent/100)
                        IL5FixedFxRecurring = IL5FixedFxRecurring == null ? null : IL5FixedFxRecurring * (Percent / 100), //il5fixedfxrecurring * (percent/100)
                        IL5FloatFxOnetime = IL5FloatFxOnetime == null ? null : IL5FloatFxOnetime * (Percent / 100), //il5floatfxonetime * (percent/100)
                        IL5FloatFxRecurring = IL5FloatFxRecurring == null ? null : IL5FloatFxRecurring * (Percent / 100), //il5floatfxrecurring * (percent/100)
                        IL4RROneTime = IL4RunRateOnetime == null ? null : IL4RunRateOnetime * (Percent / 100), //(il4runrateonetime * 10) * (percent/100)
                        IL4RRRecurring = IL4RunRateRecurring == null ? null : IL4RunRateRecurring * (Percent / 100), //il4runraterecurring * (percent/100)
                        IL5RROneTime = IL5RunRateOnetime == null ? null : IL5RunRateOnetime * (Percent / 100), //(il5runrateonetime * 10) * (percent/100) 
                        IL5RRRecurring = IL5RunRateRecurring == null ? null : IL5RunRateRecurring * (Percent / 100), //il5runraterecurring * (percent/100) 
                        TotalRROnetime = TotalOnetime == null ? null : TotalOnetime * (Percent / 100), //(totalonetime * 10) * (percent/100)
                        TotalRRRecurring = TotalRecurring == null ? null : TotalRecurring * (Percent / 100), //totalrecurring  * (percent/100)
                        TotalRRBlended = TotalRRBlended, //(totalrecurring + totalonetime)  * (percent/100)
                        OnetimeImplementationCost = (decimal)(costEstOpex + costEstCapex) * (Percent / 100)
                    };
                    await _context.ShareBenefitWorkstreams.AddAsync(shareBenefitDefault);
                    await _context.SaveChangesAsync();
                }
            }
            else
            {
                decimal? IL4RRBlended = null;
                if (IL4RunRateOnetime != null && IL4RunRateRecurring != null)
                {
                    IL4RRBlended = (ConvertMethod.Round(IL4RunRateOnetime * setting.OneTimeBenefit)) + IL4RunRateRecurring;
                }
                else if (IL4RunRateOnetime != null && IL4RunRateRecurring == null)
                {
                    IL4RRBlended = ConvertMethod.Round(IL4RunRateOnetime * setting.OneTimeBenefit);
                }
                else if (IL4RunRateOnetime == null && IL4RunRateRecurring != null)
                {
                    IL4RRBlended = IL4RunRateRecurring;
                }

                decimal? IL5RRBlended = null;
                if (IL5RunRateOnetime != null && IL5RunRateRecurring != null)
                {
                    IL5RRBlended = (ConvertMethod.Round(IL5RunRateOnetime * setting.OneTimeBenefit)) + IL5RunRateRecurring;
                }
                else if (IL5RunRateOnetime != null && IL5RunRateRecurring == null)
                {
                    IL5RRBlended = ConvertMethod.Round(IL5RunRateOnetime * setting.OneTimeBenefit);
                }
                else if (IL5RunRateOnetime == null && IL5RunRateRecurring != null)
                {
                    IL5RRBlended = IL5RunRateRecurring;
                }

                decimal? TotalRRBlended = null;
                if (TotalOnetime != null && TotalRecurring != null)
                {
                    TotalRRBlended = (ConvertMethod.Round(TotalOnetime * setting.OneTimeBenefit)) + TotalRecurring;
                }
                else if (TotalOnetime != null && TotalRecurring == null)
                {
                    TotalRRBlended = ConvertMethod.Round(TotalOnetime * setting.OneTimeBenefit);
                }
                else if (TotalOnetime == null && TotalRecurring != null)
                {
                    TotalRRBlended = TotalRecurring;
                }
                else
                {
                    TotalRRBlended = initaitve.BenefitAmount != null ? initaitve.BenefitAmount : null;
                }


                //insert 100 % default
                var shareBenefitDefault = new ShareBenefitWorkstream()
                {
                    Id = 0,
                    InitiativeId = impactTrackingCreate.InitiativeId,
                    Workstream = detailInfo.SubWorkstream1,
                    Percent = 100,
                    IL4RRBlended = IL4RRBlended, //(il4runrateonetime + il4runraterecurring) * (percent/100)
                    IL5RRBlended = IL5RRBlended, //(il5runrateonetime + il5runraterecurring) * (percent/100)
                    IL5FixedFXOnetime = IL5FixedFxOnetime == null ? null : IL5FixedFxOnetime, //il5fixedfxonetime * (percent/100)
                    IL5FixedFxRecurring = IL5FixedFxRecurring == null ? null : IL5FixedFxRecurring, //il5fixedfxrecurring * (percent/100)
                    IL5FloatFxOnetime = IL5FloatFxOnetime == null ? null : IL5FloatFxOnetime, //il5floatfxonetime * (percent/100)
                    IL5FloatFxRecurring = IL5FloatFxRecurring == null ? null : IL5FloatFxRecurring, //il5floatfxrecurring * (percent/100)
                    IL4RROneTime = IL4RunRateOnetime == null ? null : IL4RunRateOnetime, //(il4runrateonetime * 10) * (percent/100)
                    IL4RRRecurring = IL4RunRateRecurring == null ? null : IL4RunRateRecurring, //il4runraterecurring * (percent/100)
                    IL5RROneTime = IL5RunRateOnetime == null ? null : IL5RunRateOnetime, //(il5runrateonetime * 10) * (percent/100) 
                    IL5RRRecurring = IL5RunRateRecurring == null ? null : IL5RunRateRecurring, //il5runraterecurring * (percent/100) 
                    TotalRROnetime = TotalOnetime == null ? null : TotalOnetime, //(totalonetime * 10) * (percent/100)
                    TotalRRRecurring = TotalRecurring == null ? null : TotalRecurring, //totalrecurring  * (percent/100)
                    TotalRRBlended = TotalRRBlended, //(totalrecurring + totalonetime)  * (percent/100)
                    OnetimeImplementationCost = costEstOpex + costEstCapex
                };
                await _context.ShareBenefitWorkstreams.AddAsync(shareBenefitDefault);
                await _context.SaveChangesAsync();
            }

            //firstRunrate
            //remove All old Data
            var ImpactTypeOfBenefitsList = await _context.ImpactTypeOfBenefits
                .Where(i => i.InitiativeId.Equals(impactTrackingCreate.InitiativeId)).ToListAsync();
            if (ImpactTypeOfBenefitsList.Count > 0)
            {
                foreach (var entity in ImpactTypeOfBenefitsList)
                    _context.ImpactTypeOfBenefits.Remove(entity);
                await _context.SaveChangesAsync();
            }

            //save First Runrate
            List<string> runrateType = new List<string> { "Target", "Revise", "Actual" };
            if (impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Count > 0)
            {
                foreach (var item in impactTrackingCreate.FirstRunRateForm.FirstRunRateTable)
                {
                    for (int i = 1; i <= 3; i++)
                    {
                        var impactTypeOfBenefit = new ImpactTypeOfBenefit();
                        switch (i)
                        {
                            case 1:
                                impactTypeOfBenefit.Id = 0;
                                impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRate";
                                impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                                impactTypeOfBenefit.InitiativeId = impactTrackingCreate.InitiativeId;
                                impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row1 : null;
                                impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row1 : null;
                                if (item.monthRows1 == null) break;
                                impactTypeOfBenefit.Month1 = item.monthRows1.Month1;
                                impactTypeOfBenefit.Month2 = item.monthRows1.Month2;
                                impactTypeOfBenefit.Month3 = item.monthRows1.Month3;
                                impactTypeOfBenefit.Month4 = item.monthRows1.Month4;
                                impactTypeOfBenefit.Month5 = item.monthRows1.Month5;
                                impactTypeOfBenefit.Month6 = item.monthRows1.Month6;
                                impactTypeOfBenefit.Month7 = item.monthRows1.Month7;
                                impactTypeOfBenefit.Month8 = item.monthRows1.Month8;
                                impactTypeOfBenefit.Month9 = item.monthRows1.Month9;
                                impactTypeOfBenefit.Month10 = item.monthRows1.Month10;
                                impactTypeOfBenefit.Month11 = item.monthRows1.Month11;
                                impactTypeOfBenefit.Month12 = item.monthRows1.Month12;
                                impactTypeOfBenefit.Month13 = item.monthRows1.Month13;
                                impactTypeOfBenefit.Month14 = item.monthRows1.Month14;
                                impactTypeOfBenefit.Month15 = item.monthRows1.Month15;
                                impactTypeOfBenefit.Month16 = item.monthRows1.Month16;
                                impactTypeOfBenefit.Month17 = item.monthRows1.Month17;
                                impactTypeOfBenefit.Month18 = item.monthRows1.Month18;
                                impactTypeOfBenefit.Month19 = item.monthRows1.Month19;
                                impactTypeOfBenefit.Month20 = item.monthRows1.Month20;
                                impactTypeOfBenefit.Month21 = item.monthRows1.Month21;
                                impactTypeOfBenefit.Month22 = item.monthRows1.Month22;
                                impactTypeOfBenefit.Month23 = item.monthRows1.Month23;
                                impactTypeOfBenefit.Month24 = item.monthRows1.Month24;
                                impactTypeOfBenefit.Month25 = item.monthRows1.Month25;
                                impactTypeOfBenefit.Month26 = item.monthRows1.Month26;
                                impactTypeOfBenefit.Month27 = item.monthRows1.Month27;
                                impactTypeOfBenefit.Month28 = item.monthRows1.Month28;
                                impactTypeOfBenefit.Month29 = item.monthRows1.Month29;
                                impactTypeOfBenefit.Month30 = item.monthRows1.Month30;
                                impactTypeOfBenefit.Month31 = item.monthRows1.Month31;
                                impactTypeOfBenefit.Month32 = item.monthRows1.Month32;
                                impactTypeOfBenefit.Month33 = item.monthRows1.Month33;
                                impactTypeOfBenefit.Month34 = item.monthRows1.Month34;
                                impactTypeOfBenefit.Month35 = item.monthRows1.Month35;
                                impactTypeOfBenefit.Month36 = item.monthRows1.Month36;
                                await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                                await _context.SaveChangesAsync();
                                break;
                            case 2:
                                impactTypeOfBenefit.Id = 0;
                                impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRate";
                                impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                                impactTypeOfBenefit.InitiativeId = impactTrackingCreate.InitiativeId;
                                impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row2 : null;
                                impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row2 : null;
                                if (item.monthRows2 == null) break;
                                impactTypeOfBenefit.Month1 = item.monthRows2.Month1;
                                impactTypeOfBenefit.Month2 = item.monthRows2.Month2;
                                impactTypeOfBenefit.Month3 = item.monthRows2.Month3;
                                impactTypeOfBenefit.Month4 = item.monthRows2.Month4;
                                impactTypeOfBenefit.Month5 = item.monthRows2.Month5;
                                impactTypeOfBenefit.Month6 = item.monthRows2.Month6;
                                impactTypeOfBenefit.Month7 = item.monthRows2.Month7;
                                impactTypeOfBenefit.Month8 = item.monthRows2.Month8;
                                impactTypeOfBenefit.Month9 = item.monthRows2.Month9;
                                impactTypeOfBenefit.Month10 = item.monthRows2.Month10;
                                impactTypeOfBenefit.Month11 = item.monthRows2.Month11;
                                impactTypeOfBenefit.Month12 = item.monthRows2.Month12;
                                impactTypeOfBenefit.Month13 = item.monthRows2.Month13;
                                impactTypeOfBenefit.Month14 = item.monthRows2.Month14;
                                impactTypeOfBenefit.Month15 = item.monthRows2.Month15;
                                impactTypeOfBenefit.Month16 = item.monthRows2.Month16;
                                impactTypeOfBenefit.Month17 = item.monthRows2.Month17;
                                impactTypeOfBenefit.Month18 = item.monthRows2.Month18;
                                impactTypeOfBenefit.Month19 = item.monthRows2.Month19;
                                impactTypeOfBenefit.Month20 = item.monthRows2.Month20;
                                impactTypeOfBenefit.Month21 = item.monthRows2.Month21;
                                impactTypeOfBenefit.Month22 = item.monthRows2.Month22;
                                impactTypeOfBenefit.Month23 = item.monthRows2.Month23;
                                impactTypeOfBenefit.Month24 = item.monthRows2.Month24;
                                impactTypeOfBenefit.Month25 = item.monthRows2.Month25;
                                impactTypeOfBenefit.Month26 = item.monthRows2.Month26;
                                impactTypeOfBenefit.Month27 = item.monthRows2.Month27;
                                impactTypeOfBenefit.Month28 = item.monthRows2.Month28;
                                impactTypeOfBenefit.Month29 = item.monthRows2.Month29;
                                impactTypeOfBenefit.Month30 = item.monthRows2.Month30;
                                impactTypeOfBenefit.Month31 = item.monthRows2.Month31;
                                impactTypeOfBenefit.Month32 = item.monthRows2.Month32;
                                impactTypeOfBenefit.Month33 = item.monthRows2.Month33;
                                impactTypeOfBenefit.Month34 = item.monthRows2.Month34;
                                impactTypeOfBenefit.Month35 = item.monthRows2.Month35;
                                impactTypeOfBenefit.Month36 = item.monthRows2.Month36;
                                await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                                await _context.SaveChangesAsync();
                                break;
                            case 3:
                                impactTypeOfBenefit.Id = 0;
                                impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRate";
                                impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                                impactTypeOfBenefit.InitiativeId = impactTrackingCreate.InitiativeId;
                                impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row3 : null;
                                impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row3 : null;
                                if (item.monthRows3 == null) break;
                                impactTypeOfBenefit.Month1 = item.monthRows3.Month1;
                                impactTypeOfBenefit.Month2 = item.monthRows3.Month2;
                                impactTypeOfBenefit.Month3 = item.monthRows3.Month3;
                                impactTypeOfBenefit.Month4 = item.monthRows3.Month4;
                                impactTypeOfBenefit.Month5 = item.monthRows3.Month5;
                                impactTypeOfBenefit.Month6 = item.monthRows3.Month6;
                                impactTypeOfBenefit.Month7 = item.monthRows3.Month7;
                                impactTypeOfBenefit.Month8 = item.monthRows3.Month8;
                                impactTypeOfBenefit.Month9 = item.monthRows3.Month9;
                                impactTypeOfBenefit.Month10 = item.monthRows3.Month10;
                                impactTypeOfBenefit.Month11 = item.monthRows3.Month11;
                                impactTypeOfBenefit.Month12 = item.monthRows3.Month12;
                                impactTypeOfBenefit.Month13 = item.monthRows3.Month13;
                                impactTypeOfBenefit.Month14 = item.monthRows3.Month14;
                                impactTypeOfBenefit.Month15 = item.monthRows3.Month15;
                                impactTypeOfBenefit.Month16 = item.monthRows3.Month16;
                                impactTypeOfBenefit.Month17 = item.monthRows3.Month17;
                                impactTypeOfBenefit.Month18 = item.monthRows3.Month18;
                                impactTypeOfBenefit.Month19 = item.monthRows3.Month19;
                                impactTypeOfBenefit.Month20 = item.monthRows3.Month20;
                                impactTypeOfBenefit.Month21 = item.monthRows3.Month21;
                                impactTypeOfBenefit.Month22 = item.monthRows3.Month22;
                                impactTypeOfBenefit.Month23 = item.monthRows3.Month23;
                                impactTypeOfBenefit.Month24 = item.monthRows3.Month24;
                                impactTypeOfBenefit.Month25 = item.monthRows3.Month25;
                                impactTypeOfBenefit.Month26 = item.monthRows3.Month26;
                                impactTypeOfBenefit.Month27 = item.monthRows3.Month27;
                                impactTypeOfBenefit.Month28 = item.monthRows3.Month28;
                                impactTypeOfBenefit.Month29 = item.monthRows3.Month29;
                                impactTypeOfBenefit.Month30 = item.monthRows3.Month30;
                                impactTypeOfBenefit.Month31 = item.monthRows3.Month31;
                                impactTypeOfBenefit.Month32 = item.monthRows3.Month32;
                                impactTypeOfBenefit.Month33 = item.monthRows3.Month33;
                                impactTypeOfBenefit.Month34 = item.monthRows3.Month34;
                                impactTypeOfBenefit.Month35 = item.monthRows3.Month35;
                                impactTypeOfBenefit.Month36 = item.monthRows3.Month36;
                                await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                                await _context.SaveChangesAsync();
                                break;
                        }
                    }
                }
            }


            //save first Runrate total
            if (impactTrackingCreate.FirstRunRateForm.FirstRunRateTable.Count > 0)
            {

                var item = impactTrackingCreate.FirstRunRateTotalForm;
                for (int i = 1; i <= 3; i++)
                {
                    var impactTypeOfBenefit = new ImpactTypeOfBenefit();
                    switch (i)
                    {
                        case 1:
                            impactTypeOfBenefit.Id = 0;
                            impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRateTotal";
                            impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                            impactTypeOfBenefit.InitiativeId = impactTrackingCreate.InitiativeId;
                            impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row1 : null;
                            impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row1 : null;
                            if (item.monthRows1 == null) break;
                            impactTypeOfBenefit.Month1 = item.monthRows1.Month1;
                            impactTypeOfBenefit.Month2 = item.monthRows1.Month2;
                            impactTypeOfBenefit.Month3 = item.monthRows1.Month3;
                            impactTypeOfBenefit.Month4 = item.monthRows1.Month4;
                            impactTypeOfBenefit.Month5 = item.monthRows1.Month5;
                            impactTypeOfBenefit.Month6 = item.monthRows1.Month6;
                            impactTypeOfBenefit.Month7 = item.monthRows1.Month7;
                            impactTypeOfBenefit.Month8 = item.monthRows1.Month8;
                            impactTypeOfBenefit.Month9 = item.monthRows1.Month9;
                            impactTypeOfBenefit.Month10 = item.monthRows1.Month10;
                            impactTypeOfBenefit.Month11 = item.monthRows1.Month11;
                            impactTypeOfBenefit.Month12 = item.monthRows1.Month12;
                            impactTypeOfBenefit.Month13 = item.monthRows1.Month13;
                            impactTypeOfBenefit.Month14 = item.monthRows1.Month14;
                            impactTypeOfBenefit.Month15 = item.monthRows1.Month15;
                            impactTypeOfBenefit.Month16 = item.monthRows1.Month16;
                            impactTypeOfBenefit.Month17 = item.monthRows1.Month17;
                            impactTypeOfBenefit.Month18 = item.monthRows1.Month18;
                            impactTypeOfBenefit.Month19 = item.monthRows1.Month19;
                            impactTypeOfBenefit.Month20 = item.monthRows1.Month20;
                            impactTypeOfBenefit.Month21 = item.monthRows1.Month21;
                            impactTypeOfBenefit.Month22 = item.monthRows1.Month22;
                            impactTypeOfBenefit.Month23 = item.monthRows1.Month23;
                            impactTypeOfBenefit.Month24 = item.monthRows1.Month24;
                            impactTypeOfBenefit.Month25 = item.monthRows1.Month25;
                            impactTypeOfBenefit.Month26 = item.monthRows1.Month26;
                            impactTypeOfBenefit.Month27 = item.monthRows1.Month27;
                            impactTypeOfBenefit.Month28 = item.monthRows1.Month28;
                            impactTypeOfBenefit.Month29 = item.monthRows1.Month29;
                            impactTypeOfBenefit.Month30 = item.monthRows1.Month30;
                            impactTypeOfBenefit.Month31 = item.monthRows1.Month31;
                            impactTypeOfBenefit.Month32 = item.monthRows1.Month32;
                            impactTypeOfBenefit.Month33 = item.monthRows1.Month33;
                            impactTypeOfBenefit.Month34 = item.monthRows1.Month34;
                            impactTypeOfBenefit.Month35 = item.monthRows1.Month35;
                            impactTypeOfBenefit.Month36 = item.monthRows1.Month36;
                            await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                            await _context.SaveChangesAsync();
                            break;
                        case 2:
                            impactTypeOfBenefit.Id = 0;
                            impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRateTotal";
                            impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                            impactTypeOfBenefit.InitiativeId = impactTrackingCreate.InitiativeId;
                            impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row2 : null;
                            impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row2 : null;
                            if (item.monthRows2 == null) break;
                            impactTypeOfBenefit.Month1 = item.monthRows2.Month1;
                            impactTypeOfBenefit.Month2 = item.monthRows2.Month2;
                            impactTypeOfBenefit.Month3 = item.monthRows2.Month3;
                            impactTypeOfBenefit.Month4 = item.monthRows2.Month4;
                            impactTypeOfBenefit.Month5 = item.monthRows2.Month5;
                            impactTypeOfBenefit.Month6 = item.monthRows2.Month6;
                            impactTypeOfBenefit.Month7 = item.monthRows2.Month7;
                            impactTypeOfBenefit.Month8 = item.monthRows2.Month8;
                            impactTypeOfBenefit.Month9 = item.monthRows2.Month9;
                            impactTypeOfBenefit.Month10 = item.monthRows2.Month10;
                            impactTypeOfBenefit.Month11 = item.monthRows2.Month11;
                            impactTypeOfBenefit.Month12 = item.monthRows2.Month12;
                            impactTypeOfBenefit.Month13 = item.monthRows2.Month13;
                            impactTypeOfBenefit.Month14 = item.monthRows2.Month14;
                            impactTypeOfBenefit.Month15 = item.monthRows2.Month15;
                            impactTypeOfBenefit.Month16 = item.monthRows2.Month16;
                            impactTypeOfBenefit.Month17 = item.monthRows2.Month17;
                            impactTypeOfBenefit.Month18 = item.monthRows2.Month18;
                            impactTypeOfBenefit.Month19 = item.monthRows2.Month19;
                            impactTypeOfBenefit.Month20 = item.monthRows2.Month20;
                            impactTypeOfBenefit.Month21 = item.monthRows2.Month21;
                            impactTypeOfBenefit.Month22 = item.monthRows2.Month22;
                            impactTypeOfBenefit.Month23 = item.monthRows2.Month23;
                            impactTypeOfBenefit.Month24 = item.monthRows2.Month24;
                            impactTypeOfBenefit.Month25 = item.monthRows2.Month25;
                            impactTypeOfBenefit.Month26 = item.monthRows2.Month26;
                            impactTypeOfBenefit.Month27 = item.monthRows2.Month27;
                            impactTypeOfBenefit.Month28 = item.monthRows2.Month28;
                            impactTypeOfBenefit.Month29 = item.monthRows2.Month29;
                            impactTypeOfBenefit.Month30 = item.monthRows2.Month30;
                            impactTypeOfBenefit.Month31 = item.monthRows2.Month31;
                            impactTypeOfBenefit.Month32 = item.monthRows2.Month32;
                            impactTypeOfBenefit.Month33 = item.monthRows2.Month33;
                            impactTypeOfBenefit.Month34 = item.monthRows2.Month34;
                            impactTypeOfBenefit.Month35 = item.monthRows2.Month35;
                            impactTypeOfBenefit.Month36 = item.monthRows2.Month36;
                            await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                            await _context.SaveChangesAsync();
                            break;
                        case 3:
                            impactTypeOfBenefit.Id = 0;
                            impactTypeOfBenefit.ImpactTypeOfBenefitTable = "FirstRunRateTotal";
                            impactTypeOfBenefit.TypeOfBenefit = item.TypeOfBenefit;
                            impactTypeOfBenefit.InitiativeId = impactTrackingCreate.InitiativeId;
                            impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row3 : null;
                            impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row3 : null;
                            if (item.monthRows3 == null) break;
                            impactTypeOfBenefit.Month1 = item.monthRows3.Month1;
                            impactTypeOfBenefit.Month2 = item.monthRows3.Month2;
                            impactTypeOfBenefit.Month3 = item.monthRows3.Month3;
                            impactTypeOfBenefit.Month4 = item.monthRows3.Month4;
                            impactTypeOfBenefit.Month5 = item.monthRows3.Month5;
                            impactTypeOfBenefit.Month6 = item.monthRows3.Month6;
                            impactTypeOfBenefit.Month7 = item.monthRows3.Month7;
                            impactTypeOfBenefit.Month8 = item.monthRows3.Month8;
                            impactTypeOfBenefit.Month9 = item.monthRows3.Month9;
                            impactTypeOfBenefit.Month10 = item.monthRows3.Month10;
                            impactTypeOfBenefit.Month11 = item.monthRows3.Month11;
                            impactTypeOfBenefit.Month12 = item.monthRows3.Month12;
                            impactTypeOfBenefit.Month13 = item.monthRows3.Month13;
                            impactTypeOfBenefit.Month14 = item.monthRows3.Month14;
                            impactTypeOfBenefit.Month15 = item.monthRows3.Month15;
                            impactTypeOfBenefit.Month16 = item.monthRows3.Month16;
                            impactTypeOfBenefit.Month17 = item.monthRows3.Month17;
                            impactTypeOfBenefit.Month18 = item.monthRows3.Month18;
                            impactTypeOfBenefit.Month19 = item.monthRows3.Month19;
                            impactTypeOfBenefit.Month20 = item.monthRows3.Month20;
                            impactTypeOfBenefit.Month21 = item.monthRows3.Month21;
                            impactTypeOfBenefit.Month22 = item.monthRows3.Month22;
                            impactTypeOfBenefit.Month23 = item.monthRows3.Month23;
                            impactTypeOfBenefit.Month24 = item.monthRows3.Month24;
                            impactTypeOfBenefit.Month25 = item.monthRows3.Month25;
                            impactTypeOfBenefit.Month26 = item.monthRows3.Month26;
                            impactTypeOfBenefit.Month27 = item.monthRows3.Month27;
                            impactTypeOfBenefit.Month28 = item.monthRows3.Month28;
                            impactTypeOfBenefit.Month29 = item.monthRows3.Month29;
                            impactTypeOfBenefit.Month30 = item.monthRows3.Month30;
                            impactTypeOfBenefit.Month31 = item.monthRows3.Month31;
                            impactTypeOfBenefit.Month32 = item.monthRows3.Month32;
                            impactTypeOfBenefit.Month33 = item.monthRows3.Month33;
                            impactTypeOfBenefit.Month34 = item.monthRows3.Month34;
                            impactTypeOfBenefit.Month35 = item.monthRows3.Month35;
                            impactTypeOfBenefit.Month36 = item.monthRows3.Month36;
                            await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                            await _context.SaveChangesAsync();
                            break;
                    }

                }
            }


            //TypeOfBenefit

            //save TypeOfBenefit
            if (impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Count > 0)
            {
                foreach (var item in impactTrackingCreate.TypeBenefitForm.TypeBenefitTable)
                {
                    for (int i = 1; i <= 2; i++)
                    {
                        var impactTypeOfBenefit = new ImpactTypeOfBenefit
                        {
                            Id = 0,
                            ImpactTypeOfBenefitTable = "TypeBenefit",
                            TypeOfBenefit = item.TypeOfBenefit,
                            InitiativeId = impactTrackingCreate.InitiativeId
                        };

                        switch (i)
                        {
                            case 1:
                                impactTypeOfBenefit.VersionPrice = "FixedFX";
                                impactTypeOfBenefit.currencyFloatFx = item.CurrencyFloatFx;
                                impactTypeOfBenefit.FixedFX = item.VersionPrice != null ? item.VersionPrice.Row1 : null;
                                impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row1 : null;
                                if (item.monthRows1 == null) break;
                                impactTypeOfBenefit.Month1 = item.monthRows1.Month1;
                                impactTypeOfBenefit.Month2 = item.monthRows1.Month2;
                                impactTypeOfBenefit.Month3 = item.monthRows1.Month3;
                                impactTypeOfBenefit.Month4 = item.monthRows1.Month4;
                                impactTypeOfBenefit.Month5 = item.monthRows1.Month5;
                                impactTypeOfBenefit.Month6 = item.monthRows1.Month6;
                                impactTypeOfBenefit.Month7 = item.monthRows1.Month7;
                                impactTypeOfBenefit.Month8 = item.monthRows1.Month8;
                                impactTypeOfBenefit.Month9 = item.monthRows1.Month9;
                                impactTypeOfBenefit.Month10 = item.monthRows1.Month10;
                                impactTypeOfBenefit.Month11 = item.monthRows1.Month11;
                                impactTypeOfBenefit.Month12 = item.monthRows1.Month12;
                                impactTypeOfBenefit.Month13 = item.monthRows1.Month13;
                                impactTypeOfBenefit.Month14 = item.monthRows1.Month14;
                                impactTypeOfBenefit.Month15 = item.monthRows1.Month15;
                                impactTypeOfBenefit.Month16 = item.monthRows1.Month16;
                                impactTypeOfBenefit.Month17 = item.monthRows1.Month17;
                                impactTypeOfBenefit.Month18 = item.monthRows1.Month18;
                                impactTypeOfBenefit.Month19 = item.monthRows1.Month19;
                                impactTypeOfBenefit.Month20 = item.monthRows1.Month20;
                                impactTypeOfBenefit.Month21 = item.monthRows1.Month21;
                                impactTypeOfBenefit.Month22 = item.monthRows1.Month22;
                                impactTypeOfBenefit.Month23 = item.monthRows1.Month23;
                                impactTypeOfBenefit.Month24 = item.monthRows1.Month24;
                                impactTypeOfBenefit.Month25 = item.monthRows1.Month25;
                                impactTypeOfBenefit.Month26 = item.monthRows1.Month26;
                                impactTypeOfBenefit.Month27 = item.monthRows1.Month27;
                                impactTypeOfBenefit.Month28 = item.monthRows1.Month28;
                                impactTypeOfBenefit.Month29 = item.monthRows1.Month29;
                                impactTypeOfBenefit.Month30 = item.monthRows1.Month30;
                                impactTypeOfBenefit.Month31 = item.monthRows1.Month31;
                                impactTypeOfBenefit.Month32 = item.monthRows1.Month32;
                                impactTypeOfBenefit.Month33 = item.monthRows1.Month33;
                                impactTypeOfBenefit.Month34 = item.monthRows1.Month34;
                                impactTypeOfBenefit.Month35 = item.monthRows1.Month35;
                                impactTypeOfBenefit.Month36 = item.monthRows1.Month36;
                                break;
                            case 2:
                                impactTypeOfBenefit.VersionPrice = "FloatFX";
                                impactTypeOfBenefit.currencyFloatFx = null;
                                impactTypeOfBenefit.FixedFX = item.VersionPrice != null ? item.VersionPrice.Row2 : null;
                                impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row2 : null;
                                if (item.monthRows2 == null) break;
                                impactTypeOfBenefit.Month1 = item.monthRows2.Month1;
                                impactTypeOfBenefit.Month2 = item.monthRows2.Month2;
                                impactTypeOfBenefit.Month3 = item.monthRows2.Month3;
                                impactTypeOfBenefit.Month4 = item.monthRows2.Month4;
                                impactTypeOfBenefit.Month5 = item.monthRows2.Month5;
                                impactTypeOfBenefit.Month6 = item.monthRows2.Month6;
                                impactTypeOfBenefit.Month7 = item.monthRows2.Month7;
                                impactTypeOfBenefit.Month8 = item.monthRows2.Month8;
                                impactTypeOfBenefit.Month9 = item.monthRows2.Month9;
                                impactTypeOfBenefit.Month10 = item.monthRows2.Month10;
                                impactTypeOfBenefit.Month11 = item.monthRows2.Month11;
                                impactTypeOfBenefit.Month12 = item.monthRows2.Month12;
                                impactTypeOfBenefit.Month13 = item.monthRows2.Month13;
                                impactTypeOfBenefit.Month14 = item.monthRows2.Month14;
                                impactTypeOfBenefit.Month15 = item.monthRows2.Month15;
                                impactTypeOfBenefit.Month16 = item.monthRows2.Month16;
                                impactTypeOfBenefit.Month17 = item.monthRows2.Month17;
                                impactTypeOfBenefit.Month18 = item.monthRows2.Month18;
                                impactTypeOfBenefit.Month19 = item.monthRows2.Month19;
                                impactTypeOfBenefit.Month20 = item.monthRows2.Month20;
                                impactTypeOfBenefit.Month21 = item.monthRows2.Month21;
                                impactTypeOfBenefit.Month22 = item.monthRows2.Month22;
                                impactTypeOfBenefit.Month23 = item.monthRows2.Month23;
                                impactTypeOfBenefit.Month24 = item.monthRows2.Month24;
                                impactTypeOfBenefit.Month25 = item.monthRows2.Month25;
                                impactTypeOfBenefit.Month26 = item.monthRows2.Month26;
                                impactTypeOfBenefit.Month27 = item.monthRows2.Month27;
                                impactTypeOfBenefit.Month28 = item.monthRows2.Month28;
                                impactTypeOfBenefit.Month29 = item.monthRows2.Month29;
                                impactTypeOfBenefit.Month30 = item.monthRows2.Month30;
                                impactTypeOfBenefit.Month31 = item.monthRows2.Month31;
                                impactTypeOfBenefit.Month32 = item.monthRows2.Month32;
                                impactTypeOfBenefit.Month33 = item.monthRows2.Month33;
                                impactTypeOfBenefit.Month34 = item.monthRows2.Month34;
                                impactTypeOfBenefit.Month35 = item.monthRows2.Month35;
                                impactTypeOfBenefit.Month36 = item.monthRows2.Month36;
                                break;
                        }
                        await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                        await _context.SaveChangesAsync();
                    }
                }

            }

            //save TypeOfBenefit Total
            if (impactTrackingCreate.TypeBenefitForm.TypeBenefitTable.Count > 0)
            {
                var typeBenefitTotalForm = impactTrackingCreate.TypeBenefitTotalForm;
                for (int i = 1; i <= 2; i++)
                {
                    var impactTypeOfBenefit = new ImpactTypeOfBenefit
                    {
                        Id = 0,
                        ImpactTypeOfBenefitTable = "TypeBenefitTotal",
                        TypeOfBenefit = typeBenefitTotalForm.TypeOfBenefit,
                        InitiativeId = impactTrackingCreate.InitiativeId
                    };

                    switch (i)
                    {
                        case 1:
                            impactTypeOfBenefit.VersionPrice = "FixedFX";
                            impactTypeOfBenefit.currencyFloatFx = typeBenefitTotalForm.CurrencyFloatFx;
                            impactTypeOfBenefit.FixedFX = typeBenefitTotalForm.VersionPrice != null ? typeBenefitTotalForm.VersionPrice.Row1 : null;
                            impactTypeOfBenefit.RunRate = typeBenefitTotalForm.RunRate != null ? typeBenefitTotalForm.RunRate.Row1 : null;
                            if (typeBenefitTotalForm.monthRows1 == null) break;
                            impactTypeOfBenefit.Month1 = typeBenefitTotalForm.monthRows1.Month1;
                            impactTypeOfBenefit.Month2 = typeBenefitTotalForm.monthRows1.Month2;
                            impactTypeOfBenefit.Month3 = typeBenefitTotalForm.monthRows1.Month3;
                            impactTypeOfBenefit.Month4 = typeBenefitTotalForm.monthRows1.Month4;
                            impactTypeOfBenefit.Month5 = typeBenefitTotalForm.monthRows1.Month5;
                            impactTypeOfBenefit.Month6 = typeBenefitTotalForm.monthRows1.Month6;
                            impactTypeOfBenefit.Month7 = typeBenefitTotalForm.monthRows1.Month7;
                            impactTypeOfBenefit.Month8 = typeBenefitTotalForm.monthRows1.Month8;
                            impactTypeOfBenefit.Month9 = typeBenefitTotalForm.monthRows1.Month9;
                            impactTypeOfBenefit.Month10 = typeBenefitTotalForm.monthRows1.Month10;
                            impactTypeOfBenefit.Month11 = typeBenefitTotalForm.monthRows1.Month11;
                            impactTypeOfBenefit.Month12 = typeBenefitTotalForm.monthRows1.Month12;
                            impactTypeOfBenefit.Month13 = typeBenefitTotalForm.monthRows1.Month13;
                            impactTypeOfBenefit.Month14 = typeBenefitTotalForm.monthRows1.Month14;
                            impactTypeOfBenefit.Month15 = typeBenefitTotalForm.monthRows1.Month15;
                            impactTypeOfBenefit.Month16 = typeBenefitTotalForm.monthRows1.Month16;
                            impactTypeOfBenefit.Month17 = typeBenefitTotalForm.monthRows1.Month17;
                            impactTypeOfBenefit.Month18 = typeBenefitTotalForm.monthRows1.Month18;
                            impactTypeOfBenefit.Month19 = typeBenefitTotalForm.monthRows1.Month19;
                            impactTypeOfBenefit.Month20 = typeBenefitTotalForm.monthRows1.Month20;
                            impactTypeOfBenefit.Month21 = typeBenefitTotalForm.monthRows1.Month21;
                            impactTypeOfBenefit.Month22 = typeBenefitTotalForm.monthRows1.Month22;
                            impactTypeOfBenefit.Month23 = typeBenefitTotalForm.monthRows1.Month23;
                            impactTypeOfBenefit.Month24 = typeBenefitTotalForm.monthRows1.Month24;
                            impactTypeOfBenefit.Month25 = typeBenefitTotalForm.monthRows1.Month25;
                            impactTypeOfBenefit.Month26 = typeBenefitTotalForm.monthRows1.Month26;
                            impactTypeOfBenefit.Month27 = typeBenefitTotalForm.monthRows1.Month27;
                            impactTypeOfBenefit.Month28 = typeBenefitTotalForm.monthRows1.Month28;
                            impactTypeOfBenefit.Month29 = typeBenefitTotalForm.monthRows1.Month29;
                            impactTypeOfBenefit.Month30 = typeBenefitTotalForm.monthRows1.Month30;
                            impactTypeOfBenefit.Month31 = typeBenefitTotalForm.monthRows1.Month31;
                            impactTypeOfBenefit.Month32 = typeBenefitTotalForm.monthRows1.Month32;
                            impactTypeOfBenefit.Month33 = typeBenefitTotalForm.monthRows1.Month33;
                            impactTypeOfBenefit.Month34 = typeBenefitTotalForm.monthRows1.Month34;
                            impactTypeOfBenefit.Month35 = typeBenefitTotalForm.monthRows1.Month35;
                            impactTypeOfBenefit.Month36 = typeBenefitTotalForm.monthRows1.Month36;
                            break;
                        case 2:
                            impactTypeOfBenefit.VersionPrice = "FloatFX";
                            impactTypeOfBenefit.currencyFloatFx = null;
                            impactTypeOfBenefit.FixedFX = typeBenefitTotalForm.VersionPrice != null ? typeBenefitTotalForm.VersionPrice.Row2 : null;
                            impactTypeOfBenefit.RunRate = typeBenefitTotalForm.RunRate != null ? typeBenefitTotalForm.RunRate.Row2 : null;
                            if (typeBenefitTotalForm.monthRows2 == null) break;
                            impactTypeOfBenefit.Month1 = typeBenefitTotalForm.monthRows2.Month1;
                            impactTypeOfBenefit.Month2 = typeBenefitTotalForm.monthRows2.Month2;
                            impactTypeOfBenefit.Month3 = typeBenefitTotalForm.monthRows2.Month3;
                            impactTypeOfBenefit.Month4 = typeBenefitTotalForm.monthRows2.Month4;
                            impactTypeOfBenefit.Month5 = typeBenefitTotalForm.monthRows2.Month5;
                            impactTypeOfBenefit.Month6 = typeBenefitTotalForm.monthRows2.Month6;
                            impactTypeOfBenefit.Month7 = typeBenefitTotalForm.monthRows2.Month7;
                            impactTypeOfBenefit.Month8 = typeBenefitTotalForm.monthRows2.Month8;
                            impactTypeOfBenefit.Month9 = typeBenefitTotalForm.monthRows2.Month9;
                            impactTypeOfBenefit.Month10 = typeBenefitTotalForm.monthRows2.Month10;
                            impactTypeOfBenefit.Month11 = typeBenefitTotalForm.monthRows2.Month11;
                            impactTypeOfBenefit.Month12 = typeBenefitTotalForm.monthRows2.Month12;
                            impactTypeOfBenefit.Month13 = typeBenefitTotalForm.monthRows2.Month13;
                            impactTypeOfBenefit.Month14 = typeBenefitTotalForm.monthRows2.Month14;
                            impactTypeOfBenefit.Month15 = typeBenefitTotalForm.monthRows2.Month15;
                            impactTypeOfBenefit.Month16 = typeBenefitTotalForm.monthRows2.Month16;
                            impactTypeOfBenefit.Month17 = typeBenefitTotalForm.monthRows2.Month17;
                            impactTypeOfBenefit.Month18 = typeBenefitTotalForm.monthRows2.Month18;
                            impactTypeOfBenefit.Month19 = typeBenefitTotalForm.monthRows2.Month19;
                            impactTypeOfBenefit.Month20 = typeBenefitTotalForm.monthRows2.Month20;
                            impactTypeOfBenefit.Month21 = typeBenefitTotalForm.monthRows2.Month21;
                            impactTypeOfBenefit.Month22 = typeBenefitTotalForm.monthRows2.Month22;
                            impactTypeOfBenefit.Month23 = typeBenefitTotalForm.monthRows2.Month23;
                            impactTypeOfBenefit.Month24 = typeBenefitTotalForm.monthRows2.Month24;
                            impactTypeOfBenefit.Month25 = typeBenefitTotalForm.monthRows2.Month25;
                            impactTypeOfBenefit.Month26 = typeBenefitTotalForm.monthRows2.Month26;
                            impactTypeOfBenefit.Month27 = typeBenefitTotalForm.monthRows2.Month27;
                            impactTypeOfBenefit.Month28 = typeBenefitTotalForm.monthRows2.Month28;
                            impactTypeOfBenefit.Month29 = typeBenefitTotalForm.monthRows2.Month29;
                            impactTypeOfBenefit.Month30 = typeBenefitTotalForm.monthRows2.Month30;
                            impactTypeOfBenefit.Month31 = typeBenefitTotalForm.monthRows2.Month31;
                            impactTypeOfBenefit.Month32 = typeBenefitTotalForm.monthRows2.Month32;
                            impactTypeOfBenefit.Month33 = typeBenefitTotalForm.monthRows2.Month33;
                            impactTypeOfBenefit.Month34 = typeBenefitTotalForm.monthRows2.Month34;
                            impactTypeOfBenefit.Month35 = typeBenefitTotalForm.monthRows2.Month35;
                            impactTypeOfBenefit.Month36 = typeBenefitTotalForm.monthRows2.Month36;
                            break;
                    }
                    await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                    await _context.SaveChangesAsync();
                }

            }


            //indirect 
            //save indirect
            if (impactTrackingCreate.IndirectBenefit && impactTrackingCreate.IndirectForm.IndirectTable.Count > 0)
            {
                foreach (var item in impactTrackingCreate.IndirectForm.IndirectTable)
                {
                    for (int i = 1; i <= 2; i++)
                    {
                        var impactTypeOfBenefit = new ImpactTypeOfBenefit
                        {
                            Id = 0,
                            ImpactTypeOfBenefitTable = "IndirectBenefit",
                            TypeOfBenefit = item.TypeOfBenefit,
                            InitiativeId = impactTrackingCreate.InitiativeId
                        };
                        switch (i)
                        {
                            case 1:
                                impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row1 : null;
                                impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row1 : null;
                                break;
                            case 2:
                                impactTypeOfBenefit.VersionPrice = item.VersionPrice != null ? item.VersionPrice.Row2 : null;
                                impactTypeOfBenefit.RunRate = item.RunRate != null ? item.RunRate.Row2 : null;
                                break;
                        }
                        await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                        await _context.SaveChangesAsync();
                    }
                }
            }

            //ImpiemantCost
            //save ImpiemantCost
            if (impactTrackingCreate.ImpiemantCost)
            {
                for (int i = 1; i <= 2; i++)
                {
                    var impactTypeOfBenefit = new ImpactTypeOfBenefit
                    {
                        Id = 0,
                        ImpactTypeOfBenefitTable = "ImpiemantCost",
                        TypeOfBenefit = impactTrackingCreate.ImpiemantCostForm.TypeOfBenefit,
                        InitiativeId = impactTrackingCreate.InitiativeId
                    };

                    switch (i)
                    {
                        case 1:
                            impactTypeOfBenefit.VersionPrice = impactTrackingCreate.ImpiemantCostForm.VersionPrice != null ? impactTrackingCreate.ImpiemantCostForm.VersionPrice.Row1 : null;
                            impactTypeOfBenefit.RunRate = impactTrackingCreate.ImpiemantCostForm.RunRate != null ? impactTrackingCreate.ImpiemantCostForm.RunRate.Row1 : null;
                            if (impactTrackingCreate.ImpiemantCostForm.monthRows1 == null) break;
                            impactTypeOfBenefit.Month1 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month1;
                            impactTypeOfBenefit.Month2 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month2;
                            impactTypeOfBenefit.Month3 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month3;
                            impactTypeOfBenefit.Month4 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month4;
                            impactTypeOfBenefit.Month5 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month5;
                            impactTypeOfBenefit.Month6 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month6;
                            impactTypeOfBenefit.Month7 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month7;
                            impactTypeOfBenefit.Month8 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month8;
                            impactTypeOfBenefit.Month9 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month9;
                            impactTypeOfBenefit.Month10 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month10;
                            impactTypeOfBenefit.Month11 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month11;
                            impactTypeOfBenefit.Month12 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month12;
                            impactTypeOfBenefit.Month13 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month13;
                            impactTypeOfBenefit.Month14 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month14;
                            impactTypeOfBenefit.Month15 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month15;
                            impactTypeOfBenefit.Month16 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month16;
                            impactTypeOfBenefit.Month17 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month17;
                            impactTypeOfBenefit.Month18 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month18;
                            impactTypeOfBenefit.Month19 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month19;
                            impactTypeOfBenefit.Month20 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month20;
                            impactTypeOfBenefit.Month21 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month21;
                            impactTypeOfBenefit.Month22 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month22;
                            impactTypeOfBenefit.Month23 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month23;
                            impactTypeOfBenefit.Month24 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month24;
                            impactTypeOfBenefit.Month25 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month25;
                            impactTypeOfBenefit.Month26 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month26;
                            impactTypeOfBenefit.Month27 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month27;
                            impactTypeOfBenefit.Month28 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month28;
                            impactTypeOfBenefit.Month29 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month29;
                            impactTypeOfBenefit.Month30 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month30;
                            impactTypeOfBenefit.Month31 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month31;
                            impactTypeOfBenefit.Month32 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month32;
                            impactTypeOfBenefit.Month33 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month33;
                            impactTypeOfBenefit.Month34 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month34;
                            impactTypeOfBenefit.Month35 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month35;
                            impactTypeOfBenefit.Month36 = impactTrackingCreate.ImpiemantCostForm.monthRows1.Month36;
                            break;
                        case 2:
                            impactTypeOfBenefit.VersionPrice = impactTrackingCreate.ImpiemantCostForm.VersionPrice != null ? impactTrackingCreate.ImpiemantCostForm.VersionPrice.Row2 : null;
                            impactTypeOfBenefit.RunRate = impactTrackingCreate.ImpiemantCostForm.RunRate != null ? impactTrackingCreate.ImpiemantCostForm.RunRate.Row2 : null;
                            if (impactTrackingCreate.ImpiemantCostForm.monthRows2 == null) break;
                            impactTypeOfBenefit.Month1 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month1;
                            impactTypeOfBenefit.Month2 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month2;
                            impactTypeOfBenefit.Month3 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month3;
                            impactTypeOfBenefit.Month4 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month4;
                            impactTypeOfBenefit.Month5 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month5;
                            impactTypeOfBenefit.Month6 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month6;
                            impactTypeOfBenefit.Month7 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month7;
                            impactTypeOfBenefit.Month8 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month8;
                            impactTypeOfBenefit.Month9 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month9;
                            impactTypeOfBenefit.Month10 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month10;
                            impactTypeOfBenefit.Month11 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month11;
                            impactTypeOfBenefit.Month12 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month12;
                            impactTypeOfBenefit.Month13 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month13;
                            impactTypeOfBenefit.Month14 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month14;
                            impactTypeOfBenefit.Month15 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month15;
                            impactTypeOfBenefit.Month16 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month16;
                            impactTypeOfBenefit.Month17 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month17;
                            impactTypeOfBenefit.Month18 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month18;
                            impactTypeOfBenefit.Month19 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month19;
                            impactTypeOfBenefit.Month20 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month20;
                            impactTypeOfBenefit.Month21 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month21;
                            impactTypeOfBenefit.Month22 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month22;
                            impactTypeOfBenefit.Month23 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month23;
                            impactTypeOfBenefit.Month24 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month24;
                            impactTypeOfBenefit.Month25 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month25;
                            impactTypeOfBenefit.Month26 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month26;
                            impactTypeOfBenefit.Month27 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month27;
                            impactTypeOfBenefit.Month28 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month28;
                            impactTypeOfBenefit.Month29 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month29;
                            impactTypeOfBenefit.Month30 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month30;
                            impactTypeOfBenefit.Month31 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month31;
                            impactTypeOfBenefit.Month32 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month32;
                            impactTypeOfBenefit.Month33 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month33;
                            impactTypeOfBenefit.Month34 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month34;
                            impactTypeOfBenefit.Month35 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month35;
                            impactTypeOfBenefit.Month36 = impactTrackingCreate.ImpiemantCostForm.monthRows2.Month36;
                            break;
                    }
                    await _context.ImpactTypeOfBenefits.AddAsync(impactTypeOfBenefit);
                    await _context.SaveChangesAsync();
                }
            }
            await _context.SaveChangesAsync();
            return impactTrackingCreate;
        }

    }
}

public static class ConvertMethod
{
    public static decimal? Round(decimal? dt)
    {
        if (dt != null)
        {
            decimal returnValue = dt ?? 0;
            return decimal.Round(returnValue, 3);
        }
        else
        {
            return (decimal?)null;
        }
    }
}