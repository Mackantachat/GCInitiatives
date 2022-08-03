import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '@environments/environment';
import { SwalTool } from '@tools/swal.tools';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImpactService } from '@services/impact/impact.service';
declare var require: any;

@Component({
  selector: 'app-impact-excel',
  templateUrl: './impact-excel.component.html',
  styleUrls: ['./impact-excel.component.css']
})
export class ImpactExcelComponent implements OnInit {

  baseUrl = environment.apiUrl;

  uploader: FileUploader;

  constructor(
    private swalTool: SwalTool,
    private spinner: NgxSpinnerService,
    private impactService: ImpactService
  ) { }

  isUpLoading = false;

  ngOnInit(): void {
    this.InitializeUploader();
  }

  InitializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'initiative/ImpactExcel',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      allowedMimeType: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
      isHTML5: true,
      removeAfterUpload: true,
      autoUpload: false,
    });
    this.uploader.onWhenAddingFileFailed = (item, filter) => {
      let message = '';
      switch (filter.name) {
        case 'mimeType':
            message = `Type file is not allowed. Allowed types: xlsx`;
            break;
        default:
          message = 'Error trying to upload file ' + item.name;
          break;
      }
      this.swalTool.Message(message);
    };
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onProgressAll = (progress) => {
      this.isUpLoading = true;
      this.spinner.show();
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {};
    this.uploader.onCompleteAll = () => {
      this.isUpLoading = false;
      this.spinner.hide();
      this.swalTool.Success();
    };
  }

  Upload() {
    if (this.uploader.queue.length) { this.uploader.uploadAll(); }
  }

  Download() {
    this.impactService.GetDownloadImpactExcel().subscribe((result: any) => {
      if (result.type !== 'text/plain') {
        const blob   = new Blob([result]);
        const saveAs = require('file-saver');
        const file   = 'impactExcel.xlsx';
        saveAs(blob, file);
      } else {
        this.swalTool.FileNotFound();
      }
    });
  }

}
