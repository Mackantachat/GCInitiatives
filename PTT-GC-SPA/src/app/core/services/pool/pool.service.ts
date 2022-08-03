import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { environment } from '@environments/environment';
import { InitiativeListPoolPim } from '@models/initiativeList';
import { poolReference } from '@models/poolReference';
import { AuditService } from '@services/audit/audit.service';
import { CapexService } from '@services/capex/capex.service';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { ImpactService } from '@services/impact/impact.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { MaxService } from '@services/max/max.service';
import { ProgressService } from '@services/progress/progress.service';
import { SubmitService } from '@services/submit/submit.service';
import { SwalTool } from '@tools/swal.tools';

@Injectable({
  providedIn: 'root'
})
export class PoolService {
  baseUrl = environment.apiUrl;
  annualInvestmentPlanId: string;

  constructor(
    private http: HttpClient,
    private initiativeService: InitiativeService,
    private detailinformationService: DetailInformationService,
    private capexService: CapexService,
    private impactService: ImpactService,
    private progressService: ProgressService,
    private submitService: SubmitService,
    private swalTool: SwalTool,
    private maxService: MaxService,
    private auditService: AuditService
  ) {
    this.annualInvestmentPlanId = '1111';
  }


  SaveAllData(formGroup: FormGroup, saveType: string, historyId) {
    this.initiativeService.SavingData = true;
    this.swalTool.savingLoading(saveType);
    let detailId = formGroup.get('detailForm') ? formGroup.get('detailForm').get('id').value : null;
    let capexInformationId = formGroup.get('capexInformationForm') ? formGroup.get('capexInformationForm').get('capexInformationId').value : null;

    console.log('detailId', detailId);
    console.log('capexInfomation', capexInformationId);



    let saveDetail = new Promise((resolve, reject) => {
      if (detailId == 0) {
        console.log('detail max = 0');
        //create draft
        this.detailinformationService.CreateDetailInformation(this.initiativeService.id, formGroup.get('detailForm').value).subscribe((createDetailInformationResponse) => {
          console.log(createDetailInformationResponse);
          if (createDetailInformationResponse) {
            formGroup.get('detailForm').get('id').setValue(createDetailInformationResponse.id);
            return resolve(true);
          }
        }, error => {
          console.log(error);
          return reject();
        });
      } else if (detailId > 0) {
        console.log('detail max > 0');
        //update draft
        this.detailinformationService.UpdateDetailInformation(this.initiativeService.id, formGroup.get('detailForm').value).subscribe((updateDetailInformationResponse) => {
          if (updateDetailInformationResponse) {
            return resolve(true);
          }
        }, error => {
          console.log(error);
          return reject();
        });
      } else {
        return resolve(true);
      }
    });
    let saveCapex = new Promise((resolve, reject) => {
      if (capexInformationId == 0) {
        console.log('capex = 0');
        // create capex information
        if (formGroup.get('capexInformationForm')?.get('availableBudget')?.value === 0) {
          formGroup.get('capexInformationForm').get('availableBudget').setValue((formGroup.get('capexInformationForm').get('projectCost').value === null) ? 0 : formGroup.get('capexInformationForm').get('projectCost').value);
        }
        this.capexService.CreateCapexsInfoNewEngine(formGroup.get('capexInformationForm') as FormGroup).then((createResponse) => {
          if (createResponse) {
            formGroup.get('capexInformationForm').get('capexInformationId').setValue(createResponse.capexInformationId);
            if (formGroup.get('capexInformationForm').get('AnnualForm')) {
              this.capexService.CreateAnnualInvestmentPlanNewEngine(this.initiativeService.id, formGroup.get('capexInformationForm').get('AnnualForm'), createResponse.capexInformationId, "submit", 'Createnew').then((createAnnualResponse) => {
                if (createAnnualResponse) {
                  this.capexService.CreateMonthlyInvestmentPlanNewEngine(this.annualInvestmentPlanId, formGroup.get('capexInformationForm') as FormGroup).then((createMonthlyInvestmentPlan) => {
                    if (createMonthlyInvestmentPlan) {
                      resolve(true);
                    }
                  }).catch((monthInvesError) => {
                    console.log(monthInvesError);
                    reject();
                  })
                }
              }).catch((annualError) => {
                console.log(annualError);
                reject();
              });
            } else {
              resolve(true);
            }
          }
        }).catch((error) => {
          console.log(error);
          reject();
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

    let saveProgressHeader = new Promise((resolve, reject) => {
      this.progressService.CreateProgressHeader(this.initiativeService.id).subscribe((createProgressResponse) => {
        return resolve(true);
      }, error => {
        return reject();
      });
    });

    let saveReference = new Promise((resolve, reject) => {
      if (formGroup.get('initiativesForm').get('requestReference').value) {
        // create capex information
        this.CreateReferenceInitiatives(formGroup.get('initiativesForm') as FormGroup).then((createReferenceResponse) => {
          if (createReferenceResponse) {
            resolve(true);
          }
        }).catch((error) => {
          console.log(error);
          reject();
        });
      } else {
        resolve(true);
      }
    });
    console.log('saveDetail', saveDetail);
    console.log('saveCapex', saveCapex);

    Promise.all([
      saveDetail,
      saveCapex,
      saveReference,
      saveProgressHeader
    ]).then(async (values) => {
      if (saveType == 'Draft') {
        await this.initiativeService.PutUpdateByUser(this.initiativeService.id);
        //await this.auditService.CallAuditLog(this.initiativeService.id);
        this.initiativeService.SavingData = false;
        this.swalTool.Draft();
      } else {
        this.submitService.SubmitStageStatus(this.initiativeService.id, formGroup.get('submitToForm').value).subscribe(async () => {
          //audit
          await this.initiativeService.PutUpdateByUser(this.initiativeService.id);
          await this.auditService.CallAuditLog(this.initiativeService.id, historyId);
          this.initiativeService.SubmitDone = true;
          this.initiativeService.SavingData = false;
          this.swalTool.Submit();
        });
      }
    });
    //check create



    //check update


  }

  async CreateReferenceInitiatives(formGroup: FormGroup) {
    let data = this.createData(formGroup);
    return await (this.http.post<any>(this.baseUrl + "initiative/CreateReferenceIniPoolPim/" + this.initiativeService.id, data)).toPromise();
  }


  async GetReferenceIniPoolPim(poolId: number): Promise<poolReference[]> {
    return await (this.http.get<poolReference[]>(this.baseUrl + "initiative/GetReferenceIniPoolPim/" + this.initiativeService.id)).toPromise();
  }

  createData(formGroup: FormGroup): poolReference[] {
    let value: InitiativeListPoolPim[] = formGroup.get('initiativesList').value;
    let returnData: poolReference[] = [] as poolReference[];
    let data: poolReference;
    value.forEach((v) => {
      data = {} as poolReference;
      if (v.selected == true) {
        data.initiativeListPoolPimId = 0;
        data.initiativeId = v.id;
        data.ownerName = v.ownerName;
        data.investmentType = v.typeOfInvestment;
        data.benefitType = v.typeBenefit;
        data.benefitValue = v.benefit;
        data.projectCost = v.costEstimate;
        data.stageGate = v.stage;
        data.reason = v.note;
        data.poolId = this.initiativeService.id;
        data.reference = formGroup.get('requestReference').value;
        data.gateSelect = formGroup.get('gate').value;
        returnData.push(data);
      }
    });
    return returnData;
  }

  calculateDepreciationCost(formGroup: FormGroup) {
    let finishingDate = formGroup.get('capexInformationForm').get('projecctComRun').value;
    let costEstCapex = formGroup.get('capexInformationForm').get('projectCost').value;
    let year = finishingDate != null ? new Date(finishingDate).getFullYear() : null;
    let cost = costEstCapex != null ? costEstCapex : 0;

    if (year && cost) {
      let endDate = year.toString() + '-12-31';
      let firstdate = year.toString() + '-1-1';
      let endOfYear = new Date(endDate).valueOf();
      let firstOfYear = new Date(firstdate).valueOf();
      let start = new Date(finishingDate).valueOf();
      let diff = endOfYear - start;
      let diffAllYear = endOfYear - firstOfYear;
      let oneDay = 1000 * 60 * 60 * 24;
      let day = Math.floor(diff / oneDay);
      let dayAllYear = Math.floor((diffAllYear + oneDay) / oneDay);
      let usefulYear: number = formGroup.get('detailForm').get('usefulYear').value ? formGroup.get('detailForm').get('usefulYear').value : 0;
      let usefulMonth: number = formGroup.get('detailForm').get('usefulMonth').value ? formGroup.get('detailForm').get('usefulMonth').value : 0;
      let usefulCal = parseFloat((usefulMonth / 12).toFixed(2)) + usefulYear;
      if (usefulCal != 0) {
        return ((cost / usefulCal) * (day / dayAllYear)).toFixed(2);
      } else {
        return '0';
      }
    } else {
      return '0';
    }

  }
}
