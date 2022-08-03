import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { InitiativeHistoryIndex } from '@models/initiativeHistoryIndex';

@Injectable({
  providedIn: 'root'
})
export class InitiativehistoryindexService {

  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = environment.apiUrl;

  GetInitiativeHistoryIndexes(initiativeId: number){
    return this.http.get<InitiativeHistoryIndex[]>(this.baseUrl + "Initiative/InitiativeHistoryIndex/" + initiativeId);
  }

}
