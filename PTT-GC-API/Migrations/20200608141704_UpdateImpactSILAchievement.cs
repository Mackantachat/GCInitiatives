using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class UpdateImpactSILAchievement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SIL4Achievement",
                table: "ImpactTrackings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SIL5Achievement",
                table: "ImpactTrackings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SIL4Achievement",
                table: "ImpactTrackings");

            migrationBuilder.DropColumn(
                name: "SIL5Achievement",
                table: "ImpactTrackings");
        }
    }
}
