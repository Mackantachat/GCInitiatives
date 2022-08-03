import { EPlantActions } from '@actions/plant.action';
import { PlantActions } from '@actions/plant.action';
import { initialPlantState, IPlantState } from '@states/plant.state';

export const plantReducers = (
  state = initialPlantState,
  action: PlantActions
): IPlantState => {
  switch (action.type) {
    case EPlantActions.GetPlantsSuccess: {
      return {
        ...state,
        plants: action.payload
      };
    }
    default:
      return state;
  }
};
