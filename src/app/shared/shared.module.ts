import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from './buttons/buttons.module';
import { ToastModule } from './toast/toast.module';




@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonsModule,
        ToastModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonsModule,
        ToastModule,
    ],
    declarations: [
      
  ]
})
export class SharedModule
{
}
