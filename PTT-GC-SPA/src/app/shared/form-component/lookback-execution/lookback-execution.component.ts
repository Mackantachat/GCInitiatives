import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PimGate } from '@models/pimGate';
import { DetailService } from '@services/detail/detail.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { DateUtil } from '@utils/date.utils';

@Component({
    selector: 'app-lookback-execution',
    templateUrl: './lookback-execution.component.html',
    styleUrls: ['./lookback-execution.component.css']
})
export class LookbackExecutionComponent implements OnInit {
    @Input() public lookbackForm: FormGroup;
    bsConfig = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
    gateData: PimGate;


    constructor(
        private initiativeService: InitiativeService,
        private dateUtil: DateUtil,
        private detailService: DetailService
    ) { }


    ngOnInit() {
        this.detailService.GetDetailPimGate(this.initiativeService.id, 3).subscribe(res => {
            if (res) {
                this.gateData = res
            }
        });
        if (this.initiativeService.viewMode) {
            this.lookbackForm.get('ExecutionLookback').disable();
        }
    }

    get viewMode(): boolean {
        return this.initiativeService.viewMode;
    }

    convertPlan(control: FormGroup) {
        if (control.get('KnowledgeArea').value == 'Time Completion Plan finished') {
            if (control.get('Plan').value != undefined && control.get('Plan').value != null) {
                return control.get('Plan').value ? this.dateUtil.GetDate(new Date(control.get('Plan').value)) : null;
            }
            return null;
        } else if (control.get('KnowledgeArea').value == 'Total Cost') {
            if (this.gateData != undefined && this.gateData != null) {
                return this.gateData.costEstimate ? this.gateData.costEstimate.toFixed(2) : null;
            }
            return null;
        }
        return control.get('Plan').value;
    }

    convertActual(control: FormGroup) {
        //data from SAP
        if (control.get('KnowledgeArea').value == 'Time Completion Plan finished') {
            if (control.get('Actual').value != undefined && control.get('Actual').value != null) {
                return control.get('Actual').value ? this.dateUtil.GetDate(control.get('Actual').value) : null;
            }
            return null;
        } else if (control.get('KnowledgeArea').value == 'Total Cost') {
            if (control.get('Actual').value != undefined && control.get('Actual').value != null) {
                // return control.get('Actual').value ? this.dateUtil.GetDate(control.get('Actual').value) : null;
            }
            return null;
        }
        return control.get('Actual').value;
    }

    readOnlyPlan(control: FormGroup) {
        if (control.get('KnowledgeArea').value == 'Total Cost' || control.get('KnowledgeArea').value == 'Time Completion Plan finished') {
            return true;
        }
        return false;
    }
    readOnlyActual(control: FormGroup) {
        if (control.get('KnowledgeArea').value == 'Total Cost' || control.get('KnowledgeArea').value == 'Time Completion Plan finished') {
            return true;
        }
        return false;
    }

    getFormError(control: FormGroup, field) {
        return (control.get(field).touched || control.get(field).dirty) && control.get(field).invalid;
    }
}

