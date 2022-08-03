using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addTableForMappingAppReqWbs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {            
            migrationBuilder.CreateTable(
                name: "MappingCapexAppWbs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GeneratedDate = table.Column<DateTime>(nullable: true),
                    InitiativeCAPEXNo = table.Column<string>(nullable: true),
                    RevisionNo = table.Column<int>(nullable: true),
                    AppRequestNumber = table.Column<string>(nullable: true),
                    AppRequestCreatedOn = table.Column<DateTime>(nullable: true),
                    WBSNo = table.Column<string>(nullable: true),
                    WBSCreatedOn = table.Column<DateTime>(nullable: true),
                    CompanyCode = table.Column<int>(nullable: true),
                    IMPosition = table.Column<string>(nullable: true),
                    ApprovedYear = table.Column<int>(nullable: false),
                    DistributedToWBS = table.Column<bool>(nullable: true),
                    SentEmail = table.Column<bool>(nullable: true),
                    ChangedOn = table.Column<DateTime>(nullable: true),
                    ChangedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MappingCapexAppWbs", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MappingCapexAppWbs");

            migrationBuilder.AlterColumn<bool>(
                name: "RequireBOD1",
                table: "InitiativeDetails",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);
        }
    }
}
