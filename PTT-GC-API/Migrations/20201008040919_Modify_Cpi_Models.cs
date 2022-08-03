using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class Modify_Cpi_Models : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LessonLearnNo",
                table: "LessonsLearned");

            migrationBuilder.DropColumn(
                name: "Kpi",
                table: "CpiKpis");

            migrationBuilder.DropColumn(
                name: "CpiType",
                table: "CpiDetailInformations");

            migrationBuilder.DropColumn(
                name: "AbstractDetail",
                table: "BestPractices");

            migrationBuilder.DropColumn(
                name: "KnowledgeContributor",
                table: "BestPractices");

            migrationBuilder.DropColumn(
                name: "Organization",
                table: "BestPractices");

            migrationBuilder.DropColumn(
                name: "Plant",
                table: "BestPractices");

            migrationBuilder.DropColumn(
                name: "PublishToOpex",
                table: "BestPractices");

            migrationBuilder.RenameColumn(
                name: "BaseLine",
                table: "CpiKpis",
                newName: "Baseline");

            migrationBuilder.RenameColumn(
                name: "ExtimatedBudgetSavings",
                table: "CpiDetailInformations",
                newName: "EstimatedBenefitSavings");

            migrationBuilder.RenameColumn(
                name: "ProjectCostPerYear",
                table: "BestPractices",
                newName: "ProjectCost");

            migrationBuilder.RenameColumn(
                name: "Benefit",
                table: "BestPractices",
                newName: "BenefitDescription");

            migrationBuilder.AddColumn<int>(
                name: "ProjectPhaseNo",
                table: "LessonsLearned",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "KpiTitle",
                table: "CpiKpis",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TypeOfCpi",
                table: "CpiDetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AbstractDetails",
                table: "BestPractices",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsPublishToOpex",
                table: "BestPractices",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "BestPracticeKnowledgeContributors",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    KnowledgeContributor = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BestPracticeKnowledgeContributors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BestPracticeOrganizations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    Organization = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BestPracticeOrganizations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BestPracticePlants",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    Plant = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BestPracticePlants", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CpiStepExplaination",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    StepTitle = table.Column<string>(nullable: true),
                    Start = table.Column<DateTime>(nullable: false),
                    Finish = table.Column<DateTime>(nullable: false),
                    ResponsibleBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CpiStepExplaination", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BestPracticeKnowledgeContributors");

            migrationBuilder.DropTable(
                name: "BestPracticeOrganizations");

            migrationBuilder.DropTable(
                name: "BestPracticePlants");

            migrationBuilder.DropTable(
                name: "CpiStepExplaination");

            migrationBuilder.DropColumn(
                name: "ProjectPhaseNo",
                table: "LessonsLearned");

            migrationBuilder.DropColumn(
                name: "KpiTitle",
                table: "CpiKpis");

            migrationBuilder.DropColumn(
                name: "TypeOfCpi",
                table: "CpiDetailInformations");

            migrationBuilder.DropColumn(
                name: "AbstractDetails",
                table: "BestPractices");

            migrationBuilder.DropColumn(
                name: "IsPublishToOpex",
                table: "BestPractices");

            migrationBuilder.RenameColumn(
                name: "Baseline",
                table: "CpiKpis",
                newName: "BaseLine");

            migrationBuilder.RenameColumn(
                name: "EstimatedBenefitSavings",
                table: "CpiDetailInformations",
                newName: "ExtimatedBudgetSavings");

            migrationBuilder.RenameColumn(
                name: "ProjectCost",
                table: "BestPractices",
                newName: "ProjectCostPerYear");

            migrationBuilder.RenameColumn(
                name: "BenefitDescription",
                table: "BestPractices",
                newName: "Benefit");

            migrationBuilder.AddColumn<int>(
                name: "LessonLearnNo",
                table: "LessonsLearned",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Kpi",
                table: "CpiKpis",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CpiType",
                table: "CpiDetailInformations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AbstractDetail",
                table: "BestPractices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KnowledgeContributor",
                table: "BestPractices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Organization",
                table: "BestPractices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Plant",
                table: "BestPractices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PublishToOpex",
                table: "BestPractices",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
