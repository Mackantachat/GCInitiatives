using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API.Models.ResourceNeeded
{
    public class ResourceNeeded
    {
        [Key]
        public int Id { get; set; }
        public bool? IsManpowerRequire { get; set; }
        public bool? IsImportRequire { get; set; }
        public string RemarkImport { get; set; }
        public bool? IsLandRequire { get; set; }
        public bool? IsAirPollutionRequire { get; set; }
        public bool? IsWasteRequire { get; set; }
        public bool? IsUtilityRequire { get; set; }
        //public bool? IsUtilityTableRequired { get; set; }
        public int? InitiativeId { get; set; }
    }
}
