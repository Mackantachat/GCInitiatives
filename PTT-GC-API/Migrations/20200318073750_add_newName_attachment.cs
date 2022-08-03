using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_newName_attachment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Extension",
                table: "Attachments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Attachments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Extension",
                table: "Attachments");

            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Attachments");
        }
    }
}
