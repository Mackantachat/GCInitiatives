using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_ProgressPlanDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProgressPlanDate",
                columns: table => new
                {
                    ProgressPlanDateId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProgressPlanDateType = table.Column<string>(nullable: true),
                    BasicStartDate = table.Column<DateTime>(nullable: true),
                    BasicFinishDate = table.Column<DateTime>(nullable: true),
                    ActualStartDate = table.Column<DateTime>(nullable: true),
                    ActualFinishDate = table.Column<DateTime>(nullable: true),
                    PocWeightPercent = table.Column<int>(nullable: true),
                    InitiativeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgressPlanDate", x => x.ProgressPlanDateId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProgressPlanDate");
        }
    }
}
