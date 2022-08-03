using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_Order_subworkstream : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CLevelOrder",
                table: "SubWorkstreams",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Subworkstream1Order",
                table: "SubWorkstreams",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WorkstreamOrder",
                table: "SubWorkstreams",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CLevelOrder",
                table: "SubWorkstreams");

            migrationBuilder.DropColumn(
                name: "Subworkstream1Order",
                table: "SubWorkstreams");

            migrationBuilder.DropColumn(
                name: "WorkstreamOrder",
                table: "SubWorkstreams");
        }
    }
}
