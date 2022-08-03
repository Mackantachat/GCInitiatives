import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from '@services/authentication/auth.service';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { SwalTool } from '@tools/swal.tools';
import { DateUtil } from '@utils/date.utils';
import { ResponseService } from '@errors/response/response.service';
import { ImpactService } from '@services/impact/impact.service';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { SubmitService } from '@services/submit/submit.service';
import { ItBudgetService } from '@services/it-budget/it-budget.service';
import { StageService } from '@services/stage/stage.service';
import { CompanyList } from '@models/companyList';
import { CompamyService } from '@services/company/compamy.service';
import { InitiativeAttachmentComponent } from '@components/initiative-attachment/initiative-attachment.component';

@Component({
  selector: 'app-dim',
  templateUrl: './dim.component.html',
  styleUrls: ['./dim.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DimComponent implements OnInit {

  //@ViewChild('AttachmentModal', { static: false }) AttachmentModal: ModalDirective;

  @ViewChild('ViewLogHistoryModal', { static: false }) ViewLogHistoryModal: ModalDirective;

  @ViewChild('HistoryStatus', { static: false }) HistoryStatus: ModalDirective;

  constructor(
    private stageService: StageService,
    private itBudgetService: ItBudgetService,
    private submitService: SubmitService,
    private impactService: ImpactService,
    private fb: FormBuilder,
    private initiativeService: InitiativeService,
    private authService: AuthService,
    private unauthorized: UnauthorizedService,
    private swalTool: SwalTool,
    private dateUtil: DateUtil,
    private response: ResponseService,
    private companyService: CompamyService,
    private modalService: BsModalService,
  ) { }

  name: string;

  id: number;
  page: string;

  IsOtherCompany: boolean;
  IsOtherPlant: boolean;

  initiativesForm = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    year: [new Date().getFullYear() + 1, Validators.required],
    ownerName: [null, Validators.required],
    organization: [null, Validators.required],
    company: [null, Validators.required],
    specifyCompany: '',
    coDeveloper: [null],
    integration: '',
    plant: [null, Validators.required],
    specifyPlant: '',
    location: ['domestic'],
    specifyLocation: null,
    registeringDate: [new Date(), Validators.required],
    startingDate: [new Date(), Validators.required],
    finishingDate: [null, Validators.required],
    background: ['', Validators.required],
    resultObjective: ['', Validators.required],
    scopeOfWork: ['', Validators.required],
    initiativeType: 'IT',
    involveItDigital: false,
    requestProjectEngineer: false,
    costEstCapex: null,
    costEstCapexType: ['THB'],
    costEstOpex: null,
    costEstOpexType: ['THB'],
    typeBenefit: '',
    benefitAmount: null,
    benefitAmountType: ['THB'],
    payBackPeriod: null,
    createdBy: '',
    updatedBy: '',
    itDigital: null
  });

  DimForm = this.fb.group({
    id: null,
    type: null,
    capexNo: { value: '', disabled: true },
    capexSummary: { value: '', disabled: true },
    capexSummary1: { value: '', disabled: true },
    capexSummary2: { value: '', disabled: true },
    capexSummary3: { value: '', disabled: true },
    advancedCapexChoice: { value: '', disabled: true },
    opexNo: 'software',
    opexSummary: '',
    capexHardware: null,
    opexSoftware: null,
    hardware: this.fb.group({ capexHardware: this.fb.array([]) }),
    software: this.fb.group({ opexSoftware: this.fb.array([]) }),
    T0001: { value: '', disabled: true },
    T0002: { value: '', disabled: true },
    T0003: { value: '', disabled: true },
    T0004: { value: '', disabled: true },
    T0005: { value: '', disabled: true },
    T0006: { value: '', disabled: true },
    CH0001: null,
    CH0002: null,
    CH0003: null,
    CH0004: null,
    CH0005: null,
    CH0006: null,
    Law: null,
    Impact: null,
    Effective: null
  });

  CapexBudgetSurvey = this.fb.group({ budgetSurvey: this.fb.array([]) });

  bsConfigStart = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  bsConfigFinish = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false, minDate: new Date() };

  uploader: FileUploader;
  hasBaseDropZoneOver = false;

  params: any = {};

  username: string;
  ownerEmail: string;

  status = 'draft';
  stage: string;

  plants: any = [];
  organizations: any = [];
  coDevelopers: any = [];
  owners: any = [];
  years: any = [];
  companyName: any = [];

  coDeveloperSelected: any = [];
  coDeveloperItems = [];

  isDisabledSubmit = false;
  isDisabledDraft = false;
  DisabledSubmit = false;
  type: string;

  IsCim: boolean;
  IsPim: boolean;
  IsDim: boolean;
  IsCapex: boolean;
  IsMax: boolean;
  IsCpi: boolean;
  IsRandD: boolean;
  IsStrategy: boolean;
  IsOther: boolean;

  isLoadSuggest = false;

  showLocation = false;
  showSpecify = false;
  showBenefit = false;
  showSoftware = false;
  showProject = false;

  isRemoveCapexForm = false;
  isRemoveOpexForm = false;

  isDisableCapex = true;
  isDisableOpex = true;

  IsShowCompany = false;
  IsShowPlant = false;
  offSet = true;

  condition: object;

  replace: string;
  obsolate: string;
  dateRegister: string;
  dateStart: string;
  dateFinish: string;
  dateRegisterDisplay: string;
  dateStartDisplay: string;
  dateFinishDisplay: string;

  initiativeCode: string;

  attachments: any = [];
  file: any = [];
  selectListCoDeveloper: any = [];

  admin: any = [];
  admins: any = [];
  userActions: any = [];
  actionUser: string;

  approverList: any = [];

  ITBudget: any = [];

  IdCapex: number;
  IdOpex: number;

  hardware: any = [];
  software: any = [];

  capexHardware: any = [];
  opexSoftware: any = [];

  createdBy: string;

  ItDigital: string;

  Question = true;

  CapexTopic: any = [];

  dateEffective: string;
  dateEffectiveDisplay: string;

  BudgetSurvey: any = [];

  statusTrackings: any = [];
  stages: any = [];
  history: string;
  haveCompany: boolean;

  companyList: CompanyList[];

  bsModalRef: BsModalRef;
  config: ModalOptions = {
    class: 'modal-xl'
  };

  get DimView() {
    return this.page === 'dim-view' || this.page === 'approve';
  }

  get invalidName() {
    return this.initiativesForm.controls.name.touched && this.initiativesForm.controls.name.invalid;
  }

  get invalidOwnerName() {
    return this.initiativesForm.controls.ownerName.touched && this.initiativesForm.controls.ownerName.invalid;
  }

  get invalidOrganization() {
    return this.initiativesForm.controls.organization.touched && this.initiativesForm.controls.organization.invalid;
  }

  get invalidPlant() {
    return this.initiativesForm.controls.plant.touched && this.initiativesForm.controls.plant.invalid;
  }

  get invalidCompany() {
    return this.initiativesForm.controls.company.touched && this.initiativesForm.controls.company.invalid;
  }

  get invalidBackground() {
    return this.initiativesForm.controls.background.touched && this.initiativesForm.controls.background.invalid;
  }

  get invalidResultObjective() {
    return this.initiativesForm.controls.resultObjective.touched && this.initiativesForm.controls.resultObjective.invalid;
  }

  get invalidScopeOfWork() {
    return this.initiativesForm.controls.scopeOfWork.touched && this.initiativesForm.controls.scopeOfWork.invalid;
  }

  get invalidStartingDate() {
    return this.initiativesForm.controls.finishingDate.touched && this.initiativesForm.controls.finishingDate.invalid;
  }

  get invalidCostEstCapex() {
    return this.initiativesForm.controls.costEstCapex.touched && this.initiativesForm.controls.costEstCapex.invalid;
  }

  get invalidCostEstOpex() {
    return this.initiativesForm.controls.costEstOpex.touched && this.initiativesForm.controls.costEstOpex.invalid;
  }

  get CheckValidForm() {
    return this.initiativesForm.valid;
  }

  ngOnInit(): void {
    this.initiativeService.maskUnderline = 'create';
    this.companyList = this.companyService.companyList;
    // if sessionStorage.removeItem('id');
    this.GetUser();
    this.GetYears();
    this.SetRegisterDate();
    this.GetPlants();
    this.GetHardwareList();
    this.GetSoftwareList();
    this.GetOrganizations();
    this.GetCompany();
    this.CheckPage();
    this.SetForm();
    this.GetCapexTopic();
  }

  GetCapexTopic() {
    this.itBudgetService.GetCapexTopic().subscribe(capexTopic => this.CapexTopic = capexTopic);
  }

  ShowAttachment() {
    const overrideConfig = this.config;
    if (this.initiativeService.SubmitDone) {
      return;
    }
    if (this.initiativeService.id) {
      overrideConfig.initialState = { initiativeId: this.initiativeService.id };
      this.modalService.show(InitiativeAttachmentComponent, overrideConfig);
    } else {
      this.swalTool.InitiativeNotFound();
    }
  }

  // CloseAttachment() {
  //   this.AttachmentModal.hide();
  // }

  SetForm() {
    this.DimForm.controls.hardware.disable();
    this.DimForm.controls.software.disable();
  }

  CheckPage() {
    const dim = ['dim-edit', 'dim-view', 'approve'];
    this.page = dim.indexOf(sessionStorage.getItem('page')) !== -1 ? sessionStorage.getItem('page') : 'dim-create';
    switch (this.page) {
      case 'dim-create':
        //sessionStorage.removeItem('id');
        sessionStorage.clear();
        this.name = 'New IT & digital Budget Survey';
        this.AddCapexForm();
        this.AddOpexForm();
        this.AddCapexBudgetSurvey();
        break;
      case 'dim-edit':
        this.name = 'Edit IT & digital Budget Survey';
        this.id = Number(sessionStorage.getItem('id'));
        if (this.id) {
          this.GetInitiative();
          this.AddCapexBudgetSurvey();
          this.GetStatusTracking(this.id);
        }
        break;
      case 'dim-view':
      case 'approve':
      case 'overview-approve':
        this.name = 'IT & digital Budget Survey';
        this.id = Number(sessionStorage.getItem('id'));
        if (this.id) {
          this.GetInitiative();
          this.GetStatusTracking(this.id);
        }
        this.initiativesForm.disable();
        this.DimForm.disable();
        break;
      default:
        sessionStorage.removeItem('id');
        this.name = 'New IT & digital Budget Survey';
        this.AddCapexForm();
        this.AddOpexForm();
        this.AddCapexBudgetSurvey();
        break;
    }
  }

  PatchSetDate() {
    this.initiativesForm.patchValue({
      registeringDate: this.dateRegister ? this.dateRegister : this.dateUtil.SetDate(new Date()),
      startingDate: this.dateStart ? this.dateStart : null,
      finishingDate: this.dateFinish ? this.dateFinish : null,
    });
  }

  PatchGetDate(InitiativesForm) {
    this.dateRegisterDisplay = this.dateUtil.GetDate(new Date(InitiativesForm.registeringDate));
    this.dateStartDisplay = this.dateUtil.GetDate(new Date(InitiativesForm.startingDate));
    this.dateFinishDisplay = InitiativesForm.finishingDate ? this.dateUtil.GetDate(new Date(InitiativesForm.finishingDate)) : null;
    this.initiativesForm.patchValue({
      registeringDate: this.dateRegisterDisplay ? this.dateRegisterDisplay : null,
      startingDate: this.dateStartDisplay ? this.dateStartDisplay : null,
      finishingDate: this.dateFinishDisplay ? this.dateFinishDisplay : null,
    });
  }

  CapexHardwareForm(): FormGroup {
    return this.fb.group({
      assetId: '',
      otherName: { value: null, disabled: true },
      numberOfUnit: { value: '', disabled: true },
      costPerUnit: { value: '', disabled: true },
      totalMTHB: null
    });
  }

  OpexSoftwareForm(): FormGroup {
    return this.fb.group({
      assetId: '',
      otherName: { value: null, disabled: true },
      numberOfUnit: { value: '', disabled: true },
      costPerUnit: { value: '', disabled: true },
      totalMTHB: null
    });
  }

  CapexBudgetSurveyForm(): FormGroup {
    return this.fb.group({
      initiativeId: null,
      topicId: null,
      status: null,
      choiceValue: null,
      law: null,
      impact: null,
      effective: null,
    });
  }

  AddCapexForm() {
    const control = this.DimForm.controls.hardware.get('capexHardware') as FormArray;
    control.push(this.CapexHardwareForm());
    this.isRemoveCapexForm = control.length > 1 ? false : true;
  }

  AddOpexForm() {
    const control = this.DimForm.controls.software.get('opexSoftware') as FormArray;
    control.push(this.OpexSoftwareForm());
    this.isRemoveOpexForm = control.length > 1 ? false : true;
  }

  AddCapexBudgetSurvey() {
    const control = this.CapexBudgetSurvey.get('budgetSurvey') as FormArray;
    for (let index = 1; index <= 6; index++) {
      control.push(this.CapexBudgetSurveyForm());
    }
  }

  RemoveCapexForm(index: number) {
    const control = this.DimForm.controls.hardware.get('capexHardware') as FormArray;
    control.removeAt(index);
    this.isRemoveCapexForm = control.length > 1 ? false : true;
  }

  RemoveOpexForm(index: number) {
    const control = this.DimForm.controls.software.get('opexSoftware') as FormArray;
    control.removeAt(index);
    this.isRemoveOpexForm = control.length > 1 ? false : true;
  }

  ActiveHardware() {
    const control = this.DimForm.controls.hardware.get('capexHardware') as FormArray;
    for (let i = 0; i < control.length; i++) {
      if (control.at(i).get('assetId').value === 'H9999') {
        control.at(i).get('otherName').enable();
        control.at(i).get('numberOfUnit').enable();
        control.at(i).get('costPerUnit').enable();
      } else {
        control.at(i).get('numberOfUnit').disable();
        control.at(i).get('otherName').disable();
        control.at(i).get('costPerUnit').disable();
      }
    }
  }

  ActiveSoftware() {
    const control = this.DimForm.controls.software.get('opexSoftware') as FormArray;
    for (let i = 0; i < control.length; i++) {
      if (control.at(i).get('assetId').value === 'S9999') {
        control.at(i).get('otherName').enable();
        control.at(i).get('numberOfUnit').enable();
        control.at(i).get('costPerUnit').enable();
      } else {
        control.at(i).get('numberOfUnit').disable();
        control.at(i).get('otherName').disable();
        control.at(i).get('costPerUnit').disable();
      }
    }
  }

  EnableCapex(FormControl) {
    if (FormControl.indexOf('capexSummary1') !== -1) {
      this.DimForm.controls.capexSummary1.enable();
    }
    if (FormControl.indexOf('capexSummary2') !== -1) {
      this.DimForm.controls.capexSummary2.enable();
    }
    if (FormControl.indexOf('capexSummary3') !== -1) {
      this.DimForm.controls.capexSummary3.enable();
      this.DimForm.controls.advancedCapexChoice.enable();
    }
  }

  DisableCapex(FormControl) {
    if (FormControl.indexOf('capexSummary1') !== -1) {
      this.DimForm.controls.capexSummary1.disable();
    }
    if (FormControl.indexOf('capexSummary2') !== -1) {
      this.DimForm.controls.capexSummary2.disable();
    }
    if (FormControl.indexOf('capexSummary3') !== -1) {
      this.DimForm.controls.capexSummary3.disable();
      this.DimForm.controls.advancedCapexChoice.disable();
    }
  }

  ClearCapex(FormControl) {
    if (FormControl.indexOf('capexSummary1') !== -1) {
      this.DimForm.patchValue({ capexSummary1: '' });
    }
    if (FormControl.indexOf('capexSummary2') !== -1) {
      this.DimForm.patchValue({ capexSummary2: '' });
    }
    if (FormControl.indexOf('capexSummary3') !== -1) {
      this.DimForm.patchValue({ capexSummary3: '' });
    }
  }

  ChangeCapex(event) {
    switch (event.target.value) {
      case 'capex001':
        this.initiativesForm.patchValue({ costEstCapex: null });
        this.EnableCapex(['capexSummary1']);
        this.ClearCapex(['capexSummary2', 'capexSummary3']);
        this.DisableCapex(['capexSummary2', 'capexSummary3']);
        this.DimForm.patchValue({ advancedCapexChoice: '' });
        break;
      case 'capex002':
        this.initiativesForm.patchValue({ costEstCapex: null });
        this.EnableCapex(['capexSummary2']);
        this.ClearCapex(['capexSummary1', 'capexSummary3']);
        this.DisableCapex(['capexSummary1', 'capexSummary3']);
        this.DimForm.patchValue({ advancedCapexChoice: '' });
        break;
      case 'capex003':
        this.DimForm.patchValue({ advancedCapexChoice: 'Operation optimization' });
        this.initiativesForm.patchValue({ costEstCapex: null });
        this.EnableCapex(['capexSummary3']);
        this.ClearCapex(['capexSummary1', 'capexSummary2']);
        this.DisableCapex(['capexSummary1', 'capexSummary2']);
        break;
    }
  }

  ChangeDim() {
    switch (this.DimForm.controls.type.value) {
      case 'Project/System Enhancement':
        this.Question = true;
        this.showSoftware = false;
        this.showProject = true;

        this.isDisableCapex = true;
        this.isDisableOpex = true;

        this.DimForm.controls.capexNo.enable();

        this.DimForm.controls.T0001.enable();
        this.DimForm.controls.T0002.enable();
        this.DimForm.controls.T0003.enable();
        this.DimForm.controls.T0004.enable();
        this.DimForm.controls.T0005.enable();
        this.DimForm.controls.T0006.enable();

        this.DimForm.patchValue({
          T0001: 'no',
          T0002: 'no',
          T0003: 'no',
          T0004: 'no',
          T0005: 'no',
          T0006: 'no',
        });

        this.DimForm.patchValue({ capexNo: 'capex001' });

        this.EnableCapex(['capexSummary1']);

        this.initiativesForm.patchValue({ costEstCapex: null });
        this.initiativesForm.patchValue({ costEstOpex: null });

        this.DimForm.patchValue({ capexHardware: null });
        this.DimForm.patchValue({ opexSoftware: null });

        const hardwareProject = this.DimForm.controls.hardware.get('capexHardware') as FormArray;
        while (hardwareProject.length !== 0) { hardwareProject.removeAt(0); }

        const softwareProject = this.DimForm.controls.software.get('opexSoftware') as FormArray;
        while (softwareProject.length !== 0) { softwareProject.removeAt(0); }

        this.AddCapexForm();
        this.AddOpexForm();

        this.DimForm.controls.hardware.disable();
        this.DimForm.controls.software.disable();
        break;
      case 'Hardware/Software':
        this.Question = false;
        this.showSoftware = true;
        this.showProject = false;

        const hardware = this.DimForm.controls.hardware.get('capexHardware') as FormArray;
        for (let i = 0; i < hardware.length; i++) { hardware.at(i).patchValue({ assetId: '' }); }
        const software = this.DimForm.controls.software.get('opexSoftware') as FormArray;
        for (let i = 0; i < software.length; i++) { software.at(i).patchValue({ assetId: '' }); }

        this.initiativesForm.patchValue({ costEstCapex: null });
        this.initiativesForm.patchValue({ costEstOpex: null });

        this.isDisableCapex = false;
        this.isDisableOpex = false;

        this.DimForm.controls.hardware.enable();
        this.DimForm.controls.software.enable();

        this.DimForm.patchValue({ capexNo: null });
        this.DimForm.controls.capexNo.disable();

        this.ActiveHardware();
        this.ActiveSoftware();

        this.DimForm.patchValue({ advancedCapexChoice: '' });

        this.ClearCapex(['capexSummary1', 'capexSummary2', 'capexSummary3']);
        this.DisableCapex(['capexSummary1', 'capexSummary2', 'capexSummary3']);
        break;
    }
  }

  ChangeCapexSummary(type) {
    switch (type) {
      case 1: this.initiativesForm.patchValue({ costEstCapex: this.DimForm.controls.capexSummary1.value }); break;
      case 2: this.initiativesForm.patchValue({ costEstCapex: this.DimForm.controls.capexSummary2.value }); break;
      case 3: this.initiativesForm.patchValue({ costEstCapex: this.DimForm.controls.capexSummary3.value }); break;
    }
    this.CalculatePayBackPeriod();
  }

  ChangeGetCapex(value, sum) {
    switch (value) {
      case 'capex001':
        this.EnableCapex(['capexSummary1']);
        this.DimForm.patchValue({ capexNo: value, capexSummary1: sum.capexSummary });
        this.ClearCapex(['capexSummary2', 'capexSummary3']);
        this.DisableCapex(['capexSummary2', 'capexSummary3']);
        break;
      case 'capex002':
        this.EnableCapex(['capexSummary2']);
        this.DimForm.patchValue({ capexNo: value, capexSummary2: sum.capexSummary });
        this.ClearCapex(['capexSummary1', 'capexSummary3']);
        this.DisableCapex(['capexSummary1', 'capexSummary3']);
        break;
      case 'capex003':
        this.EnableCapex(['capexSummary3']);
        this.DimForm.patchValue({ capexNo: value, capexSummary3: sum.capexSummary });
        this.ClearCapex(['capexSummary1', 'capexSummary2']);
        this.DisableCapex(['capexSummary1', 'capexSummary2']);
        break;
    }
  }

  ChangeTypeBenefit() {
    switch (this.initiativesForm.controls.typeBenefit.value) {
      case 'EBITDA':
      case 'EBIT':
        this.showBenefit = true;
        break;
      default:
        this.showBenefit = false;
        break;
    }
  }

  GetCapexView(value, sum) {
    switch (value) {
      case 'capex001':
        this.DimForm.patchValue({ capexNo: value, capexSummary1: sum.capexSummary });
        this.ClearCapex(['capexSummary2', 'capexSummary3']);
        this.DisableCapex(['capexSummary2', 'capexSummary3']);
        break;
      case 'capex002':
        this.DimForm.patchValue({ capexNo: value, capexSummary2: sum.capexSummary });
        this.ClearCapex(['capexSummary1', 'capexSummary3']);
        this.DisableCapex(['capexSummary1', 'capexSummary3']);
        break;
      case 'capex003':
        this.DimForm.patchValue({ capexNo: value, capexSummary3: sum.capexSummary });
        this.ClearCapex(['capexSummary1', 'capexSummary2']);
        this.DisableCapex(['capexSummary1', 'capexSummary2']);
        break;
    }
  }

  SetGetInitiative(response) {
    this.initiativesForm.patchValue({
      budgetSource: response.budgetSource ? response.budgetSource : '',
      jFactor: response.jFactor !== 0 ? response.jFactor : null,
      irr: response.irr !== 0 ? response.irr : null,
      costEstCapex: response.costEstCapex !== 0 ? response.costEstCapex : null,
      benefitAmount: response.benefitAmount !== 0 ? response.benefitAmount : null,
      fxExchange: response.fxExchange !== 0 ? response.fxExchange : null,
      payBackPeriod: response.payBackPeriod !== 0 ? response.payBackPeriod : null
    });
  }

  GetSetDate(registeringDate, startingDate, finishingDate) {
    this.dateRegisterDisplay = this.dateUtil.GetDate(new Date(registeringDate));
    this.dateStartDisplay = this.dateUtil.GetDate(new Date(startingDate));
    this.dateFinishDisplay = finishingDate ? this.dateUtil.GetDate(new Date(finishingDate)) : null;
    this.dateRegister = this.dateUtil.SetDate(new Date(registeringDate));
    this.dateStart = this.dateUtil.SetDate(new Date(startingDate));
    this.dateFinish = finishingDate ? this.dateUtil.SetDate(new Date(finishingDate)) : null;
  }

  GetInitiative() {
    this.initiativeService.GetInitiative(this.id).subscribe(response => {
      this.ItDigital = response.itDigital;
      this.createdBy = response.createdBy;

      this.initiativeCode = response.initiativeCode;
      this.status = response.status;
      this.stage = response.stage;

      this.initiativesForm.patchValue(response);

      this.coDeveloperSelected = response.initiativeCoDevelopers;
      this.coDeveloperSelected.forEach((element) => {
        if (element.coDeveloperName) { this.selectListCoDeveloper.push(element.coDeveloperName); }
      });
      this.coDeveloperItems = this.selectListCoDeveloper;

      this.initiativesForm.patchValue({ coDeveloper: this.coDeveloperItems });

      this.GetSetDate(response.registeringDate, response.startingDate, response.finishingDate);

      this.initiativesForm.patchValue({
        registeringDate: this.dateRegisterDisplay,
        startingDate: this.dateStartDisplay,
        finishingDate: this.dateFinishDisplay
      });

      switch (this.page) {
        case 'dim-create':
        case 'dim-edit':
          this.DimForm.enable();
          break;
        default:
          this.DimForm.disable();
          break;
      }

      switch (response.typeBenefit) {
        case 'EBITDA':
        case 'EBIT':
          this.showBenefit = true;
          break;
        default:
          this.showBenefit = false;
          break;
      }

      if (response.benefitAmount) {
        this.impactService.GetImpactTotalRecurringOneTime(this.id).subscribe((result) => {
          if (result) {
            if (result !== 0) {
              this.initiativesForm.patchValue({ benefitAmount: result });
            }
          }
        });
      }
      this.GetITBudget();
    }, error => this.response.error(error));
  }

  GetHardware() {
    const control = this.DimForm.controls.hardware.get('capexHardware') as FormArray;
    for (let i = 0; i < this.capexHardware.length; i++) {
      control.push(this.CapexHardwareForm());
      control.at(i).patchValue(this.capexHardware[i]);
    }
    switch (this.page) {
      case 'dim-create':
      case 'dim-edit':
        this.EditHardware();
        break;
      default:
        this.ViewHardware();
        break;
    }
  }

  GetSoftware() {
    const control = this.DimForm.controls.software.get('opexSoftware') as FormArray;
    for (let i = 0; i < this.opexSoftware.length; i++) {
      control.push(this.OpexSoftwareForm());
      control.at(i).patchValue(this.opexSoftware[i]);
    }
    switch (this.page) {
      case 'dim-create':
      case 'dim-edit':
        this.EditSoftware();
        break;
      default:
        this.ViewSoftware();
        break;
    }
  }

  EditHardware() {
    const control = this.DimForm.controls.hardware.get('capexHardware') as FormArray;
    switch (this.ItDigital) {
      case 'Project/System Enhancement':
        for (let i = 0; i < control.length; i++) {
          if (control.at(i).get('assetId').value === 'H9999') {
            control.at(i).get('otherName').disable();
            control.at(i).get('numberOfUnit').disable();
            control.at(i).get('costPerUnit').disable();
          } else {
            control.at(i).get('numberOfUnit').disable();
          }
          control.at(i).get('assetId').disable();
        }
        break;
      case 'Hardware/Software':
        for (let i = 0; i < control.length; i++) {
          if (control.at(i).get('assetId').value === 'H9999') {
            control.at(i).get('otherName').enable();
            control.at(i).get('numberOfUnit').enable();
            control.at(i).get('costPerUnit').enable();
          } else {
            control.at(i).get('numberOfUnit').enable();
          }
        }
        break;
    }
  }

  ViewHardware() {
    const control = this.DimForm.controls.hardware.get('capexHardware') as FormArray;
    control.disable();
  }

  EditSoftware() {
    const control = this.DimForm.controls.software.get('opexSoftware') as FormArray;
    switch (this.ItDigital) {
      case 'Project/System Enhancement':
        for (let i = 0; i < control.length; i++) {
          if (control.at(i).get('assetId').value === 'S9999') {
            control.at(i).get('otherName').disable();
            control.at(i).get('numberOfUnit').disable();
            control.at(i).get('costPerUnit').disable();
          } else {
            control.at(i).get('numberOfUnit').disable();
          }
          control.at(i).get('assetId').disable();
        }
        break;
      case 'Hardware/Software':
        for (let i = 0; i < control.length; i++) {
          if (control.at(i).get('assetId').value === 'S9999') {
            control.at(i).get('otherName').enable();
            control.at(i).get('numberOfUnit').enable();
            control.at(i).get('costPerUnit').enable();
          } else {
            control.at(i).get('numberOfUnit').enable();
          }
        }
        break;
    }
  }

  ViewSoftware() {
    const control = this.DimForm.controls.software.get('opexSoftware') as FormArray;
    control.disable();
  }

  GetITBudget() {
    this.itBudgetService.GetITBudget(this.id).subscribe(response => {
      this.ITBudget = response;
      this.ITBudget.forEach(item => {
        if (item.capexNo) {
          this.IdCapex = item.id;
          switch (this.page) {
            case 'dim-create':
            case 'dim-edit':
              this.ChangeGetCapex(item.capexNo, item);
              break;
            default:
              this.GetCapexView(item.capexNo, item);
              break;
          }
          this.DimForm.patchValue({ advancedCapexChoice: item.advancedCapexChoice ? item.advancedCapexChoice : null });
        }
        if (item.opexNo) {
          this.IdOpex = item.id;
          this.DimForm.patchValue({ opexNo: item.opexNo, opexSummary: item.opexSummary });
        }
      });
      switch (this.ItDigital) {
        case 'Project/System Enhancement':
          this.showSoftware = false;
          this.showProject = true;
          this.DimForm.patchValue({ type: 'Project/System Enhancement' });
          this.GetCapexBudgetSurvey();
          this.AddCapexForm();
          this.AddOpexForm();
          break;
        case 'Hardware/Software':
          this.showSoftware = true;
          this.showProject = false;
          this.DimForm.patchValue({ type: 'Hardware/Software' });
          this.itBudgetService.GetHardware(this.IdCapex).subscribe(hardware => {
            this.capexHardware = hardware;
            this.capexHardware.length !== 0 ? this.GetHardware() : this.AddCapexForm();
          });
          this.itBudgetService.GetSoftware(this.IdOpex).subscribe(software => {
            this.opexSoftware = software;
            this.opexSoftware.length !== 0 ? this.GetSoftware() : this.AddOpexForm();
          });
          break;
      }
    });
  }

  GetCapexBudgetSurvey() {
    this.itBudgetService.GetCapexBudgetSurvey(this.id).subscribe(response => {
      this.BudgetSurvey = response;
      for (const item of this.BudgetSurvey) {
        switch (item.topicId) {
          case 'T0001':
            this.CheckStatus('T0001', item.status);
            this.DimForm.patchValue({ T0001: item.status });
            this.DimForm.patchValue({ Law: item.law });
            this.DimForm.patchValue({ Impact: item.impact });
            this.DimForm.patchValue({ Effective: this.dateUtil.GetDate(new Date(item.effective)) });
            break;
          case 'T0002':
            this.CheckStatus('T0002', item.status);
            this.DimForm.patchValue({ T0002: item.status });
            this.DimForm.patchValue({ CH0002: item.choiceValue });
            break;
          case 'T0003':
            this.CheckStatus('T0003', item.status);
            this.DimForm.patchValue({ T0003: item.status });
            this.DimForm.patchValue({ CH0003: item.choiceValue });
            break;
          case 'T0004':
            this.CheckStatus('T0004', item.status);
            this.DimForm.patchValue({ T0004: item.status });
            this.DimForm.patchValue({ CH0004: item.choiceValue });
            break;
          case 'T0005':
            this.CheckStatus('T0005', item.status);
            this.DimForm.patchValue({ T0005: item.status });
            this.DimForm.patchValue({ CH0005: item.choiceValue });
            break;
          case 'T0006':
            this.CheckStatus('T0006', item.status);
            this.DimForm.patchValue({ T0006: item.status });
            this.DimForm.patchValue({ CH0006: item.choiceValue });
            break;
        }
      }
    });
  }

  CheckStatus(topic, status) {
    this.CapexTopic.forEach(result => {
      if (result.topicId === topic) {
        switch (status) {
          case 'yes': result.isYesOrNo = true; break;
          case 'no': result.isYesOrNo = false; break;
        }
      }
    });
  }

  GetUser() {
    this.authService.getMsalUser().subscribe((response) => {
      this.username = response.mail;
      this.params.text = this.username;
      this.initiativeService.GetOwnersEmail(this.params).subscribe(owners => {
        this.owners = owners;
        const owner = this.owners.filter(obj => {
          return obj.email.toLowerCase().trim() === this.username.toLowerCase().trim();
        });
        this.GetCoDevelopers();
        if (!this.id) {
          this.initiativesForm.patchValue({ ownerName: owner[0].ownerName });
        }
      });
    }, error => this.unauthorized.error(error));
  }

  GetCoDevelopers(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetCoDevelopers(this.params).subscribe(coDevelopers => {
      this.coDevelopers = coDevelopers;
      this.coDevelopers = this.coDevelopers.filter(obj => {
        return obj.email.toLowerCase().trim() !== this.username.toLowerCase().trim();
      });
    }, error => this.response.error(error));
  }

  GetOwners(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => this.owners = owners);
  }

  GetYears() {
    const year = new Date().getFullYear();
    for (let i = 1; i <= 5; i++) {
      this.years.push(year - i);
    }
    this.years.unshift(year + 1, year);
  }

  SetRegisterDate() {
    const dateNow = new Date();
    const date = this.dateUtil.GetDate(dateNow);
    this.initiativesForm.patchValue({ registeringDate: date });
  }

  GetHardwareList() {
    this.itBudgetService.GetHardwareList().subscribe(hardware => this.hardware = hardware);
  }

  GetSoftwareList() {
    this.itBudgetService.GetSoftwareList().subscribe(software => this.software = software);
  }

  OnChangeHardware(i) {
    const control = this.DimForm.controls.hardware.get('capexHardware') as FormArray;
    if (control.at(i).get('assetId').value === 'H9999') {
      control.at(i).get('numberOfUnit').patchValue('');
      control.at(i).get('costPerUnit').patchValue('');
      control.at(i).get('totalMTHB').patchValue('');
      control.at(i).get('otherName').enable();
    } else {
      const hardware = this.hardware.filter(item => item.assetId === control.at(i).get('assetId').value);
      control.at(i).get('otherName').patchValue('');
      control.at(i).get('otherName').disable();
      control.at(i).get('costPerUnit').patchValue(hardware[0].costPerUnit);
      control.at(i).get('costPerUnit').disable();
      control.at(i).get('numberOfUnit').enable();
    }
    this.CalculateHardware();
  }

  OnChangeSoftware(i) {
    const control = this.DimForm.controls.software.get('opexSoftware') as FormArray;
    if (control.at(i).get('assetId').value === 'S9999') {
      control.at(i).get('numberOfUnit').patchValue('');
      control.at(i).get('costPerUnit').patchValue('');
      control.at(i).get('totalMTHB').patchValue('');
      control.at(i).get('otherName').enable();
    } else {
      const software = this.software.filter(item => item.assetId === control.at(i).get('assetId').value);
      control.at(i).get('otherName').patchValue('');
      control.at(i).get('otherName').disable();
      control.at(i).get('costPerUnit').patchValue(software[0].costPerUnit);
      control.at(i).get('costPerUnit').disable();
      control.at(i).get('numberOfUnit').enable();
    }
    this.CalculateSoftware();
  }

  CalculatePayBackPeriod() {

    var costEstCapex = "0";
    if (this.initiativesForm.controls.costEstCapex.value) {
      costEstCapex = this.initiativesForm.controls.costEstCapex.value;
    }


    var costEstOpex = "0";
    if (this.initiativesForm.controls.costEstOpex.value) {
      costEstOpex = this.initiativesForm.controls.costEstOpex.value;
    }

    var benefitAmount = this.initiativesForm.controls.benefitAmount.value;


    var result = (parseFloat(costEstCapex) + parseFloat(costEstOpex)) / parseFloat(benefitAmount);


    this.initiativesForm.patchValue({ payBackPeriod: isFinite(result) ? result.toFixed(3) : null });
  }

  InputOtherHardware(i) {
    const control = this.DimForm.controls.hardware.get('capexHardware') as FormArray;
    if (control.at(i).get('otherName').value) {
      control.at(i).get('numberOfUnit').enable();
      control.at(i).get('costPerUnit').enable();
    } else {
      control.at(i).get('totalMTHB').patchValue('');
      control.at(i).get('numberOfUnit').patchValue('');
      control.at(i).get('costPerUnit').patchValue('');
      control.at(i).get('numberOfUnit').disable();
      control.at(i).get('costPerUnit').disable();
    }
  }

  InputOtherSoftware(i) {
    const control = this.DimForm.controls.software.get('opexSoftware') as FormArray;
    if (control.at(i).get('otherName').value) {
      control.at(i).get('numberOfUnit').enable();
      control.at(i).get('costPerUnit').enable();
    } else {
      control.at(i).get('totalMTHB').patchValue('');
      control.at(i).get('numberOfUnit').patchValue('');
      control.at(i).get('costPerUnit').patchValue('');
      control.at(i).get('numberOfUnit').disable();
      control.at(i).get('costPerUnit').disable();
    }
  }

  InputHardware(i) {
    const control = this.DimForm.controls.hardware.get('capexHardware') as FormArray;
    const costPerUnit = control.at(i).get('costPerUnit').value;
    const numberOfUnit = control.at(i).get('numberOfUnit').value;
    control.at(i).get('totalMTHB').patchValue(costPerUnit * numberOfUnit);
    this.CalculateHardware();
    this.CalculatePayBackPeriod();
  }

  InputSoftware(i) {
    const control = this.DimForm.controls.software.get('opexSoftware') as FormArray;
    const costPerUnit = control.at(i).get('costPerUnit').value;
    const numberOfUnit = control.at(i).get('numberOfUnit').value;
    control.at(i).get('totalMTHB').patchValue(costPerUnit * numberOfUnit);
    this.CalculateSoftware();
    this.CalculatePayBackPeriod();
  }

  CalculateHardware() {
    const value = [];
    const control = this.DimForm.controls.hardware.get('capexHardware') as FormArray;
    for (let i = 0; i < control.length; i++) {
      const costPerUnit = control.at(i).get('costPerUnit').value;
      const numberOfUnit = control.at(i).get('numberOfUnit').value;
      control.at(i).get('totalMTHB').patchValue(costPerUnit * numberOfUnit);
      if (control.at(i).get('totalMTHB').value !== null) {
        value.push(Number(control.at(i).get('totalMTHB').value));
      }
    }
    const sum = value.reduce((a, b) => a + b, 0);
    this.DimForm.patchValue({ capexHardware: sum });
    this.initiativesForm.patchValue({ costEstCapex: this.DimForm.controls.capexHardware.value / 1000000 });
  }

  CalculateSoftware() {
    const value = [];
    const control = this.DimForm.controls.software.get('opexSoftware') as FormArray;
    for (let i = 0; i < control.length; i++) {
      const costPerUnit = control.at(i).get('costPerUnit').value;
      const numberOfUnit = control.at(i).get('numberOfUnit').value;
      control.at(i).get('totalMTHB').patchValue(costPerUnit * numberOfUnit);
      if (control.at(i).get('totalMTHB').value !== null) {
        value.push(Number(control.at(i).get('totalMTHB').value));
      }
    }
    const sum = value.reduce((a, b) => a + b, 0);
    this.DimForm.patchValue({ opexSoftware: sum });
    this.initiativesForm.patchValue({ costEstOpex: this.DimForm.controls.opexSoftware.value / 1000000 });
  }

  GetPlants() {
    try {
      let companyName = this.initiativesForm.get('company').value;
      return companyName ? this.companyList.find(x => x.value == companyName).plant : [];
      // this.initiativeService.GetPlants().subscribe(plants => this.plants = plants);
      // this.plants.push({ id: 9999, plantId: 'P9999', plantTitle: 'Others (please specify)' });
    }
    catch (err) {
      [];
    }
  }

  GetOrganizations() {
    try {
      let companyName = this.initiativesForm.get('company').value;
      return companyName ? this.companyList.find(x => x.value == companyName).org : [];
      // this.initiativeService.GetOrganizations().subscribe(organizations => this.organizations = organizations);
    } catch (err) {
      [];
    }
  }

  GetCompany() {
    // haveCompany
    if (this.initiativeService.company) {
      this.initiativesForm.get('company').patchValue(this.initiativeService.company);
      this.haveCompany = true;
    } else {
      this.haveCompany = false;
    }
    // this.companyList = this.companyList.find(x=>x.value == this.initiativeService.company);
    // this.initiativeService.GetCompany().subscribe(companyName => this.companyName = companyName);
  }

  StartDateChange(value: Date): void {
    this.dateStart = this.dateUtil.SetDate(new Date(value));
    this.bsConfigFinish.minDate = new Date(value);
    this.initiativesForm.patchValue({ finishingDate: null });
  }

  FinishChange(value: Date): void {
    const time = new Date(value).getTime();
    if (time > 0) {
      this.dateFinish = this.dateUtil.SetDate(new Date(value));
      if (this.dateStart < this.dateFinish) {
        this.dateFinish = this.dateUtil.SetDate(new Date(value));
      } else {
        if (!(this.isDisabledSubmit || this.isDisabledDraft)) {
          this.dateFinish = null;
          if (!this.initiativeService.viewMode) {
            this.swalTool.DateValid();
            this.initiativesForm.patchValue({ finishingDate: null });
          }
        }
      }
    }
  }

  EffectiveChange(value: Date): void {
    const time = new Date(value).getTime();
    if (time > 0) {
      this.dateEffective = this.dateUtil.SetDate(new Date(value));
    }
  }

  OnShowFinish() {
    this.initiativesForm.controls.finishingDate.clearValidators();
    this.initiativesForm.controls.finishingDate.updateValueAndValidity();
  }

  OnHiddenFinish() {
    if (!this.initiativesForm.controls.finishingDate.value) {
      this.initiativesForm.controls.finishingDate.setValidators([Validators.required]);
      this.initiativesForm.controls.finishingDate.updateValueAndValidity();
    }
  }

  SetMarkAsTouchedFormGeneral() {
    this.initiativesForm.controls.name.markAsTouched();
    this.initiativesForm.controls.year.markAsTouched();
    this.initiativesForm.controls.ownerName.markAsTouched();
    this.initiativesForm.controls.organization.markAsTouched();
    this.initiativesForm.controls.finishingDate.markAsTouched();
    this.initiativesForm.controls.plant.markAsTouched();
    this.initiativesForm.controls.background.markAsTouched();
    this.initiativesForm.controls.resultObjective.markAsTouched();
    this.initiativesForm.controls.scopeOfWork.markAsTouched();
    this.initiativesForm.controls.costEstCapex.markAsTouched();
    this.initiativesForm.controls.costEstOpex.markAsTouched();
    this.initiativesForm.controls.company.markAsTouched();
  }

  ClearValidateFormGeneral() {
    this.initiativesForm.controls.name.clearValidators();
    this.initiativesForm.controls.name.updateValueAndValidity();
    this.initiativesForm.controls.year.clearValidators();
    this.initiativesForm.controls.year.updateValueAndValidity();
    this.initiativesForm.controls.ownerName.clearValidators();
    this.initiativesForm.controls.ownerName.updateValueAndValidity();
    this.initiativesForm.controls.organization.clearValidators();
    this.initiativesForm.controls.organization.updateValueAndValidity();
    this.initiativesForm.controls.finishingDate.clearValidators();
    this.initiativesForm.controls.finishingDate.updateValueAndValidity();
    this.initiativesForm.controls.plant.clearValidators();
    this.initiativesForm.controls.plant.updateValueAndValidity();
    this.initiativesForm.controls.background.clearValidators();
    this.initiativesForm.controls.background.updateValueAndValidity();
    this.initiativesForm.controls.resultObjective.clearValidators();
    this.initiativesForm.controls.resultObjective.updateValueAndValidity();
    this.initiativesForm.controls.scopeOfWork.clearValidators();
    this.initiativesForm.controls.scopeOfWork.updateValueAndValidity();
    this.initiativesForm.controls.company.clearValidators();
    this.initiativesForm.controls.company.updateValueAndValidity();
  }

  RadioYes(name) {
    return name + 'Yes';
  }

  RadioNo(name) {
    return name + 'No';
  }

  ChoiceName(name) {
    return name.replace('T', 'CH');
  }

  ChangeTopic(event, topic) {
    this.CapexTopic.forEach(result => {
      if (result.topicId === topic) {
        switch (event.target.value) {
          case 'yes': result.isYesOrNo = true; break;
          case 'no': result.isYesOrNo = false; break;
        }
      }
    });
  }

  SortByTopic(items) {
    return items.sort((a, b) => a.topicId > b.topicId ? 1 : a.topicId === b.topicId ? 0 : -1);
  }

  SortBy(items) {
    return items.sort((a, b) => a.choiceId > b.choiceId ? 1 : a.choiceId === b.choiceId ? 0 : -1);
  }

  SetValidateFormGeneral() {
    this.initiativesForm.controls.name.setValidators([Validators.required]);
    this.initiativesForm.controls.name.updateValueAndValidity();
    this.initiativesForm.controls.year.setValidators([Validators.required]);
    this.initiativesForm.controls.year.updateValueAndValidity();
    this.initiativesForm.controls.ownerName.setValidators([Validators.required]);
    this.initiativesForm.controls.ownerName.updateValueAndValidity();
    this.initiativesForm.controls.organization.setValidators([Validators.required]);
    this.initiativesForm.controls.organization.updateValueAndValidity();
    this.initiativesForm.controls.finishingDate.setValidators([Validators.required]);
    this.initiativesForm.controls.finishingDate.updateValueAndValidity();
    this.initiativesForm.controls.plant.setValidators([Validators.required]);
    this.initiativesForm.controls.plant.updateValueAndValidity();
    this.initiativesForm.controls.background.setValidators([Validators.required]);
    this.initiativesForm.controls.background.updateValueAndValidity();
    this.initiativesForm.controls.resultObjective.setValidators([Validators.required]);
    this.initiativesForm.controls.resultObjective.updateValueAndValidity();
    this.initiativesForm.controls.scopeOfWork.setValidators([Validators.required]);
    this.initiativesForm.controls.scopeOfWork.updateValueAndValidity();
    this.initiativesForm.controls.company.setValidators([Validators.required]);
    this.initiativesForm.controls.company.updateValueAndValidity();
  }

  PatchForm() {
    this.initiativesForm.patchValue({ costEstCapexType: 'THB' });
  }

  SearchCoDeveloper(event) {
    this.GetCoDevelopers(event.term);
  }

  RemoveCoDeveloper() {
    this.GetCoDevelopers();
  }

  SearchOwnerName(event) {
    this.GetOwners(event.term);
  }

  ClearOwnerName() {
    this.GetOwners();
  }

  SelectCoDeveloper() {
    if (this.initiativesForm.controls.coDeveloper.value) {
      this.initiativeService.UpdateCoDeveloper(this.id, this.initiativesForm.controls.coDeveloper.value).subscribe(() => { });
    } else {
      this.initiativeService.DeleteCoDeveloper(this.id).subscribe(() => { });
    }
  }

  SetFormDate() {
    this.initiativesForm.patchValue({
      registeringDate: this.dateRegister ? this.dateRegister : this.dateUtil.SetDate(new Date()),
      startingDate: this.dateStart ? this.dateStart : null,
      finishingDate: this.dateFinish ? this.dateFinish : null,
      createdBy: this.createdBy ? this.createdBy : this.username,
      itDigital: this.DimForm.controls.type.value
    });
  }

  SetHardware() {
    const control = this.DimForm.controls.hardware.get('capexHardware') as FormArray;
    for (let i = 0; i < control.length; i++) {
      if (control.at(i).get('assetId').value === 'H9999') {
        control.at(i).get('assetId').enable();
        control.at(i).get('otherName').enable();
        control.at(i).get('numberOfUnit').enable();
        control.at(i).get('costPerUnit').enable();
        control.at(i).get('totalMTHB').enable();
      } else {
        control.at(i).get('assetId').enable();
        control.at(i).get('numberOfUnit').enable();
        control.at(i).get('costPerUnit').enable();
        control.at(i).get('totalMTHB').enable();
      }
    }
  }

  SetSoftware() {
    const control = this.DimForm.controls.software.get('opexSoftware') as FormArray;
    for (let i = 0; i < control.length; i++) {
      if (control.at(i).get('assetId').value === 'S9999') {
        control.at(i).get('assetId').enable();
        control.at(i).get('otherName').enable();
        control.at(i).get('numberOfUnit').enable();
        control.at(i).get('costPerUnit').enable();
        control.at(i).get('totalMTHB').enable();
      } else {
        control.at(i).get('assetId').enable();
        control.at(i).get('numberOfUnit').enable();
        control.at(i).get('costPerUnit').enable();
        control.at(i).get('totalMTHB').enable();
      }
    }
  }

  SetInitiativeType() {
    switch (this.DimForm.controls.capexNo.value) {
      case 'capex002':
      case 'capex003':
        this.initiativesForm.patchValue({ initiativeType: 'Digital' });
        break;
      default:
        this.initiativesForm.patchValue({ initiativeType: 'IT' });
        break;
    }
  }

  SaveHardware(response) {
    this.IdCapex = response.id;
    if (this.DimForm.controls.capexHardware.value) {
      this.SetHardware();
      this.itBudgetService.CreateHardware(this.IdCapex, this.DimForm.controls.hardware.value).subscribe(() => { });
      this.DimForm.controls.capexNo.disable();
    }
  }

  SaveSoftware(response) {
    this.IdOpex = response.id;
    if (this.DimForm.controls.opexSoftware.value) {
      this.SetSoftware();
      this.itBudgetService.CreateSoftware(this.IdOpex, this.DimForm.controls.software.value).subscribe(() => { });
    }
  }

  SaveCapex(id) {
    this.DimForm.controls.capexSummary.enable();
    if (this.DimForm.controls.capexHardware.value) {
      this.DimForm.patchValue({ capexNo: 'hardware' });
      this.DimForm.controls.capexNo.enable();
      this.DimForm.patchValue({ capexSummary: this.DimForm.controls.capexHardware.value / 1000000 });
    }
    switch (this.DimForm.controls.capexNo.value) {
      case 'capex001':
        this.DimForm.patchValue({ capexSummary: this.DimForm.controls.capexSummary1.value });
        break;
      case 'capex002':
        this.DimForm.patchValue({ capexSummary: this.DimForm.controls.capexSummary2.value });
        break;
      case 'capex003':
        this.DimForm.patchValue({ capexSummary: this.DimForm.controls.capexSummary3.value });
        break;
    }
    if (this.IdCapex) {
      this.DimForm.patchValue({ id: this.IdCapex });
      this.itBudgetService.UpdateITBudgetCapex(id, this.DimForm.value).subscribe((response) => this.SaveHardware(response));
    } else {
      this.DimForm.patchValue({ id: 0 });
      this.itBudgetService.CreateITBudgetCapex(id, this.DimForm.value).subscribe((response) => this.SaveHardware(response));
    }
    this.DimForm.controls.capexSummary.disable();
  }

  SaveOpex(id) {
    if (this.DimForm.controls.opexSoftware.value) {
      this.DimForm.patchValue({ opexSummary: this.DimForm.controls.opexSoftware.value / 1000000 });
    }

    if (this.IdOpex) {
      this.DimForm.patchValue({ id: this.IdOpex });
      this.itBudgetService.UpdateITBudgetOpex(id, this.DimForm.value).subscribe((response) => this.SaveSoftware(response));
    } else {
      this.DimForm.patchValue({ id: 0 });
      this.itBudgetService.CreateITBudgetOpex(id, this.DimForm.value).subscribe((response) => this.SaveSoftware(response));
    }
  }

  SaveCapexBudgetSurvey(id) {
    if (this.DimForm.controls.type.value === 'Project/System Enhancement') {
      const control = this.CapexBudgetSurvey.get('budgetSurvey') as FormArray;
      control.at(0).patchValue({
        initiativeId: id,
        topicId: 'T0001',
        status: this.DimForm.controls.T0001.value,
        choiceValue: null,
        law: this.DimForm.controls.Law.value,
        impact: this.DimForm.controls.Impact.value,
        effective: this.DimForm.controls.Effective.value
      });
      const Choice = { T0002: 'CH0002', T0003: 'CH0003', T0004: 'CH0004', T0005: 'CH0005', T0006: 'CH0006' };
      let num = 1;
      for (const [key, value] of Object.entries(Choice)) {
        control.at(num).patchValue({
          initiativeId: id,
          topicId: key,
          status: this.DimForm.controls[key].value,
          choiceValue: this.DimForm.controls[value].value,
          law: null,
          impact: null,
          effective: null,
        });
        num++;
      }
      this.itBudgetService.CreateCapexBudgetSurvey(id, this.CapexBudgetSurvey.value).subscribe(() => { });
    }
  }

  SetEffectiveDate() {
    this.DimForm.patchValue({ Effective: this.dateEffective ? this.dateEffective : null });
  }

  SaveDraft() {
    this.SetButton();
    this.initiativesForm.controls.name.markAsTouched();
    if (this.initiativesForm.controls.name.valid) {
      this.type = 'draft';
      this.SetFormDate();
      this.SetEffectiveDate();
      this.SetInitiativeType();
      this.CurrentPage();
      //Tempolary Solution
      setTimeout(() => { window.location.reload(true) }, 2000);
    } else {
      this.swalTool.Required();
    }
  }

  SaveSubmit() {
    this.SetButton();
    if (this.CheckValidForm) {
      this.type = 'submit';
      this.SetFormDate();
      this.SetInitiativeType();
      this.CurrentPage();
    } else {
      this.SetMarkAsTouchedFormGeneral();
      this.swalTool.Required();
    }
  }

  SetEdit(id) {
    sessionStorage.setItem('id', id.toString());
    sessionStorage.setItem('page', 'dim-edit');
    this.page = 'dim-edit';
    this.name = 'Edit IT & digital Budget Survey';
  }

  CreateDraftInitiative() {
    this.initiativeService.CreateDraftInitiative(this.initiativesForm.value).subscribe(response => {
      this.id = response.id;
      this.ItDigital = response.itDigital;
      if (this.initiativesForm.controls.coDeveloper.value) {
        this.initiativeService.CreateCoDeveloper(response.id, this.initiativesForm.controls.coDeveloper.value).subscribe(() => { });
      }
      this.GetSetDate(response.registeringDate, response.startingDate, response.finishingDate);
      this.initiativesForm.patchValue(response);
      this.initiativesForm.patchValue({
        registeringDate: this.dateRegisterDisplay,
        startingDate: this.dateStartDisplay,
        finishingDate: this.dateFinishDisplay,
      });
      this.swalTool.Draft();
      this.SetEdit(response.id);
      this.SaveCapex(response.id);
      this.SaveOpex(response.id);
      this.SaveCapexBudgetSurvey(response.id);
      this.GetITBudget();
    }, error => this.response.error(error));
  }

  CreateSubmitInitiative() {
    this.initiativeService.CreateSubmitInitiative(this.initiativesForm.value).subscribe(response => {
      sessionStorage.setItem('id', response.id.toString());
      if (this.initiativesForm.controls.coDeveloper.value) {
        this.initiativeService.CreateCoDeveloper(response.id, this.initiativesForm.controls.coDeveloper.value).subscribe(() => { });
      }
      this.SaveCapex(response.id);
      this.SaveOpex(response.id);
      this.SaveCapexBudgetSurvey(response.id);
      this.submitService.SubmitStageStatus(response.id, { status: 'forward', comment: '' }).subscribe(() => this.swalTool.Submit());
    }, error => this.response.error(error));
  }

  UpdateDraftInitiative() {
    this.initiativesForm.patchValue({ updatedBy: this.username });
    this.initiativeService.UpdateDraftInitiative(this.id, this.initiativesForm.value).subscribe(response => {
      sessionStorage.setItem('id', response.id.toString());
      this.ItDigital = response.itDigital;
      this.GetSetDate(response.registeringDate, response.startingDate, response.finishingDate);
      this.initiativesForm.patchValue(response);
      this.initiativesForm.patchValue({
        registeringDate: this.dateRegisterDisplay,
        startingDate: this.dateStartDisplay,
        finishingDate: this.dateFinishDisplay,
      });
      this.SelectCoDeveloper();
      this.SaveCapex(response.id);
      this.SaveOpex(response.id);
      this.SaveCapexBudgetSurvey(response.id);
      this.GetITBudget();
      this.swalTool.Draft();
    }, error => this.response.error(error));
  }

  UpdateSubmitInitiative() {
    this.initiativesForm.patchValue({ updatedBy: this.username });
    this.initiativeService.UpdateSubmitInitiative(this.id, this.initiativesForm.value).subscribe(response => {
      sessionStorage.setItem('id', response.id.toString());
      this.GetSetDate(response.registeringDate, response.startingDate, response.finishingDate);
      this.initiativesForm.patchValue(response);
      this.initiativesForm.patchValue({
        registeringDate: this.dateRegisterDisplay,
        startingDate: this.dateStartDisplay,
        finishingDate: this.dateFinishDisplay,
      });
      this.SelectCoDeveloper();
      this.SaveCapex(response.id);
      this.SaveOpex(response.id);
      this.SaveCapexBudgetSurvey(response.id);
      this.submitService.SubmitStageStatus(this.id, { status: 'forward', comment: '' }).subscribe(() => this.swalTool.Submit());
    }, error => this.response.error(error));
  }

  CurrentPage() {
    switch (this.page) {
      case 'dim-create':
        switch (this.type) {
          case 'draft': this.CreateDraftInitiative(); break;
          case 'submit': this.CreateSubmitInitiative(); break;
        }
        break;
      case 'dim-edit':
        switch (this.type) {
          case 'draft': this.UpdateDraftInitiative(); break;
          case 'submit': this.UpdateSubmitInitiative(); break;
        }
        break;
    }
  }

  Draft() {
    this.SaveDraft();
  }

  Submit() {
    this.SaveSubmit();
  }

  GetStatusTracking(id) {
    this.stageService.GetStatusTracking(id).subscribe(response => this.statusTrackings = response);
  }

  CheckStage(stage) {
    const stages =
      ['SIL1', 'SIL2', 'SIL3', 'SIL4', 'SIL5',
        'DM', 'VP', 'EVP/MD/SEVP/COE/PSD/CEO',
        'Budget Team', 'BOD', 'App. Request',
        'WBS Request', 'Budget Distribute', 'Budget Excellence Distribute', 'Budget Pool', 'admin'];
    return stages.indexOf(stage) !== -1;
  }

  ShowHistory(stage) {
    this.history = stage;
    this.HistoryStatus.show();
  }

  ShowViewLogHistory() {
    this.ViewLogHistoryModal.show();
  }

  CloseViewLogHistory() {
    this.ViewLogHistoryModal.hide();
  }

  CloseHistoryStatus() {
    this.HistoryStatus.hide();
  }

  onChangeCompany() {
    let companyName = this.initiativesForm.get('company').value;
    this.initiativesForm.get('organization').setValue(null);
    this.initiativesForm.get('plant').setValue(null);
    if (companyName) {
      let companyList = this.companyList.find(x => x.value == companyName);
      this.organizations = companyList.org;
      this.plants = companyList.plant;
      return true
    }
    this.organizations = [];
    this.plants = [];
    return false;
  }

  SetButton() {
    this.DisabledSubmit = true;
    setTimeout(() => this.DisabledSubmit = false, 3000);
  }
}
