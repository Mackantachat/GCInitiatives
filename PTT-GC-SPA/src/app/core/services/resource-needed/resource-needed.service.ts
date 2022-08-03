import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResourceNeededItems } from '@models/resourceNeededItems';

@Injectable({
  providedIn: 'root'
})
export class ResourceNeededService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  InsertFormsToDatabase(modelData): Observable<ResourceNeededItems> {
    return this.http.post<ResourceNeededItems>(this.baseUrl + 'ResourceNeeded/InsertForms/', modelData);
  }

  GetResourceNeededData(resourceNeededId): Observable<ResourceNeededItems> {
    return this.http.get<ResourceNeededItems>(this.baseUrl + 'ResourceNeeded/' + resourceNeededId);
  }

  GetLastInsertNeededData() {
    return this.http.get(this.baseUrl + 'ResourceNeeded/GetLastInsertResourceNeeded/');
  }

  UpdateResource(resourceId: number, formData: ResourceNeededItems): Observable<ResourceNeededItems> {
    return this.http.post<ResourceNeededItems>(this.baseUrl + 'ResourceNeeded/UpdateResource/' + resourceId, formData);
  }

  DeleteResourceById(resourceNeededId) {
    return this.http.delete(this.baseUrl + 'ResourceNeeded/DeleteResourceById/' + resourceNeededId);
  }

  DeleteResourceByModelData(modelData) {
    return this.http.delete(this.baseUrl + 'ResourceNeeded/DeleteResourceByModelData/' + modelData);
  }
}
