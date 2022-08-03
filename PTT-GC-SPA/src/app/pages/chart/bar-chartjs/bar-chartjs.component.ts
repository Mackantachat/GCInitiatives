import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ActivatedRoute } from '@angular/router';
import 'chartjs-plugin-annotation';
import 'chartjs-plugin-datalabels';
// import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-bar-chartjs',
  templateUrl: './bar-chartjs.component.html',
  styleUrls: ['./bar-chartjs.component.css']
})

export class BarChartjsComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  baseUrl = environment.apiUrl;  // Base URL
  queryParam = '';  // Get query string URL
  public chartJS: any = [];
  result: Result[] = [];  // result from api
  dd: any = [];

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
          color: '#000000',
          anchor: 'end',
          align: 'top',
          font: {
            size: 12
          }
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (tooltipItem, data) {
              return Number(tooltipItem.yLabel).toFixed(2);
          }
        }
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: this.getWeekNumber(new Date()),
            borderColor: 'red',
            label: {
              content: 'this week',
              enabled: true,
              position: 'top'
            }
          }
        ]
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'x1'
          },
          ticks: {
            beginAtZero: true
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'y1'
          },
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  private getWeekNumber(d: Date): number {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    let yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    let weekNo = Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
    // Return array of year and week number
    return weekNo;
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.queryParam = params['reportid'];
    });
    this.selectedChart(this.queryParam);
  }

  selectedChart(reportid: string) {
    this.http.get<Result[]>(this.baseUrl + 'chart/BarChartJS?reportid=' + reportid).subscribe(r => {
      this.result = r;
      this.ChartOption.options.title.text = this.result["titleText"];
      this.ChartOption.data.labels = this.result["dataLabel"];
      this.ChartOption.data.datasets = this.result["datasets"];
      this.ChartOption.options.scales.xAxes[0].scaleLabel.labelString = this.result["labelX"];
      this.ChartOption.options.scales.yAxes[0].scaleLabel.labelString = this.result["labelY"];
      // this.chartJS.chart('Chart', this.ChartOption);
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
  label: string;
  data: number[];
  backgroundColor: string[];
}

