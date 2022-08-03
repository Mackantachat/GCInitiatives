import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { async } from '@angular/core/testing';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
import { PerformanceInactiveModel } from '@models/performance-inactive.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerformanceInactiveService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': this.basic
  });

  baseUrl = environment.apiUrl + 'PerformanceInactive/';

  constructor(
    private http: HttpClient,
  ) {

    // const options = { headers: headers };
  }
  GetPerformanceInactives = async (): Promise<PerformanceInactiveModel[]> => {
    return this.http.get(this.baseUrl + 'GetDataAll')
      .toPromise()
      .then(r => r).catch(e => e);
  }

  // Add new exeption
  CreateNewExeption = (data: any): Promise<any> => {

    return this.http.post(this.baseUrl + 'CreatePerformanceInactive',
      // initiativeCode: data.initiativeId,
      // // projectEngineer: data.projectEngineer,
      // // period: data.period,
      // poc: data.poc,
      // outstandingItems: data.outstandingItems,
      // highlightWork: data.highlightWork,
      // clsd: data.clsd,
      // benefitTracking: data.benefitTracking,
      // fromDate: data.fromDate,
      // toDate: data.toDate
      data
      , { headers: this.headers }).toPromise().then((r) => {
        console.log(r);
      }).catch(e => e);
  }

  // Get by period YYYY-DD ex. 2020-09
  GetInitiativeByPeriod = (date: Date): Promise<PerformanceInactiveModel[]> => {
    const urlStr = this.baseUrl +  'SearchPeriod?period=' + date.getFullYear() + '-' + date.getMonth() + '-01';
    //const urlStr = this.baseUrl +  'SearchPeriod';
    console.log('Get by URL => ', urlStr);
    return this.http.get(urlStr).toPromise().then((r) => r).catch(e => e);
  }

  // To get initiative code/Id
  GetInitiativeCode = async (): Promise<[]> => {
    return this.http.get(this.baseUrl + 'GetInitiativeCode').toPromise().then(r => r).catch(e => e);
  }

  SearchInitiativeCode = async (text :string): Promise<[]> => {
    return this.http.get(this.baseUrl + 'SearchInitiativeCode?text=' + text).toPromise().then(r => r).catch(e => e);
  }

  // To Delete initiatives row
  DeleteInitiative = (initiativesId: string): Promise<any> => {
    const urlStr = this.baseUrl + 'DeletePerformanceInactive?id=' + initiativesId;
    console.log(urlStr);
    return this.http.get(urlStr).toPromise().then(r => {
      console.log(r);
    }).catch(e => e);
  }

  // To Edit initiatives row
  UpdateInitiative = async (data: any): Promise<any> => {
    console.log('To update Data: ', data);

    return this.http.post<any>(this.baseUrl + 'UpdatePerformanceInactive',
      data, { headers: this.headers }).toPromise().then(r => r).catch(e => e);
  }
}
