using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addStatusForTabAndStoredToExecuteStageMaster : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PostStageStoredProcedure",
                table: "StageMaster",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreStageStoredProcedure",
                table: "StageMaster",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BestPracticeTabStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CapexTabStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DetailTabStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GeneralTabStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ImpactTabStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LessonLearnTabStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LookbackTabStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProgressTabStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ResourceTabStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RiskTabStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StatusTabStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StrategyTabStatus",
                table: "Initiatives",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PostStageStoredProcedure",
                table: "StageMaster");

            migrationBuilder.DropColumn(
                name: "PreStageStoredProcedure",
                table: "StageMaster");

            migrationBuilder.DropColumn(
                name: "BestPracticeTabStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "CapexTabStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "DetailTabStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "GeneralTabStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "ImpactTabStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "LessonLearnTabStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "LookbackTabStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "ProgressTabStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "ResourceTabStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "RiskTabStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "StatusTabStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "StrategyTabStatus",
                table: "Initiatives");
        }
    }
}
