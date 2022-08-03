using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class edit_Owner_int_to_long : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "MainPositionCostCenter",
                table: "Owners",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "MainPositionCostCenter",
                table: "Owners",
                type: "int",
                nullable: true,
                oldClrType: typeof(long),
                oldNullable: true);
        }
    }
}
