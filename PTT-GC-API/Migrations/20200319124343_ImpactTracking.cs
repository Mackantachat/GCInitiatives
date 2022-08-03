using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class ImpactTracking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ImpactTrackings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FinancialImpactArea = table.Column<string>(nullable: true),
                    HaveShareBenefit = table.Column<bool>(nullable: false),
                    IL4RunRate = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    IL5RunRate = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    IL4ActualPriceFixedFx = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    IL5ActualPriceFloatFx = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    FirstRunRateMonth = table.Column<DateTime>(nullable: true),
                    AutoCalculate = table.Column<bool>(nullable: false),
                    ImpiemantCost = table.Column<bool>(nullable: false),
                    Remark1 = table.Column<string>(nullable: true),
                    Remark2 = table.Column<string>(nullable: true),
                    Remark3 = table.Column<string>(nullable: true),
                    Remark4 = table.Column<string>(nullable: true),
                    Remark5 = table.Column<string>(nullable: true),
                    SubmitTo = table.Column<string>(nullable: true),
                    InitiativeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImpactTrackings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImpactTrackings_Initiatives_InitiativeId",
                        column: x => x.InitiativeId,
                        principalTable: "Initiatives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ImpactTypeOfBenefits",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImpactTypeOfBenefitTable = table.Column<string>(nullable: true),
                    ImpactTypeOfBenefitGroupId = table.Column<int>(nullable: true),
                    TypeOfBenefit = table.Column<string>(nullable: true),
                    VersionPrice = table.Column<string>(nullable: true),
                    RunRate = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month1 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month2 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month3 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month4 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Month5 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month6 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month7 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month8 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month9 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month10 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month11 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month12 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month13 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month14 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month15 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month16 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month17 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month18 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month19 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month20 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month21 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month22 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month23 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month24 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month25 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month26 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month27 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month28 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month29 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month30 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month31 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month32 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month33 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month34 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month35 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month36 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ImpactTrackingId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImpactTypeOfBenefits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShareBenefitWorkstreams",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Workstream = table.Column<string>(nullable: true),
                    percent = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ImpactTrackingId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShareBenefitWorkstreams", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeOfBenefits",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeOfBenefitGroup = table.Column<string>(nullable: true),
                    TypeOfBenefitTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeOfBenefits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkStreams",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkStreamTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkStreams", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImpactTrackings_InitiativeId",
                table: "ImpactTrackings",
                column: "InitiativeId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImpactTrackings");

            migrationBuilder.DropTable(
                name: "ImpactTypeOfBenefits");

            migrationBuilder.DropTable(
                name: "ShareBenefitWorkstreams");

            migrationBuilder.DropTable(
                name: "TypeOfBenefits");

            migrationBuilder.DropTable(
                name: "WorkStreams");
        }
    }
}
