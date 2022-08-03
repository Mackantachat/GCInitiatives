using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_Owner_For_OrgChart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ActionText",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ActionType",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdminGroup",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AssignmentCostCenter",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BloodGrp",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CEOManagerEmpID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CEOManagerPositionID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CEOOrgID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CEOShortTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CEOTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CompanyCode",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyShortTxt",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DepManagerEmpID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DepManagerPositionID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DepOrgID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DepShortTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DepTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DivManagerEmpID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DivManagerPositionID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DivOrgID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DivShortTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DivTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmpGroup",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmpGroupTxt",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmpSubGroup",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmpSubGroupTxt",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EmploymentStatus",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmploymentStatusTxt",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Extension",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FNGRPManagerEmpID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FNGRPManagerPositionID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FNGRPOrgID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FNGRPShortTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FNGRPTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FNManagerEmpID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FNManagerPositionID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FNOrgID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FNShortTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FNTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MainPositionCostCenter",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "MainPositionFlg",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ManagerialFlag",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrgID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrgLevel",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrgShortTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrgTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PSDManagerEmpID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PSDManagerPositionID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PSDOrgID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PSDShortTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PSDTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ParentOrgID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PositionID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PositionLevel",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PositionShortTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PositionTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ShiftManagerEmpID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ShiftManagerPositionID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ShiftOrgID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShiftShortTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShiftTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SupManagerEmpID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SupManagerPositionID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SupOrgID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SupShortTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SupTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UnitManagerEmpID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UnitManagerPositionID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UnitOrgID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnitShortTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnitTextEN",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LagacyInitiativeCode",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LagacyInitiativeId",
                table: "Initiatives",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActionText",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "ActionType",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "AdminGroup",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "AssignmentCostCenter",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "BloodGrp",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "CEOManagerEmpID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "CEOManagerPositionID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "CEOOrgID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "CEOShortTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "CEOTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "CompanyCode",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "CompanyShortTxt",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "DepManagerEmpID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "DepManagerPositionID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "DepOrgID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "DepShortTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "DepTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "DivManagerEmpID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "DivManagerPositionID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "DivOrgID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "DivShortTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "DivTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "EmpGroup",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "EmpGroupTxt",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "EmpSubGroup",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "EmpSubGroupTxt",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "EmploymentStatus",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "EmploymentStatusTxt",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "Extension",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "FNGRPManagerEmpID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "FNGRPManagerPositionID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "FNGRPOrgID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "FNGRPShortTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "FNGRPTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "FNManagerEmpID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "FNManagerPositionID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "FNOrgID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "FNShortTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "FNTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "MainPositionCostCenter",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "MainPositionFlg",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "ManagerialFlag",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "OrgID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "OrgLevel",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "OrgShortTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "OrgTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "PSDManagerEmpID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "PSDManagerPositionID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "PSDOrgID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "PSDShortTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "PSDTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "ParentOrgID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "PositionID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "PositionLevel",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "PositionShortTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "PositionTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "ShiftManagerEmpID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "ShiftManagerPositionID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "ShiftOrgID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "ShiftShortTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "ShiftTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "SupManagerEmpID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "SupManagerPositionID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "SupOrgID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "SupShortTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "SupTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "UnitManagerEmpID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "UnitManagerPositionID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "UnitOrgID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "UnitShortTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "UnitTextEN",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "LagacyInitiativeCode",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "LagacyInitiativeId",
                table: "Initiatives");
        }
    }
}
