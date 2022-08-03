import { SwalTool } from '@tools/swal.tools';
import { SubmitService } from '@services/submit/submit.service';
import { FormBuilder } from '@angular/forms';
import { StatusService } from '@services/status/status.service';
import { Component, OnInit, Input } from '@angular/core';
import { InitiativeService } from '@services/initiative/initiative.service';

@Component({
  selector: 'app-information-submit',
  templateUrl: './information-submit.component.html',
  styleUrls: ['./information-submit.component.css']
})
export class InformationSubmitComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private swalTool: SwalTool,
    private statusService: StatusService,
    private submitService: SubmitService,
    private initiativeService: InitiativeService
  ) { }

  id: number;

  page: string;

  remark: string;
  status: string;
  stage: string;

  SubmitTo   = false;
  submitFrom = this.fb.group({ status: 'backward' });

  get StageSIL() {
    const stage = ['SIL1', 'SIL2', 'SIL3', 'SIL4', 'SIL5'];
    return stage.indexOf(this.stage) !== -1 ? true : false;
  }

  ngOnInit(): void {
    this.id = Number(sessionStorage.getItem('id'));
    this.page = sessionStorage.getItem('page');
    this.initiativeService.GetSuggestStatus(this.id).subscribe(response => {
      this.status     = response.status;
      this.stage      = response.stage;

      const status = { status : this.status };
      this.statusService.CheckSubmitToInformation(status).subscribe(result => {
        if (result) {
          if (['overview', 'approve'].indexOf(this.page) !== -1) {
            this.SubmitTo = false;
            this.submitFrom.disable();
          } else {
            this.SubmitTo = true;
            this.submitFrom.enable();
          }
        }
      });
    });
  }

  Save() {
    this.submitService.SubmitStageStatus(this.id, this.submitFrom.value).subscribe(() => this.swalTool.Submit());
  }
}
