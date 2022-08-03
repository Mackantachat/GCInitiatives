using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addColumnsTarget123 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ExecutionKri",
                table: "KriDetailMonth",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsAction",
                table: "KriDetailMonth",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Target1",
                table: "KriDetailMonth",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Target2",
                table: "KriDetailMonth",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Target3",
                table: "KriDetailMonth",
                maxLength: 300,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExecutionKri",
                table: "KriDetailMonth");

            migrationBuilder.DropColumn(
                name: "IsAction",
                table: "KriDetailMonth");

            migrationBuilder.DropColumn(
                name: "Target1",
                table: "KriDetailMonth");

            migrationBuilder.DropColumn(
                name: "Target2",
                table: "KriDetailMonth");

            migrationBuilder.DropColumn(
                name: "Target3",
                table: "KriDetailMonth");
        }
    }
}
