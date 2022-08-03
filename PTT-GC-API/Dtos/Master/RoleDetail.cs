using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Master
{
    public class RoleDetail
    {
        public int Id { get; set; }
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public bool? IsActive { get; set; }
        public string Description { get; set; }
        public RoleGroupItem[] Item { get; set; }
    }

    public class RoleGroupItem
    {
        public string ScreenObject { get; set; }
        public string[] Action { get; set; }
    }
}

