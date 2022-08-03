using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class ApproveSystem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Approver",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Stage",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Approvers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(nullable: true),
                    Role = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Approvers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Approvers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Approvers_UserId",
                table: "Approvers",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Approvers");

            migrationBuilder.DropColumn(
                name: "Stage",
                table: "Initiatives");

            migrationBuilder.AddColumn<string>(
                name: "Approver",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
