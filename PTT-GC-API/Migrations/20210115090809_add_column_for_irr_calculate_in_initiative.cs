using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_column_for_irr_calculate_in_initiative : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "CatalystChemicalsCost",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "LabourCost",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "MaintenanceCost",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ResidualValue",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "UtilitiesCost",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CatalystChemicalsCost",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "LabourCost",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "MaintenanceCost",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "ResidualValue",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "UtilitiesCost",
                table: "Initiatives");
        }
    }
}
