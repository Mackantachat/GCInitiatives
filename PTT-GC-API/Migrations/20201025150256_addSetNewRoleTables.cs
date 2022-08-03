using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class addSetNewRoleTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "UserRoles",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Action",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActionId = table.Column<string>(nullable: true),
                    ActionName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Action", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BU",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BUID = table.Column<string>(nullable: true),
                    BUText = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BU", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Position",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PositionID = table.Column<string>(nullable: true),
                    PositionLevel = table.Column<string>(nullable: true),
                    PositionShortTextEN = table.Column<string>(nullable: true),
                    PositionTextEN = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Position", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoleDetailSetting",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(nullable: true),
                    RoleName = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleDetailSetting", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoleScreen",
                columns: table => new
                {
                    RoleScreenId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(nullable: true),
                    ScreenObjectId = table.Column<string>(nullable: true),
                    ActionId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleScreen", x => x.RoleScreenId);
                });

            migrationBuilder.CreateTable(
                name: "ScreenObject",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ScreenObjectId = table.Column<string>(nullable: true),
                    ScreenObjectName = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScreenObject", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserManagement2",
                columns: table => new
                {
                    UserManagementId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeID = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Position = table.Column<string>(nullable: true),
                    BU = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Workstream = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserManagement2", x => x.UserManagementId);
                });

            migrationBuilder.CreateTable(
                name: "WorkStream2",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkstreamID = table.Column<string>(nullable: true),
                    WorkstreamTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkStream2", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Action");

            migrationBuilder.DropTable(
                name: "BU");

            migrationBuilder.DropTable(
                name: "Position");

            migrationBuilder.DropTable(
                name: "RoleDetailSetting");

            migrationBuilder.DropTable(
                name: "RoleScreen");

            migrationBuilder.DropTable(
                name: "ScreenObject");

            migrationBuilder.DropTable(
                name: "UserManagement2");

            migrationBuilder.DropTable(
                name: "WorkStream2");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "UserRoles");
        }
    }
}
