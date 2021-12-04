import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { Route, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CrudModule } from 'app/shared/crud/crud.module';
import { CategoryResolver } from './category.resolver';


const routesCategory: Route[] = [
  {
    path: '',
    component: CategoryComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        resolve: {
          categories: CategoryResolver
        }
      }
    ]
  }
]


@NgModule({
  declarations: [
    FormComponent,
    ListComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesCategory),
    CrudModule
  ]
})
export class CategoryModule { }
