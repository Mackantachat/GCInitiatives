using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class create_new_table_for_support_switch_process : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SwitchProcessStageMapping",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OldProcess = table.Column<string>(nullable: true),
                    OldStage = table.Column<string>(nullable: true),
                    NewProcess = table.Column<string>(nullable: true),
                    NewStage = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SwitchProcessStageMapping", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SwitchProcessStageMapping");
        }
    }
}
