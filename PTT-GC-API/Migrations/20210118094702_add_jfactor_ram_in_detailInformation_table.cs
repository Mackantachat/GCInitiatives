using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_jfactor_ram_in_detailInformation_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "JFactor",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Ram",
                table: "DetailInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JFactor",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Ram",
                table: "DetailInformations");
        }
    }
}
