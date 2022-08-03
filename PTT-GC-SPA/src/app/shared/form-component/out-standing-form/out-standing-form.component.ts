import { DatePipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutStandingByYear } from '@models/OutStandingModel';
import { OutstandingData, OutstandingModel } from '@models/progressModel';
import { InitiativeService } from '@services/initiative/initiative.service';
import { PermissionService } from '@services/permission/permission.service';
import { DateUtil } from '@utils/date.utils';
import { BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { createCaseClause } from 'typescript';
import { ProgressService } from '../../../core/services/progress/progress.service';

@Component({
  selector: 'app-out-standing-form',
  templateUrl: './out-standing-form.component.html',
  styleUrls: ['./out-standing-form.component.css']
})
export class OutStandingFormComponent implements OnInit, OnDestroy, OnChanges, AfterContentChecked {

  @Input() formGroup: FormGroup;
  @Input() id: number;

  outstandingForm: FormGroup;

  monthMode: BsDatepickerViewMode = 'month';
  monthViewDateFormart = {
    isAnimated: true,
    dateInputFormat: 'MMMM',
    showWeekNumbers: false,
    maxDate: this.dateUti.GetCurrentMonth,
    minMode: 'month',
  };

  rowSpan = 0;
  outstandingFormArray = new FormArray([]);

  searchForm = this.fb.group({
    month: this.dateUti.GetCurrentMonth
  });

  selectedMonth = this.dateUti.GetCurrentMonth;

  budgetBaht = 0;
  actualBaht = 0;
  prItemBaht = 0;
  poItemBaht = 0;
  commitmentBaht = 0;
  outStanding = null;
  contingency = null;
  estimateAtCompletion = 0;

  outStandingList = [];
  outStandingByYear: OutStandingByYear[] = [] as OutStandingByYear[];
  firstLoad: boolean;
  tempDate: Date;
  outStandingData: OutstandingModel[] = [] as OutstandingModel[];
  isAdmin: boolean = false;
  currentActualBaht;

  constructor(
    private fb: FormBuilder,
    private dp: DatePipe,
    private initiativeService: InitiativeService,
    private progressService: ProgressService,
    private dateUti: DateUtil,
    private cdref: ChangeDetectorRef,
    private ps: PermissionService
  ) {
    this.progressService.getSelectProgressDate.subscribe((dateRes) => {
      if (dateRes && this.firstLoad) {
        this.searchForm.get('month').setValue(dateRes);
        // this.getOutStanding();
        this.getOutStandingByDate();
      }
    });

    this.progressService.getOutStandingData.subscribe((outDtandingRes) => {
      if (outDtandingRes && this.firstLoad) {
        this.outStandingData = outDtandingRes;
      }
    });

    // this.progressService.getOutstandingFormByYear.subscribe((outDtandingByYearRes) => {
    //   if (outDtandingByYearRes) {
    //     this.outStandingByYear = outDtandingByYearRes;
    //   }
    // });
  }

  ngOnInit() {
    if (this.ps.roleSettingDetail != null) {
      //pageId: "ADMIN-PROGRESS"
      if(this.initiativeService.viewMode == false){
        this.isAdmin = this.ps.roleSettingDetail.findIndex((x) => x.pageId == "ADMIN-PROGRESS") >= 0  ? true : false;
      }else{
        this.isAdmin =false;
      }
    }
    // if (!this.formGroup.get('searchForm')) this.formGroup.addControl('searchForm', this.searchForm);
    this.outstandingForm = this.fb.group({
      id: 0,
      initiativeId: this.initiativeService.id,
      year: this.dp.transform(this.selectedMonth, 'yyyy'),
      month: this.dp.transform(this.selectedMonth, 'M'),
      budgetBaht: 0,
      actualBaht: 0,
      prItemBaht: 0,
      poItemBaht: 0,
      commitmentBaht: 0,
      outstanding: null,
      contingency: null,
      estimateAtCompletion: null,
      isDeleted: 0,
      // outstandingFormArray: [],
    })
    if (!this.formGroup.get('outstandingForm')) this.formGroup.addControl('outstandingForm', this.outstandingForm);
    if (!this.formGroup.get('outstandingForm').get('outstandingFormArray')) (this.formGroup.get('outstandingForm') as FormGroup).addControl('outstandingFormArray', this.outstandingFormArray);
    this.getOutStanding();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formGroup.get('outstandingForm')) {
      this.formGroup.get('outstandingForm').get('outstandingFormArray').valueChanges.subscribe((response) => {
        // let formValue: OutstandingModel = this.formGroup.get('outstandingForm').value;
        this.outStandingData[this.outStandingData.length - 1] = response;
        this.recalOutStanding();
      });
    }

  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnDestroy() {
    this.firstLoad = false;
  }

  get viewMode() {
    return this.initiativeService.viewMode;
  }

  async getOutStanding() {

    if (!this.searchForm.get('month').value) {
      this.selectedMonth = undefined;
      return;
    }

    const formJson = this.searchForm.getRawValue();
    this.selectedMonth = new Date(formJson.month);

    if (!this.firstLoad) {
      this.progressService.GetAllOutstandingData(this.initiativeService.id).subscribe((res) => {
        if (res.length > 0) {
          this.outStandingData = res;
          this.progressService.setOutStandingData(res);
        }


        // console.log(this.progressService.getOutStandingData);

        this.progressService.GetOutstandingData(this.initiativeService.id, this.dp.transform(this.selectedMonth, 'yyyy'), this.dp.transform(this.selectedMonth, 'M'))
          .subscribe(async (res) => {


            if (res.initiativeId != null) {

              this.formGroup.get('outstandingForm').patchValue(res);

              this.budgetBaht = res.budgetBaht;
              this.actualBaht = res.actualBaht;
              this.prItemBaht = res.prItemBaht;
              this.poItemBaht = res.poItemBaht;
              this.commitmentBaht = res.commitmentBaht;
              console.log('~ getOutStanding ~');
              console.log('actualBaht: ', this.actualBaht);
              
              this.contingency = res.contingency;
              this.estimateAtCompletion = res.estimateAtCompletion;
              if (res.outstandingFormArray.length > 0) {

                // this.formGroup.get('outstandingForm').get('outstandingFormArray').patchValue(res.outstandingFormArray);

                let formArray = this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray;
                formArray.clear();
                for (let index = 0; index < res.outstandingFormArray.length; index++) {
                  formArray.push(
                    this.fb.group({
                      itemDescription: res.outstandingFormArray[index].itemDescription,
                      itemListValueBaht: res.outstandingFormArray[index].itemListValueBaht,
                      rpcDescription: res.outstandingFormArray[index].rpcDescription,
                      rpcValueBaht: res.outstandingFormArray[index].rpcValueBaht,
                      outstanding: res.outstandingFormArray[index].outstanding,
                    })
                  );
                  this.rowSpan++;
                }
              } else {
                this.newOutStanding();
                //let formValue: OutstandingModel = this.formGroup.get('outstandingForm').value;
                //this.outStandingData[this.outStandingData.length] = formValue;
              }
              // this.removeOutStanding(0);
              this.recalOutStanding();

            }
            else {
              (this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray).clear();
              this.newOutStanding();
              let formValue: OutstandingModel = this.formGroup.get('outstandingForm').value;
              this.outStandingData[this.outStandingData.length] = formValue;
            }
            if (this.initiativeService.viewMode && !this.isAdmin) {
              this.formGroup.get('outstandingForm').get('outstandingFormArray').disable();
            }
            this.firstLoad = true;
          });
      });
    }
    // }
    //---------------------------------------------------------------
    this.progressService.GetOutstandingFormByYear(this.initiativeService.id, this.dp.transform(this.selectedMonth, 'yyyy')).subscribe(async (res) => {
      this.outStandingByYear = [];
      if (res) {
        // this.outStandingByYear = res;
        this.generateTable(res);
        this.recalOutStanding();
        // this.progressService.setOutstandingFormByYear(res);

      } else {
        // this.newOutStanding();
        this.generateTable([]);
        // this.outStandingByYear = [];
        // (this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray).clear();
      }
    });
  }

  async getOutStandingByDate() {
    if (!this.searchForm.get('month').value) {
      this.selectedMonth = undefined;
      return;
    }
    this.rowSpan = 0;

    const formJson = this.searchForm.getRawValue();
    this.selectedMonth = new Date(formJson.month);



    // console.log(this.progressService.getOutStandingData);

    // this.progressService.getOutStandingData.subscribe(async (res) => {
    //   if (res) {
    //     this.outStandingData = res;
    let outStandingDataByDate: OutstandingModel = this.outStandingData.find((x) => x.month == (this.selectedMonth.getMonth() + 1).toString() && x.year == this.selectedMonth.getFullYear())

    if (outStandingDataByDate) {

      this.formGroup.get('outstandingForm').patchValue({
        initiativeId: this.initiativeService.id,
        year: outStandingDataByDate.year,
        month: outStandingDataByDate.month,
        budgetBaht: outStandingDataByDate.budgetBaht,
        actualBaht: outStandingDataByDate.actualBaht,
        prItemBaht: outStandingDataByDate.prItemBaht,
        poItemBaht: outStandingDataByDate.poItemBaht,
        commitmentBaht: outStandingDataByDate.commitmentBaht,
        contingency: outStandingDataByDate.contingency,
        estimateAtCompletion: outStandingDataByDate.estimateAtCompletion
      });
      this.budgetBaht = outStandingDataByDate.budgetBaht;
      this.actualBaht = outStandingDataByDate.actualBaht;
      this.prItemBaht = outStandingDataByDate.prItemBaht;
      this.poItemBaht = outStandingDataByDate.poItemBaht;
      this.commitmentBaht = outStandingDataByDate.commitmentBaht;

      this.contingency = outStandingDataByDate.contingency;
      this.estimateAtCompletion = outStandingDataByDate.estimateAtCompletion;
      let formArray = this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray;
      formArray.clear();
      if (outStandingDataByDate.outstandingFormArray.length > 0) {

        // this.formGroup.get('outstandingForm').get('outstandingFormArray').patchValue(res.outstandingFormArray);

        for (let index = 0; index < outStandingDataByDate.outstandingFormArray.length; index++) {
          formArray.push(
            this.fb.group({
              itemDescription: outStandingDataByDate.outstandingFormArray[index].itemDescription,
              itemListValueBaht: outStandingDataByDate.outstandingFormArray[index].itemListValueBaht,
              rpcDescription: outStandingDataByDate.outstandingFormArray[index].rpcDescription,
              rpcValueBaht: outStandingDataByDate.outstandingFormArray[index].rpcValueBaht,
              outstanding: outStandingDataByDate.outstandingFormArray[index].outstanding,
            })
          );
          this.rowSpan++;
        }
      } else {
        this.newOutStanding();
        //let formValue: OutstandingModel = this.formGroup.get('outstandingForm').value;
        //this.outStandingData[this.outStandingData.length] = formValue;
      }
      // this.removeOutStanding(0);
      this.recalOutStanding();
    } else {
      //(this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray).clear();
      this.formGroup.get('outstandingForm').patchValue({
        id: 0,
        initiativeId: this.initiativeService.id,
        year: this.dp.transform(this.selectedMonth, 'yyyy'),
        month: this.dp.transform(this.selectedMonth, 'M'),
        budgetBaht: 0,
        actualBaht: 0,
        prItemBaht: 0,
        poItemBaht: 0,
        commitmentBaht: 0,
        outstanding: null,
        contingency: null,
        estimateAtCompletion: 0,
        isDeleted: 0
      });

      (this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray).clear();
      this.newOutStanding();
      let formValue: OutstandingModel = this.formGroup.get('outstandingForm').value;
      this.outStandingData[this.outStandingData.length] = formValue;
    }

    //   }
    //   else {
    //     (this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray).clear();
    //     this.newOutStanding();
    //   }
    // });
    // }
    //---------------------------------------------------------------
    // this.progressService.GetOutstandingFormByYear(this.initiativeService.id, this.dp.transform(this.selectedMonth, 'yyyy')).subscribe(async (res) => {
    this.outStandingByYear = [] as OutStandingByYear[];
    //   if (res) {
    // this.outStandingByYear = res;
    let outStandingDataByYear: OutstandingModel[] = this.outStandingData.filter((x) => x.year == this.selectedMonth.getFullYear())
    if (outStandingDataByYear) {
      // let convertToYear: OutStandingByYear[] = 
      console.log('*** outStandingDataByYear: ', outStandingDataByYear);
      
      this.convert(outStandingDataByYear);
      this.recalOutStanding();
    } else {
      // this.newOutStanding();
      this.generateTable([]);
      this.recalOutStanding();
    }

    // this.outStandingByYear = [];
    // (this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray).clear();
    //   }
    // });
  }
  // convert(data:OutstandingModel[]) : OutStandingByYear[]{
  //     let outStandingByYear : OutStandingByYear[] = [] as OutStandingByYear[];


  //     for (let index = 0; index < 12; index++) {
  //       if(data[index].month == index.toString()){
  //         // let dataFormArray : OutstandingData = data.outstandingFormArray[index];
  //         let dataInput : OutStandingByYear = {
  //           actualBaht: data[index].actualBaht.toString(),
  //           budgetBaht: data[index].budgetBaht.toString(),
  //           commitmentBaht: data[index].commitmentBaht.toString(),
  //           contingency: data[index].contingency.toString(),
  //           estimateAtCompletion: data[index].estimateAtCompletion.toString(),
  //           itemListValueBaht: data[index].toString(),
  //           month: data[index].month,
  //           monthDesc: data[index].budgetBaht.toString(),
  //           outStanding: ,
  //           poItemBaht: ,
  //           prItemBaht: ,
  //           rpcValueBaht: ,
  //         }
  //         outStandingByYear.push(dataInput);
  //       }


  //     }



  //     // actualBaht: string;
  //     // budgetBaht: string;
  //     // commitmentBaht: string;
  //     // contingency: string;
  //     // estimateAtCompletion: string;
  //     // itemListValueBaht: string;
  //     // month: string;
  //     // monthDesc: string;
  //     // outStanding: string;
  //     // poItemBaht: string;
  //     // prItemBaht: string;
  //     // rpcValueBaht: string;
  //     return outStandingByYear;
  //   }

  convert(data: OutstandingModel[]) {
    let year = this.dp.transform(this.selectedMonth, 'yyyy');
    let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    month.forEach((m, mIndex) => {
      let check = m + ' - ' + year;
      if (data.findIndex((x) => (parseInt(x.month) - 1) == mIndex) >= 0) {
        // data.map(d=>d.month)
        let dataIndex = data.findIndex((x) => (parseInt(x.month) - 1) == mIndex);
        let model: OutStandingByYear = {
          actualBaht: data[dataIndex].actualBaht?.toString().length > 0 ? data[dataIndex].actualBaht.toString() : null,
          budgetBaht: data[dataIndex].budgetBaht?.toString().length > 0 ? data[dataIndex].budgetBaht.toString() : null,
          commitmentBaht: data[dataIndex].commitmentBaht?.toString().length > 0 ? data[dataIndex].commitmentBaht.toString() : null,
          contingency: data[dataIndex].contingency?.toString().length > 0 ? data[dataIndex].contingency.toString() : null,
          estimateAtCompletion: data[dataIndex].estimateAtCompletion?.toString().length > 0 ? data[dataIndex].estimateAtCompletion.toString() : data[dataIndex].budgetBaht.toString(),
          itemListValueBaht: this.sumData(data[dataIndex].outstandingFormArray, 'itemListValueBaht'),
          month: data[dataIndex].month,
          monthDesc: check,
          outStanding: data[dataIndex].outstandingFormArray?.toString().length > 0 ? this.sumData(data[dataIndex].outstandingFormArray, 'outstanding') : null,
          poItemBaht: data[dataIndex].poItemBaht?.toString().length > 0 ? data[dataIndex].poItemBaht.toString() : null,
          prItemBaht: data[dataIndex].prItemBaht?.toString().length > 0 ? data[dataIndex].prItemBaht.toString() : null,
          rpcValueBaht: this.sumData(data[dataIndex].outstandingFormArray, 'rpcValueBaht'),
        };
        this.outStandingByYear.push(model);
      } else {
        let model: OutStandingByYear = {
          actualBaht: null,
          budgetBaht: null,
          commitmentBaht: null,
          contingency: null,
          estimateAtCompletion: null,
          itemListValueBaht: null,
          month: (mIndex + 1).toString(),
          monthDesc: check,
          outStanding: null,
          poItemBaht: null,
          prItemBaht: null,
          rpcValueBaht: null,
        };
        this.outStandingByYear.push(model);
      }
    });

  }

  sumData(data: OutstandingData[], type: string): string {
    let calculate: number = 0;
    let countNull: number = 0;
    data.forEach((d) => {
      if (d[type]?.toString().length > 0) {
        calculate += parseFloat(d[type].toString())
      } else {
        countNull++
      }
    });

    return countNull != data.length ? calculate.toString() : null;
  }

  generateTable(data: OutStandingByYear[]) {    
    let year = this.dp.transform(this.selectedMonth, 'yyyy');
    let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    month.forEach((m, mIndex) => {
      let check = m + ' - ' + year;
      if (data.findIndex((x) => (parseInt(x.month) - 1) == mIndex) >= 0) {
        // data.map(d=>d.month)
        let dataIndex = data.findIndex((x) => (parseInt(x.month) - 1) == mIndex);
        let model: OutStandingByYear = {
          actualBaht: data[dataIndex].actualBaht,
          budgetBaht: data[dataIndex].budgetBaht,
          commitmentBaht: data[dataIndex].commitmentBaht?.toString().length > 0 ? data[dataIndex].commitmentBaht : null,
          contingency: data[dataIndex].contingency?.toString().length > 0 ? data[dataIndex].contingency : null,
          estimateAtCompletion: data[dataIndex].estimateAtCompletion?.toString().length > 0 ? data[dataIndex].estimateAtCompletion.toString() : data[dataIndex].budgetBaht.toString(),
          itemListValueBaht: data[dataIndex].itemListValueBaht?.toString().length > 0 ? data[dataIndex].itemListValueBaht : null,
          month: data[dataIndex].month,
          monthDesc: check,
          outStanding: data[dataIndex].outStanding?.toString().length > 0 ? data[dataIndex].outStanding : null,
          poItemBaht: data[dataIndex].poItemBaht,
          prItemBaht: data[dataIndex].prItemBaht,
          rpcValueBaht: data[dataIndex].rpcValueBaht,
        };
        this.outStandingByYear.push(model);
        if (data[dataIndex].budgetBaht !== null) {
          this.currentActualBaht = data[dataIndex].actualBaht
        }
      } else {
        let model: OutStandingByYear = {
          actualBaht: null,
          budgetBaht: null,
          commitmentBaht: null,
          contingency: null,
          estimateAtCompletion: null,
          itemListValueBaht: null,
          month: (mIndex + 1).toString(),
          monthDesc: check,
          outStanding: null,
          poItemBaht: null,
          prItemBaht: null,
          rpcValueBaht: null,
        };
        this.outStandingByYear.push(model);
      }
    });
  console.log('currentActualBaht: ', this.currentActualBaht);
  this.initiativeService.setOptionSpendingActual(this.currentActualBaht)
  }

  outStandingKeyUp(i) {
    //const formItem = this.outstandingFormArray.controls[i] as FormGroup;
    const formItem = (this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray)['controls'][i] as FormGroup;
    const formItemAll = this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray;
    const json = formItem.getRawValue();
    const jsonAll: OutstandingData[] = formItemAll.getRawValue();
    let value;
    if (json.itemListValueBaht?.toString().length > 0 && json.rpcValueBaht?.toString().length > 0) {
      value = parseFloat(json.itemListValueBaht) + parseFloat(json.rpcValueBaht);
    } else {
      if (json.itemListValueBaht?.toString().length > 0) {
        value = parseFloat(json.itemListValueBaht);
      } else {
        value = json.rpcValueBaht?.toString().length > 0 ? parseFloat(json.rpcValueBaht) : null;
      }

    }
    let index = this.outStandingByYear.findIndex(x => x.month == this.dp.transform(this.selectedMonth, 'M'));
    (this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray)['controls'][i].get('outstanding').setValue(value);
    this.recalOutStanding();
  }

  newOutStanding() {
    (this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray).push(
      this.fb.group({
        itemDescription: [null],
        itemListValueBaht: [null],
        rpcDescription: [null],
        rpcValueBaht: [null],
        outstanding: [null],
      })
    );

    this.rowSpan++;
  }

  recalOutStanding() {
    let json: OutstandingData[] = (this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray).getRawValue();
    let outstandingData: OutstandingModel = (this.formGroup.get('outstandingForm') as FormGroup).getRawValue();
    // let outStandingDataIndex = this.outStandingData.findIndex(x => x.year == parseInt(this.dp.transform(this.selectedMonth, 'yyyy')) && x.month == this.dp.transform(this.selectedMonth, 'M'));
    // if (outStandingDataIndex >= 0) {
    //   this.outStandingData[outStandingDataIndex] = outstandingData;
    //   this.progressService.setOutStandingData(this.outStandingData);
    // }
    // console.log(this.outStandingData);
    let year = this.dp.transform(this.selectedMonth, 'yyyy');
    let outStandingIndex = this.outStandingByYear.findIndex(x => x.month == outstandingData.month);

    if (outStandingIndex >= 0) {
      this.outStandingByYear[outStandingIndex].contingency = this.formGroup.get('outstandingForm').get('contingency').value;
    }
    this.formGroup.get('outstandingForm').get('outstanding').setValue(null);
    this.outStandingByYear[outStandingIndex].itemListValueBaht = null
    this.outStandingByYear[outStandingIndex].rpcValueBaht = null
    json.map((m) => {
      if (m.itemListValueBaht != null) {
        const oldItemListValueBaht = this.outStandingByYear[outStandingIndex].itemListValueBaht;
        this.outStandingByYear[outStandingIndex].itemListValueBaht = (oldItemListValueBaht?.toString().length > 0 ? parseFloat(oldItemListValueBaht) + parseFloat(m.itemListValueBaht.toString()) : parseFloat(m.itemListValueBaht.toString())).toString();
      }
      if (m.rpcValueBaht != null) {
        const oldRpcValueBaht = this.outStandingByYear[outStandingIndex].rpcValueBaht;
        this.outStandingByYear[outStandingIndex].rpcValueBaht = (oldRpcValueBaht?.toString().length > 0 ? parseFloat(oldRpcValueBaht) + parseFloat(m.rpcValueBaht.toString()) : parseFloat(m.rpcValueBaht.toString())).toString();
      }
      if (m.outstanding != null) {
        const oldValue = this.formGroup.get('outstandingForm').get('outstanding').value;
        this.formGroup.get('outstandingForm').get('outstanding').setValue(oldValue?.toString().length > 0 ? parseFloat(oldValue) + parseFloat(m.outstanding.toString()) : parseFloat(m.outstanding.toString()));
      }
    });

    // json.reduce((a, b) => a + b.itemListValueBaht, 0);
    // json.reduce((a, b) => a + b.rpcValueBaht, 0);
    if (outStandingIndex >= 0) {
      this.outStandingByYear[outStandingIndex].outStanding = this.formGroup.get('outstandingForm').get('outstanding').value;
      // this.outStandingByYear[outStandingIndex].itemListValueBaht = json.reduce((a, b) => a + b.itemListValueBaht, 0).toString();      
      // this.outStandingByYear[outStandingIndex].rpcValueBaht = json.reduce((a, b) => a + b.rpcValueBaht, 0).toString();
    }

    const actualAndCommitment: number = parseFloat(this.formGroup.get('outstandingForm').get('actualBaht').value) + parseFloat(this.formGroup.get('outstandingForm').get('commitmentBaht').value);
    const remaining1 = parseFloat(this.formGroup.get('outstandingForm').get('budgetBaht').value) - actualAndCommitment;
    const remaining2 = (parseFloat(this.formGroup.get('outstandingForm').get('budgetBaht').value) - parseFloat(this.formGroup.get('outstandingForm').get('contingency').value)) - actualAndCommitment;

    if (parseFloat(this.formGroup.get('outstandingForm').get('contingency').value) > 0 || parseFloat(this.formGroup.get('outstandingForm').get('outstanding').value) >= 0) {

      if (parseFloat(this.formGroup.get('outstandingForm').get('contingency').value) > 0) {
        const contingencyIsNotNull = actualAndCommitment + remaining2;
        //outstanding = null
        this.formGroup.get('outstandingForm').get('estimateAtCompletion').setValue(contingencyIsNotNull.toFixed(2))
        if (outStandingIndex >= 0) {
          this.outStandingByYear[outStandingIndex].estimateAtCompletion = this.formGroup.get('outstandingForm').get('estimateAtCompletion').value;
        }
        let outstandingDataRaw: OutstandingModel = (this.formGroup.get('outstandingForm') as FormGroup).getRawValue();
        let outStandingDataIndex = this.outStandingData.findIndex(x => x.year == parseInt(this.dp.transform(this.selectedMonth, 'yyyy')) && x.month == this.dp.transform(this.selectedMonth, 'M'));
        if (outStandingDataIndex >= 0) {
          this.outStandingData[outStandingDataIndex] = outstandingDataRaw;
          this.progressService.setOutStandingData(this.outStandingData);
        }
      } else {
        const outstandingIsNotNull = actualAndCommitment + parseFloat(this.formGroup.get('outstandingForm').get('outstanding').value);
        //outstanding = null
        this.formGroup.get('outstandingForm').get('estimateAtCompletion').setValue(outstandingIsNotNull.toFixed(2))
        if (outStandingIndex >= 0) {
          this.outStandingByYear[outStandingIndex].estimateAtCompletion = this.formGroup.get('outstandingForm').get('estimateAtCompletion').value;
        }
        let outstandingDataRaw: OutstandingModel = (this.formGroup.get('outstandingForm') as FormGroup).getRawValue();
        let outStandingDataIndex = this.outStandingData.findIndex(x => x.year == parseInt(this.dp.transform(this.selectedMonth, 'yyyy')) && x.month == this.dp.transform(this.selectedMonth, 'M'));
        if (outStandingDataIndex >= 0) {
          this.outStandingData[outStandingDataIndex] = outstandingDataRaw;
          this.progressService.setOutStandingData(this.outStandingData);
        }
      }
      //return;
    }
    else {
      const estimateAtCompletion = actualAndCommitment + remaining1;
      //outstanding = null
      this.formGroup.get('outstandingForm').get('estimateAtCompletion').setValue(estimateAtCompletion.toFixed(2))
      if (outStandingIndex >= 0) {
        this.outStandingByYear[outStandingIndex].estimateAtCompletion = this.formGroup.get('outstandingForm').get('estimateAtCompletion').value;
      }
      let outstandingDataRaw: OutstandingModel = (this.formGroup.get('outstandingForm') as FormGroup).getRawValue();
      let outStandingDataIndex = this.outStandingData.findIndex(x => x.year == parseInt(this.dp.transform(this.selectedMonth, 'yyyy')) && x.month == this.dp.transform(this.selectedMonth, 'M'));
      if (outStandingDataIndex >= 0) {
        this.outStandingData[outStandingDataIndex] = outstandingDataRaw;
        this.progressService.setOutStandingData(this.outStandingData);
      }
    }

    // this.formGroup.get('outstandingForm').get('estimateAtCompletion').setValue(
    //   this.formGroup.get('outstandingForm').get('actualBaht').value +
    //   this.formGroup.get('outstandingForm').get('commitmentBaht').value +
    //   this.formGroup.get('outstandingForm').get('outstanding').value
    // );
    // if (outStandingIndex >= 0) {
    //   this.outStandingByYear[outStandingIndex].estimateAtCompletion = this.formGroup.get('outstandingForm').get('estimateAtCompletion').value;
    // }
    // let outstandingDataRaw: OutstandingModel = (this.formGroup.get('outstandingForm') as FormGroup).getRawValue();
    // let outStandingDataIndex = this.outStandingData.findIndex(x => x.year == parseInt(this.dp.transform(this.selectedMonth, 'yyyy')) && x.month == this.dp.transform(this.selectedMonth, 'M'));
    // if (outStandingDataIndex >= 0) {
    //   this.outStandingData[outStandingDataIndex] = outstandingDataRaw;
    //   this.progressService.setOutStandingData(this.outStandingData);
    // }
  }

  contingencyChanged(e) {
    this.contingency = +e.target.value;
    if (!this.contingency) {
      this.contingency = 0;
    }

    this.recalOutStanding();
  }

  removeOutStanding(i) {
    (this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray).removeAt(i);
    this.rowSpan--;

    if ((this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray).controls.length <= 0) {
      this.newOutStanding();
    }

    this.recalOutStanding();
  }

  save() {
    const outstandingJson = this.outstandingFormArray.getRawValue();
    const json = {
      id: 0,
      date: this.selectedMonth,
      month: this.dp.transform(this.selectedMonth, 'M'), // 1
      year: this.dp.transform(this.selectedMonth, 'yyyy'), // 2020
      budgetBaht: this.budgetBaht,
      actualBaht: this.actualBaht,
      prItemBaht: this.prItemBaht,
      poItemBaht: this.poItemBaht,
      commitmentBaht: this.commitmentBaht,
      outstanding: this.outStanding == null ? null : this.outStanding,
      contingency: this.contingency,
      estimateAtCompletion: this.estimateAtCompletion,
      initiativeId: this.initiativeService.id,
      isDeleted: 0,
      outstandingFormArray: outstandingJson,
    };

    this.formGroup.get('outstandingForm').patchValue(json);

    this.progressService.CreateOutstandingForm(json).subscribe((res) => {
    });
  }

  reset() {
    // this.outstandingFormArray = this.fb.array([]);
    //(this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray).setValue(([]));
    (this.formGroup.get('outstandingForm').get('outstandingFormArray') as FormArray).clear();
    this.newOutStanding();

    this.selectedMonth = new Date();
    this.searchForm.patchValue({
      month: this.selectedMonth,
    });
  }

  getOutstandingFormData(): any[] {
    // let data = this.outstandingForm.value;

    // let outstandingFormArray = this.formGroup.get('outstandingForm')?.get('outstandingFormArray') as FormArray;
    let data: any[] = this.formGroup.get('outstandingForm')?.get('outstandingFormArray')?.value;
    return data;
  }

  getMinDate() {
    return this.formGroup.get('initiativesForm')?.get('startingDate')?.value;
  }

  convertData(value: any) {
    return !isNaN(value) ? value : null;
  }
}

