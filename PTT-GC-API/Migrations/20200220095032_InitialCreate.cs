using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PTT_GC_API.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BuWorkstreams",
                columns: table => new
                {
                    BuWorkstreamId = table.Column<string>(nullable: false),
                    BuWorkstreamTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuWorkstreams", x => x.BuWorkstreamId);
                });

            migrationBuilder.CreateTable(
                name: "CoDevelopers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CoDeveloperName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoDevelopers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EntryModes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EntryModeId = table.Column<string>(nullable: true),
                    EntryModeTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntryModes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Initiatives",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InitiativeCode = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Year = table.Column<string>(nullable: true),
                    OwnerName = table.Column<string>(nullable: true),
                    BuWorkStream = table.Column<string>(nullable: true),
                    Plant = table.Column<string>(maxLength: 50, nullable: true),
                    Location = table.Column<string>(maxLength: 300, nullable: true),
                    SpecifyLocation = table.Column<string>(maxLength: 300, nullable: true),
                    RegisteringDate = table.Column<DateTime>(nullable: true),
                    FinishingDate = table.Column<DateTime>(nullable: true),
                    Detail = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    ResultObjective = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    InitiativeType = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    RequestCapex = table.Column<string>(nullable: true),
                    CostEstCapex = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    costEstCapexType = table.Column<string>(nullable: true),
                    TypeOfInvestment = table.Column<string>(maxLength: 50, nullable: true),
                    BudgetType = table.Column<string>(nullable: true),
                    Ram = table.Column<string>(nullable: true),
                    JFactor = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TypeBenefit = table.Column<string>(nullable: true),
                    BenefitAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BenefitAmountType = table.Column<string>(nullable: true),
                    PayBackPeriod = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Irr = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    FxExchange = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Cim = table.Column<bool>(nullable: true),
                    Pim = table.Column<bool>(nullable: true),
                    Dim = table.Column<bool>(nullable: true),
                    Max = table.Column<bool>(nullable: true),
                    DirectCapex = table.Column<bool>(nullable: true),
                    Cpi = table.Column<bool>(nullable: true),
                    Strategy = table.Column<bool>(nullable: true),
                    RandD = table.Column<bool>(nullable: true),
                    Other = table.Column<bool>(nullable: true),
                    ApprovedDate = table.Column<DateTime>(nullable: true),
                    ApprovedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true),
                    LastActivity = table.Column<string>(nullable: true),
                    DeletedFlag = table.Column<bool>(nullable: true),
                    Status = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Initiatives", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MilestoneStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MilestoneStatusId = table.Column<string>(nullable: true),
                    MilestoneStatusName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MilestoneStatuses", x => x.Id);
                });        

            migrationBuilder.CreateTable(
                name: "Owners",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Owners", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Plants",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlantId = table.Column<string>(nullable: true),
                    PlantTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plants", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductUnits",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductUnitId = table.Column<string>(nullable: true),
                    ProductUnitTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductUnits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StrategicObjectives",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StrategicObjectiveId = table.Column<string>(nullable: true),
                    StrategicObjectiveTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StrategicObjectives", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Strategies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StrategyId = table.Column<string>(nullable: true),
                    StrategyTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Strategies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeOfInvestments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeOfInvestmentId = table.Column<string>(nullable: true),
                    TypeOfInvestmentTitle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeOfInvestments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    Approver = table.Column<string>(nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    LastActive = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Attachments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    File = table.Column<byte[]>(nullable: true),
                    ContentType = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    InitiativeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Attachments_Initiatives_InitiativeId",
                        column: x => x.InitiativeId,
                        principalTable: "Initiatives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FinancialIndicators",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Year = table.Column<string>(nullable: true),
                    Revenue = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Ebitda = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Capex = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Opex = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Valuation = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    InitiativeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinancialIndicators", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FinancialIndicators_Initiatives_InitiativeId",
                        column: x => x.InitiativeId,
                        principalTable: "Initiatives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Financials",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AvgRevenue = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    AvgEbitda = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotalCapex = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotalOpex = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotalValuation = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    InitiativeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Financials", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Financials_Initiatives_InitiativeId",
                        column: x => x.InitiativeId,
                        principalTable: "Initiatives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InitiativeCoDevelopers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CoDeveloperName = table.Column<string>(nullable: true),
                    InitiativeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InitiativeCoDevelopers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InitiativeCoDevelopers_Initiatives_InitiativeId",
                        column: x => x.InitiativeId,
                        principalTable: "Initiatives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InitiativeDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StrategicObjective = table.Column<string>(maxLength: 50, nullable: true),
                    StrategyDetail = table.Column<string>(maxLength: 50, nullable: true),
                    EntryMode = table.Column<string>(maxLength: 50, nullable: true),
                    HaveProduct = table.Column<string>(nullable: true),
                    PlanBOD1 = table.Column<DateTime>(nullable: true),
                    PlanBOD2 = table.Column<DateTime>(nullable: true),
                    FX = table.Column<string>(maxLength: 300, nullable: true),
                    FxChoice = table.Column<string>(maxLength: 10, nullable: true),
                    ShareOfInvestment = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    FirstBudgetYear = table.Column<string>(maxLength: 10, nullable: true),
                    Note = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    InitiativeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InitiativeDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InitiativeDetails_Initiatives_InitiativeId",
                        column: x => x.InitiativeId,
                        principalTable: "Initiatives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Milestones",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Detail = table.Column<string>(type: "nvarchar(MAX)", nullable: true),
                    KeyDeliverable = table.Column<string>(nullable: true),
                    ActionBy = table.Column<string>(nullable: true),
                    FromDate = table.Column<DateTime>(nullable: true),
                    ToDate = table.Column<DateTime>(nullable: true),
                    MilestoneStatus = table.Column<string>(nullable: true),
                    InitiativeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Milestones", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Milestones_Initiatives_InitiativeId",
                        column: x => x.InitiativeId,
                        principalTable: "Initiatives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Capacity = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Type = table.Column<string>(nullable: true),
                    Other = table.Column<string>(nullable: true),
                    ProductUnit = table.Column<string>(nullable: true),
                    InitiativeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Initiatives_InitiativeId",
                        column: x => x.InitiativeId,
                        principalTable: "Initiatives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attachments_InitiativeId",
                table: "Attachments",
                column: "InitiativeId");

            migrationBuilder.CreateIndex(
                name: "IX_FinancialIndicators_InitiativeId",
                table: "FinancialIndicators",
                column: "InitiativeId");

            migrationBuilder.CreateIndex(
                name: "IX_Financials_InitiativeId",
                table: "Financials",
                column: "InitiativeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InitiativeCoDevelopers_InitiativeId",
                table: "InitiativeCoDevelopers",
                column: "InitiativeId");

            migrationBuilder.CreateIndex(
                name: "IX_InitiativeDetails_InitiativeId",
                table: "InitiativeDetails",
                column: "InitiativeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Milestones_InitiativeId",
                table: "Milestones",
                column: "InitiativeId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_InitiativeId",
                table: "Products",
                column: "InitiativeId");          
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attachments");

            migrationBuilder.DropTable(
                name: "BuWorkstreams");

            migrationBuilder.DropTable(
                name: "CoDevelopers");

            migrationBuilder.DropTable(
                name: "EntryModes");

            migrationBuilder.DropTable(
                name: "FinancialIndicators");

            migrationBuilder.DropTable(
                name: "Financials");

            migrationBuilder.DropTable(
                name: "InitiativeCoDevelopers");

            migrationBuilder.DropTable(
                name: "InitiativeDetails");

            migrationBuilder.DropTable(
                name: "Milestones");

            migrationBuilder.DropTable(
                name: "MilestoneStatuses");

            migrationBuilder.DropTable(
                name: "Owners");

            migrationBuilder.DropTable(
                name: "Plants");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "ProductUnits");

            migrationBuilder.DropTable(
                name: "StrategicObjectives");

            migrationBuilder.DropTable(
                name: "Strategies");

            migrationBuilder.DropTable(
                name: "TypeOfInvestments");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Initiatives");
        }
    }
}
