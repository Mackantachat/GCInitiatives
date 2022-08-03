import { Injectable } from '@angular/core';
import { DIDetail, KpiKriData, KpiKriModel, KriDetailMonth } from '@models/kpiKriData';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiKriDataService {
  modalKey: string;
  modalIndex: number;
  private readonly _DATA: BehaviorSubject<KriDetailMonth>;

  constructor() {
    this._DATA = new BehaviorSubject(null);
  }

  get DATA(): BehaviorSubject<KriDetailMonth> {
    return this._DATA;
  }

  get value(): KriDetailMonth {
    return this._DATA.value;
  }

  updateByModal(data: KriDetailMonth) {
    this._DATA.next(data);
  }

  setModalSelected(index: number) {
    this.modalIndex = index;
  }
}
