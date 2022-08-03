using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.Audits
{
    public class Audits
    {
        [Key]
        public int Id { get; set; }
        public int ChangeSetId { get; set; }
        public string  InitiativeCode { get; set; }
        public string ActionType { get; set; }
        public string TableName { get; set; }
        public string PK { get; set; }
        public string FieldName { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public DateTime? ActionDate { get; set; }
        public string ActionBy { get; set; }
        public string CommentBy { get; set; }
        public DateTime? CommentDate { get; set; }
        public string CommentDetail { get; set; }
        public string CommentByName { get; set; }
    }
}
