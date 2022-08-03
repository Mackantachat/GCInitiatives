import { Plant } from '@models/plant';

export interface IPlantState {
  plants: Plant[];
}

export const initialPlantState: IPlantState = {
  plants: null
};
