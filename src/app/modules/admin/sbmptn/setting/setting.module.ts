import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { ListSettingComponent } from './list-setting/list-setting.component';
import { FormSettingComponent } from './form-setting/form-setting.component';
import { RouterModule, Routes } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { SettingResolver } from './setting.resolver';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      {
        path: '',
        component: ListSettingComponent,
        resolve: {
          settings: SettingResolver
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    SettingComponent,
    ListSettingComponent,
    FormSettingComponent
  ],
  imports: [
    CommonModule,
    CrudModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingModule { }
