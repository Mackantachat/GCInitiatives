using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class Add_progressStatus_progressUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProgressStatus",
                table: "ProgressDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProgressUpdate",
                table: "ProgressDetails",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProgressStatus",
                table: "ProgressDetails");

            migrationBuilder.DropColumn(
                name: "ProgressUpdate",
                table: "ProgressDetails");
        }
    }
}
