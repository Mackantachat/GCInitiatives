using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_MonthAdd_MonthlyInvestmnetPlan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CFO",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "CTO",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "SponsorEvp",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ToFinance",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "WorkstreamLead",
                table: "DetailInformations");

            migrationBuilder.AddColumn<decimal>(
                name: "AprAdd",
                table: "MonthlyInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "AugAdd",
                table: "MonthlyInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "DecAdd",
                table: "MonthlyInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "FebAdd",
                table: "MonthlyInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "JanAdd",
                table: "MonthlyInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "JulAdd",
                table: "MonthlyInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "JunAdd",
                table: "MonthlyInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "MarAdd",
                table: "MonthlyInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "MayAdd",
                table: "MonthlyInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "MonthlyOverallAdd",
                table: "MonthlyInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "NovAdd",
                table: "MonthlyInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "OctAdd",
                table: "MonthlyInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "SepAdd",
                table: "MonthlyInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AprAdd",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "AugAdd",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "DecAdd",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "FebAdd",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "JanAdd",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "JulAdd",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "JunAdd",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "MarAdd",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "MayAdd",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "MonthlyOverallAdd",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "NovAdd",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "OctAdd",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "SepAdd",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.AddColumn<string>(
                name: "CFO",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CTO",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SponsorEvp",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ToFinance",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkstreamLead",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
