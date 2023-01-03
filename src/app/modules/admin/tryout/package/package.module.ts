import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PackageComponent } from './package.component';
import { ListPackageComponent } from './list-package/list-package.component';
import { CrudModule } from '../../../../shared/crud/crud.module';
import { ComponentsModule } from '../../../../components/components.module';
import { QuillModule } from 'ngx-quill';
import { FormPackageComponent } from './form-package/form-package.component';

const routes: Routes = [
    {
        path: '',
        component: PackageComponent,
        children: [
            {
                path: '',
                component: ListPackageComponent,
                // resolve: {
                //     schedules: PackageComponent,
                // }
            }
        ]
    }
];

@NgModule({
  declarations: [
      PackageComponent,
      ListPackageComponent,
      FormPackageComponent
  ],
  imports: [
      CommonModule,
      CrudModule,
      ComponentsModule,
      QuillModule.forRoot(),
      RouterModule.forChild(routes),
  ]
})
export class PackageModule { }
