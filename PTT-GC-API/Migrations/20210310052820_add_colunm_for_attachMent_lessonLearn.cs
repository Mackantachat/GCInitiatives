using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_colunm_for_attachMent_lessonLearn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "currencyFloatFx",
                table: "ImpactTypeOfBenefits",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Attachments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CategoryName",
                table: "Attachments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "currencyFloatFx",
                table: "ImpactTypeOfBenefits");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Attachments");

            migrationBuilder.DropColumn(
                name: "CategoryName",
                table: "Attachments");
        }
    }
}
