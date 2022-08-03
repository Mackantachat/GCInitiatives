import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { PlanLookbackModel } from '@models/lookback';

@Injectable({
  providedIn: 'root'
})
export class LookbackService {

  host = environment.apiUrl;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': this.basic
  });

  constructor(
    private http: HttpClient,
  ) {
  }

  // ==================================== PLAN LOOKBACK SECTION ==================================== //
  // Get Plan lookback
  GetPlanLookBack = (): Promise<PlanLookbackModel[]> => {
    return this.http.get(this.host + 'PlanLookback/GetPlanLookbackListAll', {
    }).toPromise().then((r) => {
      // console.log('GetPlanLookBack() : ', r);
      return r as PlanLookbackModel[];
      // return [this.mockData];
    }).catch(e => e);
  }

  // For only test
  GetPlanLookBack2 = (): Promise<any> => {
    return this.http.get(this.host + 'LookbackProjectLookback/GetProjectLookbackAll', {
    }).toPromise().then((res) => {
      const dt = {
        ProjectLookbackId: res[0].ProjectLookbackId,
        FinishingDate: res[0].finishingDate,
        PlanLookbackDate: res[0].planLookbackDate,
        PlanEnviLookBackDate: res[0].planEnviLookBackDate,
        PlanPerformanceLookbackDate: res[0].planPerformanceLookbackDate,

        LookbackReview: res[0].lookbackReview, // Ref.

        ProjectBackground: res[0].projectBackground,
        ScopeOfInitiative: res[0].scopeOfInitiative,
        ProjectObjective: res[0].projectObjective,

        PerformanceLookback: res[0].performanceLookback,
        ExecutionLookbackProcess: res[0].executionLookbackProcess,
        CimLookback: res[0].cimLookback,

        ExecutionLookback: res[0].executionLookback, // Ref.
        PerformancePlanLookbackDate: res[0].performancePlanLookbackDate,
        CoreUplift: res[0].coreUplift, // Ref.
        CoreUpliftResultDescription: res[0].coreUpliftResultDescription,
        CoreUpliftResultUnit: res[0].coreUpliftResultUnit,
        CoreUpliftResultBefore: res[0].coreUpliftResultBefore,
        CoreUpliftResultAfter: res[0].coreUpliftResultAfter,
        CoreUpliftResultBenefit: res[0].coreUpliftResultBenefit,
        CoreUpliftResultRating: res[0].coreUpliftResultRating,
        EnviPlanLookbackDate: res[0].enviPlanLookbackDate,

        ProjectImpact: res[0].projectImpact, // Ref.
        ProjectImpactWork: res[0].projectImpactWork, // Ref.

        PollutionPrevention: res[0].pollutionPrevention,
        PollutionPreventionSpecify: res[0].pollutionPreventionSpecify,
        GlobalEnvirCons: res[0].globalEnvirCons,
        GlobalEnvirConsSpecify: res[0].globalEnvirConsSpecify,
        ResourceCirculation: res[0].resourceCirculation,
        ResourceCirculationSpecify: res[0].resourceCirculationSpecify,

        // EnvironmentResultCategory: res[0].environmentResultCategory,
        // EnvironmentResultUnit: res[0].environmentResultUnit,
        // EnvironmentResultBefore: res[0].environmentResultBefore,
        // EnvironmentResultBenefitYear: res[0].environmentResultBenefitYear,
        // EnvironmentResultBenefitYearThb: res[0].environmentResultBenefitYearThb,
        // EnvironmentResultRemark: res[0].environmentResultRemark

        EnvironmentResult: res[0].EnvironmentResult

      };
      return [dt];
    }).catch(e => e);
  }

  GetPlanLookbackById = (id): Promise<any> => {
    return this.http.get(this.host + 'PlanLookback/GetPlanLookbackByID?id=' + id).toPromise().then((r) => {
      console.log('this.host : ', this.host);
      return r;
      // return [this.mockData];
    }).catch(e => e);
  }

  // Create Plan lookback
  CreatePlanLookback = (data): Promise<any> => {
    console.log('Create data: ', data);
    return this.http.post(this.host + 'PlanLookback/CreatePlanLookback', data, { headers: this.headers }).toPromise();
  }

  UpdatePlanLookback = (data): Promise<any> => {
    console.log('Update data: ', data);
    return this.http.post(this.host + 'PlanLookback/UpdatePlanLookback', data, { headers: this.headers }).toPromise();
  }
  // =============================================================================================== //

  // ==================================== EXECECUTION LOOKBACK SECTION ==================================== //
  // Get executioon lookback
  GetExececutionLookback = (): Promise<any> => {
    return this.http.get(this.host, {
    }).toPromise().then((r) => r).catch(e => e);
  }

  // Update exection lookback
  UpdateExecutionLookback = (): Promise<any> => {
    return this.http.post(this.host + 'LookbackProjectLookback/CreateProjectLookback', {
    }).toPromise().then((r) => r).catch(e => e);
  }
  // ====================================================================================================== //

  // ==================================== PERFORMANCE LOOKBACK SECTION ==================================== //
  // Get performance lookback
  GetPerformanceLookback = (): Promise<any> => {
    return this.http.get(this.host, {
    }).toPromise().then((r) => r).catch(e => e);
  }

  // Update performance lookback
  UpdatePerformanceLookback = (): Promise<any> => {
    return this.http.get(this.host, {
    }).toPromise().then((r) => r).catch(e => e);
  }

  // Get perforamace lookback result
  GetPerformanceLookbackResult = (): Promise<any> => {
    return this.http.get(this.host, {
    }).toPromise().then((r) => r).catch(e => e);
  }

  // Update performance lookback result
  UpdatePerformanceLookbackResult = (): Promise<any> => {
    return this.http.get(this.host, {
    }).toPromise().then((r) => r).catch(e => e);
  }
  // ====================================================================================================== //

  // ==================================== ENVIRONMENT LOOKBACK SECTION ==================================== //
  // Get environment lookback
  GetEnivronmentLookback = (): Promise<any> => {
    return this.http.get(this.host, {
    }).toPromise().then((r) => r).catch(e => e);
  }

  // Update environment lookback
  UpdateProjectImpact = (): Promise<any> => {
    return this.http.put(this.host, {
    }).toPromise().then((r) => r).catch(e => e);
  }

  // Update what worked, did not work
  UpdateWorked = (): Promise<any> => {
    return this.http.put(this.host, {
    }).toPromise().then((r) => r).catch(e => e);
  }

  // Get environment lookback result
  GetEnvironmentLookbackResult = (): Promise<any> => {
    return this.http.get(this.host, {
    }).toPromise().then((r) => r).catch(e => e);
  }

  // Update environment lookback result
  UpdateEnvironmentLookbackResult = (): Promise<any> => {
    return this.http.put(this.host, {
    }).toPromise().then((r) => r).catch(e => e);
  }

  async GetDataFromSAP(id): Promise<any> {
    return await (this.http.get<any>(this.host + 'PlanLookback/GetDataFromSAP/' + id)).toPromise();
  }
  // ====================================================================================================== //
}

