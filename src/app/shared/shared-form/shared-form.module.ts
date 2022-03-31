import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { CrudModule } from '../crud/crud.module';



@NgModule({
  declarations: [
    UploadImageComponent
  ],
  exports:[
    UploadImageComponent
  ],
  imports: [
    CommonModule,
    CrudModule
  ]
})
export class SharedFormModule { }
