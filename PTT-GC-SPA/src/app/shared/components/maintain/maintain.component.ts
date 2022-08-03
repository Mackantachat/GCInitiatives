import { log } from 'util';
import { DataDetailModel } from './../../../core/models/SettingAndMaintain';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MaintainDataModel } from '@models/SettingAndMaintain';
import { FormBuilder } from '@angular/forms';
import { SettingAndMaintainService } from '@services/setting-maintain/setting-and-maintain.service';

@Component({
  selector: 'app-maintain',
  templateUrl: './maintain.component.html',
  styleUrls: ['./maintain.component.css']
})
export class MaintainComponent implements OnInit {

  modalRef: BsModalRef;
  message: string;
  keyword: string;
  sortingData: {
    order: string;
    orderBy: string;
  } = {
      order: "ASC",
      orderBy: "Attribute01"
    }


  pagination: {
    itemsPerPage: number,
    totalItems: number,
    totalPages: number,
  } = {
      itemsPerPage: 5, // Default setting is 50
      totalItems: 0,
      totalPages: 0,
    };

  maxSize: number = 10;
  currentPage: number = 1;

  shownTableHeader: number;
  listMaintainDataModel: MaintainDataModel[];
  searchMaintainDataModel: Array<MaintainDataModel>;
  tblContent: Array<MaintainDataModel>;
  ss: any;
  orderBy: string;

  constructor(
    private modalService: BsModalService,
    private mds: SettingAndMaintainService,
    private fb: FormBuilder,
  ) { }
  maintainDataModel: any = new MaintainDataModel();
  selectedData: any = new MaintainDataModel();
  maintainDataColTable: string[] = ['name', 'attribute', 'edit', 'delete'];

  dataDetail = [];
  attributeNames = [];
  AddDataDetail = {};
  UpdateDataDetail = {};
  defaultData = this.fb.group({
    id: [null],
    dataType: [''],
    attribute01: [''],
    attribute02: [''],
    attribute03: [''],
    attribute04: [''],
    attribute05: [''],
    attribute06: [''],
    attribute07: [''],
    attribute08: [''],
    attribute09: [''],
    attribute10: [''],
    attribute11: [''],
    attribute12: [''],
    attribute13: [''],
    attribute14: [''],
    attribute15: [''],
    attribute16: [''],
    attribute17: [''],
    attribute18: [''],
    attribute19: [''],
    attribute20: [''],
  });

  ngOnInit(): void {
    this.Initial();
  }

  async Initial() {

    this.listMaintainDataModel = await this.mds.GetTopics();
    let pagedList = await this.mds.GetCommonData(this.listMaintainDataModel[0].dataType, undefined, 1, "Attribute01", "ASC")
    this.currentPage = pagedList.currentPage;
    this.pagination.totalItems = pagedList.totalCount;
    this.pagination.totalPages = pagedList.totalPages;
    this.pagination.itemsPerPage = pagedList.pageSize;
    this.listMaintainDataModel[0].dataDetail = pagedList.dataDetail;
    this.tblContent = this.listMaintainDataModel;
    this.maintainDataModel = this.tblContent[0];
    this.pagiantionAssignment(this.tblContent[0].dataDetail.length);
    this.setAttribute(this.maintainDataModel);
    this.selectedDataDetail(this.maintainDataModel, pagedList.totalCount);
  }

  pagiantionAssignment = (total: number): void => {
    this.pagination.totalItems = total;
    this.pagination.totalPages = Math.ceil(total / this.pagination.itemsPerPage);
  }

  // ORDER AND DATA SORTING
  sorting = (
    dataType: string, // Current selected dataType
    sortingData // Sorting data by col name and order ASC or DESC
  ): void => {
    // this.listMaintainDataModel = this.mds.GetDataType(
    //   dataType,
    //   null,
    //   null,
    //   this.pagination.itemsPerPage,
    //   sortingData.orderBy,
    //   sortingData.order
    // );
  }

  setAttribute(element) {
    const result = [];
    const keys = Object.keys(element);
    keys.forEach(key => {
      if (key.includes('attributeName')) {
        if (element[key] !== null) {
          result.push(element[key]);
        }
      }
    });
    this.attributeNames = result;
  }

  selectedDataDetail(element, totalItems: number) {
    this.dataDetail = element.dataDetail;
    this.pagiantionAssignment(totalItems);
  }

  async onChangeData(event) {
    this.maintainDataModel = event;
    this.updateTableData(event.dataType, this.keyword, this.currentPage, this.sortingData.orderBy, this.sortingData.order);
    // let pagedList = await this.mds.GetCommonData(event.dataType, undefined, this.currentPage, this.orderBy, "ASC");
    // event.dataDetail = pagedList.dataDetail;
    // this.currentPage = pagedList.currentPage;
    // this.pagination.itemsPerPage = pagedList.pageSize;
    // this.pagination.totalItems = pagedList.totalCount;
    // this.pagination.totalPages = pagedList.totalPages;
    //event.dataDetail = data.dataDetail;
    // this.setAttribute(event);
    // this.selectedDataDetail(event, pagedList.totalCount);
    //this.pagination.totalItems = event.dataDetail.length;
  }

  async onChangePage(event) {
    this.currentPage = event.page;
    this.updateTableData(this.maintainDataModel.dataType, this.keyword, event.page, this.sortingData.orderBy, this.sortingData.order);
  }

  async sortTable(event) {
    let attribute = "Attribute" + this.GetNumber(event + 1);
    if (attribute != this.sortingData.orderBy) {
      this.sortingData.orderBy = attribute;
      this.updateTableData(this.maintainDataModel.dataType, this.keyword, this.currentPage, this.sortingData.orderBy, this.sortingData.order);
    }
    else {
      this.sortingData.orderBy = attribute;
      if (this.sortingData.order == "ASC") {
        this.sortingData.order = "DESC";
      }
      else {
        this.sortingData.order = "ASC";
      }
      this.updateTableData(this.maintainDataModel.dataType, this.keyword, this.currentPage, this.sortingData.orderBy, this.sortingData.order);
    }
  }

  async searching() {
    if (this.keyword != "") {
      this.updateTableData(this.maintainDataModel.dataType, this.keyword, this.currentPage, this.sortingData.orderBy, this.sortingData.order)
    }
    else {
      this.updateTableData(this.maintainDataModel.dataType, undefined, this.currentPage, this.sortingData.orderBy, this.sortingData.order)
    }
  }

  IsNotNull(item: string) {
    let result = item != null && item.toLowerCase() != "null";
    if (result) {
      this.shownTableHeader++
    }
    return result;
  }

  async updateTableData(dataType: string,
    keyword: string, page: number,
    sortBy: string,
    sortDirection: string) {

    let pagedList = await this.mds.GetCommonData(dataType, keyword, page, sortBy, sortDirection);
    this.maintainDataModel.dataDetail = pagedList.dataDetail;
    this.currentPage = pagedList.currentPage;
    this.pagination.itemsPerPage = pagedList.pageSize;
    this.pagination.totalItems = pagedList.totalCount;
    this.pagination.totalPages = pagedList.totalPages;
    this.setAttribute(this.maintainDataModel);
    this.selectedDataDetail(this.maintainDataModel, pagedList.totalCount);
  }


  // modal-add
  createModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirmAdd(): void {
    this.AddDataDetail['id'] = this.maintainDataModel.dataDetail.length + 1;
    this.maintainDataModel.dataDetail.push(this.AddDataDetail)
    this.AddDataDetail['dataType'] = this.maintainDataModel.dataType;
    this.AddDataDetail['id'] = 0;
    this.mds.AddSingleCommonData(this.AddDataDetail).then(
      (response) => {
        this.AddDataDetail['id'] = response;
        this.updateTableData(this.maintainDataModel.dataType, this.keyword, this.currentPage, this.sortingData.orderBy, this.sortingData.order);
      }
    );
    this.message = 'Confirmed!';
    if (this.message = 'Confirmed!') {
      this.modalRef.hide();
      this.AddDataDetail = {};
    }
  }

  declineAdd(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }


  // modal-edit
  updateModal(item: MaintainDataModel, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.selectedData = item;
    this.defaultData.get('id').setValue(item['id']);
    for (let i = 0; i < 20; i++) {
      this.defaultData.get('attribute' + this.GetNumber(i + 1)).setValue(item['attribute' + this.GetNumber(i + 1)]);
    }
    // this.defaultData.get('attribute02').setValue(item['attribute02']);
    // this.defaultData.get('attribute03').setValue(item['attribute03']);
    // this.defaultData.get('attribute04').setValue(item['attribute04']);
  }

  confirmUpdate(): void {
    this.selectedData = this.defaultData.value
    for (let index = 0; index < this.maintainDataModel.dataDetail.length; index++) {
      if (this.defaultData.value.id == this.maintainDataModel.dataDetail[index].id) {
        this.selectedData.dataType = this.maintainDataModel.dataDetail[index].dataType;
        this.maintainDataModel.dataDetail[index] = this.selectedData;
      }
    }
    this.mds.UpdateCommonData([this.maintainDataModel] as MaintainDataModel[]).then((response) => {
      this.updateTableData(this.maintainDataModel.dataType, this.keyword, this.currentPage, this.sortingData.orderBy, this.sortingData.order);
    });
    this.message = 'Confirmed!';
    if (this.message = 'Confirmed!') {
      this.modalRef.hide();
    }
  }

  getAttribute(index: number) {
    return 'attribute' + this.GetNumber(index);
  }

  declineUpdate() {
    this.message = 'Declined!';
    if (this.message = 'Declined!') {
      this.modalRef.hide();
    }
  }

  // modal-delete
  deleteModal(data: any, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.selectedData = data.id
  }

  confirmDelete(): void {
    for (let index = 0; index < this.maintainDataModel.dataDetail.length; index++) {
      if (this.selectedData == this.maintainDataModel.dataDetail[index].id) {
        this.maintainDataModel.dataDetail.splice(index, 1)
        this.mds.DeleteItems(this.selectedData).then(
          (response) => {
            this.updateTableData(this.maintainDataModel.dataType, this.keyword, this.currentPage, this.sortingData.orderBy, this.sortingData.order);
          }
        );
      }
    }
    this.message = 'Confirmed!';
    if (this.message = 'Confirmed!') {
      this.modalRef.hide();
    }
  }

  declineDelete(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  GetNumber(i: Number): string {
    return (i < 10) ? "0" + i : i.toString();
  }

  // log
  log = (event: any): void => {
  }

  Refresh() {
    this.updateTableData(this.maintainDataModel.dataType, undefined, this.currentPage, this.sortingData.orderBy, this.sortingData.order)
  }

}

