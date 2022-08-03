using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_IL5RRRecurring_column_in_shareBenefitTabel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "IL5RRRecurring",
                table: "ShareBenefitWorkstreams",
                type: "decimal(18,3)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IL5RRRecurring",
                table: "ShareBenefitWorkstreams");
        }
    }
}
