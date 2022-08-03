import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { AuthService } from '@services/authentication/auth.service';
import { DateUtil } from '@utils/date.utils';
import { ResponseService } from '@errors/response/response.service';
import { SwalTool } from '@tools/swal.tools';
import { InitiativeService } from './../../core/services/initiative/initiative.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ValidateService } from '@services/validate/validate.service';
import { PoolService } from '@services/pool/pool.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusService } from '@services/status/status.service';
import { SubmitService } from '@services/submit/submit.service';
import { AuditService } from '@services/audit/audit.service';
import { InitiativeAttachmentComponent } from '@components/initiative-attachment/initiative-attachment.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AttachmentService } from '@services/attachment/attachment.service';
import { SettingServiceService } from '@services/settingService/setting-service.service';

@Component({
  selector: 'app-pool-main-form',
  templateUrl: './pool-main-form.component.html',
  styleUrls: ['./pool-main-form.component.css']
})
export class PoolMainFormComponent implements OnInit, OnDestroy {
  @Input() isApprove: boolean;

  tabGeneralValid: boolean;
  tabDetailValid: boolean;
  tabCapexValid: boolean;
  type: string;
  page: string;
  id: any;
  dateRegister: any;
  createdBy: any;
  username: string

  formGroup: FormGroup;
  submitToForm: FormGroup;
  title: string;

  CheckSubmitTo: boolean;
  Comment: boolean;
  SuggestStatusMain: boolean;

  //approve
  approveAdmin: boolean;

  SavingData: boolean = false;
  bsModalRef: BsModalRef;
  config: ModalOptions = {
    class: 'modal-xl'
  };

  historyId: any;
  IsFileAttach: boolean;

  constructor(
    private swalTool: SwalTool,
    private initiativeService: InitiativeService,
    private validateService: ValidateService,
    private response: ResponseService,
    private dateUtil: DateUtil,
    private authService: AuthService,
    private unauthorized: UnauthorizedService,
    private poolService: PoolService,
    private router: Router,
    private statusService: StatusService,
    private activeRoute: ActivatedRoute,
    private submitService: SubmitService,
    private auditService: AuditService,
    private modalService: BsModalService,
    private attachmentService: AttachmentService,

  ) {
    this.activeRoute.data.subscribe(data => {
      this.title = data.flag;
    });
  }

  ngOnInit(): void {
    // this.settingService.GetInitiativeSetting().then((settingResponse) => {
    //   if (settingResponse) {
    //     this.settingService.setSettingData(settingResponse);
    //   }
    // });

    if (this.title && this.title == 'View') {
      this.initiativeService.viewMode = true;
    }

    this.formGroup = new FormGroup({});
    this.page = this.initiativeService.page;

    this.type = 'draft';
    if ((!this.initiativeService.id && this.page != 'pool-create') || this.page == null) {
      this.router.navigate(['/initiative/my-own']);
    } else {
      if (!this.isApprove && this.title != 'View') {
        this.initSubmitForm();
      }
      this.init();
    }
    this.page = (this.initiativeService.id != null && this.initiativeService.id > 0) ? 'pool-edit' : 'pool-create';
    this.GetUser();
  }

  ngOnDestroy() {
    this.initiativeService.isAddmore = false;
    this.initiativeService.isReturn = false;
    this.initiativeService.isRevise = false;
    this.validateService.inValidtab = [];
    this.initiativeService.isCancel = false;
    this.initiativeService.isUtilityOtherRequire = false;
    this.initiativeService.SubmitDone = false;
  }

  init() {
    if (this.page != 'pool-create') {
      this.initiativeService.GetSuggestStatus(this.initiativeService.id).subscribe(response => {
        if (response) {
          this.initiativeService.suggestionStatus = response;
          //check for approve
          const check = { status: response.status, stage: response.stage };
          this.statusService.CheckInitiativeDetail(check).subscribe(result => {
            this.approveAdmin = result;
            // if (response.status !== 'add more' && this.CapexType_ != "AddmoreCapex") {
            //   this.ApproveCapex = this.Capex ? true : false;
            // } else {
            //   this.AddMoreCapex = true;
            // }
          });

          if (!this.isApprove && this.title != 'View') {
            this.statusService.CheckSubmitTo(check).subscribe(result => {
              this.CheckSubmitTo = result;
              if (response.strategy && response.stage == "Initiative-1") {
                this.submitToForm.patchValue({ status: "updateprogress" });
              } else {
                this.submitToForm.patchValue({ status: "forward" });
              }
            });
          } else {
            this.formGroup.disable();
          }

        }
        // else {
        //   this.router.navigate(['/initiative/my-own']);
        // }
        this.attachmentService.GetAttachment(this.initiativeService.id).subscribe(response => {
          let attachements = response;
          if (attachements) {
            this.IsFileAttach = true;
          }
          else {
            this.IsFileAttach = false;
          }
        });
      });
    }


  }

  get viewMode(): boolean {
    return this.initiativeService.viewMode;
  }

  initSubmitForm() {
    if (!this.formGroup.get('submitToForm')) {
      this.submitToForm = new FormGroup({});
      this.submitToForm.addControl('status', new FormControl(null));
      this.submitToForm.addControl('username', new FormControl(this.initiativeService.username));
      this.submitToForm.addControl('commentCancelled', new FormControl(null));
      this.formGroup.addControl('submitToForm', this.submitToForm);
    }
  }

  GetId() {
    return this.initiativeService.id;
  }

  getInitiativeName() {
    return this.initiativeService.initiativeName;
  }

  validateTabs(tabName: string) {
    if (this.validateService.inValidtab.findIndex((v) => v.tabName == tabName) >= 0) {
      return true;
    } else {
      return false;
    }
  }


  CheckFormValidation() {
    this.tabGeneralValid = this.formGroup.get('initiativesForm') && this.formGroup.get('initiativesForm').invalid;
    this.tabDetailValid = this.formGroup.get('detailForm') && this.formGroup.get('detailForm').invalid;
    this.tabCapexValid = this.formGroup.get('capexInformationForm') && this.formGroup.get('capexInformationForm').invalid;
  }

  async Draft() {
    if (this.initiativeService.SubmitDone || this.initiativeService.SavingData) {
      return;
    }
    if (this.page == 'pool-create' && !this.validateService.checkInitiativeName(this.formGroup.get('initiativesForm') as FormGroup)) {
      this.formGroup.get('initiativesForm').get('name').markAsTouched();
      this.swalTool.RequireInitiativeName();
    } else {
      if (!this.initiativeService.id) {
        //create draft
        this.initiativeService.CreateDraftInitiative(this.formGroup.get('initiativesForm').value).subscribe((createDraftInitiativeResponse) => {
          if (createDraftInitiativeResponse) {
            this.initiativeService.id = createDraftInitiativeResponse.id;
            this.initiativeService.initiativeCode = createDraftInitiativeResponse.initiativeCode;
            this.poolService.SaveAllData(this.formGroup, 'Draft', "");
          }
        }, error => {
          // this.errors = error;
          this.swalTool.Error(error);
        });
      } else {
        //update draft
        // await this.auditService.CallFullLog(this.initiativeService.id).then(fullLogRespond => {
        //   this.auditService.historyId = fullLogRespond;
        //   this.historyId = fullLogRespond;
        // });
        this.initiativeService.UpdateDraftInitiative(this.initiativeService.id, this.formGroup.get('initiativesForm').value).subscribe((updateDraftInitiativeResp) => {
          if (updateDraftInitiativeResp) {
            this.poolService.SaveAllData(this.formGroup, 'Draft', "");
          }
        }, error => {
          // this.errors = error;
          this.swalTool.Error(error);
        });
      }
    }
  }

  async Submit() {
    if (this.initiativeService.SubmitDone || this.initiativeService.SavingData) {
      return;
    }

    if (this.formGroup.get('submitToForm').get('status').value == 'cancelled') {
      if (!this.formGroup.get('submitToForm').get('commentCancelled').value) {
        this.formGroup.get('submitToForm').get('commentCancelled').setValidators([Validators.required]);
        this.formGroup.get('submitToForm').get('commentCancelled').updateValueAndValidity();
        this.formGroup.get('submitToForm').markAllAsTouched();
        this.swalTool.Required();
        return;
      } else {
        this.formGroup.get('submitToForm').get('commentCancelled').clearValidators();
        this.formGroup.get('submitToForm').get('commentCancelled').updateValueAndValidity();
      }
      //กด cancel แล้วจะไม่ติด validate
      this.swalTool.savingLoading('Cancel');
      await this.auditService.CallFullLog(this.initiativeService.id).then(fullLogRespond => {
        this.auditService.historyId = fullLogRespond;
        this.historyId = fullLogRespond;
      });
      this.submitService.SubmitStageStatus(this.initiativeService.id, this.formGroup.get('submitToForm').value).subscribe(async () => {
        await this.initiativeService.PutUpdateByUser(this.initiativeService.id);
        await this.auditService.CallAuditLog(this.initiativeService.id, this.historyId);
        this.initiativeService.SubmitDone = true;
        this.initiativeService.SavingData = false;
        this.swalTool.Submit();
      }, error => {
        this.initiativeService.SubmitDone = false;
        this.initiativeService.SavingData = false;
        this.swalTool.saveError();
      });
    } else if (this.validateService.SubmitRequestPoolValidation(this.formGroup)) {
      if (!this.initiativeService.id) {
        //cerate submit
        this.initiativeService.CreateSubmitInitiative(this.formGroup.get('initiativesForm').value).subscribe((createSubmitResponse) => {
          if (createSubmitResponse) {
            this.initiativeService.id = createSubmitResponse.id;
            this.poolService.SaveAllData(this.formGroup, 'Submit', this.historyId);
          }
        }, error => {
          // this.errors = error;
          this.swalTool.Error(error);
        });
      } else {
        await this.auditService.CallFullLog(this.initiativeService.id).then(fullLogRespond => {
          this.auditService.historyId = fullLogRespond;
          this.historyId = fullLogRespond;
        });
        this.initiativeService.UpdateSubmitInitiative(this.initiativeService.id, this.formGroup.get('initiativesForm').value).subscribe((updateSubmitResponse) => {
          if (updateSubmitResponse) {
            this.poolService.SaveAllData(this.formGroup, 'Submit', this.historyId);
          }
        }, error => {
          // this.errors = error;
          this.swalTool.Error(error);
        });
      }
    } else {
      this.formGroup.markAllAsTouched();
      this.CheckFormValidation();
      this.swalTool.Required();
    }
  }



  SetForm() {
    this.formGroup.get('initiativesForm').patchValue({
      registeringDate: this.dateRegister ? this.dateRegister : this.dateUtil.SetDate(new Date()),
      createdBy: this.createdBy ? this.createdBy : this.username
    });
  }

  GetUser() {
    this.authService.getMsalUser().subscribe((response) => {
      this.username = response.mail;
    }, error => this.unauthorized.error(error));
  }

  OnChangeStatus() {
    if (this.formGroup.get('submitToForm').get('status')) {
      switch (this.formGroup.get('submitToForm').get('status').value) {
        case 'cancelled':
          this.Comment = true;
          this.formGroup.get('submitToForm').get('commentCancelled').setValidators([Validators.required]);
          this.formGroup.get('submitToForm').get('commentCancelled').updateValueAndValidity();
          break;
        case 'backward':
        case 'forward':
          this.Comment = false;
          this.formGroup.get('submitToForm').get('commentCancelled').clearValidators();
          this.formGroup.get('submitToForm').get('commentCancelled').updateValueAndValidity();
          this.formGroup.get('submitToForm').get('commentCancelled').markAsUntouched();
          break;
      }
    }
  }

  Duplicate() {
    if (this.initiativeService.SubmitDone) {
      return;
    }
    this.swalTool.Duplicating();
    this.initiativeService.DuplicateInitiative().subscribe((responseId: number) => {
      if (responseId != 0) {
        this.swalTool.DuplicateSuccess(responseId);
      } else {
        this.swalTool.Error('Duplicating initiative failed.')
      }
    },
      error => {
        this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
      }
    )
  }

  Print() {
    if (this.initiativeService.SubmitDone) {
      return;
    }
    this.swalTool.Printing();
    this.initiativeService.GetPrintData().subscribe((r: any) => {
      if (r.type !== 'text/plain') {
        const blob = new Blob([r]);
        const saveAs = require('file-saver');
        const file = this.initiativeService.initiativeCode + '.xlsx';
        saveAs(blob, file);
        this.swalTool.PrintSuccess();
      } else {
        this.swalTool.Error('No data found.');
      }
    },
      error => {
        if (error.status == 500) {
          this.swalTool.Error((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error')
        } else {
          this.swalTool.Error('Download cannot be completed. Reason: High Traffic. Please try again after 10 minutes.')
        }
      });
  }

  get GetInitiativeCode() {
    return this.initiativeService.initiativeCode;
  }

  ShowAttachment() {

    const overrideConfig = this.config;
    if (this.initiativeService.SubmitDone) {
      return;
    }
    if (this.initiativeService.id) {
      overrideConfig.initialState = { initiativeId: this.initiativeService.id };
      this.modalService.show(InitiativeAttachmentComponent, overrideConfig);
    } else {
      this.swalTool.InitiativeNotFound();
    }
  }

}
