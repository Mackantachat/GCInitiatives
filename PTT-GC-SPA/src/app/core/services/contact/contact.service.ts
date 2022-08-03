import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Contact } from '@models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ContactIO(id , contact): Observable<Contact> {
    return this.http.put<Contact>(this.baseUrl + 'ImpactTracking/ContactIO/' + id, contact);
  }
}
