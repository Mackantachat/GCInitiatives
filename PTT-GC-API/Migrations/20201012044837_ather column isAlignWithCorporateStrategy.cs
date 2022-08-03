using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class athercolumnisAlignWithCorporateStrategy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimelineDetail",
                table: "NewDetailInformations");

            //migrationBuilder.DropColumn(
            //    name: "TimelineDetail",
            //    table: "DetailInformations");

            migrationBuilder.AddColumn<bool>(
                name: "isAlignWithCorporateStrategy",
                table: "DetailInformations",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isAlignWithCorporateStrategy",
                table: "DetailInformations");

            migrationBuilder.AddColumn<string>(
                name: "TimelineDetail",
                table: "NewDetailInformations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TimelineDetail",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
