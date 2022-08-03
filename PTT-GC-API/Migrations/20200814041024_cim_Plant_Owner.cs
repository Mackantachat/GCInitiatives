using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class cim_Plant_Owner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DMPlantOwner",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VPPlantOwner",
                table: "Initiatives",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DMPlantOwner",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "VPPlantOwner",
                table: "Initiatives");
        }
    }
}
