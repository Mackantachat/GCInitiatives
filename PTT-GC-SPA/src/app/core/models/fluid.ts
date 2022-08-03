export interface Fluid {
    resourceNeededId: number,
    topicId: number,
    fluidType: string,
    pressureNormal: number,
    flowNormal: number,
    pressureUnit: string,
    flowUnit: string,
    pressureMax: number,
    flowMax: number,
    firstSupply: Date,
    cod: Date,
    supplyPeriods: number
}