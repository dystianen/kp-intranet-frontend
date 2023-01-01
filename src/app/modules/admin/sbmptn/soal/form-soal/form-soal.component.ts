import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { identity, omit, omitBy, pick } from 'lodash';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { MapelService } from '../../mapel/mapel.service';
import { ModuleService } from '../../module/module.service';
import { SoalCategoryService } from '../../soal-category/soal-category.service';
import { TryoutModuleService } from '../../tryout-module/tryout-module.service';
import { TryoutTypeService } from '../../tryout-type/tryout-type.service';
import { SoalService } from '../soal.service';

@Component({
    selector: 'app-form-soal',
    templateUrl: './form-soal.component.html',
    styleUrls: ['./form-soal.component.scss'],
})
export class FormSoalComponent implements OnInit {
    modules$: Observable<any[]>;
    moduleTyouts$: Observable<any[]>;
    tryoutTypes$: Observable<any[]>;
    modules: any[] = [];
    mapels: any[] = [];
    
    tryoutTypes: any[] = [];
    tryoutModules: any[] = [];
    tryoutTopics: any[] = [];
    tryoutSubtopics: any[] = [];

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<any>,
        private _soalService: SoalService,
        private _categoryService: SoalCategoryService,
        private _moduleService: ModuleService,
        private _mapelService: MapelService,
        private _moduleTryoutService: TryoutModuleService,
        private _tryoutTypeService: TryoutTypeService
    ) {}

    form: FormGroup;

    jawaban: any = [];
    jawabansDeleted = [];
    dlg: any;
    categories: any[] = [];

    ngOnInit(): void {
        this.modules$ = this._moduleService.modules$;
        this.tryoutTypes$ = this._tryoutTypeService.types$;

        this._tryoutTypeService.types$.subscribe((res) => {
            this.tryoutTypes = res;
        });
        this._moduleService.modules$.subscribe((res) => {
            this.modules = res;
        });

        this.dlg = { ...this.dialogData };

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
            // title: '',
            content: '',
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            pembahasan: '',
            category_id: '',
            mapel_id: '',
            module_id: '',
            level: '',
            tryout_module_id:'',
            tryout_subtopic_id:'',
            tryout_topic_id:'',
            tryout_type_id:'',
        });

        this._soalService._jawabans.subscribe((item) => {
            this.jawaban = item;
        });

        /**
         * Fetch data by id from API
         */
        if (this.dlg.type == 'editSoal') {
            this._soalService.getSoal(this.dialogData.id).subscribe((res) => {
                this.form.patchValue(res);
                if (res.module_id) {
                    this._mapelService.mapels$.subscribe((mapels) => {
                        this.mapels = mapels.filter(
                            (mapel) => mapel.module_id === res.module_id
                        );
                    });
                }
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
        if (this.dlg.type == 'addSoal') {
            const data = {
                ...f.value,
                jawaban: {
                    createMany: {
                        data: this.jawaban,
                    },
                },
            };
            const filterData  = omitBy(data,v => v === "" || v === null);
            this._soalService.createSoal(filterData).subscribe((res) => {
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
                delete_jawaban: delete_jawaban ?? [],
            };
            this._soalService
                .updateSoal(this.dialogData.id, data)
                .subscribe((res) => {
                    this._soalService.getSoals().subscribe();
                    this.dialogRef.close();
                });
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
}
