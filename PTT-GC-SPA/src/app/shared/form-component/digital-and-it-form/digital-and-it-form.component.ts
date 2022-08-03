import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
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
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-digital-and-it-form',
  templateUrl: './digital-and-it-form.component.html',
  styleUrls: ['./digital-and-it-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DigitalAndItFormComponent implements OnInit {

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
    private modalService: BsModalService
  ) { }

  name: string;

  @Input() id: number;
  @Input() formGroup: FormGroup;
  page: string;

  IsOtherCompany: boolean;
  IsOtherPlant: boolean;
  surveyVersions: number;

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
    createdBy: null,
    updatedBy: null,
    itDigital: null,
    creatorName: null,
    surveyVersions: null
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
    T0001: null,
    T0002: null,
    T0003: null,
    T0004: null,
    T0005: null,
    T0006: null,
    T0007: null,
    T0008: null,
    T0009: null,
    T0010: null,
    T0011: null,
    T0012: null,
    T0013: null,
    T0014: null,
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



  getFormError(field) {
    return (this.formGroup.get('initiativesForm').get(field).touched || this.formGroup.get('initiativesForm').get(field).dirty) && this.formGroup.get('initiativesForm').get(field).invalid;
  }

  getDimformError(field) {
    return (this.formGroup.get('DimForm').get(field).touched || this.formGroup.get('DimForm').get(field).dirty) && this.formGroup.get('DimForm').get(field).invalid;
  }

  ngOnInit(): void {
    this.initiativeService.maskUnderline = 'create';
    this.companyList = this.companyService.companyList;
    if (!this.formGroup.get('initiativesForm')) {
      this.formGroup.addControl('initiativesForm', this.initiativesForm);
      this.formGroup.addControl('DimForm', this.DimForm);
    }
    if (!this.initiativeService.id) {
      this.itBudgetService.getLastSurveyVersions().subscribe((response) => {
        this.initiativeService.surveyVersions = Number(response);
        this.surveyVersions = Number(response);
        this.formGroup.get('initiativesForm').get('surveyVersions').setValue(Number(response));
        this.CheckPage();
        this.GetUser();
        this.GetYears();
        this.SetRegisterDate();
        this.GetPlants();
        this.GetHardwareList();
        this.GetSoftwareList();
        this.GetOrganizations();
        this.GetCompany();
        //this.GetCapexTopic();
        this.SetForm();
      });
    } else {
      this.CheckPage();
      // this.GetUser();
      // this.GetYears();
      // this.SetRegisterDate();
      // this.GetPlants();
      // this.GetHardwareList();
      // this.GetSoftwareList();
      // this.GetOrganizations();
      // this.GetCompany();
      // //this.GetCapexTopic();
      // this.SetForm();
    }
    // if sessionStorage.removeItem('id');
    // if (!this.formGroup.get('initiativesForm')) {
    //   this.formGroup.addControl('initiativesForm', this.initiativesForm);
    //   this.formGroup.addControl('DimForm', this.DimForm);
    // }
    // this.CheckPage();
    // this.GetUser();
    // this.GetYears();
    // this.SetRegisterDate();
    // this.GetPlants();
    // this.GetHardwareList();
    // this.GetSoftwareList();
    // this.GetOrganizations();
    // this.GetCompany();
    // //this.GetCapexTopic();
    // this.SetForm();
  }

  GetCapexTopic() {
    this.itBudgetService.GetCapexTopicVersion(this.initiativeService.surveyVersions).subscribe(capexTopic => {
      if (this.initiativeService.surveyVersions > 1) {
        if (capexTopic.length > 0) {
          this.initiativeService.setCapexTopics(capexTopic);
          capexTopic.forEach((element, index) => {
            if (element?.capexChoices?.length > 0) {
              if (!this.DimForm.get(element.topicId)) {
                // let dimform = this.formGroup.get('DimForm') as FormGroup;
                this.DimForm.addControl(element.topicId, new FormControl(null));
                this.DimForm.addControl(element.topicId + "_topicType", new FormControl(element.topicType));
              }
              if (capexTopic[index]['isYesOrNo']) {
                this.DimForm.get(element.topicId).disable();
              }

              if (capexTopic[index]['topicType'] == "multi") {
                element.capexChoices.forEach((choice, choiceIndex) => {
                  if (!this.DimForm.get(choice.choiceId)) {
                    // let dimform = this.formGroup.get('DimForm') as FormGroup;
                    this.DimForm.addControl(choice.choiceId, new FormControl(null));
                  }
                });
              } else {
                if (!this.DimForm.get(element.topicId + "_value")) {
                  // let dimform = this.formGroup.get('DimForm') as FormGroup;
                  this.DimForm.addControl(element.topicId + "_value", new FormControl(null));
                }
              }
            } else {
              if (!this.DimForm.get(element.topicId)) {
                // let dimform = this.formGroup.get('DimForm') as FormGroup;
                this.DimForm.addControl(element.topicId, new FormControl(null));
                this.DimForm.addControl(element.topicId + "_topicType", new FormControl(element.topicType));
              }
            }
          });
          this.CapexTopic = capexTopic;
        } else {
          this.CapexTopic = capexTopic;
        }
      } else {
        this.CapexTopic = capexTopic;
      }

      if (this.initiativeService.id) {
        this.GetITBudget();
      }
    });
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
    //const dim = ['dim-edit', 'dim-view', 'approve'];
    //this.page = dim.indexOf(sessionStorage.getItem('page')) !== -1 ? sessionStorage.getItem('page') : 'dim-create';
    this.page = this.initiativeService.page;
    switch (this.page) {
      case 'create-survey':
        this.name = 'New IT & digital Budget Survey';
        this.initiativeService.GetOwnerEmail({ text: this.initiativeService.username }).subscribe(
          responseEmail => {
            if (responseEmail) {
              this.initiativesForm.patchValue({ createdBy: responseEmail.ownerName });
            }
          });
        this.AddCapexForm();
        this.AddOpexForm();
        this.AddCapexBudgetSurvey();
        this.GetCapexTopic();
        break;
      case 'edit':
        this.name = 'Edit IT & digital Budget Survey';
        this.id = this.initiativeService.id;
        if (this.id) {
          this.GetInitiative();
          this.GetStatusTracking(this.id);
        }
        break;
      case 'approveEdit':
        this.name = 'IT & digital Budget Survey';
        this.id = this.initiativeService.id;
        if (this.id) {
          this.GetInitiative();
          this.GetStatusTracking(this.id);
        }
        break;
      case 'information':
      case 'approve':
      case 'overview-approve':
        this.name = 'IT & digital Budget Survey';
        this.id = this.initiativeService.id;
        if (this.id) {
          this.GetInitiative();
          this.GetStatusTracking(this.id);
        }
        this.initiativesForm.disable();
        this.DimForm.disable();
        break;
      case 'approveEdit':
        this.name = 'IT & digital Budget Survey';
        this.id = this.initiativeService.id;
        if (this.id) {
          this.GetInitiative();
          this.GetStatusTracking(this.id);
        }
        //this.initiativesForm.disable();
        //this.DimForm.disable();
        break;
      default:
        this.name = 'New IT & digital Budget Survey';
        this.initiativeService.GetOwnerEmail({ text: this.initiativeService.username }).subscribe(
          responseEmail => {
            if (responseEmail) {
              this.initiativesForm.patchValue({ createdBy: responseEmail.ownerName });
            }
          });
        this.AddCapexForm();
        this.AddOpexForm();
        this.AddCapexBudgetSurvey();
        this.GetCapexTopic();
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
    for (let index = 1; index <= 14; index++) {
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
    this.initiativesForm.patchValue({
      createdBy: this.createdBy ? this.createdBy : this.initiativeService.username,
      itDigital: this.DimForm.controls.type.value
    });
    switch (this.DimForm.controls.type.value) {
      case 'Project/System Enhancement':
        this.Question = true;
        this.showSoftware = false;
        this.showProject = true;

        this.isDisableCapex = true;
        this.isDisableOpex = true;

        this.DimForm.controls.capexNo.enable();

        // this.DimForm.controls.T0001.enable();
        // this.DimForm.controls.T0002.enable();
        // this.DimForm.controls.T0003.enable();
        // this.DimForm.controls.T0004.enable();
        // this.DimForm.controls.T0005.enable();
        // this.DimForm.controls.T0006.enable();


        this.CapexTopic.forEach((element, index) => {
          if (element?.isYesOrNo) {
            this.DimForm.get(element.topicId).patchValue('yes');
          }
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
    // this.dateRegisterDisplay = this.dateUtil.GetDate(new Date(registeringDate));
    // this.dateStartDisplay = this.dateUtil.GetDate(new Date(startingDate));
    // this.dateFinishDisplay = finishingDate ? this.dateUtil.GetDate(new Date(finishingDate)) : null;
    // this.dateRegister = this.dateUtil.SetDate(new Date(registeringDate));
    // this.dateStart = this.dateUtil.SetDate(new Date(startingDate));
    // this.dateFinish = finishingDate ? this.dateUtil.SetDate(new Date(finishingDate)) : null;

    this.initiativesForm.patchValue({
      registeringDate: registeringDate ? new Date(registeringDate) : this.dateUtil.GetToday,
      startingDate: startingDate ? new Date(startingDate) : null,
      finishingDate: finishingDate ? new Date(finishingDate) : null
    });
  }

  GetInitiative() {
    this.initiativeService.GetInitiative(this.id).subscribe(response => {
      this.initiativeService.surveyVersions = response.surveyVersions;
      this.surveyVersions = Number(response.surveyVersions);
      this.GetUser();
      this.GetYears();
      this.SetRegisterDate();
      this.GetPlants();
      this.GetHardwareList();
      this.GetSoftwareList();
      this.GetOrganizations();
      this.GetCompany();
      //this.GetCapexTopic();
      this.SetForm();


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

      if (response.createdBy) {
        this.initiativeService.GetOwnerEmail({ text: response.createdBy }).subscribe(
          responseEmail => {
            if (responseEmail) {
              this.initiativesForm.patchValue({ createdBy: responseEmail.ownerName });
            }
          });
      }

      // this.initiativesForm.patchValue({
      //   //registeringDate: this.dateRegisterDisplay,
      //   startingDate: this.dateStartDisplay,
      //   finishingDate: this.dateFinishDisplay
      // });

      switch (this.page) {
        case 'create-survey':
        case 'edit':
        case 'approveEdit':
          this.DimForm.enable();
          break;
        default:
          this.DimForm.disable();
          break;
      }

      switch (response.typeBenefit) {
        case 'FINANCIAL':
          this.showBenefit = true;
          //this.CalculatePayBackPeriod();
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
      this.GetCapexTopic();
    }, error => this.response.error(error));
  }







  GetHardware() {
    const control = this.DimForm.controls.hardware.get('capexHardware') as FormArray;
    for (let i = 0; i < this.capexHardware.length; i++) {
      control.push(this.CapexHardwareForm());
      control.at(i).patchValue(this.capexHardware[i]);
    }
    switch (this.page) {
      case 'create-survey':
      case 'edit':
        this.EditHardware();
        break;
      default:
        this.ViewHardware();
        break;
    }
  }

  GetSoftware() {
    const control = this.DimForm.controls.software.get('opexSoftware') as FormArray;
    let opexSum = 0;
    for (let i = 0; i < this.opexSoftware.length; i++) {
      control.push(this.OpexSoftwareForm());
      control.at(i).patchValue(this.opexSoftware[i]);
      opexSum += this.opexSoftware[i].totalMTHB;
    }
    this.DimForm.patchValue({
      opexSoftware: (opexSum).toFixed(2)
    });
    switch (this.page) {
      case 'create-survey':
      case 'edit':
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
          if (control.at(i).get('assetId').value === 'S9999' || control.at(i).get('assetId').value === 'S0015') {
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
          if (control.at(i).get('assetId').value === 'S9999' || control.at(i).get('assetId').value === 'S0015') {
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
            case 'create-survey':
            case 'edit':
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
          this.DimForm.patchValue({
            opexNo: item.opexNo,
            opexSummary: item.opexSummary
            // ,
            // opexSoftware: (Number(item.opexSummary) * 1000000).toFixed(2)
          });
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
          if (Number(this.IdCapex) > 0) {
            this.itBudgetService.GetHardware(this.IdCapex).subscribe(hardware => {
              this.capexHardware = hardware;
              this.capexHardware.length !== 0 ? this.GetHardware() : this.AddCapexForm();
            });
          }
          if (Number(this.IdOpex) > 0) {
            this.itBudgetService.GetSoftware(this.IdOpex).subscribe(software => {
              this.opexSoftware = software;
              this.opexSoftware.length !== 0 ? this.GetSoftware() : this.AddOpexForm();
            });
          }
          break;
      }
    });
  }

  GetCapexBudgetSurvey() {
    this.itBudgetService.GetCapexBudgetSurvey(this.id).subscribe(response => {
      this.BudgetSurvey = response;
      for (const item of this.BudgetSurvey) {

        if (this.initiativeService.surveyVersions == 1) {
          switch (item.topicId) {
            case 'T0001':
              this.CheckStatus('T0001', item.status);
              if (!this.DimForm.get('T0001')) {
                this.DimForm.addControl('T0001', new FormControl(null));
              }
              if (!this.DimForm.get('Law')) {
                this.DimForm.addControl('Law', new FormControl(null));
              }
              if (!this.DimForm.get('Impact')) {
                this.DimForm.addControl('Impact', new FormControl(null));
              }
              if (!this.DimForm.get('Effective')) {
                this.DimForm.addControl('Effective', new FormControl(null));
              }
              this.DimForm.patchValue({ T0001: item.status });
              this.DimForm.patchValue({ Law: item.law });
              this.DimForm.patchValue({ Impact: item.impact });
              this.DimForm.patchValue({ Effective: this.dateUtil.GetDate(new Date(item.effective)) });
              break;
            case 'T0002':
              if (!this.DimForm.get('T0002')) {
                this.DimForm.addControl('T0002', new FormControl(null));
              }
              if (!this.DimForm.get('CH0002')) {
                this.DimForm.addControl('CH0002', new FormControl(null));
              }
              this.CheckStatus('T0002', item.status);
              this.DimForm.patchValue({ T0002: item.status });
              this.DimForm.patchValue({ CH0002: item.choiceValue });
              break;
            case 'T0003':
              this.CheckStatus('T0003', item.status);
              if (!this.DimForm.get('T0003')) {
                this.DimForm.addControl('T0003', new FormControl(null));
              }
              if (!this.DimForm.get('CH0003')) {
                this.DimForm.addControl('CH0003', new FormControl(null));
              }
              this.DimForm.patchValue({ T0003: item.status });
              this.DimForm.patchValue({ CH0003: item.choiceValue });
              break;
            case 'T0004':
              this.CheckStatus('T0004', item.status);
              if (!this.DimForm.get('T0004')) {
                this.DimForm.addControl('T0004', new FormControl(null));
              }
              if (!this.DimForm.get('CH0004')) {
                this.DimForm.addControl('CH0004', new FormControl(null));
              }
              this.DimForm.patchValue({ T0004: item.status });
              this.DimForm.patchValue({ CH0004: item.choiceValue });
              break;
            case 'T0005':
              this.CheckStatus('T0005', item.status);
              if (!this.DimForm.get('T0005')) {
                this.DimForm.addControl('T0005', new FormControl(null));
              }
              if (!this.DimForm.get('CH0005')) {
                this.DimForm.addControl('CH0005', new FormControl(null));
              }
              this.DimForm.patchValue({ T0005: item.status });
              this.DimForm.patchValue({ CH0005: item.choiceValue });
              break;
            case 'T0006':
              this.CheckStatus('T0006', item.status);
              if (!this.DimForm.get('T0006')) {
                this.DimForm.addControl('T0006', new FormControl(null));
              }
              if (!this.DimForm.get('CH0006')) {
                this.DimForm.addControl('CH0006', new FormControl(null));
              }
              this.DimForm.patchValue({ T0006: item.status });
              this.DimForm.patchValue({ CH0006: item.choiceValue });
              break;
          }
        } else {
          let index = this.CapexTopic.findIndex(x => x.topicId == item.topicId);
          //this.CapexTopic[index].isYesOrNo = item.status == 'yes' ? 'yes' : 'no';
          if (item.topicId == "T0001" || item.topicId == "T0008") {
            this.DimForm.get(item.topicId).patchValue(item.status == 'yes' ? 'yes' : 'no');
            if (item.choiceId == 'CH0003') {
              this.DimForm.get(item.choiceId).patchValue(item.choiceValue?.toString()?.length > 0 ? new Date(item.choiceValue) : null);
            } else {
              this.DimForm.get(item.choiceId).patchValue(item.topicId == "T0008" ? Boolean(item.choiceValue) : item.choiceValue);
            }
            if (this.initiativeService.viewMode) {
              this.DimForm.get(item.choiceId).disable();
            }
          } else {
            this.DimForm.get(item.topicId)?.patchValue(item.status == 'yes' ? 'yes' : 'no');
            this.DimForm.get(item.topicId + '_value')?.patchValue(item.choiceValue);
            if (this.initiativeService.viewMode && this.DimForm.get(item.topicId + '_value')) {
              this.DimForm.get(item.topicId + '_value').disable();
            }
          }

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
    const date = this.dateUtil.GetDateOnly(dateNow);
    this.initiativesForm.patchValue({ registeringDate: date });
  }

  GetHardwareList() {
    this.itBudgetService.GetHardwareVersionList(this.initiativeService.surveyVersions).subscribe(hardware => this.hardware = hardware);
  }

  GetSoftwareList() {
    this.itBudgetService.GetSoftwareVersionList(this.initiativeService.surveyVersions).subscribe(software => this.software = software);
    // this.software = [];
    // let softwareMock = {

    //   assetId: 'S000000',
    //   assetName: 'New software/license (non-standard-license)',
    //   assetType: 'Software',
    //   costPerUnit: 9999,
    //   id: 99
    //   // assetType: "New software/license (non-standard-license)",
    //   // assetName: "",
    //   // costPerUnit: 9999
    // }
    // this.software.push(softwareMock);
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
    if (control.at(i).get('assetId').value === 'S9999' || control.at(i).get('assetId').value === 'S0015') {
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


    var result = ((parseFloat(costEstCapex) + parseFloat(costEstOpex))) / parseFloat(benefitAmount);


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
    if (name && !this.DimForm.get(name)) {
      this.DimForm.addControl(name, new FormControl(null));
    }
    return name;
  }

  ChoiceNameOld(name) {
    return name.replace('T', 'CH');
  }

  ChangeTopic(event, topic) {
    // this.CapexTopic.forEach(result => {
    //   if (result.topicId === topic) {
    //     switch (event.target.value) {
    //       case 'yes': result.isYesOrNo = true; break;
    //       case 'no': result.isYesOrNo = false; break;
    //     }
    //   }
    // });
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

  SetEdit(id) {
    this.page = 'edit';
    this.name = 'Edit IT & digital Budget Survey';
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



  RequestCapexHideShowCheck() {
    let typeBenefit = this.initiativesForm.get('typeBenefit')?.value;
    if (typeBenefit === 'FINANCIAL') {
      this.showBenefit = true;
      this.EnableForm(['benefitAmount', 'payBackPeriod']);
    } else if (typeBenefit === 'NON-FINANCIAL') {
      this.initiativesForm.patchValue({ benefitAmount: '', payBackPeriod: '' });
      this.DisableForm(['benefitAmount', 'payBackPeriod']);
      this.showBenefit = false;
    }
  }



  EnableForm(FormControl) {
    // let formControl = ['typeOfInvestment', 'budgetType', 'ram',
    //   'jFactor', 'irr', 'fxExchange', 'costEstCapex',
    //   'costEstOpex', 'costEstCapexType', 'costEstOpexType',
    //   'budgetSource', 'typeBenefit', 'wacc', 'benefitAmount',
    //   'payBackPeriod', 'divestment'];
    // FormControl.forEach((control) => {
    //   if (!this.initiativeService.viewMode) {
    //     this.initiativesForm.get(control)?.enable();
    //   }
    // })

    if (!this.initiativeService.viewMode) {
      // if (FormControl.indexOf('typeOfInvestment') !== -1) { this.initiativesForm.controls.typeOfInvestment.enable(); }
      // if (FormControl.indexOf('budgetType') !== -1) { this.initiativesForm.controls.budgetType.enable(); }
      // if (FormControl.indexOf('ram') !== -1) { this.initiativesForm.controls.ram.enable(); }
      // if (FormControl.indexOf('jFactor') !== -1) { this.initiativesForm.controls.jFactor.enable(); }
      // if (FormControl.indexOf('irr') !== -1) { this.initiativesForm.controls.irr.enable(); }
      // if (FormControl.indexOf('fxExchange') !== -1) { this.initiativesForm.controls.fxExchange.enable(); }
      // if (FormControl.indexOf('costEstCapex') !== -1) { this.initiativesForm.controls.costEstCapex.enable(); }
      // if (FormControl.indexOf('costEstOpex') !== -1) { this.initiativesForm.controls.costEstOpex.enable(); }
      // if (FormControl.indexOf('costEstCapexType') !== -1) { this.initiativesForm.controls.costEstCapexType.enable(); }
      // if (FormControl.indexOf('costEstOpexType') !== -1) { this.initiativesForm.controls.costEstOpexType.enable(); }
      // if (FormControl.indexOf('budgetSource') !== -1) { this.initiativesForm.controls.budgetSource.enable(); }
      // if (FormControl.indexOf('typeBenefit') !== -1) { this.initiativesForm.controls.typeBenefit.enable(); }
      // if (FormControl.indexOf('wacc') !== -1) { this.initiativesForm.controls.wacc.enable(); }
      if (FormControl.indexOf('benefitAmount') !== -1) { this.initiativesForm.controls.benefitAmount.enable(); }
      if (FormControl.indexOf('payBackPeriod') !== -1) { this.initiativesForm.controls.payBackPeriod.enable(); }
      // if (FormControl.indexOf('divestment') !== -1) { this.initiativesForm.controls.divestment.enable(); }
    }
  }

  DisableForm(FormControl) {
    //   if (FormControl.indexOf('typeOfInvestment') !== -1) { this.initiativesForm.controls.typeOfInvestment.disable(); }
    //   if (FormControl.indexOf('budgetType') !== -1) { this.initiativesForm.controls.budgetType.disable(); }
    //   if (FormControl.indexOf('ram') !== -1) { this.initiativesForm.controls.ram.disable(); }
    //   // if (FormControl.indexOf('jFactor') !== -1) { this.initiativesForm.controls.jFactor.disable(); }
    //   if (FormControl.indexOf('irr') !== -1) { this.initiativesForm.controls.irr.disable(); }
    //   if (FormControl.indexOf('fxExchange') !== -1) { this.initiativesForm.controls.fxExchange.disable(); }
    //   if (FormControl.indexOf('costEstCapex') !== -1) { this.initiativesForm.controls.costEstCapex.disable(); }
    //   if (FormControl.indexOf('costEstOpex') !== -1) { this.initiativesForm.controls.costEstOpex.disable(); }
    //   if (FormControl.indexOf('costEstCapexType') !== -1) { this.initiativesForm.controls.costEstCapexType.disable(); }
    //   if (FormControl.indexOf('costEstOpexType') !== -1) { this.initiativesForm.controls.costEstOpexType.disable(); }
    //   if (FormControl.indexOf('budgetSource') !== -1) { this.initiativesForm.controls.budgetSource.disable(); }
    //   if (FormControl.indexOf('typeBenefit') !== -1) { this.initiativesForm.controls.typeBenefit.disable(); }
    //   if (FormControl.indexOf('wacc') !== -1) { this.initiativesForm.controls.wacc.disable(); }
    if (FormControl.indexOf('benefitAmount') !== -1) { this.initiativesForm.controls.benefitAmount.disable(); }
    if (FormControl.indexOf('payBackPeriod') !== -1) { this.initiativesForm.controls.payBackPeriod.disable(); }
    // if (FormControl.indexOf('divestment') !== -1) { this.initiativesForm.controls.divestment.disable(); }

  }

  get getInitiativeService() {
    return this.initiativeService;
  }

  get creatorName() {
    return this.formGroup.get('initiativesForm').get('createdBy').value;
  }

  get viewMode() {
    return this.initiativeService.viewMode;
  }

  keyPress(event: any) {
    // const pattern = /[0-9]{1,2}([.][0-9]{1,2})/;
    const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
    if (isNaN(parseFloat(inputChar)) && inputChar != '.') {
      event.preventDefault();
    }
  }

  getShowChoice(topicId) {
    let DimForm = (this.formGroup.get('DimForm') as FormGroup).getRawValue();
    if (!DimForm) {
      return false;
    }
    return (DimForm[topicId] == 'yes' || DimForm[topicId] == 'true') ? true : false;
  }
}


