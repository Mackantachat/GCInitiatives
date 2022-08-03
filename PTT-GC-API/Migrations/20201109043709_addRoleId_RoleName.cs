using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addRoleId_RoleName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoleId",
                table: "RoleSettingDetail",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoleName",
                table: "RoleSettingDetail",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "RoleSettingDetail");

            migrationBuilder.DropColumn(
                name: "RoleName",
                table: "RoleSettingDetail");
        }
    }
}
