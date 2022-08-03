using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class create_PimGate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PimGate",
                columns: table => new
                {
                    PimGateId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: true),
                    PimGateStatus = table.Column<string>(nullable: true),
                    ReviseBudgetRevision = table.Column<int>(nullable: true),
                    Rate = table.Column<int>(nullable: true),
                    CostEstimate = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    OverallCapex = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    RequestOpex = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Benefit = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Irr = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    SimplePayback = table.Column<int>(nullable: true),
                    Ram = table.Column<int>(nullable: true),
                    JFactor = table.Column<int>(nullable: true),
                    RequestPool = table.Column<bool>(nullable: true),
                    Note = table.Column<string>(nullable: true),
                    SimplefiedProject = table.Column<bool>(nullable: true),
                    ReceivedOpexBudget = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ReceivedCapexGate2 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    RequestCapexGate3 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    AdditionalOpexBudget = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TieInLongLeadItemsBudget = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    EmocStatus = table.Column<string>(nullable: true),
                    ExecutionLookbackStatus = table.Column<string>(nullable: true),
                    SapStatus = table.Column<string>(nullable: true),
                    VacDate = table.Column<DateTime>(nullable: true),
                    VacStatus = table.Column<string>(nullable: true),
                    GateDate = table.Column<DateTime>(nullable: true),
                    GateStatus = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PimGate", x => x.PimGateId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PimGate");
        }
    }
}
