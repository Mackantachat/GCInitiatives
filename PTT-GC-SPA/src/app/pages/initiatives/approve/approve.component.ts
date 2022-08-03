import { SubmitService } from '@services/submit/submit.service';
import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { Router } from '@angular/router';
import { AuthService } from '@services/authentication/auth.service';
import { ActionService } from '@services/action/action.service';
import { ResponseService } from '@errors/response/response.service';
import { SwalTool } from '@tools/swal.tools';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { StageService } from '@services/stage/stage.service';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { AuditService } from '@services/audit/audit.service';
import { InitiativeAttachmentComponent } from '@components/initiative-attachment/initiative-attachment.component';
import { async } from '@angular/core/testing';
import { DropDownData, Initiative } from '@models/initiative';
import { ValidateService } from '@services/validate/validate.service';
import { DetailService } from '@services/detail/detail.service';
import { MaxService } from '@services/max/max.service';
import { CapexService } from '@services/capex/capex.service';
import { CimService } from '@services/cim/cim.service';
import { DimService } from '@services/dim/dim.service';
import { PimService } from '@services/pim/pim.service';
import { CpiService } from '@services/cpi/cpi.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ApproveInitiativeComponent implements OnInit, OnDestroy, AfterContentChecked {

  //@ViewChild('AttachmentModalApprove', { static: false }) AttachmentModalApprove: ModalDirective;
  isTestLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private actionService: ActionService,
    private authService: AuthService,
    private submitService: SubmitService,
    private initiativeService: InitiativeService,
    private router: Router,
    private response: ResponseService,
    private swalTool: SwalTool,
    private stageService: StageService,
    private auditService: AuditService,
    private modalService: BsModalService,
    private cdref: ChangeDetectorRef,
    private validateService: ValidateService,
    private detailService: DetailService,
    private maxService: MaxService,
    private capexService: CapexService,
    private cimService: CimService,
    private dimService: DimService,
    private pimService: PimService,
    private cpiService: CpiService
  ) {
    setTimeout(() => {
      this.isTestLoading = true;
    }, 10000);
  }

  // isApprove: boolean = true;
  id: number;
  page: string;
  status: string;
  stage: string;
  username: string;
  updatedBy: string;
  pagePool = 'pool-view';
  statusView = 'true';

  approveForm = this.fb.group({ approver: null });

  submitForm = this.fb.group({
    status: 'approve',
    remark: null,
    secretProject: null,
    goToStage: null,
    sspim: null,
    username: null,
    updatedBy: null,
    switchProcessTo: null,
    createType: 2,
    overrideApproval: null
  });

  isApprove: any = false;

  ShowSecret = false;
  ShowGoToStage = false;
  ShowSSPIM = false;

  isCim = false;
  isMax = false;
  isCvcMA = false;
  isDivest = false;
  isITDigital = false;

  //temporary
  cvc: any = ['Pre-DD-1', 'DD-1', 'Execution-1', 'Commercial Operation-1', 'Lookback-1'];
  divest: any = ['Seeking Potential-1', 'DD-1', 'Execution-1', 'Closing-1', 'Lookback-1'];
  cim: any = ['Initiative-1', 'Prelim F/S', 'Detail F/S-1', 'BEP-1', 'Execution-1', 'Commercial Operation-1', 'Lookback-1'];

  projects: any = [];

  approver: any = [];

  owners: any = [];

  params: any = {};

  CancelCondition = false;
  ReasonforCancelCondition: string;

  Secret = false;
  initiativeType: any;
  nowStage: any;
  RequestPool = false;
  General = false;
  DisabledSubmit = false;

  ItDigital = false;

  isSwitchProcess = false;
  isSwitchProcessTo = false;
  switchProcessList: {
    name: string;
    value: string;
  }[] = [];


  isCreateType = false;
  isCheckedApprove = true;
  approveEdit = false;

  bsModalRef: BsModalRef;
  config: ModalOptions = {
    class: 'modal-xl'
  };
  newFeature: boolean;
  mailAccount: string;
  vacPicIndividual: boolean = false;
  vacApprove: boolean = false;
  picApprove: boolean = false;
  historyId: any;
  vacPicTitle: string = null;
  formGroup: FormGroup = new FormGroup({});

  isCapex: boolean = false;
  isCimAndStrategy: boolean = false;
  isDim: boolean = false;
  isPim: boolean = false;
  isCpi: boolean = false;

  get invalidSecretProject() {
    return this.submitForm.controls.secretProject.touched && this.submitForm.controls.secretProject.invalid;
  }

  get invalidGoToStage() {
    return this.submitForm.controls.goToStage.touched && this.submitForm.controls.goToStage.invalid;
  }

  get invalidRemark() {
    return this.submitForm.controls.remark.touched && this.submitForm.controls.remark.invalid;
  }

  get invalidSSPIM() {
    return this.submitForm.controls.sspim.touched && this.submitForm.controls.sspim.invalid;
  }



  ngOnInit(): void {
    ///////for test
    //this.vacPicIndividual = true;
    //this.vacApprove = true;
    //this.picApprove = true;
    /////////////
    if (!this.initiativeService.id) {
      this.router.navigate(['/initiative/overview']);
      return;
    }
    this.initiativeService.getNewFeature().subscribe((newFeatureRes) => {
      this.initiativeService.newFeature = newFeatureRes;
      this.newFeature = newFeatureRes;
    });
    this.mailAccount = this.initiativeService.username;
    this.id = this.initiativeService.id;
    this.page = this.initiativeService.page;
    this.approveEdit = this.initiativeService.approveEdit;
    this.SetApprove();
    //alert('approve');
    this.switchProcessList = this.initiativeService.switchProcessList.value;
   
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.initiativeService.setSwitchProcessList([] as DropDownData[]);
  }


  SetApprove() {
    this.initiativeService.GetInitiative(this.initiativeService.id).subscribe(response => {
      // let response: Initiative = this.initiativeService.generalData.value;
      this.isMax = response.max ? true : false;
      this.isCapex = response.directCapex ? true : false;
      this.isCimAndStrategy = response.cim || response.strategy ? true : false;
      this.isDim = response.dim ? true : false;
      this.isPim = response.pim ? true : false;
      this.isCpi = response.cpi ? true : false;
      let nowStage = response.flowType != 'initiative' ? response.subStage : response.stage;
      if (nowStage?.toUpperCase().indexOf("VAC") >= 0) {
        let stageSplite = nowStage.split(':');
        this.vacPicIndividual = true;
        this.vacApprove = true;
        this.vacPicTitle = ` /${stageSplite[1]}`;
        this.initiativeService.valiadteGate = nowStage.slice(-1);
      } else if (nowStage?.toUpperCase().indexOf("PIC") >= 0) {
        let stageSplite = nowStage.split(':');
        this.vacPicIndividual = true;
        this.picApprove = true;
        this.vacPicTitle = ` /${stageSplite[1]}`;
        this.initiativeService.valiadteGate = nowStage.slice(-1);
      } else {
        this.initiativeService.valiadteGate = null;
      }
      // this.actionService.GetSwitchProcessList(encodeURIComponent(response.initiativeType), encodeURIComponent(nowStage)).subscribe(listRes => {
      //   listRes.forEach((list) => {
      //     let val: {
      //       name: string;
      //       value: string;
      //     } = {
      //       name: list,
      //       value: list
      //     }
      //     this.switchProcessList.push(val);
      //   });
      // });
      if (response.status == 'wait for switch process') {
        this.isSwitchProcessTo = true;
        this.submitForm.controls.remark.clearValidators();
        this.submitForm.controls.remark.updateValueAndValidity();
        this.submitForm.controls.switchProcessTo.setValidators([Validators.required]);
        this.submitForm.controls.switchProcessTo.updateValueAndValidity();
        this.isCheckedApprove = true;
      }

      this.actionService.GetStageMaster('switch', response.initiativeType, nowStage).subscribe(res => {
        this.isSwitchProcess = res;
        //this.switchProcessList = [];
        //get switchProcessList

        //get switchProcessList
      });
      this.actionService.GetStageMaster('create', response.initiativeType, nowStage).subscribe(res => {
        this.isCreateType = res;
      });


      this.initiativeType = response.initiativeType;
      if (this.initiativeType === 'Request Pool') {
        this.RequestPool = true;
      } else {
        this.General = true;
      }
      this.updatedBy = response.updatedBy;


      const typeOfInvestment = ['CVC', 'M&A', 'Divestment'];
      const cvc = ['CVC', 'M&A'];
      if ((response.cim && response.stage == 'Admin Check' && response.status == 'wait for approval')) {
        this.Secret = true;
        this.ShowSecret = true;
        this.submitForm.controls.secretProject.setValidators([Validators.required]);
        this.submitForm.controls.secretProject.updateValueAndValidity();
        if (response.cim) { this.projects = this.cim; }
        if (cvc.indexOf(response.typeOfInvestment) !== -1) { this.projects = this.cvc; }
        if (response.typeOfInvestment === 'Divestment' || response.divestment) { this.projects = this.divest; }
      }


      this.status = response.status;
      this.stage = response.stage;
      // if (response.cim && this.stage == 'Admin Check' && this.status == 'wait for approval') {
      //   this.ShowSecret = true;
      // }
      if (this.status === 'wait for cancellation') {
        this.ReasonforCancelCondition = response.commentCancelled
        this.CancelCondition = true;
        this.submitForm.patchValue({ status: 'approve cancellation' });
      }

      // S-SP-IM
      //Detail F/S-3
      //Seeking Potential-3
      //Pre-DD-3
      // const SSPIM = ['Pre-DD-3', 'DD-3', 'Seeking Potential-3', 'Detail F/S-3', 'BEP-3', 'Commercial Operation-1', 'Commercial Operation-2', 'Commercial Operation-3', 'Closing-1', 'Closing-2', 'Closing-3', 'S-SP-IM DM-1', 'S-SP-IM DM-2'];

      if (response.cim && response.flowType == "initiative" && this.stageService.SSPIM.indexOf(response.stage) !== -1) {
        this.ShowSSPIM = true;
        this.GetOwners();
        this.submitForm.controls.sspim.setValidators([Validators.required]);
        this.submitForm.controls.sspim.updateValueAndValidity();
      } else if (response.cim && this.stageService.SSPIM.indexOf(response.subStage) !== -1) {
        this.ShowSSPIM = true;
        this.GetOwners();
        this.submitForm.controls.sspim.setValidators([Validators.required]);
        this.submitForm.controls.sspim.updateValueAndValidity();
      }

      this.SetUserApprove();

      if (['IT', 'Digital'].indexOf(response.initiativeType) !== -1) {
        this.ItDigital = true;
      }

    }, error => this.response.error(error));
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  GetOwners(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetOwners(this.params).subscribe(owners => {
      this.owners = owners;
    });
  }

  SearchOwnerName(event) {
    this.GetOwners(event.term);
  }

  ClearOwnerName() {
    this.GetOwners();
  }

  SetUserApprove() {
    switch (this.page) {
      case 'overview-approve':
        this.authService.getMsalUser().subscribe((user) => {
          if (user) {
            this.actionService.GetInitiativeAction(this.initiativeService.id).subscribe(approver => {
              if (approver && Object.keys(approver).length > 0) {
                this.approver = approver;
                this.approveForm.patchValue({ approver: this.approver[0].actionBy });
              }
            });
            this.username = user.mail;
            this.submitForm.patchValue({
              updatedBy: this.username,
              overrideApproval: this.username
            });
            this.isApprove = true;
          }
        });

        break;
      case 'approve':
        this.authService.getMsalUser().subscribe((user) => {
          if (user) {
            this.username = user.mail;
            this.submitForm.patchValue({ username: this.username });
            this.submitForm.patchValue({ updatedBy: this.username });
            this.CheckApprove();
          }
        });
        break;
      case 'approveEdit':
        this.authService.getMsalUser().subscribe((user) => {
          if (user) {
            this.username = user.mail;
            this.submitForm.patchValue({ username: this.username });
            this.submitForm.patchValue({ updatedBy: this.username });
            this.CheckApprove();
          }
        });
        break;
    }
  }

  CheckApprove() {
    this.submitService.CheckApprove(this.initiativeService.id, this.username).subscribe(result => this.isApprove = result);
  }

  OnChangeStatus(event) {
    const value = event.target.value;
    switch (value) {
      case 'approve':
        this.submitForm.controls.remark.clearValidators();
        this.submitForm.controls.remark.updateValueAndValidity();
        this.isCheckedApprove = true;
        this.isSwitchProcessTo = false;
        this.SetApprove();
        break;
      case 'revise':
        this.submitForm.controls.remark.setValidators([Validators.required]);
        this.submitForm.controls.remark.updateValueAndValidity();
        this.submitForm.controls.remark.markAsTouched();
        if (this.submitForm.get('secretProject')) {
          this.submitForm.controls.secretProject.clearValidators();
          this.submitForm.controls.secretProject.updateValueAndValidity();
          this.submitForm.controls.secretProject.setValue(null);
        }
        this.isCheckedApprove = false;
        this.ShowSecret = false;
        this.Secret = false;
        this.isSwitchProcessTo = false;
        if (this.submitForm.get('createType')) {
          this.submitForm.get('createType').setValue(null);
        }
        break;
      case 'reject':
        this.submitForm.controls.remark.setValidators([Validators.required]);
        this.submitForm.controls.remark.updateValueAndValidity();
        this.submitForm.controls.remark.markAsTouched();
        if (this.submitForm.get('secretProject')) {
          this.submitForm.controls.secretProject.clearValidators();
          this.submitForm.controls.secretProject.updateValueAndValidity();
          this.submitForm.controls.secretProject.setValue(null);
        }
        this.isCheckedApprove = false;
        this.ShowSecret = false;
        this.Secret = false;
        this.isSwitchProcessTo = false;
        if (this.submitForm.get('createType')) {
          this.submitForm.get('createType').setValue(null);
        }
        break;
      case 'approve cancellation':
        this.submitForm.controls.remark.clearValidators();
        this.submitForm.controls.remark.updateValueAndValidity();
        this.isCheckedApprove = false;
        this.isSwitchProcessTo = false;
        this.submitForm.get('switchProcessTo').setValue(null);
        if (this.submitForm.get('createType')) {
          this.submitForm.get('createType').setValue(null);
        }
        break;
      case 'reject cancellation':
        this.submitForm.controls.remark.setValidators([Validators.required]);
        this.submitForm.controls.remark.updateValueAndValidity();
        this.submitForm.controls.remark.markAsTouched();
        if (this.submitForm.get('createType')) {
          this.submitForm.get('createType').setValue(null);
        }
        break;
      case 'switch process':
        this.submitForm.controls.remark.clearValidators();
        this.submitForm.controls.remark.updateValueAndValidity();
        this.isCheckedApprove = false;
        if (this.submitForm.get('createType')) {
          this.submitForm.get('createType').setValue(null);
        }
        break;
    }
  }
  OnChangeStatusVacApprove(event) {
    const value = event.target.value;
    switch (value) {
      case 'approve':
        //pass
        this.submitForm.controls.remark.clearValidators();
        this.submitForm.controls.remark.updateValueAndValidity();
        this.submitForm.controls.remark.markAsTouched();
        this.submitForm.controls.switchProcessTo.clearValidators();
        this.submitForm.controls.switchProcessTo.updateValueAndValidity();
        this.submitForm.controls.switchProcessTo.markAsTouched();
        this.isCheckedApprove = true;
        this.isSwitchProcessTo = false;
        this.SetApprove();
        break;
      case 'approveSwitchProcess':
        //switch process
        this.isSwitchProcessTo = true;
        this.submitForm.controls.remark.clearValidators();
        this.submitForm.controls.remark.updateValueAndValidity();
        this.submitForm.controls.remark.markAsTouched();
        this.submitForm.controls.switchProcessTo.setValidators([Validators.required]);
        this.submitForm.controls.switchProcessTo.updateValueAndValidity();
        this.submitForm.controls.switchProcessTo.markAsTouched();
        break;
      case 'revise':
        //not pass
        //leave
        this.submitForm.controls.remark.setValidators([Validators.required]);
        this.submitForm.controls.remark.updateValueAndValidity();
        this.submitForm.controls.remark.markAsTouched();
        this.submitForm.controls.switchProcessTo.clearValidators();
        this.submitForm.controls.switchProcessTo.updateValueAndValidity();
        this.submitForm.controls.switchProcessTo.markAsTouched();
        if (this.submitForm.get('secretProject')) {
          this.submitForm.controls.secretProject.clearValidators();
          this.submitForm.controls.secretProject.updateValueAndValidity();
          this.submitForm.controls.secretProject.setValue(null);
        }
        this.isCheckedApprove = false;
        this.ShowSecret = false;
        this.Secret = false;
        this.isSwitchProcessTo = false;
        if (this.submitForm.get('createType')) {
          this.submitForm.get('createType').setValue(null);
        }
        break;
      case 'reject':
        //move back
        this.submitForm.controls.switchProcessTo.clearValidators();
        this.submitForm.controls.switchProcessTo.updateValueAndValidity();
        this.submitForm.controls.switchProcessTo.markAsTouched();
        this.submitForm.controls.remark.setValidators([Validators.required]);
        this.submitForm.controls.remark.updateValueAndValidity();
        this.submitForm.controls.remark.markAsTouched();
        if (this.submitForm.get('secretProject')) {
          this.submitForm.controls.secretProject.clearValidators();
          this.submitForm.controls.secretProject.updateValueAndValidity();
          this.submitForm.controls.secretProject.setValue(null);
        }
        this.isCheckedApprove = false;
        this.ShowSecret = false;
        this.Secret = false;
        this.isSwitchProcessTo = false;
        if (this.submitForm.get('createType')) {
          this.submitForm.get('createType').setValue(null);
        }
        break;
      case 'approve cancellation':
        //cancel
        this.submitForm.controls.switchProcessTo.clearValidators();
        this.submitForm.controls.switchProcessTo.updateValueAndValidity();
        this.submitForm.controls.switchProcessTo.markAsTouched();
        this.submitForm.controls.remark.setValidators([Validators.required]);
        this.submitForm.controls.remark.updateValueAndValidity();
        this.submitForm.controls.remark.markAsTouched();
        this.isCheckedApprove = false;
        this.isSwitchProcessTo = false;
        this.submitForm.get('switchProcessTo').setValue(null);
        if (this.submitForm.get('createType')) {
          this.submitForm.get('createType').setValue(null);
        }
        break;
      case 'reject cancellation':
        this.submitForm.controls.switchProcessTo.clearValidators();
        this.submitForm.controls.switchProcessTo.updateValueAndValidity();
        this.submitForm.controls.switchProcessTo.markAsTouched();
        this.submitForm.controls.remark.setValidators([Validators.required]);
        this.submitForm.controls.remark.updateValueAndValidity();
        this.submitForm.controls.remark.markAsTouched();
        if (this.submitForm.get('createType')) {
          this.submitForm.get('createType').setValue(null);
        }
        break;
      case 'switch process':
        this.isSwitchProcessTo = true;
        this.submitForm.controls.remark.clearValidators();
        this.submitForm.controls.remark.updateValueAndValidity();
        this.submitForm.controls.remark.markAsTouched();
        this.submitForm.controls.switchProcessTo.setValidators([Validators.required]);
        this.submitForm.controls.switchProcessTo.updateValueAndValidity();
        break;
    }
  }
  OnChangeStatusSwitchProcess(event) {
    const value = event.target.value;
    switch (value) {
      case 'approve':
        this.submitForm.controls.remark.clearValidators();
        this.submitForm.controls.remark.updateValueAndValidity();
        this.submitForm.controls.switchProcessTo.setValidators([Validators.required]);
        this.submitForm.controls.switchProcessTo.updateValueAndValidity();
        this.submitForm.controls.switchProcessTo.markAsTouched();
        this.isCheckedApprove = true;
        break;
      case 'reject':
        this.submitForm.controls.remark.setValidators([Validators.required]);
        this.submitForm.controls.remark.updateValueAndValidity();
        this.submitForm.controls.remark.markAsTouched();
        this.submitForm.controls.switchProcessTo.clearValidators();
        this.submitForm.controls.switchProcessTo.updateValueAndValidity();
        if (this.submitForm.get('createType')) {
          this.submitForm.get('createType').setValue(null);
        }
        break;
    }
  }

  OnChangeSecret(event) {
    const value = event.target.value;
    switch (value) {
      case 'yes':
        this.ShowGoToStage = true;
        this.submitForm.controls.goToStage.setValidators([Validators.required]);
        this.submitForm.controls.goToStage.updateValueAndValidity();
        break;
      case 'no':
        this.ShowGoToStage = false;
        this.submitForm.controls.goToStage.clearValidators();
        this.submitForm.controls.goToStage.updateValueAndValidity();
        this.submitForm.controls.goToStage.setValue(null);
        break;
    }
  }

  OverviewApprove() {
    if (this.submitForm.invalid) {
      this.swalTool.Required();
      return;
    }

    //check validate
    if (this.vacPicIndividual || this.approveEdit) {

      if (!this.validateService.SubmitValidation(this.initiativeService.formGroup.value as FormGroup)) {
        return;
      }

      //add approveForm
      this.formGroup = this.initiativeService.formGroup.value as FormGroup;
      if (!this.formGroup.get('approveForm')) {
        this.formGroup.addControl('approveForm', this.approveForm);
      }
      if (!this.formGroup.get('submitApproveForm')) {
        this.formGroup.addControl('submitApproveForm', this.submitForm);
      }


      this.auditService.CallFullLog(this.initiativeService.id).then(fullLogRespond => {
        this.auditService.historyId = fullLogRespond;
        this.historyId = fullLogRespond;
      });

      this.editPageDarftAndSubmitForm('approveEdit');

    } else {
      this.submitService.CheckApprove(this.initiativeService.id, this.approveForm.controls.approver.value).subscribe(async result => {
        if (result) {

          await this.auditService.CallFullLog(this.initiativeService.id).then(fullLogRespond => {
            this.auditService.historyId = fullLogRespond;
            this.historyId = fullLogRespond;
          });

          this.initiativeService.PutUpdateByUser(this.initiativeService.id).then(async (response) => {


            // if (this.submitForm.get('status').value == 'switch process') {
            //   this.submitService.ActionSwitchProcess(this.initiativeService.id, this.submitForm.value).subscribe(async () => {
            //     await this.auditService.CallAuditLog(this.initiativeService.id);
            //     this.swalTool.Approved();
            //   }, error => this.response.error(error));
            // } else {
            this.submitService.ActionSubmit(this.initiativeService.id, this.submitForm.value).toPromise()
              .then(async () => {
                await this.auditService.CallAuditLog(this.initiativeService.id, this.historyId);
              })
              .catch((error) => {
                this.response.error(error)
              })
              .finally(() => {
                this.swalTool.Approved();
                window.close();
              })
            // }
          });
        } else {
          Swal.fire({
            title: 'This initiative was retreated for revision!',
            html: 'Please refresh your My Tasks and approve this initiative later.',
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'Ok',
          }).then((res) => {
            if (res.value) {
              this.router.navigate(['/initiative/my-tasks']);
            }
          });
        }
      });
    }
  }

  SubmitApprove() {
    this.submitService.CheckApprove(this.initiativeService.id, this.username).subscribe(async result => {
      if (result) {
        //check validate
        if (this.vacPicIndividual || this.approveEdit) {

          if (!this.validateService.SubmitValidation(this.initiativeService.formGroup.value as FormGroup)) {
            return;
          }

          //add approveForm
          this.formGroup = this.initiativeService.formGroup.value as FormGroup;
          if (!this.formGroup.get('approveForm')) {
            this.formGroup.addControl('approveForm', this.approveForm);
          }
          if (!this.formGroup.get('submitApproveForm')) {
            this.formGroup.addControl('submitApproveForm', this.submitForm);
          }


          this.auditService.CallFullLog(this.initiativeService.id).then(fullLogRespond => {
            this.auditService.historyId = fullLogRespond;
            this.historyId = fullLogRespond;
          });

          this.editPageDarftAndSubmitForm('approveEdit');

        } else {

          await this.auditService.CallFullLog(this.initiativeService.id).then(fullLogRespond => {
            this.auditService.historyId = fullLogRespond;
            this.historyId = fullLogRespond
          });

          this.initiativeService.PutUpdateByUser(this.initiativeService.id).then(async (response) => {
            this.submitService.ActionSubmit(this.initiativeService.id, this.submitForm.value).toPromise()
              .then(async () => {
                await this.auditService.CallAuditLog(this.initiativeService.id, this.historyId);
              })
              .catch((error) => {
                this.response.error(error)
              })
              .finally(() => {
                this.swalTool.Approved();
                window.close();
              })
          });
        }

      } else {
        Swal.fire({
          title: 'This initiative was retreated for revision!',
          html: 'Please refresh your My Tasks and approve this initiative later.',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'Ok',
        }).then((res) => {
          if (res.value) {
            this.router.navigate(['/initiative/my-tasks']);
          }
        });
      }
    });
  }

  editPageDarftAndSubmitForm(saveType: string) {
    if (this.isMax) {
      this.maxService.SaveDraftSubmit(this.formGroup, saveType, this.historyId);
    } else if (this.isCapex) {
      this.capexService.SaveDraftSubmit(this.formGroup, saveType, this.historyId);
    } else if (this.isCimAndStrategy) {
      this.cimService.SaveDraftAndSubmit(this.formGroup, saveType, this.historyId);
    } else if (this.isDim) {
      this.dimService.saveDraftSubmitDim(this.formGroup, saveType, this.historyId);
    } else if (this.isPim) {
      this.pimService.SaveDraftSubmitPim(this.formGroup, saveType, this.historyId);
    } else if (this.isCpi) {
      this.cpiService.SaveDraftSubmitCpi(this.formGroup, saveType, this.historyId);
    } else {
      this.swalTool.savingLoading('draft');
      this.initiativeService.SavingData = true;
      this.initiativeService.UpdateDraftInitiative(this.initiativeService.id, (this.formGroup.get('initiativesForm') as FormGroup).getRawValue()).subscribe(response => {
        if (this.formGroup.get('initiativesForm').get('coDeveloper').value) {
          this.initiativeService.UpdateCoDeveloper(response.id, this.formGroup.get('initiativesForm').get('coDeveloper').value).subscribe(() => {
            this.initiativeService.SavingData = false;
            this.swalTool.Draft();
          });
        } else {
          this.initiativeService.SavingData = false;
          this.swalTool.Draft();
        }
      });
    }
  }

  SetButton() {
    this.DisabledSubmit = true;
    this.swalTool.approveLoading();
    setTimeout(() => this.DisabledSubmit = false, 10000);
  }

  OnSubmit() {
    this.submitForm.markAllAsTouched();
    if (this.page === 'overview-approve') { this.submitForm.patchValue({ username: this.approveForm.controls.approver.value }); }
    if (this.Secret) {
      this.submitForm.controls.secretProject.markAsTouched();
      this.submitForm.controls.goToStage.markAsTouched();
    }
    if (this.ShowSSPIM) {
      this.submitForm.controls.sspim.markAsTouched();
    }
    if (this.submitForm.valid) {
      if (this.submitForm.controls.status.value === 'reject') {
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to reject this initiative!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.value) {
            switch (this.page) {
              case 'overview-approve': this.OverviewApprove(); break;
              default:
                this.SubmitApprove(); break;
            }
          }
        });
      } else {
        this.SetButton();
        switch (this.page) {
          case 'overview-approve': this.OverviewApprove(); break;
          default:
            this.SubmitApprove(); break;
        }
      }
    } else {
      this.swalTool.Required();
      this.submitForm.controls.remark.markAsTouched();
    }
  }

  UpperCaseReplaceStage(stage: string) {
    return stage.replace(/(\-\d)/g, '').toUpperCase();
  }

  ShowAttachmentApprove() {
    const overrideConfig = this.config;
    if (this.initiativeService.SubmitDone) {
      return;
    }
    if (this.initiativeService.id) {
      overrideConfig.initialState = { initiativeId: this.initiativeService.id,approveEdit:this.approveEdit };
      this.modalService.show(InitiativeAttachmentComponent, overrideConfig);
    } else {
      this.swalTool.InitiativeNotFound();
    }
  }

  // CloseAttachmentApprove() {
  //   this.AttachmentModalApprove.hide();
  // }

  GetId() {
    return this.initiativeService.id;
  }
  getSwitchProcessList() {
    return this.switchProcessList;
  }

  // get newFeature() {
  //   return this.initiativeService.newFeature;
  // }
}
