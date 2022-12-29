import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SoalCategoryService } from '../../soal-category/soal-category.service';
import { MapelService } from '../../mapel/mapel.service';
import { ModuleService } from '../../module/module.service';
import { SoalPreviewComponent } from '../soal-preview/soal-preview.component';
import { Observable } from 'rxjs';
import { SoalService } from '../soal.service';

@Component({
    selector: 'app-form-upload',
    templateUrl: './form-upload.component.html',
    styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {
    categories: any[] = [];
    modules$: Observable<any[]>;
    modules: any[] = [];
    mapels: any[] = [];
    form: FormGroup;
    isDisabled: boolean = true;
    filename: string;
    file: any;

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private _categoryService: SoalCategoryService,
        private _moduleService: ModuleService,
        private _mapelService: MapelService,
        private _soalService: SoalService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<FormUploadComponent>,
    ) {
    }

    ngOnInit(): void {
        this.modules$ = this._moduleService.modules$;
        this._moduleService.modules$.subscribe((res) => {
            this.modules = res;
        });

        this._categoryService.soal_categorys$.subscribe((item) => {
            this.categories = item;
        });

        /**
         * Initial form
         */
        this.form = this.formBuilder.group({
            category_id: '',
            mapel_id: '',
            module_id: '',
        });
    }

    changeModule(module_id) {
        const module = this.modules.find((item) => item.id === module_id);
        this.isDisabled = true;
        this.filename = '';
        if (module) {
            this.mapels = module.mapel;
        }
    }

    changeMapel() {
        this.isDisabled = false;
    }

    b64toBlob(b64Data, contentType, sliceSize = 512) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {type: contentType});
    }

    selectFile(event: any): void {
        if (event.target.files && event.target.files[0]) {
            const type = event.target.files[0].name.substr(event.target.files[0].name.indexOf('.'));
            const file = event.target.files[0];
            this.filename = event.target.files[0].name;

            if (type === '.docx') {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = (e: any) => {
                    const [metadata, base64] = e.target.result.split(',');
                    const [type] = metadata.split(';');
                    const f = this.b64toBlob(base64, type.split(':')[1]);
                    this.file = f;

                    this.dialog.open(SoalPreviewComponent, {
                        id: 'preview',
                        data: {
                            title: 'Buat Soal dengan Template',
                            type: 'preview',
                            url: file
                        },
                        autoFocus: true
                    });
                };
            } else {
                alert('Document type not matching!');
            }
        }
    }

    submitForm(f: NgForm) {
        const data = {
            ...f.value,
        };

        const fd = new FormData();
        fd.append('categoryId', data.category_id);
        fd.append('modulId', data.module_id);
        fd.append('mapelId', data.mapel_id);
        fd.append('file', this.file, this.filename);

        this._soalService.createBulkSoal(fd).subscribe(() => {
            this._soalService.getSoals().subscribe();
            this.dialogRef.close();
        });
    }
}
