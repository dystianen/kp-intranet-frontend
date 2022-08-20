import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales/sales.component';
import { StocksComponent } from './stocks/stocks.component';
import { ReportsComponent } from './reports.component';
import { Route, RouterModule } from '@angular/router';
import { SalesResolver } from './sales.resolver';
import { CrudModule } from 'app/shared/crud/crud.module';
import { StocksResolver } from './stocks.resolver';

const reporsRoute : Route[]=[
  {
    path:'',
    component: ReportsComponent,
    children:[
      {
        path:'sales',
        component: SalesComponent,
        resolve:{
          sales: SalesResolver
        }
      },
      {
        path:'input-stocks',
        component: StocksComponent,
        resolve:{
          sales: StocksResolver
        }
      }
    ]
  }
]




@NgModule({
  declarations: [
    SalesComponent,
    StocksComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(reporsRoute),
    CrudModule
  ]
})
export class ReportsModule { }
