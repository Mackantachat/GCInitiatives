using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_Comment_for_Audit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CommentBy",
                table: "Audits",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CommentDate",
                table: "Audits",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CommentDetail",
                table: "Audits",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CommentBy",
                table: "Audits");

            migrationBuilder.DropColumn(
                name: "CommentDate",
                table: "Audits");

            migrationBuilder.DropColumn(
                name: "CommentDetail",
                table: "Audits");
        }
    }
}
