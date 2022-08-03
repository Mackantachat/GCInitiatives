import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ActionSubmit(id, submitForm) {
    return this.http.post(this.baseUrl + 'initiative/Action/Submit/' + id, submitForm);
  }

  ActionSwitchProcess(id, submitForm) {
    return this.http.post(this.baseUrl + 'initiative/Action/SwitchProcess/' + id, submitForm);
  }

  SubmitStageStatus(id, submitForm) {
    return this.http.post(this.baseUrl + 'initiative/SubmitStageStatus/' + id, submitForm);
  }

  CheckApprove(id, username) {
    return this.http.post(this.baseUrl + 'initiative/CheckApprove/' + id, { actionBy: username });
  }
}
