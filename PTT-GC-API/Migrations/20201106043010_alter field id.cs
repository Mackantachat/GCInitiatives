using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class alterfieldid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectLookback",
                table: "ProjectLookback");

            migrationBuilder.DropColumn(
                name: "ProjectLookbackLookbackId",
                table: "ProjectLookback");

            migrationBuilder.AddColumn<int>(
                name: "ProjectLookbackId",
                table: "ProjectLookback",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectLookback",
                table: "ProjectLookback",
                column: "ProjectLookbackId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectLookback",
                table: "ProjectLookback");

            migrationBuilder.DropColumn(
                name: "ProjectLookbackId",
                table: "ProjectLookback");

            migrationBuilder.AddColumn<int>(
                name: "ProjectLookbackLookbackId",
                table: "ProjectLookback",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectLookback",
                table: "ProjectLookback",
                column: "ProjectLookbackLookbackId");
        }
    }
}
