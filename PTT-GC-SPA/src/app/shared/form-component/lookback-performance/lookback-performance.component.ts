import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { DateUtil } from '@utils/date.utils';

@Component({
  selector: 'app-lookback-performance',
  templateUrl: './lookback-performance.component.html',
  styleUrls: ['./lookback-performance.component.css']
})
export class LookbackPerformanceComponent implements OnInit {
  @Input() lookbackForm: FormGroup

  PlanLookback = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  today: Date;
  nextYearAgo: Date;
  constructor(
    private dateUti: DateUtil,
    private initiativeService: InitiativeService,
  ) {
    this.today = this.dateUti.GetToday;

  }

  get viewMode() {
    return this.initiativeService.viewMode;
  }

  getFormError(control: FormGroup, field) {
    return (control.get(field).touched || control.get(field).dirty) && control.get(field).invalid;
  }

  ngOnInit() {
    this.nextYearAgo = this.lookbackForm.get('limitDateNextYear').value;
    if (this.initiativeService.viewMode) {
      this.lookbackForm.get('CoreUplift').disable();
    }
  }


}

