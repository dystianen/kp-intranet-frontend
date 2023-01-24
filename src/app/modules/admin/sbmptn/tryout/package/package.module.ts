import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PackageComponent } from './package.component';
import { ListPackageComponent } from './list-package/list-package.component';
import { QuillModule } from 'ngx-quill';
import { FormPackageComponent } from './form-package/form-package.component';
import { ComponentsModule } from 'app/components/components.module';
import { CrudModule } from 'app/shared/crud/crud.module';
import { TryoutTypeResolver } from '../../tryout-type/tryout-type.resolver';
import { SoalResolver } from '../../soal/soal.resolver';
import { PackageResolver } from './package.resolver';

const routes: Routes = [
    {
        path: '',
        component: PackageComponent,
        children: [
            {
                path: '',
                component: ListPackageComponent,
                resolve:{
                    tryoutTypes: TryoutTypeResolver,
                    soals: SoalResolver,
                    packages: PackageResolver
                }
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
