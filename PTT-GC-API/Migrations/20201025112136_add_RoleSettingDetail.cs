using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_RoleSettingDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Year",
                table: "OutstandingData",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "RpcValueBaht",
                table: "OutstandingData",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "OutstandingId",
                table: "OutstandingData",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Outstanding",
                table: "OutstandingData",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ItemListValueBaht",
                table: "OutstandingData",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "OutstandingData",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<int>(
                name: "InitiativeId",
                table: "OutstandingData",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateTable(
                name: "RoleSettingDetail",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PageId = table.Column<string>(maxLength: 1024, nullable: true),
                    SectionId = table.Column<string>(maxLength: 1024, nullable: true),
                    FieldName = table.Column<string>(maxLength: 1024, nullable: true),
                    IsVisible = table.Column<bool>(nullable: true),
                    IsEnable = table.Column<bool>(nullable: true),
                    IsIndividual = table.Column<bool>(nullable: true),
                    Parameter01 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter02 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter03 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter04 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter05 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter06 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter07 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter08 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter09 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter10 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter11 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter12 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter13 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter14 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter15 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter16 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter17 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter18 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter19 = table.Column<string>(maxLength: 1024, nullable: true),
                    Parameter20 = table.Column<string>(maxLength: 1024, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleSettingDetail", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoleSettingDetail");

            migrationBuilder.AlterColumn<int>(
                name: "Year",
                table: "OutstandingData",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RpcValueBaht",
                table: "OutstandingData",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "OutstandingId",
                table: "OutstandingData",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Outstanding",
                table: "OutstandingData",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ItemListValueBaht",
                table: "OutstandingData",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "OutstandingData",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "InitiativeId",
                table: "OutstandingData",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
