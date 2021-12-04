import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { AttributeComponent } from './attribute.component';
import { Route, RouterModule } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { AttributeResolver } from './attribute.resolver';


const routes: Route[] = [
  {
    path: '',
    component: AttributeComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        resolve: {
          attributes: AttributeResolver
        }
      }
    ]
  }
]


@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    AttributeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrudModule
  ]
})
export class AttributeModule { }
