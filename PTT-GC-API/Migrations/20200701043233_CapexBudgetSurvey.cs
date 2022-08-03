using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class CapexBudgetSurvey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CapexTopicId",
                table: "CapexChoices",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Effective",
                table: "CapexBudgetSurveys",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Impact",
                table: "CapexBudgetSurveys",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Law",
                table: "CapexBudgetSurveys",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "CapexBudgetSurveys",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CapexChoices_CapexTopicId",
                table: "CapexChoices",
                column: "CapexTopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_CapexChoices_CapexTopics_CapexTopicId",
                table: "CapexChoices",
                column: "CapexTopicId",
                principalTable: "CapexTopics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CapexChoices_CapexTopics_CapexTopicId",
                table: "CapexChoices");

            migrationBuilder.DropIndex(
                name: "IX_CapexChoices_CapexTopicId",
                table: "CapexChoices");

            migrationBuilder.DropColumn(
                name: "CapexTopicId",
                table: "CapexChoices");

            migrationBuilder.DropColumn(
                name: "Effective",
                table: "CapexBudgetSurveys");

            migrationBuilder.DropColumn(
                name: "Impact",
                table: "CapexBudgetSurveys");

            migrationBuilder.DropColumn(
                name: "Law",
                table: "CapexBudgetSurveys");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "CapexBudgetSurveys");
        }
    }
}
