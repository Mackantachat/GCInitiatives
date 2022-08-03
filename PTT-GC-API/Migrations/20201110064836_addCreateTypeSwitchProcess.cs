using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addCreateTypeSwitchProcess : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCreateType",
                table: "StageMaster",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsSwitchProcess",
                table: "StageMaster",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CreateType",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCreatedApp",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCreatedWbs",
                table: "Initiatives",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCreateType",
                table: "StageMaster");

            migrationBuilder.DropColumn(
                name: "IsSwitchProcess",
                table: "StageMaster");

            migrationBuilder.DropColumn(
                name: "CreateType",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "IsCreatedApp",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "IsCreatedWbs",
                table: "Initiatives");
        }
    }
}
