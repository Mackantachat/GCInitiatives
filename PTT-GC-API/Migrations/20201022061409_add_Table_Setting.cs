using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_Table_Setting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Setting",
                columns: table => new
                {
                    SettingId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeCodeFormat = table.Column<string>(nullable: true),
                    PeriodForKeeping = table.Column<int>(nullable: true),
                    IsAvailablePeriodAnnual = table.Column<bool>(nullable: true),
                    StartPeriodAnnual = table.Column<DateTime>(nullable: true),
                    FinishPeriodAnnual = table.Column<DateTime>(nullable: true),
                    IsAvailablePeriodMid = table.Column<bool>(nullable: true),
                    StartPeriodMid = table.Column<DateTime>(nullable: true),
                    FinishPeriodMid = table.Column<DateTime>(nullable: true),
                    IsAvailableBudgetPool = table.Column<bool>(nullable: true),
                    StartPeriodBudgetPool = table.Column<DateTime>(nullable: true),
                    FinishPeriodBudgetPool = table.Column<DateTime>(nullable: true),
                    IsActiveITBudgetSurvey = table.Column<bool>(nullable: true),
                    StartPeriodIT = table.Column<DateTime>(nullable: true),
                    FinishPeriodIT = table.Column<DateTime>(nullable: true),
                    IL4TrackingPeriod = table.Column<int>(nullable: true),
                    OneTimeBenefit = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Setting", x => x.SettingId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Setting");
        }
    }
}
