using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_MaxApproverAndSetting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InitiativeCode",
                table: "ProgressDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InitiativeCode",
                table: "ImpactTypeOfBenefits",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InitiativeCode",
                table: "ImpactTrackings",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InitiativeCode",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MaxApprovers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    ApproverType = table.Column<string>(nullable: true),
                    ApproverEmail = table.Column<string>(nullable: true),
                    Order = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaxApprovers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MaxApproverSettings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkstreamType = table.Column<string>(nullable: true),
                    WorkstreamValue = table.Column<string>(nullable: true),
                    Indicator = table.Column<string>(nullable: true),
                    ApproverEmail = table.Column<string>(nullable: true),
                    Order = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaxApproverSettings", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaxApprovers");

            migrationBuilder.DropTable(
                name: "MaxApproverSettings");

            migrationBuilder.DropColumn(
                name: "InitiativeCode",
                table: "ProgressDetails");

            migrationBuilder.DropColumn(
                name: "InitiativeCode",
                table: "ImpactTypeOfBenefits");

            migrationBuilder.DropColumn(
                name: "InitiativeCode",
                table: "ImpactTrackings");

            migrationBuilder.DropColumn(
                name: "InitiativeCode",
                table: "DetailInformations");
        }
    }
}
