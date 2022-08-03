import { StatusService } from '@services/status/status.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InitiativeService } from '@services/initiative/initiative.service';
import { StageService } from '@services/stage/stage.service';

@Component({
  selector: 'app-initiative-box',
  templateUrl: './initiative-box.component.html',
  styleUrls: ['./initiative-box.component.css']
})
export class InitiativeBoxComponent implements OnInit, OnDestroy {

  constructor(
    private initiativeService: InitiativeService,
    private statusService: StatusService,
    private stageService: StageService
  ) { }

  id: number;

  status: string;
  stage: string;
  remark: string;

  CheckStatus: boolean;

  ngOnInit(): void {
    this.id = Number(sessionStorage.getItem('id'));
    if (sessionStorage.getItem('box') === 'true') {
      this.CheckStatus = true;
      this.status = sessionStorage.getItem('Status');
      this.remark = sessionStorage.getItem('Remark');
      this.stage = sessionStorage.getItem('Stage');
    } else {
      this.initiativeService.GetSuggestStatus(this.id).subscribe(response => {
        this.status = response.status;
        this.stage = response.stage;

        const stage = ['SIL1', 'SIL2', 'SIL3', 'SIL4', 'SIL5'];
        if (!(stage.indexOf(this.stage) !== -1)) {
          this.stageService.GetApproveComment(this.id, { stage: this.stage }).subscribe(remark => {
            this.remark = remark ? remark.comment : null;
          });
        }

        const check = { status: this.status, stage: this.stage };
        this.statusService.CheckInitiativeDetail(check).subscribe(result => {
          this.CheckStatus = result ? true : false;
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.CheckStatus) {
      sessionStorage.setItem('box', 'true');
      sessionStorage.setItem('Stage', this.stage);
      sessionStorage.setItem('Status', this.status);
      if (this.remark) {
        sessionStorage.setItem('Remark', this.remark);
      }
    } else {
      sessionStorage.removeItem('box');
    }
  }
}
