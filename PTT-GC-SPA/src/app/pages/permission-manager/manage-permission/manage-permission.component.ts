import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAction, IRole, IRoleDetail, IRoleDetailGroupItem, IRoleListManage, IScreenObject } from '@models/IRole';
import { RoleService } from '@services/role/role.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-permission',
  templateUrl: './manage-permission.component.html',
  styleUrls: ['./manage-permission.component.css']
})
export class ManagePermissionComponent implements OnInit {

  id: string;
  form: FormGroup;
  roleTable: IRole = {id:null, roleId: '', roleName: '', description: '', isActive: false };
  roleList: IRoleListManage[] = [];
  actionList: IAction[] = [];
  screenObjectList: IScreenObject[] = [];
  routerSubscription: Subscription;

  modelScreenObject: string = null;
  modelAction: string[] = [];

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private service: RoleService) {
    this.route.params.subscribe(data => {
      this.id = data.id;

      //const screenService = this.service.getTableScreenObject();
      //const actionList = this.service.getTableAction();

      //const forkGroup = [screenService, actionList];

      this.form = this.builder.group({
        Id: new FormControl(0),
        RoleId: new FormControl(''),
        RoleName: new FormControl(''),
        IsActive: new FormControl(''),
        Description: new FormControl(''),
        RolePermissionModel: this.builder.array([])
      });

      // forkJoin([...forkGroup]).subscribe(groupResult => {
      //   this.screenObjectList = groupResult[0];
      //   this.actionList = groupResult[1];
      //   this.initialData();
      // });
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    try {
      this.routerSubscription.unsubscribe();
    } catch { }
  }

  initialData() {
    this.service.getTableRoleById(this.id).subscribe((data: IRoleDetail) => {
      if (data) {
        this.form = this.builder.group({
          Id: new FormControl(data.id),
          RoleId: new FormControl(data.roleId),
          RoleName: new FormControl(data.roleName),
          IsActive: new FormControl(data.isActive),
          Description: new FormControl(data.description),
          RolePermissionModel: this.builder.array([])
        });
        this.createFormArray(data.rolePermissionModel);
      }
    });
  }

  setTable(item: IRole) {
    this.roleTable = item;
    this.form.patchValue({
      RoleId: item.roleId,
      RoleName: item.roleName,
      IsActive: item.isActive,
      Description: item.description,
      RolePermissionModel: []
    });
  }

  get getFormArray(): FormArray {
    return this.form.get('RolePermissionModel') as FormArray;
  }

  createFormArray(rolePermissionModel: IRoleDetailGroupItem[]) {
    this.getFormArray.clear();
    rolePermissionModel.forEach(f => {
      this.getFormArray.push(this.builder.group({
        //ScreenObject: new FormControl(f.screenObject),
        //Action: new FormControl([...f.action])

      }));
    });
  }

  removeItem(index: number) {
    this.getFormArray.removeAt(index);
  }

  addItems() {
    const action = this.modelAction;
    this.getFormArray.push(
      this.builder.group({
        ScreenObject: new FormControl(this.modelScreenObject),
        Action: new FormControl([...action])
      })
    );
    this.modelAction = [];
    this.modelScreenObject = null;
  }

  saveForm() {
    this.service.saveRoleDetailById(this.form.value).subscribe(result => {
      window.location.reload();
    });
  }
}
