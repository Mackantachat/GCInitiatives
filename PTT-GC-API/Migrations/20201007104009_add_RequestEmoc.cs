using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_RequestEmoc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropColumn(
            //    name: "IsDeliverAsPerCommittedDateL",
            //    table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "TimeLineDetail",
                table: "DetailInformations");

            migrationBuilder.CreateTable(
                name: "RequestEmoc",
                columns: table => new
                {
                    RequestEmocId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: true),
                    Plant = table.Column<string>(maxLength: 200, nullable: true),
                    EmocNo = table.Column<string>(maxLength: 200, nullable: true),
                    EmocName = table.Column<string>(maxLength: 200, nullable: true),
                    EmocRequestStatus = table.Column<string>(maxLength: 200, nullable: true),
                    EmocStatus = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestEmoc", x => x.RequestEmocId);
                });

            migrationBuilder.CreateTable(
                name: "RequestEmocQuestion",
                columns: table => new
                {
                    RequestEmocQuestionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeId = table.Column<int>(nullable: true),
                    Plant = table.Column<string>(maxLength: 200, nullable: true),
                    EmocQuestionId = table.Column<string>(maxLength: 500, nullable: true),
                    EmocAnswer = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestEmocQuestion", x => x.RequestEmocQuestionId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RequestEmoc");

            migrationBuilder.DropTable(
                name: "RequestEmocQuestion");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeliverAsPerCommittedDateL",
                table: "DetailInformations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "TimeLineDetail",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
