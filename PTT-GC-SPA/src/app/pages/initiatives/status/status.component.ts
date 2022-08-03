import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { InitiativeService } from '@services/initiative/initiative.service';
import { StageService } from '@services/stage/stage.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  @ViewChild('ViewLogHistoryModal', { static: false }) ViewLogHistoryModal: ModalDirective;

  @ViewChild('HistoryStatus', { static: false }) HistoryStatus: ModalDirective;

  constructor(
    private initiativeService: InitiativeService,
    private stageService: StageService
  ) { }

  Cim: boolean;
  Dim: boolean;
  Capex: boolean;
  Strategy: boolean;
  Max: boolean;

  id: number;
  page = 'status';
  name = 'Status';

  status: string;
  stage: string;
  remark: string;

  statusTrackings: any = [];
  historyStatus: any = [];
  stages: any = [];

  history: string;

  ngOnInit(): void {
    this.id = this.initiativeService.id;
    sessionStorage.setItem('page', 'status');
    this.GetSuggestStatus(this.id);
    this.SetGeneral();
    this.GetHistoryStatusList(this.id);
    this.GetStatusTracking(this.id);
  }

  SetGeneral() {
    if (sessionStorage.getItem('InitiativeValidated') === 'true') {
      sessionStorage.setItem('InitiativeValidate', 'true');
      sessionStorage.setItem('InitiativeActive', 'true');
    }
  }

  ShowViewLogHistory() {
    this.ViewLogHistoryModal.show();
  }

  CloseViewLogHistory() {
    this.ViewLogHistoryModal.hide();
  }

  ShowHistory(stage) {
    this.history = stage;
    this.HistoryStatus.show();
  }

  CloseHistoryStatus() {
    this.HistoryStatus.hide();
  }

  GetSuggestStatus(id) {
    this.initiativeService.GetSuggestStatus(id).subscribe(response => {
      this.status = response.status;
      this.stage = response.stage;
      this.remark = response.remark;
      this.Cim = response.cim ? true : false;
      this.Dim = response.dim ? true : false;
      this.Capex = response.directCapex ? true : false;
      this.Strategy = response.strategy ? true : false;
      this.Max = response.max ? true : false;
    });
  }

  GetHistoryStatusList(id) {
    this.stageService.GetHistoryStatusList(id).subscribe(response => {
      this.historyStatus = response;
      this.historyStatus.forEach(result => {
        if (!(this.stages.indexOf(result.stage) !== -1)) {
          this.stages.push(result.stage);
        }
      });
    });
  }

  GetStatusTracking(id) {
    this.stageService.GetStatusTracking(id).subscribe(response => this.statusTrackings = response);
  }

  CheckStage(stage) {
    const stages =
      ['SIL1', 'SIL2', 'SIL3', 'SIL4', 'SIL5',
        'DM', 'VP', 'EVP/MD/SEVP/COE/PSD/CEO',
        'Budget Team', 'BOD', 'App. Request',
        'WBS Request', 'Budget Distribute', 'Budget Excellence Distribute', 'Budget Pool'];
    return this.stages.indexOf(stage) !== -1;
  }

  Draft(page) { }

  Submit(page) { }

  ReplaceStage(stage: string) {
    return stage.replace(/(\-\d)/g, '');
  }
}
