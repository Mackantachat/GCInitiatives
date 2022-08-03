using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class adddimhandsover : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DimMaxHandsover",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    IsDeliverables = table.Column<bool>(nullable: false),
                    IsCommunicationOrTraining = table.Column<bool>(nullable: false),
                    IsAllIssueClosed = table.Column<bool>(nullable: false),
                    IsOperationSupport = table.Column<bool>(nullable: false),
                    IsOther = table.Column<bool>(nullable: false),
                    CommentDeliverables = table.Column<string>(nullable: true),
                    CommentCommunicationOrTraining = table.Column<string>(nullable: true),
                    CommentAllIssueClosed = table.Column<string>(nullable: true),
                    CommentOperationSupport = table.Column<string>(nullable: true),
                    CommentOther = table.Column<string>(nullable: true),
                    LicenseOrSubscriptionFee = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    SupportFee = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    StartDate = table.Column<DateTime>(nullable: false),
                    FinishDate = table.Column<DateTime>(nullable: false),
                    IsAcceptHandover = table.Column<bool>(nullable: false),
                    AcceptDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DimMaxHandsover", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DimMaxHandsover");
        }
    }
}
