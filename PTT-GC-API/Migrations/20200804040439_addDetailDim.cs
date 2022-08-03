using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addDetailDim : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ActualFinishDate",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ActualStartDate",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BaselineFinishDate",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BaselineStartDate",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CostDetail",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeliverAsPerCommittedCost",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeliverAsPerCommittedDate",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeliverAsPerCommittedScope",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectCategory",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReviseForecastFinishDate",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReviseForecastStartDate",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ScopeDetail",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TimelineDetail",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserFeedback",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ValueChain",
                table: "DetailInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActualFinishDate",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ActualStartDate",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "BaselineFinishDate",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "BaselineStartDate",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "CostDetail",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "IsDeliverAsPerCommittedCost",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "IsDeliverAsPerCommittedDate",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "IsDeliverAsPerCommittedScope",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ProjectCategory",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ReviseForecastFinishDate",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ReviseForecastStartDate",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ScopeDetail",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "TimelineDetail",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "UserFeedback",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ValueChain",
                table: "DetailInformations");
        }
    }
}
