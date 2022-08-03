using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class HistoricalGraphIL5Achievement_decimal_18_3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "UnconvertedIL4",
                table: "HistoricalGraphIL5Achievement",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "SIL5",
                table: "HistoricalGraphIL5Achievement",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5",
                table: "HistoricalGraphIL5Achievement",
                type: "decimal(18,3)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "UnconvertedIL4",
                table: "HistoricalGraphIL5Achievement",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "SIL5",
                table: "HistoricalGraphIL5Achievement",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "IL5",
                table: "HistoricalGraphIL5Achievement",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,3)",
                oldNullable: true);
        }
    }
}
