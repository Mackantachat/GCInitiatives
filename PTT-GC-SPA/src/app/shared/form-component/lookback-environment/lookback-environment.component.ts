import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnvironmentResultModel, ProjectImpactModel, ProjectImpactWorkModel } from '@models/lookback';
import { InitiativeService } from '@services/initiative/initiative.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-lookback-environment',
  templateUrl: './lookback-environment.component.html',
  styleUrls: ['./lookback-environment.component.css']
})
export class LookbackEnvironmentComponent implements OnInit {
  @Input() lookbackForm: FormGroup;
  @Output() lookbackEnvironmentOutput: EventEmitter<any> = new EventEmitter<any>();
  @Input() public EnvironmentLookbackInput: any;
  PlanLookback = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };  // 'YYYY-MM-DD'
  modalRef: BsModalRef;
  bsConfig: Partial<BsDatepickerConfig>;
  today = new Date();

  environmentForm: FormGroup;
  ProjectImpact: ProjectImpactModel[] = [{
    ProjectLookbackId: null,
    Situation: null,
    Before: null,
    Target: null,
    After: null
  }];
  ProjectImpactWork: ProjectImpactWorkModel[] = [{
    ProjectLookbackId: null,
    WhatWorked: null,
    WhatDidNotWork: null
  }];
  // EnvironmentResult: FormGroup;
  EnvironmentResult: EnvironmentResultModel[] = [{
    //EnvironmentResultId:null,
    EnvironmentResultCategory: null,
    EnvironmentResultUnit: null,
    EnvironmentResultBefore: null,
    EnvironmentResultAfter: null,
    EnvironmentResultBenefitYear: null,
    EnvironmentResultBenefitYearThb: null,
    EnvironmentResultRemark: null,
  }];


  pollutionDropdownList = [];
  globalDropdownList = [];
  resourceDropdownList = [];
  pollutionSelectedItems = [];
  globalSelectedItems = [];
  resourceSelectedItems = [];
  pollutionSpecify = true;
  pollutionOther = null;
  globalSpecify = true;
  globalOther = null;
  resourceSpecify = true;
  resourceOther = null;
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 3,
    allowSearchFilter: true
  };

  owners: any = [];
  params: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private initiativeService: InitiativeService,
  ) {

    // this.EnvironmentResult = this.formBuilder.group({
    //    EnvironmentResultCategory: [null, Validators.required],
    //    EnvironmentResultUnit: [null, Validators.required],
    //    EnvironmentResultBefore: [null, Validators.required],
    //    EnvironmentResultAfter: [null, Validators.required],
    //    EnvironmentResultBenefitYear: [null, Validators.required],
    //    EnvironmentResultBenefitYearThb: [null, Validators.required],
    //    EnvironmentResultRemark: [null, Validators.required],
    // });

    this.environmentForm = this.formBuilder.group({
      PollutionPrevention: [this.pollutionSelectedItems, Validators.required],
      PollutionPreventionSpecify: [this.pollutionOther, Validators.required],
      GlobalEnvirCons: [this.globalSelectedItems, Validators.required],
      GlobalEnvirConsSpecify: [this.globalOther, Validators.required],
      ResourceCirculation: [this.resourceSelectedItems, Validators.required],
      ResourceCirculationSpecify: [this.resourceOther, Validators.required],
      ProjectImpact: [this.ProjectImpact, Validators.required],
      ProjectImpactWork: [this.ProjectImpactWork, Validators.required],
      EnvironmentResult: [this.EnvironmentResult, Validators.required]
      //EnvironmentResult: this.formBuilder.array([])
    });

    this.bsConfig = Object.assign({}, {
      dateInputFormat: 'DD/MM/YYYY', // YYYY-MM-DD
    });
  }

  ngOnInit(): void {
    this.pollutionDropdownList = [
      'Air Pollution (e.g. NOx, SOx, VOC)',
      'Water Pollution',
      'Ground Contamination',
      'Vibration Pollution',
      'Odor Pollution',
      'Ground Sinkake',
      'Others (Please specify)'
    ];
    this.globalDropdownList = [
      'Preventing Global Warming and Energy Conservation',
      'Preventing Ozone Depletion',
      'Others (Please specify)'
    ];
    this.resourceDropdownList = [
      'Recycling Industrial Waste',
      'Recycling Municipal Waste',
      'Recycling Waste Water',
      'Disposal of Industrial Waste',
      'Disposal of Muicipal Waste',
      'Others (Please specify)'
    ];
    this.lookbackEnvironmentOutput.emit(this.environmentForm.value);
    this.GetOwners();
    this.onChanges();
  }

  ngOnChanges() {
    if (this.EnvironmentLookbackInput) {
      const el = this.EnvironmentLookbackInput;
      // this.environmentForm.get('EnviPlanLookbackDate').setValue(el.EnviPlanLookbackDate ? new Date(el.EnviPlanLookbackDate) : null);
      this.setImpact(el);
      this.setImpactWork(el);
      this.setEnviProjectType(el);
      this.setResultForm(el);
    }
  }

  setImpact(el) {
    if (el?.ProjectImpact?.length > 0) {
      this.ProjectImpact = el.ProjectImpact;
      this.environmentForm.get('ProjectImpact').setValue(el.ProjectImpact);
      // this.lookbackEnvironmentOutput.emit(this.environmentForm.value);
    } else if (this.ProjectImpact.length == 0) {
      this.addImpact();
    }
    this.lookbackEnvironmentOutput.emit(this.environmentForm.value);
  }

  setImpactWork(el) {
    if (el?.ProjectImpactWork?.length > 0) {
      this.ProjectImpactWork = el.ProjectImpactWork;
      this.environmentForm.get('ProjectImpactWork').setValue(el.ProjectImpactWork);
      // this.lookbackEnvironmentOutput.emit(this.environmentForm.value);
    } else if (this.ProjectImpactWork.length == 0) {
      this.addImpactWork();
    }
    this.lookbackEnvironmentOutput.emit(this.environmentForm.value);
  }

  setEnviProjectType(el) {
    this.setPollution(el.PollutionPrevention, el.PollutionPreventionSpecify);
    this.pollutionSelectedItems = el.PollutionPrevention;
    el.PollutionPrevention.forEach(element => {
      if (element === 'Others (Please specify)') {
        this.pollutionSpecify = false;
        this.pollutionOther = el.PollutionPreventionSpecify;
      }
    });
    this.globalSelectedItems = el.GlobalEnvirCons;
    this.setGlobal(el.GlobalEnvirCons, el.GlobalEnvirConsSpecify);
    el.GlobalEnvirCons.forEach(element => {
      if (element === 'Others (Please specify)') {
        this.globalSpecify = false;
        this.globalOther = el.GlobalEnvirConsSpecify;
      }
    });
    this.resourceSelectedItems = el.ResourceCirculation;
    this.setResource(el.ResourceCirculation, el.ResourceCirculationSpecify);
    el.ResourceCirculation.forEach(element => {
      if (element === 'Others (Please specify)') {
        this.resourceSpecify = false;
        this.resourceOther = el.ResourceCirculationSpecify;
      }
    });
  }

  onChanges(): void {
    this.environmentForm.valueChanges.subscribe(val => {
      this.lookbackEnvironmentOutput.emit(this.environmentForm.value);
    });
  }
  // Pollution
  onPollutionSelect(item: any) {
    if (item === 'Others (Please specify)') {
      this.pollutionSpecify = false;
    } else {
      this.pollutionSpecify = true;
      this.pollutionOther = null;
    }
    this.setPollution(this.pollutionSelectedItems, this.pollutionOther);
  }
  onItemPollutionDeSelect(item: any) {
    const index = this.pollutionSelectedItems.indexOf(item);
    this.pollutionSelectedItems.splice(index, 1);
    if (item === 'Others (Please specify)') {
      this.pollutionSpecify = true;
      this.pollutionOther = null;
      this.setPollution(this.pollutionSelectedItems, null);
    }
  }
  onPollutionSelectAll(items: string[]) {
    items.forEach(item => {
      this.pollutionSelectedItems.push(item);
      // if (item === 'Other') {
      //   this.pollutionSpecify = false;
      // }
    });
    if (items.indexOf('Others (Please specify)') >= 0) {
      this.pollutionSpecify = false;
    } else {
      this.pollutionSpecify = true;
      this.pollutionOther = null;
    }
    this.setPollution(this.pollutionSelectedItems, this.pollutionOther);
  }
  onPollutionDropDownClose() {
    if (this.pollutionSelectedItems.indexOf('Others (Please specify)') >= 0) {
      this.pollutionSpecify = false;
    } else {
      this.pollutionSpecify = true;
      this.pollutionOther = null;
    }
    this.setPollution(this.pollutionSelectedItems, this.pollutionOther);
  }

  onChangePollutionOther(event) {
    this.setPollution(this.pollutionSelectedItems, event);
  }
  setPollution(pollutionSelectedItems, pollutionOther) {
    this.environmentForm.get('PollutionPrevention').setValue(pollutionSelectedItems);
    this.environmentForm.get('PollutionPreventionSpecify').setValue(pollutionOther);
    this.lookbackEnvironmentOutput.emit(this.environmentForm.value);
  }
  // Global
  onGlobalSelect(item: any) {
    if (item === 'Others (Please specify)') {
      this.globalSpecify = false;
    } else {
      this.globalSpecify = false;
      this.globalOther = null;
    }
    this.setGlobal(this.globalSelectedItems, this.globalOther);
  }
  onItemGlobalDeSelect(item: any) {
    const index = this.globalSelectedItems.indexOf(item);
    this.globalSelectedItems.splice(index, 1);
    if (item === 'Others (Please specify)') {
      this.globalSpecify = true;
      this.globalOther = null;
      this.setGlobal(this.globalSelectedItems, null);
    }
  }
  onGlobalSelectAll(items: string[]) {
    items.forEach(item => {
      this.globalSelectedItems.push(item);
    });
    if (items.indexOf('Others (Please specify)') >= 0) {
      this.globalSpecify = false;
    } else {
      this.globalSpecify = true;
      this.globalOther = null;
    }
    this.setGlobal(this.globalSelectedItems, this.globalOther);
  }

  onGlobalDropDownClose() {
    if (this.globalSelectedItems.indexOf('Others (Please specify)') >= 0) {
      this.globalSpecify = false;
    } else {
      this.globalSpecify = true;
      this.globalOther = null;
    }
    this.setGlobal(this.globalSelectedItems, this.globalOther);
  }

  onChangeGlobalOther(event) {
    this.setGlobal(this.globalSelectedItems, event);
  }
  setGlobal(globalSelectedItems, globalOther) {
    this.environmentForm.get('GlobalEnvirCons').setValue(globalSelectedItems);
    this.environmentForm.get('GlobalEnvirConsSpecify').setValue(globalOther);
    this.lookbackEnvironmentOutput.emit(this.environmentForm.value);
  }
  // Resource
  onResourceSelect(item: any) {
    if (item === 'Others (Please specify)') {
      this.resourceSpecify = false;
    } else {
      this.resourceSpecify = true;
      this.resourceOther = null;
      this.setResource(this.resourceSelectedItems, null);
    }
    this.setResource(this.resourceSelectedItems, this.resourceOther);
  }
  onItemResourceDeSelect(item: any) {
    const index = this.resourceSelectedItems.indexOf(item);
    this.resourceSelectedItems.splice(index, 1);
    if (item === 'Others (Please specify)') {
      this.resourceSpecify = true;
      this.resourceOther = null;
      this.setResource(this.resourceSelectedItems, null);
    }
  }
  onResourceSelectAll(items: string[]) {
    items.forEach(item => {
      this.resourceSelectedItems.push(item);
    });
    if (items.indexOf('Others (Please specify)') >= 0) {
      this.resourceSpecify = false;
    } else {
      this.resourceSpecify = true;
      this.resourceOther = null;
    }
    this.setResource(this.resourceSelectedItems, this.resourceOther);
  }
  onChangeResourceOther(event) {
    this.setResource(this.resourceSelectedItems, event);
  }

  onResourceDropDownClose() {
    if (this.resourceSelectedItems.indexOf('Others (Please specify)') >= 0) {
      this.resourceSpecify = false;
    } else {
      this.resourceSpecify = true;
      this.resourceOther = null;
    }
    this.setResource(this.resourceSelectedItems, this.resourceOther);
  }


  setResource(resourceSelectedItems, resourceOther) {
    this.environmentForm.get('ResourceCirculation').setValue(resourceSelectedItems);
    this.environmentForm.get('ResourceCirculationSpecify').setValue(resourceOther);
    this.lookbackEnvironmentOutput.emit(this.environmentForm.value);
  }
  // end select
  addImpact() {
    this.ProjectImpact.push({
      ProjectLookbackId: null,
      Situation: null,
      Before: null,
      Target: null,
      After: null
    });
  }
  deleteImpact(index) {
    this.ProjectImpact.splice(index, 1);
  }

  addImpactWork() {
    this.ProjectImpactWork.push({
      ProjectLookbackId: null,
      WhatWorked: null,
      WhatDidNotWork: null
    });
  }
  deleteImpactWork(index) {
    this.ProjectImpactWork.splice(index, 1);
  }

  editResult(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
  }

  // updateResult() {
  //   this.setResultForm(this.EnvironmentResult.value);
  //   this.modalRef.hide();
  // }

  setResultForm(el) {
    // this.EnvironmentResult.get('EnvironmentResultCategory').setValue(item.EnvironmentResultCategory);
    // this.EnvironmentResult.get('EnvironmentResultUnit').setValue(item.EnvironmentResultUnit);
    // this.EnvironmentResult.get('EnvironmentResultBefore').setValue(item.EnvironmentResultBefore);
    // this.EnvironmentResult.get('EnvironmentResultAfter').setValue(item.EnvironmentResultAfter);
    // this.EnvironmentResult.get('EnvironmentResultBenefitYear').setValue(item.EnvironmentResultBenefitYear);
    // this.EnvironmentResult.get('EnvironmentResultBenefitYearThb').setValue(item.EnvironmentResultBenefitYearThb);
    // this.EnvironmentResult.get('EnvironmentResultRemark').setValue(item.EnvironmentResultRemark);
    // this.environmentForm.get('EnvironmentResult').setValue(this.EnvironmentResult.value);
    // this.lookbackEnvironmentOutput.emit(this.environmentForm.value);
    if (el?.environmentResult?.length > 0) {
      this.EnvironmentResult = el.environmentResult;
      this.environmentForm.get('EnvironmentResult').setValue(el.environmentResult);
    } else if (this.EnvironmentResult.length == 0) {
      this.addEnviResult();
    }
    this.lookbackEnvironmentOutput.emit(this.environmentForm.value);
  }

  get IsImpactDisabled() {
    return !(this.ProjectImpact.length > 1);
  }

  get IsImpactWorkDisabled() {
    return !(this.ProjectImpactWork.length > 1);
  }

  // addEnviResult
  addEnviResult() {
    this.EnvironmentResult.push({
      //EnvironmentResultId:null,
      EnvironmentResultCategory: null,
      EnvironmentResultUnit: null,
      EnvironmentResultBefore: null,
      EnvironmentResultAfter: null,
      EnvironmentResultBenefitYear: null,
      EnvironmentResultBenefitYearThb: null,
      EnvironmentResultRemark: null,
    });
  }
  // removeEnviResult
  deleteEnvi(index) {
    this.EnvironmentResult.splice(index, 1);
  }

  get viewMode() {
    return this.initiativeService.viewMode;
  }

  SearchOwnerName(event) {
    this.GetOwners(event.term);
  }

  ClearOwnerName() {
    this.GetOwners();
  }

  GetOwners(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.owners = owners;
    });
  }

  // setEnviResult

}

