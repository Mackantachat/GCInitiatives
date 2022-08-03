import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { KpiKriMockData } from '@models/kpiKriConfig';
import { InformKri, KpiKriData, KpiKriModel, KpiMaintainModel, KriDetailMonth, KriProgressMitigation } from '@models/kpiKriData';

@Injectable({
  providedIn: 'root'
})
export class KpiKriApiService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get(): Promise<KpiKriData> {
    return new Promise<KpiKriData>(
      resolve => {
        // this.http.get<KpiKriData>(this.baseUrl + 'ITBudget/' + initiativeId);
        //mock data
        resolve(KpiKriMockData.raw);
        // resolve(null);
      }
    );
  }


  async GetMaintainKpiByYear(year: string): Promise<KpiMaintainModel[]> {
    return await (this.http.get<KpiMaintainModel[]>(this.baseUrl + 'KpiKriMaintain/GetMaintainKpiByYear/' + year).toPromise());
  }

  async GetProgreessMitigationByMaintainId(maintainId: number): Promise<KriProgressMitigation[]> {
    return await (this.http.get<KriProgressMitigation[]>(this.baseUrl + 'KpiKriMaintain/GetProgreessMitigationByMaintainId/' + maintainId).toPromise());
  }

  async GetMaintainKpiById(maintainId: number): Promise<KriDetailMonth> {
    return await (this.http.get<KriDetailMonth>(this.baseUrl + 'KpiKriMaintain/GetMaintainKpiById/' + maintainId).toPromise());
  }

  async GetKriDetailMonthByMaintainId(maintainId: number): Promise<KriDetailMonth[]> {
    return await (this.http.get<KriDetailMonth[]>(this.baseUrl + 'KpiKriMaintain/GetKriDetailMonthByMaintainId/' + maintainId).toPromise());
  }

  async GetKpiKriModel(year,id,username): Promise<KpiKriModel> {
    return await (this.http.get<KpiKriModel>(this.baseUrl + 'KpiKriMaintain/GetKriKpiModel/' + year +'/'+ id + '/' + username).toPromise());
  }

  async PostKpiKriModel(id:number, data:KpiKriModel): Promise<KpiKriModel> {
    return await (this.http.post<KpiKriModel>(this.baseUrl + 'KpiKriMaintain/PostKpiKriModel/' + id,data).toPromise());
  }
  async PostInformMail(data:InformKri): Promise<InformKri> {
    return await (this.http.post<InformKri>(this.baseUrl + 'KpiKriMaintain/SendEmailKri' ,data).toPromise());
  }

}
