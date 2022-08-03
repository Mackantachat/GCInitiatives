import { RoleSettingDetail } from './../../../core/services/permission/permission.service';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyList } from '@models/companyList';
import { DetailInformation } from '@models/detailInformation';
import { StageDetail, StageDetailById } from '@models/initiative';
import { MainPlant } from '@models/MainPlant';
import { Owner } from '@models/owner';
import { CompamyService } from '@services/company/compamy.service';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { DetailService } from '@services/detail/detail.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { PermissionService } from '@services/permission/permission.service';
import { PimService } from '@services/pim/pim.service';
import { StageService } from '@services/stage/stage.service';
import { SwalTool } from '@tools/swal.tools';
import { DateUtil } from '@utils/date.utils';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ShowControlDetailPim } from '@models/ShowControlDetailPim';
import { ValidateService } from '@services/validate/validate.service';
import { Initiative } from '@models/initiative';
import { ProgressService } from '@services/progress/progress.service';



@Component({
  selector: 'app-detail-pim-form',
  templateUrl: './detail-pim-form.component.html',
  styleUrls: ['./detail-pim-form.component.css']
})
export class DetailPimFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() formGroup: FormGroup;
  @Input() id: number;

  generalData: Initiative;
  detailPimForm: FormGroup;
  teamSupportCommentForm: FormArray = new FormArray([]);
  eMocs: FormArray;
  params: any = {};
  @ViewChild("alignWithCorporateStrategyCheck")
  alignWithCorporateStrategyCheck: ElementRef;
  @ViewChild("trackMaxBenefitCheck") trackMaxBenefitCheck: ElementRef;
  directorList: any = [];
  projectManagerList: any = [];
  projectEngineerList: any = [];
  processEngineerList: any = [];
  divManagerProcessList: any = [];
  owners: any = [];
  presidentList: any = [];
  managerList: any = [];
  alignWithCorporateStrategy: boolean;
  RequestCapex: boolean;
  RequestOpex: boolean;
  RequestProjectEngineer: boolean;
  trackMaxBenefit: boolean;
  companyList: CompanyList[];
  goalAchievementList = ['Safety', 'Environment', 'Maintain Reliability', 'Loss of Product', 'Profit Increasing', 'Cost Saving', 'Energy Saving', 'Working Time Reduction', 'Product Quality', 'Other'];
  isGate0Stage: boolean;
  isGate1Stage: boolean;
  isGate2Stage: boolean;
  isGate3Stage: boolean;
  isGate4Stage: boolean;
  showProjectEngineer: boolean;
  showProjectTeam: boolean;
  requestEmoc: boolean;
  RequestHandoverExecution: boolean;
  RequestHandoverPlantOwner: boolean;
  showEmocMax: boolean;
  showEmocCapex: boolean;
  showProjectTeamMax: boolean;
  showProjectTeamCapex: boolean;
  showTabCapex: boolean;
  isMaxShowGate1: boolean;
  // isMaxShowGate3 : boolean;
  //process type
  isCpi: boolean;
  isStrategy: boolean;
  isCim: boolean;
  isCapex: boolean;
  isDim: boolean;
  isMax: boolean;
  isPim: boolean;
  newFeature: boolean;
  ishideTeamSupport: boolean;

  goalsAchievements = [
    { id: 0, name: "" },
    { id: 1, name: "Safety" },
    { id: 2, name: "Environment" },
    { id: 3, name: "Law & Regulation" },
    { id: 4, name: "Maintain Reliability" },
    { id: 5, name: "Loss of Product" },
    { id: 6, name: "Profit Increasing " },
    { id: 7, name: "Cost Saving" },
    { id: 8, name: "Energy Saving" },
    { id: 9, name: "Working Time Reduction" },
    { id: 10, name: "Product Quality" },
    { id: 11, name: "Other" },
  ];

  changeTypes = [
    { id: 0, name: "" },
    { id: 1, name: "Normal" },
    { id: 2, name: "Temporary" },
    { id: 3, name: "Emergency" },
  ];

  mocCategories = [
    { id: 0, name: "" },
    { id: 1, name: "Equipment and piping change" },
    { id: 2, name: "Alarm and bypass interlock" },
    { id: 3, name: "Computer program revision" },
    { id: 4, name: "Chemical change" },
    { id: 5, name: "Operating control limit" },
    { id: 6, name: "Non-AVL" },
    { id: 7, name: "Containment change" },
    { id: 8, name: "Temporary hose" },
    { id: 9, name: "Online stop leak" },
    { id: 10, name: "Preservation" },
    { id: 11, name: "Admin building" },
    { id: 12, name: "Other" },
  ];

  sponsorEvps: Owner[] = [];
  workstreamLeadVps: Owner[] = [];
  toFinances: Owner[] = [];
  ctos: Owner[] = [];
  cfos: Owner[] = [];
  costEst: Number;
  phaseList: [] = [];
  reasonOfChange = "";
  plant = "";
  detailOfChange = "";
  mocChampion = "";
  Updating: boolean;
  showApprovalPlan: boolean;
  constructor(
    private fb: FormBuilder,
    private dateUtil: DateUtil,
    private pimService: PimService,
    private detailInformationService: DetailInformationService,
    private detailSerivice: DetailService,
    private initiativeService: InitiativeService,
    private companyService: CompamyService,
    private swalTools: SwalTool,
    private progressService: ProgressService,
    public ps: PermissionService,
    private stageService: StageService,
    private validateService: ValidateService
  ) {
    this.detailPimForm = this.fb.group({
      id: 0,
      name: [{ value: null, disabled: true }, Validators.required],
      year: '',
      revisionNo: [{ value: null, disabled: true }],
      ownerName: [{ value: null, disabled: true }],
      workstream: [{ value: null, disabled: true }],
      initiativeYear: '',
      isAlignWithCorporateStrategy: false,
      strategicObjective: [
        { value: null, disabled: true },
        Validators.required,
      ],
      strategy: [{ value: null, disabled: true }, Validators.required],
      subWorkStream: [{ value: null, disabled: true }],
      initiativeType: [{ value: null, disabled: true }],
      projectPriority: [{ value: null, disabled: true }],
      projectControl: [{ value: null, disabled: true }],
      kickoffMeeting: [{ value: null, disabled: false }, Validators.required],
      gate1Date: [{ value: null, disabled: false }, Validators.required],
      simProjectSkipGate2: false,
      gate2Date: [{ value: null, disabled: false }, Validators.required],
      gate3Date: [{ value: null, disabled: false }, Validators.required],
      iL3Date: [{ value: null, disabled: true }, Validators.required],
      iL4Date: [{ value: null, disabled: true }, Validators.required],
      iL5Date: [{ value: null, disabled: true }, Validators.required],
      isImpactProduction: "false",
      isMulti: "true",
      goalAchievement: null,
      assumptionOfGoal: null,
      reasonForChange: null,
      isMainPlant: "false",
      projectDirector: null,
      projectManager: [null, Validators.required],
      projectEngineer: [null, Validators.required],
      projectSponsor: null,
      processEngineer: null,
      divMgrOfProcessEngineer: null,
      smes: null,
      sponsorEvp: null,
      workstreamLeadVp: null,
      toFinance: null,
      cto: null,
      cfo: null,
      eMocs: this.fb.array([]),
      projectDocumentDatabase: null,

      // gate
      gate: new FormControl(1),
      vacDate: new FormControl(this.dateUtil.GetToday),
      vacStatus: new FormControl('Status OK'),
      reviseBudgetRevision: new FormControl(999),
      gateDate: new FormControl(this.dateUtil.GetToday),
      gateStatus: new FormControl('Status OK'),
      costEstimate: new FormControl(999),
      receivedOpexBudget: new FormControl(999),
      receivedCapexGate2: new FormControl(999),
      requestCapexGate3: new FormControl(999),
      requestOpex: new FormControl(999),
      additionalOpexBudget: new FormControl(999),
      tieInLongLeadItemsBudget: new FormControl(999),
      overallCapex: new FormControl(999),
      eMocStatus: new FormControl('Status OK'),
      executionLookbackStatus: new FormControl('Status OK'),
      sapStatus: new FormControl('Status OK'),
      benefit: new FormControl(999),
      irr: new FormControl(10),
      simplePayback: new FormControl(1),
      ram: new FormControl(999),
      jFactor: new FormControl(9),
      picMemberCenter: new FormControl(['TPX', 'QSE']),
      picMemberUpStream: new FormControl(['ARO', 'REF']),
      picMemberDownStream: new FormControl(['EOB']),
      requestPool: new FormControl(false),
      note: new FormControl('Remark ...'),
      simplefiedProject: new FormControl(false),
      //attach
      useExternalEmoc: new FormControl("false"),
      externalEmoc: new FormControl(null),

      attachProcess: new FormControl(false),
      attachPlotPlanSite: new FormControl(false),
      attachReference: new FormControl(false),
      attachBenefit: new FormControl(false),

      //Highlight Work
      highlightWorkStatus: new FormControl(null),
      highlightWorkConCern: new FormControl(null),
      nextActivities: new FormControl(null),

      // Team Support Comment
      requestTeamSupport: new FormControl(false),
      teamSupports: new FormControl(null),
      teamSupportComments: this.teamSupportCommentForm,
      requestHandoverExecution: new FormControl(false),
      requestHandoverPlantOwner: new FormControl(false),
      vpOfPlantOwner: new FormControl(null),
      dmOfPlantOwner: new FormControl(null),
      plantEngineer: new FormControl(null),
      plantProcessEngineer: new FormControl(null),
      divMgrOfPlantProcessEngineer: new FormControl(null),
    });
  }
  strategicObjectives = [];
  strategies = [];
  minMode: BsDatepickerViewMode = 'year';
  bsConfig: Partial<BsDatepickerConfig>;
  bsConfigYear: Partial<BsDatepickerConfig>;
  mainPlantSelected: boolean;

  //team Support
  ShowTeamSupportinStage: boolean;
  ShowTeamSupport: boolean;
  passStageAndDisableHandoverEx: boolean = false;
  passStageAndDisableHandoverPlantOwner: boolean = false;

  username: string = '';
  adminCIM = false;
  pmoTPX = false;
  isOwner = false;
  isNotAddComment = false;

  gateStatus: {
    gate0: boolean;
    gate1: boolean;
    gate2: boolean;
    gate3: boolean;
    gate4: boolean;
  } = {
      gate0: false,
      gate1: false,
      gate2: false,
      gate3: false,
      gate4: false
    }

  get GetSimProjectSkipGate2() {

    if (this.detailPimForm.get('simProjectSkipGate2').value == true || this.initiativeService.viewMode) {
      this.detailPimForm.get('gate2Date').disable();
    } else {
      this.detailPimForm.get('gate2Date').enable();
    }


    return this.detailPimForm.get('simProjectSkipGate2').value;
  }
  // get IsMax() {
  //   return this.initiativeService.suggestionStatus.max;
  // }
  getFormError(field) {
    return (this.formGroup.get('detailPimForm').get(field).touched || this.formGroup.get('detailPimForm').get(field).dirty)
      && this.formGroup.get('detailPimForm').get(field).invalid;
  }
  getFormArrayEmocError(index, field) {
    return ((this.formGroup.get('detailPimForm').get('eMocs') as FormArray).at(index).get(field).touched
      || (this.formGroup.get('detailPimForm').get('eMocs') as FormArray).at(index).get(field).dirty)
      && (this.formGroup.get('detailPimForm').get('eMocs') as FormArray).at(index).get(field).invalid;
  }

  ngOnInit(): void {
    this.initiativeService.getGeneralData.subscribe((data) => this.generalData = data);
    if (this.ps.roleSettingDetail.findIndex(i => i.pageId?.toString() == 'ADMIN-CIM') >= 0) {
      this.adminCIM = true;
    }
    if (this.ps.roleSettingDetail.findIndex(i => i.pageId?.toString() == 'PMO-TPX') >= 0) {
      this.pmoTPX = true;
    }

    // get user login
    this.initiativeService.username = localStorage.getItem('user');
    this.initiativeService.GetUser(this.initiativeService.username).subscribe(user => {
      this.username = user.ownerName;
      this.initiativeService.GetInitiative(this.initiativeService.id).subscribe(res => {
        if (res.ownerName == user.ownerName) {
          this.isOwner = true;
        }
      });
    });

    this.initiativeService.getNewFeature().subscribe((newFeatureRes) => {
      this.initiativeService.newFeature = newFeatureRes;
      this.newFeature = newFeatureRes;
    });

    if (!this.formGroup.get('detailPimForm')) {
      this.formGroup.addControl('detailPimForm', this.detailPimForm)
    }
    this.companyList = this.companyService.companyList;
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
    this.bsConfigYear = Object.assign({}, { isAnimated: true, dateInputFormat: 'YYYY', minMode: this.minMode });
    //this.eMocs = this.detailPimForm.controls.eMocs as FormArray;
    this.getOwner();
    this.GetInitiativeDetail();
    this.initPlantArray();
  }

  ngOnDestroy(): void {
    this.initiativeService.setInitiativeStageDetail([] as StageDetailById[]);
  }

  OnChangeStrategic(event) {
    this.detailPimForm.controls.strategy.enable();
    this.detailPimForm.controls.strategy.setValidators([Validators.required]);
    this.detailPimForm.controls.strategy.updateValueAndValidity();
    const strategicObjectiveId = event.target.value;
    this.detailSerivice.GetStrategies(strategicObjectiveId).subscribe(strategies => this.strategies = strategies);
  }

  SearchPerson(event, position) {
    this.GetPerson(position, event.term);
  }

  ClearPerson(position) {
    this.GetPerson(position);
  }
  SearchOwnerName(event) {
    this.GetOwners(event.term);
  }

  ClearOwnerName() {
    this.GetOwners();
  }
  GetOwners(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.owners = owners;
    });
  }

  GetPerson(Position, Text?) {
    this.params.text = Text ? Text : '';
    switch (Position.toLowerCase()) {
      case 'dm':
        this.initiativeService.GetOwners(this.params).subscribe(owners => { this.managerList = owners; });
        break;
      case 'vp':
        this.initiativeService.GetOwners(this.params).subscribe(owners => { this.presidentList = owners; });
        break;
      case 'director':
        this.initiativeService.GetOwners(this.params).subscribe(owners => { this.directorList = owners; });
        break;
      case 'projectmanager':
        this.initiativeService.GetOwners(this.params).subscribe(owners => { this.projectManagerList = owners; });
        const selected = this.detailPimForm.get('projectManager').value
        // console.log('selected: ', selected);    
        this.initiativeService.setPimProjectManager(selected)
        break;
      case 'projectengineer':
        this.initiativeService.GetOwners(this.params).subscribe(owners => { this.projectEngineerList = owners; });
        break;
      case 'processengineer':
        this.initiativeService.GetOwners(this.params).subscribe(owners => { this.processEngineerList = owners; });
        break;
      case 'divmanagerprocess':
        this.initiativeService.GetOwners(this.params).subscribe(owners => { this.divManagerProcessList = owners; });
        break;
    }
  }

  GetInitiativeDetail() {
    this.initiativeService.GetInitiative(this.initiativeService.id).subscribe(res => {
      let Indicator = {
        variable: ['projectManager'],
        indicator: ['@projectmanager']
      };
      if (res) {
        this.isCpi = res.cpi ? true : false;
        this.isStrategy = res.strategy ? true : false;
        this.isCim = res.cim ? true : false;
        this.isCapex = res.directCapex ? true : false;
        this.isDim = res.dim ? true : false;
        this.isMax = res.max ? true : false;
        this.isPim = res.pim ? true : false;
        this.ishideTeamSupport = false;

        //prefill
        this.reasonOfChange = res.background;
        this.detailOfChange = res.scopeOfWork;
        this.plant = res.plant;
        res.requestProjectEngineer ? this.mocChampion = this.detailPimForm.get('projectEngineer').value : "";

        //ShowTabCapex
        this.showTabCapex = (res.directCapex && !res.requestProjectEngineer) || (res.capexTabStatus && res.capexTabStatus > 0) ? true : false;

        //stage control
        res.requestCapex === "true" ? this.RequestCapex = true : this.RequestCapex = false;
        res.requestOpex === "trueOpex" ? this.RequestOpex = true : this.RequestOpex = false;



        //Stage Control TeamSupportCIM Show 
        if (this.isCim == true && (res.stage != null && res.stage != '' && res.stage != 'Admin Check' && res.stage != 'First Review-1' && res.stage != 'First Review-2')) {
          this.ShowTeamSupportinStage = true;
        }

        this.RequestProjectEngineer = Boolean(res.requestProjectEngineer);

        // Flow Direct CAPEX
        if(this.isCapex)
        {
          this.showEmocCapex = false;
          this.showProjectTeamCapex = false;

          if (this.RequestProjectEngineer) {
            this.showEmocCapex = false;
            this.showProjectTeamCapex = false;

            if (res.stage != null && res.stage != '') {
              this.showEmocCapex = true;
              this.showProjectTeamCapex = true;
            }
          }
          else {
            this.showEmocCapex = true;
            this.showProjectTeamCapex = true;
          }
        }
        // End Flow Direct CAPEX
        // Flow MAX
        if(this.isMax)
        {
          this.showEmocMax = false;
          this.showProjectTeamMax = false;
          this.isMaxShowGate1 = false

          if (this.RequestProjectEngineer) {
            if (this.RequestCapex == true || this.RequestOpex == true) {
              if (res.stage != null && res.stage != '' && res.stage != 'SIL1' && res.stage != 'IL0') {
                this.showEmocMax = true;
                this.showProjectTeamMax = true;
              }
            }
          }
          if (res.stage != 'SIL1' && res.stage != 'IL0' && res.stage != 'Assign Project Eng.') {
            if (this.RequestCapex == true || this.RequestOpex == true) {
              if (res.stage != null && res.stage != '') {
                this.showEmocMax = true;
                this.showProjectTeamMax = true;
              }
              else {
                this.showEmocMax = false;
              }
            }
          }
          if (this.RequestCapex == false && this.RequestOpex == false) {
            this.showEmocMax = true;
          }
        }
        // End Flow MAX

        let showProjectTeamStages = ['initiative-1', 'initiative-2', 'initiative-3'];
        if (res.initiativeType != 'max') {
          if (this.initiativeService.suggestionStatus.stage !== null && showProjectTeamStages.indexOf(this.initiativeService.suggestionStatus.stage?.toLowerCase()) < 0) {
            this.isGate0Stage = true;
            if (this.initiativeService.suggestionStatus.stage?.toLowerCase() === 'gate0 : phase1-1') {
              if (this.RequestProjectEngineer) {
                this.showProjectEngineer = true;
              }
              this.detailPimForm.get('gate1Date').disable();
              this.detailPimForm.get('gate2Date').disable();
              this.detailPimForm.get('gate3Date').disable();
            }
            else {
              this.showProjectTeam = true;
            }
          }
          else {
            this.detailPimForm.get('gate1Date').disable();
            this.detailPimForm.get('gate2Date').disable();
            this.detailPimForm.get('gate3Date').disable();
            this.isGate0Stage = false;
          }

        }
        this.detailPimForm.updateValueAndValidity();

        this.pimService.getMainPlant().subscribe(res => {
          // let disableEmoc: boolean = false;
          let emocFormArray = this.detailPimForm.get('eMocs') as FormArray;
          if (res.length > 0) {
            for (var i = 0; i < res.length; i++) {
              let eMoc = this.fb.group(this.createEMoc());
              eMoc.patchValue(res[i]);
              eMoc.patchValue({
                typeOfChange: parseInt(res[i].typeOfChange),
                mocCategory: parseInt(res[i].mocCategory),
                expireDate: res[i].expireDate ? new Date(res[i].expireDate) : null,
                mainPlanId: res[i].mainPlanId
              });

              // if(res[i].typeOfChange == '2'){
              //   eMoc.controls.expireDate.enable();
              // } 
              // else {
              //   eMoc.controls.expireDate.disable();
              // }
              emocFormArray.push(eMoc);
              // if (res[i].emocNo) {
              //  // emocFormArray.at(i).disable();
              //   emocFormArray.at(i).get('eMocTitle').disable();
              // }
              //this.eMocs.push(eMoc);
            }
          }
          else {
            this.addEMoc();
          }

          if (this.initiativeService.viewMode) {
            this.detailPimForm.get('eMocs').disable();
          }
        });
      }


      this.detailPimForm.patchValue({
        year: res.year,
      });

      this.detailInformationService.GetDetailInformation(this.id).subscribe(resDetail => {
        if (resDetail) {

          //check show gate Date type max
          /*if (this.stageService.checkStageEqualAndOverIL1() && res.initiativeType === "max" && Boolean(resDetail.requestSubPic)) {
            this.showApprovalPlan = true;
          } else {
            this.showApprovalPlan = false;
          }*/

          this.requestEmoc = resDetail.useExternalEmoc;

          this.alignWithCorporateStrategy = resDetail.isAlignWithCorporateStrategy;
          if (this.alignWithCorporateStrategy) {
            this.detailPimForm.controls.strategicObjective.enable();
            this.detailPimForm.controls.strategy.enable();
            this.detailSerivice.GetStrategicObjectives(this.detailPimForm.get('year').value).subscribe(result => {
              this.strategicObjectives = result;
              if (resDetail.strategicObjective !== null && resDetail.strategy !== null) {
                this.detailSerivice.GetStrategies(resDetail.strategicObjective).subscribe(result2 => {
                  this.strategies = result2;
                });
              }
            });
          }
          //console.log(this.initiativeService.initiativeStageDetail.value)

          let stageDetail: StageDetailById[] = this.initiativeService.initiativeStageDetail.value
          let requestHandoverExecutionDefault: boolean = true;
          let requestHandoverPlantOwnerDefault: boolean = false;

          let currentSequence = stageDetail.find(x => x.initiativeId == this.initiativeService.id && x.currentStage == res.stage && x.flowType == res.flowType && x.subtype == res.initiativeSubType);
          let detailFSSequence = stageDetail.find(x => x.initiativeId == this.initiativeService.id && this.stageService.CimCheckStageForTeamSupport.indexOf(x.currentStage) >= 0 && x.flowType == res.flowType && x.subtype == res.initiativeSubType);
          let executionSequence = stageDetail.find(x => x.initiativeId == this.initiativeService.id && x.currentStage == 'Execution-1' && x.flowType == res.flowType && x.subtype == res.initiativeSubType);
          if (res.cim && detailFSSequence && currentSequence) {
            requestHandoverExecutionDefault = currentSequence.sequence == detailFSSequence.sequence;
            this.passStageAndDisableHandoverEx = currentSequence.sequence > detailFSSequence.sequence;
            requestHandoverPlantOwnerDefault = currentSequence.sequence == executionSequence.sequence;
            this.passStageAndDisableHandoverEx = currentSequence.sequence > executionSequence.sequence;
          }

          this.detailPimForm.patchValue(resDetail);

          let showControl: ShowControlDetailPim = {
            showProjectEngineer: Boolean(this.showProjectEngineer),
            showProjectTeam: Boolean(this.showProjectTeam),
            getSimProjectSkipGate2: Boolean(this.detailPimForm.get('simProjectSkipGate2').value),
            isGate0Stage: Boolean(this.isGate0Stage),
            showApprovalPlan: false
          }
          this.validateService.setShowControlDetailPim(showControl);

          this.detailPimForm.patchValue({
            kickoffMeeting: resDetail.kickoffMeeting ? new Date(resDetail.kickoffMeeting) : null,
            gate1Date: resDetail.gate1Date ? new Date(resDetail.gate1Date) : null,
            gate2Date: resDetail.gate2Date ? new Date(resDetail.gate2Date) : null,
            gate3Date: resDetail.gate3Date ? new Date(resDetail.gate3Date) : null,
            teamSupport: resDetail.teamSupports,
            requestTeamSupport: resDetail.requestTeamSupport,
            requestHandoverExecution: resDetail.requestHandoverExecution || requestHandoverExecutionDefault ? true : false,
            requestHandoverPlantOwner: resDetail.requestHandoverPlantOwner || requestHandoverPlantOwnerDefault ? true : false,
          });

          //this.canAddNewComment(resDetail.teamSupports);

          this.ShowTeamSupport = resDetail.requestTeamSupport;
          this.RequestHandoverExecution = resDetail.requestHandoverExecution || requestHandoverExecutionDefault;
          this.RequestHandoverPlantOwner = resDetail.requestHandoverPlantOwner || requestHandoverPlantOwnerDefault;

          if (resDetail.teamSupportComments.length > 0) {
            resDetail.teamSupportComments.forEach(teamComment => {
              let comment = this.fb.group({
                id: teamComment.id,
                initiativeId: teamComment.initiativeId,
                employeeID: teamComment.employeeID,
                teamSupportName: teamComment.teamSupportName,
                comment: teamComment.comment
              });
              this.teamSupportCommentForm.push(comment);
            });
          } else {
            let comment = this.fb.group({
              id: 0,
              initiativeId: this.initiativeService.id,
              employeeID: null,
              teamSupportName: this.initiativeService.ownerName,
              comment: null
            });
            this.teamSupportCommentForm.push(comment);
          }
          resDetail.isImpactProduction ? this.detailPimForm.get('isImpactProduction').patchValue('true') : this.detailPimForm.get('isImpactProduction').patchValue('false');
          if (resDetail.useExternalEmoc) {
            this.detailPimForm.patchValue({
              useExternalEmoc: "true"
            });
          } else {
            this.detailPimForm.patchValue({
              useExternalEmoc: "false"
            });
          }

          this.detailInformationService.GetPimGateConfig(this.initiativeService.id).subscribe((pimGateRes) => {
            if (pimGateRes) {
              this.gateStatus.gate0 = pimGateRes.gate0 === "false" ? false : true;
              this.gateStatus.gate1 = pimGateRes.gate1 === "false" ? false : true;
              this.gateStatus.gate2 = pimGateRes.gate2 === "false" || resDetail.simProjectSkipGate2 ? false : true;
              this.gateStatus.gate3 = pimGateRes.gate3 === "false" ? false : true;
              this.gateStatus.gate4 = pimGateRes.gate4 === "false" ? false : true;

              if (pimGateRes.gate0 === "false") {
                this.isGate0Stage = false;
              } else {
                this.isGate0Stage = true;
              }
            }

            let showControl: ShowControlDetailPim = {
              showProjectEngineer: Boolean(this.showProjectEngineer),
              showProjectTeam: Boolean(this.showProjectTeam),
              getSimProjectSkipGate2: Boolean(this.detailPimForm.get('simProjectSkipGate2').value),
              isGate0Stage: Boolean(this.isGate0Stage),
              showApprovalPlan: Boolean(this.showApprovalPlan)
            }
            this.validateService.setShowControlDetailPim(showControl);
          });
          
          // Ta 20210928 default Person กรณี เลือก requestProjectEngineer หลัง stage draft และ ค่า projectManager เท่ากับ NULL
          if(this.isMax){
            if (res.requestProjectEngineer && (this.RequestCapex == true || this.RequestOpex == true)) 
            {
              Indicator.indicator.forEach((ind, index) => {
                let IndicatorData: any = {
                  initiativeId: this.initiativeService.id,
                  indicator: ind
                }
                this.initiativeService.GetOwnerNameByIndicator(IndicatorData).then((responseInd) => {
                  this.detailPimForm.get(Indicator.variable[index]).patchValue(responseInd && responseInd[0] ? responseInd[0].ownerName : null);
                });
              });
            } else {
              //claer value in Projectteam 
              if(!this.detailPimForm.get('projectManager').value){
                this.detailPimForm.get('projectManager').patchValue(null);
              }
            }
          } else {
            if (res.requestProjectEngineer || this.isDim) 
            {
              Indicator.indicator.forEach((ind, index) => {
                let IndicatorData: any = {
                  initiativeId: this.initiativeService.id,
                  indicator: ind
                }
                this.initiativeService.GetOwnerNameByIndicator(IndicatorData).then((responseInd) => {
                this.detailPimForm.get(Indicator.variable[index]).patchValue(responseInd && responseInd[0] ? responseInd[0].ownerName : null);
                });
              });
            } else {
              //claer value in Projectteam 
              if(!this.detailPimForm.get('projectManager').value){
                this.detailPimForm.get('projectManager').patchValue(null);
              }
            }
          }
          // End Ta 20210928 default Person กรณี เลือก requestProjectEngineer หลัง stage draft และ ค่า projectManager เท่ากับ NULL

        } else {
          //default Person
          if(this.isMax){
            if (res.requestProjectEngineer && (this.RequestCapex == true || this.RequestOpex == true)) 
            {
              Indicator.indicator.forEach((ind, index) => {
                let IndicatorData: any = {
                  initiativeId: this.initiativeService.id,
                  indicator: ind
                }
                this.initiativeService.GetOwnerNameByIndicator(IndicatorData).then((responseInd) => {
                  this.detailPimForm.get(Indicator.variable[index]).patchValue(responseInd && responseInd[0] ? responseInd[0].ownerName : null);
                });
              });
            } else {
              //claer value in Projectteam 
              if(!this.detailPimForm.get('projectManager').value){
                this.detailPimForm.get('projectManager').patchValue(null);
              }
            }

          } else {
            if (res.requestProjectEngineer || this.isDim) {
              Indicator.indicator.forEach((ind, index) => {
                let IndicatorData: any = {
                  initiativeId: this.initiativeService.id,
                  indicator: ind
                }
                this.initiativeService.GetOwnerNameByIndicator(IndicatorData).then((responseInd) => {
                this.detailPimForm.get(Indicator.variable[index]).patchValue(responseInd && responseInd[0] ? responseInd[0].ownerName : null);
                });
              });
            } else {
              //claer value in Projectteam 
              if(!this.detailPimForm.get('projectManager').value){
                this.detailPimForm.get('projectManager').patchValue(null);
              }
            }
          }

        }

        if (this.initiativeService.viewMode) {
          this.detailPimForm.disable();
        }
      });
    });

  }

  get viewMode() {
    return this.initiativeService.viewMode;
  }


  ngAfterViewInit() {
    this.detailPimForm.controls.useExternalEmoc.valueChanges.subscribe((useExternalEmocValue) => {
      if (useExternalEmocValue === "true") {
        this.requestEmoc = true;
      } else {
        this.requestEmoc = false;
      }
    });

    this.detailPimForm.controls.requestHandoverExecution.valueChanges.subscribe((executionRes) => {
      if (executionRes === true) {
        this.RequestHandoverExecution = true;
      } else {
        this.RequestHandoverExecution = false;
      }
    });
    this.detailPimForm.controls.requestHandoverPlantOwner.valueChanges.subscribe((plantOwnerRes) => {
      if (plantOwnerRes === true) {
        this.RequestHandoverPlantOwner = true;
      } else {
        this.RequestHandoverPlantOwner = false;
      }
    });
    this.detailPimForm.controls.isImpactProduction.valueChanges.subscribe(
      (val) => {
        if (val === "true" && !this.initiativeService.viewMode) {
          this.detailPimForm.controls.projectManager.enable();
          this.detailPimForm.controls.projectEngineer.enable();
          this.detailPimForm.controls.isMulti.enable();
          this.detailPimForm.controls.goalAchievement.enable();
          this.detailPimForm.controls.assumptionOfGoal.enable();
          this.detailPimForm.controls.reasonForChange.enable();
          this.detailPimForm.controls.isMainPlant.enable();
          this.detailPimForm.controls.projectDirector.enable();
          this.detailPimForm.controls.projectManager.enable();
          this.detailPimForm.controls.projectEngineer.enable();
          this.detailPimForm.controls.processEngineer.enable();
          this.detailPimForm.controls.divMgrOfProcessEngineer.enable();
          this.detailPimForm.controls.smes.enable();
          this.detailPimForm.controls.sponsorEvp.enable();
          this.detailPimForm.controls.workstreamLeadVp.enable();
          this.detailPimForm.controls.toFinance.enable();
          this.detailPimForm.controls.cto.enable();
          this.detailPimForm.controls.cfo.enable();
          this.detailPimForm.controls.eMocs.enable();
        } else {
          // this.detailPimForm.controls.projectManager.disable();
          // this.detailPimForm.controls.projectEngineer.disable();
          this.detailPimForm.controls.isMulti.disable();
          this.detailPimForm.controls.goalAchievement.disable();
          this.detailPimForm.controls.assumptionOfGoal.disable();
          this.detailPimForm.controls.reasonForChange.disable();
          //this.detailPimForm.controls.isMainPlant.disable();
          // this.detailPimForm.controls.projectDirector.disable();
          // this.detailPimForm.controls.projectManager.disable();
          // this.detailPimForm.controls.projectEngineer.disable();
          // this.detailPimForm.controls.processEngineer.disable();
          // this.detailPimForm.controls.divMgrOfProcessEngineer.disable();
          // this.detailPimForm.controls.smes.disable();
          // this.detailPimForm.controls.sponsorEvp.disable();
          this.detailPimForm.controls.workstreamLeadVp.disable();
          this.detailPimForm.controls.toFinance.disable();
          this.detailPimForm.controls.cto.disable();
          this.detailPimForm.controls.cfo.disable();
          this.detailPimForm.controls.eMocs.disable();
        }
      }
    );
  }
  addEMoc() {
    let emocFormArray = this.detailPimForm.get('eMocs') as FormArray;
    let eMoc = this.fb.group(this.createEMoc());
    //eMoc.controls.expireDate.disable();   
    //this.eMocs.push(eMoc);
    emocFormArray.push(eMoc);
  }
  plantArray = [];
  initPlantArray() {
    for (let i = 0; i < this.companyList.length; i++) {
      let temp = this.companyList[i].plant
      for (let j = 0; j < temp.length; j++) {
        this.plantArray.push(this.companyList[i].plant[j]);
      }
    }
  }
  GetPlants() {
    try {
      return this.plantArray;
    }
    catch (err) {
      [];
    }
  }
  saveEMoc() {
    this.swalTools.savingLoading('Saving Data');
    this.pimService.createMainPlant(this.detailPimForm.get('eMocs').value).subscribe(
      (res) => {
        if (res.length > 0) {
          this.detailPimForm.get('eMocs').patchValue(res);
          let control = this.detailPimForm.get('eMocs') as FormArray;
          control.controls.forEach((element, elmIndex) => {
            element.patchValue({
              typeOfChange: parseInt(element.value.typeOfChange),
              mocCategory: parseInt(element.value.mocCategory),
              mainPlanId: res[elmIndex].mainPlanId
            });
          });
          //this.detailPimForm.get('eMocs').disable();
          this.swalTools.CreateEmocSuccess();
        }
        else {
          this.swalTools.Message('Save Error');
        }
      }, error => {
        this.swalTools.Message('Save Error');
      });
  }
  deleteEMoc(index) {
    let emocFormArray = this.detailPimForm.get('eMocs') as FormArray;
    let emocNo = emocFormArray.at(index).get('emocNo').value;
    let MainPlanId = parseInt(emocFormArray.at(index).get('mainPlanId').value);
    if (emocNo != null && emocNo != '') {
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this Main Plant?!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        if (emocFormArray.length > 0) {
          if (MainPlanId > 0) {
            //call api for remove data
            this.pimService.deleteMainPlant(MainPlanId).then((deleteRes) => {
              //emocFormArray.removeAt(index);
              emocFormArray.removeAt(index);
              this.swalTools.DeleteMainPlant();
            }).catch((deleteError) => {
              this.swalTools.Message('Delete Error');
            });
          } else {
            //emocFormArray.removeAt(index);
            emocFormArray.removeAt(index);
            this.swalTools.DeleteMainPlant();
          }
        }
      } else {
        return;
      }
    });
  }


  getOwner() {
    this.pimService.getOwner<Owner[]>().subscribe((owners) => {
      this.owners = owners;
    });
  }

  createEMoc(): any {
    return {
      eMocTitle: null,
      mainPlanId: 0,
      plant: [this.plant, Validators.required],
      areaUnit: null,
      typeOfChange: null,
      mocCategory: null,
      expireDate: null,
      detailOfTheChange: this.detailOfChange,
      initialListOfPeople: null,
      emocNo: null,
      mocChampion: this.mocChampion,
      isMainPlant: false,
      initiativeId: this.initiativeService.id,
      goalAchievement: null,
      specifiedGoalAchievement: null,
      assumptionOfGoal: null,
      reasonForChange: this.reasonOfChange,
    };
  }

  commentFormGroup(): FormGroup {
    return this.fb.group({
      id: 0,
      initiativeId: this.initiativeService.id,
      employeeID: null,
      teamSupportName: null,
      comment: null
    });
  }

  SubmitEmoc() {
    let emoc = this.detailPimForm.get('eMocs') as FormArray;
    let check = 0;
    let plantDuplicate = 0;
    let plant: string[] = [];

    // emoc.controls.forEach(element => {
    //   element.status !== 'DISABLED' && element.value.isMainPlant === true ? check++ : null;
    // });

    for (let index = 0; index < emoc.length; index++) {
      if (emoc.at(index).get('isMainPlant').value === true) {
        check++;
      }
      if (plant.indexOf(emoc.at(index).get('plant').value) >= 0) {
        plantDuplicate++;
      } else {
        if ((emoc.at(index).get('emocNo').value == null || emoc.at(index).get('emocNo').value == '')) {
          plant.push(emoc.at(index).get('plant').value);
        }
      }
    }


    
    // if (check > 1) {
    //   this.swalTools.SelectManyMainPlant();
    // }
    // if (check == 0) {
    //   this.swalTools.Required_MainPlant();
    //   check > 1 ? this.swalTools.SelectManyMainPlant() : this.swalTools.Required_MainPlant();
    //   plantDuplicate > 1 ? this.swalTools.SelectManyMainPlant() : false;
    //   return;
    // }

    if (plantDuplicate > 0) {
      this.swalTools.PlantDuplicate();
      return;
    }
    
    let returnValue = true;
    const emocFormArray : FormArray =  this.detailPimForm.get('eMocs') as FormArray;
      const emocFormLength = emocFormArray.length;
      let countMainPlant = 0;
      for (let index = 0; index < emocFormLength; index++) {
        if (!emocFormArray.at(index).get('emocNo').value) {
          returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'eMocTitle') && returnValue;
          returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'goalAchievement') && returnValue;
          returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'assumptionOfGoal') && returnValue;
          returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'reasonForChange') && returnValue;
          returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'plant') && returnValue;
          returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'areaUnit') && returnValue;
          returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'typeOfChange') && returnValue;
          returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocCategory') && returnValue;
          let eMoc = emocFormArray.at(index) as FormGroup;
          const typeOfChange = eMoc.get('typeOfChange').value;
          if (typeOfChange == 2) {
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'expireDate') && returnValue;
          }
          returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'detailOfTheChange') && returnValue;
          returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'initialListOfPeople') && returnValue;
          //returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'emocNo') && returnValue;
          //returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'isMainPlant') && returnValue;
          returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocChampion') && returnValue;
        }
        if(emocFormArray.at(index).get('isMainPlant').value === true){
          ++countMainPlant;
        }
      }
      if(countMainPlant > 1){
        this.swalTools.MainPlantDuplicate();
        return;
      }

      if(!returnValue){
        this.swalTools.Required();
        return;
      }
      else{
        if (check === 1 && plantDuplicate === 0) {
          this.onSubmit();
        }else if(check === 0){
          this.swalTools.Required_MainPlant();
          return;
        }else if(plantDuplicate > 1){
          this.swalTools.PlantDuplicate();
          return;
        }
      }
  }

  isDisable(eMoc: FormGroup) {
    return eMoc.get('emocNo').value != '' && eMoc.get('emocNo').value != null ? true : false;
  }

  onSubmit() {
    // if (this.detailPimForm.get('eMocs').invalid) {
    //   return;
    // }
    // else {
    let emocFormArray = this.detailPimForm.get('eMocs') as FormArray;
    let mainPlantData: MainPlant[] = emocFormArray.value;
    let dataToCreate: MainPlant[] = mainPlantData;



    this.swalTools.savingLoading('Creating E-MOC');
    this.pimService.createEmoc(dataToCreate).subscribe(
      (res) => {
        if (res.findIndex(x => x.mainPlanId == -1) < 0) {          
          this.detailPimForm.get('eMocs').patchValue(res);
          let control = this.detailPimForm.get('eMocs') as FormArray;
          let checkEmoc: boolean;
          control.controls.forEach((element, elmIndex) => {
            if (res[elmIndex].emocNo == null || res[elmIndex].emocNo == '') {
              checkEmoc = true;
            }
            element.patchValue({
              typeOfChange: parseInt(element.value.typeOfChange),
              mocCategory: parseInt(element.value.mocCategory),
              expireDate : element.value.expireDate ? this.dateUtil.GetDateOnly(element.value.expireDate) : null,
              mainPlanId: res[elmIndex].mainPlanId,
              emocNo: res[elmIndex].emocNo
            });

          });
          if (checkEmoc) {
            this.swalTools.CreateEmocError("Internal Error");
          } else {
            this.swalTools.CreateEmocSuccess();
          }
          //this.detailPimForm.get('eMocs').disable();
        }
        else {
          let emocs = res.filter(x => x.eMocTitle != "Error" && x.eMocTitle != "Internal Error");
          this.detailPimForm.get('eMocs').patchValue(emocs);
          let control = this.detailPimForm.get('eMocs') as FormArray;
          control.controls.forEach((element, elmIndex) => {
            element.patchValue({
              typeOfChange: parseInt(element.value.typeOfChange),
              mocCategory: parseInt(element.value.mocCategory),
              expireDate : element.value.expireDate ? this.dateUtil.GetDateOnly(element.value.expireDate) : null,
              mainPlanId: res[elmIndex].mainPlanId,
              emocNo: res[elmIndex].emocNo
            });

          });
          let errorResult = res.find(x => x.eMocTitle == "Error" || x.eMocTitle == "Internal Error");
          this.swalTools.CreateEmocError(errorResult.reasonForChange);
        }
      });

    // }
  }

  getIsOther(index: number) {
    return (this.detailPimForm.get('eMocs') as FormArray).at(index).get('goalAchievement').value === 'Other' ? true : false;
  }

  requestExternalEmoc() {
    let controlValue = this.formGroup.get('detailPimForm').get('useExternalEmoc').value;
    if (controlValue) {
      this.requestEmoc = true;
    } else {
      this.requestEmoc = false;
    }
  }

  // onMainPlantChanged(idx) {
  //   let emocs = this.detailPimForm.get('eMocs') as FormArray;
  //   for (var i = 0; i < emocs.length; i++) {
  //     if (idx !== i) {
  //       emocs.at(i).patchValue({ isMainPlant: 'false' });
  //     }
  //   }
  // }

  updateHighlightWork() {
    let data: {
      highlightWorkStatus: string;
      highlightWorkConCern: string;
      nextActivities: string;
    } = {
      highlightWorkStatus: this.detailPimForm.get('highlightWorkStatus').value,
      highlightWorkConCern: this.detailPimForm.get('highlightWorkConCern').value,
      nextActivities: this.detailPimForm.get('nextActivities').value
    }
    this.Updating = true;
    this.detailInformationService.updateHighlightWork(this.initiativeService.id, data).then((response) => {
      this.Updating = false;
    }).catch((error) => {
      this.Updating = false;
    });
  }

  //Team Support
  RequestTeamSupport() {
    let value = this.detailPimForm.get('requestTeamSupport').value;
    if (value === true || value === 'true') {
      this.ShowTeamSupport = true;
      if (this.teamSupportCommentForm.value == []) {
        let comment = this.fb.group({
          id: 0,
          initiativeId: this.initiativeService.id,
          employeeID: null,
          teamSupportName: this.initiativeService.ownerName,
          comment: null
        });
        this.teamSupportCommentForm.push(comment);
      }
    } else {
      this.ShowTeamSupport = false;
    }
    return;
  }

  sendRequestTeamSupport() {
    //call api sent Email
    this.detailInformationService.SendEmailTeamSupport(this.initiativeService.id).then((sendMailRes) => {
      this.swalTools.SendMailTeamSupport();
    }, error => this.swalTools.Error('Send Mail Error!'));
  }

  //team support comment table
  canEditComment(index: number) {
    let supportArray = this.teamSupportCommentForm as FormArray;
    let userName = supportArray.at(index).get('teamSupportName').value;
    if (userName == this.username) {  //if (userName == this.initiativeService.ownerName) {
      return false;
    }
    return true;
  }

  canAddNewComment(teamSupp: any = []) {
    let supportArray = this.teamSupportCommentForm as FormArray;
    let userName = teamSupp.get('teamSupportName').value;
    if (this.isOwner == true) {  //||  userName == this.username
      this.isNotAddComment = false;
    } else {
      this.isNotAddComment = true;
    }
  }

  canDeleteComment(index: number) {
    let supportArray = this.teamSupportCommentForm as FormArray;
    let userName = supportArray.at(index).get('teamSupportName').value;
    if (userName == this.username) {  //if (userName == this.initiativeService.ownerName) {
      return true;
    }
    return false;
  }
  deleteComment(index: number) {
    //
    let supportArray = this.teamSupportCommentForm as FormArray;
    let commentId = supportArray.at(index).get('id').value;
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this Commentt?!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        if (supportArray.length > 0) {
          if (commentId > 0) {
            //call api for remove data
            this.detailInformationService.DeleteTeamSupportComment(commentId).then((deleteRes) => {
              //emocFormArray.removeAt(index);
              supportArray.removeAt(index);
              this.swalTools.DeleteTeamSupportComment();
            }).catch((deleteError) => {
              this.swalTools.Message('Delete Error');
            });
          } else {
            //emocFormArray.removeAt(index);
            supportArray.removeAt(index);
            this.swalTools.DeleteTeamSupportComment();
          }
        }
      } else {
        return;
      }
    });
  }
  addComment() {
    let comment = this.fb.group({
      id: 0,
      initiativeId: this.initiativeService.id,
      employeeID: null,
      //teamSupportName: this.initiativeService.ownerName,
      teamSupportName: this.username,
      comment: null
    });
    this.teamSupportCommentForm.push(comment);
  }

  get getNewFeature() {
    return this.initiativeService.newFeature;
  }

  getPdd() {
    let pddValue = this.detailPimForm?.get('projectDocumentDatabase').value;
    return pddValue != null && pddValue != '' ? pddValue : "-";
  }
  gotoPddLink() {
    let result = this.detailPimForm?.get('projectDocumentDatabase').value;
    if (result == '-') {
      return;
    }
    //let convertCode = result.initiativeCode.replace('-', '');
    //var url = 'https://pttgcgroup.sharepoint.com/sites/project/TPX/project/' + convertCode + '/Forms/AllItems.aspx';
    window.open(result);
  }

  showGate(index: number) {
    if (this.gateStatus['gate' + index]) {
      return true;
    }
    return false;
  }

  SetResponsiblePerson(event) {
    if (event && this.generalData.requestProjectEngineer && this.progressService) {
      this.progressService.getResponsibleEng(event.ownerName).then((getRespoRes) => {
        if (getRespoRes)
          this.formGroup.get('progressForm')?.get('responsible')?.patchValue(getRespoRes.attribute01);
      });
    }
  }

  // changeType(index:number){
  //   let emocFormArray = this.detailPimForm.get('eMocs') as FormArray;
  //   let eMoc = emocFormArray.at(index) as FormGroup;
  //   const typeOfChange = eMoc.get('typeOfChange').value;
  //     if (typeOfChange == 2) {
  //       eMoc.controls.expireDate.enable();
  //     } else {
  //       eMoc.controls.expireDate.setValue(null);
  //       eMoc.controls.expireDate.disable();
  //     }
  // }

  checkTypeOfChange(index: number) {
    let emocFormArray = this.detailPimForm.get('eMocs') as FormArray;
    let eMoc = emocFormArray.at(index) as FormGroup;
    const typeOfChange = eMoc.get('typeOfChange').value;
    if (typeOfChange == 2 && !eMoc.get('emocNo').value) {
      return false;
    } else {
      if (!eMoc.get('emocNo').value) {
        eMoc.controls.expireDate.setValue(null);
      }
      return true;
    }
  }

  ValidateRequireField(formGroup: FormGroup, filendName) {
    var returnValue = true;

    if (!formGroup.get(filendName)) {
      console.log('Validate Required 1 >>', filendName);
      returnValue = false;
    }
    else {
      if (formGroup.get(filendName).value || parseInt(formGroup.get(filendName).value) >= 0) {
        var value: string;
        value = String(formGroup.get(filendName).value).trim();
        if (value == '' || value == 'Invalid Date' || value === null) {
          console.log('Validate Required 2 >>', filendName);
          returnValue = false;
        }
      } else if (formGroup.get(filendName).disabled) {
        console.log('Validate Required disabled >>', filendName);
        returnValue = true;
      }
      else {
        console.log('Validate Required 3 >>', filendName);
        returnValue = false;
      }
    }
    if (formGroup.get(filendName) && !returnValue) {
      console.log('Validate Required 4 >>', filendName);
      formGroup.get(filendName).markAsTouched();
      formGroup.get(filendName).setErrors({ 'invalid': true });
    }

    if (!returnValue) {
      console.log('report error: ', filendName);
    }
    return returnValue;
  }
}

