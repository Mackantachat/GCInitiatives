using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_Model_to_database : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Flow_max",
                table: "Fluids");

            migrationBuilder.DropColumn(
                name: "Flow_normal",
                table: "Fluids");

            migrationBuilder.DropColumn(
                name: "Pressure_max",
                table: "Fluids");

            migrationBuilder.DropColumn(
                name: "Pressure_normal",
                table: "Fluids");

            migrationBuilder.AddColumn<bool>(
                name: "IsUtilityTable",
                table: "ResourceNeededs",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FlowMax",
                table: "Fluids",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FlowNormal",
                table: "Fluids",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FlowUnit",
                table: "Fluids",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FluidType",
                table: "Fluids",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PressureMax",
                table: "Fluids",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PressureNormal",
                table: "Fluids",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PressureUnit",
                table: "Fluids",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "TopicId",
                table: "Fluids",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Condensates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceNeededId = table.Column<int>(nullable: true),
                    TopicId = table.Column<double>(nullable: true),
                    CondensateType = table.Column<string>(nullable: true),
                    PressureLevel = table.Column<string>(nullable: true),
                    PressureNormal = table.Column<decimal>(nullable: true),
                    TempNormal = table.Column<decimal>(nullable: true),
                    FlowNormal = table.Column<decimal>(nullable: true),
                    PressureMax = table.Column<decimal>(nullable: true),
                    TempMax = table.Column<decimal>(nullable: true),
                    FlowMax = table.Column<decimal>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Condensates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Electricities",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceNeededId = table.Column<int>(nullable: true),
                    TopicId = table.Column<double>(nullable: true),
                    Voltage = table.Column<decimal>(nullable: true),
                    Normal = table.Column<decimal>(nullable: true),
                    Max = table.Column<decimal>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Electricities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TimelineTable",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceNeededId = table.Column<int>(nullable: false),
                    TopicId = table.Column<double>(nullable: true),
                    FirstSupply = table.Column<DateTime>(nullable: true),
                    COD = table.Column<DateTime>(nullable: true),
                    SupplyPeriods = table.Column<decimal>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimelineTable", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Condensates");

            migrationBuilder.DropTable(
                name: "Electricities");

            migrationBuilder.DropTable(
                name: "TimelineTable");

            migrationBuilder.DropColumn(
                name: "IsUtilityTable",
                table: "ResourceNeededs");

            migrationBuilder.DropColumn(
                name: "FlowMax",
                table: "Fluids");

            migrationBuilder.DropColumn(
                name: "FlowNormal",
                table: "Fluids");

            migrationBuilder.DropColumn(
                name: "FlowUnit",
                table: "Fluids");

            migrationBuilder.DropColumn(
                name: "FluidType",
                table: "Fluids");

            migrationBuilder.DropColumn(
                name: "PressureMax",
                table: "Fluids");

            migrationBuilder.DropColumn(
                name: "PressureNormal",
                table: "Fluids");

            migrationBuilder.DropColumn(
                name: "PressureUnit",
                table: "Fluids");

            migrationBuilder.DropColumn(
                name: "TopicId",
                table: "Fluids");

            migrationBuilder.AddColumn<int>(
                name: "Flow_max",
                table: "Fluids",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Flow_normal",
                table: "Fluids",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Pressure_max",
                table: "Fluids",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Pressure_normal",
                table: "Fluids",
                type: "int",
                nullable: true);
        }
    }
}
