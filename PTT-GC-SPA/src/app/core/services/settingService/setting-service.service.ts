import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { SettingModel } from '@models/settingModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingServiceService {


  apiUrl = environment.apiUrl;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': this.basic
  });
  public settingData = new BehaviorSubject(null);
  getSettingData = this.settingData.asObservable();

  constructor(
    private http: HttpClient,
  ) { }
  setSettingData(data: SettingModel) {
    this.settingData.next(data);
  }

  // Get Setting
  GetSetting = async (): Promise<SettingModel> => {
    return this.http.get(this.apiUrl + 'Setting/GetSetting')
      .toPromise()
      .then(r => r).catch(e => e);
  }

  // Set Setting
  SetSetting = async (data: SettingModel): Promise<SettingModel> => {
    console.log('Setting Data: ', data);
    return this.http.post(this.apiUrl + 'Setting/UpdateSetting', {
      settingId: 1,
      // initiativeCodeFormat: data.initiativeCodeFormat,
      periodForKeeping: data.periodForKeeping,
      isAvailablePeriodAnnual: data.isAvailablePeriodAnnual,
      startPeriodAnnual: data.startPeriodAnnual,
      finishPeriodAnnual: data.finishPeriodAnnual,
      isAvailablePeriodMid: data.isAvailablePeriodMid,
      startPeriodMid: data.startPeriodMid,
      finishPeriodMid: data.finishPeriodMid,
      isAvailableBudgetPool: data.isAvailableBudgetPool,
      startPeriodBudgetPool: data.startPeriodBudgetPool,
      finishPeriodBudgetPool: data.finishPeriodBudgetPool,
      isActiveITBudgetSurvey: data.isActiveITBudgetSurvey,
      startPeriodIT: data.startPeriodIT,
      finishPeriodIT: data.finishPeriodIT,
      iL4TrackingPeriod: data.iL4TrackingPeriod,
      oneTimeBenefit: data.oneTimeBenefit
    }, { headers: this.headers }).toPromise().then((r) => {
      console.log(r);
    }).catch(e => e);
  }

  // Get Setting
  async GetInitiativeSetting(): Promise<SettingModel> {
    return await (this.http.get<SettingModel>(this.apiUrl + 'Setting/GetInitiativeSetting').toPromise());
  }
}

