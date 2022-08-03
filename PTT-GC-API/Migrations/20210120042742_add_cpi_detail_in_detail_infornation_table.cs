using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_cpi_detail_in_detail_infornation_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OtherTool",
                table: "NewDetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhnBuPillar",
                table: "NewDetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpecifyPhnBuPillar",
                table: "NewDetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpecifyTypeOfPhn",
                table: "NewDetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TypeOfPhn",
                table: "NewDetailInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OtherTool",
                table: "NewDetailInformations");

            migrationBuilder.DropColumn(
                name: "PhnBuPillar",
                table: "NewDetailInformations");

            migrationBuilder.DropColumn(
                name: "SpecifyPhnBuPillar",
                table: "NewDetailInformations");

            migrationBuilder.DropColumn(
                name: "SpecifyTypeOfPhn",
                table: "NewDetailInformations");

            migrationBuilder.DropColumn(
                name: "TypeOfPhn",
                table: "NewDetailInformations");
        }
    }
}
