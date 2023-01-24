import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyEditorComponent } from './my-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [MyEditorComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, CKEditorModule],
    exports: [MyEditorComponent],
})
export class MyEditorModule {}
