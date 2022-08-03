import { EnvironmentResultModel } from './../../../core/models/lookback';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CIMLookbackModel, CoreUpliftModel, ExececutionLookbackModel, LookbackReviewModel, PlanLookbackModel, ProjectImpactModel, ProjectImpactWorkModel } from '@models/lookback';
import { InitiativeService } from '@services/initiative/initiative.service';
import { LookbackService } from '@services/lookback/lookback.service';
import { id } from '@swimlane/ngx-datatable';
import { DateUtil } from '@utils/date.utils';
import { Initiative } from '@models/initiative';
import { DetailService } from '@services/detail/detail.service';

@Component({
  selector: 'app-lookback-form',
  templateUrl: './lookback-form.component.html',
  styleUrls: ['./lookback-form.component.css']
})

export class LookbackFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  id: number;
  ExecutionLookbackInput: any;
  PerformanceLookbackInput: any;
  EnvironmentLookbackInput: any;
  CimLookbackInput: any;

  LookbackReview: LookbackReviewModel[] = [{
    LookbackReviewId: 0,
    ProjectLookbackId: 0,
    ProjectReviewTeam: null
  }];

  executionLookbackList: ExececutionLookbackModel[] = [{
    ProjectLookbackId: 0,
    Plan: null,
    Actual: null,
    KnowledgeArea: null,
    Issue: null,
    Background: null,
    LessonLearned: null,
    Remark: null,
    Comment: null,
  }];

  coreUpliftList: CoreUpliftModel[] = [{
    ProjectLookbackId: 0,
    Economics: null,
    EstimatedPlaned: null,
    Actual: null,
    WhyDifference: null,
    Remark: null,
    Comment: null,
  }];

  projectImpactModelList: ProjectImpactModel[] = [{
    ProjectLookbackId: 0,
    Situation: null,
    Before: null,
    Target: null,
    After: null,
  }];

  projectImpactWorkList: ProjectImpactWorkModel[] = [{
    ProjectLookbackId: 0,
    WhatWorked: null,
    WhatDidNotWork: null,
  }];

  EnvironmentResultList: EnvironmentResultModel[] = [{
    // EnvironmentResultId:0,
    EnvironmentResultCategory: null,
    EnvironmentResultUnit: null,
    EnvironmentResultBefore: null,
    EnvironmentResultAfter: null,
    EnvironmentResultBenefitYear: null,
    EnvironmentResultBenefitYearThb: null,
    EnvironmentResultRemark: null
  }];

  cimLookbackList: CIMLookbackModel[] = [{
    ProjectLookbackId: 0,
    CimLookbackId: 0,
    CimLookbackType: null,
    Aspect: null,
    Approve: null,
    Actual: null,
    DifferenceNote: null,
    BusinessPlan: null,
    ResponsiblePerson: null,
  }];

  today = this.dateUti.GetToday;
  Finishing = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  PlanLookback = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  Environment = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  Performance = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  ExecutionLookbackProcess = false;
  PerformanceLookback = false;
  EnvironmentLookback = false;
  CimLookback = false;
  resultLookback = {};


  lookbackForm = this.formBuilder.group({
    ProjectLookbackId: 0,
    InitiativeId: this.initiativeService.id,
    FinishingDate: [this.dateUti.GetToday, Validators.required],
    PlanLookbackDate: [this.dateUti.GetToday, Validators.required],
    PlanEnviLookBackDate: [this.dateUti.GetToday, Validators.required],
    PlanPerformanceLookbackDate: [this.dateUti.GetToday, Validators.required],

    LookbackReview: [this.LookbackReview], // Ref.
    // LookbackReview: [[] as LookbackReviewModel[]],

    ProjectBackground: null,
    ScopeOfInitiative: null,
    ProjectObjective: null,

    ExecutionLookbackProcess: [this.ExecutionLookbackProcess, Validators.required],
    PerformanceLookback: [this.PerformanceLookback, Validators.required],
    EnvironmentLookback: [this.EnvironmentLookback, Validators.required],
    CimLookback: [this.CimLookback, Validators.required],

    // ExecutionLookback: [this.executionLookbackList], // Ref.
    ExecutionLookback: this.formBuilder.array([
      this.formBuilder.group({
        ExecutionLookbackId: 0, KnowledgeArea: "Safety Performance (Case)", Plan: null, Actual: null, Issue: "", Background: "", LessonLearned: "", Remark: "", Comment: ""
      }),
      this.formBuilder.group({
        ExecutionLookbackId: 0, KnowledgeArea: "Total Cost", Plan: null, Actual: null, Issue: "", Background: "", LessonLearned: "", Remark: "", Comment: ""
      }),
      this.formBuilder.group({
        ExecutionLookbackId: 0, KnowledgeArea: "Time Completion Plan finished", Plan: null, Actual: null, Issue: "", Background: "", LessonLearned: "", Remark: "", Comment: ""
      }),
      // this.formBuilder.group({
      //   ExecutionLookbackId: 0, KnowledgeArea: "Improvement Request(IR)", Issue: "", Background: "", LessonLearned: "", Remark: "", Comment: ""
      // }),
      this.formBuilder.group({
        ExecutionLookbackId: 0, KnowledgeArea: "Nonconformity(NC)", Plan: null, Actual: null, Issue: "", Background: "", LessonLearned: "", Remark: "", Comment: ""
      }),
      this.formBuilder.group({
        ExecutionLookbackId: 0, KnowledgeArea: "Project Change", Plan: null, Actual: null, Issue: "", Background: "", LessonLearned: "", Remark: "", Comment: ""
      })
      // this.formBuilder.group({
      //   ExecutionLookbackId: 0, KnowledgeArea: "Project Change Notice(PCN)", Issue: "", Background: "", LessonLearned: "", Remark: "", Comment: ""
      // }),
    ]),

    PerformancePlanLookbackDate: [this.dateUti.GetToday, Validators.required],

    // CoreUplift: [this.coreUpliftList], // Ref.
    CoreUplift: this.formBuilder.array([
      this.formBuilder.group({
        CoreUpliftId: 0, Economics: "Benefit Objective of this project", EstimatedPlaned: "", Actual: "", WhyDifference: "", Remark: "", Comment: ""
      }),
      this.formBuilder.group({
        CoreUpliftId: 0, Economics: "Reliability", EstimatedPlaned: "", Actual: "", WhyDifference: "", Remark: "", Comment: ""
      }),
      this.formBuilder.group({
        CoreUpliftId: 0, Economics: "Energy Efficiency", EstimatedPlaned: "", Actual: "", WhyDifference: "", Remark: "", Comment: ""
      }),
      this.formBuilder.group({
        CoreUpliftId: 0, Economics: "Others", EstimatedPlaned: "", Actual: "", WhyDifference: "", Remark: "", Comment: ""
      }),
      this.formBuilder.group({
        CoreUpliftId: 0, Economics: "Margin (Benefit), MB/Year", EstimatedPlaned: "", Actual: "", WhyDifference: "", Remark: "", Comment: ""
      }),
      this.formBuilder.group({
        CoreUpliftId: 0, Economics: "%IRR", EstimatedPlaned: "", Actual: "", WhyDifference: "", Remark: "", Comment: ""
      })
    ]),

    CoreUpliftResultDescription: [null, Validators.required],
    CoreUpliftResultUnit: [null, Validators.required],
    CoreUpliftResultBefore: [null, Validators.required],
    CoreUpliftResultAfter: [null, Validators.required],
    CoreUpliftResultBenefit: [null, Validators.required],
    CoreUpliftResultRating: [null, Validators.required],

    EnviPlanLookbackDate: null,
    ResponsibleEnvirEngineer: null,

    // ProjectImpact: [this.projectImpactModelList], // Ref.
    ProjectImpact: [[] as ProjectImpactModel[]],

    // ProjectImpactWork: [this.projectImpactWorkList], // Ref.
    ProjectImpactWork: [[] as ProjectImpactModel[]],

    EnvironmentResult: [[] as EnvironmentResultModel[]],

    PollutionPrevention: [null, Validators.required],
    PollutionPreventionSpecify: [null, Validators.required],
    GlobalEnvirCons: [null, Validators.required],
    GlobalEnvirConsSpecify: [null, Validators.required],
    ResourceCirculation: [null, Validators.required],
    ResourceCirculationSpecify: [null, Validators.required],

    // EnvironmentResultCategory: [null, Validators.required],
    // EnvironmentResultUnit: [null, Validators.required],
    // EnvironmentResultBefore: [null, Validators.required],
    // EnvironmentResultAfter: [null, Validators.required],
    // EnvironmentResultBenefitYear: [null, Validators.required],
    // EnvironmentResultBenefitYearThb: [null, Validators.required],
    // EnvironmentResultRemark: [null],

    McEndorseDate: null,
    BusinessPlanAsOfDate: null,
    BusinessPlanAsOfDate2: null,

    CimLookbackId: [[] as CIMLookbackModel[]],

    limitDateNextYear: null,
    ShowPerformanceLookback: false,
    ShowEnvironmentLookback: false,
  });
  planlookbackList: PlanLookbackModel[];
  lookbackReviewModel: LookbackReviewModel = new LookbackReviewModel();
  ProjectLookbackId: any;
  isUpdate = false;

  responseData: any;

  showPerformanceLookback: boolean;
  showEnvironmentLookback: boolean;
  isCim: boolean;
  maxDateNextYear: Date;

  constructor(
    private lookbackSv: LookbackService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private initiativeService: InitiativeService,
    private dateUti: DateUtil,
    private detailService: DetailService,
  ) {
    this.initiativeService.getGeneralData.subscribe((generalData: Initiative) => {
      if (generalData) {

      }
    });
  }

  ngOnInit(): void {
    this.id = this.initiativeService.id;
    if (this.formGroup && !this.formGroup.get('lookbackForm')) {
      this.formGroup.addControl('lookbackForm', this.lookbackForm)
    }
    this.init();
  }
  init() {
    //get intiative data
    this.initiativeService.GetInitiative(this.initiativeService.id).subscribe((generalRes) => {
      this.isCim = generalRes.cim ? true : false;
      this.maxDateNextYear = generalRes.finishingDate ? this.dateUti.GetNextYearDate(generalRes.finishingDate) : null;
      this.formGroup.get('lookbackForm').patchValue({
        limitDateNextYear: generalRes.finishingDate ? this.dateUti.GetNextYearDate(generalRes.finishingDate) : null
      });

      this.detailService.GetDetailPimGate(this.initiativeService.id, 3).subscribe(responseGateData => {
        // if (res) {
        //     gateDate: res.gateDate ? new Date(res.gateDate) : null
        // }



        this.lookbackSv.GetPlanLookbackById(this.initiativeService.id).then(res => {
          if (res && res.ProjectLookbackId != 0) {
            this.lookbackForm.patchValue(res);
            if (!res.ShowEnvironmentLookback && !res.ShowPerformanceLookback) {
              if (generalRes.stage && generalRes.typeOfInvestment) {
                if (generalRes.stage.toUpperCase().startsWith('GATE4') && (generalRes.typeOfInvestment?.startsWith('Growth') || generalRes.typeOfInvestment?.startsWith('Sustain Core'))) {
                  this.showPerformanceLookback = true;
                  this.lookbackForm.get('ShowPerformanceLookback').patchValue(true);
                  this.lookbackForm.get('ShowEnvironmentLookback').patchValue(false);
                } else if (generalRes.stage.toUpperCase().startsWith('GATE4') && generalRes.typeOfInvestment == 'Environment') {
                  this.showEnvironmentLookback = true;
                  this.lookbackForm.get('ShowPerformanceLookback').patchValue(false);
                  this.lookbackForm.get('ShowEnvironmentLookback').patchValue(true);
                }
              }
            } else {
              this.showPerformanceLookback = res.ShowPerformanceLookback;
              this.showEnvironmentLookback = res.ShowEnvironmentLookback;
            }
            // this.showPerformanceLookback = true;
            // this.showEnvironmentLookback = true;
            //default value
            //all type
            if (!res.FinishingDate) {
              this.formGroup.get('lookbackForm').patchValue({
                FinishingDate: generalRes.finishingDate ? this.dateUti.convertDateUTC(generalRes.finishingDate) : null
              });
            }
            if (!res.PlanLookbackDate) {
              this.formGroup.get('lookbackForm').patchValue({
                PlanLookbackDate: generalRes.finishingDate ? this.dateUti.convertDateUTC(generalRes.finishingDate) : null
              });
            }
            if (res.ExecutionLookback) {
              let ExecutionLookbackArray = this.lookbackForm.get('ExecutionLookback') as FormArray;
              if (!res.ExecutionLookback[2].Plan) {
                ExecutionLookbackArray.at(2).get('Plan').patchValue(generalRes.finishingDate ? this.dateUti.convertDateUTC(generalRes.finishingDate) : null);
              }

              //budget gate 3
              // if (!res.ExecutionLookback[1].Plan) {
              //   ExecutionLookbackArray.at(1).get('Plan').patchValue(responseGateData.gateDate ? this.dateUti.convertDateUTC(responseGateData.gateDate) : null);
              // }
              // if (!res.ExecutionLookback[2].Actual) {
              //   //date form SAP
              //   //ExecutionLookbackArray.at(2).get('Actual').patchValue(generalRes.finishingDate ? this.dateUti.convertDateUTC(generalRes.finishingDate) : null);
              // }
              // if (!res.ExecutionLookback[1].Actual) {
              //   //date form SAP
              //   //ExecutionLookbackArray.at(1).get('Actual').patchValue(responseGateData.gateDate ? this.dateUti.convertDateUTC(responseGateData.gateDate) : null);
              // }
            }

            if (!res.ProjectBackground) {
              this.formGroup.get('lookbackForm').patchValue({
                ProjectBackground: generalRes.background
              });
            }
            if (!res.ScopeOfInitiative) {
              this.formGroup.get('lookbackForm').patchValue({
                ScopeOfInitiative: generalRes.scopeOfWork
              });
            }
            if (!res.ProjectObjective) {
              this.formGroup.get('lookbackForm').patchValue({
                ProjectObjective: generalRes.resultObjective,
              });
            }


            //ids Pim
            if (!res.EnviPlanLookbackDate) {
              this.formGroup.get('lookbackForm').patchValue({
                EnviPlanLookbackDate: generalRes.finishingDate ? this.dateUti.GetThreeMonthAgo(generalRes.finishingDate) : null
              });
            }


            this.ProjectLookbackId = res.ProjectLookbackId
            this.ExecutionLookbackProcess = this.lookbackForm.get('ExecutionLookbackProcess').value;
            this.PerformanceLookback = this.lookbackForm.get('PerformanceLookback').value;
            this.EnvironmentLookback = this.lookbackForm.get('EnvironmentLookback').value;
            this.CimLookback = this.lookbackForm.get('CimLookback').value;
            this.CimLookbackInput = res;
            this.EnvironmentLookbackInput = res;
            this.patchDate(res, generalRes);
          } else {

            //for all type
            this.formGroup.get('lookbackForm').patchValue({
              FinishingDate: generalRes.finishingDate ? this.dateUti.convertDateUTC(generalRes.finishingDate) : null
            });
            this.formGroup.get('lookbackForm').patchValue({
              PlanLookbackDate: generalRes.finishingDate ? this.dateUti.convertDateUTC(generalRes.finishingDate) : null
            });
            let ExecutionLookbackArray = this.lookbackForm.get('ExecutionLookback') as FormArray;
            //ExecutionLookbackArray.at(1).get('Plan').patchValue(responseGateData. ? this.dateUti.convertDateUTC(responseGateData.gateDate) : null);
            ExecutionLookbackArray.at(2).get('Plan').patchValue(generalRes.finishingDate ? this.dateUti.convertDateUTC(generalRes.finishingDate) : null);
            //date Form SAP
            // ExecutionLookbackArray.at(2).get('Actual').patchValue(generalRes.finishingDate ? this.dateUti.convertDateUTC(generalRes.finishingDate) : null);
            // ExecutionLookbackArray.at(1).get('Actual').patchValue(generalRes.finishingDate ? this.dateUti.convertDateUTC(generalRes.finishingDate) : null);

            this.formGroup.get('lookbackForm').patchValue({
              ProjectBackground: generalRes.background,
              ScopeOfInitiative: generalRes.scopeOfWork,
              ProjectObjective: generalRes.resultObjective,
            });

            //for pim
            if (!generalRes.cim) {
              this.formGroup.get('lookbackForm').patchValue({
                EnviPlanLookbackDate: generalRes.finishingDate ? this.dateUti.GetThreeMonthAgo(generalRes.finishingDate) : null
              });
            }
          }

        });
      });
    });
    if (this.initiativeService.viewMode) {
      this.lookbackForm.disable();
    }
  }

  patchDate(data, generalRes) {
    this.lookbackForm.patchValue({
      FinishingDate: data.FinishingDate ? new Date(data.FinishingDate) : this.dateUti.convertDateUTC(generalRes.finishingDate),
      PlanLookbackDate: data.PlanLookbackDate ? new Date(data.PlanLookbackDate) : this.dateUti.convertDateUTC(generalRes.finishingDate),
      //PlanEnviLookBackDate: data.PlanEnviLookBackDate ? new Date(data.PlanEnviLookBackDate) : this.dateUti.GetToday,
      //PlanPerformanceLookbackDate: data.PlanPerformanceLookbackDate ? new Date(data.PlanPerformanceLookbackDate) : this.dateUti.GetToday,
      PerformancePlanLookbackDate: data.PerformancePlanLookbackDate ? new Date(data.PerformancePlanLookbackDate) : this.dateUti.convertDateUTC(generalRes.finishingDate),
      EnviPlanLookbackDate: data.EnviPlanLookbackDate ? new Date(data.EnviPlanLookbackDate) : this.dateUti.GetThreeMonthAgo(generalRes.finishingDate),
      McEndorseDate: data.McEndorseDate ? new Date(data.McEndorseDate) : null,
      BusinessPlanAsOfDate: data.BusinessPlanAsOfDate ? new Date(data.BusinessPlanAsOfDate) : null,
      BusinessPlanAsOfDate2: data.BusinessPlanAsOfDate2 ? new Date(data.BusinessPlanAsOfDate2) : null
    });
  }

  add_row() {
    this.LookbackReview.push({
      LookbackReviewId: null,
      ProjectLookbackId: this.ProjectLookbackId,
      ProjectReviewTeam: null
    });
  }

  delete_row(index) {
    this.LookbackReview.splice(index, 1);
  }

  // lookbackExecution(event) {
  //   this.lookbackForm.get('ExecutionLookback').setValue(event.ExecutionLookback);
  // }

  lookbackPerformance(event) {
    this.lookbackForm.get('PerformancePlanLookbackDate').setValue(event.planLookbackDate);
    this.lookbackForm.get('CoreUplift').setValue(event.CoreUplift);
    if (event.resultForm) {
      this.lookbackForm.get('CoreUpliftResultDescription').setValue(event.resultForm.CoreUpliftResultDescription);
      this.lookbackForm.get('CoreUpliftResultUnit').setValue(event.resultForm.CoreUpliftResultUnit);
      this.lookbackForm.get('CoreUpliftResultBefore').setValue(event.resultForm.CoreUpliftResultBefore);
      this.lookbackForm.get('CoreUpliftResultAfter').setValue(event.resultForm.CoreUpliftResultAfter);
      this.lookbackForm.get('CoreUpliftResultBenefit').setValue(event.resultForm.CoreUpliftResultBenefit);
      this.lookbackForm.get('CoreUpliftResultRating').setValue(event.resultForm.CoreUpliftResultRating);
    }
  }

  lookbackEnvironment(event) {
    // this.lookbackForm.get('EnviPlanLookbackDate').setValue(event.EnviPlanLookbackDate);
    this.lookbackForm.get('ProjectImpact').setValue(event.ProjectImpact);
    this.lookbackForm.get('ProjectImpactWork').setValue(event.ProjectImpactWork);
    this.lookbackForm.get('PollutionPrevention').setValue(event.PollutionPrevention);
    this.lookbackForm.get('PollutionPreventionSpecify').setValue(event.PollutionPreventionSpecify);
    this.lookbackForm.get('GlobalEnvirCons').setValue(event.GlobalEnvirCons);
    this.lookbackForm.get('GlobalEnvirConsSpecify').setValue(event.GlobalEnvirConsSpecify);
    this.lookbackForm.get('ResourceCirculation').setValue(event.ResourceCirculation);
    this.lookbackForm.get('ResourceCirculationSpecify').setValue(event.ResourceCirculationSpecify);
    this.lookbackForm.get('EnvironmentResult').setValue(event.EnvironmentResult);
    // if (event.EnvironmentResult) {
    //   this.lookbackForm.get('EnvironmentResultCategory').setValue(event.EnvironmentResult.EnvironmentResultCategory);
    //   this.lookbackForm.get('EnvironmentResultUnit').setValue(event.EnvironmentResult.EnvironmentResultUnit);
    //   this.lookbackForm.get('EnvironmentResultBefore').setValue(event.EnvironmentResult.EnvironmentResultBefore);
    //   this.lookbackForm.get('EnvironmentResultAfter').setValue(event.EnvironmentResult.EnvironmentResultAfter);
    //   this.lookbackForm.get('EnvironmentResultBenefitYear').setValue(event.EnvironmentResult.EnvironmentResultBenefitYear);
    //   this.lookbackForm.get('EnvironmentResultBenefitYearThb').setValue(event.EnvironmentResult.EnvironmentResultBenefitYearThb);
    //   this.lookbackForm.get('EnvironmentResultRemark').setValue(event.EnvironmentResult.EnvironmentResultRemark);
    // }
  }

  lookbackCIM(event) {
    if (event) {
      this.lookbackForm.get('McEndorseDate').setValue(event.McEndorseDate);
      this.lookbackForm.get('BusinessPlanAsOfDate').setValue(event.BusinessPlanAsOfDate);
      this.lookbackForm.get('BusinessPlanAsOfDate2').setValue(event.BusinessPlanAsOfDate2);
      let CimLookbackId = [...event.dataEconomicReturn, ...event.dataKeyAssumption, ...event.dataProjectBackground, ...event.dataProjectCost, ...event.dataSchedule];
      this.lookbackForm.get('CimLookbackId').setValue(CimLookbackId);
    }
  }

  onClickSave() {
    const pl = this.lookbackForm.value;
    this.lookbackForm.get('InitiativeId').setValue(this.initiativeService.id);
    this.lookbackForm.get('ProjectLookbackId').setValue(this.ProjectLookbackId);
    this.lookbackForm.get('FinishingDate').setValue(pl.FinishingDate);
    this.lookbackForm.get('PlanLookbackDate').setValue(pl.PlanLookbackDate);
    this.lookbackForm.get('PlanEnviLookBackDate').setValue(pl.PlanEnviLookBackDate);
    this.lookbackForm.get('PlanPerformanceLookbackDate').setValue(pl.PlanPerformanceLookbackDate);

    if (this.ProjectLookbackId !== 0) {
      // Update Lookback
      this.lookbackSv.UpdatePlanLookback(this.lookbackForm.value).then(r => {

      }).catch(e => e);
    } else {
      // Create Lookback
      this.lookbackSv.CreatePlanLookback(this.lookbackForm.value).then(r => {

        this.getPlanlookbackList();
      }).catch(e => e);
    }
  }

  check_execution(event) {
    this.ExecutionLookbackProcess = event;
    this.lookbackForm.get('ExecutionLookbackProcess').setValue(event);
  }

  check_performance(event) {
    this.PerformanceLookback = event;
    this.lookbackForm.get('PerformanceLookback').setValue(event);
  }

  check_environment(event) {
    this.EnvironmentLookback = event;
    this.lookbackForm.get('EnvironmentLookback').setValue(event);
  }

  check_cim(event) {
    this.CimLookback = event;
    this.lookbackForm.get('CimLookback').setValue(event);
  }

  // API Plan Lookback
  getPlanlookbackList = () => {
    this.lookbackSv.GetPlanLookBack().then(r => {
      this.planlookbackList = r;
    }).catch(e => e);
  }

  get viewMode() {
    return this.initiativeService.viewMode;
  }


}
