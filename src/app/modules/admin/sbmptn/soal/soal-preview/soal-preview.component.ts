import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SoalService } from '../soal.service';
import { renderAsync } from 'docx-preview';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-soal-preview',
    templateUrl: './soal-preview.component.html',
    styleUrls: ['./soal-preview.component.scss'],
})
export class SoalPreviewComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialogRef<any>,
        private _soalService: SoalService,
    ) {
    }

    ngOnInit(): void {
        const container = document.getElementById('preview-document');
        renderAsync(this.data.url, container);
    }

    // onSubmit(): void {
    //     this._soalService.uploadSoal(this.data.url).subscribe((res) => {
    //         console.log({res});
    //         this.dialog.close();
    //     });
    // }
}
