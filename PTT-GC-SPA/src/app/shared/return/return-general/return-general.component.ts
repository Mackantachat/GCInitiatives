import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateUtil } from '@utils/date.utils';
import { ResponseService } from '@errors/response/response.service';
import { InitiativeService } from '@services/initiative/initiative.service';
import { AttachmentService } from '@services/attachment/attachment.service';
import { UnauthorizedService } from '@errors/unauthorized/unauthorized.service';
import { AuthService } from '@services/authentication/auth.service';
import { ImpactService } from '@services/impact/impact.service';
import { SwalTool } from '@tools/swal.tools';
import { Attachment } from '@models/Attachment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService, ModalDirective, ModalOptions } from 'ngx-bootstrap/modal';
import { RemoveService } from '@services/remove/remove.service';
import { Router } from '@angular/router';
import { InitiativeAttachmentComponent } from '@components/initiative-attachment/initiative-attachment.component';

@Component({
    selector: 'app-return-general',
    templateUrl: './return-general.component.html',
    styleUrls: ['./return-general.component.css']
})
export class ReturnGeneralComponent implements OnInit {

    constructor(
        private fb: FormBuilder,
        private dateUtil: DateUtil,
        private authService: AuthService,
        private impactService: ImpactService,
        private unauthorized: UnauthorizedService,
        private response: ResponseService,
        private swalTool: SwalTool,
        private initiativeService: InitiativeService,
        private AttachmentService: AttachmentService,
        private http: HttpClient,
        private sanitizer: DomSanitizer,
        private removeService: RemoveService,
        private router: Router,
        private modalService: BsModalService,
    ) { }


    id: number;

    @Output() CheckSubmit = new EventEmitter();

    //@ViewChild('AttachmentModal', { static: false }) AttachmentModal: ModalDirective;
    @ViewChild('InvestmentModal', { static: false }) InvestmentModal: ModalDirective;

    @Output() Required = new EventEmitter();

    @Output() SendCim = new EventEmitter();
    @Output() SendCapex = new EventEmitter();
    @Output() SendStrategy = new EventEmitter();
    @Output() SendMax = new EventEmitter();

    page = 'edit';

    status: string;
    remark: string;
    stage: string;

    isLoadSuggest = false;

    plants: any = [];
    years: any = [];
    owners: any = [];
    organizations: any = [];
    coDevelopers: any = [];
    typeOfInvestments: any = [];
    coDeveloperSelected: any = [];
    selectListCoDeveloper: any = [];

    selectedItems = [];

    file: any = [];

    dateRegisterDisplay: string;
    dateStartDisplay: string;
    dateFinishDisplay: string;

    IsCim: boolean;
    IsPim: boolean;
    IsDim: boolean;
    IsCapex: boolean;
    IsMax: boolean;
    IsCpi: boolean;
    IsRandD: boolean;
    IsStrategy: boolean;
    IsOther: boolean;

    initiativesForm = this.fb.group({
        id: [null],
        name: [null, Validators.required],
        year: ['2020', Validators.required],
        ownerName: [null, Validators.required],
        organization: [null, Validators.required],
        company: '',
        specifyCompany: '',
        coDeveloper: [null],
        integration: '',
        plant: [null, Validators.required],
        specifyPlant: '',
        location: ['domestic'],
        specifyLocation: null,
        registeringDate: [new Date(), Validators.required],
        startingDate: [new Date(), Validators.required],
        finishingDate: [null, Validators.required],
        background: ['', Validators.required],
        resultObjective: ['', Validators.required],
        scopeOfWork: ['', Validators.required],
        initiativeType: [null],
        requestCapex: ['true', Validators.required],
        typeOfInvestment: [null, Validators.required],
        involveItDigital: false,
        requestProjectEngineer: '',
        budgetType: '',
        ram: '',
        jFactor: [null],
        irr: [null],
        wacc: [8.53],
        costEstCapex: [null],
        costEstCapexType: ['THB'],
        budgetSource: '',
        requestOpex: 'falseOpex',
        costEstOpex: { value: '', disabled: true },
        costEstOpexType: { value: 'THB', disabled: true },
        typeBenefit: '',
        benefitAmount: null,
        benefitAmountType: ['THB'],
        payBackPeriod: null,
        fxExchange: [null],
        cim: { value: '', disabled: true },
        pim: { value: '', disabled: true },
        dim: { value: '', disabled: true },
        max: { value: '', disabled: true },
        cpi: { value: '', disabled: true },
        directCapex: { value: '', disabled: true },
        strategy: { value: '', disabled: true },
        randD: { value: '', disabled: true },
        other: { value: '', disabled: true },
        // trackMax: { value: '', disabled: true },
        createdBy: '',
        updatedBy: ''
    });

    coDeveloperItems: any = [];

    showLocation = false;
    showTypeOfInvestment = true;
    showBudget = true;
    showRam = true;
    showJFactor = true;
    showIrr = true;
    showCostEstCapex = true;
    showCostEstCapexType = true;
    showCostEstOpex = true;
    showCostEstOpexType = true;
    showBudgetSource = true;
    showTypeBenefit = true;
    showFxExchange = true;
    showWacc = false;
    showBenefitAmount = false;
    showPayBackPeriod = false;

    dateRegister: string;
    dateStart: string;
    dateFinish: string;

    username: string;

    params: any = {};

    type: string;

    hasBaseDropZoneOver = false;

    initiativeCode: string;

    isDisabledSubmit = false;
    isDisabledDraft = false;

    replace: string;
    obsolate: string;
    confirmText = 'Maintain Reliability';

    bsModalRef: BsModalRef;
    config: ModalOptions = {
        class: 'modal-xl'
    };

    get CheckSuggestion() {
        return (this.IsCim || this.IsPim || this.IsDim || this.IsCapex || this.IsMax ||
            this.IsCpi || this.IsRandD || this.IsStrategy || this.IsOther);
    }

    get CheckValidForm() {
        return this.initiativesForm.valid && this.CheckSuggestion;
    }

    get CheckOnlyMax() {
        return (this.IsCim || this.IsPim || this.IsDim || this.IsCapex ||
            this.IsCpi || this.IsRandD || this.IsStrategy || this.IsOther);
    }

    get Investment() {
        return this.initiativesForm.controls.typeOfInvestment.value;
    }

    get invalidName() {
        return this.initiativesForm.controls.name.touched && this.initiativesForm.controls.name.invalid;
    }

    get invalidOwnerName() {
        return this.initiativesForm.controls.ownerName.touched && this.initiativesForm.controls.ownerName.invalid;
    }

    get invalidOrganization() {
        return this.initiativesForm.controls.organization.touched && this.initiativesForm.controls.organization.invalid;
    }

    get invalidPlant() {
        return this.initiativesForm.controls.plant.touched && this.initiativesForm.controls.plant.invalid;
    }

    get invalidBackground() {
        return this.initiativesForm.controls.background.touched && this.initiativesForm.controls.background.invalid;
    }

    get invalidResultObjective() {
        return this.initiativesForm.controls.resultObjective.touched && this.initiativesForm.controls.resultObjective.invalid;
    }

    get invalidScopeOfWork() {
        return this.initiativesForm.controls.scopeOfWork.touched && this.initiativesForm.controls.scopeOfWork.invalid;
    }

    get invalidTypeOfInvestment() {
        return this.initiativesForm.controls.typeOfInvestment.touched && this.initiativesForm.controls.typeOfInvestment.invalid;
    }

    get invalidStartingDate() {
        return this.initiativesForm.controls.finishingDate.touched && this.initiativesForm.controls.finishingDate.invalid;
    }

    get invalidCostEstCapex() {
        return this.initiativesForm.controls.costEstCapex.touched && this.initiativesForm.controls.costEstCapex.invalid;
    }

    get invalidCostEstOpex() {
        return this.initiativesForm.controls.costEstOpex.touched && this.initiativesForm.controls.costEstOpex.invalid;
    }

    get invalidTypeOfBenefit() {
        return this.initiativesForm.controls.typeBenefit.touched && this.initiativesForm.controls.typeBenefit.invalid;
    }

    get invalidBenefitAmount() {
        return this.initiativesForm.controls.benefitAmount.touched && this.initiativesForm.controls.benefitAmount.invalid;
    }

    get invalidPayBack() {
        return this.initiativesForm.controls.payBackPeriod.touched && this.initiativesForm.controls.payBackPeriod.invalid;
    }

    get invalidBudget() {
        return this.initiativesForm.controls.budgetType.touched && this.initiativesForm.controls.budgetType.invalid;
    }

    get invalidJFactor() {
        return this.initiativesForm.controls.jFactor.touched && this.initiativesForm.controls.jFactor.invalid;
    }

    get invalidFX() {
        return this.initiativesForm.controls.fxExchange.touched && this.initiativesForm.controls.fxExchange.invalid;
    }

    get invalidRam() {
        return this.initiativesForm.controls.ram.touched && this.initiativesForm.controls.ram.invalid;
    }

    get invalidIrr() {
        return this.initiativesForm.controls.irr.touched && this.initiativesForm.controls.irr.invalid;
    }

    bsConfigStart = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false };
    bsConfigFinish = { isAnimated: true, dateInputFormat: 'DD/MM/YYYY', showWeekNumbers: false, minDate: new Date() };

    ngOnInit(): void {
        this.GetUser();
        this.GetSelectGeneral();
        this.GetYears();
        setTimeout(() => this.GetInitiative(), 200);
        this.id = Number(sessionStorage.getItem('id'));
        sessionStorage.setItem('page', 'general-information');
        sessionStorage.setItem('InitiativeValidate', JSON.stringify(this.CheckValidForm));
    }

    GetSelectGeneral() {
        this.initiativeService.GetPlants().subscribe(plants => this.plants = plants);
        this.plants.push({ id: 9999, plantId: 'P9999', plantTitle: 'Others (please specify)' });
        this.initiativeService.GetOrganizations().subscribe(organizations => this.organizations = organizations);
        this.initiativeService.GetCoDevelopers().subscribe(coDevelopers => this.coDevelopers = coDevelopers);
        this.initiativeService.GetOwners().subscribe(owners => this.owners = owners);
        this.initiativeService.GetTypeOfInvestments().subscribe(typeOfInvestments => this.typeOfInvestments = typeOfInvestments);
        this.typeOfInvestments.push({ id: 9999, typeOfInvestment: 'Others', typeOfInvestmentTitle: 'Others' });
    }

    GetOwners(Text?) {
        this.params.text = Text ? Text : '';
        this.initiativeService.GetOwners(this.params).subscribe(owners => {
            this.owners = owners;
        });
    }

    GetYears() {
        const year = new Date().getFullYear();
        for (let i = 1; i <= 5; i++) { this.years.push(year - i); }
        this.years.unshift(year + 1, year);
    }

    GetUser() {
        this.authService.getMsalUser().subscribe((response) => {
            this.username = response.mail;
            this.params.text = this.username;
            this.initiativeService.GetOwnersEmail(this.params).subscribe(owners => {
                this.owners = owners;
                const owner = this.owners.filter(obj => {
                    return obj.email.toLowerCase().trim() === this.username.toLowerCase().trim();
                });
                this.GetCoDevelopers();
                if (!this.id) {
                    this.initiativesForm.patchValue({ ownerName: owner[0].ownerName });
                }
            });
        }, error => this.unauthorized.error(error));
    }

    SetHideForm() {
        this.showTypeOfInvestment = false;
        this.showBudget = false;
        this.showRam = false;
        this.showIrr = false;
        this.showJFactor = false;
        this.showCostEstCapex = false;
        this.showCostEstCapexType = false;
        this.showFxExchange = false;
    }

    CheckTypeOfInvestment(typeOfInvestment) {
        switch (typeOfInvestment) {
            case 'Maintain Reliability':
                this.showRam = false;
                this.showJFactor = false;
                this.showBudget = false;
                break;
            case 'Replacement':
                this.showRam = false;
                this.showJFactor = false;
                this.showIrr = false;
                break;
            case 'CSR':
            case 'Digital CAPEX':
            case 'IT CAPEX':
            case 'Turnaround':
            case 'Others':
            case 'Overhaul':
            case 'R&D':
            case 'Lab & Quality':
            case 'Technical Support for R&D':
            case 'Welfare':
                this.showRam = false;
                this.showJFactor = false;
                this.showIrr = false;
                this.showBudget = false;
                break;
            case 'Engineering Request ER':
                this.showRam = false;
                this.showJFactor = false;
                this.showIrr = false;
                break;
            case 'CVC':
            case 'Divestment':
            case 'M&A':
                this.showBudget = false;
                this.showRam = false;
                this.showJFactor = false;
                this.showIrr = false;
                this.showTypeBenefit = false;
                break;
            case 'Growth: Backbone':
            case 'Growth: New business':
            case 'Growth: Build International Competitive base':
            case 'Growth: Diversify to performance chemicals':
            case 'Growth: Enhance green':
            case 'Sustain Core: Synergy':
            case 'Sustain Core: Operational Excellence':
            case 'Sustain Core: Marketing Excellence':
            case 'Sustain Core: Debot/Expansion':
            case 'Sustain Core: Chain Integration':
            case 'Sustain Core: New derivative':
            case 'Sustain Core: Map ta put retrofit':
                this.showJFactor = false;
                this.showRam = false;
                this.showBudget = false;
                break;
            case 'Sustain Core: Energy saving':
                this.showJFactor = false;
                this.showRam = false;
                this.showBudget = false;
                this.showWacc = true;
                break;
            case 'Safety':
            case 'Environment':
            case 'Law & Regulation':
                this.showIrr = false;
                this.showTypeBenefit = false;
                this.showBudget = false;
                break;
        }
    }

    CheckCostEstimated(typeOfInvestment) {
        const costEstCapex = this.initiativesForm.controls.costEstCapex.value;
        switch (typeOfInvestment) {
            case 'Maintain Reliability':
            case 'Replacement':
            case 'Turnaround':
            case 'Lab & Quality':
            case 'Technical Support for R&D':
            case 'R&D':
            case 'Overhaul':
            case 'CSR':
            case 'Welfare':
            case 'Engineering Request ER':
            case 'Others':
                if (costEstCapex > 300) {
                    this.showTypeBenefit = false;
                    this.showBenefitAmount = false;
                    this.showPayBackPeriod = false;
                } else {
                    this.showTypeBenefit = true;
                }
                break;
            case 'Growth: Backbone':
            case 'Growth: New business':
            case 'Growth: Build International Competitive base':
            case 'Growth: Diversify to performance chemicals':
            case 'Growth: Enhance green':
            case 'Sustain Core: Synergy':
            case 'Sustain Core: Operational Excellence':
            case 'Sustain Core: Marketing Excellence':
            case 'Sustain Core: Debot/Expansion':
            case 'Sustain Core: Chain Integration':
            case 'Sustain Core: New derivative':
            case 'Sustain Core: Map ta put retrofit':
                if (costEstCapex > 300) {
                    this.showTypeBenefit = false;
                    this.showBenefitAmount = false;
                    this.showPayBackPeriod = false;
                    this.showIrr = false;
                } else {
                    this.showIrr = true;
                    this.showTypeBenefit = true;
                }
                break;
            case 'Digital CAPEX':
            case 'IT CAPEX':
                if (costEstCapex > 300) {
                    this.showTypeBenefit = false;
                    this.showBenefitAmount = false;
                    this.showPayBackPeriod = false;
                    this.showIrr = false;
                } else {
                    this.showTypeBenefit = true;
                }
                break;
        }
    }

    ActiveSuggestion(response) {
        if (response.cim) {
            this.initiativesForm.patchValue({ cim: true });
            this.IsCim = true;
        }
        if (response.pim) {
            this.initiativesForm.patchValue({ pim: true });
            this.IsPim = true;
        }
        if (response.dim) {
            this.initiativesForm.patchValue({ dim: true });
            this.IsDim = true;
        }
        if (response.max) {
            this.initiativesForm.patchValue({ max: true });
            this.IsMax = true;
        }
        if (response.cpi) {
            this.initiativesForm.patchValue({ cpi: true });
            this.IsCpi = true;
        }
        if (response.randD) {
            this.initiativesForm.patchValue({ randD: true });
            this.IsRandD = true;
        }
        if (response.other) {
            this.initiativesForm.patchValue({ other: true });
            this.IsOther = true;
        }
        if (response.strategy) {
            this.initiativesForm.patchValue({ strategy: true });
            this.IsStrategy = true;
        }
        if (response.directCapex) {
            this.initiativesForm.patchValue({ directCapex: true });
            this.IsCapex = true;
        }
    }

    PatchForm() {
        this.initiativesForm.patchValue({
            costEstCapexType: 'THB',
            typeBenefit: '',
            payBackPeriod: '',
            benefitAmount: '',
            irr: '',
            budgetType: '',
            ram: '',
            jFactor: ''
        });
    }

    ValidateForm(FormControl) {
        if (FormControl.includes('investment')) {
            this.initiativesForm.controls.typeOfInvestment.setValidators([Validators.required]);
            this.initiativesForm.controls.typeOfInvestment.updateValueAndValidity();
        }
        if (FormControl.includes('budgetType')) {
            this.initiativesForm.controls.budgetType.setValidators([Validators.required]);
            this.initiativesForm.controls.budgetType.updateValueAndValidity();
        }
        if (FormControl.includes('ram')) {
            this.initiativesForm.controls.ram.setValidators([Validators.required]);
            this.initiativesForm.controls.ram.updateValueAndValidity();
        }
        if (FormControl.includes('jFactor')) {
            this.initiativesForm.controls.jFactor.setValidators([Validators.required]);
            this.initiativesForm.controls.jFactor.updateValueAndValidity();
        }
        if (FormControl.includes('irr')) {
            this.initiativesForm.controls.irr.setValidators([Validators.required]);
            this.initiativesForm.controls.irr.updateValueAndValidity();
        }
        if (FormControl.includes('fxExchange')) {
            this.initiativesForm.controls.fxExchange.setValidators([Validators.required]);
            this.initiativesForm.controls.fxExchange.updateValueAndValidity();
        }
        if (FormControl.includes('costEstCapex')) {
            this.initiativesForm.controls.costEstCapex.setValidators([Validators.required]);
            this.initiativesForm.controls.costEstCapex.updateValueAndValidity();
        }
        if (FormControl.includes('costEstCapexType')) {
            this.initiativesForm.controls.costEstCapexType.setValidators([Validators.required]);
            this.initiativesForm.controls.costEstCapexType.updateValueAndValidity();
        }
        if (FormControl.includes('costEstOpex')) {
            this.initiativesForm.controls.costEstOpex.setValidators([Validators.required]);
            this.initiativesForm.controls.costEstOpex.updateValueAndValidity();
        }
        if (FormControl.includes('typeBenefit')) {
            this.initiativesForm.controls.typeBenefit.setValidators([Validators.required]);
            this.initiativesForm.controls.typeBenefit.updateValueAndValidity();
        }
        if (FormControl.includes('wacc')) {
            this.initiativesForm.controls.wacc.setValidators([Validators.required]);
            this.initiativesForm.controls.wacc.updateValueAndValidity();
        }
        if (FormControl.includes('benefitAmount')) {
            this.initiativesForm.controls.benefitAmount.setValidators([Validators.required]);
            this.initiativesForm.controls.benefitAmount.updateValueAndValidity();
        }
        if (FormControl.includes('payBackPeriod')) {
            this.initiativesForm.controls.payBackPeriod.setValidators([Validators.required]);
            this.initiativesForm.controls.payBackPeriod.updateValueAndValidity();
        }
    }

    ClearValidateForm(FormControl) {
        if (FormControl.includes('investment')) {
            this.initiativesForm.controls.typeOfInvestment.clearValidators();
            this.initiativesForm.controls.typeOfInvestment.updateValueAndValidity();
        }
        if (FormControl.includes('budgetType')) {
            this.initiativesForm.controls.budgetType.clearValidators();
            this.initiativesForm.controls.budgetType.updateValueAndValidity();
        }
        if (FormControl.includes('ram')) {
            this.initiativesForm.controls.ram.clearValidators();
            this.initiativesForm.controls.ram.updateValueAndValidity();
        }
        if (FormControl.includes('jFactor')) {
            this.initiativesForm.controls.jFactor.clearValidators();
            this.initiativesForm.controls.jFactor.updateValueAndValidity();
        }
        if (FormControl.includes('irr')) {
            this.initiativesForm.controls.irr.clearValidators();
            this.initiativesForm.controls.irr.updateValueAndValidity();
        }
        if (FormControl.includes('fxExchange')) {
            this.initiativesForm.controls.fxExchange.clearValidators();
            this.initiativesForm.controls.fxExchange.updateValueAndValidity();
        }
        if (FormControl.includes('costEstCapex')) {
            this.initiativesForm.controls.costEstCapex.clearValidators();
            this.initiativesForm.controls.costEstCapex.updateValueAndValidity();
        }
        if (FormControl.includes('costEstCapexType')) {
            this.initiativesForm.controls.costEstCapexType.clearValidators();
            this.initiativesForm.controls.costEstCapexType.updateValueAndValidity();
        }
        if (FormControl.includes('costEstOpex')) {
            this.initiativesForm.controls.costEstOpex.clearValidators();
            this.initiativesForm.controls.costEstOpex.updateValueAndValidity();
        }
        if (FormControl.includes('typeBenefit')) {
            this.initiativesForm.controls.typeBenefit.clearValidators();
            this.initiativesForm.controls.typeBenefit.updateValueAndValidity();
        }
        if (FormControl.includes('wacc')) {
            this.initiativesForm.controls.wacc.clearValidators();
            this.initiativesForm.controls.wacc.updateValueAndValidity();
        }
        if (FormControl.includes('benefitAmount')) {
            this.initiativesForm.controls.benefitAmount.clearValidators();
            this.initiativesForm.controls.benefitAmount.updateValueAndValidity();
        }
        if (FormControl.includes('payBackPeriod')) {
            this.initiativesForm.controls.payBackPeriod.clearValidators();
            this.initiativesForm.controls.payBackPeriod.updateValueAndValidity();
        }
    }

    EnableForm(FormControl) {
        if (FormControl.includes('investment')) { this.initiativesForm.controls.typeOfInvestment.enable(); }
        if (FormControl.includes('budgetType')) { this.initiativesForm.controls.budgetType.enable(); }
        if (FormControl.includes('ram')) { this.initiativesForm.controls.ram.enable(); }
        if (FormControl.includes('jFactor')) { this.initiativesForm.controls.jFactor.enable(); }
        if (FormControl.includes('irr')) { this.initiativesForm.controls.irr.enable(); }
        if (FormControl.includes('fxExchange')) { this.initiativesForm.controls.fxExchange.enable(); }
        if (FormControl.includes('costEstCapex')) { this.initiativesForm.controls.costEstCapex.enable(); }
        if (FormControl.includes('costEstOpex')) { this.initiativesForm.controls.costEstOpex.enable(); }
        if (FormControl.includes('costEstCapexType')) { this.initiativesForm.controls.costEstCapexType.enable(); }
        if (FormControl.includes('costEstOpexType')) { this.initiativesForm.controls.costEstOpexType.enable(); }
        if (FormControl.includes('budgetSource')) { this.initiativesForm.controls.budgetSource.enable(); }
        if (FormControl.includes('typeBenefit')) { this.initiativesForm.controls.typeBenefit.enable(); }
        if (FormControl.includes('wacc')) { this.initiativesForm.controls.wacc.enable(); }
        if (FormControl.includes('benefitAmount')) { this.initiativesForm.controls.benefitAmount.enable(); }
        if (FormControl.includes('payBackPeriod')) { this.initiativesForm.controls.payBackPeriod.enable(); }
    }

    SetShowForm() {
        this.ShowForm(['investment', 'budgetType', 'ram', 'jFactor', 'irr', 'fxExchange', 'costEstCapex',
            'costEstCapexType', 'typeBenefit']);
        this.HideForm(['wacc', 'benefitAmount', 'payBackPeriod']);
    }

    SetValidateForm() {
        this.ValidateForm(['investment']);
        this.ClearValidateForm(['costEstCapex', 'costEstOpex', 'jFactor', 'ram', 'irr', 'budgetType', 'typeBenefit', 'fxExchange']);
    }

    SetEnableFrom() {
        this.EnableForm([
            'investment', 'budgetType', 'ram', 'jFactor', 'irr', 'wacc', 'costEstCapex',
            'costEstCapexType', 'typeBenefit', 'benefitAmount', 'payBackPeriod', 'fxExchange', 'budgetSource'
        ]);
    }

    CheckModalTypeOfInvestment() {
        switch (this.initiativesForm.controls.typeOfInvestment.value) {
            case 'Maintain Reliability':
                this.InvestmentModal.show();
                break;
            case 'Replacement':
                this.InvestmentModal.show();
                break;
        }
    }

    ConfirmInvestment(confirmText): void {
        this.initiativesForm.patchValue({ typeOfInvestment: confirmText });
        this.PatchForm();
        this.SetShowForm();
        this.SetValidateForm();
        this.SetEnableFrom();
        switch (this.initiativesForm.controls.typeOfInvestment.value) {
            case 'Maintain Reliability':
                this.replace = 'not-in-kind';
                this.obsolate = 'no';
                this.confirmText = 'Maintain Reliability';
                this.InvestmentModal.show();
                this.HideForm(['ram', 'jFactor', 'budgetType', 'wacc']);
                this.DisableForm(['ram', 'jFactor', 'budgetType']);
                this.ShowForm(['irr', 'investment', 'costEstCapex', 'costEstCapexType', 'typeBenefit', 'fxExchange']);
                this.ValidateForm(['irr', 'costEstCapex', 'typeBenefit']);
                break;
            case 'Replacement':
                this.replace = 'in-kind';
                this.obsolate = 'yes';
                this.confirmText = 'Replacement';
                this.InvestmentModal.show();
                this.HideForm(['ram', 'jFactor', 'irr', 'wacc']);
                this.ShowForm(['budgetType', 'investment', 'costEstCapex', 'costEstCapexType', 'typeBenefit', 'fxExchange']);
                this.DisableForm(['ram', 'jFactor', 'irr']);
                this.ValidateForm(['costEstCapex', 'irr', 'budgetType', 'typeBenefit']);
                break;
        }
        this.InvestmentModal.hide();
    }

    OnChangeCostEstimated() {
        switch (this.initiativesForm.controls.typeOfInvestment.value) {
            case 'Maintain Reliability':
            case 'Replacement':
            case 'Turnaround':
            case 'Lab & Quality':
            case 'Technical Support for R&D':
            case 'R&D':
            case 'Overhaul':
            case 'CSR':
            case 'Welfare':
            case 'Engineering Request ER':
            case 'Others':
                if (this.initiativesForm.controls.costEstCapex.value > 300) {
                    this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'wacc']);
                    this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod']);
                    this.initiativesForm.patchValue({ typeBenefit: '' });
                } else {
                    this.ShowForm(['typeBenefit']);
                    this.EnableForm(['typeBenefit']);
                }
                break;
            case 'Growth: Backbone':
            case 'Growth: New business':
            case 'Growth: Build International Competitive base':
            case 'Growth: Diversify to performance chemicals':
            case 'Growth: Enhance green':
            case 'Sustain Core: Synergy':
            case 'Sustain Core: Operational Excellence':
            case 'Sustain Core: Marketing Excellence':
            case 'Sustain Core: Debot/Expansion':
            case 'Sustain Core: Chain Integration':
            case 'Sustain Core: New derivative':
            case 'Sustain Core: Map ta put retrofit':
                if (this.initiativesForm.controls.costEstCapex.value > 300) {
                    this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                    this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                    this.initiativesForm.patchValue({ typeBenefit: '' });
                } else {
                    this.ShowForm(['irr', 'typeBenefit']);
                    this.EnableForm(['irr', 'typeBenefit']);
                }
                break;
            case 'Digital CAPEX':
            case 'IT CAPEX':
                if (this.initiativesForm.controls.costEstCapex.value > 300) {
                    this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                    this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
                    this.initiativesForm.patchValue({ typeBenefit: '' });
                } else {
                    this.ShowForm(['typeBenefit']);
                    this.EnableForm(['typeBenefit']);
                }
                break;
        }
        this.CalculatePayBackPeriod();
    }

    FinishChange(value: Date): void {
        const time = new Date(value).getTime();
        if (time > 0) {
            this.dateFinish = this.dateUtil.SetDate(new Date(value));
            if (this.dateStart < this.dateFinish) {
                this.dateFinish = this.dateUtil.SetDate(new Date(value));
            } else {
                if (!(this.isDisabledSubmit || this.isDisabledDraft)) {
                    this.dateFinish = null;
                    if (!this.initiativeService.viewMode) {
                        this.swalTool.DateValid();
                        this.initiativesForm.patchValue({ finishingDate: null });
                    }
                }
            }
        }
    }

    OnChangeTypeOfInvestment() {
        this.PatchForm();
        this.SetShowForm();
        this.SetValidateForm();
        this.SetEnableFrom();
        this.CheckModalTypeOfInvestment();
        this.CheckTypeOfInvestment(this.initiativesForm.controls.typeOfInvestment.value);
        this.OnChangeCostEstimated();
    }

    // CalculateUSD() {
    //   const costEstCapex = this.initiativesForm.controls.costEstCapex.value;
    //   const fx = this.initiativesForm.controls.fxExchange.value;
    //   switch (this.initiativesForm.controls.costEstCapexType.value) {
    //     case 'USD':
    //       this.ValidateForm(['costEstCapex', 'fxExchange']);
    //       if (this.initiativesForm.controls.costEstCapexType.value === 'USD') {
    //         if (fx) {
    //           const result = costEstCapex * fx;
    //           this.costEstCapex = Math.round(result * 100) / 100;
    //           if (result > 300) {
    //             this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
    //             this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
    //           } else {
    //             this.ShowForm(['typeBenefit', 'irr']);
    //             this.EnableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'irr']);
    //           }
    //         } else {
    //           this.costEstCapex = 0;
    //         }
    //         this.costEstCapexType = 'THB';
    //       }
    //       break;
    //   }
    // }

    CalculatePayBackPeriod() {
        const costEstCapex = this.initiativesForm.controls.costEstCapex.value;
        const costEstOpex = this.initiativesForm.controls.costEstOpex.value;
        const benefitAmount = this.initiativesForm.controls.benefitAmount.value;
        const result = (Number(costEstCapex) + Number(costEstOpex)) / Number(benefitAmount);
        this.initiativesForm.patchValue({ payBackPeriod: isFinite(result) ? result : null });
    }

    OnChangeBenefitAmount() {
        this.CalculatePayBackPeriod();
    }

    DisableForm(FormControl) {
        if (FormControl.includes('investment')) { this.initiativesForm.controls.typeOfInvestment.disable(); }
        if (FormControl.includes('budgetType')) { this.initiativesForm.controls.budgetType.disable(); }
        if (FormControl.includes('ram')) { this.initiativesForm.controls.ram.disable(); }
        if (FormControl.includes('jFactor')) { this.initiativesForm.controls.jFactor.disable(); }
        if (FormControl.includes('irr')) { this.initiativesForm.controls.irr.disable(); }
        if (FormControl.includes('fxExchange')) { this.initiativesForm.controls.fxExchange.disable(); }
        if (FormControl.includes('costEstCapex')) { this.initiativesForm.controls.costEstCapex.disable(); }
        if (FormControl.includes('costEstOpex')) { this.initiativesForm.controls.costEstOpex.disable(); }
        if (FormControl.includes('costEstCapexType')) { this.initiativesForm.controls.costEstCapexType.disable(); }
        if (FormControl.includes('costEstOpexType')) { this.initiativesForm.controls.costEstOpexType.disable(); }
        if (FormControl.includes('budgetSource')) { this.initiativesForm.controls.budgetSource.disable(); }
        if (FormControl.includes('typeBenefit')) { this.initiativesForm.controls.typeBenefit.disable(); }
        if (FormControl.includes('wacc')) { this.initiativesForm.controls.wacc.disable(); }
        if (FormControl.includes('benefitAmount')) { this.initiativesForm.controls.benefitAmount.disable(); }
        if (FormControl.includes('payBackPeriod')) { this.initiativesForm.controls.payBackPeriod.disable(); }
    }

    ShowForm(FormControl) {
        if (FormControl.includes('investment')) { this.showTypeOfInvestment = true; }
        if (FormControl.includes('budgetType')) { this.showBudget = true; }
        if (FormControl.includes('ram')) { this.showRam = true; }
        if (FormControl.includes('jFactor')) { this.showJFactor = true; }
        if (FormControl.includes('irr')) { this.showIrr = true; }
        if (FormControl.includes('costEstCapex')) { this.showCostEstCapex = true; }
        if (FormControl.includes('costEstCapexType')) { this.showCostEstCapexType = true; }
        if (FormControl.includes('typeBenefit')) { this.showTypeBenefit = true; }
        if (FormControl.includes('wacc')) { this.showWacc = true; }
        if (FormControl.includes('benefitAmount')) { this.showBenefitAmount = true; }
        if (FormControl.includes('payBackPeriod')) { this.showPayBackPeriod = true; }
        if (FormControl.includes('fxExchange')) { this.showFxExchange = true; }
    }

    HideForm(FormControl) {
        if (FormControl.includes('investment')) { this.showTypeOfInvestment = false; }
        if (FormControl.includes('budgetType')) { this.showBudget = false; }
        if (FormControl.includes('ram')) { this.showRam = false; }
        if (FormControl.includes('jFactor')) { this.showJFactor = false; }
        if (FormControl.includes('irr')) { this.showIrr = false; }
        if (FormControl.includes('costEstCapex')) { this.showCostEstCapex = false; }
        if (FormControl.includes('costEstOpex')) { this.showCostEstOpex = false; }
        if (FormControl.includes('costEstCapexType')) { this.showCostEstCapexType = false; }
        if (FormControl.includes('costEstOpexType')) { this.showCostEstOpexType = false; }
        if (FormControl.includes('budgetSource')) { this.showBudgetSource = false; }
        if (FormControl.includes('typeBenefit')) { this.showTypeBenefit = false; }
        if (FormControl.includes('wacc')) { this.showWacc = false; }
        if (FormControl.includes('benefitAmount')) { this.showBenefitAmount = false; }
        if (FormControl.includes('payBackPeriod')) { this.showPayBackPeriod = false; }
        if (FormControl.includes('fxExchange')) { this.showFxExchange = false; }
    }

    CheckOwner(ownerName, createdBy) {
        setTimeout(() => {
            this.authService.getMsalUser().subscribe((user) => {
                this.params.text = ownerName;
                this.initiativeService.GetOwnerName(this.params).subscribe(owners => {
                    if ((user.mail === owners.email) || (user.mail === createdBy)) {
                        this.CheckSubmit.emit(true);
                    }
                });
            }, error => this.unauthorized.error(error));
        }, 200);

    }

    GetInitiative() {
        this.initiativeService.GetInitiative(this.id).subscribe(response => {

            // this.initiativesForm.disable();
            this.initiativesForm.patchValue(response);
            this.initiativeCode = response.initiativeCode;
            this.coDeveloperSelected = response.initiativeCoDevelopers;
            this.coDeveloperSelected.forEach((element) => {
                if (element.coDeveloperName) { this.selectListCoDeveloper.push(element.coDeveloperName); }
            });
            this.coDeveloperItems = this.selectListCoDeveloper;
            this.initiativesForm.patchValue({ coDeveloper: this.coDeveloperItems });
            this.selectedItems = this.selectListCoDeveloper;
            this.dateRegisterDisplay = this.dateUtil.GetDate(new Date(response.registeringDate));
            this.dateStartDisplay = this.dateUtil.GetDate(new Date(response.startingDate));
            this.dateFinishDisplay = response.finishingDate ? this.dateUtil.GetDate(new Date(response.finishingDate)) : null;
            this.initiativesForm.patchValue({
                registeringDate: this.dateRegisterDisplay,
                startingDate: this.dateStartDisplay,
                finishingDate: this.dateFinishDisplay,
                jFactor: response.jFactor !== 0 ? response.jFactor : null,
                irr: response.irr !== 0 ? response.irr : null,
                costEstCapex: response.costEstCapex !== 0 ? response.costEstCapex : null,
                benefitAmount: response.benefitAmount !== 0 ? response.benefitAmount : null,
                fxExchange: response.fxExchange !== 0 ? response.fxExchange : null,
                payBackPeriod: response.payBackPeriod !== 0 ? response.payBackPeriod : null
            });
            this.CheckTypeOfInvestment(response.typeOfInvestment);
            this.CheckCostEstimated(response.typeOfInvestment);
            this.ActiveSuggestion(response);

            if (this.initiativesForm.controls.costEstCapex.value > 300) {
                this.HideForm(['typeBenefit', 'benefitAmount', 'payBackPeriod', 'wacc']);
                this.DisableForm(['typeBenefit', 'benefitAmount', 'payBackPeriod']);
                this.initiativesForm.patchValue({ typeBenefit: '' });
            } else {
                this.ShowForm(['typeBenefit']);
                this.DisableForm(['typeBenefit']);
            }

            switch (response.typeBenefit) {
                case 'EBIT':
                case 'EBITDA':
                    this.showBenefitAmount = true;
                    this.showPayBackPeriod = true;
                    break;
                default:
                    this.showBenefitAmount = false;
                    break;
            }
            if (response.requestCapex === 'false') {
                this.ShowForm(['typeBenefit']);
                this.HideForm(['investment', 'budgetType', 'ram', 'irr', 'jFactor', 'costEstCapex', 'costEstCapexType', 'fxExchange']);
                this.DisableForm(['investment', 'budgetType', 'ram', 'irr', 'jFactor', 'costEstCapex', 'costEstCapexType', 'fxExchange']);
            }
            if (response.requestOpex === 'falseOpex') {
                this.HideForm(['costEstOpex', 'costEstOpexType']);
                this.DisableForm(['costEstOpex', 'costEstOpexType']);
            }

            if (response.benefitAmount) {
                this.impactService.GetImpactTotalRecurringOneTime(this.id).subscribe((result) => {
                    if (result) {
                        if (result !== 0) {
                            this.initiativesForm.patchValue({ benefitAmount: result });
                        }
                    }
                });
            }

            this.CheckOwner(response.ownerName, response.createdBy);

        }, error => this.response.error(error));
    }

    GetSetDate(registeringDate, startingDate, finishingDate) {
        this.dateRegisterDisplay = this.dateUtil.GetDate(new Date(registeringDate));
        this.dateStartDisplay = this.dateUtil.GetDate(new Date(startingDate));
        this.dateFinishDisplay = finishingDate ? this.dateUtil.GetDate(new Date(finishingDate)) : null;
        this.dateRegister = this.dateUtil.SetDate(new Date(registeringDate));
        this.dateStart = this.dateUtil.SetDate(new Date(startingDate));
        this.dateFinish = finishingDate ? this.dateUtil.SetDate(new Date(finishingDate)) : null;
    }

    EnableSuggest(FormControl) {
        if (FormControl.includes('cim')) { this.initiativesForm.controls.cim.enable(); }
        if (FormControl.includes('pim')) { this.initiativesForm.controls.pim.enable(); }
        if (FormControl.includes('dim')) { this.initiativesForm.controls.dim.enable(); }
        if (FormControl.includes('max')) { this.initiativesForm.controls.max.enable(); }
        if (FormControl.includes('cpi')) { this.initiativesForm.controls.cpi.enable(); }
        if (FormControl.includes('randD')) { this.initiativesForm.controls.randD.enable(); }
        if (FormControl.includes('other')) { this.initiativesForm.controls.other.enable(); }
        if (FormControl.includes('strategy')) { this.initiativesForm.controls.strategy.enable(); }
        if (FormControl.includes('directCapex')) { this.initiativesForm.controls.directCapex.enable(); }
    }

    DisableSuggest(FormControl) {
        if (FormControl.includes('cim')) { this.initiativesForm.controls.cim.disable(); }
        if (FormControl.includes('pim')) { this.initiativesForm.controls.pim.disable(); }
        if (FormControl.includes('dim')) { this.initiativesForm.controls.dim.disable(); }
        if (FormControl.includes('max')) { this.initiativesForm.controls.max.disable(); }
        if (FormControl.includes('cpi')) { this.initiativesForm.controls.cpi.disable(); }
        if (FormControl.includes('randD')) { this.initiativesForm.controls.randD.disable(); }
        if (FormControl.includes('other')) { this.initiativesForm.controls.other.disable(); }
        if (FormControl.includes('strategy')) { this.initiativesForm.controls.strategy.disable(); }
        if (FormControl.includes('directCapex')) { this.initiativesForm.controls.directCapex.disable(); }
    }

    SelectCoDeveloper() {
        if (this.initiativesForm.controls.coDeveloper.value) {
            this.initiativeService.UpdateCoDeveloper(this.id, this.initiativesForm.controls.coDeveloper.value).subscribe(() => {
                this.CheckSwalType();
            });
        } else {
            this.initiativeService.DeleteCoDeveloper(this.id).subscribe(() => this.CheckSwalType());
        }
    }

    UpdateDraftInitiative() {
        this.initiativesForm.patchValue({ updatedBy: this.username });
        this.initiativeService.UpdateDraftInitiative(this.id, this.initiativesForm.value).subscribe(response => {
            sessionStorage.setItem('id', response.id.toString());
            this.GetSetDate(response.registeringDate, response.startingDate, response.finishingDate);
            this.initiativesForm.patchValue(response);
            this.initiativesForm.patchValue({
                registeringDate: this.dateRegisterDisplay,
                startingDate: this.dateStartDisplay,
                finishingDate: this.dateFinishDisplay,
                fxExchange: response.fxExchange !== 0 ? response.fxExchange : null,
            });
            this.initiativesForm.patchValue({
                cim: false, pim: false, dim: false, max: false, directCapex: false, cpi: false, strategy: false, randD: false, other: false
            });
            this.DisableSuggest(['cim', 'pim', 'dim', 'directCapex', 'cpi', 'strategy', 'randD', 'other', 'max']);
            this.ActiveSuggestion(response);
            this.SelectCoDeveloper();
        }, error => this.response.error(error));
    }

    UpdateSubmitInitiative() {
        this.initiativesForm.patchValue({ updatedBy: this.username });
        this.initiativeService.UpdateSubmitInitiative(this.id, this.initiativesForm.value).subscribe(response => {

            sessionStorage.setItem('id', response.id.toString());
            this.GetSetDate(response.registeringDate, response.startingDate, response.finishingDate);
            this.initiativesForm.patchValue(response);
            this.initiativesForm.patchValue({
                registeringDate: this.dateRegisterDisplay,
                startingDate: this.dateStartDisplay,
                finishingDate: this.dateFinishDisplay,
                fxExchange: response.fxExchange !== 0 ? response.fxExchange : null,
            });
            this.initiativesForm.patchValue({
                cim: false, pim: false, dim: false, max: false, directCapex: false, cpi: false, strategy: false, randD: false, other: false
            });
            this.DisableSuggest(['cim', 'pim', 'dim', 'directCapex', 'cpi', 'strategy', 'randD', 'other', 'max']);
            this.ActiveSuggestion(response);
            this.SelectCoDeveloper();
        }, error => this.response.error(error));
    }

    CheckOther(event) {
        if (event.target.checked) {
            this.DisableSuggest(['cpi', 'strategy', 'randD']);
            this.IsOther = true;
            this.initiativesForm.patchValue({ other: true, initiativeType: this.IsMax ? 'other,max' : 'other' });
        } else {
            this.EnableSuggest(['cpi', 'strategy', 'randD']);
            this.IsOther = false;
            this.initiativesForm.patchValue({ other: false, initiativeType: null });
        }
    }

    CheckCim(event) {
        this.IsCim = event.target.checked ? true : false;
        this.SendCim.emit(this.IsCim);
    }

    CheckPim(event) {
        this.IsPim = event.target.checked ? true : false;
    }

    CheckDim(event) {
        this.IsDim = event.target.checked ? true : false;
    }

    CheckCapex(event) {
        this.IsCapex = event.target.checked ? true : false;
        this.SendCapex.emit(this.IsCapex);
    }

    CheckMax(event) {
        this.IsMax = event.target.checked ? true : false;
        this.SendMax.emit(this.IsMax);
    }

    CheckCpi(event) {
        if (event.target.checked) {
            this.DisableSuggest(['strategy', 'randD', 'other']);
            this.IsCpi = true;
            this.initiativesForm.patchValue({ cpi: true, initiativeType: this.IsMax ? 'cpi,max' : 'cpi' });
        } else {
            this.EnableSuggest(['strategy', 'randD', 'other']);
            this.IsCpi = false;
            this.initiativesForm.patchValue({ cpi: false, initiativeType: null });
        }
    }

    CheckStrategy(event) {
        if (event.target.checked) {
            this.DisableSuggest(['cpi', 'randD', 'other']);
            this.IsStrategy = true;
            this.SendStrategy.emit(this.IsStrategy);
            this.initiativesForm.patchValue({ strategy: true, initiativeType: this.IsMax ? 'strategy,max' : 'strategy' });
        } else {
            this.EnableSuggest(['cpi', 'randD', 'other']);
            this.IsStrategy = false;
            this.SendStrategy.emit(this.IsStrategy);
            this.initiativesForm.patchValue({ strategy: false, initiativeType: null });
        }
    }

    CheckRAndD(event) {
        if (event.target.checked) {
            this.DisableSuggest(['cpi', 'strategy', 'other']);
            this.IsRandD = true;
            this.initiativesForm.patchValue({ randD: true, initiativeType: this.IsMax ? 'randD,max' : 'randD' });
        } else {
            this.EnableSuggest(['cpi', 'strategy', 'other']);
            this.IsRandD = false;
            this.initiativesForm.patchValue({ randD: false, initiativeType: null });
        }
    }

    CurrentPage() {
        switch (this.page) {
            case 'create':
                switch (this.type) {
                    case 'draft':
                        this.CreateDraftInitiative();
                        break;
                    case 'submit':
                        this.CreateSubmitInitiative();
                        break;
                }
                break;
            case 'edit':
                this.EnableSuggest(['pim', 'cim', 'max', 'directCapex', 'dim', 'cpi', 'strategy', 'randD', 'other']);
                this.PatchSuggest();
                this.SaveRequestOpex();
                switch (this.type) {
                    case 'draft':
                        this.UpdateDraftInitiative();
                        break;
                    case 'submit':
                        this.UpdateSubmitInitiative();
                        break;
                }
                break;
        }
    }

    SaveRequestOpex() {
        if (this.initiativesForm.controls.requestOpex.value === 'falseOpex') {
            this.impactService.DeleteImpiemantCost(this.id).subscribe(() => { });
        }
    }

    PatchSuggest() {
        this.initiativesForm.patchValue({
            cim: this.IsCim ? true : false,
            pim: this.IsPim ? true : false,
            dim: this.IsDim ? true : false,
            max: this.IsMax ? true : false,
            cpi: this.IsCpi ? true : false,
            directCapex: this.IsCapex ? true : false,
            strategy: this.IsStrategy ? true : false,
            randD: this.IsRandD ? true : false,
            other: this.IsOther ? true : false
        });
    }

    CheckSwalType() {
        switch (this.type) {
            case 'draft': this.swalTool.Draft(); break;
            case 'submit':
                if (((this.IsCim || this.IsStrategy) && !this.IsMax) && (this.page === 'create')) {
                    this.swalTool.DetailCimStrategy();
                } else if ((this.IsMax) && (this.page === 'create')) {
                    this.swalTool.DetailMax();
                } else if ((this.IsCapex && this.page === 'create') && !this.IsMax) {
                    this.swalTool.DetailDirect();
                } else {
                    this.swalTool.Submit();
                }
                break;
        }
    }

    Suggest() {

    }

    CreateDraftInitiative() {
        this.initiativeService.CreateDraftInitiative(this.initiativesForm.value).subscribe(response => {
            sessionStorage.setItem('id', response.id.toString());
            if (this.initiativesForm.controls.coDeveloper.value) {
                this.initiativeService.CreateCoDeveloper(response.id, this.initiativesForm.controls.coDeveloper.value).subscribe(() => { });
            }
            this.CheckSwalType();
            this.TypeRedirect();
        }, error => this.response.error(error));
    }

    CreateSubmitInitiative() {
        this.initiativeService.CreateSubmitInitiative(this.initiativesForm.value).subscribe(response => {
            sessionStorage.setItem('id', response.id.toString());
            if (this.initiativesForm.controls.coDeveloper.value) {
                this.initiativeService.CreateCoDeveloper(response.id, this.initiativesForm.controls.coDeveloper.value).subscribe(() => { });
            }
            this.CheckSwalType();
            this.TypeRedirect();
        }, error => this.response.error(error));
    }

    TypeRedirect() {
        this.DisabledButtonSave();
        this.RemoveFormSession();
        switch (this.type) {
            case 'draft':
                setTimeout(() => {
                    if (this.page === 'create') {
                        this.router.navigate(['/initiative/edit']);
                    }
                }, 1700);
                break;
            case 'submit':
                if (((this.IsCim || this.IsStrategy) && !this.IsMax) && (this.page === 'create')) {
                    sessionStorage.setItem('InitiativeValidate', JSON.stringify(this.CheckValidForm));
                    setTimeout(() => this.router.navigate(['/initiative/detail']), 1700);
                } else if (this.IsMax && this.page === 'create') {
                    sessionStorage.setItem('InitiativeValidate', JSON.stringify(this.CheckValidForm));
                    setTimeout(() => this.router.navigate(['/initiative/detail-max']), 1700);
                } else if ((this.IsCapex && this.page === 'create') && !this.IsMax) {
                    sessionStorage.setItem('InitiativeValidate', JSON.stringify(this.CheckValidForm));
                    setTimeout(() => this.router.navigate(['/initiative/direct']), 1700);
                } else {
                    setTimeout(() => this.router.navigate(['/initiative/my-own']), 1700);
                }
                break;
        }
    }

    RemoveFormSession() {
        this.removeService.Form();
    }

    StartDateChange(value: Date): void {
        this.dateStart = this.dateUtil.SetDate(new Date(value));
        this.bsConfigFinish.minDate = new Date(value);
        this.initiativesForm.patchValue({ finishingDate: null });
    }

    GetCoDevelopers(Text?) {
        this.params.text = Text ? Text : '';
        this.initiativeService.GetCoDevelopers(this.params).subscribe(coDevelopers => {
            this.coDevelopers = coDevelopers;
            this.coDevelopers = this.coDevelopers.filter(obj => {
                return obj.email.toLowerCase().trim() !== this.username.toLowerCase().trim();
            });
        }, error => this.response.error(error));
    }

    SearchCoDeveloper(event) {
        this.GetCoDevelopers(event.term);
    }

    SetFormDate() {
        this.initiativesForm.patchValue({
            registeringDate: this.dateRegister ? this.dateRegister : this.dateUtil.SetDate(new Date()),
            startingDate: this.dateStart ? this.dateStart : null,
            finishingDate: this.dateFinish ? this.dateFinish : null,
            createdBy: this.username,
        });
    }

    ClearOwnerName() {
        this.GetOwners();
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

    OnlyMax() {
        if (!this.CheckOnlyMax) {
            if (this.IsMax) { this.initiativesForm.patchValue({ initiativeType: 'max' }); }
        }
    }

    SetMarkAsTouchedFormGeneral() {
        this.initiativesForm.controls.name.markAsTouched();
        this.initiativesForm.controls.year.markAsTouched();
        this.initiativesForm.controls.ownerName.markAsTouched();
        this.initiativesForm.controls.organization.markAsTouched();
        this.initiativesForm.controls.finishingDate.markAsTouched();
        this.initiativesForm.controls.plant.markAsTouched();
        this.initiativesForm.controls.background.markAsTouched();
        this.initiativesForm.controls.resultObjective.markAsTouched();
        this.initiativesForm.controls.scopeOfWork.markAsTouched();
        this.initiativesForm.controls.typeOfInvestment.markAsTouched();
        this.initiativesForm.controls.costEstCapex.markAsTouched();
        this.initiativesForm.controls.costEstOpex.markAsTouched();
        this.initiativesForm.controls.jFactor.markAsTouched();
        this.initiativesForm.controls.ram.markAsTouched();
        this.initiativesForm.controls.irr.markAsTouched();
        this.initiativesForm.controls.budgetType.markAsTouched();
        this.initiativesForm.controls.benefitAmount.markAsTouched();
        this.initiativesForm.controls.payBackPeriod.markAsTouched();
        this.initiativesForm.controls.typeBenefit.markAsTouched();
        this.initiativesForm.controls.fxExchange.markAsTouched();
    }

    // CloseAttachment() {
    //   this.AttachmentModal.hide();
    // }

    EnabledButtonSave() {
        this.isDisabledSubmit = true;
        this.isDisabledDraft = true;
    }

    DisabledButtonSave() {
        setTimeout(() => {
            this.isDisabledSubmit = false;
            this.isDisabledDraft = false;
        }, 1700);
    }


    CheckRequired(event) {
        // this.Required.emit(event);
    }

    Savedraf() {
        // this.draf();
    }

    draf() {
        this.EnabledButtonSave();
        this.initiativesForm.controls.name.markAsTouched();
        if (this.initiativesForm.controls.name.valid) {
            this.OnlyMax();
            this.type = 'draft';
            this.SetFormDate();
            this.CurrentPage();
            this.DisabledButtonSave();
        } else {
            this.DisabledButtonSave();
            this.swalTool.Required();
        }
    }

    Submit() {
        // this.SaveSubmit();
    }

    SaveSubmit() {
        if (this.CheckValidForm) {

            this.OnlyMax();
            this.SetFormDate();
            this.type = 'submit';
            this.CurrentPage();
            this.DisabledButtonSave();
        } else {
            this.DisabledButtonSave();
            if (this.initiativesForm.valid) {
                this.swalTool.SelectProcess();
            } else {
                this.SetMarkAsTouchedFormGeneral();
                this.swalTool.Required();
            }
        }
    }

    get viewMode() {
        return this.initiativeService.viewMode;
    }

}

