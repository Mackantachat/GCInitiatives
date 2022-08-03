import { InitiativeService } from './../../../core/services/initiative/initiative.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResponseService } from '@errors/response/response.service';
import { AttachmentService } from '@services/attachment/attachment.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SwalTool } from '@tools/swal.tools';
import { FileUploader } from 'ng2-file-upload';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { environment } from '@environments/environment';
import { Attachment } from '@models/Attachment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { BsModalRef } from 'ngx-bootstrap/modal';
declare var require: any;

@Component({
    selector: 'app-initiative-attachment',
    templateUrl: './initiative-attachment.component.html',
    styleUrls: ['./initiative-attachment.component.css']
})
export class InitiativeAttachmentComponent implements OnInit {
    @Input() isApprove: boolean;
    @Output() modelClose = new EventEmitter();

    constructor(
        private swalTool: SwalTool,
        private sanitizer: DomSanitizer,
        private response: ResponseService,
        private spinner: NgxSpinnerService,
        private attachmentService: AttachmentService,
        private initiativeService: InitiativeService,
        public bsModalRef: BsModalRef        
    ) { }

    id: number;
    baseUrl = environment.apiUrl;

    uploader: FileUploader;
    hasBaseDropZoneOver = false;

    attachments: any = [];
    file: any[] = [];

    initiativeId: number;
    initiativeMode:string;

    isUpLoading = false;
    approveEdit :boolean

    ngOnInit(): void {
       
        this.id = this.initiativeService.id ? this.initiativeService.id : this.initiativeId;
        this.spinner.show();
        this.InitializeUploader();
        if (this.initiativeService.id) { this.GetAttachment(this.initiativeService.id); }
    }

    InitializeUploader() {
        this.uploader = new FileUploader({
            url: this.baseUrl + 'initiative/Attachment/' + this.id,
            authToken: 'Bearer ' + localStorage.getItem('token'),
            isHTML5: true,
            removeAfterUpload: true,
            autoUpload: false,
            //maxFileSize: 2 * 1024 * 1024
        });
        this.uploader.onWhenAddingFileFailed = (item, filter) => {
            let message = '';
            switch (filter.name) {
                case 'fileSize':
                    message = 'Warning ! \nThe uploaded file \"' + item.name +
                        '\" is ' + this.FormatBytes(item.size) + ', this exceeds the maximum allowed size of 2 mb';
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
        this.uploader.onSuccessItem = (item, response, status, headers) => {
            if (response) {
                const res: Attachment = JSON.parse(response);
                this.file.push({ id: res.id, name: res.name, fileName: res.fileName });
            }
        };
        this.uploader.onCompleteAll = () => {
            this.isUpLoading = false;
            this.spinner.hide();
            this.swalTool.FilesUpLoadedSuccess();
            if (sessionStorage.getItem('page') === 'capex-information-addmore') { location.reload(); }
        };
    }

    BypassUrl(contentType, file) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(encodeURI(('data:' + contentType + ';base64,' + file)));
    }

    FormatBytes(bytes, decimals = 2) {
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    GetAttachment(id) {
        this.attachmentService.GetAttachment(id).subscribe(response => {
            this.attachments = response;
            this.attachments.forEach((element) => {
                this.file.push({
                    id: element.id, file: this.BypassUrl(element.contentType, element.file),
                    name: element.name, fileName: element.fileName
                });
            });
        });
    }

    get IsViewMode() {
        return this.initiativeService.viewMode && (this.initiativeService.suggestionStatus?.stage !== 'Ideate - DIM Committee' && this.initiativeService.suggestionStatus?.stage !== 'Ideate IL2 - DIM Committee');
    }

    DownloadAttachment(name: string, fileName: string) {
        this.attachmentService.GetDownloadAttachment(this.id, fileName).subscribe((result: any) => {
            if (result.type !== 'text/plain') {
                const blob = new Blob([result]);
                const saveAs = require('file-saver');
                const file = name;
                saveAs(blob, file);
            } else {
                this.swalTool.FileNotFound();
            }
        });
    }

    DeleteAttachment(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this file?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.value) {
                this.attachmentService.DeleteAttachment(id).subscribe(() => {
                    this.file.splice(this.file.findIndex(f => f.id === id), 1);
                    this.swalTool.Delete();
                }, error => this.response.error(error));
            }
        });
    }

    CloseModal() {
        this.bsModalRef.hide();
    }

    HideModal() {
        this.bsModalRef.hide();
    }

    UploadAttachment() {
        if (this.uploader.queue.length) { this.uploader.uploadAll(); }
    }

    FileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }


}
