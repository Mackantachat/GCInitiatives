using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class AddColumnTotalCostOPEX : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalRevise",
                table: "ImpactTrackings",
                newName: "TotalCostOPEX");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalCostOPEX",
                table: "ImpactTrackings",
                newName: "TotalRevise");
        }
    }
}
