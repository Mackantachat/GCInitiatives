import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CimFormValidateService } from '@services/cim-form-validate/cim-form-validate.service';
import { DetailService } from '@services/detail/detail.service';
import { SwalTool } from '@tools/swal.tools';

@Component({
  selector: 'app-form-cim',
  templateUrl: './form-cim.component.html',
  styleUrls: ['./form-cim.component.css']
})
export class FormCimComponent implements OnInit {

  formGroup: FormGroup
  page: string
  hide: boolean
  action: string;
  tabGeneralRequire: boolean;
  tabDetailRequire: boolean;
  constructor(
    private initiativeService: InitiativeService,
    private router: Router,
    private cimFormValidate: CimFormValidateService,
    private route: ActivatedRoute,
    private detailService: DetailService,
    private swalTool: SwalTool
  ) {
    this.page = null;

  }

  ngOnInit(): void {
    this.page = this.initiativeService.page;
    if ((!this.initiativeService.id && this.page == 'edit') || this.page == null) {
      this.router.navigate(['/initiative/my-own']);
    }
    this.formGroup = new FormGroup({});
  }

  ngOnDestroy(): void {
    // this.initiativeService.id = null;
    // this.page = null;
  }

  GetId() {
    return this.initiativeService.id;
  }
  Submit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid && this.formGroup.get('initiativesForm')) {
      switch (this.page) {
        case "create":
          this.initiativeService.CreateSubmitInitiative(this.formGroup.get('initiativesForm').value).subscribe(res => {
            this.initiativeService.id = res.id;
            this.initiativeService.page = 'edit';
            this.swalTool.DetailCimStrategy();
            this.router.navigate(['/initiative/edit'])
            // this.initiativeService.typeOfInvestment = res.typeOfInvestment;
            // this.formGroup.get('initiativesForm').patchValue({ id: res.id })

            // this.page = 'edit'
          });
          break;
        case "edit":
          //update initiative
          this.initiativeService.UpdateSubmitInitiative(this.initiativeService.id, this.formGroup.get('initiativesForm').value).subscribe(response => {
            //detail tab
            let detailForm = this.formGroup.get('initiativesDetailForm') as FormGroup;
            if (!this.detailService.initiativeDetailId) {
              //create detail
              this.detailService.CreateAllDetail(this.initiativeService.id, detailForm).then((result) => {
                this.swalTool.Submit();

                // this.detailService.initiativeDetailId = result.id
              });
            } else {
              //update detail
              this.detailService.UpdateInitiativeDetail(this.detailService.initiativeDetailId, detailForm).subscribe(() => { })

            }
          });

          break;
      }
    } else {
      if (this.formGroup.get('initiativesForm') && this.formGroup.get('initiativesForm').invalid) {
        this.tabGeneralRequire = true;
      } else {
        this.tabGeneralRequire = false;
      }
      if (this.formGroup.get('initiativesDetailForm') && this.formGroup.get('initiativesDetailForm').invalid) {
        this.tabDetailRequire = true;
      } else {
        this.tabDetailRequire = false;
      }
      this.swalTool.Required();
    }
  }

  SelectCoDeveloper() {
    if (this.formGroup.get('initiativesForm') && this.formGroup.get('initiativesForm').get('coDeveloper')) {
      let coDeveloperValue = this.formGroup.get('initiativesForm').get('coDeveloper').value;
      this.initiativeService.UpdateCoDeveloper(this.initiativeService.id, coDeveloperValue).subscribe(() => { });
    } else {
      this.initiativeService.DeleteCoDeveloper(this.initiativeService.id).subscribe(() => { });
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
