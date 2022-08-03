using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class alterriskcolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropColumn(
            //    name: "RiskId",
            //    table: "Risk");

            migrationBuilder.AddColumn<string>(
                name: "MitigationProgress",
                table: "Risk",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MitigationProgressImpact",
                table: "Risk",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MitigationProgressLikelihood",
                table: "Risk",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RiskLevelMitigationProgress",
                table: "Risk",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MitigationProgress",
                table: "Risk");

            migrationBuilder.DropColumn(
                name: "MitigationProgressImpact",
                table: "Risk");

            migrationBuilder.DropColumn(
                name: "MitigationProgressLikelihood",
                table: "Risk");

            migrationBuilder.DropColumn(
                name: "RiskLevelMitigationProgress",
                table: "Risk");

            migrationBuilder.AddColumn<int>(
                name: "RiskId",
                table: "Risk",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
