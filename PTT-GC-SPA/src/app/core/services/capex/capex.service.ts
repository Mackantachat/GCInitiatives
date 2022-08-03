import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { CapexMonthly, Capexs, ReturnDetail } from '@models/Capexs';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { SwalTool } from '@tools/swal.tools';
import { ProgressService } from '@services/progress/progress.service';
import { SubmitService } from '@services/submit/submit.service';
import { AuditService } from '@services/audit/audit.service';
import { LessonLearnTableDataService } from '@services/lesson-learn-table-data/lesson-learn-table-data.service';
import { LessonLearnApiService } from '@services/lesson-learn-api/lesson-learn-api.service';
import { BestPracticeService } from '@services/best-practice/best-practice.service';
import { DetailInformation } from '@models/detailInformation';
import { Initiative } from '@models/initiative';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PimGate } from '@models/pimGate';
import { MainPlant } from '@models/MainPlant';


@Injectable({
  providedIn: 'root'
})
export class CapexService {

  baseUrl = environment.apiUrl;
  dataBody: any[];
  revistionData: number;
  viceOwner: string;
  /////// ============ mockup AnnualInvestmentPlanId  ========== /////
  annualInvestmentPlanId: string;


  //BehaviorSubject
  capexData = new BehaviorSubject(null);
  returnDetail = new BehaviorSubject(null);
  managerDetail = new BehaviorSubject(null);
  monthlyDetail = new BehaviorSubject(null);

  requestIniNoDate = new BehaviorSubject(null);
  finishDate = new BehaviorSubject(null);

  //
  gate2Data = new BehaviorSubject(null);

  //get function
  getCapexData = this.capexData.asObservable();
  getReturnDetail = this.returnDetail.asObservable();
  getManagerDetail = this.managerDetail.asObservable();
  getMonthlyDetail = this.monthlyDetail.asObservable();

  getRequestIniNoDate = this.requestIniNoDate.asObservable();
  getFinishDate = this.finishDate.asObservable();
  getGate2Data = this.gate2Data.asObservable();

  constructor(
    private http: HttpClient,
    private initiativeService: InitiativeService,
    private detailinformationService: DetailInformationService,
    private swalTool: SwalTool,
    private submitService: SubmitService,
    private auditService: AuditService,
    private progressService: ProgressService,
    private lessonLearnService: LessonLearnApiService,
    private lessonLearnTableDataService: LessonLearnTableDataService,
    private bestpracticeService: BestPracticeService,
    private router: Router
  ) {
    this.dataBody = [];
    this.viceOwner = null;
    /////// ============ mockup AnnualInvestmentPlanId  ========== /////
    this.annualInvestmentPlanId = '1111';
  }

  //set function
  changeCapexData(data: Capexs) {
    this.capexData.next(data);
  }

  changeRequestIniNoDate(data: Date) {
    this.requestIniNoDate.next(data);
  }
  changeFinishDate(data: Date) {
    this.finishDate.next(data);
  }

  changeReturnDetail(returnChange: ReturnDetail) {
    this.returnDetail.next(returnChange);
  }

  changeManagerDetail(managerChange: any) {
    this.managerDetail.next(managerChange);
  }
  changeMonthlyDetail(monthlyChange: CapexMonthly[]) {
    this.monthlyDetail.next(monthlyChange);
  }


  setGate2Data(data: PimGate) {
    this.gate2Data.next(data);
  }

  // search VP
  setViceOwner(formGroup: FormGroup, value: string) {
    if (formGroup.get('capexInformationForm')) {
      if (value) {

        this.GetCodeOfCostCenterVP(value).subscribe((response) => {
          if (response.length != 0) {
            formGroup.get('capexInformationForm').get('codeCostCenterOfVP').setValue(response[0].mainPositionCostCenter);
            formGroup.get('capexInformationForm').get('costCenterOfVP').setValue(value);
          }
        });
      } else {
        formGroup.get('capexInformationForm').get('codeCostCenterOfVP').setValue('');
        formGroup.get('capexInformationForm').get('costCenterOfVP').setValue('');
      }
    }
  }

  // =================================  new method ========================================
  SaveDraftSubmit(formGroup: FormGroup, type: string, historyId) {
    this.initiativeService.SavingData = true;
    this.swalTool.savingLoading(type);
    let detailMaxId = formGroup.get('DetailMaxForm') ? formGroup.get('DetailMaxForm').get('id').value : null;
    let capexInformationId = formGroup.get('capexInformationForm') ? formGroup.get('capexInformationForm').get('capexInformationId').value : null;
    let progressArray = formGroup.get('progressForm') ? formGroup.get('progressForm').get('details') as FormArray : null;
    let bestPracticeId = formGroup.get("bestPracticeForm") ? formGroup.get("bestPracticeForm").get("id").value : null;

    //update general
    let saveGeneral = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (type === 'submit') {
        this.initiativeService.UpdateSubmitInitiative(this.initiativeService.id, (formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe((response) => {
          return resolve(true);
        }, error => {
          return reject();
        });
      } else {
        this.initiativeService.UpdateDraftInitiative(this.initiativeService.id, (formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe((response) => {
          return resolve(true);
        }, error => {
          return reject();
        });
      }
    });

    let saveCoDev = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      const generalData: Initiative = (formGroup.get('initiativesForm') as FormGroup).getRawValue();
      this.initiativeService.UpdateCoDeveloper(this.initiativeService.id, generalData.coDeveloper).subscribe(() => {
        resolve(true);
      }, error => {
        console.log('create CoDev', error);
        return reject();
      });
    })

    let saveDetail = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (detailMaxId === 0) {
        //case include pim detail tab
        let detailInfomation: DetailInformation = {} as DetailInformation;
        if (formGroup.get('detailPimForm')) {
          detailInfomation = this.initiativeService.mergeDetail(formGroup);
        } else {
          // detailInfomation = formGroup.get('DetailMaxForm').value;
          let DetailForm = formGroup.get('DetailMaxForm') as FormGroup;
          detailInfomation = DetailForm.getRawValue();
        }
        //create draft
        this.detailinformationService.CreateDetailInformation(this.initiativeService.id, detailInfomation).subscribe((createDetailInformationResponse) => {
          if (createDetailInformationResponse) {
            formGroup.get('DetailMaxForm').get('id').setValue(createDetailInformationResponse.id);
            if (formGroup.get('DetailMaxForm').get('workstreamLead') && formGroup.get('DetailMaxForm').get('workstreamLead').value) { this.CreateWorkstreamLead(this.initiativeService.id, { email: formGroup.get('DetailMaxForm').get('workstreamLead').value }).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('sponsorEvp') && formGroup.get('DetailMaxForm').get('sponsorEvp').value) { this.CreateSponsor(this.initiativeService.id, formGroup.get('DetailMaxForm').get('sponsorEvp').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('toFinance') && formGroup.get('DetailMaxForm').get('toFinance').value) { this.CreateFinance(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinance').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('cfo') && formGroup.get('DetailMaxForm').get('cfo').value) { this.CreateCFO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('cfo').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('cto') && formGroup.get('DetailMaxForm').get('cto').value) { this.CreateCTO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('cto').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('tot') && formGroup.get('DetailMaxForm').get('tot').value) { this.CreateTOTeam(this.initiativeService.id, formGroup.get('DetailMaxForm').get('tot').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('tfb') && formGroup.get('DetailMaxForm').get('tfb').value) { this.CreateTfBtTO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('tfb').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('toFinanceIL4') && formGroup.get('DetailMaxForm').get('toFinanceIL4').value) { this.CreateTOFinanceIL4(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinanceIL4').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('toFinanceIL5') && formGroup.get('DetailMaxForm').get('toFinanceIL5').value) { this.CreateTOFinanceIL5(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinanceIL5').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('kpisForm') && formGroup.get('DetailMaxForm').get('kpisForm').value) { this.detailinformationService.CreateKpi(this.initiativeService.id, formGroup.get('DetailMaxForm').get('kpisForm').value).subscribe(() => { }); }
            return resolve(true);
          }
        }, error => {
          console.log('create detail error', error);
          return reject();
        });
      } else if (detailMaxId > 0) {
        let detailInfomation: DetailInformation = {} as DetailInformation;
        if (formGroup.get('detailPimForm')) {
          detailInfomation = this.initiativeService.mergeDetail(formGroup);
        } else {
          // detailInfomation = formGroup.get('DetailMaxForm').value;
          let DetailForm = formGroup.get('DetailMaxForm') as FormGroup;
          detailInfomation = DetailForm.getRawValue();
        }
        //update draft
        this.detailinformationService.UpdateDetailInformation(this.initiativeService.id, detailInfomation).subscribe((updateDetailInformationResponse) => {
          if (updateDetailInformationResponse) {
            if (formGroup.get('DetailMaxForm').get('workstreamLead') && formGroup.get('DetailMaxForm').get('workstreamLead').value) { this.CreateWorkstreamLead(this.initiativeService.id, { email: formGroup.get('DetailMaxForm').get('workstreamLead').value }).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('sponsorEvp') && formGroup.get('DetailMaxForm').get('sponsorEvp').value) { this.CreateSponsor(this.initiativeService.id, formGroup.get('DetailMaxForm').get('sponsorEvp').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('toFinance') && formGroup.get('DetailMaxForm').get('toFinance').value) { this.CreateFinance(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinance').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('cfo') && formGroup.get('DetailMaxForm').get('cfo').value) { this.CreateCFO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('cfo').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('cto') && formGroup.get('DetailMaxForm').get('cto').value) { this.CreateCTO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('cto').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('tot') && formGroup.get('DetailMaxForm').get('tot').value) { this.CreateTOTeam(this.initiativeService.id, formGroup.get('DetailMaxForm').get('tot').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('tfb') && formGroup.get('DetailMaxForm').get('tfb').value) { this.CreateTfBtTO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('tfb').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('toFinanceIL4') && formGroup.get('DetailMaxForm').get('toFinanceIL4').value) { this.CreateTOFinanceIL4(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinanceIL4').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('toFinanceIL5') && formGroup.get('DetailMaxForm').get('toFinanceIL5').value) { this.CreateTOFinanceIL5(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinanceIL5').value).subscribe(() => { }); }
            if (formGroup.get('DetailMaxForm').get('kpisForm') && formGroup.get('DetailMaxForm').get('kpisForm').value) { this.detailinformationService.CreateKpi(this.initiativeService.id, formGroup.get('DetailMaxForm').get('kpisForm').value).subscribe(() => { }); }
            return resolve(true);
          }
        }, error => {
          console.log('update detail error', error);
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
      if (capexInformationId === 0) {
        // create capex information
        this.CreateCapexsInfoNewEngine(formGroup.get('capexInformationForm') as FormGroup).then((createResponse) => {
          if (createResponse) {
            formGroup.get('capexInformationForm').get('capexInformationId').setValue(createResponse.capexInformationId);
            if (formGroup.get('capexInformationForm').get('AnnualForm')) {
              this.CreateAnnualInvestmentPlanNewEngine(this.initiativeService.id, formGroup.get('capexInformationForm').get('AnnualForm'), createResponse.capexInformationId, 'submit', 'Createnew').then((createAnnualResponse) => {
                if (createAnnualResponse) {
                  this.CreateMonthlyInvestmentPlanNewEngine(this.annualInvestmentPlanId, formGroup.get('capexInformationForm') as FormGroup).then((createMonthlyInvestmentPlan) => {
                    return resolve(true);
                  }).catch((monthInvesError) => {
                    console.log(monthInvesError);
                    return reject();
                  })
                }
              }).catch((annualError) => {
                console.log(annualError);
                return reject();
              });
            } else {
              return resolve(true);
            }
          }
        }).catch((error) => {
          console.log(error);
          return reject();
        });
      } else if (capexInformationId > 0) {

        this.UpdateCapexsInfoNewEngine(formGroup.get('capexInformationForm') as FormGroup).then((updateCapexResponse) => {
          if (updateCapexResponse) {
            if (formGroup.get('capexInformationForm').get('AnnualForm')) {
              this.CreateAnnualInvestmentPlanNewEngine(this.initiativeService.id, formGroup.get('capexInformationForm').get('AnnualForm'), updateCapexResponse.capexInformationId, 'submit', 'Createnew').then((createAnnualResponse) => {
                if (createAnnualResponse) {
                  this.CreateMonthlyInvestmentPlanNewEngine(this.annualInvestmentPlanId, formGroup.get('capexInformationForm') as FormGroup).then((createMonthlyInvestmentPlan) => {
                    return resolve(true);
                  }).catch((monthInvesError) => {
                    console.log(monthInvesError);
                    return reject();
                  })
                }
              }).catch((annualError) => {
                console.log(annualError);
                return reject();
              });
            } else {
              return resolve(true);
            }
          }
        }).catch((error) => {
          console.log(error);
          return reject();
        });
      } else {
        return resolve(true);
      }
    });

    let saveProgressForm = new Promise((resolve, reject) => {
      // if (type === 'update' && formGroup.get('progressForm')) {
      //   if (!this.progressService.costSpendingData.value) {
      //     return resolve(true);
      //   } else if (Array.isArray(this.progressService.costSpendingData.value) && this.progressService.costSpendingData.value.length == 0) {
      //     return resolve(true);
      //   } else {
      //     this.progressService.CreateCostSpending(this.initiativeService.id, this.progressService.costSpendingData.value).then((createCostRes) => {
      //       return resolve(true);
      //     });
      //   }
      // } else
      if (formGroup.get('progressForm')) {
        //   console.log('progress in capex')
        this.progressService.CreateProgress(this.initiativeService.id, (formGroup.get('progressForm') as FormGroup).getRawValue()).subscribe((res) => {
          if (!this.progressService.costSpendingData.value) {
            return resolve(true);
          } else if (Array.isArray(this.progressService.costSpendingData.value) && this.progressService.costSpendingData.value.length == 0) {
            return resolve(true);
          } else {
            this.progressService.CreateCostSpending(this.initiativeService.id, this.progressService.costSpendingData.value).then((createCostRes) => {
              return resolve(true);
            });
          }
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
         this.createMainPlant((detailPimForm.get('eMocs') as FormArray).getRawValue()).subscribe((res) => {
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
        //console.log(this.progressService.dataProgressPlanPoc1.value)
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

    console.log('saveCapex', saveEMoc);

    Promise.all([
      saveGeneral,
      saveDetail,
      saveCapex,
      saveProgressForm,
      saveEMoc,
      saveMileStone,
      saveOutStanding,
      saveBscForm,
      saveCoDev,
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

  //merge PIMDEtail
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



  ///  function for new structure

  async CreateCapexsInfoNewEngine(capexForm: FormGroup) {
    let poolId: number;
    let availableBudgetPool: string;
    poolId = capexForm.get('poolID').value;
    availableBudgetPool = capexForm.get('availableBudget').value;
    capexForm.addControl("createBy",new FormControl(this.initiativeService.username));
    let data = this.convertTime(capexForm.value);
    //Temporary First Addmore
    let AddmoreStatus = capexForm.get('firstAddmoreStatus')?.value ? capexForm.get('firstAddmoreStatus')?.value : "null";


    //////////////////////
    return (await this.http.post<Capexs>(this.baseUrl + 'CapexsInformations/' + this.initiativeService.id + '/' + poolId + '/' + availableBudgetPool + '/' + AddmoreStatus, data).toPromise());
  }

  async UpdateCapexsInfoNewEngine(capexForm: FormGroup) {
    let capexId: number;
    let poolId: number;
    let availableBudgetPool: string;
    let manager: string;
    let projectManager: string;
    let data = this.convertTime(capexForm.getRawValue());

    //Temporary First Addmore
    let AddmoreStatus = capexForm.get('firstAddmoreStatus')?.value ? capexForm.get('firstAddmoreStatus')?.value : "null";
    //////////////////////
    return (await this.http.put<Capexs>(this.baseUrl + 'CapexsInformations/UpdateCapexsinformations/' + this.initiativeService.id + '/' + AddmoreStatus, data).toPromise());
  }

  //comvert time
  convertTime(formData: any) {
    let returnData: any = formData;
    let field = ['startingDate', 'projecctComRun', 'requestIniNoDate', 'actionYear'];
    field.forEach((fData) => {
      if (formData[fData] && formData[fData] != null) {
        formData[fData] = new Date(formData[fData]);
        returnData[fData] = new Date(Date.UTC(
          formData[fData].getFullYear(),
          formData[fData].getMonth(),
          formData[fData].getDate(), 0, 0, 0));
      }
    });
    return returnData;
  }

  async CreateAnnualInvestmentPlanNewEngine(id, Annual, CapexInformationId, type, page) {

    // let data = [];

    const control = Annual.get('annualForm_list') as FormArray;


    const xx = +control.length;
    const x = [];

    let totalYear1 = 0;
    let totalYear2 = 0;
    let totalYear3 = 0;
    let totalYear4 = 0;
    let totalYear5 = 0;
    let totalYear6 = 0;
    let totalYear7 = 0;
    let totalYear8 = 0;
    let totalYear9 = 0;
    let totalYear10 = 0;
    let totalYearOverall = 0;

    for (let i = 0; i < xx; i++) {

      if (control.at(i).get('currencyFx').value === '' || control.at(i).get('currencyFx').value === null) {
        totalYear1 = totalYear1 + +control.at(i).get('y1').value;
        totalYear2 = totalYear2 + +control.at(i).get('y2').value;
        totalYear3 = totalYear3 + +control.at(i).get('y3').value;
        totalYear4 = totalYear4 + +control.at(i).get('y4').value;
        totalYear5 = totalYear5 + +control.at(i).get('y5').value;
        totalYear6 = totalYear6 + +control.at(i).get('y6').value;
        totalYear7 = totalYear7 + +control.at(i).get('y7').value;
        totalYear8 = totalYear8 + +control.at(i).get('y8').value;
        totalYear9 = totalYear9 + +control.at(i).get('y9').value;
        totalYear10 = totalYear10 + +control.at(i).get('y10').value;


      }
      else {
        totalYear1 = totalYear1 + (+control.at(i).get('y1').value * +control.at(i).get('currencyFx').value);
        totalYear2 = totalYear2 + (+control.at(i).get('y2').value * +control.at(i).get('currencyFx').value);
        totalYear3 = totalYear3 + (+control.at(i).get('y3').value * +control.at(i).get('currencyFx').value);
        totalYear4 = totalYear4 + (+control.at(i).get('y4').value * +control.at(i).get('currencyFx').value);
        totalYear5 = totalYear5 + (+control.at(i).get('y5').value * +control.at(i).get('currencyFx').value);
        totalYear6 = totalYear6 + (+control.at(i).get('y6').value * +control.at(i).get('currencyFx').value);
        totalYear7 = totalYear7 + (+control.at(i).get('y7').value * +control.at(i).get('currencyFx').value);
        totalYear8 = totalYear8 + (+control.at(i).get('y8').value * +control.at(i).get('currencyFx').value);
        totalYear9 = totalYear9 + (+control.at(i).get('y9').value * +control.at(i).get('currencyFx').value);
        totalYear10 = totalYear10 + (+control.at(i).get('y10').value * +control.at(i).get('currencyFx').value);

      }

      const body = {

        CapexInformationId: CapexInformationId,
        InitiativeId: id,
        Currency: control.at(i).get('currencyTitle').value,
        CurrencyFx: control.at(i).get('currencyFx').value,
        Year1: control.at(i).get('y1').value,
        Year2: control.at(i).get('y2').value,
        Year3: control.at(i).get('y3').value,
        Year4: control.at(i).get('y4').value,
        Year5: control.at(i).get('y5').value,
        Year6: control.at(i).get('y6').value,
        Year7: control.at(i).get('y7').value,
        Year8: control.at(i).get('y8').value,
        Year9: control.at(i).get('y9').value,
        Year10: control.at(i).get('y10').value,
        YearOverall: control.at(i).get('overall').value,
        PlanType: page,
        ActualSpendingThisYear: '0',
        FutureSpendingThisYear: '0',
        CarryBudget: '0'
      };

      x.push(body);

    }

    totalYearOverall = totalYearOverall + totalYear1 + totalYear2 + totalYear3 + totalYear4 + totalYear5 +
      totalYear6 + totalYear7 + totalYear8 + totalYear9 + totalYear10


    const body = {

      CapexInformationId: CapexInformationId,
      InitiativeId: id,
      Currency: '',
      CurrencyFx: '',
      Year1: totalYear1,
      Year2: totalYear2,
      Year3: totalYear3,
      Year4: totalYear4,
      Year5: totalYear5,
      Year6: totalYear6,
      Year7: totalYear7,
      Year8: totalYear8,
      Year9: totalYear9,
      Year10: totalYear10,
      YearOverall: totalYearOverall,
      PlanType: 'TotalBahtbyRevision',
      ActualSpendingThisYear: '0',
      FutureSpendingThisYear: '0',
      CarryBudget: '0'
    };

    x.push(body);

    if (type === 'submit') {
      const body = {

        CapexInformationId: CapexInformationId,
        InitiativeId: id,
        Currency: '',
        CurrencyFx: '',
        Year1: totalYear1,
        Year2: totalYear2,
        Year3: totalYear3,
        Year4: totalYear4,
        Year5: totalYear5,
        Year6: totalYear6,
        Year7: totalYear7,
        Year8: totalYear8,
        Year9: totalYear9,
        Year10: totalYear10,
        YearOverall: totalYearOverall,
        PlanType: 'SumTotalBaht',
        ActualSpendingThisYear: '0',
        FutureSpendingThisYear: '0',
        CarryBudget: '0'
      };

      x.push(body);
    }


    const data = {
      AnnualInvestmentPlanTableDtos: x
    };

    return (await this.http.post(this.baseUrl + 'CapexsInformations/CreateAnnualInvestmentPlan/' +
      id + '/' + CapexInformationId, data).toPromise());
  }

  async CreateMonthlyInvestmentPlanNewEngine(AnnualInvestmentPlanId, capexForm: FormGroup) {
    console.log('capexForm create>>>>', capexForm)
    let CapexInformationId = capexForm.get('capexInformationId').value;

    let year = capexForm.get('year_m').value;
    let f1 = capexForm.get('monthForm0') ? capexForm.get('monthForm0').get('monthForm_list') as FormArray : null;
    let f2 = capexForm.get('monthForm1') ? capexForm.get('monthForm1').get('monthForm_list') as FormArray : null;
    let f3 = capexForm.get('monthForm2') ? capexForm.get('monthForm2').get('monthForm_list') as FormArray : null;
    let f4 = capexForm.get('monthForm3') ? capexForm.get('monthForm3').get('monthForm_list') as FormArray : null;
    let f5 = capexForm.get('monthForm4') ? capexForm.get('monthForm4').get('monthForm_list') as FormArray : null;
    let f6 = capexForm.get('monthForm5') ? capexForm.get('monthForm5').get('monthForm_list') as FormArray : null;
    let f7 = capexForm.get('monthForm6') ? capexForm.get('monthForm6').get('monthForm_list') as FormArray : null;
    let f8 = capexForm.get('monthForm7') ? capexForm.get('monthForm7').get('monthForm_list') as FormArray : null;
    let f9 = capexForm.get('monthForm8') ? capexForm.get('monthForm8').get('monthForm_list') as FormArray : null;
    let f10 = capexForm.get('monthForm9') ? capexForm.get('monthForm9').get('monthForm_list') as FormArray : null;

    const x = [];

    for (let i = 0; i < year.length; i++) {
      if (i === 0) {
        console.log('f1', f1)
        const xx = +f1.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f1.at(j).get('currencyTitle').value,
            InvestmentCostFx: f1.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f1.at(j).get('m1').value,
            Feb: f1.at(j).get('m2').value,
            Mar: f1.at(j).get('m3').value,
            Apr: f1.at(j).get('m4').value,
            May: f1.at(j).get('m5').value,
            Jun: f1.at(j).get('m6').value,
            Jul: f1.at(j).get('m7').value,
            Aug: f1.at(j).get('m8').value,
            Sep: f1.at(j).get('m9').value,
            Oct: f1.at(j).get('m10').value,
            Nov: f1.at(j).get('m11').value,
            Dec: f1.at(j).get('m12').value,
            MonthlyOverall: f1.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId
          };
          x.push(body);
        }
      } else if (i === 1) {
        const xx = +f2.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f2.at(j).get('currencyTitle').value,
            InvestmentCostFx: f2.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f2.at(j).get('m1').value,
            Feb: f2.at(j).get('m2').value,
            Mar: f2.at(j).get('m3').value,
            Apr: f2.at(j).get('m4').value,
            May: f2.at(j).get('m5').value,
            Jun: f2.at(j).get('m6').value,
            Jul: f2.at(j).get('m7').value,
            Aug: f2.at(j).get('m8').value,
            Sep: f2.at(j).get('m9').value,
            Oct: f2.at(j).get('m10').value,
            Nov: f2.at(j).get('m11').value,
            Dec: f2.at(j).get('m12').value,
            MonthlyOverall: f2.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 2) {
        const xx = +f3.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f3.at(j).get('currencyTitle').value,
            InvestmentCostFx: f3.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f3.at(j).get('m1').value,
            Feb: f3.at(j).get('m2').value,
            Mar: f3.at(j).get('m3').value,
            Apr: f3.at(j).get('m4').value,
            May: f3.at(j).get('m5').value,
            Jun: f3.at(j).get('m6').value,
            Jul: f3.at(j).get('m7').value,
            Aug: f3.at(j).get('m8').value,
            Sep: f3.at(j).get('m9').value,
            Oct: f3.at(j).get('m10').value,
            Nov: f3.at(j).get('m11').value,
            Dec: f3.at(j).get('m12').value,
            MonthlyOverall: f3.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 3) {
        const xx = +f4.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f4.at(j).get('currencyTitle').value,
            InvestmentCostFx: f4.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f4.at(j).get('m1').value,
            Feb: f4.at(j).get('m2').value,
            Mar: f4.at(j).get('m3').value,
            Apr: f4.at(j).get('m4').value,
            May: f4.at(j).get('m5').value,
            Jun: f4.at(j).get('m6').value,
            Jul: f4.at(j).get('m7').value,
            Aug: f4.at(j).get('m8').value,
            Sep: f4.at(j).get('m9').value,
            Oct: f4.at(j).get('m10').value,
            Nov: f4.at(j).get('m11').value,
            Dec: f4.at(j).get('m12').value,
            MonthlyOverall: f4.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 4) {
        const xx = +f5.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f5.at(j).get('currencyTitle').value,
            InvestmentCostFx: f5.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f5.at(j).get('m1').value,
            Feb: f5.at(j).get('m2').value,
            Mar: f5.at(j).get('m3').value,
            Apr: f5.at(j).get('m4').value,
            May: f5.at(j).get('m5').value,
            Jun: f5.at(j).get('m6').value,
            Jul: f5.at(j).get('m7').value,
            Aug: f5.at(j).get('m8').value,
            Sep: f5.at(j).get('m9').value,
            Oct: f5.at(j).get('m10').value,
            Nov: f5.at(j).get('m11').value,
            Dec: f5.at(j).get('m12').value,
            MonthlyOverall: f5.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 5) {
        const xx = +f6.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f6.at(j).get('currencyTitle').value,
            InvestmentCostFx: f6.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f6.at(j).get('m1').value,
            Feb: f6.at(j).get('m2').value,
            Mar: f6.at(j).get('m3').value,
            Apr: f6.at(j).get('m4').value,
            May: f6.at(j).get('m5').value,
            Jun: f6.at(j).get('m6').value,
            Jul: f6.at(j).get('m7').value,
            Aug: f6.at(j).get('m8').value,
            Sep: f6.at(j).get('m9').value,
            Oct: f6.at(j).get('m10').value,
            Nov: f6.at(j).get('m11').value,
            Dec: f6.at(j).get('m12').value,
            MonthlyOverall: f6.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 6) {
        const xx = +f7.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f7.at(j).get('currencyTitle').value,
            InvestmentCostFx: f7.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f7.at(j).get('m1').value,
            Feb: f7.at(j).get('m2').value,
            Mar: f7.at(j).get('m3').value,
            Apr: f7.at(j).get('m4').value,
            May: f7.at(j).get('m5').value,
            Jun: f7.at(j).get('m6').value,
            Jul: f7.at(j).get('m7').value,
            Aug: f7.at(j).get('m8').value,
            Sep: f7.at(j).get('m9').value,
            Oct: f7.at(j).get('m10').value,
            Nov: f7.at(j).get('m11').value,
            Dec: f7.at(j).get('m12').value,
            MonthlyOverall: f7.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 7) {
        const xx = +f8.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f8.at(j).get('currencyTitle').value,
            InvestmentCostFx: f8.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f8.at(j).get('m1').value,
            Feb: f8.at(j).get('m2').value,
            Mar: f8.at(j).get('m3').value,
            Apr: f8.at(j).get('m4').value,
            May: f8.at(j).get('m5').value,
            Jun: f8.at(j).get('m6').value,
            Jul: f8.at(j).get('m7').value,
            Aug: f8.at(j).get('m8').value,
            Sep: f8.at(j).get('m9').value,
            Oct: f8.at(j).get('m10').value,
            Nov: f8.at(j).get('m11').value,
            Dec: f8.at(j).get('m12').value,
            MonthlyOverall: f8.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 8) {
        const xx = +f9.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f9.at(j).get('currencyTitle').value,
            InvestmentCostFx: f9.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f9.at(j).get('m1').value,
            Feb: f9.at(j).get('m2').value,
            Mar: f9.at(j).get('m3').value,
            Apr: f9.at(j).get('m4').value,
            May: f9.at(j).get('m5').value,
            Jun: f9.at(j).get('m6').value,
            Jul: f9.at(j).get('m7').value,
            Aug: f9.at(j).get('m8').value,
            Sep: f9.at(j).get('m9').value,
            Oct: f9.at(j).get('m10').value,
            Nov: f9.at(j).get('m11').value,
            Dec: f9.at(j).get('m12').value,
            MonthlyOverall: f9.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 9) {
        const xx = +f10.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f10.at(j).get('currencyTitle').value,
            InvestmentCostFx: f10.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f10.at(j).get('m1').value,
            Feb: f10.at(j).get('m2').value,
            Mar: f10.at(j).get('m3').value,
            Apr: f10.at(j).get('m4').value,
            May: f10.at(j).get('m5').value,
            Jun: f10.at(j).get('m6').value,
            Jul: f10.at(j).get('m7').value,
            Aug: f10.at(j).get('m8').value,
            Sep: f10.at(j).get('m9').value,
            Oct: f10.at(j).get('m10').value,
            Nov: f10.at(j).get('m11').value,
            Dec: f10.at(j).get('m12').value,
            MonthlyOverall: f10.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      }
    }

    const data = {
      MonthlyInvestmentPlanTableDtos: x
    };

    console.log('data >>>>', data)



    return (await this.http.post(this.baseUrl + 'CapexsInformations/CreateMonthlyInvestmentPlan/' + this.initiativeService.id + '/' + CapexInformationId, data).toPromise());

  }








  ///  old structure
  CreateWorkstreamLead(id, form) {
    return this.http.post(this.baseUrl + 'MaxApprover/WorkstreamLead/' + id, form);
  }
  CreateSponsor(id, form) {
    return this.http.post(this.baseUrl + 'MaxApprover/Sponsor/' + id, form);
  }

  CreateFinance(id, form) {
    return this.http.post(this.baseUrl + 'MaxApprover/Finance/' + id, form);
  }

  CreateCFO(id, form) {
    return this.http.post(this.baseUrl + 'MaxApprover/CFO/' + id, form);
  }

  CreateCTO(id, form) {
    return this.http.post(this.baseUrl + 'MaxApprover/CTO/' + id, form);
  }

  CreateTOTeam(id, form) {
    return this.http.post(this.baseUrl + 'MaxApprover/TOTeam/' + id, form);
  }

  CreateTfBtTO(id, form) {
    return this.http.post(this.baseUrl + 'MaxApprover/TfBtTO/' + id, form);
  }

  CreateTOFinanceIL4(id, form) {
    return this.http.post(this.baseUrl + 'MaxApprover/TOFinanceIL4/' + id, form);
  }

  CreateTOFinanceIL5(id, form) {
    return this.http.post(this.baseUrl + 'MaxApprover/TOFinanceIL5/' + id, form);
  }

  // ================================================= 2020-05-02 ===========================================

  CreateCapexsInfo(
    StartingDate: string,
    ProjecctComRun: string,
    ActionYear: string,
    ProjectExePeriodYear: string,
    ProjectExePeriodMonth: string,
    CostCenterOfVP: string,
    CodeCostCenterOfVP: string,
    ProjectCost: string,
    ReasonOfChanging: string,
    BudgetPeriod: string,
    BetweenYear: string,
    TransferForm: string,
    PoolBudgetForm: string,
    SubmitTo: string,
    Revistion: string,
    CapexType: string,
    BudgetYear: string,
    CapexStatus: string,
    IsMaxApprovedRev: string,
    Sequent: string,
    ExistingBudget: string,
    SpendingActual: string,
    AdditionalCost: string,
    ReturnCost: string,
    AvailableBudget: string,
    PoolId: string,
    id: string,
    AvailableBudgetPool: string
  ): Observable<Capexs> {


    const body = {
      StartingDate: this.convertDate(StartingDate),
      ProjecctComRun: this.convertDate(ProjecctComRun),
      ActionYear: this.convertDate(ActionYear),
      ProjectExePeriodYear,
      ProjectExePeriodMonth,
      CostCenterOfVP,
      CodeCostCenterOfVP,
      ProjectCost,
      ReasonOfChanging,
      BudgetPeriod,
      BetweenYear,
      TransferForm,
      PoolBudgetForm,
      SubmitTo,
      Revistion,
      CapexType,
      BudgetYear,
      CapexStatus,
      IsMaxApprovedRev,
      Sequent,
      ExistingBudget,
      SpendingActual,
      AdditionalCost,
      ReturnCost,
      AvailableBudget,
      AvailableBudgetPool,
      PoolId

    };


    return this.http.post<Capexs>(this.baseUrl + 'CapexsInformations/' + id + '/' + PoolId + '/' + AvailableBudgetPool, body);
  }

  CreateAnnualInvestmentPlan(id: string, Annual, CapexInformationId, type, page) {

    // let data = [];

    const control = Annual.get('annualForm_list') as FormArray;


    const xx = +control.length;
    const x = [];

    let totalYear1 = 0;
    let totalYear2 = 0;
    let totalYear3 = 0;
    let totalYear4 = 0;
    let totalYear5 = 0;
    let totalYear6 = 0;
    let totalYear7 = 0;
    let totalYear8 = 0;
    let totalYear9 = 0;
    let totalYear10 = 0;
    let totalYearOverall = 0;

    for (let i = 0; i < xx; i++) {

      if (control.at(i).get('currencyFx').value === '' || control.at(i).get('currencyFx').value === null) {
        totalYear1 = totalYear1 + +control.at(i).get('y1').value;
        totalYear2 = totalYear2 + +control.at(i).get('y2').value;
        totalYear3 = totalYear3 + +control.at(i).get('y3').value;
        totalYear4 = totalYear4 + +control.at(i).get('y4').value;
        totalYear5 = totalYear5 + +control.at(i).get('y5').value;
        totalYear6 = totalYear6 + +control.at(i).get('y6').value;
        totalYear7 = totalYear7 + +control.at(i).get('y7').value;
        totalYear8 = totalYear8 + +control.at(i).get('y8').value;
        totalYear9 = totalYear9 + +control.at(i).get('y9').value;
        totalYear10 = totalYear10 + +control.at(i).get('y10').value;


      }
      else {
        totalYear1 = totalYear1 + (+control.at(i).get('y1').value * +control.at(i).get('currencyFx').value);
        totalYear2 = totalYear2 + (+control.at(i).get('y2').value * +control.at(i).get('currencyFx').value);
        totalYear3 = totalYear3 + (+control.at(i).get('y3').value * +control.at(i).get('currencyFx').value);
        totalYear4 = totalYear4 + (+control.at(i).get('y4').value * +control.at(i).get('currencyFx').value);
        totalYear5 = totalYear5 + (+control.at(i).get('y5').value * +control.at(i).get('currencyFx').value);
        totalYear6 = totalYear6 + (+control.at(i).get('y6').value * +control.at(i).get('currencyFx').value);
        totalYear7 = totalYear7 + (+control.at(i).get('y7').value * +control.at(i).get('currencyFx').value);
        totalYear8 = totalYear8 + (+control.at(i).get('y8').value * +control.at(i).get('currencyFx').value);
        totalYear9 = totalYear9 + (+control.at(i).get('y9').value * +control.at(i).get('currencyFx').value);
        totalYear10 = totalYear10 + (+control.at(i).get('y10').value * +control.at(i).get('currencyFx').value);
        // totalYearOverall = totalYearOverall + totalYear1 + totalYear2 + totalYear3 + totalYear4 + totalYear5 +
        //   totalYear6 + totalYear7 + totalYear8 + totalYear9 + totalYear10

      }

      const body = {

        CapexInformationId: CapexInformationId,
        InitiativeId: id,
        Currency: control.at(i).get('currencyTitle').value,
        CurrencyFx: control.at(i).get('currencyFx').value,
        Year1: control.at(i).get('y1').value,
        Year2: control.at(i).get('y2').value,
        Year3: control.at(i).get('y3').value,
        Year4: control.at(i).get('y4').value,
        Year5: control.at(i).get('y5').value,
        Year6: control.at(i).get('y6').value,
        Year7: control.at(i).get('y7').value,
        Year8: control.at(i).get('y8').value,
        Year9: control.at(i).get('y9').value,
        Year10: control.at(i).get('y10').value,
        YearOverall: control.at(i).get('overall').value,
        PlanType: page,
        ActualSpendingThisYear: '0',
        FutureSpendingThisYear: '0',
        CarryBudget: '0'
      };

      x.push(body);

    }

    totalYearOverall = totalYearOverall + totalYear1 + totalYear2 + totalYear3 + totalYear4 + totalYear5 +
      totalYear6 + totalYear7 + totalYear8 + totalYear9 + totalYear10


    const body = {

      CapexInformationId: CapexInformationId,
      InitiativeId: id,
      Currency: '',
      CurrencyFx: '',
      Year1: totalYear1,
      Year2: totalYear2,
      Year3: totalYear3,
      Year4: totalYear4,
      Year5: totalYear5,
      Year6: totalYear6,
      Year7: totalYear7,
      Year8: totalYear8,
      Year9: totalYear9,
      Year10: totalYear10,
      YearOverall: totalYearOverall,
      PlanType: 'TotalBahtbyRevision',
      ActualSpendingThisYear: '0',
      FutureSpendingThisYear: '0',
      CarryBudget: '0'
    };

    x.push(body);

    if (type === 'submit') {
      const body = {

        CapexInformationId: CapexInformationId,
        InitiativeId: id,
        Currency: '',
        CurrencyFx: '',
        Year1: totalYear1,
        Year2: totalYear2,
        Year3: totalYear3,
        Year4: totalYear4,
        Year5: totalYear5,
        Year6: totalYear6,
        Year7: totalYear7,
        Year8: totalYear8,
        Year9: totalYear9,
        Year10: totalYear10,
        YearOverall: totalYearOverall,
        PlanType: 'SumTotalBaht',
        ActualSpendingThisYear: '0',
        FutureSpendingThisYear: '0',
        CarryBudget: '0'
      };

      x.push(body);
    }


    const data = {
      AnnualInvestmentPlanTableDtos: x
    };

    return this.http.post(this.baseUrl + 'CapexsInformations/CreateAnnualInvestmentPlan/' +
      id + '/' + CapexInformationId, data);
  }

  CreateAnnualInvestmentPlan_addMore(id: string, Annual, CapexInformationId, type) {

    // let data = [];

    const control = Annual.get('annualForm_list') as FormArray;

    const xx = +control.length;
    const x = [];

    let totalYear1 = 0;
    let totalYear2 = 0;
    let totalYear3 = 0;
    let totalYear4 = 0;
    let totalYear5 = 0;
    let totalYear6 = 0;
    let totalYear7 = 0;
    let totalYear8 = 0;
    let totalYear9 = 0;
    let totalYear10 = 0;
    let totalYearOverall = 0;
    let totalYearOverall_ = 0;




    for (let i = 0; i < xx; i++) {

      if (control.at(i).get('currencyFx').value === '' || control.at(i).get('currencyFx').value === null) {
        totalYear1 = totalYear1 + +control.at(i).get('y1').value;
        totalYear2 = totalYear2 + +control.at(i).get('y2').value;
        totalYear3 = totalYear3 + +control.at(i).get('y3').value;
        totalYear4 = totalYear4 + +control.at(i).get('y4').value;
        totalYear5 = totalYear5 + +control.at(i).get('y5').value;
        totalYear6 = totalYear6 + +control.at(i).get('y6').value;
        totalYear7 = totalYear7 + +control.at(i).get('y7').value;
        totalYear8 = totalYear8 + +control.at(i).get('y8').value;
        totalYear9 = totalYear9 + +control.at(i).get('y9').value;
        totalYear10 = totalYear10 + +control.at(i).get('y10').value;


      }
      else {
        totalYear1 = totalYear1 + (+control.at(i).get('y1').value * +control.at(i).get('currencyFx').value);
        totalYear2 = totalYear2 + (+control.at(i).get('y2').value * +control.at(i).get('currencyFx').value);
        totalYear3 = totalYear3 + (+control.at(i).get('y3').value * +control.at(i).get('currencyFx').value);
        totalYear4 = totalYear4 + (+control.at(i).get('y4').value * +control.at(i).get('currencyFx').value);
        totalYear5 = totalYear5 + (+control.at(i).get('y5').value * +control.at(i).get('currencyFx').value);
        totalYear6 = totalYear6 + (+control.at(i).get('y6').value * +control.at(i).get('currencyFx').value);
        totalYear7 = totalYear7 + (+control.at(i).get('y7').value * +control.at(i).get('currencyFx').value);
        totalYear8 = totalYear8 + (+control.at(i).get('y8').value * +control.at(i).get('currencyFx').value);
        totalYear9 = totalYear9 + (+control.at(i).get('y9').value * +control.at(i).get('currencyFx').value);
        totalYear10 = totalYear10 + (+control.at(i).get('y10').value * +control.at(i).get('currencyFx').value);
        // totalYearOverall = totalYearOverall + totalYear1 + totalYear2 + totalYear3 + totalYear4 + totalYear5 +
        //   totalYear6 + totalYear7 + totalYear8 + totalYear9 + totalYear10

      }

      const body = {

        CapexInformationId: CapexInformationId,
        InitiativeId: id,
        Currency: control.at(i).get('currencyTitle').value,
        CurrencyFx: control.at(i).get('currencyFx').value,
        Year1: control.at(i).get('y1').value,
        Year2: control.at(i).get('y2').value,
        Year3: control.at(i).get('y3').value,
        Year4: control.at(i).get('y4').value,
        Year5: control.at(i).get('y5').value,
        Year6: control.at(i).get('y6').value,
        Year7: control.at(i).get('y7').value,
        Year8: control.at(i).get('y8').value,
        Year9: control.at(i).get('y9').value,
        Year10: control.at(i).get('y10').value,
        YearOverall: control.at(i).get('overall').value,
        PlanType: 'AdditionCost',
        ActualSpendingThisYear: '0',
        FutureSpendingThisYear: '0',
        CarryBudget: '0'
      };

      x.push(body);

    }

    totalYearOverall = totalYearOverall + totalYear1 + totalYear2 + totalYear3 + totalYear4 + totalYear5 +
      totalYear6 + totalYear7 + totalYear8 + totalYear9 + totalYear10


    const body = {

      CapexInformationId: CapexInformationId,
      InitiativeId: id,
      Currency: '',
      CurrencyFx: '',
      Year1: totalYear1,
      Year2: totalYear2,
      Year3: totalYear3,
      Year4: totalYear4,
      Year5: totalYear5,
      Year6: totalYear6,
      Year7: totalYear7,
      Year8: totalYear8,
      Year9: totalYear9,
      Year10: totalYear10,
      YearOverall: totalYearOverall,
      PlanType: 'TotalBahtbyRevision',
      ActualSpendingThisYear: '0',
      FutureSpendingThisYear: '0',
      CarryBudget: '0'
    };

    this.dataBody.push(body);

    if (type === 'submit') {
      const body = {

        CapexInformationId: CapexInformationId,
        InitiativeId: id,
        Currency: '',
        CurrencyFx: '',
        Year1: totalYear1,
        Year2: totalYear2,
        Year3: totalYear3,
        Year4: totalYear4,
        Year5: totalYear5,
        Year6: totalYear6,
        Year7: totalYear7,
        Year8: totalYear8,
        Year9: totalYear9,
        Year10: totalYear10,
        YearOverall: totalYearOverall,
        PlanType: 'SumTotalBaht',
        ActualSpendingThisYear: '0',
        FutureSpendingThisYear: '0',
        CarryBudget: '0'
      };

      this.dataBody.push(body);
    }


    const data = {
      AnnualInvestmentPlanTableDtos: this.dataBody
    };

    return this.http.post(this.baseUrl + 'CapexsInformations/CreateAnnualInvestmentPlan/' + id + '/' + CapexInformationId, data);


  }

  CreateAnnualInvestmentPlan_addMore_(id: string, Annual, CapexInformationId, type) {

    // let data = [];

    // const control = Annual.get('annualForm_list') as FormArray;

    const xx = +Annual.length;
    const x = [];

    let totalYear1 = 0;
    let totalYear2 = 0;
    let totalYear3 = 0;
    let totalYear4 = 0;
    let totalYear5 = 0;
    let totalYear6 = 0;
    let totalYear7 = 0;
    let totalYear8 = 0;
    let totalYear9 = 0;
    let totalYear10 = 0;
    let totalYearOverall = 0;
    let totalYearOverall_ = 0;




    for (let i = 0; i < xx; i++) {

      if (Annual[i].currencyFx === '' || Annual[i].currencyFx === null) {
        totalYear1 = totalYear1 + +Annual[i].y1;
        totalYear2 = totalYear2 + +Annual[i].y2;
        totalYear3 = totalYear3 + +Annual[i].y3;
        totalYear4 = totalYear4 + +Annual[i].y4;
        totalYear5 = totalYear5 + +Annual[i].y5;
        totalYear6 = totalYear6 + +Annual[i].y6;
        totalYear7 = totalYear7 + +Annual[i].y7;
        totalYear8 = totalYear8 + +Annual[i].y8;
        totalYear9 = totalYear9 + +Annual[i].y9;
        totalYear10 = totalYear10 + +Annual[i].y10;


      }
      else {
        totalYear1 = totalYear1 + (+Annual[i].y1 * +Annual[i].currencyFx);
        totalYear2 = totalYear2 + (+Annual[i].y2 * +Annual[i].currencyFx);
        totalYear3 = totalYear3 + (+Annual[i].y3 * +Annual[i].currencyFx);
        totalYear4 = totalYear4 + (+Annual[i].y4 * +Annual[i].currencyFx);
        totalYear5 = totalYear5 + (+Annual[i].y5 * +Annual[i].currencyFx);
        totalYear6 = totalYear6 + (+Annual[i].y6 * +Annual[i].currencyFx);
        totalYear7 = totalYear7 + (+Annual[i].y7 * +Annual[i].currencyFx);
        totalYear8 = totalYear8 + (+Annual[i].y8 * +Annual[i].currencyFx);
        totalYear9 = totalYear9 + (+Annual[i].y9 * +Annual[i].currencyFx);
        totalYear10 = totalYear10 + (+Annual[i].y10 * +Annual[i].currencyFx);
        // totalYearOverall = totalYearOverall + totalYear1 + totalYear2 + totalYear3 + totalYear4 + totalYear5 +
        //   totalYear6 + totalYear7 + totalYear8 + totalYear9 + totalYear10

      }

      const body = {

        CapexInformationId: CapexInformationId,
        InitiativeId: id,
        Currency: Annual[i].currencyTitle,
        CurrencyFx: Annual[i].currencyFx,
        Year1: Annual[i].y1,
        Year2: Annual[i].y2,
        Year3: Annual[i].y3,
        Year4: Annual[i].y4,
        Year5: Annual[i].y5,
        Year6: Annual[i].y6,
        Year7: Annual[i].y7,
        Year8: Annual[i].y8,
        Year9: Annual[i].y9,
        Year10: Annual[i].y10,
        YearOverall: Annual[i].overall,
        PlanType: 'AdditionCost',
        ActualSpendingThisYear: '0',
        FutureSpendingThisYear: '0',
        CarryBudget: '0'
      };

      x.push(body);

    }

    totalYearOverall = totalYearOverall + totalYear1 + totalYear2 + totalYear3 + totalYear4 + totalYear5 +
      totalYear6 + totalYear7 + totalYear8 + totalYear9 + totalYear10


    const body = {

      CapexInformationId: CapexInformationId,
      InitiativeId: id,
      Currency: '',
      CurrencyFx: '',
      Year1: totalYear1,
      Year2: totalYear2,
      Year3: totalYear3,
      Year4: totalYear4,
      Year5: totalYear5,
      Year6: totalYear6,
      Year7: totalYear7,
      Year8: totalYear8,
      Year9: totalYear9,
      Year10: totalYear10,
      YearOverall: totalYearOverall,
      PlanType: 'TotalBahtbyRevision',
      ActualSpendingThisYear: '0',
      FutureSpendingThisYear: '0',
      CarryBudget: '0'
    };

    x.push(body);

    if (type === 'submit') {
      const body = {

        CapexInformationId: CapexInformationId,
        InitiativeId: id,
        Currency: '',
        CurrencyFx: '',
        Year1: totalYear1,
        Year2: totalYear2,
        Year3: totalYear3,
        Year4: totalYear4,
        Year5: totalYear5,
        Year6: totalYear6,
        Year7: totalYear7,
        Year8: totalYear8,
        Year9: totalYear9,
        Year10: totalYear10,
        YearOverall: totalYearOverall,
        PlanType: 'SumTotalBaht',
        ActualSpendingThisYear: '0',
        FutureSpendingThisYear: '0',
        CarryBudget: '0'
      };

      x.push(body);
    }


    const data = {
      AnnualInvestmentPlanTableDtos: x
    };

    return this.http.post(this.baseUrl + 'CapexsInformations/CreateAnnualInvestmentPlan/' + id + '/' + CapexInformationId, data);


  }

  CreateAnnualInvestmentPlan_return(id: string, Annual, CapexInformationId, type) {

    // let data = [];

    const control = Annual.get('annualForm_list') as FormArray;

    const xx = +control.length;
    const x = [];

    let totalYear1 = 0;
    let totalYear2 = 0;
    let totalYear3 = 0;
    let totalYear4 = 0;
    let totalYear5 = 0;
    let totalYear6 = 0;
    let totalYear7 = 0;
    let totalYear8 = 0;
    let totalYear9 = 0;
    let totalYear10 = 0;
    let totalYearOverall = 0;

    for (let i = 0; i < xx; i++) {

      if (control.at(i).get('currencyFx').value === null) {
        totalYear1 = totalYear1 + +control.at(i).get('y1').value;
        totalYear2 = totalYear2 + +control.at(i).get('y2').value;
        totalYear3 = totalYear3 + +control.at(i).get('y3').value;
        totalYear4 = totalYear4 + +control.at(i).get('y4').value;
        totalYear5 = totalYear5 + +control.at(i).get('y5').value;
        totalYear6 = totalYear6 + +control.at(i).get('y6').value;
        totalYear7 = totalYear7 + +control.at(i).get('y7').value;
        totalYear8 = totalYear8 + +control.at(i).get('y8').value;
        totalYear9 = totalYear9 + +control.at(i).get('y9').value;
        totalYear10 = totalYear10 + +control.at(i).get('y10').value;


      }
      else {
        totalYear1 = totalYear1 + (+control.at(i).get('y1').value * +control.at(i).get('currencyFx').value);
        totalYear2 = totalYear2 + (+control.at(i).get('y2').value * +control.at(i).get('currencyFx').value);
        totalYear3 = totalYear3 + (+control.at(i).get('y3').value * +control.at(i).get('currencyFx').value);
        totalYear4 = totalYear4 + (+control.at(i).get('y4').value * +control.at(i).get('currencyFx').value);
        totalYear5 = totalYear5 + (+control.at(i).get('y5').value * +control.at(i).get('currencyFx').value);
        totalYear6 = totalYear6 + (+control.at(i).get('y6').value * +control.at(i).get('currencyFx').value);
        totalYear7 = totalYear7 + (+control.at(i).get('y7').value * +control.at(i).get('currencyFx').value);
        totalYear8 = totalYear8 + (+control.at(i).get('y8').value * +control.at(i).get('currencyFx').value);
        totalYear9 = totalYear9 + (+control.at(i).get('y9').value * +control.at(i).get('currencyFx').value);
        totalYear10 = totalYear10 + (+control.at(i).get('y10').value * +control.at(i).get('currencyFx').value);
        // totalYearOverall = totalYearOverall + totalYear1 + totalYear2 + totalYear3 + totalYear4 + totalYear5 +
        //   totalYear6 + totalYear7 + totalYear8 + totalYear9 + totalYear10

      }

      if (i === 0) {
        const body = {

          CapexInformationId: CapexInformationId,
          InitiativeId: id,
          Currency: control.at(i).get('currencyTitle').value,
          CurrencyFx: control.at(i).get('currencyFx').value,
          Year1: control.at(i).get('y1').value,
          Year2: control.at(i).get('y2').value,
          Year3: control.at(i).get('y3').value,
          Year4: control.at(i).get('y4').value,
          Year5: control.at(i).get('y5').value,
          Year6: control.at(i).get('y6').value,
          Year7: control.at(i).get('y7').value,
          Year8: control.at(i).get('y8').value,
          Year9: control.at(i).get('y9').value,
          Year10: control.at(i).get('y10').value,
          YearOverall: control.at(i).get('overall').value,
          PlanType: 'BudgetAvailable',
          ActualSpendingThisYear: '0',
          FutureSpendingThisYear: '0',
          CarryBudget: '0'

        };

        x.push(body);

      }
      else {
        const body = {

          CapexInformationId: CapexInformationId,
          InitiativeId: id,
          Currency: control.at(i).get('currencyTitle').value,
          CurrencyFx: control.at(i).get('currencyFx').value,
          Year1: control.at(i).get('y1').value,
          Year2: control.at(i).get('y2').value,
          Year3: control.at(i).get('y3').value,
          Year4: control.at(i).get('y4').value,
          Year5: control.at(i).get('y5').value,
          Year6: control.at(i).get('y6').value,
          Year7: control.at(i).get('y7').value,
          Year8: control.at(i).get('y8').value,
          Year9: control.at(i).get('y9').value,
          Year10: control.at(i).get('y10').value,
          YearOverall: control.at(i).get('overall').value,
          PlanType: 'TotalBahtbyRevision',
          ActualSpendingThisYear: '0',
          FutureSpendingThisYear: '0',
          CarryBudget: '0'
        };

        x.push(body);
      }



    }

    totalYearOverall = totalYearOverall + totalYear1 + totalYear2 + totalYear3 + totalYear4 + totalYear5 +
      totalYear6 + totalYear7 + totalYear8 + totalYear9 + totalYear10


    const body = {

      CapexInformationId: CapexInformationId,
      InitiativeId: id,
      Currency: '',
      CurrencyFx: '',
      Year1: totalYear1,
      Year2: totalYear2,
      Year3: totalYear3,
      Year4: totalYear4,
      Year5: totalYear5,
      Year6: totalYear6,
      Year7: totalYear7,
      Year8: totalYear8,
      Year9: totalYear9,
      Year10: totalYear10,
      YearOverall: totalYearOverall,
      PlanType: 'TotalBahtbyRevision',
      ActualSpendingThisYear: '0',
      FutureSpendingThisYear: '0',
      CarryBudget: '0'
    };

    x.push(body);


    if (type === 'submit') {
      const body = {

        CapexInformationId: CapexInformationId,
        InitiativeId: id,
        Currency: '',
        CurrencyFx: '',
        Year1: totalYear1,
        Year2: totalYear2,
        Year3: totalYear3,
        Year4: totalYear4,
        Year5: totalYear5,
        Year6: totalYear6,
        Year7: totalYear7,
        Year8: totalYear8,
        Year9: totalYear9,
        Year10: totalYear10,
        YearOverall: totalYearOverall,
        PlanType: 'SumTotalBaht',
        ActualSpendingThisYear: '0',
        FutureSpendingThisYear: '0',
        CarryBudget: '0'
      };

      x.push(body);
    }


    const data = {
      AnnualInvestmentPlanTableDtos: x
    };

    return this.http.post(this.baseUrl + 'CapexsInformations/CreateAnnualInvestmentPlan/' +
      id + '/' + CapexInformationId, data);
  }

  CreateMonthlyInvestmentPlan(year, form1, form2, form3, form4, form5, form6, form7, form8, form9, form10,
    id, AnnualInvestmentPlanId, CapexInformationId) {

    const f1 = form1.get('monthForm_list') as FormArray;
    const f2 = form2.get('monthForm_list') as FormArray;
    const f3 = form3.get('monthForm_list') as FormArray;
    const f4 = form4.get('monthForm_list') as FormArray;
    const f5 = form5.get('monthForm_list') as FormArray;
    const f6 = form6.get('monthForm_list') as FormArray;
    const f7 = form7.get('monthForm_list') as FormArray;
    const f8 = form8.get('monthForm_list') as FormArray;
    const f9 = form9.get('monthForm_list') as FormArray;
    const f10 = form10.get('monthForm_list') as FormArray;
    // console.log(f1);

    const x = [];

    for (let i = 0; i < year.length; i++) {
      if (i === 0) {
        const xx = +f1.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f1.at(j).get('currencyTitle').value,
            InvestmentCostFx: f1.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f1.at(j).get('m1').value,
            Feb: f1.at(j).get('m2').value,
            Mar: f1.at(j).get('m3').value,
            Apr: f1.at(j).get('m4').value,
            May: f1.at(j).get('m5').value,
            Jun: f1.at(j).get('m6').value,
            Jul: f1.at(j).get('m7').value,
            Aug: f1.at(j).get('m8').value,
            Sep: f1.at(j).get('m9').value,
            Oct: f1.at(j).get('m10').value,
            Nov: f1.at(j).get('m11').value,
            Dec: f1.at(j).get('m12').value,
            MonthlyOverall: f1.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId
          };
          x.push(body);
        }
      } else if (i === 1) {
        const xx = +f2.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f2.at(j).get('currencyTitle').value,
            InvestmentCostFx: f2.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f2.at(j).get('m1').value,
            Feb: f2.at(j).get('m2').value,
            Mar: f2.at(j).get('m3').value,
            Apr: f2.at(j).get('m4').value,
            May: f2.at(j).get('m5').value,
            Jun: f2.at(j).get('m6').value,
            Jul: f2.at(j).get('m7').value,
            Aug: f2.at(j).get('m8').value,
            Sep: f2.at(j).get('m9').value,
            Oct: f2.at(j).get('m10').value,
            Nov: f2.at(j).get('m11').value,
            Dec: f2.at(j).get('m12').value,
            MonthlyOverall: f2.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 2) {
        const xx = +f3.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f3.at(j).get('currencyTitle').value,
            InvestmentCostFx: f3.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f3.at(j).get('m1').value,
            Feb: f3.at(j).get('m2').value,
            Mar: f3.at(j).get('m3').value,
            Apr: f3.at(j).get('m4').value,
            May: f3.at(j).get('m5').value,
            Jun: f3.at(j).get('m6').value,
            Jul: f3.at(j).get('m7').value,
            Aug: f3.at(j).get('m8').value,
            Sep: f3.at(j).get('m9').value,
            Oct: f3.at(j).get('m10').value,
            Nov: f3.at(j).get('m11').value,
            Dec: f3.at(j).get('m12').value,
            MonthlyOverall: f3.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 3) {
        const xx = +f4.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f4.at(j).get('currencyTitle').value,
            InvestmentCostFx: f4.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f4.at(j).get('m1').value,
            Feb: f4.at(j).get('m2').value,
            Mar: f4.at(j).get('m3').value,
            Apr: f4.at(j).get('m4').value,
            May: f4.at(j).get('m5').value,
            Jun: f4.at(j).get('m6').value,
            Jul: f4.at(j).get('m7').value,
            Aug: f4.at(j).get('m8').value,
            Sep: f4.at(j).get('m9').value,
            Oct: f4.at(j).get('m10').value,
            Nov: f4.at(j).get('m11').value,
            Dec: f4.at(j).get('m12').value,
            MonthlyOverall: f4.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 4) {
        const xx = +f5.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f5.at(j).get('currencyTitle').value,
            InvestmentCostFx: f5.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f5.at(j).get('m1').value,
            Feb: f5.at(j).get('m2').value,
            Mar: f5.at(j).get('m3').value,
            Apr: f5.at(j).get('m4').value,
            May: f5.at(j).get('m5').value,
            Jun: f5.at(j).get('m6').value,
            Jul: f5.at(j).get('m7').value,
            Aug: f5.at(j).get('m8').value,
            Sep: f5.at(j).get('m9').value,
            Oct: f5.at(j).get('m10').value,
            Nov: f5.at(j).get('m11').value,
            Dec: f5.at(j).get('m12').value,
            MonthlyOverall: f5.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 5) {
        const xx = +f6.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f6.at(j).get('currencyTitle').value,
            InvestmentCostFx: f6.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f6.at(j).get('m1').value,
            Feb: f6.at(j).get('m2').value,
            Mar: f6.at(j).get('m3').value,
            Apr: f6.at(j).get('m4').value,
            May: f6.at(j).get('m5').value,
            Jun: f6.at(j).get('m6').value,
            Jul: f6.at(j).get('m7').value,
            Aug: f6.at(j).get('m8').value,
            Sep: f6.at(j).get('m9').value,
            Oct: f6.at(j).get('m10').value,
            Nov: f6.at(j).get('m11').value,
            Dec: f6.at(j).get('m12').value,
            MonthlyOverall: f6.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 6) {
        const xx = +f7.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f7.at(j).get('currencyTitle').value,
            InvestmentCostFx: f7.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f7.at(j).get('m1').value,
            Feb: f7.at(j).get('m2').value,
            Mar: f7.at(j).get('m3').value,
            Apr: f7.at(j).get('m4').value,
            May: f7.at(j).get('m5').value,
            Jun: f7.at(j).get('m6').value,
            Jul: f7.at(j).get('m7').value,
            Aug: f7.at(j).get('m8').value,
            Sep: f7.at(j).get('m9').value,
            Oct: f7.at(j).get('m10').value,
            Nov: f7.at(j).get('m11').value,
            Dec: f7.at(j).get('m12').value,
            MonthlyOverall: f7.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 7) {
        const xx = +f8.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f8.at(j).get('currencyTitle').value,
            InvestmentCostFx: f8.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f8.at(j).get('m1').value,
            Feb: f8.at(j).get('m2').value,
            Mar: f8.at(j).get('m3').value,
            Apr: f8.at(j).get('m4').value,
            May: f8.at(j).get('m5').value,
            Jun: f8.at(j).get('m6').value,
            Jul: f8.at(j).get('m7').value,
            Aug: f8.at(j).get('m8').value,
            Sep: f8.at(j).get('m9').value,
            Oct: f8.at(j).get('m10').value,
            Nov: f8.at(j).get('m11').value,
            Dec: f8.at(j).get('m12').value,
            MonthlyOverall: f8.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 8) {
        const xx = +f9.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f9.at(j).get('currencyTitle').value,
            InvestmentCostFx: f9.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f9.at(j).get('m1').value,
            Feb: f9.at(j).get('m2').value,
            Mar: f9.at(j).get('m3').value,
            Apr: f9.at(j).get('m4').value,
            May: f9.at(j).get('m5').value,
            Jun: f9.at(j).get('m6').value,
            Jul: f9.at(j).get('m7').value,
            Aug: f9.at(j).get('m8').value,
            Sep: f9.at(j).get('m9').value,
            Oct: f9.at(j).get('m10').value,
            Nov: f9.at(j).get('m11').value,
            Dec: f9.at(j).get('m12').value,
            MonthlyOverall: f9.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 9) {
        const xx = +f10.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: f10.at(j).get('currencyTitle').value,
            InvestmentCostFx: f10.at(j).get('currencyFx').value,
            AnnualInvestmentPlanId,
            Jan: f10.at(j).get('m1').value,
            Feb: f10.at(j).get('m2').value,
            Mar: f10.at(j).get('m3').value,
            Apr: f10.at(j).get('m4').value,
            May: f10.at(j).get('m5').value,
            Jun: f10.at(j).get('m6').value,
            Jul: f10.at(j).get('m7').value,
            Aug: f10.at(j).get('m8').value,
            Sep: f10.at(j).get('m9').value,
            Oct: f10.at(j).get('m10').value,
            Nov: f10.at(j).get('m11').value,
            Dec: f10.at(j).get('m12').value,
            MonthlyOverall: f10.at(j).get('overall').value,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      }
    }

    const data = {
      MonthlyInvestmentPlanTableDtos: x
    };



    return this.http.post(this.baseUrl + 'CapexsInformations/CreateMonthlyInvestmentPlan/' + id + '/' + CapexInformationId, data);

  }

  convertDate(di: string) {
    let x = '';
    if (di != '' && di != null) {
      x = di.substring(6).substring(0, 4) + '-' + di.substring(3).substring(0, 2) + '-' + di.substring(0, 2);
    }

    return x;
  }
  GetCapexInformationList(id): Observable<Capexs[]> {
    return this.http.get<Capexs[]>(
      this.baseUrl + 'CapexsInformations/GetCapexInformationList/' + id
    );
  }
  //GetIsDisabledCapexTab
  async GetIsDisabledCapexTab(id) {
    return (await this.http.get<boolean>(
      this.baseUrl + 'CapexsInformations/GetIsDisabledCapexTab/' + id
    )).toPromise();
  }

  GetCapexsInfo(id, type: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'CapexsInformations/' + id + '/' + type);
  }


  GetTotalByRevisionAll(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'CapexsInformations/GetTotalByRevisionAll/' + id);
  }


  GetCapexsInformationsByCapexInformationId(id): Observable<any> {

    return this.http.get<any>(this.baseUrl + 'CapexsInformations/GetCapexsInformationsByCapexInformationId/' + id);
  }


  GetCodeOfCostCenterVP(OwnerName): Observable<any> {
    const data = {
      OwnerName: OwnerName,
      MainPositionCostCenter: 1
    }
    return this.http.post<any>(this.baseUrl + 'CapexsInformations/GetCodeOfCostCenterVP', data);
  }

  GetCapexsInfo_one(id): Observable<any> {

    return this.http.get<any>(this.baseUrl + 'CapexsInformations/GetCapexsInformations_one/' + id);
  }

  GetAnnualInvestmentPlan(id: string, capexid: string): Observable<any[]> {


    return this.http.get<any[]>(this.baseUrl + 'CapexsInformations/GetAnnualInvestmentPlan/' + id + '/' + capexid);
  }

  GetMonthlyInvestmentPlan(id: string, capexid: string, YearOfMonth): Observable<any[]> {

    const body = {
      YearOfMonth
    };


    return this.http.get<any[]>(this.baseUrl + 'CapexsInformations/GetMonthlyInvestmentPlan/' + id
      + '/' + capexid + '/' + YearOfMonth);
  }

  UpdateSumTotalBaht(id: any, sumtotal: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'CapexsInformations/UpdateSumTotalBaht/' + id + '/' + sumtotal);
  }
  // CreateAnnualInvestmentPlan_(id: string, Annual) {

  //   // let data = [];

  //   // const control = Annual.get('annualForm_list') as FormArray;

  //   const xx = +Annual.length;
  //   const x = [];

  //   for (let i = 0; i < xx; i++) {

  //     const body = {
  //       InvestmentPlan: Annual[i].currencyTitle,
  //       InvestmentPlanFx: Annual[i].currencyFx,
  //       Year1: Annual[i].y1,
  //       Year2: Annual[i].y2,
  //       Year3: Annual[i].y3,
  //       Year4: Annual[i].y4,
  //       Year5: Annual[i].y5,
  //       Year6: Annual[i].y6,
  //       Year7: Annual[i].y7,
  //       Year8: Annual[i].y8,
  //       Year9: Annual[i].y9,
  //       Year10: Annual[i].y10,
  //       YearOverall: Annual[i].overall
  //     };

  //     console.log(body);
  //     x.push(body);

  //   }

  //   const data = {
  //     AnnualInvestmentPlanTableDtos: x
  //   };

  //   return this.http.post(this.baseUrl + 'CapexsInformations/CreateAnnualInvestmentPlan/' + id, data);
  // }

  // async buildBody(id, Annual, CapexInformationId, page) {
  //   const control = Annual.get('annualForm_list') as FormArray;
  //   const xx = control.length;
  //   for (let i = 0; i < xx; i++) {
  //     let item = control.at(i) as FormGroup;
  //     let totalYear1 = 0;
  //     let totalYear2 = 0;
  //     let totalYear3 = 0;
  //     let totalYear4 = 0;
  //     let totalYear5 = 0;
  //     let totalYear6 = 0;
  //     let totalYear7 = 0;
  //     let totalYear8 = 0;
  //     let totalYear9 = 0;
  //     let totalYear10 = 0;
  //     let totalYearOverall = 0;
  //     let currencyTitle = item.get('currencyTitle').value;
  //     let overall = item.get('overall').value;
  //     let valueFx = item.get('currencyFx').value;
  //     let valueY1 = item.get('y1').value;
  //     let valueY2 = item.get('y2').value;
  //     let valueY3 = item.get('y3').value;
  //     let valueY4 = item.get('y4').value;
  //     let valueY5 = item.get('y5').value;
  //     let valueY6 = item.get('y6').value;
  //     let valueY7 = item.get('y7').value;
  //     let valueY8 = item.get('y8').value;
  //     let valueY9 = item.get('y9').value;
  //     let valueY10 = item.get('y10').value;



  //     if (valueFx === "" || valueFx === null) {
  //       totalYear1 = totalYear1 + +valueY1;
  //       totalYear2 = totalYear2 + +valueY2;
  //       totalYear3 = totalYear3 + +valueY3;
  //       totalYear4 = totalYear4 + +valueY4;
  //       totalYear5 = totalYear5 + +valueY5;
  //       totalYear6 = totalYear6 + +valueY6;
  //       totalYear7 = totalYear7 + +valueY7;
  //       totalYear8 = totalYear8 + +valueY8;
  //       totalYear9 = totalYear9 + +valueY9;
  //       totalYear10 = totalYear10 + +valueY10;


  //     }
  //     else {
  //       totalYear1 = totalYear1 + (+valueY1 * +valueFx);
  //       totalYear2 = totalYear2 + (+valueY2 * +valueFx);
  //       totalYear3 = totalYear3 + (+valueY3 * +valueFx);
  //       totalYear4 = totalYear4 + (+valueY4 * +valueFx);
  //       totalYear5 = totalYear5 + (+valueY5 * +valueFx);
  //       totalYear6 = totalYear6 + (+valueY6 * +valueFx);
  //       totalYear7 = totalYear7 + (+valueY7 * +valueFx);
  //       totalYear8 = totalYear8 + (+valueY8 * +valueFx);
  //       totalYear9 = totalYear9 + (+valueY9 * +valueFx);
  //       totalYear10 = totalYear10 + (+valueY10 * +valueFx);
  //       // totalYearOverall = totalYearOverall + totalYear1 + totalYear2 + totalYear3 + totalYear4 + totalYear5 +
  //       //   totalYear6 + totalYear7 + totalYear8 + totalYear9 + totalYear10

  //     }


  //     const body_page = {

  //       CapexInformationId: CapexInformationId,
  //       InitiativeId: id,
  //       Currency: currencyTitle ? currencyTitle : '',
  //       CurrencyFx: valueFx ? valueFx : '',
  //       Year1: valueY1 ? valueY1 : '0.00',
  //       Year2: valueY2 ? valueY2 : '0.00',
  //       Year3: valueY3 ? valueY3 : '0.00',
  //       Year4: valueY4 ? valueY4 : '0.00',
  //       Year5: valueY5 ? valueY5 : '0.00',
  //       Year6: valueY6 ? valueY6 : '0.00',
  //       Year7: valueY7 ? valueY7 : '0.00',
  //       Year8: valueY8 ? valueY8 : '0.00',
  //       Year9: valueY9 ? valueY9 : '0.00',
  //       Year10: valueY10 ? valueY10 : '0.00',
  //       YearOverall: overall ? overall : '0.00',
  //       PlanType: page,
  //       ActualSpendingThisYear: "0",
  //       FutureSpendingThisYear: "0",
  //       CarryBudget: "0"
  //     };

  //     this.dataBody.push(body_page);
  //   }
  // }




  // async CreateAnnualInvestmentPlan_(id: string, Annual, CapexInformationId, type, page) {

  //   // let data = [];
  //   // this.dataBody = [];
  //   let data: any;
  //   // const control = Annual.get('annualForm_list') as FormArray;


  //   const xx = +Annual.length;
  //   const x = [];

  //   let totalYear1 = 0;
  //   let totalYear2 = 0;
  //   let totalYear3 = 0;
  //   let totalYear4 = 0;
  //   let totalYear5 = 0;
  //   let totalYear6 = 0;
  //   let totalYear7 = 0;
  //   let totalYear8 = 0;
  //   let totalYear9 = 0;
  //   let totalYear10 = 0;
  //   let totalYearOverall = 0;

  //   // for (let i = 0; i < xx; i++) {


  //   //   if (Annual[i].currencyFx === "" || Annual[i].currencyFx === null) {
  //   //     totalYear1 = totalYear1 + +Annual[i].y1;
  //   //     totalYear2 = totalYear2 + +Annual[i].y2;
  //   //     totalYear3 = totalYear3 + +Annual[i].y3;
  //   //     totalYear4 = totalYear4 + +Annual[i].y4;
  //   //     totalYear5 = totalYear5 + +Annual[i].y5;
  //   //     totalYear6 = totalYear6 + +Annual[i].y6;
  //   //     totalYear7 = totalYear7 + +Annual[i].y7;
  //   //     totalYear8 = totalYear8 + +Annual[i].y8;
  //   //     totalYear9 = totalYear9 + +Annual[i].y9;
  //   //     totalYear10 = totalYear10 + +Annual[i].y10;


  //   //   }
  //   //   else {
  //   //     totalYear1 = totalYear1 + (+Annual[i].y1 * +Annual[i].currencyFx);
  //   //     totalYear2 = totalYear2 + (+Annual[i].y2 * +Annual[i].currencyFx);
  //   //     totalYear3 = totalYear3 + (+Annual[i].y3 * +Annual[i].currencyFx);
  //   //     totalYear4 = totalYear4 + (+Annual[i].y4 * +Annual[i].currencyFx);
  //   //     totalYear5 = totalYear5 + (+Annual[i].y5 * +Annual[i].currencyFx);
  //   //     totalYear6 = totalYear6 + (+Annual[i].y6 * +Annual[i].currencyFx);
  //   //     totalYear7 = totalYear7 + (+Annual[i].y7 * +Annual[i].currencyFx);
  //   //     totalYear8 = totalYear8 + (+Annual[i].y8 * +Annual[i].currencyFx);
  //   //     totalYear9 = totalYear9 + (+Annual[i].y9 * +Annual[i].currencyFx);
  //   //     totalYear10 = totalYear10 + (+Annual[i].y10 * +Annual[i].currencyFx);
  //   //     // totalYearOverall = totalYearOverall + totalYear1 + totalYear2 + totalYear3 + totalYear4 + totalYear5 +
  //   //     //   totalYear6 + totalYear7 + totalYear8 + totalYear9 + totalYear10

  //   //   }


  //   //   const body_page = {

  //   //     CapexInformationId: CapexInformationId,
  //   //     InitiativeId: id,
  //   //     Currency: Annual[i].currencyTitle,
  //   //     CurrencyFx: Annual[i].currencyFx,
  //   //     Year1: Annual[i].y1,
  //   //     Year2: Annual[i].y2,
  //   //     Year3: Annual[i].y3,
  //   //     Year4: Annual[i].y4,
  //   //     Year5: Annual[i].y5,
  //   //     Year6: Annual[i].y6,
  //   //     Year7: Annual[i].y7,
  //   //     Year8: Annual[i].y8,
  //   //     Year9: Annual[i].y9,
  //   //     Year10: Annual[i].y10,
  //   //     YearOverall: Annual[i].overall,
  //   //     PlanType: page,
  //   //     ActualSpendingThisYear: "0",
  //   //     FutureSpendingThisYear: "0",
  //   //     CarryBudget: "0"
  //   //   };

  //   //   x.push(body_page);

  //   // }

  //   await this.buildBody(id, Annual, CapexInformationId, page).then(() => {

  //     console.log('after build', this.dataBody);


  //     totalYearOverall = totalYearOverall + totalYear1 + totalYear2 + totalYear3 + totalYear4 + totalYear5 +
  //       totalYear6 + totalYear7 + totalYear8 + totalYear9 + totalYear10


  //     const body = {

  //       CapexInformationId: CapexInformationId,
  //       InitiativeId: id,
  //       Currency: "",
  //       CurrencyFx: "",
  //       Year1: totalYear1,
  //       Year2: totalYear2,
  //       Year3: totalYear3,
  //       Year4: totalYear4,
  //       Year5: totalYear5,
  //       Year6: totalYear6,
  //       Year7: totalYear7,
  //       Year8: totalYear8,
  //       Year9: totalYear9,
  //       Year10: totalYear10,
  //       YearOverall: totalYearOverall,
  //       PlanType: "TotalBahtbyRevision",
  //       ActualSpendingThisYear: "0",
  //       FutureSpendingThisYear: "0",
  //       CarryBudget: "0"
  //     };

  //     this.dataBody.push(body);

  //     if (type === "submit") {
  //       const body = {

  //         CapexInformationId: CapexInformationId,
  //         InitiativeId: id,
  //         Currency: "",
  //         CurrencyFx: "",
  //         Year1: totalYear1,
  //         Year2: totalYear2,
  //         Year3: totalYear3,
  //         Year4: totalYear4,
  //         Year5: totalYear5,
  //         Year6: totalYear6,
  //         Year7: totalYear7,
  //         Year8: totalYear8,
  //         Year9: totalYear9,
  //         Year10: totalYear10,
  //         YearOverall: totalYearOverall,
  //         PlanType: "SumTotalBaht",
  //         ActualSpendingThisYear: "0",
  //         FutureSpendingThisYear: "0",
  //         CarryBudget: "0"
  //       };

  //       this.dataBody.push(body);
  //     }

  //     console.log('before sent', this.dataBody);

  //     data = {
  //       AnnualInvestmentPlanTableDtos: this.dataBody
  //     };

  //   });


  //   return await this.http.post(this.baseUrl + 'CapexsInformations/CreateAnnualInvestmentPlan/' +
  //     id + '/' + CapexInformationId, data).toPromise();
  // }

  CreateAnnualInvestmentPlan_(id: string, Annual, CapexInformationId, type, page) {

    // let data: any;
    // const control = Annual.get('annualForm_list') as FormArray;


    const xx = +Annual.length;
    const x = [];

    let totalYear1 = 0;
    let totalYear2 = 0;
    let totalYear3 = 0;
    let totalYear4 = 0;
    let totalYear5 = 0;
    let totalYear6 = 0;
    let totalYear7 = 0;
    let totalYear8 = 0;
    let totalYear9 = 0;
    let totalYear10 = 0;
    let totalYearOverall = 0;

    for (let i = 0; i < xx; i++) {


      if (Annual[i].currencyFx === '' || Annual[i].currencyFx === null) {
        totalYear1 = totalYear1 + +Annual[i].y1;
        totalYear2 = totalYear2 + +Annual[i].y2;
        totalYear3 = totalYear3 + +Annual[i].y3;
        totalYear4 = totalYear4 + +Annual[i].y4;
        totalYear5 = totalYear5 + +Annual[i].y5;
        totalYear6 = totalYear6 + +Annual[i].y6;
        totalYear7 = totalYear7 + +Annual[i].y7;
        totalYear8 = totalYear8 + +Annual[i].y8;
        totalYear9 = totalYear9 + +Annual[i].y9;
        totalYear10 = totalYear10 + +Annual[i].y10;


      }
      else {
        totalYear1 = totalYear1 + (+Annual[i].y1 * +Annual[i].currencyFx);
        totalYear2 = totalYear2 + (+Annual[i].y2 * +Annual[i].currencyFx);
        totalYear3 = totalYear3 + (+Annual[i].y3 * +Annual[i].currencyFx);
        totalYear4 = totalYear4 + (+Annual[i].y4 * +Annual[i].currencyFx);
        totalYear5 = totalYear5 + (+Annual[i].y5 * +Annual[i].currencyFx);
        totalYear6 = totalYear6 + (+Annual[i].y6 * +Annual[i].currencyFx);
        totalYear7 = totalYear7 + (+Annual[i].y7 * +Annual[i].currencyFx);
        totalYear8 = totalYear8 + (+Annual[i].y8 * +Annual[i].currencyFx);
        totalYear9 = totalYear9 + (+Annual[i].y9 * +Annual[i].currencyFx);
        totalYear10 = totalYear10 + (+Annual[i].y10 * +Annual[i].currencyFx);
        // totalYearOverall = totalYearOverall + totalYear1 + totalYear2 + totalYear3 + totalYear4 + totalYear5 +
        //   totalYear6 + totalYear7 + totalYear8 + totalYear9 + totalYear10

      }


      const body_page = {

        CapexInformationId: CapexInformationId,
        InitiativeId: id,
        Currency: Annual[i].currencyTitle,
        CurrencyFx: Annual[i].currencyFx,
        Year1: Annual[i].y1,
        Year2: Annual[i].y2,
        Year3: Annual[i].y3,
        Year4: Annual[i].y4,
        Year5: Annual[i].y5,
        Year6: Annual[i].y6,
        Year7: Annual[i].y7,
        Year8: Annual[i].y8,
        Year9: Annual[i].y9,
        Year10: Annual[i].y10,
        YearOverall: Annual[i].overall,
        PlanType: page,
        ActualSpendingThisYear: '0',
        FutureSpendingThisYear: '0',
        CarryBudget: '0'
      };

      x.push(body_page);

    }

    totalYearOverall = totalYearOverall + totalYear1 + totalYear2 + totalYear3 + totalYear4 + totalYear5 +
      totalYear6 + totalYear7 + totalYear8 + totalYear9 + totalYear10


    const body = {

      CapexInformationId: CapexInformationId,
      InitiativeId: id,
      Currency: '',
      CurrencyFx: '',
      Year1: totalYear1,
      Year2: totalYear2,
      Year3: totalYear3,
      Year4: totalYear4,
      Year5: totalYear5,
      Year6: totalYear6,
      Year7: totalYear7,
      Year8: totalYear8,
      Year9: totalYear9,
      Year10: totalYear10,
      YearOverall: totalYearOverall,
      PlanType: 'TotalBahtbyRevision',
      ActualSpendingThisYear: '0',
      FutureSpendingThisYear: '0',
      CarryBudget: '0'
    };

    x.push(body);

    if (type === 'submit') {
      const body = {

        CapexInformationId: CapexInformationId,
        InitiativeId: id,
        Currency: '',
        CurrencyFx: '',
        Year1: totalYear1,
        Year2: totalYear2,
        Year3: totalYear3,
        Year4: totalYear4,
        Year5: totalYear5,
        Year6: totalYear6,
        Year7: totalYear7,
        Year8: totalYear8,
        Year9: totalYear9,
        Year10: totalYear10,
        YearOverall: totalYearOverall,
        PlanType: 'SumTotalBaht',
        ActualSpendingThisYear: '0',
        FutureSpendingThisYear: '0',
        CarryBudget: '0'
      };

      x.push(body);
    }

    const data = {
      AnnualInvestmentPlanTableDtos: x
    };

    return this.http.post(this.baseUrl + 'CapexsInformations/CreateAnnualInvestmentPlan/' + id + '/' + CapexInformationId, data);
  }

  CreateMonthlyInvestmentPlan_(year, form1, form2, form3, form4, form5, form6, form7, form8, form9, form10,
    id, AnnualInvestmentPlanId, CapexInformationId) {

    // const f1 = form1.get('monthForm_list') as FormArray;
    // const f2 = form2.get('monthForm_list') as FormArray;
    // const f3 = form3.get('monthForm_list') as FormArray;
    // const f4 = form4.get('monthForm_list') as FormArray;
    // const f5 = form5.get('monthForm_list') as FormArray;
    // const f6 = form6.get('monthForm_list') as FormArray;
    // const f7 = form7.get('monthForm_list') as FormArray;
    // const f8 = form8.get('monthForm_list') as FormArray;
    // const f9 = form9.get('monthForm_list') as FormArray;
    // const f10 = form10.get('monthForm_list') as FormArray;
    // console.log(f1);

    const x = [];

    for (let i = 0; i < year.length; i++) {
      if (i === 0) {
        const xx = +form1.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: form1[j].currencyTitle,
            InvestmentCostFx: form1[j].currencyFx,
            AnnualInvestmentPlanId,
            Jan: form1[j].m1,
            Feb: form1[j].m2,
            Mar: form1[j].m3,
            Apr: form1[j].m4,
            May: form1[j].m5,
            Jun: form1[j].m6,
            Jul: form1[j].m7,
            Aug: form1[j].m8,
            Sep: form1[j].m9,
            Oct: form1[j].m10,
            Nov: form1[j].m11,
            Dec: form1[j].m12,
            MonthlyOverall: form1[j].overall,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId
          };
          x.push(body);
        }
      } else if (i === 1) {
        const xx = +form2.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: form2[j].currencyTitle,
            InvestmentCostFx: form2[j].currencyFx,
            AnnualInvestmentPlanId,
            Jan: form2[j].m1,
            Feb: form2[j].m2,
            Mar: form2[j].m3,
            Apr: form2[j].m4,
            May: form2[j].m5,
            Jun: form2[j].m6,
            Jul: form2[j].m7,
            Aug: form2[j].m8,
            Sep: form2[j].m9,
            Oct: form2[j].m10,
            Nov: form2[j].m11,
            Dec: form2[j].m12,
            MonthlyOverall: form2[j].overall,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 2) {
        const xx = +form3.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: form3[j].currencyTitle,
            InvestmentCostFx: form3[j].currencyFx,
            AnnualInvestmentPlanId,
            Jan: form3[j].m1,
            Feb: form3[j].m2,
            Mar: form3[j].m3,
            Apr: form3[j].m4,
            May: form3[j].m5,
            Jun: form3[j].m6,
            Jul: form3[j].m7,
            Aug: form3[j].m8,
            Sep: form3[j].m9,
            Oct: form3[j].m10,
            Nov: form3[j].m11,
            Dec: form3[j].m12,
            MonthlyOverall: form3[j].overall,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 3) {
        const xx = +form4.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: form4[j].currencyTitle,
            InvestmentCostFx: form4[j].currencyFx,
            AnnualInvestmentPlanId,
            Jan: form4[j].m1,
            Feb: form4[j].m2,
            Mar: form4[j].m3,
            Apr: form4[j].m4,
            May: form4[j].m5,
            Jun: form4[j].m6,
            Jul: form4[j].m7,
            Aug: form4[j].m8,
            Sep: form4[j].m9,
            Oct: form4[j].m10,
            Nov: form4[j].m11,
            Dec: form4[j].m12,
            MonthlyOverall: form4[j].overall,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 4) {
        const xx = +form5.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: form5[j].currencyTitle,
            InvestmentCostFx: form5[j].currencyFx,
            AnnualInvestmentPlanId,
            Jan: form5[j].m1,
            Feb: form5[j].m2,
            Mar: form5[j].m3,
            Apr: form5[j].m4,
            May: form5[j].m5,
            Jun: form5[j].m6,
            Jul: form5[j].m7,
            Aug: form5[j].m8,
            Sep: form5[j].m9,
            Oct: form5[j].m10,
            Nov: form5[j].m11,
            Dec: form5[j].m12,
            MonthlyOverall: form5[j].overall,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 5) {
        const xx = +form6.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: form6[j].currencyTitle,
            InvestmentCostFx: form6[j].currencyFx,
            AnnualInvestmentPlanId,
            Jan: form6[j].m1,
            Feb: form6[j].m2,
            Mar: form6[j].m3,
            Apr: form6[j].m4,
            May: form6[j].m5,
            Jun: form6[j].m6,
            Jul: form6[j].m7,
            Aug: form6[j].m8,
            Sep: form6[j].m9,
            Oct: form6[j].m10,
            Nov: form6[j].m11,
            Dec: form6[j].m12,
            MonthlyOverall: form6[j].overall,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 6) {
        const xx = +form7.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: form7[j].currencyTitle,
            InvestmentCostFx: form7[j].currencyFx,
            AnnualInvestmentPlanId,
            Jan: form7[j].m1,
            Feb: form7[j].m2,
            Mar: form7[j].m3,
            Apr: form7[j].m4,
            May: form7[j].m5,
            Jun: form7[j].m6,
            Jul: form7[j].m7,
            Aug: form7[j].m8,
            Sep: form7[j].m9,
            Oct: form7[j].m10,
            Nov: form7[j].m11,
            Dec: form7[j].m12,
            MonthlyOverall: form7[j].overall,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 7) {
        const xx = +form8.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: form8[j].currencyTitle,
            InvestmentCostFx: form8[j].currencyFx,
            AnnualInvestmentPlanId,
            Jan: form8[j].m1,
            Feb: form8[j].m2,
            Mar: form8[j].m3,
            Apr: form8[j].m4,
            May: form8[j].m5,
            Jun: form8[j].m6,
            Jul: form8[j].m7,
            Aug: form8[j].m8,
            Sep: form8[j].m9,
            Oct: form8[j].m10,
            Nov: form8[j].m11,
            Dec: form8[j].m12,
            MonthlyOverall: form8[j].overall,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 8) {
        const xx = +form9.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: form9[j].currencyTitle,
            InvestmentCostFx: form9[j].currencyFx,
            AnnualInvestmentPlanId,
            Jan: form9[j].m1,
            Feb: form9[j].m2,
            Mar: form9[j].m3,
            Apr: form9[j].m4,
            May: form9[j].m5,
            Jun: form9[j].m6,
            Jul: form9[j].m7,
            Aug: form9[j].m8,
            Sep: form9[j].m9,
            Oct: form9[j].m10,
            Nov: form9[j].m11,
            Dec: form9[j].m12,
            MonthlyOverall: form9[j].overall,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      } else if (i === 9) {
        const xx = +form10.length;
        for (let j = 0; j < xx; j++) {
          const body = {
            InvestmentCost: form10[j].currencyTitle,
            InvestmentCostFx: form10[j].currencyFx,
            AnnualInvestmentPlanId,
            Jan: form10[j].m1,
            Feb: form10[j].m2,
            Mar: form10[j].m3,
            Apr: form10[j].m4,
            May: form10[j].m5,
            Jun: form10[j].m6,
            Jul: form10[j].m7,
            Aug: form10[j].m8,
            Sep: form10[j].m9,
            Oct: form10[j].m10,
            Nov: form10[j].m11,
            Dec: form10[j].m12,
            MonthlyOverall: form10[j].overall,
            YearOfMonth: year[i],
            CapexInformationId: CapexInformationId

          };
          x.push(body);
        }
      }
    }

    const data = {
      MonthlyInvestmentPlanTableDtos: x
    };

    // console.log(data);


    return this.http.post(this.baseUrl + 'CapexsInformations/CreateMonthlyInvestmentPlan/' + id + '/' + CapexInformationId, data);

  }



  GetCapexsInformationBySubmit(id): Observable<any> {

    return this.http.get<any>(this.baseUrl + 'CapexsInformations/GetCapexsInformationBySubmit/' + id);
  }

  PutUpdateCapexsinformations(
    StartingDate: string,
    ProjecctComRun: string,
    ActionYear: string,
    ProjectExePeriodYear: string,
    ProjectExePeriodMonth: string,
    CostCenterOfVP: string,
    CodeCostCenterOfVP: string,
    ProjectCost: string,
    ReasonOfChanging: string,
    BudgetPeriod: string,
    BetweenYear: string,
    TransferForm: string,
    PoolBudgetForm: string,
    SubmitTo: string,
    Revistion: string,
    CapexType: string,
    BudgetYear: string,
    CapexStatus: string,
    IsMaxApprovedRev: string,
    Sequent: string,
    ExistingBudget: string,
    SpendingActual: string,
    AdditionalCost: string,
    ReturnCost: string,
    AvailableBudget: string,
    PoolId: string,
    id: string,
    capexid: string,
    AvailableBudgetPool: string,
    manager: string,
    projectManager: string
  ): Observable<any> {

    const body = {
      StartingDate: this.convertDate(StartingDate),
      ProjecctComRun: this.convertDate(ProjecctComRun),
      ActionYear: this.convertDate(ActionYear),
      ProjectExePeriodYear,
      ProjectExePeriodMonth,
      CostCenterOfVP,
      CodeCostCenterOfVP,
      ProjectCost,
      ReasonOfChanging,
      BudgetPeriod,
      BetweenYear,
      TransferForm,
      PoolBudgetForm,
      SubmitTo,
      Revistion,
      CapexType,
      BudgetYear,
      CapexStatus,
      IsMaxApprovedRev,
      Sequent,
      ExistingBudget,
      SpendingActual,
      AdditionalCost,
      ReturnCost,
      AvailableBudget,
      AvailableBudgetPool,
      PoolId
    };

    if (manager === '') { manager = '-'; }
    if (projectManager === '') { projectManager = '-'; };
    return this.http.put<Capexs>(this.baseUrl + 'CapexsInformations/' + id + '/' + capexid + '/' + PoolId + '/' + AvailableBudgetPool + '/' + manager + '/' + projectManager, body)
  }

  PutUpdateCapexsPOOL(
    PoolId,
    AvailableBudgetPool
  ): Observable<any> {

    // console.log("PoolId >> " + PoolId);
    // console.log("AvailableBudgetPool >> " + AvailableBudgetPool);
    // console.log("Link >> " + this.baseUrl + 'CapexsInformations/UpdateRejectpool/' + PoolId + '/' + AvailableBudgetPool)

    // return this.http.put<any>(this.baseUrl + 'CapexsInformations/UpdateRejectpool/' + PoolId + '/' + AvailableBudgetPool, null);
    return this.http.get<any>(this.baseUrl + 'CapexsInformations/UpdateRejectpool/' + PoolId + '/' + AvailableBudgetPool);
  }


  GetPoolInnitiative(pooltype: string, year: number, initiativeId: number): Observable<any> {

    return this.http.get<any>(this.baseUrl + 'CapexsInformations/GetPoolInnitiative/' + pooltype + '/' + year + '/' + initiativeId);
  }

  GetPoolInnitiativeByID(poolid: string): Observable<any> {

    return this.http.get<any>(this.baseUrl + 'CapexsInformations/GetPoolInnitiativeByID/' + poolid);
  }

  GetMonthlyInvestmentPlanByYear(id, year): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'CapexsInformations/GetMonthlyInvestmentPlanByYear/' + id + '/' + year);
  }

  createMainPlant(data: Array<MainPlant>): Observable<Array<MainPlant>> {
    const endpointUrl = this.baseUrl + 'EMOC/MainPlant/' + this.initiativeService.id;
    return this.http.post<Array<MainPlant>>(endpointUrl, data);
  }

}
