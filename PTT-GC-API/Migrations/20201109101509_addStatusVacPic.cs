using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addStatusVacPic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StatusVac",
                table: "VacList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StatusPic",
                table: "PicList",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InitiativeStatus",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Process",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Result",
                table: "InitiativeMember",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Stage",
                table: "InitiativeMember",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StatusVac",
                table: "VacList");

            migrationBuilder.DropColumn(
                name: "StatusPic",
                table: "PicList");

            migrationBuilder.DropColumn(
                name: "InitiativeStatus",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "Process",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "Result",
                table: "InitiativeMember");

            migrationBuilder.DropColumn(
                name: "Stage",
                table: "InitiativeMember");
        }
    }
}
