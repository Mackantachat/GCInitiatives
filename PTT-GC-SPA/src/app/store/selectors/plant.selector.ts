import { createSelector } from '@ngrx/store';

import { IAppState } from '@states/app.state';
import { IPlantState } from '@states/plant.state';

const selectPlants = (state: IAppState) => state.plants;

export const selectPlantList = createSelector(
  selectPlants, (state: IPlantState) => state.plants
);
