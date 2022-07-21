import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationComponent } from './destination.component';
import { ListDestinationComponent } from './list-destination/list-destination.component';
import { FormDestinationComponent } from './form-destination/form-destination.component';
import { Route, RouterModule } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DestinationResolver } from './destination.resolver';

const destinationRoutes: Route[] = [
  {
    path: '',
    component: DestinationComponent,
    children: [
      {
        path: '',
        component: ListDestinationComponent,
        resolve: {
          destinations: DestinationResolver
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    DestinationComponent,
    ListDestinationComponent,
    FormDestinationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(destinationRoutes),
    CrudModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DestinationModule { }
