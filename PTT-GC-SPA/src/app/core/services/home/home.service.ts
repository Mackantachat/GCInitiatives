import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  MyTaskInProgress(owner):Observable<any> {
    return this.http.post(this.baseUrl + 'initiative/MyTask/InProgress', { username : owner });
  }

  MyTaskNotStarted(owner) {
    return this.http.post(this.baseUrl + 'initiative/MyTask/NotStarted', { username : owner });
  }

  MyInitiativeDraft(owner) {
    return this.http.post(this.baseUrl + 'initiative/MyInitiative/Draft', { username : owner });
  }

  MyInitiativeInProgress(owner) {
    return this.http.post(this.baseUrl + 'initiative/MyInitiative/InProgress', { username : owner });
  }

  MyInitiativeCompleted(owner) {
    return this.http.post(this.baseUrl + 'initiative/MyInitiative/Completed', { username : owner });
  }

  MyInitiativeCanceled(owner) {
    return this.http.post(this.baseUrl + 'initiative/MyInitiative/Canceled', { username : owner });
  }


}
