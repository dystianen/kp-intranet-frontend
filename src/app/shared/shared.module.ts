import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from './buttons/buttons.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonsModule
    ]
})
export class SharedModule
{
}
