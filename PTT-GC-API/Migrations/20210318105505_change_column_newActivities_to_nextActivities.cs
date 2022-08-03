using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class change_column_newActivities_to_nextActivities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NewActivities",
                table: "DetailInformations");

            migrationBuilder.AddColumn<string>(
                name: "NextActivities",
                table: "DetailInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NextActivities",
                table: "DetailInformations");

            migrationBuilder.AddColumn<string>(
                name: "NewActivities",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
