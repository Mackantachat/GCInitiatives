using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class editColumnReportHeader1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomReportHeader");

            migrationBuilder.CreateTable(
                name: "CustomReportHeader",
                columns: table => new
                {
                    RunningID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReportID = table.Column<int>(nullable: true),
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
                    UpdateDate = table.Column<DateTime>(nullable: true),
                    StageType = table.Column<string>(nullable: true),
                    isAccumulate = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomReportHeader", x => x.RunningID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomReportHeader");
        }
    }
}
