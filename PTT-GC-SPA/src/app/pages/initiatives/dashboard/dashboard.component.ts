import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomreportService } from '@services/customreport/customreport.service';
import { CustomReportHeader } from '@models/customReportHeader';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SwalTool } from '@tools/swal.tools';
import { Pagination } from '@models/pagination';
import { PermissionService } from '@services/permission/permission.service';
import { AuthService } from '@services/authentication/auth.service';
import { Router } from '@angular/router';
import { InitiativeService } from '@services/initiative/initiative.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  name = 'Custom Report Overview';
  username: any;
  allHeader: any = [];
  typeOpenModal: string = '';
  customReportMerge: any = null
  reportID: any;
  isModalCanOpen: boolean;
  searchText: any = '';
  isViewReport = false;

  @ViewChild('dashboardModal', { static: true }) dashboardModal: ModalDirective;

  pagination: Pagination = {
    "currentPage": 1,
    "itemsPerPage": 10,
    "totalItems": null,
    "totalPages": null,
  };

  constructor(
    private customrReportService: CustomreportService,
    private initiativeService: InitiativeService

  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('user');
    this.initiativeService.maskUnderline = 'reportMenu';
    this.GetAllReports();
  }

  ShowModal(arrData: any): void {
    this.typeOpenModal = arrData.type
    this.isModalCanOpen = true;
    if (arrData.type === 'create') {
      this.reportID = null;
      this.dashboardModal.show();
    } if (arrData.type === 'edit') {
      this.reportID = arrData.reportID;
      this.dashboardModal.show();
    }
  }

  CloseModal(isSaved: boolean) {
    if (isSaved == true) {
      this.GetAllReports();
    }

    this.dashboardModal.hide();
    this.isModalCanOpen = false;
  }

  GetAllReports() {
    this.customrReportService.GetAllReports(this.pagination.currentPage, this.pagination.itemsPerPage, this.searchText, this.username).subscribe(
      (result) => {
        this.allHeader = result.allReportHeader;
        this.pagination = result.paginationHeader;
      }

    );
  }

  DeleteReport(id: any) {
    this.customrReportService.DeleteReport(id).subscribe(
      result => {
        this.GetAllReports(); //reload all reports
      },
      err => {
      }
    )
  }

  PageChange(page: number) {
    this.pagination.currentPage = page;
    this.GetAllReports();

  }

  PageLengthChange(pageLength: number) {
    this.InitialPagination();
    this.pagination.itemsPerPage = pageLength;
    this.GetAllReports();
  }

  InitialPagination() {
    this.pagination.currentPage = 1;
  }

  SearchClick(searchText: any) {
    this.InitialPagination();
    this.searchText = searchText;
    this.GetAllReports();

  }

  RefreshDataClick(e) {
    this.InitialPagination();
    this.searchText = "";
    this.GetAllReports();

  }
}
