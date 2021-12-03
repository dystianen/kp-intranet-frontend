import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { Route, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';


const routesCategory: Route[] = [
  {
    path: '',
    component: CategoryComponent
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
    RouterModule.forChild(routesCategory)
  ]
})
export class CategoryModule { }
