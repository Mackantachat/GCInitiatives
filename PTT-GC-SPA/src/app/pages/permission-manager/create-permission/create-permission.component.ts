import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IAction, IRole, IRoleListManage, IScreenObject } from '@models/IRole';
import { RoleService } from '@services/role/role.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.css']
})
export class CreatePermissionComponent implements OnInit {

  form: FormGroup;
  roleTable: IRole = {id:null, roleId: '', roleName: '', description: '', isActive: true };
  roleList: IRoleListManage[] = [];
  actionList: IAction[] = [];
  screenObjectList: IScreenObject[] = [];
  routerSubscription: Subscription;

  modelScreenObject: string = null;
  modelAction: string[] = [];

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private service: RoleService) {
    const screenService = this.service.getTableScreenObject();
    const actionList = this.service.getTableAction();

    const forkGroup = [screenService, actionList];

    this.form = this.builder.group({
      Id: new FormControl(0),
      RoleId: new FormControl(''),
      RoleName: new FormControl(''),
      IsActive: new FormControl(false),
      Description: new FormControl(''),
      Item: this.builder.array([])
    });

    forkJoin([...forkGroup]).subscribe(groupResult => {
      this.screenObjectList = groupResult[0];
      this.actionList = groupResult[1];
      this.initialData();
    });
  }

  initialData() {
  }

  ngOnInit() { }

  ngOnDestroy() {
    try {
      this.routerSubscription.unsubscribe();
    } catch { }
  }

  get getFormArray(): FormArray {
    return this.form.get('Item') as FormArray;
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
    this.service.createRoleDetailById(this.form.value).subscribe(result => {
      this.router.navigateByUrl('/role/list');
    });
  }
}
