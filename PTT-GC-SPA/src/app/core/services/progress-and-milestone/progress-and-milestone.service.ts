import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ProgressPlanDateModel, ProgressPlanModel } from '../../models/progress-milestone-model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgressAndMilestoneService {

  host = environment.apiUrl;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': this.basic
  });

  constructor(
    private http: HttpClient,
  ) { }

  // Progress Plan APIs section
  // Get all progress and milestone
  GetAllProgressPlan = (): Promise<ProgressPlanModel[]> => {
    return this.http.get(this.host + '/api/ProgressPlan/GetProgressPlanAll').toPromise().then(
      (r) => {
        console.log('getAllProgressAndMilestone(): ', r);
        return r as ProgressPlanModel[];
      }
    ).catch(e => e);
  }

  // Get progress and milestone by ID
  getAllProgressPlanDate = (): Promise<ProgressPlanDateModel[]> => {
    return this.http.get(this.host + '/api/ProgressPlanDate/GetProgressPlanDateAll')
      .toPromise().then(r => r as ProgressPlanModel[]).catch(e => e);
  }

  // Update progress milestone
  updateProgressAndMilestone = (jsonData): Promise<any> => {
    return this.http.post(this.http + '/api', this.headers, jsonData).toPromise().then(r => r).catch(e => e);
  }

  // Create new progress plan date
  CreateProgressPlanDate = (jsonData): Promise<any> => {
    console.log('CreateProgressPlanDate(): ', jsonData);

    return this.http.post(this.host + '/api/ProgressPlanDate/CreateProgressPlanDate',
      jsonData,
      { headers: this.headers }
    ).toPromise().then(r => r).catch(e => e);
  }

}
