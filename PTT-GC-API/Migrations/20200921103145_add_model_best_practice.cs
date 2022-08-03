using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_model_best_practice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BestPractices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    IsBestPracticeRequired = table.Column<bool>(nullable: false),
                    KnowledgeType = table.Column<string>(nullable: true),
                    SharedTo = table.Column<string>(nullable: true),
                    PublishToOpex = table.Column<bool>(nullable: false),
                    SharedPracticeType = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    KnowledgeOwner = table.Column<string>(nullable: true),
                    KnowledgeContributor = table.Column<string>(nullable: true),
                    Company = table.Column<string>(nullable: true),
                    Plant = table.Column<string>(nullable: true),
                    Organization = table.Column<string>(nullable: true),
                    IsDigitalization = table.Column<bool>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: true),
                    EndDate = table.Column<DateTime>(nullable: true),
                    YearOfBestPractice = table.Column<DateTime>(nullable: true),
                    LifeTimeOfProject = table.Column<int>(nullable: true),
                    Investment = table.Column<decimal>(type: "decimal(18,3)", nullable: true),
                    ProjectCostPerYear = table.Column<decimal>(type: "decimal(18,3)", nullable: true),
                    AbstractSummary = table.Column<string>(nullable: true),
                    AbstractDetail = table.Column<string>(nullable: true),
                    Objective = table.Column<string>(nullable: true),
                    Benefit = table.Column<decimal>(type: "decimal(18,3)", nullable: true),
                    KnowledgeTheme = table.Column<string>(nullable: true),
                    EnterpriseKeyword = table.Column<string>(nullable: true),
                    CaptureMethod = table.Column<string>(nullable: true),
                    CaptureMethodNote = table.Column<string>(nullable: true),
                    TargetGroupNote = table.Column<string>(nullable: true),
                    ApplyFrom = table.Column<DateTime>(nullable: true),
                    ApplyFromOpEx = table.Column<DateTime>(nullable: true),
                    BusinessLine = table.Column<string>(nullable: true),
                    ProjectType = table.Column<string>(nullable: true),
                    OemsElement = table.Column<string>(nullable: true),
                    Application = table.Column<string>(nullable: true),
                    OperationFunction = table.Column<string>(nullable: true),
                    OperationUnit = table.Column<string>(nullable: true),
                    EquipmentType = table.Column<string>(nullable: true),
                    ProductGroup = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BestPractices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Contact",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    ContactNo = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contact", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CpiDetailInformations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    SourceOfImprovement = table.Column<string>(nullable: true),
                    CpiType = table.Column<string>(nullable: true),
                    AnalysisTool = table.Column<string>(nullable: true),
                    RootCause = table.Column<string>(nullable: true),
                    EstimatedBudgetOpex = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ExtimatedBudgetSavings = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    EstimatedBenefitCalculationDetails = table.Column<string>(nullable: true),
                    ActualBudgetOpex = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ActualBudgetSavings = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ActualBenefitCalculationDetails = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CpiDetailInformations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CpiKpis",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    Kpi = table.Column<string>(nullable: true),
                    BaseLine = table.Column<string>(nullable: true),
                    Target = table.Column<string>(nullable: true),
                    Unit = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    Result = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CpiKpis", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LessonsLearned",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsDeleted = table.Column<bool>(nullable: false),
                    InitiativeId = table.Column<int>(nullable: false),
                    LessonLearnNo = table.Column<int>(nullable: false),
                    MilestoneNo = table.Column<int>(nullable: false),
                    AreaOfLearning = table.Column<string>(nullable: true),
                    Issues = table.Column<string>(nullable: true),
                    Background = table.Column<string>(nullable: true),
                    LessonLearned = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    Rating = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonsLearned", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProjectReference",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    No = table.Column<int>(nullable: false),
                    ProjectReference = table.Column<string>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectReference", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BestPractices");

            migrationBuilder.DropTable(
                name: "Contact");

            migrationBuilder.DropTable(
                name: "CpiDetailInformations");

            migrationBuilder.DropTable(
                name: "CpiKpis");

            migrationBuilder.DropTable(
                name: "LessonsLearned");

            migrationBuilder.DropTable(
                name: "ProjectReference");
        }
    }
}
