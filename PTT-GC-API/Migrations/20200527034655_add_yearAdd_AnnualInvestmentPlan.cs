using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_yearAdd_AnnualInvestmentPlan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "TotalAdditional",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Year10Add",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Year1Add",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Year2Add",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Year3Add",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Year4Add",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Year5Add",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Year6Add",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Year7Add",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Year8Add",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Year9Add",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalAdditional",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "Year10Add",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "Year1Add",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "Year2Add",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "Year3Add",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "Year4Add",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "Year5Add",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "Year6Add",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "Year7Add",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "Year8Add",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "Year9Add",
                table: "AnnualInvestmentPlans");
        }
    }
}
