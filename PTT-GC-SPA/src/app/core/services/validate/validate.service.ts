import { Injectable } from '@angular/core';
import { InitiativeService } from '@services/initiative/initiative.service';
import { FormGroup, FormArray, Form } from '@angular/forms';
import { SwalTool } from '@tools/swal.tools';
import { PermissionService } from '@services/permission/permission.service';
import { StageService } from '@services/stage/stage.service';
import { ProgressService } from '@services/progress/progress.service';
import { ImpactService } from '@services/impact/impact.service';
import { Initiative } from '@models/initiative';
import { ProgressPlanModel } from '@models/progress-milestone-model';
import { FirstRunRateTable } from '@models/impactTracking';
import { ShowControlDetailPim } from '@models/ShowControlDetailPim';
import { BehaviorSubject } from 'rxjs';
import { DetailService } from '@services/detail/detail.service';
@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  //ประกาสตัวแปร
  globalVariable: string;

  showIrr: boolean;
  showJFactor: boolean;
  showRam: boolean;
  showBenefitAmount: boolean;
  RequestCapex: boolean;
  RequestOpex: boolean;
  RequestProjectEngineer: boolean;
  showProjectTeamMax: boolean;
  showProjectTeamCapex: boolean;
  //RequestHandoverExecution: boolean;
  approvermailList: any[];

  isRequestCapex: boolean;
  noCapexDivestment: boolean;
  typeOfInvestmentCapex: any = null;

  inValidtab: {
    tabName: string;
  }[];

  newFeature: boolean;

  public showControlDetailPim = new BehaviorSubject({} as ShowControlDetailPim);
  getShowControlDetailPim = this.showControlDetailPim.asObservable();

  constructor(
    // inject service อื่น
    private initiativeService: InitiativeService,
    private swalTool: SwalTool,
    private permission: PermissionService,
    private stageService: StageService,
    private progressService: ProgressService,
    private impactService: ImpactService,
    private detailService: DetailService,
  ) {
    // set ค่าเริ่มต้น
    this.globalVariable = null;
    this.inValidtab = [];
    // this.initiativeService.getNewFeature().subscribe((newFeatureRes) => {
    //   this.newFeature = newFeatureRes;
    // });
  }

  setShowControlDetailPim(data: ShowControlDetailPim) {
    this.showControlDetailPim.next(data);
  }

  //ส่วนที่เขียน function
  setGlobalValiable(parameter: string) {
    //set another service variable
    this.initiativeService.initiativeType = parameter;

    //set local variable
    this.globalVariable = parameter;
  }


  checkInitiativeName(formGroup: FormGroup) {
    let value = formGroup.get('name').value;
    if (value) {
      return true;
    } else {
      return false
    }
  }


  SubmitValidation(formGroup: FormGroup) {
    formGroup.markAsUntouched();
    var returnValue = true;
    if (this.initiativeService.isCancel) {
      return this.ValidateRequireField(formGroup.get('submitToForm') as FormGroup, 'commentCancelled') && returnValue;
    }
    //this.swalTool.savingLoading('Check Validation');
    var returnValue = true;
    if (formGroup.get('submitToForm').get('status').value == 'cancelled') {
      return true;
    }

    if (formGroup.get('initiativesForm').get('initiativeType').value == "IT" || formGroup.get('initiativesForm').get('initiativeType').value == "Digital") {
      if (formGroup.get('initiativesForm')) {
        if (!this.ValidateGeneralITDIgitalInformationForm(formGroup as FormGroup)) {
          if (this.inValidtab.findIndex((t) => t.tabName == 'general') < 0) {
            this.inValidtab.push({
              tabName: 'general'
            });
          }
          returnValue = false;
        } else {
          if (this.inValidtab.findIndex((t) => t.tabName == 'general') >= 0) {
            let index = this.inValidtab.findIndex((t) => t.tabName == 'general');
            this.inValidtab.splice(index, 1);
          }
        }
      }
    } else {
      if (formGroup.get('initiativesForm')) {
        if (!this.ValidateGeneralInformationForm(formGroup.get('initiativesForm') as FormGroup)) {
          if (this.inValidtab.findIndex((t) => t.tabName == 'general') < 0) {
            this.inValidtab.push({
              tabName: 'general'
            });
          }
          returnValue = false;
        } else {
          if (this.inValidtab.findIndex((t) => t.tabName == 'general') >= 0) {
            let index = this.inValidtab.findIndex((t) => t.tabName == 'general');
            this.inValidtab.splice(index, 1);
          }
        }
      }
    }

    console.log('return value ', returnValue)

    if (formGroup.get('initiativesDetailForm')) {
      if (!this.ValidateInitiativeDetailForm(formGroup.get('initiativesDetailForm') as FormGroup)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'detailForm') < 0) {
          this.inValidtab.push({
            tabName: 'detailForm'
          });
        }
        returnValue = false;
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'detailForm') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'detailForm');
          this.inValidtab.splice(index, 1);
        }
      }
    }

    console.log('return value ', returnValue)

    if (formGroup.get('DetailMaxForm')) {
      let benefitType = (formGroup.get('initiativesForm').get('typeBenefit')) ? formGroup.get('initiativesForm').get('typeBenefit').value : null;
      if (!this.ValidateDetailMForm(formGroup.get('DetailMaxForm') as FormGroup, benefitType)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'detailMaxForm') < 0) {
          this.inValidtab.push({
            tabName: 'detailMaxForm'
          });
        }
        returnValue = false;
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'detailMaxForm') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'detailMaxForm');
          this.inValidtab.splice(index, 1);
        }
      }
    }

    console.log('return value ', returnValue)

    if (formGroup.get('capexInformationForm')) {
      if (!this.ValidateCapexInformationForm(formGroup.get('capexInformationForm') as FormGroup)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'capexInformationForm') < 0) {
          this.inValidtab.push({
            tabName: 'capexInformationForm'
          });
        }
        returnValue = false;
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'capexInformationForm') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'capexInformationForm');
          this.inValidtab.splice(index, 1);
        }
      }
    }

    console.log('return value ', returnValue)

    if (formGroup.get('ImpactForm') && formGroup.get('DetailMaxForm')?.get('requireDirectBenefit')?.value == true && this.initiativeService.suggestionStatus?.dim) {
      if (!this.ValidateImpactTracking(formGroup.get('ImpactForm') as FormGroup)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'ImpactForm') < 0) {
          this.inValidtab.push({
            tabName: 'ImpactForm'
          });
        }
        returnValue = false;
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'ImpactForm') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'ImpactForm');
          this.inValidtab.splice(index, 1);
        }
      }
    } else if (formGroup.get('ImpactForm') && this.initiativeService.suggestionStatus?.max) {
      if (!this.ValidateImpactTracking(formGroup.get('ImpactForm') as FormGroup)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'ImpactForm') < 0) {
          this.inValidtab.push({
            tabName: 'ImpactForm'
          });
        }
        returnValue = false;
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'ImpactForm') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'ImpactForm');
          this.inValidtab.splice(index, 1);
        }
      }
    }

    if (formGroup.get('detailPimForm')) {
      if (!this.ValidateDetailPimForm(formGroup)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'detailPimForm') < 0) {
          this.inValidtab.push({
            tabName: 'detailPimForm'
          });
        }
        returnValue = false
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'detailPimForm') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'detailPimForm');
          this.inValidtab.splice(index, 1);
        }
      }
    }

    if (formGroup.get('progressForm')) {
      if (!this.ValidateProgress(formGroup.get('progressForm') as FormGroup)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'progressForm') < 0) {
          this.inValidtab.push({
            tabName: 'progressForm'
          });
        }
        returnValue = false;
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'progressForm') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'progressForm');
          this.inValidtab.splice(index, 1);
        }
      }
    }

    //poc big table

    if (formGroup.get('poc1')) {
      // console.log('false eiei')
      if (!this.ValidatePoc1Table(formGroup.get('poc1') as FormGroup)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'poc1') < 0) {
          this.inValidtab.push({
            tabName: 'poc1'
          });
        }
        returnValue = false;
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'poc1') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'poc1');
          this.inValidtab.splice(index, 1);
        }
      }
    }


    if (formGroup.get('poc2FormNewLogic')) {
      // console.log('false eiei')
      if (!this.ValidatePoc2Table(formGroup.get('poc2FormNewLogic') as FormGroup)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'poc2') < 0) {
          this.inValidtab.push({
            tabName: 'poc2'
          });
        }
        returnValue = false;
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'poc2') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'poc2');
          this.inValidtab.splice(index, 1);
        }
      }
    }

    console.log('return value ', returnValue)

    if (formGroup.get('bscNarrativeForm')) {
      if (!this.ValidateBscNarrativeForm(formGroup.get('bscNarrativeForm') as FormGroup)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'bscNarrativeForm') < 0) {
          this.inValidtab.push({
            tabName: 'bscNarrativeForm'
          });
        }
        returnValue = false;
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'bscNarrativeForm') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'bscNarrativeForm');
          this.inValidtab.splice(index, 1);
        }
      }
    }

    console.log('return value ', returnValue)

    if (formGroup.get('bestPracticeForm')) {
      if (!this.ValidateBestPractice(formGroup.get('bestPracticeForm') as FormGroup)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'bestPracticeForm') < 0) {
          this.inValidtab.push({
            tabName: 'bestPracticeForm'
          });
        }
        returnValue = false;
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'bestPracticeForm') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'bestPracticeForm');
          this.inValidtab.splice(index, 1);
        }
      }
    }

    if (formGroup.get('resourceNeededForm')) {
      if (!this.ValidateResourceNeeded(formGroup.get('resourceNeededForm') as FormGroup)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'resourceNeededForm') < 0) {
          this.inValidtab.push({
            tabName: 'resourceNeededForm'
          });
        }
        returnValue = false;
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'resourceNeededForm') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'resourceNeededForm');
          this.inValidtab.splice(index, 1);
        }
      }
    }

    //validate look back
    if (formGroup.get('lookbackForm')) {
      if (!this.ValidateLookbackForm(formGroup.get('lookbackForm') as FormGroup)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'lookbackForm') < 0) {
          this.inValidtab.push({
            tabName: 'lookbackForm'
          });
        }
        returnValue = false;
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'lookbackForm') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'lookbackForm');
          this.inValidtab.splice(index, 1);
        }
      }
    }

    console.log('return value ', returnValue)


    if (!returnValue) {
      this.swalTool.Required();
    }
    console.log('return value ', returnValue)
    return returnValue
  }

  ValidateGeneralInformationForm_Backup1(formGroup: FormGroup) {
    var returnValue = true;
    if (formGroup.get('name') || formGroup.get('name').value.trim() == '') {
      formGroup.get('name').markAsTouched();
      formGroup.get('name').setErrors({ 'invalid': true });
      returnValue = false;
    }

    if (formGroup.get('ownerName') || formGroup.get('ownerName').value.trim() == '') {
      returnValue = false;
    }

    if (formGroup.get('organization') || formGroup.get('organization').value.trim() == '') {
      returnValue = false;
    }

    return returnValue;
  }

  ValidateDetailPimForm(form: FormGroup) {
    let general = form.get('initiativesForm') as FormGroup;
    let detail = form.get('detailPimForm') as FormGroup;
    let returnValue = true;
    let requestCapex = general.get("requestCapex").value;
    let requestOpex = general.get("requestOpex").value;
    let generalData: Initiative = this.initiativeService.generalData.value;
    requestCapex === "true" ? this.RequestCapex = true : this.RequestCapex = false;
    requestOpex === "trueOpex" ? this.RequestOpex = true : this.RequestOpex = false;


    //this.RequestHandoverExecution = Boolean(detail.get("requestHandoverExecution").value);
    this.RequestProjectEngineer = Boolean(general.get("requestProjectEngineer").value);


    // Flow Direct CAPEX
    this.showProjectTeamCapex = false;

    if (this.RequestProjectEngineer) {
      this.showProjectTeamCapex = false;

      if (this.initiativeService.suggestionStatus?.stage != null && this.initiativeService.suggestionStatus?.stage != '') {
        this.showProjectTeamCapex = true;
      }
    }
    else {
      this.showProjectTeamCapex = true;
    }


    //Flow MAX
    this.showProjectTeamMax = false;

    if (this.RequestProjectEngineer) {
      if ((this.initiativeService.suggestionStatus?.stage != null && this.initiativeService.suggestionStatus?.stage != '')
        && this.initiativeService.suggestionStatus?.stage != 'SIL1' && this.initiativeService.suggestionStatus?.stage != 'IL0') {
        this.showProjectTeamMax = true;
      }
    }
    else {
      if ((this.initiativeService.suggestionStatus?.stage != null && this.initiativeService.suggestionStatus?.stage != '')
        && this.initiativeService.suggestionStatus?.stage != 'SIL1' && this.initiativeService.suggestionStatus?.stage != 'IL0'
        && this.initiativeService.suggestionStatus?.stage != 'Assign Project Eng.') {
        this.showProjectTeamMax = true;
      }
    }


    let showControl: ShowControlDetailPim = this.showControlDetailPim.value;

    if (this.initiativeService.initiativeType == "pim") {

      returnValue = this.ValidateRequireField(detail, 'kickoffMeeting') && returnValue;
      if (showControl.showProjectTeam) {
        returnValue = this.ValidateRequireField(detail, 'gate1Date') && returnValue;
        returnValue = this.ValidateRequireField(detail, 'gate3Date') && returnValue;
      }
      if (showControl.isGate0Stage) {
        returnValue = this.ValidateRequireField(detail, 'projectEngineer') && returnValue;
        returnValue = this.ValidateRequireField(detail, 'projectManager') && returnValue;
      }
      if (showControl.showProjectTeam && !showControl.getSimProjectSkipGate2) {
        returnValue = this.ValidateRequireField(detail, 'gate2Date') && returnValue;
      }

      if (detail && detail.get("isImpactProduction").value === "true" && detail.get("useExternalEmoc").value === "true") {
        const emocFormArray: FormArray = detail.get('eMocs') as FormArray;
        const emocFormLength = emocFormArray.length;
        let countMainPlant = 0;
        for (let index = 0; index < emocFormLength; index++) {
          let eMoc = emocFormArray.at(index) as FormGroup;
          const typeOfChange = eMoc.get('typeOfChange').value;
          if (!eMoc.get('emocNo').value) {
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'eMocTitle') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'goalAchievement') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'assumptionOfGoal') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'reasonForChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'plant') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'areaUnit') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'typeOfChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocCategory') && returnValue;

            if (typeOfChange == 2 && !this.initiativeService.viewMode) {
              returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'expireDate') && returnValue;
            }
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'detailOfTheChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'initialListOfPeople') && returnValue;
            //returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'emocNo') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocChampion') && returnValue;
          }
          if (emocFormArray.at(index).get('isMainPlant').value === true) {
            ++countMainPlant;
          }

        }

        if (countMainPlant > 1) {
          returnValue = returnValue && false;
        }
      }
    }

    if (this.initiativeService.initiativeType == "max") {
      if (this.RequestCapex || this.RequestOpex) {
        if (this.initiativeService.suggestionStatus?.stage === 'Assign Project Eng.') {
          returnValue = this.ValidateRequireField(detail, 'projectEngineer') && returnValue;
          returnValue = this.ValidateRequireField(detail, 'projectManager') && returnValue;
        }
        returnValue = this.ValidateRequireField(detail, 'kickoffMeeting') && returnValue;
        if (this.showProjectTeamMax) {
          returnValue = this.ValidateRequireField(detail, 'projectEngineer') && returnValue;
          returnValue = this.ValidateRequireField(detail, 'projectManager') && returnValue;
        }

      }
      if (detail && detail.get("isImpactProduction").value === "true" && detail.get("useExternalEmoc").value === "true") {
        const emocFormArray: FormArray = detail.get('eMocs') as FormArray;
        const emocFormLength = emocFormArray.length;
        let countMainPlant = 0;
        for (let index = 0; index < emocFormLength; index++) {
          let eMoc = emocFormArray.at(index) as FormGroup;
          const typeOfChange = eMoc.get('typeOfChange').value;
          if (!eMoc.get('emocNo').value) {
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'eMocTitle') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'goalAchievement') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'assumptionOfGoal') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'reasonForChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'plant') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'areaUnit') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'typeOfChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocCategory') && returnValue;

            if (typeOfChange == 2 && !this.initiativeService.viewMode) {
              returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'expireDate') && returnValue;
            }
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'detailOfTheChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'initialListOfPeople') && returnValue;
            //returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'emocNo') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocChampion') && returnValue;
          }
          if (emocFormArray.at(index).get('isMainPlant').value === true) {
            ++countMainPlant;
          }

        }

        if (countMainPlant > 1) {
          returnValue = returnValue && false;
        }
      }
    }

    if (this.initiativeService.initiativeType == "cpi") {
      if (detail && detail.get("isImpactProduction").value === "true" && detail.get("useExternalEmoc").value === "true") {
        const emocFormArray: FormArray = detail.get('eMocs') as FormArray;
        const emocFormLength = emocFormArray.length;
        let countMainPlant = 0;
        for (let index = 0; index < emocFormLength; index++) {
          let eMoc = emocFormArray.at(index) as FormGroup;
          const typeOfChange = eMoc.get('typeOfChange').value;
          if (!eMoc.get('emocNo').value) {
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'eMocTitle') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'goalAchievement') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'assumptionOfGoal') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'reasonForChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'plant') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'areaUnit') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'typeOfChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocCategory') && returnValue;

            if (typeOfChange == 2 && !this.initiativeService.viewMode) {
              returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'expireDate') && returnValue;
            }
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'detailOfTheChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'initialListOfPeople') && returnValue;
            //returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'emocNo') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocChampion') && returnValue;
          }
          if (emocFormArray.at(index).get('isMainPlant').value === true) {
            ++countMainPlant;
          }

        }

        if (countMainPlant > 1) {
          returnValue = returnValue && false;
        }
      }
    }

    if (this.initiativeService.initiativeType == "strategy") {
      if (detail && detail.get("isImpactProduction").value === "true" && detail.get("useExternalEmoc").value === "true") {
        const emocFormArray: FormArray = detail.get('eMocs') as FormArray;
        const emocFormLength = emocFormArray.length;
        let countMainPlant = 0;
        for (let index = 0; index < emocFormLength; index++) {
          let eMoc = emocFormArray.at(index) as FormGroup;
          const typeOfChange = eMoc.get('typeOfChange').value;
          if (!eMoc.get('emocNo').value) {
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'eMocTitle') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'goalAchievement') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'assumptionOfGoal') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'reasonForChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'plant') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'areaUnit') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'typeOfChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocCategory') && returnValue;

            if (typeOfChange == 2 && !this.initiativeService.viewMode) {
              returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'expireDate') && returnValue;
            }
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'detailOfTheChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'initialListOfPeople') && returnValue;
            //returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'emocNo') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocChampion') && returnValue;
          }
          if (emocFormArray.at(index).get('isMainPlant').value === true) {
            ++countMainPlant;
          }

        }

        if (countMainPlant > 1) {
          returnValue = returnValue && false;
        }
      }
    }

    if (this.initiativeService.initiativeType == "cim") {

      returnValue = this.ValidateRequireField(detail, 'projectEngineer') && returnValue;
      returnValue = this.ValidateRequireField(detail, 'projectManager') && returnValue;

      // if(this.RequestHandoverExecution){
      //   returnValue = this.ValidateRequireField(detail, 'projectEngineer') && returnValue;
      //   returnValue = this.ValidateRequireField(detail, 'projectManager') && returnValue;
      // }

      if (detail && detail.get("isImpactProduction").value === "true" && detail.get("useExternalEmoc").value === "true") {
        const emocFormArray: FormArray = detail.get('eMocs') as FormArray;
        const emocFormLength = emocFormArray.length;
        let countMainPlant = 0;
        for (let index = 0; index < emocFormLength; index++) {
          let eMoc = emocFormArray.at(index) as FormGroup;
          const typeOfChange = eMoc.get('typeOfChange').value;
          if (!eMoc.get('emocNo').value) {
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'eMocTitle') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'goalAchievement') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'assumptionOfGoal') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'reasonForChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'plant') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'areaUnit') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'typeOfChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocCategory') && returnValue;

            if (typeOfChange == 2 && !this.initiativeService.viewMode) {
              returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'expireDate') && returnValue;
            }
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'detailOfTheChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'initialListOfPeople') && returnValue;
            //returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'emocNo') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocChampion') && returnValue;
          }
          if (emocFormArray.at(index).get('isMainPlant').value === true) {
            ++countMainPlant;
          }

        }

        if (countMainPlant > 1) {
          returnValue = returnValue && false;
        }
      }
    }

    if (this.initiativeService.initiativeType == "directCapex") {

      if (this.showProjectTeamCapex) {
        returnValue = this.ValidateRequireField(detail, 'projectEngineer') && returnValue;
        returnValue = this.ValidateRequireField(detail, 'projectManager') && returnValue;
      }

      if (showControl.isGate0Stage) {
        returnValue = this.ValidateRequireField(detail, 'projectEngineer') && returnValue;
        returnValue = this.ValidateRequireField(detail, 'projectManager') && returnValue;
      }

      if (detail && detail.get("isImpactProduction").value === "true" && detail.get("useExternalEmoc").value === "true") {
        const emocFormArray: FormArray = detail.get('eMocs') as FormArray;
        const emocFormLength = emocFormArray.length;
        let countMainPlant = 0;
        for (let index = 0; index < emocFormLength; index++) {
          let eMoc = emocFormArray.at(index) as FormGroup;
          const typeOfChange = eMoc.get('typeOfChange').value;
          if (!eMoc.get('emocNo').value) {
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'eMocTitle') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'goalAchievement') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'assumptionOfGoal') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'reasonForChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'plant') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'areaUnit') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'typeOfChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocCategory') && returnValue;

            if (typeOfChange == 2 && !this.initiativeService.viewMode) {
              returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'expireDate') && returnValue;
            }
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'detailOfTheChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'initialListOfPeople') && returnValue;
            //returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'emocNo') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocChampion') && returnValue;
          }
          if (emocFormArray.at(index).get('isMainPlant').value === true) {
            ++countMainPlant;
          }

        }

        if (countMainPlant > 1) {
          returnValue = returnValue && false;
        }
      }
    }

    if (this.initiativeService.initiativeType == "dim") {

      returnValue = this.ValidateRequireField(detail, 'projectEngineer') && returnValue;
      returnValue = this.ValidateRequireField(detail, 'projectManager') && returnValue;


      if (detail && detail.get("isImpactProduction").value === "true" && detail.get("useExternalEmoc").value === "true") {
        const emocFormArray: FormArray = detail.get('eMocs') as FormArray;
        const emocFormLength = emocFormArray.length;
        let countMainPlant = 0;
        for (let index = 0; index < emocFormLength; index++) {
          let eMoc = emocFormArray.at(index) as FormGroup;
          const typeOfChange = eMoc.get('typeOfChange').value;
          if (!eMoc.get('emocNo').value) {
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'eMocTitle') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'goalAchievement') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'assumptionOfGoal') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'reasonForChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'plant') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'areaUnit') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'typeOfChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocCategory') && returnValue;

            if (typeOfChange == 2 && !this.initiativeService.viewMode) {
              returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'expireDate') && returnValue;
            }
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'detailOfTheChange') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'initialListOfPeople') && returnValue;
            //returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'emocNo') && returnValue;
            returnValue = this.ValidateRequireField(emocFormArray.at(index) as FormGroup, 'mocChampion') && returnValue;
          }
          if (emocFormArray.at(index).get('isMainPlant').value === true) {
            ++countMainPlant;
          }

        }

        if (countMainPlant > 1) {
          returnValue = returnValue && false;
        }
      }
    }






    //validate gate
    if (this.initiativeService.valiadteGate) {
      let gate1 = form.get('gate1Form') as FormGroup;
      let gate2 = form.get('gate2Form') as FormGroup;
      let gate3 = form.get('gate3Form') as FormGroup;
      let gate4 = form.get('gate4Form') as FormGroup;







      switch (this.initiativeService.valiadteGate) {
        case '1':
          returnValue = this.ValidateRequireField(gate1, 'vacDate') && returnValue;

          returnValue = this.ValidateRequireField(gate1, 'overallCapex') && returnValue;
          returnValue = this.ValidateRequireField(gate1, 'requestOpex') && returnValue;

          if (this.showIrr) {
            returnValue = this.ValidateRequireField(gate1, 'irr') && returnValue;
          }

          if (this.showJFactor) {
            returnValue = this.ValidateRequireField(gate1, 'jFactor') && returnValue;
          }

          if (this.showRam) {
            returnValue = this.ValidateRequireField(gate1, 'ram') && returnValue;
          }

          if (this.showBenefitAmount) {
            returnValue = this.ValidateRequireField(gate1, 'benefit') && returnValue;
          }


          //require pic member on pic stage
          if (this.initiativeService.suggestionStatus?.stage?.toLowerCase().indexOf("pic") >= 0) {
            returnValue = this.ValidateRequireField(gate1, 'gateDate') && returnValue;

            let upStream = this.ValidateRequireFieldPicMember(gate1, 'upStream');
            let downStream = this.ValidateRequireFieldPicMember(gate1, 'downStream');
            if (!upStream && !downStream) {
              gate1.get('upStream').markAsTouched();
              gate1.get('upStream').setErrors({ 'invalid': true });
              gate1.get('downStream').markAsTouched();
              gate1.get('downStream').setErrors({ 'invalid': true });
              returnValue = returnValue && false;
            }
          }

          break;
        case '2':
          if (this.initiativeService.initiativeType != "max") {
            returnValue = this.ValidateRequireField(gate2, 'vacDate') && returnValue;

            returnValue = this.ValidateRequireField(gate2, 'receivedOpexBudget') && returnValue;
            returnValue = this.ValidateRequireField(gate2, 'additionalOpexBudget') && returnValue;
            returnValue = this.ValidateRequireField(gate2, 'overallCapex') && returnValue;
            returnValue = this.ValidateRequireField(gate2, 'tieInLongLeadItemsBudget') && returnValue;

            if (this.showIrr) {
              returnValue = this.ValidateRequireField(gate2, 'irr') && returnValue;
            }

            if (this.showJFactor) {
              returnValue = this.ValidateRequireField(gate2, 'jFactor') && returnValue;
            }

            if (this.showRam) {
              returnValue = this.ValidateRequireField(gate2, 'ram') && returnValue;
            }

            if (this.showBenefitAmount) {
              returnValue = this.ValidateRequireField(gate2, 'benefit') && returnValue;
            }

            //require pic member on pic stage
            if (this.initiativeService.suggestionStatus?.stage?.toLowerCase().indexOf("pic") >= 0) {
              returnValue = this.ValidateRequireField(gate2, 'gateDate') && returnValue;

              let upStream = this.ValidateRequireFieldPicMember(gate2, 'upStream');
              let centerStream = this.ValidateRequireFieldPicMember(gate2, 'centerStream');
              let downStream = this.ValidateRequireFieldPicMember(gate2, 'downStream');
              if (!upStream && !centerStream && !downStream) {
                gate2.get('upStream').markAsTouched();
                gate2.get('upStream').setErrors({ 'invalid': true });
                gate2.get('centerStream').markAsTouched();
                gate2.get('centerStream').setErrors({ 'invalid': true });
                gate2.get('downStream').markAsTouched();
                gate2.get('downStream').setErrors({ 'invalid': true });
                returnValue = returnValue && false;
              }
            }
          }
          break;
        case '3':
          returnValue = this.ValidateRequireField(gate3, 'vacDate') && returnValue;

          returnValue = this.ValidateRequireField(gate3, 'receivedOpexBudget') && returnValue;
          returnValue = this.ValidateRequireField(gate3, 'requestCapexGate3') && returnValue;

          if (this.showIrr) {
            returnValue = this.ValidateRequireField(gate3, 'irr') && returnValue;
          }

          if (this.showJFactor) {
            returnValue = this.ValidateRequireField(gate3, 'jFactor') && returnValue;
          }

          if (this.showRam) {
            returnValue = this.ValidateRequireField(gate3, 'ram') && returnValue;
          }

          if (this.showBenefitAmount) {
            returnValue = this.ValidateRequireField(gate3, 'benefit') && returnValue;
          }
          //require pic member on pic stage
          if (this.initiativeService.suggestionStatus?.stage?.toLowerCase().indexOf("pic") >= 0 && !this.initiativeService.suggestionStatus.max) {
            returnValue = this.ValidateRequireField(gate3, 'gateDate') && returnValue;

            let upStream = this.ValidateRequireFieldPicMember(gate3, 'upStream');
            let centerStream = this.ValidateRequireFieldPicMember(gate3, 'centerStream');
            let downStream = this.ValidateRequireFieldPicMember(gate3, 'downStream');
            if (!upStream && !centerStream && !downStream) {
              gate3.get('upStream').markAsTouched();
              gate3.get('upStream').setErrors({ 'invalid': true });
              gate3.get('centerStream').markAsTouched();
              gate3.get('centerStream').setErrors({ 'invalid': true });
              gate3.get('downStream').markAsTouched();
              gate3.get('downStream').setErrors({ 'invalid': true });
              returnValue = returnValue && false;
            }
          } else if (generalData?.stage?.toLowerCase().indexOf("pic") >= 0 && this.initiativeService.suggestionStatus.max) {
            returnValue = this.ValidateRequireField(gate3, 'gateDate') && returnValue;
            let upStream = this.ValidateRequireFieldPicMember(gate3, 'upStream');
            let centerStream = this.ValidateRequireFieldPicMember(gate3, 'centerStream');
            let downStream = this.ValidateRequireFieldPicMember(gate3, 'downStream');
            if (!upStream && !centerStream && !downStream) {
              gate3.get('upStream').markAsTouched();
              gate3.get('upStream').setErrors({ 'invalid': true });
              gate3.get('centerStream').markAsTouched();
              gate3.get('centerStream').setErrors({ 'invalid': true });
              gate3.get('downStream').markAsTouched();
              gate3.get('downStream').setErrors({ 'invalid': true });
              returnValue = returnValue && false;
            }
          }
          break;
        case '4':
          returnValue = this.ValidateRequireField(gate4, 'vacDate') && returnValue;

          if (this.showIrr) {
            returnValue = this.ValidateRequireField(gate4, 'irr') && returnValue;
          }

          if (this.showJFactor) {
            returnValue = this.ValidateRequireField(gate4, 'jFactor') && returnValue;
          }

          if (this.showRam) {
            returnValue = this.ValidateRequireField(gate4, 'ram') && returnValue;
          }

          if (this.showBenefitAmount) {
            returnValue = this.ValidateRequireField(gate4, 'benefit') && returnValue;
          }
          //require pic member on pic stage
          if (this.initiativeService.suggestionStatus?.stage?.toLowerCase().indexOf("pic") >= 0) {
            returnValue = this.ValidateRequireField(gate4, 'gateDate') && returnValue;

            //check all
            let upStream = this.ValidateRequireFieldPicMember(gate4, 'upStream');
            let centerStream = this.ValidateRequireFieldPicMember(gate4, 'centerStream');
            let downStream = this.ValidateRequireFieldPicMember(gate4, 'downStream');
            if (!upStream && !centerStream && !downStream) {
              gate4.get('upStream').markAsTouched();
              gate4.get('upStream').setErrors({ 'invalid': true });
              gate4.get('centerStream').markAsTouched();
              gate4.get('centerStream').setErrors({ 'invalid': true });
              gate4.get('downStream').markAsTouched();
              gate4.get('downStream').setErrors({ 'invalid': true });
              returnValue = returnValue && false;
            }
          }
          break;
        default:
          break;
      }
    }





    // returnValue = this.ValidateRequireField(form, 'iL3Date') && returnValue;
    // returnValue = this.ValidateRequireField(form, 'iL4Date') && returnValue;
    // returnValue = this.ValidateRequireField(form, 'iL5Date') && returnValue;
    // } else {
    //   returnValue = !detail.get('kickoffMeeting').invalid && returnValue;
    //   let showProjectTeamStages = ['initiative-1', 'initiative-2', 'initiative-3'];
    //   if (this.initiativeService.suggestionStatus.stage !== null && !(showProjectTeamStages.indexOf(this.initiativeService.suggestionStatus?.stage?.toLowerCase()) >= 0) && general.get('requestProjectEngineer').value) {
    //     returnValue = !detail.get('projectEngineer').invalid && returnValue
    //     console.log('inif')
    //   }
    //   returnValue = !detail.get('gate1Date').disabled ? this.ValidateRequireField(detail, 'gate1Date') && returnValue : returnValue;
    //   returnValue = !detail.get('gate2Date').disabled ? this.ValidateRequireField(detail, 'gate2Date') && returnValue : returnValue;
    //   returnValue = !detail.get('gate3Date').disabled ? this.ValidateRequireField(detail, 'gate3Date') && returnValue : returnValue;
    // }

    return returnValue;
  }

  ValidateBestPractice(form: FormGroup) {
    var returnValue = true;
    if (form.get('isBestPracticeRequired').value) {
      returnValue = this.ValidateRequireField(form, 'sharedPracticeType') && returnValue;
      returnValue = this.ValidateRequireField(form, 'lifeTimeOfProject') && returnValue;
      returnValue = this.ValidateRequireField(form, 'investment') && returnValue;
      returnValue = this.ValidateRequireField(form, 'projectCost') && returnValue;
      returnValue = this.ValidateRequireField(form, 'applyFromOpEx') && returnValue;
      returnValue = this.ValidateRequireField(form, 'businessLine') && returnValue;
      returnValue = this.ValidateRequireField(form, 'projectType') && returnValue;
      returnValue = this.ValidateRequireField(form, 'oemsElement') && returnValue;
      returnValue = this.ValidateRequireField(form, 'application') && returnValue;
      returnValue = this.ValidateRequireField(form, 'operationFunction') && returnValue;
      returnValue = this.ValidateRequireField(form, 'operationUnit') && returnValue;
      returnValue = this.ValidateRequireField(form, 'equipmentType') && returnValue;
      returnValue = this.ValidateRequireField(form, 'productGroup') && returnValue;
    }
    return returnValue;
  }


  ValidateGeneralInformationForm(form: FormGroup) {
    var returnValue = true;

    this.isRequestCapex = form.get('requestCapex').value == 'true';
    this.noCapexDivestment = form.get('divestment').value;
    this.typeOfInvestmentCapex = (this.isRequestCapex) ? form.get('typeOfInvestment').value : null;
    returnValue = this.ValidateRequireField(form, 'name') && returnValue;
    returnValue = this.ValidateRequireField(form, 'ownerName') && returnValue;
    returnValue = this.ValidateRequireField(form, 'organization') && returnValue;
    returnValue = this.ValidateRequireField(form, 'company') && returnValue;
    returnValue = this.ValidateRequireField(form, 'plant') && returnValue;
    returnValue = this.ValidateRequireField(form, 'background') && returnValue;
    returnValue = this.ValidateRequireField(form, 'resultObjective') && returnValue;
    returnValue = this.ValidateRequireField(form, 'scopeOfWork') && returnValue;
    returnValue = this.ValidateRequireField(form, 'finishingDate') && returnValue;
    returnValue = this.ValidateRequireField(form, 'startingDate') && returnValue;

    if (form.get('alignWithCorpStrategy').value) {
      returnValue = this.ValidateRequireField(form, 'year') && returnValue;
      returnValue = this.ValidateRequireField(form, 'strategicObjective') && returnValue;
      returnValue = this.ValidateRequireField(form, 'strategyType') && returnValue;
    }

    if (this.showIrr && form.get('irr') && form.get('irr').enabled) {
      returnValue = this.ValidateRequireField(form, 'irr') && returnValue;
    }

    if (this.showJFactor && form.get('jFactor') && form.get('jFactor').enabled) {
      returnValue = this.ValidateRequireField(form, 'jFactor') && returnValue;
    }

    if (this.showRam && form.get('ram') && form.get('ram').enabled) {
      returnValue = this.ValidateRequireField(form, 'ram') && returnValue;
    }

    if (form.get('requestCapex').value == 'true') {
      returnValue = this.ValidateRequireField(form, 'costEstCapex') && returnValue;
      returnValue = this.ValidateRequireField(form, 'typeOfInvestment') && returnValue;
      returnValue = this.ValidateRequireField(form, 'budgetSource') && returnValue;
    }
    if (form.get('requestCapex').value == 'true' &&
      form.get('costEstCapexType').value != 'THB') {
      returnValue = this.ValidateRequireField(form, 'fxExchange') && returnValue;
    }
    if (form.get('typeBenefit').enabled) {
      returnValue = this.ValidateRequireField(form, 'typeBenefit') && returnValue;
    }

    if (this.showBenefitAmount) {
      const checkValue = form.get('benefitAmount').value ? parseFloat(form.get('benefitAmount').value) : 0;
      if (checkValue < 10000) {
        returnValue = this.ValidateRequireField(form, 'benefitAmount') && returnValue;
      } else {
        form.get('benefitAmount').markAsTouched();
        form.get('benefitAmount').setErrors({ 'invalid': true });
        returnValue = false && returnValue;
      }
    }

    if (this.initiativeService.useIrrCalculate) {
      returnValue = this.ValidateRequireField(form, 'residualValue') && returnValue;
      returnValue = this.ValidateRequireField(form, 'utilitiesCost') && returnValue;
      returnValue = this.ValidateRequireField(form, 'maintenanceCost') && returnValue;
      returnValue = this.ValidateRequireField(form, 'catalystChemicalsCost') && returnValue;
      returnValue = this.ValidateRequireField(form, 'labourCost') && returnValue;
    }


    return returnValue;
  }

  ValidateGeneralITDIgitalInformationForm(formGroup: FormGroup) {
    let form = formGroup.get('initiativesForm') as FormGroup;
    let dimForm = formGroup.get('DimForm') as FormGroup;
    let capexTopics = this.initiativeService.capexTopics.value;
    var returnValue = true;
    if (form.get('initiativeType').value == "IT" || form.get('initiativeType').value == "Digital") {
      returnValue = this.ValidateRequireField(form, 'name') && returnValue;
      returnValue = this.ValidateRequireField(form, 'ownerName') && returnValue;
      returnValue = this.ValidateRequireField(form, 'organization') && returnValue;
      returnValue = this.ValidateRequireField(form, 'company') && returnValue;
      returnValue = this.ValidateRequireField(form, 'plant') && returnValue;
      returnValue = this.ValidateRequireField(form, 'background') && returnValue;
      returnValue = this.ValidateRequireField(form, 'resultObjective') && returnValue;
      returnValue = this.ValidateRequireField(form, 'scopeOfWork') && returnValue;
      returnValue = this.ValidateRequireField(form, 'finishingDate') && returnValue;
      returnValue = this.ValidateRequireField(form, 'startingDate') && returnValue;

      if (form.get('typeBenefit').enabled) {
        returnValue = this.ValidateRequireField(form, 'typeBenefit') && returnValue;
      }

      if (form.get('typeBenefit')?.value === 'FINANCIAL') {
        const checkValue = form.get('benefitAmount').value ? parseFloat(form.get('benefitAmount').value) : 0;
        if (checkValue < 10000) {
          returnValue = this.ValidateRequireField(form, 'benefitAmount') && returnValue;
        } else {
          form.get('benefitAmount').markAsTouched();
          form.get('benefitAmount').setErrors({ 'invalid': true });
          returnValue = false && returnValue;
        }
      }



      if (dimForm?.get('type')?.value === 'Project/System Enhancement') {
        returnValue = this.ValidateRequireField(form, 'costEstCapex') && returnValue;

        if (this.initiativeService.surveyVersions > 1 && capexTopics) {
          capexTopics.forEach(item => {
            if (item.isYesOrNo) {
              returnValue = this.ValidateRequireField(dimForm, item.topicId + '_value') && returnValue;
            }
          });
        }




      } else if (dimForm?.get('type')?.value === 'Hardware/Software') {
        returnValue = this.ValidateRequireField(form, 'costEstOpex') && returnValue;
      } else if (!dimForm?.get('type')?.value || dimForm?.get('type')?.value?.toString()?.length <= 0) {
        returnValue = this.ValidateRequireField(form, 'costEstCapex') && returnValue;
        returnValue = this.ValidateRequireField(form, 'costEstOpex') && returnValue;
      }



    }

    return returnValue;
  }

  ValidateInitiativeDetailForm(form: FormGroup) {
    var returnValue = true;
    if (this.initiativeService.suggestionStatus?.cim) {
      //cim case
      returnValue = this.ValidateRequireField(form, 'entity') && returnValue;
      if (form.get('entity').value == 'other') { returnValue = this.ValidateRequireField(form, 'entitySpecify') && returnValue; }
      returnValue = this.ValidateRequireField(form, 'president') && returnValue;
      returnValue = this.ValidateRequireField(form, 'geography') && returnValue;
      if (form.get('geography').value == 'other') { returnValue = this.ValidateRequireField(form, 'geographySpecify') && returnValue; }
      returnValue = this.ValidateRequireField(form, 'president') && returnValue;
      // returnValue = this.ValidateRequireField(form, 'businessModel') && returnValue;
      returnValue = this.ValidateRequireField(form, 'shareOfInvestment') && returnValue;

      returnValue = this.ValidateRequireField(form, 'fx') && returnValue;

      if (form.get('requireBOD1').value) {
        returnValue = this.ValidateRequireField(form, 'boD1') && returnValue;
      }

      if (form.get('firstBudgetYear')) {
        returnValue = this.ValidateRequireField(form, 'firstBudgetYear') && returnValue;
      }

      returnValue = this.ValidateRequireField(form, 'entryMode') && returnValue;
      if (form.get('entryMode').value === "E009") {
        returnValue = this.ValidateRequireField(form, 'specify') && returnValue;
      }

      returnValue = this.ValidateRequireField(form, 'manager') && returnValue;
      returnValue = this.ValidateRequireField(form, 'boD2') && returnValue;


      if (form.get('financialAvgForm')) {
        if (!this.isRequestCapex && this.noCapexDivestment) {
          returnValue = this.ValidateRequireField(form.get('financialAvgForm') as FormGroup, 'totalValuation') && returnValue;
        }
        else if (this.isRequestCapex && (this.typeOfInvestmentCapex == 'Divestment')) {
          returnValue = this.ValidateRequireField(form.get('financialAvgForm') as FormGroup, 'totalValuation') && returnValue;
          returnValue = this.ValidateRequireField(form.get('financialAvgForm') as FormGroup, 'totalCapex') && returnValue;
        }
        else {
          //edit ebi
          returnValue = this.ValidateRequireField(form.get('financialAvgForm') as FormGroup, 'avgEbitda') && returnValue;
          returnValue = this.ValidateRequireField(form.get('financialAvgForm') as FormGroup, 'totalCapex') && returnValue;
        }
      }
      if (form.get('milestoneForm') && !this.progressService.haveProgress) {
        returnValue = this.ValidateMilestone(form.get('milestoneForm').get('progressDetails') as FormArray, returnValue);
      }
      if ((form.get('haveProduct').value === 'true') && form.get('productForm')?.get('products')) {
        returnValue = this.ValidateProduct(form.get('productForm')?.get('products') as FormArray, returnValue);
      }
    } else {
      //strategy case

      returnValue = this.ValidateRequireField(form, 'entity') && returnValue;
      if (form.get('entity').value == 'other') { returnValue = this.ValidateRequireField(form, 'entitySpecify') && returnValue; }
      returnValue = this.ValidateRequireField(form, 'president') && returnValue;
      returnValue = this.ValidateRequireField(form, 'geography') && returnValue;
      if (form.get('geography').value == 'other') { returnValue = this.ValidateRequireField(form, 'geographySpecify') && returnValue; }
      returnValue = this.ValidateRequireField(form, 'president') && returnValue;

      if (form.get('milestoneForm') && !this.progressService.haveProgress) {
        returnValue = this.ValidateMilestone(form.get('milestoneForm').get('progressDetails') as FormArray, returnValue);
      }

    }

    return returnValue;
  }


  ValidateDetailMForm(form: FormGroup, typeBenefit: string) {
    var returnValue = true;
    //pim & direccapex
    if (this.initiativeService.suggestionStatus?.pim || this.initiativeService.suggestionStatus?.directCapex) {

      if (this.initiativeService.suggestionStatus?.directCapex) {
        returnValue = this.ValidateRequireField(form, 'president') && returnValue;
        returnValue = this.ValidateRequireField(form, 'manager') && returnValue;
        returnValue = this.ValidateRequireField(form, 'projectManager') && returnValue;
      }


      if (this.initiativeService.ShowTabCapex) {

        returnValue = this.ValidateRequireField(form, 'depreciationCost') && returnValue;
        returnValue = this.ValidateRequireField(form, 'usefulYear') && returnValue;
        returnValue = this.ValidateRequireField(form, 'usefulMonth') && returnValue;
        returnValue = this.ValidateRequireField(form, 'forEnvironment') && returnValue;
        returnValue = this.ValidateRequireField(form, 'forTurnaround') && returnValue;
        returnValue = this.ValidateRequireField(form, 'replaceEquipment') && returnValue;

        if (form.get('forTurnaround') && Boolean(form.get('forTurnaround').value == 'true')) {
          returnValue = this.ValidateRequireField(form, 'cutFeedDate') && returnValue;
          returnValue = this.ValidateRequireField(form, 'startUpDate') && returnValue;
          returnValue = this.ValidateRequireField(form, 'cycleYear') && returnValue;
          returnValue = this.ValidateRequireField(form, 'cycleMonth') && returnValue;
        }

        if (form.get('replaceEquipment') && Boolean(form.get('replaceEquipment').value == 'true')) {
          returnValue = this.ValidateRequireField(form, 'equipmentName') && returnValue;
          returnValue = this.ValidateRequireField(form, 'replacementDate') && returnValue;
          returnValue = this.ValidateRequireField(form, 'oldAssetCondition') && returnValue;
          returnValue = this.ValidateRequireField(form, 'equipmentOrAsset') && returnValue;
          if (form.get('oldAssetCondition').value == 'repair') returnValue = this.ValidateRequireField(form, 'oldAssetNo') && returnValue;
        }

        returnValue = this.ValidateRequireField(form, 'boi') && returnValue;
        returnValue = this.ValidateRequireField(form, 'haveAdditional') && returnValue;
        returnValue = this.ValidateRequireField(form, 'coordinate') && returnValue;

        if (form.get('coordinate') && Boolean(form.get('coordinate').value == 'true')) {
          returnValue = this.ValidateRequireField(form, 'parties') && returnValue;
        }

        if (typeBenefit === 'FINANCIAL') {
          returnValue = this.ValidateRequireField(form, 'baseCase') && returnValue;
          returnValue = this.ValidateRequireField(form, 'projectIrrBaseCase') && returnValue;
          // returnValue = this.ValidateRequireField(form, 'npvBaseCase') && returnValue;
          returnValue = this.ValidateRequireField(form, 'paybackBaseCase') && returnValue;
          returnValue = this.ValidateRequireField(form, 'ebitdaBaseCase') && returnValue;
        }
      }
    }

    //dim
    if (this.initiativeService.suggestionStatus?.dim) {
      console.log('dim original validate');
      returnValue = this.ValidateRequireField(form, 'projectSponsor') && returnValue;
      returnValue = this.ValidateRequireField(form, 'president') && returnValue;
      returnValue = this.ValidateRequireField(form, 'manager') && returnValue;
      returnValue = this.ValidateRequireField(form, 'projectManager') && returnValue;
      returnValue = this.ValidateRequireField(form, 'iTFocalPoint') && returnValue;

      // returnValue = this.ValidateRequireField(form, 'digitalStrategy') && returnValue;
      // returnValue = this.ValidateRequireField(form, 'projectCategory') && returnValue;
      // returnValue = this.ValidateRequireField(form, 'valueChain') && returnValue;
      //Project group (Pre-screening) => valueChain

      returnValue = this.ValidateRequireField(form, 'baselineStartDate') && returnValue;
      returnValue = this.ValidateRequireField(form, 'baselineFinishDate') && returnValue;

      returnValue = this.ValidateRequireField(form, 'impactedParties') && returnValue;
      returnValue = this.ValidateRequireField(form, 'teamMember') && returnValue;

      /*if (!this.initiativeService.selectDigitalCapex) {
        returnValue = this.ValidateRequireField(form, 'digitalFocalPoint') && returnValue;
      }*/

      //reviseForecastStartDate && actualStartDate require field
      if (this.stageService.IsOriginalDisable.map(x => x.toLowerCase()).indexOf(this.initiativeService.suggestionStatus.stage?.toLowerCase()) >= 0) {
        returnValue = this.ValidateRequireField(form, 'reviseForecastStartDate') && returnValue;
        returnValue = this.ValidateRequireField(form, 'reviseForecastFinishDate') && returnValue;
      }

      if (this.stageService.IsOriginalRequire.map(x => x.toLowerCase()).indexOf(this.initiativeService.suggestionStatus.stage?.toLowerCase()) >= 0) {

        returnValue = this.ValidateRequireField(form, 'actualStartDate') && returnValue;
        returnValue = this.ValidateRequireField(form, 'actualFinishDate') && returnValue;
      }

      if (form.get('requireDirectBenefit').value == true) {
        returnValue = this.ValidateRequireField(form, 'initiativeTypeMax') && returnValue;
        returnValue = this.ValidateRequireField(form, 'workstream') && returnValue;
        returnValue = this.ValidateRequireField(form, 'subWorkstream1') && returnValue;
        returnValue = this.ValidateRequireField(form, 'subWorkstream2') && returnValue;
        returnValue = this.ValidateRequireField(form, 'workstreamLead') && returnValue;

        if (this.getStageNumber(this.initiativeService.suggestionStatus?.stage) >= 1) {
          returnValue = this.ValidateRequireField(form, 'iL3Date') && returnValue;
          returnValue = this.ValidateRequireField(form, 'iL4Date') && returnValue;
          returnValue = this.ValidateRequireField(form, 'iL5Date') && returnValue;
        }

        if (this.initiativeService.ShowTabCapex) {
          if (typeBenefit === 'FINANCIAL') {
            returnValue = this.ValidateRequireField(form, 'baseCase') && returnValue;
            returnValue = this.ValidateRequireField(form, 'projectIrrBaseCase') && returnValue;
            // returnValue = this.ValidateRequireField(form, 'npvBaseCase') && returnValue;
            returnValue = this.ValidateRequireField(form, 'paybackBaseCase') && returnValue;
            returnValue = this.ValidateRequireField(form, 'ebitdaBaseCase') && returnValue;
          }

          returnValue = this.ValidateRequireField(form, 'depreciationCost') && returnValue;
          returnValue = this.ValidateRequireField(form, 'usefulYear') && returnValue;
          returnValue = this.ValidateRequireField(form, 'usefulMonth') && returnValue;
          returnValue = this.ValidateRequireField(form, 'forEnvironment') && returnValue;
          returnValue = this.ValidateRequireField(form, 'forTurnaround') && returnValue;
          returnValue = this.ValidateRequireField(form, 'replaceEquipment') && returnValue;

          if (form.get('forTurnaround') && Boolean(form.get('forTurnaround').value == 'true')) {
            returnValue = this.ValidateRequireField(form, 'cutFeedDate') && returnValue;
            returnValue = this.ValidateRequireField(form, 'startUpDate') && returnValue;
            returnValue = this.ValidateRequireField(form, 'cycleYear') && returnValue;
            returnValue = this.ValidateRequireField(form, 'cycleMonth') && returnValue;
          }

          if (form.get('replaceEquipment') && Boolean(form.get('replaceEquipment').value == 'true')) {
            returnValue = this.ValidateRequireField(form, 'equipmentName') && returnValue;
            returnValue = this.ValidateRequireField(form, 'replacementDate') && returnValue;
            returnValue = this.ValidateRequireField(form, 'oldAssetCondition') && returnValue;
            if (form.get('oldAssetCondition').value == 'repair') returnValue = this.ValidateRequireField(form, 'oldAssetNo') && returnValue;
            returnValue = this.ValidateRequireField(form, 'equipmentOrAsset') && returnValue;
          }

          returnValue = this.ValidateRequireField(form, 'boi') && returnValue;
          returnValue = this.ValidateRequireField(form, 'haveAdditional') && returnValue;
          returnValue = this.ValidateRequireField(form, 'coordinate') && returnValue;

          if (form.get('coordinate') && Boolean(form.get('coordinate').value == 'true')) {
            returnValue = this.ValidateRequireField(form, 'parties') && returnValue;
          }
        }
      }
    }

    //is Max
    if (this.initiativeService.suggestionStatus?.max) {
      returnValue = this.ValidateRequireField(form, 'initiativeTypeMax') && returnValue;
      returnValue = this.ValidateRequireField(form, 'workstream') && returnValue;
      returnValue = this.ValidateRequireField(form, 'subWorkstream1') && returnValue;
      returnValue = this.ValidateRequireField(form, 'subWorkstream2') && returnValue;
      returnValue = this.ValidateRequireField(form, 'workstreamLead') && returnValue;

      returnValue = this.ValidateRequireField(form, 'initiativeTypeMax') && returnValue;
      returnValue = this.ValidateRequireField(form, 'workstream') && returnValue;
      returnValue = this.ValidateRequireField(form, 'subWorkstream1') && returnValue;
      returnValue = this.ValidateRequireField(form, 'subWorkstream2') && returnValue;
      returnValue = this.ValidateRequireField(form, 'workstreamLead') && returnValue;
      returnValue = this.ValidateNoExistInMaster(form, 'workstreamLead') && returnValue;

      if (this.getStageNumber(this.initiativeService.suggestionStatus?.stage) >= 1) {
        returnValue = this.ValidateRequireField(form, 'iL3Date') && returnValue;
        returnValue = this.ValidateRequireField(form, 'iL4Date') && returnValue;
        returnValue = this.ValidateRequireField(form, 'iL5Date') && returnValue;
      }

      if (this.getStageNumber(this.initiativeService.suggestionStatus?.stage) >= 1) {
        returnValue = this.ValidateRequireField(form, 'iL3Date') && returnValue;
        returnValue = this.ValidateRequireField(form, 'iL4Date') && returnValue;
        returnValue = this.ValidateRequireField(form, 'iL5Date') && returnValue;
      }

      if (this.initiativeService.ShowTabCapex) {
        if (typeBenefit === 'FINANCIAL') {
          returnValue = this.ValidateRequireField(form, 'baseCase') && returnValue;
          returnValue = this.ValidateRequireField(form, 'projectIrrBaseCase') && returnValue;
          // returnValue = this.ValidateRequireField(form, 'npvBaseCase') && returnValue;
          returnValue = this.ValidateRequireField(form, 'paybackBaseCase') && returnValue;
          returnValue = this.ValidateRequireField(form, 'ebitdaBaseCase') && returnValue;
        }

        returnValue = this.ValidateRequireField(form, 'depreciationCost') && returnValue;
        returnValue = this.ValidateRequireField(form, 'usefulYear') && returnValue;
        returnValue = this.ValidateRequireField(form, 'usefulMonth') && returnValue;
        returnValue = this.ValidateRequireField(form, 'forEnvironment') && returnValue;
        returnValue = this.ValidateRequireField(form, 'forTurnaround') && returnValue;
        returnValue = this.ValidateRequireField(form, 'replaceEquipment') && returnValue;

        if (form.get('forTurnaround') && Boolean(form.get('forTurnaround').value == 'true')) {
          returnValue = this.ValidateRequireField(form, 'cutFeedDate') && returnValue;
          returnValue = this.ValidateRequireField(form, 'startUpDate') && returnValue;
          returnValue = this.ValidateRequireField(form, 'cycleYear') && returnValue;
          returnValue = this.ValidateRequireField(form, 'cycleMonth') && returnValue;
        }

        if (form.get('replaceEquipment') && Boolean(form.get('replaceEquipment').value == 'true')) {
          returnValue = this.ValidateRequireField(form, 'equipmentName') && returnValue;
          returnValue = this.ValidateRequireField(form, 'replacementDate') && returnValue;
          returnValue = this.ValidateRequireField(form, 'oldAssetCondition') && returnValue;
          if (form.get('oldAssetCondition').value == 'repair') {
            returnValue = this.ValidateRequireField(form, 'oldAssetNo') && returnValue;
          }
          returnValue = this.ValidateRequireField(form, 'equipmentOrAsset') && returnValue;
        }

        returnValue = this.ValidateRequireField(form, 'boi') && returnValue;
        returnValue = this.ValidateRequireField(form, 'haveAdditional') && returnValue;
        returnValue = this.ValidateRequireField(form, 'coordinate') && returnValue;

        if (form.get('coordinate') && Boolean(form.get('coordinate').value == 'true')) {
          returnValue = this.ValidateRequireField(form, 'parties') && returnValue;
        }


        //procurement validate  at IL4
        // if (this.initiativeService.suggestionStatus?.stage?.toLowerCase().indexOf('il2') >= 0) {
        //   returnValue = this.ValidateRequireField(form, 'proCategory') && returnValue;
        //   returnValue = this.ValidateRequireField(form, 'proSubCategory') && returnValue;
        //   returnValue = this.ValidateRequireField(form, 'proLever') && returnValue;
        //   returnValue = this.ValidateRequireField(form, 'baseline') && returnValue;
        //   returnValue = this.ValidateRequireField(form, 'baselineHistorical') && returnValue;
        //   returnValue = this.ValidateRequireField(form, 'baselineNonHistorical') && returnValue;
        //   //returnValue = this.ValidateRequireField(form, 'saving') && returnValue;
        //   returnValue = this.ValidateRequireField(form, 'savingHistorical') && returnValue;
        //   returnValue = this.ValidateRequireField(form, 'savingNonHistorical') && returnValue;
        // }
      }
    }
    return returnValue;
  }

  ValidateCapexInformationForm(form: FormGroup) {
    var returnValue = true;
    //hide start date
    // returnValue = this.ValidateRequireField(form, 'startingDate') && returnValue;

    returnValue = this.ValidateRequireField(form, 'projecctComRun') && returnValue;
    returnValue = this.ValidateRequireField(form, 'requestIniNoDate') && returnValue;
    returnValue = this.ValidateRequireField(form, 'projectCost') && returnValue;
    if (!this.initiativeService.isReturn) {
      returnValue = this.ValidateRequireField(form, 'budgetPeriod') && returnValue;

      //check budgetPeriod == current year
      //contingency
      if (form.get('budgetPeriod').value == 'Current year') {
        returnValue = this.ValidateRequireField(form, 'betweenYear') && returnValue;
        if (form.get('betweenYear').value == 'Transfer') {
          returnValue = this.ValidateRequireField(form, 'transferForm') && returnValue;
        } else if (form.get('betweenYear').value == 'Pool Budget') {
          returnValue = this.ValidateRequireField(form, 'poolBudgetForm') && returnValue;
          returnValue = this.ValidateRequireField(form, 'poolID') && returnValue;
        }
      }

      //

    }

    returnValue = this.ValidateRequireField(form, 'costCenterOfVP') && returnValue;
    returnValue = this.ValidateRequireField(form, 'codeCostCenterOfVP') && returnValue;

    if (form.get('showRemark_tmp').value) returnValue = this.ValidateRequireField(form, 'reasonOfChanging') && returnValue;



    // if (this.initiativeService.suggestionStatus.stage == 'App. Request' && this.initiativeService.isAddmore) {
    if (this.initiativeService.isAddmore) {
      //returnValue = this.ValidateRequireField(form, 'spendingActual') && returnValue;
      //returnValue = (parseFloat(form.get('existingCost').value) >= parseFloat(form.get('spendingActual').value)) && returnValue;
      // this.setErrorField(form, returnValue, 'spendingActual');
      returnValue = this.ValidateRequireField(form, 'additionalCost') && returnValue;
      // this.setErrorField(form, returnValue, 'additionalCost');
    }

    //annual & monthly
    // if (this.initiativeService.suggestionStatus.initiativeType == 'Request Pool' && this.initiativeService.isReturn) {
    if (this.initiativeService.isReturn) {
      returnValue = this.ValidateRequireField(form, 'reasonOfChanging') && returnValue;
      returnValue = this.ValidateRequireField(form, 'returnCost') && returnValue;

      if (form.get('AnnualForm') && (parseFloat(form.get('AnnualForm').get('AnnualTotal_overall').value) == parseFloat(form.get('returnCost').value))) {
        returnValue = true && returnValue;
      } else {
        returnValue = false && returnValue;
      }
    } else if (this.initiativeService.isAddmore) {
      returnValue = this.ValidateRequireField(form, 'reasonOfChanging') && returnValue;
      if (form.get('AnnualForm') && (parseFloat(form.get('AnnualForm').get('AnnualTotal_overall').value) == parseFloat(form.get('additionalCost').value))) {
        returnValue = true && returnValue;
      } else {
        returnValue = false && returnValue;
      }
    } else if (!this.initiativeService.isAddmore || !this.initiativeService.isReturn || !this.initiativeService.isRevise) {
      if (form.get('AnnualForm') && (parseFloat(form.get('AnnualForm').get('AnnualTotal_overall').value) == parseFloat(form.get('projectCost').value))) {
        returnValue = true && returnValue;
      } else {
        returnValue = false && returnValue;
      }
    }

    if (form.get('year_m') && form.get('monthForm0')) {
      let year_m = form.get('year_m').value;
      for (let index = 0; index < year_m.length; index++) {

        if (index > 9) {
          break;
        }

        // const element = array[index];
        let totalAnnual = form.get('AnnualForm').get('AnnualTotal' + (index + 1)).value && form.get('AnnualForm').get('AnnualTotal' + (index + 1)).value != '' ? form.get('AnnualForm').get('AnnualTotal' + (index + 1)).value : "0";
        let totalMonthly = form.get('monthForm' + index).get('monthTotal_overall').value && form.get('monthForm' + index).get('monthTotal_overall').value != '' ? form.get('monthForm' + index).get('monthTotal_overall').value : "0";
        console.log('totalAnnual>>totalMonthly>>', totalAnnual, totalMonthly);

        if (parseFloat(totalAnnual) == parseFloat(totalMonthly) / 1000000) {
          console.log('totalAnnual>>totalMonthly>> true', totalAnnual, parseFloat(totalMonthly) / 1000000);
          //this.swalTool.Error(" equal " + parseFloat(totalAnnual) + ' ==  ' + parseFloat(totalMonthly) / 1000000);
          returnValue = true && returnValue;
        } else {
          console.log('totalAnnual>>totalMonthly>> false', totalAnnual, parseFloat(totalMonthly) / 1000000);
          //this.swalTool.Error("not equal " + parseFloat(totalAnnual) + ' ==  ' + parseFloat(totalMonthly) / 1000000);
          returnValue = false && returnValue;
        }

      }

    }

    return returnValue;
  }

  ValidateImpactTracking(form: FormGroup) {
    var returnValue = true;


    // let stage = this.getStageNumber(this.initiativeService.suggestionStatus.stage);
    if (this.stageService.financialImpactStageValidate.map((t) => t?.toLowerCase()).indexOf(this.initiativeService.suggestionStatus.stage?.toLowerCase()) >= 0) {
      returnValue = this.ValidateRequireField(form, 'financialImpactArea') && returnValue;
    }

    //console.log('stage >> ', stage, ' stage raw >>', this.initiativeService.suggestionStatus?.stage);
    //FirstRunRateForm
    if (form.get('FirstRunRateForm')) {
      if (this.impactService.RequireIndirectBenefit && !this.impactService.RequireDirectBenefit) {
        return returnValue = true && returnValue;
      }
      //returnValue = false && returnValue;
      let firstRunRateTable: FirstRunRateTable[] = form.getRawValue()['FirstRunRateForm']['firstRunRateTable']//form.get('FirstRunRateForm').get('firstRunRateTable').value;
      // row1: "Target"
      // row2: "Revise"
      // row3: "Actual"

      console.log('first >> ', firstRunRateTable);

      // if (this.stageService.impactRunRateTraget.map((t)=>t?.toLowerCase()).includes(this.initiativeService.suggestionStatus.stage?.toLowerCase())) {
      for (let index = 0; index < firstRunRateTable.length; index++) {
        if ((this.stageService.impactRunRateTraget.map((t) => t?.toLowerCase()).indexOf(this.initiativeService.suggestionStatus?.stage?.toLowerCase()) >= 0)) {
          let firstRunRateTableArr = form.get('FirstRunRateForm').get('firstRunRateTable') as FormArray;
          if (firstRunRateTable[index]['typeOfBenefit'] == null || firstRunRateTable[index]['typeOfBenefit'] == "") {
            firstRunRateTableArr.at(index).get('typeOfBenefit').markAsTouched();
            firstRunRateTableArr.at(index).get('typeOfBenefit').setErrors({ 'invalid': true });
            return returnValue = false && returnValue;
          }
          if (firstRunRateTable[index].runRate && (firstRunRateTable[index].runRate.row1 == null || firstRunRateTable[index].runRate.row1?.toString() == '')) {
            firstRunRateTableArr.at(index).get('runRate').get('row1').markAsTouched();
            firstRunRateTableArr.at(index).get('runRate').get('row1').setErrors({ 'invalid': true });
            returnValue = false && returnValue;
          } else {
            returnValue = true && returnValue;
          }

          let checkPlanForm: number = -1;
          if (firstRunRateTable[index]['monthRows1']) {
            // console.log('status =', firstRunRateTableArr.at(index).get('monthRows1').status);
            for (let indexMonth = 1; indexMonth < 37; indexMonth++) {
              // console.log(firstRunRateTable[index]['monthRows1']['month' + indexMonth]);
              if (isNaN(parseFloat(firstRunRateTable[index]['monthRows1']['month' + indexMonth]))) {
                // firstRunRateTableArr.at(index).get('monthRows1').get('month' + indexMonth).markAsTouched();
                // firstRunRateTableArr.at(index).get('monthRows1').get('month' + indexMonth).setErrors({ 'invalid': true });
                checkPlanForm *= 1
              } else {
                checkPlanForm = Math.abs(checkPlanForm) * 0;
              }
            }
            if (checkPlanForm < 0) {
              firstRunRateTableArr.at(index).get('monthRows1').markAsTouched();
              firstRunRateTableArr.at(index).get('monthRows1').setErrors({ 'invalid': true });
            }
          }
          returnValue = checkPlanForm >= 0 && returnValue;
          console.log("target ", returnValue);
        }
        else if (this.stageService.impactRunRateRevise.map((t) => t?.toLowerCase()).indexOf(this.initiativeService.suggestionStatus?.stage?.toLowerCase()) >= 0) {
          let firstRunRateTableArr = form.get('FirstRunRateForm').get('firstRunRateTable') as FormArray;
          if (firstRunRateTable[index]['typeOfBenefit'] == null || firstRunRateTable[index]['typeOfBenefit'] == "") {
            firstRunRateTableArr.at(index).get('typeOfBenefit').markAsTouched();
            firstRunRateTableArr.at(index).get('typeOfBenefit').setErrors({ 'invalid': true });
            return returnValue = false && returnValue;
          }
          if (firstRunRateTable[index].runRate && (firstRunRateTable[index].runRate.row2 == null || firstRunRateTable[index].runRate.row2?.toString() == '')) {
            // if (firstRunRateTable[index]['runRate'] && (firstRunRateTable[index]['runRate']['row2'] != null)) {
            firstRunRateTableArr.at(index).get('runRate').get('row2').markAsTouched();
            firstRunRateTableArr.at(index).get('runRate').get('row2').setErrors({ 'invalid': true });
            returnValue = false && returnValue;
          } else {
            returnValue = true && returnValue;
          }
          console.log("revise ", returnValue);
        }
        else if (this.stageService.impactRunRateActual.map((t) => t?.toLowerCase()).indexOf(this.initiativeService.suggestionStatus?.stage?.toLowerCase()) >= 0) {
          let firstRunRateTableArr = form.get('FirstRunRateForm').get('firstRunRateTable') as FormArray;
          if (firstRunRateTable[index]['typeOfBenefit'] == null || firstRunRateTable[index]['typeOfBenefit'] == "") {
            firstRunRateTableArr.at(index).get('typeOfBenefit').markAsTouched();
            firstRunRateTableArr.at(index).get('typeOfBenefit').setErrors({ 'invalid': true });
            return returnValue = false && returnValue;
          }
          if (firstRunRateTable[index].runRate && (firstRunRateTable[index].runRate.row3 == null || firstRunRateTable[index].runRate.row3?.toString() == '')) {
            // if (firstRunRateTable[index]['runRate'] && (firstRunRateTable[index]['runRate']['row3'] != null)) {
            firstRunRateTableArr.at(index).get('runRate').get('row3').markAsTouched();
            firstRunRateTableArr.at(index).get('runRate').get('row3').setErrors({ 'invalid': true });
            returnValue = false && returnValue;
          } else {
            returnValue = true && returnValue;
          }
          console.log("actual ", returnValue);
        }
        else {
          returnValue = true && returnValue;
        }
        // }
      }
    }


    return returnValue;
  }

  ValidateProgress(form: FormGroup) {
    let overAllCostSpending = parseFloat(form.get('overAllCostSpending').value);
    let projectCost = parseFloat(form.get('capexProjectCost').value);
    var returnValue = true;
    // Validate Milestone
    let stage = this.getStageNumber(this.initiativeService.suggestionStatus?.stage);

    if ((stage >= 2 && this.initiativeService.suggestionStatus?.max) || this.initiativeService.suggestionStatus?.cim) {
      let milestone = form.get('details') as FormArray;
      returnValue = this.ValidateMilestone(milestone, returnValue) && returnValue;
    }

    if (this.initiativeService.ShowTabCapex && !this.initiativeService.wbsNo) {
      returnValue = this.ValidateRequireField(form, 'standardProjectDef') && returnValue;
      returnValue = this.ValidateRequireField(form, 'responsible') && returnValue;
      returnValue = this.ValidateRequireField(form, 'areaPlant') && returnValue;
      returnValue = this.ValidateRequireField(form, 'physicalBu') && returnValue;
      returnValue = this.ValidateRequireField(form, 'physicalUnit') && returnValue;
      const generalData: Initiative = this.initiativeService.generalData.value || {} as Initiative;
      if (generalData?.plant === '1011' && !this.initiativeService.wbsNo) {
        returnValue = this.ValidateRequireField(form, 'solomonCategory') && returnValue;
      }
    }

    // if (form.get('planCost') && form.get('planCost').invalid) {
    //   returnValue = returnValue && false;
    // }

    if (form.get('planCost') && overAllCostSpending != projectCost && (this.initiativeService.isAddmore || this.initiativeService.isRevise || this.initiativeService.isReturn)) {
      returnValue = returnValue && false;
    }


    return returnValue;
  }

  ValidatePoc1Table(form: FormGroup) {
    if (this.initiativeService.viewMode || (this.initiativeService.wbsNo && !this.initiativeService.isAddmore && !this.initiativeService.isRevise && !this.initiativeService.isReturn)) {
      return true;
    }
    var returnValue = true;
    let obj = form.get('progressPlan').value;
    let checkPlan: boolean = true;
    let checkPlanForm: number = 0;
    let checkComplete: boolean = false;
    let isReturn: boolean = this.initiativeService.isReturn;

    returnValue = returnValue && this.ValidateRequireField(form as FormGroup, 'basicStartDate')
    returnValue = returnValue && this.ValidateRequireField(form as FormGroup, 'basicFinishDate')
    if (obj && obj.length > 0) {
      let enable = obj.length * 12;
      for (let index2 = 0; index2 < obj.length; index2++) {
        for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
          if (!obj[index2].listMonth[monthIndex].planDisabled && this.pocCheckNullAndUndefinde(obj[index2].listMonth[monthIndex].planValue, obj[index2].listMonth[monthIndex].planDisabled)) {
            checkPlanForm = Math.abs(checkPlanForm) + 1;
          } else {
            if (obj[index2].listMonth[monthIndex].planDisabled) --enable;
            checkPlanForm *= 1
          };

          if (!obj[index2].listMonth[monthIndex].planDisabled
            && obj[index2].listMonth[monthIndex].planValue
            && obj[index2].listMonth[monthIndex].planValue == 100) {
            checkComplete = true;
          }
        }
      }
      checkPlan = ((enable <= 0 ? true : checkPlanForm == enable ? true : false) && checkComplete) || isReturn;
      this.progressService.checkPlan = ((enable <= 0 ? true : checkPlanForm == enable ? true : false) && checkComplete) || isReturn;

      if (!checkPlan) {
        form.markAllAsTouched();
      }

    }

    return returnValue && checkPlan;
  }

  //poc2 table
  ValidatePoc2Table(form: FormGroup) {
    var returnValue = true;
    let obj = form.get('progressPlan').value;
    let progressPlanType = ['Engineering', 'Procurement', 'Construction', 'Commissioning'];
    let planActual = ['Plan', 'Actual'];
    let isReturn: boolean = this.initiativeService.isReturn;

    returnValue = returnValue && this.ValidateRequireField(form.get('overallForm') as FormGroup, 'basicStartDate')
    returnValue = returnValue && this.ValidateRequireField(form.get('overallForm') as FormGroup, 'basicFinishDate')
    returnValue = returnValue && this.ValidateRequireField(form.get('engineeringForm') as FormGroup, 'basicStartDate')
    returnValue = returnValue && this.ValidateRequireField(form.get('engineeringForm') as FormGroup, 'basicFinishDate')
    returnValue = returnValue && this.ValidateRequireField(form.get('procurementForm') as FormGroup, 'basicStartDate')
    returnValue = returnValue && this.ValidateRequireField(form.get('procurementForm') as FormGroup, 'basicFinishDate')
    returnValue = returnValue && this.ValidateRequireField(form.get('constructionForm') as FormGroup, 'basicStartDate')
    returnValue = returnValue && this.ValidateRequireField(form.get('constructionForm') as FormGroup, 'basicFinishDate')
    returnValue = returnValue && this.ValidateRequireField(form.get('commissioningForm') as FormGroup, 'basicStartDate')
    returnValue = returnValue && this.ValidateRequireField(form.get('commissioningForm') as FormGroup, 'basicFinishDate')


    //cal pocWeightPercent
    let engineeringPocWeightPercent = form.get('engineeringForm').get('pocWeightPercent').value;
    let procurementPocWeightPercent = form.get('procurementForm').get('pocWeightPercent').value;
    let constructionPocWeightPercent = form.get('constructionForm').get('pocWeightPercent').value;
    let commissioningPocWeightPercent = form.get('commissioningForm').get('pocWeightPercent').value;

    let sumPocWeightPercent = parseFloat(parseFloat(engineeringPocWeightPercent).toFixed(2)) + parseFloat(parseFloat(procurementPocWeightPercent).toFixed(2)) + parseFloat(parseFloat(constructionPocWeightPercent).toFixed(2)) + parseFloat(parseFloat(commissioningPocWeightPercent).toFixed(2));
    let checkValue: number = 10;

    if (sumPocWeightPercent == checkValue) {
      returnValue = true && returnValue;
    } else if (sumPocWeightPercent > checkValue) {
      do {
        let up = checkValue * 10;
        checkValue = up;
      } while (sumPocWeightPercent > checkValue);

      if (sumPocWeightPercent == checkValue) {
        this.progressService.checkPocPercent = true;
        returnValue = true && returnValue;
      } else {
        console.log('cal poc2 table error', sumPocWeightPercent, checkValue);
        this.progressService.checkPocPercent = false;
        returnValue = false && returnValue;
      }
    } else {
      console.log('cal poc2 table error', sumPocWeightPercent, checkValue);
      this.progressService.checkPocPercent = false;
      returnValue = false && returnValue;
    }

    //javis table

    // console.log(obj);
    // let  newData:ProgressPlanModel = new ProgressPlanModel;
    // let progressPlan:ProgressPlanModel[] = [];
    let checkPlan: boolean = true;
    let checkEngineeringForm: number = 0;
    let checkProcurementForm: number = 0;
    let checkConstructionForm: number = 0;
    let checkCommissioningForm: number = 0;
    let engneeringDisableCount: number = 0;
    let procurementDisableCount: number = 0;
    let constructionDisableCount: number = 0;
    let commissioningDisableCount: number = 0;
    let checkEngineeringComplete: boolean = false;
    let checkProcurementComplete: boolean = false;
    let checkConstructionComplete: boolean = false;
    let checkCommissioningComplete: boolean = false;
    if (obj && obj.length > 0) {
      obj.forEach((objData, objIndex) => {
        console.log('obj data>>', objData);
        // count year

        progressPlanType.forEach((planType, planTypeIndex) => {
          // for = 5
          planActual.forEach((plant, planIndex) => {
            let newData: ProgressPlanModel = new ProgressPlanModel;
            newData.year = (objData.year).toString();

            // objData.listMonth.forEach((monthData, index) => {
            //for = 12  index = 0-11
            //Engineer
            newData.progressPlanId = 0;
            newData.planActual = plant;
            newData.initiativeId = this.initiativeService.id;
            newData.progressPlanType = planType;
            if (planTypeIndex == 0) {
              if (planIndex == 0) {

                !objData.listMonth[0].engineering_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[0].engineering_plan.planValue, objData.listMonth[0].engineering_plan.planDisabled) ? checkEngineeringForm = Math.abs(checkEngineeringForm) + 1 : checkEngineeringForm *= 1;
                !objData.listMonth[1].engineering_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[1].engineering_plan.planValue, objData.listMonth[1].engineering_plan.planDisabled) ? checkEngineeringForm = Math.abs(checkEngineeringForm) + 1 : checkEngineeringForm *= 1;
                !objData.listMonth[2].engineering_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[2].engineering_plan.planValue, objData.listMonth[2].engineering_plan.planDisabled) ? checkEngineeringForm = Math.abs(checkEngineeringForm) + 1 : checkEngineeringForm *= 1;
                !objData.listMonth[3].engineering_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[3].engineering_plan.planValue, objData.listMonth[3].engineering_plan.planDisabled) ? checkEngineeringForm = Math.abs(checkEngineeringForm) + 1 : checkEngineeringForm *= 1;
                !objData.listMonth[4].engineering_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[4].engineering_plan.planValue, objData.listMonth[4].engineering_plan.planDisabled) ? checkEngineeringForm = Math.abs(checkEngineeringForm) + 1 : checkEngineeringForm *= 1;
                !objData.listMonth[5].engineering_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[5].engineering_plan.planValue, objData.listMonth[5].engineering_plan.planDisabled) ? checkEngineeringForm = Math.abs(checkEngineeringForm) + 1 : checkEngineeringForm *= 1;
                !objData.listMonth[6].engineering_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[6].engineering_plan.planValue, objData.listMonth[6].engineering_plan.planDisabled) ? checkEngineeringForm = Math.abs(checkEngineeringForm) + 1 : checkEngineeringForm *= 1;
                !objData.listMonth[7].engineering_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[7].engineering_plan.planValue, objData.listMonth[7].engineering_plan.planDisabled) ? checkEngineeringForm = Math.abs(checkEngineeringForm) + 1 : checkEngineeringForm *= 1;
                !objData.listMonth[8].engineering_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[8].engineering_plan.planValue, objData.listMonth[8].engineering_plan.planDisabled) ? checkEngineeringForm = Math.abs(checkEngineeringForm) + 1 : checkEngineeringForm *= 1;
                !objData.listMonth[9].engineering_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[9].engineering_plan.planValue, objData.listMonth[9].engineering_plan.planDisabled) ? checkEngineeringForm = Math.abs(checkEngineeringForm) + 1 : checkEngineeringForm *= 1;
                !objData.listMonth[10].engineering_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[10].engineering_plan.planValue, objData.listMonth[10].engineering_plan.planDisabled) ? checkEngineeringForm = Math.abs(checkEngineeringForm) + 1 : checkEngineeringForm *= 1;
                !objData.listMonth[11].engineering_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[11].engineering_plan.planValue, objData.listMonth[11].engineering_plan.planDisabled) ? checkEngineeringForm = Math.abs(checkEngineeringForm) + 1 : checkEngineeringForm *= 1;

                for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                  if (!objData.listMonth[monthIndex].engineering_plan.planDisabled) {
                    ++engneeringDisableCount;
                  }
                  if (engineeringPocWeightPercent == 0
                    || (!objData.listMonth[monthIndex].engineering_plan.planDisabled
                      && objData.listMonth[monthIndex].engineering_plan.planValue
                      && objData.listMonth[monthIndex].engineering_plan.planValue == 100)) {
                    checkEngineeringComplete = true;
                  }
                }
              }
            } else if (planTypeIndex == 1) {
              if (planIndex == 0) {

                !objData.listMonth[0].procurement_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[0].procurement_plan.planValue, objData.listMonth[0].procurement_plan.planDisabled) ? checkProcurementForm = Math.abs(checkProcurementForm) + 1 : checkProcurementForm *= 1;
                !objData.listMonth[1].procurement_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[1].procurement_plan.planValue, objData.listMonth[1].procurement_plan.planDisabled) ? checkProcurementForm = Math.abs(checkProcurementForm) + 1 : checkProcurementForm *= 1;
                !objData.listMonth[2].procurement_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[2].procurement_plan.planValue, objData.listMonth[2].procurement_plan.planDisabled) ? checkProcurementForm = Math.abs(checkProcurementForm) + 1 : checkProcurementForm *= 1;
                !objData.listMonth[3].procurement_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[3].procurement_plan.planValue, objData.listMonth[3].procurement_plan.planDisabled) ? checkProcurementForm = Math.abs(checkProcurementForm) + 1 : checkProcurementForm *= 1;
                !objData.listMonth[4].procurement_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[4].procurement_plan.planValue, objData.listMonth[4].procurement_plan.planDisabled) ? checkProcurementForm = Math.abs(checkProcurementForm) + 1 : checkProcurementForm *= 1;
                !objData.listMonth[5].procurement_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[5].procurement_plan.planValue, objData.listMonth[5].procurement_plan.planDisabled) ? checkProcurementForm = Math.abs(checkProcurementForm) + 1 : checkProcurementForm *= 1;
                !objData.listMonth[6].procurement_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[6].procurement_plan.planValue, objData.listMonth[6].procurement_plan.planDisabled) ? checkProcurementForm = Math.abs(checkProcurementForm) + 1 : checkProcurementForm *= 1;
                !objData.listMonth[7].procurement_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[7].procurement_plan.planValue, objData.listMonth[7].procurement_plan.planDisabled) ? checkProcurementForm = Math.abs(checkProcurementForm) + 1 : checkProcurementForm *= 1;
                !objData.listMonth[8].procurement_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[8].procurement_plan.planValue, objData.listMonth[8].procurement_plan.planDisabled) ? checkProcurementForm = Math.abs(checkProcurementForm) + 1 : checkProcurementForm *= 1;
                !objData.listMonth[9].procurement_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[9].procurement_plan.planValue, objData.listMonth[9].procurement_plan.planDisabled) ? checkProcurementForm = Math.abs(checkProcurementForm) + 1 : checkProcurementForm *= 1;
                !objData.listMonth[10].procurement_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[10].procurement_plan.planValue, objData.listMonth[10].procurement_plan.planDisabled) ? checkProcurementForm = Math.abs(checkProcurementForm) + 1 : checkProcurementForm *= 1;
                !objData.listMonth[11].procurement_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[11].procurement_plan.planValue, objData.listMonth[11].procurement_plan.planDisabled) ? checkProcurementForm = Math.abs(checkProcurementForm) + 1 : checkProcurementForm *= 1;

                for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                  if (!objData.listMonth[monthIndex].procurement_plan.planDisabled) {
                    ++procurementDisableCount;
                  }
                  if (procurementPocWeightPercent == 0
                    || (!objData.listMonth[monthIndex].procurement_plan.planDisabled
                      && objData.listMonth[monthIndex].procurement_plan.planValue
                      && objData.listMonth[monthIndex].procurement_plan.planValue == 100)) {
                    checkProcurementComplete = true;
                  }
                }
              }
            } else if (planTypeIndex == 2) {
              if (planIndex == 0) {

                !objData.listMonth[0].construction_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[0].construction_plan.planValue, objData.listMonth[0].construction_plan.planDisabled) ? checkConstructionForm = Math.abs(checkConstructionForm) + 1 : checkConstructionForm *= 1;
                !objData.listMonth[1].construction_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[1].construction_plan.planValue, objData.listMonth[1].construction_plan.planDisabled) ? checkConstructionForm = Math.abs(checkConstructionForm) + 1 : checkConstructionForm *= 1;
                !objData.listMonth[2].construction_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[2].construction_plan.planValue, objData.listMonth[2].construction_plan.planDisabled) ? checkConstructionForm = Math.abs(checkConstructionForm) + 1 : checkConstructionForm *= 1;
                !objData.listMonth[3].construction_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[3].construction_plan.planValue, objData.listMonth[3].construction_plan.planDisabled) ? checkConstructionForm = Math.abs(checkConstructionForm) + 1 : checkConstructionForm *= 1;
                !objData.listMonth[4].construction_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[4].construction_plan.planValue, objData.listMonth[4].construction_plan.planDisabled) ? checkConstructionForm = Math.abs(checkConstructionForm) + 1 : checkConstructionForm *= 1;
                !objData.listMonth[5].construction_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[5].construction_plan.planValue, objData.listMonth[5].construction_plan.planDisabled) ? checkConstructionForm = Math.abs(checkConstructionForm) + 1 : checkConstructionForm *= 1;
                !objData.listMonth[6].construction_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[6].construction_plan.planValue, objData.listMonth[6].construction_plan.planDisabled) ? checkConstructionForm = Math.abs(checkConstructionForm) + 1 : checkConstructionForm *= 1;
                !objData.listMonth[7].construction_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[7].construction_plan.planValue, objData.listMonth[7].construction_plan.planDisabled) ? checkConstructionForm = Math.abs(checkConstructionForm) + 1 : checkConstructionForm *= 1;
                !objData.listMonth[8].construction_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[8].construction_plan.planValue, objData.listMonth[8].construction_plan.planDisabled) ? checkConstructionForm = Math.abs(checkConstructionForm) + 1 : checkConstructionForm *= 1;
                !objData.listMonth[9].construction_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[9].construction_plan.planValue, objData.listMonth[9].construction_plan.planDisabled) ? checkConstructionForm = Math.abs(checkConstructionForm) + 1 : checkConstructionForm *= 1;
                !objData.listMonth[10].construction_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[10].construction_plan.planValue, objData.listMonth[10].construction_plan.planDisabled) ? checkConstructionForm = Math.abs(checkConstructionForm) + 1 : checkConstructionForm *= 1;
                !objData.listMonth[11].construction_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[11].construction_plan.planValue, objData.listMonth[11].construction_plan.planDisabled) ? checkConstructionForm = Math.abs(checkConstructionForm) + 1 : checkConstructionForm *= 1;

                for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                  if (!objData.listMonth[monthIndex].construction_plan.planDisabled) {
                    ++constructionDisableCount;
                  }
                  if (constructionPocWeightPercent == 0
                    || (!objData.listMonth[monthIndex].construction_plan.planDisabled
                      && objData.listMonth[monthIndex].construction_plan.planValue
                      && objData.listMonth[monthIndex].construction_plan.planValue == 100)) {
                    checkConstructionComplete = true;
                  }
                }
              }
            } else if (planTypeIndex == 3) {
              if (planIndex == 0) {

                !objData.listMonth[0].commissioning_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[0].commissioning_plan.planValue, objData.listMonth[0].commissioning_plan.planDisabled) ? checkCommissioningForm = Math.abs(checkCommissioningForm) + 1 : checkCommissioningForm *= 1;
                !objData.listMonth[1].commissioning_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[1].commissioning_plan.planValue, objData.listMonth[1].commissioning_plan.planDisabled) ? checkCommissioningForm = Math.abs(checkCommissioningForm) + 1 : checkCommissioningForm *= 1;
                !objData.listMonth[2].commissioning_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[2].commissioning_plan.planValue, objData.listMonth[2].commissioning_plan.planDisabled) ? checkCommissioningForm = Math.abs(checkCommissioningForm) + 1 : checkCommissioningForm *= 1;
                !objData.listMonth[3].commissioning_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[3].commissioning_plan.planValue, objData.listMonth[3].commissioning_plan.planDisabled) ? checkCommissioningForm = Math.abs(checkCommissioningForm) + 1 : checkCommissioningForm *= 1;
                !objData.listMonth[4].commissioning_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[4].commissioning_plan.planValue, objData.listMonth[4].commissioning_plan.planDisabled) ? checkCommissioningForm = Math.abs(checkCommissioningForm) + 1 : checkCommissioningForm *= 1;
                !objData.listMonth[5].commissioning_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[5].commissioning_plan.planValue, objData.listMonth[5].commissioning_plan.planDisabled) ? checkCommissioningForm = Math.abs(checkCommissioningForm) + 1 : checkCommissioningForm *= 1;
                !objData.listMonth[6].commissioning_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[6].commissioning_plan.planValue, objData.listMonth[6].commissioning_plan.planDisabled) ? checkCommissioningForm = Math.abs(checkCommissioningForm) + 1 : checkCommissioningForm *= 1;
                !objData.listMonth[7].commissioning_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[7].commissioning_plan.planValue, objData.listMonth[7].commissioning_plan.planDisabled) ? checkCommissioningForm = Math.abs(checkCommissioningForm) + 1 : checkCommissioningForm *= 1;
                !objData.listMonth[8].commissioning_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[8].commissioning_plan.planValue, objData.listMonth[8].commissioning_plan.planDisabled) ? checkCommissioningForm = Math.abs(checkCommissioningForm) + 1 : checkCommissioningForm *= 1;
                !objData.listMonth[9].commissioning_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[9].commissioning_plan.planValue, objData.listMonth[9].commissioning_plan.planDisabled) ? checkCommissioningForm = Math.abs(checkCommissioningForm) + 1 : checkCommissioningForm *= 1;
                !objData.listMonth[10].commissioning_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[10].commissioning_plan.planValue, objData.listMonth[10].commissioning_plan.planDisabled) ? checkCommissioningForm = Math.abs(checkCommissioningForm) + 1 : checkCommissioningForm *= 1;
                !objData.listMonth[11].commissioning_plan.planDisabled && this.pocCheckNullAndUndefinde(objData.listMonth[11].commissioning_plan.planValue, objData.listMonth[11].commissioning_plan.planDisabled) ? checkCommissioningForm = Math.abs(checkCommissioningForm) + 1 : checkCommissioningForm *= 1;

                for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                  if (!objData.listMonth[monthIndex].commissioning_plan.planDisabled) {
                    ++commissioningDisableCount;
                  }
                  if (commissioningPocWeightPercent == 0
                    || (!objData.listMonth[monthIndex].commissioning_plan.planDisabled
                      && objData.listMonth[monthIndex].commissioning_plan.planValue
                      && objData.listMonth[monthIndex].commissioning_plan.planValue == 100)) {
                    checkCommissioningComplete = true;
                  }
                }
              }
            }
          });
        });
      });

      if (engneeringDisableCount == 0 && procurementDisableCount == 0 && constructionDisableCount == 0 && commissioningDisableCount == 0) {
        checkPlan = true;
        this.progressService.checkPlan = true;
      } else {
        checkPlan = (checkEngineeringForm == engneeringDisableCount && checkProcurementForm == procurementDisableCount && checkConstructionForm == constructionDisableCount && checkCommissioningForm == commissioningDisableCount
          && checkEngineeringComplete && checkProcurementComplete && checkConstructionComplete && checkCommissioningComplete) || isReturn;
        this.progressService.checkPlan = (checkEngineeringForm == engneeringDisableCount && checkProcurementForm == procurementDisableCount && checkConstructionForm == constructionDisableCount && checkCommissioningForm == commissioningDisableCount
          && checkEngineeringComplete && checkProcurementComplete && checkConstructionComplete && checkCommissioningComplete) || isReturn;
      }

      if (!checkPlan) {
        form.markAllAsTouched();
      }

    }

    return returnValue && checkPlan;


  }

  pocCheckNullAndUndefinde(value, disble) {
    //return (value != null && value != undefined && value.trim().length > 0) || disble;
    if (disble) {
      return true;
    } else if (value != null && value != undefined) {
      //if (value.trim().length > 0) {
      if (value?.toString().replace(/^\s+|\s+$/, '')?.length > 0) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }


  // bscNarrativeForm

  ValidateBscNarrativeForm(form: FormGroup) {
    var returnValue = true;
    // Validate Milestone
    // let stage = this.getStageNumber(this.initiativeService.suggestionStatus?.stage);

    //BSC
    // if (stage >= 3 && this.initiativeService.suggestionStatus.isRequestCapex) {
    //   returnValue = this.ValidateRequireField(form, 'engineering') && returnValue;
    //   returnValue = this.ValidateRequireField(form, 'construction') && returnValue;
    //   returnValue = this.ValidateRequireField(form, 'procurement') && returnValue;
    //   returnValue = this.ValidateRequireField(form, 'commissioningStartup') && returnValue;
    //   returnValue = this.ValidateRequireField(form, 'projectManagement') && returnValue;
    //   returnValue = this.ValidateRequireField(form, 'riskAndConcern') && returnValue;
    //   returnValue = this.ValidateRequireField(form, 'mitigationPlan') && returnValue;
    //   returnValue = this.ValidateRequireField(form, 'executiveSummary') && returnValue;
    //   returnValue = this.ValidateRequireField(form, 'workForNextMonth') && returnValue;
    //   returnValue = this.ValidateRequireField(form, 'environmentKpi') && returnValue;
    // }
    return returnValue;
  }

  ValidateResourceNeeded(form: FormGroup): boolean {
    let returnValue = true;

    if (form.get('isManpowerRequire').value) {
      let manpowerForm = form.get('manpowerForm').get('manpowerData') as FormArray;
      for (let i = 0; i < manpowerForm.length; i++) {
        returnValue = this.ValidateRequireField(manpowerForm.at(i) as FormGroup, 'amountPerson') && returnValue;
        returnValue = this.ValidateRequireField(manpowerForm.at(i) as FormGroup, 'position') && returnValue;
      }
    }
    if (form.get('isImportRequire').value) {
      returnValue = this.ValidateRequireField(form, 'remarkImport') && returnValue;
    }
    if (form.get('isLandRequire').value) {
      let landForm = form.get('landForm').get('landData') as FormArray;
      for (let i = 0; i < landForm.length; i++) {
        returnValue = this.ValidateRequireField(landForm.at(i) as FormGroup, 'location') && returnValue;
        returnValue = this.ValidateRequireField(landForm.at(i) as FormGroup, 'amount') && returnValue;
        returnValue = this.ValidateRequireField(landForm.at(i) as FormGroup, 'startDate') && returnValue;
        returnValue = this.ValidateRequireField(landForm.at(i) as FormGroup, 'unit') && returnValue;
      }
    }
    if (form.get('isAirPollutionRequire').value) {
      let pollution = form.get('airForm').get('pollutionData') as FormArray;
      for (let i = 0; i < pollution.length; i++) {
        returnValue = this.ValidateRequireField(pollution.at(i) as FormGroup, 'topic') && returnValue;
        returnValue = this.ValidateRequireField(pollution.at(i) as FormGroup, 'amount') && returnValue;
        returnValue = this.ValidateRequireField(pollution.at(i) as FormGroup, 'unit') && returnValue;
        if (pollution.at(i).get('unit').value === 'other') {
          returnValue = this.ValidateRequireField(pollution.at(i) as FormGroup, 'remark') && returnValue;
        }
      }
    }
    if (form.get('isWasteRequire').value) {
      let waste = form.get('wasteForm').get('wasteData') as FormArray;
      for (let i = 0; i < waste.length; i++) {
        returnValue = this.ValidateRequireField(waste.at(i) as FormGroup, 'topic') && returnValue;
        returnValue = this.ValidateRequireField(waste.at(i) as FormGroup, 'amount') && returnValue;
        returnValue = this.ValidateRequireField(waste.at(i) as FormGroup, 'unit') && returnValue;
        if (waste.at(i).get('unit').value === 'other') {
          returnValue = this.ValidateRequireField(waste.at(i) as FormGroup, 'remark') && returnValue;
        }
      }
    }
    if (form.get('isUtilityRequire').value === 'true') {
      let electricity = form.get('utilityData').get('electricityData') as FormArray;
      let steam = form.get('utilityData').get('steamData') as FormArray;
      let deminWater = form.get('utilityData').get('deminWaterData') as FormGroup;
      let treatedClarifyWater = form.get('utilityData').get('treatedClarifyWater') as FormGroup;
      let returnWater = form.get('utilityData').get('returnWater') as FormGroup;
      let hydrogen = form.get('utilityData').get('hydrogen') as FormGroup;
      let nitrogen = form.get('utilityData').get('nitrogen') as FormGroup;
      let naturalGas = form.get('utilityData').get('naturalGas') as FormGroup;
      let otherData = form.get('utilityData').get('otherData') as FormArray;

      //Validate Electricity
      let validateElectricity = false;
      for (let i = 0; i < electricity.length; i++) {
        let elect = electricity.at(i) as FormGroup;
        elect.markAsTouched();
        let value = ['voltage', 'normal', 'max', 'firstSupply', 'cod', 'supplyPeriods']
        value.forEach(element => {
          if (elect.get(element).value !== "" && elect.get(element).value !== null && elect.get(element).value !== undefined) {
            validateElectricity = true;
          }
        });
        if (validateElectricity) {
          returnValue = this.ValidateRequireField(electricity.at(i) as FormGroup, 'voltage') && returnValue;
          returnValue = this.ValidateRequireField(electricity.at(i) as FormGroup, 'normal') && returnValue;
          returnValue = this.ValidateRequireField(electricity.at(i) as FormGroup, 'max') && returnValue;
          returnValue = this.ValidateRequireField(electricity.at(0) as FormGroup, 'firstSupply') && returnValue;
          returnValue = this.ValidateRequireField(electricity.at(0) as FormGroup, 'cod') && returnValue;
          returnValue = this.ValidateRequireField(electricity.at(0) as FormGroup, 'supplyPeriods') && returnValue;
        }
      }

      //Validate Steam
      let pressureSteam = ['tempNormal', 'flowNormal', 'pressureNormal', 'pressureMax', 'tempMax', 'flowMax', 'firstSupply', 'cod', 'supplyPeriods']
      let validateHighPressure = false;
      let validateMedPressure = false;
      let validateLowPressure = false;
      let validateOtherPressure = false;
      pressureSteam.forEach(element => {
        if (steam.get('highPressure').get(element).value !== "" && steam.get('highPressure').get(element).value !== null && steam.get('highPressure').get(element).value !== undefined) {
          validateHighPressure = true;
        }
        if (steam.get('mediumPressure').get(element).value !== "" && steam.get('mediumPressure').get(element).value !== null && steam.get('mediumPressure').get(element).value !== undefined) {
          validateMedPressure = true;
        }
        if (steam.get('lowPressure').get(element).value !== "" && steam.get('lowPressure').get(element).value !== null && steam.get('lowPressure').get(element).value !== undefined) {
          validateLowPressure = true;
        }
        if (steam.get('otherSteamPressure').get(element).value !== "" && steam.get('otherSteamPressure').get(element).value !== null && steam.get('otherSteamPressure').get(element).value !== undefined) {
          validateOtherPressure = true;
        }
      });

      if (validateHighPressure) {
        returnValue = this.ValidateRequireField(steam.get('highPressure') as FormGroup, 'tempNormal') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('highPressure') as FormGroup, 'flowNormal') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('highPressure') as FormGroup, 'pressureNormal') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('highPressure') as FormGroup, 'pressureMax') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('highPressure') as FormGroup, 'tempMax') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('highPressure') as FormGroup, 'flowMax') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('highPressure') as FormGroup, 'firstSupply') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('highPressure') as FormGroup, 'cod') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('highPressure') as FormGroup, 'supplyPeriods') && returnValue;
      }

      if (validateMedPressure) {
        returnValue = this.ValidateRequireField(steam.get('mediumPressure') as FormGroup, 'tempNormal') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('mediumPressure') as FormGroup, 'flowNormal') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('mediumPressure') as FormGroup, 'pressureNormal') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('mediumPressure') as FormGroup, 'pressureMax') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('mediumPressure') as FormGroup, 'tempMax') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('mediumPressure') as FormGroup, 'flowMax') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('mediumPressure') as FormGroup, 'firstSupply') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('mediumPressure') as FormGroup, 'cod') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('mediumPressure') as FormGroup, 'supplyPeriods');
      }

      if (validateLowPressure) {
        returnValue = this.ValidateRequireField(steam.get('lowPressure') as FormGroup, 'tempNormal') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('lowPressure') as FormGroup, 'flowNormal') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('lowPressure') as FormGroup, 'pressureNormal') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('lowPressure') as FormGroup, 'pressureMax') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('lowPressure') as FormGroup, 'tempMax') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('lowPressure') as FormGroup, 'flowMax') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('lowPressure') as FormGroup, 'firstSupply') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('lowPressure') as FormGroup, 'cod') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('lowPressure') as FormGroup, 'supplyPeriods') && returnValue;
      }

      if (validateOtherPressure) {
        returnValue = this.ValidateRequireField(steam.get('otherSteamPressure') as FormGroup, 'tempNormal') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('otherSteamPressure') as FormGroup, 'flowNormal') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('otherSteamPressure') as FormGroup, 'pressureNormal') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('otherSteamPressure') as FormGroup, 'pressureMax') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('otherSteamPressure') as FormGroup, 'tempMax') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('otherSteamPressure') as FormGroup, 'flowMax') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('otherSteamPressure') as FormGroup, 'firstSupply') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('otherSteamPressure') as FormGroup, 'cod') && returnValue;
        returnValue = this.ValidateRequireField(steam.get('otherSteamPressure') as FormGroup, 'supplyPeriods') && returnValue;
      }

      //Validate Treated Clarify Water
      let fluidList = ['pressureNormal', 'flowNormal', 'pressureMax', 'flowMax', 'firstSupply', 'cod', 'supplyPeriods'];
      let validateDemin = false;
      let validateClarify = false;
      let validateHydrogen = false;
      let validateNitrogen = false;
      let validateNaturalGas = false;

      fluidList.forEach(element => {
        if (treatedClarifyWater.get(element).value !== undefined && treatedClarifyWater.get(element).value !== '' && treatedClarifyWater.get(element).value !== null) {
          validateClarify = true;
        }

        if (deminWater.get(element).value !== undefined && deminWater.get(element).value !== '' && deminWater.get(element).value !== null) {
          validateDemin = true;
        }

        if (hydrogen.get(element).value !== undefined && hydrogen.get(element).value !== "" && hydrogen.get(element).value !== null) {
          validateHydrogen = true;
        }

        if (nitrogen.get(element).value !== undefined && nitrogen.get(element).value !== "" && nitrogen.get(element).value !== null) {
          validateNitrogen = true;
        }

        if (naturalGas.get(element).value !== undefined && naturalGas.get(element).value !== "" && naturalGas.get(element).value !== null) {
          validateNaturalGas = true;
        }
      });

      if (validateClarify) {
        returnValue = this.ValidateRequireField(treatedClarifyWater, 'pressureNormal') && returnValue;
        returnValue = this.ValidateRequireField(treatedClarifyWater, 'flowNormal') && returnValue;
        returnValue = this.ValidateRequireField(treatedClarifyWater, 'pressureMax') && returnValue;
        returnValue = this.ValidateRequireField(treatedClarifyWater, 'flowMax') && returnValue;
        returnValue = this.ValidateRequireField(treatedClarifyWater, 'firstSupply') && returnValue;
        returnValue = this.ValidateRequireField(treatedClarifyWater, 'cod') && returnValue;
        returnValue = this.ValidateRequireField(treatedClarifyWater, 'supplyPeriods') && returnValue;
      }

      //Validate DeminWater
      if (validateDemin) {
        returnValue = this.ValidateRequireField(deminWater, 'pressureNormal') && returnValue;
        returnValue = this.ValidateRequireField(deminWater, 'flowNormal') && returnValue;
        returnValue = this.ValidateRequireField(deminWater, 'pressureMax') && returnValue;
        returnValue = this.ValidateRequireField(deminWater, 'flowMax') && returnValue;
        returnValue = this.ValidateRequireField(deminWater, 'firstSupply') && returnValue;
        returnValue = this.ValidateRequireField(deminWater, 'cod') && returnValue;
        returnValue = this.ValidateRequireField(deminWater, 'supplyPeriods') && returnValue;
      }

      //Validate Condensate Return Water
      let validateCondensate = false;
      let condensate = ['pressureLevel', 'pressureNormal', 'tempNormal', 'flowNormal', 'pressureMax', 'tempMax', 'flowMax', 'firstSupply', 'cod', 'supplyPeriods']
      condensate.forEach(element => {
        returnWater.get(element).setErrors({ 'invalid': false });
        if (returnWater.get(element).value !== null && returnWater.get(element).value !== '' && returnWater.get(element).value !== undefined) {
          validateCondensate = true;
        }
      });

      if (validateCondensate) {
        returnValue = this.ValidateRequireField(returnWater, 'pressureLevel') && returnValue;
        returnValue = this.ValidateRequireField(returnWater, 'pressureNormal') && returnValue;
        returnValue = this.ValidateRequireField(returnWater, 'tempNormal') && returnValue;
        returnValue = this.ValidateRequireField(returnWater, 'flowNormal') && returnValue;
        returnValue = this.ValidateRequireField(returnWater, 'pressureMax') && returnValue;
        returnValue = this.ValidateRequireField(returnWater, 'tempMax') && returnValue;
        returnValue = this.ValidateRequireField(returnWater, 'flowMax') && returnValue;
        returnValue = this.ValidateRequireField(returnWater, 'firstSupply') && returnValue;
        returnValue = this.ValidateRequireField(returnWater, 'cod') && returnValue;
        returnValue = this.ValidateRequireField(returnWater, 'supplyPeriods') && returnValue;
      }

      // Validate Hydrogen
      if (validateHydrogen) {
        returnValue = this.ValidateRequireField(hydrogen, 'pressureNormal') && returnValue;
        returnValue = this.ValidateRequireField(hydrogen, 'flowNormal') && returnValue;
        returnValue = this.ValidateRequireField(hydrogen, 'pressureMax') && returnValue;
        returnValue = this.ValidateRequireField(hydrogen, 'flowMax') && returnValue;
        returnValue = this.ValidateRequireField(hydrogen, 'firstSupply') && returnValue;
        returnValue = this.ValidateRequireField(hydrogen, 'cod') && returnValue;
        returnValue = this.ValidateRequireField(hydrogen, 'supplyPeriods') && returnValue;
      }

      //Validate Nitrogen
      if (validateNitrogen) {
        returnValue = this.ValidateRequireField(nitrogen, 'pressureNormal') && returnValue;
        returnValue = this.ValidateRequireField(nitrogen, 'flowNormal') && returnValue;
        returnValue = this.ValidateRequireField(nitrogen, 'pressureMax') && returnValue;
        returnValue = this.ValidateRequireField(nitrogen, 'flowMax') && returnValue;
        returnValue = this.ValidateRequireField(nitrogen, 'firstSupply') && returnValue;
        returnValue = this.ValidateRequireField(nitrogen, 'cod') && returnValue;
        returnValue = this.ValidateRequireField(nitrogen, 'supplyPeriods') && returnValue;
      }

      // Validate Natural Gas
      if (validateNaturalGas) {
        returnValue = this.ValidateRequireField(naturalGas, 'pressureNormal') && returnValue;
        returnValue = this.ValidateRequireField(naturalGas, 'flowNormal') && returnValue;
        returnValue = this.ValidateRequireField(naturalGas, 'pressureMax') && returnValue;
        returnValue = this.ValidateRequireField(naturalGas, 'flowMax') && returnValue;
        returnValue = this.ValidateRequireField(naturalGas, 'firstSupply') && returnValue;
        returnValue = this.ValidateRequireField(naturalGas, 'cod') && returnValue;
        returnValue = this.ValidateRequireField(naturalGas, 'supplyPeriods') && returnValue;
      }


      //Validate Other
      for (let i = 0; i < otherData.length; i++) {
        let validateOther = false;
        let listOther = ['name', 'pressureNormalUnit', 'flowNormalUnit', 'pressureMaxUnit', 'flowMaxUnit', 'pressureNormalAmount', 'flowNormalAmount', 'pressureMaxAmount', 'flowMaxAmount']
        listOther.forEach(element => {
          if (otherData.at(i).get(element).value !== null && otherData.at(i).get(element).value !== '' && otherData.at(i).get(element).value !== undefined) {
            validateOther = true;
          }
          else {
            otherData.at(i).get(element).setErrors({ 'invalid': false });
          }
        });
        if (validateOther) {
          returnValue = this.ValidateRequireField(otherData.at(i) as FormGroup, 'name') && returnValue;
          returnValue = this.ValidateRequireField(otherData.at(i) as FormGroup, 'pressureNormalUnit') && returnValue;
          returnValue = this.ValidateRequireField(otherData.at(i) as FormGroup, 'flowNormalUnit') && returnValue;
          returnValue = this.ValidateRequireField(otherData.at(i) as FormGroup, 'pressureMaxUnit') && returnValue;
          returnValue = this.ValidateRequireField(otherData.at(i) as FormGroup, 'flowMaxUnit') && returnValue;
          returnValue = this.ValidateRequireField(otherData.at(i) as FormGroup, 'pressureNormalAmount') && returnValue;
          returnValue = this.ValidateRequireField(otherData.at(i) as FormGroup, 'flowNormalAmount') && returnValue;
          returnValue = this.ValidateRequireField(otherData.at(i) as FormGroup, 'pressureMaxAmount') && returnValue;
          returnValue = this.ValidateRequireField(otherData.at(i) as FormGroup, 'flowMaxAmount') && returnValue;
          returnValue = this.ValidateRequireField(otherData.at(i) as FormGroup, 'firstSupply') && returnValue;
          returnValue = this.ValidateRequireField(otherData.at(i) as FormGroup, 'cod') && returnValue;
          returnValue = this.ValidateRequireField(otherData.at(i) as FormGroup, 'supplyPeriods') && returnValue;
        }
      }
      if (!validateClarify && !validateCondensate && !validateDemin && !validateElectricity && !validateHighPressure && !validateHydrogen && !validateLowPressure && !validateMedPressure && !validateNaturalGas && !validateNitrogen && !validateOtherPressure) {
        this.initiativeService.isUtilityOtherRequire = true;
        return false
      } else {
        this.initiativeService.isUtilityOtherRequire = false;
      }
    } else {
      this.initiativeService.isUtilityOtherRequire = false;
    }
    // return true
    return returnValue
  }


  ValidateLookbackForm(formGroup: FormGroup): boolean {
    let returnValue = true;
    return returnValue; // Close validation PIM Lookback Pasuth.k 2021-09-17
    let ExecutionLookbackArray = formGroup.get('ExecutionLookback') as FormArray;
    let CoreUpliftArray = formGroup.get('CoreUplift') as FormArray;
    let generalData: Initiative = this.initiativeService.generalData.value
    let ExecutionLookbackArrayValue = ExecutionLookbackArray.getRawValue();
    //Issue: "", Background: "", LessonLearned: "",

    // console.log('validate', this.ifService.interfaceData.value);
    //const interfaceData: InterfaceData = this.ifService.interfaceData.value || {} as InterfaceData;
    returnValue = this.ValidateRequireField(formGroup, 'PlanLookbackDate') && returnValue;
    returnValue = this.ValidateRequireField(formGroup, 'FinishingDate') && returnValue;


    if (ExecutionLookbackArrayValue?.length) {
      returnValue = this.ValidateRequireField(ExecutionLookbackArray.at(0) as FormGroup, 'Issue') && returnValue;
      returnValue = this.ValidateRequireField(ExecutionLookbackArray.at(0) as FormGroup, 'Background') && returnValue;
      returnValue = this.ValidateRequireField(ExecutionLookbackArray.at(0) as FormGroup, 'LessonLearned') && returnValue;

      returnValue = this.ValidateRequireField(ExecutionLookbackArray.at(1) as FormGroup, 'Issue') && returnValue;
      returnValue = this.ValidateRequireField(ExecutionLookbackArray.at(1) as FormGroup, 'Background') && returnValue;
      returnValue = this.ValidateRequireField(ExecutionLookbackArray.at(1) as FormGroup, 'LessonLearned') && returnValue;

      returnValue = this.ValidateRequireField(ExecutionLookbackArray.at(2) as FormGroup, 'Issue') && returnValue;
      returnValue = this.ValidateRequireField(ExecutionLookbackArray.at(2) as FormGroup, 'Background') && returnValue;
      returnValue = this.ValidateRequireField(ExecutionLookbackArray.at(2) as FormGroup, 'LessonLearned') && returnValue;


      //require lookback person on performance lookback
      if (generalData.initiativeSubType?.toLowerCase() == "performance") {
        returnValue = this.ValidateRequireField(formGroup, 'PerformancePlanLookbackDate') && returnValue;
        returnValue = this.ValidateRequireField(formGroup, 'PerformanceLookbackPerson') && returnValue;
        returnValue = this.ValidateRequireField(formGroup, 'LookbackFocalPointPerson') && returnValue;
      }
      if (generalData.initiativeSubType?.toLowerCase() == "environment") {
        returnValue = this.ValidateRequireField(formGroup, 'EnviPlanLookbackDate') && returnValue;
        returnValue = this.ValidateRequireField(formGroup, 'LookbackFocalPointPerson') && returnValue;
        returnValue = this.ValidateRequireField(formGroup, 'LocalEnvironmentEngineer') && returnValue;
      }

    }

    if (formGroup.get('ShowPerformanceLookback').value) {
      //CoreUplift
      //EstimatedPlaned: "", Actual: "", WhyDifference: ""
      returnValue = this.ValidateRequireField(CoreUpliftArray.at(4) as FormGroup, 'EstimatedPlaned') && returnValue;
      returnValue = this.ValidateRequireField(CoreUpliftArray.at(4) as FormGroup, 'Actual') && returnValue;
      returnValue = this.ValidateRequireField(CoreUpliftArray.at(4) as FormGroup, 'WhyDifference') && returnValue;

      returnValue = this.ValidateRequireField(CoreUpliftArray.at(5) as FormGroup, 'EstimatedPlaned') && returnValue;
      returnValue = this.ValidateRequireField(CoreUpliftArray.at(5) as FormGroup, 'Actual') && returnValue;
      returnValue = this.ValidateRequireField(CoreUpliftArray.at(5) as FormGroup, 'WhyDifference') && returnValue;

    }

    //lookback dim

    //(ishandover && finish = 1 ||  ishandover && finish = 0)
    //initiative=>IsRequestHandoverFinish  , DimMaxHandsover=>IsRequestITHandover
    //if(this.initiativeService.generalData.isRequestHandoverFinish)
    if (this.initiativeService.suggestionStatus?.dim && this.stageService.stageForShowDimLookback.indexOf(this.initiativeService.suggestionStatus?.stage) >= 0) {
      //
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'originalFinishDate') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'latestRevisedFinishDate') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'actualFinishDate') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'projectTimelineVariance') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'projectTimelineStatus') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'projectTimelineReason') && returnValue;

      //
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'originalCost') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'lastestRevisedCost') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'projectCostActualCost') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'projectCostVariance') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'projectCostStatus') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'projectCostReason') && returnValue;
      //
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'directBenefitOriginalBaseline') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'directBenefitLastestBaseline') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'directBenefitActualCost') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'directBenefitVariance') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'directBenefitStatus') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'directBenefitReason') && returnValue;
      //
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'inDirectBenefitOriginalBaseline') && returnValue;
      ////returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'inDirectBenefitLastestBaseline') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'inDirectBenefitActualCost') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'inDirectBenefitVariance') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'inDirectBenefitStatus') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'inDirectBenefitReason') && returnValue;
      //
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'nonFinancialOriginalBaseline') && returnValue;
      ////returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'nonFinancialLastestBaseline') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'nonFinancialActualCost') && returnValue;
      ////returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'nonFinancialVariance') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'nonFinancialStatus') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'nonFinancialReason') && returnValue;
      //
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'originalScope') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'reviseScope') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'actualDelivered') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'projectScopeVariance') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'projectScopeStatus') && returnValue;
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'projectScopeReason') && returnValue;
      //
      returnValue = this.ValidateRequireField(formGroup.get('DimLookback') as FormGroup, 'recommendationForFuturePhase') && returnValue;
    }

    return returnValue
  }

  ValidateMilestone(milestone: FormArray, returnValue: boolean) {
    for (let i = 0; i < milestone.length; i++) {
      returnValue = this.ValidateRequireField(milestone.at(i) as FormGroup, 'milestone') && returnValue;
      // returnValue = this.ValidateRequireField(milestone.at(i) as FormGroup, 'keyDeliverable') && returnValue;
      // returnValue = this.ValidateRequireField(milestone.at(i) as FormGroup, 'start') && returnValue;
      returnValue = this.ValidateRequireField(milestone.at(i) as FormGroup, 'planFinish') && returnValue;
    }

    return returnValue;
  }

  ValidateProduct(product: FormArray, returnValue: boolean) {
    for (let i = 0; i < product.length; i++) {
      returnValue = this.ValidateRequireField(product.at(i) as FormGroup, 'name') && returnValue;
      returnValue = this.ValidateRequireField(product.at(i) as FormGroup, 'capacity') && returnValue;
      returnValue = this.ValidateRequireField(product.at(i) as FormGroup, 'productUnit') && returnValue;
      if (product.at(i).get('productUnit').value === 'PU03') {
        returnValue = this.ValidateRequireField(product.at(i) as FormGroup, 'other') && returnValue;
      }
      returnValue = this.ValidateRequireField(product.at(i) as FormGroup, 'type') && returnValue;
    }

    return returnValue;
  }

  //-----------------------------------------Request Pool Validation ----------------------------------------------//

  SubmitRequestPoolValidation(formGroup: FormGroup) {
    var returnValue = true;
    if (formGroup.get('initiativesForm')) {
      if (!this.ValidateRequestPoolGeneralInformationForm(formGroup.get('initiativesForm') as FormGroup)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'general') < 0) {
          this.inValidtab.push({
            tabName: 'general'
          });
        }
        returnValue = false;
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'general') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'general');
          this.inValidtab.splice(index, 1);
        }
      }
    }

    // if (formGroup.get('detailForm')) {
    //   if (!this.ValidateInitiativeDetailForm(formGroup.get('detailForm') as FormGroup)) {
    //     returnValue = false;
    //   }
    // }

    if (formGroup.get('capexInformationForm')) {
      if (!this.ValidateCapexInformationForm(formGroup.get('capexInformationForm') as FormGroup)) {
        if (this.inValidtab.findIndex((t) => t.tabName == 'capexInformationForm') < 0) {
          this.inValidtab.push({
            tabName: 'capexInformationForm'
          });
        }
        returnValue = false;
      } else {
        if (this.inValidtab.findIndex((t) => t.tabName == 'capexInformationForm') >= 0) {
          let index = this.inValidtab.findIndex((t) => t.tabName == 'capexInformationForm');
          this.inValidtab.splice(index, 1);
        }
      }
    }

    // if (formGroup.get('submitToForm')) {

    // }

    return returnValue;
  }

  ValidateRequestPoolGeneralInformationForm(form: FormGroup) {
    var returnValue = true;


    returnValue = this.ValidateRequireField(form, 'name') && returnValue;
    returnValue = this.ValidateRequireField(form, 'poolType') && returnValue;
    returnValue = this.ValidateRequireField(form, 'ownerName') && returnValue;
    returnValue = this.ValidateRequireField(form, 'company') && returnValue;

    //not require when choose pool type is PIM
    if (form.get('poolType').value != 'PIM') {
      returnValue = this.ValidateRequireField(form, 'organization') && returnValue;
      returnValue = this.ValidateRequireField(form, 'plant') && returnValue;
    }
    return returnValue;
  }

  ValidateRequestPoolCapexForm(form: FormGroup) {
    var returnValue = true;
    // returnValue = this.ValidateRequireField(form, 'startingDate') && returnValue;
    returnValue = this.ValidateRequireField(form, 'projecctComRun') && returnValue;
    returnValue = this.ValidateRequireField(form, 'requestIniNoDate') && returnValue;
    returnValue = this.ValidateRequireField(form, 'projectCost') && returnValue;
    returnValue = this.ValidateRequireField(form, 'costCenterOfVP') && returnValue;
    returnValue = this.ValidateRequireField(form, 'budgetPeriod') && returnValue;


    if (this.initiativeService.suggestionStatus?.stage == 'App. Request' && this.initiativeService.isAddmore) {
      returnValue = this.ValidateRequireField(form, 'spendingActual') && returnValue;
      returnValue = (parseFloat(form.get('existingCost').value) >= parseFloat(form.get('spendingActual').value)) && returnValue;
      // this.setErrorField(form, returnValue, 'spendingActual');
      returnValue = this.ValidateRequireField(form, 'additionalCost') && returnValue;
      // this.setErrorField(form, returnValue, 'additionalCost');
    }

    //annual & monthly
    if (this.initiativeService.isAddmore) {
      if (form.get('AnnualForm') && (parseFloat(form.get('AnnualForm').get('AnnualTotal_overall').value) == parseFloat(form.get('additionalCost').value))) {
        returnValue = true && returnValue;
      } else {
        returnValue = false && returnValue;
      }
    } else if (!this.initiativeService.isAddmore || !this.initiativeService.isReturn || !this.initiativeService.isRevise) {
      if (form.get('AnnualForm') && (parseFloat(form.get('AnnualForm').get('AnnualTotal_overall').value) == parseFloat(form.get('projectCost').value))) {
        returnValue = true && returnValue;
      } else {
        returnValue = false && returnValue;
      }
    }


    if (form.get('year_m') && form.get('monthForm0')) {
      let year_m = form.get('year_m').value;
      for (let index = 0; index < year_m.length; index++) {

        if (index > 9) {
          break;
        }

        // const element = array[index];
        let totalAnnual = form.get('AnnualForm').get('AnnualTotal' + (index + 1)).value && form.get('AnnualForm').get('AnnualTotal' + (index + 1)).value != '' ? form.get('AnnualForm').get('AnnualTotal' + (index + 1)).value : "0.00";
        let totalMonthly = form.get('monthForm' + index).get('monthTotal_overall').value && form.get('monthForm' + index).get('monthTotal_overall').value != '' ? form.get('monthForm' + index).get('monthTotal_overall').value : "0.00";
        if (parseFloat(totalAnnual) == parseFloat(totalMonthly) / 1000000) {
          //this.swalTool.Error(" equal " + parseFloat(totalAnnual) + ' ==  ' + parseFloat(totalMonthly) / 1000000);
          returnValue = true && returnValue;
        } else {
          //this.swalTool.Error("not equal " + parseFloat(totalAnnual) + ' ==  ' + parseFloat(totalMonthly) / 1000000);
          returnValue = false && returnValue;
        }

      }

    }

    return returnValue;
  }

  getStageNumber(stage: string): number {
    try {
      let temp = stage.split(/([0-9]+)/);
      //console.log('stage num ', temp);
      let result = undefined;
      temp.forEach(element => {
        //console.log('isNan >> ', isNaN(parseInt(element)));
        if (!isNaN(parseInt(element))) {
          result = parseInt(element);
        }
      });
      return result;
    }
    catch {
      return 0;
    }
  }

  HaveEditablePermission(fieldName: string) {
    //this.permission.roleSettingDetail
    if (this.permission.roleSettingDetail.findIndex(i => i.fieldName === fieldName && i.isEnable === false && i.isVisible === true) > 0) {
      console.log('Check Validate : false ' + fieldName);
      return false
    } else if (this.permission.roleSettingDetail.findIndex(i => i.fieldName === fieldName && i.isEnable === true && i.isVisible === true) > 0) {
      console.log('CheckRolesDetailList : true ' + fieldName);
      return true;
    } else if (this.permission.roleSettingDetail.findIndex(i => i.fieldName === fieldName && i.isVisible === false) > 0) {
      return false;
    } else if (this.permission.roleSettingDetail.findIndex(i => i.fieldName === fieldName && i.isVisible === true) > 0) {
      return true;
    } else {
      return true;
    }
    //return true;
  }
  CheckValidateNoDataStreamMaster(formGroup) {
    var masterlistSteam = this.detailService.workstreamLeader;
    this.approvermailList = [];
    masterlistSteam.forEach(element => {
      this.approvermailList.push(element.approverEmail.toLowerCase())
    });
    return this.approvermailList.map(x => x.toLowerCase()).lastIndexOf(formGroup.get('workstreamLead').value.toString().toLowerCase());
    //return this.approvermailList.lastIndexOf('test');
  }

  ValidateNoExistInMaster(formGroup: FormGroup, filendName) {
    var checkExistData = this.CheckValidateNoDataStreamMaster(formGroup);
    if (checkExistData == -1) {
      this.detailService.workstreamIsNotExist = true;
      formGroup.get(filendName).markAsTouched();
      formGroup.get(filendName).setErrors({ 'invalid': true });
      console.log('Validate  NoExistInMaster>>', filendName);
      return false;
    }
    return true;

  }
  ValidateRequireField(formGroup: FormGroup, filendName) {
    var returnValue = true;
    if (this.HaveEditablePermission(filendName) == false) {
      console.log('Validate HaveEditablePermission >>', filendName);
      return true;
    }

    if (!formGroup.get(filendName)) {
      console.log('Validate Required 1 >>', filendName);
      returnValue = false;
    }
    else {
      if (formGroup.get(filendName).value || parseInt(formGroup.get(filendName).value) >= 0) {
        var value: string;
        value = String(formGroup.get(filendName).value).trim();
        if (value == '' || value == 'Invalid Date' || value === null) {
          console.log('Validate Required 2 >>', filendName);
          returnValue = false;
        }
      } else if (formGroup.get(filendName).disabled) {
        console.log('Validate Required disabled >>', filendName);
        returnValue = true;
      }
      else {
        console.log('Validate Required 3 >>', filendName);
        returnValue = false;
      }
    }
    if (formGroup.get(filendName) && !returnValue) {
      console.log('Validate Required 4 >>', filendName);
      formGroup.get(filendName).markAsTouched();
      formGroup.get(filendName).setErrors({ 'invalid': true });
    }

    if (!returnValue) {
      console.log('report error: ', filendName);
    }
    return returnValue;
  }

  setErrorField(form: FormGroup, returnValue: boolean, name: string) {
    if (form.get(name) && !returnValue) {
      form.get(name).markAsTouched();
      form.get(name).setErrors({ 'invalid': true });
    }
  }


  ValidateRequireFieldPicMember(formGroup: FormGroup, filendName) {
    var returnValue = true;
    if (this.HaveEditablePermission(filendName) == false) {
      console.log('Validate HaveEditablePermission >>', filendName);
      return true;
    }

    if (!formGroup.get(filendName)) {
      console.log('Validate Required 1 >>', filendName);
      returnValue = false;
    }
    else {
      if (formGroup.get(filendName).value || parseInt(formGroup.get(filendName).value) >= 0) {
        var value: string;
        value = String(formGroup.get(filendName).value).trim();
        if (value == '' || value == 'Invalid Date' || value === null) {
          console.log('Validate Required 2 >>', filendName);
          returnValue = false;
        }
      } else if (formGroup.get(filendName).disabled) {
        console.log('Validate Required disabled >>', filendName);
        returnValue = true;
      }
      else {
        console.log('Validate Required 3 >>', filendName);
        returnValue = false;
      }
    }

    if (!returnValue) {
      console.log('report error: ', filendName);
    }
    return returnValue;
  }
}
