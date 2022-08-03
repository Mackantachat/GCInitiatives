using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class statustabredesign : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CurrentActionInformation",
                table: "StageMaster",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CurrentStageDisplay",
                table: "StageMaster",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NextActionInformation",
                table: "StageMaster",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CurrentActionInformation",
                table: "InitiativeStageDetail",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CurrentStageDisplay",
                table: "InitiativeStageDetail",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NextActionInformation",
                table: "InitiativeStageDetail",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentActionInformation",
                table: "StageMaster");

            migrationBuilder.DropColumn(
                name: "CurrentStageDisplay",
                table: "StageMaster");

            migrationBuilder.DropColumn(
                name: "NextActionInformation",
                table: "StageMaster");

            migrationBuilder.DropColumn(
                name: "CurrentActionInformation",
                table: "InitiativeStageDetail");

            migrationBuilder.DropColumn(
                name: "CurrentStageDisplay",
                table: "InitiativeStageDetail");

            migrationBuilder.DropColumn(
                name: "NextActionInformation",
                table: "InitiativeStageDetail");
        }
    }
}
