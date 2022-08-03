using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class AddStartingDateAndWacc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "StartingDate",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Wacc",
                table: "Initiatives",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StartingDate",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Wacc",
                table: "Initiatives");
        }
    }
}
