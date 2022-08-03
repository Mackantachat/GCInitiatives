import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ActivatedRoute } from '@angular/router';
// import 'chartjs-plugin-annotation';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-stacked-chartjs',
  templateUrl: './stacked-chartjs.component.html',
  styleUrls: ['./stacked-chartjs.component.css']
})
export class StackedChartjsComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  baseUrl = environment.apiUrl;  // Base URL
  queryParam = '';  // Get query string URL
  public chartJS: any = [];
  result: Result[] = [];  // result from api
  resultCount: Result[] = [];  // result Count from api
  showLabel = true;
  columnNumber = 0;
  nowWeek: any = null;
  showTable = true;
  totalizer: any;

  //arrayIL5: number[] = [12,16,10,5,11];
  arraySIL5: any = [];
  arrayIL5: any = [];
  label_IL: string = '';
  label_SIL: string = '';
  count_IL: number = 0;
  // For Count
  arrayILCount: any =[];
  label_ILCount: string = '';

  public ChartOption: any = {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May'],
      datasets: [
        {
          label: 'My First dataset',
          // new option, type will default to bar as that what is used to create the scale
          type: 'line',
          borderColor: 'green',
          borderWidth: 2,
          fill: false,
          data: [200, 300, 400, 500, 200, 300, 400, 500]
        },
        {
          label: 'dataset 1',
          type: 'bar',
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
          display: null,
          color: '#000000',
          // anchor : 'end',
          //  align : 'top',
          font: {
            size: 12
          }
          // ---------------

          // ---------------
        }
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: 0,
            borderColor: 'red',
            borderWidth: 1,
            enabled: true,
            label: {
              content: 'Current',
              enabled: true,
              position: 'top'
            },
          },
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 0,
            borderColor: 'red',
            borderWidth: 1,
            enabled: true,
            label: {
              content: 'Target',
              enabled: true,
              position: 'left'
            },
          }]
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function (tooltipItem, data) {
              //return Number(tooltipItem.yLabel).toFixed(2);
              return data.datasets[tooltipItem.datasetIndex].label +': ' + Number(tooltipItem.yLabel).toFixed(2);
          }
        }
      },
      responsive: true,
      hover: {
        animationDuration: 0
      },
      scales: {
        xAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'XXXX'
          },
        }],
        yAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'YYYYY'
          },
        }]
      },
      animation: {
        onComplete: function () {
          var chartInstance = this.chart;
          var ctx = chartInstance.ctx;
          ctx.textAlign = "center";
          //ctx.font = "14px";
          ctx.fillStyle = "#00000";



          var maxPosX = 0;
          var maxPosY = 0;

          var meta = null;
          var posX = 0;
          var posY = 0;
          this.data.datasets[0].data.forEach(function (data, index) {
            var total = 0; // + this.data.datasets[3].data[index];

            this.data.datasets.forEach((dataset, idx) => {
              if (this.chart.isDatasetVisible(idx)) {
                total += dataset.data[index];

                meta = chartInstance.controller.getDatasetMeta(idx);
                posX = meta.data[index]._model.x;
                posY = meta.data[index]._model.y;
              }
            });

            ctx.fillStyle = "black";
            //ctx.fillText(total.toFixed(2), posX, posY - 8);
            //.toLocaleString('en-us', {minimumFractionDigits: 2})
            ctx.fillText(total.toLocaleString('en-us', {minimumFractionDigits: 2}), posX, posY - 8);
          }, this);

        }
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
      //this.arrayILCount = [5,6,3,4,7,9]
      this.nowWeek = this.getWeekNumber(new Date());
      this.queryParam = params['reportid'];
      this.selectedChart_Count(this.queryParam);   // for Counting
      this.selectedChart(this.queryParam);
    });

   

  }

  selectedChart_Count(reportid: string) {
    this.http.get<any>(this.baseUrl + 'chart/BarChartJS_Count_2?reportid=' + this.queryParam).subscribe(r => {
      this.resultCount = r;
      //console.log('count : ', this.resultCount);

      let countIL: any = [];
      let labelCount : string = '';

       this.resultCount.forEach(function (value) { 
        labelCount = 'Unconverted IL4 Count';
        countIL.push(value["y_Unconverted_IL4Count"])
        //console.log('VALUE : ',value["y_Unconverted_IL4Count"]);
       });
      this.arrayILCount = countIL;
      this.label_ILCount = labelCount;
    }, error => console.error(error));
  }

  selectedChart(reportid: string) {
    this.http.get<Result[]>(this.baseUrl + 'chart/barchartjs?reportid=' + this.queryParam).subscribe(r => {
      this.result = r;
      //console.log('r ', r);
      this.ChartOption.options.title.text = this.result["titleText"];
      this.ChartOption.options.scales.xAxes[0].scaleLabel.labelString = this.result["labelX"];
      this.ChartOption.options.scales.yAxes[0].scaleLabel.labelString = this.result["labelY"];

      this.ChartOption.options.annotation.annotations[0].value = this.nowWeek - 1;
      this.ChartOption.options.annotation.annotations[0].label.enabled = true;

      this.ChartOption.options.annotation.annotations[1].value = this.result["horizonLineValue"] == 0 ? null : this.result["horizonLineValue"];
      this.ChartOption.options.annotation.annotations[1].label.enabled = this.result["showTargetLine"];

      //-------------------------- For NEW MAX CHART --------------------------------------------------------------
      let count_IL:number = 0;
      let il5: any = [];
      let l_il,l_sil: string = '';
      Array.from(this.result["datasets"]).forEach(function (child) {
          if(child['label'] === 'IL5' || child['label'] === 'IL4'){
          if(child['label'] === 'IL5'){
            l_il = 'IL5 Achievement';
          }else{
            l_il = 'IL4 Achievement';
          }
          Array.from(child["data"]).forEach(function (data) { il5.push(data); count_IL += 1; });
        }
      });
      this.label_IL = l_il;
      this.arrayIL5 = il5;
      this.count_IL = count_IL;

      let sil5: any = [];
      Array.from(this.result["datasets"]).forEach(function (child) {
        if(child['label'] === 'SIL5' || child['label'] === 'SIL4'){
        if(child['label'] === 'SIL5'){
          l_sil = 'IL5 Achievement';
        }else{
          l_sil = 'IL4 Achievement';
        }
        Array.from(child["data"]).forEach(function (data) { sil5.push(data)});
      }
    });
    this.label_SIL = l_sil;
    this.arraySIL5 = sil5;
    //----------------------------------------------------------------------------------------

      const totalizer = {
        id: 'totalizer',

        beforeUpdate: chart => {
          let totals = {}
          let utmost = 0

          chart.data.datasets.forEach((dataset, datasetIndex) => {
            if (chart.isDatasetVisible(datasetIndex)) {
              utmost = datasetIndex
              dataset.data.forEach((value, index) => {
                totals[index] = (totals[index] || 0) + value
              })
            }
          })

          chart.$totalizer = {
            totals: totals,
            utmost: utmost
          }
        }
      }

      // Chart.pluginService.register(totalizer);
      this.ChartOption.data.labels = this.result["dataLabel"];
      this.ChartOption.data.datasets = this.result["datasets"];

      //console.log(this.result["datasets"][1]);
      
      //  this.result["datasets"][1]["data"].forEach(function (value) {
      //    console.log(value);
      //  }); 

      // Array.prototype.forEach.call( this.result["datasets"][1], child => {
      //   console.log(child.data)
      // });
      // let nodeList = this.result["datasets"][1]
      // Array.from(nodeList, child => {
      //   console.log(child)
      // });
     

      this.columnNumber = this.result["dataLabel"].length;

      if (this.result['dataLabel'].length > 48) {
        this.showLabel = false;
      }

      if (this.result['dataLabel'].length < 48) {
        this.ChartOption.options.annotation?.annotations?.splice(0,1); //remove current week red line if datalabel is not more than 48 (week graph)  only show on week graph
      }

      if (this.result['showLabel'].length != true) {
        this.showLabel = false;
      }

      if (this.result["showSumLabel"] != true) {
        this.ChartOption.options.animation = null;
      }

      this.showTable = this.result["showTable"];
      this.ChartOption.options.plugins.datalabels.display = this.showLabel;

      // this.chartJS.chart('Chart', this.ChartOption);

      // for(var i = 0; i < this.ChartOption.options.data[0].dataPoints.length; i++) {
      //   this.ChartOption.options.data[2].dataPoints.push({
      //     label: this.ChartOption.options.data[0].dataPoints[i].label,
      //     y: this.ChartOption.options.data[0].dataPoints[i].y + this.ChartOption.options.data[1].dataPoints[i].y
      //   });
      // }


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
  type: string;
  borderColor: string;
}
