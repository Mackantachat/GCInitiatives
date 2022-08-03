import { ResourceNeededData } from './resourceNeededData';
import { ManPowerData } from './manpowerData';
import { LandData } from './landData';
import { PollutionData } from './pollutionData';
import { WesteData } from './westeData';
import { UtilityData } from './utilityData';

export interface ResourceNeededItems {
    id: number,
    initiativeId?: number,
    isManpowerRequire: boolean,
    isImportRequire: boolean,
    remarkImport: string,
    isLandRequire: boolean,
    isAirPollutionRequire: boolean,
    isWasteRequire: boolean,
    isUtilityRequire: boolean,
    manpowerForm: {
        manpowerData: Array<ManPowerData>
    },
    importExportFacilityData: string;
    landForm: {
        landData: Array<LandData>
    },
    airForm: {
        pollutionData: Array<PollutionData>
    },
    wasteForm:{
        wasteData: Array<WesteData>
    },
    utilityData: UtilityData
}
