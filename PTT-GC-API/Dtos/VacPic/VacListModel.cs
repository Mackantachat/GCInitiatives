using System;
using System.Collections.Generic;

namespace PTT_GC_API.Dtos.VacPic
{
    public class VacListModel
    {
        public int VacListId { get; set; }
        public DateTime? MeetingDate { get; set; }
        public List<Models.VacPic.VacMember> VacMember { get; set; }
        public List<Models.VacPic.InitiativeMember> InitiativeMember { get; set; }
    }

    public class VacListFront
    {
        public int VacListId { get; set; }
        public DateTime? MeetingDate { get; set; }
        public string StatusVac { get; set; }
        public string[] Common { get; set; }
        public string[] specific { get; set; }
        public List<Models.VacPic.InitiativeMember> InitiativeMember { get; set; }
    }

}