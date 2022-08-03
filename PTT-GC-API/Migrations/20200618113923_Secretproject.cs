using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class Secretproject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Divestment",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GoToStage",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecretProject",
                table: "Initiatives",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Divestment",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "GoToStage",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "SecretProject",
                table: "Initiatives");
        }
    }
}
