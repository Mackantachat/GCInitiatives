using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Outstanding;
using PTT_GC_API.Models.Outstanding;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class OutstandingRepository : IOutstandingRepository
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public OutstandingRepository(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public bool DeleteOutstandingByInitiativeId(int initiativeId)
        {
            var outstanding = _context.Outstandings.Where(x => x.InitiativeId == initiativeId).ToList();
            foreach (var item in outstanding)
            {
                item.IsDeleted = true;
            }

            var removeOutstanding = _context.OutstandingData.Where(x => x.InitiativeId == initiativeId).ToList();

            foreach (var item in removeOutstanding)
            {
                item.IsDeleted = true;
            }
            _context.SaveChanges();

            return true;
        }

        public bool DeleteOutstandingDataById(int id)
        {
            var remove = _context.OutstandingData.FirstOrDefault(x => x.Id == id);
            remove.IsDeleted = true;
            _context.SaveChanges();
            return true;
        }

        public bool DeleteOutstandingModel(OutstandingForm outstandingFrontModel)
        {
            throw new NotImplementedException();
        }

        public OutstandingForm GetOutstandingForm(int initiativeId, int year, int month)
        {
            var outstanding = _context.Outstandings.Where(x => x.InitiativeId == initiativeId && x.Year == year && x.Month == month).ToList();
            if (outstanding != null)
            {
                OutstandingForm model = new OutstandingForm();
                for (int i = 0; i < outstanding.Count; i++)
                {
                    //model.Add(new OutstandingForm
                    //{
                    //    OutstandingForm = _mapper.Map<OutstandingForm>(outstanding[i])
                    //});


                    model.InitiativeId = outstanding[0].InitiativeId;
                    model.Year = outstanding[0].Year;
                    model.Month = outstanding[0].Month.ToString();
                    model.BudgetBaht = outstanding[0].BudgetBaht;
                    model.ActualBaht = outstanding[0].ActualBaht;
                    model.PrItemBaht = outstanding[0].PrItemBaht;
                    model.PoItemBaht = outstanding[0].PoItemBaht;
                    model.CommitmentBaht = outstanding[0].CommitmentBaht;
                    model.Contingency = outstanding[0].Contingency;
                    model.EstimateAtCompletion = outstanding[0].EstimateAtCompletion;

                    model.OutstandingFormArray = _context.OutstandingData.Where(x => x.InitiativeId == initiativeId
                                                                                                    && x.Month == outstanding[i].Month
                                                                                                    && x.Year == outstanding[i].Year).ToList();
                }
                return model;
            }
            return null;
        }

        public List<OutstandingForm> GetAllOutstanding(int initiativeId)
        {
            var outstanding = _context.Outstandings.Where(x => x.InitiativeId == initiativeId).ToList();
            if (outstanding != null)
            {
                List<OutstandingForm> modelList = new List<OutstandingForm>();

                for (int i = 0; i < outstanding.Count; i++)
                {
                    OutstandingForm model = new OutstandingForm();
                    //model.Add(new OutstandingForm
                    //{
                    //    OutstandingForm = _mapper.Map<OutstandingForm>(outstanding[i])
                    //});


                    model.InitiativeId = outstanding[i].InitiativeId;
                    model.Year = outstanding[i].Year;
                    model.Month = outstanding[i].Month.ToString();
                    model.BudgetBaht = outstanding[i].BudgetBaht;
                    model.ActualBaht = outstanding[i].ActualBaht;
                    model.PrItemBaht = outstanding[i].PrItemBaht;
                    model.PoItemBaht = outstanding[i].PoItemBaht;
                    model.CommitmentBaht = outstanding[i].CommitmentBaht;
                    model.Contingency = outstanding[i].Contingency;
                    model.EstimateAtCompletion = outstanding[i].EstimateAtCompletion;

                    model.OutstandingFormArray = _context.OutstandingData.Where(x => x.InitiativeId == initiativeId
                                                                                                    && x.Month == outstanding[i].Month
                                                                                                    && x.Year == outstanding[i].Year).ToList();

                    modelList.Add(model);
                }
                return modelList;
            }
            return null;
        }

        public List<OutstandingYear> GetOutstandingFormByYear(int initiativeId, int year)
        {
            var outstanding = _context.Outstandings.Where(x => x.InitiativeId == initiativeId && x.Year == year).ToList();
            var outstandingData = _context.OutstandingData.Where(x => x.InitiativeId == initiativeId && x.Year == year).ToList();
            if (outstanding.Any())
            {
                List<OutstandingYear> model = new List<OutstandingYear>();
                foreach (var item in outstanding)
                {
                    if (item.Month != 0)
                    {
                        model.Add(new OutstandingYear
                        {
                            //Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName((int)item.Month) + " - " + (item.Year),//(item.Year) + "-" + item.Month,
                            Month = item.Month.ToString(),
                            BudgetBaht = item.BudgetBaht,
                            ActualBaht = item.ActualBaht,
                            PrItemBaht = item.PrItemBaht,
                            PoItemBaht = item.PoItemBaht,
                            CommitmentBaht = item.CommitmentBaht,
                            ItemListValueBaht = outstandingData.Where(x => x.Month == item.Month).Sum(x => x.ItemListValueBaht),
                            RpcValueBaht = outstandingData.Where(x => x.Month == item.Month).Sum(x => x.RpcValueBaht),
                            OutStanding = outstandingData.Where(x => x.Month == item.Month).Sum(x => x.Outstanding),
                            Contingency = item.Contingency,
                            EstimateAtCompletion = item.EstimateAtCompletion,
                        });
                    }
                }
                return model;
            }
            return null;
        }

        public bool InsertOutstandingModel(OutstandingForm outstandingFrontModel)
        {
            // Remove
            var getOutstandingByInitiativeId = _context.Outstandings.Where(x => x.InitiativeId == outstandingFrontModel.InitiativeId
            && x.Year == outstandingFrontModel.Year && x.Month == int.Parse(outstandingFrontModel.Month)).ToList();
            if (getOutstandingByInitiativeId.Count > 0)
            {
                foreach (var item in getOutstandingByInitiativeId)
                {
                    _context.Outstandings.Remove(item);
                }
                _context.SaveChanges();
            }

            var outstanding = _mapper.Map<OutstandingModel>(outstandingFrontModel);
            outstanding.Id = 0;
            _context.Outstandings.Add(outstanding);
            _context.SaveChanges();

            // Remove
            var getOutstandingDataByInitiativeId = _context.OutstandingData.Where(x => x.InitiativeId == outstandingFrontModel.InitiativeId
            && x.Year == outstandingFrontModel.Year && x.Month == int.Parse(outstandingFrontModel.Month)).ToList();
            if (getOutstandingDataByInitiativeId.Count > 0)
            {
                foreach (var item in getOutstandingDataByInitiativeId)
                {
                    _context.OutstandingData.Remove(item);
                }
                _context.SaveChanges();
            }

            //Set Id
            var getId = _context.Outstandings.Where(x => x.InitiativeId == outstandingFrontModel.InitiativeId).FirstOrDefault();
            foreach (var item in outstandingFrontModel.OutstandingFormArray)
            {
                item.Id = 0;
                item.IsDeleted = false;
                item.OutstandingId = getId.Id;
                item.InitiativeId = outstandingFrontModel.InitiativeId;
                item.Year = outstanding.Year;
                item.Month = outstanding.Month;
                _context.OutstandingData.Add(item);
            }
            _context.SaveChanges();

            return true;
        }

        public async Task<bool> InsertOutstandingDataModel(OutstandingForm[] outstandingFrontModel)
        {
            // Remove
            var getOutstandingByInitiativeId = await _context.Outstandings.Where(x => x.InitiativeId == outstandingFrontModel[0].InitiativeId).ToListAsync();
            if (getOutstandingByInitiativeId.Count > 0)
            {
                _context.Outstandings.RemoveRange(getOutstandingByInitiativeId);
                //_context.SaveChanges();
                await _context.SaveChangesAsync();
            }


            //_context.SaveChanges();

            // Remove
            var getOutstandingDataByInitiativeId = await _context.OutstandingData.Where(x => x.InitiativeId == outstandingFrontModel[0].InitiativeId).ToListAsync();
            if (getOutstandingDataByInitiativeId.Count > 0)
            {
                _context.OutstandingData.RemoveRange(getOutstandingDataByInitiativeId);
                await _context.SaveChangesAsync();
            }



            //Set Id
            foreach (var model in outstandingFrontModel)
            {
                var outstanding = _mapper.Map<OutstandingModel>(model);
                outstanding.Id = 0;
                await _context.Outstandings.AddAsync(outstanding);
                await _context.SaveChangesAsync();


                var getId = await _context.Outstandings.Where(x => x.InitiativeId == model.InitiativeId && x.Year == model.Year && x.Month == int.Parse(model.Month)).FirstOrDefaultAsync();
                foreach (var item in model.OutstandingFormArray)
                {
                    item.Id = 0;
                    item.IsDeleted = false;
                    item.OutstandingId = getId.Id;
                    item.InitiativeId = model.InitiativeId;
                    item.Year = outstanding.Year;
                    item.Month = outstanding.Month;
                    await _context.OutstandingData.AddAsync(item);
                }
            }
            await _context.SaveChangesAsync();

            return true;
        }

        public List<OutstandingForm> UpdateOutstandingModel(OutstandingForm outstandingFrontModel)
        {
            var outstandingModel = _mapper.Map<OutstandingModel>(outstandingFrontModel);
            _context.Outstandings.Update(outstandingModel);
            var outstandingData = _context.OutstandingData.Where(x => x.InitiativeId == outstandingModel.InitiativeId).ToList();
            if (outstandingData.Count == 0)
            {
                foreach (var item in outstandingFrontModel.OutstandingFormArray)
                {
                    item.Id = 0;
                    item.InitiativeId = outstandingModel.InitiativeId;
                }
                _context.OutstandingData.UpdateRange(outstandingFrontModel.OutstandingFormArray);
                _context.SaveChanges();

                // Return Updated model.
                //return GetOutstandingForm((int)outstandingModel.InitiativeId, (int)outstandingModel.Year);
                return null;
            }

            foreach (var item in outstandingData)
            {
                if (!outstandingFrontModel.OutstandingFormArray.Contains(item))
                {
                    _context.OutstandingData.Remove(item);
                }
            }
            _context.OutstandingData.UpdateRange(outstandingFrontModel.OutstandingFormArray);
            _context.SaveChanges();
            // Return Updated model.
            //return GetOutstandingForm((int)outstandingModel.InitiativeId, (int)outstandingModel.Year);
            return null;
        }
    }
}
