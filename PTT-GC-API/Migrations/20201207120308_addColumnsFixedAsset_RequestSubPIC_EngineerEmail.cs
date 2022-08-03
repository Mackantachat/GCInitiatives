using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addColumnsFixedAsset_RequestSubPIC_EngineerEmail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EngineerEmail",
                table: "DimMaxHandsover",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "FixedAsset",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "RequestSubPic",
                table: "DetailInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EngineerEmail",
                table: "DimMaxHandsover");

            migrationBuilder.DropColumn(
                name: "FixedAsset",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "RequestSubPic",
                table: "DetailInformations");
        }
    }
}
