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
import { CapexService } from '@services/capex/capex.service';

@Component({
  selector: 'app-pim-gate3',
  templateUrl: './pim-gate3.component.html',
  styleUrls: ['./pim-gate3.component.css']
})
export class PimGate3Component implements OnInit {

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
    private validateService: ValidateService,
    private capexService: CapexService
  ) {
    if (!this.mainTab) {
      /* Call load new formGroup here */
    }
  }

  gate3Form = this.fb.group({
    pimGateId: 0,
    gate: new FormControl(3),
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
    centerStream: new FormArray([]),
    upStream: new FormArray([]),
    downStream: new FormArray([]),
  });

  minMode: BsDatepickerViewMode = 'year';
  bsConfig: Partial<BsDatepickerConfig>;
  bsConfigYear: Partial<BsDatepickerConfig>;
  RequestCapex: boolean;
  RequestOpex: boolean;
  RequestProjectEngineer: boolean;
  receivedOpexBudgetGate2: number;
  tieInLongLeadItemsBudgetGate2: number;
  buStreamList: any[] = [];
  centerStream: string[] = [];
  upStream: string[] = [];
  downStream: string[] = [];
  gateDisable: boolean = false;

  get IsMax() {
    return this.initiativeService.suggestionStatus.max;
  }

  getFormError(field) {
    return (this.formGroup.get('gate3Form').get(field).touched || this.formGroup.get('gate3Form').get(field).dirty) && this.formGroup.get('gate3Form').get(field).invalid;
  }

  ngOnInit() {
    //get  commonData
    this.vacPicService.getBuStream().subscribe((buStream) => {
      if (buStream) {
        this.buStreamList = buStream;
      }
    })

    if (this.formGroup && !this.formGroup.get('gate3Form')) {
      this.formGroup.addControl('gate3Form', this.gate3Form);
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
              let subPicMom = '';

              if (res.costEstCapex >= 30) {
                presentationGate1 = '/03 Phase III/03 Presentation (GATE 3)'
                vacCheckList = '/03 Phase III/01 Standard VAC checklist (Budget morethan 30M THB)'
                subPicMom = '/03 Phase III/08 MOM'
              } else {
                presentationGate1 = '/03 Phase III/02 Presentation (GATE 3)'
                vacCheckList = '';
                subPicMom = '/03 Phase III/07 MOM';
              }
              this.gate3Form.patchValue({
                presentationLink: resDetail.projectDocumentDatabase + '?id=/' + myArr[3] + '/' + myArr[4] + '/' + myArr[5] + '/' + myArr[6] + presentationGate1,
                picMomLink: resDetail.projectDocumentDatabase + '?id=/' + myArr[3] + '/' + myArr[4] + '/' + myArr[5] + '/' + myArr[6] + subPicMom,
                vacCheckListLink: vacCheckList == '' ? '' : resDetail.projectDocumentDatabase + '?id=/' + myArr[3] + '/' + myArr[4] + '/' + myArr[5] + '/' + myArr[6] + vacCheckList
              });
            }
          }

          let delaultGate = Boolean(resDetail?.simProjectSkipGate2) ? 1 : 2;

          this.detailInformationService.GetPimGateConfig(this.initiativeService.id).subscribe((pimGateRes) => {
            this.detailService.GetDetailPimGate(this.initiativeService.id, delaultGate).subscribe(resGate2 => {


              //
              if (delaultGate == 1) {
                const receivedOpexBudget = resGate2?.requestOpex || 0;
                this.receivedOpexBudgetGate2 = parseFloat((receivedOpexBudget).toFixed(2));
              } else {
                const receivedOpexBudget = resGate2?.receivedOpexBudget || 0;
                const additionalOpexBudget = resGate2?.additionalOpexBudget || 0;
                //this.capexService.setGate2Data(resGate2);
                this.receivedOpexBudgetGate2 = parseFloat((receivedOpexBudget + additionalOpexBudget).toFixed(2));
                this.tieInLongLeadItemsBudgetGate2 = resGate2?.tieInLongLeadItemsBudget || 0;
              }
              if (res) {
                res.requestCapex === "true" ? this.RequestCapex = true : this.RequestCapex = false;
                res.requestOpex === "trueOpex" ? this.RequestOpex = true : this.RequestOpex = false;
                this.RequestProjectEngineer = Boolean(res.requestProjectEngineer);
              }

              this.detailService.GetDetailPimGate(this.initiativeService.id, 3).subscribe(resGate => {
                if (resGate?.pimGateId) {
                  vacDate = resGate.vacDate ? new Date(resGate.vacDate) : null;
                  vacStatus = resGate.vacStatus != null && resGate.vacStatus != '' ? resGate.vacStatus : null;
                  gateStatus = resGate.gateStatus != null && resGate.gateStatus != '' ? resGate.gateStatus : null;

                  this.gate3Form.patchValue(resGate);
                  this.gate3Form.patchValue({
                    vacDate: resGate.vacDate ? new Date(resGate.vacDate) : null,
                    gateDate: resGate.gateDate ? new Date(resGate.gateDate) : null,
                    receivedCapexGate2: resGate?.receivedCapexGate2 ? resGate?.receivedCapexGate2 : resGate2?.tieInLongLeadItemsBudget,
                  });
                } else {
                  this.gate3Form.patchValue({
                    receivedOpexBudget: this.receivedOpexBudgetGate2,
                    receivedCapexGate2: resGate2?.tieInLongLeadItemsBudget,
                  });
                  this.onChangeCalculate();
                }

                this.vacPicService.GetVacByInitiativeId(this.initiativeService.id).subscribe(res => {
                  if (res) {
                    this.gate3Form.get('vacDate').patchValue(res.meetingDate ? new Date(res.meetingDate) : vacDate);
                  }
                });
                this.vacPicService.GetInitiativeMemberList(this.initiativeService.id).subscribe(initiativeMemberRes => {
                  if (initiativeMemberRes) {
                    // this.gate1Form.get('vacDate').patchValue(res.meetingDate ? new Date(res.meetingDate) : new Date());
                    //GATE0 : VAC GATE1  
                    let vacIndex = initiativeMemberRes.findIndex((r) => r.memberType == 'vac' && r.gate.trim() == 'GATE3')
                    let picIndex = initiativeMemberRes.findIndex((r) => r.memberType == 'pic' && r.gate.trim() == 'GATE3')
                    this.gate3Form.get('vacStatus').patchValue(initiativeMemberRes[vacIndex]?.result != null && initiativeMemberRes[vacIndex]?.result != '' ? initiativeMemberRes[vacIndex].result : vacStatus);
                    this.gate3Form.get('gateStatus').patchValue(initiativeMemberRes[picIndex]?.result != null && initiativeMemberRes[picIndex]?.result != '' ? initiativeMemberRes[picIndex].result : gateStatus);
                  }
                });
                this.setStreamFormService(resGate);
                if (this.initiativeService.viewMode || pimGateRes?.gate3 === "disable") {
                  this.gateDisable = true;
                  this.gate3Form.disable();
                }

              });
            });
          });
        });
      }
    })
  }

  findUpStream(pic: string) {
    let upStream = this.gate3Form.get('upStream').value as Array<string>;
    return upStream ? upStream.indexOf(pic) >= 0 : false;
  }

  findCenterStream(pic: string) {
    let centerStream = this.gate3Form.get('centerStream').value as Array<string>;
    return centerStream ? centerStream.indexOf(pic) >= 0 : false;
  }

  findDownStream(pic: string) {
    let downStream = this.gate3Form.get('downStream').value as Array<string>;
    return downStream ? downStream.indexOf(pic) >= 0 : false;
  }

  checkLessZero(control: string) {
    let value = this.gate3Form.get(control).value ? parseFloat(this.gate3Form.get(control).value) : 0;
    if (value < 0) {
      this.gate3Form.get(control).setValue(0);
    }
  }

  addPageRevise(id: number) {
    this.emitAddPage.emit({ gateID: id, gateIndex: 3, gateTitle: 'Gate 3' });
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
    const gate3Value = this.gate3Form.getRawValue();
    //11
    let receivedOpexBudget = isNaN(parseFloat(gate3Value.receivedOpexBudget)) ? 0 : parseFloat(gate3Value.receivedOpexBudget);    //5
    let receivedCapexGate2 = isNaN(parseFloat(gate3Value.receivedCapexGate2)) ? 0 : parseFloat(gate3Value.receivedCapexGate2);
    //let requestCapexGate3 = isNaN(parseFloat(gate3Value.requestCapexGate3)) ? 0 : parseFloat(gate3Value.requestCapexGate3);    //9
    //9
    let requestCapexGate3 = isNaN(parseFloat(gate3Value.requestCapexGate3)) ? 0 : parseFloat(gate3Value.requestCapexGate3);
    //8 = 5+9
    let overallCapex = receivedCapexGate2 + requestCapexGate3;
    let costEstimate = receivedOpexBudget + overallCapex;
    if (costEstimate?.toString().length > 0) {
      this.gate3Form.get('costEstimate').patchValue(parseFloat(costEstimate.toFixed(2)));
    }
    if (overallCapex?.toString().length > 0) {
      this.gate3Form.get('overallCapex').patchValue(parseFloat(overallCapex.toFixed(2)));
    }
  }
  getLink(control: string) {
    return this.gate3Form.get(control).value;
  }

  checkLink(control: string) {
    let link = this.gate3Form.get(control).value
    return link != null && link != "" ? true : false;
  }

  gotoLink(control: string) {
    let link = this.gate3Form.get(control).value
    if (link != null && link != "") {
      window.open(link);
      return;
    }
    return;
  }
  calculatePayback() {
    const gate3Value = this.gate3Form.getRawValue();
    let costEstimate = gate3Value.costEstimate ? parseFloat(gate3Value.costEstimate) : 0;
    let benefit = gate3Value.benefit ? parseFloat(gate3Value.benefit) : 0;
    if (benefit > 0) {
      this.gate3Form.get('simplePayback').setValue((costEstimate / benefit).toFixed(2));
    } else {
      this.gate3Form.get('simplePayback').setValue(null);
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
    this.gate3Form.get('upStream').clearValidators();
    this.gate3Form.get('upStream').updateValueAndValidity();
    this.gate3Form.get('centerStream').clearValidators();
    this.gate3Form.get('centerStream').updateValueAndValidity();
    this.gate3Form.get('downStream').clearValidators();
    this.gate3Form.get('downStream').updateValueAndValidity();

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
    (this.gate3Form.get(type) as FormArray).clear();
    this[type].forEach((data) => {
      let control = new FormControl(data);
      (this.gate3Form.get(type) as FormArray).push(control);
    });
  }

  setStreamFormService(data: PimGate) {
    if (data.upStream?.length > 0) {
      data.upStream.forEach((dataUp) => {
        let controlUp = new FormControl(dataUp);
        (this.gate3Form.get('upStream') as FormArray).push(controlUp);
      });
      this.upStream = data.upStream;
    }
    if (data.centerStream?.length > 0) {
      data.centerStream.forEach((center) => {
        let controlCenter = new FormControl(center);
        (this.gate3Form.get('centerStream') as FormArray).push(controlCenter);
      });
      this.centerStream = data.centerStream;
    }
    if (data.downStream?.length > 0) {
      data.downStream.forEach((dataDown) => {
        let controlDown = new FormControl(dataDown);
        (this.gate3Form.get('downStream') as FormArray).push(controlDown);
      });
      this.downStream = data.downStream;
    }
  }

  getValidateService() {
    return this.validateService;
  }
}

