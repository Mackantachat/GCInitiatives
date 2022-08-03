import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingModel } from '@models/settingModel';
import { SettingServiceService } from '@services/settingService/setting-service.service';
import { SwalTool } from '@tools/swal.tools';
import { DateUtil } from '@utils/date.utils';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-setting-component',
  templateUrl: './setting-component.component.html',
  styleUrls: ['./setting-component.component.css']
})
export class SettingComponentComponent implements OnInit {

  settingForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  today = new Date();
  setting: SettingModel = {
    // initiativeCodeFormat: null,
    settingId: 0,
    periodForKeeping: null,
    isAvailablePeriodAnnual: null,
    startPeriodAnnual: null,
    finishPeriodAnnual: null,
    isAvailablePeriodMid: true,
    startPeriodMid: null,
    finishPeriodMid: null,
    isAvailableBudgetPool: false,
    startPeriodBudgetPool: null,
    finishPeriodBudgetPool: null,
    isActiveITBudgetSurvey: false,
    startPeriodIT: null,
    finishPeriodIT: null,
    iL4TrackingPeriod: null,
    oneTimeBenefit: null
  };
  choices = [
    { id: 1, value: true, display: 'Active' }, { id: 2, value: false, display: 'In - Active' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private settingServics: SettingServiceService,
    private dateUtil: DateUtil,
    private swaltool: SwalTool
  ) {
    this.settingForm = this.formBuilder.group({
      SettingId: 0,
      AuditPeriod: [this.setting.periodForKeeping, Validators.required],
      AnnualPeriod: [false, Validators.required],
      AnnualFrom: [this.setting.startPeriodAnnual, Validators.required],
      AnnualTo: [this.setting.finishPeriodAnnual, Validators.required],
      MidPeriod: [false, Validators.required],
      MidFrom: [this.setting.startPeriodMid, Validators.required],
      MidTo: [this.setting.finishPeriodMid, Validators.required],
      RequestBudgetPool: [false, Validators.required],
      RequestFrom: [this.setting.startPeriodIT, Validators.required],
      RequestTo: [this.setting.finishPeriodIT, Validators.required],
      BudgetSurvey: [false, Validators.required],
      BudgetFrom: [this.setting.startPeriodBudgetPool, Validators.required],
      BudgetTo: [this.setting.finishPeriodBudgetPool, Validators.required],
      TrackingPeriod: [this.setting.iL4TrackingPeriod, Validators.required],
      OneTimeBenefit: [this.setting.oneTimeBenefit, Validators.required]
    });
    this.bsConfig = Object.assign({}, {
      // dateInputFormat: 'DD/MM',
      dateInputFormat: 'DD/MM/YYYY',
    });
  }

  ngOnInit(): void {
    this.GetInitiativeSetting();
  }

  onClickSave() {
    this.SetSetting();
  }

  checkNumber = (): void => {
    if (this.settingForm.get('OneTimeBenefit').value > 100) {
      this.settingForm.get('OneTimeBenefit').setValue(0);
    }
  }

  GetSetting = (): void => {
    this.settingServics.GetSetting().then((r) => {
      if (r) {
        this.setting = r[0] as SettingModel;
        this.settingForm.get('SettingId').setValue(this.setting.settingId ? this.setting.settingId : 0);
        this.settingForm.get('AuditPeriod').setValue(this.setting.periodForKeeping);
        this.settingForm.get('AnnualPeriod').setValue(this.setting.isAvailablePeriodAnnual ? this.dateUtil.convertDateUTC(this.setting.isAvailablePeriodAnnual) : null);
        this.settingForm.get('AnnualFrom').setValue(this.setting.startPeriodAnnual ? this.dateUtil.convertDateUTC(this.setting.startPeriodAnnual) : null);
        this.settingForm.get('AnnualTo').setValue(this.setting.finishPeriodAnnual ? this.dateUtil.convertDateUTC(this.setting.finishPeriodAnnual) : null);
        this.settingForm.get('MidPeriod').setValue(this.setting.isAvailablePeriodMid ? this.setting.isAvailablePeriodMid : false);
        this.settingForm.get('MidFrom').setValue(this.setting.startPeriodMid ? this.dateUtil.convertDateUTC(this.setting.startPeriodMid) : null);
        this.settingForm.get('MidTo').setValue(this.setting.finishPeriodMid ? this.dateUtil.convertDateUTC(this.setting.finishPeriodMid) : null);
        this.settingForm.get('RequestBudgetPool').setValue(this.setting.isAvailableBudgetPool ? this.setting.isAvailableBudgetPool : false);
        this.settingForm.get('RequestFrom').setValue(this.setting.startPeriodBudgetPool ? this.dateUtil.convertDateUTC(this.setting.startPeriodBudgetPool) : null);
        this.settingForm.get('RequestTo').setValue(this.setting.finishPeriodBudgetPool ? this.dateUtil.convertDateUTC(this.setting.finishPeriodBudgetPool) : null);
        this.settingForm.get('BudgetSurvey').setValue(this.setting.isActiveITBudgetSurvey ? this.setting.isActiveITBudgetSurvey : false);
        this.settingForm.get('BudgetFrom').setValue(this.setting.startPeriodIT ? this.dateUtil.convertDateUTC(this.setting.startPeriodIT) : null);
        this.settingForm.get('BudgetTo').setValue(this.setting.finishPeriodIT ? this.dateUtil.convertDateUTC(this.setting.finishPeriodIT) : null);
        this.settingForm.get('TrackingPeriod').setValue(this.setting.iL4TrackingPeriod);
        this.settingForm.get('OneTimeBenefit').setValue(this.setting.oneTimeBenefit);

      }
    }).catch(e => e);
  }

  GetInitiativeSetting() {
    this.settingServics.GetInitiativeSetting().then((res) => {
      if (res) {
        this.settingForm.get('SettingId').setValue(res.settingId ? res.settingId : 0);
        this.settingForm.get('AuditPeriod').setValue(res.periodForKeeping);
        this.settingForm.get('AnnualPeriod').setValue(res.isAvailablePeriodAnnual ? res.isAvailablePeriodAnnual : false);
        this.settingForm.get('AnnualFrom').setValue(res.startPeriodAnnual ? this.dateUtil.convertDateUTC(res.startPeriodAnnual) : null);
        this.settingForm.get('AnnualTo').setValue(res.finishPeriodAnnual ? this.dateUtil.convertDateUTC(res.finishPeriodAnnual) : null);
        this.settingForm.get('MidPeriod').setValue(res.isAvailablePeriodMid ? res.isAvailablePeriodMid : false);
        this.settingForm.get('MidFrom').setValue(res.startPeriodMid ? this.dateUtil.convertDateUTC(res.startPeriodMid) : null);
        this.settingForm.get('MidTo').setValue(res.finishPeriodMid ? this.dateUtil.convertDateUTC(res.finishPeriodMid) : null);
        this.settingForm.get('RequestBudgetPool').setValue(res.isAvailableBudgetPool ? res.isAvailableBudgetPool : false);
        this.settingForm.get('RequestFrom').setValue(res.startPeriodBudgetPool ? this.dateUtil.convertDateUTC(res.startPeriodBudgetPool) : null);
        this.settingForm.get('RequestTo').setValue(res.finishPeriodBudgetPool ? this.dateUtil.convertDateUTC(res.finishPeriodBudgetPool) : null);
        this.settingForm.get('BudgetSurvey').setValue(res.isActiveITBudgetSurvey ? res.isActiveITBudgetSurvey : false);
        this.settingForm.get('BudgetFrom').setValue(res.startPeriodIT ? this.dateUtil.convertDateUTC(res.startPeriodIT) : null);
        this.settingForm.get('BudgetTo').setValue(res.finishPeriodIT ? this.dateUtil.convertDateUTC(res.finishPeriodIT) : null);
        this.settingForm.get('TrackingPeriod').setValue(res.iL4TrackingPeriod);
        this.settingForm.get('OneTimeBenefit').setValue(res.oneTimeBenefit);
      }
    });
  }

  SetSetting = (): void => {

    this.settingServics.SetSetting({
      settingId: this.settingForm.get('SettingId').value,
      periodForKeeping: this.settingForm.get('AuditPeriod').value,
      isAvailablePeriodAnnual: this.settingForm.get('AnnualPeriod').value,
      startPeriodAnnual: this.settingForm.get('AnnualFrom').value,
      finishPeriodAnnual: this.settingForm.get('AnnualTo').value,
      isAvailablePeriodMid: this.settingForm.get('MidPeriod').value,
      startPeriodMid: this.settingForm.get('MidFrom').value,
      finishPeriodMid: this.settingForm.get('MidTo').value,
      isAvailableBudgetPool: this.settingForm.get('RequestBudgetPool').value,
      startPeriodBudgetPool: this.settingForm.get('RequestFrom').value,
      finishPeriodBudgetPool: this.settingForm.get('RequestTo').value,
      isActiveITBudgetSurvey: this.settingForm.get('BudgetSurvey').value,
      startPeriodIT: this.settingForm.get('BudgetFrom').value,
      finishPeriodIT: this.settingForm.get('BudgetTo').value,
      iL4TrackingPeriod: this.settingForm.get('TrackingPeriod').value,
      oneTimeBenefit: this.settingForm.get('OneTimeBenefit').value
    }).then(r => {
      this.swaltool.Success();
    }).catch(e => e);
  }
}
