import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { BestPracticeModel } from "@models/best-practice";
import { commonData } from '@models/commonData';
import { InitiativeService } from "@services/initiative/initiative.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BestPracticeService {
  baseUrl: string = environment.pathUrl;

  constructor(
    private initiativeService: InitiativeService,
    private http: HttpClient
  ) { }

  inserBestPractice(dataModel: BestPracticeModel): Observable<BestPracticeModel> {
    let data = this.convertTime(dataModel);
    return this.http.post<BestPracticeModel>(this.baseUrl + "api/BestPractice/Insert", data);
  }

  updateBestPractice(dataModel: BestPracticeModel): Observable<BestPracticeModel> {
    let data = this.convertTime(dataModel);
    return this.http.put<BestPracticeModel>(this.baseUrl + "api/BestPractice/Update", data);
  }

  getBestPracticeForm(initiativeId: number): Observable<BestPracticeModel> {
    return this.http.get<BestPracticeModel>(
      this.baseUrl + "api/BestPractice/Get/" + initiativeId
    );
  }

  convertTime(formData: BestPracticeModel) {
    let returnData: BestPracticeModel = formData;
    let field = ['startDate', 'endDate', 'yearOfBestPractice'];
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
  getKnowledgeThemesDropDown(): Observable<Array<commonData>> {
    return this.http.get<Array<commonData>>(environment.apiUrl + "CommonData/GetKnowledgeThemesDropDown");
  }
  getBusinessLineDropDown(): Observable<Array<commonData>> {
    return this.http.get<Array<commonData>>(environment.apiUrl + "CommonData/BusinessLine");
  }
  getProjectTypeDropDown(): Observable<Array<commonData>> {
    return this.http.get<Array<commonData>>(environment.apiUrl + "CommonData/ProjectType");
  }
  getOperationalFunctionDropDown(): Observable<Array<commonData>> {
    return this.http.get<Array<commonData>>(environment.apiUrl + "CommonData/OperationalFunction");
  }
  getOperationalUnitDropDown(): Observable<Array<commonData>> {
    return this.http.get<Array<commonData>>(environment.apiUrl + "CommonData/OperationalUnit");
  }
  getEquipmentTypeDropDown(): Observable<Array<commonData>> {
    return this.http.get<Array<commonData>>(environment.apiUrl + "CommonData/EquipmentType");
  }
  getProductGroupDropDown(): Observable<Array<commonData>> {
    return this.http.get<Array<commonData>>(environment.apiUrl + "CommonData/ProductGroup");
  }
  getOEMSElementDropDown(): Observable<Array<commonData>> {
    return this.http.get<Array<commonData>>(environment.apiUrl + "CommonData/OEMSElement");
  }

}
