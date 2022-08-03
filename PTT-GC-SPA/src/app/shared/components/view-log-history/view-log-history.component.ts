import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { InitiativeService } from '@services/initiative/initiative.service';
import { AuditService } from '@services/audit/audit.service';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Audit } from '@models/audit';
import { Pagination, PaginatedResult } from '@models/pagination';
import { DateUtil } from '@utils/date.utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwalTool } from '@tools/swal.tools';
import { LogCommentComponent } from '@components/log-comment/log-comment.component';

@Component({
  selector: 'app-view-log-history',
  templateUrl: './view-log-history.component.html',
  styleUrls: ['./view-log-history.component.css']
})
export class ViewLogHistoryComponent implements OnInit {

  //@ViewChild('LogComment', { static: false }) LogComment: ModalDirective;

  @Input() id;
  @Input() initiativeCode;
  @Output() modelClose = new EventEmitter();

  constructor(
    private initiativeService: InitiativeService,
    private dateUtil: DateUtil,
    private fb: FormBuilder,
    private auditService: AuditService,
    private spinner: NgxSpinnerService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private swalTool: SwalTool
  ) { }

  comment: number;
  config: ModalOptions = {
    class: 'modal-lg'
  };

  audits: Audit[];
  IsAudit = false;
  pagination: Pagination;
  params: any = {};

  currentPage = 1;
  maxSize = 10;

  bsStartDate = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
  bsEndDate = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };

  dateStart = new Date(new Date().setMonth(new Date().getMonth() - 1));
  dateEnd = new Date(); // new Date(2018, 1, 30);

  HistoryForm = this.fb.group({ keyword: null, startDate: this.dateStart, endDate: this.dateEnd });

  startDate: string;
  endDate: string;
  loading: boolean = true;

  ngOnInit(): void {
    this.id = this.initiativeService.id;
    this.spinner.show();
    if (this.id) { this.GetAuditsFirst(); }
  }

  GetAuditsFirst() {
    // this.initiativeService.GetInitiativeCode(this.id).subscribe((result) => {
    this.params.code = this.initiativeService.initiativeCode;
    this.params.keyword = '';
    this.params.startDate = this.dateUtil.SetDate(this.dateStart);
    this.params.endDate = this.dateUtil.SetDate(this.dateEnd);
    this.auditService.GetAudits(1, 10, this.params).subscribe(
      (res: PaginatedResult<Audit[]>) => {
        this.audits = res.result;
        this.pagination = res.pagination;
        this.IsAudit = this.audits.length !== 0 ? true : false;
        this.loading = false;
        this.spinner.hide();
      });
    // });
  }

  GetAudits() {
    this.auditService.GetAudits(this.pagination.currentPage, this.pagination.itemsPerPage, this.params).subscribe(
      (res: PaginatedResult<Audit[]>) => {
        this.audits = res.result;
        this.pagination = res.pagination;
        this.IsAudit = this.audits.length !== 0 ? true : false;
      });
  }

  Refresh(e) {
    this.currentPage = e;
    this.pagination.currentPage = e;
    setTimeout(() => this.GetAudits(), 250);
  }

  PageChanged(e) {
    this.currentPage = e.page;
    this.pagination.currentPage = e.page;
    this.GetAudits();
  }

  Search() {
    if (this.HistoryForm.controls.keyword.value) {
      this.params.keyword = this.HistoryForm.controls.keyword.value;
      this.GetAudits();
    } else {
      this.params.keyword = '';
      this.GetAudits();
    }
    this.pagination.currentPage = 1;
  }

  CloseModal() {
    this.bsModalRef.hide();
  }

  HideModal() {
    this.bsModalRef.hide();
  }

  ShowLogComment(id) {
    //   this.comment = id;
    //   this.LogComment.show();
    // }

    // ShowViewLogHistory() {
    //this.ViewLogHistoryModal.show();
    const overrideConfig = this.config;

    if (this.initiativeService.id) {
      overrideConfig.initialState = { id: id };
      this.modalService.show(LogCommentComponent, overrideConfig);
    } else {
      this.swalTool.DataNotFound();
    }
  }

  CloseLogComment() {
    //this.LogComment.hide();
  }

  ChangeStartDate(value: Date): void {
    this.params.startDate = this.dateUtil.SetDate(value);
  }

  ChangeEndDate(value: Date): void {
    this.params.endDate = this.dateUtil.SetDate(value);
  }
}
