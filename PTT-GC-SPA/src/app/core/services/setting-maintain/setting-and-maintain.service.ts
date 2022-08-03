import { DataDetailModel, PagedList } from './../../models/SettingAndMaintain';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { MaintainDataModel } from '@models/SettingAndMaintain';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingAndMaintainService {

  responseData: Array<MaintainDataModel>;
  baseUrl = environment.pathUrl;
  constructor(
    private http: HttpClient,
  ) { }

  // Get DataType
  async GetDataType(
    DataType: string | null,
    search: string | null,
    page: number | null,
    rowPerPage: number | null,
    orderBy: string | null,
    order: string | null
  ) {
    let result = await this.GetCommonDataSettings(DataType, search, page, orderBy, order);
    console.log('GetDataType(%s, %s, %s, %s, %s, %s)', DataType, search, page, rowPerPage, orderBy, order);
    if (DataType !== null || search !== null || page !== null || rowPerPage !== null) {
      this.responseData = result.filter(r =>
        r.dataType === DataType
      );

    } else {
      this.responseData = result;
    }
    console.log('Response: ', this.responseData);
    return this.responseData;
  }

  async AddSingleCommonData(body: any) {
    return await this.http.post(this.baseUrl + "api/CommonData/AddSingleCommonData", body).toPromise();
  }

  async GetTopics() {
    return await this.http.get<MaintainDataModel[]>(this.baseUrl + "api/CommonData/GetTopics").toPromise();
  }

  async GetCommonDataSettings(dataType: string, keyword: string, pageNumber: number, orderByFieldName: string, sortDirection: string) {
    // let result: Array<MaintainDataModel>
    // this.http.get<Array<MaintainDataModel>>(this.baseUrl + "api/CommonData/GetCommonData").subscribe(
    //   response => result = response
    // );
    // return result;
    if (keyword != undefined) {
      return await this.http.get<MaintainDataModel[]>(this.baseUrl + "api/CommonData/GetCommonData/" + dataType + "/" + keyword + "/" + pageNumber + "/" + orderByFieldName + "/" + sortDirection).toPromise();
    }
    else {
      return await this.http.get<MaintainDataModel[]>(this.baseUrl + "api/CommonData/GetCommonData/" + dataType + "/" + pageNumber + "/" + orderByFieldName + "/" + sortDirection).toPromise();
    }
  }

  async GetCommonData(dataType: string, keyword: string, pageNumber: number, orderByFieldName: string, sortDirection: string) {
    if (keyword != undefined) {
      return await this.http.get<PagedList>(this.baseUrl + "api/CommonData/GetDataDetail/" + dataType + "/" + keyword + "/" + pageNumber + "/" + orderByFieldName + "/" + sortDirection).toPromise();
    }
    else {
      return await this.http.get<PagedList>(this.baseUrl + "api/CommonData/GetDataDetail/" + dataType + "/" + pageNumber + "/" + orderByFieldName + "/" + sortDirection).toPromise();
    }
  }

  async UpdateCommonData(body: MaintainDataModel[]) {
    return await this.http.put<number>(this.baseUrl + "api/CommonData/UpdateCommonData", body).toPromise();
  }

  async DeleteItems(Id: number) {
    return await this.http.delete<number>(this.baseUrl + 'api/CommonData/DeleteItemInCommonData/' + Id).toPromise();
  }
}

