import { Injectable } from '@angular/core';
import { CarryOver } from '@models/carry-over-respose';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarriedDataService {
  private readonly _DATA: BehaviorSubject<CarryOver[]>;

  constructor() {
    this._DATA = new BehaviorSubject(null);
  }

  get DATA(): BehaviorSubject<CarryOver[]> {
    return this._DATA;
  }

  get value(): CarryOver[] {
    return this._DATA.value;
  }
}
