using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class upadatedetailInformation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<DateTime>(
                name: "BOD1",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BOD2",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Comparison",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EntryMode",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EntryModeSpecify",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FX",
                table: "DetailInformations",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstBudgetYear",
                table: "DetailInformations",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Geography",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GeographySpecify",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Irr",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ListOfEquipment",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MgrOfProcessEngineer",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Npv",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OthersStrategic",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProcessEngineer",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProgressUpdate",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectDirector",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectDmManager",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectEngineer",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "RequireBOD1",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "RequireProject",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StatusProgress",
                table: "DetailInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsUtilityTableRequired",
                table: "ResourceNeededs");

            migrationBuilder.DropColumn(
                name: "BOD1",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "BOD2",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Comparison",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "EntryMode",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "EntryModeSpecify",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "FX",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "FirstBudgetYear",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Geography",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "GeographySpecify",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Irr",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ListOfEquipment",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "MgrOfProcessEngineer",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Npv",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "OthersStrategic",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ProcessEngineer",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ProgressUpdate",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ProjectDirector",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ProjectDmManager",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ProjectEngineer",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "RequireBOD1",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "RequireProject",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "StatusProgress",
                table: "DetailInformations");
        }
    }
}
