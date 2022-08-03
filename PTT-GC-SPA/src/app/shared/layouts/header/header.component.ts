import { AuthService } from '@services/authentication/auth.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BroadcastService } from '@azure/msal-angular';
import { MsalService } from '@azure/msal-angular';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { InitiativeService } from '../../../core/services/initiative/initiative.service';
import { Router } from '@angular/router';
import { PermissionService } from '@services/permission/permission.service';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { SettingModel } from '@models/settingModel';
import { SettingServiceService } from '@services/settingService/setting-service.service';
import { DateUtil } from '@utils/date.utils';
import { RolePermissionModel } from '@models/RolePermissionModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('profileModal', { static: false }) profileModal: ModalDirective;

  @Input() showOverview: boolean = true;
  @Input() showDashboard: boolean = false;
  @Input() showSetting: boolean = true;

  username: string;

  displayName: string;
  fullName: string;
  mailAccount: string;
  jobTitle: string;
  userPrincipalName: string;
  userCompany: string;
  isExpanded = false;

  showSettingTab: boolean = false;    // -- Tab Setting --
  showSettingMenu: boolean = false;       // Setting
  showPermission: boolean = false;    // Role
  showRole: boolean = false;          // VAC
  showVAC: boolean = false;           // VIC
  showPIC: boolean = false;           // PIC
  showMaintain: boolean = false;      // Maintain
  showKpiMaintain: boolean = false;   // KPI Maintain
  showInactiveEmail: boolean = false; // Inactive Email


  //work around for admin dim
  havePMODIMPermission: boolean = false; // Inactive Email


  userMsal;

  LoadPage = false;
  checkAuthen: boolean = false;


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  setting: SettingModel = {} as SettingModel;
  isAvailableBudgetPool: boolean = false;

  // private subscription: Subscription;
  userPermission: RolePermissionModel[];
  public permissionServiceStaticVar = PermissionService;

  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private msalService: MsalService,
    private broadcastService: BroadcastService,
    private initiativeService: InitiativeService,
    private router: Router,
    public permissionService: PermissionService,
    private unauthorized: UnauthorizedService,
    private settingService: SettingServiceService,
    private dateUtil: DateUtil

  ) {
    sessionStorage.setItem("ADMIN_DIM", "false");
  }

  ngOnInit() {
    this.authService.getMsalUser().subscribe((response) => {
      if (!sessionStorage.getItem(PermissionService.USER_PERMISSION_KEY)) {
        this.permissionService.GetPermissionsByEmail(response.mail).then((permissionRes) => {
          if (permissionRes.length > 0) {
            sessionStorage.setItem(PermissionService.USER_PERMISSION_KEY, JSON.stringify(permissionRes));
            this.userPermission = permissionRes;
          } else {
            let nullPermission = [] as RolePermissionModel[];
            sessionStorage.setItem(PermissionService.USER_PERMISSION_KEY, JSON.stringify(nullPermission));
          }
        });
      } else {
        this.userPermission = JSON.parse(sessionStorage.getItem(PermissionService.USER_PERMISSION_KEY));
      }
    });

    this.broadcastService.subscribe('msal:acquireTokenSuccess', (payload) => {
      this.checkAuthen = true;
      this.LoadPage = true;
      this.spinner.show();
      setTimeout(() => {
        this.LoadPage = false;
        this.spinner.hide();
        this.getProfile();
      }, 3000);


    });
    if (this.authService.loggedIn() && !this.checkAuthen) {
      setTimeout(() => {
        this.LoadPage = false;
        this.spinner.hide();
        this.getProfile();
      }, 3000);
    }

    // this.broadcastService.subscribe('msal:acquireTokenSuccess', (payload) => { });

    this.broadcastService.subscribe('msal:acquireTokenFailure', (payload) => {
      this.msalService.loginRedirect()
    });
  }

  createInitiative() {
    this.initiativeService.page = 'create';
    this.initiativeService.id = null;
    this.initiativeService.initiativeCode = null;
    this.initiativeService.legacyInitiativeCode = null;
    this.initiativeService.suggestion = false;
    this.initiativeService.viewMode = false;
    this.router.navigate(['/initiative/create']);
  }

  GetUserCompany(email: string) {
    setTimeout(() => {
      this.initiativeService.GetUserCompany(email).toPromise().then((response) => {
        this.userCompany = response['company'];
        this.initiativeService.company = response['company'];
      });
    }, 3000);
  }

  getProfile() {
    this.authService.getMsalUser().subscribe((response) => {
      this.userMsal = response;
      this.displayName = this.userMsal.displayName;
      this.fullName = this.userMsal.givenName + ' ' + this.userMsal.surname;
      this.jobTitle = this.userMsal.jobTitle;
      this.mailAccount = this.userMsal.mail;
      this.userPrincipalName = this.userMsal.userPrincipalName;
      this.initiativeService.username = this.userMsal.mail;
      // this.GetUserCompany(this.userMsal.mail);
      //this.CheckPermission();
    });
  }

  getMaskUnderline() {
    //this.initiativeService.
    //return sessionStorage.getItem('page')
    return this.initiativeService.maskUnderline;
  }

  get getMyInitiatives() {
    let pageArray = ['home', 'myTask', 'create', 'approve'];
    if (!pageArray.includes(sessionStorage.getItem('page'))) {
      return true
    } else {
      return false;
    }
  }

  logout() {
    this.msalService.logout();
    this.authService.Logout();
  }

  showChildModal(): void {
    this.profileModal.show();
  }

  hideChildModal(): void {
    this.profileModal.hide();
  }

  onHidden(): void { }

  BudgetSurvey() {
    setTimeout(() => sessionStorage.clear(), 50);
    if (sessionStorage.getItem('page') === 'dim-edit') { window.location.reload(); }
  }

  RequestPool() {
    this.initiativeService.page = 'pool-create';
    this.initiativeService.id = null;
    this.initiativeService.initiativeCode = null;
    this.router.navigate(['/initiative/pool-create']);
  }

  get getEmailLists() {
    return this.initiativeService.emailGodList.map((m) => m.toLowerCase());
  }

  get getShowSettingTab() {
    return true;
  }

  checkSetting() {
    this.settingService.GetInitiativeSetting().then((settingResponse) => {
      if (settingResponse) {
        this.settingService.setSettingData(settingResponse);
        const today = (this.dateUtil.GetToday).getTime();
        const settingData: SettingModel = this.settingService.settingData.value;
        const start = this.dateUtil.convertDateUTC(settingData.startPeriodBudgetPool).getTime();
        const finish = this.dateUtil.convertDateUTC(settingData.finishPeriodBudgetPool).getTime();
        if ((start <= today && today <= finish) && settingData.isAvailableBudgetPool) {
          this.isAvailableBudgetPool = false;
        } else {
          this.isAvailableBudgetPool = true;

        }
      }
    }, error => {
      this.unauthorized.error(error);
    });
  }

  CheckPermissionSetting(pageId: string): boolean {
    if (!this.userPermission) {
      return false;
    }
    let accessDetail: RolePermissionModel = this.userPermission.find(x =>
      x.pageId.toLowerCase() === pageId
      && x.sectionId.toLowerCase() === "access"
    );
    if (accessDetail?.isEnable) {
      return true;
    }
    return false;

  }
}
