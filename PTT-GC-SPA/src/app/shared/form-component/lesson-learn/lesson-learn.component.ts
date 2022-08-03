import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonLearnTableRowData } from '@models/lesson-learn-table-row-data';
import { InitiativeService } from '@services/initiative/initiative.service';
import { LessonLearnApiService } from '@services/lesson-learn-api/lesson-learn-api.service';
import { LessonLearnTableDataService } from '@services/lesson-learn-table-data/lesson-learn-table-data.service';
import { SwalTool } from '@tools/swal.tools';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { LessonLearnAttachmentComponent } from '../lesson-learn-attachment/lesson-learn-attachment.component';
import { LessonLearnFormComponent } from '../lesson-learn-form/lesson-learn-form.component';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-lesson-learn',
  templateUrl: './lesson-learn.component.html',
  styleUrls: ['./lesson-learn.component.css']
})
export class LessonLearnComponent implements OnInit, OnDestroy {

  // @ViewChild('AttachmentLessonLearnForm', { static: false }) AttachmentLessonLearnForm: ModalDirective;
  @Input() formGroup: FormGroup;
  id: number;

  dataSubscribe: Subscription;
  bsModalRef: BsModalRef;
  categoryType: string = null;
  dataRows: LessonLearnTableRowData[] = [];
  config: ModalOptions = {
    class: 'modal-xl'
  };
  lessonLearnId: number;

  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private lessonLearnTableDataService: LessonLearnTableDataService,
    private initiativeService: InitiativeService,
    private lessonLearnApiService: LessonLearnApiService,
    private swalTool: SwalTool
  ) {
  }

  ngOnInit(): void {
    this.id = this.initiativeService.id;
    this.lessonLearnApiService.GetLessonLearn().subscribe(res => {
      res.forEach(x => {
        const objectData: LessonLearnTableRowData = {
          id: x.id,
          type: x.type,
          lessonLearnTitle: x.lessonLearnTitle,
          projectPhaseNo: x.projectPhaseNo,
          milestoneNo: x.milestoneNo,
          areaOfLearning: x.areaOfLearning,
          issues: x.issues,
          background: x.background,
          initiativeId: this.initiativeService.id,
          lessonLearned: x.lessonLearned,
          remark: x.remark,
          rating: x.rating,
        };
        this.lessonLearnTableDataService.update(objectData);
      })
    });
    this.dataSubscribe = this.lessonLearnTableDataService.DATA.subscribe(resp => {
      this.dataRows = resp
    });
  }

  ngOnDestroy(): void {
    this.dataSubscribe.unsubscribe();
    this.lessonLearnTableDataService.clear();
  }

  get GetId() {
    return this.initiativeService.id;
  }

  get viewMode() {
    return this.initiativeService.viewMode;
  }

  editRow(row: LessonLearnTableRowData): void {
    const overrideConfig = this.config;
    if (row.milestoneNo) {
      row.type = "mileStone";
    } else {
      row.type = "projectPhaseNo";
    }
    overrideConfig.initialState = { selected: row };
    this.bsModalRef = this.modalService.show(LessonLearnFormComponent, overrideConfig);
  }

  deleteRow(row: LessonLearnTableRowData): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.lessonLearnApiService.DeleteLessonLearnById(this.initiativeService.id, row.id).then((deleteRes) => {
          this.lessonLearnTableDataService.delete(row);
          this.swalTool.Delete();
        });
        // this.attachmentService.DeleteAttachment(id).subscribe(() => {
        //   this.fileLessonLearn.splice(this.fileLessonLearn.findIndex(f => f.id === id), 1);
        // }, error => this.response.error(error));
      }
    });
  }

  addRow(): void {
    this.config.initialState = { selected: undefined };
    this.bsModalRef = this.modalService.show(LessonLearnFormComponent, this.config);
  }

  getTypeDetail(row: LessonLearnTableRowData): string {
    return row.milestoneNo ? row.milestoneNo : '-';
  }

  ShowAttachmentLessonLearnForm(row: LessonLearnTableRowData) {
    const overrideConfig = this.config;
    if (this.initiativeService.SubmitDone) {
      return;
    }
    if (this.initiativeService.id) {
      this.lessonLearnId = row.id;
      this.categoryType = 'lessonLearn';
      this.initiativeService.attachCategoryType = 'lessonLearn';
      this.initiativeService.attachCategoryId = row.id;
      overrideConfig.initialState = { selected: row };
      this.modalService.show(LessonLearnAttachmentComponent, overrideConfig)
    } else {
      this.swalTool.InitiativeNotFound();
    }
  }

  // CloseAttachmentLessonLearnForm() {
  //   this.AttachmentLessonLearnForm.hide();
  // }

}

