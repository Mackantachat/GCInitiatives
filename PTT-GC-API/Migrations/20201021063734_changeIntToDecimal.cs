using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class changeIntToDecimal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Sequence",
                table: "InitiativeStatusTrackings",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<decimal>(
                name: "RunningSequence",
                table: "InitiativeStatusTrackings",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Sequence",
                table: "InitiativeStatusTrackings",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RunningSequence",
                table: "InitiativeStatusTrackings",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldNullable: true);
        }
    }
}
