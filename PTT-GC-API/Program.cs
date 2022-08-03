using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using PTT_GC_API.Data;

namespace PTT_GC_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // CreateHostBuilder(args).Build().Run();
            var host = CreateHostBuilder(args).Build();
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<DataContext>();
                    context.Database.Migrate();
                    Seeder.SeedOverviewPermission(context);
                    Seeder.SeedPlans(context);
                    Seeder.SeedOrganization(context);
                    Seeder.SeedCoDeveloper(context);
                    Seeder.SeedOwner(context);
                    Seeder.SeedTypeOfInvestment(context);
                    Seeder.SeedMilestoneStatus(context);
                    Seeder.SeedProductUnit(context);
                    Seeder.SeedStrategicObjective(context);
                    Seeder.SeedStrategy(context);
                    Seeder.SeedEntryMode(context);
                    Seeder.SeedTypeOfBenefit(context);
                    Seeder.SeedWorkStream(context);
                    Seeder.SeedInitiativeTypeMax(context);
                    Seeder.SeedSubWorkstream(context);
                    Seeder.SeedFrequency(context);
                    Seeder.SeedKpis(context);
                    Seeder.SeedPoolBudgetFrom(context);
                    Seeder.SeedCurrency(context);
                    Seeder.SeedCustomGraph(context);
                    Seeder.SeedAudit(context);
                    Seeder.SeedMaxApproverSetting(context);
                    Seeder.SeedTempHrWebService(context);
                    Seeder.SeedURLTable(context);
                    Seeder.SeedCapexTopic(context);
                    Seeder.SeedCapexChoice(context);
                    Seeder.SeedITBudgetSurveyAsset(context);
                    Seeder.SeedProcurement(context);
                    Seeder.SeedCommonData(context);
                    Seeder.SeedCommonDataSetting(context);
                    Seeder.SeedCAPEX_ReportParameter(context);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred during migration");
                }
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseKestrel(o => { 
                        o.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(30);
                        o.Limits.MaxRequestBodySize = null;
                    });
                });
    }
}
