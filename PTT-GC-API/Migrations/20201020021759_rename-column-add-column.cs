using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class renamecolumnaddcolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitiativeId",
                table: "InitiativeHistoryIndex");

            migrationBuilder.AddColumn<int>(
                name: "InitiativeIdHistory",
                table: "InitiativeHistoryIndex",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InitiativeIdMain",
                table: "InitiativeHistoryIndex",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitiativeIdHistory",
                table: "InitiativeHistoryIndex");

            migrationBuilder.DropColumn(
                name: "InitiativeIdMain",
                table: "InitiativeHistoryIndex");

            migrationBuilder.AddColumn<int>(
                name: "InitiativeId",
                table: "InitiativeHistoryIndex",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
