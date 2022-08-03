import { AfterViewInit, Component, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { KRIModel } from '@models/kriModel';
import { RiskModel } from '@models/risk';
import { InitiativeService } from '@services/initiative/initiative.service';
import { RiskService } from '@services/risk/risk.service';
import { DateUtil } from '@utils/date.utils';
import { RiskFormComponent } from '../risk-form/risk-form.component';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.css']
})
export class RiskComponent implements OnInit, AfterViewInit, OnDestroy {

  //@ViewChild(RiskFormComponent) riskForm: RiskFormComponent;
  @ViewChildren(RiskFormComponent) riskForm: QueryList<RiskFormComponent>

  id: number;
  @Input() formGroup: FormGroup;
  openFormRisk: boolean;
  data: RiskModel[];
  dataArray: RiskModel;

  index: number;

  constructor(
    private riskService: RiskService,
    private dateUtil: DateUtil,
    private initiativeService: InitiativeService
  ) {
    this.openFormRisk = false;
    this.data = null;
    this.dataArray = null;
    this.index = null;
  }

  ngOnInit(): void {
    this.id = this.initiativeService.id;
    // if(!this.formGroup.get('risk')){
    //   this.formGroup.addControl('risk',new FormArray([]));
    // }
    //get Data
    this.GetRiskData();

  }

  ngOnDestroy() {
    this.riskService.riskData = [];
  }



  ngAfterViewInit() {

  }

  saveData() {
    this.openFormRisk = false;
    if (this.riskService.dataArray != null) {
      let index = this.riskService.riskData.findIndex(x => x.id == this.riskService.dataArray.id);
      if (index > -1) {
        this.riskService.riskData[index] = this.riskService.dataArray;
      }
    }
    this.riskService.dataArray = null;
  }

  editRisk(i: number) {
    this.openFormRisk = true;
    //this.resetAll();
    // if (this.riskService.dataArray == null && this.index == null) {
    //   this.index = i;
    this.riskService.dataArray = this.riskService.riskData[i];
    this.initAll();
    // }
    //  else if (this.index != null && this.index != i) {
    //   this.resetAll();
    // }
  }

  get viewMode(): boolean {
    return this.initiativeService.viewMode;
  }

  addRiskData() {
    this.resetAll();
    this.openFormRisk = true;
  }

  resetAll() {
    this.riskService.dataArray = null;
    this.riskForm.forEach(c => {
      c.resetForm();
      c.isAddNewRiskData = true;
      c.isEditRiskData = false;
    }); // or whatever you want to do to it here
  }

  initAll() {
    this.riskForm.forEach(c => {
      c.resetForm();
      c.init();
      c.isEditRiskData = true;
      c.isAddNewRiskData = false;
    }); // or whatever you want to do to it here
  }

  getLevel(value) {
    if (parseInt(value) === 1) {
      return 'green';
    }
    else if (parseInt(value) === 2) {
      return 'yellow';
    }
    else if (parseInt(value) === 3) {
      return 'orange';
    }
    else if (parseInt(value) === 4) {
      return 'red';
    }
  }

  GetMaxKRIStatus(i) {
    var array = this.riskService.riskData[i].kriArray as Array<KRIModel>
    var max = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].kriStatus > max) {
        max = array[i].kriStatus;
      }
    }
    return this.getLevel(max);
  }

  getDate(value: Date) {
    return new Date(value).getTime() > 0 ? this.dateUtil.GetDate(new Date(value)) : null;
  }

  get getRiskService() {
    return this.riskService;
  }

  GetRiskData() {
    this.riskService.GetRiskData(this.initiativeService.id).subscribe(res => {
      if (res.length > 0) {
        this.riskService.riskData = res;
        // this.riskForm = this.fb.array([]);
        // for (let i = 0; i < res.length; i++) {
        //   this.presentData = this.initialRiskData();
        //   this.presentData.patchValue(res[i]);
        //   for (let j = 0; j < res[i].kriArray.length; j++) {
        //     let temp = this.initialKRIData();
        //     temp.patchValue(res[i].kriArray[j]);
        //     (this.presentData.get('kriArray') as FormArray).push(temp);
        //   }
        //   for (let j = 0; j < res[i].riskProgressArray.length; j++) {
        //     let temp = this.initialRiskProgressData();
        //     temp.patchValue(res[i].riskProgressArray[j]);
        //     (this.presentData.get('riskProgressArray') as FormArray).push(temp);
        //   }
        //   this.riskForm.push(this.presentData);
        //   (this.formGroup.get('riskForm') as FormArray).push(this.presentData)
        // }
      }
      // else {
      //   this.riskForm.push(this.presentData);
      //   this.addKRIData();
      //   this.addRiskProgress();
      // }
    });
  }

  replacePhase(phase: string) {
    return phase?.replace(/(\-\d)/g, '');
  }

}
