import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { InitiativeService } from '@services/initiative/initiative.service';
import { StatusService } from '@services/status/status.service';

@Component({
  selector: 'app-initiative-header',
  templateUrl: './initiative-header.component.html',
  styleUrls: ['./initiative-header.component.css']
})
export class InitiativeHeaderComponent implements OnInit {

  @Input() name: string;

  @ViewChild('ViewLogHistoryModal', { static: false }) ViewLogHistoryModal: ModalDirective;

  @ViewChild('HistoryStatus', { static: false }) HistoryStatus: ModalDirective;

  @ViewChild('ContactIO', { static: false }) ContactIO: ModalDirective;

  constructor(
    private initiativeService: InitiativeService,
    private statusService: StatusService
  ) { }

  id: number;
  page: string;
  history: string;

  IsApprove: boolean;

  get Impact() {
    return this.page === 'impact';
  }

  ngOnInit(): void {
    this.id = Number(sessionStorage.getItem('id'));
    this.page = sessionStorage.getItem('page');

    if (this.id) { this.GetSuggestStatus(this.id); }
    this.IsApprove = (sessionStorage.getItem('tab') === 'true') ? true : false;
  }

  GetSuggestStatus(id) {
    this.initiativeService.GetSuggestStatus(id).subscribe(response => {
      const check = { status: response.status, stage: response.stage };
      this.statusService.CheckApproveInformation(check).subscribe((result) => this.IsApprove = result ? true : false);
    });
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

  ShowContactIO() {
    this.ContactIO.show();
  }

  CloseContactIO() {
    this.ContactIO.hide();
  }

  getInitiativeName() {
    return this.initiativeService.initiativeName;
  }
}
