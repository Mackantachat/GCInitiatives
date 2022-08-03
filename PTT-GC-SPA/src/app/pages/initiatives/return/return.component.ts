import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { InitiativeService } from '@services/initiative/initiative.service';
import { StatusService } from '@services/status/status.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {

  constructor(
    private initiativeService: InitiativeService,
    private statusService: StatusService,
  ) { }

  @Input() id;

  status: string;
  stage: string;

  IsCim: boolean;
  IsPim: boolean;
  IsDim: boolean;
  IsCapex: boolean;
  IsMax: boolean;
  IsCpi: boolean;
  IsRandD: boolean;
  IsStrategy: boolean;
  IsOther: boolean;

  DetailName: string;

  get IsCimAndStrategy() {
    return ((this.IsCim === true) || (this.IsStrategy === true)) && !this.IsMax === true;
  }

  get IsMaxAndCapex() {
    return (this.IsMax === true) || (this.IsCapex === true);
  }

  get IsCheckCapex() {
    return (this.IsCapex === true);
  }

  AdminApprove: boolean;

  CheckSubmitTo: boolean;

  ngOnInit(): void {
    this.id = Number(sessionStorage.getItem('id'));

    this.CheckAdminApprove();
    this.GetSuggestStatus();
  }

  CheckSubmit(submit) {
    this.CheckSubmitTo = submit;
  }

  GetSuggestStatus() {
    this.initiativeService.GetSuggestStatus(this.id).subscribe(response => {
      this.status = response.status;
      this.stage = response.stage;
      this.IsCim = response.cim ? true : false;
      this.IsCapex = response.directCapex ? true : false;
      this.IsStrategy = response.strategy ? true : false;
      this.IsMax = response.max ? true : false;

      if (this.IsMax) {
        this.DetailName = 'Detail Information (Max)';
      }

      if (this.IsCapex === true) {

        this.DetailName = 'Detail Information (Request CAPEX)';

      }
    });
  }

  CheckAdminApprove() {
    setTimeout(() => {
      const check = { status: this.status, stage: this.stage };
      this.statusService.CheckInitiativeDetail(check).subscribe(result => this.AdminApprove = result);
    }, 500);
  }
}
