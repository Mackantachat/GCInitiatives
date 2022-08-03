using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class change_new_ProgressPlanModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActualFinishDate",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "ActualStartDate",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "BasicFinishDate",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "BasicStartDate",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "PocWeightPercent",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "TypeOfProgressPlanDate",
                table: "ProgressPlan");

            migrationBuilder.AddColumn<decimal>(
                name: "Apr",
                table: "ProgressPlan",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Aug",
                table: "ProgressPlan",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Dec",
                table: "ProgressPlan",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Feb",
                table: "ProgressPlan",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Jan",
                table: "ProgressPlan",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Jul",
                table: "ProgressPlan",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Jun",
                table: "ProgressPlan",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Mar",
                table: "ProgressPlan",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "May",
                table: "ProgressPlan",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Nov",
                table: "ProgressPlan",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Oct",
                table: "ProgressPlan",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PlanActual",
                table: "ProgressPlan",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProgressPlanType",
                table: "ProgressPlan",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Sep",
                table: "ProgressPlan",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Year",
                table: "ProgressPlan",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Apr",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "Aug",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "Dec",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "Feb",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "Jan",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "Jul",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "Jun",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "Mar",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "May",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "Nov",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "Oct",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "PlanActual",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "ProgressPlanType",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "Sep",
                table: "ProgressPlan");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "ProgressPlan");

            migrationBuilder.AddColumn<DateTime>(
                name: "ActualFinishDate",
                table: "ProgressPlan",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ActualStartDate",
                table: "ProgressPlan",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BasicFinishDate",
                table: "ProgressPlan",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BasicStartDate",
                table: "ProgressPlan",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PocWeightPercent",
                table: "ProgressPlan",
                type: "decimal(18,4)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TypeOfProgressPlanDate",
                table: "ProgressPlan",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
