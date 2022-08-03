using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addhistoricalgraphtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HistoricalGraphIL5Achievement",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Year = table.Column<int>(nullable: true),
                    Week = table.Column<int>(nullable: true),
                    IL5 = table.Column<decimal>(nullable: true),
                    SIL5 = table.Column<decimal>(nullable: true),
                    UnconvertedIL4 = table.Column<decimal>(nullable: true),
                    CLevel = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoricalGraphIL5Achievement", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HistoricalGraphNewIL4",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Year = table.Column<int>(nullable: true),
                    Week = table.Column<int>(nullable: true),
                    IL4 = table.Column<decimal>(nullable: true),
                    SIL4 = table.Column<decimal>(nullable: true),
                    IL3 = table.Column<decimal>(nullable: true),
                    IL0_IL2 = table.Column<decimal>(nullable: true),
                    CLevel = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoricalGraphNewIL4", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HistoricalGraphIL5Achievement");

            migrationBuilder.DropTable(
                name: "HistoricalGraphNewIL4");
        }
    }
}
