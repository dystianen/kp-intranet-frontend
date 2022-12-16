import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { FormScheduleComponent } from './form-schedule/form-schedule.component';
import { ListScheduleComponent } from './list-schedule/list-schedule.component';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleResolver } from './schedule.resolver';
import { CrudModule } from 'app/shared/crud/crud.module';
import { ModuleResolver } from '../module/module.resolver';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [
      {
        path: '',
        component: ListScheduleComponent,
        resolve: {
          schedules: ScheduleResolver,
          modules: ModuleResolver
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    ScheduleComponent,
    FormScheduleComponent,
    ListScheduleComponent
  ],
  imports: [
    CommonModule,
    CrudModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    NgxMaterialTimepickerModule
  ]
})
export class ScheduleModule { }
