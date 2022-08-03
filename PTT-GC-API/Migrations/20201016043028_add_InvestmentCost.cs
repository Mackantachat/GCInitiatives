using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_InvestmentCost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "InitiativeId",
                table: "ProgressHeader",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "InvestmentCost",
                columns: table => new
                {
                    InvestmentCostId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvestmentCostType = table.Column<string>(nullable: true),
                    JanCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    FebCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MarCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    AprCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    MayCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    JunCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    JulCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    AugCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    SepCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    OctCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    NovCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    DecCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    OverallCost = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    InitiativeId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvestmentCost", x => x.InvestmentCostId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InvestmentCost");

            migrationBuilder.AlterColumn<int>(
                name: "InitiativeId",
                table: "ProgressHeader",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
