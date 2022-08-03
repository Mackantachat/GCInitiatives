using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_PermissionMasterId_RoleSettingDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PermissionMasterId",
                table: "RoleSettingDetail",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PermissionMasterId",
                table: "RoleSettingDetail");
        }
    }
}
