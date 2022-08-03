using System.ComponentModel.DataAnnotations;

namespace PTT_GC_API.Models.DashboardPermission
{
    public class DashboardPermission
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
    }
}
