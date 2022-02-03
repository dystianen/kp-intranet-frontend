import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputStockComponent } from './input-stock.component';
import { Route, RouterModule } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { ListInputStockComponent } from './list-input-stock/list-input-stock.component';
import { InputStockResolver } from './input-stock.resolver';
import { QRCodeModule } from 'angularx-qrcode';
import { ListInputStockHistoryComponent } from './list-input-stock-history/list-input-stock-history.component';

export const InputStockRoute: Route[] = [
  {
    path: '',
    component: InputStockComponent,
    resolve: {
      inputStock: InputStockResolver
    },
    children: [
      {
        path: '',
        component: ListInputStockComponent,
      },
      {
        path: ':sku',
        component: ListInputStockHistoryComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    InputStockComponent,
    ListInputStockComponent,
    ListInputStockHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(InputStockRoute),
    CrudModule,
    QRCodeModule
  ],
  providers:[
    
  ]
})
export class InputStockModule { }
