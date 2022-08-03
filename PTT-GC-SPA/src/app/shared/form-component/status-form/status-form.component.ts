import { BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { InitiativeService } from '@services/initiative/initiative.service';
import { StageService } from '@services/stage/stage.service';
import { trim } from 'jquery';
import { SwalTool } from '@tools/swal.tools';
import { HistoryStatusComponent } from '@components/history-status/history-status.component';
@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css']
})
export class StatusFormComponent implements OnInit {

  //@ViewChild('ViewLogHistoryModal', { static: false }) ViewLogHistoryModal: ModalDirective;

  //@ViewChild('HistoryStatus', { static: false }) HistoryStatus: ModalDirective;

  constructor(
    private initiativeService: InitiativeService,
    private stageService: StageService,
    private modalService: BsModalService,
    private swalTool: SwalTool
  ) { }

  Cim: boolean;
  Dim: boolean;
  Capex: boolean;
  Strategy: boolean;
  Max: boolean;
  itDigital: boolean;

  @Input() id: number;
  page = 'status';
  name = 'Status';

  status: string;
  stage: string;
  remark: string;

  statusTrackings: any = [];
  historyStatus: any = [];
  stages: any = [];
  hideShowBtnText = "Hide";

  history: string;
  config: ModalOptions = {
    class: 'modal-xl'
  };

  ngOnInit(): void {
    // this.id = Number(sessionStorage.getItem('id'));
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


  GetSuggestStatus(id) {
    this.initiativeService.GetSuggestStatus(id).subscribe(response => {
      if (response) {
        this.status = response.status;
        this.stage = response.stage;
        this.remark = response.remark;
        this.Cim = response.cim ? true : false;
        this.Dim = response.dim ? true : false;
        this.Capex = response.directCapex ? true : false;
        this.Strategy = response.strategy ? true : false;
        this.Max = response.max ? true : false;
        this.itDigital = response.initiativeType.toUpperCase() === "IT" || response.initiativeType.toUpperCase() === "DIGITAL" ? true : false;
      }
    });
  }

  GetHistoryStatusList(id) {
    this.stageService.GetHistoryStatusList(id).subscribe(response => {
      if (response) {
        this.historyStatus = response;
        this.historyStatus.forEach(result => {
          if (!(this.stages.indexOf(result.stage) !== -1)) {
            this.stages.push(result.stage);
          }
        });
      }
    });
  }

  GetStatusTracking(id) {
    this.stageService.GetStatusTracking(id).subscribe(response => this.statusTrackings = response);
  }

  CheckStage(stage, actionBy) {

    if (this.itDigital) {
      let value = this.historyStatus.find(x => x.stage == stage);
      if (value && value.comment && value.comment.trim() != '') {
        return true;
      }
      return false;

    } else {
      let value = this.historyStatus.find(x => x.stage == stage && x.actionBy == actionBy);
      if (value && value.comment && value.comment.trim() != '') {
        return true;
      }
      return false;
    }
    // if (stage)
    //   this.stageService.GetHistoryStatus(this.id, { stage: this.stage }).subscribe((checkRes) => {
    //     if (checkRes) {
    //       if (checkRes.comment && checkRes.comment.trim() != '') {
    //         return true;
    //       }
    //       return false;
    //     } else {
    //       return false;
    //     }
    //   });


    // const stages =
    //   ['SIL1', 'SIL2', 'SIL3', 'SIL4', 'SIL5',
    //     'DM', 'VP', 'EVP/MD/SEVP/COE/PSD/CEO',
    //     'Budget Team', 'BOD', 'App. Request',
    //     'WBS Request', 'Budget Distribute', 'Budget Excellence Distribute', 'Budget Pool'];
    // return this.stages.indexOf(stage) !== -1;



    //
  }


  ShowHistory(stage) {
    //this.history = stage;
    const overrideConfig = this.config;

    if (this.initiativeService.id) {
      overrideConfig.initialState = {
        id: this.initiativeService.id,
        stage: stage
      };
      this.modalService.show(HistoryStatusComponent, overrideConfig);
    } else {
      this.swalTool.DataNotFound();
    }
  }

  Draft(page) { }

  Submit(page) { }

  ReplaceStage(stage: string) {
    return stage.replace(/(\-\d)/g, '');
  }

  OnHideShow() {
    if (this.hideShowBtnText == "Hide") {
      this.hideShowBtnText = "Show";
    }
    else {
      this.hideShowBtnText = "Hide";
    }
  }

  get statusTrackingLength() {
    return this.statusTrackings.length;
  }

  checkApproveBy(approveBy) {
    return approveBy === 'TEERASAK.T <TP-PM-CO/1346>';
  }
}
