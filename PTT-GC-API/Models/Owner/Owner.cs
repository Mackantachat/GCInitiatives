using NPOI.Util;
using System.ComponentModel.DataAnnotations;
using System.Numerics;
using BigInteger = System.Numerics.BigInteger;

namespace PTT_GC_API.Models.Owner
{
    public class Owner
    {
        public int Id { get; set; }
        [StringLength(255)]
        public string OwnerName { get; set; }
        [StringLength(255)]
        public string EmployeeID { get; set; }
        [StringLength(255)]
        public string FirstName { get; set; }
        [StringLength(255)]
        public string LastName { get; set; }
        [StringLength(255)]
        public string Indicator { get; set; }
        [StringLength(50)]
        public string Telephone { get; set; }
        [StringLength(255)]
        public string Email { get; set; }

        //2020-06-16 For Org. Chart
        [StringLength(255)]
        public string Title { get; set; }
        [StringLength(10)]
        public string BloodGrp { get; set; }
        [StringLength(255)]
        public string Extension { get; set; }
        public int? CompanyCode { get; set; }

        [StringLength(50)]
        public string CompanyShortTxt { get; set; }
        [StringLength(255)]
        public string CompanyName { get; set; }
        [StringLength(255)]
        public string EmpGroup { get; set; }
        [StringLength(255)]
        public string EmpGroupTxt { get; set; }
        public int? EmpSubGroup { get; set; }

        [StringLength(255)]
        public string EmpSubGroupTxt { get; set; }
        public int? EmploymentStatus { get; set; }
        [StringLength(255)]
        public string EmploymentStatusTxt { get; set; }
        [StringLength(255)]
        public string AdminGroup { get; set; }
        public long? MainPositionCostCenter { get; set; }
        public int? AssignmentCostCenter { get; set; }
        [StringLength(255)]
        public string ActionType { get; set; }
        [StringLength(255)]
        public string ActionText { get; set; }
        public int? OrgID { get; set; }
        [StringLength(255)]
        public string OrgTextEN { get; set; }
        [StringLength(50)]
        public string OrgShortTextEN { get; set; }
        public int? OrgLevel { get; set; }
        public int? PositionID { get; set; }
        [StringLength(255)]
        public string PositionTextEN { get; set; }
        [StringLength(50)]
        public string PositionShortTextEN { get; set; }
        public int? PositionLevel { get; set; }
        public bool? ManagerialFlag { get; set; }
        public bool? MainPositionFlg { get; set; }
        public int? ParentOrgID { get; set; }
        public int? UnitOrgID { get; set; }
        [StringLength(50)]
        public string UnitShortTextEN { get; set; }
        [StringLength(255)]
        public string UnitTextEN { get; set; }
        public int? UnitManagerPositionID { get; set; }
        public int? UnitManagerEmpID { get; set; }
        public int? SupOrgID { get; set; }
        [StringLength(255)]
        public string SupShortTextEN { get; set; }
        [StringLength(255)]
        public string SupTextEN { get; set; }
        public int? SupManagerPositionID { get; set; }
        public int? SupManagerEmpID { get; set; }
        public int? ShiftOrgID { get; set; }
        [StringLength(50)]
        public string ShiftShortTextEN { get; set; }
        [StringLength(255)]
        public string ShiftTextEN { get; set; }
        public int? ShiftManagerPositionID { get; set; }
        public int? ShiftManagerEmpID { get; set; }
        public int? DivOrgID { get; set; }
        [StringLength(255)]
        public string DivShortTextEN { get; set; }
        [StringLength(255)]
        public string DivTextEN { get; set; }
        public int? DivManagerPositionID { get; set; }
        public int? DivManagerEmpID { get; set; }
        public int? DepOrgID { get; set; }
        [StringLength(255)]
        public string DepShortTextEN { get; set; }
        [StringLength(255)]
        public string DepTextEN { get; set; }
        public int? DepManagerPositionID { get; set; }
        public int? DepManagerEmpID { get; set; }
        public int? FNOrgID { get; set; }
        [StringLength(50)]
        public string FNShortTextEN { get; set; }
        [StringLength(255)]
        public string FNTextEN { get; set; }
        public int? FNManagerPositionID { get; set; }
        public int? FNManagerEmpID { get; set; }
        public int? FNGRPOrgID { get; set; }
        [StringLength(50)]
        public string FNGRPShortTextEN { get; set; }
        [StringLength(255)]
        public string FNGRPTextEN { get; set; }
        public int? FNGRPManagerPositionID { get; set; }
        public int? FNGRPManagerEmpID { get; set; }
        public int? PSDOrgID { get; set; }
        [StringLength(50)]
        public string PSDShortTextEN { get; set; }
        [StringLength(255)]
        public string PSDTextEN { get; set; }
        public int? PSDManagerPositionID { get; set; }
        public int? PSDManagerEmpID { get; set; }
        public int? CEOOrgID { get; set; }
        [StringLength(50)]
        public string CEOShortTextEN { get; set; }
        [StringLength(255)]
        public string CEOTextEN { get; set; }
        public int? CEOManagerPositionID { get; set; }
        public int? CEOManagerEmpID { get; set; }
        [StringLength(255)]
        public string DataSource { get; set; }
        [StringLength(255)]
        public string Workstream { get; set; }
    }
}
