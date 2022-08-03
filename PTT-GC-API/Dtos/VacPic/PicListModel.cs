using System;
using System.Collections.Generic;

namespace PTT_GC_API.Dtos.VacPic
{
    public class PicListModel
    {
        public int PicListId { get; set; }
        public DateTime? MeetingDate { get; set; }
        public List<Models.VacPic.PicMember> PicMember { get; set; }
        public List<Models.VacPic.InitiativeMember> InitiativeMember { get; set; }
    }

    public class PicListFront
    {
        public int PicListId { get; set; }
        public DateTime? MeetingDate { get; set; }
        public string StatusPic { get; set; }
        public string[] UpStream { get; set; }
        public string[] CenterStream { get; set; }
        public string[] DownStream { get; set; }
        public List<Models.VacPic.InitiativeMember> InitiativeMember { get; set; }
    }
}