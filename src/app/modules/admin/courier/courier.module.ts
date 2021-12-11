import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourierComponent } from './courier.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { Route, RouterModule } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { CourierResolver } from './courier.resolver';

const routes: Route[] = [
  {
    path: '',
    component: CourierComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        resolve: {
          couriers: CourierResolver
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    CourierComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrudModule
  ]
})
export class CourierModule { }
