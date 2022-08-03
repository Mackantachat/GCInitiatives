using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class AddColumnDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConsistenWithCompanyStrategy",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "DivisionManagerOfOwner",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ExpectedTargetAndResult",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "MileStoneAndSchedule",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "OtherResourcesNeeded",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "SubmitTo",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "VicePresidentOfOwner",
                table: "DetailInformations");

            migrationBuilder.AddColumn<string>(
                name: "Boi",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BoiNo",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Capital",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Catalyst",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Checklist",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Coordinate",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CutFeedDate",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Cycle",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EquipmentName",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EquipmentOrAsset",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExpectedTarget",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ForEnvironment",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ForTurnaround",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Manager",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MilestoneSchedule",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OldAssetCondition",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OldAssetNo",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Parties",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "President",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectManager",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectPropose",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReplaceEquipment",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReplacementDate",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "RightOfUse",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Software",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SourceOfFeedback",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartUpDate",
                table: "DetailInformations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "otherResources",
                table: "DetailInformations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Boi",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "BoiNo",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Capital",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Catalyst",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Checklist",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Coordinate",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "CutFeedDate",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Cycle",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "EquipmentName",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "EquipmentOrAsset",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ExpectedTarget",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ForEnvironment",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ForTurnaround",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Manager",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "MilestoneSchedule",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "OldAssetCondition",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "OldAssetNo",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Parties",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "President",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ProjectManager",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ProjectPropose",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ReplaceEquipment",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "ReplacementDate",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "RightOfUse",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "Software",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "SourceOfFeedback",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "StartUpDate",
                table: "DetailInformations");

            migrationBuilder.DropColumn(
                name: "otherResources",
                table: "DetailInformations");

            migrationBuilder.AddColumn<string>(
                name: "ConsistenWithCompanyStrategy",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DivisionManagerOfOwner",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExpectedTargetAndResult",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MileStoneAndSchedule",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherResourcesNeeded",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubmitTo",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VicePresidentOfOwner",
                table: "DetailInformations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
