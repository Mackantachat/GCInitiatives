using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class change_required_to_require : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsUtilityRequired",
                table: "ResourceNeededs");

            migrationBuilder.AddColumn<bool>(
                name: "IsUtilityRequire",
                table: "ResourceNeededs",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsUtilityRequire",
                table: "ResourceNeededs");

            migrationBuilder.AddColumn<bool>(
                name: "IsUtilityRequired",
                table: "ResourceNeededs",
                type: "bit",
                nullable: true);
        }
    }
}
