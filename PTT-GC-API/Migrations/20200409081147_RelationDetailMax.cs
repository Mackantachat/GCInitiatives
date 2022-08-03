using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class RelationDetailMax : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubWorkstreamTitle",
                table: "SubWorkstreams");

            migrationBuilder.DropColumn(
                name: "SubWorkstream",
                table: "DetailInformations");

            migrationBuilder.AddColumn<string>(
                name: "SubWorkstream1",
                table: "SubWorkstreams",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubWorkstream2",
                table: "SubWorkstreams",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubWorkstream1",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubWorkstream2",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DetailInformations_InitiativeId",
                table: "DetailInformations",
                column: "InitiativeId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DetailInformations_Initiatives_InitiativeId",
                table: "DetailInformations",
                column: "InitiativeId",
                principalTable: "Initiatives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DetailInformations_Initiatives_InitiativeId",
                table: "DetailInformations");

            migrationBuilder.DropIndex(
                name: "IX_DetailInformations_InitiativeId",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "SubWorkstream1",
                table: "SubWorkstreams");

            migrationBuilder.DropColumn(
                name: "SubWorkstream2",
                table: "SubWorkstreams");

            migrationBuilder.DropColumn(
                name: "SubWorkstream1",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "SubWorkstream2",
                table: "DetailInformations");

            migrationBuilder.AddColumn<string>(
                name: "SubWorkstreamTitle",
                table: "SubWorkstreams",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubWorkstream",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
