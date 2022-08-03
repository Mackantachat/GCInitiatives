using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class change_UserWorkStream : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkstreamId",
                table: "UserWorkstreams");

            migrationBuilder.AddColumn<string>(
                name: "WorkstreamTitle",
                table: "UserWorkstreams",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkstreamTitle",
                table: "UserWorkstreams");

            migrationBuilder.AddColumn<string>(
                name: "WorkstreamId",
                table: "UserWorkstreams",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
