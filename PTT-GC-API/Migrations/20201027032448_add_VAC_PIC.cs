using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_VAC_PIC : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InitiativeMember",
                columns: table => new
                {
                    InitiativeMemberId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VacPicId = table.Column<int>(nullable: false),
                    MemberType = table.Column<string>(nullable: true),
                    InitiativeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InitiativeMember", x => x.InitiativeMemberId);
                });

            migrationBuilder.CreateTable(
                name: "PicList",
                columns: table => new
                {
                    PicListId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MeetingDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PicList", x => x.PicListId);
                });

            migrationBuilder.CreateTable(
                name: "PicMember",
                columns: table => new
                {
                    PicMemberId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PicListId = table.Column<int>(nullable: false),
                    MemberType = table.Column<string>(nullable: true),
                    MemberName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PicMember", x => x.PicMemberId);
                });

            migrationBuilder.CreateTable(
                name: "VacList",
                columns: table => new
                {
                    VacListId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MeetingDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VacList", x => x.VacListId);
                });

            migrationBuilder.CreateTable(
                name: "VacMember",
                columns: table => new
                {
                    VacMemberId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VacListId = table.Column<int>(nullable: false),
                    MemberType = table.Column<string>(nullable: true),
                    MemberName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VacMember", x => x.VacMemberId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InitiativeMember");

            migrationBuilder.DropTable(
                name: "PicList");

            migrationBuilder.DropTable(
                name: "PicMember");

            migrationBuilder.DropTable(
                name: "VacList");

            migrationBuilder.DropTable(
                name: "VacMember");
        }
    }
}
