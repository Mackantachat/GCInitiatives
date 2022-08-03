import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '@services/authentication/auth.service';
import { FormGroup, FormArray } from '@angular/forms';
import { RolePermissionModel } from '@models/RolePermissionModel';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  baseUrl = environment.apiUrl + 'Permission/';

  constructor(private http: HttpClient, private authService: AuthService) { }
  permissionResult: any;
  permissionCheck: any;
  isDisabled: any = [];
  isEnabled: any = [];
  isHidden: any = [];
  userEmail: string;

  roleSettingDetail: RoleSettingDetail[] = [];
  roleOk: boolean;

  showSettingMenu: boolean;

  //static var for permission
  public static USER_PERMISSION_KEY = 'user-permission';

  //access control
  //god approve button
  public static ONBEHAFTOFAPPROVE_PAGE_ID = 'onbehaftofapprove';
  //god submit button
  public static ONBEHAFTOFSUBMIT_PAGE_ID = 'onbehaftofsubmit';

  //dashboard menu
  public static DASHBOARD_MENU_PAGE_ID = 'reporttab';
  public static ADMIN_MAX_PAGE_ID = 'admin-max';

  //setting menu
  public static SETTING_MENU_PAGE_ID = 'settingtab';
  public static SETTING_PAGE_ID = 'setting';
  public static ROLE_PAGE_ID = 'role';
  public static PERMISSION_PAGE_ID = 'permission';
  public static VACMANAGEMENT_PAGE_ID = 'vacmanagement';
  public static PICMANAGEMENT_PAGE_ID = 'picmanagement';
  public static KPIMAINTAIN_PAGE_ID = 'kpi-maintain';
  public static KPIMAINTAINVIEWER_PAGE_ID = 'kpi-maintain-viewer';
  public static MAINTAIN_PAGE_ID = 'maintain';
  public static INACTIVEMAIL_PAGE_ID = 'inactive-email';
  public static ADMIN_PROGRESS = 'ADMIN-PROGRESS';
  //create menu
  public static CREATE_POOL_PAGE_ID = 'createpool';
  public static CREATE_BUDGET_SURVEY_PAGE_ID = 'createitbudgetsurvey';

  //form control
  public static MAINFORM_PAGE_ID = 'mainform';
  public static GENERALFORM_PAGE_ID = 'generalform';
  public static DETAILPIMFORM_PAGE_ID = 'detailpimform';
  public static DETAILINFOFORM_PAGE_ID = 'detailinfoform';
  public static CAPEXINFO_PAGE_ID = 'capexinfoform';
  public static PROGRESSFORM_PAGE_ID = 'progressform';

  public static IMPACTFORM_PAGE_ID = 'impact';
  // static var
  public static SHARE_BENEFIT_CONTROL = "havesharebenefit";
  public static TOCOMMENT_CONTROL = "tocomment";
  public static IMPLEMENTATIONCOST_CONTROL = "tableimplementationcost";
  public static TOFINANCEONLY_CONTROL = "tofinanceonly";

  //position permission
  public static SPOC_ALL_WORKSTREAM = "spoc all workstream";
  public static YOUNG_LEADER_ALL_WORKSTREAM = "young leader  all sub workstream";


  CheckOverviewPermission(email): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + 'Overview', email);
  }

  // ----------------------------------------------------------------

  //   CheckSectionName(email): Observable<boolean> {  // email, page
  //     return this.http.post<boolean>(this.baseUrl + 'checksectionname', email);
  //  }

  CheckDashboardPermission(email): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + 'Dashboard', email);
  }

  CheckSettingPermission(email): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + 'Setting', email);
  }

  CheckPermission(email: string, page: string, initiativeId: string) {  // email, page, id
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('page', page);
    params = params.append('Initiativeid', initiativeId);
    return this.http.get(this.baseUrl + 'checkpermission', { params });
  }


  CheckSectionName(email: string, page: string, initiativeId: string) {  // email, page, id
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('page', page);
    params = params.append('Initiativeid', initiativeId);
    return this.http.get(this.baseUrl + 'checksectionname', { params });
  }


  async CheckPagePermission(page: string, initiativeId: string) {
    this.authService.getMsalUser().subscribe(async (user) => {
      this.userEmail = await user.mail;
      this.CheckPermission(this.userEmail, page, initiativeId.toString()).subscribe(async (result) => {
        ///////////////////
        // console.log(result);
      });
    }, error => {
      // console.log('CheckPagePermission Error !!!');
    });
  }


  async CheckInitiativeFormsPermission(formGroup: FormGroup, initiativeId: string) {
    if (initiativeId == 'null') {
      initiativeId = '0';
    }
    if (formGroup.get('initiativesForm')) {
      this.CheckGeneralInformationFormPermission(formGroup.get('initiativesForm') as FormGroup, initiativeId);
    }
  }


  CheckGeneralInformationFormPermission(formGroup: FormGroup, initiativeId: string) {
    this.authService.getMsalUser().subscribe(async (user) => {
      this.userEmail = await user.mail;
      this.CheckPermission(this.userEmail, 'Test', initiativeId.toString()).subscribe(async (result) => {
        ///////////////////////////////////////
        // console.log(result);
        this.permissionResult = result;

        ///////////////////////////////////////
      });
    }, error => {
      //console.log('CheckGeneralInformationFormPermission Error !!!');
    });
  }




  async CheckSection(page: string, initiativeId: string) {
    this.authService.getMsalUser().subscribe(async (user) => {
      this.userEmail = await user.mail;
      this.CheckSectionName(this.userEmail, page, initiativeId.toString()).subscribe(async (result) => {
        this.permissionCheck = await result;
        this.isHidden = [];
        this.isDisabled = [];
        this.isEnabled = [];
        this.permissionCheck.forEach(async element => {
          if (element.isVisible === false) {
            await this.isHidden.push(element.sectionName);
          }
          if (element.isEnable === false) {
            await this.isDisabled.push(element.sectionName);
          } else {
            await this.isEnabled.push(element.sectionName);
          }
        });

        // console.log('permissionCheck', this.permissionCheck)
        // console.log('hidden', this.isHidden)
        // console.log('isDisabled', this.isDisabled)
        // console.log('isEnabled', this.isEnabled)
      });
    }, error => {
      // console.log('CheckSection Error !!!');
    });
  }

  CheckSectionNewLogic(page: string, initiativeId: string) {
    this.isHidden = [];
    this.isDisabled = [];
    this.isEnabled = [];
    this.authService.getMsalUser().subscribe((user) => {
      this.userEmail = user.mail;
      this.CheckSectionName(this.userEmail, page, initiativeId.toString()).subscribe((result) => {
        this.permissionCheck = result;
        this.permissionCheck.forEach(element => {
          if (element.isVisible === false) {
            this.isHidden.push(element.sectionName);
          }
          if (element.isEnable === false) {
            this.isDisabled.push(element.sectionName);
          } else {
            this.isEnabled.push(element.sectionName);
          }
        });
      });
    }, error => {
      // console.log('CheckSection Error !!!');
    });
  }

  async GetRolesDetailList(data: any): Promise<RoleSettingDetail[]> {
    return new Promise((resolve, reject) => {
      this.http.post<RoleSettingDetail[]>(this.baseUrl + 'GetRolesDetailList', data).subscribe(
        r => {
          this.roleSettingDetail = r;
          this.roleOk = true;
          // console.log('permission list : ', this.roleSettingDetail);
          resolve;
        },
        err => {
          reject();
        }
      );
    });
  }

  chps(page: string, controlName: string) {  // CheckRolesDetailList  / Ex: ps.chps('page','FieldName')
    return;
    page = page.toLowerCase();
    controlName = controlName.toLowerCase();
    // try{
    if (this.roleOk === true) {

      if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === false && i.isVisible === true) > 0) {   //  readonly & show = set readonly
        //console.log('CheckRolesDetailList : readonly ' + controlName);
        return { 'disabled-check-main': true }
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === true && i.isVisible === true) > 0) {  // enable & show  = set normal
        //console.log('CheckRolesDetailList : normal ' + controlName);
        return { 'disabled-check-main': false };
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === false && i.isVisible === false) > 0) {  // readonly & hide   = set hide
        //console.log('CheckRolesDetailList : hide 1 ' + controlName);
        return { 'display-none': true }
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === true && i.isVisible === false) > 0) {  // enable & hide = set hide
        //console.log('CheckRolesDetailList : hide 2 ' + controlName);
        return { 'display-none': true };
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === null || i.isVisible === null) > 0) {  // null or null = set readonly
        //console.log('CheckRolesDetailList : null ' + controlName);
        return { 'disabled-check-main': false };
      } else {
        //console.log('CheckRolesDetailList : else '+ page + ',' + controlName);
        return { 'disabled-check-main': false };
      }
    }
    // } catch(error){
    //   return;
    // }
  }

  checkControlImpact(fg: FormGroup, page: string, controlName: string) {  // CheckRolesDetailList  / Ex: ps.chps('page','FieldName')
    return;
    if (!fg?.get(controlName)) {
      return;
    }
    page = page.toLowerCase();
    controlName = controlName.toLowerCase();
    if (this.roleOk === true) {
      if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === false && i.isVisible === true) > 0) {   //  readonly & show = set readonly
        //console.log('CheckRolesDetailList : readonly ' + controlName);
        return { 'disabled-check-main': true }
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === true && i.isVisible === true) > 0) {  // enable & show  = set normal
        //console.log('CheckRolesDetailList : normal ' + controlName);
        return { 'disabled-check-main': false };
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === false && i.isVisible === false) > 0) {  // readonly & hide   = set hide
        //console.log('CheckRolesDetailList : hide 1 ' + controlName);
        return { 'display-none': true }
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === true && i.isVisible === false) > 0) {  // enable & hide = set hide
        //console.log('CheckRolesDetailList : hide 2 ' + controlName);
        return { 'display-none': true };
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === null || i.isVisible === null) > 0) {  // null or null = set readonly
        //console.log('CheckRolesDetailList : null ' + controlName);
        return { 'disabled-check-main': false };
      } else {
        //console.log('CheckRolesDetailList : else '+ page + ',' + controlName);
        return { 'disabled-check-main': false };
      }
    }
  }

  checkNotControlImpact(page: string, controlName: string) {  // CheckRolesDetailList  / Ex: ps.chps('page','FieldName')
    return;
    page = page.toLowerCase();
    controlName = controlName.toLowerCase();
    if (this.roleOk === true) {
      if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === false && i.isVisible === true) > 0) {   //  readonly & show = set readonly
        //console.log('CheckRolesDetailList : readonly ' + controlName);
        return { 'disabled-check-main': true }
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === true && i.isVisible === true) > 0) {  // enable & show  = set normal
        //console.log('CheckRolesDetailList : normal ' + controlName);
        return { 'disabled-check-main': false };
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === false && i.isVisible === false) > 0) {  // readonly & hide   = set hide
        //console.log('CheckRolesDetailList : hide 1 ' + controlName);
        return { 'display-none': true }
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === true && i.isVisible === false) > 0) {  // enable & hide = set hide
        //console.log('CheckRolesDetailList : hide 2 ' + controlName);
        return { 'display-none': true };
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === null || i.isVisible === null) > 0) {  // null or null = set readonly
        //console.log('CheckRolesDetailList : null ' + controlName);
        return { 'disabled-check-main': false };
      } else {
        //console.log('CheckRolesDetailList : else '+ page + ',' + controlName);
        return { 'disabled-check-main': false };
      }
    }
  }

  checkControl(fg: FormGroup, page: string, controlName: string) {  // CheckRolesDetailList  / Ex: ps.chps('page','FieldName')
    return;
    if (!fg?.get(controlName)) {
      return;
    }
    page = page.toLowerCase();
    controlName = controlName.toLowerCase();
    if (this.roleOk === true) {
      if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === false && i.isVisible === true) > 0) {   //  readonly & show = set readonly
        //console.log('CheckRolesDetailList : readonly ' + controlName);
        return { 'disabled-check-main': true }
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === true && i.isVisible === true) > 0) {  // enable & show  = set normal
        //console.log('CheckRolesDetailList : normal ' + controlName);
        return { 'disabled-check-main': false };
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === false && i.isVisible === false) > 0) {  // readonly & hide   = set hide
        //console.log('CheckRolesDetailList : hide 1 ' + controlName);
        return { 'display-none': true }
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === true && i.isVisible === false) > 0) {  // enable & hide = set hide
        //console.log('CheckRolesDetailList : hide 2 ' + controlName);
        return { 'display-none': true };
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === null || i.isVisible === null) > 0) {  // null or null = set readonly
        //console.log('CheckRolesDetailList : null ' + controlName);
        return { 'disabled-check-main': false };
      } else {
        //console.log('CheckRolesDetailList : else '+ page + ',' + controlName);
        return { 'disabled-check-main': false };
      }
    }
  }

  checkNotControl(page: string, controlName: string) {  // CheckRolesDetailList  / Ex: ps.chps('page','FieldName')
    return;

    page = page.toLowerCase();
    controlName = controlName.toLowerCase();
    if (this.roleOk === true) {
      if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === false && i.isVisible === true) > 0) {   //  readonly & show = set readonly
        //console.log('CheckRolesDetailList : readonly ' + controlName);
        return { 'disabled-check-main': true }
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === true && i.isVisible === true) > 0) {  // enable & show  = set normal
        //console.log('CheckRolesDetailList : normal ' + controlName);
        return { 'disabled-check-main': false };
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === false && i.isVisible === false) > 0) {  // readonly & hide   = set hide
        //console.log('CheckRolesDetailList : hide 1 ' + controlName);
        return { 'display-none': true }
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === true && i.isVisible === false) > 0) {  // enable & hide = set hide
        //console.log('CheckRolesDetailList : hide 2 ' + controlName);
        return { 'display-none': true };
      } else if (this.roleSettingDetail.findIndex(i => i.fieldName?.toLowerCase() === controlName && i.pageId?.toLowerCase() === page
        && i.isEnable === null || i.isVisible === null) > 0) {  // null or null = set readonly
        //console.log('CheckRolesDetailList : null ' + controlName);
        return { 'disabled-check-main': false };
      } else {
        //console.log('CheckRolesDetailList : else '+ page + ',' + controlName);
        return { 'disabled-check-main': false };
      }
    }
  }


  // for header
  async CheckAccessPagesPermission(email: string) {  // email, page, id
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get(this.baseUrl + 'checkAccesspagespermission', { params });
  }

  async CheckAccessPages(): Promise<any> {
    let prom = new Promise((resolve) => {
      this.authService.getMsalUser().subscribe(async (user) => {
        this.userEmail = user.mail;
        (await this.CheckAccessPagesPermission(this.userEmail)).subscribe((result) => {
          resolve(result);
        });
      }, error => {
        // console.log('CheckAccessPages Error !!!');
      });
    })
    return prom;
  }

  // 
  async GetPermissionsByEmail(email: string): Promise<RolePermissionModel[]> {
    let param = {
      email: email
    }
    return await (this.http.post<RolePermissionModel[]>(this.baseUrl + 'GetPermissionsByEmail', param)).toPromise();
  }

}
export interface RolesParams {
  email: string,
  id?: number,
}

export interface RoleSettingDetail {
  id: number,
  pageId: string,

  sectionId: string,
  fieldName: string,
  isVisible?: boolean,
  isEnable?: boolean,
  isIndividual?: boolean,
  parameter01: string,
  parameter02: string,
  parameter03: string,
  parameter04: string,
  parameter05: string,
  parameter06: string,
  parameter07: string,
  parameter08: string,
  parameter09: string,
  parameter10: string,
  parameter11: string,
  parameter12: string,
  parameter13: string,
  parameter14: string,
  parameter15: string,
  parameter16: string,
  parameter17: string,
  parameter18: string,
  parameter19: string,
  parameter20: string,
  roleId: string,
  roleName: string,
  initiativeType: string,
  stage: string,
  status: string,
  typeOfInvestment: string,
  priority: number
}
