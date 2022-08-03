using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class remove_new_colomn_projectNonFinancialBenefit_in_detail_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectNonFinancialBenefit",
                table: "DetailInformations");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProjectNonFinancialBenefit",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
