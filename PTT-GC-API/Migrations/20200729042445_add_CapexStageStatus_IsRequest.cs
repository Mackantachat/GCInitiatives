using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_CapexStageStatus_IsRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CapexStage",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CapexStatus",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsRequestCapex",
                table: "Initiatives",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CapexStage",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "CapexStatus",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "IsRequestCapex",
                table: "Initiatives");
        }
    }
}
