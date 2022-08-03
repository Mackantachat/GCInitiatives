import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  baseUrl = environment.apiUrl + 'suggestion';
  baseUrlNewSuggest = environment.apiUrl + 'suggest';

  constructor(private http: HttpClient) { }

  Suggest(condition) {
    return this.http.post(this.baseUrlNewSuggest + '/Calculate', condition);
  }


  PIM_RAM_FACTOR(condition) {
    return this.http.post(this.baseUrl + '/PIM_RAM_FACTOR', condition);
  }

  PIM_Maintain(condition) {
    return this.http.post(this.baseUrl + '/PIM_Maintain', condition);
  }

  PIM_Maintain_Criteria(condition) {
    return this.http.post(this.baseUrl + '/PIM_Maintain_Criteria', condition);
  }

  PIM_Maintain_Criteria_TypeBenefit(condition) {
    return this.http.post(this.baseUrl + '/PIM_Maintain_Criteria_TypeBenefit', condition);
  }

  PIM_Maintain_Criteria_PayBackPeriod(condition) {
    return this.http.post(this.baseUrl + '/PIM_Maintain_Criteria_PayBackPeriod', condition);
  }

  CAPEX_Pool_Cost_Replacement(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Pool_Cost_Replacement', condition);
  }

  CAPEX_Replacement(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Replacement', condition);
  }

  CAPEX_Replacement_Cost(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Replacement_Cost', condition);
  }

  CAPEX_Replacement_Criteria(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Replacement_Criteria', condition);
  }

  CAPEX_Replacement_Criteria_TypeBenefit(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Replacement_Criteria_TypeBenefit', condition);
  }

  CAPEX_Replacement_Criteria_PayBackPeriod(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Replacement_Criteria_PayBackPeriod', condition);
  }

  CAPEX_ER_Growth_SustainCore(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_ER_Growth_SustainCore', condition);
  }

  CIM_Growth(condition) {
    return this.http.post(this.baseUrl + '/CIM_Growth', condition);
  }

  PIM_Growth_Criteria(condition) {
    return this.http.post(this.baseUrl + '/PIM_Growth_Criteria', condition);
  }

  PIM_Growth_Criteria_TypeBenefit(condition) {
    return this.http.post(this.baseUrl + '/PIM_Growth_Criteria_TypeBenefit', condition);
  }

  PIM_Growth_Criteria_PayBackPeriod(condition) {
    return this.http.post(this.baseUrl + '/PIM_Growth_Criteria_PayBackPeriod', condition);
  }

  CIM_SustainCore(condition) {
    return this.http.post(this.baseUrl + '/CIM_SustainCore', condition);
  }

  PIM_SustainCore_Criteria(condition) {
    return this.http.post(this.baseUrl + '/PIM_SustainCore_Criteria', condition);
  }

  PIM_SustainCore_Criteria_TypeBenefit(condition) {
    return this.http.post(this.baseUrl + '/PIM_SustainCore_Criteria_TypeBenefit', condition);
  }

  PIM_SustainCore_Criteria_PayBackPeriod(condition) {
    return this.http.post(this.baseUrl + '/PIM_SustainCore_Criteria_PayBackPeriod', condition);
  }

  CIM_SustainCore_EnergySaving(condition) {
    return this.http.post(this.baseUrl + '/CIM_SustainCore_EnergySaving', condition);
  }

  PIM_SustainCore_EnergySaving_Criteria(condition) {
    return this.http.post(this.baseUrl + '/PIM_SustainCore_EnergySaving_Criteria', condition);
  }

  PIM_SustainCore_EnergySaving_Criteria_TypeBenefit(condition) {
    return this.http.post(this.baseUrl + '/PIM_SustainCore_EnergySaving_Criteria_TypeBenefit', condition);
  }

  PIM_SustainCore_EnergySaving_Criteria_PayBackPeriod(condition) {
    return this.http.post(this.baseUrl + '/PIM_SustainCore_EnergySaving_Criteria_PayBackPeriod', condition);
  }

  CIM_Divest_MnA(condition) {
    return this.http.post(this.baseUrl + '/CIM_Divest_MnA', condition);
  }

  CVC_SendEmail(condition) {
    return this.http.post(this.baseUrl + '/CVC_SendEmail', condition);
  }

  CIM_CVC(condition) {
    return this.http.post(this.baseUrl + '/CIM_CVC', condition);
  }

  CIM_ItCapex_DigitalCapex(condition) {
    return this.http.post(this.baseUrl + '/CIM_ItCapex_DigitalCapex', condition);
  }

  DIM_ItCapex_DigitalCapex_Criteria(condition) {
    return this.http.post(this.baseUrl + '/DIM_ItCapex_DigitalCapex_Criteria', condition);
  }

  DIM_ItCapex_DigitalCapex_Criteria_TypeBenefit(condition) {
    return this.http.post(this.baseUrl + '/DIM_ItCapex_DigitalCapex_Criteria', condition);
  }

  DIM_ItCapex_DigitalCapex_Criteria_PayBackPeriod(condition) {
    return this.http.post(this.baseUrl + '/DIM_ItCapex_DigitalCapex_Criteria_PayBackPeriod', condition);
  }

  DIM_Growth_SustainCore(condition) {
    return this.http.post(this.baseUrl + '/DIM_Growth_SustainCore', condition);
  }

  DIM_NON_FINANCIAL_Growth_SustainCore(condition) {
    return this.http.post(this.baseUrl + '/DIM_NON_FINANCIAL_Growth_SustainCore', condition);
  }

  DIM_Maintain(condition) {
    return this.http.post(this.baseUrl + '/DIM_Maintain', condition);
  }

  DIM_NON_Maintain(condition) {
    return this.http.post(this.baseUrl + '/DIM_NON_Maintain', condition);
  }

  DIM_CostCapex(condition) {
    return this.http.post(this.baseUrl + '/DIM_CostCapex', condition);
  }

  DIM_NON_CostCapex(condition) {
    return this.http.post(this.baseUrl + '/DIM_NON_CostCapex', condition);
  }

  DIM_Environment(condition) {
    return this.http.post(this.baseUrl + '/DIM_Environment', condition);
  }

  DIM_MAX_Maintain(condition) {
    return this.http.post(this.baseUrl + '/DIM_MAX_Maintain', condition);
  }

  DIM_MAX_CostCapex(condition) {
    return this.http.post(this.baseUrl + '/DIM_MAX_CostCapex', condition);
  }

  CAPEX_CostCapex(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_CostCapex', condition);
  }

  CAPEX_Criteria(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Criteria', condition);
  }

  CAPEX_Criteria_TypeBenefit(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Criteria_TypeBenefit', condition);
  }

  CAPEX_Criteria_PayBackPeriod(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Criteria_PayBackPeriod', condition);
  }

  CAPEX_Pool_Engineering(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Pool_Engineering', condition);
  }

  CAPEX_Pool_Cost_Engineering(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Pool_Cost_Engineering', condition);
  }

  CAPEX_Engineering_Cost(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Engineering_Cost', condition);
  }

  CAPEX_Engineering_Criteria(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Engineering_Criteria', condition);
  }

  CAPEX_Engineering_Criteria_TypeBenefit(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Engineering_Criteria_TypeBenefit', condition);
  }

  CAPEX_Engineering_Criteria_PayBackPeriod(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_Engineering_Criteria_PayBackPeriod', condition);
  }

  CAPEX_ER_Maintain(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_ER_Maintain', condition);
  }

  CAPEX_ER_Environment(condition) {
    return this.http.post(this.baseUrl + '/CAPEX_ER_Environment', condition);
  }

  MAX_DIM_Growth_SustainCore(condition) {
    return this.http.post(this.baseUrl + '/MAX_DIM_Growth_SustainCore', condition);
  }

  MAX_Maintain(condition) {
    return this.http.post(this.baseUrl + '/MAX_Maintain', condition);
  }

  MAX_Replacement(condition) {
    return this.http.post(this.baseUrl + '/MAX_Replacement', condition);
  }

  MAX_Growth(condition) {
    return this.http.post(this.baseUrl + '/MAX_Growth', condition);
  }

  MAX_Growth_NoCase(condition) {
    return this.http.post(this.baseUrl + '/MAX_Growth_NoCase', condition);
  }

  MAX_SustainCore(condition) {
    return this.http.post(this.baseUrl + '/MAX_SustainCore', condition);
  }

  MAX_Sustaincore_NoCase(condition) {
    return this.http.post(this.baseUrl + '/MAX_Sustaincore_NoCase', condition);
  }

  MAX_SustainCore_EnergySaving(condition) {
    return this.http.post(this.baseUrl + '/MAX_SustainCore_EnergySaving', condition);
  }

  MAX_ItCapex_DigitalCapex(condition) {
    return this.http.post(this.baseUrl + '/MAX_ItCapex_DigitalCapex', condition);
  }

  MAX_CostCapex(condition) {
    return this.http.post(this.baseUrl + '/MAX_CostCapex', condition);
  }

  MAX_Engineering(condition) {
    return this.http.post(this.baseUrl + '/MAX_Engineering', condition);
  }

  PIM_Maintain_NoCase(condition) {
    return this.http.post(this.baseUrl + '/PIM_Maintain_NoCase', condition);
  }

  PIM_RAM_FACTOR_RAM_NoCase(condition) {
    return this.http.post(this.baseUrl + '/PIM_RAM_FACTOR_RAM_NoCase', condition);
  }

  PIM_RAM_FACTOR_JFactor_NoCase(condition) {
    return this.http.post(this.baseUrl + '/PIM_RAM_FACTOR_JFactor_NoCase', condition);
  }

  MAX_Maintain_NoCase(condition) {
    return this.http.post(this.baseUrl + '/MAX_Maintain_NoCase', condition);
  }

  MAX_SustainCore_EnergySaving_NoCase(condition) {
    return this.http.post(this.baseUrl + '/MAX_SustainCore_EnergySaving_NoCase', condition);
  }
}
