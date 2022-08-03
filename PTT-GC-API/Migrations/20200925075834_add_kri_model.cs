using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_kri_model : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kri",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    Year = table.Column<int>(nullable: false),
                    Status = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: false),
                    Owner = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kri", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KriData",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    Year = table.Column<int>(nullable: false),
                    KriSequence = table.Column<int>(nullable: false),
                    KriName = table.Column<string>(nullable: true),
                    No = table.Column<int>(nullable: false),
                    KriText = table.Column<string>(nullable: true),
                    Target1 = table.Column<string>(nullable: true),
                    Target2 = table.Column<string>(nullable: true),
                    Target3 = table.Column<string>(nullable: true),
                    KriScoreMonth1 = table.Column<int>(nullable: false),
                    KriScoreMonth2 = table.Column<int>(nullable: false),
                    KriScoreMonth3 = table.Column<int>(nullable: false),
                    KriScoreMonth4 = table.Column<int>(nullable: false),
                    KriScoreMonth5 = table.Column<int>(nullable: false),
                    KriScoreMonth6 = table.Column<int>(nullable: false),
                    KriScoreMonth7 = table.Column<int>(nullable: false),
                    KriScoreMonth8 = table.Column<int>(nullable: false),
                    KriScoreMonth9 = table.Column<int>(nullable: false),
                    KriScoreMonth10 = table.Column<int>(nullable: false),
                    KriScoreMonth11 = table.Column<int>(nullable: false),
                    KriScoreMonth12 = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KriData", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KriMitigations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    Year = table.Column<int>(nullable: false),
                    MitigationMonth1 = table.Column<string>(nullable: true),
                    MitigationMonth2 = table.Column<string>(nullable: true),
                    MitigationMonth3 = table.Column<string>(nullable: true),
                    MitigationMonth4 = table.Column<string>(nullable: true),
                    MitigationMonth5 = table.Column<string>(nullable: true),
                    MitigationMonth6 = table.Column<string>(nullable: true),
                    MitigationMonth7 = table.Column<string>(nullable: true),
                    MitigationMonth8 = table.Column<string>(nullable: true),
                    MitigationMonth9 = table.Column<string>(nullable: true),
                    MitigationMonth10 = table.Column<string>(nullable: true),
                    MitigationMonth11 = table.Column<string>(nullable: true),
                    MitigationMonth12 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KriMitigations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KriProgressDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    Year = table.Column<int>(nullable: false),
                    ProgressDetailMonth1 = table.Column<string>(nullable: true),
                    ProgressDetailMonth2 = table.Column<string>(nullable: true),
                    ProgressDetailMonth3 = table.Column<string>(nullable: true),
                    ProgressDetailMonth4 = table.Column<string>(nullable: true),
                    ProgressDetailMonth5 = table.Column<string>(nullable: true),
                    ProgressDetailMonth6 = table.Column<string>(nullable: true),
                    ProgressDetailMonth7 = table.Column<string>(nullable: true),
                    ProgressDetailMonth8 = table.Column<string>(nullable: true),
                    ProgressDetailMonth9 = table.Column<string>(nullable: true),
                    ProgressDetailMonth10 = table.Column<string>(nullable: true),
                    ProgressDetailMonth11 = table.Column<string>(nullable: true),
                    ProgressDetailMonth12 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KriProgressDetails", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Kri");

            migrationBuilder.DropTable(
                name: "KriData");

            migrationBuilder.DropTable(
                name: "KriMitigations");

            migrationBuilder.DropTable(
                name: "KriProgressDetails");
        }
    }
}
