using System.Collections.Generic;

namespace PTT_GC_API.Models.Strategy
{
    public class StrategicObjective
    {
        public int Id { get; set; }
        public string StrategicObjectiveCode { get; set; }
        public string StrategicObjectiveTitle { get; set; }
        public string Year { get; set; }
        public virtual ICollection<Strategy> Strategies { get; set; }
    }
}