import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ITabRevise } from '@models/ITabRevise';
import { PimGate } from '@models/pimGate';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { PermissionService } from '@services/permission/permission.service';
import { VacPicService } from '@services/vac-pic/vac-pic.service';
import { ValidateService } from '@services/validate/validate.service';
import { DateUtil } from '@utils/date.utils';
import { BsDatepickerViewMode, BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { DetailService } from '../../../core/services/detail/detail.service';
import { InitiativeService } from '../../../core/services/initiative/initiative.service';

@Component({
  selector: 'app-pim-gate2',
  templateUrl: './pim-gate2.component.html',
  styleUrls: ['./pim-gate2.component.css']
})
export class PimGate2Component implements OnInit {

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
  get IsCim() {
    return this.initiativeService.suggestionStatus.cim;
  }
  gate2Form = this.fb.group({
    pimGateId: 0,
    gate: new FormControl(2),
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
    projectCharterLink: null,
    requestPoolStatus: null,
    centerStream: new FormArray([]),
    upStream: new FormArray([]),
    downStream: new FormArray([])
  })
  minMode: BsDatepickerViewMode = 'year';
  bsConfig: Partial<BsDatepickerConfig>;
  bsConfigYear: Partial<BsDatepickerConfig>;
  buStreamList: any[] = [];
  centerStream: string[] = [];
  upStream: string[] = [];
  downStream: string[] = [];
  gateDisable: boolean = false;

  getFormError(field) {
    return (this.formGroup.get('gate2Form').get(field).touched || this.formGroup.get('gate2Form').get(field).dirty) && this.formGroup.get('gate2Form').get(field).invalid;
  }

  ngOnInit() {
    //get  commonData
    this.vacPicService.getBuStream().subscribe((buStream) => {
      if (buStream) {
        this.buStreamList = buStream;
      }
    })
    if (this.formGroup && !this.formGroup.get('gate2Form')) {
      this.formGroup.addControl('gate2Form', this.gate2Form);
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
    this.initiativeService.GetInitiative(this.initiativeService.id).subscribe(res => {
      if (res) {
        this.detailInformationService.GetDetailInformation(this.initiativeService.id).subscribe(resDetail => {
          if (resDetail) {
            if (resDetail.projectDocumentDatabase) {
              const myArr = resDetail.projectDocumentDatabase.split("/");
              let presentationGate1 = '';
              let vacCheckList = '';

              if (res.costEstCapex >= 30) {
                presentationGate1 = '/02 Phase II/03 Presentation (GATE 2)'
                vacCheckList = '/02 Phase II/01 Standard VAC checklist (Budget morethan 30M THB)'
              } else {
                presentationGate1 = '/02 Phase II/02 Presentation (GATE 2)'
                vacCheckList = '';
              }
              this.gate2Form.patchValue({
                presentationLink: resDetail.projectDocumentDatabase + '?id=/' + myArr[3] + '/' + myArr[4] + '/' + myArr[5] + '/' + myArr[6] + presentationGate1,
                subPicMomLink: '',
                vacCheckListLink: vacCheckList == '' ? '' : resDetail.projectDocumentDatabase + '?id=/' + myArr[3] + '/' + myArr[4] + '/' + myArr[5] + '/' + myArr[6] + vacCheckList
              });
            }
          }
        });
      }
    })


    this.detailInformationService.GetPimGateConfig(this.initiativeService.id).subscribe((pimGateRes) => {
      this.detailService.GetDetailPimGate(this.initiativeService.id, 1).subscribe(resGate1 => {
        this.detailService.GetDetailPimGate(this.initiativeService.id, 2).subscribe(resGate => {
          if (resGate?.pimGateId) {
            vacDate = resGate.vacDate ? new Date(resGate.vacDate) : null;
            vacStatus = resGate.vacStatus != null && resGate.vacStatus != '' ? resGate.vacStatus : null;
            gateStatus = resGate.gateStatus != null && resGate.gateStatus != '' ? resGate.gateStatus : null;
            this.gate2Form.patchValue(resGate);
            this.gate2Form.patchValue({
              vacDate: resGate.vacDate ? new Date(resGate.vacDate) : null,
              gateDate: resGate.gateDate ? new Date(resGate.gateDate) : null,
              receivedOpexBudget: resGate?.receivedOpexBudget ? resGate.receivedOpexBudget : resGate1.requestOpex
            });

            this.vacPicService.GetVacByInitiativeId(this.initiativeService.id).subscribe(res => {
              if (res) {
                this.gate2Form.get('vacDate').patchValue(res.meetingDate ? new Date(res.meetingDate) : vacDate);
                // this.gate2Form.get('vacStatus').patchValue(res.statusVac)
              }
            });
            this.vacPicService.GetReferenceIniPoolPimById(this.initiativeService.id).then(res => {
              if (res) {
                this.gate2Form.get('requestPoolStatus').patchValue(res.initiativeId ? "Pass" : null);
                // this.gate2Form.get('vacStatus').patchValue(res.statusVac)
              }
            });
            this.vacPicService.GetInitiativeMemberList(this.initiativeService.id).subscribe(initiativeMemberRes => {
              if (initiativeMemberRes) {
                // this.gate1Form.get('vacDate').patchValue(res.meetingDate ? new Date(res.meetingDate) : new Date());
                //GATE0 : VAC GATE1  
                let vacIndex = initiativeMemberRes.findIndex((r) => r.memberType == 'vac' && r.gate.trim() == 'GATE2')
                let picIndex = initiativeMemberRes.findIndex((r) => r.memberType == 'pic' && r.gate.trim() == 'GATE2')
                this.gate2Form.get('vacStatus').patchValue(initiativeMemberRes[vacIndex]?.result != null && initiativeMemberRes[vacIndex]?.result != '' ? initiativeMemberRes[vacIndex].result : vacStatus);
                this.gate2Form.get('gateStatus').patchValue(initiativeMemberRes[picIndex]?.result != null && initiativeMemberRes[picIndex]?.result != '' ? initiativeMemberRes[picIndex].result : gateStatus);
              }
            });
            this.setStreamFormService(resGate);
          } else {
            this.gate2Form.patchValue({
              receivedOpexBudget: resGate1.requestOpex
            });
            this.onChangeCalculate();
          }
          if (this.initiativeService.viewMode || pimGateRes?.gate2 === "disable") {
            this.gateDisable = true;
            this.gate2Form.disable();
          }
        });
      });
    });
  }

  findUpStream(pic: string) {
    let upStream = this.gate2Form.get('upStream').value as Array<string>;
    return upStream ? upStream.indexOf(pic) >= 0 : false;
  }

  findCenterStream(pic: string) {
    let centerStream = this.gate2Form.get('centerStream').value as Array<string>;
    return centerStream ? centerStream.indexOf(pic) >= 0 : false;
  }

  findDownStream(pic: string) {
    let downStream = this.gate2Form.get('downStream').value as Array<string>;
    return downStream ? downStream.indexOf(pic) >= 0 : false;
  }

  checkLessZero(control: string) {
    let value = this.gate2Form.get(control).value ? parseFloat(this.gate2Form.get(control).value) : 0;
    if (value < 0) {
      this.gate2Form.get(control).setValue(0);
    }
  }

  addPageRevise(id: number) {
    this.emitAddPage.emit({ gateID: id, gateIndex: 2, gateTitle: 'Gate 2' });
  }


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
    const gate2Value = this.gate2Form.getRawValue();
    let receivedOpexBudget = isNaN(parseFloat(gate2Value.receivedOpexBudget)) ? 0 : parseFloat(gate2Value.receivedOpexBudget);
    let additionalOpexBudget = isNaN(parseFloat(gate2Value.additionalOpexBudget)) ? 0 : parseFloat(gate2Value.additionalOpexBudget);
    let overallCapex = isNaN(parseFloat(gate2Value.overallCapex)) ? 0 : parseFloat(gate2Value.overallCapex);
    //let tieInLongLeadItemsBudget = isNaN(parseFloat(gate2Value.tieInLongLeadItemsBudget) ? 0 : parseFloat(this.gate2Form.get('tieInLongLeadItemsBudget').value);
    let costEstimate = receivedOpexBudget + additionalOpexBudget + overallCapex;
    if (costEstimate?.toString().length > 0) {
      this.gate2Form.get('costEstimate').patchValue(parseFloat(costEstimate.toFixed(2)));
    }
  }

  getLink(control: string) {
    return this.gate2Form.get(control).value;
  }

  checkLink(control: string) {
    let link = this.gate2Form.get(control).value
    return link != null && link != "" ? true : false;
  }

  gotoLink(control: string) {
    let link = this.gate2Form.get(control).value
    if (link != null && link != "") {
      window.open(link);
      return;
    }
    return;
  }

  calculatePayback() {
    const gate2Value = this.gate2Form.getRawValue();
    let costEstimate = gate2Value?.costEstimate ? parseFloat(gate2Value.costEstimate) : 0;
    let benefit = gate2Value?.benefit ? parseFloat(gate2Value.benefit) : 0;
    if (benefit > 0) {
      this.gate2Form.get('simplePayback').setValue((costEstimate / benefit).toFixed(2));
    } else {
      this.gate2Form.get('simplePayback').setValue(null);
    }
  }

  getBuStreamByType(type: string) {
    let stream = this.buStreamList.filter((x) => x.attribute02 == type);
    return stream;
  }

  toggle(params: string, type: string) {
    if (this.initiativeService.viewMode || this.gateDisable) {
      return;
    }

    this.gate2Form.get('upStream').clearValidators();
    this.gate2Form.get('upStream').updateValueAndValidity();
    this.gate2Form.get('centerStream').clearValidators();
    this.gate2Form.get('centerStream').updateValueAndValidity();
    this.gate2Form.get('downStream').clearValidators();
    this.gate2Form.get('downStream').updateValueAndValidity();


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
    (this.gate2Form.get(type) as FormArray).clear();
    this[type].forEach((data) => {
      let control = new FormControl(data);
      (this.gate2Form.get(type) as FormArray).push(control);
    });
  }

  setStreamFormService(data: PimGate) {
    if (data.upStream?.length > 0) {
      data.upStream.forEach((dataUp) => {
        let controlUp = new FormControl(dataUp);
        (this.gate2Form.get('upStream') as FormArray).push(controlUp);
      });
      this.upStream = data.upStream;
    }
    if (data.centerStream?.length > 0) {
      data.centerStream.forEach((center) => {
        let controlCenter = new FormControl(center);
        (this.gate2Form.get('centerStream') as FormArray).push(controlCenter);
      });
      this.centerStream = data.centerStream;
    }
    if (data.downStream?.length > 0) {
      data.downStream.forEach((dataDown) => {
        let controlDown = new FormControl(dataDown);
        (this.gate2Form.get('downStream') as FormArray).push(controlDown);
      });
      this.downStream = data.downStream;
    }
  }
  getValidateService() {
    return this.validateService;
  }
}

