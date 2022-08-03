using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class RemovePlanBOD : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PlanBOD1",
                table: "InitiativeDetails");

            migrationBuilder.DropColumn(
                name: "PlanBOD2",
                table: "InitiativeDetails");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "PlanBOD1",
                table: "InitiativeDetails",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PlanBOD2",
                table: "InitiativeDetails",
                type: "datetime2",
                nullable: true);
        }
    }
}
