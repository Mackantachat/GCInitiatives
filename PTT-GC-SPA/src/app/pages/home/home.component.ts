import { HomeService } from '@services/home/home.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/authentication/auth.service';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { InitiativeService } from '../../core/services/initiative/initiative.service';
import { Router } from '@angular/router';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { AttachmentService } from '@services/attachment/attachment.service';
import { SwalTool } from '@tools/swal.tools';
import { SettingServiceService } from '@services/settingService/setting-service.service';
import { DateUtil } from '@utils/date.utils';
import { SettingModel } from '@models/settingModel';
import { RolePermissionModel } from '@models/RolePermissionModel';
import { PermissionService } from '@services/permission/permission.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading = false;

  MyTaskInProgress: number;
  MyTaskNotStarted: number;
  MyInitiativeDraft: number;
  MyInitiativeInProgress: number;
  MyInitiativeCompleted: number;
  MyInitiativeCanceled: number;

  isDownloadAnnualCAPEXProject: boolean;
  isDownloadRequestCAPEXandCreateWBS: boolean;
  isDownloadApprovalFlowandDetailInformation: boolean;
  isDownloadNoInvestmentProject: boolean;

  //work around for admin dim
  havePMODIMPermission: boolean = false; // Inactive Email

  user;
  isAvailableBudgetPool: boolean = false;
  isActiveITBudgetSurvey: boolean = false;

  userPermission: RolePermissionModel[];
  public permissionServiceStaticVar = PermissionService;

  constructor(
    private homeService: HomeService,
    private authService: AuthService,
    private broadcastService: BroadcastService,
    private initiativeService: InitiativeService,
    private router: Router,
    private unauthorized: UnauthorizedService,
    private msalService: MsalService,
    private attachmentService: AttachmentService,
    private swalTool: SwalTool,
    private settingService: SettingServiceService,
    private dateUtil: DateUtil
  ) {
  }

  ngOnInit() {
    this.initiativeService.maskUnderline = 'home';
    sessionStorage.setItem('page', 'home');
    this.LoadingPage();
    this.isAvailableBudgetPool = true;
    this.isActiveITBudgetSurvey = true;
    setTimeout(() => {
      this.userPermission = JSON.parse(sessionStorage.getItem(PermissionService.USER_PERMISSION_KEY));
      this.SetResult();
    }, 5000);
  }

  SetResult() {
    // this.authService.getMsalUser().subscribe(async (user) => {
    if (this.authService.loggedIn()) {
      // if (this.msalService.getMsalUser().displayableId) {
      this.broadcastService.subscribe('msal:acquireTokenSuccess', (payload) => {
        console.log('acquireTokenSuccess', payload)
      });
      const username = localStorage.getItem('user');
      this.initiativeService.username = localStorage.getItem('user');
      this.homeService.MyTaskInProgress(username).subscribe((result) => { this.MyTaskInProgress = Number(result); });
      this.homeService.MyInitiativeDraft(username).subscribe((result) => this.MyInitiativeDraft = Number(result));
      this.homeService.MyInitiativeInProgress(username).subscribe((result) => this.MyInitiativeInProgress = Number(result));
      this.homeService.MyInitiativeCompleted(username).subscribe((result) => this.MyInitiativeCompleted = Number(result));
      this.homeService.MyInitiativeCanceled(username).subscribe((result) => this.MyInitiativeCanceled = Number(result));


      this.settingService.GetInitiativeSetting().then((settingResponse) => {
        if (settingResponse) {
          this.settingService.setSettingData(settingResponse);
          const today = (this.dateUtil.GetToday).getTime();
          const settingData: SettingModel = this.settingService.settingData.value;
          //pool
          const startPool = this.dateUtil.convertDateUTC(settingData.startPeriodBudgetPool).getTime();
          const finishPool = this.dateUtil.convertDateUTC(settingData.finishPeriodBudgetPool).getTime();

          //it budget
          const startITBudget = this.dateUtil.convertDateUTC(settingData.startPeriodIT).getTime();
          const finishITBudget = this.dateUtil.convertDateUTC(settingData.finishPeriodIT).getTime();

          //check pool
          if ((startPool <= today && today <= finishPool) && settingData.isAvailableBudgetPool) {
            /*
              with permission
             */
            // let accessDetail: RolePermissionModel = this.userPermission?.find(x =>
            //   x.pageId.toLowerCase() === PermissionService.CREATE_POOL_PAGE_ID
            //   && x.sectionId.toLowerCase() === "access"
            // );
            // if (accessDetail?.isEnable) {
            //   this.isAvailableBudgetPool = false;
            // } else {
            //   this.isAvailableBudgetPool = true;
            // }

            /*
              with out permission
             */
            this.isAvailableBudgetPool = false;
          } else {
            this.isAvailableBudgetPool = true;
          }
          //check budget
          let accessDetail: RolePermissionModel = this.userPermission?.find(x =>
            x.pageId.toLowerCase() === PermissionService.CREATE_BUDGET_SURVEY_PAGE_ID
            && x.sectionId.toLowerCase() === "access"
          );
          //admin can create All time
          if (((startITBudget <= today && today <= finishITBudget) && settingData.isActiveITBudgetSurvey) || (accessDetail && accessDetail.isEnable)) {
            this.isActiveITBudgetSurvey = false;
          } else {
            this.isActiveITBudgetSurvey = true;
          }
        } else {
          this.isAvailableBudgetPool = true;
          this.isActiveITBudgetSurvey = true;
        }
      }, error => {
        this.unauthorized.error(error);
      });
    } else {
      // console.log('SetResult Error !!!');
      let errorText: any
      errorText.status = 401;
      this.unauthorized.error(errorText);
    };
  }

  LoadingPage() {
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 5000);
  }


  createInitiative() {
    this.initiativeService.page = 'create';
    this.initiativeService.id = null;
    this.initiativeService.initiativeCode = null;
    this.initiativeService.legacyInitiativeCode = null;
    this.router.navigate(['/initiative/create']);
  }

  RequestPool() {
    this.initiativeService.page = 'pool-create';
    this.initiativeService.id = null;
    this.initiativeService.initiativeCode = null;
    this.router.navigate(['/initiative/pool-create']);
  }

  DownloadRequestCAPEXandCreateWBS(fileName: string) {
    this.isDownloadRequestCAPEXandCreateWBS = true;
    this.attachmentService.GetDownloadTrainingMaterial(fileName).subscribe((result: any) => {
      if (result.type !== 'text/plain') {
        const blob = new Blob([result]);
        const saveAs = require('file-saver');
        const file = fileName + '.pdf';
        saveAs(blob, file);
        this.swalTool.DownloadSuccess();
        this.isDownloadRequestCAPEXandCreateWBS = false;
      } else {
        this.swalTool.FileNotFound();
      }
    });
  }
  DownloadApprovalFlowandDetailInformation(fileName: string) {
    this.isDownloadApprovalFlowandDetailInformation = true;
    this.attachmentService.GetDownloadTrainingMaterial(fileName).subscribe((result: any) => {
      if (result.type !== 'text/plain') {
        const blob = new Blob([result]);
        const saveAs = require('file-saver');
        const file = fileName + '.pdf';
        saveAs(blob, file);
        this.swalTool.DownloadSuccess();
        this.isDownloadApprovalFlowandDetailInformation = false;
      } else {
        this.swalTool.FileNotFound();
      }
    });
  }
  DownloadNoInvestmentProject(fileName: string) {
    this.isDownloadNoInvestmentProject = true;
    this.attachmentService.GetDownloadTrainingMaterial(fileName).subscribe((result: any) => {
      if (result.type !== 'text/plain') {
        const blob = new Blob([result]);
        const saveAs = require('file-saver');
        const file = fileName + '.pdf';
        saveAs(blob, file);
        this.swalTool.DownloadSuccess();
        this.isDownloadNoInvestmentProject = false;
      } else {
        this.swalTool.FileNotFound();
      }
    });
  }
  DownloadAnnualCAPEXProject(fileName: string) {
    this.isDownloadAnnualCAPEXProject = true;
    this.attachmentService.GetDownloadTrainingMaterial(fileName).subscribe((result: any) => {
      if (result.type !== 'text/plain') {
        const blob = new Blob([result]);
        const saveAs = require('file-saver');
        const file = fileName + '.pdf';
        saveAs(blob, file);
        this.swalTool.DownloadSuccess();
        this.isDownloadAnnualCAPEXProject = false;
      } else {
        this.swalTool.FileNotFound();
      }
    });
  }

}
