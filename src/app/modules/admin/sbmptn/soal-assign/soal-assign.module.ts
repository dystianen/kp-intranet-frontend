import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoalAssignComponent } from './soal-assign.component';
import { ListSoalAssignComponent } from './list-soal-assign/list-soal-assign.component';
import { FormSoalAssignComponent } from './form-soal-assign/form-soal-assign.component';
import { RouterModule, Routes } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { SoalResolver } from '../soal/soal.resolver';
import { ModuleResolver } from '../module/module.resolver';
import { SoalCategoryResolver } from '../soal-category/soal-category.resolver';
import { SoalAssignResolver } from './soal-assign.resolver';

const routes: Routes = [
  {
    path: '',
    component: SoalAssignComponent,
    children: [
      {
        path: '',
        component: ListSoalAssignComponent,
        resolve:{
          soals: SoalResolver,
          modules: ModuleResolver,
          categories: SoalCategoryResolver,
          assigns: SoalAssignResolver
        }
      }
    ]
  }
];

@NgModule({
  declarations: [
    SoalAssignComponent,
    ListSoalAssignComponent,
    FormSoalAssignComponent
  ],
  imports: [
    CommonModule,
    CrudModule,
    RouterModule.forChild(routes)
  ]
})
export class SoalAssignModule { }
