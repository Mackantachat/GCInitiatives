using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Initiative
{
    public class Audit
    {
        [Key]
        public int Id { get; set; }
        public int ChangeSetId { get; set; }
        [StringLength(50)]
        public string InitiativeCode { get; set; }
        [StringLength(50)]
        public string ActionType { get; set; }
        [StringLength(50)]
        public string TableName { get; set; }
        [StringLength(50)]
        public string PK { get; set; }
        [StringLength(100)]
        public string FieldName { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public DateTime? ActionDate { get; set; }
        [StringLength(100)]
        public string ActionBy { get; set; }
        [StringLength(1000)]
        public string CommentDetail { get; set; }
        [StringLength(100)]
        public string CommentBy { get; set; }
        [StringLength(100)]
        public string CommentByName { get; set; }
        public DateTime? CommentDate { get; set; }
    }
}
