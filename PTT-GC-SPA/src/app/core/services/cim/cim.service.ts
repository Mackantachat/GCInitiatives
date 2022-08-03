import { environment } from "./../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup, FormArray } from "@angular/forms";
import { InitiativeService } from "@services/initiative/initiative.service";
import { DetailService } from "@services/detail/detail.service";
import { RiskService } from "@services/risk/risk.service";
import { ProgressService } from "@services/progress/progress.service";
import { Detail } from "@models/detail";
import { Observable } from "rxjs";
import { Product } from "@models/product";
import { SwalTool } from "@tools/swal.tools";
import { ResourceNeededService } from "@services/resource-needed/resource-needed.service";
import { SubmitService } from "@services/submit/submit.service";
import { getNameOfDeclaration } from "typescript";
import { AuditService } from "@services/audit/audit.service";
import { BestPracticeService } from "@services/best-practice/best-practice.service";
import { CapexService } from '@services/capex/capex.service';
import { LessonLearnApiService } from '@services/lesson-learn-api/lesson-learn-api.service';
import { LessonLearnTableDataService } from '@services/lesson-learn-table-data/lesson-learn-table-data.service';
import { LookbackService } from "@services/lookback/lookback.service";
import { DetailInformation } from "@models/detailInformation";
import { DetailInformationService } from "@services/detail-information/detail-information.service";
import { Initiative } from "@models/initiative";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { PimService } from '@services/pim/pim.service';

@Injectable({
  providedIn: "root",
})
export class CimService {
  baseUrl: string = environment.pathUrl;
  annualInvestmentPlanId: string;
  constructor(
    private initiativeService: InitiativeService,
    private detailService: DetailService,
    private http: HttpClient,
    private swalTool: SwalTool,
    private resouceNeedService: ResourceNeededService,
    private riskService: RiskService,
    private submitService: SubmitService,
    private progressService: ProgressService,
    private auditService: AuditService,
    private bestpracticeService: BestPracticeService,
    private capexService: CapexService,
    private lessonLearnService: LessonLearnApiService,
    private lessonLearnTableDataService: LessonLearnTableDataService,
    private detailInformationService: DetailInformationService,
    private lookBackService: LookbackService,
    private router: Router,
    private pimService: PimService,
  ) { this.annualInvestmentPlanId = '1111'; }

  SaveDraftAndSubmit(formGroup: FormGroup, type: string, historyId) {
    this.initiativeService.SavingData = true;
    this.swalTool.savingLoading(type);
    let detailId = formGroup.get("initiativesDetailForm") ? formGroup.get("initiativesDetailForm").get("id").value : null;
    let resourceNeedId = formGroup.get("resourceNeededForm") ? formGroup.get("resourceNeededForm").get("id").value : null;
    let riskArray = formGroup.get("riskForm") ? (formGroup.get("riskForm") as FormArray) : null;
    let progressArray = formGroup.get("progessForm") ? (formGroup.get("progessForm").get("details") as FormArray) : null;
    let bestPracticeId = formGroup.get("bestPracticeForm") ? formGroup.get("bestPracticeForm").get("id").value : null;
    let capexInformationId = formGroup.get('capexInformationForm') ? formGroup.get('capexInformationForm').get('capexInformationId').value : null;
    let LookbackId = formGroup.get('lookbackForm') ? formGroup.get('lookbackForm').get('ProjectLookbackId').value : null;

    console.log("detailId", detailId);
    console.log("resourceNeedId", resourceNeedId);
    console.log("riskArray", riskArray);
    // console.log("progressArray", progessArray);

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
      if (detailId == 0) {
        console.log("detail max = 0");
        //create draft
        this.CreateInitiativeDetail(this.initiativeService.id, formGroup.get("initiativesDetailForm").value).subscribe(
          (createDetailResponse) => {
            console.log(createDetailResponse);
            if (createDetailResponse) {
              formGroup.get("initiativesDetailForm").get("id").setValue(createDetailResponse.id);
              if (formGroup.get("initiativesDetailForm").get("milestoneForm") && !formGroup.get('progressForm')) {
                this.CreateProgressAndMilestone(this.initiativeService.id, formGroup.get("initiativesDetailForm").get("milestoneForm").value).subscribe();
                //this.progressService.CreateProgress(this.initiativeService.id, (formGroup.get("initiativesDetailForm").get("milestoneForm") as FormGroup).getRawValue()).subscribe((res) => { });
              }
              if (formGroup.get("initiativesDetailForm").get("financialForm"))
                this.CreateInitiativeFinancialIndicator(this.initiativeService.id, formGroup.get("initiativesDetailForm").get("financialForm").value).subscribe();
              if (formGroup.get("initiativesDetailForm").get("financialAvgForm"))
                this.CreateInitiativeFinancial(this.initiativeService.id, formGroup.get("initiativesDetailForm").get("financialAvgForm").value).subscribe();
              if (this.initiativeService.initiativeType == "cim") {
                if (formGroup.get("initiativesDetailForm").get("productForm"))
                  this.CreateInitiativeProduct(this.initiativeService.id, formGroup.get("initiativesDetailForm").get("productForm").value).subscribe();
              }
              return resolve(true);
            }
          },
          (error) => {
            console.log("create detail error", error);
            return reject();
          }
        );
      } else if (detailId > 0) {
        //update draft
        console.log("update detail");
        this.UpdateInitiativeDetail(this.initiativeService.id, formGroup.get("initiativesDetailForm").value).subscribe((updateDetailInformationResponse) => {
          if (updateDetailInformationResponse) {
            if (formGroup.get("initiativesDetailForm").get("milestoneForm") && !formGroup.get('progressForm')) {
              this.CreateProgressAndMilestone(this.initiativeService.id, formGroup.get("initiativesDetailForm").get("milestoneForm").value).subscribe();
              //this.progressService.CreateProgress(this.initiativeService.id, (formGroup.get("initiativesDetailForm").get("milestoneForm") as FormGroup).getRawValue()).subscribe((res) => { });
            }
            if (formGroup.get("initiativesDetailForm").get("financialForm"))
              this.CreateInitiativeFinancialIndicator(this.initiativeService.id, formGroup.get("initiativesDetailForm").get("financialForm").value).subscribe();
            if (formGroup.get("initiativesDetailForm").get("financialAvgForm"))
              this.CreateInitiativeFinancial(this.initiativeService.id, formGroup.get("initiativesDetailForm").get("financialAvgForm").value).subscribe();
            if (this.initiativeService.initiativeType == "cim") {
              if (formGroup.get("initiativesDetailForm").get("productForm"))
                this.CreateInitiativeProduct(this.initiativeService.id, formGroup.get("initiativesDetailForm").get("productForm").value).subscribe();
            }
            return resolve(true);
          }
        },
          (error) => {
            console.log("update detail error", error);
            return reject();
          }
        );
      } else {
        return resolve(true);
      }
    });

    //-------- capex --------
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
    //-----------------------

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
      if (
        this.riskService.riskData &&
        this.riskService.riskData.length > 0
      ) {
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

    // let saveProgress = new Promise((resolve, reject) => {
    //   if (progressArray && progressArray.length > 0) {
    //     console.log('progress in')
    //     //update draft
    //     this.progressService.CreateProgressDetail(this.initiativeService.id, formGroup.get('progressForm').value).subscribe((createProgressDetailResponse) => {
    //       // if (createProgressDetailResponse) {
    //       resolve(true)
    //       // }
    //     }, error => {
    //       console.log('CreateProgressDetail error', error);
    //       return reject();
    //     });
    //   } else {
    //     resolve(true);
    //   }
    // });

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

    let saveBestPractice = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (formGroup.get("bestPracticeForm")) {
        if (bestPracticeId == 0) {
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


    //lookback
    let saveLookback = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (formGroup.get('lookbackForm')) {
        if (LookbackId == 0) {
          //create
          this.lookBackService.CreatePlanLookback((formGroup.get('lookbackForm') as FormGroup).getRawValue()).then(r => {
            formGroup.get('lookbackForm').get('ProjectLookbackId').setValue(r);
            return resolve(true);
            // this.getPlanlookbackList();
          }).catch(e => {
            return reject();
          });
        } else {
          //update
          this.lookBackService.UpdatePlanLookback((formGroup.get('lookbackForm') as FormGroup).getRawValue()).then(r => {
            return resolve(true);
          }).catch(e => {
            return reject();
          });
        }
      } else {
        return resolve(true);
      }
    });

    console.log(saveLookback);
    console.log('saveCapex', saveEMoc);


    Promise.all([
      saveGeneral,
      saveCoDev,
      saveDetail,
      saveResourceNeed,
      saveRisk,
      saveBestPractice,
      saveMileStone,
      saveProgressForm,
      saveOutStanding,
      saveBscForm,
      saveCapex,
      saveDetailPimForm,
      saveLookback,
      saveEMoc,
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


  CreateProgressAndMilestone(id, milestoneForm): Observable<any> {
    let data = this.convertTimeMileStome(milestoneForm);
    return this.http.post<any>(this.baseUrl + "api/initiative/ProgressAndMilestone/" + id, data);
  }

  CreateInitiativeFinancialIndicator(id, financialForm): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "api/initiative/FinancialIndicator/" + id,
      financialForm
    );
  }

  CreateInitiativeFinancial(id, financialAvgForm): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "api/initiative/Financial/" + id,
      financialAvgForm
    );
  }

  CreateInitiativeProduct(id, productForm): Observable<Product> {
    return this.http.post<Product>(
      this.baseUrl + "api/initiative/Product/" + id,
      productForm
    );
  }

  CreateInitiativeDetail(id, detailForm): Observable<any> {
    let data = this.convertTime(detailForm);
    return this.http.post<Detail>(this.baseUrl + "api/initiative/Detail/" + id, data);
  }


  UpdateInitiativeDetail(id, detailForm): Observable<any> {
    let data = this.convertTime(detailForm);
    return this.http.put<Detail>(this.baseUrl + "api/initiative/Detail/" + id, data);
  }

  convertTime(formData: any) {
    let returnData: any = formData;
    let field = ['boD1', 'boD2'];
    field.forEach((fData) => {
      if (formData[fData] && formData[fData] != null) {
        formData[fData] = new Date(formData[fData]);
        returnData[fData] = new Date(Date.UTC(
          formData[fData].getFullYear(),
          formData[fData].getMonth(),
          formData[fData].getDate(), 0, 0, 0));
      }
    });
    if (formData['firstBudgetYear'] && typeof (formData['firstBudgetYear']) != 'string' && typeof (formData['firstBudgetYear']) != 'number') {
      let year = new Date(formData['firstBudgetYear']);
      returnData['firstBudgetYear'] = new Date(Date.UTC(
        year.getFullYear(),
        year.getMonth(),
        year.getDate(), 0, 0, 0)).getFullYear().toString();
    }

    console.log('returnData>>', returnData)
    return returnData;
  }

  //mileStone
  convertTimeMileStome(formData) {
    let returnData: any = formData;
    let field = ['start', 'planFinish', 'actualFinish'];
    if (formData.progressDetails && formData.progressDetails.length > 0) {
      formData.progressDetails.forEach((data, index) => {
        field.forEach((fData) => {
          if (formData.progressDetails[index][fData] != null) {
            formData.progressDetails[index][fData] = new Date(formData.progressDetails[index][fData]);
            returnData.progressDetails[index][fData] = new Date(Date.UTC(
              data[fData].getFullYear(),
              data[fData].getMonth(),
              data[fData].getDate(), 0, 0, 0));
          }
        });
      })
    }
    return returnData;
  }
}
