import { async } from '@angular/core/testing';
import { Component, OnInit, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { AuthService } from '@services/authentication/auth.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { PermissionService } from '@services/permission/permission.service';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { RolePermissionModel } from '@models/RolePermissionModel';
import { SettingModel } from '@models/settingModel';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InitiativeService } from '@services/initiative/initiative.service';
import { SettingServiceService } from '@services/settingService/setting-service.service';
import { DateUtil } from '@utils/date.utils';
import { error } from 'protractor';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  @ViewChild('profileModal', { static: false }) profileModal: ModalDirective;

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


  userMsal;

  LoadPage = false;
  checkAuthen: boolean = false;
  checkUserExists: boolean = false;


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  setting: SettingModel = {} as SettingModel;
  isAvailableBudgetPool: boolean = false;
  isActiveITBudgetSurvey: boolean = false;

  // private subscription: Subscription;
  userPermission: RolePermissionModel[];
  public permissionServiceStaticVar = PermissionService;
  user;
  register;

  private subscription: Subscription;
  constructor(
    private permissionService: PermissionService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private broadcastService: BroadcastService,
    private unauthorized: UnauthorizedService,
    private msalService: MsalService,
    private initiativeService: InitiativeService,
    private settingService: SettingServiceService,
    private dateUtil: DateUtil
  ) { }

  showOverview = true;
  showDashboard = false;
  showSetting = false;

  registerForm = this.fb.group({ username: [''], password: [''] });

  loginForm = this.fb.group({ username: [''], password: [''] });

  @HostListener('window:beforeunload') RefreshForm() {
    sessionStorage.removeItem('overview');
    sessionStorage.removeItem('dashboard');
    sessionStorage.removeItem('setting');
  }

  ngOnInit() {
    this.permissionService.showSettingMenu = true;
    this.isAvailableBudgetPool = true;
    this.isActiveITBudgetSurvey = true;

    this.broadcastService.subscribe('msal:loginSuccess', (payload) => {
      sessionStorage.removeItem(PermissionService.USER_PERMISSION_KEY);
      localStorage.setItem('token', payload.token);
      this.authService.getMsalUser().subscribe((response) => {
        localStorage.setItem('user', response.mail);
        this.loginForm.patchValue({ username: response.mail, password: 'password' });
        this.authService.Login(this.loginForm.value).subscribe(() => {
          this.permissionService.GetPermissionsByEmail(response.mail).then((permissionRes) => {
            if (permissionRes.length > 0) {
              sessionStorage.setItem(PermissionService.USER_PERMISSION_KEY, JSON.stringify(permissionRes));
              this.userPermission = permissionRes;
            } else {
              let nullPermission = [] as RolePermissionModel[];
              sessionStorage.setItem(PermissionService.USER_PERMISSION_KEY, JSON.stringify(nullPermission));
            }
          });
          this.router.navigate(['']);
        }, error => {
          this.authService.UserExists({ username: response.mail }).subscribe(async (result) => {
            if (result) {
              this.loginForm.patchValue({ username: response.mail, password: 'password' });
              this.authService.Login(this.loginForm.value).subscribe(() => {
                window.location.reload();
                // this.permissionService.GetPermissionsByEmail(response.mail).then((permissionRes) => {
                //   if (permissionRes.length > 0) {
                //     sessionStorage.setItem(PermissionService.USER_PERMISSION_KEY, JSON.stringify(permissionRes));
                //     this.userPermission = permissionRes;
                //   } else {
                //     let nullPermission = [] as RolePermissionModel[];
                //     sessionStorage.setItem(PermissionService.USER_PERMISSION_KEY, JSON.stringify(nullPermission));
                //   }
                // });
                // this.getUserProfile()
              });
            } else {
              this.registerForm.patchValue({ username: response.mail, password: 'password' });
              this.authService.Register(this.registerForm.value).subscribe(async (user) => {
                this.register = user;
                this.loginForm.patchValue({ username: this.register.username, password: 'password' });
                this.authService.Login(this.loginForm.value).subscribe(() => {
                  window.location.reload();
                  // this.permissionService.GetPermissionsByEmail(response.mail).then((permissionRes) => {
                  //   if (permissionRes.length > 0) {
                  //     sessionStorage.setItem(PermissionService.USER_PERMISSION_KEY, JSON.stringify(permissionRes));
                  //     this.userPermission = permissionRes;
                  //   } else {
                  //     let nullPermission = [] as RolePermissionModel[];
                  //     sessionStorage.setItem(PermissionService.USER_PERMISSION_KEY, JSON.stringify(nullPermission));
                  //   }
                  // });
                  // this.getUserProfile()
                });
              });
            }
          }, error => {
            console.log('UserExists', error)
          });
        });
      });

    });
    this.broadcastService.subscribe('msal:acquireTokenSuccess', (payload) => {
      this.checkAuthen = true;
      //this.getUserProfile()
    });
    // this.broadcastService.subscribe('msal:acquireTokenFailure', (payload) => {

    // });
    this.broadcastService.subscribe('msal:acquireTokenSilent', (payload) => {
      this.msalService.loginRedirect();
    });

    this.broadcastService.subscribe('msal:acquireTokenFailure', (payload) => {
      this.msalService.loginRedirect();
    });

    if (this.authService.loggedIn() && !this.checkAuthen) {
      this.authService.getMsalUser().subscribe((response) => {

        //if (!sessionStorage.getItem(PermissionService.USER_PERMISSION_KEY)) {
        this.loginForm.patchValue({ username: response.mail, password: 'password' });
        this.authService.Login(this.loginForm.value).subscribe(() => {
          this.permissionService.GetPermissionsByEmail(response.mail).then((permissionRes) => {
            if (permissionRes.length > 0) {
              sessionStorage.setItem(PermissionService.USER_PERMISSION_KEY, JSON.stringify(permissionRes));
              this.userPermission = permissionRes;
            } else {
              let nullPermission = [] as RolePermissionModel[];
              sessionStorage.setItem(PermissionService.USER_PERMISSION_KEY, JSON.stringify(nullPermission));
            }
          });
          this.getUserProfile()
        });
        // } else {
        //   this.userPermission = JSON.parse(sessionStorage.getItem(PermissionService.USER_PERMISSION_KEY));
        // }
      });
    } else {
      if (!this.authService.loggedIn()) {
        this.msalService.loginRedirect()
      }

    }
  }

  InitialActionForm(): FormGroup {
    return this.fb.group({ id: 0, username: '', role: '', userId: '' });
  }

  getUserProfile() {
    this.authService.getMsalUser().subscribe((response) => {
      this.user = response;
      this.userMsal = response;
      this.displayName = this.userMsal.displayName;
      this.fullName = this.userMsal.givenName + ' ' + this.userMsal.surname;
      this.jobTitle = this.userMsal.jobTitle;
      this.mailAccount = this.userMsal.mail;
      this.userPrincipalName = this.userMsal.userPrincipalName;
      this.initiativeService.username = this.userMsal.mail;
      this.GetUserCompany(this.userMsal.mail);
      // this.authService.UserExists({ username: this.user.mail }).subscribe(async (result) => {
      //   if (result) {
      //     this.loginForm.patchValue({ username: this.user.mail, password: 'password' });
      //     this.authService.Login(this.loginForm.value).subscribe(() => {
      //       if (!this.authService.loggedIn()) {
      //         this.router.navigate(['']);
      //       }
      //     });
      //   } else {
      //     this.registerForm.patchValue({ username: this.user.mail, password: 'password' });
      //     this.authService.Register(this.registerForm.value).subscribe(async (user) => {
      //       this.register = user;
      //       this.loginForm.patchValue({ username: this.register.username, password: 'password' });
      //       this.authService.Login(this.loginForm.value).subscribe(() => {
      //         if (!this.authService.loggedIn()) {
      //           this.router.navigate(['']);
      //         }
      //       });
      //     });
      //   }
      // }, error => {
      //   console.log('UserExists', error)
      // });
    });
  }

  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    this.initiativeService.GetUserCompany(email).toPromise().then((response) => {
      this.userCompany = response['company'];
      this.initiativeService.company = response['company'];
    });
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

  getMaskUnderline(page) {
    //this.initiativeService.
    //return sessionStorage.getItem('page')
    return this.initiativeService.maskUnderline === page ? true : false;
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
  }

  CheckPermissionSetting(pageId: string): boolean {
    if (!this.userPermission) {
      return false;
    }
    let accessDetail: RolePermissionModel = this.userPermission.find(x =>
      x.pageId.toLowerCase() === pageId.toLowerCase()
      && x.sectionId.toLowerCase() === "access".toLowerCase()
    );
    if (accessDetail?.isEnable) {
      return true;
    }
    return false;

  }
}
