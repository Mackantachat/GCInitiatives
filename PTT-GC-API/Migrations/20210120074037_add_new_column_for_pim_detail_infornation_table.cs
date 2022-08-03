using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_new_column_for_pim_detail_infornation_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AttachBenefit",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "AttachPlotPlanSite",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "AttachProcess",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "AttachReference",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExternalEmoc",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "UseExternalEmoc",
                table: "DetailInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttachBenefit",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "AttachPlotPlanSite",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "AttachProcess",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "AttachReference",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ExternalEmoc",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "UseExternalEmoc",
                table: "DetailInformations");
        }
    }
}
