import { Injectable } from '@angular/core';
import { CarryOver } from '@models/carry-over-respose';

@Injectable({
  providedIn: 'root'
})
export class CarriedApiService {

  constructor() {
  }

  get(): Promise<CarryOver[]> {
    return new Promise<CarryOver[]>(
      resolve => {
        resolve(null);
        // resolve(MockCarryOver.data);
      }
    );
  }
}