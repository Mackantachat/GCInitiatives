import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { commonData } from '@models/commonData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  baseUrl = environment.apiUrl;

  phnBuList: {
    key: string;
    value: string;
  }[] = [
      { key: 'Focus Improvement (FI)', value: 'Focus Improvement (FI)' },
      { key: 'Autonomous Maintenance (AM)', value: 'Autonomous Maintenance (AM)' },
      { key: 'Early Management(EM)', value: 'Early Management(EM)' },
      { key: 'Quality Management(QM)', value: 'Quality Management(QM)' },
      { key: 'Planned Maintenance (PM)', value: 'Planned Maintenance (PM)' },
      { key: 'Safety Health Environment (SHE)', value: 'Safety Health Environment (SHE)' },
      { key: 'Office Improvement (OI)', value: 'Office Improvement (OI)' },
      { key: 'Supply Chain Management (SCM)', value: 'Supply Chain Management (SCM)' },
      { key: 'Sustainable Management (SM)', value: 'Sustainable Management (SM)' },
      { key: 'Marketing & Sales Management (CM)', value: 'Marketing & Sales Management (CM)' },
      { key: 'Operation and Maintenance Skills Development Training (SD)', value: 'Operation and Maintenance Skills Development Training (SD)' },
      { key: 'Other', value: 'Other' }
    ];
  phnTypeList: {
    key: string;
    value: string;
  }[] = [
      /**
       * QC Story  (QCC) 
          QAPL  (Quality Assurance Perfect Line)
          EAPL  (Environment Assurance Perfect Line)
          SAPL  (Safety  Assurance Perfect Line)
          Other
       */
      { key: 'QC Story  (QCC)', value: 'QC Story  (QCC)' },
      { key: 'QAPL  (Quality Assurance Perfect Line)', value: 'QAPL  (Quality Assurance Perfect Line)' },
      { key: 'EAPL  (Environment Assurance Perfect Line)', value: 'EAPL  (Environment Assurance Perfect Line)' },
      { key: 'SAPL  (Safety  Assurance Perfect Line)', value: 'SAPL  (Safety  Assurance Perfect Line)' },
      { key: 'Other', value: 'Other' }
    ];

  poolTypeDropDown: {
    name: string;
    value: string;
  }[] = [
      { name: 'Request Pool', value: 'Requestpool' },
      { name: 'Use Pool', value: '' },
    ]

  constructor(private http: HttpClient) { }

  async GetcommonDataByType(dataType: string) {
    return await (this.http.get<commonData[]>(this.baseUrl + 'CommonData/GetCommonDataByType/' + dataType).toPromise());
  }
  async GetCurrencyFloatFx() {
    return await (this.http.get<string[]>(this.baseUrl + 'CommonData/GetCurrencyFloatFx').toPromise());
  }

  async GetCurrencyFxRate() {
    return await (this.http.get<commonData>(this.baseUrl + 'CommonData/GetCurrencyFxRate').toPromise());
  }
}
