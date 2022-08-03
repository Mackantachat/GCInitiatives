using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_new_column_in_detailinformaions_for_HighlightWork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HighlightWorkConCern",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HighlightWorkStatus",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NewActivities",
                table: "DetailInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HighlightWorkConCern",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "HighlightWorkStatus",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "NewActivities",
                table: "DetailInformations");
        }
    }
}
