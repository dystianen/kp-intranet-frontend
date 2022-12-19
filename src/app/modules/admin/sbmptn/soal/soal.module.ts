import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoalComponent } from './soal.component';
import { ListSoalComponent } from './list-soal/list-soal.component';
import { FormSoalComponent } from './form-soal/form-soal.component';
import { RouterModule, Routes } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { ComponentsModule } from 'app/components/components.module';
import { SoalResolver } from './soal.resolver';
import { QuillModule } from 'ngx-quill';
import { FormJawabanComponent } from './form-jawaban/form-jawaban.component';
import { ListJawabanComponent } from './list-jawaban/list-jawaban.component';
import {MatListModule} from '@angular/material/list'; 
import { SoalCategoryResolver } from '../soal-category/soal-category.resolver';

const routes: Routes = [
  {
    path: '',
    component: SoalComponent,
    children: [
      {
        path: '',
        component: ListSoalComponent,
        resolve: {
          soals: SoalResolver,
          category: SoalCategoryResolver
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    SoalComponent,
    ListSoalComponent,
    FormSoalComponent,
    FormJawabanComponent,
    ListJawabanComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrudModule,
    ComponentsModule,
    QuillModule.forRoot(),
    MatListModule
  ]
})
export class SoalModule { }
