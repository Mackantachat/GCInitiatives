using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class AddProgressAndMilestone : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProgressDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Milestone = table.Column<string>(nullable: true),
                    KeyDeliverable = table.Column<string>(nullable: true),
                    Start = table.Column<DateTime>(nullable: true),
                    PlanFinish = table.Column<DateTime>(nullable: true),
                    ActualFinish = table.Column<DateTime>(nullable: true),
                    Activity = table.Column<string>(nullable: true),
                    InitiativeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgressDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProgressDetails_Initiatives_InitiativeId",
                        column: x => x.InitiativeId,
                        principalTable: "Initiatives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProgressDetails_InitiativeId",
                table: "ProgressDetails",
                column: "InitiativeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProgressDetails");
        }
    }
}
