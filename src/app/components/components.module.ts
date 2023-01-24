import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from './button/back-button/back-button.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MyCkEditorComponent } from './my-ck-editor/my-ck-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    UnauthorizedComponent,
    BackButtonComponent,
    MyCkEditorComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CKEditorModule
  ],
  exports:[
    UnauthorizedComponent,
    BackButtonComponent
  ]
})
export class ComponentsModule { }
