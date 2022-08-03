using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class add_new_column_for_merge_qa_to_prod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PicListId",
                table: "PicMember",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Gate",
                table: "PicMember",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InitiativeId",
                table: "PicMember",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SurveyVersions",
                table: "ITAssets",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SurveyVersions",
                table: "Initiatives",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SurveyVersions",
                table: "CapexTopics",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TopicType",
                table: "CapexTopics",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SurveyVersions",
                table: "CapexChoices",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ChoiceId",
                table: "CapexBudgetSurveys",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gate",
                table: "PicMember");

            migrationBuilder.DropColumn(
                name: "InitiativeId",
                table: "PicMember");

            migrationBuilder.DropColumn(
                name: "SurveyVersions",
                table: "ITAssets");

            migrationBuilder.DropColumn(
                name: "SurveyVersions",
                table: "Initiatives");

            migrationBuilder.DropColumn(
                name: "SurveyVersions",
                table: "CapexTopics");

            migrationBuilder.DropColumn(
                name: "TopicType",
                table: "CapexTopics");

            migrationBuilder.DropColumn(
                name: "SurveyVersions",
                table: "CapexChoices");

            migrationBuilder.DropColumn(
                name: "ChoiceId",
                table: "CapexBudgetSurveys");

            migrationBuilder.AlterColumn<int>(
                name: "PicListId",
                table: "PicMember",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
