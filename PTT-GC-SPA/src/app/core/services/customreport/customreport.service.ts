import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { PaginatedResult, Pagination } from '@models/pagination';
import { CustomReportHeader } from '@models/customReportHeader';
import { map } from 'rxjs/operators';
import { CustomReportDetail } from '@models/customReportDetail';
import { CustomReportParam } from '@models/customReportParam';
import { CustomReportMerge } from '@models/customReportMerge';
import { CustomReportHeaderPagination } from '@models/CustomReportHeaderPagination';
import { DuplicateReport } from '@models/DuplicateReport';
import { ParamDropdown } from '@models/ParamDropdown';
import { ItemDropdown } from '@models/ItemDropdownReport';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomreportService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  GetAllReports(currentPage: any, itemPerPage: any, searchText: string, username: string) {
    return this.http.get<CustomReportHeaderPagination>(this.baseUrl + 'CustomReportHeader',
      {
        params: {
          "currentPage": currentPage,
          "itemPerPage": itemPerPage,
          "searchText": searchText,
          "username": username
        }
      }
    );
  }

  GetAllReportsBuiltin(currentPage: any, itemPerPage: any, searchText: string, username: string) {
    return this.http.get<CustomReportHeaderPagination>(this.baseUrl + 'CustomReportHeader/Builtin',
      {
        params: {
          "currentPage": currentPage,
          "itemPerPage": itemPerPage,
          "searchText": searchText,
          "username": username
        }
      }
    );
  }


  CreateReport(ReportHeader: CustomReportHeader, ReportDetailX: CustomReportDetail, ReportDetailY: CustomReportDetail[], ReportParam: CustomReportParam[]) {
    //console.log(detailPoolForm);

    return this.http.post<CustomReportMerge>(this.baseUrl + 'CustomReportHeader', {
      ReportHeader,
      ReportDetailX,
      ReportDetailY,
      ReportParam,
    });
  }

  UpdateReport(ReportHeader: CustomReportHeader, ReportDetailX: CustomReportDetail, ReportDetailY: CustomReportDetail[], ReportParam: CustomReportParam[]) {
    //console.log(detailPoolForm);
    return this.http.put<CustomReportMerge>(this.baseUrl + 'CustomReportHeader/' + ReportHeader.reportID, {
      ReportHeader,
      ReportDetailX,
      ReportDetailY,
      ReportParam,
    });
  }

  GetReport(ReportID: any): Observable<CustomReportMerge> {
    return this.http.get<CustomReportMerge>(this.baseUrl + 'CustomReportHeader/' + ReportID);
  }

  DeleteReport(ReportID: any) {
    return this.http.delete<boolean>(this.baseUrl + 'CustomReportHeader/' + ReportID);
  }

  GetStageType() {
    return this.http.get<boolean>(this.baseUrl + 'CustomReportHeader/GetStageType');
  }

  GetReportType() {
    return this.http.get<boolean>(this.baseUrl + 'CustomReportHeader/GetReportType');
  }

  GetXAxis(stageType: any) {
    return this.http.get<boolean>(this.baseUrl + 'CustomReportHeader/V_Graph_DDL_X_Axis?stageType=' + stageType);
  }

  GetAllParam(reportType: any) {
    return this.http.get<boolean>(this.baseUrl + 'CustomReportHeader/GetAllParam?reportType=' + reportType);
  }

  GetYAxis(stageType: any) {
    return this.http.get<boolean>(this.baseUrl + 'CustomReportHeader/V_Graph_DDL_Y_Axis?stageType=' + stageType);
  }

  GetCustomYAxis(reportType: any) {
    return this.http.get<any>(this.baseUrl + 'CustomReportHeader/V_CustomExcel1_Y?reportType=' + reportType);
  }

  GetCustomExcel(reportID: any) {
    return this.http.get(this.baseUrl + 'ExportExcel/GenerateCustomExcel?reportID=' + reportID, { responseType: 'blob' });
  }

  GetCustomExcelCapex(reportID: any, storeName: any) {
    return this.http.get(this.baseUrl + 'ExportExcel/GenerateExcelCapex?reportID=' + reportID + '&storeName=' + storeName, { responseType: 'blob' });
  }

  GetCustomExcelTpx(reportID: any, storeName: any) {
    return this.http.get(this.baseUrl + 'ExportExcel/GenerateExcelTpx?reportID=' + reportID + '&storeName=' + storeName, { responseType: 'blob' });
  }

  GetBGSlide(reportID: any, storeName: any) {
    return this.http.get(this.baseUrl + 'ExportBudgetSlide/GenerateBGSlide?reportID=' + reportID + '&storeName=' + storeName, { responseType: 'blob' });
  }

  GetCashIn(reportID: any) {
    return this.http.get(this.baseUrl + 'ExportCashInReport/GenerateCashIn?reportID=' + reportID, { responseType: 'blob' });
  }
  GetApproverDashboard(reportID: any) {
    return this.http.get(this.baseUrl + 'ExportExcel/GenerateApproverDashboard?reportID=' + reportID, { responseType: 'blob' });
  }

  DuplicateReport(reportID: any, duplicateReport: DuplicateReport) {
    return this.http.post(this.baseUrl + 'CustomReportHeader/DuplicateReport/' + reportID, duplicateReport);
  }

  GetUFDD(reportID: any) {
    return this.http.get(this.baseUrl + 'ExportCashInReport/GenerateUFDD?reportID=' + reportID, { responseType: 'blob' });
  }

  GetDropdownData(paramDropdown: ParamDropdown) {
    let param = new HttpParams;
    param = param.append('fieldName', paramDropdown?.fieldName);
    param = param.append('searchText', paramDropdown?.searchText);
    return this.http.get<ItemDropdown[]>(this.baseUrl + 'CustomReportHeader/GetDropdownData', { params: param });
  }
}
