using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class AddColumnDetailMax : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Checklist",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Cycle",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ProjectPropose",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "UsefulLife",
                table: "DetailInformations");

            migrationBuilder.AddColumn<decimal>(
                name: "CycleMonth",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "CycleYear",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HaveAdditional",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherKpis",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "UsefulMonth",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "UsefulYear",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CycleMonth",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "CycleYear",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "HaveAdditional",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "OtherKpis",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "UsefulMonth",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "UsefulYear",
                table: "DetailInformations");

            migrationBuilder.AddColumn<bool>(
                name: "Checklist",
                table: "DetailInformations",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Cycle",
                table: "DetailInformations",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectPropose",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsefulLife",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
