using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class renew_CAPEX : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "InvestmentPlan",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "InvestmentPlanFx",
                table: "AnnualInvestmentPlans");

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

            migrationBuilder.RenameColumn(
                name: "Year9Add",
                table: "AnnualInvestmentPlans",
                newName: "FutureSpendingThisYear");

            migrationBuilder.RenameColumn(
                name: "Year8Add",
                table: "AnnualInvestmentPlans",
                newName: "CurrencyFx");

            migrationBuilder.RenameColumn(
                name: "Year7Add",
                table: "AnnualInvestmentPlans",
                newName: "CarryBudget");

            migrationBuilder.RenameColumn(
                name: "Year6Add",
                table: "AnnualInvestmentPlans",
                newName: "ActualSpendingThisYear");

            migrationBuilder.AddColumn<int>(
                name: "CapexInformationId",
                table: "MonthlyInvestmentPlans",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ActionYear",
                table: "CapexInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CapexStatus",
                table: "CapexInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CapexType",
                table: "CapexInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsMaxApprovedRev",
                table: "CapexInformations",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Revistion",
                table: "CapexInformations",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Sequent",
                table: "CapexInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "AnnualInvestmentPlans",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PlanType",
                table: "AnnualInvestmentPlans",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CapexInformationId",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "ActionYear",
                table: "CapexInformations");

            migrationBuilder.DropColumn(
                name: "CapexStatus",
                table: "CapexInformations");

            migrationBuilder.DropColumn(
                name: "CapexType",
                table: "CapexInformations");

            migrationBuilder.DropColumn(
                name: "IsMaxApprovedRev",
                table: "CapexInformations");

            migrationBuilder.DropColumn(
                name: "Revistion",
                table: "CapexInformations");

            migrationBuilder.DropColumn(
                name: "Sequent",
                table: "CapexInformations");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "AnnualInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "PlanType",
                table: "AnnualInvestmentPlans");

            migrationBuilder.RenameColumn(
                name: "FutureSpendingThisYear",
                table: "AnnualInvestmentPlans",
                newName: "Year9Add");

            migrationBuilder.RenameColumn(
                name: "CurrencyFx",
                table: "AnnualInvestmentPlans",
                newName: "Year8Add");

            migrationBuilder.RenameColumn(
                name: "CarryBudget",
                table: "AnnualInvestmentPlans",
                newName: "Year7Add");

            migrationBuilder.RenameColumn(
                name: "ActualSpendingThisYear",
                table: "AnnualInvestmentPlans",
                newName: "Year6Add");

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

            migrationBuilder.AddColumn<string>(
                name: "InvestmentPlan",
                table: "AnnualInvestmentPlans",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "InvestmentPlanFx",
                table: "AnnualInvestmentPlans",
                type: "decimal(18,2)",
                nullable: true);

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
        }
    }
}
