import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { SAPMOCStatus } from '@models/sapMOCStatus';

@Injectable({
  providedIn: 'root'
})
export class InterfaceserviceService {

  constructor(
    private http: HttpClient,
  ) { 

  }

  baseUrl = environment.apiUrl;

  CreateRequestAPP_WBS(initiativeId: number, functionName: string){
    return this.http.post<number>(this.baseUrl + "IF/" + functionName + "/" + initiativeId, null);
  }

  ValidateWBSData(initiativeId: number){
    return this.http.get<boolean>(this.baseUrl + "IF/ValidateWBSCheck/" + initiativeId);
  }

  GetInitiativeId(initiativeCode: string){
    return this.http.post<number>(this.baseUrl + "initiative/GetInitiativeIdFromInitiativeCode", { initiativeCode : initiativeCode });
  }

  SAPStatus(initiativeId: number){
    return this.http.get<string>(this.baseUrl + "IF/SAPStatus/" + initiativeId);
  }

  MOCStatus(initiativeId: number){
    return this.http.get<string>(this.baseUrl + "IF/MOCStatus/" + initiativeId);
  }

  SAPMOCStatus(initiativeId: number){
    return this.http.get<SAPMOCStatus>(this.baseUrl + "IF/SAPMOCStatus/" + initiativeId);
  }
}
