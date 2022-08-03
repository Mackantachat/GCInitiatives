import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ActivatedRoute } from '@angular/router';
import 'chartjs-plugin-annotation';

@Component({
  selector: 'app-line-chartjs',
  templateUrl: './line-chartjs.component.html',
  styleUrls: ['./line-chartjs.component.css']
})
export class LineChartjsComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  baseUrl = environment.apiUrl;  // Base URL
  queryParam = '';  // Get query string URL
  public chartJS: any = [];
  result: Result[] = [];  // result from api

  public ChartOption: any = {
    type: 'line',
    data: {
      labels: ['2017-08-02', '2017-08-05', '2017-08-09', '2017-08-12', '2017-08-14'],
      datasets: [{
        label: 'LINE',
        data: [3, 1, 4, 2, 5],
        backgroundColor: 'rgba(0, 119, 290, 0.2)',
        borderColor: 'rgba(0, 119, 290, 0.6)'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: 'Y_IL1_Benefit',
            borderColor: 'red',
            label: {
              content: 'TODAY',
              enabled: true,
              position: 'top'
            }
          }
        ]
      }
    }
  };



  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.queryParam = params['reportid'];
    });
    this.selectedChart(this.queryParam);
  }

  selectedChart(reportid: string) {
    this.http.get<Result[]>(this.baseUrl + 'chart/PieChartJS?reportid=' + reportid).subscribe(r => {
      this.result = r;

      // this.ChartOption.options.title.text = this.result["titleText"];
      this.ChartOption.labels = this.result["dataLabel"];
      this.ChartOption.data.labels = this.result["dataLabel"];
      this.ChartOption.data.datasets = this.result["datasets"];
      this.chartJS = new Chart('Chart', this.ChartOption);
    }, error => console.error(error));
  }
}

interface RootObject {
  result: Result[];
}
interface Result {
  titleText: string;
  dataLabel: string[];
  datasets: DatasetsChart[];
}
interface DatasetsChart {
  data: number[];
  backgroundColor: string[];
  fill: boolean;
}

