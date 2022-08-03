import { ElecticityData } from './electricityData';
import { Fluid } from './fluid';
import { OtherUtilityData } from './otherUtilityData';
import { TimeLineTable } from './timeLineTable';
import { FutureFactors } from './futureFactors';
import { FutureFactorTable } from './futureFactorTable';
import { SteamData } from './steamData';

export interface UtilityData {
    electricityData: Array<ElecticityData>,
    steamData: SteamData,
    deminWaterData: Fluid,
    treatedClarifyWater: Fluid,
    returnWater: Fluid,
    hydrogen: Fluid,
    nitrogen: Fluid,
    naturalGas: Fluid,
    otherData: Array<OtherUtilityData>
}