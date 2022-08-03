using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_models_for_risk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.CreateTable(
                name: "RiskActions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RiskId = table.Column<int>(nullable: false),
                    RiskNo = table.Column<int>(nullable: false),
                    ActionNo = table.Column<int>(nullable: false),
                    ActionDescription = table.Column<string>(nullable: true),
                    DueDate = table.Column<DateTime>(nullable: false),
                    ActualCompletingDate = table.Column<DateTime>(nullable: false),
                    Responsible = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiskActions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RiskHeaders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RiskNo = table.Column<int>(nullable: false),
                    RiskId = table.Column<int>(nullable: false),
                    InitiativeId = table.Column<int>(nullable: false),
                    RegisterDate = table.Column<DateTime>(nullable: true),
                    RiskFactor = table.Column<string>(nullable: true),
                    Phase = table.Column<string>(nullable: true),
                    ApprovePeriod = table.Column<string>(nullable: true),
                    RootCauseDescription = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiskHeaders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RiskKRIs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RiskId = table.Column<int>(nullable: false),
                    RiskNo = table.Column<int>(nullable: false),
                    No = table.Column<int>(nullable: false),
                    KRITarget = table.Column<string>(nullable: true),
                    KRITolerance = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    Progress = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiskKRIs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RiskTable",
                columns: table => new
                {
                    RiskId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    RiskFactorId = table.Column<string>(nullable: true),
                    RootCauseDesction = table.Column<string>(nullable: true),
                    Phase = table.Column<string>(nullable: true),
                    Impact = table.Column<string>(nullable: true),
                    Likelihood = table.Column<string>(nullable: true),
                    MitigationPlan = table.Column<string>(nullable: true),
                    CompletingDate = table.Column<DateTime>(nullable: true),
                    MitigationProgress = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiskTable", x => x.RiskId);
                });

           
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AirPollutions");

            migrationBuilder.DropTable(
                name: "Condensates");

            migrationBuilder.DropTable(
                name: "Electricities");

            migrationBuilder.DropTable(
                name: "Fluids");

            migrationBuilder.DropTable(
                name: "Lands");

            migrationBuilder.DropTable(
                name: "Manpowers");

            migrationBuilder.DropTable(
                name: "OriginalRisks");

            migrationBuilder.DropTable(
                name: "Others");

            migrationBuilder.DropTable(
                name: "ResourceNeededs");

            migrationBuilder.DropTable(
                name: "RiskActions");

            migrationBuilder.DropTable(
                name: "RiskHeaders");

            migrationBuilder.DropTable(
                name: "RiskKRIs");

            migrationBuilder.DropTable(
                name: "RiskTable");

            migrationBuilder.DropTable(
                name: "TimelineTable");

            migrationBuilder.DropTable(
                name: "Wastes");
        }
    }
}
