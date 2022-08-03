import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
declare var require: any;

@Component({
  selector: 'app-reporttest01',
  templateUrl: './reporttest01.component.html',
  styleUrls: ['./reporttest01.component.css']
})
export class Reporttest01Component implements OnInit {
  baseUrl = environment.pathUrl;

  constructor(private http: HttpClient,) { }

  myUrlReport: any = this.baseUrl + 'ReportTest01';
  ngOnInit(): void {
  }

  exportPDF() {
    this.http.get(this.baseUrl + 'ReportTest01/exportPdf', { responseType: 'blob' }).subscribe((r: any) => {
      if (r.type !== 'text/plain') {
        const blob = new Blob([r]);
        const saveAs = require('file-saver');
        const file = 'reporttest1.pdf';
        saveAs(blob, file);
      } else {
        alert('File not found in Blob!');
      }
    },
      error => {
      });
  }

}
