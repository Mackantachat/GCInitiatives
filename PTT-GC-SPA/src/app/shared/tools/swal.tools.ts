import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InitiativeService } from '@services/initiative/initiative.service';

@Injectable({
  providedIn: 'root'
})
export class SwalTool {

  constructor(
    private router: Router,
    private initiativeService: InitiativeService,
    private activatedRoute: ActivatedRoute
  ) { }

  SetTimeSubmit = 1500;
  SetTimeSuggestion = 1400;

  LowlevelRam() {
    let textAlert = 'Invalid Ram Criteria';
    Swal.fire({
      icon: 'error',
      title: 'Invalid!',
      html: textAlert,
      showConfirmButton: true,
      timer: this.SetTimeSubmit
    });
  }

  InitiativeTypeError() {
    let textAlert = 'Invalid Suggestion';
    Swal.fire({
      icon: 'error',
      title: 'Invalid!',
      html: textAlert,
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
  }

  CalculateIrrError() {
    let textAlert = 'Invalid Condition For Calculate IRR';
    Swal.fire({
      icon: 'error',
      title: 'Invalid!',
      html: textAlert,
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
  }

  CalculateRamError() {
    let textAlert = 'Invalid Condition For Calculate Ram';
    Swal.fire({
      icon: 'error',
      title: 'Invalid!',
      html: textAlert,
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
  }

  CalculateJFactorError() {
    let textAlert = 'Invalid Condition For Calculate JFactor';
    Swal.fire({
      icon: 'error',
      title: 'Invalid!',
      html: textAlert,
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
  }

  savingLoading(saveType: string) {
    let timerInterval
    Swal.fire({
      title: 'Saving Data!',
      html: 'Saving ' + saveType + ' data...',
      timer: 180000,
      timerProgressBar: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Swal.getTimerLeft().toString();
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      this.initiativeService.LoadingTimeout = true;
      Swal.fire({
        icon: 'error',
        title: 'Save ' + saveType + ' Timeout. Please Try Again',
        html: 'Save Timeout!',
        showConfirmButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Back to My Own'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/initiative/my-own'])
        }
      });
    });
  }

  approveLoading() {
    let timerInterval
    Swal.fire({
      title: 'Approve Data!',
      html: ' Data is Approving...',
      timer: 180000,
      timerProgressBar: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Swal.getTimerLeft().toString();
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      this.initiativeService.LoadingTimeout = true;
      Swal.fire({
        icon: 'error',
        title: 'Approval Timeout. Please Try Again',
        html: 'Approval Timeout!',
        showConfirmButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Back to My Own'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/initiative/my-own'])
        }
      });
    });
  }

  VacPicSubmit(type: string) {
    let textAlert = 'Submit ' + type.toUpperCase() + ' Successfully';
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: textAlert,
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
    if (type == 'vac') {
      setTimeout(() => this.router.navigate(['/vac-manager']), 2000);
    } else {
      setTimeout(() => this.router.navigate(['/pic-manager']), 2000);
    }
  }

  VacPicSubmitError(type: string) {
    let textAlert = 'Submit ' + type.toUpperCase() + ' Error';
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: textAlert,
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
  }

  Submit() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Submit Successfully',
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
    setTimeout(() => this.router.navigate(['/initiative/my-own']), 2000);
  }

  SubmitWithSAP() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Submit Successfully and Complete send data to SAP!!!',
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
    setTimeout(() => this.router.navigate(['/initiative/my-own']), 2000);
  }

  SubmitRequestCapex() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Submited Request CAPEX',
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
    setTimeout(() => this.router.navigate(['/initiative/capex/' + this.initiativeService.id]), 2000);
  }


  SubmitRequestCapexNewStructure(id: number) {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Submited Request CAPEX',
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
    const queryParams: Params = { gotoId: id, gotoPage: 'edit' };
    //initiativeredirector?gotoId=28740&gotoPage=edit
    setTimeout(() => this.router.navigate(['/initiative/initiativeredirector'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    }), 2000);

  }


  SubmitNewEngine() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Submit Successfully',
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
  }

  Approved() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Submit Successfully',
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
    setTimeout(() => this.router.navigate(['/initiative/my-tasks']), 1500);
  }

  Draft() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Draft saved successfully.',
      showConfirmButton: false,
      timer: this.SetTimeSubmit,
      allowOutsideClick: false
    });
  }

  DraftWithSAP() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Save successfully and Complete send data to SAP!!!',
      showConfirmButton: false,
      timer: this.SetTimeSubmit,
      allowOutsideClick: false
    });
  }

  Impact() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Saved Next Impact Tracking',
      showConfirmButton: false,
      timer: this.SetTimeSubmit,
      allowOutsideClick: false
    });
  }

  DetailCimStrategy() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Saved Next Detail Information (Cim) & (Strategy)',
      showConfirmButton: false,
      timer: this.SetTimeSubmit,
      allowOutsideClick: false
    });
  }

  DetailMax() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Saved Next Detail Information (Max)',
      showConfirmButton: false,
      timer: this.SetTimeSubmit,
      allowOutsideClick: false
    });
  }

  DetailDirect() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Saved Next Detail Information (Request CAPEX)',
      showConfirmButton: false,
      timer: this.SetTimeSubmit,
      allowOutsideClick: false
    });
  }

  Success() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Saved Successfully',
      showConfirmButton: false,
      timer: this.SetTimeSubmit,
      allowOutsideClick: false
    });
  }

  Copied() {
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      html: 'Copy Successfully',
      showConfirmButton: false,
      timer: this.SetTimeSubmit,
      allowOutsideClick: false
    });
  }

  Delete() {
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      html: 'Your file has been deleted.',
      showConfirmButton: false,
      timer: 1500
    });
  }

  DeleteInitiative() {
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      html: 'Your has been deleted.',
      showConfirmButton: false,
      timer: 1500
    });
  }

  DeleteInitiativeNew() {
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      html: 'Your has been deleted.',
      showConfirmButton: false,
      timer: 1000
    });
    setTimeout(() => this.router.navigate(['/initiative/my-own']), 500);
  }

  NoCase() {
    setTimeout(() => {
      Swal.fire({ icon: 'error', title: 'The criteria are not met', text: 'not recommended to invest' });
    }, this.SetTimeSuggestion);
  }

  Error(message) {
    // if (message.indexOf("401 OK") != -1) {
    //   setTimeout(() => {
    //     message = "Need re-login";
    //     Swal.fire({ icon: 'info', title: 'Info', text: message, footer: 'Please Logout and Login Again' });
    //   }, 1500);
    // }
    // else {
    //   setTimeout(() => {
    Swal.fire({ icon: 'error', title: 'Error!', text: message, footer: 'Please Contact Admin' });
    //   }, 1500);
    // }

  }

  saveError() {
    Swal.fire({ icon: 'error', title: 'Error!', text: 'Save Error', footer: 'Please Contact Admin' });
  }

  Required() {
    Swal.fire({ icon: 'error', title: 'Required!', text: 'Please fill out all require fields.' });
  }
  RequireInitiativeName() {
    Swal.fire({ icon: 'error', title: 'Required!', text: 'Please fill Initiative Name.' });
  }

  RequiredComment() {
    Swal.fire({ icon: 'error', title: 'Required!', text: 'Please fill out all require comment.' });
  }

  RequiredTab(tab) {
    Swal.fire({ icon: 'error', title: 'Required!', html: 'Please fill out all require <p class="text-danger">' + tab + '</p>' });
  }

  FileNotFound() {
    Swal.fire({ icon: 'error', title: 'NotFound!', text: 'File not found in Blob.' });
  }

  InitiativeNotFound() {
    Swal.fire({ icon: 'error', text: 'Please save draft before upload file.' });
  }

  SendMail() {
    setTimeout(() => {
      Swal.fire({ icon: 'info', title: 'Info', text: 'This Initiative is not qualify, please contact ideamanisupport@pttgcgroup.com' });
    }, this.SetTimeSuggestion);
  }

  WaitingDev() {
    Swal.fire({ icon: 'info', title: 'Info', text: 'Waiting Developing' });
  }

  Message(text) {
    Swal.fire('Oops...!', text, 'error');
  }

  SumPercent() {
    Swal.fire('Oops...!', 'Percent is Over 100%', 'error');
  }

  UnderPercent() {
    Swal.fire('Oops...!', 'Percent is Under 100%', 'error');
  }

  UnderPercentImpact() {
    Swal.fire({
      title: 'Oops...!',
      icon: 'error',
      html: 'Percent is Under 100% <br><br> <p class="text-danger"> Impact Tracking Tab </p>',
      showCloseButton: true,
    });
  }

  DateValid() {
    Swal.fire('Finish Date is invalid!', 'Finish Date must not less than Starting Date', 'error');
  }

  DateTargetIL3() {
    Swal.fire('Target IL3 is invalid!', 'Target IL3 Date must less than target IL4 Date', 'error');
  }

  DateTargetIL5() {
    Swal.fire('Target IL5 is invalid!', 'Target IL5 Date must later than target IL4 Date', 'error');
  }

  SelectProcess() {
    Swal.fire('Required!', 'Please Select Process', 'error');
  }

  RequiredProduct() {
    Swal.fire('Can\'t Save Product', 'Product Name is required ', 'error');
  }

  DateBudgetStart() {
    Swal.fire('Please choose again.', 'Date must be between Starting Date And Project Commercial Run ', 'error');
  }

  //
  PoolBudgetError(availableBudget: number) {
    Swal.fire('Oops...!', 'Project Cost (MTHB) is More than Available Pool Budget =' + availableBudget + ' (MTHB)', 'error');
  }

  SumCost() {
    Swal.fire('Oops...!', 'Annual Investment is Over Project Cost (MTHB)', 'error');
  }

  SumCostMonth() {
    Swal.fire('Oops...!', 'Monthly Investment Plan is Over Annual Investment Plan', 'error');
  }

  AlertAnnualInvestment() {
    Swal.fire('Oops...!', 'Please Add Annual Investment Plan', 'error');
  }

  SumCost_2() {
    Swal.fire('Oops...!', 'Annual Investment is Less than Project Cost (MTHB)', 'error');
  }

  SumCostMonth_2() {
    Swal.fire('Oops...!', 'Monthly Investment Plan is Less than Annual Investment Plan', 'error');
  }

  CannotSave() {
    Swal.fire('Oops...!', 'Cannot Save Data', 'error');
  }
  SaveDraftFirst() {
    Swal.fire('Oops...!', 'Please Save Draft First', 'error');
  }
  TotalAdd_Alert() {
    Swal.fire('Oops...!', 'Annual Total Additional is More than Additional Cost (MTHB)', 'error');
  }

  SpendingActual() {
    Swal.fire('Oops...!', 'Spending Actual is More than  Existing Budget (MTHB)', 'error');
  }

  Required_BudgetPeriod() {
    Swal.fire({ icon: 'error', title: 'Required!', text: 'Please Select Budget Period' });
  }

  Required_ProjectCost() {
    Swal.fire({ icon: 'error', title: 'Required!', text: 'Please Fill Project Cost' });
  }

  Required_Additional() {
    Swal.fire({ icon: 'error', title: 'Required!', text: 'Please fill Additional (MTHB)' });
  }

  SumCost_3() {
    Swal.fire('Oops...!', 'Annual Investment is More than Project Cost (MTHB)', 'error');
  }

  SumCost_4() {
    Swal.fire('Oops...!', 'Project Cost (MTHB) is More than Available Budget (MTHB)', 'error');
  }

  SumCost_5() {
    Swal.fire('Oops...!', 'Annual Investment is More than Additional (MTHB)', 'error');
  }

  SumCost_6() {
    Swal.fire('Oops...!', 'Annual Investment is Less than Additional (MTHB)', 'error');
  }

  WasEdited() {
    Swal.fire('Error', 'This initiative was edited by another user! Please refresh your My Tasks and edit this initiative later.', 'error');
  }

  Required_capex() {
    Swal.fire({ icon: 'error', title: 'Required!', text: 'Please Fill all CAPEX information' });
  }

  Required_MainPlant() {
    Swal.fire({
      icon: 'error',
      title: 'Required!',
      text: 'Please select a Main Plant',
      timer: this.SetTimeSubmit
    });
  }
  CreateEmocSuccess() {
    Swal.fire({
      icon: 'success',
      text: 'Create Emoc Success',
      timer: this.SetTimeSubmit
    });
  }
  CreateEmocError(message) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
      footer: 'Please Contact Admin',
      timer: 15000
    });
  }



  PlantDuplicate() {
    Swal.fire({
      icon: 'error',
      title: 'Duplicate!',
      text: 'Plant is Duplicate',
      timer: this.SetTimeSubmit
    });
  }
  MainPlantDuplicate() {
    Swal.fire({
      icon: 'error',
      title: 'Duplicate!',
      text: 'MainPlant is Duplicate',
      timer: this.SetTimeSubmit
    });
  }

  SelectManyMainPlant() {
    Swal.fire({
      icon: 'error',
      title: 'Required!',
      text: 'Please select only one Main Plant',
      timer: this.SetTimeSubmit
    });
  }

  Submit_pool() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Submit Successfully',
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
    setTimeout(() => this.router.navigate(['/initiative/my-own']), 500);
  }

  RequiredManpower() {
    Swal.fire('Can\'t Save Manpower', 'Manpower is required ', 'error');
  }

  RequiredFacility() {
    Swal.fire('Can\'t Save Facility', 'Facility is required ', 'error');
  }

  RequiredLand() {
    Swal.fire('Can\'t Save Land', 'Land is required ', 'error');
  }

  RequiredAir() {
    Swal.fire('Can\'t Save Air pollution', 'Air pollution is required ', 'error');
  }

  RequiredWaste() {
    Swal.fire('Can\'t Save Waste', 'Waste is required ', 'error');
  }

  RequiredElectricity() {
    Swal.fire('Can\'t Save Electricity', 'Electricity is required ', 'error');
  }

  RequiredOtherUtility() {
    Swal.fire('Can\'t Save Other Utility', 'Other Utility is required ', 'error');
  }

  Printing() {
    let timerInterval
    Swal.fire({
      title: 'Initiative data is printing ',
      html: 'Printing ...',
      timer: 10000,
      timerProgressBar: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      // closeOnClickOutside: false,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Swal.getTimerLeft().toString()
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    });
  }

  PrintSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Printed',
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
  }

  Duplicating() {
    let timerInterval
    Swal.fire({
      title: 'Duplicating',
      html: 'Duplicating ...',
      timer: 10000,
      timerProgressBar: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      // closeOnClickOutside: false,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Swal.getTimerLeft().toString();
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    });
  }

  DuplicateSuccess(responseId) {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Draft duplicated successfully.',
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
    setTimeout(() => this.router.navigate(['/initiative/initiativeredirector'], { queryParams: { gotoPage: "edit", gotoId: responseId } })
      , 2000);

    // this.initiativeService.id = responseId;
    // setTimeout(() => this.router.navigate(['/initiative/edit'])
    //   , 2000);
  }

  DuplicateReportSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Duplicated',
      showConfirmButton: false,
      timer: this.SetTimeSubmit
    });
  }

  ErrorText(title: string, text: string) {
    Swal.fire({
      icon: 'error', title: title, text: text
    });
  }

  SelectInitiative() {
    Swal.fire('Initiative is invalid!', 'Please Choose Initiative ID / Initiative Name', 'error');
  }

  Warning(text: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      html: text,
      showConfirmButton: true
    });
  }
  WarningText(title: string, text: string) {
    Swal.fire({
      icon: 'warning', title: title, text: text
    });
  }


  SuccessText(title: string, text: string) {
    Swal.fire({
      icon: 'success', title: title, text: text
    });
  }

  Loading(title: string, text: string) {
    let timerInterval
    Swal.fire({
      title: title,
      html: text,
      // timer: 10000,
      timerProgressBar: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Swal.getTimerLeft().toString();
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    });
  }

  ConfirmDelete(title: string, text: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    });
  }

  Update() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Updated Successfully',
      showConfirmButton: false,
      timer: this.SetTimeSubmit,
      allowOutsideClick: false
    });
  }

  DeleteMainPlant() {
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      html: 'Your has been deleted.',
      showConfirmButton: false,
      timer: 1500
    });
  }

  DeleteTeamSupportComment() {
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      html: 'Your has been deleted.',
      showConfirmButton: false,
      timer: 1500
    });
  }

  SendMailTeamSupport() {
    setTimeout(() => {
      Swal.fire({ icon: 'success', title: 'Send Mail!', html: 'Send Mail Success.', });
    }, this.SetTimeSuggestion);
  }

  DownloadSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Download Successfully',
      showConfirmButton: false,
      timer: this.SetTimeSubmit,
      allowOutsideClick: false
    });
  }

  FilesUpLoadedSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      html: 'Files uploaded successfully.',
      showConfirmButton: false,
      timer: this.SetTimeSubmit,
      allowOutsideClick: false
    });
  }

  DataNotFound() {
    Swal.fire({ icon: 'error', title: 'NotFound!', text: 'Not found Data.' });
  }

  SAPError(msg: string) {
    Swal.fire({ 
      icon: 'error', 
      title: 'Error!', 
      text: 'SAP Interface Error', 
      footer: 'Please Contact Admin (Error message:' + msg + ')' 
    });
  }

  //Yuan 
  
  SavingTimeOut(saveType: string) {
    Swal.fire({
      icon: 'error',
      title: 'Save ' + saveType + ' Timeout. Please Try Again',
      html: 'Save Timeout!',
      showConfirmButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Back to My Own'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/initiative/my-own'])
      }
    });
  }


}
