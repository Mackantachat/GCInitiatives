using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class athercolumn3columnofteamsupport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "projectEngineer",
                table: "DetailInformations",
                newName: "ProjectEngineer");

            migrationBuilder.RenameColumn(
                name: "processEngineer",
                table: "DetailInformations",
                newName: "ProcessEngineer");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProjectEngineer",
                table: "DetailInformations",
                newName: "projectEngineer");

            migrationBuilder.RenameColumn(
                name: "ProcessEngineer",
                table: "DetailInformations",
                newName: "processEngineer");
        }
    }
}
