import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelesalesCodeComponent } from './telesales-code.component';
import { FormTelesalesCodeComponent } from './form-telesales-code/form-telesales-code.component';
import { ListTelesalesCodeComponent } from './list-telesales-code/list-telesales-code.component';
import { RouterModule, Routes } from '@angular/router';
import { TelesalesCodeResolver } from './telesales-code.resolver';
import { CrudModule } from 'app/shared/crud/crud.module';
import { ComponentsModule } from 'app/components/components.module';


const routes: Routes = [
  {
    path: '',
    component: TelesalesCodeComponent,
    children: [
      {
        path: '',
        component: ListTelesalesCodeComponent,
        resolve:{
          telesalescode: TelesalesCodeResolver
        }
      }
    ]
  }
]


@NgModule({
  declarations: [
    TelesalesCodeComponent,
    FormTelesalesCodeComponent,
    ListTelesalesCodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrudModule,
    ComponentsModule
  ]
})
export class TelesalesCodeModule { }
