import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from './button/back-button/back-button.component';
import { MatButton, MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    UnauthorizedComponent,
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[
    UnauthorizedComponent,
    BackButtonComponent
  ]
})
export class ComponentsModule { }
