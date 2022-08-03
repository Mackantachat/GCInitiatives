import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InitiativeHistoryIndex } from '@models/initiativeHistoryIndex';
import { InitiativeService } from '@services/initiative/initiative.service';
import { InitiativehistoryindexService } from '@services/initiativehistoryindex/initiativehistoryindex.service';

@Component({
  selector: 'app-initiative-history',
  templateUrl: './initiative-history.component.html',
  styleUrls: ['./initiative-history.component.css']
})
export class InitiativeHistoryComponent implements OnInit {


  constructor(
    private initiativeService: InitiativeService,
    private initiativeHistoryIndexService: InitiativehistoryindexService,
    private router: Router,
  ) {
    this.page = null
  }

  id: number
  page: string;
  initiativeHistoryIndexList: InitiativeHistoryIndex[] = [];

  async ngOnInit(): Promise<void> {
    if (this.initiativeService.id) {

      this.id = this.initiativeService.id
      this.page = this.initiativeService.page;
      this.initiativeHistoryIndexList = await this.LoadInitiativeHistoryList(this.initiativeService.id);
    }
  }

  ShowInitiativeHistory(initiativeIdHistory) {
    var url = window.location.origin + "/initiative/initiative-history-redirector?id=" + initiativeIdHistory;
    var winOpen = window.open(url, "_blank");
    winOpen.sessionStorage.setItem('id', initiativeIdHistory);
  }

  LoadInitiativeHistoryList(initiativeId): Promise<InitiativeHistoryIndex[]> {
    return new Promise<InitiativeHistoryIndex[]>((resolve, reject) => {
      this.initiativeHistoryIndexService.GetInitiativeHistoryIndexes(initiativeId).subscribe(result => {
        resolve(result);
      },
        err => {
          reject([]);
        });
    });
  }

  ReplaceStage(stage: string) {
    return stage?.replace(/(\-\d)/g, '');
  }
}
