using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Helpers
{
    public class LogInsight
    {
        private static IServiceCollection services = new ServiceCollection();


        public static void Log(object data, string repoName, SQLCommandType sqlCommandType, bool isAfterUpdate = false)
        {
            using (InMemoryChannel channel = new InMemoryChannel())
            {
                /*services.Configure<TelemetryConfiguration>(config => config.TelemetryChannel = channel);
                services.AddLogging(builder =>
                {
                // Only Application Insights is registered as a logger provider
                builder.AddApplicationInsights("d8f5dcd0-c0db-4313-bbff-a938c289f286");
                });

                IServiceProvider serviceProvider = services.BuildServiceProvider();
                ILogger<Program> logger = serviceProvider.GetRequiredService<ILogger<Program>>();

                logger.LogWarning(JsonConvert.SerializeObject(new LogData() { RepoName = repoName, Data = data, SQLCommandType = sqlCommandType, IsAfterUpdate = isAfterUpdate }));
                channel.Flush();
                Task.Delay(TimeSpan.FromMilliseconds(300)).Wait();*/
            }
        }

        private class LogData
        {
            public const string LogName = "FRONTIS-SQL-LOG";
            public string RepoName { get; set; }
            [JsonConverter(typeof(StringEnumConverter))]
            public SQLCommandType SQLCommandType { get; set; }            
            public bool IsAfterUpdate { get; set; }
            public Object Data { get; set; }
        }

    }

    public enum SQLCommandType { INSERT, UPDATE, DELETE, EXECUTE }
}
