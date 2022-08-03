import { DatePipe } from "@angular/common";
import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { FormArray, FormGroup, FormBuilder } from "@angular/forms";
import { Initiative } from '@models/initiative';
import { Owner } from '@models/owner';
import { BestPracticeService } from "@services/best-practice/best-practice.service";
import { CompamyService } from '@services/company/compamy.service';
import { InitiativeService } from "@services/initiative/initiative.service";
import { PermissionService } from '@services/permission/permission.service';
import { DateUtil } from "@utils/date.utils";
import { BsDatepickerViewMode } from "ngx-bootstrap/datepicker";

@Component({
  selector: "app-best-practice-form",
  templateUrl: "./best-practice-form.component.html",
  styleUrls: ["./best-practice-form.component.css"],
})
export class BestPracticeFormComponent implements OnInit, AfterContentChecked {
  @Input() formGroup: FormGroup;
  @Input() generalData: Initiative;
  id: number;

  knowledgeTypeList = [
    {
      key: "Best Practice",
      value: "Best Practice",
    },
  ];

  shareList = [
    {
      key: "PTT Group",
      value: "PTT Group",
    },
    {
      key: "GC Group",
      value: "GC Group",
    },
  ];

  contactPersonList = [];

  contactModel = new FormArray([]);
  projectReferenceModel = new FormArray([]);
  mileStoneModel = new FormArray([]);

  defaultDateConfig = {
    isAnimated: true,
    dateInputFormat: "DD/MM/YYYY",
    showWeekNumbers: false,
  };

  bsConfigStart = {
    isAnimated: true,
    dateInputFormat: "DD/MM/YYYY",
    showWeekNumbers: false,
  };

  bsConfigFinish = {
    isAnimated: true,
    dateInputFormat: "DD/MM/YYYY",
    showWeekNumbers: false,
    minDate: new Date(),
  };

  minMode: BsDatepickerViewMode = "year";

  yearViewDateFormart = {
    isAnimated: true,
    dateInputFormat: "YYYY",
    showWeekNumbers: false,
    minDate: new Date(),
    minMode: this.minMode,
  };

  businessLineList = [];
  companyList = [];
  projectTypeList = [];

  operationFunctionList = [];
  operationalUnitList = [];
  equipmentTypeList = [];
  productGroupList = [];
  oemsList = [];

  knowledgeThemeList: Array<string> = [];

  knowledgeContributerList = [
    { key: "CoDev1", value: "CoDev1" },
    { key: "CoDev2", value: "CoDev2" },
    { key: "CoDev3", value: "CoDev3" },
    { key: "CoDev4", value: "CoDev4" },
  ];

  plantList = [
    { key: "Plant 1", value: "Plant 1" },
    { key: "Plant 2", value: "Plant 2" },
  ];

  organiztionList = [
    { key: "Organization 1", value: "Organization 1" },
    { key: "Organization 2", value: "Organization 2" },
  ];

  bestPracticeForm: FormGroup;
  showSubmit: boolean;

  coDeveloperSelected: any = [];
  coDeveloperItems = [];
  selectListCoDeveloper: any = [];

  params: any = {};
  coDevelopers: any = [];
  initiativeList: any = [];
  username: string;
  contractList: Array<Owner> = [];





  constructor(
    private fb: FormBuilder,
    private dp: DatePipe,
    private initiativeService: InitiativeService,
    private bestPracticeService: BestPracticeService,
    private companyService: CompamyService,
    private cdref: ChangeDetectorRef,
    public ps: PermissionService,
    private dateUti: DateUtil
  ) {
    this.bestPracticeForm = this.fb.group({
      id: 0,
      isBestPracticeRequired: false,
      knowledgeType: "Best Practice",
      sharedTo: "GC Only",
      isPublishToOpEx: false,
      sharedPracticeType: "share",
      title: null,
      knowledgeOwner: "Owner",
      knowledgeContributor: null,
      company: null,
      plant: null,
      organization: null,
      isDigitalization: true,
      startDate: this.dateUti.GetToday,
      endDate: this.dateUti.GetToday,
      yearOfBestPractice: this.dateUti.GetToday,
      lifeTimeOfProject: null,
      investment: 0,
      projectCost: 0,
      abstractSummary: "Background",
      abstractDetails: "Scope",
      objective: "Objective",
      benefitDescription: null,
      benefitType: null,
      knowledgeTheme: "Community Relations",
      enterpriseKeyword: "Enterprise",
      captureMethod: null,
      captureMethodNote: null,
      targetGroupNote: null,
      applyFrom: null,
      applyFromOpEx: null,
      businessLine: null,
      projectType: null,
      oemsElement: "",
      application: null,
      operationFunction: "",
      operationUnit: "",
      equipmentType: "",
      productGroup: "",
      initiativeId: this.initiativeService.id
    });
  }
  ngOnInit(): void {
    this.id = this.initiativeService.id;
    if (!this.formGroup.get("bestPracticeForm")) {
      this.formGroup.addControl("bestPracticeForm", this.bestPracticeForm);
    }
    this.init();

  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  init() {
    this.companyList = this.companyService.companyList;
    this.getBestpracticeDetail(this.initiativeService.id);
    let arrayForm = ["contactModel", "projectReferenceModel", "mileStoneModel"];
    arrayForm.forEach((control) => {
      if (!this.bestPracticeForm.get(control)) {
        this.bestPracticeForm.addControl(control, this[control]);
      }
    });
    this.bestPracticeForm.get("knowledgeType").disable();
    // this.bestPracticeForm.get("knowledgeOwner").disable();
    this.GetKnowledgeThemesDropDown();
    this.GetBusinessLineDropDown();
    this.GetProjectTypeDropDown();
    this.GetoperationFunctionDropdpown();
    this.GetoperationUnitDropdpown();
    this.GetEquipmentTypeDropDown();
    this.GetProDuctGroupDropDown();
    this.GetCoDevelopers();
    this.GetOEMSElementDropDown();
    if (this.bestPracticeForm.get('benefitType').value == null) {
      this.initiativeService.getGeneralData.subscribe(data => {
        if (data) {
          this.bestPracticeForm.get('benefitType').setValue(data.benefitAmount);
        }
      })
    }
    // this.GetInittiativeData();
  }
  GetInittiativeData() {
    this.initiativeService.GetInitiative(this.initiativeService.id).subscribe(res => {
      if (res) {
        this.coDeveloperSelected = res.initiativeCoDevelopers;
        this.coDeveloperSelected.forEach((element) => {
          if (element.coDeveloperName) { this.selectListCoDeveloper.push(element.coDeveloperName); }
        });
        // this.coDeveloperItems = this.selectListCoDeveloper;
        this.bestPracticeForm.patchValue({
          initiativeId: res.id,
          title: res.name,
          company: res.company,
          knowledgeContributor: this.selectListCoDeveloper,
          knowledgeOwner: res.ownerName,
          plant: res.plant,
          startingDate: res.startingDate ? new Date(res.startingDate) : null,
          endDate: res.finishingDate ? new Date(res.finishingDate) : null,
          yearOfBestPractice: res.startingDate ? new Date(res.startingDate) : null,//new Date(res.startingDate).getFullYear(),
          abstractSummary: res.background,
          abstractDetails: res.scopeOfWork,
          organization: res.organization,
          objective: res.resultObjective,
          investment: res.costEstCapex,
          benefitType: res.typeBenefit === 'NON-FINANCIAL' ? 0 : res.benefitAmount,
          captureMethod: res.cim ? 'CIM' : res.cpi ? 'CPI' : res.dim ? 'DIM' : res.max ? 'MAX' : res.directCapex ? 'Direct CAPEX' : res.pim ? 'PIM' : res.strategy ? 'Strategy' : res.randD ? 'R&D' : 'Other'
        });

        //push creator
        this.initiativeService.GetOwnerEmail({ text: res.createdBy }).subscribe(resEmail => {
          if (resEmail) {
            let creator = this.newContract();
            creator.patchValue({
              name: resEmail.ownerName,
              phone: resEmail.telephone,
              email: resEmail.email,
            });
            let formArray = this.bestPracticeForm.get("contactModel") as FormArray;
            creator.disable();
            formArray.push(creator);
            this.contractList.push(resEmail);
          }
        });
        //push owner
        this.initiativeService.GetOwnerName({ text: res.ownerName }).subscribe(resName => {
          if (resName) {
            let owner = this.newContract();
            owner.patchValue({
              name: resName.ownerName,
              phone: resName.telephone,
              email: resName.email,
            });
            let temp = this.contractList.find(x => x.ownerName === owner.get('name').value);
            if (temp === undefined) {
              let formArray = this.bestPracticeForm.get("contactModel") as FormArray;
              owner.disable();
              formArray.push(owner);
              this.contractList.push(resName);
            }
          }
        });
        //push coDev
        for (var i = 0; i < res.initiativeCoDevelopers.length; i++) {
          this.initiativeService.GetOwnerName({ text: res.initiativeCoDevelopers[i]?.coDeveloperName }).subscribe(resName => {
            let coDev = this.newContract();
            coDev.patchValue({
              name: resName.ownerName,
              phone: resName.telephone,
              email: resName.email,
            });
            let temp = this.contractList.find(x => x.ownerName === coDev.get('name').value);
            if (temp === undefined) {
              let formArray = this.bestPracticeForm.get("contactModel") as FormArray;
              formArray.push(coDev);
              coDev.disable();
              this.contractList.push(resName);
            }
          })
        }
      }
    });
  }

  GetCoDevelopers(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetCoDevelopers(this.params).subscribe(coDevelopers => {
      if (coDevelopers) {
        this.coDevelopers = coDevelopers;
      }
    }, error => console.log(error));
  }

  GetInitiativeList(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetInitiativeList(this.params).subscribe(res => {
      if (res) {
        this.initiativeList = res;
      }
    })
  }

  SearchInitiativeList(event) {
    this.GetInitiativeList(event.term);
  }

  RemoveInitiativeList() {
    this.GetInitiativeList();
  }

  SearchCoDeveloper(event) {
    this.GetCoDevelopers(event.term);
  }

  RemoveCoDeveloper() {
    this.GetCoDevelopers();
  }

  GetPlants() {
    try {
      let companyName = this.bestPracticeForm.get('company').value;
      return companyName ? this.companyList.find(x => x.value == companyName).plant : [];
    }
    catch (err) {
      [];
    }
  }

  GetOrganizations() {
    try {
      let companyName = this.bestPracticeForm.get('company').value;
      return companyName ? this.companyList.find(x => x.value == companyName).org : [];
      // this.initiativeService.GetOrganizations().subscribe(organizations => this.organizations = organizations);
    } catch (err) {
      [];
    }
  }

  GetOEMSElementDropDown() {
    this.bestPracticeService.getOEMSElementDropDown().subscribe(res => {
      this.oemsList = res.map(x => x.attribute01);
    })
  }

  GetProDuctGroupDropDown() {
    this.bestPracticeService.getProductGroupDropDown().subscribe(res => {
      this.productGroupList = res.map(x => x.attribute01);
    })
  }
  GetEquipmentTypeDropDown() {
    this.bestPracticeService.getEquipmentTypeDropDown().subscribe(res => {
      this.equipmentTypeList = res.map(x => x.attribute01);
    });
  }
  GetoperationUnitDropdpown() {
    this.bestPracticeService.getOperationalUnitDropDown().subscribe(res => {
      this.operationalUnitList = res.map(x => x.attribute01);
    });
  }
  GetoperationFunctionDropdpown() {
    this.bestPracticeService.getOperationalFunctionDropDown().subscribe(res => {
      this.operationFunctionList = res.map(x => x.attribute01);
    });
  }

  GetProjectTypeDropDown() {
    this.bestPracticeService.getProjectTypeDropDown().subscribe(res => {
      this.projectTypeList = res.map(x => x.attribute01);
    });
  }

  GetBusinessLineDropDown() {
    this.bestPracticeService.getBusinessLineDropDown().subscribe(res => {
      this.businessLineList = res.map(x => x.attribute01);
    });
  }

  GetKnowledgeThemesDropDown() {
    this.bestPracticeService.getKnowledgeThemesDropDown().subscribe(res => {
      this.knowledgeThemeList = res.map(x => x.attribute01);
    });
  }
  getFormError(field) {
    return (this.formGroup.get('bestPracticeForm').get(field).touched || this.formGroup.get('bestPracticeForm').get(field).dirty) && this.formGroup.get('bestPracticeForm').get(field).invalid;
  }

  getBestpracticeDetail(id: number) {
    this.bestPracticeService
      .getBestPracticeForm(this.initiativeService.id)
      .subscribe((response) => {
        if (response) {
          // if(response.isBestPracticeRequired == true){
          this.showSubmit = response.isBestPracticeRequired;
          // }
          this.bestPracticeForm.patchValue(response);


          //fill contrac
          if (response.contactModel.length > 0) {
            let contactArray = this.bestPracticeForm.get('contactModel') as FormArray;

            if (this.initiativeService.viewMode) {
              response.contactModel.forEach((contact) => {
                contactArray.push(
                  this.fb.group({
                    name: { value: contact.name, disabled: true },
                    phone: { value: contact.phone, disabled: true },
                    email: { value: contact.email, disabled: true },
                  })
                );
              });

            } else {

              response.contactModel.forEach((contact) => {
                contactArray.push(
                  this.fb.group({
                    name: { value: contact.name, disabled: true },
                    phone: { value: contact.phone, disabled: true },
                    email: { value: contact.email, disabled: true },
                  })
                );
              });
            }
          }
          if (response.projectReferenceModel.length > 0) {
            let contactArray = this.bestPracticeForm.get('projectReferenceModel') as FormArray;
            if (this.initiativeService.viewMode) {
              response.projectReferenceModel.forEach((projectRef) => {
                contactArray.push(
                  this.fb.group({
                    projectReference: { value: projectRef.projectReference, disabled: true },
                  })
                );
              });
            } else {


              response.projectReferenceModel.forEach((projectRef) => {
                contactArray.push(
                  this.fb.group({
                    projectReference: projectRef.projectReference,
                  })
                );
              });
            }
          }

          //fill date
          this.bestPracticeForm.patchValue({
            startDate: response.startDate ? new Date(response.startDate) : null,
            endDate: response.endDate ? new Date(response.endDate) : null
          });
        }
        else {
          this.GetInittiativeData();
        }
      });

    if (this.initiativeService.viewMode) {
      this.bestPracticeForm.disable();
    }
  }

  get viewMode(): boolean {
    return this.initiativeService.viewMode;
  }

  onChangeIsSubmit() {
    this.showSubmit = this.bestPracticeForm.get('isBestPracticeRequired').value;
  }

  newContactPerson() {
    let formArray = this.bestPracticeForm.get("contactModel") as FormArray;
    formArray.push(
      this.fb.group({
        name: [null],
        phone: [null],
        email: [null],
      })
    );
  }
  newContract() {
    return this.fb.group({
      name: [null],
      phone: [null],
      email: [null],
    });
  }

  removeContactPerson(i) {
    let formArray = this.bestPracticeForm.get("contactModel") as FormArray;
    formArray.removeAt(i);
  }

  newProjectReferenceForm() {
    let formArray = this.bestPracticeForm.get(
      "projectReferenceModel"
    ) as FormArray;
    formArray.push(
      this.fb.group({
        initiativeId: this.initiativeService.id,
        projectReference: [null],
      })
    );
  }

  removeProjectReferenceForm(i) {
    let formArray = this.bestPracticeForm.get(
      "projectReferenceModel"
    ) as FormArray;
    formArray.removeAt(i);
  }

  newDetailForm() {
    let formArray = this.bestPracticeForm.get("mileStoneModel") as FormArray;
    formArray.push(
      this.fb.group({
        milestone: null,
        keyDeliverable: null,
        start: new Date(),
        planFinish: new Date(),
        actualFinish: new Date(),
        activity: "Critical",
        status: "In Progress",
      })
    );
  }

  removeDetailForm(i) {
    let formArray = this.bestPracticeForm.get("mileStoneModel") as FormArray;
    formArray.removeAt(i);
  }
}
