import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    AngularEditorModule,
    HttpClientModule
  ],
  exports:[
    EditorComponent
  ]
})
export class EditorModule { }
