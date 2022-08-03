using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class change_number_of_digit_on_shareBenefitTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "TotalRRRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(21,5)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalRROnetime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(21,5)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalRRBlended",
                table: "ShareBenefitWorkstreams",
                type: "decimal(21,5)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "OnetimeImplementationCost",
                table: "ShareBenefitWorkstreams",
                type: "decimal(21,5)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5RRRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(21,5)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5RROneTime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(21,5)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5RRBlended",
                table: "ShareBenefitWorkstreams",
                type: "decimal(21,5)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5FloatFxRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(21,5)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5FloatFxOnetime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(21,5)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5FixedFxRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(21,5)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5FixedFXOnetime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(21,5)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL4RRRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(21,5)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL4RROneTime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(21,5)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL4RRBlended",
                table: "ShareBenefitWorkstreams",
                type: "decimal(21,5)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "TotalRRRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(21,5)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalRROnetime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(21,5)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "TotalRRBlended",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(21,5)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "OnetimeImplementationCost",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(21,5)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5RRRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(21,5)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5RROneTime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(21,5)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5RRBlended",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(21,5)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5FloatFxRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(21,5)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5FloatFxOnetime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(21,5)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5FixedFxRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(21,5)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5FixedFXOnetime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(21,5)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL4RRRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(21,5)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL4RROneTime",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(21,5)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL4RRBlended",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(21,5)",
                oldNullable: true);
        }
    }
}
