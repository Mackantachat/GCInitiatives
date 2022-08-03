using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class UpdateRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImpactTrackingId",
                table: "ImpactTypeOfBenefits");

            migrationBuilder.DropColumn(
                name: "ImpactTypeOfBenefitGroupId",
                table: "ImpactTypeOfBenefits");

            migrationBuilder.AddColumn<string>(
                name: "TypeOfBenefitCode",
                table: "TypeOfBenefits",
                nullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Month4",
                table: "ImpactTypeOfBenefits",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<int>(
                name: "InitiativeId",
                table: "ImpactTypeOfBenefits",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ImpactTotalTypeOfBenefit",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImpactTypeOfBenefitTable = table.Column<string>(nullable: true),
                    TypeOfBenefit = table.Column<string>(nullable: true),
                    VersionPrice = table.Column<string>(nullable: true),
                    RunRate = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month1 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month2 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month3 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month4 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month5 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month6 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month7 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month8 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month9 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month10 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month11 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month12 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month13 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month14 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month15 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month16 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month17 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month18 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month19 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month20 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month21 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month22 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month23 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month24 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month25 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month26 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month27 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month28 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month29 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month30 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month31 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month32 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month33 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month34 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month35 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month36 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    InitiativeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImpactTotalTypeOfBenefit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImpactTotalTypeOfBenefit_Initiatives_InitiativeId",
                        column: x => x.InitiativeId,
                        principalTable: "Initiatives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImpactTypeOfBenefits_InitiativeId",
                table: "ImpactTypeOfBenefits",
                column: "InitiativeId");

            migrationBuilder.CreateIndex(
                name: "IX_ImpactTotalTypeOfBenefit_InitiativeId",
                table: "ImpactTotalTypeOfBenefit",
                column: "InitiativeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ImpactTypeOfBenefits_Initiatives_InitiativeId",
                table: "ImpactTypeOfBenefits",
                column: "InitiativeId",
                principalTable: "Initiatives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImpactTypeOfBenefits_Initiatives_InitiativeId",
                table: "ImpactTypeOfBenefits");

            migrationBuilder.DropTable(
                name: "ImpactTotalTypeOfBenefit");

            migrationBuilder.DropIndex(
                name: "IX_ImpactTypeOfBenefits_InitiativeId",
                table: "ImpactTypeOfBenefits");

            migrationBuilder.DropColumn(
                name: "TypeOfBenefitCode",
                table: "TypeOfBenefits");

            migrationBuilder.DropColumn(
                name: "InitiativeId",
                table: "ImpactTypeOfBenefits");

            migrationBuilder.AlterColumn<decimal>(
                name: "Month4",
                table: "ImpactTypeOfBenefits",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ImpactTrackingId",
                table: "ImpactTypeOfBenefits",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ImpactTypeOfBenefitGroupId",
                table: "ImpactTypeOfBenefits",
                type: "int",
                nullable: true);
        }
    }
}
