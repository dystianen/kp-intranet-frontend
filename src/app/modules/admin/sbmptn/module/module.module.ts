import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleComponent } from './module.component';
import { ListModuleComponent } from './list-module/list-module.component';
import { FormModuleComponent } from './form-module/form-module.component';
import { Router, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ModuleComponent,
    children: [
      {
        path: '',
        component: ListModuleComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    ModuleComponent,
    ListModuleComponent,
    FormModuleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ModuleModule { }
