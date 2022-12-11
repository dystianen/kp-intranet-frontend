import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapelComponent } from './mapel.component';
import { ListMapelComponent } from './list-mapel/list-mapel.component';
import { FormMapelComponent } from './form-mapel/form-mapel.component';
import { RouterModule, ROUTER_CONFIGURATION, Routes } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { MapelResolver } from './mapel.resolver';
import { ModuleResolver } from '../module/module.resolver';
import { ComponentsModule } from 'app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: MapelComponent,
    children: [
      {
        path: '',
        component: ListMapelComponent,
        resolve:{
          mapels: MapelResolver,
          modules: ModuleResolver
        }
      }
    ]
  }
];

@NgModule({
  declarations: [
    MapelComponent,
    ListMapelComponent,
    FormMapelComponent
  ],
  imports: [
    CommonModule,
    CrudModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ]
})
export class MapelModule { }
