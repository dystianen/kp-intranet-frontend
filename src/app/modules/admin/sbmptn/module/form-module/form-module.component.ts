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

    categories: Category[] = [];

    ngOnInit(): void {
        this._categoryService.soal_categorys$.subscribe((data) => {
            this.categories = data;
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
        if (this.dialogData.type == 'add') {
            this._moduleService.createModule(f.value).subscribe((res) => {
                this.dialogRef.close();
            });
        }

        /**
         * Update data
         */
        if (this.dialogData.type == 'edit') {
            this._moduleService
                .updateModule(this.dialogData.id, f.value)
                .subscribe((res) => {
                    this.dialogRef.close();
                });
        }
    }
}
