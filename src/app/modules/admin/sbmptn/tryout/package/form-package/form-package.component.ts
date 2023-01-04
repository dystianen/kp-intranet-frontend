import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SoalCategoryService } from '../../../../sbmptn/soal-category/soal-category.service';
import { ModuleService } from '../../../../sbmptn/module/module.service';
import { MapelService } from '../../../../sbmptn/mapel/mapel.service';
import { TryoutTypeService } from '../../../tryout-type/tryout-type.service';
import { SoalService } from '../../../soal/soal.service';
import { PackageService } from '../package.service';

@Component({
    selector: 'app-form-package',
    templateUrl: './form-package.component.html',
    styleUrls: ['./form-package.component.scss'],
})
export class FormPackageComponent implements OnInit {
    modules$: Observable<any[]>;
    categories: any[] = [];
    modules: any[] = [];
    subjects: any[] = [];
    flags: any[] = [];
    form: FormGroup;
    dlg: any[] = [];
    isPreview: boolean = true;

    moduleTyouts$: Observable<any[]>;
    tryoutTypes$: Observable<any[]>;
    mapels: any[] = [];
    soals$: any[] = [];

    tryoutTypes: any[] = [];
    tryoutModules: any[] = [];
    tryoutTopics: any[] = [];
    tryoutSubtopics: any[] = [];

    questionIds: any[] = [];

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<any>,
        private _categoryService: SoalCategoryService,
        private _moduleService: ModuleService,
        private _tryoutTypeService: TryoutTypeService,
        private _soalService: SoalService,
        private _packageService: PackageService
    ) {}

    ngOnInit(): void {
        this.modules$ = this._moduleService.modules$;
        this._moduleService.modules$.subscribe((res) => {
            this.modules = res;
        });

        this.tryoutTypes$ = this._tryoutTypeService.types$;

        this._tryoutTypeService.types$.subscribe((res) => {
            this.tryoutTypes = res;
        });

        this._soalService.soals$.subscribe((soals) => {
            this.soals$ = soals;
        });

        this.dlg = { ...this.dialogData };

        this._categoryService.soal_categorys$.subscribe((item) => {
            this.categories = item;
        });

        if (this.dialogData.type == 'edit') {
            this._packageService.getPackage(this.dialogData.id).subscribe((res) => {
              this.form.patchValue(res);
              if(res.question_ids){
                this.questionIds = res.question_ids;
              }
            })
          }

        /**
         * Initial form
         */
        this.form = this.formBuilder.group({
            package_name: '',
            description:'',
            tryout_type_id: '',
            tryout_module_id: '',
            tryout_topic_id: '',
            tryout_subtopic_id: '',
        });
    }

    /**Submit Form to API
     * @param f
     */
    submitForm(f: NgForm) {
        const form = f.value;
        const data = {
            ...form,
            question_ids: this.questionIds,
        };

        /**
         * Add new Destination
         */
        if (this.dialogData.type == 'add') {
            this._packageService.createPackage(data).subscribe((res) => {
                this._packageService.getPackages().subscribe();
                this.dialogRef.close();
            });
        }

        /**
         * Update data
         */
        if (this.dialogData.type == 'edit') {
            this._packageService
                .updatePackage(this.dialogData.id, data)
                .subscribe((res) => {
                    this._packageService.getPackages().subscribe();
                    this.dialogRef.close();
                });
        }
    }

    get soals() {
        return this.soals$.filter((item) => {
            if (
                this.form.value.tryout_type_id &&
                this.form.value.tryout_module_id &&
                this.form.value.tryout_topic_id &&
                this.form.value.tryout_subtopic_id
            ) {
                return (
                    item.category_id === 'tryout' &&
                    this.form.value.tryout_type_id === item.tryout_type_id &&
                    this.form.value.tryout_module_id ===
                        item.tryout_module_id &&
                    this.form.value.tryout_topic_id === item.tryout_topic_id &&
                    this.form.value.tryout_subtopic_id ===
                        item.tryout_subtopic_id
                );
            }

            if (
                this.form.value.tryout_type_id &&
                this.form.value.tryout_module_id &&
                this.form.value.tryout_topic_id
            ) {
                return (
                    item.category_id === 'tryout' &&
                    this.form.value.tryout_type_id === item.tryout_type_id &&
                    this.form.value.tryout_module_id ===
                        item.tryout_module_id &&
                    this.form.value.tryout_topic_id === item.tryout_topic_id
                );
            }

            if (
                this.form.value.tryout_type_id &&
                this.form.value.tryout_module_id
            ) {
                return (
                    item.category_id === 'tryout' &&
                    this.form.value.tryout_type_id === item.tryout_type_id &&
                    this.form.value.tryout_module_id === item.tryout_module_id
                );
            }

            if (this.form.value.tryout_type_id) {
                return (
                    item.category_id === 'tryout' &&
                    this.form.value.tryout_type_id === item.tryout_type_id
                );
            }

            return item.category_id === 'tryout';
        });
        if (this.form.value.tryout_type_id) {
        }
    }

    changeModule(module_id) {
        const module = this.modules.find((item) => item.id === module_id);
        if (module) {
            this.mapels = module.mapel;
        }
    }

    changeTryoutType(id_type) {
        const module = this.tryoutTypes.find((item) => item.id === id_type);
        if (module) {
            this.tryoutModules = module.type_modul;
        }
    }

    changeTryoutModule(id_module) {
        const module = this.tryoutModules.find((item) => item.id === id_module);
        if (module) {
            this.tryoutTopics = module.topic;
        }
    }

    changeTryoutTopic(id) {
        const module = this.tryoutTopics.find((item) => item.id === id);
        if (module) {
            this.tryoutSubtopics = module.subtopic;
        }
    }

    onPreview(status): void {
        this.isPreview = status;
    }

    checkKey(jawaban) {
        return jawaban.find((item) => item.is_true == true).key ?? '';
    }
    changeQuestion(e) {
        if (e.checked) {
            this.questionIds.push(e.value);
        } else {
            const index = this.questionIds.indexOf(e.value);
            this.questionIds.splice(index, 1);
        }

        console.log(this.questionIds);
    }

    isQuestionCheck(id){
        return this.questionIds.includes(id);
    }
}
