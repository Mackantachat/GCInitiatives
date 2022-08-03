using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_KriDetailMonth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KriDetailMonth",
                columns: table => new
                {
                    KriDetailMonthId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: true),
                    Year = table.Column<string>(maxLength: 4, nullable: true),
                    KriType = table.Column<string>(maxLength: 20, nullable: true),
                    KriDetail = table.Column<string>(maxLength: 300, nullable: true),
                    JanScore = table.Column<int>(nullable: true),
                    JanColor = table.Column<string>(maxLength: 50, nullable: true),
                    FebScore = table.Column<int>(nullable: true),
                    FebColor = table.Column<string>(maxLength: 50, nullable: true),
                    MarScore = table.Column<int>(nullable: true),
                    MarColor = table.Column<string>(maxLength: 50, nullable: true),
                    AprScore = table.Column<int>(nullable: true),
                    AprColor = table.Column<string>(maxLength: 50, nullable: true),
                    MayScore = table.Column<int>(nullable: true),
                    MayColor = table.Column<string>(maxLength: 50, nullable: true),
                    JunScore = table.Column<int>(nullable: true),
                    JunColor = table.Column<string>(maxLength: 50, nullable: true),
                    JulScore = table.Column<int>(nullable: true),
                    JulColor = table.Column<string>(maxLength: 50, nullable: true),
                    AugScore = table.Column<int>(nullable: true),
                    AugColor = table.Column<string>(maxLength: 50, nullable: true),
                    SepScore = table.Column<int>(nullable: true),
                    SepColor = table.Column<string>(maxLength: 50, nullable: true),
                    OctScore = table.Column<int>(nullable: true),
                    OctColor = table.Column<string>(maxLength: 50, nullable: true),
                    NovScore = table.Column<int>(nullable: true),
                    NovColor = table.Column<string>(maxLength: 50, nullable: true),
                    DecScore = table.Column<int>(nullable: true),
                    DecColor = table.Column<string>(maxLength: 50, nullable: true),
                    KriOrder = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KriDetailMonth", x => x.KriDetailMonthId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KriDetailMonth");
        }
    }
}
