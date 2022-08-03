using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_new_column_on_pimGate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PicMomLink",
                table: "PimGate",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PresentationLink",
                table: "PimGate",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubPicMomLink",
                table: "PimGate",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VacCheckListLink",
                table: "PimGate",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PicMomLink",
                table: "PimGate");

            migrationBuilder.DropColumn(
                name: "PresentationLink",
                table: "PimGate");

            migrationBuilder.DropColumn(
                name: "SubPicMomLink",
                table: "PimGate");

            migrationBuilder.DropColumn(
                name: "VacCheckListLink",
                table: "PimGate");
        }
    }
}
