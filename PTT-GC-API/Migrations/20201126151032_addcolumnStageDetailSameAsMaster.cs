using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addcolumnStageDetailSameAsMaster : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCreateType",
                table: "InitiativeStageDetail",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsSwitchProcess",
                table: "InitiativeStageDetail",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostStageStoredProcedure",
                table: "InitiativeStageDetail",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PreStageStoredProcedure",
                table: "InitiativeStageDetail",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCreateType",
                table: "InitiativeStageDetail");

            migrationBuilder.DropColumn(
                name: "IsSwitchProcess",
                table: "InitiativeStageDetail");

            migrationBuilder.DropColumn(
                name: "PostStageStoredProcedure",
                table: "InitiativeStageDetail");

            migrationBuilder.DropColumn(
                name: "PreStageStoredProcedure",
                table: "InitiativeStageDetail");
        }
    }
}
