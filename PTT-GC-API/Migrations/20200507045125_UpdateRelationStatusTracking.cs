using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class UpdateRelationStatusTracking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_InitiativeStatusTracking_InitiativeId",
                table: "InitiativeStatusTracking",
                column: "InitiativeId");

            migrationBuilder.AddForeignKey(
                name: "FK_InitiativeStatusTracking_Initiatives_InitiativeId",
                table: "InitiativeStatusTracking",
                column: "InitiativeId",
                principalTable: "Initiatives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InitiativeStatusTracking_Initiatives_InitiativeId",
                table: "InitiativeStatusTracking");

            migrationBuilder.DropIndex(
                name: "IX_InitiativeStatusTracking_InitiativeId",
                table: "InitiativeStatusTracking");
        }
    }
}
