using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.TempHRWebService
{
    public class TempHRWebService
    {
        [Key]
        public int Id { get; set; }
        public int EmployeeID { get; set; }
        public string SystemName { get; set; }
        public string FullName { get; set; }
        public string ENTitle { get; set; }
        public string ENFirstName { get; set; }
        public string ENLastName { get; set; }
        public string Indicator { get; set; }
        public string EmailAddress { get; set; }
        public string Extension { get; set; }
        public string CompanyCode { get; set; }
        public string CompanyName { get; set; }
        public string CompanyShortTxt { get; set; }
        public string OrgID { get; set; }
        public string OrgTextEN { get; set; }
        public string OrgShortTextEN { get; set; }
        public string OrgLevel { get; set; }
        public string PositionID { get; set; }
        public string PositionTextEN { get; set; }
        public string PositionShortTextEN { get; set; }
        public string PositionLevel { get; set; }
        public string ParentOrgID { get; set; }
        public string UnitOrgID { get; set; }
        public string UnitShortTextEN { get; set; }
        public string UnitTextEN { get; set; }
        public string SupOrgID { get; set; }
        public string SupShortTextEN { get; set; }
        public string SupTextEN { get; set; }
        public string SupManagerPositionID { get; set; }
        public string SupManagerEmpID { get; set; }
        public string ShiftOrgID { get; set; }
        public string ShiftShortTextEN { get; set; }
        public string ShiftTextEN { get; set; }
        public string ShiftManagerPositionID { get; set; }
        public string ShiftManagerEmpID { get; set; }
        public string DivOrgID { get; set; }
        public string DivTextEN { get; set; }
        public string DivManagerPositionID { get; set; }
        public string DivManagerEmpID { get; set; }
        public string DivShortTextEN { get; set; }
        public string DepOrgID { get; set; }
        public string DepTextEN { get; set; }
        public string DepManagerPositionID { get; set; }
        public string DepManagerEmpID { get; set; }
        public string DepShortTextEN { get; set; }
        public int? MainPositionCostCenter { get; set; }
    }
}
