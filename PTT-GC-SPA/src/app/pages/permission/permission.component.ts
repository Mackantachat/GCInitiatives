import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPaging } from '@models/IPaging';
import { IRole } from '@models/IRole';
import { RoleService } from '@services/role/role.service';
import { PaginationComponent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  pager: PaginationComponent;
  dataTable: IRole[] = [];
  dataTableTemp: IRole[] = [];
  public searchModel: string;

  pagination: IPaging =
    { itemsPerPage: 5, totalItems: 19 };

  maxSize = 10;
  currentPage = 1;
  sortText = '';

  constructor(
    private cdref: ChangeDetectorRef,
    private service: RoleService,
    private router: Router) { }

  ngOnInit() {
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  ngAfterViewInit() {
    this.service.getTableRole().subscribe((data: IRole[]) => {
      this.dataTableTemp = data;
      this.dataTable = data;
      this.pagination = { itemsPerPage: this.maxSize, totalItems: this.dataTable.length };
    });
  }
  pageChanged($event: number) {
    if ($event) {
      this.currentPage = $event;
      this.OnSliceData();
    }
  }
  OnFilterWithKeyDown() {
    this.currentPage = 1;
    let value = this.searchModel;
    if (value) {
      value = value.toLowerCase();
      this.searchValue(value);
    } else {
      this.OnSliceData();
    }
  }
  searchValue(value: string) {
    const output = Object.create(this.dataTableTemp
      .filter(s =>
        Object.values(s)
          .toString()
          .toLowerCase()
          .includes(value)
      ));
    const pagerStart = (this.currentPage - 1) * this.maxSize;
    const filterValue = output.slice(pagerStart, pagerStart + this.maxSize);
    this.dataTable = filterValue;
  }
  OnSliceData() {
    const pagerStart = (this.currentPage - 1) * this.maxSize;
    this.dataTable = Object.create(this.dataTableTemp.slice(pagerStart, pagerStart + this.maxSize));
  }
  sortBy(value: string) {
    Object.keys(this.dataTable).reduce(
      (a, c) =>
        (a[c] = this.dataTable[c], a)
      , {}
    );
    this.dataTableTemp = this.dataTableTemp.sort(this.compareValues(value, value === this.sortText ? 'desc' : 'asc'));
    this.sortText = value !== this.sortText ? value : '';
    this.OnSliceData();
  }
  compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      } else {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }
  navigateUserToEdit(index: number) {
    this.router.navigateByUrl(`/permission/edit/${this.dataTable[index].roleId}`);
  }
  navigateUserToCreate() {
    this.router.navigateByUrl(`/permission/create`);
  }
}

