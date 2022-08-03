using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_column_for_impact_in_share_benefit_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "IL4RRBlended",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "IL4RROneTime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "IL4RRRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "IL5FixedFXOnetime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "IL5FixedFxRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "IL5FloatFxOnetime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "IL5FloatFxRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "IL5RRBlended",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "IL5RROneTime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "OnetimeImplementationCost",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalBlended",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalOnetime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IL4RRBlended",
                table: "ShareBenefitWorkstreams");

            migrationBuilder.DropColumn(
                name: "IL4RROneTime",
                table: "ShareBenefitWorkstreams");

            migrationBuilder.DropColumn(
                name: "IL4RRRecurring",
                table: "ShareBenefitWorkstreams");

            migrationBuilder.DropColumn(
                name: "IL5FixedFXOnetime",
                table: "ShareBenefitWorkstreams");

            migrationBuilder.DropColumn(
                name: "IL5FixedFxRecurring",
                table: "ShareBenefitWorkstreams");

            migrationBuilder.DropColumn(
                name: "IL5FloatFxOnetime",
                table: "ShareBenefitWorkstreams");

            migrationBuilder.DropColumn(
                name: "IL5FloatFxRecurring",
                table: "ShareBenefitWorkstreams");

            migrationBuilder.DropColumn(
                name: "IL5RRBlended",
                table: "ShareBenefitWorkstreams");

            migrationBuilder.DropColumn(
                name: "IL5RROneTime",
                table: "ShareBenefitWorkstreams");

            migrationBuilder.DropColumn(
                name: "OnetimeImplementationCost",
                table: "ShareBenefitWorkstreams");

            migrationBuilder.DropColumn(
                name: "TotalBlended",
                table: "ShareBenefitWorkstreams");

            migrationBuilder.DropColumn(
                name: "TotalOnetime",
                table: "ShareBenefitWorkstreams");

            migrationBuilder.DropColumn(
                name: "TotalRecurring",
                table: "ShareBenefitWorkstreams");
        }
    }
}
