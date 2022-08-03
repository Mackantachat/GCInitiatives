import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-chart',
  templateUrl: './table-chart.component.html',
  styleUrls: ['./table-chart.component.css']
})
export class TableChartComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  baseUrl = environment.apiUrl;  // Base URL
  queryParam = '';  // Get query string URL
  public chartJS: any = [];
  result: Result[] = [];  // result from api
  ss: number[];

  public ChartOption: any = {
    type: 'bar',
    data: {
      labels: null,
      datasets: null
    },
    options: {
      title: {
        display: true,
        text: null
      },
      plugins: {
        datalabels: {
          color: 'black',
          display: function (context) {
            return context.dataset.data[context.dataIndex] > 15;
          },
          font: {
            weight: 'bold'
          },
          formatter: Math.round
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.queryParam = params['reportid'];
    });
    this.http.get<Result[]>(this.baseUrl + 'chart/BarChartJS?reportid=' + this.queryParam).subscribe(r => {
      this.result = r;
      // this.ChartOption.options.title.text = this.result["titleText"];
      // this.ChartOption.data.labels = this.result["dataLabel"];
      // this.ChartOption.data.datasets = this.result["datasets"];
      this.ss = this.result["datasets"];
      // this.chartJS.chart('Chart', this.ChartOption);
      // this.chartJS = new Chart('Chart', this.ChartOption);
    }, error => console.error(error));
    // this.selectedChart(this.queryParam);
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
  label: string;
  data: number[];
  backgroundColor: string[];
}
