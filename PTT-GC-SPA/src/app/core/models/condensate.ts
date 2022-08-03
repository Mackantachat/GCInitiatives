export interface Condensate {
    resourceNeededId: number,
    topicId: number,
    condensateType: string,
    pressureLevel: string,
    pressureNormal: number,
    tempNormal: number,
    flowNormal: number,
    pressureMax: number,
    tempMax: number,
    flowMax: number,
    firstSupply: Date,
    cod: Date,
    supplyPeriods: number
}