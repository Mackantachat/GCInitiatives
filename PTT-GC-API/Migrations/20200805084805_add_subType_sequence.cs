using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_subType_sequence : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SubType",
                table: "TypeStageApprover",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubType",
                table: "TypeStage",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RunningSequence",
                table: "InitiativeStatusTrackings",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "SubType",
                table: "InitiativeStatusTrackings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubType",
                table: "TypeStageApprover");

            migrationBuilder.DropColumn(
                name: "SubType",
                table: "TypeStage");

            migrationBuilder.DropColumn(
                name: "RunningSequence",
                table: "InitiativeStatusTrackings");

            migrationBuilder.DropColumn(
                name: "SubType",
                table: "InitiativeStatusTrackings");
        }
    }
}
