using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class AddEmailCodevAndOwner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Owners",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "InitiativeType",
                table: "Initiatives",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(MAX)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "CoDevelopers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Owners");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "CoDevelopers");

            migrationBuilder.AlterColumn<string>(
                name: "InitiativeType",
                table: "Initiatives",
                type: "nvarchar(MAX)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
