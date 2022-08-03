using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class change_blankableValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValueIL4",
                table: "BlankablePlans");

            migrationBuilder.RenameColumn(
                name: "ValueIL5",
                table: "BlankablePlans",
                newName: "BlankableValue");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BlankableValue",
                table: "BlankablePlans",
                newName: "ValueIL5");

            migrationBuilder.AddColumn<decimal>(
                name: "ValueIL4",
                table: "BlankablePlans",
                type: "decimal(18,2)",
                nullable: true);
        }
    }
}
