import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { DetailInformation, PimGateConfig } from '@models/detailInformation';
import { Kpi } from '@models/Kpi';
import { KpiDetail } from '@models/KpiDetail';
import { InitiativeDetailInformation } from '@models/initiativeDetailInformation';

@Injectable({
  providedIn: 'root'
})
export class DetailInformationService {

  baseUrl = environment.apiUrl;
  detailInformationId: number;
  constructor(private http: HttpClient) {
    this.detailInformationId = 0;
  }

  GetFrequency() {
    return this.http.get(this.baseUrl + 'Frequency');
  }

  GetKpis() {
    return this.http.get(this.baseUrl + 'Kpis');
  }

  CreateKpi(id, KpiForm): Observable<Kpi> {
    return this.http.post<Kpi>(this.baseUrl + 'DetailInformation/CreateKpi/' + id, KpiForm);
  }

  GetKpiDetail(id): Observable<KpiDetail> {
    return this.http.get<KpiDetail>(this.baseUrl + 'initiative/KpiDetail/' + id);
  }

  CreateDetailInformation(id, DetailForm): Observable<DetailInformation> {
    let data = this.convertTime(DetailForm);
    return this.http.post<DetailInformation>(this.baseUrl + 'DetailInformation/' + id, data);
  }

  UpdateDetailInformation(id, DetailForm): Observable<DetailInformation> {
    let data = this.convertTime(DetailForm);
    return this.http.put<DetailInformation>(this.baseUrl + 'DetailInformation/' + id, data);
  }

  GetDetailInformation(id): Observable<DetailInformation> {
    return this.http.get<DetailInformation>(this.baseUrl + 'DetailInformation/' + id);
  }

  GetInitiativeDetailInformation(id): Observable<InitiativeDetailInformation> {
    return this.http.get<InitiativeDetailInformation>(this.baseUrl + 'initiative/DetailInformation/' + id);
  }

  GetPimGateConfig(id): Observable<PimGateConfig> {
    return this.http.get<PimGateConfig>(this.baseUrl + 'DetailInformation/ShowPimGate/' + id);
  }

  convertTime(detail: DetailInformation) {

    // kickoffMeeting: Date,
    // gate1Date: Date,
    // gate2Date: Date,
    // gate3Date: Date,
    // baselineStartDate: Date;
    // baselineFinishDate: Date;
    // reviseForecastStartDate: Date;
    // reviseForecastFinishDate: Date;
    // actualStartDate: Date;
    // actualFinishDate: Date;
    // iL3Date: Date;
    // iL4Date: Date;
    // iL5Date: Date;
    // cutFeedDate: Date;
    // startUpDate: Date;
    // replacementDate: Date;

    let returnData: DetailInformation = detail;
    let field = ['kickoffMeeting', 'gate1Date', 'gate2Date', 'gate3Date', 'baselineStartDate', 'baselineFinishDate',
      'reviseForecastStartDate', 'reviseForecastFinishDate', 'actualStartDate', 'actualFinishDate', 'iL3Date', 'iL4Date',
      'iL5Date', 'cutFeedDate', 'startUpDate', 'replacementDate'];
    field.forEach((fData) => {
      if (detail[fData] != null) {
        detail[fData] = new Date(detail[fData]);
        returnData[fData] = new Date(Date.UTC(
          detail[fData].getFullYear(),
          detail[fData].getMonth(),
          detail[fData].getDate(), 0, 0, 0));
      }
      //  else {
      //   returnData[fData] = null;
      // }
    });
    return returnData;


  }

  async updateHighlightWork(id: number, data): Promise<any> {
    return await (this.http.post<any>(this.baseUrl + 'DetailInformation/UpdateHighlightWork/' + id, data)).toPromise();
  }

  async DeleteTeamSupportComment(id: number): Promise<any> {
    return await (this.http.delete<any>(this.baseUrl + 'DetailInformation/DeleteTeamSupportComment/' + id)).toPromise();
  }

  async SendEmailTeamSupport(id: number): Promise<any> {
    return await (this.http.delete<any>(this.baseUrl + 'DetailInformation/SendEmailTeamSupport/' + id)).toPromise();
  }


}
