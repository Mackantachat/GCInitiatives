using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_MainPlant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "DimMaxHandsover",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:Identity", "1, 1"),
            //        InitiativeId = table.Column<int>(nullable: false),
            //        IsDeliverables = table.Column<bool>(nullable: false),
            //        IsCommunicationOrTraining = table.Column<bool>(nullable: false),
            //        IsAllIssueClosed = table.Column<bool>(nullable: false),
            //        IsOperationSupport = table.Column<bool>(nullable: false),
            //        LicenseOrSubscriptionFee = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
            //        SupportFee = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
            //        StartDate = table.Column<DateTime>(nullable: false),
            //        FinishDate = table.Column<DateTime>(nullable: false),
            //        IsAcceptHandover = table.Column<bool>(nullable: false),
            //        AcceptDate = table.Column<DateTime>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_DimMaxHandsover", x => x.Id);
            //    });

            migrationBuilder.CreateTable(
                name: "MainPlant",
                columns: table => new
                {
                    MainPlanId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DetailInformationId = table.Column<int>(nullable: true),
                    Plant = table.Column<string>(nullable: true),
                    AreaUnit = table.Column<string>(nullable: true),
                    TypeOfChange = table.Column<string>(nullable: true),
                    MocCategory = table.Column<string>(nullable: true),
                    ExpireDate = table.Column<DateTime>(nullable: true),
                    DetailOfTheChange = table.Column<string>(nullable: true),
                    InitialListOfPeople = table.Column<string>(nullable: true),
                    EmocNo = table.Column<string>(nullable: true),
                    MocChampion = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MainPlant", x => x.MainPlanId);
                });

            migrationBuilder.CreateTable(
                name: "MaintainKpi",
                columns: table => new
                {
                    KpiMaintainId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: true),
                    KpiName = table.Column<string>(maxLength: 200, nullable: true),
                    ScoreText1 = table.Column<string>(maxLength: 200, nullable: true),
                    ScoreLevel1 = table.Column<int>(nullable: true),
                    ScoreText2 = table.Column<string>(maxLength: 200, nullable: true),
                    ScoreLevel2 = table.Column<int>(nullable: true),
                    ScoreText3 = table.Column<string>(maxLength: 200, nullable: true),
                    ScoreLevel3 = table.Column<int>(nullable: true),
                    ScoreText4 = table.Column<string>(maxLength: 200, nullable: true),
                    ScoreLevel4 = table.Column<int>(nullable: true),
                    ScoreText5 = table.Column<string>(maxLength: 200, nullable: true),
                    ScoreLevel5 = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintainKpi", x => x.KpiMaintainId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropTable(
            //    name: "DimMaxHandsover");

            migrationBuilder.DropTable(
                name: "MainPlant");

            migrationBuilder.DropTable(
                name: "MaintainKpi");
        }
    }
}
