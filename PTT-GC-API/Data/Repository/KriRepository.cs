using AutoMapper;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.Kri;
using PTT_GC_API.Models.KRI;
using System;
using System.Linq;

namespace PTT_GC_API.Data.Repository
{
    public class KriRepository :IKriRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public KriRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public bool DeleteKriModel(int initiativeId)
        {
            var kri = _context.Kri.FirstOrDefault(x => x.InitiativeId == initiativeId);
            var kridata = _context.KriData.Where(x => x.InitiativeId == initiativeId).ToList();
            var krimitigation = _context.KriMitigations.FirstOrDefault(x => x.InitiativeId == initiativeId);
            var kriProgress = _context.KriProgressDetails.FirstOrDefault(x => x.InitiativeId == initiativeId);

            _context.Kri.Remove(kri);
            _context.KriData.RemoveRange(kridata);
            _context.KriMitigations.Remove(krimitigation);
            _context.KriProgressDetails.Remove(kriProgress);

            _context.SaveChanges();

            return true;
        }

        public KriModelData GetKriModelData(int initiativeId, int year)
        {
            var kri = _context.Kri.FirstOrDefault(x => x.InitiativeId == initiativeId && x.Year == year);
            if (kri != null)
            {
                var kridata = _context.KriData.Where(x => x.InitiativeId == initiativeId && x.Year == year).OrderBy(x => x.KriSequence).ToList();
                var ProgressModel = _context.KriProgressDetails.FirstOrDefault(x => x.InitiativeId == initiativeId && x.Year == year);
                var mitigations = _context.KriMitigations.FirstOrDefault(x => x.InitiativeId == initiativeId && x.Year ==year);

                var kriForm = _mapper.Map<Kri>(kri);
                var model = new KriModelData
                {
                    KriForms = kriForm
                };
                model.KriForms.KriData = kridata;
                model.KriForms.ProgressDetails = ProgressModel;
                model.KriForms.MitigationModels = mitigations;

                return model;
            }
            return null;
        }

        public bool InsertKriModel(KriModelData model)
        {
            var Kri = _mapper.Map<KriModel>(model.KriForms);
            Kri.Id = 0;
            Kri.UpdateDate = DateTime.Now;
            
            //_context.SaveChanges();
            //var kriId = _context.Kri.OrderByDescending(x => x.Id).Select(x => x.Id).First();
            model.KriForms.ProgressDetails.Id = 0;
            model.KriForms.ProgressDetails.InitiativeId = Kri.InitiativeId;
            model.KriForms.ProgressDetails.Year = Kri.Year;
            model.KriForms.MitigationModels.Id = 0;
            model.KriForms.MitigationModels.InitiativeId = Kri.InitiativeId;
            model.KriForms.MitigationModels.Year = Kri.Year;
            foreach (var item in model.KriForms.KriData)
            {
                item.Id = 0;
                item.InitiativeId = Kri.InitiativeId;
                item.Year = Kri.Year;
                //item.KriId = kriId;
            }
            _context.Kri.Add(Kri);
            _context.KriData.AddRange(model.KriForms.KriData);
            _context.KriProgressDetails.Add(model.KriForms.ProgressDetails);
            _context.KriMitigations.Add(model.KriForms.MitigationModels);

            _context.SaveChanges();
            return true;
        }

        public KriModelData UpdateKriModel(KriModelData model)
        {
            var Kri = _mapper.Map<KriModel>(model.KriForms);
            Kri.UpdateDate = DateTime.Now;
            _context.Kri.Update(Kri);
            _context.KriProgressDetails.Update(model.KriForms.ProgressDetails);
            _context.KriMitigations.Update(model.KriForms.MitigationModels);
            var kriDb = _context.KriData.Where(x => x.InitiativeId == model.KriForms.InitiativeId).ToList();
            if (kriDb.Count == 0)
            {
                foreach (var item in model.KriForms.KriData)
                {
                    item.Id = 0;
                    item.InitiativeId = Kri.InitiativeId;
                    item.Year = Kri.Year;
                    //item.KriId = Kri.Id;
                }
                _context.KriData.UpdateRange(model.KriForms.KriData);
                _context.SaveChanges();

                return GetKriModelData(model.KriForms.InitiativeId, model.KriForms.Year);
            }
            foreach (var item in kriDb)
            {
                if (!model.KriForms.KriData.Contains(item))
                {
                    _context.KriData.Remove(item);
                }
            }
            _context.KriData.UpdateRange(model.KriForms.KriData);
            _context.SaveChanges();

            return GetKriModelData(model.KriForms.InitiativeId,model.KriForms.Year);
        }

        public bool RemoveKriData(int initiativeId, int sequence)
        {
            var removeKri = _context.KriData.FirstOrDefault(x => x.InitiativeId == initiativeId && x.KriSequence == sequence);
            _context.KriData.Remove(removeKri);
            _context.SaveChanges();

            return true;
        }

        public bool ChangeStatus(int initiativeId,string status)
        {
            var kri = _context.Kri.FirstOrDefault(x => x.InitiativeId == initiativeId);
            kri.Status = status;
            _context.SaveChanges();
            return true;
        }
    }
}
