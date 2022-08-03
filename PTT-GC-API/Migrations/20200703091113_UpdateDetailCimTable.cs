using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class UpdateDetailCimTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BaseCase",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BusinessModel",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Comparison",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CorporateImageIndex",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "EbitdaBaseCase",
                table: "InitiativeDetails",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "EbitdaOptimisticCase",
                table: "InitiativeDetails",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "EbitdaPessimisticCase",
                table: "InitiativeDetails",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Entity",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EntitySpecify",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Geography",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GeographySpecify",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KeySuccessFactor",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ListOfEquipment",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MarketOverview",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MgrOfProcessEngineer",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NpvBaseCase",
                table: "InitiativeDetails",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NpvOptimisticCase",
                table: "InitiativeDetails",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NpvPessimisticCase",
                table: "InitiativeDetails",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OptimisticCase",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherBusiness",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherInvestment",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherQuality",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OthersStrategic",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PaybackBaseCase",
                table: "InitiativeDetails",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PaybackOptimisticCase",
                table: "InitiativeDetails",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PaybackPessimisticCase",
                table: "InitiativeDetails",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PessimisticCase",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PotentialCustomer",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProcessEngineer",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductionProcess",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectDirector",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectEngineer",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ProjectIrrBaseCase",
                table: "InitiativeDetails",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ProjectIrrOptimisticCase",
                table: "InitiativeDetails",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ProjectIrrPessimisticCase",
                table: "InitiativeDetails",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectManager",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "RequireProject",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SafetyIndex",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SalesPlan",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SourceOfFeedback",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SynergyBenefit",
                table: "InitiativeDetails",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BaseCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "BusinessModel",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "Comparison",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "CorporateImageIndex",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "EbitdaBaseCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "EbitdaOptimisticCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "EbitdaPessimisticCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "Entity",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "EntitySpecify",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "Geography",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "GeographySpecify",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "KeySuccessFactor",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "ListOfEquipment",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "MarketOverview",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "MgrOfProcessEngineer",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "NpvBaseCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "NpvOptimisticCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "NpvPessimisticCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "OptimisticCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "OtherBusiness",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "OtherInvestment",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "OtherQuality",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "OthersStrategic",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "PaybackBaseCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "PaybackOptimisticCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "PaybackPessimisticCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "PessimisticCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "PotentialCustomer",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "ProcessEngineer",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "ProductionProcess",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "ProjectDirector",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "ProjectEngineer",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "ProjectIrrBaseCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "ProjectIrrOptimisticCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "ProjectIrrPessimisticCase",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "ProjectManager",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "RequireProject",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "SafetyIndex",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "SalesPlan",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "SourceOfFeedback",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "SynergyBenefit",
                table: "InitiativeDetails");
        }
    }
}
