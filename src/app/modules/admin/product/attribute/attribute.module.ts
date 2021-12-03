import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeComponent } from './attribute.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { Route, RouterModule } from '@angular/router';

const routesAttribute: Route[] = [
  {
    path: '',
    component: AttributeComponent
  }
]


@NgModule({
  declarations: [
    AttributeComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesAttribute)
  ]
})
export class AttributeModule { }
