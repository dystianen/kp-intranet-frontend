import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { Route, RouterModule } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { RoleResolver } from './role.resolver';
import { MenuComponent } from './menu/menu.component';
import { MenuModule } from '../menu/menu.module';
import { MatTreeModule } from '@angular/material/tree';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MenuResolver } from '../menu/menu.resolver';


const routes: Route[] = [
  {
    path: '',
    component: RoleComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        resolve: {
          roles: RoleResolver,
          menus: MenuResolver
        }
      }
    ]
  }
]


@NgModule({
  declarations: [
    RoleComponent,
    FormComponent,
    ListComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrudModule,
    MatTreeModule,
    CdkTreeModule
  ]
})
export class RoleModule { }
