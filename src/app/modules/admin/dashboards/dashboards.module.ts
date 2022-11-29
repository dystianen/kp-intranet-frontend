import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsComponent } from './dashboards.component';
import { SalesComponent } from './sales/sales.component';
import { Route, RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SalesResolver } from './sales.resolver';
import { CustomersComponent } from './customers/customers.component';
import { UsersResolver } from './users.resolver';


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
        component: SalesComponent,
        resolve: {
          // sales: SalesResolver
        }
      },
      {
        path: 'customers',
        component: CustomersComponent,
        resolve: {
          // sales: UsersResolver
        }
      }
    ]
  }
];


@NgModule({
  declarations: [
    DashboardsComponent,
    SalesComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardsRoutes),
    NgApexchartsModule
  ]
})
export class DashboardsModule { }
