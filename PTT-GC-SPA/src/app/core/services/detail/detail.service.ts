import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Product } from '@models/product';
import { Detail } from '@models/detail';
import { Strategies } from '@models/strategies';
import { StrategiObject } from '@models/strategiObject';
import { EntryMode } from '@models/entryMode';
import { ProductUnit } from '@models/productUnit';
import { MilestoneStatus } from '@models/milestoneStatus';
import { FormGroup } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { PimGate } from '../../models/pimGate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  baseUrl = environment.apiUrl;
  initiativeDetailId: number;
  workstreamLeader:any;
  workstreamIsNotExist:boolean;

  constructor(
    private http: HttpClient,
    private initiativeService: InitiativeService
  ) {
    this.initiativeDetailId = null;
    this.workstreamIsNotExist  = false ;
  }

  // Detail Information (CIM & Strategy)
  GetOwners(Params?) {
    let params = new HttpParams();
    if (Params != null) {
      params = params.append('text', Params.text);
    }
    return this.http.get(this.baseUrl + 'Owner', { params });
  }
  GetTeamSupport() {
    return this.http.get(this.baseUrl + 'Owner/getTeamSupport');
  }
  GetStrategicObjectives(year) {
    return this.http.get<StrategiObject[]>(this.baseUrl + 'StrategicObjective/' + year);
  }

  GetStrategies(strategicObjectiveId) {
    return this.http.get<Strategies[]>(this.baseUrl + 'Strategy/' + strategicObjectiveId);
  }

  GetEntryModes() {
    return this.http.get<EntryMode[]>(this.baseUrl + 'EntryMode');
  }

  GetProductUnits() {
    return this.http.get<ProductUnit[]>(this.baseUrl + 'ProductUnit');
  }

  GetMilestoneStatuses() {
    return this.http.get<MilestoneStatus[]>(this.baseUrl + 'MilestoneStatus');
  }

  CreateInitiativeDetail(id, detailForm) {
    let data = this.convertTime(detailForm);
    return this.http.post<Detail>(this.baseUrl + 'initiative/Detail/' + id, data);
  }

  UpdateInitiativeDetail(id, detailForm) {
    let data = this.convertTime(detailForm);
    return this.http.put<Detail>(this.baseUrl + 'initiative/Detail/' + id, data);
  }

  //convert time
  //comvert time
  convertTime(formData: any) {
    let returnData: any = formData;
    let field = ['boD1', 'boD2'];
    field.forEach((fData) => {
      if (formData[fData] && formData[fData] != null) {
        formData[fData] = new Date(formData[fData]);
        returnData[fData] = new Date(Date.UTC(
          formData[fData].getFullYear(),
          formData[fData].getMonth(),
          formData[fData].getDate(), 0, 0, 0));
      }
    });
    return returnData;
  }

  GetInitiativeDetail(id): Observable<Detail> {
    return this.http.get<Detail>(this.baseUrl + 'initiative/Detail/' + id);
  }

  CreateInitiativeProduct(id, productForm): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'initiative/Product/' + id, productForm);
  }

  CreateInitiativeMilestone(id, milestoneForm): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'initiative/Milestone/' + id, milestoneForm);
  }


  CreateProgressAndMilestone(id, milestoneForm): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'initiative/ProgressAndMilestone/' + id, milestoneForm);
  }

  CreateInitiativeFinancialIndicator(id, financialForm): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'initiative/FinancialIndicator/' + id, financialForm);
  }

  CreateInitiativeFinancial(id, financialAvgForm): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'initiative/Financial/' + id, financialAvgForm);
  }

  GetPositionLevel30() {
    return this.http.get(this.baseUrl + 'hrwebservice/getPositionLevel30');   // getPositionLevel40
  }

  GetPositionLevel40() {
    return this.http.get(this.baseUrl + 'hrwebservice/getPositionLevel40');   // getPositionLevel40
  }

  GetProcurementCategory() {
    return this.http.get(this.baseUrl + 'procurement/getProcurementCategory');   // procurement
  }
  GetProcurementSubCategory() {
    return this.http.get(this.baseUrl + 'procurement/getProcurementSubCategory');   // procurement
  }
  GetProcurementLever() {
    return this.http.get(this.baseUrl + 'procurement/getProcurementLever');   // procurement
  }

  async CreateAllDetail(initiativeId, allDetailForm) {
    let detailForm = allDetailForm as FormGroup;
    let returnResult
    this.CreateInitiativeDetail(initiativeId, detailForm.value).subscribe((detailResult) => {
      returnResult = detailResult;
      //create product
      // if (formGroup.get("initiativesDetailForm").get("milestoneForm") && !formGroup.get('progressForm'))
      this.CreateProgressAndMilestone(initiativeId, detailForm.get('milestoneForm').value).subscribe(() => { });

      this.CreateInitiativeFinancialIndicator(initiativeId, detailForm.get('financialForm').value).subscribe(() => { });
      this.CreateInitiativeFinancial(initiativeId, detailForm.get('financialAvgForm').value).subscribe(() => { });
      if (this.initiativeService.initiativeType == 'cim') {
        this.CreateInitiativeProduct(initiativeId, detailForm.get('productForm').value).subscribe(() => { });
      }
      // this.detailService.CreateInitiativeFinancialIndicator(this.id, this.financialForm.value).subscribe((res) => { /*console.log(res)*/ });
      // this.detailService.CreateInitiativeFinancial(this.id, this.financialAvgForm.value).subscribe((res) => { /*console.log(res)*/ });
    });
    return returnResult;
  }

  CreateDetailPimGate(detailGateForm: PimGate, id): Observable<PimGate> {
    let data = this.convertDateTime(detailGateForm);
    return this.http.post<PimGate>(this.baseUrl + 'DetailInformation/CreateDetailPimGate/' + id, data);
  }

  convertDateTime(detailGateInput: PimGate) {
    let returnData: PimGate = {} as PimGate;
    returnData = detailGateInput;
    let field = ['vacDate', 'gateDate'];
    field.forEach((fData) => {
      if (detailGateInput[fData] && detailGateInput[fData] != null) {
        detailGateInput[fData] = new Date(detailGateInput[fData]);
        returnData[fData] = new Date(Date.UTC(
          detailGateInput[fData].getFullYear(),
          detailGateInput[fData].getMonth(),
          detailGateInput[fData].getDate(), 0, 0, 0));
      }
    });
    return returnData;
  }

  UpdateDetailPimGate(id, detailGateForm): Observable<PimGate> {
    let data = this.convertDateTime(detailGateForm);
    return this.http.put<PimGate>(this.baseUrl + 'DetailInformation/UpdateDetailPimGate/' + id, data);
  }

  GetDetailPimGate(id, gate): Observable<PimGate> {
    return this.http.get<PimGate>(this.baseUrl + 'DetailInformation/GetDetailPimGate/' + id + "/" + gate);
  }

  // SaveEmocs(detail)

  //CreateDraftInitiative(initiativesForm: Initiative): Observable<Initiative> {
  //  return this.http.post<Initiative>(this.baseUrl + 'initiative/Draft', initiativesForm);
  //}

}
