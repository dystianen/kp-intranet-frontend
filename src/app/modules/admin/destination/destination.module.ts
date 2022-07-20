import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationComponent } from './destination.component';
import { ListDestinationComponent } from './list-destination/list-destination.component';
import { FormDestinationComponent } from './form-destination/form-destination.component';



@NgModule({
  declarations: [
    DestinationComponent,
    ListDestinationComponent,
    FormDestinationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DestinationModule { }
