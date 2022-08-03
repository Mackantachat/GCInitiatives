using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_StatusTracking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CostCenter",
                table: "CapexInformations",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "InitiativeStatusTrackings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<string>(nullable: true),
                    ApprovedBy = table.Column<string>(nullable: true),
                    ApprovedDate = table.Column<string>(nullable: true),
                    InitiativeId = table.Column<int>(nullable: false),
                    HistoryId = table.Column<int>(nullable: false),
                    sequence = table.Column<int>(nullable: false),
                    ProcessType = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InitiativeStatusTrackings", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InitiativeStatusTrackings");

            migrationBuilder.DropColumn(
                name: "CostCenter",
                table: "CapexInformations");
        }
    }
}
