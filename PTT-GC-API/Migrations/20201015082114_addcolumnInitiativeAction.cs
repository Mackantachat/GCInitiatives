using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addcolumnInitiativeAction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ConditionType",
                table: "InitiativeActions",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Counter",
                table: "InitiativeActions",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Indicator",
                table: "InitiativeActions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConditionType",
                table: "InitiativeActions");

            migrationBuilder.DropColumn(
                name: "Counter",
                table: "InitiativeActions");

            migrationBuilder.DropColumn(
                name: "Indicator",
                table: "InitiativeActions");
        }
    }
}
