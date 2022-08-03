import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KpiKriConfig } from '@models/kpiKriConfig';
import { DIDetail } from '@models/kpiKriData';
import { KpiKriDataService } from '@services/kpi-kri-data/kpi-kri-data.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kpi-kri-form',
  templateUrl: './kpi-kri-form.component.html',
  styleUrls: ['./kpi-kri-form.component.css']
})
export class KpiKriFormComponent implements OnInit {

  // @Output() newItemEvent = new EventEmitter<FormGroup>();

  raw: FormGroup;
  kriFreeze: boolean;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private kpiKriDataService: KpiKriDataService,
    public bsModalRef: BsModalRef) {
  }

  kriModalForm = this.formBuilder.group({
    kriDetailMonthId: 0,
    kriDetail: '',
    target1: '',
    target2: '',
    target3: '',
    year: '',
    initiativeId: 0,
    kriType: ''
  })

  ngOnInit(): void {
    this.kriModalForm.patchValue({
      year: this.raw.get('year').value,
      initiativeId: this.raw.get('initiativeId').value,
      kriType: this.raw.get('kriType').value == 'external_kri' ? 'External KRI' 
      : this.raw.get('kriType').value == 'execution_kri' ? 'Execution KRI' :  'Long Term Target',
      kriDetailMonthId: this.raw.get('kriDetailMonthId')?.value,
      kriDetail: this.raw.get('kriDetail')?.value,
      target1: this.raw.get('target1')?.value,
      target2: this.raw.get('target2')?.value,
      target3: this.raw.get('target3')?.value
    });
  }


  save() {

    // this.newItemEvent.emit(this.kriModalForm);
    this.kpiKriDataService.updateByModal(this.kriModalForm.value)
    // this.raw.detail = this.form.value.detail;
    // this.kpiKriDataService.updateByModal(this.raw);
    this.cancel();
  }

  cancel() {
    this.bsModalRef.hide();
  }
}

