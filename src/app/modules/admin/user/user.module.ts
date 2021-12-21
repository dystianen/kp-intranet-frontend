import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { Route, RouterModule } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { UserResolver } from './user.resolver';
import { RoleComponent } from './role/role.component';
import { RoleResolver } from '../role/role.resolver';
import { SiteComponent } from './site/site.component';

const routes: Route[] = [
  {
    path: '',
    component: UserComponent,
    resolve:{
      roles: RoleResolver
    },
    children: [
      {
        path: '',
        component: ListComponent,
        resolve:{
          users: UserResolver
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    UserComponent,
    FormComponent,
    ListComponent,
    RoleComponent,
    SiteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrudModule
  ]
})
export class UserModule { }
