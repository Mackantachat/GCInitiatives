using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class UpdateDetailPresident : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Manager",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "President",
                table: "InitiativeDetails",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Manager",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "President",
                table: "InitiativeDetails");
        }
    }
}
