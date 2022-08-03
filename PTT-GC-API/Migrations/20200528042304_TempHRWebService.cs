using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class TempHRWebService : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TempHRWebServices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeID = table.Column<int>(nullable: false),
                    SystemName = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    ENTitle = table.Column<string>(nullable: true),
                    ENFirstName = table.Column<string>(nullable: true),
                    ENLastName = table.Column<string>(nullable: true),
                    Indicator = table.Column<string>(nullable: true),
                    EmailAddress = table.Column<string>(nullable: true),
                    Extension = table.Column<string>(nullable: true),
                    CompanyCode = table.Column<string>(nullable: true),
                    CompanyName = table.Column<string>(nullable: true),
                    CompanyShortTxt = table.Column<string>(nullable: true),
                    OrgID = table.Column<string>(nullable: true),
                    OrgTextEN = table.Column<string>(nullable: true),
                    OrgShortTextEN = table.Column<string>(nullable: true),
                    OrgLevel = table.Column<string>(nullable: true),
                    PositionID = table.Column<string>(nullable: true),
                    PositionTextEN = table.Column<string>(nullable: true),
                    PositionShortTextEN = table.Column<string>(nullable: true),
                    PositionLevel = table.Column<string>(nullable: true),
                    ParentOrgID = table.Column<string>(nullable: true),
                    UnitOrgID = table.Column<string>(nullable: true),
                    UnitShortTextEN = table.Column<string>(nullable: true),
                    UnitTextEN = table.Column<string>(nullable: true),
                    SupOrgID = table.Column<string>(nullable: true),
                    SupShortTextEN = table.Column<string>(nullable: true),
                    SupTextEN = table.Column<string>(nullable: true),
                    SupManagerPositionID = table.Column<string>(nullable: true),
                    SupManagerEmpID = table.Column<string>(nullable: true),
                    ShiftOrgID = table.Column<string>(nullable: true),
                    ShiftShortTextEN = table.Column<string>(nullable: true),
                    ShiftTextEN = table.Column<string>(nullable: true),
                    ShiftManagerPositionID = table.Column<string>(nullable: true),
                    ShiftManagerEmpID = table.Column<string>(nullable: true),
                    DivOrgID = table.Column<string>(nullable: true),
                    DivTextEN = table.Column<string>(nullable: true),
                    DivManagerPositionID = table.Column<string>(nullable: true),
                    DivManagerEmpID = table.Column<string>(nullable: true),
                    DivShortTextEN = table.Column<string>(nullable: true),
                    DepOrgID = table.Column<string>(nullable: true),
                    DepTextEN = table.Column<string>(nullable: true),
                    DepManagerPositionID = table.Column<string>(nullable: true),
                    DepManagerEmpID = table.Column<string>(nullable: true),
                    DepShortTextEN = table.Column<string>(nullable: true),
                    MainPositionCostCenter = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TempHRWebServices", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TempHRWebServices");
        }
    }
}
