using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class LookBackfamily : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CimLookback",
                columns: table => new
                {
                    CimLookbackId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectLookbackId = table.Column<int>(nullable: true),
                    CimLookbackType = table.Column<string>(nullable: true),
                    Aspect = table.Column<string>(nullable: true),
                    Approve = table.Column<string>(nullable: true),
                    Actual = table.Column<string>(nullable: true),
                    DifferenceNote = table.Column<string>(nullable: true),
                    BusinessPlan = table.Column<string>(nullable: true),
                    ResponsiblePerson = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CimLookback", x => x.CimLookbackId);
                });

            migrationBuilder.CreateTable(
                name: "CoreUplift",
                columns: table => new
                {
                    CoreUpliftId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectLookbackId = table.Column<int>(nullable: true),
                    Economics = table.Column<string>(nullable: true),
                    EstimatedPlaned = table.Column<string>(nullable: true),
                    Actual = table.Column<string>(nullable: true),
                    WhyDifference = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    Comment = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoreUplift", x => x.CoreUpliftId);
                });

            migrationBuilder.CreateTable(
                name: "EnvironmentProjectType",
                columns: table => new
                {
                    EnviTypeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectLookbackId = table.Column<int>(nullable: false),
                    EnviType = table.Column<string>(nullable: true),
                    EnviTypeValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnvironmentProjectType", x => x.EnviTypeId);
                });

            migrationBuilder.CreateTable(
                name: "ExecutionLookback",
                columns: table => new
                {
                    ExecutionLookbackId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectLookbackId = table.Column<int>(nullable: true),
                    KnowledgeArea = table.Column<string>(nullable: true),
                    Issue = table.Column<string>(nullable: true),
                    Background = table.Column<string>(nullable: true),
                    LessonLearned = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    Comment = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExecutionLookback", x => x.ExecutionLookbackId);
                });

            migrationBuilder.CreateTable(
                name: "LookbackReview",
                columns: table => new
                {
                    LookbackReviewId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectLookbackId = table.Column<int>(nullable: true),
                    ProjectReviewTeam = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LookbackReview", x => x.LookbackReviewId);
                });

            migrationBuilder.CreateTable(
                name: "ProjectImpact",
                columns: table => new
                {
                    ProjectImpactId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectLookbackId = table.Column<int>(nullable: true),
                    Situation = table.Column<string>(nullable: true),
                    Before = table.Column<string>(nullable: true),
                    Target = table.Column<string>(nullable: true),
                    After = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectImpact", x => x.ProjectImpactId);
                });

            migrationBuilder.CreateTable(
                name: "ProjectImpactWork",
                columns: table => new
                {
                    ProjectImpactWorkId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectLookbackId = table.Column<int>(nullable: true),
                    WhatWorked = table.Column<string>(nullable: true),
                    WhatDidNotWork = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectImpactWork", x => x.ProjectImpactWorkId);
                });

            migrationBuilder.CreateTable(
                name: "ProjectLookback",
                columns: table => new
                {
                    ProjectLookbackLookbackId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FinishingDate = table.Column<DateTime>(nullable: true),
                    PlanLookbackDate = table.Column<DateTime>(nullable: true),
                    PlanEnviLookBackDate = table.Column<DateTime>(nullable: true),
                    PlanPerformanceLookbackDate = table.Column<DateTime>(nullable: true),
                    ProjectBackground = table.Column<string>(nullable: true),
                    ScopeOfInitiative = table.Column<string>(nullable: true),
                    ProjectObjective = table.Column<string>(nullable: true),
                    ExecutionLookback = table.Column<bool>(nullable: true),
                    PerformanceLookback = table.Column<bool>(nullable: true),
                    EnvironmentLookback = table.Column<bool>(nullable: true),
                    CimLookback = table.Column<bool>(nullable: true),
                    PerformancePlanLookbackDate = table.Column<DateTime>(nullable: true),
                    CoreUpliftResultDescription = table.Column<string>(nullable: true),
                    CoreUpliftResultUnit = table.Column<string>(nullable: true),
                    CoreUpliftResultBefore = table.Column<string>(nullable: true),
                    CoreUpliftResultAfter = table.Column<string>(nullable: true),
                    CoreUpliftResultBenefit = table.Column<string>(nullable: true),
                    CoreUpliftResultRating = table.Column<string>(nullable: true),
                    EnviPlanLookbackDate = table.Column<DateTime>(nullable: true),
                    PollutionPrevention = table.Column<string>(nullable: true),
                    PollutionPreventionSpecify = table.Column<string>(nullable: true),
                    GlobalEnvirCons = table.Column<string>(nullable: true),
                    GlobalEnvirConsSpecify = table.Column<string>(nullable: true),
                    ResourceCirculation = table.Column<string>(nullable: true),
                    ResourceCirculationSpecify = table.Column<string>(nullable: true),
                    EnvironmentResultCategory = table.Column<string>(nullable: true),
                    EnvironmentResultUnit = table.Column<string>(nullable: true),
                    EnvironmentResultBefore = table.Column<string>(nullable: true),
                    EnvironmentResultAfter = table.Column<string>(nullable: true),
                    EnvironmentResultBenefitYear = table.Column<string>(nullable: true),
                    EnvironmentResultBenefitYearThb = table.Column<string>(nullable: true),
                    EnvironmentResultRemark = table.Column<string>(nullable: true),
                    McEndorseDate = table.Column<DateTime>(nullable: true),
                    BusinessPlanAsOfDate = table.Column<DateTime>(nullable: true),
                    BusinessPlanAsOfDate2 = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectLookback", x => x.ProjectLookbackLookbackId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CimLookback");

            migrationBuilder.DropTable(
                name: "CoreUplift");

            migrationBuilder.DropTable(
                name: "EnvironmentProjectType");

            migrationBuilder.DropTable(
                name: "ExecutionLookback");

            migrationBuilder.DropTable(
                name: "LookbackReview");

            migrationBuilder.DropTable(
                name: "ProjectImpact");

            migrationBuilder.DropTable(
                name: "ProjectImpactWork");

            migrationBuilder.DropTable(
                name: "ProjectLookback");
        }
    }
}
