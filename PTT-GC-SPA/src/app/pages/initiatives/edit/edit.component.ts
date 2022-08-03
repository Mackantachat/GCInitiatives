import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { InitiativeService } from '@services/initiative/initiative.service';
import { ResponseService } from '@errors/response/response.service';
import { Initiative } from '@models/initiative';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditInitiativeComponent implements OnInit, AfterViewInit, OnDestroy {

  id: number;
  page = 'edit';
  name = 'Initiatives Infomation';
  initiative: Initiative;

  Cim: boolean;
  Capex: boolean;
  Strategy: boolean;
  Max: boolean;

  status: string;
  remark: string;
  stage: string;

  Required: any = [];

  CancelFirst = true;

  constructor(
    private initiativeService: InitiativeService,
    private response: ResponseService
  ) { }

  ngOnInit() {
    this.initiativeService.maskUnderline = 'my-own';
    this.id = Number(sessionStorage.getItem('id'));
    sessionStorage.setItem('page', 'edit');
    this.initiativeService.GetInitiative(this.id).subscribe(response => {
      this.initiative = response;
      this.Cim = response.cim ? true : false;
      this.Capex = response.directCapex ? true : false;
      this.Strategy = response.strategy ? true : false;
      this.Max = response.max ? true : false;
      this.initiativeService.initiativeName = response.name;
    }, error => this.response.error(error));
  }

  ngAfterViewInit() {
    if (sessionStorage.getItem('ActivePage') === 'true') {
      this.CancelFirst = false;
    }
    if (this.CancelFirst) {
      if (sessionStorage.getItem('cancel')) {
        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
        }, 500);
      }
    }
  }

  ngOnDestroy() {
    sessionStorage.setItem('ActivePage', 'true');
  }

  CheckRequired(event) {
    this.Required = event;
  }

  CheckCim(event) {
    this.Cim = event;
  }

  CheckCapex(event) {
    this.Capex = event;
  }

  CheckStrategy(event) {
    this.Strategy = event;
  }

  CheckMax(event) {
    this.Max = event;
  }
}
