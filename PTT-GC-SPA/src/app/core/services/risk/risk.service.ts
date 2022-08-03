import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RiskModel } from '@models/risk';
import { RiskProgressModel } from '@models/riskProgressModel';
import { KRIModel } from '@models/kriModel';
import { FormArray, FormGroup } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';


@Injectable({
  providedIn: 'root'
})


export class RiskService {
  baseUrl = environment.apiUrl;
  deleteArray: Array<KRIModel>;
  dataArray: RiskModel;
  riskData: RiskModel[];
  presentData: FormGroup;

  private entryMode = new BehaviorSubject(null);
  private typeOfInvestment = new BehaviorSubject(null);
  getEntryMode = this.entryMode.asObservable();
  getTypeOfInvestment = this.typeOfInvestment.asObservable();


  constructor(
    private http: HttpClient,
    private initiativeService: InitiativeService
  ) {
    this.deleteArray = [];
    this.dataArray = null;
    this.riskData = [];
    this.presentData = new FormGroup({});
  }

  changeEntryMode(mode: string) {
    this.entryMode.next(mode);
  }

  changeTypeOfInvestment(investment: string) {
    this.typeOfInvestment.next(investment);
  }

  InsertFormsToDatabase(modelData) {
    let data = this.convertTime(modelData);
    return this.http.post(this.baseUrl + 'Risk/InsertRiskData/' + this.initiativeService.id, data);
  }
  GetRiskData(initiativeId): Observable<Array<RiskModel>> {
    return this.http.get<Array<RiskModel>>(this.baseUrl + 'Risk/GetRiskData/' + initiativeId);
  }
  UpdateRiskData(modelData) {
    let data = this.convertTime(modelData);
    return this.http.put(this.baseUrl + "Risk/Update", data);
  }

  /*
  public List<RiskProgress> RiskProgressArray { get; set; }
  public DateTime DueDate { get; set; }
  public DateTime ActualCompletingDate { get; set; }

  RiskModelData
  public DateTime? RegisterDate { get; set; }
  public DateTime? ApprovePeriod { get; set; }
  */

  convertTime(formData: RiskModel[]) {
    console.log('risk formData>>', formData);

    let returnData: RiskModel[] = formData;
    let field = ['registerDate', 'approvePeriod'];
    let fieldRiskArray = ['dueDate', 'actualCompletingDate'];
    formData.forEach((data, formDataIndex) => {
      field.forEach((fData) => {
        if (data[fData] && data[fData] != null) {
          data[fData] = new Date(data[fData]);

          returnData[formDataIndex][fData] = new Date(Date.UTC(
            data[fData].getFullYear(),
            data[fData].getMonth(),
            data[fData].getDate(), 0, 0, 0));
        }
      });
      if (data.riskProgressArray) {
        data.riskProgressArray.forEach((riskArray, index) => {
          fieldRiskArray.forEach((fArrayData) => {
            if (riskArray[fArrayData] && riskArray[fArrayData] != null) {
              riskArray[fArrayData] = new Date(riskArray[fArrayData]);
              returnData[formDataIndex].riskProgressArray[index][fArrayData] = new Date(Date.UTC(
                riskArray[fArrayData].getFullYear(),
                riskArray[fArrayData].getMonth(),
                riskArray[fArrayData].getDate(), 0, 0, 0));
            }
          });
        });
      }
    });
    return returnData;
  }

}
