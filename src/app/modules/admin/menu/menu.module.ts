import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { Route, RouterModule } from '@angular/router';
import { MenuResolver } from './menu.resolver';
import { CrudModule } from 'app/shared/crud/crud.module';
import { TreeComponent } from './tree/tree.component';
import {CdkTreeModule} from '@angular/cdk/tree'; 
import { MatTreeModule } from '@angular/material/tree';

const routes: Route[] = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        resolve: {
          menus: MenuResolver
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    MenuComponent,
    FormComponent,
    ListComponent,
    TreeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrudModule,
    CdkTreeModule,
    MatTreeModule
  ],
  exports:[
    
  ],
  providers:[]
})
export class MenuModule { }
