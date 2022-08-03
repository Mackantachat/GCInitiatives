import { InitiativeService } from '@services/initiative/initiative.service';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Form, Validators } from '@angular/forms';
import { CpiService } from '@services/cpi/cpi.service';
import { PermissionService } from '@services/permission/permission.service';
import { CommonDataService } from '@services/common-data/common-data.service';
import { ProgressService } from '@services/progress/progress.service';
import { DateUtil } from '@utils/date.utils';

@Component({
  selector: 'app-detail-cpi-form',
  templateUrl: './detail-cpi-form.component.html',
  styleUrls: ['./detail-cpi-form.component.css'],
  providers: [DatePipe]
})
export class DetailCpiFormComponent implements OnInit {


  @Input() formGroup: FormGroup;

  IsOtherAnalysisTool: boolean;
  sourceOfImprovementList = [
    {
      key: 'Top-down',
      value: 'Top-down',
    },
    {
      key: 'Gap Assessment',
      value: 'Gap Assessment',
    },
    {
      key: 'Bottom-up',
      value: 'Bottom-up',
    },
    {
      key: 'Benchmark',
      value: 'Benchmark',
    },
  ];

  cpiList = [
    {
      key: 'Problem',
      value: 'Problem',
    },
    {
      key: 'Improvement',
      value: 'Improvement',
    },
  ];

  analysisToolList = [
    {
      key: 'Why Tree Analysis',
      value: 'Why Tree Analysis',
    },
    {
      key: 'Fishbone Diagram',
      value: 'Fishbone Diagram',
    },
    {
      key: 'Other',
      value: 'Other',
    },
  ];

  phnBuList: {
    key: string;
    value: string;
  }[];
  //  = [
  //     { key: 'Focus Improvement (FI)', value: 'Focus Improvement (FI)' },
  //     { key: 'Autonomous Maintenance (AM)', value: 'Autonomous Maintenance (AM)' },
  //     { key: 'Early Management(EM)', value: 'Early Management(EM)' },
  //     { key: 'Quality Management(QM)', value: 'Quality Management(QM)' },
  //     { key: 'Planned Maintenance (PM)', value: 'Planned Maintenance (PM)' },
  //     { key: 'Safety Health Environment (SHE)', value: 'Safety Health Environment (SHE)' },
  //     { key: 'Office Improvement (OI)', value: 'Office Improvement (OI)' },
  //     { key: 'Supply Chain Management (SCM)', value: 'Supply Chain Management (SCM)' },
  //     { key: 'Sustainable Management (SM)', value: 'Sustainable Management (SM)' },
  //     { key: 'Marketing & Sales Management (CM)', value: 'Marketing & Sales Management (CM)' },
  //     { key: 'Operation and Maintenance Skills Development Training (SD)', value: 'Operation and Maintenance Skills Development Training (SD)' },
  //     { key: 'Other', value: 'Other' }
  //   ];

  phnTypeList: {
    key: string;
    value: string;
  }[];
  //  = [
  //     { key: 'Small  (OPL)', value: 'Small  (OPL)' },
  //     { key: 'Medium  (Kimura, QAPL, EAPL, SAPL )', value: 'Medium  (Kimura, QAPL, EAPL, SAPL )' },
  //     { key: 'Large   (ได้ Benefit /investment จำนวนมาก)', value: 'Large   (ได้ Benefit /investment จำนวนมาก)' },
  //     { key: 'Other', value: 'Other' }
  //   ];

  id: number
  detailCpiForm: FormGroup;
  kpiForm: FormGroup;

  kpiFormList = new FormArray([]);
  kpiMonitorFormList = new FormArray([]);
  milestoneFormList = new FormArray([]);
  //kpiMonitorFormList = new FormArray([]);
  isDisabledProgress: boolean;
  IsStageFirstReview: boolean;
  planStatus: any = [];
  StageIL5: boolean;
  PhnBuPillarOther: boolean;
  TypeOfPhnOther: boolean;

  displayData = undefined;

  bsConfigStart = {
    isAnimated: true,
    dateInputFormat: 'DD/MM/YYYY',
    showWeekNumbers: false,
  };

  bsConfigFinish = {
    isAnimated: true,
    dateInputFormat: 'DD/MM/YYYY',
    showWeekNumbers: false,
    minDate: new Date(),
  };

  coDevelopers: any = [];
  params: any = {};
  owners: any = [];
  startDate: Date;
  finishDate: Date;
  dataLoaded: boolean;


  constructor(
    private fb: FormBuilder,
    private cpiService: CpiService,
    private initiativeService: InitiativeService,
    private commonDataService: CommonDataService,
    private dp: DatePipe,
    public ps: PermissionService,
    private progressService: ProgressService,
    private dateUtil: DateUtil
  ) {
    this.detailCpiForm = this.fb.group({
      id: 0,
      sourceOfImprovement: null,
      typeOfCpi: null,
      analysisTool: null,
      otherTool: null,
      phnBuPillar: null,
      specifyPhnBuPillar: null,
      typeOfPhn: null,
      specifyTypeOfPhn: null,
      rootCause: null,
      stepExplanation: null,
      estimatedBudgetOpex: null,
      estimatedBenefitSavings: null,
      estimatedBenefitCalculationDetails: null,
      actualBudgetOpex: null,
      actualBudgetSavings: null,
      actualBenefitCalculationDetails: null,
      lookbackText: null,
      cpiApprover: null,
      initiativeId: this.initiativeService.id
    });
    this.phnBuList = this.commonDataService.phnBuList;
    this.phnTypeList = this.commonDataService.phnTypeList;
    this.cpiService.getDataDetailCpi.subscribe((detailData) => {
      if (detailData) {
        this.checkSpecifyPhnAndType(detailData);
      }
    });
  }

  ngOnInit() {
    this.dataLoaded = false;
    this.id = this.initiativeService.id;
    if (!this.formGroup.get('detailCpiForm')) {
      this.formGroup.addControl('detailCpiForm', this.detailCpiForm);
    }
    if (!this.detailCpiForm.get('kpiFormList')) {
      this.detailCpiForm.addControl('kpiFormList', this.kpiFormList);
    }
    if (!this.detailCpiForm.get('kpiMonitorFormList')) {
      this.detailCpiForm.addControl('kpiMonitorFormList', this.kpiMonitorFormList);
    }

    if (!this.detailCpiForm.get('milestoneFormList')) {
      this.detailCpiForm.addControl('milestoneFormList', this.milestoneFormList);
    }

    if (this.initiativeService.suggestionStatus.stage == "IL5") {
      this.StageIL5 = true;
    }

    let stages = ['Initiative-1', 'Initiative-2'];
    if (stages.indexOf(this.initiativeService.suggestionStatus.stage) >= 0) {
      this.IsStageFirstReview = true;
      this.detailCpiForm.get('sourceOfImprovement')?.disable();
      this.detailCpiForm.get('typeOfCpi')?.disable();
      this.detailCpiForm.get('phnBuPillar')?.disable();
      this.detailCpiForm.get('specifyPhnBuPillar')?.disable();
      this.detailCpiForm.get('typeOfPhn')?.disable();
      this.detailCpiForm.get('specifytypeOfPhn')?.disable();
    }
    else {
      this.IsStageFirstReview = false;
    }



    if (this.initiativeService.viewMode) {
      this.detailCpiForm.disable();
    }

    this.getDetailCpi();
  }

  getDetailCpi() {
    this.cpiService.getCpiForm(this.initiativeService.id).subscribe(
      (response) => {
        // this.formGroup.get('initiativesForm').patchValue(response.initiativesForm);
        let kpiArray = this.formGroup.get('detailCpiForm')?.get('kpiFormList') as FormArray;
        let monitorArray = this.formGroup.get('detailCpiForm')?.get('kpiMonitorFormList') as FormArray;
        let milestone = this.formGroup.get('detailCpiForm')?.get('milestoneFormList') as FormArray;
        if (response.initiativesForm != null) {
          this.startDate = response.initiativesForm.startingDate ? this.dateUtil.GetDateOnly(response.initiativesForm.startingDate) : null;
          this.finishDate = response.initiativesForm.finishingDate ? this.dateUtil.GetDateOnly(response.initiativesForm.finishingDate) : null;
        }
        if (response.detailCpiForm != null) {
          this.cpiService.changeDetailCPI(response.detailCpiForm);
          this.formGroup.get('detailCpiForm')?.patchValue(response.detailCpiForm);
          if (response.detailCpiForm.kpiFormList?.length > 0) {
            for (let i = 0; i < response.detailCpiForm.kpiFormList.length; i++) {
              kpiArray.push(this.fb.group(response.detailCpiForm.kpiFormList[i]));
            }
          }

          if (response.detailCpiForm.kpiMonitorFormList?.length > 0) {
            for (let i = 0; i < response.detailCpiForm.kpiMonitorFormList.length; i++) {
              monitorArray.push(this.fb.group(response.detailCpiForm.kpiMonitorFormList[i]));
            }
          }

          // milestone
          if (response.detailCpiForm.milestoneFormList?.length > 0) {
            for (let i = 0; i < response.detailCpiForm.milestoneFormList.length; i++) {
              milestone.push(this.fb.group(response.detailCpiForm.milestoneFormList[i]));
              milestone.at(i).patchValue(
                {
                  start: response.detailCpiForm.milestoneFormList[i].start ? new Date(response.detailCpiForm.milestoneFormList[i].start) : null,
                  actualFinish: response.detailCpiForm.milestoneFormList[i].actualFinish ? new Date(response.detailCpiForm.milestoneFormList[i].actualFinish) : null,
                  planFinish: response.detailCpiForm.milestoneFormList[i].planFinish ? new Date(response.detailCpiForm.milestoneFormList[i].planFinish) : null
                })
            }
          }
        }
        else {
          let kpiArray = this.formGroup.get('detailCpiForm')?.get('kpiFormList') as FormArray;
          let kpiMonitor = this.formGroup.get('detailCpiForm')?.get('kpiMonitorFormList') as FormArray;
          let milestone = this.formGroup.get('detailCpiForm')?.get('milestoneFormList') as FormArray;
          if (kpiArray) {
            kpiArray.push(this.fb.group({
              kpiNo: 0,
              initiativeId: this.initiativeService.id,
              kpiTitle: [null],
              baseline: [null],
              target: [null],
              unit: [null],
              remark: [null],
            }));
          }

          if (kpiMonitor) {
            kpiMonitor.push(
              this.fb.group({
                kpiNo: 0,
                initiativeId: this.initiativeService.id,
                kpiTitle: [null],
                result: [null],
                target: [null],
                status: ['Not Achieve'],
              })
            );
          }

          if (milestone) {
            milestone.push(
              this.fb.group({
                id: 0,
                milestone: null,
                keyDeliverable: null,
                start: null,
                planFinish: null,
                actualFinish: null,
                activity: 'Critical',
                initiativeId: this.initiativeService.id
              })
            );
          }

        }
        this.dataLoaded = true;
        if (this.initiativeService.viewMode) {
          this.formGroup.get('detailCpiForm').get('kpiFormList').disable();
          this.formGroup.get('detailCpiForm').get('kpiMonitorFormList').disable();
          this.formGroup.get('detailCpiForm').get('milestoneFormList').disable();
        }
        // if (response.progessForm != null) { this.formGroup.get('progessForm')?.patchValue(response.progessForm); }
        // if (response.lessonLearnedForm != null) { this.formGroup.get('lessonLearnedForm')?.patchValue(response.lessonLearnedForm); }
        // if (response.bestPracticeForm != null) { this.formGroup.get('bestPracticeForm')?.patchValue(response.bestPracticeForm); }
      }
    );
  }

  checkSpecifyPhnAndType(resData) {
    let controlField: {
      control: string;
      variableName: string;
    }[] = [
        { control: 'phnBuPillar', variableName: 'PhnBuPillarOther' },
        { control: 'typeOfPhn', variableName: 'TypeOfPhnOther' }
      ];
    controlField.forEach((field) => {
      if (resData[field.control] == 'Other') {
        this[field.variableName] = true;
      } else {
        this[field.variableName] = false;
      }
    });

  }

  get viewMode(): boolean {
    return this.initiativeService.viewMode;
  }

  get haveProgressForm() {
    return this.progressService.haveProgress;
  }

  newKPI() {
    this.kpiFormList.push(
      this.fb.group({
        kpiNo: 0,
        initiativeId: this.initiativeService.id,
        kpiTitle: [null],
        baseline: [null],
        target: [null],
        unit: [null],
        remark: [null],
      })
    );
    this.newKpiMonitor();
  }

  removeKpi(i) {
    this.kpiFormList.removeAt(i);
    this.removeKpiMonitor(i);
  }

  newStep() {
    this.kpiMonitorFormList.push(
      this.fb.group({
        stepNo: 0,
        initiativeId: this.initiativeService.id,
        stepTitle: [null],
        start: [new Date()],
        finish: [new Date()],
        responsibleBy: [null],
      })
    );
  }

  removeStep(i) {
    this.kpiMonitorFormList.removeAt(i);
  }

  newKpiMonitor() {
    this.kpiMonitorFormList.push(
      this.fb.group({
        kpiNo: 0,
        initiativeId: this.initiativeService.id,
        kpiTitle: [null],
        result: [null],
        target: [null],
        status: ['Not Achieve'],
      })
    );
  }

  removeKpiMonitor(i) {
    this.kpiMonitorFormList.removeAt(i);
  }

  private convertToFormGroup(object) {
    const newObj = {};
    Object.keys(object).map(key => {
      if (Array.isArray(object[key])) {
        newObj[key] = this.fb.array([]);
        for (const value of object[key]) {
          newObj[key].push(this.fb.group(value));
        }
      } else {
        newObj[key] = object[key];
      }
    });
    return this.fb.group(newObj);
  }

  GetOwners(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.owners = owners;
    });
  }

  SearchOwnerName(event) {
    this.GetOwners(event.term);
  }

  ClearOwnerName() {
    this.GetOwners();
  }

  GetCoDevelopers(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetCoDevelopers(this.params).subscribe(coDevelopers => {
      this.coDevelopers = coDevelopers;
    });
  }

  SearchCoDeveloper(event) {
    this.GetCoDevelopers(event.term);
  }

  RemoveCoDeveloper() {
    this.GetCoDevelopers();
  }

  AddDetail() {
    const control = this.milestoneFormList as FormArray;
    if (this.initiativeService.suggestionStatus.stage === 'IL2') {
      control.push(this.InitialprogessFormIL2());
    } else {
      control.push(this.InitialprogessForm());
    }
  }

  RemoveDetail(index: number) {
    const control = this.milestoneFormList;
    control.removeAt(index);
    this.planStatus.splice(index, 1);
    this.isDisabledProgress = control.length > 1 ? false : true;
  }

  InvalidMilestone(i) {
    return this.milestoneFormList.at(i).get('milestone').touched && this.milestoneFormList.at(i).get('milestone').invalid;
  }

  InitialprogessFormIL2(): FormGroup {
    return this.fb.group({
      id: 0,
      milestone: ['', Validators.required],
      keyDeliverable: '',
      start: null,
      planFinish: null,
      actualFinish: null,
      activity: 'Critical',
      initiativeId: this.initiativeService.id
    });
  }

  InitialprogessForm(): FormGroup {
    return this.fb.group({
      id: 0,
      milestone: '',
      keyDeliverable: '',
      start: null,
      planFinish: null,
      actualFinish: null,
      activity: 'Critical',
      initiativeId: this.initiativeService.id
    });
  }

  // ChangePlanDate(i, value: Date): void {
  //   const time = new Date(value).getTime();
  //   const timeNow = new Date().getTime();
  //   const control = this.milestoneFormList;
  //   if (time > 0) {
  //     if (time < timeNow && !control.at(i).get('actualFinish').value) {
  //       this.planStatus[i] = 'max';
  //     } else {
  //       this.planStatus[i] = 'min';
  //     }
  //   }
  // }

  // ChangeActual(i) {
  //   const control = this.milestoneFormList;
  //   const time = new Date(control.at(i).get('planFinish').value).getTime();
  //   const timeNow = new Date().getTime();
  //   if (time > 0) {
  //     if (time < timeNow && !control.at(i).get('actualFinish').value) {
  //       this.planStatus[i] = 'max';
  //     } else {
  //       this.planStatus[i] = 'min';
  //     }
  //   }
  // }

  setRequestDate(date: any, fieldName: string, index: number) {

    let dateCheck = date ? new Date(date).setHours(0, 0, 0, 0) : 0;
    if (dateCheck > 0) {

      let dateStart = new Date(this.startDate).getTime();
      let dateFinish = new Date(this.finishDate).getTime();


      if (dateStart > 0 && dateFinish > 0) {
        //let mileStoneArray = this.progessForm.get('details') as FormArray;

        // let startFillDate = new Date(mileStoneArray.at(index).get('start').value).getTime();

        this.ChangePlanDate(index, new Date(date));
        this.ChangeActual(index);

        // if (fieldName == "planFinish") {
        //   this.ChangePlanDate(index, new Date(date));
        //   // if ((dateCheck >= startFillDate && dateCheck <= dateFinish) == false) {
        //   //   // mileStoneArray.at(index).get('planFinish').setValue('');
        //   //   // if(!this.initiativeService.viewMode){
        //   //   //   this.swalTool.ErrorText('Warning!!!', 'The Date you\'ve choosen is more than general finish date or before start date');
        //   //   // }
        //   //   // this.swalTool.DateBudgetStart();
        //   // } else {
        //   //   this.ChangePlanDate(index, new Date(date));
        //   // }
        // } else {
        //   if ((dateCheck >= dateStart && dateCheck <= dateFinish) == false) {
        //     if (fieldName == 'start') {
        //       this.ChangePlanDate(index, new Date(date));
        //       // mileStoneArray.at(index).get('start').setValue('');
        //       // mileStoneArray.at(index).get('planFinish').setValue('');
        //       // mileStoneArray.at(index).get('actualFinish').setValue('');
        //     } else {
        //       // mileStoneArray.at(index).get(fieldName).setValue('');
        //     }
        //     // this.swalTool.DateBudgetStart();
        //   } else {
        //     if (fieldName != 'start') {
        //       this.ChangeActual(index);
        //     }
        //   }
        // }

      }

    } else {
      if (this.dataLoaded && fieldName == 'actualFinish') {
        if (date == null) {
          this.ChangeActualNull(index);
        } else {
          this.ChangeActual(index);
        }
      } else if (this.dataLoaded && fieldName == 'planFinish') {
        if (date == null) {
          this.planStatus[index] = null;
        }
      }
    }
  }

  // changeStartDate(index: number) {
  //   let mileStoneArray = this.milestoneForm.get('progressDetails') as FormArray;
  //   // mileStoneArray.at(index).get('planFinish').setValue('');
  //   // mileStoneArray.at(index).get('actualFinish').setValue('');
  // }

  //detailCpiForm.get('milestoneFormList')
  ChangePlanDate(i, value: Date): void {
    const time = value ? this.dateUtil.GetDateOnly(value).getTime() : null;
    const timeNow = this.dateUtil.GetToday.getTime();
    if (this.detailCpiForm.get('milestoneFormList')) {
      const control = this.detailCpiForm.get('milestoneFormList') as FormArray;
      if (time > 0) {
        if (time < timeNow && !control.at(i).get('actualFinish').value) {
          this.planStatus[i] = 'max';
        } else if (time >= timeNow && !control.at(i).get('actualFinish').value) {
          this.planStatus[i] = 'min';
        } else {
          this.planStatus[i] = 'actual';
        }
      }
    }
  }

  getStartDate(i: number): Date {
    const control = this.detailCpiForm.get('milestoneFormList') as FormArray;
    return control.at(i).get('start').value ? control.at(i).get('start').value as Date : this.formGroup.get('initiativesForm').get('startingDate').value as Date;
  }

  changeActualFinish(index: number) {
    this.ChangeActual(index);
  }

  ChangeActual(i) {
    const control = this.detailCpiForm.get('milestoneFormList') as FormArray;
    const time = control.at(i).get('planFinish').value ? this.dateUtil.GetDateOnly(control.at(i).get('planFinish').value).getTime() : null;
    const timeNow = this.dateUtil.GetToday.getTime();
    if (time > 0) {
      if (time < timeNow && !control.at(i).get('actualFinish').value) {
        this.planStatus[i] = 'max';
      } else if (time >= timeNow && !control.at(i).get('actualFinish').value) {
        this.planStatus[i] = 'min';
      } else {
        this.planStatus[i] = 'actual';
      }
    }
  }

  ChangeActualNull(i) {
    const control = this.detailCpiForm.get('milestoneFormList') as FormArray;
    const time = control.at(i).get('planFinish').value ? this.dateUtil.GetDateOnly(control.at(i).get('planFinish').value).getTime() : null;
    control.at(i).get('actualFinish').patchValue(null);
    const timeNow = this.dateUtil.GetToday.getTime();
    if (time > 0) {
      if (time >= timeNow) {
        this.planStatus[i] = 'min';
      } else {
        this.planStatus[i] = 'max';
      }

    }
  }

  getFormError(field) {
    return (this.formGroup.get('detailCpiForm').get(field).touched || this.formGroup.get('detailCpiForm').get(field).dirty) && this.formGroup.get('detailCpiForm').get(field).invalid;
  }

  changeAnalysisTool(event) {
    if (event.target.value == 'Other') {
      this.IsOtherAnalysisTool = true;
    }
    else {
      this.IsOtherAnalysisTool = false;
    }
  }

  OnInputKpi(i) {
    if (this.kpiMonitorFormList.at(i)) {
      this.kpiMonitorFormList.at(i).patchValue({
        kpiTitle: this.kpiFormList.at(i).get('kpiTitle').value,
        target: this.kpiFormList.at(i).get('target').value
      });
    }
  }

  specifyPhnBuAndType(control: string, variableName: string) {
    let controlValue = this.detailCpiForm.get(control).value;
    if (controlValue == 'Other') {
      this[variableName] = true;
    } else {
      this[variableName] = false;
    }
  }


}

