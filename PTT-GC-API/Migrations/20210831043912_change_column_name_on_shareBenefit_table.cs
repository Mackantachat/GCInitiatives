using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class change_column_name_on_shareBenefit_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalRecurring",
                table: "ShareBenefitWorkstreams",
                newName: "TotalRRRecurring");

            migrationBuilder.RenameColumn(
                name: "TotalOnetime",
                table: "ShareBenefitWorkstreams",
                newName: "TotalRROnetime");

            migrationBuilder.RenameColumn(
                name: "TotalBlended",
                table: "ShareBenefitWorkstreams",
                newName: "TotalRRBlended");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalRRRecurring",
                table: "ShareBenefitWorkstreams",
                newName: "TotalRecurring");

            migrationBuilder.RenameColumn(
                name: "TotalRROnetime",
                table: "ShareBenefitWorkstreams",
                newName: "TotalOnetime");

            migrationBuilder.RenameColumn(
                name: "TotalRRBlended",
                table: "ShareBenefitWorkstreams",
                newName: "TotalBlended");
        }
    }
}
