import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrderComponent } from './list-order/list-order.component';
import { FormModifyComponent } from './form-modify/form-modify.component';
import { OrdersComponent } from './orders.component';
import { Route, RouterModule } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { OrderResolver } from './order.resolver';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { ProcessOrderComponent } from './process-order/process-order.component';

const routes: Route[] = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: '',
        component: ListOrderComponent,
        resolve:{
          orders: OrderResolver
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    ListOrderComponent,
    FormModifyComponent,
    OrdersComponent,
    DetailOrderComponent,
    ProcessOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrudModule
  ]
})
export class OrdersModule { }
