import { ProgressService } from './../progress/progress.service';
import { CapexService } from '@services/capex/capex.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { environment } from '@environments/environment';
import { AuditService } from '@services/audit/audit.service';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { SubmitService } from '@services/submit/submit.service';
import { SwalTool } from '@tools/swal.tools';
import { DetailService } from '../detail/detail.service';
import { MainPlant } from '@models/MainPlant';
import { Observable } from 'rxjs';
import { RiskService } from '@services/risk/risk.service';
import { ResourceNeededService } from '@services/resource-needed/resource-needed.service';
import { Detail } from '@models/detail';
import { DetailInformation } from '@models/detailInformation';
import { LessonLearnApiService } from '@services/lesson-learn-api/lesson-learn-api.service';
import { LessonLearnTableDataService } from '@services/lesson-learn-table-data/lesson-learn-table-data.service';
import { BestPracticeService } from '@services/best-practice/best-practice.service';
import { LookbackService } from '@services/lookback/lookback.service';
import { Initiative } from '@models/initiative';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PimService {
  baseUrl = environment.apiUrl;

  annualInvestmentPlanId: string;
  constructor(
    private http: HttpClient,
    private submitService: SubmitService,
    private swalTool: SwalTool,
    private initiativeService: InitiativeService,
    private detailInformationService: DetailInformationService,
    private detailService: DetailService,
    private auditService: AuditService,
    private capexService: CapexService,
    private progressService: ProgressService,
    private riskService: RiskService,
    private resouceNeedService: ResourceNeededService,
    private lessonLearnService: LessonLearnApiService,
    private lessonLearnTableDataService: LessonLearnTableDataService,
    private bestpracticeService: BestPracticeService,
    private lookBackService: LookbackService,
    private router: Router

  ) { this.annualInvestmentPlanId = '1111'; }

  get requestHeaders(): {
    headers: HttpHeaders | { [header: string]: string | string[] };
  } {
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
    });
    return { headers };
  }

  SaveDraftSubmitPim(formGroup: FormGroup, type: string, historyId) {
    this.initiativeService.SavingData = true;
    this.swalTool.savingLoading(type);
    let capexInformationId = formGroup.get('capexInformationForm') ? formGroup.get('capexInformationForm').get('capexInformationId').value : null;
    let resourceNeedId = formGroup.get("resourceNeededForm") ? formGroup.get("resourceNeededForm").get("id").value : null;
    let detailMaxId = formGroup.get('DetailMaxForm') ? formGroup.get('DetailMaxForm').get('id').value : null;
    let bestPracticeId = formGroup.get("bestPracticeForm") ? formGroup.get("bestPracticeForm").get("id").value : null;
    let LookbackId = formGroup.get('lookbackForm') ? formGroup.get('lookbackForm').get('ProjectLookbackId').value : null;

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

    //save Resource need
    let saveResourceNeed = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (resourceNeedId == 0) {
        // create capex information
        this.resouceNeedService.InsertFormsToDatabase((formGroup.get("resourceNeededForm") as FormGroup).getRawValue()).subscribe((createResourceNeedResponse) => {
          formGroup.get("resourceNeededForm").get("id").setValue(createResourceNeedResponse.id);
          return resolve(true);
        },
          (error) => {
            console.log("create resourceNeed error", error);
            return reject();
          }
        );
      } else if (resourceNeedId > 0) {
        //update draft
        this.resouceNeedService.UpdateResource(resourceNeedId, (formGroup.get("resourceNeededForm") as FormGroup).getRawValue()).subscribe((updateResourceNeedResponse) => {
          return resolve(true);
        },
          (error) => {
            console.log("update resourceNeed error", error);
            return reject();
          }
        );
      } else {
        return resolve(true);
      }
    });

    let saveRisk = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (this.riskService.riskData && this.riskService.riskData.length > 0) {
        this.riskService.InsertFormsToDatabase(this.riskService.riskData).subscribe((insertRiskRes) => {
          return resolve(true);
        },
          (error) => {
            console.log("insert risk error", error);
            return reject();
          }
        );
      } else {
        return resolve(true);
      }
    });

    let saveCoDev = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      const generalData: Initiative = (formGroup.get('initiativesForm') as FormGroup).getRawValue();
      this.initiativeService.UpdateCoDeveloper(this.initiativeService.id, generalData.coDeveloper).subscribe(() => {
        return resolve(true);
      }, error => {
        console.log('create CoDev', error);
        return reject();
      });
    })


    let saveDetailPimForm = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (formGroup.get('detailPimForm') && !formGroup.get('DetailMaxForm')) {
        if (formGroup.get('detailPimForm').get('id').value === 0) {
          this.detailInformationService.CreateDetailInformation(this.initiativeService.id, (formGroup.get('detailPimForm') as FormGroup).getRawValue()).subscribe(res => {
            formGroup.get('detailPimForm').get('id').patchValue(res.id);
            return resolve(true);
          }, error => { return reject(error); });
        }
        else {
          this.detailInformationService.UpdateDetailInformation(this.initiativeService.id, (formGroup.get('detailPimForm') as FormGroup).getRawValue()).subscribe(res => {
            return resolve(true);
          }, error => { return reject(error); });
        }
      } else if (formGroup.get('detailPimForm') && formGroup.get('DetailMaxForm')) {

        let detailInfomation: DetailInformation;
        if (formGroup.get('detailPimForm')) {
          detailInfomation = this.initiativeService.mergeDetail(formGroup);
        } else {
          detailInfomation = (formGroup.get('DetailMaxForm') as FormGroup).getRawValue();
        }

        //update draft
        this.detailInformationService.UpdateDetailInformation(this.initiativeService.id, detailInfomation).subscribe((updateDetailInformationResponse) => {
          return resolve(true);
        }, error => {
          console.log('update detail error', error);
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

    let saveGate4Form = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (formGroup.get('gate4Form')) {
        if (formGroup.get('gate4Form').get('pimGateId').value === 0) {
          formGroup.get('gate4Form').get('gate').patchValue(4);
          this.detailService.CreateDetailPimGate((formGroup.get('gate4Form') as FormGroup).getRawValue(), this.initiativeService.id).subscribe(res => {
            formGroup.get('gate4Form').get('pimGateId').patchValue(res.pimGateId);
            return resolve(true);
          }, error => { return reject(error); });
        } else {
          formGroup.get('gate4Form').get('gate').patchValue(4);
          this.detailService.UpdateDetailPimGate(this.initiativeService.id, (formGroup.get('gate4Form') as FormGroup).getRawValue()).subscribe(res => {
            return resolve(true);
          }, error => { return reject(error); });
        }
      } else {
        return resolve(true);
      }

    });

    let saveCapex = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (capexInformationId == 0) {
        // create capex information
        this.capexService.CreateCapexsInfoNewEngine(formGroup.get('capexInformationForm') as FormGroup).then((createResponse) => {
          if (createResponse) {
            formGroup.get('capexInformationForm').get('capexInformationId').setValue(createResponse.capexInformationId);
            if (formGroup.get('capexInformationForm').get('AnnualForm')) {
              this.capexService.CreateAnnualInvestmentPlanNewEngine(this.initiativeService.id, formGroup.get('capexInformationForm').get('AnnualForm'), createResponse.capexInformationId, "submit", 'Createnew').then((createAnnualResponse) => {
                if (createAnnualResponse) {
                  this.capexService.CreateMonthlyInvestmentPlanNewEngine(this.annualInvestmentPlanId, formGroup.get('capexInformationForm') as FormGroup).then((createMonthlyInvestmentPlan) => {
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
    //       if (res) {
    //         return resolve(true);
    //       }
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
            if (createBestPracticeResponse) {
              formGroup.get("bestPracticeForm").get("id").setValue(createBestPracticeResponse.id);
              return resolve(true);
            }
          },
            (error) => {
              console.log("saveBestPractice error", error);
              return reject();
            }
          );
        } else {
          console.log("saveBestPractice update");


          this.bestpracticeService.updateBestPractice((formGroup.get("bestPracticeForm") as FormGroup).getRawValue()).subscribe((updateBestPracticeResponse) => {
            if (updateBestPracticeResponse) {
              return resolve(true);
            }
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

    //lookback
    let saveLookback = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (formGroup.get('lookbackForm')) {
        if (LookbackId == 0) {
          //create
          this.lookBackService.CreatePlanLookback((formGroup.get('lookbackForm') as FormGroup).getRawValue()).then(r => {
            console.log(r);
            formGroup.get('lookbackForm').get('ProjectLookbackId').setValue(r);
            return resolve(true);
            // this.getPlanlookbackList();
          }).catch(e => {
            return reject();
          });
        } else {
          //update
          this.lookBackService.UpdatePlanLookback((formGroup.get('lookbackForm') as FormGroup).getRawValue()).then(r => {
            console.log(r);
            return resolve(true);
          }).catch(e => {
            return reject();
          });
        }
      } else {
        return resolve(true);
      }
    });






    console.log('saveGeneral', saveGeneral);
    console.log('saveDetailPimForm', saveDetailPimForm);
    console.log('saveCapex', saveEMoc);
    console.log('saveCapex', saveCapex);
    console.log('saveMileStone', saveMileStone);
    console.log('saveProgressForm', saveProgressForm);
    console.log('saveOutStanding', saveOutStanding);
    console.log('saveBscForm', saveBscForm);
    console.log('saveBscForm', saveGate1Form);
    console.log('saveBscForm', saveGate3Form);
    console.log('saveRisk', saveRisk);
    console.log('saveResourceNeesd', saveResourceNeed);

    Promise.all([
      saveGeneral,
      saveDetailPimForm,
      saveEMoc,
      saveResourceNeed,
      saveRisk,
      saveCoDev,
      saveCapex,
      saveMileStone,
      saveProgressForm,
      saveOutStanding,
      saveBscForm,
      saveGate1Form,
      saveGate2Form,
      saveGate3Form,
      saveGate4Form,
      // saveLessonLern,
      saveLookback,
      saveBestPractice
      // saveDetailMaxForm
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

  // SaveDraftSubmitPimOld(formGroup: FormGroup, type: string) {
  //   // this.SavePim(formGroup);
  //   this.submitService.SubmitStageStatus(this.initiativeService.id, formGroup.get('submitToForm').value).subscribe(async () => {
  //     await this.initiativeService.PutUpdateByUser(this.initiativeService.id);
  //     await this.auditService.CallAuditLog(this.initiativeService.id);
  //     this.swalTool.Submit();
  //   }, error => {
  //     console.log('SubmitStageStatus error', error);
  //     this.swalTool.Error(error);
  //   });
  // }


  mergeDetail(formGroup: FormGroup) {
    let detail: DetailInformation = formGroup.get('DetailMaxForm').value;
    let detailPim: DetailInformation = formGroup.get('detailPimForm').value;
    detail.kickoffMeeting = detailPim.kickoffMeeting;
    //gate
    detail.gate1Date = detailPim.gate1Date;
    detail.gate2Date = detailPim.gate2Date;
    detail.gate3Date = detailPim.gate3Date;




    //Pim detail
    detail.simProjectSkipGate2 = detailPim.simProjectSkipGate2;
    //EMOC
    detail.useExternalEmoc = detailPim.useExternalEmoc;
    detail.externalEmoc = detailPim.externalEmoc;
    detail.attachProcess = detailPim.attachProcess;
    detail.attachPlotPlanSite = detailPim.attachPlotPlanSite;
    detail.attachReference = detailPim.attachReference;
    detail.attachBenefit = detailPim.attachBenefit;
    //simple
    detail.isSimProjectSkipGate2 = detailPim.isSimProjectSkipGate2;

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


  postInitiativeDetail<T>(details: any) {
    const endpointUrl = `${this.baseUrl}detail`;
    let data = JSON.stringify(details);
    return this.http.post<T>(endpointUrl, data, this.requestHeaders);
  }

  postPlants<T>(details: any) {
    const endpointUrl = `${this.baseUrl}mainplant`;
    let data = JSON.stringify(details);
    return this.http.post<T>(endpointUrl, data, this.requestHeaders);
  }

  createMainPlant(data: Array<MainPlant>): Observable<Array<MainPlant>> {
    const endpointUrl = this.baseUrl + 'EMOC/MainPlant/' + this.initiativeService.id;
    return this.http.post<Array<MainPlant>>(endpointUrl, data);
  }

  createEmoc(data: Array<MainPlant>): Observable<Array<MainPlant>> {
    const endpointUrl = this.baseUrl + 'EMOC/CreateEmoc/' + this.initiativeService.id;
    return this.http.post<Array<MainPlant>>(endpointUrl, data);
  }

  getMainPlant(): Observable<Array<MainPlant>> {
    const endpointUrl = this.baseUrl + 'EMOC/MainPlant/' + this.initiativeService.id;
    return this.http.get<Array<MainPlant>>(endpointUrl);
  }

  getOwner<T>() {
    const endpointUrl = `${this.baseUrl}owner`;
    return this.http.get<T>(endpointUrl, this.requestHeaders);
  }

  async deleteMainPlant(MainPlantId: number): Promise<number> {
    const endpointUrl = this.baseUrl + 'EMOC/DeleteMainPlant/' + MainPlantId;
    return await (this.http.delete<number>(endpointUrl).toPromise());
  }
}
