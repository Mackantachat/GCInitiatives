using System;
using System.ComponentModel.DataAnnotations;

namespace PTT_GC_API.Models.ResourceNeeded
{
    public class FutureFactorTimelineRecords
    {
        [Key]
        public int Id { get; set; }
        public int ResourceNeededId { get; set; }
        public string Name { get; set; }
        public DateTime? FirstGenerated { get; set; }
    }
}
