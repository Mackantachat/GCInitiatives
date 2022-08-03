using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using PTT_GC_API.API.Helpers;
using PTT_GC_API.Data.Interface;
using PTT_GC_API.Dtos.SettingChart;
using PTT_GC_API.Models.Initiative;
using PTT_GC_API.Models.SettingChart;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Data.Repository
{

    public class CustomReportHeaderRepository : CustomReportHeaderInterface
    {
        private readonly DataContext _context;
        private readonly StoreProcedureInterface _storeProcedure;
        public CustomReportHeaderRepository(DataContext context, StoreProcedureInterface storeProcedure)
        {
            _context = context;
            _storeProcedure = storeProcedure;
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
            return await _context.CustomReportHeader.AnyAsync();
        }

        public async Task<CustomReportHeaderPagination> GetAllReportHeader(int currentPage, int itemPerPage, string searchText, string[] dashboardType, string username)
        {
            // none where yet

            if (itemPerPage == 0) { itemPerPage = 10; };
            if (searchText == null) { searchText = ""; };
            if (searchText == null) { searchText = ""; };

            List<CustomReportHeader> allWholeReport = new List<CustomReportHeader>();
            List<CustomReportHeader> allReport = new List<CustomReportHeader>();

            var customReportHeaderQueryable = _context.CustomReportHeader.AsQueryable();

            customReportHeaderQueryable = customReportHeaderQueryable.Where(i => 1 == 1);

            if (searchText.ToString().Length > 0)
            {
                customReportHeaderQueryable = customReportHeaderQueryable.Where(i => i.ReportName.Contains(searchText) || i.GraphType.Contains(searchText));
            }

            if (dashboardType.Count() > 0)
            {
                customReportHeaderQueryable = customReportHeaderQueryable.Where(i => dashboardType.Contains(i.SystemReportType));
            }
            else
            {
                customReportHeaderQueryable = customReportHeaderQueryable.Where(i => i.SystemReportType == null);
                customReportHeaderQueryable = customReportHeaderQueryable.Where(i => i.CreateUser == username);
            }

            customReportHeaderQueryable = customReportHeaderQueryable.OrderBy(i => i.RunningID);

            allWholeReport = customReportHeaderQueryable.ToList();
            allReport = customReportHeaderQueryable.Skip((currentPage * itemPerPage) - itemPerPage).Take(itemPerPage).ToList();

            //if (searchText.ToString().Length > 0)
            //{
            //    allWholeReport = _context.CustomReportHeader.Where(i => i.ReportName.Contains(searchText) || i.GraphType.Contains(searchText)).ToList();
            //    allReport = _context.CustomReportHeader.Where(i => i.ReportName.Contains(searchText) || i.GraphType.Contains(searchText)).Skip((currentPage * itemPerPage) - itemPerPage).Take(itemPerPage).ToList();
            //}
            //else
            //{
            //    allWholeReport = _context.CustomReportHeader.Where(i => 1 == 1).ToList();
            //    allReport = _context.CustomReportHeader.Where(i => 1 == 1).Skip((currentPage * itemPerPage) - itemPerPage).Take(itemPerPage).ToList();
            //}

            PaginationHeader returnPagination = new PaginationHeader(currentPage, itemPerPage, allWholeReport.Count, (int)Math.Ceiling((double)allWholeReport.Count / (double)itemPerPage));
            CustomReportHeaderPagination returnReportWithPagination = new CustomReportHeaderPagination();

            returnReportWithPagination.allReportHeader = allReport;
            returnReportWithPagination.paginationHeader = returnPagination;

            //var allReport = _context.CustomReportHeader.ToList();
            return returnReportWithPagination;
        }

        public async Task<bool> DeleteCustomReport(int id)
        {
            var delHeader = _context.CustomReportHeader.Where(i => i.ReportID == id);
            var delDetail = _context.CustomReportDetail.Where(i => i.ReportID == id);
            var delParam = _context.CustomReportParameter.Where(i => i.ReportID == id);

            if (delHeader.Any())
            {
                foreach (var entity in delHeader)
                {
                    _context.CustomReportHeader.Remove(entity);
                }
            }

            if (delDetail.Any())
            {
                foreach (var entity in delDetail)
                {
                    _context.CustomReportDetail.Remove(entity);
                }
            }

            if (delParam.Any())
            {
                foreach (var entity in delParam)
                {
                    _context.CustomReportParameter.Remove(entity);
                }
            }



            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<CustomReportMerge> GetCustomReport(int id)
        {
            CustomReportMerge customReportMerge = new CustomReportMerge();

            var customReportHeaders = await _context.CustomReportHeader.Where(i => i.ReportID == id).ToListAsync();
            if (customReportHeaders.Count > 0)
            {
                customReportMerge.ReportHeader = customReportHeaders[0];

            }

            var customReportDetailXs = await _context.CustomReportDetail.Where(i => i.ReportID == id && i.Axis == "X").OrderBy(i => i.Sequence).ToListAsync();
            if (customReportDetailXs.Count > 0)
            {
                customReportMerge.ReportDetailX = customReportDetailXs[0];
            }



            var customReportDetailYs = await _context.CustomReportDetail.Where(i => i.ReportID == id && i.Axis == "Y").OrderBy(i => i.Sequence).ToListAsync();
            customReportMerge.ReportDetailY = new CustomReportDetail[customReportDetailYs.Count];
            for (int i = 0; i < customReportDetailYs.Count; i++)
            {
                customReportMerge.ReportDetailY[i] = customReportDetailYs[i];
            }

            var customReportParams = await _context.CustomReportParameter.Where(i => i.ReportID == id).OrderBy(i => i.Sequence).ToListAsync();
            customReportMerge.ReportParam = new CustomReportParameter[customReportParams.Count];
            for (int i = 0; i < customReportParams.Count; i++)
            {
                customReportMerge.ReportParam[i] = customReportParams[i];
            }
            return customReportMerge;
        }

        public async Task<CustomReportMerge> CreateCustomReport(CustomReportMerge customReportMerge)
        {
            int? id;
            int sequence = 0;
            if (_context.CustomReportHeader.Any())
            {
                var max = await _context.CustomReportHeader.OrderByDescending(p => p.ReportID).FirstOrDefaultAsync();
                id = max.ReportID + 1;
            }
            else
            {
                id = 0;
            }
            ///////////////////////////////////////////////////
            if (_context.CustomReportHeader.Any())
            {
                customReportMerge.ReportHeader.ReportID = id;
                customReportMerge.ReportHeader.CreateDate = DateTime.Now;
                customReportMerge.ReportHeader.UpdateDate = DateTime.Now;
                await _context.CustomReportHeader.AddAsync(customReportMerge.ReportHeader);

            }


            if (_context.CustomReportDetail.Any())
            {
                customReportMerge.ReportDetailX.ReportID = id;
                customReportMerge.ReportDetailX.Sequence = 1;
                customReportMerge.ReportDetailX.Axis = "X";
                _context.CustomReportDetail.Add(customReportMerge.ReportDetailX);

                sequence = 1;
                foreach (CustomReportDetail detail in customReportMerge.ReportDetailY)
                {
                    detail.ReportID = id;
                    detail.Sequence = sequence;
                    detail.Axis = "Y";
                    await _context.CustomReportDetail.AddAsync(detail);
                    sequence += 1;
                }
            }

            if (_context.CustomReportParameter.Any())
            {
                foreach (CustomReportParameter param in customReportMerge.ReportParam)
                {
                    param.ReportID = id;
                    param.Sequence = sequence;
                    await _context.CustomReportParameter.AddAsync(param);
                    sequence += 1;
                }
            }

            await _context.SaveChangesAsync();

            return customReportMerge;

        }

        public async Task<CustomReportMerge> UpdateCustomReport(CustomReportMerge customReportMerge)
        {
            int? id;
            int sequence = 0;

            ///////////////////////////////////////////////////
            id = customReportMerge.ReportHeader.ReportID;

            var oldDetail = _context.CustomReportDetail.Where(i => i.ReportID == id);
            if (oldDetail.Any())
            {
                foreach (var entity in oldDetail)
                    _context.CustomReportDetail.Remove(entity);
            }

            var oldParam = _context.CustomReportParameter.Where(i => i.ReportID == id);
            if (oldParam.Any())
            {
                foreach (var entity in oldParam)
                    _context.CustomReportParameter.Remove(entity);
            }


            if (_context.CustomReportHeader.Any())
            {
                var reportHeader = _context.CustomReportHeader.Where(i => i.ReportID == id).FirstOrDefault();
                reportHeader.ReportName = customReportMerge.ReportHeader.ReportName;
                reportHeader.GraphType = customReportMerge.ReportHeader.GraphType;
                reportHeader.OtherTypeLabel = customReportMerge.ReportHeader.OtherTypeLabel;
                reportHeader.Description = customReportMerge.ReportHeader.Description;
                reportHeader.X_AxisLabel = customReportMerge.ReportHeader.X_AxisLabel;
                reportHeader.Y_AxisLabel = customReportMerge.ReportHeader.Y_AxisLabel;
                reportHeader.StageType = customReportMerge.ReportHeader.StageType;
                reportHeader.isAccumulate = customReportMerge.ReportHeader.isAccumulate;
                reportHeader.UpdateUser = customReportMerge.ReportHeader.UpdateUser;
                reportHeader.UpdateDate = DateTime.Now;
            }

            if (_context.CustomReportDetail.Any())
            {
                customReportMerge.ReportDetailX.ReportID = id;
                customReportMerge.ReportDetailX.Sequence = 1;
                customReportMerge.ReportDetailX.Axis = "X";
                _context.CustomReportDetail.Add(customReportMerge.ReportDetailX);

                sequence = 1;
                foreach (CustomReportDetail detail in customReportMerge.ReportDetailY)
                {
                    detail.ReportID = id;
                    detail.Sequence = sequence;
                    detail.Axis = "Y";
                    await _context.CustomReportDetail.AddAsync(detail);
                    sequence += 1;
                }
            }

            if (_context.CustomReportParameter.Any())
            {
                foreach (CustomReportParameter param in customReportMerge.ReportParam)
                {
                    param.ReportID = id;
                    param.Sequence = sequence;
                    await _context.CustomReportParameter.AddAsync(param);
                    sequence += 1;
                }
            }

            await _context.SaveChangesAsync();

            return customReportMerge;

        }

        public async Task<IEnumerable<CustomReportReportType>> GetReportType()
        {
            return await _context.CustomReportReportType.OrderBy(i => i.OrderBy).ToListAsync();
        }

        public async Task<IEnumerable<CustomReportStageType>> GetStageType()
        {
            return await _context.CustomReportStageType.OrderBy(i => i.OrderBy).ToListAsync();
        }

        public async Task<IEnumerable<V_Graph_DDL_X_Axis>> GetXAxis(string StageType)
        {
            return await _context.V_Graph_DDL_X_Axis.Where(i => i.StageType == StageType || i.StageType == null).ToListAsync();
        }

        public async Task<IEnumerable<V_Graph_DDL_Y_Axis>> GetYAxis(string StageType)
        {
            return await _context.V_Graph_DDL_Y_Axis.Where(i => i.StageType == StageType).ToListAsync();
        }

        public async Task<IEnumerable<V_Graph_DDL_Param>> GetAllParam(string ReportType)
        {
            return await _context.V_Graph_DDL_Param.Where(i => i.ReportType == ReportType).OrderBy(i => i.Name).ToListAsync();
        }

        public async Task<IEnumerable<V_CustomExcel1_Y>> GetCustomExcelYAxis(string ReportType)
        {
            var returnValue = await _context.V_CustomExcel1_Y.Where(i => i.ReportType == ReportType).OrderBy(i => i.Name).ToListAsync();

            return returnValue;
        }

        public async Task<bool> DuplicateReportById(int reportId, DuplicateReport duplicateReport)
        {
            try
            {
                await _storeProcedure.Execute_NoReturn($"EXEC sp_CopyCustomReportByReportId '{reportId}','{duplicateReport.SubmittedBy}'");
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        public async Task<ItemDropdown[]> GetItemDropdowns(ParamDropdown paramDropdown)
        {
            if (paramDropdown == null)
                return new ItemDropdown[] { };

            if (paramDropdown.FieldName == null) paramDropdown.FieldName = "";
            var commonData = await _context.CommonData.Where(i => i.DataType == "dropdownreportmapping" && i.Attribute01 == paramDropdown.FieldName.ToLower()).FirstOrDefaultAsync();

            if (commonData == null)
                return new ItemDropdown[] { };

            DataTable dataTable = new DataTable();
            ItemDropdown[] itemDropdownsToReturn = new ItemDropdown[] { };

            dataTable = await _storeProcedure.ExecuteReturnDatatable($"sp_GetDropdownReportByField '{commonData.Attribute02.ToLower()}'");

            if (dataTable.Rows.Count <= 0)
                return itemDropdownsToReturn;

            itemDropdownsToReturn = dataTable.AsEnumerable().Select(rw =>
                new ItemDropdown
                {
                    ItemName = rw.Field<string>("ItemName"),
                    ItemValue = rw.Field<string>("ItemValue"),
                }).ToArray();
            //switch (commonData.Attribute02.ToLower())
            //{ // field to qurey 
            //    case "company":

            //        itemDropdownsToReturn = await (from a in _context.Initiatives
            //                                 select
            //                                 new ItemDropdown
            //                                 {
            //                                     ItemValue = (a.Company == null ? null : a.Company),
            //                                     ItemName = (a.Company == null ? "NULL" : a.Company)
            //                                 }).Distinct().ToArrayAsync();
            //        break;

            //    default:
            //        return new ItemDropdown[] { };
            //}


            if (paramDropdown.SearchText != null && paramDropdown.SearchText.Length > 0)
            {
                itemDropdownsToReturn = itemDropdownsToReturn.Where(i => (i.ItemValue == null ? "" : i.ItemValue.ToLower()).Contains(paramDropdown.SearchText.ToLower())).ToArray();
            }

            return itemDropdownsToReturn;
        }
    }
}
