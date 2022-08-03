using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class changeName_BudgetForm_to_BudgetPeriod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BudgetForm",
                table: "CapexInformations");

            migrationBuilder.AddColumn<string>(
                name: "BudgetPeriod",
                table: "CapexInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BudgetPeriod",
                table: "CapexInformations");

            migrationBuilder.AddColumn<string>(
                name: "BudgetForm",
                table: "CapexInformations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
