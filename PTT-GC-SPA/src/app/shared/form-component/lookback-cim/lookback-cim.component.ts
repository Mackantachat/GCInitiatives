import { Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-lookback-cim',
  templateUrl: './lookback-cim.component.html',
  styleUrls: ['./lookback-cim.component.css']
})
export class LookbackCimComponent implements OnInit, OnChanges {
  @Output() lookbackCIMOutput: EventEmitter<any> = new EventEmitter<any>();
  @Input() public CimLookbackInput: any;
  @Input() lookbackForm: FormGroup;
  modalRef: BsModalRef;
  MCEndorse = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  BusinessPlanStart = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  BusinessPlanEnd = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  today = new Date();
  dataProjectBackground = [];

  dataProjectCost = [];

  dataSchedule = [];

  dataKeyAssumption = [];

  dataEconomicReturn = [];


  projectForm: FormGroup;
  projectCostForm: FormGroup;
  ScheduleForm: FormGroup;
  KeyAssumptionForm: FormGroup;
  EconomicReturnForm: FormGroup;
  cimForm: FormGroup;

  SetProjectBackground(item) {
    this.projectForm.get('Aspect').setValue(item.Aspect);
    this.projectForm.get('Approve').setValue(item.Approve);
    this.projectForm.get('Actual').setValue(item.Actual);
    this.projectForm.get('DifferenceNote').setValue(item.DifferenceNote);
    this.projectForm.get('BusinessPlan').setValue(item.BusinessPlan);
    this.projectForm.get('ResponsiblePerson').setValue(item.ResponsiblePerson);
  }

  SetProjectCost(item) {
    this.projectCostForm.get('Aspect').setValue(item.Aspect);
    this.projectCostForm.get('Approve').setValue(item.Approve);
    this.projectCostForm.get('Actual').setValue(item.Actual);
    this.projectCostForm.get('DifferenceNote').setValue(item.DifferenceNote);
    this.projectCostForm.get('BusinessPlan').setValue(item.BusinessPlan);
    this.projectCostForm.get('ResponsiblePerson').setValue(item.ResponsiblePerson);
  }

  SetSchedule(item) {
    this.ScheduleForm.get('Aspect').setValue(item.Aspect);
    this.ScheduleForm.get('Approve').setValue(item.Approve);
    this.ScheduleForm.get('Actual').setValue(item.Actual);
    this.ScheduleForm.get('DifferenceNote').setValue(item.DifferenceNote);
    this.ScheduleForm.get('BusinessPlan').setValue(item.BusinessPlan);
    this.ScheduleForm.get('ResponsiblePerson').setValue(item.ResponsiblePerson);
  }

  SetKeyAssumption(item) {
    this.KeyAssumptionForm.get('Aspect').setValue(item.Aspect);
    this.KeyAssumptionForm.get('Approve').setValue(item.Approve);
    this.KeyAssumptionForm.get('Actual').setValue(item.Actual);
    this.KeyAssumptionForm.get('DifferenceNote').setValue(item.DifferenceNote);
    this.KeyAssumptionForm.get('BusinessPlan').setValue(item.BusinessPlan);
    this.KeyAssumptionForm.get('ResponsiblePerson').setValue(item.ResponsiblePerson);
  }

  SetEconomicReturn(item) {
    this.EconomicReturnForm.get('Aspect').setValue(item.Aspect);
    this.EconomicReturnForm.get('Approve').setValue(item.Approve);
    this.EconomicReturnForm.get('Actual').setValue(item.Actual);
    this.EconomicReturnForm.get('DifferenceNote').setValue(item.DifferenceNote);
    this.EconomicReturnForm.get('BusinessPlan').setValue(item.BusinessPlan);
    this.EconomicReturnForm.get('ResponsiblePerson').setValue(item.ResponsiblePerson);
  }

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private initiativeService: InitiativeService
  ) {
    this.projectForm = this.formBuilder.group({
      Aspect: [null, Validators.required],
      Approve: [null, Validators.required],
      Actual: [null, Validators.required],
      DifferenceNote: [null, Validators.required],
      BusinessPlan: [null, Validators.required],
      ResponsiblePerson: [null, Validators.required],
    });
    this.projectCostForm = this.formBuilder.group({
      Aspect: [null, Validators.required],
      Approve: [null, Validators.required],
      Actual: [null, Validators.required],
      DifferenceNote: [null, Validators.required],
      BusinessPlan: [null, Validators.required],
      ResponsiblePerson: [null, Validators.required],
    });
    this.ScheduleForm = this.formBuilder.group({
      Aspect: [null, Validators.required],
      Approve: [null, Validators.required],
      Actual: [null, Validators.required],
      DifferenceNote: [null, Validators.required],
      BusinessPlan: [null, Validators.required],
      ResponsiblePerson: [null, Validators.required],
    });
    this.KeyAssumptionForm = this.formBuilder.group({
      Aspect: [null, Validators.required],
      Approve: [null, Validators.required],
      Actual: [null, Validators.required],
      DifferenceNote: [null, Validators.required],
      BusinessPlan: [null, Validators.required],
      ResponsiblePerson: [null, Validators.required],
    });
    this.EconomicReturnForm = this.formBuilder.group({
      Aspect: [null, Validators.required],
      Approve: [null, Validators.required],
      Actual: [null, Validators.required],
      DifferenceNote: [null, Validators.required],
      BusinessPlan: [null, Validators.required],
      ResponsiblePerson: [null, Validators.required],
    });
    this.cimForm = this.formBuilder.group({
      McEndorseDate: [null, Validators.required],
      BusinessPlanAsOfDate: [null, Validators.required],
      BusinessPlanAsOfDate2: [null, Validators.required],
      dataProjectBackground: [this.dataProjectBackground],
      dataProjectCost: [this.dataProjectCost],
      dataSchedule: [this.dataSchedule],
      dataKeyAssumption: [this.dataKeyAssumption],
      dataEconomicReturn: [this.dataEconomicReturn]
    });
  }

  ngOnInit(): void {
    this.onChanges();
    this.init();
    this.lookbackCIMOutput.emit(this.cimForm.value);
    // if (!this.lookbackForm.get('CimLookbackId')) {
    // let formData = this.cimForm.value;
    // let CimLookbackId = [...formData.dataEconomicReturn, ...formData.dataKeyAssumption, ...formData.dataProjectBackground, ...formData.dataProjectCost, ...formData.dataSchedule];
    // this.lookbackForm.get('CimLookbackId').setValue(CimLookbackId);
    // }
  }
  init() {
    if (this.CimLookbackInput && this.CimLookbackInput.CimLookbackId.length > 0) {
      for (var i = 0; i < this.CimLookbackInput.CimLookbackId.length; i++) {
        if (this.CimLookbackInput.CimLookbackId[i].CimLookbackType === "EconomicReturn") {
          this.dataEconomicReturn.push({
            CimLookbackId: this.CimLookbackInput.CimLookbackId[i].CimLookbackId,
            ProjectLookbackId: this.CimLookbackInput.CimLookbackId[i].ProjectLookbackId,
            CimLookbackType: "EconomicReturn",
            Aspect: this.CimLookbackInput.CimLookbackId[i].Aspect,
            Approve: this.CimLookbackInput.CimLookbackId[i].Approve,
            Actual: this.CimLookbackInput.CimLookbackId[i].Actual,
            DifferenceNote: this.CimLookbackInput.CimLookbackId[i].DifferenceNote,
            BusinessPlan: this.CimLookbackInput.CimLookbackId[i].BusinessPlan,
            ResponsiblePerson: this.CimLookbackInput.CimLookbackId[i].ResponsiblePerson
          });
        }
        if (this.CimLookbackInput.CimLookbackId[i].CimLookbackType === "KeyAssumption") {
          this.dataKeyAssumption.push({
            CimLookbackId: this.CimLookbackInput.CimLookbackId[i].CimLookbackId,
            ProjectLookbackId: this.CimLookbackInput.CimLookbackId[i].ProjectLookbackId,
            CimLookbackType: "KeyAssumption",
            Aspect: this.CimLookbackInput.CimLookbackId[i].Aspect,
            Approve: this.CimLookbackInput.CimLookbackId[i].Approve,
            Actual: this.CimLookbackInput.CimLookbackId[i].Actual,
            DifferenceNote: this.CimLookbackInput.CimLookbackId[i].DifferenceNote,
            BusinessPlan: this.CimLookbackInput.CimLookbackId[i].BusinessPlan,
            ResponsiblePerson: this.CimLookbackInput.CimLookbackId[i].ResponsiblePerson
          });
        }
        if (this.CimLookbackInput.CimLookbackId[i].CimLookbackType === "Background") {
          this.dataProjectBackground.push({
            CimLookbackId: this.CimLookbackInput.CimLookbackId[i].CimLookbackId,
            ProjectLookbackId: this.CimLookbackInput.CimLookbackId[i].ProjectLookbackId,
            CimLookbackType: "Background",
            Aspect: this.CimLookbackInput.CimLookbackId[i].Aspect,
            Approve: this.CimLookbackInput.CimLookbackId[i].Approve,
            Actual: this.CimLookbackInput.CimLookbackId[i].Actual,
            DifferenceNote: this.CimLookbackInput.CimLookbackId[i].DifferenceNote,
            BusinessPlan: this.CimLookbackInput.CimLookbackId[i].BusinessPlan,
            ResponsiblePerson: this.CimLookbackInput.CimLookbackId[i].ResponsiblePerson
          });
        }
        if (this.CimLookbackInput.CimLookbackId[i].CimLookbackType === "ProjectCost") {
          this.dataProjectCost.push({
            CimLookbackId: this.CimLookbackInput.CimLookbackId[i].CimLookbackId,
            ProjectLookbackId: this.CimLookbackInput.CimLookbackId[i].ProjectLookbackId,
            CimLookbackType: "ProjectCost",
            Aspect: this.CimLookbackInput.CimLookbackId[i].Aspect,
            Approve: this.CimLookbackInput.CimLookbackId[i].Approve,
            Actual: this.CimLookbackInput.CimLookbackId[i].Actual,
            DifferenceNote: this.CimLookbackInput.CimLookbackId[i].DifferenceNote,
            BusinessPlan: this.CimLookbackInput.CimLookbackId[i].BusinessPlan,
            ResponsiblePerson: this.CimLookbackInput.CimLookbackId[i].ResponsiblePerson
          });
        }
        if (this.CimLookbackInput.CimLookbackId[i].CimLookbackType === "Schedule") {
          this.dataSchedule.push({
            CimLookbackId: this.CimLookbackInput.CimLookbackId[i].CimLookbackId,
            ProjectLookbackId: this.CimLookbackInput.CimLookbackId[i].ProjectLookbackId,
            CimLookbackType: "Schedule",
            Aspect: this.CimLookbackInput.CimLookbackId[i].Aspect,
            Approve: this.CimLookbackInput.CimLookbackId[i].Approve,
            Actual: this.CimLookbackInput.CimLookbackId[i].Actual,
            DifferenceNote: this.CimLookbackInput.CimLookbackId[i].DifferenceNote,
            BusinessPlan: this.CimLookbackInput.CimLookbackId[i].BusinessPlan,
            ResponsiblePerson: this.CimLookbackInput.CimLookbackId[i].ResponsiblePerson
          });
        }
      }
    }
    else {
      this.add_row_EconomicReturn();
      this.add_row_KeyAssumption();
      this.add_row_ProjectBackground();
      this.add_row_ProjectCost();
      this.add_row_Schedule();
    }

    if (this.initiativeService.viewMode) {
      this.projectForm.disable();
      this.projectCostForm.disable();
      this.ScheduleForm.disable();
      this.KeyAssumptionForm.disable();
      this.EconomicReturnForm.disable();
      this.cimForm.disable();
    }
  }
  ngOnChanges() {
    if (this.CimLookbackInput) {
      const el = this.CimLookbackInput;
      this.cimForm.get('McEndorseDate').setValue(el.McEndorseDate ? new Date(el.McEndorseDate) : null);
      this.cimForm.get('BusinessPlanAsOfDate').setValue(el.BusinessPlanAsOfDate ? new Date(el.BusinessPlanAsOfDate) : null);
      this.cimForm.get('BusinessPlanAsOfDate2').setValue(el.BusinessPlanAsOfDate2 ? new Date(el.BusinessPlanAsOfDate2) : null);
    }
  }

  onChanges(): void {
    this.cimForm.valueChanges.subscribe(val => {
      this.lookbackCIMOutput.emit(this.cimForm.value);
    });
  }


  // ============> dataProjectBackground <============ //
  edit_projectBackground(item, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
    this.SetProjectBackground(item);
  }

  add_row_ProjectBackground() {
    this.dataProjectBackground.push({ CimLookbackId: 0, ProjectLookbackId: null, CimLookbackType: "Background", Aspect: null, Approve: null, Actual: null, DifferenceNote: null, BusinessPlan: null, ResponsiblePerson: null }
    );
    this.cimForm.get('dataProjectBackground').setValue(this.dataProjectBackground);

  }

  deleteProjectBackground(index) {
    this.dataProjectBackground.splice(index, 1);
    this.cimForm.get('dataProjectBackground').setValue(this.dataProjectBackground);
  }

  // ============> dataProjectCost <============ //

  edit_projectCost(item, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
    this.SetProjectCost(item);
  }

  add_row_ProjectCost() {
    this.dataProjectCost.push({ CimLookbackId: 0, ProjectLookbackId: null, CimLookbackType: "ProjectCost", Aspect: null, Approve: null, Actual: null, DifferenceNote: null, BusinessPlan: null, ResponsiblePerson: null }
    );
    this.cimForm.get('dataProjectCost').setValue(this.dataProjectCost);
  }

  deleteProjectCost(index) {
    this.dataProjectCost.splice(index, 1);
    this.cimForm.get('dataProjectCost').setValue(this.dataProjectCost);
  }

  // ============> Schedule <============ //
  edit_schedule(item, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
    this.SetSchedule(item);
  }

  add_row_Schedule() {
    this.dataSchedule.push({ CimLookbackId: 0, ProjectLookbackId: null, CimLookbackType: "Schedule", Aspect: null, Approve: null, Actual: null, DifferenceNote: null, BusinessPlan: null, ResponsiblePerson: null }
    );
    this.cimForm.get('dataSchedule').setValue(this.dataSchedule);

  }

  deleteSchedule(index) {
    this.dataSchedule.splice(index, 1);
    this.cimForm.get('dataSchedule').setValue(this.dataSchedule);

  }

  // ============> KeyAssumption <============ //

  edit_keyAssumption(item, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
    this.SetKeyAssumption(item);
  }

  add_row_KeyAssumption() {
    this.dataKeyAssumption.push({ CimLookbackId: 0, ProjectLookbackId: null, CimLookbackType: "KeyAssumption", Aspect: null, Approve: null, Actual: null, DifferenceNote: null, BusinessPlan: null, ResponsiblePerson: null }
    );
    this.cimForm.get('dataKeyAssumption').setValue(this.dataKeyAssumption);

  }

  deleteKeyAssumption(index) {
    this.dataKeyAssumption.splice(index, 1);
    this.cimForm.get('dataKeyAssumption').setValue(this.dataKeyAssumption);
  }

  // ============> EconomicReturn <============ //

  edit_economicReturn(item, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
    this.SetEconomicReturn(item);
  }

  add_row_EconomicReturn() {
    this.dataEconomicReturn.push({ CimLookbackId: 0, ProjectLookbackId: null, CimLookbackType: "EconomicReturn", Aspect: null, Approve: null, Actual: null, DifferenceNote: null, BusinessPlan: null, ResponsiblePerson: null }
    );
    this.cimForm.get('dataEconomicReturn').setValue(this.dataEconomicReturn);

  }

  deleteEconomicReturn(index) {
    this.dataEconomicReturn.splice(index, 1);
    this.cimForm.get('dataEconomicReturn').setValue(this.dataEconomicReturn);
  }

  get IsProjectBackgroundDisable() {
    return !(this.dataProjectBackground.length > 1);
  }

  get IsProjectCostDisable() {
    return !(this.dataProjectCost.length > 1);
  }

  get IsScheduleDisable() {
    return !(this.dataSchedule.length > 1);
  }

  get IsKeyAssumptionDisable() {
    return !(this.dataKeyAssumption.length > 1);
  }

  get IsEconomicReturnDisable() {
    return !(this.dataEconomicReturn.length > 1);
  }

  get viewMode() {
    return this.initiativeService.viewMode;
  }
}

