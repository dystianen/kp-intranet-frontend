import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FuseConfigModule } from '@fuse/services/config';
import { LayoutModule } from 'app/layout/layout.module';

import { SupplierComponent } from './supplier.component';
import { Route, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { SupplierResolver } from './supplier.resolver';

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
    AddComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(supplierRoutes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSortModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    FuseConfigModule,
    LayoutModule
  ]
})
export class SupplierModule { }
