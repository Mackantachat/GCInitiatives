import { HandoverModel } from './../../models/handoverModel';
import { ProgressService } from '@services/progress/progress.service';
import { CapexService } from './../capex/capex.service';
import { ImpactService } from './../impact/impact.service';
import { MaxService } from '@services/max/max.service';
import { AuditService } from '@services/audit/audit.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { FormGroup, FormArray } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { SubmitService } from '@services/submit/submit.service';
import { SwalTool } from '@tools/swal.tools';
import { LessonLearnApiService } from '@services/lesson-learn-api/lesson-learn-api.service';
import { LessonLearnTableDataService } from '@services/lesson-learn-table-data/lesson-learn-table-data.service';
import { BestPracticeService } from '@services/best-practice/best-practice.service';
import { DetailInformation } from '@models/detailInformation';
import { Initiative } from '@models/initiative';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PimService } from '@services/pim/pim.service';

@Injectable({
  providedIn: 'root'
})

export class DimService {

  baseUrl = environment.apiUrl;
  annualInvestmentPlanId: string;

  constructor(
    private http: HttpClient,
    private initiativeService: InitiativeService,
    private detailinformationService: DetailInformationService,
    private auditService: AuditService,
    private submitService: SubmitService,
    private swalTool: SwalTool,
    private maxService: MaxService,
    private impactService: ImpactService,
    private capexService: CapexService,
    private progressService: ProgressService,
    private lessonLearnService: LessonLearnApiService,
    private lessonLearnTableDataService: LessonLearnTableDataService,
    private bestpracticeService: BestPracticeService,
    private router: Router,
    private pimService: PimService,
  ) { this.annualInvestmentPlanId = '1111'; }



  saveDraftSubmitDim(formGroup: FormGroup, type: string, historyId) {
    this.initiativeService.SavingData = true;
    this.swalTool.savingLoading(type);
    let detailForm = formGroup.get('DetailMaxForm');
    let capexInformationId = formGroup.get('capexInformationForm') ? formGroup.get('capexInformationForm').get('capexInformationId').value : null;
    let impactId = formGroup.get('ImpactForm') ? formGroup.get('ImpactForm').get('id').value : null;
    let bestPracticeId = formGroup.get("bestPracticeForm") ? formGroup.get("bestPracticeForm").get("id").value : null;

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


    let saveDimDetail = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (detailForm && detailForm.value.id === 0) {

        //case include pim detail tab
        let detailInfomation: DetailInformation = {} as DetailInformation;
        if (formGroup.get('detailPimForm')) {
          detailInfomation = this.initiativeService.mergeDetail(formGroup);
        } else {
          // detailInfomation = formGroup.get('DetailMaxForm').value;
          let DetailForm = formGroup.get('DetailMaxForm') as FormGroup;
          detailInfomation = DetailForm.getRawValue();
        }

        this.detailinformationService.CreateDetailInformation(this.initiativeService.id, detailInfomation).subscribe(async res => {
          formGroup.get('DetailMaxForm').get('id').setValue(res.id);
          this.SaveMaxApprover(formGroup);
          if (detailForm.get('projectSponsor')?.value) {
            // this.CreateProjectSponsor(this.initiativeService.id, detailForm.get('projectSponsor').value).subscribe(() => { });
            await this.CreateProjectSponsor_Promise([detailForm.get('projectSponsor').value]);
          }
          if (detailForm.get('iTFocalPoint')?.value) {
            // this.CreateITFocalPoint(this.initiativeService.id, detailForm.get('iTFocalPoint').value).subscribe(() => { });
            let iTFocalPoint: string[] = [];
            iTFocalPoint.push(detailForm.get('iTFocalPoint').value);
            await this.CreateITFocalPoint_Promise(iTFocalPoint);
          }
          if (detailForm.get('impactedParties')?.value) {

            // this.CreateImpactedParties(this.initiativeService.id, detailForm.get('impactedParties').value).subscribe(() => { });
            await this.CreateImpactedParties_Promise(detailForm.get('impactedParties').value);
          }
          if (detailForm.get('teamMember')?.value) {
            // this.CreateTeamMember(this.initiativeService.id, detailForm.get('teamMember').value).subscribe(() => { });
            await this.CreateTeamMember_Promise(detailForm.get('teamMember').value);
          }

          if (detailForm.get('digitalFocalPoint')?.value) {
            await this.CreateDigitalFocalPoint_Promise([detailForm.get('digitalFocalPoint').value]);
          }

          return resolve(true);
        });
      }
      else if (detailForm && detailForm.value.id > 0) {

        //case include pim detail tab
        let detailInfomation: DetailInformation = {} as DetailInformation;
        if (formGroup.get('detailPimForm')) {
          detailInfomation = this.initiativeService.mergeDetail(formGroup);
        } else {
          // detailInfomation = formGroup.get('DetailMaxForm').value;
          let DetailForm = formGroup.get('DetailMaxForm') as FormGroup;
          detailInfomation = DetailForm.getRawValue();
        }

        this.detailinformationService.UpdateDetailInformation(this.initiativeService.id, detailInfomation).subscribe(async res => {

          this.SaveMaxApprover(formGroup);

          if (detailForm.get('projectSponsor')?.valid) {
            // this.CreateProjectSponsor(this.initiativeService.id, detailForm.get('projectSponsor').value).subscribe(() => { });
            await this.CreateProjectSponsor_Promise([detailForm.get('projectSponsor').value]);
          }
          if (detailForm.get('iTFocalPoint')?.valid) {
            // this.CreateITFocalPoint(this.initiativeService.id, detailForm.get('iTFocalPoint').value).subscribe(() => { });
            let iTFocalPoint: string[] = [];
            iTFocalPoint.push(detailForm.get('iTFocalPoint').value);
            await this.CreateITFocalPoint_Promise(iTFocalPoint);
          }
          if (detailForm.get('impactedParties')?.valid) {
            // this.CreateImpactedParties(this.initiativeService.id, detailForm.get('impactedParties').value).subscribe(() => { });
            await this.CreateImpactedParties_Promise(detailForm.get('impactedParties').value);
          }
          if (detailForm.get('teamMember')?.valid) {
            // this.CreateTeamMember(this.initiativeService.id, detailForm.get('teamMember').value).subscribe(() => { });
            await this.CreateTeamMember_Promise(detailForm.get('teamMember').value);
          }

          if (detailForm.get('digitalFocalPoint')?.valid) {
            await this.CreateDigitalFocalPoint_Promise([detailForm.get('digitalFocalPoint').value]);
          }

          return resolve(true);
        });
      }
      else {
        return resolve(true);
      }
    })

    let saveCapex = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      if (formGroup.get('capexInformationForm')) {
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
                      console.log('save capex');
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
      }
      else {
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

    let saveHandover = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }
      // if (formGroup.get('DimHandoverForm').get('startDate').value !== null && formGroup.get('DimHandoverForm').get('finishDate').value !== null) {
      if (formGroup.get('DimHandoverForm').get('id').value == 0) {
        this.CreateHandover((formGroup.get('DimHandoverForm') as FormGroup).getRawValue()).subscribe((response) => {
          console.log('Handover create response >>', response);
          formGroup.get('DimHandoverForm').get('id').setValue(response);
          return resolve(true);
        }, error => {
          console.log(error)
          return reject();
        }
        );
      }
      else {
        this.UpdateHandover(formGroup.get('DimHandoverForm').value).subscribe(response => {
          console.log('Handover update response >>', response);
          return resolve(true);
        }, error => {
          console.log(error)
          return reject();
        });
      }
      // } else {
      //   return resolve(true);
      // }
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

    console.log(saveEMoc);

    Promise.all([
      saveGeneral,
      saveDimDetail,
      saveEMoc,
      saveCapex,
      saveImpact,
      saveProgressForm,
      saveHandover,
      saveMileStone,
      saveCoDev,
      saveBestPractice,
      saveBscForm,
      saveOutStanding
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


  SaveMaxApprover(formGroup: FormGroup) {
    if (formGroup.get('DetailMaxForm').get('workstreamLead') && formGroup.get('DetailMaxForm').get('workstreamLead').value) this.maxService.CreateWorkstreamLead(this.initiativeService.id, { email: formGroup.get('DetailMaxForm').get('workstreamLead').value }).subscribe(() => { });
    if (formGroup.get('DetailMaxForm').get('sponsorEvp') && formGroup.get('DetailMaxForm').get('sponsorEvp').value) this.maxService.CreateSponsor(this.initiativeService.id, formGroup.get('DetailMaxForm').get('sponsorEvp').value).subscribe(() => { });
    if (formGroup.get('DetailMaxForm').get('toFinance') && formGroup.get('DetailMaxForm').get('toFinance').value) this.maxService.CreateFinance(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinance').value).subscribe(() => { });
    if (formGroup.get('DetailMaxForm').get('cfo') && formGroup.get('DetailMaxForm').get('cfo').value) this.maxService.CreateCFO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('cfo').value).subscribe(() => { });
    if (formGroup.get('DetailMaxForm').get('cto') && formGroup.get('DetailMaxForm').get('cto').value) this.maxService.CreateCTO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('cto').value).subscribe(() => { });
    if (formGroup.get('DetailMaxForm').get('tot') && formGroup.get('DetailMaxForm').get('tot').value) this.maxService.CreateTOTeam(this.initiativeService.id, formGroup.get('DetailMaxForm').get('tot').value).subscribe(() => { });
    if (formGroup.get('DetailMaxForm').get('tfb') && formGroup.get('DetailMaxForm').get('tfb').value) this.maxService.CreateTfBtTO(this.initiativeService.id, formGroup.get('DetailMaxForm').get('tfb').value).subscribe(() => { });
    if (formGroup.get('DetailMaxForm').get('toFinanceIL4') && formGroup.get('DetailMaxForm').get('toFinanceIL4').value) this.maxService.CreateTOFinanceIL4(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinanceIL4').value).subscribe(() => { });
    if (formGroup.get('DetailMaxForm').get('toFinanceIL5') && formGroup.get('DetailMaxForm').get('toFinanceIL5').value) this.maxService.CreateTOFinanceIL5(this.initiativeService.id, formGroup.get('DetailMaxForm').get('toFinanceIL5').value).subscribe(() => { });
    if (formGroup.get('DetailMaxForm').get('kpisForm') && formGroup.get('DetailMaxForm').get('kpisForm').value) this.detailinformationService.CreateKpi(this.initiativeService.id, formGroup.get('DetailMaxForm').get('kpisForm').value).subscribe(() => { });
    if (formGroup.get('DetailMaxForm').get('financeExpert') && formGroup.get('DetailMaxForm').get('financeExpert').value) this.maxService.CreateFinanceExpert(this.initiativeService.id, formGroup.get('DetailMaxForm').get('financeExpert').value).subscribe(() => { });
    console.log('Approver called');
  }


  CreateProjectSponsor_Promise(form): Promise<any> {
    return new Promise((resovle, reject) => {
      this.CreateProjectSponsor(this.initiativeService.id, form).subscribe(() => {
        resovle(true);
      }, err => {
        reject(err);
      });
    });
  }

  CreateITFocalPoint_Promise(form): Promise<any> {
    return new Promise((resovle, reject) => {
      this.CreateITFocalPoint(this.initiativeService.id, form).subscribe(() => {
        resovle(true);
      }, err => {
        reject(err);
      });
    });
  }

  CreateImpactedParties_Promise(form): Promise<any> {
    return new Promise((resovle, reject) => {
      this.CreateImpactedParties(this.initiativeService.id, form).subscribe(() => {
        resovle(true);
      }, err => {
        reject(err);
      });
    });
  }

  CreateTeamMember_Promise(form): Promise<any> {
    return new Promise((resovle, reject) => {
      this.CreateTeamMember(this.initiativeService.id, form).subscribe(() => {
        resovle(true);
      }, err => {
        reject(err);
      });
    });
  }

  CreateDigitalFocalPoint_Promise(form): Promise<any> {
    return new Promise((resovle, reject) => {
      this.CreateDigitalFocalPoint(this.initiativeService.id, form).subscribe(() => {
        resovle(true);
      }, err => {
        reject(err);
      });
    });
  }

  GetDimMember(type) {
    return this.http.post(this.baseUrl + 'DimMember', type);
  }

  CreateProjectSponsor(id, form) {
    return this.http.post(this.baseUrl + 'DimMember/ProjectSponsor/' + id, form);
  }

  CreateITFocalPoint(id, form) {
    return this.http.post(this.baseUrl + 'DimMember/ITFocalPoint/' + id, form);
  }

  CreateImpactedParties(id, form) {
    return this.http.post(this.baseUrl + 'DimMember/ImpactedParties/' + id, form);
  }

  CreateTeamMember(id, form) {
    return this.http.post(this.baseUrl + 'DimMember/TeamMember/' + id, form);
  }

  CreateDigitalFocalPoint(id, form) {
    return this.http.post(this.baseUrl + 'DimMember/DigitalFocalPoint/' + id, form);
  }

  CreateHandover(form) {
    return this.http.post(this.baseUrl + 'Handover/CreateHandover', form);
  }

  GetHandover(id: number) {
    return this.http.get<HandoverModel>(this.baseUrl + 'Handover/GetHandover/' + id);
  }

  UpdateHandover(form) {
    return this.http.put(this.baseUrl + 'Handover/UpdateHandover', form);
  }

}
