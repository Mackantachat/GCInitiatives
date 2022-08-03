using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class update_DetailOld : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssumptionOfGoal",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cfo",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cto",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DivMgrOfProcessEngineer",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Gate1Date",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Gate2Date",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Gate3Date",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GoalAchievement",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InititativeType",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsImpactProduction",
                table: "DetailInformations",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsMainPlant",
                table: "DetailInformations",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "KickoffMeeting",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectControl",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectPriority",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReasonForChange",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "SimProjectSkipGate2",
                table: "DetailInformations",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Smes",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SponsorEvp",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubWorkstream",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ToFinance",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkstreamLeadVp",
                table: "DetailInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssumptionOfGoal",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Cfo",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Cto",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "DivMgrOfProcessEngineer",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Gate1Date",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Gate2Date",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Gate3Date",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "GoalAchievement",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "InititativeType",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "IsImpactProduction",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "IsMainPlant",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "KickoffMeeting",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ProjectControl",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ProjectPriority",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ReasonForChange",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "SimProjectSkipGate2",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Smes",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "SponsorEvp",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "SubWorkstream",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ToFinance",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "WorkstreamLeadVp",
                table: "DetailInformations");
        }
    }
}
