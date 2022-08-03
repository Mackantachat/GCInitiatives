import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ProgressDetail } from '@models/progressDetail';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProgressAndMilestone } from '@models/ProgressAndMilestone';
import { ProgressModel, OutstandingModel, OutstandingData } from '@models/progressModel';
import { commonData, StdProjectDefParams, StdProjectDefRes } from '../../models/commonData';
import { ProgressPlan, ProgressPlanDateModel, ProgressPlanModel, ProgressPlanNew } from '../../models/progress-milestone-model';
import { InitiativeService } from '../initiative/initiative.service';
import { reduce } from 'rxjs/operators';
import { Initiative } from '@models/initiative';
import { OutStandingByYear } from '@models/OutStandingModel';
import { BscNarrativeModel } from '@models/bsc-narrative';
import { CostSpending } from '@models/cost-spending';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  baseUrl = environment.apiUrl;
  mileStone1Data: Array<{
    year: any;
    listMonth: Array<{
      monthName: string;
      planValue: number;
      planAccumulate: number,
      planDisabled: boolean;
      actualValue: number;
      actualAccumulate: number,
      actualDisabled: boolean;
    }>;
  }>;

  capexLoading: boolean;
  changeStandard: boolean;
  changeCapexFinish: boolean;
  haveProgress: boolean;
  outStandingDataModel: OutstandingModel[];

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': this.basic
  });



  private requestIniNodate = new BehaviorSubject(null);
  private projecctComRun = new BehaviorSubject(null);
  private generalData = new BehaviorSubject(null);
  private selectProgressDate = new BehaviorSubject(null);
  private codeOfVP = new BehaviorSubject(null);

  dataProgressPlanPoc1 = new BehaviorSubject(null);
  dataProgressPlanPoc2 = new BehaviorSubject(null);

  outStandingData = new BehaviorSubject(null);
  bscData = new BehaviorSubject(null);
  costSpendingData = new BehaviorSubject(null);

  getRequestIniNoDate = this.requestIniNodate.asObservable();
  getProjectComRun = this.projecctComRun.asObservable();


  getGeneralData = this.generalData.asObservable();
  getSelectProgressDate = this.selectProgressDate.asObservable();
  getOutStandingData = this.outStandingData.asObservable();
  getBscData = this.bscData.asObservable();
  getCostSpendingData = this.costSpendingData.asObservable();
  getCodeOfVP = this.codeOfVP.asObservable();

  getProgressPlanDataPoc1 = this.dataProgressPlanPoc1.asObservable();
  getProgressPlanDataPoc2 = this.dataProgressPlanPoc2.asObservable();


  checkPlan: boolean = true;
  checkPocPercent: boolean = true;





  constructor(
    private http: HttpClient,
    private initiativeService: InitiativeService
  ) {
    this.mileStone1Data = [];
    this.capexLoading = false;
    this.changeStandard = false;
    this.changeCapexFinish = false;
    this.haveProgress = false;
  }

  changeRequestIniNoDate(startDate: Date) {
    this.requestIniNodate.next(startDate)
  }

  changeCodeOfVP(codeOfVP: string) {
    this.codeOfVP.next(codeOfVP)
  }

  changeFinishDate(startDate: Date) {
    this.projecctComRun.next(startDate)
  }


  setGeneralData(data: Initiative) {
    this.generalData.next(data);
  }


  setSelectProgressDate(data: any) {
    this.selectProgressDate.next(data);
  }

  setOutStandingData(data: any) {
    this.outStandingData.next(data);
  }

  setBscDAta(data: any) {
    this.bscData.next(data);
  }

  setCostSpendingData(data: CostSpending[]) {
    this.costSpendingData.next(data);
  }


  changeProgressPlanDataPoc1(poc1: any) {
    this.dataProgressPlanPoc1.next(poc1);
  }

  changeProgressPlanDataPoc2(poc2: any) {
    this.dataProgressPlanPoc2.next(poc2);
  }

  CreateProgressDetail(id, DetailForm): Observable<ProgressDetail> {
    let data = this.convertTime(DetailForm);
    return this.http.post<ProgressDetail>(this.baseUrl + 'Progress/CreateProgressDetail/' + id, data);
  }

  GetProgressAndMilestone(id): Observable<ProgressAndMilestone> {
    return this.http.get<ProgressAndMilestone>(this.baseUrl + 'initiative/ProgressAndMilestone/' + id);
  }

  CreateProgress(id, ProgressModel): Observable<ProgressModel> {
    return this.http.post<ProgressModel>(this.baseUrl + 'Progress/CreateProgress/' + id, ProgressModel);
  }
  GetProgress(id): Observable<ProgressModel> {
    return this.http.get<ProgressModel>(this.baseUrl + 'Progress/' + id);
  }

  GetSapDropdown(Type, InitiativeId, AreaPlant): Observable<commonData[]> {
    if (AreaPlant == null || AreaPlant == '') { AreaPlant = 0; }
    return this.http.get<commonData[]>(this.baseUrl + 'CommonData/GetSapDropdown/' + Type + "/" + InitiativeId + "/" + AreaPlant);
  }

  async getSTDProjectDef(data: StdProjectDefParams): Promise<StdProjectDefRes[]> {
    return await (this.http.post<StdProjectDefRes[]>(this.baseUrl + 'CommonData/GetSTDDef', data).toPromise());
  }

  async getResponsibleEng(data: string): Promise<commonData> {
    let sentData: {
      ownerName: string
    } = {
      ownerName: data
    }
    return await (this.http.post<commonData>(this.baseUrl + 'CommonData/GetResponsibleEng', sentData).toPromise());
  }

  async getResponsibleNoEng(data: string): Promise<commonData[]> {
    let sentData: {
      codeOfVP: string
    } = {
      codeOfVP: data
    }
    return await (this.http.post<commonData[]>(this.baseUrl + 'CommonData/GetResponsibleNoEng', sentData).toPromise());
  }

  CreateProgressPlanDate(progressPlanDate, typePlan): Observable<ProgressPlanDateModel> {
    let data: ProgressPlanDateModel[] = this.convertProgressPlanDate(progressPlanDate, typePlan);
    return this.http.post<ProgressPlanDateModel>(this.baseUrl + 'Progress/CreateProgressPlanDate/', data);
  }

  GetProgressPlanDate(id): Observable<ProgressPlanDateModel[]> {
    return this.http.get<ProgressPlanDateModel[]>(this.baseUrl + 'Progress/GetProgressPlanDate/' + id);
  }

  CreateProgressPlan(obj: ProgressPlanNew[]): Observable<any> {
    let data: ProgressPlanModel[] = this.convertProgressPlan(obj);
    return this.http.post<any>(this.baseUrl + 'Progress/CreateProgressPlan', data);
  }

  CreateProgressPlanMileStone2(objDate: any, obj: ProgressPlan[]): Observable<any> {
    let data: ProgressPlanModel[] = this.convertMilesStroneToDB(objDate, obj);
    return this.http.post<any>(this.baseUrl + 'Progress/CreateProgressPlan', data);
  }

  //convertTime
  convertTime(formData) {
    let returnData: any = formData;
    let field = ['start', 'planFinish', 'actualFinish'];
    if (formData.details && formData.details.length > 0) {
      formData.details.forEach((data, index) => {
        field.forEach((fData) => {
          if (formData.details[index][fData] && formData.details[index][fData] != null) {
            formData.details[index][fData] = new Date(formData.details[index][fData]);
            returnData.details[index][fData] = new Date(Date.UTC(
              data[fData].getFullYear(),
              data[fData].getMonth(),
              data[fData].getDate(), 0, 0, 0));
          }
        });
      })
    }
    return returnData;
  }




  convertProgressPlanDate(progressPlanDate, typePlan) {
    console.log("progressPlanDate convert>>", progressPlanDate);
    let returnData: ProgressPlanDateModel[] = [];
    // let progressPlanDateModel: ProgressPlanDateModel = null;
    let form = ['engineeringForm', 'procurementForm', 'constructionForm', 'commissioningForm', 'overallForm']
    let planDateType = ['Engineering', 'Procurement', 'Construction', 'Commissioning', 'Overall']
    // if(progressPlanDate.)
    if (typePlan == 'poc2') {
      form.forEach((planDate, index) => {
        returnData.push({
          progressPlanDateId: 0,
          progressPlanDateType: planDateType[index],
          basicStartDate: this.convertPlanDateTime(progressPlanDate[planDate].basicStartDate),
          basicFinishDate: this.convertPlanDateTime(progressPlanDate[planDate].basicFinishDate),
          actualStartDate: this.convertPlanDateTime(progressPlanDate[planDate].actualStartDate),
          actualFinishDate: this.convertPlanDateTime(progressPlanDate[planDate].actualFinishDate),
          pocWeightPercent: progressPlanDate[planDate].pocWeightPercent,
          initiativeId: this.initiativeService.id
        });
      })

    } else {
      returnData.push({
        progressPlanDateId: 0,
        progressPlanDateType: 'Overall',
        basicStartDate: this.convertPlanDateTime(progressPlanDate.basicStartDate),
        basicFinishDate: this.convertPlanDateTime(progressPlanDate.basicFinishDate),
        actualStartDate: this.convertPlanDateTime(progressPlanDate.actualStartDate),
        actualFinishDate: this.convertPlanDateTime(progressPlanDate.actualFinishDate),
        pocWeightPercent: progressPlanDate.pocWeightPercent,
        initiativeId: this.initiativeService.id
      });
    }
    console.log('returnData >>>', returnData);

    return returnData;
  }

  convertPlanDateTime(inputDate: any) {
    let returnData: any = null;
    if (inputDate) {
      returnData = new Date(Date.UTC(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        inputDate.getDate(), 0, 0, 0));
    }
    return returnData;
  }


  convertProgressPlan(obj: ProgressPlanNew[]) {
    // console.log(obj);
    // let  newData:ProgressPlanModel = new ProgressPlanModel;
    let listOfMonth = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    let addValue = null;
    let newDataObj: ProgressPlanModel[] = [];
    if (obj && obj.length > 0) {


      let index = 0;
      for (let index2 = 0; index2 < obj.length * 4; index2++) {
        if (index2 % 4 == 0) {
          let newData: ProgressPlanModel = new ProgressPlanModel;
          newData.progressPlanId = 0;
          newData.year = obj[index].year;
          newData.initiativeId = this.initiativeService.id;
          newData.progressPlanType = "-";
          newData.planActual = "Plan";

          listOfMonth.forEach((month, monthIndex) => {
            if ((obj[index].listMonth[monthIndex].planValue == null || obj[index].listMonth[monthIndex].planValue == '') && !obj[index].listMonth[monthIndex].planDisabled) {
              newData[month] = addValue;
            } else {
              newData[month] = obj[index].listMonth[monthIndex].planValue;
              addValue = !obj[index].listMonth[monthIndex].planDisabled ? parseFloat(obj[index].listMonth[monthIndex].planValue) : addValue;
            }
          });
          // newData.feb = obj[index].listMonth[1].planValue
          // newData.mar = obj[index].listMonth[2].planValue
          // newData.apr = obj[index].listMonth[3].planValue
          // newData.may = obj[index].listMonth[4].planValue
          // newData.jun = obj[index].listMonth[5].planValue
          // newData.jul = obj[index].listMonth[6].planValue
          // newData.aug = obj[index].listMonth[7].planValue
          // newData.sep = obj[index].listMonth[8].planValue
          // newData.oct = obj[index].listMonth[9].planValue
          // newData.nov = obj[index].listMonth[10].planValue
          // newData.dec = obj[index].listMonth[11].planValue
          newDataObj[index2] = newData;

        } else if (index2 % 4 == 1) {
          let newData: ProgressPlanModel = new ProgressPlanModel;
          newData.progressPlanId = 0;
          newData.year = obj[index].year;
          newData.initiativeId = this.initiativeService.id;
          newData.progressPlanType = "-";
          newData.planActual = "Actual";

          listOfMonth.forEach((month, monthIndex) => {
            // if ((obj[index].listMonth[monthIndex].planValue == null || obj[index].listMonth[monthIndex].planValue == '') && !obj[index].listMonth[monthIndex].planDisabled) {
            //   newData[month] = addValue;
            // } else {
            //   newData[month] = obj[index].listMonth[monthIndex].planValue;
            //   addValue = !obj[index].listMonth[monthIndex].planDisabled ? parseFloat(obj[index].listMonth[monthIndex].planValue) : addValue;
            // }
            newData[month] = obj[index].listMonth[monthIndex].actualValue
          });
          // newData.jan = obj[index].listMonth[0].actualValue
          // newData.feb = obj[index].listMonth[1].actualValue
          // newData.mar = obj[index].listMonth[2].actualValue
          // newData.apr = obj[index].listMonth[3].actualValue
          // newData.may = obj[index].listMonth[4].actualValue
          // newData.jun = obj[index].listMonth[5].actualValue
          // newData.jul = obj[index].listMonth[6].actualValue
          // newData.aug = obj[index].listMonth[7].actualValue
          // newData.sep = obj[index].listMonth[8].actualValue
          // newData.oct = obj[index].listMonth[9].actualValue
          // newData.nov = obj[index].listMonth[10].actualValue
          // newData.dec = obj[index].listMonth[11].actualValue

          newDataObj[index2] = newData;

        } else if (index2 % 4 == 2) {
          let newData: ProgressPlanModel = new ProgressPlanModel;
          newData.progressPlanId = 0;
          newData.year = obj[index].year;
          newData.initiativeId = this.initiativeService.id;
          newData.progressPlanType = "Over All";
          newData.planActual = "Plan";

          listOfMonth.forEach((month, monthIndex) => {
            // if ((obj[index].listMonth[monthIndex].planValue == null || obj[index].listMonth[monthIndex].planValue == '') && !obj[index].listMonth[monthIndex].planDisabled) {
            //   newData[month] = addValue;
            // } else {
            //   newData[month] = obj[index].listMonth[monthIndex].planValue;
            //   addValue = !obj[index].listMonth[monthIndex].planDisabled ? parseFloat(obj[index].listMonth[monthIndex].planValue) : addValue;
            // }
            newData[month] = obj[index].listMonth[monthIndex].planAccumulate
          });
          // newData.feb = obj[index].listMonth[1].planAccumulate
          // newData.mar = obj[index].listMonth[2].planAccumulate
          // newData.apr = obj[index].listMonth[3].planAccumulate
          // newData.may = obj[index].listMonth[4].planAccumulate
          // newData.jun = obj[index].listMonth[5].planAccumulate
          // newData.jul = obj[index].listMonth[6].planAccumulate
          // newData.aug = obj[index].listMonth[7].planAccumulate
          // newData.sep = obj[index].listMonth[8].planAccumulate
          // newData.oct = obj[index].listMonth[9].planAccumulate
          // newData.nov = obj[index].listMonth[10].planAccumulate
          // newData.dec = obj[index].listMonth[11].planAccumulate

          newDataObj[index2] = newData;

        } else if (index2 % 4 == 3) {
          let newData: ProgressPlanModel = new ProgressPlanModel;
          newData.progressPlanId = 0;
          newData.year = obj[index].year;
          newData.initiativeId = this.initiativeService.id;
          newData.progressPlanType = "Over All";
          newData.planActual = "Actual";

          listOfMonth.forEach((month, monthIndex) => {
            // if ((obj[index].listMonth[monthIndex].planValue == null || obj[index].listMonth[monthIndex].planValue == '') && !obj[index].listMonth[monthIndex].planDisabled) {
            //   newData[month] = addValue;
            // } else {
            //   newData[month] = obj[index].listMonth[monthIndex].planValue;
            //   addValue = !obj[index].listMonth[monthIndex].planDisabled ? parseFloat(obj[index].listMonth[monthIndex].planValue) : addValue;
            // }
            newData[month] = obj[index].listMonth[monthIndex].actualAccumulate;
          });
          // newData.feb = obj[index].listMonth[1].actualAccumulate
          // newData.mar = obj[index].listMonth[2].actualAccumulate
          // newData.apr = obj[index].listMonth[3].actualAccumulate
          // newData.may = obj[index].listMonth[4].actualAccumulate
          // newData.jun = obj[index].listMonth[5].actualAccumulate
          // newData.jul = obj[index].listMonth[6].actualAccumulate
          // newData.aug = obj[index].listMonth[7].actualAccumulate
          // newData.sep = obj[index].listMonth[8].actualAccumulate
          // newData.oct = obj[index].listMonth[9].actualAccumulate
          // newData.nov = obj[index].listMonth[10].actualAccumulate
          // newData.dec = obj[index].listMonth[11].actualAccumulate

          newDataObj[index2] = newData;
          index++;
        }
      }
    }
    return newDataObj;
  }

  convertMilesStroneToDB(objDate: any, obj: ProgressPlan[]) {

    let listOfMonth = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    let newDataObj: ProgressPlanModel[] = [];


    let progressPlanType = ['Engineering', 'Procurement', 'Construction', 'Commissioning', 'Overall'];
    let planActual = ['Plan', 'Actual'];

    let addValueEngineering = null;
    let addValueProcurement = null;
    let addValueConstruction = null;
    let addValueCommissioning = null;

    //     Procurement
    // Construction
    // Commissioning
    // Engineering
    // console.log(objDate);
    let engineeringWeight = objDate?.engineeringForm?.pocWeightPercent ? objDate?.engineeringForm?.pocWeightPercent : 0;
    let procurementWeight = objDate?.procurementForm?.pocWeightPercent ? objDate?.procurementForm?.pocWeightPercent : 0;
    let constructionWeight = objDate?.constructionForm?.pocWeightPercent ? objDate?.constructionForm?.pocWeightPercent : 0;
    let commissioningWeight = objDate?.commissioningForm?.pocWeightPercent ? objDate?.commissioningForm?.pocWeightPercent : 0;

    // let progressPlan:ProgressPlanModel[] = [];
    if (obj && obj.length > 0) {
      obj.forEach((objData, objIndex) => {
        console.log('obj data>>', objData);
        // count year

        progressPlanType.forEach((planType, planTypeIndex) => {
          // for = 5
          planActual.forEach((plant, planIndex) => {
            let newData: ProgressPlanModel = new ProgressPlanModel;
            newData.year = (objData.year).toString();

            // objData.listMonth.forEach((monthData, index) => {
            //for = 12  index = 0-11
            //Engineer
            newData.progressPlanId = 0;
            newData.planActual = plant;
            newData.initiativeId = this.initiativeService.id;
            newData.progressPlanType = planType;
            if (planTypeIndex == 0) {
              if (planIndex == 0) {
                listOfMonth.forEach((month, monthIndex) => {
                  if (engineeringWeight > 0) {
                    if ((objData.listMonth[monthIndex].engineering_plan.planValue == null || objData.listMonth[monthIndex].engineering_plan.planValue?.toString() == '') && !objData.listMonth[monthIndex].engineering_plan.planDisabled) {
                      newData[month] = addValueEngineering;
                    } else {
                      newData[month] = objData.listMonth[monthIndex].engineering_plan.planValue?.toString();
                      addValueEngineering = !objData.listMonth[monthIndex].engineering_plan.planDisabled ? objData.listMonth[monthIndex].engineering_plan.planValue : addValueEngineering;
                    }
                  } else {
                    newData[month] = null;
                  }
                });
                // newData.jan = objData.listMonth[0].engineering_plan.planValue?.toString();
                // newData.feb = objData.listMonth[1].engineering_plan.planValue?.toString();
                // newData.mar = objData.listMonth[2].engineering_plan.planValue?.toString();
                // newData.apr = objData.listMonth[3].engineering_plan.planValue?.toString();
                // newData.may = objData.listMonth[4].engineering_plan.planValue?.toString();
                // newData.jun = objData.listMonth[5].engineering_plan.planValue?.toString();
                // newData.jul = objData.listMonth[6].engineering_plan.planValue?.toString();
                // newData.aug = objData.listMonth[7].engineering_plan.planValue?.toString();
                // newData.sep = objData.listMonth[8].engineering_plan.planValue?.toString();
                // newData.oct = objData.listMonth[9].engineering_plan.planValue?.toString();
                // newData.nov = objData.listMonth[10].engineering_plan.planValue?.toString();
                // newData.dec = objData.listMonth[11].engineering_plan.planValue?.toString();
                newDataObj.push(newData);
              } else {
                newData.jan = objData.listMonth[0].engineering_plan.actualValue?.toString();
                newData.feb = objData.listMonth[1].engineering_plan.actualValue?.toString();
                newData.mar = objData.listMonth[2].engineering_plan.actualValue?.toString();
                newData.apr = objData.listMonth[3].engineering_plan.actualValue?.toString();
                newData.may = objData.listMonth[4].engineering_plan.actualValue?.toString();
                newData.jun = objData.listMonth[5].engineering_plan.actualValue?.toString();
                newData.jul = objData.listMonth[6].engineering_plan.actualValue?.toString();
                newData.aug = objData.listMonth[7].engineering_plan.actualValue?.toString();
                newData.sep = objData.listMonth[8].engineering_plan.actualValue?.toString();
                newData.oct = objData.listMonth[9].engineering_plan.actualValue?.toString();
                newData.nov = objData.listMonth[10].engineering_plan.actualValue?.toString();
                newData.dec = objData.listMonth[11].engineering_plan.actualValue?.toString();
                newDataObj.push(newData);
              }
            } else if (planTypeIndex == 1) {
              if (planIndex == 0) {
                listOfMonth.forEach((month, monthIndex) => {
                  if (procurementWeight > 0) {
                    if ((objData.listMonth[monthIndex].procurement_plan.planValue == null || objData.listMonth[monthIndex].procurement_plan.planValue?.toString() == '') && !objData.listMonth[monthIndex].procurement_plan.planDisabled) {
                      newData[month] = addValueProcurement;
                    } else {
                      newData[month] = objData.listMonth[monthIndex].procurement_plan.planValue?.toString();
                      addValueProcurement = !objData.listMonth[monthIndex].procurement_plan.planDisabled ? objData.listMonth[monthIndex].procurement_plan.planValue : addValueProcurement;
                    }
                  } else {
                    newData[month] = null;
                  }
                });
                // newData.jan = objData.listMonth[0].procurement_plan.planValue?.toString();
                // newData.feb = objData.listMonth[1].procurement_plan.planValue?.toString();
                // newData.mar = objData.listMonth[2].procurement_plan.planValue?.toString();
                // newData.apr = objData.listMonth[3].procurement_plan.planValue?.toString();
                // newData.may = objData.listMonth[4].procurement_plan.planValue?.toString();
                // newData.jun = objData.listMonth[5].procurement_plan.planValue?.toString();
                // newData.jul = objData.listMonth[6].procurement_plan.planValue?.toString();
                // newData.aug = objData.listMonth[7].procurement_plan.planValue?.toString();
                // newData.sep = objData.listMonth[8].procurement_plan.planValue?.toString();
                // newData.oct = objData.listMonth[9].procurement_plan.planValue?.toString();
                // newData.nov = objData.listMonth[10].procurement_plan.planValue?.toString();
                // newData.dec = objData.listMonth[11].procurement_plan.planValue?.toString();
                newDataObj.push(newData);
              } else {
                newData.jan = objData.listMonth[0].procurement_plan.actualValue?.toString();
                newData.feb = objData.listMonth[1].procurement_plan.actualValue?.toString();
                newData.mar = objData.listMonth[2].procurement_plan.actualValue?.toString();
                newData.apr = objData.listMonth[3].procurement_plan.actualValue?.toString();
                newData.may = objData.listMonth[4].procurement_plan.actualValue?.toString();
                newData.jun = objData.listMonth[5].procurement_plan.actualValue?.toString();
                newData.jul = objData.listMonth[6].procurement_plan.actualValue?.toString();
                newData.aug = objData.listMonth[7].procurement_plan.actualValue?.toString();
                newData.sep = objData.listMonth[8].procurement_plan.actualValue?.toString();
                newData.oct = objData.listMonth[9].procurement_plan.actualValue?.toString();
                newData.nov = objData.listMonth[10].procurement_plan.actualValue?.toString();
                newData.dec = objData.listMonth[11].procurement_plan.actualValue?.toString();
                newDataObj.push(newData);
              }
            } else if (planTypeIndex == 2) {
              if (planIndex == 0) {
                listOfMonth.forEach((month, monthIndex) => {
                  if (constructionWeight > 0) {
                    if ((objData.listMonth[monthIndex].construction_plan.planValue == null || objData.listMonth[monthIndex].construction_plan.planValue?.toString() == '') && !objData.listMonth[monthIndex].construction_plan.planDisabled) {
                      newData[month] = addValueConstruction;
                    } else {
                      newData[month] = objData.listMonth[monthIndex].construction_plan.planValue?.toString();
                      addValueConstruction = !objData.listMonth[monthIndex].construction_plan.planDisabled ? objData.listMonth[monthIndex].construction_plan.planValue : addValueConstruction;
                    }
                  } else {
                    newData[month] = null;
                  }
                });
                // newData.jan = objData.listMonth[0].construction_plan.planValue?.toString();
                // newData.feb = objData.listMonth[1].construction_plan.planValue?.toString();
                // newData.mar = objData.listMonth[2].construction_plan.planValue?.toString();
                // newData.apr = objData.listMonth[3].construction_plan.planValue?.toString();
                // newData.may = objData.listMonth[4].construction_plan.planValue?.toString();
                // newData.jun = objData.listMonth[5].construction_plan.planValue?.toString();
                // newData.jul = objData.listMonth[6].construction_plan.planValue?.toString();
                // newData.aug = objData.listMonth[7].construction_plan.planValue?.toString();
                // newData.sep = objData.listMonth[8].construction_plan.planValue?.toString();
                // newData.oct = objData.listMonth[9].construction_plan.planValue?.toString();
                // newData.nov = objData.listMonth[10].construction_plan.planValue?.toString();
                // newData.dec = objData.listMonth[11].construction_plan.planValue?.toString();
                newDataObj.push(newData);
              } else {
                newData.jan = objData.listMonth[0].construction_plan.actualValue?.toString();
                newData.feb = objData.listMonth[1].construction_plan.actualValue?.toString();
                newData.mar = objData.listMonth[2].construction_plan.actualValue?.toString();
                newData.apr = objData.listMonth[3].construction_plan.actualValue?.toString();
                newData.may = objData.listMonth[4].construction_plan.actualValue?.toString();
                newData.jun = objData.listMonth[5].construction_plan.actualValue?.toString();
                newData.jul = objData.listMonth[6].construction_plan.actualValue?.toString();
                newData.aug = objData.listMonth[7].construction_plan.actualValue?.toString();
                newData.sep = objData.listMonth[8].construction_plan.actualValue?.toString();
                newData.oct = objData.listMonth[9].construction_plan.actualValue?.toString();
                newData.nov = objData.listMonth[10].construction_plan.actualValue?.toString();
                newData.dec = objData.listMonth[11].construction_plan.actualValue?.toString();
                newDataObj.push(newData);
              }
            } else if (planTypeIndex == 3) {
              if (planIndex == 0) {
                listOfMonth.forEach((month, monthIndex) => {
                  if (commissioningWeight > 0) {
                    if ((objData.listMonth[monthIndex].commissioning_plan.planValue == null || objData.listMonth[monthIndex].commissioning_plan.planValue?.toString() == '') && !objData.listMonth[monthIndex].commissioning_plan.planDisabled) {
                      newData[month] = addValueCommissioning;
                    } else {
                      newData[month] = objData.listMonth[monthIndex].commissioning_plan.planValue?.toString();
                      addValueCommissioning = !objData.listMonth[monthIndex].commissioning_plan.planDisabled ? objData.listMonth[monthIndex].commissioning_plan.planValue : addValueCommissioning;
                    }
                  } else {
                    newData[month] = null;
                  }
                });
                // newData.jan = objData.listMonth[0].commissioning_plan.planValue?.toString();
                // newData.feb = objData.listMonth[1].commissioning_plan.planValue?.toString();
                // newData.mar = objData.listMonth[2].commissioning_plan.planValue?.toString();
                // newData.apr = objData.listMonth[3].commissioning_plan.planValue?.toString();
                // newData.may = objData.listMonth[4].commissioning_plan.planValue?.toString();
                // newData.jun = objData.listMonth[5].commissioning_plan.planValue?.toString();
                // newData.jul = objData.listMonth[6].commissioning_plan.planValue?.toString();
                // newData.aug = objData.listMonth[7].commissioning_plan.planValue?.toString();
                // newData.sep = objData.listMonth[8].commissioning_plan.planValue?.toString();
                // newData.oct = objData.listMonth[9].commissioning_plan.planValue?.toString();
                // newData.nov = objData.listMonth[10].commissioning_plan.planValue?.toString();
                // newData.dec = objData.listMonth[11].commissioning_plan.planValue?.toString();
                newDataObj.push(newData);
              } else {
                newData.jan = objData.listMonth[0].commissioning_plan.actualValue?.toString();
                newData.feb = objData.listMonth[1].commissioning_plan.actualValue?.toString();
                newData.mar = objData.listMonth[2].commissioning_plan.actualValue?.toString();
                newData.apr = objData.listMonth[3].commissioning_plan.actualValue?.toString();
                newData.may = objData.listMonth[4].commissioning_plan.actualValue?.toString();
                newData.jun = objData.listMonth[5].commissioning_plan.actualValue?.toString();
                newData.jul = objData.listMonth[6].commissioning_plan.actualValue?.toString();
                newData.aug = objData.listMonth[7].commissioning_plan.actualValue?.toString();
                newData.sep = objData.listMonth[8].commissioning_plan.actualValue?.toString();
                newData.oct = objData.listMonth[9].commissioning_plan.actualValue?.toString();
                newData.nov = objData.listMonth[10].commissioning_plan.actualValue?.toString();
                newData.dec = objData.listMonth[11].commissioning_plan.actualValue?.toString();
                newDataObj.push(newData);
              }
            } else if (planTypeIndex == 4) {
              if (planIndex == 0) {
                newData.jan = objData.listMonth[0].overall_plan.planValue?.toString();
                newData.feb = objData.listMonth[1].overall_plan.planValue?.toString();
                newData.mar = objData.listMonth[2].overall_plan.planValue?.toString();
                newData.apr = objData.listMonth[3].overall_plan.planValue?.toString();
                newData.may = objData.listMonth[4].overall_plan.planValue?.toString();
                newData.jun = objData.listMonth[5].overall_plan.planValue?.toString();
                newData.jul = objData.listMonth[6].overall_plan.planValue?.toString();
                newData.aug = objData.listMonth[7].overall_plan.planValue?.toString();
                newData.sep = objData.listMonth[8].overall_plan.planValue?.toString();
                newData.oct = objData.listMonth[9].overall_plan.planValue?.toString();
                newData.nov = objData.listMonth[10].overall_plan.planValue?.toString();
                newData.dec = objData.listMonth[11].overall_plan.planValue?.toString();
                newDataObj.push(newData);
              } else {
                newData.jan = objData.listMonth[0].overall_plan.actualValue?.toString();
                newData.feb = objData.listMonth[1].overall_plan.actualValue?.toString();
                newData.mar = objData.listMonth[2].overall_plan.actualValue?.toString();
                newData.apr = objData.listMonth[3].overall_plan.actualValue?.toString();
                newData.may = objData.listMonth[4].overall_plan.actualValue?.toString();
                newData.jun = objData.listMonth[5].overall_plan.actualValue?.toString();
                newData.jul = objData.listMonth[6].overall_plan.actualValue?.toString();
                newData.aug = objData.listMonth[7].overall_plan.actualValue?.toString();
                newData.sep = objData.listMonth[8].overall_plan.actualValue?.toString();
                newData.oct = objData.listMonth[9].overall_plan.actualValue?.toString();
                newData.nov = objData.listMonth[10].overall_plan.actualValue?.toString();
                newData.dec = objData.listMonth[11].overall_plan.actualValue?.toString();
                newDataObj.push(newData);
              }
            }
          });
        });




      });


    }


    return newDataObj;

  }

  GetProgressPlan(id): Observable<ProgressPlanModel[]> {
    return this.http.get<ProgressPlanModel[]>(this.baseUrl + 'Progress/GetProgressPlan/' + id);
  }

  //CreateProgressPlan = (jsonData): Promise<any> => {
  //  console.log('CreatProgressPlan(): jsonData', jsonData);
  //  return this.http.post(this.baseUrl + '/ProgressPlan/CreateProgressPlan',
  //    jsonData,
  //    { headers: this.headers }
  //  ).toPromise().then(r => r).catch(e => e);
  //}

  // Outstanding
  CreateOutstandingForm(data): Observable<any> {
    //console.log('outout : ', data);
    // let data: ProgressPlanDateModel[] = this.convertProgressPlanDate(progressPlanDate);
    // return this.http.post<any>(this.baseUrl + 'Progress/CreateOutStanding/', data);
    return this.http.post<any>(this.baseUrl + 'Outstanding/InsertOutstanding/', data);
  }

  // Outstanding
  CreateOutstandingModel(data: OutstandingModel[]): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Outstanding/InsertOutstandingDataModel/', data);
  }

  // CreateOutOutstandingData(obj: OutstandingData[]): Observable<any> {
  //   return this.http.post<any>(this.baseUrl + 'Progress/CreateOutOutstandingData/', obj);
  // }

  GetOutstandingData(id, year, month): Observable<OutstandingModel> {
    return this.http.get<OutstandingModel>(this.baseUrl + 'Outstanding/GetOutstanding/' + id + '/' + year + '/' + month);
  }

  GetAllOutstandingData(id): Observable<OutstandingModel[]> {
    return this.http.get<OutstandingModel[]>(this.baseUrl + 'Outstanding/GetAllOutstanding/' + id);
  }

  GetOutstandingFormByYear(id, year): Observable<OutStandingByYear[]> {
    return this.http.get<OutStandingByYear[]>(this.baseUrl + 'Outstanding/GetOutstandingFormByYear/' + id + '/' + year);
  }

  // bsc, narrative
  // CreateBscNarrative(data):Observable<any>{
  //   return this.http.post<any>(this.baseUrl + 'Progress/CreateBscNarrative',data);
  // }
  // GetBscNarrative(data):Observable<any>{
  //   return this.http.post<any>(this.baseUrl + 'Progress/GetBscNarrative',data);
  // }

  CreateBscNarrative = (data): Promise<any> => {
    return this.http.post(this.baseUrl + 'Progress/CreateBscNarrative', data, { headers: this.headers }
    ).toPromise();
  }

  CreateAllBscNarrative = (data): Promise<any> => {
    return this.http.post(this.baseUrl + 'Progress/CreateAllBscNarrative', data, { headers: this.headers }
    ).toPromise();
  }

  GetBscNarrativeAll = (id): Promise<BscNarrativeModel[]> => {
    return this.http.get<BscNarrativeModel[]>(this.baseUrl + 'Progress/GetBscNarrativeAll/' + id).toPromise();
  }

  GetBscNarrative = (id, year, month): Promise<BscNarrativeModel> => {
    return this.http.get<BscNarrativeModel>(this.baseUrl + 'Progress/GetBscNarrative/' + id + '/' + year + '/' + month,
      {}).toPromise(); // { }).toPromise().then((r) => r).catch(e => e);
  }

  GetCostSpendingMonth = (id, year, type): Promise<number[]> => {
    return this.http.get<number[]>(this.baseUrl + 'Progress/GetCostSpendingMonth/' + id + '/' + year + '/' + type, {}).toPromise();
  }

  GetCostSpendingYear = (id, type): Promise<any> => {
    return this.http.get(this.baseUrl + 'Progress/GetCostSpendingYear/' + id + '/' + type, {}).toPromise();
  }


  GetAllCostSpending = (id): Promise<CostSpending[]> => {
    return this.http.get<CostSpending[]>(this.baseUrl + 'Progress/GetAllCostSpending/' + id).toPromise();
  }


  CreateCostSpending = (id, data): Promise<any> => {
    return this.http.post(this.baseUrl + 'Progress/CreateAllCostSpending/' + id, data, { headers: this.headers }
    ).toPromise();
  }

  GetProgressHeader(id): Observable<ProgressModel> {
    return this.http.get<ProgressModel>(this.baseUrl + 'Progress/GetProgressHeader/' + id);
  }


  CreateProgressHeader(id): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Progress/CreateProgressHeader/' + id, { headers: this.headers });
  }

  GetProgressPlanComplete(id): Promise<string> {
    return this.http.get<string>(this.baseUrl + 'Progress/GetProgressPlanComplete/' + id).toPromise();
  }



}
