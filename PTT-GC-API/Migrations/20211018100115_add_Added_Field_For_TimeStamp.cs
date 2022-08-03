using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_Added_Field_For_TimeStamp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreateBy",
                table: "CapexInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateDate",
                table: "CapexInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReviseBgDate",
                table: "CapexInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateBy",
                table: "CapexInformations");

            migrationBuilder.DropColumn(
                name: "CreateDate",
                table: "CapexInformations");

            migrationBuilder.DropColumn(
                name: "ReviseBgDate",
                table: "CapexInformations");
        }
    }
}
