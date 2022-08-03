import { PerformanceInactiveComponent } from './pages/performance-inactive/performance-inactive.component';
import { OutStandingFormComponent } from './shared/form-component/out-standing-form/out-standing-form.component';
import { PoolMainFormComponent } from './pages/pool-main-form/pool-main-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Templates
import { MainComponent } from '@templates/main/main.component';

// Layouts
import { HeaderComponent } from '@layouts/header/header.component';
import { FooterComponent } from '@layouts/footer/footer.component';

// Components
import { InformationTabsComponent } from '@components/information-tabs/information-tabs.component';
import { InvestmentModalComponent } from '@components/investment-modal/investment-modal.component';
import { InitiativeHeaderComponent } from '@components/initiative-header/initiative-header.component';
import { AdvanceSearchComponent } from '@components/advance-search/advance-search.component';
import { InitiativeSearchComponent } from '@components/initiative-search/initiative-search.component';
import { InitiativeLoadComponent } from '@components/initiative-load/initiative-load.component';
import { InitiativeListComponent } from '@components/initiative-list/initiative-list.component';
import { InitiativeNoDataComponent } from '@components/initiative-no-data/initiative-no-data.component';
import { InitiativeBoxComponent } from '@components/initiative-box/initiative-box.component';
import { InitiativeAttachmentComponent } from './shared/components/initiative-attachment/initiative-attachment.component';
import { InitiativeInformationComponent } from '@components/initiative-information/initiative-information.component';
import { InformationSubmitComponent } from '@components/information-submit/information-submit.component';
import { InitiativeFileComponent } from '@components/initiative-file/initiative-file.component';
import { ImpactExcelComponent } from '@components/impact-excel/impact-excel.component';
import { ViewLogHistoryComponent } from '@components/view-log-history/view-log-history.component';
import { InitiativeValidateComponent } from '@components/initiative-validate/initiative-validate.component';
import { LogCommentComponent } from '@components/log-comment/log-comment.component';
import { AddmoreDirectCapexComponent } from './shared/addmore/addmore-direct-capex/addmore-direct-capex.component';
import { HistoryStatusComponent } from '@components/history-status/history-status.component';
import { ContactIoComponent } from '@components/contact-io/contact-io.component';
// Page
import { HomeComponent } from '@pages/home/home.component';
import { MainInitiativeComponent } from '@pages/initiatives/main/main.component';
import { MytaskInitiativeComponent } from '@pages/initiatives/mytask/mytask.component';
import { MyownInitiativeComponent } from '@pages/initiatives/myown/myown.component';
import { OverviewInitiativeComponent } from '@pages/initiatives/overview/overview.component';
import { CreateInitiativeComponent } from '@pages/initiatives/create/create.component';
import { EditInitiativeComponent } from '@pages/initiatives/edit/edit.component';
import { ApproveInitiativeComponent } from '@pages/initiatives/approve/approve.component';
import { InformationComponent } from '@pages/initiatives/information/information.component';
import { StatusComponent } from './pages/initiatives/status/status.component';
import { DimComponent } from './pages/initiatives/dim/dim.component';




// NotFound
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';

// Guard
import { MsalGuard } from '@azure/msal-angular';

import { MyTaskResolver } from '@resolvers/mytask.resolver';
import { MyOwnResolver } from '@resolvers/myown.resolver';
import { OverviewResolver } from '@resolvers/overview.resolver';


import { DashboardComponent } from '@pages/initiatives/dashboard/dashboard.component';
import { DashboardListComponent } from '@components/dashboard-list/dashboard-list.component';
import { DashboardSearchComponent } from '@components/dashboard-search/dashboard-search.component';
import { DashboardFormsComponent } from '@components/dashboard-forms/dashboard-forms.component';
import { BarChartjsComponent } from '@pages/chart/bar-chartjs/bar-chartjs.component';
import { StackedChartjsComponent } from '@pages/chart/stacked-chartjs/stacked-chartjs.component';
import { LineChartjsComponent } from '@pages/chart/line-chartjs/line-chartjs.component';
import { DonutChartjsComponent } from '@pages/chart/donut-chartjs/donut-chartjs.component';
import { PieChartjsComponent } from '@pages/chart/pie-chartjs/pie-chartjs.component';
import { TableChartComponent } from '@pages/chart/table-chart/table-chart.component';
import { ComboChartjsComponent } from '@pages/chart/combo-chartjs/combo-chartjs.component';
import { Reporttest01Component } from '@pages/reporting/reporttest01/reporttest01.component';
import { CustomTableComponent } from '@pages/chart/custom-table/custom-table.component';


// Add more
import { AddmoreComponent } from '../app/pages/initiatives/addmore/addmore.component';
import { AddmoreCapexComponent } from './shared/addmore/addmore-capex/addmore-capex.component';
import { InitiativeredirectorComponent } from '@pages/initiatives/initiativeredirector/initiativeredirector.component';
import { AddmoreButtonComponent } from './shared/components/addmore-button/addmore-button.component';

// Return
import { ReturnComponent } from '../app/pages/initiatives/return/return.component';
import { ReturnGeneralComponent } from '../app/shared/return/return-general/return-general.component';
import { ReturnCapexComponent } from '../app/shared/return/return-capex/return-capex.component';
import { DashboardSystemComponent } from '@pages/initiatives/dashboard-system/dashboard-system.component';

// Carried
import { CarreidComponent } from '../app/pages/initiatives/carreid/carreid.component';
import { CarriedCapexComponent } from '../app/shared/carried/carried-capex/carried-capex.component';
import { CarriedGeneralComponent } from '../app/shared/carried/carried-general/carried-general.component';

// ViewRevistion
import { ViewRevistionComponent } from '../app/shared/components/view-revistion/view-revistion.component';
import { ViewRevistionAddmoreComponent } from '../app/shared/components/view-revistion-addmore/view-revistion-addmore.component';
import { ViewRevistionReturnComponent } from '../app/shared/components/view-revistion-return/view-revistion-return.component';
import { ViewRevistionPoolComponent } from '../app/shared/components/view-revistion-pool/view-revistion-pool.component';
import { ViewRevitionAddmorePoolComponent } from '../app/shared/components/view-revition-addmore-pool/view-revition-addmore-pool.component';
import { AddmoreStatusComponent } from '../app/shared/addmore/addmore-status/addmore-status.component'
import { NowdatetimeComponent } from '@pages/nowDateTime/nowdatetime/nowdatetime.component';
import { AddmorePoolComponent } from '../app/shared/components/addmore-pool/addmore-pool.component';

import { FormComponent } from './pages/initiatives/form/form.component'
import { MainFormComponent } from '@pages/main-form/main-form.component';
import { KpiKriDetailComponent } from './shared/form-component/kpi-kri-detail/kpi-kri-detail.component';
import { DetailCpiFormComponent } from './shared/form-component/detail-cpi-form/detail-cpi-form.component';
import { MainViewComponent } from '@pages/main-view/main-view.component';
import { KpiKriMaintainComponent } from './shared/form-component/kpi-kri-maintain/kpi-kri-maintain.component';
import { ProgressMilestone1Component } from './shared/form-component/progress-milestone1/progress-milestone1.component';
import { ProgressMilestone2Component } from './shared/form-component/progress-milestone2/progress-milestone2.component';
import { BscInformationComponent } from './shared/form-component/bsc-information/bsc-information.component';
import { MaintainComponent } from '@components/maintain/maintain.component';
import { PermissionComponent } from '@pages/permission/permission.component';
import { SettingComponentComponent } from '@pages/setting-component/setting-component.component';
import { CreatePermissionComponent } from '@pages/permission-manager/create-permission/create-permission.component';
import { ManagePermissionComponent } from '@pages/permission-manager/manage-permission/manage-permission.component';
import { InitiativeHistoryComponent } from '@components/initiative-history/initiative-history.component';
import { InitiativeHistoryRedirectorComponent } from '@components/initiative-history-redirector/initiative-history-redirector.component';
import { BestPracticeFormComponent } from './shared/form-component/best-practice-form/best-practice-form.component';
import { UserManagerComponent } from './pages/role/user-manager/user-manager.component';
import { RoleListComponent } from './pages/role/role-list/role-list.component';
import { RoleCreateComponent } from './pages/role/role-create/role-create.component';
import { RoleManagerComponent } from './pages/role/role-manager/role-manager.component';
import { UserListComponent } from './pages/role/user-list/user-list.component';
import { VacPicComponent } from '@pages/vac-pic/vac-pic.component';
import { VacManagerDetailComponent } from '@components/vac-manager-detail/vac-manager-detail.component';
import { PicManagerDetailComponent } from '@components/pic-manager-detail/pic-manager-detail.component';
import { InitiativeGenerateAppWbsComponent } from '@components/initiative-generate-app-wbs/initiative-generate-app-wbs.component';
import { EmailNotificationComponent } from '@pages/email-notification/email-notification.component';
import { MainResolver } from '@resolvers/main.resolver';
import { ViewRevisionCapexComponent } from './shared/form-component/view-revision-capex/view-revision-capex.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: HomeComponent , canActivate: [MsalGuard]},

      { path: 'user/edit/:id', component: UserManagerComponent },
      { path: 'role/list', component: RoleListComponent },
      { path: 'role/create', component: RoleManagerComponent },
      { path: 'role/edit/:id', component: RoleManagerComponent },
      { path: 'user/list', component: UserListComponent },

      { path: 'nowdatetime', component: NowdatetimeComponent },
      { path: 'outstanding', component: OutStandingFormComponent },
      { path: 'setting', component: SettingComponentComponent },
      { path: 'maintain', component: MaintainComponent },
      { path: 'inactive-email', component: EmailNotificationComponent },
      { path: 'performance-inactive', component: PerformanceInactiveComponent },
      {
        path: 'permission', component: PermissionComponent,
        children: [
          { path: 'create', component: CreatePermissionComponent },
          { path: 'edit/:id', component: ManagePermissionComponent }
        ]
      },
      {
        path: 'vac-manager',
        data: { title: 'vac' },
        children: [
          { path: '', component: VacPicComponent },
          {
            path: 'vac-detail/:id', component: VacManagerDetailComponent,
            data: { flag: 'Edit' }
          },
          {
            path: 'vac-create', component: VacManagerDetailComponent,
            data: { flag: 'New' }
          }
        ]
      },
      {
        path: 'pic-manager',
        data: { title: 'pic' },
        children: [
          { path: '', component: VacPicComponent },
          {
            path: 'pic-detail/:id', component: PicManagerDetailComponent,
            data: { flag: 'Edit' }
          },
          {
            path: 'pic-create', component: PicManagerDetailComponent,
            data: { flag: 'New' }
          }
        ]
      },
      {
        path: 'initiative', component: MainInitiativeComponent, canActivate: [MsalGuard],
        children: [
          { path: 'createInitiative', component: CreateInitiativeComponent },
          { path: 'editInitiative', component: EditInitiativeComponent },
          { path: 'my-tasks', component: MytaskInitiativeComponent, resolve: { initiatives: MyTaskResolver } },
          { path: 'my-own', component: MyownInitiativeComponent, resolve: { initiatives: MyOwnResolver } },
          { path: 'overview', component: OverviewInitiativeComponent, resolve: { initiatives: OverviewResolver } },
          { path: 'create', component: MainFormComponent, resolve: { initiatives: MainResolver }, data: { page: 'create' } },
          { path: 'edit', component: MainFormComponent, data: { page: 'edit' } },
          { path: 'approve', component: ApproveInitiativeComponent },
          { path: 'information', component: MainViewComponent },
          { path: 'status', component: StatusComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'bar-chartjs', component: BarChartjsComponent },
          { path: 'stacked-chartjs', component: StackedChartjsComponent },
          { path: 'line-chartjs', component: LineChartjsComponent },
          { path: 'donut-chartjs', component: DonutChartjsComponent },
          { path: 'pie-chartjs', component: PieChartjsComponent },
          { path: 'table-chart', component: TableChartComponent },
          { path: 'combo-chartjs', component: ComboChartjsComponent },
          { path: 'reporttest01', component: Reporttest01Component },
          { path: 'custom-table', component: CustomTableComponent },
          { path: 'reporttest01', component: Reporttest01Component },
          { path: 'addmore', component: AddmoreComponent },
          { path: 'addmore-capex', component: AddmoreCapexComponent },
          { path: 'addmore-direct-capex', component: AddmoreDirectCapexComponent },
          { path: 'initiativeredirector', component: InitiativeredirectorComponent },
          { path: 'return', component: ReturnComponent },
          { path: 'return-general', component: ReturnGeneralComponent },
          { path: 'return-capex', component: ReturnCapexComponent },
          { path: 'dashboard-builtin', component: DashboardSystemComponent },
          { path: 'view-revistion', component: ViewRevisionCapexComponent },
          { path: 'view-revistion-addmore', component: ViewRevistionAddmoreComponent },
          { path: 'view-revistion-return', component: ViewRevistionReturnComponent },
          { path: 'carried', component: CarreidComponent },
          { path: 'carried-capex', component: CarriedCapexComponent },
          { path: 'dim', component: DimComponent },
          { path: 'pool-create', component: PoolMainFormComponent, data: { flag: 'Create' } },
          { path: 'pool-edit', component: PoolMainFormComponent, data: { flag: 'Edit' } },
          { path: 'pool-view', component: PoolMainFormComponent, data: { flag: 'View' } },
          { path: 'addmore-pool', component: AddmorePoolComponent },
          { path: 'view-revistion-pool', component: ViewRevistionPoolComponent },
          { path: 'view-revistion-addmore-pool', component: ViewRevitionAddmorePoolComponent },
          { path: 'addmore-status', component: AddmoreStatusComponent },
          { path: 'kpi', component: KpiKriDetailComponent },
          { path: 'kpi-maintain', component: KpiKriMaintainComponent },
          { path: 'cpi', component: DetailCpiFormComponent },
          { path: 'progress-milestone1', component: ProgressMilestone1Component },
          { path: 'progress-milestone2', component: ProgressMilestone2Component },
          { path: 'bsc-information', component: BscInformationComponent },
          { path: 'initiative-status-history', component: InitiativeHistoryComponent },
          { path: 'initiative-history-redirector', component: InitiativeHistoryRedirectorComponent },
          { path: 'best-practise', component: BestPracticeFormComponent },
          { path: 'generateappwbs', component: InitiativeGenerateAppWbsComponent },
          { path: 'create-survey', component: MainFormComponent, resolve: { initiatives: MainResolver }, data: { page: 'create-survey' } },

          // test pim
          { path: 'pim', component: FormComponent }

        ]
      },
      { path: '**', component: PageNotFoundComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const RouterComponents = [
  // Templates
  MainComponent,
  // Layouts
  HeaderComponent,
  FooterComponent,
  // Components
  InformationTabsComponent,
  InvestmentModalComponent,
  InitiativeHeaderComponent,
  AdvanceSearchComponent,
  InitiativeSearchComponent,
  InitiativeLoadComponent,
  InitiativeListComponent,
  InitiativeNoDataComponent,
  InitiativeBoxComponent,
  InitiativeAttachmentComponent,
  InitiativeInformationComponent,
  InformationSubmitComponent,
  InitiativeFileComponent,
  ImpactExcelComponent,
  ViewLogHistoryComponent,
  InitiativeValidateComponent,
  LogCommentComponent,
  AddmoreDirectCapexComponent,
  HistoryStatusComponent,
  ContactIoComponent,
  AddmoreButtonComponent,
  // Page
  HomeComponent,
  MainInitiativeComponent,
  MytaskInitiativeComponent,
  MyownInitiativeComponent,
  OverviewInitiativeComponent,
  CreateInitiativeComponent,
  EditInitiativeComponent,
  ApproveInitiativeComponent,
  InformationComponent,
  StatusComponent,
  DimComponent,
  ProgressMilestone1Component,
  ProgressMilestone2Component,
  InitiativeHistoryComponent,

  // Chart
  InitiativeAttachmentComponent,
  BarChartjsComponent,
  LineChartjsComponent,
  PieChartjsComponent,
  StackedChartjsComponent,
  DonutChartjsComponent,
  TableChartComponent,
  ComboChartjsComponent,
  AddmoreCapexComponent,
  AddmoreComponent,
  CustomTableComponent,
  // NotFound
  PageNotFoundComponent,
  DashboardComponent,
  DashboardListComponent,
  DashboardSearchComponent,
  DashboardFormsComponent,
  Reporttest01Component,
  InitiativeredirectorComponent,
  DashboardSystemComponent,
  NowdatetimeComponent,
];

export const Resolver = [
  MyTaskResolver,
  MyOwnResolver,
  OverviewResolver,
  MainResolver
];
