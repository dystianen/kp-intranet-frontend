import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { Route, RouterModule } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { RoleResolver } from './role.resolver';


const routes: Route[] = [
  {
    path: '',
    component: RoleComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        resolve: {
          roles: RoleResolver
        }
      }
    ]
  }
]


@NgModule({
  declarations: [
    RoleComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrudModule
  ]
})
export class RoleModule { }
