using PTT_GC_API.Models.Initiative;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Dtos.Initiative
{
    public class NewDetailInformationModel
    {
        //Detail Information
        public Object DetailInformation { get; set; }
        //Product
        public List<Product> Product { get; set; }
        //Milestone
        public List<Milestone> Milestone { get; set; }
        //Financial
        public Financial Financial { get; set; }
        //Financial Indicator
        public List<FinancialIndicator> FinancialIndicators { get; set; }
    }
}
