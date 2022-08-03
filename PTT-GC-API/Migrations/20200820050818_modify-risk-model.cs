using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class modifyriskmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RiskActions");

            migrationBuilder.DropTable(
                name: "RiskHeaders");

            migrationBuilder.DropTable(
                name: "RiskTable");

            migrationBuilder.DropColumn(
                name: "No",
                table: "RiskKRIs");

            migrationBuilder.DropColumn(
                name: "Progress",
                table: "RiskKRIs");

            migrationBuilder.DropColumn(
                name: "RiskNo",
                table: "RiskKRIs");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "RiskKRIs");

            migrationBuilder.DropColumn(
                name: "File",
                table: "Attachments");

            migrationBuilder.RenameColumn(
                name: "KRITolerance",
                table: "RiskKRIs",
                newName: "KriTolerance");

            migrationBuilder.RenameColumn(
                name: "KRITarget",
                table: "RiskKRIs",
                newName: "KriTarget");

            migrationBuilder.AddColumn<int>(
                name: "InitiativeId",
                table: "RiskKRIs",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KriNo",
                table: "RiskKRIs",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "KriProgress",
                table: "RiskKRIs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KriStatus",
                table: "RiskKRIs",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Risk",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RiskId = table.Column<int>(nullable: false),
                    InitiativeId = table.Column<int>(nullable: false),
                    RegisterDate = table.Column<DateTime>(nullable: true),
                    ApprovePeriod = table.Column<DateTime>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    RiskFactor = table.Column<string>(nullable: true),
                    Phase = table.Column<string>(nullable: true),
                    ExitingControl = table.Column<string>(nullable: true),
                    ImpactExitingControl = table.Column<string>(nullable: true),
                    LikelihoodExitingControl = table.Column<string>(nullable: true),
                    RiskLevelExitingControl = table.Column<string>(nullable: true),
                    MitigationPlan = table.Column<string>(nullable: true),
                    ImpactMitigationPlan = table.Column<string>(nullable: true),
                    LikelihoodMitigationPlan = table.Column<string>(nullable: true),
                    RiskLevelMitigationPlan = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Risk", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RiskProgress",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RiskId = table.Column<int>(nullable: false),
                    InitiativeId = table.Column<int>(nullable: false),
                    ActionNo = table.Column<int>(nullable: false),
                    ActionDescription = table.Column<string>(nullable: true),
                    DueDate = table.Column<DateTime>(nullable: false),
                    ActualCompletingDate = table.Column<DateTime>(nullable: false),
                    Responsible = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    ActionDueStatus = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiskProgress", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Risk");

            migrationBuilder.DropTable(
                name: "RiskProgress");

            migrationBuilder.DropColumn(
                name: "InitiativeId",
                table: "RiskKRIs");

            migrationBuilder.DropColumn(
                name: "KriNo",
                table: "RiskKRIs");

            migrationBuilder.DropColumn(
                name: "KriProgress",
                table: "RiskKRIs");

            migrationBuilder.DropColumn(
                name: "KriStatus",
                table: "RiskKRIs");

            migrationBuilder.RenameColumn(
                name: "KriTolerance",
                table: "RiskKRIs",
                newName: "KRITolerance");

            migrationBuilder.RenameColumn(
                name: "KriTarget",
                table: "RiskKRIs",
                newName: "KRITarget");

            migrationBuilder.AddColumn<int>(
                name: "No",
                table: "RiskKRIs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Progress",
                table: "RiskKRIs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RiskNo",
                table: "RiskKRIs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "RiskKRIs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "File",
                table: "Attachments",
                type: "varbinary(max)",
                nullable: true);

            

            migrationBuilder.CreateTable(
                name: "RiskActions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActionDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionNo = table.Column<int>(type: "int", nullable: false),
                    ActualCompletingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Responsible = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RiskId = table.Column<int>(type: "int", nullable: false),
                    RiskNo = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiskActions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RiskHeaders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApprovePeriod = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InitiativeId = table.Column<int>(type: "int", nullable: false),
                    Phase = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RegisterDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RiskFactor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RiskId = table.Column<int>(type: "int", nullable: false),
                    RiskNo = table.Column<int>(type: "int", nullable: false),
                    RootCauseDescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiskHeaders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RiskTable",
                columns: table => new
                {
                    RiskId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RiskTable", x => x.RiskId);
                });
        }
    }
}
