import { ProgressService } from '@services/progress/progress.service';
import { Component, OnInit, Input } from '@angular/core';
import { MaxService } from '@services/max/max.service';
import { DetailService } from '@services/detail/detail.service';
import { ImpactService } from '@services/impact/impact.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { DetailInformationService } from '@services/detail-information/detail-information.service';

@Component({
  selector: 'app-initiative-validate',
  templateUrl: './initiative-validate.component.html',
  styleUrls: ['./initiative-validate.component.css']
})
export class InitiativeValidateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private initiativeService: InitiativeService,
    private progressService: ProgressService,
    private detailService: DetailService,
    private maxService: MaxService,
    private detailInformationService: DetailInformationService,
    private impactService: ImpactService,
  ) { }

  id: number;

  status: string;
  stage: string;

  Cim: boolean;
  Capex: boolean;
  Strategy: boolean;
  Max: boolean;

  products: any = [];
  initiativeDetails: any = [];
  progress: any = [];
  shareBenefitWorkstreams: any = [];
  ImpactList: any = [];

  recurringAndOneTime: any = [];

  FirstRunRateStart: number;
  FirstRunRateLength: number;
  FirstRunRateTypeOfBenefit: any = [];
  FirstRunRateList: any = [];
  FirstRunRate = this.fb.group({ firstRunRateTable: this.fb.array([]) });

  monthObjectAuto = {
    month1: null, month2: null, month3: null, month4: null, month5: null, month6: null,
    month7: null, month8: null, month9: null, month10: null, month11: null, month12: null,
    month13: null, month14: null, month15: null, month16: null, month17: null, month18: null,
    month19: null, month20: null, month21: null, month22: null, month23: null, month24: null,
    month25: null, month26: null, month27: null, month28: null, month29: null, month30: null,
    month31: null, month32: null, month33: null, month34: null, month35: null, month36: null
  };

  FirstRunRateTotalForm = this.fb.group({
    id: [0],
    typeOfBenefit: null,
    versionPrice: this.fb.group({
      row1: 'Target',
      row2: 'Revise',
      row3: 'Actual',
    }),
    runRate: this.fb.group({
      row1: null,
      row2: null,
      row3: null,
    }),
    monthRows1: this.fb.group(this.monthObjectAuto),
    monthRows2: this.fb.group(this.monthObjectAuto),
    monthRows3: this.fb.group(this.monthObjectAuto)
  });

  ImpactForm = this.fb.group({
    id: 0,
    iL4RunRateRecurring: 0,
    iL4RunRateOnetime: 0,
    totalRecurring: 0,
    totalOnetime: 0,
    initiativeId: ''
  });

  ngOnInit(): void {
    this.id = Number(sessionStorage.getItem('id'));
    this.initiativeService.GetInitiative(this.id).subscribe(initiative => {
      this.status = initiative.status;
      this.stage = initiative.stage;

      this.Cim = initiative.cim ? true : false;
      this.Capex = initiative.directCapex ? true : false;
      this.Strategy = initiative.strategy ? true : false;
      this.Max = initiative.max ? true : false;

      // Cim & Strategy
      if (this.Cim || this.Strategy) {
        if (sessionStorage.getItem('DetailValidated') !== 'true') {
          this.detailService.GetInitiativeDetail(this.id).subscribe(response => {
            this.initiativeDetails = response.initiativeDetails;
            if (this.initiativeDetails) {
              if (this.initiativeDetails.strategicObjective &&
                this.initiativeDetails.strategyDetail &&
                this.initiativeDetails.shareOfInvestment) {
                if (this.initiativeDetails.haveProduct === 'true') {
                  this.products = response.products;
                  if (this.products.length === 0) {
                    sessionStorage.setItem('DetailValidate', 'true');
                  } else {
                    if (this.products[0].name) {
                      sessionStorage.setItem('DetailValidate', 'true');
                    } else {
                      sessionStorage.setItem('DetailValidate', 'false');
                    }
                  }
                } else {
                  sessionStorage.setItem('DetailValidate', 'true');
                }
              } else {
                sessionStorage.setItem('DetailValidate', 'false');
              }
            } else {
              sessionStorage.setItem('DetailValidate', 'false');
            }
          });
        }
      }

      // Max
      if (this.Max) {
        if (sessionStorage.getItem('DetailMaxValidated') !== 'true') {
          this.detailInformationService.GetDetailInformation(this.id).subscribe(response => {
            const stage = ['IL0', 'IL2', 'IL3-2', 'IL4', 'IL5'];
            if (!this.stage) {
              if (response) {
                this.maxService.GetWorkstreamLead(this.id).subscribe(approve => {
                  if (approve) {
                    if (!approve.approverEmail) {
                      sessionStorage.setItem('DetailMaxValidate', 'false');
                    } else {
                      if (response.workstream && response.subWorkstream2 && response.initiativeTypeMax != null && response.initiativeTypeMax != "") {
                        sessionStorage.setItem('DetailMaxValidate', 'true');
                      } else {
                        sessionStorage.setItem('DetailMaxValidate', 'false');
                      }
                    }
                  } else {
                    sessionStorage.setItem('DetailMaxValidate', 'false');
                  }
                });
              } else {
                sessionStorage.setItem('DetailMaxValidate', 'false');
              }
            } else if (this.stage === 'IL1') {
              if (response) {
                if (response.iL3Date && response.iL4Date && response.iL5Date) {
                  sessionStorage.setItem('DetailMaxValidate', 'true');
                } else {
                  sessionStorage.setItem('DetailMaxValidate', 'false');
                }
                this.maxService.GetWorkstreamLead(this.id).subscribe(approve => {
                  if (approve) {
                    if (!approve.approverEmail) {
                      sessionStorage.setItem('DetailMaxValidate', 'false');
                    } else {
                      sessionStorage.setItem('DetailMaxValidate', 'true');
                    }
                  }
                });
              } else {
                sessionStorage.setItem('DetailMaxValidate', 'false');
              }
            } else if (stage.indexOf(this.stage) !== -1) {
              this.maxService.GetWorkstreamLead(this.id).subscribe(approve => {
                if (approve) {
                  if (!approve.approverEmail) {
                    sessionStorage.setItem('DetailMaxValidate', 'false');
                  } else {
                    sessionStorage.setItem('DetailMaxValidate', 'true');
                  }
                }
              });
            } else {
              sessionStorage.setItem('DetailMaxValidate', 'true');
            }
          });
        }
      }

      // Capex
      if (this.Capex) {
        if (sessionStorage.getItem('DetailMaxValidated') !== 'true') {
          if (this.stage) {
            sessionStorage.setItem('DetailMaxValidate', 'true');
          }
        }
      }

      // IL1
      if (this.stage === 'IL1') {
        if (sessionStorage.getItem('ImpactValidated') !== 'true') {
          this.impactService.GetImpactTracking(this.id).subscribe(response => {
            if (response) {
              sessionStorage.setItem('ImpactValidate', 'true');
              this.impactService.GetFirstRunRate(this.id).then(result => {
                this.ImpactList = result;
                if (this.ImpactList.length !== 0) {
                  for (const item of this.ImpactList) {
                    if (item.versionPrice === 'Target') {
                      if (!item.runRate) {
                        sessionStorage.setItem('ImpactValidate', 'false');
                        return false;
                      }
                    }
                  }
                } else {
                  sessionStorage.setItem('ImpactValidate', 'false');
                  return false;
                }
              });
              if (!response.financialImpactArea) {
                sessionStorage.setItem('ImpactValidate', 'false');
                return false;
              }
            } else {
              sessionStorage.setItem('ImpactValidate', 'false');
            }
          });
        }
      }

      // IL2
      if (this.stage === 'IL2') {
        if (sessionStorage.getItem('ProgressValidated') !== 'true') {
          this.progressService.GetProgressAndMilestone(this.id).subscribe(response => {
            this.progress = response.progressDetails;
            if (this.progress.length !== 0) {
              for (const item of this.progress) {
                if (!item.milestone) {
                  sessionStorage.setItem('ProgressValidate', 'false');
                  break;
                } else {
                  sessionStorage.setItem('ProgressValidate', 'true');
                }
              }
            } else {
              sessionStorage.setItem('ProgressValidate', 'false');
            }
          });
        }
      }

      // IL3
      if (this.stage === 'IL3-2') {
        this.GetRecurringAndOnetime();
        this.SetImpact();
        sessionStorage.setItem('ImpactValidate', 'true');
      }

      // IL4
      if (this.stage === 'IL4') {
        if (sessionStorage.getItem('ImpactValidated') !== 'true') {
          this.impactService.GetImpactTracking(this.id).subscribe(response => {
            if (response) {
              this.impactService.GetFirstRunRate(this.id).then(result => {
                this.ImpactList = result;
                for (const item of this.ImpactList) {
                  if (item.versionPrice === 'Actual') {
                    if (!item.runRate) {
                      sessionStorage.setItem('ImpactValidate', 'false');
                      return false;
                    }
                  }
                }
              });
              sessionStorage.setItem('ImpactValidate', 'true');
            } else {
              sessionStorage.setItem('ImpactValidate', 'false');
            }
          });
        }
      }

      // ShareBenefitWorkstreams (IMPACT)
      if (sessionStorage.getItem('ImpactValidated') !== 'true') {
        this.impactService.GetImpactTracking(this.id).subscribe(result => {
          if (result) {
            if (result.haveShareBenefit) {
              this.impactService.GetShareBenefitWorkstream(this.id).subscribe(response => {
                this.shareBenefitWorkstreams = response.shareBenefitWorkstreams;
                if (this.shareBenefitWorkstreams.length !== 0) {
                  const arraySum = [];
                  for (const item of this.shareBenefitWorkstreams) {
                    if (item.percent !== null) {
                      arraySum.push(Number(item.percent));
                    }
                  }
                  const sum = arraySum.reduce((a, b) => a + b, 0);
                  if (sum < 100) { sessionStorage.setItem('PercentImpact', 'true'); }
                }
              });
            }
          }
        });
      }
    });
  }

  GetRecurringAndOnetime() {
    this.impactService.GetRecurringAndOneTimeSelect().subscribe(recurringAndOneTime => {
      this.recurringAndOneTime = recurringAndOneTime;
    });
  }

  InitialFirstRunRate(): FormGroup {
    return this.fb.group({
      id: [0],
      typeOfBenefitGroup: 'recurring',
      typeOfBenefit: null,
      versionPrice: this.fb.group({
        row1: 'Target',
        row2: 'Revise',
        row3: 'Actual',
      }),
      runRate: this.fb.group({
        row1: null,
        row2: null,
        row3: null,
      }),
      monthRows1: this.fb.group({
        month1: null, month2: null, month3: null, month4: null, month5: null, month6: null,
        month7: null, month8: null, month9: null, month10: null, month11: null, month12: null,
        month13: null, month14: null, month15: null, month16: null, month17: null, month18: null,
        month19: null, month20: null, month21: null, month22: null, month23: null, month24: null,
        month25: null, month26: null, month27: null, month28: null, month29: null, month30: null,
        month31: null, month32: null, month33: null, month34: null, month35: null, month36: null
      }),
      monthRows2: this.fb.group({
        month1: null, month2: null, month3: null, month4: null, month5: null, month6: null,
        month7: null, month8: null, month9: null, month10: null, month11: null, month12: null,
        month13: null, month14: null, month15: null, month16: null, month17: null, month18: null,
        month19: null, month20: null, month21: null, month22: null, month23: null, month24: null,
        month25: null, month26: null, month27: null, month28: null, month29: null, month30: null,
        month31: null, month32: null, month33: null, month34: null, month35: null, month36: null
      }),
      monthRows3: this.fb.group({
        month1: null, month2: null, month3: null, month4: null, month5: null, month6: null,
        month7: null, month8: null, month9: null, month10: null, month11: null, month12: null,
        month13: null, month14: null, month15: null, month16: null, month17: null, month18: null,
        month19: null, month20: null, month21: null, month22: null, month23: null, month24: null,
        month25: null, month26: null, month27: null, month28: null, month29: null, month30: null,
        month31: null, month32: null, month33: null, month34: null, month35: null, month36: null
      })
    });
  }

  SetImpact() {
    if (sessionStorage.getItem('ImpactValidated') !== 'true') {
      this.impactService.GetImpactTracking(this.id).subscribe(impact => this.SetFirstRunRate(impact.id));
    }
  }

  SetFirstRunRate(impact) {
    this.impactService.GetFirstRunRate(this.id).then(FirstRunRateList => {
      this.FirstRunRateList = FirstRunRateList;
      if (this.FirstRunRateList.length !== 0) {
        const FirstRunRate = this.FirstRunRate.get('firstRunRateTable') as FormArray;
        const FirstRunRateRow = { row1: [], row2: [], row3: [] };
        const FirstRunRateRowSum = { row1: 0, row2: 0, row3: 0 };
        const monthRunRate = [
          'month1', 'month2', 'month3', 'month4', 'month5', 'month6',
          'month7', 'month8', 'month9', 'month10', 'month11', 'month12',
          'month13', 'month14', 'month15', 'month16', 'month17', 'month18',
          'month19', 'month20', 'month21', 'month22', 'month23', 'month24',
          'month25', 'month26', 'month27', 'month28', 'month29', 'month30',
          'month31', 'month32', 'month33', 'month34', 'month35', 'month36',
        ];
        this.FirstRunRateList = FirstRunRateList;
        for (let i = 0; i <= (this.FirstRunRateList.length); i++) {
          if (i !== 0) {
            if (i % 3 === 0) {
              this.FirstRunRateTypeOfBenefit.push(this.FirstRunRateList[i - 1].typeOfBenefit);
            }
          }
        }
        for (let i = 1; i <= (this.FirstRunRateList.length / 3); i++) {
          FirstRunRate.push(this.InitialFirstRunRate());
          FirstRunRate.at(i - 1).patchValue({ typeOfBenefit: this.FirstRunRateTypeOfBenefit[i - 1] });
        }
        for (let j = 0; j < (this.FirstRunRateList.length / 3); j++) {
          if (j === 0) {
            this.FirstRunRateStart = 0;
            this.FirstRunRateLength = 2;
          } else {
            this.FirstRunRateStart = this.FirstRunRateStart + 3;
            this.FirstRunRateLength = this.FirstRunRateLength + 3;
          }
          for (let i = this.FirstRunRateStart; i <= this.FirstRunRateLength; i++) {
            const typeOfBenefit = this.recurringAndOneTime.filter(
              obj => obj.typeOfBenefitCode === this.FirstRunRateList[i].typeOfBenefit
            );
            if (i % 3 === 0) {
              FirstRunRate.at(j).get('runRate').patchValue({ row1: this.FirstRunRateList[i].runRate });
              switch (typeOfBenefit[0].typeOfBenefitGroup) {
                case 'Recurring': FirstRunRateRow.row1.push(this.FirstRunRateList[i].runRate); break;
                case 'One time': FirstRunRateRow.row1.push(this.FirstRunRateList[i].runRate * 0.1); break;
              }
              FirstRunRateRowSum.row1 = FirstRunRateRow.row1.reduce((a, b) => a + b, 0);
            } else if (i % 3 === 1) {
              FirstRunRate.at(j).get('runRate').patchValue({ row2: this.FirstRunRateList[i].runRate });
              switch (typeOfBenefit[0].typeOfBenefitGroup) {
                case 'Recurring': FirstRunRateRow.row2.push(this.FirstRunRateList[i].runRate); break;
                case 'One time': FirstRunRateRow.row2.push(this.FirstRunRateList[i].runRate * 0.1); break;
              }
              FirstRunRateRowSum.row2 = FirstRunRateRow.row2.reduce((a, b) => a + b, 0);
            } else if (i % 3 === 2) {
              FirstRunRate.at(j).get('runRate').patchValue({ row3: this.FirstRunRateList[i].runRate });
              switch (typeOfBenefit[0].typeOfBenefitGroup) {
                case 'Recurring': FirstRunRateRow.row3.push(this.FirstRunRateList[i].runRate); break;
                case 'One time': FirstRunRateRow.row3.push(this.FirstRunRateList[i].runRate * 0.1); break;
              }
              FirstRunRateRowSum.row3 = FirstRunRateRow.row3.reduce((a, b) => a + b, 0);
            }
          }
          for (let i = this.FirstRunRateStart; i <= this.FirstRunRateLength; i++) {
            if (i % 3 === 0) {
              monthRunRate.forEach((name) => FirstRunRate.at(j).get('monthRows1').patchValue({ [name]: this.FirstRunRateList[i][name] }));
            } else if (i % 3 === 1) {
              monthRunRate.forEach((name) => FirstRunRate.at(j).get('monthRows2').patchValue({ [name]: this.FirstRunRateList[i][name] }));
            } else if (i % 3 === 2) {
              monthRunRate.forEach((name) => FirstRunRate.at(j).get('monthRows3').patchValue({ [name]: this.FirstRunRateList[i][name] }));
            }
          }
        }
        for (let i = 0; i < FirstRunRate.length; i++) {
          if (FirstRunRate.at(i).get('runRate').value.row1 === FirstRunRate.at(i).get('runRate').value.row2) {
            monthRunRate.forEach((name) => {
              FirstRunRate.at(i).get('runRate').patchValue({ row2: FirstRunRate.at(i).get('runRate').value.row1 });
              FirstRunRate.at(i).get('monthRows2').patchValue({ [name]: FirstRunRate.at(i).get('monthRows1').value[name] });
            });
          } else if (FirstRunRate.at(i).get('runRate').value.row1 !== FirstRunRate.at(i).get('runRate').value.row2) {
            if (FirstRunRate.at(i).get('runRate').value.row2) {
              monthRunRate.forEach((name) => {
                FirstRunRate.at(i).get('runRate').patchValue({ row2: FirstRunRate.at(i).get('runRate').value.row2 });
                FirstRunRate.at(i).get('monthRows2').patchValue({ [name]: FirstRunRate.at(i).get('monthRows2').value[name] });
              });
            } else {
              monthRunRate.forEach((name) => {
                FirstRunRate.at(i).get('runRate').patchValue({ row2: FirstRunRate.at(i).get('runRate').value.row1 });
                FirstRunRate.at(i).get('monthRows2').patchValue({ [name]: FirstRunRate.at(i).get('monthRows1').value[name] });
              });
            }
          }
        }
        Object.keys(FirstRunRateRowSum).forEach(name => {
          this.FirstRunRateTotalForm.get('runRate').patchValue({
            [name]: FirstRunRateRowSum[name] ? FirstRunRateRowSum[name] : null
          });
        });

        const totalRecurring = [];
        let totalRecurringSum = 0;

        const totalOnetime = [];
        let totalOnetimeSum = 0;

        for (let i = 0; i < FirstRunRate.length; i++) {
          const typeOfBenefit = this.recurringAndOneTime.filter(
            obj => obj.typeOfBenefitCode === FirstRunRate.at(i).get('typeOfBenefit').value
          );
          if (typeOfBenefit.length !== 0) {
            FirstRunRate.at(i).enable();
            switch (typeOfBenefit[0].typeOfBenefitGroup) {
              case 'Recurring':
                if (this.FirstRunRateTotalForm.controls.runRate.value.row3) {
                  totalRecurring.push(Number(FirstRunRate.at(i).get('runRate').value.row3));
                } else if (this.FirstRunRateTotalForm.controls.runRate.value.row2) {
                  totalRecurring.push(Number(FirstRunRate.at(i).get('runRate').value.row2));
                } else if (this.FirstRunRateTotalForm.controls.runRate.value.row1) {
                  totalRecurring.push(Number(FirstRunRate.at(i).get('runRate').value.row1));
                }
                break;
              case 'One time':
                if (this.FirstRunRateTotalForm.controls.runRate.value.row3) {
                  totalOnetime.push(Number(FirstRunRate.at(i).get('runRate').value.row3 * 0.1));
                } else if (this.FirstRunRateTotalForm.controls.runRate.value.row2) {
                  totalOnetime.push(Number(FirstRunRate.at(i).get('runRate').value.row2 * 0.1));
                } else if (this.FirstRunRateTotalForm.controls.runRate.value.row1) {
                  totalOnetime.push(Number(FirstRunRate.at(i).get('runRate').value.row1 * 0.1));
                }
                break;
            }
          }
        }

        totalRecurringSum = totalRecurring.reduce((a, b) => a + b, 0);
        totalOnetimeSum = totalOnetime.reduce((a, b) => a + b, 0);

        this.ImpactForm.patchValue({ totalRecurring: totalRecurringSum, totalOnetime: totalOnetimeSum });

        const iL4RunRateRecurring = [];
        let iL4RunRateRecurringSum = 0;
        const iL4RunRateOnetime = [];
        let iL4RunRateOnetimeSum = 0;

        for (let i = 0; i < FirstRunRate.length; i++) {
          const typeOfBenefit = this.recurringAndOneTime.filter(
            obj => obj.typeOfBenefitCode === FirstRunRate.at(i).get('typeOfBenefit').value
          );
          if (typeOfBenefit.length !== 0) {
            switch (typeOfBenefit[0].typeOfBenefitGroup) {
              case 'Recurring':
                iL4RunRateRecurring.push(Number(FirstRunRate.at(i).get('runRate').value.row2));
                break;
              case 'One time':
                iL4RunRateOnetime.push(Number(FirstRunRate.at(i).get('runRate').value.row2 * 0.1));
                break;
            }
          }
        }

        iL4RunRateRecurringSum = iL4RunRateRecurring.reduce((a, b) => a + b, 0);
        iL4RunRateOnetimeSum = iL4RunRateOnetime.reduce((a, b) => a + b, 0);

        this.ImpactForm.patchValue({ iL4RunRateRecurring: iL4RunRateRecurringSum });
        this.ImpactForm.patchValue({ iL4RunRateOnetime: iL4RunRateOnetimeSum });

        this.ImpactForm.patchValue({ id: impact, initiativeId: this.id });

        sessionStorage.setItem('isFirstRunRateGeneral', 'true');
        sessionStorage.setItem('FirstRunRateGeneral', JSON.stringify(this.FirstRunRate.value));
        sessionStorage.setItem('ImpactGeneral', JSON.stringify(this.ImpactForm.value));
      }
    });
  }
}
