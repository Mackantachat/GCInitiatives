using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_missing_properties_to_resource_needed_model : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "Wastes",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Unit",
                table: "Lands",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Wastes");

            migrationBuilder.DropColumn(
                name: "Unit",
                table: "Lands");
        }
    }
}
