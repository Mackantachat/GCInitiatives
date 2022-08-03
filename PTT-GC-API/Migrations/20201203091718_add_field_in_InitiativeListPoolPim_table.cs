using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_field_in_InitiativeListPoolPim_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GateSelect",
                table: "InitiativeListPoolPim",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Reference",
                table: "InitiativeListPoolPim",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GateSelect",
                table: "InitiativeListPoolPim");

            migrationBuilder.DropColumn(
                name: "Reference",
                table: "InitiativeListPoolPim");
        }
    }
}
