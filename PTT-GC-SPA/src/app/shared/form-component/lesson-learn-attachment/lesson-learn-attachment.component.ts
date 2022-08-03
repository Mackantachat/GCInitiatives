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
import { LessonLearnTableRowData } from '@models/lesson-learn-table-row-data';
import { BsModalRef } from 'ngx-bootstrap/modal';
declare var require: any;

@Component({
    selector: 'app-lesson-learn-attachment',
    templateUrl: './lesson-learn-attachment.component.html',
    styleUrls: ['./lesson-learn-attachment.component.css']
})
export class LessonLearnAttachmentComponent implements OnInit {
    @Input() isApprove: boolean;
    @Output() modelClose = new EventEmitter();

    constructor(
        private swalTool: SwalTool,
        private sanitizer: DomSanitizer,
        private response: ResponseService,
        private spinner: NgxSpinnerService,
        private attachmentService: AttachmentService,
        private initiativeService: InitiativeService,
        public bsModalRef: BsModalRef,
    ) { }

    id: number;
    baseUrl = environment.apiUrl;

    uploaderLessonLearn: FileUploader;
    hasBaseDropZoneOver = false;

    attachments: any = [];
    fileLessonLearn: any[] = [];



    islessonLearnAttachUpLoading = false;
    selected: LessonLearnTableRowData;
    ngOnInit(): void {
        this.id = this.initiativeService.id;
        this.spinner.show();
        if (this.initiativeService.id && this.selected) {
            this.GetCategoryAttachment(this.initiativeService.id);
        }
        this.InitializeUploader();
    }

    InitializeUploader() {

        this.uploaderLessonLearn = new FileUploader({
            url: this.baseUrl + 'initiative/Attachment/' + this.initiativeService.id + '/' + this.selected.id + '/lessonLearn',
            authToken: 'Bearer ' + localStorage.getItem('token'),
            isHTML5: true,
            removeAfterUpload: true,
            autoUpload: false,
            //maxFileSize: 2 * 1024 * 1024
        });
        this.uploaderLessonLearn.onWhenAddingFileFailed = (item, filter) => {
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
        this.uploaderLessonLearn.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploaderLessonLearn.onProgressAll = (progress) => {
            this.islessonLearnAttachUpLoading = true;
            this.spinner.show();
        };
        this.uploaderLessonLearn.onSuccessItem = (item, response, status, headers) => {
            if (response) {
                const res: Attachment = JSON.parse(response);
                this.fileLessonLearn.push({ id: res.id, name: res.name, fileName: res.fileName });
            }
        };
        this.uploaderLessonLearn.onCompleteAll = () => {
            this.islessonLearnAttachUpLoading = false;
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


    GetCategoryAttachment(id) {
        this.attachmentService.GetCategoryAttachment(id, this.selected.id, 'lessonLearn').subscribe(response => {
            this.attachments = response;
            this.attachments.forEach((element) => {
                this.fileLessonLearn.push({
                    id: element.id, file: this.BypassUrl(element.contentType, element.file),
                    name: element.name, fileName: element.fileName
                });
            });
        });
    }

    get viewMode() {
        return this.initiativeService.viewMode;
    }

    DownloadlessonLearnAttach(name: string, fileName: string) {
        this.attachmentService.GetDownloadAttachment(this.initiativeService.id, fileName).subscribe((result: any) => {
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

    DeletelessonLearnAttach(id) {
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
                    this.fileLessonLearn.splice(this.fileLessonLearn.findIndex(f => f.id === id), 1);
                    this.swalTool.Delete();
                }, error => this.response.error(error));
            }
        });
    }

    CloselessonLearnAttachModal() {
        this.bsModalRef.hide();
    }

    HidelessonLearnAttachModal() {
        this.bsModalRef.hide();
    }

    UploadlessonLearnAttachAttachment() {
        if (this.uploaderLessonLearn.queue.length) { this.uploaderLessonLearn.uploadAll(); }
    }

    FilelessonLearnAttachOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
}

