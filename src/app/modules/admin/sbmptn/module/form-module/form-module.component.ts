import { findIndex, indexOf, remove } from 'lodash';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'app/model/category';
import { SoalCategoryService } from '../../soal-category/soal-category.service';
import { ModuleService } from '../module.service';

@Component({
    selector: 'app-form-module',
    templateUrl: './form-module.component.html',
    styleUrls: ['./form-module.component.scss'],
})
export class FormModuleComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<any>,
        private _moduleService: ModuleService,
        private _categoryService: SoalCategoryService
    ) {}

    form: FormGroup;

    categories$: Category[] = [];
    categories_checked: any[] = [];

    ngOnInit(): void {
        this._categoryService.soal_categorys$.subscribe((data) => {
            this.categories$ = data;
        });
        /**
         * Initial form
         */
        this.form = this.formBuilder.group({
            code: '',
            name: '',
            description: '',
            order: 0,
        });

        /**
         * Fetch data by id from API
         */
        if (this.dialogData.type == 'edit') {
            this._moduleService
                .getModule(this.dialogData.id)
                .subscribe((res) => {
                    this.form.patchValue(res);
                    this.categories_checked = res.module_has_category?.map(
                        (item) => item.category_id
                    );
                });
        }
    }

    /**Submit Form to API
     * @param f
     */
    submitForm(f: NgForm) {
        /**
         * Add new Destination
         */
        const data = {
            module: f.value,
            categories: this.categories_checked,
        };
        if (this.dialogData.type == 'add') {
            this._moduleService.createModule(data).subscribe((res) => {
                this.dialogRef.close();
            });
        }

        /**
         * Update data
         */
        if (this.dialogData.type == 'edit') {
            this._moduleService
                .updateModule(this.dialogData.id, data)
                .subscribe((res) => {
                    this.dialogRef.close();
                });
        }
    }

    get categories() {
        return this.categories$;
    }

    checkCategory(e, idCategory: string) {
        if (e.checked) {
            this.categories_checked.push(idCategory);
        } else {
            const index = indexOf(this.categories_checked, idCategory);
            if (index > -1) {
                remove(this.categories_checked, (item) => {
                    return item === idCategory;
                });
            }
        }
    }

    isChcek(idCategory: string) {
        return this.categories_checked.includes(idCategory);
    }
}
