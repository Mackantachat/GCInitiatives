import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-combo-chartjs',
  templateUrl: './combo-chartjs.component.html',
  styleUrls: ['./combo-chartjs.component.css']
})
export class ComboChartjsComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  baseUrl = environment.apiUrl;  // Base URL
  queryParam = '';  // Get query string URL
  public chartJS: any = [];
  result: Result[] = [];  // result from api


  nowWeek: any = null;

  public ChartOption: any = {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'My First dataset',
          // new option, type will default to bar as that what is used to create the scale
          type: 'line',
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 2,
          fill: false,
          pointRadius: 0,
          data: [65, 59, 4, 81, 56, 55, 40],
          options: {
            elements: {
              point: {
                radius: 0
              }
            }
          }
        },
        {
          label: 'dataset 1',
          data: [20, 30, 50, 30, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        },
        {
          label: 'dataset 2',
          data: [20, 40, 60, 40, 50],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        },
        {
          label: 'dataset 3',
          data: [20, 40, 60, 40, 50],
          backgroundColor: [
            'rgba(55, 170, 270, 2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(55, 170, 270, 2)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        },
      ]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        },
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: 0,
            borderColor: 'red',
            label: {
              content: 'this week',
              enabled: true,
              position: 'top'
            },
          },
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 100,
            borderColor: 'red',
            label: {
              content: '',
              enabled: true,
              position: 'top'
            },
          }]
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
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
      this.nowWeek = this.getWeekNumber(new Date());
      this.queryParam = params['reportid'];
      this.selectedChart(this.queryParam);
    });

  }
  selectedChart(reportid: string) {
    this.http.get<Result[]>(this.baseUrl + 'chart/barchartjs?reportid=' + this.queryParam).subscribe(r => {
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
  backgroundcolor: string[];
}
