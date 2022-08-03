using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class ChangeNameStatusTrackings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InitiativeStatusTracking_Initiatives_InitiativeId",
                table: "InitiativeStatusTracking");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InitiativeStatusTracking",
                table: "InitiativeStatusTracking");

            migrationBuilder.RenameTable(
                name: "InitiativeStatusTracking",
                newName: "InitiativeStatusTrackings");

            migrationBuilder.RenameIndex(
                name: "IX_InitiativeStatusTracking_InitiativeId",
                table: "InitiativeStatusTrackings",
                newName: "IX_InitiativeStatusTrackings_InitiativeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InitiativeStatusTrackings",
                table: "InitiativeStatusTrackings",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_InitiativeStatusTrackings_Initiatives_InitiativeId",
                table: "InitiativeStatusTrackings",
                column: "InitiativeId",
                principalTable: "Initiatives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InitiativeStatusTrackings_Initiatives_InitiativeId",
                table: "InitiativeStatusTrackings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InitiativeStatusTrackings",
                table: "InitiativeStatusTrackings");

            migrationBuilder.RenameTable(
                name: "InitiativeStatusTrackings",
                newName: "InitiativeStatusTracking");

            migrationBuilder.RenameIndex(
                name: "IX_InitiativeStatusTrackings_InitiativeId",
                table: "InitiativeStatusTracking",
                newName: "IX_InitiativeStatusTracking_InitiativeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InitiativeStatusTracking",
                table: "InitiativeStatusTracking",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_InitiativeStatusTracking_Initiatives_InitiativeId",
                table: "InitiativeStatusTracking",
                column: "InitiativeId",
                principalTable: "Initiatives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
