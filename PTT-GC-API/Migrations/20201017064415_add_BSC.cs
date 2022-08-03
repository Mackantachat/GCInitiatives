using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_BSC : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CommissioningStartup",
                table: "ProgressHeader",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Construction",
                table: "ProgressHeader",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Engineering",
                table: "ProgressHeader",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EnvironmentKpi",
                table: "ProgressHeader",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExecutiveSummary",
                table: "ProgressHeader",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MitigationPlan",
                table: "ProgressHeader",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Procurement",
                table: "ProgressHeader",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectManagement",
                table: "ProgressHeader",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RiskAndConcern",
                table: "ProgressHeader",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkForNextMonth",
                table: "ProgressHeader",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CommissioningStartup",
                table: "ProgressHeader");

            migrationBuilder.DropColumn(
                name: "Construction",
                table: "ProgressHeader");

            migrationBuilder.DropColumn(
                name: "Engineering",
                table: "ProgressHeader");

            migrationBuilder.DropColumn(
                name: "EnvironmentKpi",
                table: "ProgressHeader");

            migrationBuilder.DropColumn(
                name: "ExecutiveSummary",
                table: "ProgressHeader");

            migrationBuilder.DropColumn(
                name: "MitigationPlan",
                table: "ProgressHeader");

            migrationBuilder.DropColumn(
                name: "Procurement",
                table: "ProgressHeader");

            migrationBuilder.DropColumn(
                name: "ProjectManagement",
                table: "ProgressHeader");

            migrationBuilder.DropColumn(
                name: "RiskAndConcern",
                table: "ProgressHeader");

            migrationBuilder.DropColumn(
                name: "WorkForNextMonth",
                table: "ProgressHeader");
        }
    }
}
