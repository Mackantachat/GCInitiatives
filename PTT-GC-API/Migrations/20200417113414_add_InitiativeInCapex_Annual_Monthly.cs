using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_InitiativeInCapex_Annual_Monthly : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InitiativeId",
                table: "MonthlyInvestmentPlans",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InitiativeId",
                table: "AnnualInvestmentPlans",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitiativeId",
                table: "MonthlyInvestmentPlans");

            migrationBuilder.DropColumn(
                name: "InitiativeId",
                table: "AnnualInvestmentPlans");
        }
    }
}
