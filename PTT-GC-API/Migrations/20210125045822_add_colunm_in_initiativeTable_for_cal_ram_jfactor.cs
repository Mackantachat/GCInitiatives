using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_colunm_in_initiativeTable_for_cal_ram_jfactor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AnnualLikelihood",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "AnnualLikelihoodRatio",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "BaseRisk",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Consequence",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "EconomicBenefits",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "EconomicPenalties",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Effectiveness",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "EffectivenessRatio",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExposureFactor",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ExposureFactorRatio",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "JustifiableCost",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Likelihood",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "OpexPenaltiesCost",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PotentialConCost",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Probability",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ProductionLoss",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RiskOfAlt",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RiskReduction",
                table: "Initiatives",
                type: "decimal(18,5)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnnualLikelihood",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "AnnualLikelihoodRatio",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "BaseRisk",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Consequence",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "EconomicBenefits",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "EconomicPenalties",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Effectiveness",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "EffectivenessRatio",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "ExposureFactor",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "ExposureFactorRatio",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "JustifiableCost",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Likelihood",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "OpexPenaltiesCost",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "PotentialConCost",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Probability",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "ProductionLoss",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "RiskOfAlt",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "RiskReduction",
                table: "Initiatives");
        }
    }
}
