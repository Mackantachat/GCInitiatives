import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { IDropdownSelect } from '@models/IDropdownSelect';
import { IMeetingList, InitiativeMember, InitiativeVacPicList } from '@models/IMeetingList';
import { IMemberVAC } from '@models/IMemberVAC';
import { Initiative } from '@models/initiative';
import { InitiativeList } from '@models/initiativeList';
import { InitiativeService } from '@services/initiative/initiative.service';
import { VacPicService } from '@services/vac-pic/vac-pic.service';
import { SwalTool } from '@tools/swal.tools';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-vac-manager-detail',
  templateUrl: './vac-manager-detail.component.html',
  styleUrls: ['./vac-manager-detail.component.css']
})
export class VacManagerDetailComponent implements OnInit {

  id: number;
  title: string;
  form: FormGroup;
  loading = true;

  initiatives: InitiativeMember[] = [];
  initiativesList: InitiativeMember[] = [];
  initiativeVacPicList: InitiativeVacPicList[] = [];

  commonList: string[] = [];
  specificList: any = [];

  initiativeId: number[] = [];
  data: string;
  params: Params;
  paramsCo: any = {};
  viewMode: boolean;

  elementList: {
    index: number;
    elementName: string;
    isShow: boolean;
  }[] = [];




  // ddlResult: IDropdownSelect[] = [
  //   // { id: 1, name: 'Approve' },
  //   // { id: 2, name: 'Revise' },
  //   // { id: 3, name: 'Reject' },
  //   // { id: 4, name: 'Goto Stage' },
  //   // { id: 5, name: 'Change Process' }
  //   { id: 1, name: 'Pass' },
  //   { id: 2, name: 'Not Pass' },
  //   { id: 2, name: 'Change Process' }
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
        name: 'Not Pass',
        value: 'not pass'
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

  initiativeMember: InitiativeMember[] = [];

  eventManagerSelectSubscribtion: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private service: VacPicService,
    private initiativeService: InitiativeService,
    private spinner: NgxSpinnerService,
    private swalTool: SwalTool
  ) {
    this.spinner.show();
    this.form = this.fb.group({
      meetingDate: new FormControl(new Date()),
      common: new FormControl([]),
      specific: new FormControl([]),
      initiativeMember: new FormArray([])
    });
  }

  ngOnInit() {

    this.activeRoute.params.subscribe(params => {
      this.params = params;
      this.id = params.id;
    });
    this.activeRoute.data.subscribe(data => {
      this.title = data.flag;
    });
    // this.title = 'Edit';
    // this.getInitiative();






    if (this.title === 'New') {
      this.form = this.fb.group({
        meetingDate: new FormControl(new Date()),
        common: new FormControl([]),
        specific: new FormControl([]),
        initiativeMember: new FormArray([])
      });
      this.initiativeService.GetInitiativeVacPic(this.initiativeMember, 'vac').subscribe((response) => {
        this.initiativeVacPicList = response;
        this.setIemArray(response);
        this.spinner.hide();
      });
    } else if (this.title === 'Edit') {
      // this.id = Number(this.params.id);
      this.service.getTableVACMemberById(this.id).subscribe((table: IMemberVAC) => {

        if (table) {
          table.vacListId
          table.statusVac == 'submit' ? this.viewMode = true : this.viewMode = false;
          // this.initiativeId = table.initiativeId;
          // this.initiatives = table.initiativeId;
          this.form = this.fb.group({
            vacListId: this.id,
            meetingDate: new FormControl(new Date()),
            common: new FormControl(table.common),
            specific: new FormControl(table.specific),
            initiativeMember: new FormArray([])
          });
          if (table.statusVac == 'draft') {
            this.initiativeService.GetInitiativeVacPic(table.initiativeMember, 'vac').subscribe((response) => {
              if (response) {
                this.spinner.hide();
                this.initiativeVacPicList = response;
                this.setFormArray(response, table.initiativeMember);
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
          common: new FormControl([]),
          specific: new FormControl([]),
          initiativeMember: new FormArray([])
        });
        this.spinner.hide();
      });
    }
    //get initiative data
    //get commonList
    this.getCommonList();
    //get specificList
    this.getSpecificList();
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




  get getTitle() {
    return this.title === 'Edit' ? 'true' : 'false';
  }

  getCommonList() {
    //mock
    this.commonList = [
      'Chatree Sa <TP-PM>',
      'Chonlavit S <TP-PM-CO/1023>',
      'Rutthanee I <TP-PM-CO/1350>',
      'Voravit W <TP-PM-CC/1921>',
      'Veravong P <TP-PM-CC>',
      'Teerachat S <PM-P2-PJ/4830>',
      'Kriengkrai B <TP-PQ-CE/1550>',
      'Theerachai T <TP-PQ-DM/1279',
      'Bhumibhat B <TP-PQ-AI/1395',
      'Preecha Pr <TP-PP-DM/1357'
    ];
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


        // let groupControl = new FormGroup({
        //   selected: new FormControl(true),
        //   initiativeId: new FormControl(initative.initiativeId),
        //   initiativeCode: new FormControl(initative.initiativeCode),
        //   name: new FormControl(initative.name),
        //   ownerName: new FormControl(initative.ownerName),
        //   initiativeType: new FormControl(initative.initiativeType),
        //   location: new FormControl(initative.location),
        //   emocNo: new FormControl(initative.emocNo),
        //   gate: new FormControl(initative.gate),
        //   presentation: new FormControl(initative.presentation),
        //   pdd: new FormControl(initative.pdd),
        //   smesRequest: new FormControl(initative.smesRequest),
        //   budgetSource: new FormControl(initative.budgetSource),
        //   overallBudget: new FormControl(initative.overallBudget),
        //   requestBudget: new FormControl(initative.requestBudget),
        //   result: new FormControl(initative.result),
        //   process: new FormControl(initative.process),
        //   stage: new FormControl(initative.stage)
        // });
        this.changeResultFormModel(initiative.result, index);
        (this.form.get('initiativeMember') as FormArray).push(groupControl);
      })
    }

    data.forEach((d) => {
      this.initiativesList.push(d);
    })
  }

  valueOwnerChange($eventText: any, text: string) {
    try {
      this.eventManagerSelectSubscribtion.unsubscribe();
    } catch (e) { }
    if ($eventText && $eventText.term && $eventText.term.trim().length > 0) {
      this.eventManagerSelectSubscribtion = this.initiativeService.GetOwners({ text: $eventText.term })
        .pipe(debounceTime(1000))
        .subscribe(owners => {
          switch (text) {
            case 'specific':
              this.specificList = owners;
              break;
            default:
              break;
          }
        });
    } else {
      this.eventManagerSelectSubscribtion = this.initiativeService.GetOwners({ text: null })
        .pipe(debounceTime(1000))
        .subscribe(owners => {
          switch (text) {
            case 'specific':
              this.specificList = owners;
              break;
            default:
              break;
          }
        });
    }
  }

  SearchManager(event) {
    this.GetManager(event.term);
  }

  ClearGetManager() {
    this.GetManager();
  }

  GetManager(Text?) {
    this.paramsCo.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.paramsCo).subscribe(owners => {
      this.specificList = owners;
    });
  }


  getSpecificList(Text?) {
    this.paramsCo.text = Text ? Text : '';
    this.initiativeService.GetCoDevelopers(this.paramsCo).subscribe(coDevelopers => {
      if (coDevelopers) {
        this.specificList = coDevelopers;
        // this.initiativeService.GetUser(this.username).subscribe(user => {
        //   if (user.ownerName === this.initiativesForm.controls.ownerName.value) {
        //     this.coDevelopers = this.coDevelopers.filter(obj => {
        //       return obj.email ? obj.email.toLowerCase().trim() : null !== this.username.toLowerCase().trim();
        //     });
        //   }
        // });
      }
    });
  }
  //mock

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

  onSave() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.swalTool.Required();
    } else {
      let data: IMemberVAC = this.form.value;
      data.statusVac = 'submit';
      data.initiativeMember = data.initiativeMember.filter((x) => x.selected == true);

      if (this.title == 'New') {
        this.service.insertData(data).subscribe((res) => {
          this.swalTool.VacPicSubmit('vac');
        }, error => {
          this.swalTool.VacPicSubmitError('vac');
        })
      } else {
        this.service.updateData(data).subscribe((res) => {
          this.swalTool.VacPicSubmit('vac');
        }, error => {
          this.swalTool.VacPicSubmitError('vac');
        })
      }
    }
  }


  onSaveDraft() {
    let data: IMemberVAC = this.form.value;
    data.statusVac = 'draft';
    data.initiativeMember = data.initiativeMember.filter((x) => x.selected == true);

    if (this.title == 'New') {
      this.service.insertData(data).subscribe((res) => {
        this.swalTool.VacPicSubmit('vac');
      }, error => {
        this.swalTool.VacPicSubmitError('vac');
      })
    } else {
      this.service.updateData(data).subscribe((res) => {
        this.swalTool.VacPicSubmit('vac');
      }, error => {
        this.swalTool.VacPicSubmitError('vac');
      })
    }
  }

  onCancel() {
    this.router.navigateByUrl(`/vac-manager`);
  }

  get formArrayMeeting(): FormArray {
    return this.form.get('initiativeId') as FormArray;
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
    // if (event.name == 'Revise' || event.name == 'Goto Stage') {
    //   this.elementList.push({
    //     index: index,
    //     elementName: 'stage',
    //     isShow: true
    //   });
    if (event.value == 'leave' || event.value == 'move back' || event.value == 'not pass') {
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
    // if (result == 'Revise' || result == 'Goto Stage') {
    //   this.elementList.push({
    //     index: index,
    //     elementName: 'stage',
    //     isShow: true
    //   });

    if (result == 'leave' || result == 'move back' || result == 'not pass') {
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
    // if (type === 'stage') {
    //   return list.stages;
    // } else if (type === 'process') {
    //   return list.switchProcesses;
    // }
    if (type === 'stage') {
      if (result == 'leave') {
        return list.leaves;
      } else if (result == 'move back') {
        return list.moveBacks;
      } else if (result == 'not pass') {
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
