import { MaxService } from '@services/max/max.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { SubmitService } from './../../../core/services/submit/submit.service';
import { SwalTool } from '@tools/swal.tools';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { CapexService } from '@services/capex/capex.service';
import { DetailInformationService } from '@services/detail-information/detail-information.service';
import { InitiativeAttachmentComponent } from '@components/initiative-attachment/initiative-attachment.component';

@Component({
  selector: 'app-addmore-button',
  templateUrl: './addmore-button.component.html',
  styleUrls: ['./addmore-button.component.css']
})
export class AddmoreButtonComponent implements OnInit {

  @Input() validate;

  @Output() SaveDraft = new EventEmitter();

  @Output() SaveSubmit = new EventEmitter();

  constructor(
    private swalTool: SwalTool,
    private submitService: SubmitService,
    private capexService: CapexService,
    private detailInformationService: DetailInformationService,
    private modalService: BsModalService,
    private initiativeService: InitiativeService
  ) { }

  //@ViewChild('AttachmentModal', { static: false }) AttachmentModal: ModalDirective;


  id: number;

  page: string;

  DisabledButton = false;
  bsModalRef: BsModalRef;
  config: ModalOptions = {
    class: 'modal-xl'
  };

  ngOnInit(): void {
    this.id = Number(sessionStorage.getItem('id'));
    this.page = sessionStorage.getItem('page');
  }

  SetButton() {
    this.DisabledButton = true;
    setTimeout(() => this.DisabledButton = false, 3000);
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

  // CloseAttachment() {
  //   this.AttachmentModal.hide();
  // }

  SaveAddMoreGeneral() {
    if (sessionStorage.getItem('isAddMoreGeneral') === 'true') {
      const InitiativesForm = JSON.parse(sessionStorage.getItem('AddMoreGeneral'));
      this.initiativeService.UpdateAddMore(this.id, InitiativesForm).subscribe(() => { });
    }
  }

  SaveAddMoreDirectCapex() {
    if (sessionStorage.getItem('isAddMoreDirectCapex') === 'true') {
      const AddMoreDirectCapex = JSON.parse(sessionStorage.getItem('AddMoreDirectCapex'));
      this.detailInformationService.UpdateDetailInformation(this.id, AddMoreDirectCapex).subscribe(() => {
        if (AddMoreDirectCapex.kpisForm.kpis.length !== 0) {
          this.detailInformationService.CreateKpi(this.id, AddMoreDirectCapex.kpisForm).subscribe(() => { });
        }
      });
    }
  }

  SaveDraftAddmore() {
    const DetailCapex = JSON.parse(sessionStorage.getItem('DetailCapex'));
    const StartingDate = JSON.parse(sessionStorage.getItem('DetailCapex_StartingDate'));
    const ProjecctComRun = JSON.parse(sessionStorage.getItem('DetailCapex_ProjecctComRun'));
    const BudgetForm = JSON.parse(sessionStorage.getItem('DetailCapex_BudgetForm'));
    const RequestIniNoDate = JSON.parse(sessionStorage.getItem('DetailCapex_RequestIniNoDate'));
    const seq = JSON.parse(sessionStorage.getItem('DetailCapex_seq'));
    const ReasonOfChanging = JSON.parse(sessionStorage.getItem('DetailCapex_ReasonOfChanging'));
    const BudgetAva = JSON.parse(sessionStorage.getItem('DetailCapex_BudgetAva'));
    const year_next = JSON.parse(sessionStorage.getItem('Capex_year_next'));
    const year_now = JSON.parse(sessionStorage.getItem('Capex_year_now'));
    const year_m = JSON.parse(sessionStorage.getItem('Capex_year_m'));
    const AnnualCapex = JSON.parse(sessionStorage.getItem('AnnualCapex'));
    const MonthCapex1 = JSON.parse(sessionStorage.getItem('MonthCapex1')).monthForm_list;
    const MonthCapex2 = JSON.parse(sessionStorage.getItem('MonthCapex2')).monthForm_list;
    const MonthCapex3 = JSON.parse(sessionStorage.getItem('MonthCapex3')).monthForm_list;
    const MonthCapex4 = JSON.parse(sessionStorage.getItem('MonthCapex4')).monthForm_list;
    const MonthCapex5 = JSON.parse(sessionStorage.getItem('MonthCapex5')).monthForm_list;
    const MonthCapex6 = JSON.parse(sessionStorage.getItem('MonthCapex6')).monthForm_list;
    const MonthCapex7 = JSON.parse(sessionStorage.getItem('MonthCapex7')).monthForm_list;
    const MonthCapex8 = JSON.parse(sessionStorage.getItem('MonthCapex8')).monthForm_list;
    const MonthCapex9 = JSON.parse(sessionStorage.getItem('MonthCapex9')).monthForm_list;
    const MonthCapex10 = JSON.parse(sessionStorage.getItem('MonthCapex10')).monthForm_list;
    const capexType = JSON.parse(sessionStorage.getItem('Capex_capexType'));
    const status = JSON.parse(sessionStorage.getItem('Capex_status'));
    const revision_ = JSON.parse(sessionStorage.getItem('Capex_revision_'));
    const seq_ = JSON.parse(sessionStorage.getItem('Capex_seq_'));

    let BudgetYear = "";

    let BudgetForm_ = "";
    let BetweenYear_ = "";
    let TransferForm_ = "";
    let PoolBudgetForm_ = "";

    if (DetailCapex.BudgetForm == "Annual") {
      BudgetYear = year_next;
      BudgetForm_ = DetailCapex.BudgetForm + " (" + year_next + ")";
    }
    else if (DetailCapex.BudgetForm == "Mid Year") {
      BudgetYear = year_now;
      BudgetForm_ = DetailCapex.BudgetForm + " (" + year_now + ")";
    }
    else {

      BudgetYear = year_now;
      BudgetForm_ = DetailCapex.BudgetForm;

      if (DetailCapex.BetweenYear == "BOD Approval on") {
        BetweenYear_ = DetailCapex.BetweenYear;
      }
      else if (DetailCapex.BetweenYear == "Transfer") {
        BetweenYear_ = DetailCapex.BetweenYear + " (" + year_now + ")";
        TransferForm_ = DetailCapex.TransferForm;
      }
      else if (DetailCapex.BetweenYear == "Pool Budget") {
        BetweenYear_ = DetailCapex.BetweenYear + " (" + year_now + ")";
        PoolBudgetForm_ = DetailCapex.PoolBudgetForm;
      }
      else {
        BetweenYear_ = DetailCapex.BetweenYear + " (" + year_now + ")";
      }
    }

    this.capexService.GetCapexsInfo(this.id.toString(), 'AddmoreCapex').subscribe(resp_1 => {



      if (status != "revised") {
        if (resp_1.capexStatus == "Submit" && resp_1.capexType == "AddmoreCapex") {
          resp_1 = null;
        }
      }


      if (resp_1 == null) {


        let tmprevision_ = +revision_ + 1;
        let tmpseq_ = +seq_ + 1;

        this.capexService.CreateCapexsInfo(
          DetailCapex.StartingDate,
          DetailCapex.ProjecctComRun,
          DetailCapex.RequestIniNoDate,
          DetailCapex.ProjectExePeriodYear,
          DetailCapex.ProjectExePeriodMonth,
          DetailCapex.CostCenterOfVP,
          DetailCapex.CodeCostCenterOfVP,
          DetailCapex.ProjectCost,
          DetailCapex.ReasonOfChanging,
          DetailCapex.BudgetForm,
          DetailCapex.BetweenYear,
          DetailCapex.TransferForm,
          DetailCapex.PoolBudgetForm,
          "",
          tmprevision_.toString(),
          "AddmoreCapex",
          BudgetYear,
          "Draft",
          "false",
          tmpseq_.toString(),
          DetailCapex.ExistingCost,
          DetailCapex.SpendingActual,
          DetailCapex.AdditionalCost,
          "",
          "0",
          "0",
          this.id.toString(), "0"
        ).subscribe(response => {

          this.capexService.GetCapexsInfo(this.id.toString(), 'AddmoreCapex').subscribe(resp_1 => {

            let capexInformationId = resp_1.capexInformationId

            this.capexService.CreateAnnualInvestmentPlan_addMore_(
              this.id.toString(), AnnualCapex.annualForm_list, resp_1.capexInformationId, "draft").subscribe(resp => {


                this.capexService.GetTotalByRevisionAll(this.id).subscribe(response => {

                  let totalYearOverall_ = 0;

                  if (response.length != 0) {
                    for (let i = 0; i < response.length; i++) {
                      totalYearOverall_ = +totalYearOverall_ + +response[i].totalYearOverall;
                    }
                  }

                });






              });

            this.capexService.CreateMonthlyInvestmentPlan_(year_m, MonthCapex1, MonthCapex2,
              MonthCapex3, MonthCapex4, MonthCapex5, MonthCapex6, MonthCapex7, MonthCapex8,
              MonthCapex9, MonthCapex10, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                // this.bindMonth();

              });
            // this.flag_fail = "yes";

          });

        });

      }
      else {

        if (capexType != "AddmoreCapex") {


          let tmprevision_ = +revision_ + 1;
          let tmpseq_ = +seq_ + 1;


          this.capexService.CreateCapexsInfo(
            DetailCapex.StartingDate,
            DetailCapex.ProjecctComRun,
            DetailCapex.RequestIniNoDate,
            DetailCapex.ProjectExePeriodYear,
            DetailCapex.ProjectExePeriodMonth,
            DetailCapex.CostCenterOfVP,
            DetailCapex.CodeCostCenterOfVP,
            DetailCapex.ProjectCost,
            DetailCapex.ReasonOfChanging,
            DetailCapex.BudgetForm,
            DetailCapex.BetweenYear,
            DetailCapex.TransferForm,
            DetailCapex.PoolBudgetForm,
            "",
            tmprevision_.toString(),
            "AddmoreCapex",
            BudgetYear,
            "Draft",
            "false",
            tmpseq_.toString(),
            DetailCapex.ExistingCost,
            DetailCapex.SpendingActual,
            DetailCapex.AdditionalCost,
            "",
            "0",
            "0",
            this.id.toString(), "0"
          ).subscribe(response => {

            this.capexService.GetCapexsInfo(this.id.toString(), 'AddmoreCapex').subscribe(resp_1 => {

              let capexInformationId = resp_1.capexInformationId

              this.capexService.CreateAnnualInvestmentPlan_addMore_(
                this.id.toString(), AnnualCapex.annualForm_list, resp_1.capexInformationId, "draft").subscribe(resp => {
                });

              this.capexService.CreateMonthlyInvestmentPlan_(year_m, MonthCapex1, MonthCapex2,
                MonthCapex3, MonthCapex4, MonthCapex5, MonthCapex6, MonthCapex7, MonthCapex8,
                MonthCapex9, MonthCapex10, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                  // this.bindMonth();

                });

              // this.flag_fail = "yes";

            });

          });

        }
        else {


          if (status == "revised") {

            this.capexService.PutUpdateCapexsinformations(
              DetailCapex.StartingDate,
              DetailCapex.ProjecctComRun,
              DetailCapex.RequestIniNoDate,
              DetailCapex.ProjectExePeriodYear,
              DetailCapex.ProjectExePeriodMonth,
              DetailCapex.CostCenterOfVP,
              DetailCapex.CodeCostCenterOfVP,
              DetailCapex.ProjectCost,
              DetailCapex.ReasonOfChanging,
              DetailCapex.BudgetForm,
              DetailCapex.BetweenYear,
              DetailCapex.TransferForm,
              DetailCapex.PoolBudgetForm,
              "",
              resp_1.revistion,
              "AddmoreCapex",
              BudgetYear,
              "Draft",
              "false",
              resp_1.sequen,
              DetailCapex.ExistingCost,
              DetailCapex.SpendingActual,
              DetailCapex.AdditionalCost,
              "",
              "0",
              "0",
              this.id.toString(),
              resp_1.capexInformationId, "0",
              '',
              ''
            ).subscribe(response => {

              this.capexService.GetCapexsInfo(this.id.toString(), 'AddmoreCapex').subscribe(resp_1 => {

                let capexInformationId = resp_1.capexInformationId

                this.capexService.CreateAnnualInvestmentPlan_addMore_(
                  this.id.toString(), AnnualCapex.annualForm_list, resp_1.capexInformationId, "draft").subscribe(resp => {
                  });

                this.capexService.CreateMonthlyInvestmentPlan_(year_m, MonthCapex1, MonthCapex2,
                  MonthCapex3, MonthCapex4, MonthCapex5, MonthCapex6, MonthCapex7, MonthCapex8,
                  MonthCapex9, MonthCapex10, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                    // this.bindMonth();

                  });

                // this.flag_fail = "yes";

              });

            });
          }
          else {
            if (resp_1.capexStatus != "Submit") {

              this.capexService.PutUpdateCapexsinformations(
                DetailCapex.StartingDate,
                DetailCapex.ProjecctComRun,
                DetailCapex.RequestIniNoDate,
                DetailCapex.ProjectExePeriodYear,
                DetailCapex.ProjectExePeriodMonth,
                DetailCapex.CostCenterOfVP,
                DetailCapex.CodeCostCenterOfVP,
                DetailCapex.ProjectCost,
                DetailCapex.ReasonOfChanging,
                DetailCapex.BudgetForm,
                DetailCapex.BetweenYear,
                DetailCapex.TransferForm,
                DetailCapex.PoolBudgetForm,
                "",
                resp_1.revistion,
                "AddmoreCapex",
                BudgetYear,
                "Draft",
                "false",
                resp_1.sequent,
                DetailCapex.ExistingCost,
                DetailCapex.SpendingActual,
                DetailCapex.AdditionalCost,
                "",
                "0",
                "0",
                this.id.toString(),
                resp_1.capexInformationId, "0", '', ''
              ).subscribe(response => {

                this.capexService.GetCapexsInfo(this.id.toString(), 'AddmoreCapex').subscribe(resp_1 => {

                  let capexInformationId = resp_1.capexInformationId

                  this.capexService.CreateAnnualInvestmentPlan_addMore_(
                    this.id.toString(), AnnualCapex.annualForm_list, resp_1.capexInformationId, "draft").subscribe(resp => {
                    });

                  this.capexService.CreateMonthlyInvestmentPlan_(year_m, MonthCapex1, MonthCapex2,
                    MonthCapex3, MonthCapex4, MonthCapex5, MonthCapex6, MonthCapex7, MonthCapex8,
                    MonthCapex9, MonthCapex10, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                      // this.bindMonth();

                    });


                });

              });
            }
            else {
              let tmprevision_ = +revision_ + 1;
              let tmpseq_ = +seq_ + 1;

              this.capexService.CreateCapexsInfo(
                DetailCapex.StartingDate,
                DetailCapex.ProjecctComRun,
                DetailCapex.RequestIniNoDate,
                DetailCapex.ProjectExePeriodYear,
                DetailCapex.ProjectExePeriodMonth,
                DetailCapex.CostCenterOfVP,
                DetailCapex.CodeCostCenterOfVP,
                DetailCapex.ProjectCost,
                DetailCapex.ReasonOfChanging,
                DetailCapex.BudgetForm,
                DetailCapex.BetweenYear,
                DetailCapex.TransferForm,
                DetailCapex.PoolBudgetForm,
                "",
                tmprevision_.toString(),
                "AddmoreCapex",
                BudgetYear,
                "Draft",
                "false",
                tmpseq_.toString(),
                DetailCapex.ExistingCost,
                DetailCapex.SpendingActual,
                DetailCapex.AdditionalCost,
                "",
                "0",
                "0",
                this.id.toString(), "0"
              ).subscribe(response => {

                this.capexService.GetCapexsInfo(this.id.toString(), 'AddmoreCapex').subscribe(resp_1 => {

                  let capexInformationId = resp_1.capexInformationId

                  this.capexService.CreateAnnualInvestmentPlan_addMore_(
                    this.id.toString(), AnnualCapex.annualForm_list, resp_1.capexInformationId, "draft").subscribe(resp => {
                    });

                  this.capexService.CreateMonthlyInvestmentPlan_(year_m, MonthCapex1, MonthCapex2,
                    MonthCapex3, MonthCapex4, MonthCapex5, MonthCapex6, MonthCapex7, MonthCapex8,
                    MonthCapex9, MonthCapex10, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                      // this.bindMonth();

                    });
                  // this.flag_fail = "yes";

                });

              });
            }
          }


        }

      }

    });
  }

  SaveSubmitAddmore() {
    if (sessionStorage.getItem('isAddmoreCapexInformation') === 'true') {
      const DetailCapex = JSON.parse(sessionStorage.getItem('DetailCapex'));
      const StartingDate = JSON.parse(sessionStorage.getItem('DetailCapex_StartingDate'));
      const ProjecctComRun = JSON.parse(sessionStorage.getItem('DetailCapex_ProjecctComRun'));
      const BudgetForm = JSON.parse(sessionStorage.getItem('DetailCapex_BudgetForm'));
      const RequestIniNoDate = JSON.parse(sessionStorage.getItem('DetailCapex_RequestIniNoDate'));
      const seq = JSON.parse(sessionStorage.getItem('DetailCapex_seq'));
      const ReasonOfChanging = JSON.parse(sessionStorage.getItem('DetailCapex_ReasonOfChanging'));
      const BudgetAva = JSON.parse(sessionStorage.getItem('DetailCapex_BudgetAva'));
      const year_next = JSON.parse(sessionStorage.getItem('Capex_year_next'));
      const year_now = JSON.parse(sessionStorage.getItem('Capex_year_now'));
      const year_m = JSON.parse(sessionStorage.getItem('Capex_year_m'));
      const AnnualCapex = JSON.parse(sessionStorage.getItem('AnnualCapex'));
      const MonthCapex1 = JSON.parse(sessionStorage.getItem('MonthCapex1')).monthForm_list;
      const MonthCapex2 = JSON.parse(sessionStorage.getItem('MonthCapex2')).monthForm_list;
      const MonthCapex3 = JSON.parse(sessionStorage.getItem('MonthCapex3')).monthForm_list;
      const MonthCapex4 = JSON.parse(sessionStorage.getItem('MonthCapex4')).monthForm_list;
      const MonthCapex5 = JSON.parse(sessionStorage.getItem('MonthCapex5')).monthForm_list;
      const MonthCapex6 = JSON.parse(sessionStorage.getItem('MonthCapex6')).monthForm_list;
      const MonthCapex7 = JSON.parse(sessionStorage.getItem('MonthCapex7')).monthForm_list;
      const MonthCapex8 = JSON.parse(sessionStorage.getItem('MonthCapex8')).monthForm_list;
      const MonthCapex9 = JSON.parse(sessionStorage.getItem('MonthCapex9')).monthForm_list;
      const MonthCapex10 = JSON.parse(sessionStorage.getItem('MonthCapex10')).monthForm_list;
      const capexType = JSON.parse(sessionStorage.getItem('Capex_capexType'));
      const status = JSON.parse(sessionStorage.getItem('Capex_status'));
      const revision_ = JSON.parse(sessionStorage.getItem('Capex_revision_'));
      const seq_ = JSON.parse(sessionStorage.getItem('Capex_seq_'));

      let BudgetYear = "";

      let BudgetForm_ = "";
      let BetweenYear_ = "";
      let TransferForm_ = "";
      let PoolBudgetForm_ = "";

      if (DetailCapex.BudgetForm == "Annual") {
        BudgetYear = year_next;
        BudgetForm_ = DetailCapex.BudgetForm + " (" + year_next + ")";
      }
      else if (DetailCapex.BudgetForm == "Mid Year") {
        BudgetYear = year_now;
        BudgetForm_ = DetailCapex.BudgetForm + " (" + year_now + ")";
      }
      else {

        BudgetYear = year_now;
        BudgetForm_ = DetailCapex.BudgetForm;

        if (DetailCapex.BetweenYear == "BOD Approval on") {
          BetweenYear_ = DetailCapex.BetweenYear;
        }
        else if (DetailCapex.BetweenYear == "Transfer") {
          BetweenYear_ = DetailCapex.BetweenYear + " (" + year_now + ")";
          TransferForm_ = DetailCapex.TransferForm;
        }
        else if (DetailCapex.BetweenYear == "Pool Budget") {
          BetweenYear_ = DetailCapex.BetweenYear + " (" + year_now + ")";
          PoolBudgetForm_ = DetailCapex.PoolBudgetForm;
        }
        else {
          BetweenYear_ = DetailCapex.BetweenYear + " (" + year_now + ")";
        }
      }

      this.capexService.GetCapexsInfo(this.id.toString(), 'AddmoreCapex').subscribe(resp_1 => {



        if (status != "revised") {
          if (resp_1.capexStatus == "Submit" && resp_1.capexType == "AddmoreCapex") {
            resp_1 = null;
          }
        }


        if (resp_1 == null) {


          let tmprevision_ = +revision_ + 1;
          let tmpseq_ = +seq_ + 1;

          this.capexService.CreateCapexsInfo(
            DetailCapex.StartingDate,
            DetailCapex.ProjecctComRun,
            DetailCapex.RequestIniNoDate,
            DetailCapex.ProjectExePeriodYear,
            DetailCapex.ProjectExePeriodMonth,
            DetailCapex.CostCenterOfVP,
            DetailCapex.CodeCostCenterOfVP,
            DetailCapex.ProjectCost,
            DetailCapex.ReasonOfChanging,
            DetailCapex.BudgetForm,
            DetailCapex.BetweenYear,
            DetailCapex.TransferForm,
            DetailCapex.PoolBudgetForm,
            "",
            tmprevision_.toString(),
            "AddmoreCapex",
            BudgetYear,
            "Submit",
            "false",
            tmpseq_.toString(),
            DetailCapex.ExistingCost,
            DetailCapex.SpendingActual,
            DetailCapex.AdditionalCost,
            "",
            "0",
            "0",
            this.id.toString(), "0"
          ).subscribe(response => {

            this.capexService.GetCapexsInfo(this.id.toString(), 'AddmoreCapex').subscribe(resp_1 => {

              let capexInformationId = resp_1.capexInformationId

              this.capexService.CreateAnnualInvestmentPlan_addMore_(
                this.id.toString(), AnnualCapex.annualForm_list, resp_1.capexInformationId, "submit").subscribe(resp => {


                  this.capexService.GetTotalByRevisionAll(this.id).subscribe(response => {

                    let totalYearOverall_ = 0;

                    if (response.length != 0) {
                      for (let i = 0; i < response.length; i++) {
                        totalYearOverall_ = +totalYearOverall_ + +response[i].totalYearOverall;
                      }
                    }

                  });






                });

              this.capexService.CreateMonthlyInvestmentPlan_(year_m, MonthCapex1, MonthCapex2,
                MonthCapex3, MonthCapex4, MonthCapex5, MonthCapex6, MonthCapex7, MonthCapex8,
                MonthCapex9, MonthCapex10, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                  // this.bindMonth();

                });
              // this.flag_fail = "yes";

            });

          });

        }
        else {

          if (capexType != "AddmoreCapex") {


            let tmprevision_ = +revision_ + 1;
            let tmpseq_ = +seq_ + 1;


            this.capexService.CreateCapexsInfo(
              DetailCapex.StartingDate,
              DetailCapex.ProjecctComRun,
              DetailCapex.RequestIniNoDate,
              DetailCapex.ProjectExePeriodYear,
              DetailCapex.ProjectExePeriodMonth,
              DetailCapex.CostCenterOfVP,
              DetailCapex.CodeCostCenterOfVP,
              DetailCapex.ProjectCost,
              DetailCapex.ReasonOfChanging,
              DetailCapex.BudgetForm,
              DetailCapex.BetweenYear,
              DetailCapex.TransferForm,
              DetailCapex.PoolBudgetForm,
              "",
              tmprevision_.toString(),
              "AddmoreCapex",
              BudgetYear,
              "Submit",
              "false",
              tmpseq_.toString(),
              DetailCapex.ExistingCost,
              DetailCapex.SpendingActual,
              DetailCapex.AdditionalCost,
              "",
              "0",
              "0",
              this.id.toString(), "0"
            ).subscribe(response => {

              this.capexService.GetCapexsInfo(this.id.toString(), 'AddmoreCapex').subscribe(resp_1 => {

                let capexInformationId = resp_1.capexInformationId

                this.capexService.CreateAnnualInvestmentPlan_addMore_(
                  this.id.toString(), AnnualCapex.annualForm_list, resp_1.capexInformationId, "submit").subscribe(resp => {
                  });

                this.capexService.CreateMonthlyInvestmentPlan_(year_m, MonthCapex1, MonthCapex2,
                  MonthCapex3, MonthCapex4, MonthCapex5, MonthCapex6, MonthCapex7, MonthCapex8,
                  MonthCapex9, MonthCapex10, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                    // this.bindMonth();

                  });

                // this.flag_fail = "yes";

              });

            });

          }
          else {



            if (status == "revised") {

              this.capexService.PutUpdateCapexsinformations(
                DetailCapex.StartingDate,
                DetailCapex.ProjecctComRun,
                DetailCapex.RequestIniNoDate,
                DetailCapex.ProjectExePeriodYear,
                DetailCapex.ProjectExePeriodMonth,
                DetailCapex.CostCenterOfVP,
                DetailCapex.CodeCostCenterOfVP,
                DetailCapex.ProjectCost,
                DetailCapex.ReasonOfChanging,
                DetailCapex.BudgetForm,
                DetailCapex.BetweenYear,
                DetailCapex.TransferForm,
                DetailCapex.PoolBudgetForm,
                "",
                resp_1.revistion,
                "AddmoreCapex",
                BudgetYear,
                "Submit",
                "false",
                resp_1.sequen,
                DetailCapex.ExistingCost,
                DetailCapex.SpendingActual,
                DetailCapex.AdditionalCost,
                "",
                "0",
                "0",
                this.id.toString(),
                resp_1.capexInformationId, "0",
                '',
                ''
              ).subscribe(response => {

                this.capexService.GetCapexsInfo(this.id.toString(), 'AddmoreCapex').subscribe(resp_1 => {

                  let capexInformationId = resp_1.capexInformationId

                  this.capexService.CreateAnnualInvestmentPlan_addMore_(
                    this.id.toString(), AnnualCapex.annualForm_list, resp_1.capexInformationId, "submit").subscribe(resp => {
                    });

                  this.capexService.CreateMonthlyInvestmentPlan_(year_m, MonthCapex1, MonthCapex2,
                    MonthCapex3, MonthCapex4, MonthCapex5, MonthCapex6, MonthCapex7, MonthCapex8,
                    MonthCapex9, MonthCapex10, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                      // this.bindMonth();

                    });

                  // this.flag_fail = "yes";

                });

              });
            }
            else {
              if (resp_1.capexStatus != "Submit") {

                this.capexService.PutUpdateCapexsinformations(
                  DetailCapex.StartingDate,
                  DetailCapex.ProjecctComRun,
                  DetailCapex.RequestIniNoDate,
                  DetailCapex.ProjectExePeriodYear,
                  DetailCapex.ProjectExePeriodMonth,
                  DetailCapex.CostCenterOfVP,
                  DetailCapex.CodeCostCenterOfVP,
                  DetailCapex.ProjectCost,
                  DetailCapex.ReasonOfChanging,
                  DetailCapex.BudgetForm,
                  DetailCapex.BetweenYear,
                  DetailCapex.TransferForm,
                  DetailCapex.PoolBudgetForm,
                  "",
                  resp_1.revistion,
                  "AddmoreCapex",
                  BudgetYear,
                  "Submit",
                  "false",
                  resp_1.sequent,
                  DetailCapex.ExistingCost,
                  DetailCapex.SpendingActual,
                  DetailCapex.AdditionalCost,
                  "",
                  "0",
                  "0",
                  this.id.toString(),
                  resp_1.capexInformationId, "0", '', ''
                ).subscribe(response => {

                  this.capexService.GetCapexsInfo(this.id.toString(), 'AddmoreCapex').subscribe(resp_1 => {

                    let capexInformationId = resp_1.capexInformationId

                    this.capexService.CreateAnnualInvestmentPlan_addMore_(
                      this.id.toString(), AnnualCapex.annualForm_list, resp_1.capexInformationId, "submit").subscribe(resp => {
                      });

                    this.capexService.CreateMonthlyInvestmentPlan_(year_m, MonthCapex1, MonthCapex2,
                      MonthCapex3, MonthCapex4, MonthCapex5, MonthCapex6, MonthCapex7, MonthCapex8,
                      MonthCapex9, MonthCapex10, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                        // this.bindMonth();

                      });


                  });

                });
              }
              else {
                let tmprevision_ = +revision_ + 1;
                let tmpseq_ = +seq_ + 1;

                this.capexService.CreateCapexsInfo(
                  DetailCapex.StartingDate,
                  DetailCapex.ProjecctComRun,
                  DetailCapex.RequestIniNoDate,
                  DetailCapex.ProjectExePeriodYear,
                  DetailCapex.ProjectExePeriodMonth,
                  DetailCapex.CostCenterOfVP,
                  DetailCapex.CodeCostCenterOfVP,
                  DetailCapex.ProjectCost,
                  DetailCapex.ReasonOfChanging,
                  DetailCapex.BudgetForm,
                  DetailCapex.BetweenYear,
                  DetailCapex.TransferForm,
                  DetailCapex.PoolBudgetForm,
                  "",
                  tmprevision_.toString(),
                  "AddmoreCapex",
                  BudgetYear,
                  "Submit",
                  "false",
                  tmpseq_.toString(),
                  DetailCapex.ExistingCost,
                  DetailCapex.SpendingActual,
                  DetailCapex.AdditionalCost,
                  "",
                  "0",
                  "0",
                  this.id.toString(), "0"
                ).subscribe(response => {

                  this.capexService.GetCapexsInfo(this.id.toString(), 'AddmoreCapex').subscribe(resp_1 => {

                    let capexInformationId = resp_1.capexInformationId

                    this.capexService.CreateAnnualInvestmentPlan_addMore_(
                      this.id.toString(), AnnualCapex.annualForm_list, resp_1.capexInformationId, "submit").subscribe(resp => {
                      });

                    this.capexService.CreateMonthlyInvestmentPlan_(year_m, MonthCapex1, MonthCapex2,
                      MonthCapex3, MonthCapex4, MonthCapex5, MonthCapex6, MonthCapex7, MonthCapex8,
                      MonthCapex9, MonthCapex10, this.id.toString(), 1111, resp_1.capexInformationId).subscribe(response => {
                        // this.bindMonth();

                      });
                    // this.flag_fail = "yes";

                  });

                });
              }
            }


          }

        }

      });
    }
  }

  PageSaveDraft() {
    switch (this.page) {
      case 'addmore-general':
        this.SaveAddMoreDirectCapex();
        this.SaveDraftAddmore();
        break;
      case 'addmore-direct':
        this.SaveAddMoreGeneral();
        this.SaveDraftAddmore();
        break;
      case 'addmore-capex':
        this.SaveAddMoreGeneral();
        this.SaveAddMoreDirectCapex();
        break;
    }
  }

  PageSaveSubmit() {
    switch (this.page) {
      case 'addmore-general':
        this.SaveAddMoreDirectCapex();
        this.SaveSubmitAddmore();
        break;
      case 'addmore-direct':
        this.SaveAddMoreGeneral();
        this.SaveSubmitAddmore();
        break;
      case 'addmore-capex':
        this.SaveAddMoreGeneral();
        this.SaveAddMoreDirectCapex();
        break;
    }
  }

  Draft() {
    this.SetButton();
    this.SaveDraft.emit();
    this.PageSaveDraft();
    this.swalTool.Draft();
  }

  Submit() {
    this.SetButton();
    this.PageSaveSubmit();
    this.SaveSubmit.emit();


    // this.submitService.SubmitStageStatus(this.id, { status: 'forward', comment: '' }).subscribe(() => {
    //   this.SaveSubmit.emit();
    //   this.swalTool.Submit();
    // });
  }
}
