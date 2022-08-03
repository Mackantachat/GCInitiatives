using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class appendfieldindetailInformation_Old : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Kri",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "directBenefit",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "indirectBenefit",
                table: "DetailInformations",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "requireDirectBenefit",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "requireIndirectBenefit",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OutstandingData",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    Year = table.Column<int>(nullable: false),
                    Month = table.Column<string>(nullable: true),
                    OutstandingId = table.Column<int>(nullable: false),
                    ItemDescription = table.Column<string>(nullable: true),
                    ItemListValueBaht = table.Column<int>(nullable: false),
                    RpcDescription = table.Column<string>(nullable: true),
                    RpcValueBaht = table.Column<int>(nullable: false),
                    Outstanding = table.Column<int>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OutstandingData", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Outstandings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Year = table.Column<int>(nullable: false),
                    Month = table.Column<string>(nullable: true),
                    BudgetBaht = table.Column<decimal>(nullable: true),
                    ActualBaht = table.Column<decimal>(nullable: true),
                    PrItemBaht = table.Column<decimal>(nullable: true),
                    PoItemBaht = table.Column<decimal>(nullable: true),
                    CommitmentBaht = table.Column<decimal>(nullable: true),
                    Contingency = table.Column<int>(nullable: false),
                    EstimateAtCompletion = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Outstandings", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OutstandingData");

            migrationBuilder.DropTable(
                name: "Outstandings");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Kri");

            migrationBuilder.DropColumn(
                name: "directBenefit",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "indirectBenefit",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "requireDirectBenefit",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "requireIndirectBenefit",
                table: "DetailInformations");
        }
    }
}
