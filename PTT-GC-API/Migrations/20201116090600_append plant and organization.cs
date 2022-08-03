using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class appendplantandorganization : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Organization",
                table: "BestPractices",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Plant",
                table: "BestPractices",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Organization",
                table: "BestPractices");

            migrationBuilder.DropColumn(
                name: "Plant",
                table: "BestPractices");
        }
    }
}
