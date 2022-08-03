using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class Add_progressStatus_progressUpdate_new : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProgressStatus",
                table: "ProgressDetails");

            migrationBuilder.DropColumn(
                name: "ProgressUpdate",
                table: "ProgressDetails");

            migrationBuilder.AddColumn<string>(
                name: "ProgressStatus",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProgressUpdate",
                table: "InitiativeDetails",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProgressStatus",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "ProgressUpdate",
                table: "InitiativeDetails");

            migrationBuilder.AddColumn<string>(
                name: "ProgressStatus",
                table: "ProgressDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProgressUpdate",
                table: "ProgressDetails",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
