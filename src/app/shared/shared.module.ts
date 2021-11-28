import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmitComponent } from './buttons/submit/submit.component';
import { DeleteComponent } from './buttons/delete/delete.component';
import { CloseComponent } from './buttons/close/close.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
      SubmitComponent,
      DeleteComponent,
      CloseComponent
    ]
})
export class SharedModule
{
}
