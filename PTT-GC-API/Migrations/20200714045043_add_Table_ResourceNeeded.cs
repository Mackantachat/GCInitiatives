using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_Table_ResourceNeeded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AirPollutions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceNeededId = table.Column<int>(nullable: true),
                    Topic = table.Column<string>(nullable: true),
                    Amount = table.Column<decimal>(type: "decimal(18,3)", nullable: true),
                    Unit = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AirPollutions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Lands",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceNeededId = table.Column<int>(nullable: true),
                    Location = table.Column<string>(nullable: true),
                    Amount = table.Column<decimal>(type: "decimal(18,3)", nullable: true),
                    StartDate = table.Column<DateTime>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Manpowers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceNeededId = table.Column<int>(nullable: true),
                    Position = table.Column<string>(nullable: true),
                    AmountPerson = table.Column<int>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Manpowers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ResourceNeededs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsManpowerRequire = table.Column<bool>(nullable: true),
                    IsImportRequire = table.Column<bool>(nullable: true),
                    RemarkImport = table.Column<string>(nullable: true),
                    IsLandRequire = table.Column<bool>(nullable: true),
                    IsAirPollutionRequire = table.Column<bool>(nullable: true),
                    IsWasteRequire = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceNeededs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Wastes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceNeededId = table.Column<int>(nullable: true),
                    Topic = table.Column<string>(nullable: true),
                    Unit = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wastes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AirPollutions");

            migrationBuilder.DropTable(
                name: "Lands");

            migrationBuilder.DropTable(
                name: "Manpowers");

            migrationBuilder.DropTable(
                name: "ResourceNeededs");

            migrationBuilder.DropTable(
                name: "Wastes");
        }
    }
}
