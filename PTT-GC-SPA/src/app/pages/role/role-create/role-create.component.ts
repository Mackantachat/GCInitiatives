import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { RoleService } from '../../../core/services/role/role.service';
import { IScreenObject, IAction, IRole, IRoleListManage } from '../../../core/models/IRole';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit, OnDestroy {
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
      //this.actionList = groupResult[1];
      //this.initialData();
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
