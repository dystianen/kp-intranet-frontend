import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SoalCategoryService } from '../../soal-category/soal-category.service';
import { MapelService } from '../../mapel/mapel.service';
import { ModuleService } from '../../module/module.service';
import { SoalPreviewComponent } from '../soal-preview/soal-preview.component';
import { Observable } from 'rxjs';

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

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private _categoryService: SoalCategoryService,
        private _moduleService: ModuleService,
        private _mapelService: MapelService,
        private dialog: MatDialog
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
            file: ''
        });
    }

    changeModule(module_id) {
        const module = this.modules.find((item) => item.id === module_id);
        this.isDisabled = true;
        if (module) {
            this.mapels = module.mapel;
        }
    }

    changeMapel() {
        this.isDisabled = false;
    }

    selectFile(event: any): void {
        if (event.target.files && event.target.files[0]) {
            const type = event.target.files[0].name.substr(event.target.files[0].name.indexOf('.'));
            if (type === '.docx') {
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);
                const url = URL.createObjectURL(event.target.files[0]);
                reader.onload = (e: any) => {
                    this.dialog.open(SoalPreviewComponent, {
                        id: 'preview',
                        data: {
                            title: 'Buat Soal dengan Template',
                            type: 'preview',
                            url: url
                        },
                        autoFocus: true
                    });
                };
            } else {
                alert('Document type not matching!');
            }
        }
    }
}
