import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { IAppState } from '@states/app.state';
import { plantReducers } from '@reducers/plant.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  plants: plantReducers
};
