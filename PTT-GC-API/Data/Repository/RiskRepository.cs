using AutoMapper;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using DocumentFormat.OpenXml.Office2010.ExcelAc;
using Microsoft.AspNetCore.Mvc;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos;
using PTT_GC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class RiskRepository : IRiskRepository
    {
        private readonly DataContext _context;
        private readonly IHttpClientFactory _clientFactory;
        private readonly IMapper _mapper;

        public RiskRepository(DataContext context, IHttpClientFactory clientFactory, IMapper mapper)
        {
            _context = context;
            _clientFactory = clientFactory;
            _mapper = mapper;
        }        

        public bool DeleteRiskData(int initiativeId)
        {
            throw new NotImplementedException();
            //var removeRisk = _context.Risk.Where(x => x.InitiativeId == initiativeId).ToList();
            //foreach()
            //var removeKri = _context.RiskKRIs.Where(x => x.RiskId == ).ToList();
            //var removeProgress = _context.RiskProgress.Where(x => x.RiskId == RiskId).ToList();
            //_context.RemoveRange(removeRisk);
            //_context.RemoveRange(removeKri);
            //_context.RemoveRange(removeProgress);
            //_context.SaveChanges();
            //return true;
        }

        public List<RiskModelData> GetRiskData(int initiativeId)
        {
            List<RiskModelData> model = new List<RiskModelData>();
            // Risk
            var risk = _context.Risk.Where(x => x.InitiativeId == initiativeId).ToList();

            for(int i=0;i<risk.Count;i++)
            {
                var riskmodel = _mapper.Map<RiskModelData>(risk[i]);
                // Kri
                var kri = _context.RiskKRIs.Where(x => x.RiskId == risk[i].Id && !x.IsDeleted).ToList();

                // Progress
                var progress = _context.RiskProgress.Where(x => x.RiskId == risk[i].Id ).ToList();
                riskmodel.KriArray = kri;
                riskmodel.RiskProgressArray = progress;
                model.Add(riskmodel);
            }

            return model;
        }


        public async Task<bool> InsertRiskData(RiskModelData[] riskModelData, int initiativeId)
        {
            var entityToDelete = _context.Risk.Where(i => i.InitiativeId == initiativeId).ToList();

            foreach(var riskDelete in entityToDelete)
            {
                var entityToDelete2 = _context.RiskProgress.Where(i => i.RiskId == riskDelete.Id).ToList();
                var entityToDelete3 = _context.RiskKRIs.Where(i => i.RiskId == riskDelete.Id).ToList();


                foreach(var riskProgressDelete in entityToDelete2)
                {
                    _context.Remove(riskProgressDelete);
                }

                foreach(var riskKriDelete in entityToDelete3)
                {
                    _context.Remove(riskKriDelete);
                }

                _context.Remove(riskDelete);
            }

            




            foreach (var model in riskModelData)
            {
                //Insert Risk
                var risk = _mapper.Map<Risk>(model);
                risk.Id = 0;
                await _context.Risk.AddAsync(risk);
                _context.SaveChanges();
                //Get Risk Id
                int id = _context.Risk
                            .OrderByDescending(x => x.Id)
                            .Select(x => x.Id)
                            .First();

                //Insert RiskProgress
                foreach (RiskProgress progress in model.RiskProgressArray)
                {
                    progress.Id = 0;
                    progress.RiskId = id;
                    await _context.RiskProgress.AddAsync(progress);
                }

                //Insert RiskKRI
                foreach (RiskKRI kri in model.KriArray)
                {
                    kri.Id = 0;
                    kri.RiskId = id;
                    await _context.RiskKRIs.AddAsync(kri);
                }
                _context.SaveChanges();
            }


            ////Insert Risk
            //var risk = _mapper.Map<Risk>(riskModelData);
            //risk.Id = 0;
            //await _context.Risk.AddAsync(risk);
            //_context.SaveChanges();
            ////Get Risk Id
            //int id = _context.Risk
            //            .OrderByDescending(x => x.Id)
            //            .Select(x => x.Id)
            //            .First();

            ////Insert RiskProgress
            //foreach (RiskProgress progress in riskModelData.RiskProgressArray)
            //{
            //    progress.RiskId = id;
            //    await _context.RiskProgress.AddAsync(progress);
            //}

            ////Insert RiskKRI
            //foreach (RiskKRI kri in riskModelData.KriArray)
            //{
            //    kri.RiskId = id;
            //    await _context.RiskKRIs.AddAsync(kri);
            //}
            //_context.SaveChanges();
            return true;
        }

        public int UpdateRiskData(RiskModelData riskModelData)
        {
            // Temporary update
            var risk = _mapper.Map<Risk>(riskModelData);
            _context.Risk.Update(risk);

            foreach(RiskKRI data in riskModelData.KriArray)
            {
                    data.RiskId = risk.Id;
                    _context.RiskKRIs.Update(data);
            }
            foreach (RiskProgress data in riskModelData.RiskProgressArray)
            {
                data.RiskId = risk.Id;
                _context.RiskProgress.Update(data);
            }
            //_context.RiskProgress.UpdateRange(riskModelData.RiskProgressArray);
            //var kri = _context.RiskKRIs.Where(x => x.RiskId == risk.Id).ToList();
            //ClearListData(kri);
            //foreach(RiskKRI data in riskModelData.KriArray)
            //{
            //    _context.RiskKRIs.Add(data);
            //}
            //_context.SaveChanges();

            //var progress = _context.RiskProgress.Where(x => x.RiskId == risk.Id).ToList();
            //ClearListData(progress);

            //foreach(RiskProgress progress in riskModelData.RiskProgressArray)
            //{
            //    _context.RiskProgress.Add()
            //}

            return _context.SaveChanges();
        }

        public async Task AddDataAsync<T>(List<T> data) where T : class
        {
            foreach (T model in data)
            {
                await _context.AddAsync(model);
            }
            _context.SaveChanges();
        }

        public void ClearListData<T>(List<T> model) where T:class
        {
            foreach(T items in model)
            {
                _context.Remove(items);
            }
        }

        public int DeleteRiskKri(RiskKRI kri)
        {
            _context.Remove(kri);           
            return  _context.SaveChanges();
        }
    }
}
