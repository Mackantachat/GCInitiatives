using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_cpi_column_for_detailInformation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CpiDetailInformations");

            migrationBuilder.AddColumn<string>(
                name: "ActualBenefitCalculationDetails",
                table: "NewDetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ActualBudgetOpex",
                table: "NewDetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ActualBudgetSavings",
                table: "NewDetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AnalysisTool",
                table: "NewDetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EstimatedBenefitCalculationDetails",
                table: "NewDetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "EstimatedBenefitSavings",
                table: "NewDetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "EstimatedBudgetOpex",
                table: "NewDetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RootCause",
                table: "NewDetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SourceOfImprovement",
                table: "NewDetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TypeOfCpi",
                table: "NewDetailInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActualBenefitCalculationDetails",
                table: "NewDetailInformations");

            migrationBuilder.DropColumn(
                name: "ActualBudgetOpex",
                table: "NewDetailInformations");

            migrationBuilder.DropColumn(
                name: "ActualBudgetSavings",
                table: "NewDetailInformations");

            migrationBuilder.DropColumn(
                name: "AnalysisTool",
                table: "NewDetailInformations");

            migrationBuilder.DropColumn(
                name: "EstimatedBenefitCalculationDetails",
                table: "NewDetailInformations");

            migrationBuilder.DropColumn(
                name: "EstimatedBenefitSavings",
                table: "NewDetailInformations");

            migrationBuilder.DropColumn(
                name: "EstimatedBudgetOpex",
                table: "NewDetailInformations");

            migrationBuilder.DropColumn(
                name: "RootCause",
                table: "NewDetailInformations");

            migrationBuilder.DropColumn(
                name: "SourceOfImprovement",
                table: "NewDetailInformations");

            migrationBuilder.DropColumn(
                name: "TypeOfCpi",
                table: "NewDetailInformations");

            migrationBuilder.CreateTable(
                name: "CpiDetailInformations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActualBenefitCalculationDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActualBudgetOpex = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ActualBudgetSavings = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    AnalysisTool = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EstimatedBenefitCalculationDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EstimatedBenefitSavings = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    EstimatedBudgetOpex = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    InitiativeId = table.Column<int>(type: "int", nullable: false),
                    RootCause = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SourceOfImprovement = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TypeOfCpi = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CpiDetailInformations", x => x.Id);
                });
        }
    }
}
