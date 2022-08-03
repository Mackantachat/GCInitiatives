using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_foreinkey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KpiMaintainId",
                table: "KriProgressMitigation",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "KpiMaintainId",
                table: "KriDetailMonth",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KpiMaintainId",
                table: "KriProgressMitigation");

            migrationBuilder.DropColumn(
                name: "KpiMaintainId",
                table: "KriDetailMonth");
        }
    }
}
