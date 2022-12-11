import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoalComponent } from './soal.component';
import { ListSoalComponent } from './list-soal/list-soal.component';
import { FormSoalComponent } from './form-soal/form-soal.component';
import { RouterModule, Routes } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { ComponentsModule } from 'app/components/components.module';
import { SoalResolver } from './soal.resolver';

const routes: Routes = [
  {
    path: '',
    component: SoalComponent,
    children: [
      {
        path: ':mapel_uuid',
        component: ListSoalComponent,
        resolve: {
          soals: SoalResolver
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    SoalComponent,
    ListSoalComponent,
    FormSoalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrudModule,
    ComponentsModule
  ]
})
export class SoalModule { }
