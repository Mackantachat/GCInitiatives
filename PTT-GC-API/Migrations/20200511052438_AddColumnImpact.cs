using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class AddColumnImpact : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "FixedFX",
                table: "ImpactTypeOfBenefits",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalOnetime",
                table: "ImpactTrackings",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalRecurring",
                table: "ImpactTrackings",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FixedFX",
                table: "ImpactTypeOfBenefits");

            migrationBuilder.DropColumn(
                name: "TotalOnetime",
                table: "ImpactTrackings");

            migrationBuilder.DropColumn(
                name: "TotalRecurring",
                table: "ImpactTrackings");
        }
    }
}
