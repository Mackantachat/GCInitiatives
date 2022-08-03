using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addmaxapproverrange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "BenefitMax",
                table: "MaxApproverSettings",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "BenefitMin",
                table: "MaxApproverSettings",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsRequestCapex",
                table: "MaxApproverSettings",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "BenefitMax",
                table: "MaxApprovers",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "BenefitMin",
                table: "MaxApprovers",
                type: "decimal(18,3)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BenefitMax",
                table: "MaxApproverSettings");

            migrationBuilder.DropColumn(
                name: "BenefitMin",
                table: "MaxApproverSettings");

            migrationBuilder.DropColumn(
                name: "IsRequestCapex",
                table: "MaxApproverSettings");

            migrationBuilder.DropColumn(
                name: "BenefitMax",
                table: "MaxApprovers");

            migrationBuilder.DropColumn(
                name: "BenefitMin",
                table: "MaxApprovers");
        }
    }
}
