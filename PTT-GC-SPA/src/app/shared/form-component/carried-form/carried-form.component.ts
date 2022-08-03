import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CarriedInformationConfig, CarryOver } from '@models/carry-over-respose';
import { CarriedApiService } from '@services/carry-api/carried-api.service';
import { CarriedDataService } from '@services/carry-data/carried-data.service';

@Component({
  selector: 'app-carried-form',
  templateUrl: './carried-form.component.html',
  styleUrls: ['./carried-form.component.css']
})
export class CarriedFormComponent implements OnInit {

  currentYear: number;
  px = 'px';
  yearCount: number[] = [1, 2, 3, 4, 5, 6];

  nextFixedColWidth = 0;
  fixedLeft2: string;
  fixedLeft3: string;
  fixedLeft4: string;
  fixedLeft5: string;
  @ViewChildren('middleFoxedCol') middleFoxedCol: QueryList<ElementRef>;
  @ViewChild('fixedCol1', { static: false }) fixedCol1: ElementRef;
  @ViewChildren('fixedCol2') fixedCol2: QueryList<ElementRef>;
  @ViewChildren('fixedCol3') fixedCol3: QueryList<ElementRef>;
  @ViewChildren('fixedCol4') fixedCol4: QueryList<ElementRef>;
  @ViewChildren('fixedCol5') fixedCol5: QueryList<ElementRef>;

  data: CarryOver[];
  form: FormGroup;

  constructor(private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private carryOverProjectApiService: CarriedApiService,
    private carryOverProjectDataService: CarriedDataService) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      check: this.formBuilder.array([])
    });

    this.carryOverProjectApiService.get().then(resp => this.carryOverProjectDataService.DATA.next(resp));
    this.carryOverProjectDataService.DATA.subscribe(data => {
      if (data !== null) {
        this.data = data;
        this.buildForm();
      }
    });
  }

  ngAfterViewInit(): void {
    this.middleFoxedCol.forEach((elem) => this.nextFixedColWidth += this.replacePX(elem));
    const left2 = this.replacePX(this.fixedCol1) + 2;
    const left3 = left2 + this.replacePX(this.fixedCol2.first) + 1;
    const left4 = left3 + this.replacePX(this.fixedCol3.first) + 1;
    const left5 = left4 + this.replacePX(this.fixedCol4.first) + 3;
    this.fixedLeft2 = left2 + this.px;
    this.fixedLeft3 = left3 + this.px;
    this.fixedLeft4 = left4 + this.px;
    this.fixedLeft5 = left5 + this.px;
  }

  get formArray(): FormArray {
    return this.form.get('check') as FormArray;
  }


  get months(): string[] {
    return CarriedInformationConfig.months;
  }

  add(year: string | number, amount: number): string {
    return String(Number(year) + amount);
  }

  getMonthlyInvestmentPlan(carryOver: CarryOver, year: string | number, key: string): number {
    const monthlyInvestmentPlan = carryOver.monthlyInvestmentPlan
      .find((elem) => elem.yearOfMonth === String(year));
    return monthlyInvestmentPlan[key];
  }

  getAnnualInvestmentPlan(carryOver: CarryOver, initiativeId: number, key: string) {
    const annualInvestmentPlan = carryOver.annualInvestmentPlan
      .find((elem) => elem.initiativeId === initiativeId);
    return annualInvestmentPlan[key];
  }

  getYearAnnualInvestmentPlan(carryOver: CarryOver, initiativeId: number, i: number): number {
    const startYear = new Date(carryOver.requestIniNoDate).getFullYear();
    const diff = startYear - this.currentYear;
    const no = diff + i;
    return this.getAnnualInvestmentPlan(carryOver, initiativeId, 'year' + no);
  }

  getTotal(carryOver: CarryOver, initiativeId: number): number {
    let sum = 0;
    this.yearCount.forEach((i) => {
      sum += this.getYearAnnualInvestmentPlan(carryOver, initiativeId, i);
    });

    return sum;
  }

  getVariance(carryOver: CarryOver, initiativeId: number): number {
    return Number(carryOver.approvedBudget) -
      Number(carryOver.actualAccumulated) -
      Number(carryOver.totalCurrentYear) -
      this.getTotal(carryOver, initiativeId);
  }

  scrolling($event: Event): void {
    this.fixedCol2.forEach((ele: ElementRef) => this.rendered($event, ele, this.fixedLeft2, false));
    this.fixedCol3.forEach((ele: ElementRef) => this.rendered($event, ele, this.fixedLeft3, false));
    this.fixedCol4.forEach((ele: ElementRef) => this.rendered($event, ele, this.fixedLeft4));
    this.fixedCol5.forEach((ele: ElementRef) => this.rendered($event, ele, this.fixedLeft5));
  }

  private rendered($event: Event, ele: ElementRef, left: string, removeShadow: boolean = true): void {
    this.renderer.setStyle(ele.nativeElement, 'left', left);
    if (removeShadow) {
      this.renderer[($event.target['scrollLeft'] > this.nextFixedColWidth) ? 'addClass' : 'removeClass'](ele.nativeElement, 'shadow');
    }
  }

  private replacePX(elem: ElementRef): number {
    return Number(elem.nativeElement.style.width.replace(this.px, ''));
  }

  private buildForm(): void {
    const check = this.form.get('check') as FormArray;
    check.clear();
    this.data.forEach((co) => {
      check.push(this.formBuilder.group({
        initiativeId: [co.initiativeId],
        approve: [true]
      }));
    });
  }

  submit(): void {
  }
}

