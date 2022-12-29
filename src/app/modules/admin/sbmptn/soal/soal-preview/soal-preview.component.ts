import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SoalService } from '../soal.service';
import { renderAsync } from 'docx-preview';
import { FormUploadComponent } from '../form-upload/form-upload.component';

@Component({
    selector: 'app-soal-preview',
    templateUrl: './soal-preview.component.html',
    styleUrls: ['./soal-preview.component.scss'],
})
export class SoalPreviewComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialogRef<any>,
    ) {
    }

    ngOnInit(): void {
        const container = document.getElementById('preview-document');
        renderAsync(this.data.url, container);
    }

    onSubmit(): void {
        this.dialog.close();
    }
}
