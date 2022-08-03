import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formGroup: FormGroup
  page: string
  hide: boolean
  constructor(
    private initiativeService: InitiativeService
  ) {
    this.page = 'create'
  }

  ngOnInit(): void {

    if (this.initiativeService.id) {
      this.page = 'edit'
    }
    this.formGroup = new FormGroup({});
    this.hide = false;
  }

  GetId() {
    return this.initiativeService.id;
  }
  Submit() {
    if (this.formGroup.valid && this.formGroup.get('initiativesForm')) {
      this.initiativeService.CreateDraftInitiative(this.formGroup.get('initiativesForm').value).subscribe(res => {
        this.initiativeService.id = res.id;
        this.initiativeService.typeOfInvestment = res.typeOfInvestment;
        this.formGroup.get('initiativesForm').patchValue({ id: res.id })
        this.page = 'edit'
      });
    }
  }
  Draft() {

  }
  SubmitRequestCapex() {

  }
  ShowAttachment() {

  }

  log() {
  }

}
