using System;

namespace PTT_GC_API.Dtos.Audit
{
    public class AuditList
    {
        public int Id { get; set; }
        public string FieldName { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public DateTime? ActionDate { get; set; }
        public string ActionBy { get; set; }

        public string CommentDetail { get; set; }
        public string CommentBy { get; set; }
        public string CommentByName { get; set; }
        public DateTime? CommentDate { get; set; }
    }
}