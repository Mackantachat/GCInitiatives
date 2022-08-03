import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ActionService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetInitiativeAction(id) {
    return this.http.get(this.baseUrl + 'InitiativeAction/' + id);
  }
  GetInitiativeActionSubmit(id): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'InitiativeAction/' + id);
  }

  GetStageMaster(type, process, stage) {
    let data: {
      type: string;
      process: string;
      stage: string;
    } = {
      type: type,
      process: process,
      stage: stage
    }
    return this.http.post<boolean>(this.baseUrl + 'InitiativeAction/GetStageMaster', data);
  }
  GetSwitchProcessList(type, stage): Observable<string[]> {
    let data: {
      type: string;
      stage: string;
    } = {
      type: type,
      stage: stage
    }
    return this.http.post<string[]>(this.baseUrl + 'InitiativeAction/GetSwitchProcessList', data);
  }

}
