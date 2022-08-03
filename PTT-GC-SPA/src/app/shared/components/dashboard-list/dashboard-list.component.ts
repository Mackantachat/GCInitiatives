import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SwalTool } from '@tools/swal.tools';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Pagination } from '@models/pagination';
import { CustomReportHeader } from '@models/customReportHeader';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { InitiativeService } from '@services/initiative/initiative.service';
import { CustomreportService } from '@services/customreport/customreport.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})
export class DashboardListComponent implements OnInit {

  constructor(
    private swalTool: SwalTool,
    private router: Router,
    private spinner: NgxSpinnerService,
    private initiativeService: InitiativeService,
    private customrReportService: CustomreportService,
  ) { }

  @Input() dashboardType: string;
  @Input() allHeadersReport: CustomReportHeader[] = [];
  @Output() showModalType = new EventEmitter();
  @Output() getReportByID = new EventEmitter();
  @Output() deleteReportByID = new EventEmitter();
  @Output() OnPageChanged = new EventEmitter();
  @Output() OnPageLengthChanged = new EventEmitter();
  @Input() pagination: Pagination;
  @Output() OnSearchClick = new EventEmitter();
  @Output() OnRefreshData = new EventEmitter();

  username: string;
  length = [10, 25, 50, 100];
  isSaveAndView = false;
  systemReportType: any = '';
  isBuiltinReport: boolean;

  ngOnInit(): void {
    this.initiativeService.maskUnderline = 'reportMenu';
  }

  showModal(type: any, reportID: any) {
    this.showModalType.emit({ 'type': type, 'reportID': reportID });
  }

  DeleteCustomReport(reportID: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this report template ?!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.deleteReportByID.emit(reportID);
        this.swalTool.Delete();
      }
    });
    setTimeout(() => {
    }, 1000);


  }


  PageChanged(e: any) {
    this.OnPageChanged.emit(e.page);
  }

  ChangePageLength(e) {
    this.OnPageLengthChanged.emit(e.target.value);
  }

  RefreshDataClick(e) {
    this.OnRefreshData.emit(e);
  }

  SearchClick(searchText: any) {
    this.OnSearchClick.emit(searchText);
  }

  SaveAndViewShowModal(id: any) {

  }

  SaveAndView(id: any) {
    this.isSaveAndView = true;
    this.customrReportService.GetReport(id).subscribe(
      result => {
        // this.dataCustomReportMerge = result;

        this.systemReportType = result.reportHeader.systemReportType
        if (this.systemReportType == 'builtin') {
          this.isBuiltinReport = true;
        } else {
          this.isBuiltinReport = false;
        }
        this.ViewGraph(result.reportHeader);
      }
    );
  }
  ViewGraph(graphDetail: CustomReportHeader) {
    switch (graphDetail.graphType) {
      case "BarStacked": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + graphDetail.reportID);
        break;
      }
      case "Pie": {
        this.router.navigateByUrl('initiative/pie-chartjs?reportid=' + graphDetail.reportID);
        break;
      }
      case "Donut": {
        this.router.navigateByUrl('initiative/donut-chartjs?reportid=' + graphDetail.reportID);
        break;
      }
      case "Bar": {
        this.router.navigateByUrl('initiative/bar-chartjs?reportid=' + graphDetail.reportID);
        break;
      }
      case "Line": {
        this.router.navigateByUrl('initiative/line-chartjs?reportid=' + graphDetail.reportID);
        break;
      }
      case "Table": {
        this.router.navigateByUrl('initiative/table-chart?reportid=' + graphDetail.reportID);
        break;
      }
      case "ApproverDashboardTable": {
        this.router.navigateByUrl('initiative/custom-table?storeName=sp_ApproverDashboard&reportid=' + graphDetail.reportID);
        break;
      }
      case "CustomTable": {
        this.router.navigateByUrl('initiative/custom-table?storeName=sp_CustomExcel&reportid=' + graphDetail.reportID);
        break;
      }
      case "CustomExcel": {
        this.spinner.show();
        this.customrReportService.GetCustomExcel(graphDetail.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);
          } else {
            alert('No data found.');
          }
          this.spinner.hide();
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "ApproverDashboardExcel": {
        this.spinner.show();
        this.customrReportService.GetApproverDashboard(graphDetail.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);
          } else {
            alert('No data found.');
          }
          this.spinner.hide();
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "NewCapexReport": {
        this.spinner.show();
        //statements;
        let storeProcedureName: string = 'sp_NewCapexReport';
        this.customrReportService.GetCustomExcelCapex(graphDetail.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);

            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert('No data found.');
          }
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "CapexReportByCompany": {
        this.spinner.show();
        //statements;
        let storeProcedureName: string = 'sp_CapexReportbyCompany';
        this.customrReportService.GetCustomExcelCapex(graphDetail.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);

            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert('No data found.');
          }
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "BGSlide": {
        this.spinner.show();
        //statements;
        let storeProcedureName: string = 'sp_BGSlide';
        this.customrReportService.GetBGSlide(graphDetail.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.pptx';
            saveAs(blob, file);

            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert('No data found.');
          }
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "Cash-In": {
        this.spinner.show();
        this.customrReportService.GetCashIn(graphDetail.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);

            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert('No data found.');
          }
        },
          error => {
            this.spinner.hide();
            //this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "UFDD": {
        this.spinner.show();
        this.customrReportService.GetUFDD(graphDetail.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);

            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert('No data found.');
          }
        },
          error => {
            this.spinner.hide();
            //this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "CAPEXReportGroupByandCompanyType": {
        this.spinner.show();
        let storeProcedureName: string = 'sp_CAPEX_ReportGroupByandCompanyType';
        this.customrReportService.GetCustomExcelCapex(graphDetail.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);

            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert('No data found.');
          }
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "CAPEXSummaryReportbyCompany": {
        this.spinner.show();
        let storeProcedureName: string = 'sp_CAPEX_SummaryReportbyCompany';
        this.customrReportService.GetCustomExcelCapex(graphDetail.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);

            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert('No data found.');
          }
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "CAPEXProjectApproved": {
        this.spinner.show();
        let storeProcedureName: string = 'sp_CAPEX_ProjectApproved';
        this.customrReportService.GetCustomExcelCapex(graphDetail.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);

            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert('No data found.');
          }
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "CAPEXAllProjectsSubmittedInPeriod": {
        this.spinner.show();
        let storeProcedureName: string = 'sp_CAPEX_AllProjectsSubmittedInPeriod';
        this.customrReportService.GetCustomExcelCapex(graphDetail.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);

            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert('No data found.');
          }
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "CAPEXDepreciationForNewProjectReport": {
        this.spinner.show();
        let storeProcedureName: string = 'sp_CAPEX_DepreciationForNewProjectReport';
        this.customrReportService.GetCustomExcelCapex(graphDetail.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);

            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert('No data found.');
          }
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "CAPEXNewCapexGcGroupByProjectType": {
        this.spinner.show();
        let storeProcedureName: string = 'sp_NewCapexGcGroupByProjectType';
        this.customrReportService.GetCustomExcelCapex(graphDetail.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);

            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert('No data found.');
          }
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "CAPEXReportRequestPool": {
        this.spinner.show();
        let storeProcedureName: string = 'sp_CAPEX_Report_Request_Pool';
        this.customrReportService.GetCustomExcelCapex(graphDetail.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);

            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert('No data found.');
          }
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "CAPEXReportUsedPool": {
        this.spinner.show();
        let storeProcedureName: string = 'sp_CAPEX_Report_Used_Pool_v01';
        this.customrReportService.GetCustomExcelCapex(graphDetail.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);

            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert('No data found.');
          }
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "CAPEXProjectDetail": {
        this.spinner.show();
        let storeProcedureName: string = 'sp_CAPEX_Report_Project_Detail';
        this.customrReportService.GetCustomExcelCapex(graphDetail.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);

            this.spinner.hide();
          } else {
            this.spinner.hide();
            alert('No data found.');
          }
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }
      case "GraphHistoricalIL5": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + graphDetail.reportID);
        break;
      }
      case "GraphHistoricalIL5_COE": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + graphDetail.reportID);
        break;
      }
      case "GraphHistoricalIL5_SEVP-D": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + graphDetail.reportID);
        break;
      }
      case "GraphHistoricalIL5_SEVP-U/MCS": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + graphDetail.reportID);
        break;
      }
      case "GraphHistoricalIL4": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + graphDetail.reportID);
        break;
      }
      case "GraphHistoricalIL4_COE": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + graphDetail.reportID);
        break;
      }
      case "GraphHistoricalIL4_SEVP-D": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + graphDetail.reportID);
        break;
      }
      case "GraphHistoricalIL4_SEVP-U/MCS": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + graphDetail.reportID);
        break;
      } case "CustomExcelCIM": {
        this.spinner.show();
        this.customrReportService.GetCustomExcel(graphDetail.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);
          } else {
            alert('No data found.');
          }
          this.spinner.hide();
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }

      case "CustomExcelPIM": {
        this.spinner.show();
        this.customrReportService.GetCustomExcel(graphDetail.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);
          } else {
            alert('No data found.');
          }
          this.spinner.hide();
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }

      case "CustomExcelDIM": {
        this.spinner.show();
        this.customrReportService.GetCustomExcel(graphDetail.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);
          } else {
            alert('No data found.');
          }
          this.spinner.hide();
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }

      case "CustomExcelCPI": {
        this.spinner.show();
        this.customrReportService.GetCustomExcel(graphDetail.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);
          } else {
            alert('No data found.');
          }
          this.spinner.hide();
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }

      case "CustomExcelStrategy": {
        this.spinner.show();
        this.customrReportService.GetCustomExcel(graphDetail.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = graphDetail.reportName + '.xlsx';
            saveAs(blob, file);
          } else {
            alert('No data found.');
          }
          this.spinner.hide();
        },
          error => {
            this.spinner.hide();
            if (error.status == 500) {
              this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
            } else {
              this.swalTool.Error("Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.")
            }
          });
        break;
      }

      default: {
        //this.swalTool.Error("Graph Type Invalid !.");
        this.router.navigateByUrl('initiative/stacked-chart?reportid=' + graphDetail.reportID);
        break;
      }
    }
  }

}
