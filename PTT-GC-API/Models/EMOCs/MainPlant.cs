using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.EMOCs
{
    public class MainPlant
    {
        [Key]
        public int MainPlanId { get; set; }
        public string EMocTitle { get; set; }
        public int? InitiativeId { get; set; }
        public string Plant { get; set; }
        public string AreaUnit { get; set; }
        public string TypeOfChange { get; set; }
        public string MocCategory { get; set; }
        public DateTime? ExpireDate { get; set; }
        public string DetailOfTheChange { get; set; }
        public string InitialListOfPeople { get; set; }
        public string EmocNo { get; set; }
        public string MocChampion { get; set; }

        public bool? IsMainPlant { get; set; }
        public string GoalAchievement { get; set; }
        public string SpecifiedGoalAchievement { get; set; }
        public string AssumptionOfGoal { get; set; }
        public string ReasonForChange { get; set; }
    }
}
