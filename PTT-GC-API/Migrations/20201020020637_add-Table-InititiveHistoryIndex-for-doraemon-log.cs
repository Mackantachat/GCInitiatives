using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addTableInititiveHistoryIndexfordoraemonlog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InitiativeHistoryIndex",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: false),
                    InitiativeCode = table.Column<string>(nullable: true),
                    Stage = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    SubmittedBy = table.Column<string>(nullable: true),
                    SubmittedDate = table.Column<DateTime>(nullable: true),
                    Comment = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InitiativeHistoryIndex", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InitiativeHistoryIndex");
        }
    }
}
