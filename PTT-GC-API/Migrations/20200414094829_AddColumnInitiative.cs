using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class AddColumnInitiative : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BuWorkstreams");

            migrationBuilder.DropColumn(
                name: "BuWorkStream",
                table: "Initiatives");

            migrationBuilder.RenameColumn(
                name: "costEstCapexType",
                table: "Initiatives",
                newName: "CostEstCapexType");

            migrationBuilder.RenameColumn(
                name: "Detail",
                table: "Initiatives",
                newName: "ScopeOfWork");

            migrationBuilder.AlterColumn<string>(
                name: "Remark",
                table: "Initiatives",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(MAX)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Plant",
                table: "Initiatives",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Background",
                table: "Initiatives",
                type: "nvarchar(MAX)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BudgetSource",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Company",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "CostEstOpex",
                table: "Initiatives",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Integration",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "InvolveItDigital",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Organization",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RequestOpex",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "RequestProjectEngineer",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpecifyCompany",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpecifyPlant",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "TrackMax",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Organizations",
                columns: table => new
                {
                    OrganizationId = table.Column<string>(nullable: false),
                    OrganizationTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizations", x => x.OrganizationId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Organizations");

            migrationBuilder.DropColumn(
                name: "Background",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "BudgetSource",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Company",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "CostEstOpex",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Integration",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "InvolveItDigital",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Organization",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "RequestOpex",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "RequestProjectEngineer",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "SpecifyCompany",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "SpecifyPlant",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "TrackMax",
                table: "Initiatives");

            migrationBuilder.RenameColumn(
                name: "CostEstCapexType",
                table: "Initiatives",
                newName: "costEstCapexType");

            migrationBuilder.RenameColumn(
                name: "ScopeOfWork",
                table: "Initiatives",
                newName: "Detail");

            migrationBuilder.AlterColumn<string>(
                name: "Remark",
                table: "Initiatives",
                type: "nvarchar(MAX)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Plant",
                table: "Initiatives",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BuWorkStream",
                table: "Initiatives",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "BuWorkstreams",
                columns: table => new
                {
                    BuWorkstreamId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BuWorkstreamTitle = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuWorkstreams", x => x.BuWorkstreamId);
                });
        }
    }
}
