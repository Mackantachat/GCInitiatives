using AutoMapper;
using Castle.Core.Internal;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.CommonData;
using PTT_GC_API.Models.CommonData;
using PTT_GC_API.Models.Owner;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{
    public class CommonDataRepository : ICommonDataRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CommonDataRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public int InsertCommonData(List<CommonDataSettingModel> commonDataModel)
        {
            foreach (CommonDataSettingModel model in commonDataModel)
            {
                // Map Data with common Data
                var commonDataSetting = _mapper.Map<CommonDataSetting>(model);
                // Insert Common Data Settings
                _context.CommonDataSetting.Add(commonDataSetting);
                // Insert Common Data
                foreach (CommonData commonData in model.DataDetail)
                {
                    commonData.DataType = model.DataType;
                    _context.CommonData.Add(commonData);
                }
            }
            return _context.SaveChanges();
        }

        public List<CommonDataSetting> GetTopic()
        {
            var data = _context.CommonDataSetting.Where(x => x.AttributeName01 != null).ToList();
            return data;
        }

        public async Task<List<CommonDataSettingModel>> GetCommonDataModel(string dataType, string criteria, int pageSize, int pageNumber, string orderByFieldName, string sortDirection)
        {
            // 
            var commonDataSettingModel = _context.CommonDataSetting.FirstOrDefault(x => x.DataType == dataType);

            // Search From Criteria
            var commonDataModel = _context.CommonData.Where(x => x.DataType == dataType && (
                                              x.Attribute01.Contains(criteria)
                                           || x.Attribute02.Contains(criteria)
                                           || x.Attribute03.Contains(criteria)
                                           || x.Attribute04.Contains(criteria)
                                           || x.Attribute05.Contains(criteria)
                                           || x.Attribute06.Contains(criteria)
                                           || x.Attribute07.Contains(criteria)
                                           || x.Attribute08.Contains(criteria)
                                           || x.Attribute09.Contains(criteria)
                                           || x.Attribute10.Contains(criteria)
                                           || x.Attribute11.Contains(criteria)
                                           || x.Attribute12.Contains(criteria)
                                           || x.Attribute13.Contains(criteria)
                                           || x.Attribute14.Contains(criteria)
                                           || x.Attribute15.Contains(criteria)
                                           || x.Attribute16.Contains(criteria)
                                           || x.Attribute17.Contains(criteria)
                                           || x.Attribute18.Contains(criteria)
                                           || x.Attribute19.Contains(criteria)
                                           || x.Attribute20.Contains(criteria)
                                           ));
            // SortDataBy
            switch (sortDirection.ToUpper())
            {
                case "ASC":
                    {
                        commonDataModel = await this.AscOrder(commonDataModel, orderByFieldName);
                    }; break;
                case "DESC":
                    {
                        // temporary
                        commonDataModel = this.DescOrder(commonDataModel, orderByFieldName);
                        //commonDataModel.OrderByDescending(x => x.GetType().GetProperty(orderByFieldName));
                    }
                    break;
            }

            // 

            var commonData = await PagedList<CommonData>.CreateAsync(commonDataModel, pageNumber, pageSize);
            List<CommonDataSettingModel> Model = new List<CommonDataSettingModel>();
            var commonDataSetting = _mapper.Map<CommonDataSettingModel>(commonDataSettingModel);
            commonDataSetting.DataDetail = commonData;
            Model.Add(commonDataSetting);
            return Model;
        }

        public async Task<Object> GetDataDetail(string dataType, string criteria, int pageSize, int pageNumber, string orderByFieldName, string sortDirection)
        {
            // Search From Criteria
            var commonDataModel = _context.CommonData.Where(x => x.DataType == dataType && (
                                              x.Attribute01.Contains(criteria)
                                           || x.Attribute02.Contains(criteria)
                                           || x.Attribute03.Contains(criteria)
                                           || x.Attribute04.Contains(criteria)
                                           || x.Attribute05.Contains(criteria)
                                           || x.Attribute06.Contains(criteria)
                                           || x.Attribute07.Contains(criteria)
                                           || x.Attribute08.Contains(criteria)
                                           || x.Attribute09.Contains(criteria)
                                           || x.Attribute10.Contains(criteria)
                                           || x.Attribute11.Contains(criteria)
                                           || x.Attribute12.Contains(criteria)
                                           || x.Attribute13.Contains(criteria)
                                           || x.Attribute14.Contains(criteria)
                                           || x.Attribute15.Contains(criteria)
                                           || x.Attribute16.Contains(criteria)
                                           || x.Attribute17.Contains(criteria)
                                           || x.Attribute18.Contains(criteria)
                                           || x.Attribute19.Contains(criteria)
                                           || x.Attribute20.Contains(criteria)
                                           ));
            // SortDataBy
            switch (sortDirection.ToUpper())
            {
                case "ASC":
                    {
                        commonDataModel = await this.AscOrder(commonDataModel, orderByFieldName);
                    }; break;
                case "DESC":
                    {
                        // temporary
                        commonDataModel = this.DescOrder(commonDataModel, orderByFieldName);
                        //commonDataModel.OrderByDescending(x => x.GetType().GetProperty(orderByFieldName));
                    }
                    break;
            }

            var DataDetail = await PagedList<CommonData>.CreateAsync(commonDataModel, pageNumber, pageSize);
            return new { CurrentPage = DataDetail.CurrentPage, PageSize = DataDetail.PageSize, TotalCount = DataDetail.TotalCount, TotalPage = DataDetail.TotalPages, DataDetail };
        }

        public CommonData GetResponsibleEng(string projectEngineer)
        {
            if(projectEngineer == null)
            {
                return null;
            }
            Owner owner = _context.Owners.Where(x => !string.IsNullOrEmpty(x.EmployeeID) && x.OwnerName.Equals(projectEngineer)).FirstOrDefault();
            CommonData cd = _context.CommonData.Where(x => x.DataType.Equals("responsible") && x.Attribute02.EndsWith("_" + owner.EmployeeID)).FirstOrDefault();
            return cd;
        }

        public async Task<List<CommonData>> GetResponsibleNoEng(string codeOfVP)
        {
            var commonDataModel = await _context.CommonData.Where(x => x.DataType.Equals("responsible") && x.Attribute01.Contains(codeOfVP)).ToListAsync();
            return commonDataModel;
        }

        public async Task<List<StdProjectDefRes>> GetStdProjectDef(StdProjectDefParams projectDefParams)

        {

            //Attribute01 == value
            //Attribute02 == type Of InvestMentId
            //Attribute03 == type Of InvestMent
            //Attribute04 == budget Source
            //Attribute05 == name for select
            //Attribute06 == default value
            // Search From Criteria
            var commonDataModel = await _context.CommonData.Where(x => x.DataType == "StandardProjectDefinition" &&
            x.Attribute03.Contains(projectDefParams.TypeOfInvestment) &&
            x.Attribute04.Contains(projectDefParams.BudgetSource)).ToListAsync();

            List<StdProjectDefRes> stdProjectDefRes = new List<StdProjectDefRes>();
            if (commonDataModel.Count > 0)
            {
                foreach (CommonData data in commonDataModel)
                {
                    stdProjectDefRes.Add(new StdProjectDefRes()
                    {
                        Value = data.Attribute01,
                        TypeOfInvestment = data.Attribute03,
                        BudgetSource = data.Attribute04,
                        Name = data.Attribute05,
                        DefaultValue = data.Attribute06
                    });
                }
            }

            return stdProjectDefRes;

        }

        public bool UpdateCommonData(List<CommonDataSettingModel> model)
        {
            foreach (CommonDataSettingModel setting in model)
            {
                var commonDataSetting = _mapper.Map<CommonDataSetting>(setting);
                var commonData = setting.DataDetail;
                // Get list of commondata to delete
                _context.CommonDataSetting.UpdateRange(commonDataSetting);
                _context.CommonData.UpdateRange(commonData);
                _context.SaveChanges();
            }

            return true;
        }

        public int Delete(string Datatype)
        {
            var deleteSetting = _context.CommonDataSetting.Where(x => x.DataType == Datatype).ToList();
            var deleteCommonData = _context.CommonData.Where(x => x.DataType == Datatype).ToList();

            _context.CommonDataSetting.RemoveRange(deleteSetting);
            _context.CommonData.RemoveRange(deleteCommonData);

            return _context.SaveChanges();

        }

        public int AddSingleCommonData(CommonData data)
        {
            _context.CommonData.Add(data);
            _context.SaveChanges();
            var id = _context.CommonData.OrderByDescending(x => x.Id)
                    .Select(x => x.Id).First();
            return id;
        }

        public int DeleteSingleCommonDataById(int id)
        {
            var data = _context.CommonData.FirstOrDefault(x => x.Id == id);
            _context.CommonData.Remove(data);
            return _context.SaveChanges();
        }

        private IQueryable<CommonData> DescOrder(IQueryable<CommonData> data, string attributeName)
        {
            // Temporary Solution for Desc Asc;
            //throw new NotImplementedException();
            switch (attributeName)
            {
                case "Attribute01": return data.OrderByDescending(x => x.Attribute01.Length).ThenBy(x => x.Attribute01);
                case "Attribute02": return data.OrderByDescending(x => x.Attribute02.Length).ThenBy(x => x.Attribute02);
                case "Attribute03": return data.OrderByDescending(x => x.Attribute03.Length).ThenBy(x => x.Attribute03);
                case "Attribute04": return data.OrderByDescending(x => x.Attribute04.Length).ThenBy(x => x.Attribute04);
                case "Attribute05": return data.OrderByDescending(x => x.Attribute05.Length).ThenBy(x => x.Attribute05);
                case "Attribute06": return data.OrderByDescending(x => x.Attribute06.Length).ThenBy(x => x.Attribute06);
                case "Attribute07": return data.OrderByDescending(x => x.Attribute07.Length).ThenBy(x => x.Attribute07);
                case "Attribute08": return data.OrderByDescending(x => x.Attribute08.Length).ThenBy(x => x.Attribute08);
                case "Attribute09": return data.OrderByDescending(x => x.Attribute09.Length).ThenBy(x => x.Attribute09);
                case "Attribute10": return data.OrderByDescending(x => x.Attribute10.Length).ThenBy(x => x.Attribute10);
                case "Attribute11": return data.OrderByDescending(x => x.Attribute11.Length).ThenBy(x => x.Attribute11);
                case "Attribute12": return data.OrderByDescending(x => x.Attribute12.Length).ThenBy(x => x.Attribute12);
                case "Attribute13": return data.OrderByDescending(x => x.Attribute13.Length).ThenBy(x => x.Attribute13);
                case "Attribute14": return data.OrderByDescending(x => x.Attribute14.Length).ThenBy(x => x.Attribute14);
                case "Attribute15": return data.OrderByDescending(x => x.Attribute15.Length).ThenBy(x => x.Attribute15);
                case "Attribute16": return data.OrderByDescending(x => x.Attribute16.Length).ThenBy(x => x.Attribute16);
                case "Attribute17": return data.OrderByDescending(x => x.Attribute17.Length).ThenBy(x => x.Attribute17);
                case "Attribute18": return data.OrderByDescending(x => x.Attribute18.Length).ThenBy(x => x.Attribute18);
                case "Attribute19": return data.OrderByDescending(x => x.Attribute19.Length).ThenBy(x => x.Attribute19);
                case "Attribute20": return data.OrderByDescending(x => x.Attribute20.Length).ThenBy(x => x.Attribute20);
                default: return data.OrderByDescending(x => x.Attribute01.Length).ThenBy(x => x.Attribute01);
            }
        }
        private async Task<IQueryable<CommonData>> AscOrder(IQueryable<CommonData> data, string attributeName)
        {
            // Temporary Solution for Desc Asc;
            //throw new NotImplementedException();
            //bool isNumber = false;
            //double tmpParseDouble = 0;
            //Dictionary<int, double> keyValues = new Dictionary<int, double>();
            //List<CommonData> returnListData = new List<CommonData>();
            //List<CommonData> tmpReturnListData = await data.ToListAsync();
            //foreach (var entity in data)
            //{
            //    isNumber = double.TryParse(entity.Attribute02, out tmpParseDouble);
            //    if (isNumber)
            //        keyValues.Add(entity.Id, tmpParseDouble);
            //}

            //if (isNumber)
            //{
            //    keyValues = keyValues.OrderBy(i => i.Value).ToDictionary(i=>i.Key,j=>j.Value);
            //    foreach (KeyValuePair<int,double> dicData in keyValues)
            //    {
            //        returnListData.Add(await data.Where(i => i.Id == dicData.Key).FirstOrDefaultAsync());
            //    }
            //    return returnListData.AsQueryable();
            //}


            switch (attributeName)
            {
                case "Attribute01": return data.OrderBy(x => x.Attribute01.Length).ThenBy(x => x.Attribute01);
                case "Attribute02": return data.OrderBy(x => x.Attribute02.Length).ThenBy(x => x.Attribute02);
                case "Attribute03": return data.OrderBy(x => x.Attribute03.Length).ThenBy(x => x.Attribute03);
                case "Attribute04": return data.OrderBy(x => x.Attribute04.Length).ThenBy(x => x.Attribute04);
                case "Attribute05": return data.OrderBy(x => x.Attribute05.Length).ThenBy(x => x.Attribute05);
                case "Attribute06": return data.OrderBy(x => x.Attribute06.Length).ThenBy(x => x.Attribute06);
                case "Attribute07": return data.OrderBy(x => x.Attribute07.Length).ThenBy(x => x.Attribute07);
                case "Attribute08": return data.OrderBy(x => x.Attribute08.Length).ThenBy(x => x.Attribute08);
                case "Attribute09": return data.OrderBy(x => x.Attribute09.Length).ThenBy(x => x.Attribute09);
                case "Attribute10": return data.OrderBy(x => x.Attribute10.Length).ThenBy(x => x.Attribute10);
                case "Attribute11": return data.OrderBy(x => x.Attribute11.Length).ThenBy(x => x.Attribute11);
                case "Attribute12": return data.OrderBy(x => x.Attribute12.Length).ThenBy(x => x.Attribute12);
                case "Attribute13": return data.OrderBy(x => x.Attribute13.Length).ThenBy(x => x.Attribute13);
                case "Attribute14": return data.OrderBy(x => x.Attribute14.Length).ThenBy(x => x.Attribute14);
                case "Attribute15": return data.OrderBy(x => x.Attribute15.Length).ThenBy(x => x.Attribute15);
                case "Attribute16": return data.OrderBy(x => x.Attribute16.Length).ThenBy(x => x.Attribute16);
                case "Attribute17": return data.OrderBy(x => x.Attribute17.Length).ThenBy(x => x.Attribute17);
                case "Attribute18": return data.OrderBy(x => x.Attribute18.Length).ThenBy(x => x.Attribute18);
                case "Attribute19": return data.OrderBy(x => x.Attribute19.Length).ThenBy(x => x.Attribute19);
                case "Attribute20": return data.OrderBy(x => x.Attribute20.Length).ThenBy(x => x.Attribute20);
                default: return data.OrderBy(x => x.Attribute01.Length).ThenBy(x => x.Attribute01);
                    //case "Attribute01": return data.OrderBy(x => PadNumbers(x.Attribute01));
                    //case "Attribute02": return data.OrderBy(x => PadNumbers(x.Attribute02));
                    //case "Attribute03": return data.OrderBy(x => PadNumbers(x.Attribute03));
                    //case "Attribute04": return data.OrderBy(x => PadNumbers(x.Attribute04));
                    //case "Attribute05": return data.OrderBy(x => PadNumbers(x.Attribute05));
                    //case "Attribute06": return data.OrderBy(x => PadNumbers(x.Attribute06));
                    //case "Attribute07": return data.OrderBy(x => PadNumbers(x.Attribute07));
                    //case "Attribute08": return data.OrderBy(x => PadNumbers(x.Attribute08));
                    //case "Attribute09": return data.OrderBy(x => PadNumbers(x.Attribute09));
                    //case "Attribute10": return data.OrderBy(x => PadNumbers(x.Attribute10));
                    //case "Attribute11": return data.OrderBy(x => PadNumbers(x.Attribute11));
                    //case "Attribute12": return data.OrderBy(x => PadNumbers(x.Attribute12));
                    //case "Attribute13": return data.OrderBy(x => PadNumbers(x.Attribute13));
                    //case "Attribute14": return data.OrderBy(x => PadNumbers(x.Attribute14));
                    //case "Attribute15": return data.OrderBy(x => PadNumbers(x.Attribute15));
                    //case "Attribute16": return data.OrderBy(x => PadNumbers(x.Attribute16));
                    //case "Attribute17": return data.OrderBy(x => PadNumbers(x.Attribute17));
                    //case "Attribute18": return data.OrderBy(x => PadNumbers(x.Attribute18));
                    //case "Attribute19": return data.OrderBy(x => PadNumbers(x.Attribute19));
                    //case "Attribute20": return data.OrderBy(x => PadNumbers(x.Attribute20));
                    //default: return data.OrderBy(x => x.Attribute01.Length).ThenBy(x => x.Attribute01);
            }
        }


        public List<CommonData> GetSapDropdown(string Type, int InitiativeId, string AreaPlant)
        {
            var initiative = _context.Initiatives.Where(i => i.Id == InitiativeId).FirstOrDefault();

            List<CommonData> data = null;
            try
            {
                switch (Type.ToLower())
                {
                    case "standardprojectdefinition":
                        data = _context.CommonData.Where(p => p.DataType == "standardprojectdefinition" && p.Attribute03 == initiative.TypeOfInvestment).ToList();
                        break;
                    case "responsible":
                        data = _context.CommonData.Where(p => p.DataType == "responsible").ToList();
                        break;
                    case "solomoncategory":
                        data = _context.CommonData.Where(p => p.DataType == "solomoncategory").ToList();
                        break;
                    case "areaplant":
                        data = _context.CommonData.Where(p => p.DataType == "areaplant" && p.Attribute03.Substring(0, 4) == initiative.Plant.Substring(0, 4)).ToList();
                        break;
                    case "physicalbu":
                        data = _context.CommonData.Where(p => p.DataType == "physicalbu" && p.Attribute03.Substring(0, 4) == initiative.Plant.Substring(0, 4)).ToList();
                        break;
                    case "physicalunit":
                        data = _context.CommonData.Where(p => p.DataType == "physicalunit" && p.Attribute03.Contains(AreaPlant)).ToList();
                        break;
                    default:
                        break;
                }
            }
            catch (Exception ex)
            {
                //throw ex;
                Console.WriteLine("Exception caught: {0}", ex);
            }

            return data;
        }
        public List<CommonData> GetKnowledgeThemesDropDown()
        {
            var result = _context.CommonData.Where(i => i.DataType == "knowledgethemes").ToList();
            return result;
        }
        public List<CommonData> GetBusinessLineDropDown()
        {
            var result = _context.CommonData.Where(i => i.DataType == "businessline").ToList();
            return result;
        }
        public List<CommonData> GetProjectTypeDropDown()
        {
            var result = _context.CommonData.Where(i => i.DataType == "projecttype").ToList();
            return result;
        }
        public List<CommonData> GetOperationalFunctionDropDown()
        {
            var result = _context.CommonData.Where(i => i.DataType == "operationalfunction").ToList();
            return result;
        }

        public List<CommonData> GetOperationalUnitDropDown()
        {
            var result = _context.CommonData.Where(i => i.DataType == "operationalunit").ToList();
            return result;
        }

        public List<CommonData> GetEquipmentTypeDropDown()
        {
            var result = _context.CommonData.Where(i => i.DataType == "equipmenttype").ToList();
            return result;
        }
        public List<CommonData> GetProductGroupDropDown()
        {
            var result = _context.CommonData.Where(i => i.DataType == "productgroup").ToList();
            return result;
        }
        public List<CommonData> GetAreaOfLearningDropDown()
        {
            var result = _context.CommonData.Where(i => i.DataType == "areaoflearning").ToList();
            return result;
        }
        public List<CommonData> GetOEMSElementDropDown()
        {
            var result = _context.CommonData.Where(i => i.DataType == "oemselement").ToList();
            return result;
        }
        public async Task<List<CommonData>> GetBuStream()
        {
            var bustream = await _context.CommonData.Where(i => i.DataType == "bustream").ToListAsync();
            return bustream;
        }

        public async Task<List<CommonData>> GetCommonDataByType(string dataType)
        {
            var commonDatas = await _context.CommonData.Where(i => i.DataType == dataType).ToListAsync();
            return commonDatas;
        }

        public async Task<List<string>> GetCurrencyFloatFx()
        {
            List<string> responseList = new List<string>();
            var TOFinanceFX = await _context.CommonData.Where(i => i.DataType == "TOFinanceFX").GroupBy(a => a.Attribute01).Select(g => new { g.Key, Count = g.Count() }).ToListAsync();
            if (TOFinanceFX.Count > 0)
            {
                foreach (var list in TOFinanceFX)
                {
                    responseList.Add(list.Key);
                }
            }
            return responseList;
        }
        public async Task<CommonData> GetCurrencyFxRate()
        {
            var fxRate = await _context.CommonData.Where(i => i.DataType.ToLower().Equals("currency") && i.Attribute02.ToLower().Equals("dollar")).FirstOrDefaultAsync();            
            return fxRate;
        }
    }
}
