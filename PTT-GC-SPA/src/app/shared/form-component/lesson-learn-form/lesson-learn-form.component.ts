import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StageDetail } from '@models/initiative';
import { LessonLearnTableRowData } from '@models/lesson-learn-table-row-data';
import { ProjectPhaseNoListResponse, MileStoneListResponse, AreaOfLearningListResponse, RatingListResponse } from '@models/LessonLearnApiObject';
import { LessonLearnType } from '@models/LessonLearnConstant';
import { ProgressDetail } from '@models/progressDetail';
import { InitiativeService } from '@services/initiative/initiative.service';
import { LessonLearnApiService } from '@services/lesson-learn-api/lesson-learn-api.service';
import { LessonLearnTableDataService } from '@services/lesson-learn-table-data/lesson-learn-table-data.service';
import { PermissionService } from '@services/permission/permission.service';
import { ProgressService } from '@services/progress/progress.service';
import { RiskService } from '@services/risk/risk.service';
import { SwalTool } from '@tools/swal.tools';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { LessonLearnAttachmentComponent } from '../lesson-learn-attachment/lesson-learn-attachment.component';

@Component({
  selector: 'app-lesson-learn-form',
  templateUrl: './lesson-learn-form.component.html',
  styleUrls: ['./lesson-learn-form.component.css']
})
export class LessonLearnFormComponent implements OnInit {

  //@ViewChild('AttachmentLessonLearnModal', { static: false }) AttachmentLessonLearnModal: ModalDirective;
  lessonForm: FormGroup;
  categoryType: string = null;
  projectPhaseNoList: StageDetail[];
  mileStoneList: Array<ProgressDetail>;
  areaOfLearningList: string[];
  ratingList: string[];

  entryMode: string = null;
  stageDetail: StageDetail[] = [];
  stageDetailList: StageDetail[] = [];
  configLessonModal: ModalOptions = {
    class: 'modal-xl'
  };
  phaseList: {
    name: string;
    value: string;
  }[] = [];

  selected: LessonLearnTableRowData;
  hideShowBtnText = "Hide";
  lessonLearnId: number;


  constructor(private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private lessonLearnTableDataService: LessonLearnTableDataService,
    private lessonLearnApiService: LessonLearnApiService,
    private initiativeService: InitiativeService,
    private progressService: ProgressService,
    private riskService: RiskService,
    public ps: PermissionService,
    private swalTool: SwalTool,
    private modalService: BsModalService,
  ) {
  }

  ngOnInit(): void {
    this.lessonForm = this.formBuilder.group({
      id: 0,
      triggerType: [{ value: this.initiativeService.suggestionStatus.requestCapex ? 'projectPhaseNo' : 'mileStone', disabled: true }, Validators.required],
      //triggerType: ['projectPhaseNo', Validators.required],
      lessonLearnTitle: [undefined],
      projectPhaseNo: [undefined],
      milestoneNo: [undefined, Validators.required],
      areaOfLearning: [undefined, Validators.required],
      background: [null, Validators.required],
      issues: [undefined, Validators.required],
      lessonLearned: [undefined, Validators.required],
      remark: [],
      rating: [1]
    });
    if (this.lessonForm.get('triggerType').value === 'projectPhaseNo') {
      this.lessonForm.get('milestoneNo').clearValidators();
      this.lessonForm.get('projectPhaseNo').setValidators(Validators.required);
    }
    else {
      this.lessonForm.get('projectPhaseNo').clearValidators();
      this.lessonForm.get('milestoneNo').setValidators(Validators.required);
    }

    this.lessonForm.get('milestoneNo').updateValueAndValidity();
    this.lessonForm.get('projectPhaseNo').updateValueAndValidity();

    this.setFormData();

    this.lessonLearnApiService.getAreaOfLearningDropDown().subscribe(res => {
      this.areaOfLearningList = res.map(x => x.attribute02);
    })

    this.lessonLearnApiService.rating.then(
      (resp: RatingListResponse) => this.ratingList = resp.data
    );


    // if (this.initiativeService.id) {
    //   this.initiativeService.GetInitiative(this.initiativeService.id).subscribe(res => {
    //     this.initiativeService.GetInitiativeStages(this.initiativeService.id).then(res2 => {
    //       var temp = res2.filter(x => x.subtype === res.initiativeSubType);
    //       this.projectPhaseNoList = temp;
    //     })
    //   });
    // }

    this.riskService.getEntryMode.subscribe(entryMode => {
      if (entryMode) {
        this.entryMode = entryMode;
      }
    });
    if (this.initiativeService.id) {
      this.initiativeService.GetInitiativeStages(this.initiativeService.id).then((response) => {
        if (response) {
          // this.stageDetail = response;
          if (this.initiativeService.suggestionStatus?.initiativeSubType) {
            let list = response.filter((x) => x.subtype == this.initiativeService.suggestionStatus?.initiativeSubType && x.flowType == 'initiative');
            this.phaseList = this.setPhaseList(list);
          } else {
            let list = response.filter((x) => x.subtype == "normal" && x.flowType == 'initiative');
            this.phaseList = this.setPhaseList(list);
          }
          // this.initPhaseList(this.GetEntryMode());
        }
      });
    }


    this.progressService.GetProgressAndMilestone(this.initiativeService.id).subscribe(res => {
      this.mileStoneList = res.progressDetails;
    });

    if (this.initiativeService.viewMode) {
      this.lessonForm.disable();
    }
  }

  get GetId() {
    return this.initiativeService.id;
  }

  GetEntryMode() {
    if (this.entryMode) {
      switch (this.entryMode) {
        case 'E001': return 'JV';
        case 'E002': return 'CVC';
        case 'E003': return 'Existing Unit';
        case 'E004': return 'Organic';
        case 'E005': return 'M&A';
        case 'E006': return 'Divestment';
        case 'E009': return 'Other';
        default: return null;
      }
    }
  }
  initPhaseList(entryMode) {
    let subtype = null;
    let list: StageDetail[];

    list = this.stageDetail.filter((x) => x.subtype == this.initiativeService.suggestionStatus?.initiativeSubType && x.flowType == 'initiative')
    this.phaseList = this.setPhaseList(list);

  }
  setPhaseList(list: StageDetail[]) {
    let dup: string = null;
    let phaseList: {
      name: string;
      value: string;
    }[] = [];
    list.forEach(t => {
      let length = t.stage.length;
      let index = t.stage.substring(length, length - 1);
      let indexDash = t.stage.substring(length, length - 2);
      let lastWord = "-" + index;
      if (parseInt(index) > 0 && indexDash == lastWord) {
        let showtext = t.stage.substring(0, length - 2);
        if (showtext != dup) {
          dup = showtext;
          phaseList.push({
            name: showtext,
            value: t.stage
          });
        }
      } else {
        phaseList.push({
          name: t.stage,
          value: t.stage
        });
      }
    });
    return phaseList;
  }

  isShowInvalid(key: string): boolean {
    return this.lessonForm.get(key).invalid && (this.lessonForm.get(key).dirty || this.lessonForm.get(key).touched);
  }

  get isEdit(): boolean {
    return this.selected !== undefined;
  }

  close(): void {
    this.bsModalRef.hide();
  }

  isProjectPhaseNo(): boolean {
    return this.lessonForm.get('triggerType').value === LessonLearnType.projectPhaseNo;
  }

  isMileStone(): boolean {
    return this.lessonForm.get('triggerType').value === LessonLearnType.milestone;
  }

  OnHideShow() {
    if (this.hideShowBtnText == "Hide") {
      this.hideShowBtnText = "Show";
    }
    else {
      this.hideShowBtnText = "Hide";
    }
  }

  submit(): void {
    this.lessonForm.markAllAsTouched();
    if (this.lessonForm.invalid) {
      this.lessonForm.markAllAsTouched();
      return;
    }

    if (this.initiativeService.viewMode) {
      this.close();
      return;
    }


    const value = this.lessonForm.value;
    const object: LessonLearnTableRowData = {
      id: value.id,
      type: value.triggerType,
      lessonLearnTitle: value.lessonLearnTitle,
      areaOfLearning: value.areaOfLearning,
      issues: value.issues,
      background: value.background,
      lessonLearned: value.lessonLearned,
      initiativeId: this.initiativeService.id,
      remark: value.remark,
      rating: value.rating,
    };

    if (this.isProjectPhaseNo()) {
      object.type = LessonLearnType.projectPhaseNo;
      object.projectPhaseNo = value.projectPhaseNo;
    }

    if (this.isMileStone()) {
      object.type = LessonLearnType.milestone;
      object.milestoneNo = value.milestoneNo;
    }

    if (this.isEdit) {
      object.lessonLearnNo = this.selected.lessonLearnNo;
      object.id = this.selected.id;
      this.lessonLearnApiService.UpdateLessonLearnById(this.initiativeService.id, object).then((updateRes) => {
        this.lessonLearnTableDataService.update(object);
        this.close();
      });
    } else {
      this.lessonLearnApiService.CreateLessonLearnById(this.initiativeService.id, object).then((createRes) => {
        object.id = createRes;
        this.lessonLearnTableDataService.update(object);
        this.close();
      });
    }

    // this.lessonLearnTableDataService.update(object);
    // this.close();
  }

  private setFormData(): void {
    if (this.isEdit) {
      this.lessonLearnId = this.selected?.id;
      this.lessonForm.patchValue({
        //triggerType: this.initiativeService.suggestionStatus.requestCapex ? 'projectPhaseNo' : 'mileStone',
        id: this.selected?.id,
        triggerType: this.selected?.type,
        lessonLearnTitle: this.selected?.lessonLearnTitle,
        projectPhaseNo: this.selected?.projectPhaseNo,
        milestoneNo: this.selected?.milestoneNo,
        areaOfLearning: this.selected?.areaOfLearning,
        background: this.selected?.background,
        issues: this.selected?.issues,
        lessonLearned: this.selected?.lessonLearned,
        remark: this.selected?.remark,
        rating: this.selected?.rating
      });
    }
  }

  changeType() {
    let type = this.lessonForm.get('triggerType').value;
    if (type === "projectPhaseNo") {
      this.lessonForm.get('milestoneNo').patchValue(null);
      this.lessonForm.get('milestoneNo').clearValidators();
      this.lessonForm.get('projectPhaseNo').setValidators([Validators.required]);
      this.lessonForm.get('milestoneNo').updateValueAndValidity();
      this.lessonForm.get('projectPhaseNo').updateValueAndValidity();

    } else {
      this.lessonForm.get('projectPhaseNo').patchValue(null);
      this.lessonForm.get('projectPhaseNo').clearValidators();
      this.lessonForm.get('milestoneNo').setValidators([Validators.required]);
      this.lessonForm.get('milestoneNo').updateValueAndValidity();
      this.lessonForm.get('projectPhaseNo').updateValueAndValidity();
    }
  }

  ShowAttachmentLessonLearnModal() {
    const overrideConfig = this.configLessonModal;
    if (this.initiativeService.SubmitDone) {
      return;
    }
    if (this.initiativeService.id) {
      overrideConfig.initialState = { selected: this.selected };
      this.modalService.show(LessonLearnAttachmentComponent, overrideConfig)
    } else {
      this.swalTool.InitiativeNotFound();
    }
  }


}

