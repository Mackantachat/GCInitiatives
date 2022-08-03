using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class changeEmocInitiativeId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DetailInformationId",
                table: "MainPlant");

            migrationBuilder.AddColumn<string>(
                name: "AssumptionOfGoal",
                table: "MainPlant",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GoalAchievement",
                table: "MainPlant",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InitiativeId",
                table: "MainPlant",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReasonForChange",
                table: "MainPlant",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssumptionOfGoal",
                table: "MainPlant");

            migrationBuilder.DropColumn(
                name: "GoalAchievement",
                table: "MainPlant");

            migrationBuilder.DropColumn(
                name: "InitiativeId",
                table: "MainPlant");

            migrationBuilder.DropColumn(
                name: "ReasonForChange",
                table: "MainPlant");

            migrationBuilder.AddColumn<int>(
                name: "DetailInformationId",
                table: "MainPlant",
                type: "int",
                nullable: true);
        }
    }
}
