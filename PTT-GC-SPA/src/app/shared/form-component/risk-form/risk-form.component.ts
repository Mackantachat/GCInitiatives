import { PimService } from './../../../core/services/pim/pim.service';
import { CimService } from './../../../core/services/cim/cim.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StageDetail } from '@models/initiative';
import { KRIModel } from '@models/kriModel';
import { InitiativeService } from '@services/initiative/initiative.service';
import { RiskService } from '@services/risk/risk.service';
import { StageService } from '@services/stage/stage.service';
import { SwalTool } from '@tools/swal.tools';
import { DateUtil } from '@utils/date.utils';
import { PermissionService } from '@services/permission/permission.service';

@Component({
  selector: 'app-risk-form',
  templateUrl: './risk-form.component.html',
  styleUrls: ['./risk-form.component.css']
})
export class RiskFormComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() id: number;
  @Output() saveData = new EventEmitter();



  name: 'risk';
  page: 'risk';
  presentData: FormGroup;
  riskFormGroup: FormGroup;
  isAddNewRiskData = false;
  riskForm = this.fb.array([]);
  riskProgressArray = this.fb.array([]);
  isEditRiskData = false;
  EnableKri: boolean = true;
  display: FormArray;
  bsConfigDate = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  params: any = {};
  responsibleList: any = [];
  costEst: number;
  initiativeType: string;

  stageDetail: StageDetail[] = [];
  stageDetailList: StageDetail[] = [];

  phaseList: {
    name: string;
    value: string;
  }[] = [];

  actionDueStatusList = ['Not deal', 'On deal', 'Over deal'];



  entryMode: string = null;
  typeOfInvestment: string = null;

  constructor(
    private fb: FormBuilder,
    private riskService: RiskService,
    private dateUtil: DateUtil,
    private initiativeService: InitiativeService,
    private swaltool: SwalTool,
    private stageService: StageService,
    private cimService: CimService,
    private pimService: PimService,
    public ps: PermissionService
  ) {
    this.riskFormGroup = this.fb.group({
      id: 0,
      registerDate: '',
      riskFactor: '',
      phase: '',
      approvePeriod: new Date(),
      description: '',
      exitingControl: '',
      mitigationPlan: '',
      impactExitingControl: '',
      likelihoodExitingControl: '',
      impactMitigationPlan: '',
      likelihoodMitigationPlan: '',
      riskLevelExitingControl: '',
      riskLevelMitigationPlan: '',
      mitigationProgress: '',
      mitigationProgressImpact: '',
      mitigationProgressLikelihood: '',
      riskLevelMitigationProgress: '',
      riskProgressArray: this.fb.array([]),
      kriArray: this.fb.array([]),
      initiativeId: this.initiativeService.id,
      addNew: ''
    });
    // this.initiativeService.getGeneralData.subscribe(response => {
    //   if (response) {
    //     let costEst = (response.costEstCapexType == 'THB') ? parseFloat(response.costEstCapex) : parseFloat(response.costEstCapex) * parseFloat(response.fxExchange);
    //     if (this.initiativeService.suggestionStatus.cim || costEst < 300) {
    //       this.EnableKri = true;
    //     }
    //     else {
    //       this.EnableKri = false;
    //     }
    //   }
    // });
  }

  ngOnInit() {

    if (this.riskService.dataArray) {
      this.init();
      this.isEditRiskData = true;
      this.isAddNewRiskData = false;
    } else {
      this.resetForm();
      this.isAddNewRiskData = true;
      this.isEditRiskData = false;
    }



    this.riskService.getEntryMode.subscribe(entryMode => {
      if (entryMode) {
        this.entryMode = entryMode;
      }
    });

    this.riskService.getTypeOfInvestment.subscribe(typeOfInvestment => {
      if (typeOfInvestment) {
        this.typeOfInvestment = typeOfInvestment;
      }
    });

    this.GetInitiative();
    if (this.initiativeService.id) {
      this.initiativeService.GetInitiativeStages(this.initiativeService.id).then((response) => {
        if (response) {
          this.stageDetail = response;
          if (this.initiativeService.suggestionStatus.cim) {
            this.initPhaseList(this.GetEntryMode());
          } else {
            this.phaseList = this.setPhaseListPim(response);
          }
        }
      });
    }
    this.GetPerson();
    // if (this.initiativeService.viewMode) {
    //   this.riskFormGroup.disable();
    // }
  }

  GetInitiative() {
    this.initiativeService.GetInitiative(this.initiativeService.id).subscribe(res => {
      this.costEst = res.costEstCapex;
      this.initiativeType = res.initiativeType;
      let costEst = (res.costEstCapexType == 'THB') ? res.costEstCapex : res.costEstCapex * res.fxExchange;
      if (this.initiativeService.suggestionStatus.cim || costEst < 300) {
        this.EnableKri = true;
      }
      else {
        this.EnableKri = false;
      }
    });
  }
  get isPimLessThan300() {
    return !(this.initiativeType === 'pim' && this.costEst <= 300);
  }

  getDataArray() {


    return this.riskService.dataArray;
  }

  resetForm() {
    this.riskFormGroup = this.fb.group({
      id: 0,
      registerDate: new Date(),
      riskFactor: '',
      phase: '',
      approvePeriod: new Date(),
      description: '',
      exitingControl: '',
      mitigationPlan: '',
      impactExitingControl: '',
      likelihoodExitingControl: '',
      impactMitigationPlan: '',
      likelihoodMitigationPlan: '',
      riskLevelExitingControl: '',
      riskLevelMitigationPlan: '',
      mitigationProgress: '',
      mitigationProgressImpact: '',
      mitigationProgressLikelihood: '',
      riskLevelMitigationProgress: '',
      riskProgressArray: this.fb.array([]),
      kriArray: this.fb.array([]),
      initiativeId: this.initiativeService.id,
      addNew: ''
    });
  }

  init() {
    this.riskFormGroup.patchValue(this.riskService.dataArray);
    this.riskFormGroup.patchValue({
      registerDate: this.riskService.dataArray.registerDate ? new Date(this.riskService.dataArray.registerDate) : null,
      approvePeriod: this.riskService.dataArray.approvePeriod ? new Date(this.riskService.dataArray.approvePeriod) : null
    });

    if (this.riskService.dataArray.kriArray.length > -1) {

      for (let j = 0; j < this.riskService.dataArray.kriArray.length; j++) {
        let temp = this.initialKRIData();
        temp.patchValue(this.riskService.dataArray.kriArray[j]);
        (this.riskFormGroup.get('kriArray') as FormArray).push(temp);
      }
    } else {
      this.addKRIData();
    }
    if (this.riskService.dataArray.riskProgressArray.length > -1) {

      for (let j = 0; j < this.riskService.dataArray.riskProgressArray.length; j++) {
        let temp = this.initialRiskProgressData();
        temp.patchValue(this.riskService.dataArray.riskProgressArray[j]);
        temp.patchValue({
          dueDate: this.riskService.dataArray.riskProgressArray[j].dueDate ? new Date(this.riskService.dataArray.riskProgressArray[j].dueDate) : null,
          actualCompletingDate: this.riskService.dataArray.riskProgressArray[j].actualCompletingDate ? new Date(this.riskService.dataArray.riskProgressArray[j].actualCompletingDate) : null
        });
        (this.riskFormGroup.get('riskProgressArray') as FormArray).push(temp);
      }
    } else {
      this.addRiskProgress();
    }
  }



  checkActionDueStatus(index: number) {
    let progressForm = this.riskFormGroup.get('riskProgressArray') as FormArray;
    let today = new Date();
    let todayUTC = new Date(Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(), 0, 0, 0)).getTime();
    let duedate = progressForm.at(index).get('dueDate').value;
    let actualCompletingDate = progressForm.at(index).get('actualCompletingDate').value;
    let status = progressForm.at(index).get('status').value;

    //status
    ///Complete
    ///Cancled
    ///On Progress
    if (duedate && today && status) {
      let duedateConvert = new Date(duedate);
      let duedateUTCTime = new Date(Date.UTC(
        duedateConvert.getFullYear(),
        duedateConvert.getMonth(),
        duedateConvert.getDate(), 0, 0, 0)).getTime();






      let actualDate = actualCompletingDate ? new Date(actualCompletingDate) : null;
      let actualDateUTCTime = actualDate ? new Date(Date.UTC(
        actualDate.getFullYear(),
        actualDate.getMonth(),
        actualDate.getDate(), 0, 0, 0)).getTime() : 0;

      //actionDueStatusList = ['Not deal', 'On deal', 'Over deal'];

      if (actualDateUTCTime > 0 && status == 'Complete' && actualDateUTCTime <= duedateUTCTime) {
        progressForm.at(index).get('actionDueStatus').setValue(this.actionDueStatusList[1]);
      } else if (status == 'Complete' && actualDateUTCTime >= duedateUTCTime) {
        progressForm.at(index).get('actionDueStatus').setValue(this.actionDueStatusList[2]);
        // } else if (actualDateUTCTime > 0 && status != 'Complete' && actualDateUTCTime <= duedateUTCTime) {
        //   progressForm.at(index).get('actionDueStatus').setValue(null);
      } else if (todayUTC <= duedateUTCTime && status == 'On Progress' && actualDateUTCTime == 0) {
        progressForm.at(index).get('actionDueStatus').setValue(this.actionDueStatusList[0]);
      } else if (todayUTC > duedateUTCTime && status == 'On Progress' && actualDateUTCTime == 0) {
        progressForm.at(index).get('actionDueStatus').setValue(this.actionDueStatusList[2]);
      } else if (status == 'Cancled') {
        progressForm.at(index).get('actionDueStatus').setValue(null);
      } else {
        progressForm.at(index).get('actionDueStatus').setValue(null);
      }
    } else {
      progressForm.at(index).get('actionDueStatus').setValue(null);
    }

  }

  ngOnDestroy() {
    // if (this.isEditRiskData) {
    //   this.changeRiskData();
    // }
    // else if (this.isAddNewRiskData) {
    //   this.saveRiskData();
    // }
  }
  GetMaxKRIStatus(i) {
    var array = this.riskForm.value[i].kriArray as Array<KRIModel>
    var max = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].kriStatus > max) {
        max = array[i].kriStatus;
      }
    }
    return this.getLevel(max);
  }

  GetRiskData() {
    this.riskService.GetRiskData(this.id).subscribe(res => {
      if (res.length > 0) {
        this.riskForm = this.fb.array([]);
        for (let i = 0; i < res.length; i++) {
          this.presentData = this.initialRiskData();
          this.presentData.patchValue(res[i]);
          for (let j = 0; j < res[i].kriArray.length; j++) {
            let temp = this.initialKRIData();
            temp.patchValue(res[i].kriArray[j]);
            (this.presentData.get('kriArray') as FormArray).push(temp);
          }
          for (let j = 0; j < res[i].riskProgressArray.length; j++) {
            let temp = this.initialRiskProgressData();
            temp.patchValue(res[i].riskProgressArray[j]);
            (this.presentData.get('riskProgressArray') as FormArray).push(temp);
          }
          this.riskForm.push(this.presentData);
          (this.formGroup.get('riskForm') as FormArray).push(this.presentData)
        }
      }
      else {
        this.riskForm.push(this.presentData);
        this.addKRIData();
        this.addRiskProgress();
      }
    });
  }

  GetEntryMode() {
    // get entry mode from initativesDetailForm


    if (this.entryMode) {
      switch (this.entryMode) {
        case 'E001': return 'JV';
        case 'E002': return 'CVC';
        case 'E003': return 'Existing Unit';
        case 'E004': return 'Organic';
        case 'E005': return 'M&A';
        case 'E006': return 'Divestment';
        case 'E009': return 'Other';
        default: return null;
      }
    }
  }


  initPhaseList(entryMode) {



    //subtype:
    //"divestcapex"
    //"divestnocapex"
    //"m&a,cvc"
    //"other"
    //
    let subtype = null;
    let list: StageDetail[];

    if (entryMode === 'M&A' || entryMode === 'CVC') {
      list = this.stageDetail.filter((x) => x.subtype == 'm&a,cvc' && x.flowType == 'initiative')
      this.phaseList = this.setPhaseList(list);
    } else if (entryMode === 'Divestment') {
      list = this.stageDetail.filter((x) => x.subtype == 'divest' && x.flowType == 'initiative')
      this.phaseList = this.setPhaseList(list);
    } else {
      list = this.stageDetail.filter((x) => x.subtype == 'bigproject' && x.flowType == 'initiative')
      this.phaseList = this.setPhaseList(list);
    }
  }

  setPhaseList(list: StageDetail[]) {
    let dup: string = null;
    let stageList: string[] = [];
    let phaseList: {
      name: string;
      value: string;
    }[] = [];
    list.forEach(t => {
      let length = t.stage.length;
      let index = t.stage.substring(length, length - 1);
      if (parseInt(index) > 0 && t.stage.substring(length, length - 2) === '-' + index) {
        let showtext = t.stage.substring(0, length - 2);
        if (stageList.indexOf(showtext.trim()) < 0) {
          stageList.push(showtext.trim());
          dup = showtext;
          phaseList.push({
            name: showtext,
            value: t.stage
          });
        }
      } else {
        if (stageList.indexOf(t.stage.trim()) < 0) {
          stageList.push(t.stage.trim());
          dup = t.stage;
          phaseList.push({
            name: t.stage,
            value: t.stage
          });
        }
      }
    });

    return phaseList;
  }

  setPhaseListPim(list: StageDetail[]) {
    let dup: string = null;
    let stageList: string[] = [];
    let phaseList: {
      name: string;
      value: string;
    }[] = [];
    list.forEach(t => {
      let length = t.stage.length;
      let index = t.stage.substring(length, length - 1);
      if (parseInt(index) > 0 && t.stage.substring(length, length - 2) === '-' + index) {
        let showtext = t.stage.substring(0, length - 2);
        if (stageList.indexOf(showtext.trim()) < 0) {
          stageList.push(showtext.trim());
          dup = showtext;
          phaseList.push({
            name: showtext,
            value: t.stage
          });
        }
      } else {
        if (stageList.indexOf(t.stage.trim()) < 0) {
          stageList.push(t.stage.trim());
          dup = t.stage;
          phaseList.push({
            name: t.stage,
            value: t.stage
          });
        }
      }
    });

    return phaseList;
  }

  getLevel(value) {
    if (parseInt(value) === 1) {
      return 'green';
    }
    else if (parseInt(value) === 2) {
      return 'yellow';
    }
    else if (parseInt(value) === 3) {
      return 'orange';
    }
    else if (parseInt(value) === 4) {
      return 'red';
    }
  }

  getArrayLength(control) {
    return this.riskFormGroup.get(control) as FormArray;
  }

  initialKRIData(): FormGroup {
    return this.fb.group({
      id: 0,
      kriTarget: '',
      kriTolerance: '',
      kriStatus: '',
      kriProgress: '',
      isDeleted: false
    });
  }

  initialRiskData(): FormGroup {
    return this.fb.group({
      id: 0,
      registerDate: '',
      riskFactor: '',
      phase: '',
      approvePeriod: new Date(),
      description: '',
      exitingControl: '',
      mitigationPlan: '',
      impactExitingControl: '',
      likelihoodExitingControl: '',
      impactMitigationPlan: '',
      likelihoodMitigationPlan: '',
      riskLevelExitingControl: '',
      riskLevelMitigationPlan: '',
      mitigationProgress: '',
      mitigationProgressImpact: '',
      mitigationProgressLikelihood: '',
      riskLevelMitigationProgress: '',
      riskProgressArray: this.fb.array([]),
      kriArray: this.fb.array([]),
      initiativeId: this.id,
      addNew: ''
    });
  }

  initialRiskProgressData(): FormGroup {
    return this.fb.group({
      id: 0,
      actionDescription: ['', Validators.required],
      dueDate: [new Date(), Validators.required],
      actualCompletingDate: null,
      responsible: ['', Validators.required],
      status: ['', Validators.required],
      actionDueStatus: '',
      remark: ''
    });
  };

  setLevel(imapact: string, likelihood: string, levelControl: string) {
    let level = this.checkLevel(this.convertImpact(this.riskFormGroup.get(imapact).value), this.convertLikelihood(this.riskFormGroup.get(likelihood).value))
    this.riskFormGroup.get(levelControl).patchValue(level);
  }

  // editRisk(i) {
  //   this.presentData = this.initialRiskData();
  //   this.presentData.patchValue(this.riskForm.at(i).value);
  //   this.presentData.patchValue({ registerDate: new Date(this.riskForm.at(i).get('registerDate').value) })
  //   this.presentData.patchValue({ approvePeriod: new Date(this.riskForm.at(i).get('approvePeriod').value) })

  //   // this.presentData.patchValue(this.riskForm.at(i).value);
  //   let kriArray = this.riskForm.at(i).get('kriArray') as FormArray
  //   let riskProgressArray = this.riskForm.at(i).get('riskProgressArray') as FormArray
  //   for (let index = 0; index < kriArray.length; index++) {
  //     let temp = this.initialKRIData();
  //     temp.patchValue(kriArray.at(index).value);
  //     (this.presentData.get('kriArray') as FormArray).push(temp);
  //   }
  //   for (let index = 0; index < riskProgressArray.length; index++) {
  //     let temp = this.initialRiskProgressData();
  //     temp.patchValue(riskProgressArray.at(index).value);
  //     (this.presentData.get('riskProgressArray') as FormArray).push(temp);
  //   }
  //   this.isEditRiskData = true;
  //   this.isAddNewRiskData = false;
  // }

  // ApprovePeriodChange(value : Date){
  //   if(value)
  // }


  // RegisterDateChange(value : Date){

  // }

  getDate(value: Date) {
    return this.dateUtil.GetDate(new Date(value));
  }

  cancle() {
    this.isEditRiskData = false;
    this.isAddNewRiskData = false;
    this.riskService.deleteArray = [];
    this.saveData.emit();

  }

  convertImpact(impact) {
    switch (impact) {
      case 'Minor(1)': return 1;
      case 'Moderate(2)': return 2;
      case 'Major(3)': return 3;
      case 'Servere(4)': return 4;
      default: return 0;
    }
  }
  convertLikelihood(likelihood) {
    switch (likelihood) {
      case 'Rarely(1)': return 1;
      case 'Unlikely(2)': return 2;
      case 'Posible(3)': return 3;
      case 'Probable(4)': return 4;
      default: return 0;
    }
  }

  checkLevel(impact, likelihood) {
    var summary = impact + likelihood;
    if (summary <= 3) {
      return 1;
    }
    else if (summary <= 4) {
      return 2;
    }
    else if (summary <= 5) {
      if (likelihood == 3) {
        return 3;
      }
      else {
        return 2;
      }
    }
    else if (summary <= 6) {
      return 3;
    }
    else {
      return 4;
    }
  }

  get checkLevelExitingControl() {
    let level = this.riskFormGroup.get('riskLevelExitingControl').value;
    return level == 3 || level == 4 ? false : true;
  }

  // addRiskData() {
  //   this.isAddNewRiskData = true;
  //   this.isEditRiskData = false;
  //   this.presentData = this.initialRiskData();
  //   this.addRiskProgress();
  //   this.addKRIData();
  //   this.presentData.get('initiativeId').patchValue(this.id);
  // }

  saveRiskData() {
    if (this.riskFormGroup.invalid) {
      this.riskFormGroup.markAllAsTouched();
      this.swaltool.Required();
    } else {
      this.isAddNewRiskData = false;
      for (let i = 0; i < this.riskService.deleteArray.length; i++) {
        let temp = this.initialKRIData();
        temp.patchValue(this.riskService.deleteArray[i]);
        (this.riskFormGroup.get('kriArray') as FormArray).push(temp);
      }
      this.riskFormGroup.get('initiativeId').patchValue(this.initiativeService.id);
      this.riskFormGroup.get('id').patchValue(this.riskService.riskData.length + 1);
      this.riskFormGroup.get('addNew').patchValue('newRecord');
      this.riskService.riskData.push(this.riskFormGroup.value);
      this.isEditRiskData = false;
      this.riskService.deleteArray = [];
      this.Draft();
      this.saveData.emit();
    }
  }

  changeRiskData() {
    if (this.riskFormGroup.invalid) {
      this.riskFormGroup.markAllAsTouched();
      this.swaltool.Required();
    } else {
      this.isEditRiskData = false;

      this.riskService.dataArray = this.riskFormGroup.value;
      this.saveData.emit();

      // this.riskService.UpdateRiskData(this.presentData.value as RiskModel).subscribe(res => {
      //   this.riskForm = this.fb.array([]);
      //   this.GetRiskData();
      // });

    }
  }


  removeKRI(i) {
    const control = this.riskFormGroup.get('kriArray') as FormArray;
    control.at(i).get('isDeleted').patchValue(true);
    this.riskService.deleteArray.push(control.at(i).value)
    control.length > 0 ? control.removeAt(i) : null;
  }

  removeRiskProgress(i) {
    const control = this.riskFormGroup.get('riskProgressArray') as FormArray;
    control.length > 0 ? control.removeAt(i) : null;
  }
  getRiskProgressId(i) {
    const control = this.riskFormGroup.get('riskProgressArray') as FormArray;
    return control.at(i).get('id').value;
  }
  addRiskProgress() {
    var riskProgress = this.initialRiskProgressData();
    (this.riskFormGroup.controls.riskProgressArray as FormArray).push(riskProgress);
  }

  addKRIData() {
    var KRIData = this.initialKRIData();
    (this.riskFormGroup.controls.kriArray as FormArray).push(KRIData);
  }

  SearchPerson(event) {
    this.GetPerson(event.term);
  }

  GetPerson(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(res => this.responsibleList = res)
  }

  invalidProgressArr(i: number, field: string) {
    let arr = this.riskFormGroup.get('riskProgressArray') as FormArray;
    return arr.at(i).get(field).touched && arr.at(i).get(field).invalid
  }

  Draft() {
    if (this.initiativeService.suggestionStatus.cim || this.initiativeService.suggestionStatus.strategy) {
      this.cimService.SaveDraftAndSubmit(this.formGroup, 'draft', "");
    }
    else if (this.initiativeService.suggestionStatus.pim) {
      this.pimService.SaveDraftSubmitPim(this.formGroup, 'draft', "");
    }
  }

  get viewMode(): boolean {
    return this.initiativeService.viewMode;
  }
}
