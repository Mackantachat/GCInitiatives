using System;

namespace PTT_GC_API.Dtos.Audit
{
    public class LogComment
    {
        public string CommentDetail { get; set; }
        public string CommentBy { get; set; }
        public string CommentByName { get; set; }
        public DateTime? CommentDate { get; set; }
        public LogComment()
        {
            CommentDate = DateTime.Now;
        }
    }
}