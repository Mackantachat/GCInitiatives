using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class AvailableBudgetPoolId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "AvailableBudget",
                table: "CapexInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PoolId",
                table: "CapexInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvailableBudget",
                table: "CapexInformations");

            migrationBuilder.DropColumn(
                name: "PoolId",
                table: "CapexInformations");
        }
    }
}
