using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_approveandsubmitdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastSubmittedDate",
                table: "InitiativeStatusHistory",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastSubmittedDate",
                table: "Initiatives",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastApprovedIL4Date",
                table: "ImpactTrackings",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastApprovedIL5Date",
                table: "ImpactTrackings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastSubmittedDate",
                table: "InitiativeStatusHistory");

            migrationBuilder.DropColumn(
                name: "LastSubmittedDate",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "LastApprovedIL4Date",
                table: "ImpactTrackings");

            migrationBuilder.DropColumn(
                name: "LastApprovedIL5Date",
                table: "ImpactTrackings");
        }
    }
}
