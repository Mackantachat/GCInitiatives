using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class changedetailtabnameandaddcolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DetailTabStatus",
                table: "Initiatives");

            migrationBuilder.AddColumn<int>(
                name: "DetailCimStrategyTabStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DetailCpiTabStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DetailMaxDimCapexTabStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DetailPimTabStatus",
                table: "Initiatives",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DetailCimStrategyTabStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "DetailCpiTabStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "DetailMaxDimCapexTabStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "DetailPimTabStatus",
                table: "Initiatives");

            migrationBuilder.AddColumn<int>(
                name: "DetailTabStatus",
                table: "Initiatives",
                type: "int",
                nullable: true);
        }
    }
}
