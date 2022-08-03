import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IAppState } from '@states/app.state';
import { GetPlantsSuccess, EPlantActions, GetPlants } from '@actions/plant.action';

import { PlantService } from '@services/plant/plant.service';

@Injectable()
export class PlantEffects {
  constructor(
    private plantService: PlantService,
    private actions$: Actions,
    private store: Store<IAppState>
  ) { }
}
