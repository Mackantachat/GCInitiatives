using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addmodeltoresourceneeded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimelineTable");

            migrationBuilder.DropColumn(
                name: "IsUtilityTableRequired",
                table: "ResourceNeededs");

            migrationBuilder.CreateTable(
                name: "FutureFactors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceNeededId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    TopicId = table.Column<double>(nullable: true),
                    PressureNormalUnit = table.Column<string>(nullable: true),
                    FlowNormalUnit = table.Column<string>(nullable: true),
                    PressureMaxUnit = table.Column<string>(nullable: true),
                    FlowMaxUnit = table.Column<string>(nullable: true),
                    PressureNormalAmount = table.Column<int>(nullable: true),
                    FlowNormalAmount = table.Column<int>(nullable: true),
                    PressureMaxAmount = table.Column<int>(nullable: true),
                    FlowMaxAmount = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FutureFactors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FutureFactorTimelineTables",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceNeededId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    FirstGenerated = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FutureFactorTimelineTables", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TimelineTables",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceNeededId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    FirstSupply = table.Column<DateTime>(nullable: true),
                    COD = table.Column<DateTime>(nullable: true),
                    SupplyPeriods = table.Column<float>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimelineTables", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FutureFactors");

            migrationBuilder.DropTable(
                name: "FutureFactorTimelineTables");

            migrationBuilder.DropTable(
                name: "TimelineTables");

            migrationBuilder.AddColumn<bool>(
                name: "IsUtilityTableRequired",
                table: "ResourceNeededs",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TimelineTable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    COD = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FirstSupply = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ResourceNeededId = table.Column<int>(type: "int", nullable: false),
                    SupplyPeriods = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TopicId = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimelineTable", x => x.Id);
                });
        }
    }
}
