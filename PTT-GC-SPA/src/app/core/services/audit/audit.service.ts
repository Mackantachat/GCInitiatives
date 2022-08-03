import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Audit } from '@models/audit';
import { Observable } from 'rxjs';
import { PaginatedResult } from '@models/pagination';
import { map } from 'rxjs/operators';
import { InitiativeService } from '@services/initiative/initiative.service';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  baseUrl = environment.apiUrl;
  historyId: number;

  constructor(
    private http: HttpClient,
    private initiativeService: InitiativeService,
  ) { }

  GetAudits(page?, itemsPerPage?, Params?): Observable<PaginatedResult<Audit[]>> {
    const paginatedResult: PaginatedResult<Audit[]> = new PaginatedResult<Audit[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (Params != null) {
      params = params.append('code', Params.code);
      params = params.append('keyword', Params.keyword);
      params = params.append('startDate', Params.startDate);
      params = params.append('endDate', Params.endDate);
    }

    return this.http.get<Audit[]>(this.baseUrl + 'audit', { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      }));
  }

  async CallFullLog(initiativeId): Promise<any> {

    // return await (this.http.post<number>(this.baseUrl + 'audit/FullLog', { initiativeId: initiativeId }, { responseType: 'text' }).toPromise();
    return await (this.http.post<any>(this.baseUrl + 'audit/FullLog', { initiativeId: initiativeId }).toPromise());

    // return new Promise<number>((resolve, reject) => {
    //   this.http.post(this.baseUrl + 'audit/FullLog', { initiativeId: initiativeId }, { responseType: 'text' }).subscribe(r => {
    //     this.historyId = parseInt(r);
    //     return resolve(r);
    //   },
    //     err => {
    //       return reject(err);
    //     });
    // });

  }

  async CallAuditLog(initiativeId, historyId): Promise<boolean> {

    return await (this.http.post<boolean>(this.baseUrl + 'audit/AuditLog', { initiativeId: initiativeId, HisInitiativeId: historyId }).toPromise());

  }

}
