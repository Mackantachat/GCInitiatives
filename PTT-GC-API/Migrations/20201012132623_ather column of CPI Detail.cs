using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class athercolumnofCPIDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ActualBenefitCalculationDetails",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ActualBudgetOpex",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "ActualBudgetSavings",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "AnalysisTool",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EstimatedBenefitCalculationDetails",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "EstimatedBenefitSavings",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "EstimatedBudgetOpex",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "RootCause",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SourceOfImprovement",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StepExplanation",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TypeOfCpi",
                table: "DetailInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActualBenefitCalculationDetails",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ActualBudgetOpex",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ActualBudgetSavings",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "AnalysisTool",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "EstimatedBenefitCalculationDetails",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "EstimatedBenefitSavings",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "EstimatedBudgetOpex",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "RootCause",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "SourceOfImprovement",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "StepExplanation",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "TypeOfCpi",
                table: "DetailInformations");
        }
    }
}
