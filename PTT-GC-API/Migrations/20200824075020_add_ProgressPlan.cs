using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_ProgressPlan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProgressPlan",
                columns: table => new
                {
                    ProgressPlanId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: true),
                    TypeOfProgressPlanDate = table.Column<string>(nullable: true),
                    BasicStartDate = table.Column<DateTime>(nullable: true),
                    BasicFinishDate = table.Column<DateTime>(nullable: true),
                    ActualStartDate = table.Column<DateTime>(nullable: true),
                    ActualFinishDate = table.Column<DateTime>(nullable: true),
                    PocWeightPercent = table.Column<decimal>(type: "decimal(18,4)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgressPlan", x => x.ProgressPlanId);
                });

            migrationBuilder.CreateTable(
                name: "ProgressPlanMontly",
                columns: table => new
                {
                    ProgressPlanMontlyId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProgressPlanId = table.Column<int>(nullable: true),
                    InitiativeId = table.Column<int>(nullable: false),
                    ProgressPlanYear = table.Column<string>(nullable: true),
                    WorkProgress = table.Column<string>(nullable: true),
                    PlanActual = table.Column<string>(nullable: true),
                    Month1 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month2 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month3 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month4 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month5 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month6 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month7 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month8 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month9 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month10 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month11 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month12 = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgressPlanMontly", x => x.ProgressPlanMontlyId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProgressPlan");

            migrationBuilder.DropTable(
                name: "ProgressPlanMontly");
        }
    }
}
