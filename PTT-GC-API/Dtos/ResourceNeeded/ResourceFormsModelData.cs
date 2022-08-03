using PTT_GC_API.Models.ResourceNeeded;
using System.Collections.Generic;

namespace PTT_GC_API.Dtos.ResourceNeededFormsModel
{
    public class ResourceFormsModelData
    {
        /// <summary>
        /// Models for ResourceNeeded Forms Data.
        /// </summary>
        public int? InitiativeId { get; set; }
        public int ResourceNeededId { get; set; }
        public int Id { get; set; }
        public bool? IsManpowerRequire { get; set; }
        public bool? IsImportRequire { get; set; }
        public string RemarkImport { get; set; }
        public bool? IsLandRequire { get; set; }
        public bool? IsAirPollutionRequire { get; set; }
        public bool? IsWasteRequire { get; set; }
        public bool? IsUtilityRequire { get; set; }
        //public bool? IsUtilityTableRequired { get; set; }
        //public ResourceNeeded ResourceNeededData { get; set; }
        public ManPowerContainer ManpowerForm { get; set; }
        public string ImportExportFacilityData { get; set; }
        public LandContainer LandForm { get; set; }
        public PollutionContainer AirForm { get; set; }
        public WasteContainer WasteForm { get; set; }
        public Utility UtilityData { get; set; }
    }

    public class WasteContainer
    {
        public List<Waste> WasteData { get; set; }
    }

    public class PollutionContainer
    {
        public List<AirPollution> PollutionData { get; set; }
    }

    public class LandContainer
    {
        public List<Land> LandData { get; set; }
    }

    public class ManPowerContainer
    {
        public List<Manpower> ManpowerData { get; set; }
    }
}
