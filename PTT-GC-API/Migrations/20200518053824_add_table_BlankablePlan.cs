using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_table_BlankablePlan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlankablePlans",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Week = table.Column<int>(nullable: false),
                    CLevel = table.Column<string>(nullable: true),
                    Year = table.Column<string>(nullable: true),
                    StageType = table.Column<string>(nullable: true),
                    ValueIL5 = table.Column<decimal>(nullable: true),
                    ValueIL4 = table.Column<decimal>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlankablePlans", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlankablePlans");
        }
    }
}
