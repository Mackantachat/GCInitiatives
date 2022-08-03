using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_DimMember : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DimMembers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MemberType = table.Column<string>(nullable: true),
                    MemberName = table.Column<string>(nullable: true),
                    MemberEmployeeId = table.Column<string>(nullable: true),
                    InitiativeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DimMembers", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DimMembers");
        }
    }
}
