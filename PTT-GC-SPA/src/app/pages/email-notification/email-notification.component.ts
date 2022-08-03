import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerformanceInactiveModel } from '@models/performance-inactive.model';
import { PerformanceInactiveService } from '@services/performance-inactives/performance-inactives.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.css']
})
export class EmailNotificationComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;
  TableData: any = [
    { InitiativeID: "2020-00001", InitiativeName: "PSM", ProjectEngineer: "Veerapong", Period: "1/2020", From: "22/8/2020", To: "10/10/2020", POC: true, OutstandingItems: false, HighlightWork: false, CLSD: false, BenefitTracking: true },
    { InitiativeID: "2020-00002", InitiativeName: "New", ProjectEngineer: "Thammatad", Period: "1/2020", From: "22/8/2020", To: "10/10/2020", POC: true, OutstandingItems: true, HighlightWork: true, CLSD: true, BenefitTracking: true }
  ];
  createEmailForm: FormGroup;
  updateEmailForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  bsConfigMonth: Partial<BsDatepickerConfig>;
  today = new Date();
  initiativesList: [];
  selectedInitiativesList: [];
  dtLs: PerformanceInactiveModel[] = [];
  performanceInactiveList: PerformanceInactiveModel[];

  deleteRow: any;
  test = ['iTem1', 'item2', 'item3'];

  //pagination
  pagination: {
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,
  } = {
      itemsPerPage: 5, // Default setting is 50
      totalItems: 0,
      totalPages: 0,
    };

  maxSize: number = 10;
  currentPage: number = 1;
  piModel: PerformanceInactiveModel;
  seletedDate = new Date();

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private piService: PerformanceInactiveService
  ) {
    this.bsConfig = Object.assign({}, {
      minDate: this.today,
      dateInputFormat: 'DD/MM/YYYY',
    });
    this.bsConfigMonth = Object.assign({}, {
      minDate: this.today,
      dateInputFormat: 'MM/YYYY',
      datepickerMode: 'year',
      // minMode: 'month'
    });
    this.createEmailForm = this.formBuilder.group({
      InitiativeID: [null, Validators.required],
      InitiativeName: [null, Validators.required],
      ProjectEngineer: [null, Validators.required],
      Period: [null, Validators.required],
      From: [null, Validators.required],
      To: [null, Validators.required],
      POC: [null, Validators.required],
      OutstandingItems: [false, Validators.required],
      HighlightWork: [false, Validators.required],
      CLSD: [false, Validators.required],
      BenefitTracking: [false, Validators.required]
    });
    this.updateEmailForm = this.formBuilder.group({
      InitiativeID: ['', Validators.required],
      InitiativeCode: [null, Validators.required],
      InitiativeName: ['', Validators.required],
      ProjectEngineer: ['', Validators.required],
      Period: ['', Validators.required],
      From: ['', Validators.required],
      To: ['', Validators.required],
      POC: ['', Validators.required],
      OutstandingItems: [false, Validators.required],
      HighlightWork: [false, Validators.required],
      CLSD: [false, Validators.required],
      BenefitTracking: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchPerfommanceInactiveList();
    this.getByPeriod();
    this.getInitiativeCode();

  }

  // เพิ่ม function pagination
  pagiantionAssignment = (total: number): void => {
    this.pagination.totalItems = total;
    this.pagination.totalPages = Math.ceil(total / this.pagination.itemsPerPage);
  }

  fetchPerfommanceInactiveList = (): void => {
    this.piService.GetPerformanceInactives().then(r => {
      this.performanceInactiveList = r as PerformanceInactiveModel[];
      //เพิ่ม pagination
      this.pagiantionAssignment(this.performanceInactiveList.length);
    }).catch(e => e);
  }

  createEmail() {
    this.modalRef.hide();
  }

  updateEmail() {
    this.modalRef.hide();
    this.piService.UpdateInitiative({
      performanceInactiveId: this.updateEmailForm.get('InitiativeID').value,
      // initiativeCode: this.updateEmailForm.get('InitiativeCode').value,
      initiativeCode: this.updateEmailForm.get('InitiativeCode').value,
      poc: this.updateEmailForm.get('POC').value,
      outstandingItems: this.updateEmailForm.get('OutstandingItems').value,
      highlightWork: this.updateEmailForm.get('HighlightWork').value,
      clsd: this.updateEmailForm.get('CLSD').value,
      benefitTracking: this.updateEmailForm.get('BenefitTracking').value,
      fromDate: this.updateEmailForm.get('From').value,
      toDate: this.updateEmailForm.get('To').value,
    }).then(r => r);
    this.fetchPerfommanceInactiveList();
  }

  // // modal-add
  createModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  declineAdd(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }


  // modal-edit
  updateModal(data, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.setForm(data, this.updateEmailForm);
  }

  confirmUpdate(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  declineUpdate() {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  // modal-delete
  deleteModal(data: any, template: TemplateRef<any>) {
    this.deleteRow = data;
    this.modalRef = this.modalService.show(template);

  }

  confirmDelete(): void {
    // this.message = 'Confirm';
    this.modalRef.hide();
    this.piService.DeleteInitiative(this.deleteRow.performanceInactiveId).then(r => {
      this.fetchPerfommanceInactiveList();
    });
  }

  declineDelete(): void {
    // this.message = 'Declined!';
    this.deleteRow = null;
    this.modalRef.hide();
  }

  //log event paginator
  log = (event: any): void => {
  }

  setForm(data, form) {
    form.get('InitiativeID').setValue(data.performanceInactiveId);
    form.get('InitiativeCode').setValue(data.initiativeCode);
    form.get('InitiativeName').setValue(data.name);
    form.get('ProjectEngineer').setValue(data.ownerName);
    // form.get('Period').setValue(data.Period);
    form.get('From').setValue(new Date(data.fromDate));
    form.get('To').setValue(new Date(data.toDate));
    form.get('POC').setValue(data.poc);
    form.get('OutstandingItems').setValue(data.outstandingItems);
    form.get('HighlightWork').setValue(data.highlightWork);
    form.get('CLSD').setValue(data.clsd);
    form.get('BenefitTracking').setValue(data.benefitTracking);
  }

  // Submit Add ew Excetion
  addNewException = (): void => {
    // const iniId = ['2020-000004', '2020-000003'];
    this.createEmailForm.get('InitiativeName').value.forEach(element => {
      this.dtLs.push(
        {
          initiativeCode: element.value,
          name: null,
          projectEngineer: null,
          poc: this.createEmailForm.get('POC').value,
          outstandingItems: this.createEmailForm.get('OutstandingItems').value,
          highlightWork: this.createEmailForm.get('HighlightWork').value,
          clsd: this.createEmailForm.get('CLSD').value,
          benefitTracking: this.createEmailForm.get('BenefitTracking').value,
          fromDate: this.createEmailForm.get('From').value,
          toDate: this.createEmailForm.get('To').value,
        } as PerformanceInactiveModel
      );
    });

    this.piService.CreateNewExeption(
      this.dtLs
    );
    this.modalRef.hide();
    // this.ngOnInit();
    window.location.reload();
  }

  // Get Data by Period
  getByPeriod = (): void => {
    this.piService.GetInitiativeByPeriod(this.seletedDate).then((r) => {
      this.performanceInactiveList = r as PerformanceInactiveModel[];
      this.pagiantionAssignment(this.performanceInactiveList.length);
    });
  }

  // Get initiative code
  getInitiativeCode = (): void => {
    this.piService.GetInitiativeCode().then((r) => {
      this.initiativesList = r as [];
    });

  }


}

