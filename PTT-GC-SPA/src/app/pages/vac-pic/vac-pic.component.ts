import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMemberPIC } from '@models/IMemberPIC';
import { IMemberVAC } from '@models/IMemberVAC';
import { IPaging } from '@models/IPaging';
import { VacPicService } from '@services/vac-pic/vac-pic.service';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vac-pic',
  templateUrl: './vac-pic.component.html',
  styleUrls: ['./vac-pic.component.css']
})
export class VacPicComponent implements OnInit, AfterContentChecked, AfterViewInit {
  title: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private router: Router,
    private service: VacPicService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.activeRoute.data.subscribe(value => {
      this.title = value.title;
    });
  }

  pager: PaginationComponent;
  dataTableVac: IMemberVAC[] = [];
  dataTableTempVac: IMemberVAC[] = [];
  dataTablePic: IMemberPIC[] = [];
  dataTableTempPic: IMemberPIC[] = [];
  public searchModel: string;

  pagination: IPaging =
    { itemsPerPage: 5, totalItems: 19 };

  maxSize = 10;
  currentPage = 1;
  sortText = '';

  ngOnInit() {
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  ngAfterViewInit() {
    if (this.title === 'vac') {
      this.service.getTableVACMember().subscribe((data: IMemberVAC[]) => {
        if (data != null) {
          this.dataTableTempVac = data;
          this.dataTableVac = data;
          this.pagination = { itemsPerPage: this.maxSize, totalItems: this.dataTableVac.length };
        }
        this.spinner.hide();
      });
    } else if (this.title === 'pic') {
      this.service.getTablePICMember().subscribe((data: IMemberPIC[]) => {
        if (data) {
          this.dataTableTempPic = data;
          this.dataTablePic = data;
          this.pagination = { itemsPerPage: this.maxSize, totalItems: this.dataTablePic.length };
        }
        this.spinner.hide();
      });
    }
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
    if (this.title === 'vac') {
      const output = Object.create(this.dataTableTempVac
        .filter(s =>
          Object.values(s)
            .toString()
            .toLowerCase()
            .includes(value)
        ));
      const pagerStart = (this.currentPage - 1) * this.maxSize;
      const filterValue = output.slice(pagerStart, pagerStart + this.maxSize);
      this.dataTableVac = filterValue;
    } else if (this.title === 'pic') {
      const output = Object.create(this.dataTableTempPic
        .filter(s =>
          Object.values(s)
            .toString()
            .toLowerCase()
            .includes(value)
        ));
      const pagerStart = (this.currentPage - 1) * this.maxSize;
      const filterValue = output.slice(pagerStart, pagerStart + this.maxSize);
      this.dataTablePic = filterValue;
    }
  }
  OnSliceData() {
    if (this.title === 'vac') {
      const pagerStart = (this.currentPage - 1) * this.maxSize;
      this.dataTableVac = Object.create(this.dataTableTempVac.slice(pagerStart, pagerStart + this.maxSize));
    } else if (this.title === 'pic') {
      const pagerStart = (this.currentPage - 1) * this.maxSize;
      this.dataTablePic = Object.create(this.dataTableTempPic.slice(pagerStart, pagerStart + this.maxSize));
    }
  }
  sortBy(value: string) {
    if (this.title === 'vac') {
      Object.keys(this.dataTableVac).reduce(
        (a, c) =>
          (a[c] = this.dataTableVac[c], a)
        , {}
      );
      this.dataTableTempVac = this.dataTableTempVac.sort(this.compareValues(value, value === this.sortText ? 'desc' : 'asc'));
      this.sortText = value !== this.sortText ? value : '';
      this.OnSliceData();
    } else if (this.title === 'pic') {
      Object.keys(this.dataTablePic).reduce(
        (a, c) =>
          (a[c] = this.dataTablePic[c], a)
        , {}
      );
      this.dataTableTempPic = this.dataTableTempPic.sort(this.compareValues(value, value === this.sortText ? 'desc' : 'asc'));
      this.sortText = value !== this.sortText ? value : '';
      this.OnSliceData();
    }
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
  navigateUserToEdit(id: number) {
    if (this.title === 'vac') {
      const url = `/vac-manager/vac-detail/${id.toString()}`;
      this.router.navigateByUrl(url);
    } else if (this.title === 'pic') {
      const url = `/pic-manager/pic-detail/${id.toString()}`;
      this.router.navigateByUrl(url);
    }
  }
  navigateToDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        if (this.title === 'vac') {
          this.dataTableVac = this.dataTableVac.filter(f => f.vacListId !== id);
        } else if (this.title === 'pic') {
          this.dataTablePic = this.dataTablePic.filter(f => f.picListId !== id);
        }
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
      }
    });
  }
  navigateUserToCreate() {
    if (this.title === 'vac') {
      this.router.navigateByUrl(`/vac-manager/vac-create`);
    } else if (this.title === 'pic') {
      this.router.navigateByUrl(`/pic-manager/pic-create`);
    }
  }
  findCenter(params: string, all: string[]): boolean {
    if (all.filter(f => f === params).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  findUpStream(params: string, all: string[]): boolean {
    if (all.filter(f => f === params).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  findDownStream(params: string, all: string[]): boolean {
    if (all.filter(f => f === params).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  getMobileOperatingSystem(): string {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone';
    }
    if (/android/i.test(userAgent)) {
      return 'Android';
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS';
    }
    return 'unknown';
  }

  exportToExcel(type: string, id: number) {
    if (type === 'vac') {

    } else if (type === 'pic') {

    }
  }

}
