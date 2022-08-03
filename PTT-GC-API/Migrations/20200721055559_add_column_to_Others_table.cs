using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_column_to_Others_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Flow_Max",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "Flow_Normal",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "Pressure_Max",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "Pressure_Normal",
                table: "Others");

            migrationBuilder.AddColumn<int>(
                name: "Flow_Max_Amount",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Flow_Max_Unit",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Flow_Normal_Amount",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Flow_Normal_Unit",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Pressure_Max_Amount",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Pressure_Max_Unit",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Pressure_Normal_Amount",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Pressure_Normal_Unit",
                table: "Others",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Flow_Max_Amount",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "Flow_Max_Unit",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "Flow_Normal_Amount",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "Flow_Normal_Unit",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "Pressure_Max_Amount",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "Pressure_Max_Unit",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "Pressure_Normal_Amount",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "Pressure_Normal_Unit",
                table: "Others");

            migrationBuilder.AddColumn<int>(
                name: "Flow_Max",
                table: "Others",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Flow_Normal",
                table: "Others",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Pressure_Max",
                table: "Others",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Pressure_Normal",
                table: "Others",
                type: "int",
                nullable: true);
        }
    }
}
