import { InitiativeService } from '@services/initiative/initiative.service';
import { CapexService } from '@services/capex/capex.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-initiative-information',
  templateUrl: './initiative-information.component.html',
  styleUrls: ['./initiative-information.component.css']
})
export class InitiativeInformationComponent implements OnInit {

  constructor(
    private initiativeService: InitiativeService,
    private capexService: CapexService) { }

  @Input() id;
  @Input() SubWorkstream1;
  @Input() CapexType;
  @Input() page;

  subWorkstream1: string;

  InitiativeDetail = { code: null, legacyInitiativeCode: null, stage: null, name: null, year: null, owner: null, organization: null };
  GetRevision = { Revistion: null };

  ngOnInit(): void {
    this.GetInformation();
    this.GetRevistion();

  }

  GetInformation() {
    if (this.id !== 0) {
      this.initiativeService.GetInformation(this.id).subscribe((response) => {
        this.InitiativeDetail = {
          stage: response.stage,
          code: response.initiativeCode,
          legacyInitiativeCode: response.lagacyInitiativeCode,
          name: response.name,
          year: response.year,
          owner: response.ownerName,
          organization: response.organization
        };
        sessionStorage.setItem('InitiativeCode', response.initiativeCode);
      });
    }

  }

  GetRevistion() {
    if (this.id !== 0) {
      this.capexService.GetCapexsInfo(this.id, this.CapexType).subscribe(response => {
        if (response) {
          if (this.CapexType === 'AddmoreCapex' || this.CapexType === 'Return') {
            if (response.revistion === 0) {
              response.revistion = response.revistion + 1;
              this.GetRevision = {
                Revistion: response.revistion
              };
            } else {
              this.GetRevision = {
                Revistion: response.revistion
              };
            }
          } else if (this.CapexType === 'Createnew') {
            this.GetRevision = {
              Revistion: response.revistion
            };
          } else {
            this.GetRevision = {
              Revistion: response.revistion
            };
          }
        }
      });
    }
  }
}
