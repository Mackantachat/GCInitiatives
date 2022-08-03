using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addtableforinitiativeprintbutton : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InitiativePrint",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Column1 = table.Column<string>(nullable: true),
                    Column2 = table.Column<string>(nullable: true),
                    Column3 = table.Column<string>(nullable: true),
                    Column4 = table.Column<string>(nullable: true),
                    Column5 = table.Column<string>(nullable: true),
                    Column6 = table.Column<string>(nullable: true),
                    Column7 = table.Column<string>(nullable: true),
                    Column8 = table.Column<string>(nullable: true),
                    Column9 = table.Column<string>(nullable: true),
                    Column10 = table.Column<string>(nullable: true),
                    Column11 = table.Column<string>(nullable: true),
                    Column12 = table.Column<string>(nullable: true),
                    Column13 = table.Column<string>(nullable: true),
                    Column14 = table.Column<string>(nullable: true),
                    Column15 = table.Column<string>(nullable: true),
                    Column16 = table.Column<string>(nullable: true),
                    Column17 = table.Column<string>(nullable: true),
                    Column18 = table.Column<string>(nullable: true),
                    Column19 = table.Column<string>(nullable: true),
                    Column20 = table.Column<string>(nullable: true),
                    Column21 = table.Column<string>(nullable: true),
                    Column22 = table.Column<string>(nullable: true),
                    Column23 = table.Column<string>(nullable: true),
                    Column24 = table.Column<string>(nullable: true),
                    Column25 = table.Column<string>(nullable: true),
                    Column26 = table.Column<string>(nullable: true),
                    Column27 = table.Column<string>(nullable: true),
                    Column28 = table.Column<string>(nullable: true),
                    Column29 = table.Column<string>(nullable: true),
                    Column30 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InitiativePrint", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InitiativePrint");
        }
    }
}
