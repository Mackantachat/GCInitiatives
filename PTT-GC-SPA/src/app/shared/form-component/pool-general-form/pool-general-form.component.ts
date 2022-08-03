import { UnauthorizedService } from './../../../core/errors/unauthorized/unauthorized.service';
import { AuthService } from './../../../core/services/authentication/auth.service';
import { InitiativeService } from './../../../core/services/initiative/initiative.service';
import { CompamyService } from './../../../core/services/company/compamy.service';
import { CompanyList } from './../../../core/models/companyList';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { PaginatedResult, Pagination } from '@models/pagination';
import { InitiativeList, InitiativeListPoolPim, SearchConditonPoolPim } from '@models/initiativeList';
import { PoolService } from '@services/pool/pool.service';
import { poolReference } from '@models/poolReference';
import { ProgressService } from '@services/progress/progress.service';

@Component({
  selector: 'app-pool-general-form',
  templateUrl: './pool-general-form.component.html',
  styleUrls: ['./pool-general-form.component.css']
})
export class PoolGeneralFormComponent implements OnInit {

  @Input() formGroup: FormGroup;

  InitiativeDetail: any;
  companyList: CompanyList[];
  organizations: any[];
  plants: any[];
  invalidPlant: boolean;
  invalidOrganization: boolean;
  invalidCompany: boolean;
  haveCompany: boolean;
  invalidPoolType: boolean;
  invalidOwnerName: boolean;
  invalidName: boolean;
  username: any;
  owners: any;
  id: number;
  // params: any = {};
  poolPim = false;
  requestRef = false;
  isClicked = false;

  appRequestNo: string;

  // initiatives = null;
  initiativesForm = this.fb.group(
    {
      id: 0,
      initiativeType: 'Request Pool',
      poolType: [''],
      registeringDate: null,
      name: [null],
      ownerName: [null],
      organization: [null],
      company: [null],
      plant: [null],
      createdBy: null,
      updatedBy: null,
      requestReference: null,
      gate: null,
      totalInitiative: 0,
      totalProject: 0,
      initiativesList: new FormArray([])
    }
  )

  searchDetailForm = this.fb.group({
    searchGate: null,
    searchPlant: null,
    searchOrganization: null
  });


  //get initiative
  // initiatives: InitiativeList[];
  pagination: Pagination = {} as Pagination;
  initiativesList: InitiativeListPoolPim[] = [] as InitiativeListPoolPim[];
  params: any = {};

  currentPage = 1;

  isLoading = false;
  isRefresh = false;

  advanced: object;


  constructor
    (private fb: FormBuilder,
      private companyService: CompamyService,
      private authService: AuthService,
      private initiativeService: InitiativeService,
      private unauthorized: UnauthorizedService,
      private poolService: PoolService,
      private progressService: ProgressService
    ) { }

  ngOnInit(): void {
    this.id = this.initiativeService.id;
    this.companyList = this.companyService.companyList;
    if (!this.formGroup.get('initiativesForm')) {
      this.formGroup.addControl('initiativesForm', this.initiativesForm);
    }
    this.GetCurrentUserName();

    //Get Initiatives from Id in initiative Services.
    if (this.initiativeService.id) {
      this.getInitiative();
    } else {
      this.initiativesForm.get('registeringDate').setValue(new Date());
    }
  }

  get viewMode(): boolean {
    return this.initiativeService.viewMode;
  }

  getErrorMessage(formControlName: string) {
    if (this.initiativesForm.get(formControlName) && this.initiativesForm.get(formControlName).invalid && this.initiativesForm.get(formControlName).touched) {
      return true;
    } else {
      return false;
    }
  }

  GetInitativeCode() {
    return this.initiativeService.initiativeCode;
  }
  GetId() {
    return this.initiativeService.id;
  }

  getInitiative() {
    this.initiativeService.GetInitiative(this.initiativeService.id).subscribe(
      (response) => {
        this.initiativeService.initiativeCode = response.initiativeCode;
        this.initiativesForm.patchValue(response);
        //get App Request
        this.progressService.GetProgressHeader(this.initiativeService.id).subscribe((progressHeaderRes) => {
          if (progressHeaderRes && progressHeaderRes.appropriationNo) {
            this.appRequestNo = progressHeaderRes.appropriationNo.toString();
          }
        });

        //get poolpim
        this.poolService.GetReferenceIniPoolPim(this.initiativeService.id).then((getPoolPimResp) => {
          if (getPoolPimResp.length > 0) {
            let condition: SearchConditonPoolPim = {
              organization: null,
              plant: null,
              gate: null
            };
            this.initiativeService.GetRequestPoolPimInitiativeList(condition).then((listResponse) => {
              // if (listResponse) {
              //   this.setIemArray(listResponse);
              // }
              if (listResponse.length > 0) {
                this.initiativesList = listResponse;
                this.setFormArray(getPoolPimResp, listResponse);
              }
            });
            response.poolType == 'PIM' ? this.poolPim = true : null;
            getPoolPimResp[0].reference ? this.requestRef = true : null;
            this.initiativesForm.patchValue({
              gate: getPoolPimResp[0].gateSelect,
              requestReference: getPoolPimResp[0].reference
            });
            getPoolPimResp[0].reference ? this.requestRef = true : null;
          }
        });
      }
    );

    if (this.initiativeService.viewMode) {
      this.initiativesForm.disable();
    }
  }

  GetOrganizations() {
    try {
      let companyName = this.initiativesForm.get('company').value;
      return companyName ? this.companyList.find(x => x.value == companyName).org : [];
    } catch (err) {
      [];
    }
  }

  GetPlants() {
    try {
      let companyName = this.initiativesForm.get('company').value;
      return companyName ? this.companyList.find(x => x.value == companyName).plant : [];
    }
    catch (err) {
      [];
    }
  }

  onChangeCompany() {
    let companyName = this.initiativesForm.get('company').value;
    if (!this.poolPim) {
      this.initiativesForm.get('organization').setValue(null);
      this.initiativesForm.get('plant').setValue(null);
      if (companyName) {
        let companyList = this.companyList.find(x => x.value == companyName);
        this.organizations = companyList.org;
        this.plants = companyList.plant;
        return true
      }
      this.organizations = [];
      this.plants = [];
      return false;
    } else {
      this.initiativesForm.get('organization').setValue(null);
      this.initiativesForm.get('totalInitiative').setValue(0);
      this.initiativesForm.get('totalProject').setValue(0);
      // this.searchDetailForm.get('searchOrganization').setValue(null);
      this.searchDetailForm.get('searchPlant').setValue(null);
      this.searchDetailForm.get('searchGate').setValue("");
      if (companyName) {
        let companyList = this.companyList.find(x => x.value == companyName);
        this.organizations = companyList.org;
        this.plants = companyList.plant;
        (this.initiativesForm.get('initiativesList') as FormArray).clear();
        this.initiativesList = [];
        return true
      }
      (this.initiativesForm.get('initiativesList') as FormArray).clear();
      this.initiativesList = [];
      this.organizations = [];
      this.plants = [];
      return false;
    }
  }

  onChangePoolType() {
    let pooltype = this.initiativesForm.get('poolType').value;
    if (pooltype == 'PIM') {
      this.poolPim = true;
      this.initiativesForm.get('requestReference').setValue(true);
      this.requestReferenceChecked();
    } else {
      this.requestRef = false;
      this.poolPim = false;
    }
  }

  requestReferenceChecked() {
    let requestReference = this.initiativesForm.get('requestReference').value;
    if (requestReference) {
      this.requestRef = true;
    } else {
      this.requestRef = false;
    }
  }

  requestReference(event) {

    if (event.target.checked) {
      this.requestRef = true;
    } else {
      this.requestRef = false;
    }
  }



  /**
   *
   * @param
      id: number;
      initiativeCode: string;
      name: string;
      ownerName: string;
      typeOfInvestment: string;
      typeBenefit: string;
      benefit: number;
      costEstimate: number;
      stage: string;
      note: string;
   */
  checkDuplicate(respData: InitiativeListPoolPim[]) {
    let arrayValue: InitiativeListPoolPim[] = (this.initiativesForm.get('initiativesList') as FormArray).value;
    if (arrayValue.length > 0) {
      this.initiativesList = [];
      respData.forEach(data => {
        let item = arrayValue.findIndex(x => x.id == data.id);
        if (item < 0) {
          this.initiativesList.push(data);
        }
      });
    } else {
      this.initiativesList = respData;
    }
  }

  setIemArray(respData: InitiativeListPoolPim[]) {
    (this.initiativesForm.get('initiativesList') as FormArray).clear();
    respData.forEach((data) => {
      let groupControl = new FormGroup({
        selected: new FormControl(false),
        id: new FormControl(data.id),
        initiativeCode: new FormControl(data.initiativeCode),
        name: new FormControl(data.name),
        ownerName: new FormControl(data.ownerName),
        typeOfInvestment: new FormControl(data.typeOfInvestment),
        typeBenefit: new FormControl(data.typeBenefit),
        benefit: new FormControl(data.benefit),
        costEstimate: new FormControl(data.costEstimate),
        stage: new FormControl(data.stage),
        note: new FormControl(data.note)
      });
      (this.initiativesForm.get('initiativesList') as FormArray).push(groupControl);
    });
  }

  setFormArray(data: poolReference[], initiativeList: InitiativeListPoolPim[]) {
    (this.initiativesForm.get('initiativesList') as FormArray).clear();
    if (initiativeList && initiativeList.length > 0) {
      initiativeList.forEach((initative) => {
        if (this.initiativeService.viewMode) {
          if (data.findIndex((x) => x.initiativeId == initative.id) >= 0) {
            let groupControl = new FormGroup({
              selected: new FormControl(true),
              id: new FormControl(initative.id),
              initiativeCode: new FormControl(initative.initiativeCode),
              name: new FormControl(initative.name),
              ownerName: new FormControl(initative.ownerName),
              typeOfInvestment: new FormControl(initative.typeOfInvestment),
              typeBenefit: new FormControl(initative.typeBenefit),
              benefit: new FormControl(initative.benefit),
              costEstimate: new FormControl(initative.costEstimate),
              stage: new FormControl(initative.stage),
              note: new FormControl(initative.note)
            });
            (this.initiativesForm.get('initiativesList') as FormArray).push(groupControl);
          }
          this.getArrayLength();
          this.initiativesForm.get('initiativesList').disable();
        } else {
          let select: boolean;
          (data.findIndex((x) => x.initiativeId == initative.id) >= 0) ? select = true : select = false;
          let groupControl = new FormGroup({
            selected: new FormControl(select),
            id: new FormControl(initative.id),
            initiativeCode: new FormControl(initative.initiativeCode),
            name: new FormControl(initative.name),
            ownerName: new FormControl(initative.ownerName),
            typeOfInvestment: new FormControl(initative.typeOfInvestment),
            typeBenefit: new FormControl(initative.typeBenefit),
            benefit: new FormControl(initative.benefit),
            costEstimate: new FormControl(initative.costEstimate),
            stage: new FormControl(initative.stage),
            note: new FormControl(initative.note)
          });
          (this.initiativesForm.get('initiativesList') as FormArray).push(groupControl);
          this.getArrayLength();
        }
      });

    }
  }

  getArrayLength() {
    let value: InitiativeListPoolPim[] = this.initiativesForm.get('initiativesList').value;
    let length: InitiativeListPoolPim[] = value.filter(x => x.selected == true);


    // length.reduce((sum, current) => sum + current.costEstimate, 0);
    this.initiativesForm.get('totalInitiative').setValue(length.length);
    this.initiativesForm.get('totalProject').setValue(length.reduce((sum, current) => sum + current.costEstimate, 0));
    // return length.length;
    this.setIemArrays(length);
  }

  setIemArrays(lists: InitiativeListPoolPim[]) {
    (this.initiativesForm.get('initiativesList') as FormArray).clear();
    lists.forEach((initative) => {
      let groupControl = new FormGroup({
        selected: new FormControl(true),
        id: new FormControl(initative.id),
        initiativeCode: new FormControl(initative.initiativeCode),
        name: new FormControl(initative.name),
        ownerName: new FormControl(initative.ownerName),
        typeOfInvestment: new FormControl(initative.typeOfInvestment),
        typeBenefit: new FormControl(initative.typeBenefit),
        benefit: new FormControl(initative.benefit),
        costEstimate: new FormControl(initative.costEstimate),
        stage: new FormControl(initative.stage),
        note: new FormControl(initative.note)
      });
      (this.initiativesForm.get('initiativesList') as FormArray).push(groupControl);
    })
    this.searchInitiatives();
  }

  ClearOwnerName() {
    this.GetOwners();
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

  //Should be service?
  GetCurrentUserName() {
    this.authService.getMsalUser().subscribe((response) => {
      this.username = response.mail;
      this.params.text = this.username;
      this.initiativeService.GetOwnersEmail(this.params).subscribe(owners => {
        this.owners = owners;
        const owner = this.owners.filter(obj => {
          return obj.email.toLowerCase().trim() === this.username.toLowerCase().trim();
        });
        if (!this.id) {
          this.initiativesForm.patchValue({ ownerName: owner[0].ownerName });
        }
      });
    }, error => this.unauthorized.error(error));
  }

  getinitiativesFormArrayLength() {
    let formArray: any[] = (this.initiativesForm.get('initiativesList') as FormArray).value;
    return formArray.length;
  }

  chooseData(index: number) {
    let data: InitiativeListPoolPim = this.initiativesList[index];
    let groupControl = new FormGroup({
      selected: new FormControl(true),
      id: new FormControl(data.id),
      initiativeCode: new FormControl(data.initiativeCode),
      name: new FormControl(data.name),
      ownerName: new FormControl(data.ownerName),
      typeOfInvestment: new FormControl(data.typeOfInvestment),
      typeBenefit: new FormControl(data.typeBenefit),
      benefit: new FormControl(data.benefit),
      costEstimate: new FormControl(data.costEstimate),
      stage: new FormControl(data.stage),
      note: new FormControl(data.note)
    });
    (this.initiativesForm.get('initiativesList') as FormArray).push(groupControl);
    this.initiativesList.splice(index, 1);
    this.getArrayLength();
  }

  searchInitiatives() {
    // searchGate: null,
    // searchPlant: null,
    // searchOrganization: null
    let gate = this.searchDetailForm.get('searchGate').value;
    let plant = this.searchDetailForm.get('searchPlant').value;
    // let organization = this.searchDetailForm.get('searchOrganization').value;
    let organization = this.initiativesForm.get('organization').value;

    let condition: SearchConditonPoolPim = {
      organization: organization,
      plant: plant,
      gate: gate
    };
    this.initiativeService.GetRequestPoolPimInitiativeList(condition).then((listResponse) => {
      if (listResponse) {
        // this.initiativesList = listResponse;
        this.checkDuplicate(listResponse);
        // this.setIemArray(listResponse);
      }
    });

  }

}
