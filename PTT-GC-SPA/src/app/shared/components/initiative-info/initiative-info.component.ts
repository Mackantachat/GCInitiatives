import { Component, OnInit, Input } from '@angular/core';
import { Initiative } from '@models/initiative';
import { InitiativeService } from '@services/initiative/initiative.service';

@Component({
  selector: 'app-initiative-info',
  templateUrl: './initiative-info.component.html',
  styleUrls: ['./initiative-info.component.css']
})
export class InitiativeInfoComponent implements OnInit {
  @Input() id: number;
  initiative: Initiative;
  response: any;
  constructor(
    private initiativeService: InitiativeService
  ) {
  }

  ngOnInit(): void {
    if (this.id) {

      this.initiativeService.GetInitiative(this.id).subscribe(response => {
        if (response) {
          this.initiativeService.setGeneralData(response);
          this.initiative = response;
          this.initiativeService.initiativeName = response.name;
        }
      });
    }
  }

  CheckInitiativeType(type) {
    const initiativeType = ['IT', 'Digital', 'Request Pool'];
    return initiativeType.indexOf(type) !== -1 ? true : false;
  }

  UpperCaseReplaceStage(stage: string) {

    // this.initiativeService.GetStageNameReplace(this.id).subscribe(r => stage = r);

    return stage.replace(/(\-\d)/g, '').toUpperCase();
  }

}
