using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class modify_migration_table_initiativeMember : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BudgetSource",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "OverallBudget",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "RequestBudget",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "SmesRequest",
                table: "InitiativeMember");

            migrationBuilder.AddColumn<decimal>(
                name: "CostEstCapexType",
                table: "InitiativeMember",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CostEstOpexType",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "FxExchange",
                table: "InitiativeMember",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "OverallCostEst",
                table: "InitiativeMember",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Plant",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RequestCapex",
                table: "InitiativeMember",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "RequestOpex",
                table: "InitiativeMember",
                type: "decimal(18,3)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            
            migrationBuilder.DropColumn(
                name: "CostEstCapexType",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "CostEstOpexType",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "FxExchange",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "OverallCostEst",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "Plant",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "RequestCapex",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "RequestOpex",
                table: "InitiativeMember");

            migrationBuilder.AddColumn<string>(
                name: "BudgetSource",
                table: "InitiativeMember",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "InitiativeMember",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OverallBudget",
                table: "InitiativeMember",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RequestBudget",
                table: "InitiativeMember",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SmesRequest",
                table: "InitiativeMember",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
