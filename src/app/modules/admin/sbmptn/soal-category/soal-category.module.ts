import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoalCategoryComponent } from './soal-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { FormCategoryComponent } from './form-category/form-category.component';
import { RouterModule, Routes } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { SoalCategoryResolver } from './soal-category.resolver';

const routes: Routes = [
  {
    path: '',
    component: SoalCategoryComponent,
    children: [
      {
        path: '',
        component: ListCategoryComponent,
        resolve:{
          categories: SoalCategoryResolver
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    SoalCategoryComponent,
    ListCategoryComponent,
    FormCategoryComponent
  ],
  imports: [
    CommonModule,
    CrudModule,
    RouterModule.forChild(routes)
  ]
})
export class SoalCategoryModule { }
