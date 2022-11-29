import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";
import { DashboardsService } from '../dashboards.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private dashboardService: DashboardsService) {

  }

  ngOnInit(): void {

    // this.dashboardService.customers$.subscribe((res: any) => {
    //   this.chartOptions = {
    //     series: res.series,
    //     chart: {
    //       type: "bar",
    //       height: 350
    //     },
    //     plotOptions: {
    //       bar: {
    //         horizontal: false,
    //         columnWidth: "55%"
    //       }
    //     },
    //     dataLabels: {
    //       enabled: false
    //     },
    //     stroke: {
    //       show: true,
    //       width: 2,
    //       colors: ["transparent"]
    //     },
    //     xaxis: {
    //       categories: res.categories
    //     },
    //     yaxis: {
    //       title: {
    //         text: "Jumlah Pengguna"
    //       }
    //     },
    //     fill: {
    //       opacity: 1
    //     },
    //     tooltip: {
    //       y: {
    //         formatter: function (val) {
    //           return val + " Pengguna";
    //         }
    //       }
    //     }
    //   };
    // })
  }

}