using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
using DocumentFormat.OpenXml.EMMA;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Storage;
using NPOI.HSSF.Record;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.ResourceNeededFormsModel;
using PTT_GC_API.Models.ResourceNeeded;
using PTT_GC_API.Models.ResourceNeededFormsModel;

namespace PTT_GC_API.Data.Repository
{
    public class ResourceNeededRepository : IResourceNeededRepository
    {
        private readonly DataContext _context;
        private readonly IHttpClientFactory _clientFactory;
        private readonly IMapper _mapper;

        public ResourceNeededRepository(DataContext context, IHttpClientFactory clientFactor,IMapper mapper)
        {
            _context = context;
            _clientFactory = clientFactor;
            _mapper = mapper;
        }
        public async Task<ResourceFormsModelData> GetResourceModelData(int initiativeId)
        {
            var resourceNeeded = await _context.ResourceNeededs.OrderByDescending(x => x.Id).FirstOrDefaultAsync(x => x.InitiativeId == initiativeId);
            if (resourceNeeded != null)
            {
                //var resourceNeededId = resourceNeeded.Id;
                List<Land> landData = null;
                List<Manpower> manpowerData = null;
                List<AirPollution> pollutionData = null;
                List<Waste> westeData = null;
                string importExportFacilityData = null;
                Utility utilityData = null;

                if (resourceNeeded.IsLandRequire != null)
                {
                    landData = ((bool)resourceNeeded.IsLandRequire) ? _context.Lands.Where(x => x.ResourceNeededId == resourceNeeded.Id).ToList<Land>() : null;
                }
                if (resourceNeeded.IsManpowerRequire != null)
                {
                    manpowerData = ((bool)(resourceNeeded.IsManpowerRequire)) ? _context.Manpowers.Where(x => x.ResourceNeededId == resourceNeeded.Id).ToList<Manpower>() : null;
                }
                if (resourceNeeded.IsAirPollutionRequire != null)
                {
                    pollutionData = ((bool)resourceNeeded.IsAirPollutionRequire) ? _context.AirPollutions.Where(x => x.ResourceNeededId == resourceNeeded.Id).ToList<AirPollution>() : null;
                }
                if (resourceNeeded.IsWasteRequire != null)
                {
                    westeData = ((bool)resourceNeeded.IsWasteRequire) ? _context.Wastes.Where(x => x.ResourceNeededId == resourceNeeded.Id).ToList<Waste>() : null;
                }
                if (resourceNeeded.IsImportRequire != null)
                {
                    importExportFacilityData = ((bool)resourceNeeded.IsImportRequire) ? resourceNeeded.RemarkImport : null;
                }
                if (resourceNeeded.IsUtilityRequire != null)
                {
                    utilityData = (((bool)resourceNeeded.IsUtilityRequire) ? await GetUtilityData(resourceNeeded.Id) : null);
                }
                var modelData = _mapper.Map<ResourceFormsModelData>(resourceNeeded);
                modelData.InitiativeId = initiativeId;
                modelData.ResourceNeededId = resourceNeeded.Id;
                modelData.LandForm = new LandContainer { LandData = landData };
                modelData.ManpowerForm = new ManPowerContainer { ManpowerData = manpowerData };
                modelData.AirForm = new PollutionContainer { PollutionData = pollutionData };
                modelData.WasteForm = new WasteContainer { WasteData = westeData };
                modelData.RemarkImport = importExportFacilityData;
                modelData.UtilityData = utilityData;
                //{
                //    LandData = landData,
                //    ManPowerData = manpowerData,
                //    PollutionData = pollutionData,
                //    WasteData = westeData,
                //    ImportExportFacilityData = importExportFacilityData,
                //    UtilityData = utilityData
                //};

                return modelData;
            }
            return null;
        }

        public async Task<ResourceFormsModelData> GetLastInsertModelData()
        {
            var id = _context.ResourceNeededs
                             .OrderByDescending(p => p.Id)
                             .Select(r => r.Id)
                             .First();
            return await GetResourceModelData(id);
        }

        public async Task<int> InsertResourceNeededData(ResourceFormsModelData modelData)
        {
            try
            {
                //Insert Resource Needed
                var resourceNeededData = _mapper.Map<ResourceNeeded>(modelData);
                resourceNeededData.Id = 0;
                if (resourceNeededData != null) await InsertData(resourceNeededData);

                _context.SaveChanges();

                var id = _context.ResourceNeededs
                            .OrderByDescending(p => p.Id)
                            .Select(r => r.Id)
                            .First();

                //Insert Manpower
                if ((bool)resourceNeededData.IsManpowerRequire && modelData.ManpowerForm != null && modelData.ManpowerForm.ManpowerData.Count > 0)
                {
                    foreach (Manpower manpower in modelData.ManpowerForm.ManpowerData)
                    {
                        if (manpower != null)
                        {
                            manpower.ResourceNeededId = id;
                            await InsertData(manpower);
                        }
                    }
                }

                //Insert Land Model.
                if ((bool)resourceNeededData.IsLandRequire && modelData.LandForm != null && modelData.LandForm.LandData.Count > 0)
                {
                    foreach (Land data in modelData.LandForm.LandData)
                    {
                        if (data != null)
                        {
                            data.ResourceNeededId = id;
                            await this.InsertData(data);
                        }
                    }
                }

                //Insert Airpollution
                if ((bool)resourceNeededData.IsAirPollutionRequire && modelData.AirForm != null && modelData.AirForm.PollutionData.Count > 0)
                {
                    foreach (AirPollution data in modelData.AirForm.PollutionData)
                    {
                        if (data != null)
                        {
                            data.ResourceNeededId = id;
                            await InsertData(data);
                        }
                    }
                }

                //Insert Waste
                if ((bool)resourceNeededData.IsWasteRequire && modelData.WasteForm != null && modelData.WasteForm.WasteData.Count > 0)
                {
                    foreach (Waste data in modelData.WasteForm.WasteData)
                    {
                        if (data != null)
                        {
                            data.ResourceNeededId = id;
                            await InsertData(data);
                        }
                    }
                }

                //Insert Utility
                if (modelData.UtilityData != null && (bool)resourceNeededData.IsUtilityRequire)
                {
                    await InsertUtility(modelData, id);
                }

                await _context.SaveChangesAsync();

                return id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<bool> UpdateResource(ResourceFormsModelData modelData, int resourceNeededId)
        {
            var resourceNeededData = _mapper.Map<ResourceNeeded>(modelData);
            if (_context.ResourceNeededs.Where(x => x.Id == resourceNeededId).Any())
            {
                //Update Resource Needed.
                modelData.ResourceNeededId = resourceNeededId;
                if ((bool)resourceNeededData.IsManpowerRequire)
                {
                    UpdateData(resourceNeededData);
                }

                //Update ManPower
                if ((bool)resourceNeededData.IsManpowerRequire)
                {
                    UpdateManPower(modelData);
                }

                //Update Land
                if ((bool)resourceNeededData.IsLandRequire)
                {
                    UpdateLand(modelData);
                }

                //Update AirPollution
                if ((bool)resourceNeededData.IsAirPollutionRequire)
                {
                    UpdateAirPollution(modelData);
                }

                //Update Waste
                if ((bool)resourceNeededData.IsWasteRequire)
                {
                    UpdateWaste(modelData);
                }

                //Update Utility
                if ((bool)resourceNeededData.IsUtilityRequire)
                {
                    UpdateUtility(modelData);
                }

                return true;
            }
            return false;
        }
        public bool DeleteResourceById(int id)
        {
            //Get ResourceFormsModelData by id
            var modelData = GetResourceModelData(id).GetAwaiter().GetResult();
            return DeleteResource(modelData);
        }

        public bool DeleteResource(ResourceFormsModelData modelData)
        {
            try
            {
                //Concern of using DeleteData methods? is it going to lower the .
                //Delete Manpower by ID
                var manpower = _context.Manpowers.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
                if (manpower != null)
                {
                    foreach (Manpower data in manpower)
                    {
                        DeleteData(data);
                    }
                }

                //Delete Land
                var land = _context.Lands.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
                if (land != null)
                {
                    foreach (Land data in land)
                    {
                        DeleteData(data);
                    }
                }

                //Delete Airpollution.
                var airpollution = _context.AirPollutions.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
                if (airpollution != null)
                {
                    foreach (AirPollution data in airpollution)
                    {
                        DeleteData(data);
                    }
                }

                //Delete Waste
                var waste = _context.Wastes.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
                if (waste != null)
                {
                    foreach (Waste data in waste)
                    {
                        DeleteData(data);
                    }
                }

                //Delete Utilities
                // Delete Others
                var others = _context.Others.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
                foreach (Other data in others)
                {
                    DeleteData(data);
                }

                // Delete Fluids
                var fluids = _context.Fluids.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
                foreach (Fluid data in fluids)
                {
                    DeleteData(data);
                }

                // Delete Condensate
                var condensate = _context.Condensates.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
                foreach (Condensate data in condensate)
                {
                    DeleteData(data);
                }

                // Delete Electricity
                var electricity = _context.Electricities.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
                foreach (Electricity data in electricity)
                {
                    DeleteData(data);
                }

                // Delete TimelineTables
                //var timelineTables = _context.TimelineTables.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
                //foreach (TimelineRecords data in timelineTables)
                //{
                //    DeleteData(data);
                //}

                //// Delete FutureFactors
                //var futurefactors = _context.FutureFactors.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
                //foreach (FutureFactors data in futurefactors)
                //{
                //    DeleteData(data);
                //}

                //// Delete FutureFactorTimelineTable
                //var futureTimeline = _context.FutureFactorTimelineTables.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
                //foreach (FutureFactorTimelineRecords data in futureTimeline)
                //{
                //    DeleteData(data);
                //}

                //Delete Resource Neededs
                //_context.Remove(modelData.ResourceNeededData);

                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool DeleteManPower(Manpower modelData)
        {
            try
            {
                _context.Manpowers.Remove(modelData);
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        #region Private Methods

        private async Task InsertData<T>(T data) where T : class
        {
            await _context.AddAsync<T>(data);
        }

        private void UpdateData<T>(T entity) where T : class
        {
            _context.Update(entity);
            _context.SaveChanges();
        }

        private void DeleteData<T>(T entity) where T : class
        {
            _context.Remove(entity);
            _context.SaveChanges();
        }

        private void UpdateManPower(ResourceFormsModelData modelData)
        {
            //if (modelData.ManPowerData != null)
            //{

            //    if (_context.Manpowers.Where(u => u.ResourceNeededId == modelData.ResourceNeededId).Any())
            //    {
            //        foreach (Manpower data in modelData.ManPowerData)
            //        {
            //            data.ResourceNeededId = modelData.ResourceNeededId;
            //            UpdateData(data);
            //        }
            //    }
            //    else
            //    {
            //        foreach (Manpower data in modelData.ManPowerData)
            //        {
            //            data.ResourceNeededId = modelData.ResourceNeededId;
            //            InsertData(data).GetAwaiter().GetResult();
            //        }
            //        _context.SaveChanges();
            //    }
            //}
            //else
            //{
            //    var list = _context.Manpowers.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList<Manpower>();
            //    foreach (Manpower item in list)
            //    {
            //        DeleteData(item);
            //    }
            //}

            var remove = _context.Manpowers.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
            _context.Manpowers.RemoveRange(remove);
            _context.SaveChanges();

            if (modelData.ManpowerForm != null)
            {
                foreach (Manpower manpower in modelData.ManpowerForm.ManpowerData)
                {
                    if (manpower != null)
                    {
                        manpower.Id = 0;
                        _context.Add(manpower);
                        _context.SaveChanges();
                    }
                }
            }
        }

        private void UpdateLand(ResourceFormsModelData modelData)
        {
            /*if (modelData.LandData != null)
            {
                if (_context.Lands.Where(u => u.ResourceNeededId == modelData.ResourceNeededId).Any())
                {
                    foreach (Land data in modelData.LandData)
                    {
                        data.ResourceNeededId = modelData.ResourceNeededId;
                        UpdateData(data);
                    }
                }
                else
                {
                    foreach (Land data in modelData.LandData)
                    {
                        InsertData(data).GetAwaiter().GetResult();
                    }
                    _context.SaveChanges();
                }
            }
            else
            {
                var list = _context.Lands.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList<Land>();
                foreach (Land item in list)
                {
                    DeleteData(item);
                }
            }*/
            var land = _context.Lands.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
            _context.RemoveRange(land);
            _context.SaveChanges();
            foreach (Land landData in modelData.LandForm.LandData)
            {
                landData.Id = 0;
                landData.ResourceNeededId = modelData.ResourceNeededId;
                _context.Lands.Add(landData);
                _context.SaveChanges();
            }

        }

        private void UpdateAirPollution(ResourceFormsModelData modelData)
        {
            //if (modelData.PollutionData != null)
            //{
            //    if (_context.AirPollutions.Where(u => u.ResourceNeededId == modelData.ResourceNeededId).Any())
            //    {
            //        foreach (AirPollution data in modelData.PollutionData)
            //        {
            //            data.ResourceNeededId = modelData.ResourceNeededId;
            //            UpdateData(data);
            //        }
            //    }
            //    else
            //    {
            //        foreach (AirPollution data in modelData.PollutionData)
            //        {
            //            InsertData(data).GetAwaiter().GetResult();
            //        }
            //        _context.SaveChanges();
            //    }
            //}
            //else
            //{
            //    var list = _context.AirPollutions.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList<AirPollution>();
            //    foreach (AirPollution item in list)
            //    {
            //        DeleteData(item);
            //    }
            //}
            var pollution = _context.AirPollutions.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
            _context.RemoveRange(pollution);
            _context.SaveChanges();
            foreach (AirPollution pol in modelData.AirForm.PollutionData)
            {
                pol.Id = 0;
                pol.ResourceNeededId = modelData.ResourceNeededId;
                _context.Add(pol);
                _context.SaveChanges();
            }

        }

        private void UpdateWaste(ResourceFormsModelData modelData)
        {
            //if (modelData.WasteData != null)
            //{
            //    if (_context.Wastes.Where(u => u.ResourceNeededId == modelData.ResourceNeededId).Any())
            //    {
            //        foreach (Waste data in modelData.WasteData)
            //        {
            //            data.ResourceNeededId = modelData.ResourceNeededId;
            //            UpdateData(data);
            //        }
            //    }
            //    else
            //    {
            //        foreach (Waste data in modelData.WasteData)
            //        {
            //            InsertData(data).GetAwaiter().GetResult();
            //        }
            //        _context.SaveChanges();
            //    }
            //}
            //else
            //{
            //    var list = _context.Wastes.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList<Waste>();
            //    foreach (Waste item in list)
            //    {
            //        DeleteData(item);
            //    }
            //}
            var waste = _context.Wastes.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
            _context.RemoveRange(waste);
            _context.SaveChanges();
            foreach (Waste wastes in modelData.WasteForm.WasteData)
            {
                wastes.Id = 0;
                wastes.ResourceNeededId = modelData.ResourceNeededId;
                _context.Add(wastes);
                _context.SaveChanges();
            }
        }

        private void UpdateUtility(ResourceFormsModelData modelData)
        {
            // Update Electricity List Data                
            var electricity = _context.Electricities.Where(x => x.ResourceNeededId == modelData.ResourceNeededId).ToList();
            _context.RemoveRange(electricity);
            _context.SaveChanges();
            foreach (Electricity elec in modelData.UtilityData.ElectricityData)
            {
                elec.Id = 0;
                elec.ResourceNeededId = modelData.ResourceNeededId;
                _context.Add(elec);
                _context.SaveChanges();
            }
            //foreach (Electricity electricity in modelData.UtilityData.ElectricityData)
            //{
            //    //if (electricity != null)
            //    //{
            //    //    UpdateData(electricity);
            //    //}
            //    _context.a
            //}

            // Steams           
            if (modelData.UtilityData.SteamData != null)
            {                
                modelData.UtilityData.SteamData.HighPressure.ResourceNeededId 
                 = modelData.UtilityData.SteamData.MediumPressure.ResourceNeededId
                 = modelData.UtilityData.SteamData.LowPressure.ResourceNeededId
                 = modelData.UtilityData.SteamData.OtherSteamPressure.ResourceNeededId = modelData.ResourceNeededId;
                /*UpdateData(modelData.UtilityData.SteamData.HighPressure);
                UpdateData(modelData.UtilityData.SteamData.MediumPressure);
                UpdateData(modelData.UtilityData.SteamData.LowPressure);
                UpdateData(modelData.UtilityData.SteamData.OtherSteamPressure);*/
                var remove = _context.Condensates.Where(x => x.CondensateType == "Steam" && x.ResourceNeededId == modelData.ResourceNeededId).ToList();
                _context.Condensates.RemoveRange(remove);
                _context.SaveChanges();
                _context.Condensates.Add(modelData.UtilityData.SteamData.HighPressure);
                _context.Condensates.Add(modelData.UtilityData.SteamData.MediumPressure);
                _context.Condensates.Add(modelData.UtilityData.SteamData.LowPressure);
                _context.Condensates.Add(modelData.UtilityData.SteamData.OtherSteamPressure);
                _context.SaveChanges();
            }

            // Update Demin Water
            if (modelData.UtilityData.DeminWaterData != null)
            {
                var remove = _context.Fluids.Where(x => x.ResourceNeededId == modelData.ResourceNeededId && x.FluidType == "DeminWater").ToList();
                _context.RemoveRange(remove);
                _context.SaveChanges();
                modelData.UtilityData.DeminWaterData.ResourceNeededId = modelData.ResourceNeededId;
                _context.Fluids.Add(modelData.UtilityData.DeminWaterData);
                _context.SaveChanges();
                //UpdateData(modelData.UtilityData.DeminWaterData);
            }

            // Update Treated And Clarify Water
            if (modelData.UtilityData.TreatedClarifyWater != null)
            {
                var remove = _context.Fluids.Where(x => x.ResourceNeededId == modelData.ResourceNeededId && x.FluidType == "TreatedWater").ToList();
                _context.RemoveRange(remove);
                modelData.UtilityData.TreatedClarifyWater.ResourceNeededId = modelData.ResourceNeededId;
                _context.Fluids.Add(modelData.UtilityData.TreatedClarifyWater);
                _context.SaveChanges();
                //UpdateData(modelData.UtilityData.TreatedClarifyWater);
            }

            // Update Condensate Return Water
            if (modelData.UtilityData.ReturnWater != null)
            {
                var remove = _context.Condensates.Where(x => x.CondensateType == "ReturnWater" && x.ResourceNeededId == modelData.ResourceNeededId).ToList();
                _context.RemoveRange(remove);
                _context.SaveChanges();
                modelData.UtilityData.ReturnWater.ResourceNeededId = modelData.ResourceNeededId;
                _context.Condensates.Add(modelData.UtilityData.ReturnWater);
                _context.SaveChanges();
                //UpdateData(modelData.UtilityData.ReturnWater);
            }

            // Update Hydrogen/TailGas
            if (modelData.UtilityData.Hydrogen != null)
            {
                var remove = _context.Fluids.Where(x => x.FluidType == "ReturnWater" && x.ResourceNeededId == modelData.ResourceNeededId).ToList();
                _context.RemoveRange(remove);
                _context.SaveChanges();
                modelData.UtilityData.Hydrogen.ResourceNeededId = modelData.ResourceNeededId;
                _context.Fluids.Add(modelData.UtilityData.Hydrogen);
                _context.SaveChanges();
                //UpdateData(modelData.UtilityData.Hydrogen);
            }

            // Update Nitrogen
            if (modelData.UtilityData.Nitrogen != null)
            {
                var remove = _context.Fluids.Where(x => x.FluidType == "Nitrogen").ToList();
                _context.RemoveRange(remove);
                _context.SaveChanges();
                modelData.UtilityData.Nitrogen.ResourceNeededId = modelData.ResourceNeededId;
                _context.Fluids.Add(modelData.UtilityData.Nitrogen);
                _context.SaveChanges();
                //UpdateData(modelData.UtilityData.Nitrogen);
            }

            // Update Natural Gas
            if (modelData.UtilityData.NaturalGas != null)
            {
                var remove= _context.Fluids.Where(x => x.FluidType == "NaturalGas").ToList();
                _context.RemoveRange(remove);
                modelData.UtilityData.NaturalGas.ResourceNeededId = modelData.ResourceNeededId;
                _context.Fluids.Add(modelData.UtilityData.NaturalGas);
                _context.SaveChanges();
                //UpdateData(modelData.UtilityData.NaturalGas);
            }

            // Update Others Data
            if (modelData.UtilityData.OtherData != null)
            {
                UpdateOthersModel(modelData.UtilityData.OtherData, _context.Others, modelData.ResourceNeededId);
            }

            // Update Timeline
            //if (modelData.UtilityData.TimeLineTable != null)
            //{
            //    UpdateTimelineData(modelData.UtilityData.TimeLineTable, _context.TimelineTables, modelData.ResourceNeededId);
            //}
            //// Update FutureFactor
            //if (modelData.UtilityData.FutureFactors != null)
            //{
            //    UpdateFutureFactorsModel(modelData.UtilityData.FutureFactors, _context.FutureFactors, modelData.ResourceNeededId);
            //}
            //// Update FutureFactorTable
            //if (modelData.UtilityData.FutureFactorTable != null)
            //{
            //    var remove = _context.FutureFactorTimelineTables.Where(x => x.ResourceNeededId == modelData.ResourceNeededId);
            //    _context.RemoveRange(remove);
            //    _context.SaveChanges();
            //    foreach (FutureFactorTimelineRecords record in modelData.UtilityData.FutureFactorTable)
            //    {
            //        record.ResourceNeededId = modelData.ResourceNeededId;
            //    }
            //    _context.FutureFactorTimelineTables.AddRange(modelData.UtilityData.FutureFactorTable);
            //    _context.SaveChanges();
            //}
        }

        private void UpdateOthersModel(List<Other> othersData, DbSet<Other> repository, int resourceNeededId)
        {
            //var databaseRecords = repository.Where(x => x.ResourceNeededId == resourceNeededId).ToList();
            //if (othersData != null)
            //{
            //    foreach (Other other in othersData)
            //    {
            //        if (databaseRecords.Contains(other))
            //        {
            //            UpdateData(other);
            //            // Remove updated items from list
            //            databaseRecords.Remove(other);
            //        }
            //        else
            //        {
            //            repository.AddAsync(other).GetAwaiter().GetResult();
            //        }
            //    }

            //    // Cleanup items that no longer exist.
            //    foreach (Other other in databaseRecords)
            //    {
            //        repository.Remove(other);
            //    }
            //    _context.SaveChanges();
            //}
            //else
            //{
            //    var list = repository.Where(x => x.ResourceNeededId == resourceNeededId).ToList();
            //    foreach (Other data in list)
            //    {
            //        DeleteData(data);
            //    }
            //}
            var removeOther = _context.Others.Where(x => x.ResourceNeededId == resourceNeededId).ToList();
            _context.Others.RemoveRange(removeOther);
            _context.SaveChanges();
            foreach (Other otherData in othersData)
            {
                otherData.Id = 0;
                otherData.ResourceNeededId = resourceNeededId;
                _context.Others.Add(otherData);
                _context.SaveChanges();
            }

        }

        private void UpdateFutureFactorsModel(List<FutureFactors> othersData, DbSet<FutureFactors> repository, int resourceNeededId)
        {
            //var databaseRecords = repository.Where(x => x.ResourceNeededId == resourceNeededId).ToList();
            //if (othersData != null)
            //{
            //    foreach (FutureFactors other in othersData)
            //    {
            //        if (databaseRecords.Contains(other))
            //        {
            //            UpdateData(other);
            //            // Remove updated items from list
            //            databaseRecords.Remove(other);
            //        }
            //        else
            //        {
            //            repository.AddAsync(other).GetAwaiter().GetResult();
            //        }
            //    }

            //    // Cleanup items that no longer exist.
            //    foreach (FutureFactors other in databaseRecords)
            //    {
            //        repository.Remove(other);
            //    }
            //    _context.SaveChanges();
            //}
            //else
            //{
            //    var list = repository.Where(x => x.ResourceNeededId == resourceNeededId).ToList();
            //    foreach (FutureFactors data in list)
            //    {
            //        DeleteData(data);
            //    }
            //}
            //var remove = _context.FutureFactors.Where(x => x.ResourceNeededId == resourceNeededId).ToList();
            //_context.FutureFactors.RemoveRange(remove);
            //_context.SaveChanges();
            //foreach (FutureFactors factor in othersData)
            //{
            //    factor.Id = 0;
            //    factor.ResourceNeededId = resourceNeededId;
            //    _context.FutureFactors.Add(factor);
            //    _context.SaveChanges();
            //}

        }

        private void UpdateTimelineData(List<TimelineRecords> timeline, DbSet<TimelineRecords> repository, int ResourceNeededId)
        {
            //if (timeline != null)
            //{
            //    var databaseRecords = repository.Where(x => x.ResourceNeededId == ResourceNeededId).ToList();
            //    foreach (TimelineRecords records in timeline)
            //    {
            //        if (databaseRecords.Contains(records))
            //        {
            //            UpdateData(records);
            //            databaseRecords.Remove(records);
            //        }
            //        else
            //        {
            //            repository.AddAsync(records).GetAwaiter().GetResult();
            //        }
            //    }

            //    //Cleanup items that no longer exist
            //    foreach (TimelineRecords delete in databaseRecords)
            //    {
            //        DeleteData(delete);
            //    }

            //    _context.SaveChanges();
            //    return;
            //}

            //var deleteData = repository.Where(x => x.ResourceNeededId == ResourceNeededId).ToList();

            //foreach (TimelineRecords record in deleteData)
            //{
            //    DeleteData(record);
            //}
            //var remove = _context.TimelineTables.Where(x => x.ResourceNeededId == ResourceNeededId).ToList();
            //_context.RemoveRange(remove);
            //_context.SaveChanges();
            //foreach (TimelineRecords record in timeline)
            //{
            //    record.Id = 0;
            //    record.ResourceNeededId = ResourceNeededId;
            //    _context.Add(record);
            //    _context.SaveChanges();
            //}
        }

        private async Task<Utility> GetUtilityData(int resourceNeededId)
        {
            try
            {
                // Get Electricity List Data
                List<Electricity> electricity = _context.Electricities.Where(x => x.ResourceNeededId == resourceNeededId).ToList();

                // Get all Condensate lists
                List<Condensate> condensateList = _context.Condensates.Where(x => x.ResourceNeededId == resourceNeededId).ToList();

                // Steams
                var steam = new Steam
                {
                    HighPressure = condensateList.FirstOrDefault(x => x.PressureLevel == "High" && x.CondensateType == "Steam"),
                    MediumPressure = condensateList.FirstOrDefault(x => x.PressureLevel == "Medium" && x.CondensateType == "Steam"),
                    LowPressure = condensateList.FirstOrDefault(x => x.PressureLevel == "Low" && x.CondensateType == "Steam"),
                    OtherSteamPressure = condensateList.FirstOrDefault(x => x.PressureLevel == "Other" && x.CondensateType == "Steam")
                };

                // Get Demin Water
                Fluid deminWater = _context.Fluids.FirstOrDefault(x => x.ResourceNeededId == resourceNeededId && x.FluidType == "DeminWater");

                // Get Treated And Clarify Water
                Fluid treatedWater = _context.Fluids.FirstOrDefault(x => x.ResourceNeededId == resourceNeededId && x.FluidType == "TreatedWater");

                // Get Condensate Return Water
                Condensate condensateWater = condensateList.FirstOrDefault(x => x.CondensateType == "ReturnWater");

                // Get Hydrogen/TailGas
                Fluid hydrogen = _context.Fluids.FirstOrDefault(x => x.ResourceNeededId == resourceNeededId && x.FluidType == "Hydrogen");

                // Get Nitrogen
                Fluid nitrogen = _context.Fluids.FirstOrDefault(x => x.ResourceNeededId == resourceNeededId && x.FluidType == "Nitrogen");

                // Get Natural Gas
                Fluid naturalGas = _context.Fluids.FirstOrDefault(x => x.ResourceNeededId == resourceNeededId && x.FluidType == "NaturalGas");

                // Get Others Data
                List<Other> others = _context.Others.Where(x => x.ResourceNeededId == resourceNeededId).ToList();
                /*var othersNameList = initiativeOther.GroupBy(x => x.Name).Select(x => x.Key).ToList();
                List<Other> others = new List<Other>();

                foreach (string name in othersNameList)
                {
                    others.Add(new OthersList
                    {
                        Name = name,
                        Data = initiativeOther.Where(x => x.Name == name).ToList()
                    });
                }*/

                // Get Timeline
                //var timeLine = _context.TimelineTables.Where(x => x.ResourceNeededId == resourceNeededId).ToList();

                //// Get FutureFactor
                //var futureFactor = _context.FutureFactors.Where(x => x.ResourceNeededId == resourceNeededId).ToList();
                /*var futureFactList = initiativeFutureFactor.GroupBy(x => x.Name).Select(x => x.Key).ToList();
                List<OthersList> futureFactor = new List<OthersList>();

                foreach (string name in futureFactList)
                {
                    futureFactor.Add(new OthersList
                    {
                        Name = name,
                        Data = initiativeFutureFactor.Where(x => x.Name == name).ToList()
                    });
                }*/

                // Get FutureFactorTimelineTable
                //var futureFactorTimelineTable = _context.FutureFactorTimelineTables.Where(x => x.ResourceNeededId == resourceNeededId).ToList();

                //Construct Utility Model
                var utilityModel = new Utility
                {
                    ElectricityData = electricity,
                    SteamData = steam,
                    DeminWaterData = deminWater,
                    TreatedClarifyWater = treatedWater,
                    ReturnWater = condensateWater,
                    Hydrogen = hydrogen,
                    Nitrogen = nitrogen,
                    NaturalGas = naturalGas,
                    OtherData = others
                };

                return utilityModel;
            }catch(Exception e)
            {
                return null;
            }
        }

        private async Task InsertUtility(ResourceFormsModelData modelData, int id)
        {
            //Insert Electricity
            if (modelData.UtilityData.ElectricityData != null)
            {
                foreach (Electricity data in modelData.UtilityData.ElectricityData)
                {
                    if (data != null)
                    {
                        data.ResourceNeededId = id;
                        await InsertData(data);
                    }
                }
            }

            //Insert Steams(List of Condensate)
            if (modelData.UtilityData.SteamData != null)
            {
                modelData.UtilityData.SteamData.HighPressure.ResourceNeededId =
                modelData.UtilityData.SteamData.MediumPressure.ResourceNeededId =
                modelData.UtilityData.SteamData.LowPressure.ResourceNeededId =
                modelData.UtilityData.SteamData.OtherSteamPressure.ResourceNeededId = id;
                modelData.UtilityData.SteamData.HighPressure.CondensateType =
                modelData.UtilityData.SteamData.MediumPressure.CondensateType =
                modelData.UtilityData.SteamData.LowPressure.CondensateType =
                modelData.UtilityData.SteamData.OtherSteamPressure.CondensateType = "Steam";
                await InsertData(modelData.UtilityData.SteamData.HighPressure);
                await InsertData(modelData.UtilityData.SteamData.MediumPressure);
                await InsertData(modelData.UtilityData.SteamData.LowPressure);
                await InsertData(modelData.UtilityData.SteamData.OtherSteamPressure);
            }

            //Insert Demin(Fluids)
            if (modelData.UtilityData.DeminWaterData != null)
            {
                modelData.UtilityData.DeminWaterData.FluidType = "DeminWater";
                modelData.UtilityData.DeminWaterData.ResourceNeededId = id;
                await InsertData(modelData.UtilityData.DeminWaterData);
            }

            //Insert Treated(Fluids)
            if (modelData.UtilityData.TreatedClarifyWater != null)
            {
                modelData.UtilityData.TreatedClarifyWater.FluidType = "TreatedWater";
                modelData.UtilityData.TreatedClarifyWater.ResourceNeededId = id;
                await InsertData(modelData.UtilityData.TreatedClarifyWater);
            }

            //Insert Condensate Return Water(Condensate)
            if (modelData.UtilityData.ReturnWater != null)
            {
                modelData.UtilityData.ReturnWater.CondensateType = "ReturnWater";
                modelData.UtilityData.ReturnWater.ResourceNeededId = id;
                await InsertData(modelData.UtilityData.ReturnWater);
            }

            //Insert Hydrogen(Fluids)
            if (modelData.UtilityData.Hydrogen != null)
            {
                modelData.UtilityData.Hydrogen.FluidType = "Hydrogen";
                modelData.UtilityData.Hydrogen.ResourceNeededId = id;
                await InsertData(modelData.UtilityData.Hydrogen);
            }

            //Insert Nitrogen(Fluids)
            if (modelData.UtilityData.Nitrogen != null)
            {
                modelData.UtilityData.Nitrogen.FluidType = "Nitrogen";
                modelData.UtilityData.Nitrogen.ResourceNeededId = id;
                await InsertData(modelData.UtilityData.Nitrogen);
            }

            //Insert Natural Gas (Fluids)
            if (modelData.UtilityData.NaturalGas != null)
            {
                modelData.UtilityData.NaturalGas.FluidType = "NaturalGas";
                modelData.UtilityData.NaturalGas.ResourceNeededId = id;
                await InsertData(modelData.UtilityData.NaturalGas);
            }

            await _context.SaveChangesAsync();

            //Insert Others
            if (modelData.UtilityData.OtherData != null && modelData.UtilityData.OtherData.Count > 0)
            {
                //foreach (OthersList list in modelData.UtilityData.OtherData)
                //{
                foreach (Other other in modelData.UtilityData.OtherData)
                {
                    other.ResourceNeededId = id;
                    await _context.Others.AddAsync(other);
                }
                await _context.SaveChangesAsync();
                //}
            }

            //Insert TimelineTable 
            //if (modelData.UtilityData.TimeLineTable != null)
            //{
            //    foreach (TimelineRecords records in modelData.UtilityData.TimeLineTable)
            //    {
            //        records.ResourceNeededId = id;
            //        await _context.TimelineTables.AddAsync(records);
            //    }
            //}

            ////Insert FutureFactor
            //if (modelData.UtilityData.FutureFactors != null && modelData.UtilityData.FutureFactors.Count > 0)
            //{
            //    //foreach (OthersList list in modelData.UtilityData.FutureFactors)
            //    //{
            //    foreach (FutureFactors data in modelData.UtilityData.FutureFactors)
            //    {
            //        data.ResourceNeededId = id;
            //        await _context.FutureFactors.AddAsync(data);
            //    }
            //    //}
            //    await _context.SaveChangesAsync();
            //}

            //if (modelData.UtilityData.FutureFactorTable != null && modelData.UtilityData.FutureFactorTable.Count > 0)
            //{
            //    foreach (FutureFactorTimelineRecords records in modelData.UtilityData.FutureFactorTable)
            //    {
            //        records.ResourceNeededId = id;
            //        await _context.FutureFactorTimelineTables.AddAsync(records);
            //    }
            //}
        }

        #endregion
    }
}
