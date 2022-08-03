import { RouterReducerState } from '@ngrx/router-store';

import { initialPlantState, IPlantState } from '@states/plant.state';

export interface IAppState {
  router?: RouterReducerState;
  plants: IPlantState;
}

export const initialAppState: IAppState = {
  plants: initialPlantState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
