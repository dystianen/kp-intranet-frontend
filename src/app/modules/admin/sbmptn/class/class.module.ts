import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassComponent } from './class.component';
import { ListClassComponent } from './list-class/list-class.component';
import { FormClassComponent } from './form-class/form-class.component';
import { RouterModule, Routes } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';

const routes: Routes = [
  {
    path: '',
    component: ClassComponent,
    children: [
      {
        path: '',
        component: ListClassComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    ClassComponent,
    ListClassComponent,
    FormClassComponent
  ],
  imports: [
    CommonModule,
    CrudModule,
    RouterModule.forChild(routes)
  ]
})
export class ClassModule { }
