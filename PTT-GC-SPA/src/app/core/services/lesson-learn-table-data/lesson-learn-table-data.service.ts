import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { LessonLearnTableRowData } from '@models/lesson-learn-table-row-data';
import { LessonLearnApiService } from '@services/lesson-learn-api/lesson-learn-api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LessonLearnTableDataService {
  private readonly _DATA: BehaviorSubject<LessonLearnTableRowData[]>;
  baseUrl: string = environment.pathUrl;
  constructor() {
    this._DATA = new BehaviorSubject([]);
  }

  get DATA(): BehaviorSubject<LessonLearnTableRowData[]> {
    return this._DATA;
  }

  update(input: LessonLearnTableRowData): void {
    let data: LessonLearnTableRowData[];
    if (input.lessonLearnNo !== undefined) {
      data = this._DATA.value;
      const index = data.findIndex(
        (elem) => elem.lessonLearnNo === input.lessonLearnNo
      );
      data[index] = input;
    } else {
      input.lessonLearnNo = String(this._DATA.value.length + 1);
      data = [...this._DATA.value, input];
    }

    this._DATA.next(data);
  }

  delete(row: LessonLearnTableRowData): void {
    const data = this._DATA.value;
    const index = data.findIndex(
      (elem) => elem.lessonLearnNo === row.lessonLearnNo
    );
    data.splice(index, 1);
    data.forEach((rowData, i) => {
      rowData.lessonLearnNo = String(i + 1);
    });
    this._DATA.next(data);
  }

  clear(): void {
    let nullableValue: LessonLearnTableRowData[] = [] as LessonLearnTableRowData[];
    this._DATA.next(nullableValue);
  }
}
