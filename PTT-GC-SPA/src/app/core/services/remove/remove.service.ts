import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RemoveService {

  constructor() { }

  Validate() {
    // Initiative General
    sessionStorage.removeItem('InitiativeValidate');
    sessionStorage.removeItem('InitiativeValidated');

    // Detail Cim&Strategy
    sessionStorage.removeItem('DetailValidate');
    sessionStorage.removeItem('DetailValidated');

    // Detail Max
    sessionStorage.removeItem('DetailMaxValidate');
    sessionStorage.removeItem('DetailMaxValidated');

    // Impact
    sessionStorage.removeItem('ImpactValidate');
    sessionStorage.removeItem('ImpactValidated');
    sessionStorage.removeItem('PercentImpact');

    // Progress
    sessionStorage.removeItem('ProgressValidate');
    sessionStorage.removeItem('ProgressValidated');

    // Add More Capex
    sessionStorage.removeItem('AddMoreDirectCapexValidate');
    sessionStorage.removeItem('AddMoreGeneralValidate');
  }

  Form() {
    // Status & Stage
    sessionStorage.removeItem('Status');
    sessionStorage.removeItem('Stage');
    sessionStorage.removeItem('Remark');

    // Initiative General
    sessionStorage.removeItem('isInitiativesForm');
    sessionStorage.removeItem('InitiativesForm');
    sessionStorage.removeItem('InitiativeCode');
    sessionStorage.removeItem('InitiativeActive');

    // Detail Cim&Strategy
    sessionStorage.removeItem('isInitiativesDetailForm');
    sessionStorage.removeItem('InitiativesDetailForm');

    sessionStorage.removeItem('isFinancialIndicatorForm');
    sessionStorage.removeItem('FinancialIndicatorForm');

    sessionStorage.removeItem('isInitiativesHaveProduct');
    sessionStorage.removeItem('InitiativesHaveProduct');

    sessionStorage.removeItem('isProductForm');
    sessionStorage.removeItem('ProductForm');

    sessionStorage.removeItem('isMilestoneForm');
    sessionStorage.removeItem('MilestoneForm');

    sessionStorage.removeItem('isFinancialForm');
    sessionStorage.removeItem('FinancialForm');
    sessionStorage.removeItem('FinancialAvgForm');

    sessionStorage.removeItem('isNoteForm');
    sessionStorage.removeItem('NoteForm');

    // Detail Max
    sessionStorage.removeItem('isDetailMax');
    sessionStorage.removeItem('DetailMax');
    sessionStorage.removeItem('WorkstreamLead');
    sessionStorage.removeItem('SetWorkstream');
    sessionStorage.removeItem('WorkstreamList');

    // Impact
    sessionStorage.removeItem('ImpactForm');

    sessionStorage.removeItem('isFinancialImpactArea');
    sessionStorage.removeItem('FinancialImpactArea');

    sessionStorage.removeItem('isHaveShareBenefit');
    sessionStorage.removeItem('HaveShareBenefit');

    sessionStorage.removeItem('isShareBenefitFrom');
    sessionStorage.removeItem('ShareBenefitFrom');

    sessionStorage.removeItem('isILForm');
    sessionStorage.removeItem('ILForm');

    sessionStorage.removeItem('isMonthForm');
    sessionStorage.removeItem('MonthForm');

    sessionStorage.removeItem('isCalculateForm');
    sessionStorage.removeItem('CalculateForm');

    sessionStorage.removeItem('isFirstRunRateForm');
    sessionStorage.removeItem('FirstRunRateForm');
    sessionStorage.removeItem('FirstRunRateTotalForm');
    sessionStorage.removeItem('TotalRecurringOneTime');

    sessionStorage.removeItem('isFirstRunRateGeneral');
    sessionStorage.removeItem('FirstRunRateGeneral');
    sessionStorage.removeItem('ImpactGeneral');

    sessionStorage.removeItem('isExplanationForm');
    sessionStorage.removeItem('explanationForm');

    sessionStorage.removeItem('isIndirectBenefit');
    sessionStorage.removeItem('IndirectBenefit');

    sessionStorage.removeItem('isIndirectForm');
    sessionStorage.removeItem('IndirectForm');

    sessionStorage.removeItem('isHaveImpiemantCost');
    sessionStorage.removeItem('HaveImpiemantCost');

    sessionStorage.removeItem('isImpiemantCostForm');
    sessionStorage.removeItem('ImpiemantCostForm');

    sessionStorage.removeItem('isTypeBenefitForm');
    sessionStorage.removeItem('TypeBenefitForm');
    sessionStorage.removeItem('TypeBenefitTotalForm');

    sessionStorage.removeItem('isToCommentForm');
    sessionStorage.removeItem('toCommentForm');

    sessionStorage.removeItem('isRemarkForm');
    sessionStorage.removeItem('remarkForm');

    // Progress
    sessionStorage.removeItem('isProgressDetailForm');
    sessionStorage.removeItem('ProgressDetailForm');

    // Submit To
    sessionStorage.removeItem('isSubmitToForm');
    sessionStorage.removeItem('SubmitToForm');

    // Capex
    sessionStorage.removeItem('InitiativeValidate');
    sessionStorage.removeItem('Capex_year_next');
    sessionStorage.removeItem('Capex_year_now');
    sessionStorage.removeItem('InitiativeValidate_capex');

    sessionStorage.removeItem('isDetailCapex');
    sessionStorage.removeItem('DetailCapex');

    sessionStorage.removeItem('isAnnualCapex');
    sessionStorage.removeItem('AnnualCapex');

    sessionStorage.removeItem('isMonthCapex1');
    sessionStorage.removeItem('MonthCapex1');

    sessionStorage.removeItem('isMonthCapex2');
    sessionStorage.removeItem('MonthCapex2');

    sessionStorage.removeItem('isMonthCapex3');
    sessionStorage.removeItem('MonthCapex3');

    sessionStorage.removeItem('isMonthCapex4');
    sessionStorage.removeItem('MonthCapex4');

    sessionStorage.removeItem('isMonthCapex5');
    sessionStorage.removeItem('MonthCapex5');

    sessionStorage.removeItem('isMonthCapex6');
    sessionStorage.removeItem('MonthCapex6');

    sessionStorage.removeItem('isMonthCapex7');
    sessionStorage.removeItem('MonthCapex7');

    sessionStorage.removeItem('isMonthCapex8');
    sessionStorage.removeItem('MonthCapex8');

    sessionStorage.removeItem('isMonthCapex9');
    sessionStorage.removeItem('MonthCapex9');

    sessionStorage.removeItem('isMonthCapex10');
    sessionStorage.removeItem('MonthCapex10');

    // Add More Capex
    sessionStorage.removeItem('isAddMoreDirectCapex');
    sessionStorage.removeItem('AddMoreDirectCapex');

    sessionStorage.removeItem('isAddMoreGeneral');
    sessionStorage.removeItem('AddMoreGeneral');

    sessionStorage.removeItem('isAddmoreCapexInformation');

    sessionStorage.removeItem('capexManager');
    sessionStorage.removeItem('capexProjectManager');
    sessionStorage.removeItem('capexVP');
    sessionStorage.removeItem('ViceOwner');

  }

  Suggestion() {
    sessionStorage.removeItem('cim');
    sessionStorage.removeItem('capex');
    sessionStorage.removeItem('strategy');
    sessionStorage.removeItem('max');
  }
}
