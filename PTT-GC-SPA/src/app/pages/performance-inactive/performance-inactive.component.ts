import { DateUtil } from './../../shared/utils/date.utils';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerformanceInactiveModel } from '@models/performance-inactive.model';
import { PerformanceInactiveService } from '@services/performance-inactives/performance-inactives.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-performance-inactive',
  templateUrl: './performance-inactive.component.html',
  styleUrls: ['./performance-inactive.component.css']
})
export class PerformanceInactiveComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;

  createEmailForm: FormGroup;
    updateEmailForm: FormGroup;
    bsConfig: Partial<BsDatepickerConfig>;
    bsConfigMonth: Partial<BsDatepickerConfig>;
    today = this.dateUtil.GetToday;
    initiativesList: any;
    selectedInitiativesList: [];
    dtLs: PerformanceInactiveModel[] = [];
    performanceInactiveList: PerformanceInactiveModel[];
    deleteRow: any;

    params: any = {};

    //pagination
    pagination: {
      itemsPerPage: number,
      totalItems: number,
      totalPages: number,
      } = {
              itemsPerPage: 20, // Default setting is 50
              totalItems: 0,
              totalPages: 0,
          };


    cities2 = [
      {id: 1, name: 'Vilnius'},
      {id: 2, name: 'Kaunas'},
      {id: 3, name: 'Pavilnys', disabled: true},
      {id: 4, name: 'Pabradė'},
      {id: 5, name: 'Klaipėda'}
    ];

    maxSize: number = 10;
    currentPage: number = 1;
    piModel: PerformanceInactiveModel;
    seletedDate = this.dateUtil.GetToday;

    constructor(
      private modalService: BsModalService,
      private formBuilder: FormBuilder,
      private piService: PerformanceInactiveService,
      private dateUtil:DateUtil
  ) {
      this.bsConfig = Object.assign({}, {
        isAnimated: true, 
        dateInputFormat: 'DD/MM/YYYY', 
        showWeekNumbers: false
      });
      this.bsConfigMonth = Object.assign({}, {
          //minDate: this.today,
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
    // console.log(this.performanceInactiveList);
    // this.getByPeriod();
    this.getInitiativeCode();
    //console.log('--->', this.initiativesList);

  }

   // เพิ่ม function pagination
   pagiantionAssignment = (total: number): void => {
    this.pagination.totalItems = total;
    this.pagination.totalPages = Math.ceil(total / this.pagination.itemsPerPage);
}

fetchPerfommanceInactiveList = (): void => {
    this.piService.GetPerformanceInactives().then(r => {
        this.performanceInactiveList = r as PerformanceInactiveModel[];
        console.log('--->', this.performanceInactiveList);
        //เพิ่ม pagination
        this.pagiantionAssignment(this.performanceInactiveList.length);
    }).catch(e => e);
}

createEmail() {
    this.modalRef.hide();
    console.log(this.createEmailForm.value);
}

updateEmail() {
    this.modalRef.hide();
    console.log(this.updateEmailForm.value);
    this.piService.UpdateInitiative({
        performanceInactiveId: this.updateEmailForm.get('InitiativeID').value,
        // initiativeCode: this.updateEmailForm.get('InitiativeCode').value,
        initiativeCode: this.updateEmailForm.get('InitiativeCode').value,
        poc: this.updateEmailForm.get('POC').value,
        outstandingItems: this.updateEmailForm.get('OutstandingItems').value,
        highlightWork: this.updateEmailForm.get('HighlightWork').value,
        clsd: this.updateEmailForm.get('CLSD').value,
        benefitTracking: this.updateEmailForm.get('BenefitTracking').value,
        fromDate: this.dateUtil.convertDateUTC(this.updateEmailForm.get('From').value).toDateString(),
        toDate: this.dateUtil.convertDateUTC(this.updateEmailForm.get('To').value).toDateString(),
    }).then(r => {
        this.performanceInactiveList = r as PerformanceInactiveModel[];
        this.pagiantionAssignment(this.performanceInactiveList.length);
    });
    //window.location.reload();
    //this.fetchPerfommanceInactiveList();
    //this.ngOnInit();
    //this.performanceInactiveList = [] as PerformanceInactiveModel[];
    //this.fetchPerfommanceInactiveList();
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
      // console.log(data);
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
      console.log(data);
      this.deleteRow = data;
      this.modalRef = this.modalService.show(template);

  }

  confirmDelete(): void {
      // this.message = 'Confirm';
      this.modalRef.hide();
      this.piService.DeleteInitiative(this.deleteRow.performanceInactiveId).then(r => {
          console.log(r);
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
      console.log('Log: ', event);
  }

  setForm(data, form) {
      console.log('data: ', data);
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
      console.log(form.value);
  }

  // Submit Add ew Excetion
  addNewException = (): void => {
      // const iniId = ['2020-000004', '2020-000003'];
      // console.log('deb: ', initiativesList);
      console.log('Idsssssssssss : ' , this.createEmailForm.get('InitiativeName').value);
      this.createEmailForm.get('InitiativeName').value.forEach(element => {
          console.log('fffffffffff ', element.code);
          this.dtLs.push(
              {
                  initiativeCode: element,
                  name: null,
                  projectEngineer: null,
                  poc: this.createEmailForm.get('POC').value,
                  outstandingItems: this.createEmailForm.get('OutstandingItems').value,
                  highlightWork: this.createEmailForm.get('HighlightWork').value,
                  clsd: this.createEmailForm.get('CLSD').value,
                  benefitTracking: this.createEmailForm.get('BenefitTracking').value,
                  fromDate: this.dateUtil.convertDateUTC(this.createEmailForm.get('From').value).toDateString(),
                  toDate: this.dateUtil.convertDateUTC(this.createEmailForm.get('To').value).toDateString(),
              } as PerformanceInactiveModel
          );
      });

      console.log('Packed Data => ', this.dtLs);
      this.piService.CreateNewExeption(
          this.dtLs
      );
      this.modalRef.hide();
      // this.ngOnInit();
      window.location.reload();
  }

  // Get Data by Period
  getByPeriod = (): void => {
      console.log('Incomming date: ', this.seletedDate);
      this.piService.GetInitiativeByPeriod(this.seletedDate).then((r) => {
          console.log('Result => ', r);
          this.performanceInactiveList = r as PerformanceInactiveModel[];
          this.pagiantionAssignment(this.performanceInactiveList.length);
      });
  }

  // Get initiative code
  getInitiativeCode = (): void => {
      this.piService.GetInitiativeCode().then((r) => {
          console.log('initiative code => ', r);
          this.initiativesList = r as [];
      });

  }

  SearchInitiative = (event?): void => {
    this.params.text = event.term?  event.term : '';
    this.piService.SearchInitiativeCode(this.params.text).then((r) => {
        console.log('initiative code => ', r);
        this.initiativesList = r as [];
    });

}


}
