import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { OwnerModel } from '@models/owner';
import { InitiativeService } from '@services/initiative/initiative.service';

@Component({
  selector: 'app-kpi-maintain',
  templateUrl: './kpi-maintain.component.html',
  styleUrls: ['./kpi-maintain.component.css']
})
export class KpiMaintainComponent implements OnInit {

  years = [];
  initiativesForm: FormGroup;
  datas: FormArray;
  owners: OwnerModel[] = [];
  initiatives = [
    { id: 0, name: "test0" },
    { id: 1, name: "test1" },
    { id: 2, name: "test2" },
    { id: 3, name: "test3" },
    { id: 4, name: "test4" },
  ];

  colors = [{ id: "green" }, { id: "yellow" }, { id: "red" }];

  constructor(private fb: FormBuilder, private service: InitiativeService) {
    this.initiativesForm = this.fb.group({
      year: [""],
      datas: this.fb.array([]),
    });
  }

  @ViewChild("dataTable") table;

  dataTable: any;

  ngOnInit(): void {
    this.datas = this.initiativesForm.get("datas") as FormArray;
    this.years = this.getYears();
    this.service.getOwner<OwnerModel[]>().subscribe((owners) => {
      this.owners = owners;
    });
  }

  ngAfterViewInit() {
    this.addData();
  }

  getYears(): any[] {
    let d = new Date();
    let year = d.getFullYear();
    let years = [];
    for (let y = year; y < year + 10; y++) {
      years.push(y);
    }
    return years;
  }

  addData() {
    let data = this.fb.group(this.createRow());
    this.datas.push(data);
  }
  createRow(): any {
    return {
      no: this.datas.length + 1,
      kpiTarget: "",
      score1: "",
      score1Color: "green",
      score2: "",
      score2Color: "green",
      score3: "",
      score3Color: "green",
      score4: "",
      score4Color: "green",
      score5: "",
      score5Color: "green",
      initiativeId: "",
      initiativeName: "",
      person: "",
      action: "false",
    };
  }

  initiativeChange(idx: number) {
    let d = new Date();
    let datas = this.initiativesForm.controls.datas as FormArray;
    let initiativeId = datas.controls[idx].get("initiativeId").value;
    let initiative = this.initiatives.find((d) => d.id == initiativeId);
    datas.controls[idx].patchValue({
      initiativeName: initiative ? initiative.name : null,
    });
  }

  getLink(idx: number) {
    var d = new Date();
    let datas = this.initiativesForm.controls.datas as FormArray;
    if (datas.controls[idx].get("initiativeName").value)
      return (
        d.getFullYear() + "_" + datas.controls[idx].get("initiativeName").value
      );
  }

  getLinkName(idx: number) {
    var d = new Date();
    let datas = this.initiativesForm.controls.datas as FormArray;
    if (datas.controls[idx].get("initiativeName").value)
      return (
        d.getFullYear() + "_" + datas.controls[idx].get("initiativeName").value
      );
  }

  deleteRow(idx) {
    if (this.datas.length > 1) {
      this.datas.removeAt(idx);
    }
  }

  saveData() {
  }
}

