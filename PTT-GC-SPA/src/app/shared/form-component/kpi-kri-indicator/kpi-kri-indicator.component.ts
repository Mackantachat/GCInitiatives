import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DIDetail } from '@models/kpiKriData';
import { KpiKriApiService } from '@services/kpi-kri-api/kpi-kri-api.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-kpi-kri-indicator',
  templateUrl: './kpi-kri-indicator.component.html',
  styleUrls: ['./kpi-kri-indicator.component.css']
})
export class KpiKriIndicatorComponent implements OnInit {
  raw: number;

  constructor(public bsModalRef: BsModalRef, private kpiKriApiService: KpiKriApiService) {
  }
  kriNameForm = new FormGroup({
    initiativeId: new FormControl(null),
    isActive: new FormControl(null),
    kpiMaintainId: new FormControl(null),
    kpiName: new FormControl(null),
    scoreLevel1: new FormControl(null),
    scoreLevel2: new FormControl(null),
    scoreLevel3: new FormControl(null),
    scoreLevel4: new FormControl(null),
    scoreLevel5: new FormControl(null),
    scoreText1: new FormControl(null),
    scoreText2: new FormControl(null),
    scoreText3: new FormControl(null),
    scoreText4: new FormControl(null),
    scoreText5: new FormControl(null),
    year: new FormControl(null),
  })
  GetColor(score) {
    if (score === 0) {
      return 'red';
    }
    if (score === 1) {
      return 'yellow';
    }
    if (score === 2) {
      return 'green';
    }
  }
  ngOnInit(): void {
    this.kpiKriApiService.GetMaintainKpiById(this.raw).then(res => {
      if (res) {
        this.kriNameForm.patchValue(res);
      }
    })
  }

  close() {
    this.bsModalRef.hide();
  }
}

