using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class change_in_RiskTable_Column : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletingDate",
                table: "RiskTable");

            migrationBuilder.DropColumn(
                name: "Impact",
                table: "RiskTable");

            migrationBuilder.DropColumn(
                name: "Likelihood",
                table: "RiskTable");

            migrationBuilder.DropColumn(
                name: "MitigationPlan",
                table: "RiskTable");

            migrationBuilder.DropColumn(
                name: "MitigationProgress",
                table: "RiskTable");

            migrationBuilder.DropColumn(
                name: "Phase",
                table: "RiskTable");

            migrationBuilder.DropColumn(
                name: "RiskFactorId",
                table: "RiskTable");

            migrationBuilder.DropColumn(
                name: "RootCauseDesction",
                table: "RiskTable");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CompletingDate",
                table: "RiskTable",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Impact",
                table: "RiskTable",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Likelihood",
                table: "RiskTable",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MitigationPlan",
                table: "RiskTable",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MitigationProgress",
                table: "RiskTable",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phase",
                table: "RiskTable",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RiskFactorId",
                table: "RiskTable",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RootCauseDesction",
                table: "RiskTable",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
