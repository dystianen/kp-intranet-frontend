import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SoalCategoryService } from '../../../sbmptn/soal-category/soal-category.service';
import { ModuleService } from '../../../sbmptn/module/module.service';
import { MapelService } from '../../../sbmptn/mapel/mapel.service';

@Component({
    selector: 'app-form-package',
    templateUrl: './form-package.component.html',
    styleUrls: ['./form-package.component.scss']
})
export class FormPackageComponent implements OnInit {
    modules$: Observable<any[]>;
    categories: any[] = [];
    modules: any[] = [];
    subjects: any[] = [];
    flags: any[] = [];
    form: FormGroup;
    dlg: any[] = [];
    isPreview: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<any>,
        private _categoryService: SoalCategoryService,
        private _moduleService: ModuleService,
        private _mapelService: MapelService
    ) {
    }

    ngOnInit(): void {
        this.modules$ = this._moduleService.modules$;
        this._moduleService.modules$.subscribe((res) => {
            this.modules = res;
        });

        this.dlg = {...this.dialogData};

        this._categoryService.soal_categorys$.subscribe((item) => {
            console.log('test');
            this.categories = item;
        });

        /**
         * Initial form
         */
        this.form = this.formBuilder.group({
            category_id: '',
            module_id: '',
            subject_id: '',
            flag_id: '',
        });
    }

    changeModule(module_id) {
        const module = this.modules.find(item => item.id === module_id);
        if (module) {
            this.subjects = module.mapel;
        }
    }

    onPreview(status): void {
        this.isPreview = status;
    }
}
