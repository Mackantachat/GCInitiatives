import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ITabRevise } from '@models/ITabRevise';
import { DetailService } from '../../../core/services/detail/detail.service';
import { InitiativeService } from '../../../core/services/initiative/initiative.service';
import { BsDatepickerViewMode, BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { PermissionService } from '@services/permission/permission.service';
import { VacPicService } from '@services/vac-pic/vac-pic.service';
import { DateUtil } from '@utils/date.utils';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { PimGate } from '@models/pimGate';
import { ValidateService } from '@services/validate/validate.service';

@Component({
  selector: 'app-pim-gate4',
  templateUrl: './pim-gate4.component.html',
  styleUrls: ['./pim-gate4.component.css']
})
export class PimGate4Component implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() mainTab = false;
  @Output() emitAddPage: EventEmitter<ITabRevise> = new EventEmitter<ITabRevise>();

  version = 0;
  versionList = [
    { text: 'Current Version', id: 0 },
    { text: 'Version 2', id: 1 },
    { text: 'Version 1', id: 2 },
  ];

  constructor(private fb: FormBuilder,
    private detailService: DetailService,
    private initiativeService: InitiativeService,
    public ps: PermissionService,
    private dateUti: DateUtil,
    private vacPicService: VacPicService,
    private detailInformationService: DetailInformationService,
    private validateService: ValidateService) {
    if (!this.mainTab) {
      /* Call load new formGroup here */
    }
  }

  gate4Form = this.fb.group({
    pimGateId: 0,
    gate: new FormControl(4),
    vacDate: '',
    vacStatus: '',
    reviseBudgetRevision: '',
    gateDate: '',
    gateStatus: '',
    costEstimate: '',
    receivedOpexBudget: '',
    receivedCapexGate2: '',
    requestCapexGate3: '',
    requestOpex: '',
    additionalOpexBudget: '',
    tieInLongLeadItemsBudget: '',
    overallCapex: '',
    eMocStatus: '',
    executionLookbackStatus: '',
    sapStatus: '',
    benefit: '',
    irr: '',
    simplePayback: '',
    ram: '',
    jFactor: '',
    picMemberCenter: [null],
    picMemberUpStream: [null],
    picMemberDownStream: [null],
    requestPool: false,
    note: '',
    simplefiedProject: false,
    presentationLink: null,
    subPicMomLink: null,
    picMomLink: null,
    vacCheckListLink: null,
    centerStream: new FormArray([]),
    upStream: new FormArray([]),
    downStream: new FormArray([]),
  });

  minMode: BsDatepickerViewMode = 'year';
  bsConfig: Partial<BsDatepickerConfig>;
  bsConfigYear: Partial<BsDatepickerConfig>;

  buStreamList: any[] = [];
  centerStream: string[] = [];
  upStream: string[] = [];
  downStream: string[] = [];
  gateDisable: boolean = false;

  getFormError(field) {
    return (this.formGroup.get('gate4Form').get(field).touched || this.formGroup.get('gate4Form').get(field).dirty) && this.formGroup.get('gate4Form').get(field).invalid;
  }

  ngOnInit() {
    //get  commonData
    this.vacPicService.getBuStream().subscribe((buStream) => {
      if (buStream) {
        this.buStreamList = buStream;
      }
    })
    if (this.formGroup && !this.formGroup.get('gate4Form')) {
      this.formGroup.addControl('gate4Form', this.gate4Form);
    }
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
    this.bsConfigYear = Object.assign({}, { isAnimated: true, dateInputFormat: 'YYYY', minMode: this.minMode });
    this.GetDetailGate();
  }

  GetDetailGate() {
    let vacDate: Date = null;
    let vacStatus: string = null;
    let gateStatus: string = null;


    //Gate PDD
    // this.initiativeService.GetInitiative(this.initiativeService.id).subscribe(res => {
    //   if (res) {
    //     this.detailInformationService.GetDetailInformation(this.initiativeService.id).subscribe(resDetail => {
    //       if (resDetail) {
    //         if(resDetail.projectDocumentDatabase){
    //           const myArr = resDetail.projectDocumentDatabase.split("/");
    //           let presentationGate1 = '';
    //           let vacCheckList = '';

    //           if(res.costEstCapex >= 30) {
    //             presentationGate1 = '/04 Phase IV/03 Presentation (GATE 4)'
    //             vacCheckList = '/04 Phase IV/01 Standard VAC checklist (Budget morethan 30M THB)'
    //           }else {
    //             presentationGate1 = '/04 Phase IV/02 Presentation (GATE 4)'
    //             vacCheckList = '';
    //           }
    //           this.gate4Form.patchValue({
    //             presentationLink : resDetail.projectDocumentDatabase + '?id=/' + myArr[3] + '/' + myArr[4] + '/' + myArr[5] + '/' + myArr[6] + presentationGate1,
    //             subPicMomLink : '',
    //             vacCheckListLink :  vacCheckList == '' ? '' : resDetail.projectDocumentDatabase + '?id=/' + myArr[3] + '/' + myArr[4] + '/' + myArr[5] + '/' + myArr[6] + vacCheckList
    //           });
    //         }
    //       }
    //     });
    //   }
    // })

    this.detailInformationService.GetPimGateConfig(this.initiativeService.id).subscribe((pimGateRes) => {
      this.detailService.GetDetailPimGate(this.initiativeService.id, 4).subscribe(resGate => {
        if (resGate?.pimGateId) {
          vacDate = resGate.vacDate ? new Date(resGate.vacDate) : null;
          vacStatus = resGate.vacStatus != null && resGate.vacStatus != '' ? resGate.vacStatus : null;
          gateStatus = resGate.gateStatus != null && resGate.gateStatus != '' ? resGate.gateStatus : null;

          this.gate4Form.patchValue(resGate);
          this.gate4Form.patchValue({
            vacDate: resGate.vacDate ? new Date(resGate.vacDate) : null,
            gateDate: resGate.gateDate ? new Date(resGate.gateDate) : null,
            executionLookbackStatus: 'Completed'
          });
          this.setStreamFormService(resGate);
        }


        this.vacPicService.GetPicByInitiativeId(this.initiativeService.id).subscribe(res => {
          if (res) {
            this.gate4Form.get('picMemberUpStream').setValue(res.upStream);
            this.gate4Form.get('picMemberCenter').setValue(res.centerStream);
            this.gate4Form.get('picMemberDownStream').setValue(res.downStream);
          }
        });
        this.vacPicService.GetVacByInitiativeId(this.initiativeService.id).subscribe(res => {
          if (res) {
            this.gate4Form.get('vacDate').patchValue(res.meetingDate ? new Date(res.meetingDate) : vacDate);
            // this.gate4Form.get('vacStatus').patchValue(res.statusVac)
          }
        });
        this.vacPicService.GetInitiativeMemberList(this.initiativeService.id).subscribe(initiativeMemberRes => {
          if (initiativeMemberRes) {
            // this.gate1Form.get('vacDate').patchValue(res.meetingDate ? new Date(res.meetingDate) : new Date());
            //GATE0 : VAC GATE1  
            let vacIndex = initiativeMemberRes.findIndex((r) => r.memberType == 'vac' && r.gate.trim() == 'GATE4')
            let picIndex = initiativeMemberRes.findIndex((r) => r.memberType == 'pic' && r.gate.trim() == 'GATE4')
            this.gate4Form.get('vacStatus').patchValue(initiativeMemberRes[vacIndex]?.result != null && initiativeMemberRes[vacIndex]?.result != '' ? initiativeMemberRes[vacIndex].result : vacStatus);
            this.gate4Form.get('gateStatus').patchValue(initiativeMemberRes[picIndex]?.result != null && initiativeMemberRes[picIndex]?.result != '' ? initiativeMemberRes[picIndex].result : gateStatus);
          }
        });

        if (this.initiativeService.viewMode || pimGateRes?.gate4 === "disable") {
          this.gateDisable = true;
          this.gate4Form.disable();
        }
      });
    });
  }


  findUpStream(pic: string) {
    let upStream = this.gate4Form.get('upStream').value as Array<string>;
    return upStream ? upStream.includes(pic) : false;
  }

  findCenterStream(pic: string) {
    let centerStream = this.gate4Form.get('centerStream').value as Array<string>;
    return centerStream ? centerStream.includes(pic) : false;
  }

  findDownStream(pic: string) {
    let downStream = this.gate4Form.get('downStream').value as Array<string>;
    return downStream ? downStream.includes(pic) : false;
  }


  checkLessZero(control: string) {
    let value = this.gate4Form.get(control).value ? parseFloat(this.gate4Form.get(control).value) : 0;
    if (value < 0) {
      this.gate4Form.get(control).setValue(0);
    }
  }

  addPageRevise(id: number) {
    this.emitAddPage.emit({ gateID: id, gateIndex: 4, gateTitle: 'Gate 4' });
  }

  //findCenter(params: string): boolean {
  //  const value: string[] = this.formGroup.get('picMemberCenter').value;
  //  if (value.filter(f => f === params).length > 0) {
  //    return true;
  //  } else {
  //    return false;
  //  }
  //}

  //findUpStream(params: string): boolean {
  //  const value: string[] = this.formGroup.get('picMemberUpStream').value;
  //  if (value.filter(f => f === params).length > 0) {
  //    return true;
  //  } else {
  //    return false;
  //  }
  //}

  //findDownStream(params: string): boolean {
  //  const value: string[] = this.formGroup.get('picMemberDownStream').value;
  //  if (value.filter(f => f === params).length > 0) {
  //    return true;
  //  } else {
  //    return false;
  //  }
  //}

  selectChange($event) {
    if (this.version !== this.versionList[0].id) {
      this.resetVersion();
      this.addPageRevise(this.version);
    }
  }

  async resetVersion() {
    return await setTimeout(async () => {
      this.version = this.versionList[0].id;
    }, 100);
  }

  get viewMode() {
    return this.initiativeService.viewMode;
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
      return;
    }
  }

  onChangeCalculate() {
    const gate4Value = this.gate4Form.getRawValue();
    let overallCapex = isNaN(parseFloat(gate4Value.overallCapex)) ? 0 : parseFloat(gate4Value.overallCapex);
    let requestOpex = isNaN(parseFloat(gate4Value.requestOpex)) ? 0 : parseFloat(gate4Value.requestOpex);
    let costEstimate = overallCapex + requestOpex;
    this.gate4Form.get('costEstimate').patchValue(costEstimate);
  }

  getLink(control: string) {
    return this.gate4Form.get(control).value;
  }

  checkLink(control: string) {
    let link = this.gate4Form.get(control).value
    return link != null && link != "" ? true : false;
  }

  gotoLink(control: string) {
    let link = this.gate4Form.get(control).value
    if (link != null && link != "") {
      window.open(link);
      return;
    }
    return;
  }

  getBuStreamByType(type: string) {
    let stream = this.buStreamList.filter((x) => x.attribute02 == type);
    return stream;
  }

  toggle(params: string, type: string) {
    if (this.initiativeService.viewMode || this.gateDisable) {
      return;
    }
    this.gate4Form.get('upStream').clearValidators();
    this.gate4Form.get('upStream').updateValueAndValidity();
    this.gate4Form.get('centerStream').clearValidators();
    this.gate4Form.get('centerStream').updateValueAndValidity();
    this.gate4Form.get('downStream').clearValidators();
    this.gate4Form.get('downStream').updateValueAndValidity();

    if (params && type) {
      if (type === 'up') {
        if (this.findUpStream(params)) {
          this.upStream = this.upStream.filter(x => x !== params);
        } else {
          this.upStream.push(params);
        }
        this.setStream('upStream');

      } else if (type === 'center') {
        if (this.findCenterStream(params)) {
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
    (this.gate4Form.get(type) as FormArray).clear();
    this[type].forEach((data) => {
      let control = new FormControl(data);
      (this.gate4Form.get(type) as FormArray).push(control);
    });
  }

  setStreamFormService(data: PimGate) {
    if (data.upStream?.length > 0) {
      data.upStream.forEach((dataUp) => {
        let controlUp = new FormControl(dataUp);
        (this.gate4Form.get('upStream') as FormArray).push(controlUp);
      });
      this.upStream = data.upStream;
    }
    if (data.centerStream?.length > 0) {
      data.centerStream.forEach((center) => {
        let controlCenter = new FormControl(center);
        (this.gate4Form.get('centerStream') as FormArray).push(controlCenter);
      });
      this.centerStream = data.centerStream;
    }
    if (data.downStream?.length > 0) {
      data.downStream.forEach((dataDown) => {
        let controlDown = new FormControl(dataDown);
        (this.gate4Form.get('downStream') as FormArray).push(controlDown);
      });
      this.downStream = data.downStream;
    }
  }

  calculatePayback() {
    const gate4Value = this.gate4Form.getRawValue();
    let costEstimate = gate4Value.costEstimate ? parseFloat(gate4Value.costEstimate) : 0;
    let benefit = gate4Value.benefit ? parseFloat(gate4Value.benefit) : 0;
    if (benefit > 0) {
      this.gate4Form.get('simplePayback').setValue((costEstimate / benefit).toFixed(2));
    } else {
      this.gate4Form.get('simplePayback').setValue(null);
    }
  }

  getValidateService() {
    return this.validateService;
  }
}

