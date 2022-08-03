import { element } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InitiativeService } from '@services/initiative/initiative.service';
import { Owner } from "@models/owner";
import { Initiative } from '@models/initiative';
import { KpiKriApiService } from '@services/kpi-kri-api/kpi-kri-api.service';
import { KpiMaintainModel } from '@models/kpiKriData';
import { SwalTool } from '@tools/swal.tools';
import Swal from 'sweetalert2';
import { AuthService } from '@services/authentication/auth.service';
import { PermissionService } from '@services/permission/permission.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RolePermissionModel } from '@models/RolePermissionModel';

@Component({
  selector: 'app-kpi-kri-maintain',
  templateUrl: './kpi-kri-maintain.component.html',
  styleUrls: ['./kpi-kri-maintain.component.css']
})
export class KpiKriMaintainComponent implements OnInit {
  years = [];
  initiativesForm: FormGroup;
  datas: FormArray;
  owners: Owner[] = [];
  initiatives: Initiative[] = [];

  colors = [{ id: 0, value: "red" }, { id: 1, value: "yellow" }, { id: 2, value: "green" }];

  dataTable: any;
  params: any = {};
  managerList: any = [];
  presidentList: any = [];
  today: string;
  showKpiMaintainAdmin = false;
  showKpiMaintainViewer = false;
  freezeControlKpi = false;
  public permissionServiceStaticVar = PermissionService;
  userPermission: RolePermissionModel[];

  constructor(
    private fb: FormBuilder,
    private initiativeService: InitiativeService,
    private kpiKriApiService: KpiKriApiService,
    private swalTool: SwalTool,
    private authService: AuthService,
    public permissionService: PermissionService,
    private spinner: NgxSpinnerService
  ) {
    this.today = new Date().getFullYear().toString();
    this.initiativesForm = this.fb.group({
      year: this.today,
      datas: this.fb.array([]),
    });
    this.userPermission = JSON.parse(sessionStorage.getItem(PermissionService.USER_PERMISSION_KEY));
    //window.location.reload();
  }

  @ViewChild("dataTable") table;

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.GetPresident();
      this.datas = this.initiativesForm.get("datas") as FormArray;
      this.years = this.getYears();
      this.CheckPermission();
      setTimeout(() => {
        this.kpiKriApiService.GetMaintainKpiByYear(this.today).then((response) => {
          if (response) {
            this.datas.clear();
            this.setFormArray(response);
          }
        });
      }, 3000);

    }
  }

  CheckPermission() {
    let accessKPIMaintain: RolePermissionModel = this.userPermission.find(x =>
      x.pageId.toLowerCase() === PermissionService.KPIMAINTAIN_PAGE_ID
      && x.sectionId.toLowerCase() === "access"
    );
    let accessKPIMaintainViewer: RolePermissionModel = this.userPermission.find(x =>
      x.pageId.toLowerCase() === PermissionService.KPIMAINTAINVIEWER_PAGE_ID
      && x.sectionId.toLowerCase() === "access"
    );
    if (accessKPIMaintain?.isEnable) {
      this.showKpiMaintainAdmin = true;
    } else if (accessKPIMaintainViewer?.isEnable) {
      this.showKpiMaintainViewer = true;
    } else {
      this.showKpiMaintainAdmin = false;
      this.showKpiMaintainViewer = false;
    }

    if (this.showKpiMaintainAdmin == true && this.showKpiMaintainViewer == true) {
      this.freezeControlKpi = false;
    } else if (this.showKpiMaintainAdmin == false && this.showKpiMaintainViewer == true) {
      this.freezeControlKpi = true;
    }


    if (this.showKpiMaintainAdmin == false && this.showKpiMaintainViewer == false) {
      Swal.fire({
        title: 'Access Denied',
        text: "You are not Authorized to view this page",
        icon: 'warning',
        showCancelButton: false,
      }).then(function () {
        setTimeout(function () {
          window.location.pathname = '/';
        }, 1000);
      });
    }
  }

  setFormArray(resData: KpiMaintainModel[]) {
    this.datas.clear();
    resData.forEach((data) => {
      let groupControl = new FormGroup({
        kpiMaintainId: new FormControl(data.kpiMaintainId ? data.kpiMaintainId : 0),
        no: new FormControl(this.datas.length + 1),
        kpiName: new FormControl(data.kpiName),
        //kpiMaintainId: new FormControl(data.kpiMaintainId),
        scoreText1: new FormControl(data.scoreText1),
        scoreLevel1: new FormControl(data.scoreLevel1),
        scoreText2: new FormControl(data.scoreText2),
        scoreLevel2: new FormControl(data.scoreLevel2),
        scoreText3: new FormControl(data.scoreText3),
        scoreLevel3: new FormControl(data.scoreLevel3),
        scoreText4: new FormControl(data.scoreText4),
        scoreLevel4: new FormControl(data.scoreLevel4),
        scoreText5: new FormControl(data.scoreText5),
        scoreLevel5: new FormControl(data.scoreLevel5),
        initiativeId: new FormControl(data.initiativeId),
        initiativeName: new FormControl(null),
        person: new FormControl(null),
        isActive: new FormControl(data.isActive),
        year: new FormControl(data.year)
      });
      (this.datas as FormArray).push(groupControl);
    });

  }

  getYears(): any[] {
    let d = new Date();
    let year = d.getFullYear() - 1;
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
      kpiName: "",
      scoreText1: "",
      scoreLevel1: 0,
      scoreText2: "",
      scoreLevel2: 0,
      scoreText3: "",
      scoreLevel3: 0,
      scoreText4: "",
      scoreLevel4: 0,
      scoreText5: "",
      scoreLevel5: 0,
      initiativeId: [null, [Validators.required, Validators.nullValidator]],
      initiativeName: "",
      isActive: false,
      year: this.initiativesForm.get('year').value,
      kpiMaintainId: 0
    };
  }

  initiativeChange(idx: number) {
    let d = new Date();
    let datas = this.initiativesForm.controls.datas as FormArray;
    let initiativeId = datas.controls[idx].get("initiativeId").value;
    alert(datas.controls[idx].get("initiativeId"));
    let initiative = this.initiatives.find((d) => d.id == initiativeId);
    datas.controls[idx].patchValue({
      initiativeName: initiative ? initiative.name : null,
    });
  }


  SearchPerson(event) {
    this.GetPresident(event.term);
  }

  GetPerson(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetInitiativeKpi(Text).subscribe(owners => { this.managerList = owners; });
  }
  GetPresident(Text?) {
    this.params.text = Text ? Text : '';
    this.initiativeService.GetInitiativeKpi(this.params.text).subscribe(owners => {
      //('owner ', this.params.text)
      this.presidentList = owners;
    });
  }

  getLink(idx: number) {
    var d = new Date();
    let kpiId = '0';
    let datas = this.initiativesForm.controls.datas as FormArray;

    if (datas.controls[idx].get("initiativeId").value) {
      return ('initiative/kpi?year=' + this.initiativesForm.get('year').value + '&id=' + datas.controls[idx].get("initiativeId").value);
    }

  }

  getLinkName(idx: number) {
    var d = new Date();
    let datas = this.initiativesForm.controls.datas as FormArray;
    if (datas.controls[idx].get("initiativeId").value) {

      let getName = this.presidentList.find(x => x.id === datas.controls[idx].get("initiativeId").value)
      if (getName) {
        return (getName?.name);   // return (this.initiativesForm.get('year').value + "-" + getName?.name);
      }
    }
  }



  deleteRow(idx) {
    Swal.fire({
      title: 'Are you sure?',
      //text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.datas.length >= 0) {
          //datas.removeAt(idx);
          this.datas.removeAt(idx);
        }
        //Swal.fire('Deleted!','Your file has been deleted.','success')
      }
    });
  }

  saveData() {
    if (this.initiativesForm.valid) {
      this.initiativeService.postMaintainKpis(this.initiativesForm.value.datas, this.initiativesForm.get('year').value).subscribe((res) => {
        this.swalTool.Success();
        this.kpiKriApiService.GetMaintainKpiByYear(this.initiativesForm.get('year').value).then((response) => {
          if (response) {
            this.setFormArray(response);
          }
        });

      },
        (error) => {
          alert(error.message);
        }
      );
    } else {
      this.initiativesForm.markAllAsTouched();
      this.swalTool.SelectInitiative();
    }
  }

  selectChangeHandler(event: any) {
    this.datas.clear();
    //update the ui
    //this.selectedDay = event.target.value;
    this.initiativeService.GetMaintainKpis(event.target.value).subscribe((res) => {
      if (res != null) {
        for (let index = 0; index < res.length; index++) {
          this.datas.push(this.fb.group({
            no: this.datas.length + 1,
            kpiName: res[index].kpiName,
            kpiMaintainId: res[index].kpiMaintainId,
            scoreText1: res[index].scoreText1,
            scoreLevel1: res[index].scoreLevel1,
            scoreText2: res[index].scoreText2,
            scoreLevel2: res[index].scoreLevel2,
            scoreText3: res[index].scoreText3,
            scoreLevel3: res[index].scoreLevel3,
            scoreText4: res[index].scoreText4,
            scoreLevel4: res[index].scoreLevel4,
            scoreText5: res[index].scoreText5,
            scoreLevel5: res[index].scoreLevel5,
            initiativeId: [res[index].initiativeId, [Validators.required, Validators.nullValidator]],
            initiativeName: res[index].initiativeName,
            person: res[index].person,
            year: this.initiativesForm.get('year').value,
            isActive: res[index].isActive
          }));
        }
      }
    });
  }

  GetMaintainKpi(year: string) {

    this.initiativeService.GetMaintainKpis(year).subscribe((res) => {
      if (res != null) {
        for (let index = 0; index < res.length; index++) {
          this.datas.push(this.fb.group({
            no: this.datas.length + 1,
            kpiName: res[index].kpiName,
            scoreText1: res[index].scoreText1,
            scoreLevel1: res[index].scoreLevel1,
            scoreText2: res[index].scoreText2,
            scoreLevel2: res[index].scoreLevel2,
            scoreText3: res[index].scoreText3,
            scoreLevel3: res[index].scoreLevel3,
            scoreText4: res[index].scoreText4,
            scoreLevel4: res[index].scoreLevel4,
            scoreText5: res[index].scoreText5,
            scoreLevel5: res[index].scoreLevel5,
            initiativeId: [res[index].initiativeId, [Validators.required, Validators.nullValidator]],
            initiativeName: res[index].initiativeName,
            person: res[index].person,
            isActive: res[index].isActive,
          }));
        }
        this.datas.removeAt(0);
      }
    });

  }

  getColor(id: number) {
    let colors = this.colors.filter(d => d.id == id);
    if (colors && colors.length > 0) {
      return colors[0].value;
    }
    return this.colors[0].value;
  }
}
