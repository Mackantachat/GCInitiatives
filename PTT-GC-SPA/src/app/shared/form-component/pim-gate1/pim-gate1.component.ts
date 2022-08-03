import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ITabRevise } from '@models/ITabRevise';
import { DetailService } from '../../../core/services/detail/detail.service';
import { InitiativeService } from '../../../core/services/initiative/initiative.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker/public_api';
import { PermissionService } from '@services/permission/permission.service';
import { VacPicService } from '@services/vac-pic/vac-pic.service';
import { DateUtil } from '@utils/date.utils';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { PimGate } from '@models/pimGate';
import { ValidateService } from '@services/validate/validate.service';

@Component({
  selector: 'app-pim-gate1',
  templateUrl: './pim-gate1.component.html',
  styleUrls: ['./pim-gate1.component.css']
})
export class PimGate1Component implements OnInit {

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
    private validateService: ValidateService
  ) {
  }

  gate1Form = this.fb.group({
    pimGateId: 0,
    gate: 1,
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
    presentationLink: null,
    subPicMomLink: null,
    picMomLink: null,
    vacCheckListLink: null,
    note: '',
    centerStream: new FormArray([]),
    upStream: new FormArray([]),
    downStream: new FormArray([]),
    // simplefiedProject: false
  });
  minMode: BsDatepickerViewMode = 'year';
  bsConfig: Partial<BsDatepickerConfig>;
  bsConfigYear: Partial<BsDatepickerConfig>;
  RequestCapex: boolean;
  RequestOpex: boolean;
  RequestProjectEngineer: boolean;
  buStreamList: any[] = [];
  centerStream: string[] = [];
  upStream: string[] = [];
  downStream: string[] = [];
  gateDisable: boolean = false;

  get IsMax() {
    return this.initiativeService.suggestionStatus.max;
  }

  getFormError(field) {
    return (this.formGroup.get('gate1Form').get(field).touched || this.formGroup.get('gate1Form').get(field).dirty) && this.formGroup.get('gate1Form').get(field).invalid;
  }

  ngOnInit() {
    //get  commonData
    this.vacPicService.getBuStream().subscribe((buStream) => {
      if (buStream) {
        this.buStreamList = buStream;
      }
    })
    if (this.formGroup && !this.formGroup.get('gate1Form')) {
      this.formGroup.addControl('gate1Form', this.gate1Form);
    }
    this.bsConfig = Object.assign({}, { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
    this.bsConfigYear = Object.assign({}, { isAnimated: true, dateInputFormat: 'YYYY', minMode: this.minMode });
    this.GetDetailGate();
  }


  GetDetailGate() {
    let vacDate: Date = null;
    let vacStatus: string = null;
    let gateStatus: string = null;
    this.detailInformationService.GetPimGateConfig(this.initiativeService.id).subscribe((pimGateRes) => {
      // if (pimGateRes) {

      // this.gateStatus.gate0 = pimGateRes.gate0 === "true" ? true : false;
      // this.gateStatus.gate1 = pimGateRes.gate1 === "true" ? true : false;
      // this.gateStatus.gate2 = pimGateRes.gate2 === "true" ? true : false;
      // this.gateStatus.gate3 = pimGateRes.gate3 === "true" ? true : false;
      // this.gateStatus.gate4 = pimGateRes.gate4 === "true" ? true : false;
      // }



      this.initiativeService.GetInitiative(this.initiativeService.id).subscribe(res => {
        if (res) {
          res.requestCapex === "true" ? this.RequestCapex = true : this.RequestCapex = false;
          res.requestOpex === "trueOpex" ? this.RequestOpex = true : this.RequestOpex = false;
          this.RequestProjectEngineer = Boolean(res.requestProjectEngineer);

          //Gate PDD
          this.detailInformationService.GetDetailInformation(this.initiativeService.id).subscribe(resDetail => {
            if (resDetail) {
              if (resDetail.projectDocumentDatabase) {
                const myArr = resDetail.projectDocumentDatabase.split("/");
                let presentationGate1 = '';
                let vacCheckList = '';

                if (res.costEstCapex >= 30) {
                  presentationGate1 = '/01 Phase I/03 Presentation (GATE 1)'
                  vacCheckList = '/01 Phase I/01 Standard VAC checklist (Budget morethan 30M THB)'
                } else {
                  presentationGate1 = '/01 Phase I/02 Presentation (GATE 1)'
                  vacCheckList = '';
                }

                this.gate1Form.patchValue({
                  presentationLink: resDetail.projectDocumentDatabase + '?id=/' + myArr[3] + '/' + myArr[4] + '/' + myArr[5] + '/' + myArr[6] + presentationGate1,
                  subPicMomLink: resDetail.projectDocumentDatabase + '?id=/' + myArr[3] + '/' + myArr[4] + '/' + myArr[5] + '/' + myArr[6] + '/01 Phase I/06 MOM Sub-PIC',
                  vacCheckListLink: vacCheckList == '' ? '' : resDetail.projectDocumentDatabase + '?id=/' + myArr[3] + '/' + myArr[4] + '/' + myArr[5] + '/' + myArr[6] + vacCheckList
                });
              }
            }
          });
        }
      })
      this.detailService.GetDetailPimGate(this.initiativeService.id, 1).subscribe(resGate => {
        if (resGate?.pimGateId) {
          vacDate = resGate.vacDate ? new Date(resGate.vacDate) : null;
          vacStatus = resGate.vacStatus != null && resGate.vacStatus != '' ? resGate.vacStatus : null;
          gateStatus = resGate.gateStatus != null && resGate.gateStatus != '' ? resGate.gateStatus : null;

          this.gate1Form.patchValue(resGate);
          this.gate1Form.patchValue({
            vacDate: resGate.vacDate ? new Date(resGate.vacDate) : null,
            gateDate: resGate.gateDate ? new Date(resGate.gateDate) : null
            //,presentationLink : res.initiativeCode
          });
        } else {
          this.onChangeCalculate();
        }

        this.vacPicService.GetVacByInitiativeId(this.initiativeService.id).subscribe(res => {
          if (res) {
            this.gate1Form.get('vacDate').patchValue(res.meetingDate ? new Date(res.meetingDate) : vacDate);
            // this.gate1Form.get('vacStatus').patchValue(res.statusVac)
          }
        });
        this.vacPicService.GetInitiativeMemberList(this.initiativeService.id).subscribe(initiativeMemberRes => {
          if (initiativeMemberRes) {
            // this.gate1Form.get('vacDate').patchValue(res.meetingDate ? new Date(res.meetingDate) : new Date());
            //GATE0 : VAC GATE1  
            let vacIndex = initiativeMemberRes.findIndex((r) => r.memberType == 'vac' && r.gate.trim() == 'GATE1')
            let picIndex = initiativeMemberRes.findIndex((r) => r.memberType == 'pic' && r.gate.trim() == 'GATE1')
            this.gate1Form.get('vacStatus').patchValue(initiativeMemberRes[vacIndex]?.result != null && initiativeMemberRes[vacIndex]?.result != '' ? initiativeMemberRes[vacIndex].result : vacStatus);
            this.gate1Form.get('gateStatus').patchValue(initiativeMemberRes[picIndex]?.result != null && initiativeMemberRes[picIndex]?.result != '' ? initiativeMemberRes[picIndex].result : gateStatus);
            // this.gate1Form.get('costEstimate').patchValue(res[vacIndex].overallCostEst);
            // this.gate1Form.get('requestOpex').patchValue(res[vacIndex].requestOpex);
            // this.gate1Form.get('overallCapex').patchValue(res[vacIndex].requestCapex);
          }
        });

        this.setStreamFormService(resGate);

        if (this.initiativeService.viewMode || pimGateRes?.gate1 === "disable") {
          this.gateDisable = true;
          this.gate1Form.disable();
        }
        //this.onChangeCalculate();
      });
    });

  }
  checkLessZero(control: string) {
    let value = this.gate1Form.get(control).value ? parseFloat(this.gate1Form.get(control).value) : 0;
    if (value < 0) {
      this.gate1Form.get(control).setValue(0);
    }
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
    const gate1Value = this.gate1Form.getRawValue();
    let overallCapex = isNaN(parseFloat(gate1Value.overallCapex)) ? 0 : parseFloat(gate1Value.overallCapex);
    let requestOpex = isNaN(parseFloat(gate1Value.requestOpex)) ? 0 : parseFloat(gate1Value.requestOpex);
    let costEstimate = overallCapex + requestOpex;
    if (costEstimate?.toString().length > 0) {
      this.gate1Form.get('costEstimate').patchValue(parseFloat(costEstimate.toFixed(2)));
    }
  }

  findUpStream(pic: string) {
    let upStream = this.gate1Form.get('upStream').value as Array<string>;
    return upStream ? upStream.indexOf(pic) >= 0 : false;
  }

  findCenterStream(pic: string) {
    let centerStream = this.gate1Form.get('centerStream').value as Array<string>;
    return centerStream ? centerStream.indexOf(pic) >= 0 : false;
  }

  findDownStream(pic: string) {
    let downStream = this.gate1Form.get('downStream').value as Array<string>;
    return downStream ? downStream.indexOf(pic) >= 0 : false;
  }

  addPageRevise(id: number) {
    this.emitAddPage.emit({ gateID: id, gateIndex: 1, gateTitle: 'Gate 1' });
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

  getLink(control: string) {
    return this.gate1Form.get(control).value;
  }

  checkLink(control: string) {
    let link = this.gate1Form.get(control).value
    return link != null && link != "" ? true : false;
  }

  gotoLink(control: string) {
    let link = this.gate1Form.get(control).value
    if (link != null && link != "") {
      window.open(link);
      return;
    }
    return;
  }

  calculatePayback() {
    const gate1Value = this.gate1Form.getRawValue();
    let costEstimate = gate1Value?.costEstimate ? parseFloat(gate1Value.costEstimate) : 0;
    let benefit = gate1Value?.benefit ? parseFloat(gate1Value.benefit) : 0;
    if (benefit > 0) {
      this.gate1Form.get('simplePayback').setValue((costEstimate / benefit).toFixed(2));
    } else {
      this.gate1Form.get('simplePayback').setValue(null);
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

    this.gate1Form.get('upStream').clearValidators();
    this.gate1Form.get('upStream').updateValueAndValidity();
    this.gate1Form.get('downStream').clearValidators();
    this.gate1Form.get('downStream').updateValueAndValidity();

    if (params && type) {
      if (type === 'up') {
        if (this.findUpStream(params)) {
          this.upStream = this.upStream.filter(x => x !== params);
        } else {
          this.upStream.push(params);
        }
        this.setStream('upStream');

        // } else if (type === 'center') {
        //   if (this.findCenter(params)) {
        //     this.centerStream = this.centerStream.filter(x => x !== params);
        //   } else {
        //     this.centerStream.push(params);
        //   }
        //   this.setStream('centerStream');

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
    (this.gate1Form.get(type) as FormArray).clear();
    this[type].forEach((data) => {
      let control = new FormControl(data);
      (this.gate1Form.get(type) as FormArray).push(control);
    });
  }

  setStreamFormService(data: PimGate) {
    if (data.upStream?.length > 0) {
      data.upStream.forEach((dataUp) => {
        let controlUp = new FormControl(dataUp);
        (this.gate1Form.get('upStream') as FormArray).push(controlUp);
      });
      this.upStream = data.upStream;
    }
    if (data.centerStream?.length > 0) {
      data.centerStream.forEach((center) => {
        let controlCenter = new FormControl(center);
        (this.gate1Form.get('centerStream') as FormArray).push(controlCenter);
      });
      this.centerStream = data.centerStream;
    }
    if (data.downStream?.length > 0) {
      data.downStream.forEach((dataDown) => {
        let controlDown = new FormControl(dataDown);
        (this.gate1Form.get('downStream') as FormArray).push(controlDown);
      });
      this.downStream = data.downStream;
    }
  }

  getValidateService() {
    return this.validateService;
  }
}

