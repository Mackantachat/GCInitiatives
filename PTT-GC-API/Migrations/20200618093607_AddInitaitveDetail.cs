using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class AddInitaitveDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ITBudgetSurveyId",
                table: "ITBudgetSurveyAssets",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BOD1",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BOD2",
                table: "InitiativeDetails",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Irr",
                table: "InitiativeDetails",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Npv",
                table: "InitiativeDetails",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "RequireBOD1",
                table: "InitiativeDetails",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Specify",
                table: "InitiativeDetails",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BOD1",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "BOD2",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "Irr",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "Npv",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "RequireBOD1",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "Specify",
                table: "InitiativeDetails");

            migrationBuilder.AlterColumn<string>(
                name: "ITBudgetSurveyId",
                table: "ITBudgetSurveyAssets",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
