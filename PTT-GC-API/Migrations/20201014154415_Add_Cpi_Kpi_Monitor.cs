using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class Add_Cpi_Kpi_Monitor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Result",
                table: "CpiKpis");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "CpiKpis");

            //migrationBuilder.AddColumn<string>(
            //    name: "ActualBenefitCalculationDetails",
            //    table: "NewDetailInformations",
            //    nullable: true);

            //migrationBuilder.AddColumn<decimal>(
            //    name: "ActualBudgetOpex",
            //    table: "NewDetailInformations",
            //    type: "decimal(18,2)",
            //    nullable: true);

            //migrationBuilder.AddColumn<decimal>(
            //    name: "ActualBudgetSavings",
            //    table: "NewDetailInformations",
            //    type: "decimal(18,2)",
            //    nullable: true);

            //migrationBuilder.AddColumn<string>(
            //    name: "AnalysisTool",
            //    table: "NewDetailInformations",
            //    nullable: true);

            //migrationBuilder.AddColumn<string>(
            //    name: "EstimatedBenefitCalculationDetails",
            //    table: "NewDetailInformations",
            //    nullable: true);

            //migrationBuilder.AddColumn<decimal>(
            //    name: "EstimatedBenefitSavings",
            //    table: "NewDetailInformations",
            //    type: "decimal(18,2)",
            //    nullable: true);

            //migrationBuilder.AddColumn<decimal>(
            //    name: "EstimatedBudgetOpex",
            //    table: "NewDetailInformations",
            //    type: "decimal(18,2)",
            //    nullable: true);

            //migrationBuilder.AddColumn<string>(
            //    name: "RootCause",
            //    table: "NewDetailInformations",
            //    nullable: true);

            //migrationBuilder.AddColumn<string>(
            //    name: "SourceOfImprovement",
            //    table: "NewDetailInformations",
            //    nullable: true);

            //migrationBuilder.AddColumn<string>(
            //    name: "TypeOfCpi",
            //    table: "NewDetailInformations",
            //    nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCpiDetail",
                table: "Milestones",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<decimal>(
                name: "Target",
                table: "CpiKpis",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Remark",
                table: "CpiKpis",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "KpiTitle",
                table: "CpiKpis",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Baseline",
                table: "CpiKpis",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "CpiKpiMonitor",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    kpiNo = table.Column<int>(nullable: false),
                    kpiTitle = table.Column<string>(nullable: true),
                    result = table.Column<string>(nullable: true),
                    target = table.Column<string>(nullable: true),
                    status = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CpiKpiMonitor", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CpiKpiMonitor");

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

            migrationBuilder.DropColumn(
                name: "IsCpiDetail",
                table: "Milestones");

            migrationBuilder.AlterColumn<string>(
                name: "Target",
                table: "CpiKpis",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Remark",
                table: "CpiKpis",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "KpiTitle",
                table: "CpiKpis",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Baseline",
                table: "CpiKpis",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Result",
                table: "CpiKpis",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "CpiKpis",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
