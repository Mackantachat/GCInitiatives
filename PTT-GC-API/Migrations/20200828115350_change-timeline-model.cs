using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class changetimelinemodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FutureFactors");

            migrationBuilder.DropTable(
                name: "FutureFactorTimelineTables");

            migrationBuilder.DropTable(
                name: "TimelineTables");

            migrationBuilder.AddColumn<DateTime>(
                name: "COD",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FirstSupply",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "SupplyPeriods",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "COD",
                table: "Fluids",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FirstSupply",
                table: "Fluids",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "SupplyPeriods",
                table: "Fluids",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "COD",
                table: "Electricities",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FirstSupply",
                table: "Electricities",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "SupplyPeriods",
                table: "Electricities",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "COD",
                table: "Condensates",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FirstSupply",
                table: "Condensates",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "SupplyPeriods",
                table: "Condensates",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "COD",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "FirstSupply",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "SupplyPeriods",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "COD",
                table: "Fluids");

            migrationBuilder.DropColumn(
                name: "FirstSupply",
                table: "Fluids");

            migrationBuilder.DropColumn(
                name: "SupplyPeriods",
                table: "Fluids");

            migrationBuilder.DropColumn(
                name: "COD",
                table: "Electricities");

            migrationBuilder.DropColumn(
                name: "FirstSupply",
                table: "Electricities");

            migrationBuilder.DropColumn(
                name: "SupplyPeriods",
                table: "Electricities");

            migrationBuilder.DropColumn(
                name: "COD",
                table: "Condensates");

            migrationBuilder.DropColumn(
                name: "FirstSupply",
                table: "Condensates");

            migrationBuilder.DropColumn(
                name: "SupplyPeriods",
                table: "Condensates");

            migrationBuilder.CreateTable(
                name: "FutureFactors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FlowMaxAmount = table.Column<int>(type: "int", nullable: true),
                    FlowMaxUnit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FlowNormalAmount = table.Column<int>(type: "int", nullable: true),
                    FlowNormalUnit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PressureMaxAmount = table.Column<int>(type: "int", nullable: true),
                    PressureMaxUnit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PressureNormalAmount = table.Column<int>(type: "int", nullable: true),
                    PressureNormalUnit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResourceNeededId = table.Column<int>(type: "int", nullable: true),
                    TopicId = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FutureFactors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FutureFactorTimelineTables",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstGenerated = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResourceNeededId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FutureFactorTimelineTables", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TimelineTables",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    COD = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FirstSupply = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResourceNeededId = table.Column<int>(type: "int", nullable: false),
                    SupplyPeriods = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimelineTables", x => x.Id);
                });
        }
    }
}
