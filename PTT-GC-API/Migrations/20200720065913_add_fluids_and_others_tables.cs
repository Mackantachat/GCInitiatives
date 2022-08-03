using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_fluids_and_others_tables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOtherRequired",
                table: "ResourceNeededs",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsUtilityRequired",
                table: "ResourceNeededs",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Fluids",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceNeededId = table.Column<int>(nullable: true),
                    Pressure_normal = table.Column<int>(nullable: true),
                    Flow_normal = table.Column<int>(nullable: true),
                    Pressure_max = table.Column<int>(nullable: true),
                    Flow_max = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fluids", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Others",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ResourceNeededId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    TopicId = table.Column<string>(nullable: true),
                    Pressure_Normal = table.Column<int>(nullable: true),
                    Flow_Normal = table.Column<int>(nullable: true),
                    Pressure_Max = table.Column<int>(nullable: true),
                    Flow_Max = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Others", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Fluids");

            migrationBuilder.DropTable(
                name: "Others");

            migrationBuilder.DropColumn(
                name: "IsOtherRequired",
                table: "ResourceNeededs");

            migrationBuilder.DropColumn(
                name: "IsUtilityRequired",
                table: "ResourceNeededs");
        }
    }
}
