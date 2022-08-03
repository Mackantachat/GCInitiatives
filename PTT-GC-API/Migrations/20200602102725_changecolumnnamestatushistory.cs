using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class changecolumnnamestatushistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApprovedBy",
                table: "InitiativeStatusHistory");

            migrationBuilder.DropColumn(
                name: "ApprovedDate",
                table: "InitiativeStatusHistory");

            migrationBuilder.AddColumn<string>(
                name: "ActionBy",
                table: "InitiativeStatusHistory",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ActionDate",
                table: "InitiativeStatusHistory",
                type: "nvarchar(max)",
                nullable: true);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActionBy",
                table: "InitiativeStatusHistory");

            migrationBuilder.DropColumn(
                name: "ActionDate",
                table: "InitiativeStatusHistory");

            migrationBuilder.AddColumn<string>(
                name: "ApprovedBy",
                table: "InitiativeStatusHistory",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApprovedDate",
                table: "InitiativeStatusHistory",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
