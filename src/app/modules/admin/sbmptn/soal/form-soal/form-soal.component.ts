import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {SoalCategoryService} from '../../soal-category/soal-category.service';
import {SoalService} from '../soal.service';
import {Observable} from 'rxjs';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {SoalPreviewComponent} from "../soal-preview/soal-preview.component";

@Component({
    selector: 'app-form-soal',
    templateUrl: './form-soal.component.html',
    styleUrls: ['./form-soal.component.scss']
})
export class FormSoalComponent implements OnInit {
    form: FormGroup;
    jawaban: any = [];
    jawabansDeleted = [];
    dlg: any;
    categories: any[] = [];
    url: '';

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<any>,
        private _soalService: SoalService,
        private _categoryService: SoalCategoryService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {

        this.dlg = {...this.dialogData}

        this._soalService.jawabansDeleted$.subscribe((item) => {
            this.jawabansDeleted = item;
        });

        this._categoryService.soal_categorys$.subscribe((item) => {
            this.categories = item;
        });

        /**
         * Initial form
         */
        this.form = this.formBuilder.group({
            title: '',
            content: '',
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            pembahasan: '',
            category_id: '',
        });

        this._soalService._jawabans.subscribe((item) => {
            this.jawaban = item;
        });


        /**
         * Fetch data by id from API
         */
        if (this.dlg.type === 'editSoal') {
            this._soalService.getSoal(this.dialogData.id).subscribe((res) => {
                this.form.patchValue(res);
            });
        }
    }

    /**Submit Form to API
     * @param f
     */
    submitForm(f: NgForm): void {

        /**
         * Add new Destination
         */
        if (this.dlg.type === 'addSoal') {
            const data = {
                ...f.value, jawaban: {
                    createMany: {
                        data: this.jawaban
                    }
                }
            };
            this._soalService.createSoal(data).subscribe((res) => {
                this._soalService.getSoals().subscribe();
                this.dialogRef.close();
            });
        }

        /**
         * Update data
         */
        if (this.dlg.type === 'editSoal') {
            const delete_jawaban = this.jawabansDeleted.map((item) => {
                return item.key;
            });
            const data = {
                soal: f.value,
                jawaban: this.jawaban,
                delete_jawaban: delete_jawaban ?? []
            }
            this._soalService.updateSoal(this.dialogData.id, data).subscribe((res) => {
                this._soalService.getSoals().subscribe();
                this.dialogRef.close();
            });
        }
    }

    selectFile(event: any): void {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event: any) => {
                this.url = event.target.result;
            };
            this.onPreview();
        }
    }

    onPreview(): void {
        this._soalService._jawabans.next([]);
        this.dialog.open(SoalPreviewComponent, {
            id: 'preview',
            data: {
                title: 'Preview',
                type: 'preview',
            },
            autoFocus: true
        });
    }
}
