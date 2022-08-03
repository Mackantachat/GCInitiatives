import { Component, EventEmitter, Output, Input, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { StageService } from '@services/stage/stage.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-history-status',
  templateUrl: './history-status.component.html',
  styleUrls: ['./history-status.component.css']
})
export class HistoryStatusComponent implements OnInit {

  @Input() id: string;
  @Input() stage: string;
  @Output() modelClose = new EventEmitter();

  constructor(
    private stageService: StageService,
    public bsModalRef: BsModalRef,
  ) { }

  history: any = [];

  ngOnInit() {
    this.stageService.GetHistoryStatus(this.id, { stage: this.stage }).subscribe((response) => {
      this.history = response;
    });
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (!changes?.stage?.firstChange && this.id && this.stage) {
  //     this.stageService.GetHistoryStatus(this.id, { stage: this.stage }).subscribe((response) => {
  //       this.history = response;
  //     });
  //   }
  // }

  CloseModal() {
    this.bsModalRef.hide();
  }

}
