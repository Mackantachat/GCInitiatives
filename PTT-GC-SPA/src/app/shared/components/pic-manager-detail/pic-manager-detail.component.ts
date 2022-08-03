import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IDropdownSelect } from '@models/IDropdownSelect';
import { IMeetingList, InitiativeMember, InitiativeVacPicList } from '@models/IMeetingList';
import { IMemberPIC } from '@models/IMemberPIC';
import { IMemberVAC } from '@models/IMemberVAC';
import { Initiative } from '@models/initiative';
import { InitiativeService } from '@services/initiative/initiative.service';
import { VacPicService } from '@services/vac-pic/vac-pic.service';
import { SwalTool } from '@tools/swal.tools';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-pic-manager-detail',
  templateUrl: './pic-manager-detail.component.html',
  styleUrls: ['./pic-manager-detail.component.css']
})
export class PicManagerDetailComponent implements OnInit {
  title: string;
  form: FormGroup;

  id: number;




  initiatives: InitiativeMember[] = [];
  initiativesList: InitiativeMember[] = [];
  initiativeVacPicList: InitiativeVacPicList[] = [];


  commonList: string[] = [];

  initiativeMember: InitiativeMember[] = [];
  data: string;
  params: Params;
  paramsCo: any = {};

  buStreamList: any[] = [];
  centerStream: string[] = [];
  upStream: string[] = [];
  downStream: string[] = [];

  ddSelect: {
    index: number;
    type: string;
    value: string;
  }[] = []

  elementList: {
    index: number;
    elementName: string;
    isShow: boolean;
  }[] = [];

  viewMode: boolean;



  // ddlResult: IDropdownSelect[] = [
  //   { id: 1, name: 'Approve' },
  //   { id: 2, name: 'Revise' },
  //   { id: 3, name: 'Reject' },
  //   { id: 4, name: 'Goto Stage' },
  //   { id: 5, name: 'Change Process' }
  // ];

  ddlResult: {
    name: string;
    value: string;
  }[] = [
      {
        name: 'Pass',
        value: 'pass'
      },
      {
        name: 'Leave',
        value: 'leave'
      },
      {
        name: 'Move Back',
        value: 'move back'
      },
      {
        name: 'Cancelled',
        value: 'cancelled'
      },
      {
        name: 'Change Process',
        value: 'change process'
      }
    ]

  chosenResult: any;

  ddlStage: IDropdownSelect[] = [
    { id: 1, name: 'Gate 1' },
    { id: 2, name: 'Gate 2' },
    { id: 3, name: 'Gate 3' },
    { id: 4, name: 'Gate 4' },
    { id: 5, name: 'Gate 5' }
  ];
  ddlProcess: IDropdownSelect[] = [
    { id: 1, name: 'MAX' },
    { id: 2, name: 'CIM' },
    { id: 3, name: 'PIM' },
    { id: 4, name: 'DIM' },
    { id: 5, name: 'Direct CAPEX' },
    { id: 6, name: 'CPI' },
    { id: 7, name: 'Strategy' }
  ];

  initiativeMemberForm: FormArray = new FormArray([]);
  // ddlResult: IDropdownSelect[] = [{ id: 1, name: 'Done' }, { id: 2, name: 'Reject' }];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: VacPicService,
    private spinner: NgxSpinnerService,
    private swalTool: SwalTool,
    private initiativeService: InitiativeService,
  ) {
    this.spinner.show();
    this.form = this.fb.group({
      meetingDate: new FormControl(new Date()),
      centerStream: new FormControl([]),
      upStream: new FormControl([]),
      downStream: new FormControl([]),
      initiativeMember: new FormArray([])
    });
  }

  ngOnInit() {

    //get  commonData
    this.service.getBuStream().subscribe((buStream) => {
      if (buStream) {
        this.buStreamList = buStream;
      }
    })



    this.activeRoute.params.subscribe(params => {
      this.params = params;
      this.id = params.id;
    });
    this.activeRoute.data.subscribe(data => {
      this.title = data.flag;
    });

    if (this.title === 'New') {
      this.form = this.fb.group({
        meetingDate: new FormControl(new Date()),
        centerStream: new FormArray([]),
        upStream: new FormArray([]),
        downStream: new FormArray([]),
        initiativeMember: new FormArray([])
      });
      this.initiativeService.GetInitiativeVacPic(this.initiativeMember, 'pic').subscribe((response) => {
        // this.initiatives = response;
        this.initiativeVacPicList = response;
        this.setIemArray(response);
        this.spinner.hide();
      });
    } else if (this.title === 'Edit') {
      // this.id = Number(this.params.id);
      this.service.getTablePICMemberById(this.id).subscribe((table: IMemberPIC) => {
        if (table) {
          this.upStream = table.upStream;
          this.centerStream = table.centerStream;
          this.downStream = table.downStream;
          table.statusPic == 'submit' ? this.viewMode = true : this.viewMode = false;
          this.form = this.fb.group({
            picListId: this.id,
            meetingDate: new FormControl(new Date(table.meetingDate)),
            centerStream: new FormArray([]),
            upStream: new FormArray([]),
            downStream: new FormArray([]),
            initiativeMember: new FormArray([])
          });
          this.setStreamFormService(table);
          if (table.statusPic == 'draft') {
            this.initiativeService.GetInitiativeVacPic(table.initiativeMember, 'pic').subscribe((response) => {
              if (response) {
                // this.initiatives = response;
                this.initiativeVacPicList = response;

                this.setFormArray(response, table.initiativeMember);
                this.spinner.hide();
                // this.initiativesList = response;
              }
            });
          } else {
            this.setFormArrayFormDB(table.initiativeMember);
            this.spinner.hide();
          }
        }
      }, err => {
        this.form = this.fb.group({
          meetingDate: new FormControl(new Date()),
          centerStream: new FormArray([]),
          upStream: new FormArray([]),
          downStream: new FormArray([]),
          initiativeMember: new FormArray([])
        });
        this.spinner.hide();
      });
    }
  }

  setFormArrayFormDB(data: InitiativeMember[]) {
    (this.form.get('initiativeMember') as FormArray).clear();
    if (data && data.length > 0) {
      data.forEach((initiative, index) => {
        let fxExchange: number = initiative.fxExchange ? parseFloat(initiative.fxExchange) : 1;
        let costCapex: number = initiative.requestCapex ? parseFloat(initiative.requestCapex) : 0;
        let costOpex: number = initiative.requestOpex ? parseFloat(initiative.requestOpex) : 0;
        let costCapexFx: number = initiative.costEstCapexType == "USD" ? costCapex * fxExchange : costCapex;
        let costOpexFx: number = initiative.costEstOpexType == "USD" ? costOpex * fxExchange : costOpex;
        let overAllCost: number = costCapexFx + costOpexFx;

        let groupControl = new FormGroup({
          selected: new FormControl(true),
          initiativeId: new FormControl(initiative.initiativeId),
          initiativeCode: new FormControl(initiative.initiativeCode),
          name: new FormControl(initiative.name),
          ownerName: new FormControl(initiative.ownerName),
          initiativeType: new FormControl(initiative.initiativeType),
          plant: new FormControl(initiative.plant),
          emocNo: new FormControl(initiative.emocNo),
          gate: new FormControl(initiative.gate),
          presentation: new FormControl(initiative.presentation),
          pdd: new FormControl(initiative.pdd),
          overallCostEst: new FormControl(overAllCost.toFixed(2)),
          requestCapex: new FormControl(initiative.requestCapex ? costCapexFx.toFixed(2) : null),
          requestOpex: new FormControl(initiative.requestOpex ? costOpexFx.toFixed(2) : null),
          result: new FormControl(initiative.result),
          process: new FormControl(initiative.process),
          stage: new FormControl(initiative.stage)
        });
        this.changeResultFormModel(initiative.result, index);
        (this.form.get('initiativeMember') as FormArray).push(groupControl);
      })
    }

    data.forEach((d) => {
      this.initiativesList.push(d);
    })
  }



  onSaveDraft() {
    let data: IMemberPIC = this.form.value;
    data.statusPic = 'draft';
    data.initiativeMember = data.initiativeMember.filter((x) => x.selected == true);


    if (this.title == 'New') {
      this.service.insertPicData(data).subscribe((res) => {
        this.swalTool.VacPicSubmit('pic');
      }, error => {
        this.swalTool.VacPicSubmitError('pic');
      })
    } else {
      this.service.updatePicData(data).subscribe((res) => {
        this.swalTool.VacPicSubmit('pic');
      }, error => {
        this.swalTool.VacPicSubmitError('pic');
      })
    }
  }

  getBuStreamByType(type: string) {
    let stream = this.buStreamList.filter((x) => x.attribute02 == type);
    return stream;
  }

  get getTitle() {
    return this.title === 'Edit' ? 'true' : 'false';
  }

  findCenter(params: string): boolean {
    if (this.centerStream && this.centerStream.filter(f => f === params).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  findUpStream(params: string): boolean {
    if (this.upStream && this.upStream.filter(f => f === params).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  findDownStream(params: string): boolean {
    if (this.downStream && this.downStream.filter(f => f === params).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  toggle(params: string, type: string) {
    if (params && type) {
      if (type === 'up') {
        if (this.findUpStream(params)) {
          this.upStream = this.upStream.filter(x => x !== params);
        } else {
          this.upStream.push(params);
        }
        this.setStream('upStream');

      } else if (type === 'center') {
        if (this.findCenter(params)) {
          this.centerStream = this.centerStream.filter(x => x !== params);
        } else {
          this.centerStream.push(params);
        }
        this.setStream('centerStream');

      } else {
        if (this.findDownStream(params)) {
          this.downStream = this.downStream.filter(x => x !== params);
        } else {
          this.downStream.push(params);
        }
        this.setStream('downStream');

      }
    }
  }

  setStream(type: string) {
    (this.form.get(type) as FormArray).clear();
    this[type].forEach((data) => {
      let control = new FormControl(data);
      (this.form.get(type) as FormArray).push(control);
    });
  }

  setStreamFormService(data: IMemberPIC) {
    if (data.upStream.length > 0) {
      data.upStream.forEach((dataUp) => {
        let controlUp = new FormControl(dataUp);
        (this.form.get('upStream') as FormArray).push(controlUp);
      });
    }
    if (data.centerStream.length > 0) {
      data.centerStream.forEach((center) => {
        let controlCenter = new FormControl(center);
        (this.form.get('centerStream') as FormArray).push(controlCenter);
      });
    }
    if (data.downStream.length > 0) {
      data.downStream.forEach((dataDown) => {
        let controlDown = new FormControl(dataDown);
        (this.form.get('downStream') as FormArray).push(controlDown);
      });
    }
  }

  setIemArray(respData: InitiativeVacPicList[]) {
    respData.forEach((data) => {
      let fxExchange: number = data.fxExchange ? parseFloat(data.fxExchange) : 1;
      let costCapex: number = data.requestCapex ? parseFloat(data.requestCapex) : 0;
      let costOpex: number = data.requestOpex ? parseFloat(data.requestOpex) : 0;
      let costCapexFx: number = data.costEstCapexType == "USD" ? costCapex * fxExchange : costCapex;
      let costOpexFx: number = data.costEstOpexType == "USD" ? costOpex * fxExchange : costOpex;
      let overAllCost: number = costCapexFx + costOpexFx;
      //let overallCost = 
      let groupControl = new FormGroup({
        selected: new FormControl(false),
        initiativeId: new FormControl(data.initiativeId),
        initiativeCode: new FormControl(data.initiativeCode),
        name: new FormControl(data.name),
        ownerName: new FormControl(data.ownerName),
        initiativeType: new FormControl(data.initiativeType),
        plant: new FormControl(data.plant),
        emocNo: new FormControl(data.emocNo),
        gate: new FormControl(data.gate),
        presentation: new FormControl(data.presentation),
        pdd: new FormControl(data.pdd),
        overallCostEst: new FormControl(overAllCost.toFixed(2)),
        requestCapex: new FormControl(data.requestCapex ? costCapexFx.toFixed(2) : null),
        requestOpex: new FormControl(data.requestOpex ? costOpexFx.toFixed(2) : null),
        result: new FormControl(null),
        process: new FormControl(null),
        stage: new FormControl(null)
      });
      (this.form.get('initiativeMember') as FormArray).push(groupControl);
    });
  }

  chooseCheckbox(index: number) {
    let memberArray = this.form.get('initiativeMember') as FormArray;
    let check = memberArray.at(index).get('selected').value;
    if (check) {
      memberArray.at(index).get('result').setValidators([
        Validators.required
      ]);
      memberArray.at(index).get('result').updateValueAndValidity();
    } else {
      memberArray.at(index).get('result').clearValidators();
      memberArray.at(index).get('result').updateValueAndValidity();
    }
  }


  onSave() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.swalTool.Required();
    } else {
      let data: IMemberPIC = this.form.value;
      data.statusPic = 'submit';
      data.initiativeMember = data.initiativeMember.filter((x) => x.selected == true);

      if (this.title == 'New') {
        this.service.insertPicData(data).subscribe((res) => {
          this.swalTool.VacPicSubmit('pic');
        }, error => {
          this.swalTool.VacPicSubmitError('pic');
        })
      } else {
        this.service.updatePicData(data).subscribe((res) => {
          this.swalTool.VacPicSubmit('pic');
        }, error => {
          this.swalTool.VacPicSubmitError('pic');
        })
      }
    }
  }

  onCancel() {
    this.router.navigateByUrl(`/pic-manager`);
  }

  get formArrayMeeting(): FormArray {
    return this.form.get('meetingList') as FormArray;
  }

  setFormArray(data: InitiativeVacPicList[], initiativeList: InitiativeMember[]) {
    (this.form.get('initiativeMember') as FormArray).clear();
    let groupControl: FormGroup;
    if (initiativeList && initiativeList.length > 0) {
      data.forEach((initiative, index) => {
        let selectedData: InitiativeMember = initiativeList.find(x => x.initiativeId == initiative.initiativeId);
        let fxExchange: number = initiative.fxExchange ? parseFloat(initiative.fxExchange) : 1;
        let costCapex: number = initiative.requestCapex ? parseFloat(initiative.requestCapex) : 0;
        let costOpex: number = initiative.requestOpex ? parseFloat(initiative.requestOpex) : 0;
        let costCapexFx: number = initiative.costEstCapexType == "USD" ? costCapex * fxExchange : costCapex;
        let costOpexFx: number = initiative.costEstOpexType == "USD" ? costOpex * fxExchange : costOpex;
        let overAllCost: number = costCapexFx + costOpexFx;
        //let overallCost = 



        if (selectedData) {
          groupControl = new FormGroup({
            selected: new FormControl(true),
            initiativeId: new FormControl(initiative.initiativeId),
            initiativeCode: new FormControl(initiative.initiativeCode),
            name: new FormControl(initiative.name),
            ownerName: new FormControl(initiative.ownerName),
            initiativeType: new FormControl(initiative.initiativeType),
            plant: new FormControl(initiative.plant),
            emocNo: new FormControl(initiative.emocNo),
            gate: new FormControl(initiative.gate),
            presentation: new FormControl(initiative.presentation),
            pdd: new FormControl(initiative.pdd),
            overallCostEst: new FormControl(overAllCost.toFixed(2)),
            requestCapex: new FormControl(initiative.requestCapex ? costCapexFx.toFixed(2) : null),
            requestOpex: new FormControl(initiative.requestOpex ? costOpexFx.toFixed(2) : null),
            result: new FormControl(selectedData.result, [Validators.required]),
            process: new FormControl(selectedData.process),
            stage: new FormControl(selectedData.stage)
          });
        } else {

          groupControl = new FormGroup({
            selected: new FormControl(false),
            initiativeId: new FormControl(initiative.initiativeId),
            initiativeCode: new FormControl(initiative.initiativeCode),
            name: new FormControl(initiative.name),
            ownerName: new FormControl(initiative.ownerName),
            initiativeType: new FormControl(initiative.initiativeType),
            plant: new FormControl(initiative.plant),
            emocNo: new FormControl(initiative.emocNo),
            gate: new FormControl(initiative.gate),
            presentation: new FormControl(initiative.presentation),
            pdd: new FormControl(initiative.pdd),
            overallCostEst: new FormControl(overAllCost.toFixed(2)),
            requestCapex: new FormControl(initiative.requestCapex ? costCapexFx.toFixed(2) : null),
            requestOpex: new FormControl(initiative.requestOpex ? costOpexFx.toFixed(2) : null),
            result: new FormControl(null),
            process: new FormControl(null),
            stage: new FormControl(null)
          });
        }
        this.changeResultFormModel(selectedData ? selectedData.result : null, index);
        (this.form.get('initiativeMember') as FormArray).push(groupControl);
      })
    }

    // data.forEach((d) => {
    //   this.initiativesList.push(d);
    // })
  }

  changeResult(event, index: number) {
    let list = this.elementList.findIndex((x) => x.index == index);
    if (list >= 0) {
      this.elementList.splice(list, 1);
    }
    if (event.value == 'leave' || event.value == 'move back') {
      this.elementList.push({
        index: index,
        elementName: 'stage',
        isShow: true
      });

    } else if (event.value == 'change process') {
      this.elementList.push({
        index: index,
        elementName: 'process',
        isShow: true
      });
    }
  }

  changeResultFormModel(result: string, index: number) {
    let list = this.elementList.findIndex((x) => x.index == index);
    if (list >= 0) {
      this.elementList.splice(list, 1);
    }
    if (result == 'leave' || result == 'move back') {
      this.elementList.push({
        index: index,
        elementName: 'stage',
        isShow: true
      });

    } else if (result == 'change process') {
      this.elementList.push({
        index: index,
        elementName: 'process',
        isShow: true
      });
    }
  }

  getShowElem(type: string, index: number) {
    let list = this.elementList.findIndex((x) => x.index == index && x.elementName == type);
    if (list >= 0) {
      return true;
    } else {
      return false;
    }
  }

  getStageAndProgress(type: string, index: number, initiativeId: number) {
    if (this.viewMode) {
      return;
    }
    let list: InitiativeVacPicList = this.initiativeVacPicList.find(x => x.initiativeId == initiativeId);
    let formArray = this.form.get('initiativeMember') as FormArray;
    let result = formArray.at(index).get('result').value;
    if (type === 'stage') {
      if (result == 'leave') {
        return list.leaves;
      } else if (result == 'move back') {
        return list.moveBacks;
      }
    } else if (type === 'process') {
      return list.switchProcesses;
    }
  }

  getDateValue(field: string) {
    return this.form.get(field).value;
  }

}
