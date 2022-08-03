using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_new_colunm_for_new_lookback : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ShowEnvironmentLookback",
                table: "ProjectLookback",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ShowPerformanceLookback",
                table: "ProjectLookback",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Actual",
                table: "ExecutionLookback",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Plan",
                table: "ExecutionLookback",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShowEnvironmentLookback",
                table: "ProjectLookback");

            migrationBuilder.DropColumn(
                name: "ShowPerformanceLookback",
                table: "ProjectLookback");

            migrationBuilder.DropColumn(
                name: "Actual",
                table: "ExecutionLookback");

            migrationBuilder.DropColumn(
                name: "Plan",
                table: "ExecutionLookback");
        }
    }
}
