using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_BscNarrative : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BscNarrative",
                columns: table => new
                {
                    BscNarrativeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: true),
                    Year = table.Column<int>(nullable: true),
                    Month = table.Column<int>(nullable: true),
                    Engineering = table.Column<string>(nullable: true),
                    Construction = table.Column<string>(nullable: true),
                    Procurement = table.Column<string>(nullable: true),
                    CommissioningStartup = table.Column<string>(nullable: true),
                    ProjectManagement = table.Column<string>(nullable: true),
                    RiskAndConcern = table.Column<string>(nullable: true),
                    MitigationPlan = table.Column<string>(nullable: true),
                    ExecutiveSummary = table.Column<string>(nullable: true),
                    WorkForNextMonth = table.Column<string>(nullable: true),
                    EnvironmentKpi = table.Column<string>(nullable: true),
                    HighlightWork = table.Column<string>(nullable: true),
                    CatchupPlan = table.Column<string>(nullable: true),
                    NarrativeStatus = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BscNarrative", x => x.BscNarrativeId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BscNarrative");
        }
    }
}
