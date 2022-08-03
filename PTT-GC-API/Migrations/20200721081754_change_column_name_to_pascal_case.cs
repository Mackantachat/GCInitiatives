using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class change_column_name_to_pascal_case : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<double>(
                name: "TopicId",
                table: "Others",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FlowMaxAmount",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FlowMaxUnit",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FlowNormalAmount",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FlowNormalUnit",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PressureMaxAmount",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PressureMaxUnit",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PressureNormalAmount",
                table: "Others",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PressureNormalUnit",
                table: "Others",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FlowMaxAmount",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "FlowMaxUnit",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "FlowNormalAmount",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "FlowNormalUnit",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "PressureMaxAmount",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "PressureMaxUnit",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "PressureNormalAmount",
                table: "Others");

            migrationBuilder.DropColumn(
                name: "PressureNormalUnit",
                table: "Others");

            migrationBuilder.AlterColumn<string>(
                name: "TopicId",
                table: "Others",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(double),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Flow_Max_Amount",
                table: "Others",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Flow_Max_Unit",
                table: "Others",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Flow_Normal_Amount",
                table: "Others",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Flow_Normal_Unit",
                table: "Others",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Pressure_Max_Amount",
                table: "Others",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Pressure_Max_Unit",
                table: "Others",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Pressure_Normal_Amount",
                table: "Others",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Pressure_Normal_Unit",
                table: "Others",
                type: "int",
                nullable: true);
        }
    }
}
