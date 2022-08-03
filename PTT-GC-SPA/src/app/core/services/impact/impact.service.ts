import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirstRunRateTable, ImpactTracking } from '@models/impactTracking';
import { ShareBenefitWorkstream } from '@models/shareBenefitWorkStream';
import { ShareBenefitWorkstreamDetail } from '@models/shareBenefitWorkstreamDetail';
import { ImpactTrackingModel } from '@models/ImpactTrackingModel';

@Injectable({
  providedIn: 'root'
})
export class ImpactService {

  baseUrl = environment.apiUrl;

  //Revise
  //Actual
  //InitiativeSubtype
  validateImpactByStage: {
    initiativeType: string;
    field: string;
    sequenceStart: number;
    sequenceEnd: number;
    subtype: "financialbenefit"
  }[] = [
      // process max
      // {
      //   initiativeType:"max",
      //   field:"Target",
      //   sequenceStart:2,
      //   sequenceEnd:3,
      //   subtype: "financialbenefit"
      // },
      // {
      //   initiativeType:"max",
      //   field:"Revise",
      //   sequenceStart:2,
      //   sequenceEnd:3,
      //   subtype: "financialbenefit"
      // },
      // {
      //   initiativeType:"max",
      //   field:"Actual",
      //   sequenceStart:2,
      //   sequenceEnd:3,
      //   subtype: "financialbenefit"
      // },
      // process dim
      {
        initiativeType: "dim",
        field: "Target",
        sequenceStart: 1,
        sequenceEnd: 16,
        subtype: "financialbenefit"
      },
      {
        initiativeType: "dim",
        field: "Revise",
        sequenceStart: 17,
        sequenceEnd: 3,
        subtype: "financialbenefit"
      },
      {
        initiativeType: "dim",
        field: "Actual",
        sequenceStart: 20,
        sequenceEnd: 20,
        subtype: "financialbenefit"
      },
      // process pim
      {
        initiativeType: "pim",
        field: "Target",
        sequenceStart: 1,
        sequenceEnd: 16,
        subtype: "financialbenefit"
      },
      {
        initiativeType: "pim",
        field: "Revise",
        sequenceStart: 17,
        sequenceEnd: 3,
        subtype: "financialbenefit"
      },
      {
        initiativeType: "pim",
        field: "Actual",
        sequenceStart: 20,
        sequenceEnd: 20,
        subtype: "financialbenefit"
      }
    ]

  RequireDirectBenefit: boolean;
  RequireIndirectBenefit: boolean;
  public runRateData = new BehaviorSubject(null);
  //getRunRateData = this.runRateData.asObservable();

  constructor(private http: HttpClient) { }

  setRunRateData(data: FirstRunRateTable[]) {
    this.runRateData.next(data);
  }

  GetWorkStream() {
    return this.http.get(this.baseUrl + 'WorkStream');
  }

  GetRecurringAndOneTimeSelect() {
    return this.http.get(this.baseUrl + 'TypeofBenefit/RecurringAndOneTime');
  }

  GetImplementationCostSelect() {
    return this.http.get(this.baseUrl + 'TypeofBenefit/ImplementationCost');
  }

  CreateImpact(id, ImpactForm, actionType): Observable<ImpactTracking> {
    let data = this.convertTime(ImpactForm);
    return this.http.post<ImpactTracking>(this.baseUrl + 'ImpactTracking/CreateImpactAllTracking/' + actionType + '/' + id, data);
  }

  UpdateImpact(id, ImpactForm, actionType): Observable<ImpactTracking> {
    let data = this.convertTime(ImpactForm);
    return this.http.put<ImpactTracking>(this.baseUrl + 'ImpactTracking/UpdateImpactAllTracking/' + actionType + '/' + id, data);
  }

  //convertTime
  convertTime(formData: any) {

    let returnData: any = formData;
    let field = ['firstRunRateMonth'];
    field.forEach((fData) => {
      if (formData[fData] != null) {
        formData[fData] = new Date(formData[fData]);
        returnData[fData] = new Date(Date.UTC(
          formData[fData].getFullYear(),
          formData[fData].getMonth(),
          formData[fData].getDate(), 0, 0, 0));
      }
    });
    return returnData;
  }

  CreateShareBenefitWorkstream(id, ShareBenefitFrom): Observable<ShareBenefitWorkstream> {
    return this.http.post<ShareBenefitWorkstream>(this.baseUrl + 'ImpactTracking/CreateShareBenefitWorkstream/' + id, ShareBenefitFrom);
  }

  DeleteShareBenefitWorkstream(id) {
    return this.http.delete(this.baseUrl + 'ImpactTracking/DeleteShareBenefitWorkstream/' + id);
  }

  GetImpactTotalRecurringOneTime(id): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'ImpactTracking/TotalRecurringOneTime/' + id);
  }

  GetImpactTotalCostOPEX(id): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'ImpactTracking/TotalCostOPEX/' + id);
  }

  GetImpactTracking(id): Observable<ImpactTracking> {
    return this.http.get<ImpactTracking>(this.baseUrl + 'ImpactTracking/' + id);
  }

  CreateIndirect(id, IndirectForm) {
    return this.http.post(this.baseUrl + 'ImpactTracking/CreateIndirect/' + id, IndirectForm);
  }

  GetIndirect(id) {
    return this.http.get(this.baseUrl + 'ImpactTracking/GetIndirect/' + id);
  }

  CreateImpiemantCost(id, ImpiemantCostForm) {
    return this.http.post(this.baseUrl + 'ImpactTracking/CreateImpiemantCost/' + id, ImpiemantCostForm);
  }

  DeleteImpiemantCost(id) {
    return this.http.delete(this.baseUrl + 'ImpactTracking/DeleteImpiemantCost/' + id);
  }

  GetImplementationCost(id) {
    return this.http.get(this.baseUrl + 'ImpactTracking/GetImpiemantCost/' + id);
  }

  CreateFirstRunRate(id, FirstRunRateForm, FirstRunRateTotalForm) {
    let data = {
      firstRunRateTable: FirstRunRateForm,
      firstRunRateTotal: FirstRunRateTotalForm,
    }
    return this.http.post(this.baseUrl + 'ImpactTracking/CreateFirstRunRate/' + id, data);
  }

  async GetFirstRunRate(id) {
    return await this.http.get(this.baseUrl + 'ImpactTracking/GetFirstRunRate/' + id).toPromise();
  }

  CreateTypeBenefitForm(id, TypeBenefitForm, TypeBenefitTotalForm) {
    let data = {
      firstRunRateTable: TypeBenefitForm,
      firstRunRateTotal: TypeBenefitTotalForm,
    }
    return this.http.post(this.baseUrl + 'ImpactTracking/CreateTypeOfBenefit/' + id, data);
  }

  async GetTypeOfBenefit(id) {
    return await this.http.get(this.baseUrl + 'ImpactTracking/GetTypeOfBenefit/' + id).toPromise();
  }

  GetShareBenefitWorkstream(id): Observable<ShareBenefitWorkstreamDetail> {
    return this.http.get<ShareBenefitWorkstreamDetail>(this.baseUrl + 'initiative/ShareBenefitWorkstream/' + id);
  }

  GetDownloadImpactExcel() {
    return this.http.get(this.baseUrl + 'initiative/DownloadImpactExcel', { responseType: 'blob' });
  }

  GetImpactTrackAll(id: number): Observable<ImpactTrackingModel> {
    return this.http.get<ImpactTrackingModel>(this.baseUrl + 'ImpactTracking/GetImpactAllTracking/' + id);
  }



}
