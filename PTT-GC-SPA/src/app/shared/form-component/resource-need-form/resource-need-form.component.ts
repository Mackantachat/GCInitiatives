import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { PermissionService } from '@services/permission/permission.service';
import { ResourceNeededService } from '@services/resource-needed/resource-needed.service';
import { StatusService } from '@services/status/status.service';
import { SwalTool } from '@tools/swal.tools';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-resource-need-form',
  templateUrl: './resource-need-form.component.html',
  styleUrls: ['./resource-need-form.component.css']
})
export class ResourceNeedFormComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() id: number;
  @Output() CheckSubmit = new EventEmitter();

  constructor(
    private statusService: StatusService,
    private initiativeService: InitiativeService,
    private resourceNeededService: ResourceNeededService,
    private fb: FormBuilder,
    private swalTool: SwalTool,
    public ps: PermissionService
  ) { }

  name = 'Resource Needed';
  page = 'resource-needed';
  bsConfig: Partial<BsDatepickerConfig>;
  isResource: boolean;

  isDisabledManpower = true;
  isDisabledLand = true;
  isDisabledAir = true;
  isDisabledWaste = true;
  isDisabledUtility = true;
  isDisabledElectricity = true;
  isDisabledOtherData = true;

  ResourceNeeded: number = 0;

  isManpowerRequire: boolean;
  isImportRequire: boolean;
  isLandRequire: boolean;
  isAirPollutionRequire: boolean;
  isWasteRequire: boolean;
  isUtilityRequire: boolean;

  isInitialManpowerForm: any[];
  isInitialLandForm: any[];
  isInitialAirForm: any[];
  isInitialWasteForm: any[];
  isInitialutilityData: any[];

  resourceDatas: any = [];

  ValidateManpower = false;
  ValidateFacility = false;
  ValidateLand = false;
  ValidateAir = false;
  ValidateWaste = false;
  ValidateUtility = false;

  status: string;
  remark: string;
  stage: string;
  Cim: boolean;
  Capex: boolean;
  Strategy: boolean;
  Max: boolean;

  AfterApprove = false;
  ValidateResource = false;
  params: any = {};

  resourceNeededForm = this.fb.group({
    id: 0,
    initiativeId: 0,
    isManpowerRequire: false,
    isImportRequire: false,
    isLandRequire: false,
    isAirPollutionRequire: false,
    isWasteRequire: false,
    isUtilityRequire: "false",
    remarkImport: null,
    manpowerForm: this.fb.group({ manpowerData: this.fb.array([]) }),
    landForm: this.fb.group({ landData: this.fb.array([]) }),
    airForm: this.fb.group({ pollutionData: this.fb.array([]) }),
    wasteForm: this.fb.group({ wasteData: this.fb.array([]) }),
    utilityData: this.fb.group({
      electricityData: this.fb.array([]),
      steamData: this.fb.group({
        highPressure: this.fb.group({
          resourceNeededId: 0,
          topicId: 1.2,
          condensateType: "Steam",
          pressureLevel: "High",
          pressureNormal: '',
          tempNormal: '',
          flowNormal: '',
          pressureMax: '',
          tempMax: '',
          flowMax: '',
          firstSupply: '',
          cod: '',
          supplyPeriods: ''
        }),
        mediumPressure: this.fb.group({
          resourceNeededId: 0,
          topicId: 1.2,
          condensateType: "Steam",
          pressureLevel: "Medium",
          pressureNormal: '',
          tempNormal: '',
          flowNormal: '',
          pressureMax: '',
          tempMax: '',
          flowMax: '',
          firstSupply: '',
          cod: '',
          supplyPeriods: ''
        }),
        lowPressure: this.fb.group({
          resourceNeededId: 0,
          topicId: 1.2,
          condensateType: "Steam",
          pressureLevel: "Low",
          pressureNormal: '',
          tempNormal: '',
          flowNormal: '',
          pressureMax: '',
          tempMax: '',
          flowMax: '',
          firstSupply: '',
          cod: '',
          supplyPeriods: ''
        }),
        otherSteamPressure: this.fb.group({
          resourceNeededId: 0,
          topicId: 1.2,
          condensateType: "Steam",
          pressureLevel: "Other",
          pressureNormal: '',
          tempNormal: '',
          flowNormal: '',
          pressureMax: '',
          tempMax: '',
          flowMax: '',
          firstSupply: '',
          cod: '',
          supplyPeriods: ''
        })
      }),
      deminWaterData: this.fb.group({
        resourceNeededId: 0,
        topicId: 1.3,
        fluidType: 'DeminWater',
        pressureNormal: '',
        flowNormal: '',
        pressureUnit: 'kg/cm2.G',
        flowUnit: 'm3/hr',
        pressureMax: '',
        flowMax: '',
        firstSupply: '',
        cod: '',
        supplyPeriods: ''
      }),
      treatedClarifyWater: this.fb.group({
        resourceNeededId: 0,
        topicId: 1.4,
        fluidType: 'TreatedWater',
        pressureNormal: '',
        flowNormal: '',
        pressureUnit: 'kg/cm2.G',
        flowUnit: 'm3/hr',
        pressureMax: '',
        flowMax: '',
        firstSupply: '',
        cod: '',
        supplyPeriods: ''
      }),
      returnWater: this.fb.group({
        resourceNeededId: 0,
        topicId: 1.5,
        condensateType: "ReturnWater",
        pressureLevel: "",
        pressureNormal: '',
        tempNormal: '',
        flowNormal: '',
        pressureMax: '',
        tempMax: '',
        flowMax: '',
        firstSupply: '',
        cod: '',
        supplyPeriods: ''
      }),
      hydrogen: this.fb.group({
        resourceNeededId: 0,
        topicId: 1.6,
        fluidType: 'Hydrogen',
        pressureNormal: '',
        flowNormal: '',
        pressureUnit: 'kg/cm2.G',
        flowUnit: 'Nm3/hr',
        pressureMax: '',
        flowMax: '',
        firstSupply: '',
        cod: '',
        supplyPeriods: ''
      }),
      nitrogen: this.fb.group({
        resourceNeededId: 0,
        topicId: 1.7,
        fluidType: 'Nitrogen',
        pressureNormal: '',
        flowNormal: '',
        pressureUnit: 'kg/cm2.G',
        flowUnit: 'Nm3/hr',
        pressureMax: '',
        flowMax: '',
        firstSupply: '',
        cod: '',
        supplyPeriods: ''
      }),
      naturalGas: this.fb.group({
        resourceNeededId: 0,
        topicId: 1.8,
        fluidType: 'NaturalGas',
        pressureNormal: '',
        flowNormal: '',
        pressureUnit: 'psig',
        flowUnit: 'MMBTU/DAY',
        pressureMax: '',
        flowMax: '',
        firstSupply: '',
        cod: '',
        supplyPeriods: ''
      }),
      otherData: this.fb.array([]),
    })
  });

  timeLineElectricity = this.fb.group({
    firstSupply: '',
    cod: '',
    supplyPeriods: ''
  })
  get invalidSubmit() {
    return this.resourceNeededForm.valid && this.ValidateResource;
  }

  ngOnInit(): void {
    if (!this.formGroup.get('resourceNeededForm')) {
      this.formGroup.addControl('resourceNeededForm', this.resourceNeededForm);
    }
    this.bsConfig = Object.assign({ isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false });
    this.resourceNeededForm.patchValue({ initiativeId: this.id })
    this.GetSuggestStatus(this.id);


    this.GetResourceNeeded();
  }

  get viewMode() {
    return this.initiativeService.viewMode;
  }

  get utilitySomeRequire() {
    return this.initiativeService.isUtilityOtherRequire;
  }


  get GetIsDisabledManpower() {
    return (this.resourceNeededForm.get('manpowerForm').get('manpowerData') as FormArray).length > 1 ? false : true;
  }

  get GetIsDisabledLand() {
    return (this.resourceNeededForm.get('landForm').get('landData') as FormArray).length > 1 ? false : true;
  }
  get GetIsDisabledAir() {
    return (this.resourceNeededForm.get('airForm').get('pollutionData') as FormArray).length > 1 ? false : true;
  }
  get GetIsDisabledWaste() {
    return (this.resourceNeededForm.get('wasteForm').get('wasteData') as FormArray).length > 1 ? false : true;
  }
  get GetIsDisabledElectricity() {
    return (this.resourceNeededForm.get('utilityData').get('electricityData') as FormArray).length > 1 ? false : true;
  }

  PatchForm() {
    if (this.resourceNeededForm.get('isManpowerRequire').value == false && this.resourceNeededForm.get('manpowerForm').get('manpowerData')) {
      this.resourceNeededForm.get('manpowerForm').get('manpowerData').patchValue([]);
    }

    if (this.resourceNeededForm.get('isLandRequire').value == false && this.resourceNeededForm.get('landForm').get('landData')) {
      this.resourceNeededForm.get('landForm').get('landData').patchValue([]);
    }
    if (this.resourceNeededForm.get('isAirPollutionRequire').value == false && this.resourceNeededForm.get('airForm').get('pollutionData')) {
      this.resourceNeededForm.get('airForm').get('pollutionData').patchValue([]);
    }
    if (this.resourceNeededForm.get('isWasteRequire').value == false && this.resourceNeededForm.get('wasteForm').get('wasteData')) {
      this.resourceNeededForm.get('wasteForm').get('wasteData').patchValue([]);
    }

    this.resourceNeededForm.patchValue({
      isManpowerRequire: this.resourceNeededForm.get('isManpowerRequire').value,
      manpowerForm: this.resourceNeededForm.get('manpowerForm').get('manpowerData').value,
      isImportRequire: this.resourceNeededForm.get('isImportRequire').value,
      remarkImport: this.resourceNeededForm.get('remarkImport').value,
      isLandRequire: this.resourceNeededForm.get('isLandRequire').value,
      landForm: this.resourceNeededForm.get('landForm').get('landData').value,
      isAirPollutionRequire: this.resourceNeededForm.get('isAirPollutionRequire').value,
      airForm: this.resourceNeededForm.get('airForm').get('pollutionData').value,
      isWasteRequire: this.resourceNeededForm.get('isWasteRequire').value,
      isUtilityRequire: this.resourceNeededForm.get('isUtilityRequire').value,
      wasteForm: this.resourceNeededForm.get('wasteForm').get('wasteData').value,
      utilityData: this.resourceNeededForm.get('utilityData').value
    });
  }

  GetSuggestStatus(id) {
    this.initiativeService.GetSuggestStatus(id).subscribe(response => {
      if (response) {
        this.status = response.status;
        this.stage = response.stage;
        this.remark = response.remark ? response.remark : null;
        this.Cim = response.cim ? true : false;
        this.Capex = response.directCapex ? true : false;
        this.Strategy = response.strategy ? true : false;
        this.Max = response.max ? true : false;
        const check = { status: response.status, stage: response.stage };
        this.statusService.CheckInitiativeDetail(check).subscribe(result => this.AfterApprove = result);
      }
    });
  }


  GetResourceNeeded() {
    this.resourceNeededService.GetResourceNeededData(this.id).subscribe((response) => {
      if (response) {
        this.resourceNeededForm.patchValue({ id: response.id });
        this.ResourceNeeded = response.id;
        this.resourceNeededForm.get('isManpowerRequire').patchValue(response.isManpowerRequire);
        this.resourceNeededForm.get('isImportRequire').patchValue(response.isImportRequire);
        this.resourceNeededForm.get('isLandRequire').patchValue(response.isLandRequire);
        this.resourceNeededForm.get('isAirPollutionRequire').patchValue(response.isAirPollutionRequire);
        this.resourceNeededForm.get('isWasteRequire').patchValue(response.isWasteRequire);
        this.resourceNeededForm.get('isUtilityRequire').patchValue(response.isUtilityRequire ? 'true' : 'false');
        this.resourceNeededForm.get('remarkImport').patchValue(response.remarkImport);
        // assign child table



        if (response.isManpowerRequire && response.manpowerForm.manpowerData) {
          if (response.manpowerForm.manpowerData.length === 0) {
            this.AddManpower();
          }
          else {
            const manpowerControls = this.resourceNeededForm.get('manpowerForm').get('manpowerData') as FormArray;
            for (let i = 0; i < response.manpowerForm.manpowerData.length; i++) {
              manpowerControls.push(this.InitialManpowerForm());
              manpowerControls.at(i).setValue(response.manpowerForm.manpowerData[i]);
            }
          }
        }
        else {
          this.AddManpower();
        }

        if (response.isLandRequire && response.landForm.landData) {
          if (response.landForm.landData.length === 0) {
            this.AddLand();
          }
          else {
            const landControls = this.resourceNeededForm.get('landForm').get('landData') as FormArray;
            for (let i = 0; i < response.landForm.landData.length; i++) {
              landControls.push(this.InitialLandForm());
              landControls.at(i).setValue(response.landForm.landData[i]);
            }
          }
        } else {
          this.AddLand();
        }
        if (response.isAirPollutionRequire && response.airForm.pollutionData) {
          if (response.airForm.pollutionData.length === 0) {
            this.AddAir();
          }
          else {
            const airControls = this.resourceNeededForm.get('airForm').get('pollutionData') as FormArray;
            for (let i = 0; i < response.airForm.pollutionData.length; i++) {
              airControls.push(this.InitialAirForm());
              airControls.at(i).setValue(response.airForm.pollutionData[i]);
            }
          }
        }
        else {
          this.AddAir();
        }

        if (response.isWasteRequire && response.wasteForm.wasteData) {
          if (response.wasteForm.wasteData.length === 0) {
            this.AddWaste();
          }
          else {
            const wasteControls = this.resourceNeededForm.get('wasteForm').get('wasteData') as FormArray;
            for (let i = 0; i < response.wasteForm.wasteData.length; i++) {
              wasteControls.push(this.InitialWasteForm());
              wasteControls.at(i).setValue(response.wasteForm.wasteData[i]);
            }
          }
        }
        else {
          this.AddWaste();
        }

        if (response.isUtilityRequire && response.utilityData) {

          if (response.utilityData.electricityData.length > 0) {
            const electricityControls = this.resourceNeededForm.get('utilityData').get('electricityData') as FormArray;

            for (var i = 0; i < response.utilityData.electricityData.length; i++) {

              electricityControls.push(this.InitialElectricityForm());
              electricityControls.at(i).setValue(response.utilityData.electricityData[i]);
              electricityControls.at(i).patchValue({
                firstSupply: response.utilityData.electricityData[i].firstSupply ? new Date(response.utilityData.electricityData[i].firstSupply) : null,
                cod: response.utilityData.electricityData[i].cod ? new Date(response.utilityData.electricityData[i].cod) : null,
                supplyPeriods: response.utilityData.electricityData[i].supplyPeriods
              })
            }
            this.timeLineElectricity.patchValue({
              firstSupply: electricityControls.at(0).value.firstSupply ? new Date(electricityControls.at(0).value.firstSupply) : null,
              cod: electricityControls.at(0).value.cod ? new Date(electricityControls.at(0).value.cod) : null,
              supplyPeriods: electricityControls.at(0).value.supplyPeriods
            })
          }
          else {
            const electricityControls = this.resourceNeededForm.get('utilityData').get('electricityData') as FormArray;
            electricityControls.push(this.InitialElectricityForm());
          }
          if (response.utilityData.steamData) {
            if (response.utilityData.steamData.highPressure) {
              this.resourceNeededForm.get('utilityData').get('steamData').get('highPressure').patchValue(response.utilityData.steamData.highPressure);
              this.resourceNeededForm.get('utilityData').get('steamData').get('highPressure').patchValue({
                firstSupply: response.utilityData.steamData.highPressure['firstSupply'] ? new Date(response.utilityData.steamData.highPressure['firstSupply']) : null,
                cod: response.utilityData.steamData.highPressure['cod'] ? new Date(response.utilityData.steamData.highPressure['cod']) : null
              })
            }
            if (response.utilityData.steamData.lowPressure) {
              this.resourceNeededForm.get('utilityData').get('steamData').get('lowPressure').patchValue(response.utilityData.steamData.lowPressure);
            }
            if (response.utilityData.steamData.mediumPressure) {
              this.resourceNeededForm.get('utilityData').get('steamData').get('mediumPressure').patchValue(response.utilityData.steamData.mediumPressure);
            }
            if (response.utilityData.steamData.otherSteamPressure) {
              this.resourceNeededForm.get('utilityData').get('steamData').get('otherSteamPressure').patchValue(response.utilityData.steamData.otherSteamPressure);
            }
          }

          if (response.utilityData.deminWaterData) {
            this.resourceNeededForm.get('utilityData').get('deminWaterData').patchValue(response.utilityData.deminWaterData);
            this.resourceNeededForm.get('utilityData').get('deminWaterData').patchValue({
              firstSupply: response.utilityData.deminWaterData['firstSupply'] ? new Date(response.utilityData.deminWaterData['firstSupply']) : null,
              cod: response.utilityData.deminWaterData['cod'] ? new Date(response.utilityData.deminWaterData['cod']) : null
            })
          }
          if (response.utilityData.treatedClarifyWater) {
            this.resourceNeededForm.get('utilityData').get('treatedClarifyWater').patchValue(response.utilityData.treatedClarifyWater);
            this.resourceNeededForm.get('utilityData').get('treatedClarifyWater').patchValue({
              firstSupply: response.utilityData.treatedClarifyWater['firstSupply'] ? new Date(response.utilityData.treatedClarifyWater['firstSupply']) : null,
              cod: response.utilityData.treatedClarifyWater['cod'] ? new Date(response.utilityData.treatedClarifyWater['cod']) : null
            })
          }
          if (response.utilityData.returnWater) {
            this.resourceNeededForm.get('utilityData').get('returnWater').patchValue(response.utilityData.returnWater);
            this.resourceNeededForm.get('utilityData').get('returnWater').patchValue({
              firstSupply: response.utilityData.returnWater['firstSupply'] ? new Date(response.utilityData.returnWater['firstSupply']) : null,
              cod: response.utilityData.returnWater['cod'] ? new Date(response.utilityData.returnWater['cod']) : null
            })
          }
          if (response.utilityData.hydrogen) {
            this.resourceNeededForm.get('utilityData').get('hydrogen').patchValue(response.utilityData.hydrogen);
            this.resourceNeededForm.get('utilityData').get('hydrogen').patchValue({
              firstSupply: response.utilityData.hydrogen['firstSupply'] ? new Date(response.utilityData.hydrogen['firstSupply']) : null,
              cod: response.utilityData.hydrogen['cod'] ? new Date(response.utilityData.hydrogen['cod']) : null
            })
          }
          if (response.utilityData.naturalGas) {
            this.resourceNeededForm.get('utilityData').get('naturalGas').patchValue(response.utilityData.naturalGas);
            this.resourceNeededForm.get('utilityData').get('naturalGas').patchValue({
              firstSupply: response.utilityData.naturalGas['firstSupply'] ? new Date(response.utilityData.naturalGas['firstSupply']) : null,
              cod: response.utilityData.naturalGas['cod'] ? new Date(response.utilityData.naturalGas['cod']) : null
            })
          }
          // response.utilityData.deminWaterData ? this.resourceNeededForm.get('utilityData').get('deminWaterData').patchValue(response.utilityData.deminWaterData) : null;
          // response.utilityData.treatedClarifyWater ? this.resourceNeededForm.get('utilityData').get('treatedClarifyWater').patchValue(response.utilityData.treatedClarifyWater) : null;
          // response.utilityData.returnWater ? this.resourceNeededForm.get('utilityData').get('returnWater').patchValue(response.utilityData.returnWater) : null;
          // response.utilityData.hydrogen ? this.resourceNeededForm.get('utilityData').get('hydrogen').patchValue(response.utilityData.hydrogen) : null;
          // response.utilityData.nitrogen ? this.resourceNeededForm.get('utilityData').get('nitrogen').patchValue(response.utilityData.nitrogen) : null;
          // response.utilityData.naturalGas ? this.resourceNeededForm.get('utilityData').get('naturalGas').patchValue(response.utilityData.naturalGas) : null;
          if (response.utilityData.otherData.length > 0) {
            const otherDataControls = this.resourceNeededForm.get('utilityData').get('otherData') as FormArray;
            for (var i = 0; i < response.utilityData.otherData.length; i++) {
              otherDataControls.push(this.InitialOtherData());
              otherDataControls.at(i).setValue(response.utilityData.otherData[i]);
              otherDataControls.at(i).patchValue({
                firstSupply: response.utilityData.otherData[i].firstSupply ? new Date(response.utilityData.otherData[i].firstSupply) : null,
                cod: response.utilityData.otherData[i].cod ? new Date(response.utilityData.otherData[i].cod) : null,
                supplyPeriods: response.utilityData.otherData[i].supplyPeriods
              })
            }
          }
        } else {
          this.resourceNeededForm.get('isUtilityRequire').setValue('false');
        }
      }

      else {
        this.resourceNeededForm.get('isUtilityRequire').patchValue('true');
        const electricityControls = this.resourceNeededForm.get('utilityData').get('electricityData') as FormArray;
        if (electricityControls.length == 0) {
          electricityControls.push(this.InitialElectricityForm());
        }
        if ((this.resourceNeededForm.get('manpowerForm').get('manpowerData') as FormArray).length < 1) {
          let control = this.InitialManpowerForm();
          (this.resourceNeededForm.get('manpowerForm').get('manpowerData') as FormArray).push(control);
        }
        if ((this.resourceNeededForm.get('landForm').get('landData') as FormArray).length < 1) {
          let control = this.InitialLandForm();
          (this.resourceNeededForm.get('landForm').get('landData') as FormArray).push(control);
        }
        if ((this.resourceNeededForm.get('airForm').get('pollutionData') as FormArray).length < 1) {
          let control = this.InitialAirForm();
          (this.resourceNeededForm.get('airForm').get('pollutionData') as FormArray).push(control);
        }
        if ((this.resourceNeededForm.get('wasteForm').get('wasteData') as FormArray).length < 1) {
          let control = this.InitialWasteForm();
          (this.resourceNeededForm.get('wasteForm').get('wasteData') as FormArray).push(control);
        }
        // if ((this.resourceNeededForm.get('utilityData').get('electricityData') as FormArray).length < 1) {
        //   let control = this.InitialElectricityForm();
        //   (this.resourceNeededForm.get('utilityData').get('electricityData') as FormArray).push(control);
        // }
      }


      if (this.initiativeService.viewMode) {
        this.resourceNeededForm.disable();
      }
    });

  }

  get manpowerRequire() {
    let manpowerRadio = this.resourceNeededForm.get('isManpowerRequire').value;
    if (manpowerRadio) {
      return true;
    }
    else {
      return false;
    }
  }

  get facilityRequire() {
    let facilityRadio = this.resourceNeededForm.get('isImportRequire').value;
    if (facilityRadio) {
      return true;
    }
    else {
      return false;
    }
  }

  get landRequire() {
    let landRadio = this.resourceNeededForm.get('isLandRequire').value;
    if (landRadio) {
      return true;
    }
    else {
      return false;
    }
  }

  get airRequire() {
    let airRadio = this.resourceNeededForm.get('isAirPollutionRequire').value;
    if (airRadio) {
      return true;
    }
    else {
      return false;
    }
  }

  get wasteRequire() {
    let wasteRadio = this.resourceNeededForm.get('isWasteRequire').value;
    if (wasteRadio) {
      return true;
    }
    else {
      return false;
    }
  }

  get utilityRequire() {
    // return this.resourceNeededForm.get('isUtilityRequire').value;
    let utilityRadio = this.resourceNeededForm.get('isUtilityRequire').value;
    if (utilityRadio === 'true') {
      return true;
    }
    else {
      return false;
    }
  }

  OnChangeRequireUtility(event) {
    // console.log(event.target.value);
    const electricityControls = this.resourceNeededForm.get('utilityData').get('electricityData') as FormArray;
    if (electricityControls.length == 0 && event.target.value === 'true') {
      electricityControls.push(this.InitialElectricityForm());
    } else {
      this.initiativeService.isUtilityOtherRequire = false;
    }
    // if (event) {
    // this.resourceNeededForm.get('isUtilityRequire').setValue(event.target.value);
    // }
  }

  AddManpower() {
    let control = this.resourceNeededForm.get('manpowerForm').get('manpowerData') as FormArray;
    control.push(this.InitialManpowerForm())
    this.isDisabledManpower = control.length > 1 ? false : true;
  }

  InitialManpowerForm(): FormGroup {
    return this.fb.group({
      id: 0,
      resourceNeededId: this.ResourceNeeded,
      position: [''],
      amountPerson: '',
      remark: ''
    });
  }

  RemoveManpower(index: number) {
    let control = this.resourceNeededForm.get('manpowerForm').get('manpowerData') as FormArray;
    control.removeAt(index);
    this.resourceNeededForm.get('manpowerForm').markAsDirty();
    if (control.length == 0) {
      this.AddManpower();
      this.isDisabledManpower = true;
    }
  }

  AddLand() {
    let control = this.resourceNeededForm.get('landForm').get('landData') as FormArray;
    control.push(this.InitialLandForm())
    this.isDisabledLand = control.length > 1 ? false : true;
  }

  InitialLandForm(): FormGroup {
    return this.fb.group({
      id: 0,
      resourceNeededId: this.ResourceNeeded,
      location: [''],
      amount: '',
      unit: '',
      startDate: '',
      remark: ''
    });
  }

  RemoveLand(index: number) {
    let control = this.resourceNeededForm.get('landForm').get('landData') as FormArray;
    control.removeAt(index);
    this.resourceNeededForm.get('landForm').markAsDirty();
    if (control.length == 0) {
      this.AddLand();
      this.isDisabledLand = true;
    }
  }

  AddAir() {
    let control = this.resourceNeededForm.get('airForm').get('pollutionData') as FormArray;
    control.push(this.InitialAirForm())
    this.isDisabledAir = control.length > 1 ? false : true;
  }

  InitialAirForm(): FormGroup {
    return this.fb.group({
      id: 0,
      resourceNeededId: this.ResourceNeeded,
      topic: '',
      amount: '',
      unit: '',
      remark: ''
    });
  }

  RemoveAir(index: number) {
    let control = this.resourceNeededForm.get('airForm').get('pollutionData') as FormArray;
    control.removeAt(index);
    this.resourceNeededForm.get('airForm').markAsDirty();
    if (control.length == 0) {
      this.AddAir();
      this.isDisabledAir = true;
    }
  }

  InitialSteamData(): FormGroup {
    return this.fb.group({
      highPressure: this.InitialCondensate(1.2),
      mediumPressure: this.InitialCondensate(1.2),
      lowPressure: this.InitialCondensate(1.2),
      otherSteamPressure: this.InitialCondensate(1.2)
    });
  }

  InitialCondensate(topic): FormGroup {
    return this.fb.group({
      resourceNeededId: this.ResourceNeeded,
      topicId: topic,
      condensateType: "",
      pressureLevel: "",
      pressureNormal: 0,
      tempNormal: 0,
      flowNormal: 0,
      pressureMax: 0,
      tempMax: 0,
      flowMax: 0
    })
  }

  AddWaste() {
    let control = this.resourceNeededForm.get('wasteForm').get('wasteData') as FormArray;
    control.push(this.InitialWasteForm())
    this.isDisabledWaste = control.length > 1 ? false : true;
  }

  InitialWasteForm(): FormGroup {
    return this.fb.group({
      id: 0,
      resourceNeededId: this.ResourceNeeded,
      topic: '',
      amount: '',
      unit: '',
      remark: ''
    });
  }

  RemoveWaste(index: number) {
    let control = this.resourceNeededForm.get('wasteForm').get('wasteData') as FormArray;
    control.removeAt(index);
    this.resourceNeededForm.get('wasteForm').markAsDirty();
    if (control.length == 0) {
      this.AddWaste();
      this.isDisabledWaste = true;
    }
  }

  unitRequire(i: number) {
    if (this.resourceNeededForm.get('airForm')) {
      let value = this.resourceNeededForm.get('airForm').get('pollutionData') as FormArray;
      if (value.at(i).get('unit').value == 'other') {
        return true;
      }
      else {
        return false
      }
    }
    if (this.resourceNeededForm.get('wasteForm')) {
      let value = this.resourceNeededForm.get('wasteForm').get('wasteData') as FormArray;
      if (value.at(i).get('unit').value == 'other') {
        return true;
      }
      else {
        return false
      }
    }
    return false;
  }

  invalidRemark(formGroup: string, formArray: string, i: number) {
    let value = this.resourceNeededForm.get(formGroup).get(formArray) as FormArray;
    if (value.at(i).get('unit').value == 'other') {
      if (!value.at(i).get('remark').value) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  //เวลาเทส ให้เข้าจากหน้า สร้างก่อน
  SetForm() {
    this.resourceNeededForm.patchValue({
      isManpowerRequire: this.resourceNeededForm.get('isManpowerRequire').value,
      manpowerForm: this.resourceNeededForm.get('manpowerForm').get('manpowerData').value,
      isImportRequire: this.resourceNeededForm.get('isImportRequire').value,
      remarkImport: this.resourceNeededForm.get('remarkImport').value,
      isLandRequire: this.resourceNeededForm.get('isLandRequire').value,
      landForm: this.resourceNeededForm.get('landForm').get('landData').value,
      isAirPollutionRequire: this.resourceNeededForm.get('isAirPollutionRequire').value,
      airForm: this.resourceNeededForm.get('airForm').get('pollutionData').value,
      isWasteRequire: this.resourceNeededForm.get('isWasteRequire').value,
      isUtilityRequire: this.resourceNeededForm.get('isUtilityRequire').value,
      wasteForm: this.resourceNeededForm.get('wasteForm').get('wasteData').value,
      utilityData: this.resourceNeededForm.get('utilityData').value
    });
  }

  SaveResourceNeeded(status) {
    if (this.resourceNeededForm.get('manpowerForm').value === 'true') {
      if (this.resourceNeededForm.get('manpowerForm').valid) {
        const ManpowerControl = this.resourceNeededForm.get('manpowerForm').get('manpowerData') as FormArray;
        for (let i = 0; i < ManpowerControl.length; i++) { ManpowerControl.at(i).get('id').patchValue(0); }
        this.resourceNeededService.InsertFormsToDatabase(this.resourceNeededForm.get('manpowerForm').get('manpowerData').value).subscribe(() => { });
      }
      else {
        if (status === 'submit') {
          this.swalTool.RequiredManpower();
          return false;
        }
      }
    }
    if (this.resourceNeededForm.get('isImportRequire').value === 'true') {
      if (this.resourceNeededForm.get('remarkImport').invalid) {
        if (status === 'submit') {
          this.swalTool.RequiredFacility();
          return false;
        }
      }
    }
    if (this.resourceNeededForm.get('land').value === 'true') {
      if (this.resourceNeededForm.get('landForm').valid) {
        const LandControl = this.resourceNeededForm.get('landForm').get('landData') as FormArray;
        for (let i = 0; i < LandControl.length; i++) { LandControl.at(i).get('id').patchValue(0); }
        this.resourceNeededService.InsertFormsToDatabase(this.resourceNeededForm.get('landForm').get('landData').value).subscribe(() => { });
      }
      else {
        if (status === 'submit') {
          this.swalTool.RequiredLand();
          return false;
        }
      }
    }
    if (this.resourceNeededForm.get('air').value === 'true') {
      if (this.resourceNeededForm.get('airForm').valid) {
        const AirControl = this.resourceNeededForm.get('airForm').get('pollutionData') as FormArray;
        for (let i = 0; i < AirControl.length; i++) { AirControl.at(i).get('id').patchValue(0); }
        this.resourceNeededService.InsertFormsToDatabase(this.resourceNeededForm.get('airForm').get('pollutionData').value).subscribe(() => { });
      }
      else {
        if (status === 'submit') {
          this.swalTool.RequiredAir();
          return false;
        }
      }
    }
    if (this.resourceNeededForm.get('waste').value === 'true') {
      if (this.resourceNeededForm.get('wasteForm').valid) {
        const WasteControl = this.resourceNeededForm.get('wasteForm').get('wasteData') as FormArray;
        for (let i = 0; i < WasteControl.length; i++) { WasteControl.at(i).get('id').patchValue(0); }
        this.resourceNeededService.InsertFormsToDatabase(this.resourceNeededForm.get('wasteForm').get('wasteData').value).subscribe(() => { });
      }
      else {
        if (status === 'submit') {
          this.swalTool.RequiredWaste();
          return false;
        }
      }
    }
  }


  CheckManpowerValid() {
    if (this.resourceNeededForm.get('manpowerForm').value === 'true') {
      this.resourceNeededForm.get('manpowerForm').get('manpowerData').markAsTouched();
      const control = this.resourceNeededForm.get('manpowerForm').get('manpowerData') as FormArray;
      for (let i = 0; i < control.length; i++) {
        this.ValidateManpower = control.at(i).get('manpowerData').value ? true : false;
      }
    } else {
      this.ValidateManpower = true;
    }
  }

  AddElectricity() {
    let control = this.resourceNeededForm.get('utilityData').get('electricityData') as FormArray;
    control.push(this.InitialElectricityForm())
    this.isDisabledElectricity = control.length > 1 ? false : true;
  }
  AddOther() {
    let control = this.resourceNeededForm.get('utilityData').get('otherData') as FormArray;
    control.push(this.InitialOtherData())
    this.isDisabledOtherData = control.length > 1 ? false : true;
  }
  DeleteOther(index: number) {
    let control = this.resourceNeededForm.get('utilityData').get('otherData') as FormArray;
    control.removeAt(index);
    this.isDisabledOtherData = control.length > 1 ? false : true;
  }

  InitialElectricityForm(): FormGroup {
    return this.fb.group({
      id: 0,
      voltage: null,
      normal: null,
      max: null,
      topicId: 1.1,
      resourceNeededId: this.ResourceNeeded,
      firstSupply: this.timeLineElectricity.value.firstSupply ? new Date(this.timeLineElectricity.value.firstSupply) : null,
      cod: this.timeLineElectricity.value.cod ? new Date(this.timeLineElectricity.value.cod) : null,
      supplyPeriods: this.timeLineElectricity.value.supplyPeriods
    });
  }
  InitialOtherData(): FormGroup {
    return this.fb.group({
      id: 0,
      resourceNeededId: this.ResourceNeeded,
      name: '',
      topicId: '',
      pressureNormalUnit: '',
      flowNormalUnit: '',
      pressureMaxUnit: '',
      flowMaxUnit: '',
      pressureNormalAmount: '',
      flowNormalAmount: '',
      pressureMaxAmount: '',
      flowMaxAmount: '',
      firstSupply: '',
      cod: '',
      supplyPeriods: ''
    });
  }

  InitialTimelineRecord(): FormGroup {
    return this.fb.group({
      resourceNeededId: 0,
      name: '',
      firstSupply: '',
      cod: '',
      supplyPeriods: ''
    });
  }

  RemoveElectricity(index: number) {
    let control = this.resourceNeededForm.get('utilityData').get('electricityData') as FormArray;
    control.removeAt(index);
    this.resourceNeededForm.get('utilityData').markAsDirty();
    if (control.length == 0) {
      this.AddElectricity();
      this.isDisabledElectricity = true;
    }
  }

  invalidManpower(i, name) {
    let manpower = this.resourceNeededForm.get('manpowerForm').get('manpowerData') as FormArray;
    return manpower.at(i).get(name).touched && manpower.at(i).get(name).invalid;
  }
  invalidFormNonArray(i, formName, formDataName, name) {
    if (this.resourceNeededForm?.get(formName)?.value) {
      let land = this.resourceNeededForm.get(formName)?.get(formDataName) as FormArray;
      if (land.length > 0 && land?.at(i).value) {
        return land?.at(i)?.get(name)?.touched && land?.at(i)?.get(name)?.invalid;
      }
      return false;
    }
    else {
      return false;
    }
  }
  invalidReamrkImport() {
    return this.resourceNeededForm.controls.remarkImport.touched && this.resourceNeededForm.controls.remarkImport.invalid;
  }

  ///not a good function ya ha tum.
  invalidNonArrayUtility(name, sublevel1, sublevel2) {
    if (sublevel2 !== null) {
      return this.resourceNeededForm.get('utilityData').get(name).get(sublevel1).get(sublevel2).touched && this.resourceNeededForm.get('utilityData').get(name).get(sublevel1).get(sublevel2).invalid;
    }
    else {
      return this.resourceNeededForm.get('utilityData').get(name).get(sublevel1).touched && this.resourceNeededForm.get('utilityData').get(name).get(sublevel1).invalid;
    }
  }

  invalidOther(i, name) {
    let other = this.resourceNeededForm.get('utilityData').get('otherData') as FormArray
    return other.at(i).get(name).touched && other.at(i).get(name).invalid;
  }

  get electricityFormArray() {
    return this.resourceNeededForm.get('utilityData').get('electricityData').value as FormArray;
  }

  OnChangeFirstSupply(event) {
    let electricity = this.resourceNeededForm.get('utilityData').get('electricityData') as FormArray;
    electricity.at(0).patchValue({ firstSupply: event ? new Date(event) : null });
  }

  OnChangeCOD(event) {
    let electricity = this.resourceNeededForm.get('utilityData').get('electricityData') as FormArray;
    electricity.at(0).patchValue({ cod: event ? new Date(event) : null });
  }

  OnChangeSupplyPeriods(event) {
    let electricity = this.resourceNeededForm.get('utilityData').get('electricityData') as FormArray;
    let value = parseInt(event.target.value);
    if (!isNaN(value)) {
      electricity.at(0).patchValue({ supplyPeriods: value });
    }
    else {
      electricity.at(0).patchValue({ supplyPeriods: null });
    }
  }

  getResourceNeedForm() {
    return this.resourceNeededForm as FormGroup;
  }
}

