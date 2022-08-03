using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_column_intiativemember_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BudgetSource",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmocNo",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Gate",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InitiativeCode",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InitiativeType",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OverallBudget",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerName",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Pdd",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Presentation",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RequestBudget",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SmesRequest",
                table: "InitiativeMember",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BudgetSource",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "EmocNo",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "Gate",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "InitiativeCode",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "InitiativeType",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "OverallBudget",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "OwnerName",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "Pdd",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "Presentation",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "RequestBudget",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "SmesRequest",
                table: "InitiativeMember");
        }
    }
}
