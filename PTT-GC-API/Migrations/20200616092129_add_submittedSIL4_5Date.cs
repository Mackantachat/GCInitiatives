using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_submittedSIL4_5Date : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastSubmittedSIL4Date",
                table: "ImpactTrackings",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastSubmittedSIL5Date",
                table: "ImpactTrackings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastSubmittedSIL4Date",
                table: "ImpactTrackings");

            migrationBuilder.DropColumn(
                name: "LastSubmittedSIL5Date",
                table: "ImpactTrackings");
        }
    }
}
