import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitComponent } from './submit/submit.component';
import { DeleteComponent } from './delete/delete.component';
import { CloseComponent } from './close/close.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    SubmitComponent,
    DeleteComponent,
    CloseComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports:[
    SubmitComponent,
    DeleteComponent,
    CloseComponent
  ]
})
export class ButtonsModule { }
