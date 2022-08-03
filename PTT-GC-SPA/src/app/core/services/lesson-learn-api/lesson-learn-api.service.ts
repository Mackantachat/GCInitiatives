import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { commonData } from '@models/commonData';
import { LessonLearnTableRowData } from '@models/lesson-learn-table-row-data';
import {
  AreaOfLearningListResponse,
  MileStoneListResponse,
  ProjectPhaseNoListResponse,
  RatingListResponse
} from '@models/LessonLearnApiObject';
import { InitiativeService } from '@services/initiative/initiative.service';
import { LessonLearnTableDataService } from '@services/lesson-learn-table-data/lesson-learn-table-data.service';
import { Observable } from 'rxjs';


@Injectable()
export class LessonLearnApiService {
  lessonLearnData: LessonLearnTableRowData[]
  constructor(
    private lessonLearnTableDataService: LessonLearnTableDataService,
    private initiativeService: InitiativeService,
    private http: HttpClient) {
  }

  getAreaOfLearningDropDown(): Observable<Array<commonData>> {
    return this.http.get<Array<commonData>>(environment.apiUrl + "CommonData/AreaOfLearning");
  }

  CreateLessonLearn(): Observable<any> {
    return this.http.post<any>(environment.apiUrl + "LessonLearn/" + this.initiativeService.id, this.lessonLearnTableDataService.DATA.value);
  }

  GetLessonLearn(): Observable<LessonLearnTableRowData[]> {
    return this.http.get<LessonLearnTableRowData[]>(environment.apiUrl + "LessonLearn/" + this.initiativeService.id);
  }

  get rating(): Promise<RatingListResponse> {
    return new Promise<RatingListResponse>(
      resolve => {
        resolve({
          data: ['1', '2', '3', '4', '5']
        });
      }
    );
  }

  ///new code
  async CreateLessonLearnById(initiativeId, lessonLearnData): Promise<number> {
    return await (this.http.post<number>(environment.apiUrl + "LessonLearn/CreateLessonLearn/" + initiativeId, lessonLearnData).toPromise());
  }

  async UpdateLessonLearnById(initiativeId, lessonLearnData): Promise<number> {
    return await (this.http.put<number>(environment.apiUrl + "LessonLearn/UpdateLessonLearn/" + initiativeId, lessonLearnData).toPromise());
  }

  async DeleteLessonLearnById(id, lessonLearnId): Promise<number> {
    return await (this.http.delete<number>(environment.apiUrl + "LessonLearn/DeleteLessonLearn/" + id + "/" + lessonLearnId).toPromise());
  }


}
