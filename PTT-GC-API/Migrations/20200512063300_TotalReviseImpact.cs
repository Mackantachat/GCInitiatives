using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class TotalReviseImpact : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubmitTo",
                table: "ImpactTrackings");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalRevise",
                table: "ImpactTrackings",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalRevise",
                table: "ImpactTrackings");

            migrationBuilder.AddColumn<string>(
                name: "SubmitTo",
                table: "ImpactTrackings",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
