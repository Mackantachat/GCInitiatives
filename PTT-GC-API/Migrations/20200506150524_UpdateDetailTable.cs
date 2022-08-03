using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class UpdateDetailTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SourceOfFeedstock",
                table: "DetailInformations");

            migrationBuilder.AddColumn<string>(
                name: "Consistent",
                table: "DetailInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Consistent",
                table: "DetailInformations");

            migrationBuilder.AddColumn<string>(
                name: "SourceOfFeedstock",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
