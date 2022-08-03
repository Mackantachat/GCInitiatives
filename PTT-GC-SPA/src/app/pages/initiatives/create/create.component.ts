import { ResponseService } from '@errors/response/response.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})

export class CreateInitiativeComponent implements OnInit {

  constructor(
    private initiativeService: InitiativeService,
    private response: ResponseService
  ) { }

  Cim = false;
  Capex = false;
  Strategy = false;
  Max = false;

  page = 'create';
  name = 'Initiatives';

  ngOnInit() {
    this.initiativeService.maskUnderline = 'create';
    sessionStorage.clear();
    sessionStorage.setItem('page', 'create');
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
