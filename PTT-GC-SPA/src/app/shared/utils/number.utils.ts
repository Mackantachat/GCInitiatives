import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberUtil {

  Decimal(value) {
    if (value) {
      const decimal = String(value).match(/^\d+\.\d{0,2}/);
      if (Number(decimal) !== 0) {
        return decimal[0];
      }
    }
  }
}
