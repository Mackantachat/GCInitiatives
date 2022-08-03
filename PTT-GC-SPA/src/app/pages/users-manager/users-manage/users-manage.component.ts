import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBU, IPosition, IRole, IWorkStream } from '@models/IRole';
import { IOwnerInitiative } from '@models/owner';
import { RoleService } from '@services/role/role.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.css']
})
export class UsersManageComponent implements OnInit {

  id: string;
  form: FormGroup;

  roleList: IRole[] = [];
  positionList: IPosition[] = [];
  buList: IBU[] = [];
  workStreamList: IWorkStream[] = [];

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

  ngOnInit() { }

  ngOnDestroy() {
    try {
      this.routerSubscription.unsubscribe();
    } catch { }
  }

  initialData() {
    this.service.getTableOwnerInitiativeDetail(this.id).subscribe((item: IOwnerInitiative) => {
      if (item) {
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
      window.location.reload();
    });
  }

}
