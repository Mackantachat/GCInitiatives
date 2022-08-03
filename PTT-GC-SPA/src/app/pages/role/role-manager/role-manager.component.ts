import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { IRole, IRoleListManage, IAction, IScreenObject, IRoleDetail, IRoleDetailGroupItem, PermissionMaster } from '../../../core/models/IRole';
import { RoleService } from '../../../core/services/role/role.service';
import { SwalTool } from '@tools/swal.tools';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.css']
})
export class RoleManagerComponent implements OnInit {

  id: string;
  RoleForm: FormGroup;
  rolePermissionModel: FormArray;

  screenObjectList: PermissionMaster[] = [];


  constructor(
    private fb: FormBuilder,
    private service: RoleService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(data => {
      this.id = data.id == null ? '0' : data.id;
    });
    this.RoleForm = this.fb.group({
      id: new FormControl(0),
      roleId: new FormControl(''),
      roleName: new FormControl(''),
      isActive: new FormControl(''),
      description: new FormControl(''),
      rolePermissionModel: this.fb.array([]),
    });
  }

  ngOnInit() { 
    this.rolePermissionModel = this.RoleForm.get("rolePermissionModel") as FormArray;
    this.service.getTableScreenObject().subscribe(res=>{
      this.screenObjectList = res;
    });
    if(this.id != '0'){
      this.initialData();
    }
    
  }

  initialData() {
    this.service.getTableRoleById(this.id).subscribe((data: IRoleDetail) => {
      if (data) {
        // console.log('rolePermissionModel : ', data.rolePermissionModel)
        this.RoleForm = this.fb.group({
          id: new FormControl(data.id),
          roleId: new FormControl(data.roleId),
          roleName: new FormControl(data.roleName),
          isActive: new FormControl(data.isActive),
          description: new FormControl(data.description),
          rolePermissionModel: this.fb.array([])
        });
        this.setFormArray(data.rolePermissionModel);
      }
    });
  }

  setFormArray(data: IRoleDetailGroupItem[]) {
    data.forEach((detail) => {
      let group = new FormGroup({
        roleId: new FormControl(detail.roleId),
        permissionMasterId: new FormControl(detail.permissionMasterId)
      });
      (this.RoleForm.get('rolePermissionModel') as FormArray).push(group);
      //(this.datas as FormArray).push(group);
    });

  }


  addRolePermission(){
    // let data = this.fb.group(this.createRow());
    // this.datas.push(data);
    (this.RoleForm.get('rolePermissionModel') as FormArray).push(
      this.fb.group({
        roleId: this.id,
        permissionMasterId: [null]
      })
    );
  }

  createRow(): any {
    return {
      no: this.rolePermissionModel.length + 1,
      roleId: this.id,
      permissionMasterId: new FormControl(null),
    };
  }

  removeRolePermission(idx){
    // alert(idx);
    let formArray = this.RoleForm.get('rolePermissionModel') as FormArray
    formArray.removeAt(idx);
  }

  saveForm(){
    this.service.saveRoleDetailById(this.RoleForm.value).subscribe(result => {
      // window.location.reload();
      //window.location.href="/role/list";
      Swal.fire({
            title: 'Saved',
            text: "",
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
    });
  }

  backToRole(){
    window.location.href="/role/list";
  }


}
