import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { FuseConfigModule } from '@fuse/services/config';
import { LayoutModule } from 'app/layout/layout.module';

//Modal Module

import { SupplierComponent } from './supplier.component';
import { Route, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SupplierResolver } from './supplier.resolver';
import { FormComponent } from './form/form.component';
import { CrudModule } from 'app/shared/crud/crud.module';

const supplierRoutes: Route[] = [
  {
    path: '',
    component: SupplierComponent,
    children: [
      {
        path: '',
        resolve: {
          suppliers: SupplierResolver
        },
        component: ListComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    SupplierComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(supplierRoutes),
    FuseConfigModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    CrudModule
  ]
})
export class SupplierModule { }
