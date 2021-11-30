import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsComponent } from './dashboards.component';
import { SalesComponent } from './sales/sales.component';
import { Route, RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';


const dashboardsRoutes: Route[] = [
  {
    path: '',
    component: DashboardsComponent,
    children: [
      {
        path: '',
        component: SalesComponent
      },
      {
        path: 'sales',
        component: SalesComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    DashboardsComponent,
    SalesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardsRoutes),
    NgApexchartsModule
  ]
})
export class DashboardsModule { }
