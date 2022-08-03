import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl, RequiredValidator } from '@angular/forms';
import { CustomreportService } from '@services/customreport/customreport.service';
import { SwalTool } from '@tools/swal.tools';
import { RouterLink, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '@services/authentication/auth.service';
import { DuplicateReport } from '@models/DuplicateReport';
import { ParamDropdown } from '@models/ParamDropdown';
import { ItemDropdown } from '@models/ItemDropdownReport';
import Swal, { SweetAlertResult } from 'sweetalert2/dist/sweetalert2.js';
import { PermissionService } from '@services/permission/permission.service';
import { RolePermissionModel } from '@models/RolePermissionModel';
declare var require: any;
@Component({
  selector: 'app-dashboard-forms',
  templateUrl: './dashboard-forms.component.html',
  styleUrls: ['./dashboard-forms.component.css']
})
export class DashboardFormsComponent implements OnInit {



  @Input() typeOpen: string;
  @Input() reportID: any = null;
  @Output() thisModalClose = new EventEmitter();

  isSaved = false;
  @Input() dataCustomReportMerge: any = null;

  reportTypeToDisableDDL: any = ['cash-in'];

  username: any;

  reportTypeToDisabled: any = [];
  isCapexExcel_Powerpoint: boolean;

  systemReportType: any = '';
  isBuiltinReport: boolean;

  isAdminMAX = false;

  canRemoveFieldY = false;
  canAddFieldY = true;
  canRemoveParam = false;
  canAddParam = true;
  isSaveAndView = false;
  isSubmitted = false;

  isShowXAxis = true;
  isShowYAxis = true;
  isShowParam = true;
  isShowTableParam = true;

  isPageShowXAxis = true;
  isPageShowYAxis = true;
  isPageShowXAxisLabel = true;
  isPageShowYAxisLabel = true;
  isPageShowStageType = true;
  isPageShowAccumulate = true;
  isPageShowAggregate = true;

  limitYAxis: number = 130;
  limitParam: number = 30;

  dropdownYValue: any;

  headerForm = this.fb.group({
    reportID: this.reportID,
    reportCode: [null],
    reportName: [null, Validators.required],
    graphType: [null, Validators.required],
    description: [null],
    x_AxisLabel: [null, Validators.required],
    y_AxisLabel: [null, Validators.required],
    otherTypeLabel: [null],
    createUser: [null],
    createDate: [null],
    updateUser: [null],
    updateDate: [null],
    stageType: [null, Validators.required],
    isAccumulate: false,
  });

  detailXForm = this.fb.group({
    reportID: { value: this.reportID, hidden: true },
    fieldName: [null, Validators.required],
    aggregateFunction: [null],
    axis: "X",
    sequence: 1,
    colorCode: [null],
  })

  detailYForm = this.fb.array([]);

  paramForm = this.fb.array([]);

  paramsDDL: ItemDropdown[][] = [];
  // ddlFieldXList = {
  //   "Stage IL0-IL4": [
  //     "CLevel",
  //     "TargetToIL4_Week"
  //   ],
  //   "Stage IL4-IL5": [
  //     "CLevel",
  //     "TargetToIL5_Week"
  //   ]
  // }

  // ddlFieldYList = {
  //   "Stage IL0-IL4": [
  //     "IL0Benefit_IL0",
  //     "IL1Benefit_IL1",
  //     "IL1Benefit_SIL1",
  //     "IL2Benefit_IL2",
  //     "IL2Benefit_SIL2",
  //     "IL3Benefit_IL3",
  //     "IL3Benefit_SIL3",
  //     "IL4Benefit_IL4",
  //     "IL4Benefit_SIL4",
  //   ],
  //   "Stage IL4-IL5": [
  //     "IL4Benefit_IL4_Converted",
  //     "IL4Benefit_SIL4_Converted",
  //     "IL5Benefit_IL5",
  //     "IL5Benefit_SIL5"
  //   ]
  // }

  ddlAggregateFunction = [
    "",
    "SUM",
    "COUNT",
  ];

  ddlFilterCondition: any = [
    "=",
    "<>",
    "IN",
    "NOT IN",
    ">",
    "<",
    "<=",
    ">=",
  ];

  ddlParamField: any = [];
  ddlStageType: any = [];


  ddlGraphType: any = [];

  ddlXAxis: any = [];

  ddlYAxis: any = [];
  userPermission: RolePermissionModel[];
  public permissionServiceStaticVar = PermissionService;

  constructor(
    private fb: FormBuilder,
    private customrReportService: CustomreportService,
    private swalTool: SwalTool,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    public permissionService: PermissionService
  ) {
    this.userPermission = JSON.parse(sessionStorage.getItem(PermissionService.USER_PERMISSION_KEY));
  }





  ngOnInit(): void {
    this.GetUser();
    this.spinner.hide();
    this.setForm();
  }

  GetUser() {
    this.authService.getMsalUser().subscribe((user) => {
      this.username = user.mail;
    });
  }

  resetForm() {
    this.headerForm.reset();
    this.detailXForm.reset();
    this.detailYForm.reset();
    this.paramForm.reset()
  }


  InitialPageShowElement() {
    this.isPageShowXAxis = true;
    this.isPageShowYAxis = true;
    this.isPageShowXAxisLabel = true;
    this.isPageShowYAxisLabel = true;
    this.isPageShowStageType = true;
    this.isPageShowAccumulate = true;
    this.isPageShowAggregate = true;
  }

  setForm() {
    this.resetForm();

    this.GetReportType();
    this.GetStageType();

    if (this.typeOpen == 'create') {
      this.reportID = null;
      this.ChangeStage();
      this.AddFieldY(); //initial Field Y 1 row
      this.AddParam(); //initial Param 1 row
    } else if (this.typeOpen == 'edit') {
      this.GetReport(this.reportID);
    }

  }

  SetEditForm() {
    this.PatchValueHeader();
    this.ChangeStage();
    this.InitialEditForm();
    this.SetValidatorsByFlag();
    this.PatchValueHeader();
    this.PatchValueXAxis();
    this.PatchValueYAxis();
    this.PatchValueParam();

    if (this.isPageShowYAxis == false) {
      this.SetValidatorsByFlag();         //if case no Y Axis , no stage, only param
    }
  }


  InitialEditForm() {
    switch (this.headerForm.value.graphType) {
      case "CustomExcel": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CustomTable": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CapexReportByCompany": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "NewCapexReport": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "BGSlide": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "Cash-In": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }

      case "UFDD": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "Pie": {
        this.InitialPageShowElement();
        this.isPageShowXAxis = true;
        this.isPageShowXAxisLabel = true;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "Donut": {
        this.InitialPageShowElement();
        this.isPageShowXAxis = true;
        this.isPageShowXAxisLabel = true;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "Table": {
        this.isPageShowXAxis = true;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = true;
        this.isPageShowAccumulate = true;
        this.isPageShowAggregate = true;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "ApproverDashboardExcel": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "ApproverDashboardTable": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CAPEXReportGroupByandCompanyType": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CAPEXSummaryReportbyCompany": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CAPEXProjectApproved": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CAPEXAllProjectsSubmittedInPeriod": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CAPEXDepreciationForNewProjectReport": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CAPEXNewCapexGcGroupByProjectType": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CAPEXReportRequestPool": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CAPEXReportUsedPool": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CAPEXProjectDetail": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "GraphHistoricalIL5": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "GraphHistoricalIL5_COE": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "GraphHistoricalIL5_SEVP-D": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "GraphHistoricalIL5_SEVP-U/MCS": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "GraphHistoricalIL4": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "GraphHistoricalIL4_COE": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "GraphHistoricalIL4_SEVP-D": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "GraphHistoricalIL4_SEVP-U/MCS": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CustomExcelCIM": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CustomExcelPIM": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CustomExcelDIM": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CustomExcelCPI": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CustomExcelStrategy": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.SetValidatorsByFlag();
        this.isShowTableParam = true;
        this.isShowParam = true;
        break;
      }
      case "CustomExcelTPX": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = false;
        this.isShowParam = false;
        this.SetValidatorsByFlag();
        break;
      }


      default: {
        this.InitialPageShowElement();
        this.SetValidatorsByFlag();
        break;
      }
    }

    this.GetAllParam(this.headerForm.value.graphType);

    switch (this.headerForm.value.graphType) {
      case "CapexReportByCompany": {
        this.SetValidatorsByFlag();
      }
      case "NewCapexReport": {
        this.SetValidatorsByFlag();
      }
    }
  }

  PatchValueHeader() {
    if (this.dataCustomReportMerge != null) {
      this.headerForm.patchValue(this.dataCustomReportMerge.reportHeader);
    }
  }

  PatchValueXAxis() {
    if (this.dataCustomReportMerge != null) {
      this.detailXForm.patchValue(this.dataCustomReportMerge.reportDetailX);
    }
  }

  PatchValueYAxis() {
    if (this.dataCustomReportMerge != null) {
      for (let i = 0; i < this.dataCustomReportMerge.reportDetailY.length; i++) {
        this.AddFieldY();
        let control = this.detailYForm as FormArray;
        control.controls[i].patchValue(this.dataCustomReportMerge.reportDetailY[i]);
      }
      if (this.dataCustomReportMerge.reportDetailY.length = 0) {
        this.canRemoveFieldY = false;
        this.canAddFieldY = true;
      }
    }
  }
  PatchValueParam() {
    if (this.dataCustomReportMerge != null) {
      for (let i = 0; i < this.dataCustomReportMerge.reportParam.length; i++) {
        this.AddParam();
        let control = this.paramForm as FormArray;
        control.controls[i].patchValue(this.dataCustomReportMerge.reportParam[i]);
        this.GetDropdownItems(i, null, true);
        this.OnFilterConditionChange(i, true);
        this.ConvertDefaultValueToSelectMulti(i);
      }
      if (this.dataCustomReportMerge.reportParam.length = 0) {
        this.canRemoveParam = false;
        this.canAddParam = true;
      }
    }
  }

  InitialFieldY(): FormGroup {
    return this.fb.group({
      reportID: this.reportID,
      fieldName: [null, Validators.required],
      aggregateFunction: "SUM",
      axis: "Y",
      sequence: [null],
      colorCode: [null],
    })
  }

  InitialParam(): FormGroup {
    return this.fb.group({
      reportID: this.reportID,
      sequence: [null],
      parameterName: [null],
      parameterField: [null, Validators.required],
      filterCondition: ["=", Validators.required],
      parameterType: [null],
      required: [null],
      defaultValue: [null],
      defaultValueSelector: [null],
      maxSelectedItems: 1,
      isShowDropdown: false,
    })
  }

  AddParam() {
    const control = this.paramForm as FormArray;
    control.push(this.InitialParam());
    this.canRemoveParam = control.length > 0 ? true : false;
    this.canAddParam = control.length < this.limitParam ? true : false;
  }

  RemoveParam(index: number) {
    const control = this.paramForm as FormArray;
    control.removeAt(index);
    this.detailYForm.markAsDirty();
    this.canRemoveParam = control.length > 0 ? true : false;
    this.canAddParam = control.length < this.limitParam ? true : false;
  }

  AddFieldY() {
    const control = this.detailYForm as FormArray;
    control.push(this.InitialFieldY());
    this.canRemoveFieldY = control.length > 1 ? true : false;
    this.canAddFieldY = control.length < this.limitYAxis ? true : false;
  }

  RemoveFieldY(index: number) {
    const control = this.detailYForm as FormArray;
    control.removeAt(index);
    this.detailYForm.markAsDirty();
    this.canRemoveFieldY = control.length > 1 ? true : false;
    this.canAddFieldY = control.length < this.limitYAxis ? true : false;
  }

  ChangeStage() {
    this.GetXAxis(this.headerForm.value.stageType);
    this.GetYAxis(this.headerForm.value.stageType);
  }

  ChangeXAxis() {
    this.GetYAxis(this.headerForm.value.stageType);
  }

  modalClose() {
    this.resetForm();
    this.thisModalClose.emit(this.isSaved);
    this.isSaved = false;
  }

  OnSaveClick() {
    this.isSubmitted = true;
    if ((this.headerForm.invalid || this.detailXForm.invalid || this.detailYForm.invalid || this.paramForm.invalid)) {

      if (this.isShowTableParam == true) {
        return;
      }

    }

    if (this.typeOpen == "create") {
      this.headerForm.patchValue(
        {
          "createUser": this.username,
          "updateUser": this.username,
        });

      this.customrReportService.CreateReport(this.headerForm.value, this.detailXForm.value, this.detailYForm.value, this.paramForm.value).subscribe(
        result => {
          this.isSaved = true;
          this.swalTool.Success();

          this.headerForm.patchValue(result.reportHeader);
          this.typeOpen = "edit"
          if (this.isSaveAndView) {
            this.ViewGraph();
            this.isSaveAndView = false;
          }
          else {
            this.modalClose();
          }
        },
        err => {
          this.swalTool.Error("Data was not saved. !");
        });
    }
    else if (this.typeOpen == "edit") {
      this.headerForm.patchValue(
        {
          "updateUser": this.username,
        });

      this.customrReportService.UpdateReport(this.headerForm.value, this.detailXForm.value, this.detailYForm.value, this.paramForm.value).subscribe(
        result => {
          this.isSaved = true;
          this.swalTool.Success();

          this.headerForm.patchValue(result.reportHeader);

          if (this.isSaveAndView) {
            this.ViewGraph();
            this.isSaveAndView = false;
          }
          else {
            this.modalClose();
          }
        },
        err => {
          this.swalTool.Error("Data was not saved. !");
        });
    }

  }

  SaveAndView() {
    this.isSaveAndView = true;
    this.OnSaveClick();
  }

  ViewGraph() {

    //window.location.href = 'https://gcinitiative-front-dev.azurewebsites.net/initiative/stacked-chart';
    switch (this.headerForm.value.graphType) {
      case "BarStacked": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "Pie": {
        this.router.navigateByUrl('initiative/pie-chartjs?reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "Donut": {
        this.router.navigateByUrl('initiative/donut-chartjs?reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "Bar": {
        this.router.navigateByUrl('initiative/bar-chartjs?reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "Line": {
        this.router.navigateByUrl('initiative/line-chartjs?reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "Table": {
        this.router.navigateByUrl('initiative/table-chart?reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "ApproverDashboardTable": {
        this.router.navigateByUrl('initiative/custom-table?storeName=sp_ApproverDashboard&reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "CustomTable": {
        this.router.navigateByUrl('initiative/custom-table?storeName=sp_CustomExcel&reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "CustomExcel": {
        this.spinner.show();
        this.customrReportService.GetCustomExcel(this.headerForm.value.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetApproverDashboard(this.headerForm.value.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcelCapex(this.headerForm.value.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcelCapex(this.headerForm.value.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetBGSlide(this.headerForm.value.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.pptx';
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
        this.customrReportService.GetCashIn(this.headerForm.value.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetUFDD(this.headerForm.value.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcelCapex(this.headerForm.value.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcelCapex(this.headerForm.value.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcelCapex(this.headerForm.value.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcelCapex(this.headerForm.value.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcelCapex(this.headerForm.value.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcelCapex(this.headerForm.value.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcelCapex(this.headerForm.value.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcelCapex(this.headerForm.value.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcelCapex(this.headerForm.value.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "GraphHistoricalIL5_COE": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "GraphHistoricalIL5_SEVP-D": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "GraphHistoricalIL5_SEVP-U/MCS": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "GraphHistoricalIL4": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "GraphHistoricalIL4_COE": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "GraphHistoricalIL4_SEVP-D": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + this.headerForm.value.reportID);
        break;
      }
      case "GraphHistoricalIL4_SEVP-U/MCS": {
        this.router.navigateByUrl('initiative/stacked-chartjs?reportid=' + this.headerForm.value.reportID);
        break;
      } case "CustomExcelCIM": {
        this.spinner.show();
        this.customrReportService.GetCustomExcel(this.headerForm.value.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcel(this.headerForm.value.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcel(this.headerForm.value.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcel(this.headerForm.value.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
        this.customrReportService.GetCustomExcel(this.headerForm.value.reportID).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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
      case "CustomExcelTPX": {
        this.spinner.show();
        //this.isShowTableParam = false;
        let storeProcedureName: string = 'sp_CustomExcelTPX';  //sp_CAPEX_ReportGroupByandCompanyType
        this.customrReportService.GetCustomExcelTpx(this.headerForm.value.reportID, storeProcedureName).subscribe((r: any) => {
          if (r.type !== 'text/plain') {
            const blob = new Blob([r]);
            const saveAs = require('file-saver');
            const file = this.headerForm.value.reportName + '.xlsx';
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

      default: {
        //this.swalTool.Error("Graph Type Invalid !.");
        this.router.navigateByUrl('initiative/stacked-chart?reportid=' + this.headerForm.value.reportID);
        break;
      }
    }
  }


  GetReport(id: any) {
    this.customrReportService.GetReport(id).subscribe(
      result => {
        this.dataCustomReportMerge = result;

        this.systemReportType = this.dataCustomReportMerge.reportHeader.systemReportType
        if (this.systemReportType == 'builtin') {

          let accessDetail: RolePermissionModel = this.userPermission.find(x =>
            x.pageId.toLowerCase() === PermissionService.ADMIN_MAX_PAGE_ID
            && x.sectionId.toLowerCase() === "access"
          );

          if (accessDetail?.isEnable) {
            this.isAdminMAX = true;
            this.isBuiltinReport = false
          } else {
            this.isAdminMAX = false;
            this.isBuiltinReport = true;
          }
        } else {
          this.isBuiltinReport = false;
        }
        this.SetEditForm();


        // Comment Disabled All Controls
        if (this.reportTypeToDisabled.includes(this.headerForm.controls.graphType.value)) {
          //this.isCapexExcel_Powerpoint = true;
          // ไม่ต้อง disable ปุ่มแล้ว

          //need disabled button ด้วย
          //this.SetAllDisabled();
        } else {
          this.isCapexExcel_Powerpoint = false;
        }

      }
    );
  }

  get HeaderFormValidator() {
    return this.headerForm.controls;
  }

  get DetailXFormValidator() {
    return this.detailXForm.controls;
  }

  get DetailYFormValidator() {
    return this.detailYForm.controls;
  }

  get ParamFormValidator() {
    return this.paramForm.controls;
  }


  GetStageType() {
    this.customrReportService.GetStageType().subscribe(r => {
      this.ddlStageType = r;
    });
  }

  GetReportType() {
    this.customrReportService.GetReportType().subscribe(r => {
      this.ddlGraphType = r;
    });
  }

  GetXAxis(stageType: any) {
    this.isShowXAxis = false;
    this.customrReportService.GetXAxis(stageType).subscribe(r => {
      this.ddlXAxis = r;
      this.isShowXAxis = true;
    });
  }

  GetYAxis(stageType: any) {
    this.isShowYAxis = false;
    const graphType: string[] = [
      "CustomExcelCIM",
      "CustomExcelPIM",
      "CustomExcelDIM",
      "CustomExcelCPI",
      "CustomExcelStrategy",
      "CustomExcelTPX"
    ]
    switch (stageType) {
      case null: {
        //query by report type
        this.customrReportService.GetCustomYAxis(this.headerForm.value.graphType).subscribe(r => {
          console.log(r)
          const list: {
            name: string;
            reportType: string;
            value: string;
          }[] = r;
          if (graphType.indexOf(this.headerForm.value.graphType) >= 0) {
            const defaultParam: {
              name: string;
              reportType: string;
              value: string;
            } = {
              name: "*",
              reportType: graphType[graphType.indexOf(this.headerForm.value.graphType)],
              value: "defaultParam"
            }
            list.unshift(defaultParam);
          }
          this.ddlYAxis = this.FilterYAxis(list);
          this.isShowYAxis = true;
        });
        break;
      }
      default: {
        this.customrReportService.GetYAxis(stageType).subscribe(r => {
          this.ddlYAxis = this.FilterYAxis(r);
          this.isShowYAxis = true;
        });
        break;
      }
    }

  }

  FilterYAxis(data) {
    var returnData = data;
    if (this.CheckIsNullOrUndefined(this.detailXForm.get('fieldName').value) == false)
      return data;

    if (this.detailXForm.get('fieldName').value.toLowerCase().includes('workstream')) {

      for (let i = 0; i < this.detailYForm.length; i++) {
        let control = this.detailYForm as FormArray;
        let detailFormGroup = control.controls[i] as FormGroup;

        if (this.CheckIsNullOrUndefined(detailFormGroup.get('fieldName').value))
          if (detailFormGroup.get('fieldName').value.toLowerCase().includes('target'))
            detailFormGroup.patchValue({ fieldName: null });
      }

      returnData = returnData.filter(i => !i.value.toLowerCase().includes('target'));
    }

    if (this.detailXForm.get('fieldName').value.toLowerCase().includes('week') == false) { //not week on x axis then remove bankable value

      for (let i = 0; i < this.detailYForm.length; i++) {
        let control = this.detailYForm as FormArray;
        let detailFormGroup = control.controls[i] as FormGroup;

        if (this.CheckIsNullOrUndefined(detailFormGroup.get('fieldName').value))
          if (detailFormGroup.get('fieldName').value.toLowerCase().includes('blankable') || detailFormGroup.get('fieldName').value.toLowerCase().includes('bankable'))
            detailFormGroup.patchValue({ fieldName: null });
      }

      returnData = returnData.filter(i => !i.value.toLowerCase().includes('blankable') && !i.value.toLowerCase().includes('bankable'));
    }

    return returnData;
  }

  CheckIsNullOrUndefined(data: any) {
    return (data != null && data != undefined);
  }

  GetAllParam(reportType: any) {
    this.isShowParam = false;
    this.customrReportService.GetAllParam(reportType).subscribe(r => {
      this.ddlParamField = r;
      this.isShowParam = true;
    });
  }


  ChangeReportType() {
    switch (this.headerForm.value.graphType) {
      case "CustomExcel": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CustomTable": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CapexReportByCompany": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "NewCapexReport": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "BGSlide": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "Cash-In": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "UFDD": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "Pie": {
        this.InitialPageShowElement();
        this.isPageShowXAxis = true;
        this.isPageShowXAxisLabel = true;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "Donut": {
        this.InitialPageShowElement();
        this.isPageShowXAxis = true;
        this.isPageShowXAxisLabel = true;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "Table": {
        this.isPageShowXAxis = true;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = true;
        this.isPageShowAccumulate = true;
        this.isPageShowAggregate = true;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "ApproverDashboardExcel": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "ApproverDashboardTable": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CAPEXReportGroupByandCompanyType": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CAPEXSummaryReportbyCompany": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CAPEXProjectApproved": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CAPEXAllProjectsSubmittedInPeriod": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CAPEXDepreciationForNewProjectReport": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CAPEXNewCapexGcGroupByProjectType": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CAPEXReportRequestPool": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CAPEXReportUsedPool": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CAPEXProjectDetail": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "GraphHistoricalIL5": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "GraphHistoricalIL5_COE": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "GraphHistoricalIL5_SEVP-D": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "GraphHistoricalIL5_SEVP-U/MCS": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "GraphHistoricalIL4": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "GraphHistoricalIL4_COE": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "GraphHistoricalIL4_SEVP-D": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "GraphHistoricalIL4_SEVP-U/MCS": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CustomExcelCIM": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CustomExcelPIM": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CustomExcelDIM": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CustomExcelCPI": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CustomExcelStrategy": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = true;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = true;
        this.isShowParam = true;
        this.SetValidatorsByFlag();
        break;
      }
      case "CustomExcelTPX": {
        this.isPageShowXAxis = false;
        this.isPageShowYAxis = false;
        this.isPageShowXAxisLabel = false;
        this.isPageShowYAxisLabel = false;
        this.isPageShowStageType = false;
        this.isPageShowAccumulate = false;
        this.isPageShowAggregate = false;
        this.isShowTableParam = false;
        this.isShowParam = false;
        //this.SetValidatorsByFlag();

        break;
      }

      default: {
        this.InitialPageShowElement();
        this.SetValidatorsByFlag();
        break;
      }
    }

    this.GetYAxis(this.headerForm.value.stageType);
    this.GetAllParam(this.headerForm.value.graphType);
  }

  SetValidatorsByFlag() {
    this.SetValidator(this.headerForm, "x_AxisLabel", this.isPageShowXAxisLabel);
    this.SetValidator(this.headerForm, "y_AxisLabel", this.isPageShowYAxisLabel);
    this.SetValidator(this.headerForm, "stageType", this.isPageShowStageType);
    this.SetValidator(this.detailXForm, "fieldName", this.isPageShowXAxis);

    for (let i = 0; i < this.detailYForm.length; i++) {
      let control = this.detailYForm as FormArray;
      let detailFormGroup = control.controls[i] as FormGroup;
      this.SetValidator(detailFormGroup, "fieldName", this.isPageShowYAxis);
    }
  }

  SetValidator(formName: FormGroup, fieldName: string, isRequired: boolean) {

    if (isRequired) {
      formName.controls[fieldName].setValidators(Validators.required)
      formName.controls[fieldName].markAsPristine();
    }
    else {
      formName.controls[fieldName].clearValidators();
      formName.controls[fieldName].reset();
    }

    formName.controls[fieldName].updateValueAndValidity();
  }




  SetAllDisabled() {
    this.headerForm.disable();
    this.detailXForm.disable();

    for (let i = 0; i < this.detailYForm.length; i++) {
      let control = this.detailYForm as FormArray;
      let detailFormGroup = control.controls[i] as FormGroup;
      detailFormGroup.disable();
    }

    for (let i = 0; i < this.paramForm.length; i++) {
      let control = this.paramForm as FormArray;
      let detailFormGroup = control.controls[i] as FormGroup;
      detailFormGroup.disable();
    }
  }

  DisabledReportType(reportType: string) {
    if (this.CheckIsNullOrUndefined(reportType))
      return this.reportTypeToDisableDDL.indexOf(reportType.toLowerCase()) !== -1 ? true : false;

    return false;
  }

  async DuplicateReport() {

    const duplicateReport: DuplicateReport = { submittedBy: this.username };
    let resultSwal: SweetAlertResult<string>;

    await Swal.fire<string>({
      title: 'Input email address',
      input: 'email',
      inputPlaceholder: 'Enter email address Or Leave it empty',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve, reject) => {
          if (value === '') {
            resolve('');
          } else if (!this.ValidateEmail(value)) {
            resolve('Invalid Email');
          }
          else {
            resolve('');
          }
        })
      }
    }).then(result => {
      resultSwal = result;
    });


    if (!resultSwal.isConfirmed) {
      return;
    }

    if (!resultSwal.value || resultSwal.value === '') {
      duplicateReport.submittedBy = this.username;
    }
    else {
      duplicateReport.submittedBy = resultSwal.value;
    }


    this.swalTool.Duplicating();

    this.customrReportService.DuplicateReport(this.headerForm.get('reportID').value, duplicateReport).subscribe(r => {
      if (r) {
        this.isSaved = true;
        this.swalTool.DuplicateReportSuccess();
      } else {
        this.swalTool.Error("Duplicate report failed.")
      }

    },
      err => {
        this.swalTool.Error("Duplicate report failed.");
      }
    );
  }

  GetDropdownItems(paramId: number, searchText?: any, isOninit?: boolean) {

    if (isOninit != true) {
      this.paramForm.controls[paramId].patchValue({ defaultValue: null });
      this.paramForm.controls[paramId].patchValue({ defaultValueSelector: null });
    }

    let paramDropdown: ParamDropdown = { fieldName: '', searchText: '' };
    let fileName: string = this.paramForm.controls[paramId]?.get('parameterField').value;
    paramDropdown.fieldName = fileName ? fileName.trim() : '';

    if (searchText)
      paramDropdown.searchText = searchText ? searchText : null;

    this.customrReportService.GetDropdownData(paramDropdown).subscribe(
      response => {
        this.paramsDDL[paramId] = response;
        this.paramForm.controls[paramId].patchValue({ isShowDropdown: response.length > 0 ? true : false });
      },
      err => {
        this.paramsDDL[paramId] = null;
        this.paramForm.controls[paramId].patchValue({ isShowDropdown: false });
      }
    );
  }

  RemoveItem(paramId: number) {
    this.GetDropdownItems(paramId);
  }

  SearchDropdownItems(paramId: number, event: any) {
    this.GetDropdownItems(paramId, event.term);
  }

  ItemChange(paramId: number) {
    //[maxSelectedItems]

    this.paramForm.controls[paramId].patchValue({ defaultValue: this.ParamValueEncoding(this.paramForm.controls[paramId].get('defaultValueSelector').value)?.join(',') });
  }

  OnFilterConditionChange(paramId: number, isOninit?: boolean) {

    if (isOninit != true) {
      this.paramForm.controls[paramId].patchValue({ defaultValue: null });
      this.paramForm.controls[paramId].patchValue({ defaultValueSelector: null });
    }

    switch (this.paramForm.controls[paramId].get('filterCondition').value) {
      case "=": {
        this.paramForm.controls[paramId].patchValue({ maxSelectedItems: 1 });
        break;
      }
      case "IN": {
        this.paramForm.controls[paramId].patchValue({ maxSelectedItems: 999 });
        break;
      }
      case "NOT IN": {
        this.paramForm.controls[paramId].patchValue({ maxSelectedItems: 999 });
        break;
      }
      default: {
        this.paramForm.controls[paramId].patchValue({ maxSelectedItems: 1 });
        break;
      }
    }
  }

  ConvertDefaultValueToSelectMulti(paramId: number) {
    this.paramForm.controls[paramId].patchValue({ defaultValueSelector: this.ParamValueDecoding(this.paramForm.controls[paramId].get('defaultValue').value?.split(',')) });
  }

  ParamValueEncoding(textToEncode: string[]) {
    return textToEncode?.map(x => x == null ? '' : x.replace(/,/g, '<comma>'));
  }

  ParamValueDecoding(textToDecode: string[]) {
    return textToDecode?.map(x => x == null ? '' : x.replace(/\<comma\>/g, ','));
  }

  CheckIsDupYAxis(dropdownValue: any) {

    let formarray = this.detailYForm as FormArray;
    this.dropdownYValue = formarray?.value;
    return this.dropdownYValue?.filter(i => i.fieldName == dropdownValue)?.length > 0 ? true : false;
    // console.log(this.dropdownYValue)
    // this.dropdownYValue.filter(i=>i.)
  }

  shiftUpAtion(index: number) {
    let formArray = this.detailYForm as FormArray;
    let data = formArray?.at(index)?.value;
    let dataNext = formArray?.at(index - 1)?.value;

    formArray?.at(index)?.patchValue(dataNext);
    formArray?.at(index - 1)?.patchValue(data);
  }

  shiftDownAction(index: number) {
    let formArray = this.detailYForm as FormArray;
    let data = formArray?.at(index)?.value;
    let dataNext = formArray?.at(index + 1)?.value;

    formArray?.at(index)?.patchValue(dataNext);
    formArray?.at(index + 1)?.patchValue(data);
  }

  isDisableUpAction(index: number) {
    let formArray = this.detailYForm as FormArray;

    if (formArray?.length == 1) {
      return true;
    }

    if (index == 0) {
      return true;
    }

    return false;
  }

  isDisableDownAction(index: number) {
    let formArray = this.detailYForm as FormArray;

    if (formArray?.length == 1) {
      return true;
    }

    if (index == formArray?.length - 1) {
      return true;
    }

    return false;
  }

  ValidateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
