using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addPerformanceInactive : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PerformanceInactive",
                columns: table => new
                {
                    PerformanceInactiveId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: true),
                    InitiativeCode = table.Column<string>(nullable: true),
                    POC = table.Column<bool>(nullable: true),
                    OutstandingItems = table.Column<bool>(nullable: true),
                    HighlightWork = table.Column<bool>(nullable: true),
                    CLSD = table.Column<bool>(nullable: true),
                    BenefitTracking = table.Column<bool>(nullable: true),
                    FromDate = table.Column<DateTime>(nullable: true),
                    ToDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformanceInactive", x => x.PerformanceInactiveId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PerformanceInactive");
        }
    }
}
