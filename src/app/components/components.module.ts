import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[
    UnauthorizedComponent
  ]
})
export class ComponentsModule { }
