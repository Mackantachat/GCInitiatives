import { KpiDetail } from '@models/KpiDetail';
import { KriDetailMonth, KriProgressMitigation, KpiKriModel, MaintainKpi, InformKri } from './../../../core/models/kpiKriData';
import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KpiKriConfig } from '@models/kpiKriConfig';
import { DIScore, DIYears, KpiKriData } from '@models/kpiKriData';
import { KpiKriApiService } from '@services/kpi-kri-api/kpi-kri-api.service';
import { KpiKriDataService } from '@services/kpi-kri-data/kpi-kri-data.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { KpiKriIndicatorComponent } from '../kpi-kri-indicator/kpi-kri-indicator.component';
import { KpiKriFormComponent } from '../kpi-kri-form/kpi-kri-form.component';
import { Subscription } from 'rxjs';
import { SwalTool } from '@tools/swal.tools';
import { InitiativeService } from '@services/initiative/initiative.service';
import { ResponseService } from '@errors/response/response.service';
import { AuthService } from '@services/authentication/auth.service';
import Swal from 'sweetalert2';
import { MsalService } from '@azure/msal-angular';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-kpi-kri-detail',
  templateUrl: './kpi-kri-detail.component.html',
  styleUrls: ['./kpi-kri-detail.component.css']
})
export class KpiKriDetailComponent implements OnInit {

  //monthMode: BsDatepickerViewMode = 'year';
  yearViewDateFormart = {
    isAnimated: true,
    dateInputFormat: 'YYYY',
    showWeekNumbers: false,
    minMode: 'year',
  };

  bsModalRef: BsModalRef;
  modalKey: string;
  modalIndex: number;
  raw: KpiKriModel;
  form: FormGroup;
  dataSubscrip: Subscription
  year: string;
  id: string;
  kpiId: string;
  kpiModel: KpiKriModel;
  kpiMaintainId: string;
  kpikriFrom: FormGroup = new FormGroup({
    calendarYear: new FormControl(null),
    statusKri: new FormControl(null),
    dateKri: new FormControl(null),
    informName: new FormControl(null),
    editableName: new FormControl(null),
    kriDetailMonth: new FormArray([]),
    kriProgressMitigation: new FormArray([]),
    ownerEmail: new FormControl(null)
  });

  years = [];

  params: any = {};
  coDevelopers: any = [];
  username: string;

  loginName: string;

  LoadPage = true;

  isOwner = false;
  isViewer = false;
  isEditor = false;
  isAdmin = false;

  isFreeze = true;
  isStranger = true;

  months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  scoreItem5: {
    name: number,
    value: number
  }[] = [
      {
        name: 1,
        value: 1
      },
      {
        name: 2,
        value: 2
      },
      {
        name: 3,
        value: 3
      },
      {
        name: 4,
        value: 4
      },
      {
        name: 5,
        value: 5
      }
    ];

  scoreItem3: {
    name: number,
    value: number
  }[] = [
      {
        name: 1,
        value: 1
      },
      {
        name: 2,
        value: 2
      },
      {
        name: 3,
        value: 3
      }
    ]

  config: ModalOptions = {
    class: 'modal-xxl'
  };

  constructor(private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private kpiKriDataService: KpiKriDataService,
    private route: ActivatedRoute,
    private kpiKriApiService: KpiKriApiService,
    private swalTool: SwalTool,
    private initiativeService: InitiativeService,
    private response: ResponseService,
    private authService: AuthService,
    private msalService: MsalService,
    private router: Router,
    private spinner: NgxSpinnerService

  ) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.year = params['year'];
      //this.kpiMaintainId = params['kpiMaintainId']
    });
  }

  async ngOnInit(): Promise<void> {

    await this.authService.getMsalUser().subscribe(async (response) => {
      if (response) {
        //console.log('respone user : ', response);
        //this.loginName = response.mail;
        await this.kpiKriApiService.GetKpiKriModel(this.year, this.id, response.mail).then((res) => {
          // console.log('model : ', res);
          this.loginName = response.mail;
          // check Owner Initiative
          if (res.ownerEmail?.toLowerCase() === response.mail?.toLowerCase()) {
            this.isOwner = true;
            this.isStranger = false;
          }

          // check username is Admin
          this.isAdmin = res.isAdmin == null ? false : res.isAdmin;

          // check Inform ( Read only )
          if (res.informKri.findIndex(c => c.email?.toLowerCase() === response.mail?.toLowerCase() && c.informType === 'A') > -1) {
            this.isViewer = true;
            this.isFreeze = true;
            this.isStranger = false;
          }

          // check Editable ( edit Progress, Mitigration, add inform name, save, inform )
          if (res.informKri.findIndex(c => c.email?.toLowerCase() === response.mail?.toLowerCase() && c.informType === 'B') > -1) {
            this.isEditor = true;
            this.isFreeze = true;
            this.isViewer = false;
            this.isStranger = false;
          }

          // Is Admin
          if (this.isAdmin === true) {
            this.isFreeze = false;
            this.isStranger = false;
            this.isViewer = false;
            this.isEditor = false;
          }

          // Patch Value !!!!
          if (res.kriProgressMitigation[0]) {
            this.kpiId = res.kriDetailMonth[0].kpiMaintainId.toString();
          } else {
            this.kpiId = '0';
          }
          this.kpiModel = res;
          this.reCheckColor();
          // this.reCheckColor(res);
          this.kpikriFrom.patchValue({
            calendarYear: this.year,
            statusKri: res.statusKri,
            dateKri: res.dateKri,
            informName: res.informName,
            editableName: res.editableName,
            ownerEmail: response.mail?.toLowerCase()
          })
          this.setProgressMitigation(res.kriProgressMitigation);
          this.setFormArray(res.kriDetailMonth);

          this.years = res.initiativeYears;

          if (this.isStranger === true) {
            Swal.fire({
              title: 'Access Denied',
              text: "You are not Authorized to view this page",
              icon: 'warning',
              showCancelButton: false,
            }).then(function () {
              setTimeout(function () {
                //window.location.pathname = '/';
                open(window.location.pathname = '/', '_self').close();
              }, 1000);
            });
            return;
          } else {
            this.dataSubscrip = this.kpiKriDataService.DATA.subscribe(res => {
              if (this.kpiKriDataService.modalIndex !== undefined) {
                let control = this.kpikriFrom.get('kriDetailMonth') as FormArray

                control.at(this.kpiKriDataService.modalIndex).patchValue({
                  target1: res.target1,
                  target2: res.target2,
                  target3: res.target3,
                  kriDetail: res.kriDetail
                });
              }
            });

            this.form = this.formBuilder.group({});
          }
        });
      }
    });



    // // this.years = this.getYears();
    // //console.log('loggedIn : ', this.authService.loggedIn());
    // //console.log('getToken : ', this.authService.getToken());
    // ///initiative/kpi?year=2021&id=65375
    // if (this.authService.getToken() == null) {

    //   this.msalService.getUser();
    //   this.msalService.getCacheStorage();
    //   // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   //   //window.location.pathname = '/initiative/kpi?year=' + this.year + '&id=' + this.id;
    //   //   this.router.navigate(['/initiative/kpi'], { queryParams: { year: this.year, id: this.id } });
    //   // }
    //   // );
    // } else if (this.authService.getToken() !== null) {

    // }

    // else{
    //console.log('12345789');
    //this.msalService.loginRedirect()
    //this.router.navigate(['http://localhost:4200/initiative/kpi?year=2021&id=65698']);
    //window.location.reload();
    //   setTimeout(() => {
    //     this.ngOnInit();
    //   }, 2000);
    // }
  }

  reCheckColor() {
    let color = ['red', 'yellow', 'green'];
    // let formArray: KriDetailMonth[] = this.kpikriFrom.get('kriDetailMonth').value;
    this.kpiModel?.kriDetailMonth.forEach((dataArray) => {
      let data: MaintainKpi = this.kpiModel.maintainKpi?.find(x => x.kpiMaintainId == dataArray.kpiMaintainId);
      if (dataArray.kriType == 'kpi_name') {
        dataArray.janColor = color[data['scoreLevel' + dataArray.janScore]];
        dataArray.febColor = color[data['scoreLevel' + dataArray.febScore]];
        dataArray.marColor = color[data['scoreLevel' + dataArray.marScore]];
        dataArray.aprColor = color[data['scoreLevel' + dataArray.aprScore]];
        dataArray.mayColor = color[data['scoreLevel' + dataArray.mayScore]];
        dataArray.junColor = color[data['scoreLevel' + dataArray.junScore]];
        dataArray.julColor = color[data['scoreLevel' + dataArray.julScore]];
        dataArray.augColor = color[data['scoreLevel' + dataArray.augScore]];
        dataArray.sepColor = color[data['scoreLevel' + dataArray.sepScore]];
        dataArray.octColor = color[data['scoreLevel' + dataArray.octScore]];
        dataArray.novColor = color[data['scoreLevel' + dataArray.novScore]];
        dataArray.decColor = color[data['scoreLevel' + dataArray.decScore]];
      }
    });
  }

  getYears(): any[] {
    let d = new Date();
    let year = d.getFullYear() - 1;
    let years = [];
    for (let y = year; y < year + 10; y++) {
      years.push(y);
    }
    return years;
  }

  yearChanged(event) {
    // let yearSelected = (new Date(event)).getFullYear();
    // window.location.href = '/initiative/kpi?year=' + yearSelected + '&id=' + this.id;
    window.location.href = '/initiative/kpi?year=' + event.target.value + '&id=' + this.id;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.dataSubscrip?.unsubscribe();
  }
  setProgressMitigation(data: KriProgressMitigation[]) {
    data.forEach((progress) => {
      let group = new FormGroup({
        kriType: new FormControl(progress.kriType),
        jan: new FormControl(progress.jan),
        feb: new FormControl(progress.feb),
        mar: new FormControl(progress.mar),
        apr: new FormControl(progress.apr),
        may: new FormControl(progress.may),
        jun: new FormControl(progress.jun),
        jul: new FormControl(progress.jul),
        aug: new FormControl(progress.aug),
        sep: new FormControl(progress.sep),
        oct: new FormControl(progress.oct),
        nov: new FormControl(progress.nov),
        dec: new FormControl(progress.dec),
        initiativeId: new FormControl(progress.initiativeId),
        year: new FormControl(progress.year),
        kpiMaintainId: new FormControl(progress.kpiMaintainId),
      });

      (this.kpikriFrom.get('kriProgressMitigation') as FormArray).push(group);

    });

  }

  setFormArray(data: KriDetailMonth[]) {
    data.forEach((detail) => {
      let group = new FormGroup({
        kriType: new FormControl(detail.kriType),
        kriDetail: new FormControl(detail.kriDetail),

        janScore: new FormControl(detail.janScore),
        febScore: new FormControl(detail.febScore),
        marScore: new FormControl(detail.marScore),
        aprScore: new FormControl(detail.aprScore),
        mayScore: new FormControl(detail.mayScore),
        junScore: new FormControl(detail.junScore),
        julScore: new FormControl(detail.julScore),
        augScore: new FormControl(detail.augScore),
        sepScore: new FormControl(detail.sepScore),
        octScore: new FormControl(detail.octScore),
        novScore: new FormControl(detail.novScore),
        decScore: new FormControl(detail.decScore),
        janColor: new FormControl(detail.janColor),
        febColor: new FormControl(detail.febColor),
        marColor: new FormControl(detail.marColor),
        aprColor: new FormControl(detail.aprColor),
        mayColor: new FormControl(detail.mayColor),
        junColor: new FormControl(detail.junColor),
        julColor: new FormControl(detail.julColor),
        augColor: new FormControl(detail.augColor),
        sepColor: new FormControl(detail.sepColor),
        octColor: new FormControl(detail.octColor),
        novColor: new FormControl(detail.novColor),
        decColor: new FormControl(detail.decColor),

        target1: new FormControl(detail.target1),
        target2: new FormControl(detail.target2),
        target3: new FormControl(detail.target3),
        executionKri: new FormControl(detail.executionKri),

        isAction: new FormControl(detail.isAction),
        initiativeId: new FormControl(detail.initiativeId),
        kpiMaintainId: new FormControl(detail.kpiMaintainId),
        year: new FormControl(detail.year),
        kriOrder: new FormControl(detail.kriOrder)

      });
      (this.kpikriFrom.get('kriDetailMonth') as FormArray).push(group);
    });

  }


  private createMicroForm(diScore: DIScore, status: boolean): FormGroup {
    return this.formBuilder.group({
      score: [{ value: diScore?.score, disabled: !status }, [Validators.required]],
      colour: [{ value: diScore?.colour, disabled: !status }, [Validators.required]]
    });
  }

  getYear(year: KeyValue<string, DIYears>): FormArray {
    return this.form.get(year.key).get('details') as FormArray;
  }

  // get months(): string[] {
  //   return KpiKriConfig.months;
  // }

  mapType(year: string, index: number): string {
    return KpiKriConfig.mapName(this.raw?.kriDetailMonth[index].kriType);
  }

  isKpiName(year: string, index: number): boolean {
    return (this.mapType(year, index) === KpiKriConfig.KPI_NAME);
  }


  clickHelp(item: FormGroup, index: number, kpiMaintainId: number, kriFreeze: boolean) {
    let overrideConfig = this.config;
    this.kpiKriDataService.setModalSelected(index);

    if (item.get('kriType').value === "kpi_name") {
      overrideConfig.initialState = { raw: kpiMaintainId };  // { raw: this.kpiId }
      this.bsModalRef = this.modalService.show(KpiKriIndicatorComponent, this.config);
    }
    else {
      overrideConfig.initialState = { raw: item, kriFreeze: kriFreeze };
      //overrideConfig.initialState = { kriFreeze: kriFreeze }; 
      this.kpiKriDataService.DATA.next(item.value);
      this.bsModalRef = this.modalService.show(KpiKriFormComponent, overrideConfig);
    }
  }



  shiftUpAtion(index: number) {
    let formArray = this.kpikriFrom.get('kriDetailMonth') as FormArray;
    let data = formArray.at(index).value;
    let dataNext = formArray.at(index - 1).value;

    formArray.at(index).patchValue(dataNext);
    formArray.at(index - 1).patchValue(data);
  }

  shiftDownAction(index: number) {
    let formArray = this.kpikriFrom.get('kriDetailMonth') as FormArray;
    let data = formArray.at(index).value;
    let dataNext = formArray.at(index + 1).value;

    formArray.at(index).patchValue(dataNext);
    formArray.at(index + 1).patchValue(data);
  }

  checkUpAndDown(index: number, type: string) {
    let formArray: any[] = (this.kpikriFrom.get('kriDetailMonth') as FormArray).value;
    if (type === 'up' && index <= 1) {
      return false;
    } else if (type === 'down' && index == (formArray.length - 1)) {
      return false;
    } else {
      return true;
    }

  }

  delete(year: string, index: number): void {

    // if (!confirm('Are you sure to Delete?')) {
    //   return;
    // }
    Swal.fire({
      title: 'Are you sure?',
      //text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const details = this.kpikriFrom.get('kriDetailMonth') as FormArray;  //this.form.get(year).get('details') as FormArray;
        details.removeAt(index);
        this.raw.kriDetailMonth.splice(index, 1);
        //Swal.fire('Deleted!','Your file has been deleted.','success')
      }
    });
  }


  inform(): void {
    let informKri: InformKri = {} as InformKri;
    informKri.initiativeId = +this.id;
    informKri.year = this.year;
    this.kpiKriApiService.PostInformMail(informKri);

    Swal.fire({
      title: 'Email has been sent successfully.',
      icon: 'success',
      showCancelButton: false,
      showConfirmButton: false,
      timer: 2000,
    });

    //// Save then Send !!!
    // this.kpiKriApiService.PostKpiKriModel(+this.id, this.kpikriFrom.value).then((postResponse) => {
    //   let informKri: InformKri = {} as InformKri;
    //   informKri.initiativeId = +this.id;
    //   informKri.year = this.year;
    //   this.kpiKriApiService.PostInformMail(informKri);
    //   Swal.fire({
    //     title: 'Email has been sent successfully.',
    //     icon: 'success',
    //     showCancelButton: false,
    //     showConfirmButton: false,
    //     timer: 2000,
    //   });
    // });

  }

  save(): void {
    this.kpiKriApiService.PostKpiKriModel(+this.id, this.kpikriFrom.value).then((postResponse) => {
      this.swalTool.Success();
      //alert('success!');
    });
  }

  addRowArray(type: string) {
    let group = new FormGroup({
      kriType: new FormControl(type),
      kriDetail: new FormControl(null),

      janScore: new FormControl(null),
      febScore: new FormControl(null),
      marScore: new FormControl(null),
      aprScore: new FormControl(null),
      mayScore: new FormControl(null),
      junScore: new FormControl(null),
      julScore: new FormControl(null),
      augScore: new FormControl(null),
      sepScore: new FormControl(null),
      octScore: new FormControl(null),
      novScore: new FormControl(null),
      decScore: new FormControl(null),

      isAction: new FormControl(false),
      initiativeId: new FormControl(this.id),
      year: new FormControl(this.year),
      kpiMaintainId: new FormControl(this.kpiId),
      janColor: new FormControl(null),
      febColor: new FormControl(null),
      marColor: new FormControl(null),
      aprColor: new FormControl(null),
      mayColor: new FormControl(null),
      junColor: new FormControl(null),
      julColor: new FormControl(null),
      augColor: new FormControl(null),
      sepColor: new FormControl(null),
      octColor: new FormControl(null),
      novColor: new FormControl(null),
      decColor: new FormControl(null),
      target1: new FormControl(null),
      target2: new FormControl(null),
      target3: new FormControl(null),
      executionKri: new FormControl(null),
      kriOrder: new FormControl(null)
      //isAction: new FormControl(false),
      //initiativeId: new FormControl(this.id),
      //year: new FormControl(this.year),

    });
    (this.kpikriFrom.get('kriDetailMonth') as FormArray).push(group);
  }

  logForm() {

  }

  chageNameColor(index: number, a: string, event, monthColor: string, id: number) {

    let color = ['red', 'yellow', 'green'];
    let value = event.value;
    let formArray = this.kpikriFrom.get('kriDetailMonth') as FormArray;
    let data: MaintainKpi = this.kpiModel.maintainKpi?.find(x => x.kpiMaintainId == id);
    let indicator: number;

    if (a == 'kpi_name') {

      switch (value) {
        case 1:
          indicator = data.scoreLevel1;
          break;
        case 2:
          indicator = data.scoreLevel2;
          break;
        case 3:
          indicator = data.scoreLevel3;
          break;
        case 4:
          indicator = data.scoreLevel4;
          break;
        case 5:
          indicator = data.scoreLevel5;
          break;
        default:
          indicator = 0;
          break;
      }

    } else {
      indicator = +value - 1;
    }

    formArray.at(index).get(monthColor).setValue(color[indicator]);
  }

  // checkColorKPI(kpiMaintainId:number, index:number, event){
  //   let color = ['red', 'yellow', 'green'];
  //   let value = event.value;
  //   let formArray = this.kpikriFrom.get('kriDetailMonth') as FormArray;
  //   let data: MaintainKpi = this.kpiModel.maintainKpi?.find(x=>x.kpiMaintainId == kpiMaintainId);
  //   let indicator: number;

  //   return 'X :' + kpiMaintainId;
  // }


  // isDisableSelectField(year: string, month: string) {
  //   return new Date() > new Date(Number(year), this.months.findIndex(val => val === month) + 1, 0);
  // }

  toggleCheckbox($event: Event, year: string, j: number) {
    if ($event.target['checked'] !== null) {
      const status = $event.target['checked'];
      this.toggleDisableRow(status, year, j);
    }
  }

  private toggleDisableRow(status: any, year: string, j: number) {
    const details = this.form.get(year).get('details') as FormArray;
    const row = details.at(j) as FormGroup;
    Object.keys(row.controls).filter(name => name !== 'status').forEach(key => {
      (status) ? row.controls[key].enable() : row.controls[key].disable();
    });
  }

  SearchCoDeveloper(event) {
    this.GetCoDevelopers(event.term);
  }

  RemoveCoDeveloper() {
    this.GetCoDevelopers();
  }

  GetCoDevelopers(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(coDevelopers => {
      if (coDevelopers) {
        this.coDevelopers = coDevelopers;
        this.coDevelopers = this.coDevelopers.filter(obj => {
          return obj.email ? obj.email.toLowerCase().trim() : null !== this.username.toLowerCase().trim();
        });
      }
    }, error => this.response.error(error));
  }


}

