using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_StrategyForInitiatives : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AlignWithCorpStrategy",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StrategicObjective",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StrategicYear",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StrategyType",
                table: "Initiatives",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AlignWithCorpStrategy",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "StrategicObjective",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "StrategicYear",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "StrategyType",
                table: "Initiatives");
        }
    }
}
