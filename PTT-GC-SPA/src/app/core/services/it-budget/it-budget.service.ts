import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ITBudget } from '@models/itBudget';
import { CapexBudgetSurvey, ITBudgetCapex } from '@models/itBudgetCapex';
import { ITBudgetOpex } from '@models/itBudgetOpex';
import { Observable } from 'rxjs';
import { InitiativeService } from '@services/initiative/initiative.service';

@Injectable({
  providedIn: 'root'
})
export class ItBudgetService {


  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
    private initiativeService: InitiativeService) { }

  GetITBudget(id) {
    return this.http.get<ITBudget>(this.baseUrl + 'ITBudget/' + id);
  }

  CreateITBudgetCapex(id, data) {
    return this.http.post<ITBudgetCapex>(this.baseUrl + 'ITBudget/Capex/' + id, data);
  }

  UpdateITBudgetCapex(id, data) {
    return this.http.put<ITBudgetCapex>(this.baseUrl + 'ITBudget/Capex/' + id, data);
  }

  CreateITBudgetOpex(id, data) {
    return this.http.post<ITBudgetOpex>(this.baseUrl + 'ITBudget/Opex/' + id, data);
  }

  UpdateITBudgetOpex(id, data) {
    return this.http.put<ITBudgetOpex>(this.baseUrl + 'ITBudget/Opex/' + id, data);
  }

  GetHardwareList() {
    return this.http.get(this.baseUrl + 'ITBudget/Hardware');
  }

  GetSoftwareList() {
    return this.http.get(this.baseUrl + 'ITBudget/Software');
  }

  GetHardwareVersionList(version) {
    return this.http.get(this.baseUrl + 'ITBudget/HardwareVersion/' + version);
  }

  GetSoftwareVersionList(version) {
    return this.http.get(this.baseUrl + 'ITBudget/SoftwareVersion/' + version);
  }

  CreateHardware(id, data) {
    return this.http.post(this.baseUrl + 'ITBudget/Hardware/' + id, data);
  }

  CreateSoftware(id, data): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'ITBudget/Software/' + id, data);
  }

  GetHardware(id) {
    return this.http.get(this.baseUrl + 'ITBudget/Hardware/' + id);
  }

  GetSoftware(id) {
    return this.http.get(this.baseUrl + 'ITBudget/Software/' + id);
  }

  GetCapexTopic(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'ITBudget/CapexTopic');
  }
  GetCapexTopicVersion(version): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'ITBudget/CapexTopicVersion/' + version);
  }

  CreateCapexBudgetSurvey(id, data) {
    return this.http.post(this.baseUrl + 'ITBudget/CapexBudgetSurvey/' + id, data);
  }

  GetCapexBudgetSurvey(id) {
    return this.http.get(this.baseUrl + 'ITBudget/CapexBudgetSurvey/' + id);
  }

  ////////////////////////////  new code ///////////////////////
  CreateITBudget(id, dataInput): Observable<ITBudget> {
    let data = this.convertITBudget(dataInput);
    return this.http.post<ITBudget>(this.baseUrl + 'ITBudget/CreateITBudget/' + id, data);
  }
  UpdateITBudget(id, dataInput): Observable<ITBudget> {
    let data = this.convertITBudget(dataInput);
    return this.http.put<ITBudget>(this.baseUrl + 'ITBudget/UpdateITBudget/' + id, data);
  }

  CreateCapexBudgetSurveyNew(id, data) {
    let dataInput = this.convertData(data);
    return this.http.post(this.baseUrl + 'ITBudget/CapexBudgetSurveyNew/' + id, dataInput);
  }

  getLastSurveyVersions() {
    return this.http.get(this.baseUrl + 'ITBudget/GetLastSurveyVersions');
  }

  convertData(inputData) {
    let returnData: CapexBudgetSurvey[] = [] as CapexBudgetSurvey[];
    let topic = [
      'T0001',
      'T0002',
      'T0003',
      'T0004',
      'T0005',
      'T0006',
      'T0007',
      'T0008',
      'T0009',
      'T0010',
      'T0011',
      'T0012',
      'T0013',
      'T0014'
    ]

    let choice1 = [
      'CH0001',
      'CH0002',
      'CH0003'
    ]
    let choice8 = [
      'CH0023',
      'CH0024',
      'CH0025',
      'CH0026',
      'CH0027',
      'CH0028',
      'CH0029'
    ]

    for (let index = 0; index < topic.length; index++) {
      if (topic[index] != "T0001" && topic[index] != "T0008") {
        let d: CapexBudgetSurvey = {
          id: 0,
          initiativeId: this.initiativeService.id,
          topicId: topic[index],
          status: inputData[topic[index]],
          choiceValue: inputData[topic[index] + '_value'],
          law: '',
          impact: '',
          effective: '',
          choiceId: ''
        }
        returnData.push(d);
      } else {
        if (topic[index] == "T0001") {

          choice1.forEach((element, choiceIndex) => {
            let d: CapexBudgetSurvey = {
              id: 0,
              initiativeId: this.initiativeService.id,
              topicId: topic[index],
              status: inputData[topic[index]],
              choiceValue: inputData[element],
              law: '',
              impact: '',
              effective: '',
              choiceId: element
            }
            returnData.push(d);
          });
        } else if (topic[index] == "T0008") {
          choice8.forEach((element, choiceIndex) => {
            let d: CapexBudgetSurvey = {
              id: 0,
              initiativeId: this.initiativeService.id,
              topicId: topic[index],
              status: inputData[topic[index]],
              choiceValue: inputData[element],
              law: '',
              impact: '',
              effective: '',
              choiceId: element
            }
            returnData.push(d);
          });
        }
      }

    }

    return returnData;
  }

  convertITBudget(dataInput) {
    let capexSummary
    if (dataInput?.capexSummary1?.toString()?.length > 0) {
      capexSummary = dataInput?.capexSummary1
    } else if (dataInput?.capexSummary2?.toString()?.length > 0) {
      capexSummary = dataInput?.capexSummary2
    } else if (dataInput?.capexSummary3?.toString()?.length > 0) {
      capexSummary = dataInput?.capexSummary3
    }

    let returnValue: ITBudget = {
      id: dataInput.id,
      initiativeId: this.initiativeService.id,
      capexSummary: capexSummary ? capexSummary : null,
      capexNo: dataInput?.capexNo ? dataInput.capexNo : null,
      advancedCapexChoice: dataInput?.advancedCapexChoice ? dataInput.advancedCapexChoice : null,
      opexSummary: dataInput?.opexSoftware ? dataInput?.opexSoftware : null,
      opexNo: dataInput?.opexNo ? dataInput.opexNo : null
    }

    return returnValue;

  }
}
