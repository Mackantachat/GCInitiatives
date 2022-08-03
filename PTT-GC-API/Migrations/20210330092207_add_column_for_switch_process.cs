using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_column_for_switch_process : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SwitchProcessStage",
                table: "StageMaster",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SwitchProcessStatus",
                table: "StageMaster",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SwitchProcessStage",
                table: "InitiativeStageDetail",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SwitchProcessStatus",
                table: "InitiativeStageDetail",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SwitchProcessStage",
                table: "StageMaster");

            migrationBuilder.DropColumn(
                name: "SwitchProcessStatus",
                table: "StageMaster");

            migrationBuilder.DropColumn(
                name: "SwitchProcessStage",
                table: "InitiativeStageDetail");

            migrationBuilder.DropColumn(
                name: "SwitchProcessStatus",
                table: "InitiativeStageDetail");
        }
    }
}
