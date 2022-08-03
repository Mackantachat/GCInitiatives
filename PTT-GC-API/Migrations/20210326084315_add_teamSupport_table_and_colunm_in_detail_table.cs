using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_teamSupport_table_and_colunm_in_detail_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DivMgrOfPlantProcessEngineer",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DmOfPlantOwner",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PlantEngineer",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PlantProcessEngineer",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "RequestHandoverExecution",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "RequestHandoverPlantOwner",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "RequestTeamSupport",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VpOfPlantOwner",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TeamSupportComments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    EmployeeID = table.Column<string>(nullable: true),
                    TeamSupportName = table.Column<string>(nullable: true),
                    Comment = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamSupportComments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TeamSupports",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    EmployeeID = table.Column<string>(nullable: true),
                    TeamSupportName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    SendEmailStatus = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamSupports", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TeamSupportComments");

            migrationBuilder.DropTable(
                name: "TeamSupports");

            migrationBuilder.DropColumn(
                name: "DivMgrOfPlantProcessEngineer",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "DmOfPlantOwner",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "PlantEngineer",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "PlantProcessEngineer",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "RequestHandoverExecution",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "RequestHandoverPlantOwner",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "RequestTeamSupport",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "VpOfPlantOwner",
                table: "DetailInformations");
        }
    }
}
