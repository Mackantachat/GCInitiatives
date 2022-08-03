import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "@environments/environment";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { DropDownData, Initiative, InitiativeTabs, IrrDetail, JFactorDetail, RamDetail, SelectFactorModel, StageDetail, StageDetailById } from "@models/initiative";
import { Information } from "@models/information";
import { Status } from "@models/status";
import { InitiativeList, InitiativeListPoolPim, SearchConditonPoolPim } from "@models/initiativeList";
import { PaginatedResult } from "@models/pagination";
import { Owner, OwnerList } from "@models/owner";
import { DetailInformation } from "@models/detailInformation";
import { DatePipe } from "@angular/common";
import { PimGate } from "../../models/pimGate";
import { DateUtil } from '@utils/date.utils';
import { IMeetingList, InitiativeMember, InitiativeVacPicList } from '@models/IMeetingList';
import { FormGroup } from "@angular/forms";
import { InitiativeStage } from "@models/initiativeStage";
import { stringify } from "querystring";

@Injectable({
  providedIn: "root",
})
export class InitiativeService {
  baseUrl = environment.apiUrl;
  id: number;
  page: string;
  LoadingTimeout:boolean;
  typeOfInvestment: string;
  initiativeName: string;
  initiativeType: string;
  initiativeCode: string;
  startDate: Date;
  finishDate: Date;
  legacyInitiativeCode: string;
  suggestion: boolean;
  username: string;
  ownerName: string;
  company: string;
  suggestionStatus: Status;
  maskUnderline: string;
  isDelay: boolean;
  showCostEstOpex: boolean;
  stageDetailList: StageDetail[];
  isUtilityOtherRequire: boolean;

  //add more && return &&
  isReturn: boolean;
  isAddmore: boolean;
  isRevise: boolean;
  benefitAmount: number;


  dimConfig: boolean;

  viewMode: boolean;

  isLoading: boolean;
  isCancel: boolean;

  ShowTabCapex: boolean;
  DisableTabCapex: boolean;
  SubmitDone: boolean;
  SavingData: boolean;

  waccValue: number;
  maintenanceCost: number;

  useIrrCalculate: boolean;
  attachCategoryId: number;
  attachCategoryType: string;

  approveEdit: boolean;
  gotoTab: string;
  wbsNo: string;
  owmerEmail: string;
  surveyVersions: number;
  valiadteGate: string;
  historyFlag: number;
  

  emailGodList: string[] = [
    'thammatad.a@frontiscompany.com',
    'Jirakrid.T@pttgcgroup.com',
    'Auttawit.K@pttgcgroup.com',
    'Poramade.C@pttgcgroup.com',
    'Kavalin.K@pttgcgroup.com',
    'Sirot.S@pttgcgroup.com',
    'Suthawan.P@pttgcgroup.com',
    'Vorawan.K@pttgcgroup.com',
    'Boonchita.T@pttgcgroup.com',
    'veerapong.h@frontiscompany.com',
    'Kanokkorn.t@frontiscompany.com',
    'akrapon.s@frontiscompany.com',
    'Danuwat.bu@pttgcgroup.com',
    'chinnapong.k@pttgcgroup.com'
  ];


  //for ram calculate
  typeOfInvestmentShowRam: string[] = [
    'Safety',
    'Environment',
    'Law & Regulation',
  ];

  annualLikelihoodList: SelectFactorModel[] = [
    {
      name: "Expected to happen",
      value: "Expected to happen",
      factor: 1
    },
    {
      name: "More likely to happen, than not to.",
      value: "More likely to happen, than not to.",
      factor: 0.7
    },
    {
      name: "Fifty fifty chance",
      value: "Fifty fifty chance",
      factor: 0.5
    },
    {
      name: "More likely not to happen",
      value: "More likely not to happen",
      factor: 0.2
    },
    {
      name: "Clearly possible",
      value: "Clearly possible",
      factor: 0.1
    },
    {
      name: "Just Possible",
      value: "Just Possible",
      factor: 0.01
    },
    {
      name: "Unlikely",
      value: "Unlikely",
      factor: 0.04
    },
    {
      name: "Improbable",
      value: "Improbable",
      factor: 0
    },
    {
      name: "Custom",
      value: "Custom",
      factor: null
    },
  ];

  exposureFactorList: SelectFactorModel[] = [
    {
      name: "Continuous",
      value: "Continuous",
      factor: 1
    },
    {
      name: "Frequent (Daily)",
      value: "Frequent (Daily)",
      factor: 0.6
    },
    {
      name: "Occasional (Weekly)",
      value: "Occasional (Weekly)",
      factor: 0.3
    },
    {
      name: "Unusual (Monthly)",
      value: "Unusual (Monthly)",
      factor: 0.2
    },
    {
      name: "Rare (a few times per year)",
      value: "Rare (a few times per year)",
      factor: 0.1
    },
    {
      name: "Very Rare (Yearly or less)",
      value: "Very Rare (Yearly or less)",
      factor: 0.05
    },
    {
      name: "Custom",
      value: "Custom",
      factor: null
    },
  ];

  effectivenessList: SelectFactorModel[] = [
    {
      name: "Eliminates the Risk 100%",
      value: "Eliminates the Risk 100%",
      factor: 1
    },
    {
      name: "Very effective in reducing Risk 90%",
      value: "Very effective in reducing Risk 90%",
      factor: 0.9
    },
    {
      name: "Effective in reducing Risk 70%",
      value: "Effective in reducing Risk 70%",
      factor: 0.7
    },
    {
      name: "Halving the Risk 50%",
      value: "Halving the Risk 50%",
      factor: 0.5
    },
    {
      name: "Reduces Risk partly 20%",
      value: "Reduces Risk partly 20%",
      factor: 0.2
    },
    {
      name: "No change in risk 0%",
      value: "No change in risk 0%",
      factor: 0
    },
    {
      name: "Custom",
      value: "Custom",
      factor: null
    },
  ];

  ramLevel = [
    "Very Low",
    "Low",
    "Medium",
    "High",
    "Extreme"
  ]


  configTabs: InitiativeTabs = {} as InitiativeTabs;


  selectDigitalCapex: boolean;
  newFeature: boolean;
  mainPageLoading: boolean;
  directionButton: string;

  public generalData = new BehaviorSubject(null);
  getGeneralData = this.generalData.asObservable();

  public switchProcessList = new BehaviorSubject([] as DropDownData[]);
  getSwitchProcessList = this.switchProcessList.asObservable();
  public initiativeStageDetail = new BehaviorSubject([] as StageDetailById[]);
  getInitiativeStageDetail = this.initiativeStageDetail.asObservable();


  public capexTopics = new BehaviorSubject(null);
  getCapexTopics = this.capexTopics.asObservable();

  //global form
  public formGroup = new BehaviorSubject(null);
  getFormGroup = this.formGroup.asObservable();

  // Project Manager
  public projectManager = new Subject<string>();;
  getPimProjectManager = this.projectManager.asObservable();

  // Project Manager
  public SpendingActual = new Subject<string>();;
  getOptionSpendingActual = this.SpendingActual.asObservable();

  constructor(
    private http: HttpClient,
    private dp: DatePipe,
    private dateUti: DateUtil
  ) {
    this.initiativeName = null;
    this.initiativeType = null;
    this.initiativeCode = null;
    this.legacyInitiativeCode = null;
    this.company = null;
    this.id = null;
    this.page = null;
    this.typeOfInvestment = null;
    // this.suggestion = false;
    this.suggestionStatus = null;
    this.isDelay = true;
    this.maskUnderline = null;
    this.isLoading = false;
    this.showCostEstOpex = false;
    this.viewMode = false;
    this.stageDetailList = [];
    this.ShowTabCapex = false;
    this.DisableTabCapex = false;
    this.SubmitDone = false;
    this.useIrrCalculate = false;

    //default value in general page
    this.waccValue = 8;
    this.maintenanceCost = 1.5;
    this.attachCategoryId = 0;
    this.attachCategoryType = null;
    this.approveEdit = false;
    this.gotoTab = null;
    this.mainPageLoading = false;
    this.surveyVersions = null;
    this.valiadteGate = null;
    this.LoadingTimeout = false;
  }
  // pim-max Project Manager
  setPimProjectManager(data: string) {
    this.projectManager.next(data);
  }

  // outstanding-addmore-return SpendingActual
  setOptionSpendingActual(data: string) {
    this.SpendingActual.next(data);
  }

  getNewFeature(): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + "initiative/IsNewFeature");
  }

  setFormGroup(data: FormGroup) {
    this.formGroup.next(data);
  }
  setGeneralData(data: Initiative) {
    this.generalData.next(data);
  }
  setCapexTopics(data: any[]) {
    this.capexTopics.next(data);
  }
  setSwitchProcessList(data: DropDownData[]) {
    this.switchProcessList.next(data);
  }

  setInitiativeStageDetail(data: StageDetailById[]) {
    this.initiativeStageDetail.next(data);
  }

  getOwner<T>() {
    // const endpointUrl = `${this.url}/owner`;
    // return this.http.get<T>(endpointUrl, this.requestHeaders);
    // return this.http.get<any>(this.baseUrl + 'initiative/' + id);
    return null;
  }

  //Out standing Form
  getCpiInfo() {
    const json = {
      id: 1,
      sourceOfImprovement: "Top-down",
      typeOfCpi: "Problem",
      kpi: [
        {
          kpiNo: 1,
          kpiTitle: "title",
          baseline: 75.5,
          target: 80,
          unit: "%",
          remark: "remark",
        },
        {
          kpiNo: 2,
          kpiTitle: "title2",
          baseline: 60.0,
          target: 80,
          unit: "%",
          remark: "remark2",
        },
      ],
      analysisTool: "Fishbone Diagram",
      rootCause: "root",
      stepExplanation: [
        {
          stepNo: 1,
          stepTitle: "title",
          start: "2020-06-08",
          finish: "2020-08-10",
          responsibleBy: "",
        },
      ],
      estimatedBudgetOpex: 15.5,
      estimatedBenefitSavings: 20.0,
      estimatedBenefitCalculationDetails: "detail",
      kpiMonitor: [
        {
          kpiNo: 1,
          kpiTitle: "title",
          result: 75.5,
          target: 80,
          status: "Achieve",
        },
        {
          kpiNo: 2,
          kpiTitle: "title",
          result: 60,
          target: 70,
          status: "Not Achieve",
        },
      ],
      actualBudgetOpex: 50.0,
      actualBudgetSavings: 200.0,
      actualBenefitCalculationDetails: "actual benefit",
    };

    return of(json);
  }

  // TODO: Replace mock service by real service
  getOutstandingByMonth(json) {
    const date = new Date(json.date);
    const monthNumber = date.getMonth() + 1;
    const response = {
      month: json.month, // January
      year: json.year, // 2020
      budgetBaht: 10000 * monthNumber,
      actualBaht: 10000 * monthNumber,
      prItemBaht: 10000 * monthNumber,
      poItemBaht: 10000 * monthNumber,
      commitmentBaht: 10000 * monthNumber,
      contingency: 10000,
    };
    return of(response);
  }

  // TODO: Replace mock service by real service
  getOutstandingByYear(json) {
    const date = new Date(json.date);
    const year = date.getFullYear() + 1;
    const response = [];
    for (let month = 0; month < 12; month++) {
      const d = new Date(year, month, 1);
      response.push({
        month: this.dp.transform(d, "MMMM yyyy"),
        budgetBaht: 1000 * month + 1,
        actualBaht: month + 1 * 100,
        prItemBaht: month + 1 * 100,
        poItemBaht: 1,
        commitmentBaht: 2,
        itemListValueBaht: 100,
        rpcValueBaht: 100,
        outStanding: 100,
        contingency: 0,
        estimateAtCompletion: 0,
      });
    }
    return of(response);
  }

  saveOutStanding(json) {
    return of({ messageCode: "00", messageDescription: "Success" });
  }

  GetInitiativeVacPic(initiativeIdList: InitiativeMember[], type: string): Observable<InitiativeVacPicList[]> {
    let data = this.convertId(initiativeIdList);
    return this.http.post<InitiativeVacPicList[]>(this.baseUrl + "initiative/GetInitiativeVac/" + type, data);
  }

  convertId(lists: InitiativeMember[]) {
    let listId: number[] = [];
    lists.forEach((list) => {
      listId.push(list.initiativeId);
    })

    return listId;

  }

  ///////////// end OutStanding ///////////////

  GetInitiatives(page?, itemsPerPage?, Params?): Observable<PaginatedResult<InitiativeList[]>> {
    const paginatedResult: PaginatedResult<InitiativeList[]> = new PaginatedResult<InitiativeList[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    if (Params != null) {
      params = params.append("page", Params.page);
      params = params.append("progress", Params.progress);
      params = params.append("complete", Params.complete);
      params = params.append("cancel", Params.cancel);
      params = params.append("text", Params.text);
      this.username = Params.username;

      //TempolarySolution 2020-07-29 : I don't know reason but it solveproblem my own not show data on refresh
      if (typeof Params.username !== "undefined") {
        params = params.append("username", Params.username);
      } else {
        params = params.append("username", this.username);
      }

      params = params.append("id", Params.id);
      params = params.append("name", Params.name);
      params = params.append("status", Params.status);
      params = params.append("type", Params.type);
      params = params.append("ownerName", Params.ownerName);
      params = params.append("organization", Params.organization);
      params = params.append("plant", Params.plant);
      params = params.append("typeOfInvestment", Params.typeOfInvestment);
      params = params.append("registerDateSince", Params.registerDateSince);
      params = params.append("registerDateTo", Params.registerDateTo);

      params = params.append("column", Params.column);
      params = params.append("orderBy", Params.orderBy);

      params = params.append("myOwner", Params.myOwner);

      params = params.append("workstream", Params.workstream);
      params = params.append("subWorkstream1", Params.subWorkstream1);
    }
    return this.http
      .get<InitiativeList[]>(this.baseUrl + "initiative", {
        observe: "response",
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get("Pagination") != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get("Pagination")
            );
          }
          return paginatedResult;
        })
      );
  }


  GetInitiativesOverview(page?, itemsPerPage?, Params?): Observable<PaginatedResult<InitiativeList[]>> {
    const paginatedResult: PaginatedResult<InitiativeList[]> = new PaginatedResult<InitiativeList[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    if (Params != null) {
      params = params.append("page", Params.page);
      params = params.append("progress", Params.progress);
      params = params.append("complete", Params.complete);
      params = params.append("cancel", Params.cancel);
      params = params.append("text", Params.text);
      this.username = Params.username;

      //TempolarySolution 2020-07-29 : I don't know reason but it solveproblem my own not show data on refresh
      if (typeof Params.username !== "undefined") {
        params = params.append("username", Params.username);
      } else {
        params = params.append("username", this.username);
      }

      params = params.append("id", Params.id);
      params = params.append("name", Params.name);
      params = params.append("status", Params.status);
      params = params.append("stage", Params.stage);
      params = params.append("type", Params.type);
      params = params.append("ownerName", Params.ownerName);
      params = params.append("organization", Params.organization);
      params = params.append("plant", Params.plant);
      params = params.append("typeOfInvestment", Params.typeOfInvestment);
      params = params.append("registerDateSince", Params.registerDateSince);
      params = params.append("registerDateTo", Params.registerDateTo);

      params = params.append("column", Params.column);
      params = params.append("orderBy", Params.orderBy);

      params = params.append("myOwner", Params.myOwner);

      params = params.append("workstream", Params.workstream);
      params = params.append("subWorkstream1", Params.subWorkstream1);
    }
    return this.http.get<InitiativeList[]>(this.baseUrl + "initiative/Lists", {
      observe: "response",
      params,
    }).pipe(map((response) => {
      paginatedResult.result = response.body;
      if (response.headers.get("Pagination") != null) {
        paginatedResult.pagination = JSON.parse(
          response.headers.get("Pagination")
        );
      }
      return paginatedResult;
    })
    );
  }

  GetInitiative(id): Observable<Initiative> {
    return this.http.get<Initiative>(this.baseUrl + "initiative/" + id);
  }

  getStrategicObjectiveYear(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "StrategicObjective/GetStrategicObjectiveYear");
  }

  GetInitiativeCode(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + "initiative/InitiativeCode/" + id);
  }

  GetSuggestStatus(id): Observable<Status> {
    return this.http.get<Status>(
      this.baseUrl + "initiative/SuggestStatus/" + id
    );
  }

  GetInformation(id): Observable<Information> {
    return this.http.get<Information>(
      this.baseUrl + "initiative/Information/" + id
    );
  }

  CreateDraftInitiative(initiativesForm: Initiative): Observable<Initiative> {
    let data = this.convertTime(initiativesForm);
    data.updatedBy = this.username;
    return this.http.post<Initiative>(this.baseUrl + "initiative/Draft", data);
  }

  CreateSubmitInitiative(initiativesForm: Initiative): Observable<Initiative> {
    let data = this.convertTime(initiativesForm);
    data.updatedBy = this.username;
    return this.http.post<Initiative>(this.baseUrl + "initiative/Submit", data);
  }

  UpdateDraftInitiative(id, initiativesForm: Initiative): Observable<Initiative> {
    let data = this.convertTime(initiativesForm);
    data.updatedBy = this.username;
    return this.http.put<Initiative>(this.baseUrl + "initiative/Draft/" + id, data);
  }

  UpdateAddMore(id, initiativesForm: Initiative): Observable<Initiative> {
    return this.http.put<Initiative>(this.baseUrl + "initiative/Addmore/" + id, initiativesForm);
  }

  UpdateSubmitInitiative(id, initiativesForm: Initiative): Observable<Initiative> {
    let data = this.convertTime(initiativesForm);
    data.updatedBy = this.username;
    return this.http.put<Initiative>(this.baseUrl + "initiative/Submit/" + id, data);
  }

  convertTime(initiativesForm: Initiative) {
    let returnData: Initiative = initiativesForm;
    let field = ['finishingDate', 'registeringDate', 'startingDate'];
    field.forEach((fData) => {
      if (initiativesForm[fData] && initiativesForm[fData] != null) {
        initiativesForm[fData] = new Date(initiativesForm[fData]);
        returnData[fData] = new Date(Date.UTC(
          initiativesForm[fData].getFullYear(),
          initiativesForm[fData].getMonth(),
          initiativesForm[fData].getDate(), 0, 0, 0));
      }
    });

    if (initiativesForm['year'] && typeof (initiativesForm['year']) != 'string' && typeof (initiativesForm['year']) != 'number') {
      let year = new Date(initiativesForm.year);
      returnData.year = new Date(Date.UTC(
        year.getFullYear(),
        year.getMonth(),
        year.getDate(), 0, 0, 0)).getFullYear().toString();
    }

    return returnData;

  }





  DeleteInitiative(id) {
    return this.http.delete(this.baseUrl + "initiative/" + id);
  }

  LastInitiative() {
    return this.http.get(this.baseUrl + "initiative/last");
  }

  GetPlants() {
    return this.http.get(this.baseUrl + "plant");
  }

  GetOrganizations() {
    return this.http.get(this.baseUrl + "Organization");
  }

  GetCoDevelopers(Params?) {
    let params = new HttpParams();
    if (Params != null) {
      params = params.append("text", Params.text);
    }
    return this.http.get(this.baseUrl + "CoDeveloper", { params });
  }

  GetOwners(Params?) {
    let params = new HttpParams();
    if (Params != null) {
      params = params.append("text", Params.text);
    }
    return this.http.get(this.baseUrl + "Owner", { params });
  }

  GetOwnersEmail(Params?) {
    let params = new HttpParams();
    if (Params != null) {
      params = params.append("text", Params.text);
    }
    return this.http.get(this.baseUrl + "Owner/Email", { params });
  }

  GetIsViewSubmitForm(Params?) {
    let data: any = {
      id: this.id,
      email: Params
    }
    return this.http.post<boolean>(this.baseUrl + "initiative/GetIsViewSubmitForm", data);
  }

  GetDetailInformation(id): Observable<DetailInformation> {
    var result = this.http.get<DetailInformation>(
      this.baseUrl + "DetailInformation/" + id
    );
    return result;
  }


  GetOwnerName(Params?): Observable<Owner> {
    let params = new HttpParams();
    if (Params != null) {
      params = params.append("text", Params.text);
    }
    return this.http.get<Owner>(this.baseUrl + "Owner/Name", { params });
  }

  GetUser(username): Observable<Owner> {
    return this.http.get<Owner>(this.baseUrl + "Owner/User/" + username);
  }

  GetOwnersVP(Params) {
    let params = new HttpParams();
    if (Params != null) {
      params = params.append("text", Params.text);
    }
    return this.http.get(this.baseUrl + "Owner/getVP", { params });
  }

  GetOwnerEmail(Params?): Observable<Owner> {
    let params = new HttpParams();
    if (Params != null) {
      params = params.append("text", Params.text);
    }
    return this.http.get<Owner>(this.baseUrl + "Owner/OwnerEmail", { params });
  }

  GetInitiativeList(Params?): Observable<Array<string>> {
    let params = new HttpParams();
    if (Params != null) {
      params = params.append("text", Params.text);
    }
    return this.http.get<Array<string>>(this.baseUrl + "initiative/GetInitiativeList", { params });
  }

  GetTypeOfInvestments() {
    return this.http.get(this.baseUrl + "TypeOfInvestment");
  }

  CreateCoDeveloper(id, coDeveloper) {
    return this.http.post(
      this.baseUrl + "initiative/CoDeveloper/" + id,
      coDeveloper
    );
  }

  UpdateCoDeveloper(id, coDeveloper) {
    return this.http.put(
      this.baseUrl + "initiative/CoDeveloper/" + id,
      coDeveloper
    );
  }

  DeleteCoDeveloper(id) {
    return this.http.delete(this.baseUrl + "initiative/CoDeveloper/" + id);
  }

  UpdateRequestOpex(id, opex) {
    return this.http.put(this.baseUrl + "initiative/RequestOpex/" + id, opex);
  }

  GetCompany() {
    return this.http.get(this.baseUrl + "hrwebservice/getCompany"); // getPositionLevel40
  }

  GetProjectManager() {
    return this.http.get(this.baseUrl + "owner/getProjectManager"); // getPositionLevel40
  }

  GetLastestUpdate(id): Observable<any> {
    return this.http.get<any>(
      this.baseUrl + "initiative/getLastestUpdate/" + id
    );
  }

  UpdateBenefitAmount(id, benefit) {
    return this.http.put(
      this.baseUrl + "initiative/BenefitAmount/" + id,
      benefit
    );
  }

  GetUserCompany(Params: string): Observable<any> {
    let params = new HttpParams();
    if (Params != null) {
      params = params.append("email", Params);
    }
    return this.http.get<any>(
      this.baseUrl + "initiative/getUserCompany", { params }
    );
  }

  SetRequestCapex(id, initiatives) {
    return this.http.put(
      this.baseUrl + "initiative/SetRequestCapex/" + id,
      initiatives
    );
  }

  GetInitiativeActionStatusFromActionBy(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + "initiative/GetInitiativeActionStatusFromActionBy/" + id);
  }

  async GetInitiativeStages(id: number): Promise<StageDetail[]> {
    return await (this.http.get<StageDetail[]>(this.baseUrl + "initiative/GetInitiativeStages/" + id)).toPromise();
  }

  async PutUpdateByUser(id): Promise<any> {
    let data: any = {
      id: id,
      email: localStorage.getItem("user")
    }
    return await (this.http.post<any>(this.baseUrl + "initiative/UpdateBy", data)).toPromise();
  }

  // GetOrganizations() {
  //  return this.http.get(this.baseUrl + 'Organization');
  // }

  //CreateDetailPimGate() {
  //  return this.http.post(this.baseUrl + 'initiative/CreateDetailPimGate/',null);
  //}

  GetPrintData() {
    return this.http.get(this.baseUrl + "initiative/Print/" + this.id, {
      responseType: "blob",
    });
  }

  DuplicateInitiative(): Observable<number> {
    let data: {
      id: number;
      email: string;
    } = {
      id: this.id,
      email: this.username
    }
    return this.http.post<number>(
      this.baseUrl + "initiative/Duplicate",
      data
    );
  }

  GetStageNameReplace(id) {
    return this.http.get<string>(
      this.baseUrl + "initiative/GetStageNameReplace/" + id
    );
  }

  // postMaintainKpis<T>(kpis: any) {
  //   const endpointUrl = this.baseUrl + 'Kpis/PostMaintainKpi/';
  //   let data = JSON.stringify(kpis);
  //   return this.http.post<T>(endpointUrl, data);
  // }
  postMaintainKpis(obj: [], year): Observable<any> {
    //return this.http.post<any>(this.baseUrl + 'Kpis/PostMaintainKpi/', obj);
    return this.http.post<any>(this.baseUrl + 'KpiKriMaintain/PostMaintainKpi/' + year, obj);
  }

  GetMaintainKpis(year): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'KpiKriMaintain/GetMaintainKpi/' + year);
  }

  // GetInitiativeKpi(params: string) {
  //   return this.http.get(this.baseUrl + "initiative/GetInitiativeKpi/" + params);
  //   // const endpointUrl = `${this.url}/initiative`;
  //   // return this.http.get<T>(endpointUrl, this.requestHeaders);
  // }
  GetInitiativeKpi(Params?) {
    let params = new HttpParams();
    if (Params != null) {
      params = params.append("text", Params);
    }
    return this.http.get(this.baseUrl + "initiative/GetInitiativeKpi", { params });
  }



  GetButtonAction(data) {
    return this.http.post<any>(this.baseUrl + "initiative/GetButtonAction", data);
  }
  GetLastSubmittedDate(id) {
    return this.http.get<any>(this.baseUrl + "initiative/GetLastSubmittedDate/" + id);
  }

  async GetRequestPoolPimInitiativeList(condition: SearchConditonPoolPim): Promise<InitiativeListPoolPim[]> {
    return await (this.http.post<InitiativeListPoolPim[]>(this.baseUrl + "initiative/GetRequestPoolPimInitiativeList", condition)).toPromise();
  }

  CheckkpiExist(id) {
    return this.http.get<any>(this.baseUrl + "kpikrimaintain/CheckkpiExist/" + id);
  }

  async CalculateIrr(irrDetail: IrrDetail): Promise<any> {
    return await (this.http.post<any>(this.baseUrl + "initiative/CalculateIrr", irrDetail)).toPromise();
  }
  async CalculateRam(ramDetail: RamDetail): Promise<any> {
    return await (this.http.post<any>(this.baseUrl + "initiative/CalculateRam", ramDetail)).toPromise();
  }
  async CalculateJFactor(jFactorDetail: JFactorDetail): Promise<any> {
    return await (this.http.post<any>(this.baseUrl + "initiative/CalculateJFactor", jFactorDetail)).toPromise();
  }


  async GetOwnerNameByIndicator(data): Promise<any> {
    return await (this.http.post<any>(this.baseUrl + "initiative/GetOwnerNameByIndicator", data)).toPromise();
  }

  async SetFlowRevise(id: number): Promise<any> {
    return await (this.http.post<any>(this.baseUrl + "initiative/SetInitiativeFlowRevise", { id: id })).toPromise();
  }

  async RealtimeInterface(id: number): Promise<any> {
    return await (this.http.post<any>(this.baseUrl + "initiative/RealtimeInterface", { id: id })).toPromise();
  }

  mergeDetail(formGroup: FormGroup) {
    let detail: DetailInformation = (formGroup.get('DetailMaxForm') as FormGroup).getRawValue();
    let detailPim: DetailInformation = (formGroup.get('detailPimForm') as FormGroup).getRawValue();
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


    if (this.initiativeType !== "dim") {
      detail.projectManager = detailPim.projectManager;
      detail.projectSponsor = detailPim.projectSponsor
      detail.sponsorEvp = detailPim.sponsorEvp;
    }
    detail.projectDirector = detailPim.projectDirector;
    detail.processEngineer = detailPim.processEngineer;
    detail.divMgrOfProcessEngineer = detailPim.divMgrOfProcessEngineer;
    detail.projectEngineer = detailPim.projectEngineer;



    detail.smes = detailPim.smes;


    //highlightWork
    detail.highlightWorkStatus = detailPim.highlightWorkStatus;
    detail.highlightWorkConCern = detailPim.highlightWorkConCern;
    detail.nextActivities = detailPim.nextActivities;
    return detail;
  }

  async GetInitiativeStagesById(id: number): Promise<StageDetailById[]> {
    return await (this.http.get<StageDetailById[]>(this.baseUrl + "initiative/GetInitiativeStagesByInitiativeId/" + id)).toPromise();
  }

  GetOwnersID(Params?): Observable<OwnerList[]> {
    let params = new HttpParams();
    if (Params != null) {
      params = params.append("text", Params.text);
    }
    return this.http.get<OwnerList[]>(this.baseUrl + "Owner", { params });
  }

  GetOwnerNameByID(employeeID?): Observable<OwnerList> {
    return this.http.get<OwnerList>(this.baseUrl + "Owner/GetOwnerNameByID/" + employeeID);
  }

  GetInitiativeStageForMaxPermission(initiativeId: number): Observable<InitiativeStage[]> {
    return this.http.get<InitiativeStage[]>(this.baseUrl + "initiative/GetInitiativeStageForMaxPermission/" + initiativeId);
  }
  
  async GetOwnerNameByIndicatorByPlant(dataInput,plant): Promise<any> {
    let data :{
      initiativeId: number,
      indicator: string;
      plant:String;
    } = {
      initiativeId:dataInput.initiativeId,
      indicator:dataInput.indicator,
      plant:plant
    }
    return await (this.http.post<any>(this.baseUrl + "initiative/GetOwnerNameByIndicatorByPlant", data)).toPromise();
  }

}
