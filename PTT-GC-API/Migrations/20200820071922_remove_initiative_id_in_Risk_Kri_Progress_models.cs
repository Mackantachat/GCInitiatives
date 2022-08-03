using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class remove_initiative_id_in_Risk_Kri_Progress_models : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitiativeId",
                table: "RiskProgress");

            migrationBuilder.DropColumn(
                name: "InitiativeId",
                table: "RiskKRIs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InitiativeId",
                table: "RiskProgress",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InitiativeId",
                table: "RiskKRIs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
