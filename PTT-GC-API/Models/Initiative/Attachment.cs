using System;

namespace PTT_GC_API.Models.Initiative
{
    public class Attachment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FileName { get; set; }
        public string Extension { get; set; }
        // public byte[] File { get; set; }
        public string ContentType { get; set; }
        public DateTime CreatedDate { get; set; }
        public int InitiativeId { get; set; }
        public Attachment()
        {
            CreatedDate = DateTime.Now;
        }
        public string CategoryName { get; set; }
        public int? CategoryId { get; set; }
    }
}
