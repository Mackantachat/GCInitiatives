using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class InitiativeActions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Approvers");

            migrationBuilder.DropColumn(
                name: "ApprovedBy",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Approver1",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Approver2",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Approver3",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Status1",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Status2",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "Status3",
                table: "Initiatives");

            migrationBuilder.CreateTable(
                name: "InitiativeActions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActionBy = table.Column<string>(nullable: true),
                    Action = table.Column<string>(nullable: true),
                    Position = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    Stage = table.Column<string>(nullable: true),
                    InitiativeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InitiativeActions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InitiativeActions_Initiatives_InitiativeId",
                        column: x => x.InitiativeId,
                        principalTable: "Initiatives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InitiativeActions_InitiativeId",
                table: "InitiativeActions",
                column: "InitiativeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InitiativeActions");

            migrationBuilder.AddColumn<string>(
                name: "ApprovedBy",
                table: "Initiatives",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Approver1",
                table: "Initiatives",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Approver2",
                table: "Initiatives",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Approver3",
                table: "Initiatives",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status1",
                table: "Initiatives",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status2",
                table: "Initiatives",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status3",
                table: "Initiatives",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Approvers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
    }
}
