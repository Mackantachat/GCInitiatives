using AutoMapper;
using DocumentFormat.OpenXml.Drawing.Charts;
using DocumentFormat.OpenXml.Office2010.ExcelAc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Initiative;
using PTT_GC_API.Models.Initiative;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class NewDetailInformationRepository : IDetailInformationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public NewDetailInformationRepository(DataContext dbContext, IMapper mapper)
        {
            _context = dbContext;
            _mapper = mapper;
        }

        public async Task<NewDetailInformationModel> GetDetailInformation(int initiativeId, string type)
        {
            object detailInformation;
            switch (type.ToUpper())
            {
                case "CIM": detailInformation = _mapper.Map<CimModel>(await _context.NewDetailInformations.FirstOrDefaultAsync(x => x.InitiativeId == initiativeId)); break;
                default: detailInformation = await _context.NewDetailInformations.FirstOrDefaultAsync(x => x.InitiativeId == initiativeId); break;
            }

            var financial = await _context.Financials.FirstOrDefaultAsync(x => x.InitiativeId == initiativeId);
            var milestone = await _context.Milestones.Where(x => x.InitiativeId == initiativeId).ToListAsync();
            var product = await _context.Products.Where(x => x.InitiativeId == initiativeId).ToListAsync();
            var financialIndicator = await _context.FinancialIndicators.Where(x => x.InitiativeId == initiativeId).ToListAsync();

            var model = new NewDetailInformationModel
            {
                DetailInformation = detailInformation,
                Financial = financial,
                Milestone = milestone,
                Product = product,
                FinancialIndicators = financialIndicator
            };
            return model;
        }

        public async Task<int> InsertDetailInformation(NewDetailInformationModel detailInformation, int initiativeId)
        {
            var detailModel = JsonConvert.DeserializeObject<DetailInformation>(detailInformation.DetailInformation.ToString());
            detailModel.InitiativeId = initiativeId;
            detailInformation.Financial.InitiativeId = initiativeId;
            // Add Detail information to DB
            await _context.NewDetailInformations.AddAsync(detailModel);

            // Add Financial to DB
            await _context.Financials.AddAsync(detailInformation.Financial);

            // Add Financial Indicators to DB
            foreach (FinancialIndicator financialInd in detailInformation.FinancialIndicators)
            {
                financialInd.Id = 0;
                financialInd.InitiativeId = initiativeId;
                await _context.FinancialIndicators.AddAsync(financialInd);
            }

            // Add Product to DB 
            foreach (Product product in detailInformation.Product)
            {
                product.Id = 0;
                product.InitiativeId = initiativeId;
                await _context.Products.AddAsync(product);
            }

            // Add Milestone to DB
            foreach (Milestone milestone in detailInformation.Milestone)
            {
                milestone.Id = 0;
                milestone.InitiativeId = initiativeId;
                await _context.Milestones.AddAsync(milestone);
            }

            var result = _context.SaveChanges();

            return result;
        }

        public async Task<int> UpdateDetailInformation(NewDetailInformationModel newDetailInformation)
        {
            var detailInformation = JsonConvert.DeserializeObject<DetailInformation>(newDetailInformation.DetailInformation.ToString());
            int initiativeId = detailInformation.InitiativeId;
            // Update Detail Information
            _context.NewDetailInformations.Update(detailInformation);

            // Update Financial to DB
            var removeFinancial = _context.Financials.FirstOrDefault(x => x.InitiativeId == initiativeId);
            _context.Financials.Remove(removeFinancial);
            _context.SaveChanges();
            _context.Financials.Add(newDetailInformation.Financial);
            _context.SaveChanges();

            var removeProduct = _context.Products.Where(x => x.InitiativeId == initiativeId).ToList();
            var removefinancialInd = _context.FinancialIndicators.Where(x => x.InitiativeId == initiativeId).ToList();
            var removemilestone = _context.Milestones.Where(x => x.InitiativeId == initiativeId).ToList();
            
            // Update Financial Indicator
            foreach(var items in removeProduct)
            {
                _context.Products.Remove(items);
                _context.SaveChanges();
            }

            

            foreach (var items in removefinancialInd)
            {
                _context.FinancialIndicators.Remove(items);
            }

            _context.SaveChanges();

            foreach (var items in removemilestone)
            {
                _context.Milestones.Remove(items);
            }

            _context.SaveChanges();

            foreach (FinancialIndicator financialIndicator in newDetailInformation.FinancialIndicators)
            {
                financialIndicator.Id = 0;
                _context.FinancialIndicators.Add(financialIndicator);
            }
            _context.SaveChanges();
            // UPdate Product

            foreach (Product product in newDetailInformation.Product)
            {
                product.Id = 0;
                _context.Products.Add(product);
            }
            _context.SaveChanges();
            // Update Milestone

            foreach (Milestone milestone in newDetailInformation.Milestone)
            {
                milestone.Id = 0;
                _context.Milestones.Add(milestone);
            }
            _context.SaveChanges();
            /*
            var removeProduct = await _context.Products.Where(x => x.InitiativeId == initiativeId).ToListAsync();
            var removefinancialInd = await _context.FinancialIndicators.Where(x => x.InitiativeId == initiativeId).ToListAsync();
            var removemilestone = await _context.Milestones.Where(x => x.InitiativeId == initiativeId).ToListAsync();

            // Update Financial Indicator
            foreach (FinancialIndicator financialIndicator in newDetailInformation.FinancialIndicators)
            {
                if (_context.FinancialIndicators.Contains(financialIndicator))
                {                    
                    _context.FinancialIndicators.Update(financialIndicator);
                    removefinancialInd.Remove(financialIndicator);
                }
                else
                {
                    await _context.FinancialIndicators.AddAsync(financialIndicator);
                }
            }
            
            // UPdate Product
            foreach(Product product in newDetailInformation.Product)
            {
                if (_context.Products.Contains(product))
                {
                    _context.Products.Update(product);
                    removeProduct.Remove(product);
                }
                else
                {
                    await _context.Products.AddAsync(product);
                }
            }

            // Update Milestone
            foreach(Milestone milestone in newDetailInformation.Milestone)
            {
                if (_context.Milestones.Contains(milestone))
                {
                    _context.Milestones.Update(milestone);
                    removemilestone.Remove(milestone);
                }
                else
                {
                    await _context.Milestones.AddAsync(milestone);
                }
            }

            // Cleanup
            CleanupItemsInList(removeProduct);
            CleanupItemsInList(removefinancialInd);
            CleanupItemsInList(removemilestone);
            */
            // Save Changes
            //var result = _context.SaveChanges();

            return 1;
        }

        public async Task<bool> DeleteDetailInformation(int initiativeId)
        {
            var model = await GetDetailInformation(initiativeId, "DEFAULT");
            return await DeleteDetailInformation(model);
        }
        public async Task<bool> DeleteDetailInformation(NewDetailInformationModel detailInformationModel)
        {
            var detail = JsonConvert.DeserializeObject<DetailInformation>(detailInformationModel.DetailInformation.ToString());

            _context.Remove(detail);

            _context.Remove(detailInformationModel.Financial);

            CleanupItemsInList(detailInformationModel.Product);

            CleanupItemsInList(detailInformationModel.Milestone);

            CleanupItemsInList(detailInformationModel.FinancialIndicators);

            return true;
        }

        private void CleanupItemsInList<T>(List<T> list)
        {
            foreach (T data in list)
            {
                _context.Remove(data);
            }

            _context.SaveChanges();
        }
    }
}
