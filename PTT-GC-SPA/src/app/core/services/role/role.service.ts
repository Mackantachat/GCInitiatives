import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IOwner } from '@models/owner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.apiUrl;

  getTableOwner(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Master/GetOwner`);
  }

  getTableOwnerInitiativeList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Initiative/GetOwnerInitiativeList`);
  }

  getTableOwnerInitiativeDetail(employeeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Initiative/GetOwnerInitiativeDetail?employeeId=${employeeId}`);
  }

  getTableAction(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Master/GetAction`);
  }

  getTableRole(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Master/GetRoleDetail`);
  }

  getTableRoleById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Master/GetRoleDetailById/${id}`);
  }

  getTableRoleList(): Observable<any> {
    return this.http.get<any>('../../../../assets/json/roleListTable.json');
  }

  getTableScreenObject(): Observable<any> {
    // return this.http.get<any>(`${this.apiUrl}Master/GetScreenObject`);
    return this.http.get<any>(`${this.apiUrl}Master/GetPermissionMaster`);
  }

  getTableVACMember(): Observable<any> {
    return this.http.get<IOwner>('../../../../assets/json/vacMember.json');
  }

  getTablePICMember(): Observable<any> {
    return this.http.get<IOwner>('../../../../assets/json/picMember.json');
  }

  getMeetingList(): Observable<any> {
    return this.http.get<IOwner>('../../../../assets/json/meetingList.json');
  }

  getDropdownCenter(): Observable<any> {
    return this.http.get<IOwner>('../../../../assets/json/centerDropdown.json');
  }

  getDropdownUpStream(): Observable<any> {
    return this.http.get<IOwner>('../../../../assets/json/upStreamDropdown.json');
  }

  getDropdownDownStream(): Observable<any> {
    return this.http.get<IOwner>('../../../../assets/json/downStreamDropdown.json');
  }

  getTablePool(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Pool/GetPoolList`);
  }

  getTablePoolItem(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Pool/GetPoolItem`);
  }

  getPoolDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Pool/GetPoolDetailById/${id}`);
  }

  getTablePoolMange(): Observable<any> {
    return this.http.get<any>('../../../../assets/json/poolManage.json');
  }

  getTableBU(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Master/GetBU`);
  }

  getTablePosition(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Master/GetPosition`);
  }

  getTableWorkStream(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Master/GetWorkStream`);
  }

  getTablePoolType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Master/GetPoolType`);
  }

  getTableCompany(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Master/GetCompany`);
  }

  getTableOrganize(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Master/GetOrganization`);
  }

  getTableStateGateType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Master/GetStateGate`);
  }

  getVacSMEViewer(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Vac/GetVacSMEList`);
  }

  getGroupVac(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Vac/GetGroup`);
  }

  getSubGroupVac(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Vac/GetSubGroup`);
  }

  getPlantVac(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Vac/GetColumn`);
  }

  createRoleDetailById(param: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Master/CreateRoleDetail`, param);
  }

  createPool(param: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Pool/CreatePool`, param);
  }

  saveRoleDetailById(param: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Master/SaveRoleDetail`, param);
  }

  updateOwnerInitiative(param: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Initiative/UpdateOwnerInitiative`, param);
  }

  updatePool(id: number, param: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Pool/UpdatePool/${id}`, param);
  }

  updateVacSMEViewer(form: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Vac/UpdateVacSMEList`, form);
  }

  // Dropdown Page

  // Dropdown Control

  // Get Role's List

  // Add/Update Role

}
