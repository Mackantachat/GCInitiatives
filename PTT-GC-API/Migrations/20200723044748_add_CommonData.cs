using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_CommonData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CommonData",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataType = table.Column<string>(maxLength: 255, nullable: true),
                    Attribute01 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute02 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute03 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute04 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute05 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute06 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute07 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute08 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute09 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute10 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute11 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute12 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute13 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute14 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute15 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute16 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute17 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute18 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute19 = table.Column<string>(maxLength: 1024, nullable: true),
                    Attribute20 = table.Column<string>(maxLength: 1024, nullable: true),
                    IsDelete = table.Column<bool>(nullable: true),
                    IsDisable = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommonData", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CommonDataSetting",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataType = table.Column<string>(maxLength: 255, nullable: true),
                    DisplayName = table.Column<string>(maxLength: 255, nullable: true),
                    AttributeName01 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName02 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName03 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName04 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName05 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName06 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName07 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName08 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName09 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName10 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName11 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName12 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName13 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName14 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName15 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName16 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName17 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName18 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName19 = table.Column<string>(maxLength: 1024, nullable: true),
                    AttributeName20 = table.Column<string>(maxLength: 1024, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommonDataSetting", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommonData");

            migrationBuilder.DropTable(
                name: "CommonDataSetting");
        }
    }
}
