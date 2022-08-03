using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class UpdateDetailInformation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImpactTotalTypeOfBenefit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubWorkstream",
                table: "SubWorkstream");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Kpis",
                table: "Kpis");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KpiDetailInformation",
                table: "KpiDetailInformation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InitiativeTypeMax",
                table: "InitiativeTypeMax");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Frequency",
                table: "Frequency");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DetailInformation",
                table: "DetailInformation");

            migrationBuilder.DropColumn(
                name: "SubWorkstreamId",
                table: "SubWorkstream");

            migrationBuilder.DropColumn(
                name: "KpisId",
                table: "Kpis");

            migrationBuilder.DropColumn(
                name: "KpiDetailInformationId",
                table: "KpiDetailInformation");

            migrationBuilder.DropColumn(
                name: "DetailInformationId",
                table: "KpiDetailInformation");

            migrationBuilder.DropColumn(
                name: "FrequencyId",
                table: "KpiDetailInformation");

            migrationBuilder.DropColumn(
                name: "KpisId",
                table: "KpiDetailInformation");

            migrationBuilder.DropColumn(
                name: "InitiativeTypeMaxId",
                table: "InitiativeTypeMax");

            migrationBuilder.DropColumn(
                name: "FrequencyId",
                table: "Frequency");

            migrationBuilder.DropColumn(
                name: "DetailInformationId",
                table: "DetailInformation");

            migrationBuilder.DropColumn(
                name: "SefetyIndex",
                table: "DetailInformation");

            migrationBuilder.RenameTable(
                name: "SubWorkstream",
                newName: "SubWorkstreams");

            migrationBuilder.RenameTable(
                name: "Kpis",
                newName: "Kpises");

            migrationBuilder.RenameTable(
                name: "KpiDetailInformation",
                newName: "KpiDetailInformations");

            migrationBuilder.RenameTable(
                name: "InitiativeTypeMax",
                newName: "InitiativeTypeMaxs");

            migrationBuilder.RenameTable(
                name: "Frequency",
                newName: "Frequencies");

            migrationBuilder.RenameTable(
                name: "DetailInformation",
                newName: "DetailInformations");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "SubWorkstreams",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Kpises",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "KpiDetailInformations",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "Frequency",
                table: "KpiDetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InitiativeId",
                table: "KpiDetailInformations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Kpis",
                table: "KpiDetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "InitiativeTypeMaxs",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Frequencies",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "DetailInformations",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "SafetyIndex",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubWorkstreams",
                table: "SubWorkstreams",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Kpises",
                table: "Kpises",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KpiDetailInformations",
                table: "KpiDetailInformations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InitiativeTypeMaxs",
                table: "InitiativeTypeMaxs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Frequencies",
                table: "Frequencies",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DetailInformations",
                table: "DetailInformations",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_KpiDetailInformations_InitiativeId",
                table: "KpiDetailInformations",
                column: "InitiativeId");

            migrationBuilder.AddForeignKey(
                name: "FK_KpiDetailInformations_Initiatives_InitiativeId",
                table: "KpiDetailInformations",
                column: "InitiativeId",
                principalTable: "Initiatives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KpiDetailInformations_Initiatives_InitiativeId",
                table: "KpiDetailInformations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubWorkstreams",
                table: "SubWorkstreams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Kpises",
                table: "Kpises");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KpiDetailInformations",
                table: "KpiDetailInformations");

            migrationBuilder.DropIndex(
                name: "IX_KpiDetailInformations_InitiativeId",
                table: "KpiDetailInformations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InitiativeTypeMaxs",
                table: "InitiativeTypeMaxs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Frequencies",
                table: "Frequencies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DetailInformations",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "SubWorkstreams");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Kpises");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "KpiDetailInformations");

            migrationBuilder.DropColumn(
                name: "Frequency",
                table: "KpiDetailInformations");

            migrationBuilder.DropColumn(
                name: "InitiativeId",
                table: "KpiDetailInformations");

            migrationBuilder.DropColumn(
                name: "Kpis",
                table: "KpiDetailInformations");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "InitiativeTypeMaxs");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Frequencies");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "SafetyIndex",
                table: "DetailInformations");

            migrationBuilder.RenameTable(
                name: "SubWorkstreams",
                newName: "SubWorkstream");

            migrationBuilder.RenameTable(
                name: "Kpises",
                newName: "Kpis");

            migrationBuilder.RenameTable(
                name: "KpiDetailInformations",
                newName: "KpiDetailInformation");

            migrationBuilder.RenameTable(
                name: "InitiativeTypeMaxs",
                newName: "InitiativeTypeMax");

            migrationBuilder.RenameTable(
                name: "Frequencies",
                newName: "Frequency");

            migrationBuilder.RenameTable(
                name: "DetailInformations",
                newName: "DetailInformation");

            migrationBuilder.AddColumn<int>(
                name: "SubWorkstreamId",
                table: "SubWorkstream",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "KpisId",
                table: "Kpis",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "KpiDetailInformationId",
                table: "KpiDetailInformation",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "DetailInformationId",
                table: "KpiDetailInformation",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FrequencyId",
                table: "KpiDetailInformation",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "KpisId",
                table: "KpiDetailInformation",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "InitiativeTypeMaxId",
                table: "InitiativeTypeMax",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "FrequencyId",
                table: "Frequency",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "DetailInformationId",
                table: "DetailInformation",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "SefetyIndex",
                table: "DetailInformation",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubWorkstream",
                table: "SubWorkstream",
                column: "SubWorkstreamId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Kpis",
                table: "Kpis",
                column: "KpisId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KpiDetailInformation",
                table: "KpiDetailInformation",
                column: "KpiDetailInformationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InitiativeTypeMax",
                table: "InitiativeTypeMax",
                column: "InitiativeTypeMaxId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Frequency",
                table: "Frequency",
                column: "FrequencyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DetailInformation",
                table: "DetailInformation",
                column: "DetailInformationId");

            migrationBuilder.CreateTable(
                name: "ImpactTotalTypeOfBenefit",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImpactTypeOfBenefitTable = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InitiativeId = table.Column<int>(type: "int", nullable: false),
                    Month1 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
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
                    Month2 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
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
                    Month3 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month30 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month31 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month32 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month33 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month34 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month35 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month36 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month4 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month5 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month6 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month7 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month8 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Month9 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    RunRate = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TypeOfBenefit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VersionPrice = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                name: "IX_ImpactTotalTypeOfBenefit_InitiativeId",
                table: "ImpactTotalTypeOfBenefit",
                column: "InitiativeId");
        }
    }
}
