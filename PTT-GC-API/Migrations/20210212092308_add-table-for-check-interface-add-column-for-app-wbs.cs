using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addtableforcheckinterfaceaddcolumnforappwbs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppropriationNo",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WBSNo",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "InterfaceActionLog",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: true),
                    ActionDate = table.Column<DateTime>(nullable: true),
                    InterfaceType = table.Column<string>(nullable: true),
                    InterfaceAction = table.Column<string>(nullable: true),
                    ResponseData = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterfaceActionLog", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InterfaceActionLog");

            migrationBuilder.DropColumn(
                name: "AppropriationNo",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "WBSNo",
                table: "Initiatives");
        }
    }
}
