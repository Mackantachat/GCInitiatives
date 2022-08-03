import { Action } from '@ngrx/store';

import { Plant } from '@models/plant';

export enum EPlantActions {
  GetPlants = '[Plant] Get Plants',
  GetPlantsSuccess = '[Plant] Get Plants Success',
}

export class GetPlants implements Action {
  public readonly type = EPlantActions.GetPlants;
}

export class GetPlantsSuccess implements Action {
  public readonly type = EPlantActions.GetPlantsSuccess;
  constructor(public payload: Plant[]) {}
}

export type PlantActions = GetPlants | GetPlantsSuccess;
