import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  CheckSubmitTo(submitTo): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + 'initiative/CheckSubmitTo', submitTo);
  }

  CheckSubmitToInformation(submitTo): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + 'initiative/CheckSubmitToInformation', submitTo);
  }

  CheckApproveInformation(submitTo): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + 'initiative/CheckApproveInformation', submitTo);
  }

  CheckInitiativeDetail(submitTo): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + 'initiative/CheckInitiativeDetail', submitTo);
  }

  CheckApproveInitiative(submitTo): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + 'initiative/CheckApproveInitiative', submitTo);
  }
}
