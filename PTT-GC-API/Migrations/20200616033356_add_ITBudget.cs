using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_ITBudget : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CapexBudgetSurveys",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: true),
                    TopicId = table.Column<string>(nullable: true),
                    ChoiceValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CapexBudgetSurveys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CapexChoices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TopicId = table.Column<string>(nullable: true),
                    ChoiceType = table.Column<string>(nullable: true),
                    ChoiceId = table.Column<string>(nullable: true),
                    ChoiceName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CapexChoices", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CapexTopics",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TopicId = table.Column<string>(nullable: true),
                    TopicName = table.Column<string>(nullable: true),
                    IsYesOrNo = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CapexTopics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ITAssets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssetId = table.Column<string>(nullable: true),
                    AssetType = table.Column<string>(nullable: true),
                    AssetName = table.Column<string>(nullable: true),
                    CostPerUnit = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ITAssets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ITBudgetSurveyAssets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ITBudgetSurveyId = table.Column<string>(nullable: true),
                    AssetId = table.Column<string>(nullable: true),
                    OtherName = table.Column<string>(nullable: true),
                    NumberOfUnit = table.Column<int>(nullable: true),
                    CostPerUnit = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotalMTHB = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ITBudgetSurveyAssets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ITBudgetSurveys",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: true),
                    CapexSummary = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    OpexSummary = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    CapexNo = table.Column<string>(nullable: true),
                    OpexNo = table.Column<string>(nullable: true),
                    AdvancedCapexChoice = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ITBudgetSurveys", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CapexBudgetSurveys");

            migrationBuilder.DropTable(
                name: "CapexChoices");

            migrationBuilder.DropTable(
                name: "CapexTopics");

            migrationBuilder.DropTable(
                name: "ITAssets");

            migrationBuilder.DropTable(
                name: "ITBudgetSurveyAssets");

            migrationBuilder.DropTable(
                name: "ITBudgetSurveys");
        }
    }
}
