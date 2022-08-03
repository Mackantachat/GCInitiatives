using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class CalDetailMax : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Baseline",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "BaselineHistorical",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "BaselineNonHistorical",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Saving",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "SavingHistorical",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "SavingNonHistorical",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CustomReportDetail",
                columns: table => new
                {
                    RunningID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReportID = table.Column<int>(nullable: false),
                    FieldName = table.Column<string>(nullable: true),
                    AggregateFunction = table.Column<string>(nullable: true),
                    Axis = table.Column<string>(nullable: true),
                    Sequence = table.Column<int>(nullable: false),
                    ColorCode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomReportDetail", x => x.RunningID);
                });

            migrationBuilder.CreateTable(
                name: "CustomReportHeader",
                columns: table => new
                {
                    ReportID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReportCode = table.Column<string>(nullable: true),
                    ReportName = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    GraphType = table.Column<string>(nullable: true),
                    X_AxisLabel = table.Column<string>(nullable: true),
                    Y_AxisLabel = table.Column<string>(nullable: true),
                    OtherTypeLabel = table.Column<string>(nullable: true),
                    CreateUser = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: true),
                    UpdateUser = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomReportHeader", x => x.ReportID);
                });

            migrationBuilder.CreateTable(
                name: "CustomReportParameter",
                columns: table => new
                {
                    RunningID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReportID = table.Column<int>(nullable: false),
                    Sequence = table.Column<int>(nullable: false),
                    ParameterName = table.Column<string>(nullable: true),
                    ParameterFIeld = table.Column<string>(nullable: true),
                    FilterCondition = table.Column<string>(nullable: true),
                    ParameterType = table.Column<string>(nullable: true),
                    Required = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomReportParameter", x => x.RunningID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomReportDetail");

            migrationBuilder.DropTable(
                name: "CustomReportHeader");

            migrationBuilder.DropTable(
                name: "CustomReportParameter");

            migrationBuilder.DropColumn(
                name: "Baseline",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "BaselineHistorical",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "BaselineNonHistorical",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Saving",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "SavingHistorical",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "SavingNonHistorical",
                table: "DetailInformations");
        }
    }
}
