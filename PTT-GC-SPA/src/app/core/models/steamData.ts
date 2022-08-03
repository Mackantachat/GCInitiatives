import { Condensate } from './condensate';

export interface SteamData{
    highPressure:Condensate;
    mediumPressure:Condensate;
    lowPressure:Condensate;
    otherSteamPressure:Condensate;
}