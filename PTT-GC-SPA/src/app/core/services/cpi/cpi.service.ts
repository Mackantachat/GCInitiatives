import { SwalTool } from './../../../shared/tools/swal.tools';
import { environment } from './../../../../environments/environment';
import { FormGroup, FormArray} from '@angular/forms';
import { InitiativeService } from './../initiative/initiative.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { SubmitService } from '@services/submit/submit.service';
import { CpiFormModel, detailCpi } from '@models/cpiFormModel';
import { AuditService } from '@services/audit/audit.service';
import { LessonLearnTableRowData } from '@models/lesson-learn-table-row-data';
import { BestPracticeService } from '@services/best-practice/best-practice.service';
import { LessonLearnApiService } from '@services/lesson-learn-api/lesson-learn-api.service';
import { LessonLearnTableDataService } from '@services/lesson-learn-table-data/lesson-learn-table-data.service';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { DetailInformation } from '@models/detailInformation';
import { Initiative } from '@models/initiative';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PimService } from '@services/pim/pim.service';

@Injectable({
  providedIn: 'root'
})
export class CpiService {

  baseUrl: string = environment.pathUrl;
  public detailCpiData = new BehaviorSubject(null);
  getDataDetailCpi = this.detailCpiData.asObservable();

  constructor(
    private http: HttpClient,
    private initiativeService: InitiativeService,
    private swalTool: SwalTool,
    private submitService: SubmitService,
    private auditService: AuditService,
    private bestpracticeService: BestPracticeService,
    private detailInformationService: DetailInformationService,
    private router: Router,
    private pimService: PimService,
  ) { }

  changeDetailCPI(detail: detailCpi) {
    this.detailCpiData.next(detail)
  }

  SaveDraftSubmitCpi(formGroup: FormGroup, type: string, historyId) {
    this.initiativeService.SavingData = true;
    this.swalTool.savingLoading(type);
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
          this.initiativeService.UpdateDraftInitiative(this.initiativeService.id, (formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe((response) => {
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
      if (type === 'update' || this.initiativeService.suggestionStatus.stage === 'IL5') {
        return resolve(true);
      }
      const generalData: Initiative = (formGroup.get('initiativesForm') as FormGroup).getRawValue();
      this.initiativeService.UpdateCoDeveloper(this.initiativeService.id, generalData.coDeveloper).subscribe(() => {
        return resolve(true);
      }, error => {
        return reject();
      });
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


    let saveCpi = new Promise((resolve, reject) => {
      if (type === 'update') {
        return resolve(true);
      }

      let year = formGroup.get('initiativesForm').get('year').value
      if (year && typeof (year) != 'string' && typeof (year) != 'number') {
        //let year = new Date(year);
        year = new Date(Date.UTC(
          year.getFullYear(),
          year.getMonth(),
          year.getDate(), 0, 0, 0)).getFullYear().toString();
      }
      formGroup.get('initiativesForm').get('year').patchValue(year);
      if (formGroup.get('detailCpiForm')) {
        if (formGroup.get('detailCpiForm').get('id').value == 0) {
          this.CreateDetailCpiForm(formGroup.getRawValue()).then((createRes) => {
            formGroup.get('detailCpiForm').get('id').setValue(createRes);
            return resolve(true);
          }).catch((error) => {
            return reject();
          });
        } else {
          this.PutDetailCpiForm(formGroup.getRawValue()).then((updateRes) => {
            return resolve(true);
          }).catch((error) => {
            return reject();
          });
        }
      } else {
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

    console.log(saveCpi);
    console.log('saveCapex', saveEMoc);

    Promise.all([
      saveGeneral,
      saveCoDev,
      saveCpi,
      saveDetailPimForm,
      saveEMoc,
      // saveLessonLern,
      saveBestPractice
    ]).then(async (values) => {
      if (type === 'submit') {
        if (this.initiativeService.wbsNo
          && formGroup.get("sapStatus").value
          && formGroup.get("sapStatus").value != "TECO"
          && formGroup.get("sapStatus").value != "Closed") {
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

  async SaveDraft(formGroup: FormGroup) {
    this.swalTool.savingLoading('Draft');
    // old solution for updating initiative
    let initiativeForm = formGroup.get('initiativesForm');
    await this.PutDraft(initiativeForm as FormGroup);

    if (formGroup.get('detailCpiForm')) {
      await this.PutDetailCpiForm(formGroup.value);
    }
    this.swalTool.Success();
  }

  // async SaveSubmit(formGroup: FormGroup) {
  //   this.initiativeService.SavingData = true;
  //   this.swalTool.savingLoading('Submit');
  //   // old solution for updating initiative
  //   let initiativeForm = formGroup.get('initiativesForm');
  //   await this.PutDraft(initiativeForm as FormGroup);

  //   if (formGroup.get('detailCpiForm')) {
  //     await this.PutDetailCpiForm(formGroup.value);
  //   }

  //   this.submitService.SubmitStageStatus(this.initiativeService.id, formGroup.get('submitToForm').value).subscribe(async () => {
  //     await this.initiativeService.PutUpdateByUser(this.initiativeService.id);
  //     await this.auditService.CallAuditLog(this.initiativeService.id);
  //     this.initiativeService.SubmitDone = true;
  //     this.initiativeService.SavingData = false;
  //     this.swalTool.Submit();
  //   }, error => {
  //     this.initiativeService.SavingData = false;
  //     this.swalTool.Error(error);
  //   });

  // }

  PutDraft(initiativeForm: FormGroup): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUrl + 'api/Initiative/Draft/' + initiativeForm.get('id').value, initiativeForm.value).subscribe(responsee => {
        this.initiativeService.UpdateCoDeveloper(this.initiativeService.id, initiativeForm.get('coDeveloper').value).subscribe(() => {
          return resolve(responsee);
        });
        console.log(responsee);
      },
        err => {
          console.log(err);
          return reject(err);
        })
    });
  }

  // CreateDetailCpiForm(formgroupValue: any): Promise<number> {
  //   return new Promise((resolve, reject) => {
  //     this.http.post<number>(this.baseUrl + 'api/CpiForm/CreateCpiForm', formgroupValue).subscribe(
  //       response => {
  //         return resolve(response);
  //       },
  //       err => {
  //         return reject();
  //       }
  //     );
  //   });
  // }
  async CreateDetailCpiForm(formgroupValue: any): Promise<number> {
    return await (this.http.post<number>(this.baseUrl + 'api/CpiForm/CreateCpiForm', formgroupValue)).toPromise();
  }



  async PutDetailCpiForm(formgroupValue: any): Promise<any> {
    return await (this.http.put(this.baseUrl + 'api/CpiForm/UpdateCpiForm', formgroupValue)).toPromise();
  }
  // PutDetailCpiForm(formgroupValue: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.http.put(this.baseUrl + 'api/CpiForm/UpdateCpiForm', formgroupValue).subscribe(
  //       response => {
  //         return resolve(true);
  //       },
  //       err => {
  //         return reject();
  //       }
  //     );
  //   });
  // }

  // insert lesson learn
  CreateLessonLearn(formgroupValue: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + 'api/CpiForm/UpdateCpiForm', formgroupValue).subscribe(
        response => {
          return resolve(true);
        },
        err => {
          return reject();
        }
      );
    });
  }

  // insert lesson learn
  UpdateLessonLearn(form: LessonLearnTableRowData[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUrl + 'api/CpiForm/UpdateOnlyLessonLearn', form).subscribe(
        response => {
          return resolve(true);
        },
        err => {
          return reject();
        }
      );
    });
  }

  getCpiForm(initiativeId: number): Observable<CpiFormModel> {
    return this.http.get<CpiFormModel>(this.baseUrl + 'api/CpiForm/GetCpiForm/' + initiativeId)
  }



}

