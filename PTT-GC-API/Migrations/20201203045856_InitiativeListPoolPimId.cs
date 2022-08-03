using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class InitiativeListPoolPimId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InitiativeListPoolPim",
                columns: table => new
                {
                    InitiativeListPoolPimId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: true),
                    OwnerName = table.Column<string>(nullable: true),
                    InvestmentType = table.Column<string>(nullable: true),
                    BenefitType = table.Column<string>(nullable: true),
                    BenefitValue = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ProjectCost = table.Column<decimal>(type: "decimal(18,3)", nullable: true),
                    StageGate = table.Column<string>(nullable: true),
                    Reason = table.Column<string>(nullable: true),
                    initiativeCode = table.Column<string>(nullable: true),
                    PoolId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InitiativeListPoolPim", x => x.InitiativeListPoolPimId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InitiativeListPoolPim");
        }
    }
}
