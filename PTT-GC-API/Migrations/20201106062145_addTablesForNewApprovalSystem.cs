using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addTablesForNewApprovalSystem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ActionResult",
                table: "InitiativeActions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FlowType",
                table: "InitiativeActions",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InitiativeStageDetailId",
                table: "InitiativeActions",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsInactive",
                table: "InitiativeActions",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "InitiativeStage",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    FlowType = table.Column<string>(nullable: true),
                    Stage = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InitiativeStage", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InitiativeStageActionDetail",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeStageDetailId = table.Column<int>(nullable: false),
                    InitiativeId = table.Column<int>(nullable: false),
                    ActionType = table.Column<string>(nullable: true),
                    ActionBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InitiativeStageActionDetail", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InitiativeStageDetail",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeStageDetailId = table.Column<int>(nullable: false),
                    InitiativeId = table.Column<int>(nullable: false),
                    Event = table.Column<string>(nullable: true),
                    Process = table.Column<string>(nullable: true),
                    FlowType = table.Column<string>(nullable: true),
                    Subtype = table.Column<string>(nullable: true),
                    CurrentStage = table.Column<string>(nullable: true),
                    CurrentStatus = table.Column<string>(nullable: true),
                    NextStage = table.Column<string>(nullable: true),
                    NextStatus = table.Column<string>(nullable: true),
                    ReviseStage = table.Column<string>(nullable: true),
                    ReviseStatus = table.Column<string>(nullable: true),
                    RejectStage = table.Column<string>(nullable: true),
                    RejectStatus = table.Column<string>(nullable: true),
                    BackwardStage = table.Column<string>(nullable: true),
                    BackwardStatus = table.Column<string>(nullable: true),
                    CancelStage = table.Column<string>(nullable: true),
                    CancelStatus = table.Column<string>(nullable: true),
                    Sequence = table.Column<decimal>(nullable: false),
                    NextCondition = table.Column<string>(nullable: true),
                    HistoryId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InitiativeStageDetail", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StageActionMaster",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StageMasterId = table.Column<int>(nullable: false),
                    ActionType = table.Column<string>(nullable: true),
                    ActionBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StageActionMaster", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StageMaster",
                columns: table => new
                {
                    StageMasterId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Event = table.Column<string>(nullable: true),
                    Process = table.Column<string>(nullable: true),
                    FlowType = table.Column<string>(nullable: true),
                    Subtype = table.Column<string>(nullable: true),
                    CurrentStage = table.Column<string>(nullable: true),
                    CurrentStatus = table.Column<string>(nullable: true),
                    NextStage = table.Column<string>(nullable: true),
                    NextStatus = table.Column<string>(nullable: true),
                    ReviseStage = table.Column<string>(nullable: true),
                    ReviseStatus = table.Column<string>(nullable: true),
                    RejectStage = table.Column<string>(nullable: true),
                    RejectStatus = table.Column<string>(nullable: true),
                    BackwardStage = table.Column<string>(nullable: true),
                    BackwardStatus = table.Column<string>(nullable: true),
                    CancelStage = table.Column<string>(nullable: true),
                    CancelStatus = table.Column<string>(nullable: true),
                    Sequence = table.Column<decimal>(nullable: false),
                    NextCondition = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StageMaster", x => x.StageMasterId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InitiativeStage");

            migrationBuilder.DropTable(
                name: "InitiativeStageActionDetail");

            migrationBuilder.DropTable(
                name: "InitiativeStageDetail");

            migrationBuilder.DropTable(
                name: "StageActionMaster");

            migrationBuilder.DropTable(
                name: "StageMaster");

            migrationBuilder.DropColumn(
                name: "ActionResult",
                table: "InitiativeActions");

            migrationBuilder.DropColumn(
                name: "FlowType",
                table: "InitiativeActions");

            migrationBuilder.DropColumn(
                name: "InitiativeStageDetailId",
                table: "InitiativeActions");

            migrationBuilder.DropColumn(
                name: "IsInactive",
                table: "InitiativeActions");
        }
    }
}
