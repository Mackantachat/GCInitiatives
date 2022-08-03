using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class InitiativeApproveStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Approver1",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Approver2",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Approver3",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status1",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status2",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status3",
                table: "Initiatives",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Approver1",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Approver2",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Approver3",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Status1",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Status2",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Status3",
                table: "Initiatives");
        }
    }
}
