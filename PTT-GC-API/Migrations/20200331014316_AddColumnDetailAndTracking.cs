using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class AddColumnDetailAndTracking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Explanation",
                table: "ImpactTrackings",
                type: "nvarchar(MAX)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ToComment",
                table: "ImpactTrackings",
                type: "nvarchar(MAX)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProCategory",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProLever",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProSubCategory",
                table: "DetailInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Explanation",
                table: "ImpactTrackings");

            migrationBuilder.DropColumn(
                name: "ToComment",
                table: "ImpactTrackings");

            migrationBuilder.DropColumn(
                name: "ProCategory",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ProLever",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ProSubCategory",
                table: "DetailInformations");
        }
    }
}
