using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class CommentCancelled : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "Initiatives");

            migrationBuilder.AddColumn<string>(
                name: "CommentCancelled",
                table: "Initiatives",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CommentCancelled",
                table: "Initiatives");

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Initiatives",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
