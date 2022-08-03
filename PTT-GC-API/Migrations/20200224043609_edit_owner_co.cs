using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class edit_owner_co : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmployeeID",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Indicator",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Telephone",
                table: "Owners",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmployeeID",
                table: "CoDevelopers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "CoDevelopers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Indicator",
                table: "CoDevelopers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "CoDevelopers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Telephone",
                table: "CoDevelopers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployeeID",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "Indicator",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "Telephone",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "EmployeeID",
                table: "CoDevelopers");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "CoDevelopers");

            migrationBuilder.DropColumn(
                name: "Indicator",
                table: "CoDevelopers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "CoDevelopers");

            migrationBuilder.DropColumn(
                name: "Telephone",
                table: "CoDevelopers");
        }
    }
}
