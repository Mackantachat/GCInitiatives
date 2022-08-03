using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_ReportType_StageType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ConsistenWithCompanyStrategy",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DivisionManagerOfOwner",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExpectedTargetAndResult",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MileStoneAndSchedule",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherResourcesNeeded",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VicePresidentOfOwner",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CustomReportReportType",
                columns: table => new
                {
                    RunningID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    OrderBy = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomReportReportType", x => x.RunningID);
                });

            migrationBuilder.CreateTable(
                name: "CustomReportStageType",
                columns: table => new
                {
                    RunningID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    OrderBy = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomReportStageType", x => x.RunningID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomReportReportType");

            migrationBuilder.DropTable(
                name: "CustomReportStageType");

            migrationBuilder.DropColumn(
                name: "ConsistenWithCompanyStrategy",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "DivisionManagerOfOwner",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ExpectedTargetAndResult",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "MileStoneAndSchedule",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "OtherResourcesNeeded",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "VicePresidentOfOwner",
                table: "DetailInformations");
        }
    }
}
