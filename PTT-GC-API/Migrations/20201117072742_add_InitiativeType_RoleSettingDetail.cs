using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_InitiativeType_RoleSettingDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RoleName",
                table: "RoleSettingDetail",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RoleId",
                table: "RoleSettingDetail",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InitiativeType",
                table: "RoleSettingDetail",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "RoleSettingDetail",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Stage",
                table: "RoleSettingDetail",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "RoleSettingDetail",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TypeOfInvestment",
                table: "RoleSettingDetail",
                maxLength: 500,
                nullable: true);

            //migrationBuilder.AddColumn<string>(
            //    name: "DigitalStrategy",
            //    table: "DetailInformations",
            //    nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitiativeType",
                table: "RoleSettingDetail");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "RoleSettingDetail");

            migrationBuilder.DropColumn(
                name: "Stage",
                table: "RoleSettingDetail");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "RoleSettingDetail");

            migrationBuilder.DropColumn(
                name: "TypeOfInvestment",
                table: "RoleSettingDetail");

            //migrationBuilder.DropColumn(
            //    name: "DigitalStrategy",
            //    table: "DetailInformations");

            migrationBuilder.AlterColumn<string>(
                name: "RoleName",
                table: "RoleSettingDetail",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RoleId",
                table: "RoleSettingDetail",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 500,
                oldNullable: true);
        }
    }
}
