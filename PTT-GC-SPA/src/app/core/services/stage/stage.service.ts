import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Stage } from '@models/Stage';
import { History } from '@models/history';
import { InitiativeService } from '@services/initiative/initiative.service';
import { Initiative, StageDetailById } from '@models/initiative';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  baseUrl = environment.apiUrl;

  //condition show pim tab in max
  //stage a subtype b flow c status e

  reviseForecastStage = [
    'Implement IL2 - Project planning',
  ]



  pimGateStage = [
    'IL3',
    'IL3-1',
    'IL3-2',
    'SIL4',
    'IL4',
    'SIL5',
    'IL5',
    'Gate0 : VAC Gate1',
    'Gate0 : Sub-PIC Gate1',
    'Gate2 : VAC Gate3',
    'Gate2 : PIC Gate3',
    'Gate3 : CAPEX-1',
    'Gate3 : CAPEX-2',
    'Gate3 : CAPEX-3'
  ];

  impactRunRateTraget = [
    'IL0',
    'SIL1',
    'IL1',
    'SIL2',
    'IL2',
    'SIL3',
    'Admin Check',
    'Ideate SIL1 - DM',
    'Ideate SIL1 - VP',
    'Ideate SIL1 - SVP',
    'Ideate SIL1 - TO Team',
    'Ideate IL1',
    'Ideate SIL2 - Reviewing',
    'Ideate IL2 - DIM Committee',
    'Implement IL2 - VP',
    'Implement IL2 - SVP/EVP',
    'Implement IL2 - Budget Team',
    'Implement IL2 - App Req',
    'Implement IL2 - WBS',
    'Implement IL2 - Project planning',
    'Implement SIL3',
    'Implement IL2 - DIM approved',
    'Implement IL2 - Reviewing'
  ]
  impactRunRateRevise = [
    'IL3-2',
    'SIL4',
    'Gate2 : VAC Gate3',
    'Gate2 : PIC Gate3',
    'Gate3 : CAPEX-1',
    'Gate3 : CAPEX-2',
    'TFE CAPEX Approve',
    'Gate3 : Budget Team',
    'App. Request',
    'WBS Request',
    'IL3-3',
    'Budget Team',
    'IL3-1',
    'IL3-2',
    'Implement IL3',
    'Adopt IL3 - Golive',
    'IL3 - App. Request',
    'IL3 - WBS Request',
    'IL3-3',
    'IL3 - Budget Team'
  ]
  impactRunRateActual = [
    'IL4',
    'SIL5',
    'IL5',
    'Adopt IL4'
  ]

  impactRunRateActualIL4 = [
    'IL4',
    'Adopt IL4'
  ]

  financialImpactStageValidate = [
    'IL0',
    'SIL1',
    'IL1',
    'SIL2',
    'IL2',
    'SIL3',
    'IL3-1',
    'Gate0 : VAC Gate1',
    'Gate0 : Sub-PIC Gate1',
    'IL3-2',
    'SIL4',
    'IL4',
    'SIL5',
    'IL5',
    'Admin Check',
    'Ideate SIL1 - DM',
    'Ideate SIL1 - VP',
    'Ideate SIL1 - SVP',
    'Ideate SIL1 - TO Team',
    'Ideate IL1',
    'Ideate SIL2 - Reviewing',
    'Ideate IL2 - DIM Committee',
    'Implement IL2 - VP',
    'Implement IL2 - SVP/EVP',
    'Implement IL2 - Budget Team',
    'Implement IL2 - App Req',
    'Implement IL2 - WBS',
    'Implement IL2 - Project planning',
    'Implement SIL3',
    'Implement IL3',
    'Adopt IL3 - Golive',
    'Adopt SIL4 - Closure',
    'Adopt IL4',
    'Adopt SIL5'
  ]

  IsOriginalDisable = [
    'Implement - Project Planning',
    'Implement - Admin check',
    'Implement - In progress',
    'Adopt - Golive',
    'Adopt - Closure',
    'Completed',

    // financial
    'Implement IL2 - VP',
    'Implement IL2 - SVP/EVP',
    'Implement IL2 - Budget Team',
    'Implement IL2 - App Req',
    'Implement IL2 - WBS',
    'Implement IL2 - Project planning',
    'Implement SIL3',

    'Implement IL3',
    'Adopt IL3 - Golive',
    'Adopt SIL4 - Closure',
    'Adopt IL4',
    'Adopt SIL5',
    'IL5'
  ]

  IsOriginalRequire = [
    // 'Implement - Project Planning',
    // 'Implement - Admin check',
    // 'Implement - In progress',
    'Adopt - Golive',
    'Adopt - Closure',
    'Completed',

    // financial
    'Implement IL2 - VP',
    'Implement IL2 - SVP/EVP',
    'Implement IL2 - Budget Team',
    'Implement IL2 - App Req',
    'Implement IL2 - WBS',
    'Implement IL2 - Project planning',
    'Implement SIL3',

    'Implement IL3',
    'Adopt IL3 - Golive',
    'Adopt SIL4 - Closure',
    'Adopt IL4',
    'Adopt SIL5',
    'IL5'
  ]

  SSPIM = [
    //'First Review-1', //for test
    // 'DD-3',
    // 'Seeking Potential-3',
    // 'Detail F/S-3',
    // 'BEP-3',
    'Commercial Operation-1',
    'Commercial Operation-2',
    'Commercial Operation-3',
    'Closing-1',
    'Closing-2',
    'Closing-3',
    'S-SP-IM DM-1',
    '- S-SP-IM DM-1',
    // 'S-SP-IM DM-2',
    'Pre-DD-4',
    'DD-4',
    'Seeking Potential-4',
    'Detail F/S-4',
    'BEP-4'
  ];

  CimCheckStageForTeamSupport = [
    'Detail F/S-1',
    'Seeking Potential-1',
    'Pre-DD'
  ]

  stageForShowDimLookback = [
    'Adopt IL3 - Golive',
    'Adopt SIL4 - Closure',
    'Adopt IL4',
    'Adopt SIL5',
    'IL5',
    'Adopt - Golive',
    'Adopt - Closure',
    'Completed'
  ];

  disableRequestSubPIC = [
    'IL3',
    'IL3-1',
    'IL3-2',
    'SIL4',
    'IL4',
    'SIL5',
    'IL5',
    'Gate0 : VAC Gate1',
    'Gate0 : Sub-PIC Gate1',
    'Gate2 : VAC Gate3',
    'Gate2 : PIC Gate3',
    'Gate3 : CAPEX-1',
    'Gate3 : CAPEX-2',
    'Gate3 : CAPEX-3'
  ];

  disableValidateProcurment = [
    'IL0',
    'IL1',
  ];

  disableSelectFirstRunrate = [
    'Gate2 : VAC Gate3',
    'Gate2 : PIC Gate3',
    'Gate3 : CAPEX-1',
    'Gate3 : CAPEX-2',
    'TFE CAPEX Approve',
    'Gate3 : Budget Team',
    'App. Request',
    'WBS Request',
    'Budget Team',
    'Implement IL3',
    'Adopt IL3 - Golive',
    'IL3 - App. Request',
    'IL3 - WBS Request',
    'IL3 - Budget Team',
    'Adopt IL4',
    'IL3',
    'IL3-1',
    'IL3-2',
    'IL3-3',
    'SIL4',
    'IL4',
    'SIL5',
    'IL5'
  ]



  constructor(
    private http: HttpClient,
    private initiativeService: InitiativeService
  ) { }

  GetApproveComment(id, stage): Observable<History> {
    return this.http.post<History>(this.baseUrl + 'StatusTracking/ApproveComment/' + id, stage);
  }

  GetStatusTracking(id): Observable<Stage> {
    return this.http.get<Stage>(this.baseUrl + 'StatusTracking/' + id);
  }

  GetHistoryStatus(id, stage): Observable<History> {
    return this.http.post<History>(this.baseUrl + 'StatusTracking/HistoryStatus/' + id, stage);
  }

  GetHistoryStatusList(id): Observable<History> {
    return this.http.get<History>(this.baseUrl + 'StatusTracking/HistoryStatus/' + id);
  }

  //function convert stage

  get nextSatageTobe() {
    let stageDetail: StageDetailById[] = this.initiativeService.initiativeStageDetail.value;
    let generalData: Initiative = this.initiativeService.generalData.value;
    if (stageDetail.length == 0 || !generalData) {
      return;
    }
    let current = stageDetail.find(x => x.initiativeId == this.initiativeService.id && x.currentStage == generalData.stage && x.subtype == generalData.initiativeSubType && x.flowType == generalData.flowType && x.currentStatus == generalData.status);
    return current ? current.nextActionInformation : null;
  }

  convertStage(stage: string) {
    if (!stage) {
      return;
    }
    let index = stage.substring(length, length - 1);
    if (parseInt(index) > 0 && stage.substring(length, length - 2) === '-' + index) {
      return stage.substring(0, length - 2);
    }
    return stage;
  }

  checkStageUnderIL3() {
    let stageDetail: StageDetailById[] = this.initiativeService.initiativeStageDetail.value;
    let generalData: Initiative = this.initiativeService.generalData.value;
    if (stageDetail.length == 0 || !generalData) {
      return;
    }
    let current = stageDetail.find(x => x.initiativeId == this.initiativeService.id && x.currentStage == generalData.stage && x.subtype == generalData.initiativeSubType && x.flowType == generalData.flowType && x.currentStatus == generalData.status);
    let match = stageDetail.find(x => x.initiativeId == this.initiativeService.id && x.currentStage == 'IL3-1' && x.subtype == generalData.initiativeSubType);
    let currentSequence = current ? current.sequence : 0;
    let matchSequence = match ? match.sequence : 0;
    if (currentSequence <= matchSequence) {
      return false;
    }
    return true;
  }

  checkStageEqualAndOverIL1() {
    let stageDetail: StageDetailById[] = this.initiativeService.initiativeStageDetail.value;
    let generalData: Initiative = this.initiativeService.generalData.value;
    if (stageDetail.length == 0 || !generalData) {
      return false;
    }
    let current = stageDetail.find(x => x.initiativeId == this.initiativeService.id && x.currentStage == generalData.stage && x.subtype == generalData.initiativeSubType && x.flowType == generalData.flowType && x.currentStatus == generalData.status);
    let match = stageDetail.find(x => x.initiativeId == this.initiativeService.id && x.currentStage == 'IL1' && x.subtype == generalData.initiativeSubType);
    let currentSequence = current ? current.sequence : 0;
    let matchSequence = match ? match.sequence : 0;
    if (currentSequence < matchSequence) {
      return false;
    }
    return true;
  }

}
