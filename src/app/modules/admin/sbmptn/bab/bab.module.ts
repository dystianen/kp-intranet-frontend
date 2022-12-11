import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BabComponent } from './bab.component';
import { ListBabComponent } from './list-bab/list-bab.component';
import { FormBabComponent } from './form-bab/form-bab.component';
import { RouterModule, Routes } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { BabResolver } from './bab.resolver';

const routes: Routes = [
  {
    path: '',
    component: BabComponent,
    children: [
      {
        path: ':bab_uuid',
        component: ListBabComponent,
        resolve:{
          babs: BabResolver
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    BabComponent,
    ListBabComponent,
    FormBabComponent
  ],
  imports: [
    CommonModule,
    CrudModule,
    RouterModule.forChild(routes)
  ]
})
export class BabModule { }
