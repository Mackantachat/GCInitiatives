using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Initiative
{
    public class OwnerInitiativeDetail
    {
        public string EmployeeID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PositionID { get; set; }
        public string BUID { get; set; }
        public string WorkstreamID { get; set; }
        public string[] RoleID { get; set; }
        public string Remark { get; set; }
        public List<DropdownBu> DropdownBu { get; set; }
        public List<DropdownPosition> DropdownPosition { get; set; }
        public List<DropdownWorkstream> DropdownWorkstream { get; set; }

    }

    public class DropdownBu
    {
        public string Value { get; set; }
        public string Text { get; set; }
    }

    public class DropdownPosition
    {
        public string Value { get; set; }
        public string Text { get; set; }
    }

    public class DropdownWorkstream
    {
        public string Value { get; set; }
        public string Text { get; set; }
    }
}
