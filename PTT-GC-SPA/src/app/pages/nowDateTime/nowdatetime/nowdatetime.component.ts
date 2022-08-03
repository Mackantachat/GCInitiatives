import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { CustomReportMerge } from '@models/customReportMerge';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nowdatetime',
  templateUrl: './nowdatetime.component.html',
  styleUrls: ['./nowdatetime.component.css']
})
export class NowdatetimeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  nowtimeVS :Date;
  nowtimeDB :Date;

  ngOnInit(): void {  
    this.GetNowDateTime();
    this.GetNowDateTimeDB();
  }


  GetNowDateTime() {
    this.http.get<Date>(this.baseUrl + 'GetNowDateTime/GetNowDateTime').subscribe(r=> this.nowtimeVS = r);
  }

  GetNowDateTimeDB(){
    return this.http.get<Date>(this.baseUrl + 'GetNowDateTime/GetNowDateTimeDB').subscribe(r=> this.nowtimeDB = r);
  }
}
