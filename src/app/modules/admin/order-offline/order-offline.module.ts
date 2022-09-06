import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderOfflineComponent } from './order-offline.component';
import { Route, RouterModule } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { OrderOfflineResolver } from './order-offline.resolver';

const routes: Route[] = [
  {
    path: '',
    component: OrderOfflineComponent,
    resolve: {
      orders: OrderOfflineResolver
    }
  }
]

@NgModule({
  declarations: [
    OrderOfflineComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrudModule,
  ]
})
export class OrderOfflineModule { }
