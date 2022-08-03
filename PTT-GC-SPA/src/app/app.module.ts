import { TokenInterceptorService } from '@configs/token-interceptor.service';
import { AuthGuard } from '@guards/auth.guard';
import { AuthService } from '@services/authentication/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule, RouterComponents, Resolver } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxMaskModule } from 'ngx-mask';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AutosizeModule } from 'ngx-autosize';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MsalModule } from '@azure/msal-angular';
import { MsalInterceptor } from '@azure/msal-angular';
import { MsalGuard } from '@azure/msal-angular';
import { MsalSetting } from '@settings/Msal';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { appReducers } from '@reducers/app.reducer';
import { environment } from '@environments/environment';

import { PlantEffects } from '@effects/plant.effect';
import { SafePipe } from './core/pipes/safe.pipe';
import { ReturnComponent } from './pages/initiatives/return/return.component';
import { ReturnCapexComponent } from './shared/return/return-capex/return-capex.component';
import { ReturnGeneralComponent } from './shared/return/return-general/return-general.component';
import { DataTablesModule } from 'angular-datatables';
import { ViewRevistionAddmoreComponent } from './shared/components/view-revistion-addmore/view-revistion-addmore.component';
import { ViewRevistionReturnComponent } from './shared/components/view-revistion-return/view-revistion-return.component';
import { ViewRevistionComponent } from './shared/components/view-revistion/view-revistion.component';
import { CarreidComponent } from './pages/initiatives/carreid/carreid.component';
import { CarriedCapexComponent } from './shared/carried/carried-capex/carried-capex.component';
import { CarriedGeneralComponent } from './shared/carried/carried-general/carried-general.component';
import { ButtonViewRevisionComponent } from './shared/components/button-view-revision/button-view-revision.component';
import { ViewRevisionPoolComponent } from './shared/components/view-revision-pool/view-revision-pool.component';
import { AddmorePoolComponent } from './shared/components/addmore-pool/addmore-pool.component';
import { InitiativeInfoComponent } from './shared/components/initiative-info/initiative-info.component';

import { ViewRevistionPoolComponent } from './shared/components/view-revistion-pool/view-revistion-pool.component';
import { ViewRevitionAddmorePoolComponent } from './shared/components/view-revition-addmore-pool/view-revition-addmore-pool.component';
import { AddmoreStatusComponent } from './shared/addmore/addmore-status/addmore-status.component';
import { FormComponent } from './pages/initiatives/form/form.component';
import { FormCimComponent } from './pages/form-initiative/form-cim/form-cim.component';
import { GeneralFormComponent } from './shared/form-component/general-form/general-form.component';
import { DetailFormComponent } from './shared/form-component/detail-form/detail-form.component';
import { CapexInformationFormComponent } from './shared/form-component/capex-information-form/capex-information-form.component';
import { DetailMaxFormComponent } from './shared/form-component/detail-max-form/detail-max-form.component';
import { ImpactFormComponent } from './shared/form-component/impact-form/impact-form.component';
import { ProgressFormComponent } from './shared/form-component/progress-form/progress-form.component';
import { MaintainAndSettingComponent } from './pages/maintain-and-setting/maintain-and-setting.component';
import { MaintainComponent } from './shared/components/maintain/maintain.component';
import { SettingComponent } from './shared/components/setting/setting.component';
import { MainFormComponent } from './pages/main-form/main-form.component';
import { StatusFormComponent } from './shared/form-component/status-form/status-form.component';
import { PoolMainFormComponent } from './pages/pool-main-form/pool-main-form.component';
import { PoolGeneralFormComponent } from './shared/form-component/pool-general-form/pool-general-form.component';
import { PoolDetailFormComponent } from './shared/form-component/pool-detail-form/pool-detail-form.component';
import { PoolCapexInfoFormComponent } from './shared/form-component/pool-capex-info-form/pool-capex-info-form.component';
import { LessonLearnFormComponent } from './shared/form-component/lesson-learn-form/lesson-learn-form.component';
import { LessonLearnComponent } from './shared/form-component/lesson-learn/lesson-learn.component';
import { DetailCpiFormComponent } from './shared/form-component/detail-cpi-form/detail-cpi-form.component';
import { LessonLearnApiService } from '@services/lesson-learn-api/lesson-learn-api.service';
import { LessonLearnTableDataService } from '@services/lesson-learn-table-data/lesson-learn-table-data.service';
import { BestPracticeFormComponent } from './shared/form-component/best-practice-form/best-practice-form.component';
import { OutStandingFormComponent } from './shared/form-component/out-standing-form/out-standing-form.component';
import { KpiKriFormComponent } from './shared/form-component/kpi-kri-form/kpi-kri-form.component';
import { KpiKriApiService } from '@services/kpi-kri-api/kpi-kri-api.service';
import { KpiKriIndicatorComponent } from './shared/form-component/kpi-kri-indicator/kpi-kri-indicator.component';
import { KpiKriDetailComponent } from './shared/form-component/kpi-kri-detail/kpi-kri-detail.component';
import { KpiKriDataService } from '@services/kpi-kri-data/kpi-kri-data.service';
import { DatePipe } from '@angular/common';
import { DetailPimFormComponent } from './shared/form-component/detail-pim-form/detail-pim-form.component';
import { ResourceNeedFormComponent } from './shared/form-component/resource-need-form/resource-need-form.component';
import { RiskFormComponent } from './shared/form-component/risk-form/risk-form.component';
import { PimGate1Component } from './shared/form-component/pim-gate1/pim-gate1.component';
import { PimGate2Component } from './shared/form-component/pim-gate2/pim-gate2.component';
import { PimGate3Component } from './shared/form-component/pim-gate3/pim-gate3.component';
import { PimGate4Component } from './shared/form-component/pim-gate4/pim-gate4.component';
import { CarriedFormComponent } from './shared/form-component/carried-form/carried-form.component';
import { LookbackFormComponent } from './shared/form-component/lookback-form/lookback-form.component';
import { PermissionComponent } from './pages/permission/permission.component';
import { VacPicComponent } from './pages/vac-pic/vac-pic.component';
import { VacManagerDetailComponent } from '@components/vac-manager-detail/vac-manager-detail.component';
import { PicManagerDetailComponent } from '@components/pic-manager-detail/pic-manager-detail.component';
import { KpiMaintainComponent } from './pages/kpi-maintain/kpi-maintain.component';
import { LookbackExecutionComponent } from './shared/form-component/lookback-execution/lookback-execution.component';
import { LookbackEnvironmentComponent } from './shared/form-component/lookback-environment/lookback-environment.component';
import { LookbackCimComponent } from './shared/form-component/lookback-cim/lookback-cim.component';
import { LookbackPerformanceComponent } from './shared/form-component/lookback-performance/lookback-performance.component';
import { RiskComponent } from './shared/form-component/risk/risk.component';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { KpiKriMaintainComponent } from './shared/form-component/kpi-kri-maintain/kpi-kri-maintain.component';
import { ProgressMilestone1Component } from './shared/form-component/progress-milestone1/progress-milestone1.component';
import { ProgressMilestone2Component } from './shared/form-component/progress-milestone2/progress-milestone2.component';
import { BscInformationComponent } from './shared/form-component/bsc-information/bsc-information.component';
import { SettingComponentComponent } from './pages/setting-component/setting-component.component';
import { CreatePermissionComponent } from './pages/permission-manager/create-permission/create-permission.component';
import { ManagePermissionComponent } from './pages/permission-manager/manage-permission/manage-permission.component';
import { UsersListComponent } from './pages/users-manager/users-list/users-list.component';
import { UsersManageComponent } from './pages/users-manager/users-manage/users-manage.component';
import { InitiativeHistoryComponent } from './shared/components/initiative-history/initiative-history.component';
import { InitiativeHistoryRedirectorComponent } from './shared/components/initiative-history-redirector/initiative-history-redirector.component';
import { RoleCreateComponent } from './pages/role/role-create/role-create.component';
import { RoleListComponent } from './pages/role/role-list/role-list.component';
import { RoleManagerComponent } from './pages/role/role-manager/role-manager.component';
import { UserManagerComponent } from './pages/role/user-manager/user-manager.component';
import { UserListComponent } from './pages/role/user-list/user-list.component';
import { EmailNotificationComponent } from './pages/email-notification/email-notification.component';
import { InitiativeGenerateAppWbsComponent } from './shared/components/initiative-generate-app-wbs/initiative-generate-app-wbs.component';
import { InitiativeShowAttachmentComponent } from './shared/components/initiative-show-attachment/initiative-show-attachment.component';
import { PerformanceInactiveComponent } from './pages/performance-inactive/performance-inactive.component';
import { LessonLearnAttachmentComponent } from './shared/form-component/lesson-learn-attachment/lesson-learn-attachment.component';
import { ViewRevisionCapexComponent } from './shared/form-component/view-revision-capex/view-revision-capex.component';
import { DigitalAndItFormComponent } from './shared/form-component/digital-and-it-form/digital-and-it-form.component';


@NgModule({
  declarations: [
    AppComponent,
    RouterComponents,
    SafePipe,
    ReturnComponent,
    ReturnCapexComponent,
    ReturnGeneralComponent,
    ViewRevistionAddmoreComponent,
    ViewRevistionReturnComponent,
    ViewRevistionComponent,
    CarreidComponent,
    CarriedCapexComponent,
    CarriedGeneralComponent,
    ButtonViewRevisionComponent,
    ViewRevisionPoolComponent,
    AddmorePoolComponent,
    InitiativeInfoComponent,
    RiskComponent,
    ViewRevistionPoolComponent,
    ViewRevitionAddmorePoolComponent,
    AddmoreStatusComponent,
    FormComponent,
    FormCimComponent,
    GeneralFormComponent,
    DetailFormComponent,
    CapexInformationFormComponent,
    DetailMaxFormComponent,
    ImpactFormComponent,
    ProgressFormComponent,
    MaintainAndSettingComponent,
    MaintainComponent,
    SettingComponent,
    MainFormComponent,
    StatusFormComponent,
    PoolMainFormComponent,
    PoolGeneralFormComponent,
    PoolDetailFormComponent,
    PoolCapexInfoFormComponent,
    LessonLearnFormComponent,
    LessonLearnComponent,
    DetailCpiFormComponent,
    BestPracticeFormComponent,
    OutStandingFormComponent,
    KpiKriFormComponent,
    KpiKriIndicatorComponent,
    KpiKriDetailComponent,
    DetailPimFormComponent,
    ResourceNeedFormComponent,
    RiskFormComponent,
    PimGate1Component,
    PimGate2Component,
    PimGate3Component,
    PimGate4Component,
    CarriedFormComponent,
    LookbackFormComponent,
    PermissionComponent,
    VacPicComponent,
    VacManagerDetailComponent,
    PicManagerDetailComponent,
    KpiMaintainComponent,
    LookbackExecutionComponent,
    LookbackEnvironmentComponent,
    LookbackCimComponent,
    LookbackPerformanceComponent,
    MainViewComponent,
    KpiKriMaintainComponent,
    ProgressMilestone1Component,
    ProgressMilestone2Component,
    BscInformationComponent,
    SettingComponentComponent,
    CreatePermissionComponent,
    ManagePermissionComponent,
    UsersListComponent,
    UsersManageComponent,
    InitiativeHistoryComponent,
    InitiativeHistoryRedirectorComponent,
    RoleCreateComponent,
    RoleListComponent,
    RoleManagerComponent,
    UserManagerComponent,
    UserListComponent,
    EmailNotificationComponent,
    InitiativeGenerateAppWbsComponent,
    InitiativeShowAttachmentComponent,
    PerformanceInactiveComponent,
    LessonLearnAttachmentComponent,
    ViewRevisionCapexComponent,
    DigitalAndItFormComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    NgxSpinnerModule,
    AppRoutingModule,
    PaginationModule.forRoot(),
    FileUploadModule,
    ProgressbarModule,
    AutosizeModule,
    NgSelectModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    MsalModule.forRoot(MsalSetting),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([PlantEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    DataTablesModule
  ],
  providers: [
    Resolver,
    AuthService,
    AuthGuard,
    MsalGuard,
    LessonLearnTableDataService,
    LessonLearnApiService,
    KpiKriApiService,
    KpiKriDataService,
    DatePipe,
    RiskFormComponent,
    TooltipConfig,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
