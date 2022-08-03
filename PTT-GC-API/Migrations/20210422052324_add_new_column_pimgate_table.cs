using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_new_column_pimgate_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProjectCharterLink",
                table: "PimGate",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RequestPoolStatus",
                table: "PimGate",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectCharterLink",
                table: "PimGate");

            migrationBuilder.DropColumn(
                name: "RequestPoolStatus",
                table: "PimGate");
        }
    }
}
