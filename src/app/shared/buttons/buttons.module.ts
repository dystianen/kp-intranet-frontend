import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitComponent } from './submit/submit.component';
import { DeleteComponent } from './delete/delete.component';
import { CloseComponent } from './close/close.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { UploadComponent } from './upload/upload.component';
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    SubmitComponent,
    DeleteComponent,
    CloseComponent,
    UploadComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule
    ],
    exports: [
        SubmitComponent,
        DeleteComponent,
        CloseComponent,
        UploadComponent
    ]
})
export class ButtonsModule { }
