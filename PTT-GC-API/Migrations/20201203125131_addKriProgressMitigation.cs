using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addKriProgressMitigation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KriProgressMitigation",
                columns: table => new
                {
                    KriProgressMitigationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: true),
                    Year = table.Column<string>(nullable: true),
                    KriType = table.Column<string>(nullable: true),
                    Jan = table.Column<string>(nullable: true),
                    Feb = table.Column<string>(nullable: true),
                    Mar = table.Column<string>(nullable: true),
                    Apr = table.Column<string>(nullable: true),
                    May = table.Column<string>(nullable: true),
                    Jun = table.Column<string>(nullable: true),
                    Jul = table.Column<string>(nullable: true),
                    Aug = table.Column<string>(nullable: true),
                    Sep = table.Column<string>(nullable: true),
                    Oct = table.Column<string>(nullable: true),
                    Nov = table.Column<string>(nullable: true),
                    Dec = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KriProgressMitigation", x => x.KriProgressMitigationId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KriProgressMitigation");
        }
    }
}
