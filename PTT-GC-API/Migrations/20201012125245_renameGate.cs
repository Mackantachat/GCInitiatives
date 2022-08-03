using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class renameGate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rate",
                table: "PimGate");

            migrationBuilder.AddColumn<int>(
                name: "Gate",
                table: "PimGate",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gate",
                table: "PimGate");

            migrationBuilder.AddColumn<int>(
                name: "Rate",
                table: "PimGate",
                type: "int",
                nullable: true);
        }
    }
}
