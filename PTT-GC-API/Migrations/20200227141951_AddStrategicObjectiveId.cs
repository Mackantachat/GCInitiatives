using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class AddStrategicObjectiveId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StrategicObjectiveId",
                table: "StrategicObjectives");

            migrationBuilder.AddColumn<int>(
                name: "StrategicObjectiveId",
                table: "Strategies",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "StrategicObjectiveCode",
                table: "StrategicObjectives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Year",
                table: "StrategicObjectives",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Strategies_StrategicObjectiveId",
                table: "Strategies",
                column: "StrategicObjectiveId");

            migrationBuilder.AddForeignKey(
                name: "FK_Strategies_StrategicObjectives_StrategicObjectiveId",
                table: "Strategies",
                column: "StrategicObjectiveId",
                principalTable: "StrategicObjectives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Strategies_StrategicObjectives_StrategicObjectiveId",
                table: "Strategies");

            migrationBuilder.DropIndex(
                name: "IX_Strategies_StrategicObjectiveId",
                table: "Strategies");

            migrationBuilder.DropColumn(
                name: "StrategicObjectiveId",
                table: "Strategies");

            migrationBuilder.DropColumn(
                name: "StrategicObjectiveCode",
                table: "StrategicObjectives");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "StrategicObjectives");

            migrationBuilder.AddColumn<string>(
                name: "StrategicObjectiveId",
                table: "StrategicObjectives",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
