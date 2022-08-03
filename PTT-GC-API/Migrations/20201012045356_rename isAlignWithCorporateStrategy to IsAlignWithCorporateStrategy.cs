using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class renameisAlignWithCorporateStrategytoIsAlignWithCorporateStrategy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isAlignWithCorporateStrategy",
                table: "DetailInformations",
                newName: "IsAlignWithCorporateStrategy");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsAlignWithCorporateStrategy",
                table: "DetailInformations",
                newName: "isAlignWithCorporateStrategy");
        }
    }
}
