import { async } from '@angular/core/testing';
import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { DatePipe } from '@angular/common';
import { ProgressService } from '@services/progress/progress.service';
import { DateUtil } from '@utils/date.utils';
import { BscNarrativeModel } from '@models/bsc-narrative';
import { PermissionService } from '@services/permission/permission.service';

@Component({
  selector: 'app-bsc-information',
  templateUrl: './bsc-information.component.html',
  styleUrls: ['./bsc-information.component.css']
})
export class BscInformationComponent implements OnInit, OnDestroy, OnChanges {

  @Input() formGroup: FormGroup;
  @Input() id: number;

  constructor(
    private fb: FormBuilder,
    private initiativeService: InitiativeService,
    private progressService: ProgressService,
    private datePipe: DatePipe,
    private dateUti: DateUtil,
    private ps: PermissionService
  ) {
    this.progressService.getSelectProgressDate.subscribe((dateRes) => {
      if (dateRes && this.firstLoad) {
        this.today = dateRes;
        this.lastMonth = new Date().setMonth(this.today.getMonth() - 1);
        this.getBscNarrativeChangeDate();
      }
    });

    this.progressService.getBscData.subscribe((bscRes) => {
      this.bscData = bscRes;
    });
  }

  highlightWork2: string;
  catchupPlan2: string;
  narrativeStatus2: string;
  costEstCapex: number;
  projectCost: number;
  firstLoad: boolean;
  dataOld: boolean;
  textDate: string;
  textDatePrevious: string;
  month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


  bscData: BscNarrativeModel[] = [] as BscNarrativeModel[];


  today = this.dateUti.GetToday;
  lastMonth = new Date().setMonth(this.today.getMonth() - 1);
  bscNarrativeForm = this.fb.group({
    bscNarrativeId: 0,
    InitiativeId: this.initiativeService.id,
    year: +this.datePipe.transform(this.today, 'yyyy'),
    month: +this.datePipe.transform(this.today, 'MM'),
    // bsc ---------------------------
    engineering: null,
    construction: null,
    procurement: null,
    commissioningStartup: null,
    projectManagement: null,
    riskAndConcern: null,
    mitigationPlan: null,
    executiveSummary: null,
    workForNextMonth: null,
    environmentKpi: null,
    // narrative   -------------------
    highlightWork: null,
    catchupPlan: null,
    narrativeStatus: null,
    // highlightWork2: null,
    // catchupPlan2: null,
    // narrativeStatus2: null

  });
  isAdmin: boolean = false;
  isCim: boolean = false;


  ngOnInit() {
    if (this.ps.roleSettingDetail != null) {
      //pageId: "ADMIN-PROGRESS"
      if(this.initiativeService.viewMode == false){
        this.isAdmin = this.ps.roleSettingDetail.findIndex((x) => x.pageId == "ADMIN-PROGRESS") >= 0  ? true : false;
      }else{
        this.isAdmin =false;
      }
    }
    if (!this.formGroup.get('bscNarrativeForm')) {
      this.formGroup.addControl('bscNarrativeForm', this.bscNarrativeForm);
    }
    this.getBscNarrative();
  }

  ngOnDestroy(): void {
    this.firstLoad = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.bscNarrativeForm.valueChanges.subscribe((res) => {
      if (res) {
        let index = this.bscData.findIndex((x) => x.month == res.month && x.year == res.year);
        if (index >= 0) {
          this.bscData[index] = res;
          this.progressService.setBscDAta(this.bscData);
        }
      }
    })
  }

  setData() {
    this.bscNarrativeForm.valueChanges.subscribe((res) => {
      if (res) {
        let index = this.bscData.findIndex((x) => x.month == res.month && x.year == res.year);
        if (index >= 0) {
          this.bscData[index] = res;
          this.progressService.setBscDAta(this.bscData);
        }
      }
    })
  }



  getBscNarrative() {
    this.textDate = this.datePipe.transform(this.today, 'MMMM').toString() + "-" + this.datePipe.transform(this.today, 'yyyy').toString();
    this.initiativeService.GetInitiative(this.initiativeService.id).subscribe(response => {
      this.costEstCapex = response.costEstCapex;
      this.projectCost = this.formGroup.get('capexInformationForm').get("projectCost").value ? 
        +this.formGroup.get('capexInformationForm').get("projectCost").value: 0;
      this.isCim = Boolean(response.cim);

      this.progressService.GetBscNarrativeAll(this.initiativeService.id).then(r => {
        if (r) {
          this.progressService.setBscDAta(r);
          let previousMonth = parseInt(this.datePipe.transform(this.today, 'M')) == 1 ? 12 : parseInt(this.datePipe.transform(this.today, 'M')) - 1;
          let previousYear = parseInt(this.datePipe.transform(this.today, 'M')) == 1 ? parseInt(this.datePipe.transform(this.today, 'yyyy')) - 1 : parseInt(this.datePipe.transform(this.today, 'yyyy'));
          let dataToday: BscNarrativeModel = r.find((x) => x.month == parseInt(this.datePipe.transform(this.today, 'M')) && x.year == parseInt(this.datePipe.transform(this.today, 'yyyy')));
          let previousData: BscNarrativeModel = r.find((pd) => pd.year == previousYear && pd.month == previousMonth);
          if (dataToday) {
            this.bscNarrativeForm.patchValue(dataToday);
          } else {
            this.bscNarrativeForm = this.fb.group({
              bscNarrativeId: 0,
              InitiativeId: this.initiativeService.id,
              year: +this.datePipe.transform(this.today, 'yyyy'),
              month: +this.datePipe.transform(this.today, 'MM'),
              // bsc ---------------------------
              engineering: null,
              construction: null,
              procurement: null,
              commissioningStartup: null,
              projectManagement: null,
              riskAndConcern: null,
              mitigationPlan: null,
              executiveSummary: null,
              workForNextMonth: null,
              environmentKpi: null,
              // narrative   -------------------
              highlightWork: null,
              catchupPlan: null,
              narrativeStatus: null,
              // highlightWork2: null,
              // catchupPlan2: null,
              // narrativeStatus2: null

            });
            //let dataInput: any[] = [];
            r.push(this.bscNarrativeForm.value);

            this.progressService.setBscDAta(r);
          }
          if (previousData) {
            this.dataOld = true;
            this.textDatePrevious = this.month[previousMonth - 1] + "-" + previousYear.toString();
            this.highlightWork2 = previousData.highlightWork;
            this.catchupPlan2 = previousData.catchupPlan;
            this.narrativeStatus2 = previousData.narrativeStatus;
          } else {
            this.dataOld = false;
          }
        } else {
          this.bscNarrativeForm = this.fb.group({
            bscNarrativeId: 0,
            InitiativeId: this.initiativeService.id,
            year: +this.datePipe.transform(this.today, 'yyyy'),
            month: +this.datePipe.transform(this.today, 'MM'),
            // bsc ---------------------------
            engineering: null,
            construction: null,
            procurement: null,
            commissioningStartup: null,
            projectManagement: null,
            riskAndConcern: null,
            mitigationPlan: null,
            executiveSummary: null,
            workForNextMonth: null,
            environmentKpi: null,
            // narrative   -------------------
            highlightWork: null,
            catchupPlan: null,
            narrativeStatus: null,
            // highlightWork2: null,
            // catchupPlan2: null,
            // narrativeStatus2: null

          });
          let dataInput: any[] = [];
          dataInput.push(this.bscNarrativeForm.value);
          this.progressService.setBscDAta(dataInput);
        }
      });
    });







    // await this.progressService.GetBscNarrative(this.initiativeService.id,
    //   +this.datePipe.transform(this.today, 'yyyy'),
    //   +this.datePipe.transform(this.today, 'MM')).then(async r => {
    //     if (r && r.initiativeId != null) {
    //       this.bscNarrativeForm.patchValue(await r);
    //     }
    //   });
    // await this.progressService.GetBscNarrative(this.initiativeService.id,
    //   +this.datePipe.transform(this.lastMonth, 'yyyy'),
    //   +this.datePipe.transform(this.lastMonth, 'MM')).then(async r => {
    //     if (r && r.initiativeId != null) {
    //       this.dataOld = true;
    //       this.highlightWork2 = r.highlightWork;
    //       this.catchupPlan2 = r.catchupPlan;
    //       this.narrativeStatus2 = r.narrativeStatus;
    //     } else {
    //       this.dataOld = false;
    //     }
    //   });

    this.firstLoad = true;

    if (this.initiativeService.viewMode && !this.isAdmin) {
      this.bscNarrativeForm.disable();
    }
  }

  async getBscNarrativeChangeDate() {
    this.textDate = this.datePipe.transform(this.today, 'MMMM').toString() + "-" + this.datePipe.transform(this.today, 'yyyy').toString();
    // console.log(this.bscData);
    let previousMonth = parseInt(this.datePipe.transform(this.today, 'M')) == 1 ? 12 : parseInt(this.datePipe.transform(this.today, 'M')) - 1;
    let previousYear = parseInt(this.datePipe.transform(this.today, 'M')) == 1 ? parseInt(this.datePipe.transform(this.today, 'yyyy')) - 1 : parseInt(this.datePipe.transform(this.today, 'yyyy'));
    let dataToday: BscNarrativeModel = this.bscData.find((x) => x.month == parseInt(this.datePipe.transform(this.today, 'M')) && x.year == parseInt(this.datePipe.transform(this.today, 'yyyy')));
    let previousData: BscNarrativeModel = this.bscData.find((pd) => pd.year == previousYear && pd.month == previousMonth);
    if (dataToday?.month == parseInt(this.datePipe.transform(this.today, 'M')) && dataToday.year == parseInt(this.datePipe.transform(this.today, 'yyyy'))) {
      this.bscNarrativeForm.patchValue(dataToday);
    } else {
      dataToday = {} as BscNarrativeModel;
      dataToday.month = parseInt(this.datePipe.transform(this.today, 'M'));
      dataToday.bscNarrativeId = 0;
      dataToday.year = parseInt(this.datePipe.transform(this.today, 'yyyy'));
      dataToday.initiativeId = this.initiativeService.id;
      dataToday.engineering = null;
      dataToday.construction = null;
      dataToday.procurement = null;
      dataToday.commissioningStartup = null;
      dataToday.projectManagement = null;
      dataToday.riskAndConcern = null;
      dataToday.mitigationPlan = null;
      dataToday.executiveSummary = null;
      dataToday.workForNextMonth = null;
      dataToday.environmentKpi = null;

      // Narrative
      dataToday.highlightWork = null;
      dataToday.catchupPlan = null;
      dataToday.narrativeStatus = null;
      this.bscData.push(dataToday);
      this.bscNarrativeForm.patchValue(dataToday);
    }
    if (previousData) {
      this.dataOld = true;
      this.textDatePrevious = this.month[previousMonth - 1] + "-" + previousYear.toString();
      this.highlightWork2 = previousData.highlightWork;
      this.catchupPlan2 = previousData.catchupPlan;
      this.narrativeStatus2 = previousData.narrativeStatus;
    } else {
      this.dataOld = false;
    }




    // await this.progressService.GetBscNarrative(this.initiativeService.id,
    //   +this.datePipe.transform(this.today, 'yyyy'),
    //   +this.datePipe.transform(this.today, 'MM')).then(async r => {
    //     if (r && r.initiativeId != null) {
    //       this.bscNarrativeForm.patchValue(await r);
    //     }
    //   });
    // await this.progressService.GetBscNarrative(this.initiativeService.id,
    //   +this.datePipe.transform(this.lastMonth, 'yyyy'),
    //   +this.datePipe.transform(this.lastMonth, 'MM')).then(async r => {
    //     if (r && r.initiativeId != null) {
    //       this.dataOld = true;
    //       this.highlightWork2 = r.highlightWork;
    //       this.catchupPlan2 = r.catchupPlan;
    //       this.narrativeStatus2 = r.narrativeStatus;
    //     } else {
    //       this.dataOld = false;
    //     }
    //   });

  }

  get viewMode() {
    return this.initiativeService.viewMode;
  }

}
