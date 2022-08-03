using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class redesign_ReportHeaderColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DmDepartment",
                table: "DetailCapexs");

            migrationBuilder.DropColumn(
                name: "VpDepartment",
                table: "DetailCapexs");

            migrationBuilder.AddColumn<string>(
                name: "ConsistenWithCompanyStrategy",
                table: "DetailCapexs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExpectedTargetAndResult",
                table: "DetailCapexs",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "KpisCapexId",
                table: "DetailCapexs",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "MileStoneAndSchedule",
                table: "DetailCapexs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherResourcesNeeded",
                table: "DetailCapexs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConsistenWithCompanyStrategy",
                table: "DetailCapexs");

            migrationBuilder.DropColumn(
                name: "ExpectedTargetAndResult",
                table: "DetailCapexs");

            migrationBuilder.DropColumn(
                name: "KpisCapexId",
                table: "DetailCapexs");

            migrationBuilder.DropColumn(
                name: "MileStoneAndSchedule",
                table: "DetailCapexs");

            migrationBuilder.DropColumn(
                name: "OtherResourcesNeeded",
                table: "DetailCapexs");

            migrationBuilder.AddColumn<string>(
                name: "DmDepartment",
                table: "DetailCapexs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VpDepartment",
                table: "DetailCapexs",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
