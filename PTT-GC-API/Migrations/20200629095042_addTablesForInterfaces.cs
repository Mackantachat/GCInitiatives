using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addTablesForInterfaces : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IncomingFile",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DirectoryPath = table.Column<string>(nullable: true),
                    FileName = table.Column<string>(nullable: true),
                    Data = table.Column<byte[]>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    CreateUser = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: true),
                    UpdateUser = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncomingFile", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OutgoingFile",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DirectoryPath = table.Column<string>(nullable: true),
                    FileName = table.Column<string>(nullable: true),
                    Data = table.Column<byte[]>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    CreateUser = table.Column<string>(nullable: true),
                    CreateDate = table.Column<DateTime>(nullable: true),
                    UpdateUser = table.Column<string>(nullable: true),
                    UpdateDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OutgoingFile", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TmpInitiativeIdIFs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IFType = table.Column<string>(nullable: true),
                    InitiativeId = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TmpInitiativeIdIFs", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IncomingFile");

            migrationBuilder.DropTable(
                name: "OutgoingFile");

            migrationBuilder.DropTable(
                name: "TmpInitiativeIdIFs");
        }
    }
}
