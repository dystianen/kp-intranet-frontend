import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { Route, RouterModule } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { UserResolver } from './user.resolver';

const routes: Route[] = [
  {
    path: '',
    component: UserComponent,
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
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrudModule
  ]
})
export class UserModule { }
