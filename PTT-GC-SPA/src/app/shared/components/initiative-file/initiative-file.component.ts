import { SwalTool } from '@tools/swal.tools';
import { AttachmentService } from '@services/attachment/attachment.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
declare var require: any;

@Component({
  selector: 'app-initiative-file',
  templateUrl: './initiative-file.component.html',
  styleUrls: ['./initiative-file.component.css']
})
export class InitiativeFileComponent implements OnInit {

  constructor(
    private swalTool: SwalTool,
    private attachmentService: AttachmentService
  ) { }

  @ViewChild('FileModal', { static: false }) FileModal: ModalDirective;

  @Input() id;

  attachments: any = [];
  file: any = [];

  ngOnInit(): void {
    this.GetAttachment();
  }

  GetAttachment() {
    this.attachmentService.GetAttachment(this.id).subscribe(response => {
      this.attachments = response;
      this.attachments.forEach((element) => {
        this.file.push({ id: element.id, name: element.name, fileName: element.fileName });
      });
    });
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

  OpenFile() {
    this.FileModal.show();
  }

  CloseModal() {
    this.FileModal.hide();
  }
}
