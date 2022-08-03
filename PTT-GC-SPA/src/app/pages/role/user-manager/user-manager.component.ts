import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IRole, IPosition, IBU, IWorkStream } from '../../../core/models/IRole';
import { RoleService } from '../../../core/services/role/role.service';
import { IOwnerInitiative } from '../../../core/models/owner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit, OnDestroy {

  id: string;
  form: FormGroup;

  roleList: IRole[] = [];
  positionList: IPosition[] = [];
  buList: IBU[] = [];
  workStreamList: IWorkStream[] = [];

  dropdownBU: any = [];
  dropdownPosition: any = [];
  dropdownWorkstream: any = [];

  roleSelect: string[];
  routerSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: RoleService) {
    this.routerSubscription = this.route.params.subscribe(data => {
      this.form = this.formBuilder.group({
        employeeID: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        positionID: new FormControl(''),
        buid: new FormControl(''),
        workstreamID: new FormControl(''),
        roleID: new FormControl(''),
        remark: new FormControl('')
      });
      this.id = data.id;

      const roleGroup = this.service.getTableRole();
      const positionGroup = this.service.getTablePosition();
      const buGroup = this.service.getTableBU();
      const workstreamGroup = this.service.getTableWorkStream();

      const forkGroup = [roleGroup, positionGroup, buGroup, workstreamGroup];

      // tslint:disable-next-line: deprecation
      forkJoin([...forkGroup]).subscribe(groupResult => {
        this.roleList = groupResult[0];
        this.positionList = groupResult[1];
        this.buList = groupResult[2];
        this.workStreamList = groupResult[3];
        this.initialData();
      });
    });
  }

  ngOnInit() {

   }

  ngOnDestroy() {
    try {
      this.routerSubscription.unsubscribe();
    } catch { }
  }

  initialData() {
    this.service.getTableOwnerInitiativeDetail(this.id).subscribe((item: IOwnerInitiative) => {
      if (item) {
        // console.log('owner ', item)
        this.dropdownBU = item.dropdownBu;
        this.dropdownPosition = item.dropdownPosition;
        this.dropdownWorkstream = item.dropdownWorkstream;

        this.form = this.formBuilder.group({
          employeeID: new FormControl(item.employeeID),
          firstName: new FormControl(item.firstName),
          lastName: new FormControl(item.lastName),
          email: new FormControl(item.email),
          positionID: new FormControl(item.positionID),
          buid: new FormControl(item.buid),
          workstreamID: new FormControl(item.workstreamID),
          roleID: new FormControl(item.roleID),
          remark: new FormControl(item.remark)
        });
      }
    });
  }

  saveData() {
    this.service.updateOwnerInitiative(this.form.value).subscribe(result => {
      //window.location.reload();
      Swal.fire({
        title: 'Saved',
        text: "",
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

}
