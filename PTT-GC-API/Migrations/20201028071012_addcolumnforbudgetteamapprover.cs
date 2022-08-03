using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addcolumnforbudgetteamapprover : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSendAppRequest",
                table: "ProgressHeader",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsSendWBS",
                table: "ProgressHeader",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSendAppRequest",
                table: "ProgressHeader");

            migrationBuilder.DropColumn(
                name: "IsSendWBS",
                table: "ProgressHeader");
        }
    }
}
