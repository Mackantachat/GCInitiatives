import { BestPracticeService } from './../best-practice/best-practice.service';
import { DetailService } from './../detail/detail.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { InitiativeService } from '@services/initiative/initiative.service';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { CapexService } from '@services/capex/capex.service';
import { ImpactService } from '@services/impact/impact.service';
import { ProgressService } from '@services/progress/progress.service';
import { SubmitService } from '@services/submit/submit.service';
import { SwalTool } from '@tools/swal.tools';
import { FormGroup, FormArray, Form } from '@angular/forms';
import { AuditService } from '@services/audit/audit.service';
import { ProgressPlanDateModel, ProgressPlanModel } from '../../models/progress-milestone-model';
import { DetailInformation } from '@models/detailInformation';
import { LessonLearnApiService } from '@services/lesson-learn-api/lesson-learn-api.service';
import { LessonLearnTableDataService } from '@services/lesson-learn-table-data/lesson-learn-table-data.service';
import { MaxApprover } from '@models/maxApprover';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { resolve } from 'dns';
import { PimService } from '@services/pim/pim.service';


@Injectable({
  providedIn: 'root'
})
export class MaxService {

  baseUrl = environment.apiUrl;
  annualInvestmentPlanId: string;

  constructor(
    private http: HttpClient,
    private initiativeService: InitiativeService,
    private detailinformationService: DetailInformationService,
    private capexService: CapexService,
    private impactService: ImpactService,
    private progressService: ProgressService,
    private pimService: PimService,
    private submitService: SubmitService,
    private swalTool: SwalTool,
    private auditService: AuditService,
    private detailService: DetailService,
    private bestpracticeService: BestPracticeService,
    private lessonLearnService: LessonLearnApiService,
    private lessonLearnTableDataService: LessonLearnTableDataService,
    private router: Router,
  ) {
    this.annualInvestmentPlanId = '1111';
  }

  
  SaveDraftSubmit(formGroup: FormGroup, type: string, historyId) {
    this.initiativeService.SavingData = true;
    this.swalTool.savingLoading(type);
    let detailMaxId = formGroup.get('DetailMaxForm') ? formGroup.get('DetailMaxForm').get('id').value : null;
    let capexInformationId = formGroup.get('capexInformationForm') ? formGroup.get('capexInformationForm').get('capexInformationId').value : null;
    let impactId = formGroup.get('ImpactForm') ? formGroup.get('ImpactForm').get('id').value : null;
    let progressArray = formGroup.get('progressForm') ? formGroup.get('progressForm').get('details') as FormArray : null;
    let bestPracticeId = formGroup.get("bestPracticeForm") ? formGroup.get("bestPracticeForm").get("id").value : null;

    //update general
    let saveGeneral = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (this.initiativeService.suggestionStatus.stage !== 'IL5') {
        if (type === 'submit') {
          this.initiativeService.UpdateSubmitInitiative(this.initiativeService.id, (formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe((response) => {
            return resolve(true);
          }, error => {
            return reject();
          });
        } else {
          this.initiativeService.UpdateDraftInitiative(this.initiativeService.id, formGroup.get('initiativesForm').value).subscribe((response) => {
            return resolve(true);
          }, error => {
            return reject();
          });
        }
      } else {
        return resolve(true);
      }
    });



    let saveCoDev = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      this.initiativeService.UpdateCoDeveloper(this.initiativeService.id, formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(() => {
        return resolve(true);
      }, error => {
        return reject();
      });
    })

    let saveDetail = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (detailMaxId == 0) {
        //case include pim detail tab
        let detailInfomation: DetailInformation = {} as DetailInformation;
        if (formGroup.get('detailPimForm')) {
          detailInfomation = this.initiativeService.mergeDetail(formGroup);
        } else {
          // detailInfomation = formGroup.get('DetailMaxForm').value;
          let DetailForm = formGroup.get('DetailMaxForm') as FormGroup;
          detailInfomation = DetailForm.getRawValue();
        }
        this.detailinformationService.CreateDetailInformation(this.initiativeService.id, detailInfomation).subscribe((createDetailInformationResponse) => {

          if (createDetailInformationResponse) {
            // this.detailInformationId = createDetailInformationResponse.id;
            formGroup.get('DetailMaxForm').get('id').setValue(createDetailInformationResponse.id);
            if (formGroup.get('DetailMaxForm').get('workstreamLead')) this.CreateWorkstreamLead(this.initiativeService.id, { email: formGroup.get('DetailMaxForm').get('workstreamLead').value }).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('sponsorEvp')) this.CreateSponsor(this.initiativeService.id, formGroup.get('DetailMaxForm').get('sponsorEvp').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('toFinance')) this.CreateFinance(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinance').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('cfo')) this.CreateCFO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('cfo').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('cto')) this.CreateCTO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('cto').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('tot')) this.CreateTOTeam(this.initiativeService.id, formGroup.get('DetailMaxForm').get('tot').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('tfb')) this.CreateTfBtTO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('tfb').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('toFinanceIL4')) this.CreateTOFinanceIL4(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinanceIL4').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('toFinanceIL5')) this.CreateTOFinanceIL5(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinanceIL5').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('kpisForm')) this.detailinformationService.CreateKpi(this.initiativeService.id, formGroup.get('DetailMaxForm').get('kpisForm').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('financeExpert')) this.CreateFinanceExpert(this.initiativeService.id, formGroup.get('DetailMaxForm').get('financeExpert').value).subscribe(() => { });
            return resolve(true);
          }
        }, error => {
          console.log('create detail error', error);
          return reject();
        });
      } else if (detailMaxId > 0) {

        //case include pim detail tab
        let detailInfomation: DetailInformation = {} as DetailInformation;
        if (formGroup.get('detailPimForm')) {
          detailInfomation = this.initiativeService.mergeDetail(formGroup);
        } else {
          // detailInfomation = formGroup.get('DetailMaxForm').value;
          let DetailForm = formGroup.get('DetailMaxForm') as FormGroup;
          detailInfomation = DetailForm.getRawValue();
        }
        //update draft
        console.log('update detail');
        this.detailinformationService.UpdateDetailInformation(this.initiativeService.id, detailInfomation).subscribe((updateDetailInformationResponse) => {
          if (updateDetailInformationResponse) {
            if (formGroup.get('DetailMaxForm').get('workstreamLead')) this.CreateWorkstreamLead(this.initiativeService.id, { email: formGroup.get('DetailMaxForm').get('workstreamLead').value }).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('sponsorEvp')) this.CreateSponsor(this.initiativeService.id, formGroup.get('DetailMaxForm').get('sponsorEvp').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('toFinance')) this.CreateFinance(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinance').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('cfo')) this.CreateCFO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('cfo').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('cto')) this.CreateCTO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('cto').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('tot')) this.CreateTOTeam(this.initiativeService.id, formGroup.get('DetailMaxForm').get('tot').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('tfb')) this.CreateTfBtTO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('tfb').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('toFinanceIL4')) this.CreateTOFinanceIL4(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinanceIL4').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('toFinanceIL5')) this.CreateTOFinanceIL5(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinanceIL5').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('kpisForm')) this.detailinformationService.CreateKpi(this.initiativeService.id, formGroup.get('DetailMaxForm').get('kpisForm').value).subscribe(() => { });
            if (formGroup.get('DetailMaxForm').get('financeExpert')) this.CreateFinanceExpert(this.initiativeService.id, formGroup.get('DetailMaxForm').get('financeExpert').value).subscribe(() => { });
            console.log('saved');
            return resolve(true);
          }
        }, error => {
          console.log('create detail error', error);
          return reject();
        });
      } else {
        return resolve(true);
      }
    });
    let saveCapex = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (capexInformationId == 0) {
        console.log('capex = 0');
        // create capex information
        this.capexService.CreateCapexsInfoNewEngine(formGroup.get('capexInformationForm') as FormGroup).then((createResponse) => {
          if (createResponse) {
            formGroup.get('capexInformationForm').get('capexInformationId').setValue(createResponse.capexInformationId);
            if (formGroup.get('capexInformationForm').get('AnnualForm')) {
              this.capexService.CreateAnnualInvestmentPlanNewEngine(this.initiativeService.id, formGroup.get('capexInformationForm').get('AnnualForm'), createResponse.capexInformationId, "submit", 'Createnew').then((createAnnualResponse) => {
                this.capexService.CreateMonthlyInvestmentPlanNewEngine(this.annualInvestmentPlanId, formGroup.get('capexInformationForm') as FormGroup).then((createMonthlyInvestmentPlan) => {
                  return resolve(true);
                }).catch((monthInvesError) => {
                  return reject();
                })
              }).catch((annualError) => {
                return reject();
              });
            } else {
              return resolve(true);
            }
          }
        }).catch((error) => {
          return reject();
        });
      } else if (capexInformationId > 0) {
        //update draft
        console.log('capex > 0');
        this.capexService.UpdateCapexsInfoNewEngine(formGroup.get('capexInformationForm') as FormGroup).then((updateCapexResponse) => {
          if (updateCapexResponse) {
            if (formGroup.get('capexInformationForm').get('AnnualForm')) {
              this.capexService.CreateAnnualInvestmentPlanNewEngine(this.initiativeService.id, formGroup.get('capexInformationForm').get('AnnualForm'), capexInformationId, "submit", 'Createnew').then((createAnnualResponse) => {
                this.capexService.CreateMonthlyInvestmentPlanNewEngine(this.annualInvestmentPlanId, formGroup.get('capexInformationForm') as FormGroup).then((createMonthlyInvestmentPlan) => {
                  return resolve(true);
                }).catch((monthInvesError) => {
                  console.log(monthInvesError);
                  return reject();
                })
              }).catch((annualError) => {
                console.log(annualError);
                return reject();
              });
            } else {
              return resolve(true);
            }
          } else {
            return resolve(true);
          }
        }).catch((error) => {
          console.log(error);
          return reject();
        });
      } else {
        return resolve(true);
      }
    });
    let saveImpact = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (impactId == 0) {
        console.log('impact = 0');

        //create draft
        this.impactService.CreateImpact(this.initiativeService.id, (formGroup.get('ImpactForm') as FormGroup).getRawValue(), type).subscribe((createImpactResponse) => {
          if (createImpactResponse) {
            formGroup.get('ImpactForm').get('id').setValue(createImpactResponse.id);
            return resolve(true);
          }
        }, error => {
          console.log('CreateImpact error', error);
          return reject();
        });
      } else if (impactId > 0) {
        console.log('impact > 0');

        //update draft
        this.impactService.UpdateImpact(this.initiativeService.id, (formGroup.get('ImpactForm') as FormGroup).getRawValue(), type).subscribe((updateImpactResponse) => {
          if (updateImpactResponse) {
            return resolve(true);
          }
        }, error => {
          console.log('UpdateImpact error', error);
          return reject();
        });
      } else {
        return resolve(true);
      }
    });

    let saveGate1Form = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (formGroup.get('gate1Form')) {
        if (formGroup.get('gate1Form').get('pimGateId').value === 0) {
          formGroup.get('gate1Form').get('gate').patchValue(1);
          this.detailService.CreateDetailPimGate((formGroup.get('gate1Form') as FormGroup).getRawValue(), this.initiativeService.id).subscribe(res => {
            formGroup.get('gate1Form').get('pimGateId').patchValue(res.pimGateId);
            return resolve(true);
          }, error => { return reject(error); });
        } else {
          formGroup.get('gate1Form').get('gate').patchValue(1);
          this.detailService.UpdateDetailPimGate(this.initiativeService.id, (formGroup.get('gate1Form') as FormGroup).getRawValue()).subscribe(res => {
            return resolve(true);
          }, error => { return reject(error); });
        }
      } else {
        return resolve(true);
      }

    });

    let saveGate2Form = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (formGroup.get('gate2Form')) {
        if (formGroup.get('gate2Form').get('pimGateId').value === 0) {
          formGroup.get('gate2Form').get('gate').patchValue(2);
          this.detailService.CreateDetailPimGate((formGroup.get('gate2Form') as FormGroup).getRawValue(), this.initiativeService.id).subscribe(res => {
            formGroup.get('gate2Form').get('pimGateId').patchValue(res.pimGateId);
            return resolve(true);
          }, error => { return reject(error); });
        } else {
          formGroup.get('gate2Form').get('gate').patchValue(2);
          this.detailService.UpdateDetailPimGate(this.initiativeService.id, (formGroup.get('gate2Form') as FormGroup).getRawValue()).subscribe(res => {
            return resolve(true);
          }, error => { return reject(error); });
        }
      } else {
        return resolve(true);
      }

    });


    let saveGate3Form = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (formGroup.get('gate3Form')) {
        if (formGroup.get('gate3Form').get('pimGateId').value === 0) {
          formGroup.get('gate3Form').get('gate').patchValue(3);
          this.detailService.CreateDetailPimGate((formGroup.get('gate3Form') as FormGroup).getRawValue(), this.initiativeService.id).subscribe(res => {
            formGroup.get('gate3Form').get('pimGateId').patchValue(res.pimGateId);
            return resolve(true);
          }, error => { return reject(error); });
        } else {
          formGroup.get('gate3Form').get('gate').patchValue(3);
          this.detailService.UpdateDetailPimGate(this.initiativeService.id, (formGroup.get('gate3Form') as FormGroup).getRawValue()).subscribe(res => {
            return resolve(true);
          }, error => { return reject(error); });
        }
      } else {
        return resolve(true);
      }
    });

    let saveProgressForm = new Promise((resolve, reject) => {

      if (formGroup.get('progressForm')) {
        //console.log('progress in capex')
        this.progressService.CreateProgress(this.initiativeService.id, (formGroup.get('progressForm') as FormGroup).getRawValue()).subscribe((res) => {
          if (!this.progressService.costSpendingData.value) {
            return resolve(true);
          } else if (Array.isArray(this.progressService.costSpendingData.value) && this.progressService.costSpendingData.value.length == 0) {
            return resolve(true);
          }
          this.progressService.CreateCostSpending(this.initiativeService.id, this.progressService.costSpendingData.value).then((createCostRes) => {
            return resolve(true);
          });
        }, error => {
          console.log(error)
          return reject();
        });
      }
      else {
        return resolve(true);
      }
    });
    
    let saveEMoc = new Promise((resolve, reject) => {
      if(formGroup.get('detailPimForm') && formGroup.get('detailPimForm').get('isImpactProduction').value == 'true') {
    let detailPimForm = formGroup.get('detailPimForm') as FormGroup;
        this.pimService.createMainPlant((detailPimForm.get('eMocs') as FormArray).getRawValue()).subscribe((res) => {
          if (res.length > 0) {
            let control = detailPimForm.get('eMocs') as FormArray;
            control.controls.forEach((element, elmIndex) => {
              element.patchValue({
                typeOfChange: parseInt(element.value.typeOfChange),
                mocCategory: parseInt(element.value.mocCategory),
                mainPlanId: res[elmIndex].mainPlanId
              });
            });
          }
          return resolve(true);
        }, error => {
          console.log(error)
          return reject();
        });
      }
      else {
        return resolve(true);
      }
    });



    let saveMileStone = new Promise((resolve, reject) => {
      if (formGroup.get('poc1')) {
        this.progressService.CreateProgressPlanDate((formGroup.get('poc1') as FormGroup).getRawValue(), 'poc1').subscribe(() => {
          this.progressService.CreateProgressPlan(this.progressService.dataProgressPlanPoc1.value).subscribe(() => {
            return resolve(true);
          }, error => {
            console.log(error)
            return reject();
          });
        }, error => {
          console.log(error)
          return reject();
        });
      } else if (formGroup.get('poc2FormNewLogic')) {
        // this.progressService.CreateProgressPlanDate(formGroup.get('poc2Form').value, 'poc2').subscribe(() => { });
        //     if (formGroup.get('poc2Form').get('progressPlan').value !== null) this.progressService.CreateProgressPlanMileStone2(formGroup.get('poc2Form').get('progressPlan').value).subscribe(() => { });
        this.progressService.CreateProgressPlanDate((formGroup.get('poc2FormNewLogic') as FormGroup).getRawValue(), 'poc2').subscribe(() => {
          // this.progressService.CreateProgressPlanMileStone2(this.progressService.dataProgressPlanPoc2.value).subscribe(() => {
          this.progressService.CreateProgressPlanMileStone2((formGroup.get('poc2FormNewLogic') as FormGroup).getRawValue(), this.progressService.dataProgressPlanPoc2.value).subscribe(() => {
            return resolve(true);
          }, error => {
            console.log(error)
            return reject();
          });
        }, error => {
          console.log(error)
          return reject();
        });
      }
      else {
        return resolve(true);
      }
    });

    let saveOutStanding = new Promise((resolve, reject) => {
      if (formGroup.get('outstandingForm')) {
        // this.progressService.getOutStandingData.subscribe((res) => {
        if (!this.progressService.outStandingData.value) {
          return resolve(true);
        } else if (Array.isArray(this.progressService.outStandingData.value) && this.progressService.outStandingData.value.length == 0) {
          return resolve(true);
        }
        // if (!this.progressService.outStandingData.value) {
        //   return resolve(true);
        // }
        this.progressService.CreateOutstandingModel(this.progressService.outStandingData.value).subscribe((response) => {
          return resolve(true);
        }, error => {
          console.log(error)
          return reject();
        });
        // });
        // this.progressService.CreateOutstandingForm(formGroup.get('outstandingForm').value).subscribe((res) => {
        //   return resolve(true);
        // }, error => {
        //   console.log(error)
        //   return reject();
        // });
      }
      else {
        return resolve(true);
      }
    });

    let saveBscForm = new Promise((resolve, reject) => {
      if (formGroup.get('bscNarrativeForm')) {
        // if (Array.isArray(this.progressService.bscData.value) && this.progressService.bscData.value.length == 0) {
        //   return resolve(true);
        // }
        if (!this.progressService.bscData.value) {
          return resolve(true);
        } else if (Array.isArray(this.progressService.bscData.value) && this.progressService.bscData.value.length == 0) {
          return resolve(true);
        }
        this.progressService.CreateAllBscNarrative(this.progressService.bscData.value).then((res) => {
          return resolve(true);
        }, error => {
          console.log(error)
          return reject();
        });
      }
      else {
        return resolve(true);
      }
    });

    //saveLessonLearn
    // let saveLessonLern = new Promise((resolve, rejects) => {
    //   if (this.lessonLearnTableDataService.DATA.value) {
    //     this.lessonLearnService.CreateLessonLearn().subscribe((res) => {
    //       return resolve(true);
    //     }, error => {
    //       return rejects();
    //     });
    //   } else {
    //     return resolve(true);
    //   }
    // });

    let saveBestPractice = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (formGroup.get("bestPracticeForm")) {
        if (bestPracticeId == 0) {
          console.log("saveBestPractice in");
          //update draft
          this.bestpracticeService.inserBestPractice((formGroup.get("bestPracticeForm") as FormGroup).getRawValue()).subscribe((createBestPracticeResponse) => {
            formGroup.get("bestPracticeForm").get("id").setValue(createBestPracticeResponse.id);
            return resolve(true);
          },
            (error) => {
              console.log("saveBestPractice error", error);
              return reject();
            }
          );
        } else {
          console.log("saveBestPractice update");
          this.bestpracticeService.updateBestPractice((formGroup.get("bestPracticeForm") as FormGroup).getRawValue()).subscribe((updateBestPracticeResponse) => {
            return resolve(true);
          },
            (error) => {
              console.log("saveBestPractice error", error);
              return reject();
            }
          );
          return resolve(true);
        }
      } else {
        return resolve(true);
      }
    });

    console.log(saveGeneral);
    console.log(saveEMoc);
    console.log(saveCoDev);
    console.log(saveDetail);
    console.log(saveCapex);
    console.log(saveImpact);
    console.log(saveMileStone);
    console.log(saveProgressForm);
    console.log(saveOutStanding);
    console.log(saveBscForm);
    console.log(saveGate1Form);
    console.log(saveGate3Form);
    // console.log(saveLessonLern);
    console.log(saveBestPractice);

    Promise.all([
      saveGeneral,
      saveEMoc,
      saveCoDev,
      saveDetail,
      saveCapex,
      saveImpact,
      // saveDetailPim,
      saveMileStone,
      saveProgressForm,
      saveOutStanding,
      saveBscForm,
      saveGate1Form,
      saveGate2Form,
      saveGate3Form,
      // saveLessonLern,
      saveBestPractice
    ]).then(async (values) => {
      if (type === 'submit') {
        if (this.initiativeService.wbsNo
          && (formGroup.get("sapStatus").value == null
          || (formGroup.get("sapStatus").value
          && formGroup.get("sapStatus").value != "TECO"
          && formGroup.get("sapStatus").value != "Closed"))) {
          await this.initiativeService.RealtimeInterface(this.initiativeService.id).then(() => {
            this.submitService.SubmitStageStatus(this.initiativeService.id, (formGroup.get('submitToForm') as FormGroup).getRawValue()).subscribe(async () => {
              await this.initiativeService.PutUpdateByUser(this.initiativeService.id);
              await this.auditService.CallAuditLog(this.initiativeService.id, historyId);
              this.initiativeService.SubmitDone = true;
              this.initiativeService.SavingData = false;
              this.swalTool.SubmitWithSAP();
              if (this.initiativeService.directionButton) {
                window.close();
              }
            }, error => {
              this.initiativeService.SavingData = false;
              this.swalTool.saveError();
            });
          }).catch((error) => {
            console.log('interface error ==', error);
            this.initiativeService.SavingData = false;
            this.swalTool.SAPError(error.error);
          });
        } else {
          this.submitService.SubmitStageStatus(this.initiativeService.id, (formGroup.get('submitToForm') as FormGroup).getRawValue()).subscribe(async () => {
            await this.initiativeService.PutUpdateByUser(this.initiativeService.id);
            await this.auditService.CallAuditLog(this.initiativeService.id, historyId);
            this.initiativeService.SubmitDone = true;
            this.initiativeService.SavingData = false;
            this.swalTool.Submit();
            if (this.initiativeService.directionButton) {
              window.close();
            }
          }, error => {
            this.initiativeService.SavingData = false;
            this.swalTool.saveError();
          });
        }
      } else if (type === 'approveEdit') {
        if (this.initiativeService.wbsNo
          && (formGroup.get("sapStatus").value == null
          || (formGroup.get("sapStatus").value
          && formGroup.get("sapStatus").value != "TECO"
          && formGroup.get("sapStatus").value != "Closed"))) {
          await this.initiativeService.RealtimeInterface(this.initiativeService.id).then(() => {
            this.submitService.CheckApprove(this.initiativeService.id, formGroup.get('approveForm').get('approver').value).subscribe(async result => {
              if (result) {
                this.initiativeService.PutUpdateByUser(this.initiativeService.id).then(async (response) => {
                  this.submitService.ActionSubmit(this.initiativeService.id, (formGroup.get('submitApproveForm') as FormGroup).getRawValue()).subscribe(async () => {
                    await this.auditService.CallAuditLog(this.initiativeService.id, historyId);
                    this.swalTool.SubmitWithSAP();
                    window.close();
                  }, error => {
                    this.initiativeService.SavingData = false;
                    this.swalTool.saveError();
                  });
                  // }
                });
              } else {
                Swal.fire({
                  title: 'This initiative was retreated for revision!',
                  html: 'Please refresh your My Tasks and approve this initiative later.',
                  icon: 'error',
                  showCancelButton: false,
                  confirmButtonText: 'Ok',
                }).then((res) => {
                  if (res.value) {
                    if (this.initiativeService.directionButton) {
                      window.close();
                    } else {
                      this.router.navigate(['/initiative/my-tasks']);
                    }
                  }
                });
              }
            });
          }).catch((error) => {
            console.log('interface error ==', error);
            this.initiativeService.SavingData = false;
            this.swalTool.SAPError(error.error);
          });
        } else {
          this.submitService.CheckApprove(this.initiativeService.id, formGroup.get('approveForm').get('approver').value).subscribe(async result => {
            if (result) {
              this.initiativeService.PutUpdateByUser(this.initiativeService.id).then(async (response) => {
                this.submitService.ActionSubmit(this.initiativeService.id, (formGroup.get('submitApproveForm') as FormGroup).getRawValue()).subscribe(async () => {
                  await this.auditService.CallAuditLog(this.initiativeService.id, historyId);
                  this.swalTool.Approved();
                  window.close();
                }, error => {
                  this.initiativeService.SavingData = false;
                  this.swalTool.saveError();
                });
              });
            } else {
              Swal.fire({
                title: 'This initiative was retreated for revision!',
                html: 'Please refresh your My Tasks and approve this initiative later.',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'Ok',
              }).then((res) => {
                if (res.value) {
                  if (this.initiativeService.directionButton) {
                    window.close();
                  } else {
                    this.router.navigate(['/initiative/my-tasks']);
                  }
                }
              });
            }
          });
        }
      } else if (type == "cancel" || type == "backward") {
        this.submitService.SubmitStageStatus(this.initiativeService.id, (formGroup.get('submitToForm') as FormGroup).getRawValue()).subscribe(async () => {
          await this.initiativeService.PutUpdateByUser(this.initiativeService.id);
          await this.auditService.CallAuditLog(this.initiativeService.id, historyId);
          this.initiativeService.SubmitDone = true;
          this.initiativeService.SavingData = false;
          this.swalTool.Submit();
          if (this.initiativeService.directionButton) {
            window.close();
          }
        }, error => {
          this.initiativeService.SavingData = false;
          this.swalTool.saveError();
        });
      } else {
        await this.initiativeService.PutUpdateByUser(this.initiativeService.id);
        await this.auditService.CallAuditLog(this.initiativeService.id, historyId);
        if (this.initiativeService.wbsNo
          && (formGroup.get("sapStatus").value == null
          || (formGroup.get("sapStatus").value
          && formGroup.get("sapStatus").value != "TECO"
          && formGroup.get("sapStatus").value != "Closed"))) {
          await this.initiativeService.RealtimeInterface(this.initiativeService.id).then(() => {
            this.initiativeService.SavingData = false;
            this.swalTool.DraftWithSAP();
          }).catch((error) => {
            console.log('interface error ==', error);
            this.initiativeService.SavingData = false;
            this.swalTool.SAPError(error.error);
          });
        } else {
          this.initiativeService.SavingData = false;
          this.swalTool.Draft();
        }
      }
    }).catch((error) => {
      this.initiativeService.SavingData = false;
      this.swalTool.Error(error.error);
    });
  }

  mergeDetail(formGroup: FormGroup) {
    // let detail: DetailInformation = formGroup.get('DetailMaxForm').value;
    let DetailMaxForm = formGroup.get('DetailMaxForm') as FormGroup;
    let detail: DetailInformation = DetailMaxForm.getRawValue();
    //     detailInfomation = DetailForm.getRawValue();
    let DetailPIMForm = formGroup.get('detailPimForm') as FormGroup;
    let detailPim: DetailInformation = DetailPIMForm.getRawValue();
    // let detailPim: DetailInformation = formGroup.get('detailPimForm').value;
    detail.kickoffMeeting = detailPim.kickoffMeeting;
    detail.gate1Date = detailPim.gate1Date;
    detail.gate2Date = detailPim.gate2Date;
    detail.gate3Date = detailPim.gate3Date;

    //simple
    detail.simProjectSkipGate2 = detailPim.simProjectSkipGate2;

    // emoc
    detail.isImpactProduction = detailPim.isImpactProduction;


    detail.projectDocumentDatabase = detailPim.projectDocumentDatabase;


    detail.projectDirector = detailPim.projectDirector;
    detail.projectEngineer = detailPim.projectEngineer;
    detail.processEngineer = detailPim.processEngineer;
    detail.divMgrOfProcessEngineer = detailPim.divMgrOfProcessEngineer;


    detail.smes = detailPim.smes;
    detail.sponsorEvp = detailPim.sponsorEvp;
    return detail;
  }



  GetInitiativeTypeMax() {
    return this.http.get(this.baseUrl + 'InitiativeTypeMax');
  }

  GetSubWorkstream(workstreamName) {
    return this.http.get(this.baseUrl + 'SubWorkstream/' + workstreamName);
  }

  GetSubWorkstream1(workstreamName) {
    return this.http.get(this.baseUrl + 'SubWorkstream/one/' + workstreamName);
  }

  GetMaxApprover(workstreamName) {
    return this.http.post(this.baseUrl + 'MaxApprover/Workstream', workstreamName);
  }

  GetMaxApproverSubWorkstream(SubWorkstreamName) {
    return this.http.post(this.baseUrl + 'MaxApprover/SubWorkstream', SubWorkstreamName);
  }

  GetNameMaxApprover(Email): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Owner/NameMaxApprover', { Email });
  }

  GetSubWorkstreamAll() {
    return this.http.get(this.baseUrl + 'SubWorkstream');
  }

  GetWorkstreamLead(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'MaxApprover/WorkstreamLead/' + id);
  }

  CreateWorkstreamLead(id, form) {
    if (form == null) {
      form = [];
    } else {
      if (!Array.isArray(form) && form.toString().length <= 0) {
        form = [];
      }
    }
    return this.http.post(this.baseUrl + 'MaxApprover/WorkstreamLead/' + id, form);
  }

  CreateSponsor(id, form) {
    if (form == null) {
      form = [];
    } else {
      if (!Array.isArray(form) && form.toString().length <= 0) {
        form = [];
      }
    }
    return this.http.post(this.baseUrl + 'MaxApprover/Sponsor/' + id, form);
  }

  CreateFinance(id, form) {
    if (form == null) {
      form = [];
    } else {
      if (!Array.isArray(form) && form.toString().length <= 0) {
        form = [];
      }
    }
    return this.http.post(this.baseUrl + 'MaxApprover/Finance/' + id, form);
  }

  CreateCFO(id, form) {
    if (form == null) {
      form = [];
    } else {
      if (!Array.isArray(form) && form.toString().length <= 0) {
        form = [];
      }
    }
    return this.http.post(this.baseUrl + 'MaxApprover/CFO/' + id, form);
  }

  CreateCTO(id, form) {
    if (form == null) {
      form = [];
    } else {
      if (!Array.isArray(form) && form.toString().length <= 0) {
        form = [];
      }
    }
    return this.http.post(this.baseUrl + 'MaxApprover/CTO/' + id, form);
  }

  CreateTOTeam(id, form) {
    if (form == null) {
      form = [];
    } else {
      if (!Array.isArray(form) && form.toString().length <= 0) {
        form = [];
      }
    }
    return this.http.post(this.baseUrl + 'MaxApprover/TOTeam/' + id, form);
  }

  CreateTfBtTO(id, form) {
    if (form == null) {
      form = [];
    } else {
      if (!Array.isArray(form) && form.toString().length <= 0) {
        form = [];
      }
    }
    return this.http.post(this.baseUrl + 'MaxApprover/TfBtTO/' + id, form);
  }

  CreateTOFinanceIL4(id, form) {
    if (form == null) {
      form = [];
    } else {
      if (!Array.isArray(form) && form.toString().length <= 0) {
        form = [];
      }
    }
    return this.http.post(this.baseUrl + 'MaxApprover/TOFinanceIL4/' + id, form);
  }

  CreateTOFinanceIL5(id, form) {
    if (form == null) {
      form = [];
    } else {
      if (!Array.isArray(form) && form.toString().length <= 0) {
        form = [];
      }
    }
    return this.http.post(this.baseUrl + 'MaxApprover/TOFinanceIL5/' + id, form);
  }

  CreateFinanceExpert(id, form) {
    if (form == null) {
      form = [];
    } else {
      if (!Array.isArray(form) && form.toString().length <= 0) {
        form = [];
      }
    }
    return this.http.post(this.baseUrl + 'MaxApprover/FinanceExpert/' + id, form);
  }

  GetValueChain() {
    return this.http.get(this.baseUrl + 'CommonData/GetValueChain');
  }

  GetProjectCategory() {
    return this.http.get(this.baseUrl + 'CommonData/GetProjectCategory');
  }

  GetMaxApproverSubWorkstreamNewLogic(SubWorkstreamName): Observable<MaxApprover[]> {
    return this.http.post<MaxApprover[]>(this.baseUrl + 'MaxApprover/SubWorkstreamNewLogic', SubWorkstreamName);
  }

  convertMaxApproval(form: string[]) {
    let returnValue: {
      email: string;
      order: number;
    }[] = [];

    form.forEach(item => {
      let splite = item.split("&&");
      returnValue.push({
        email: splite[0],
        order: Number(splite[1])
      });
    });

    return returnValue;
  }
}
