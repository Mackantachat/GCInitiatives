import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '@environments/environment';
import { InitiativeMemberVACPIC } from '@models/initiativeList';
import { poolReference } from '@models/poolReference';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class VacPicService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  insertData(dataCreate: any) {
    let data = this.convertTime(dataCreate);
    return this.http.post<any>(this.apiUrl + 'VacAndPic/CreateVac', data);
  }

  updateData(dataCreate: any) {
    let data = this.convertTime(dataCreate);
    return this.http.post<any>(this.apiUrl + 'VacAndPic/UpdateVac', data);
  }


  insertPicData(dataCreate: any) {
    let pic = this.convertTime(dataCreate);
    return this.http.post<any>(this.apiUrl + 'VacAndPic/CreatePic', pic);

  }

  updatePicData(dataUpdate: any) {
    let pic = this.convertTime(dataUpdate);
    return this.http.post<any>(this.apiUrl + 'VacAndPic/UpdatePic', pic);
  }

  convertTime(formData: any) {
    let dataDate = formData;
    if (formData.meetingDate) {
      let date = new Date(formData.meetingDate);
      dataDate.meetingDate = new Date(Date.UTC(
        date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
    }
    return dataDate;
  }


  getTableVACMember(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}VacAndPic/getVacTable`);
  }

  getTableVACMemberById(id): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'VacAndPic/GetVacById/' + id);
  }

  getTablePICMember(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}VacAndPic/GetPicAll`);
  }

  getTablePICMemberById(id): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'VacAndPic/GetPicById/' + id);
  }
  GetPicByInitiativeId(id): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'VacAndPic/GetPicByInitiativeId/' + id);
  }
  GetVacByInitiativeId(id): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'VacAndPic/GetVacByInitiativeId/' + id);
  }

  getMeetingList(): Observable<any> {
    return this.http.get<any>('../../../../assets/json/meetingList.json');
  }

  getBuStream(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'CommonData/GetBuStream');
  }

  GetInitiativeMemberList(id): Observable<InitiativeMemberVACPIC[]> {
    return this.http.get<InitiativeMemberVACPIC[]>(this.apiUrl + 'VacAndPic/GetInitiativeMemberList/' + id);
  }


  async GetReferenceIniPoolPimById(initiativeId: number): Promise<poolReference> {
    return await (this.http.get<poolReference>(this.apiUrl + "initiative/GetReferenceIniPoolPimById/" + initiativeId)).toPromise();
  }




}
