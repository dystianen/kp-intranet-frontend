import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { identity, omit, omitBy, pick, uniqBy } from 'lodash';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { MapelService } from '../../mapel/mapel.service';
import { ModuleService } from '../../module/module.service';
import { SoalCategoryService } from '../../soal-category/soal-category.service';
import { TryoutTypeService } from '../../tryout-type/tryout-type.service';
import { SoalService } from '../soal.service';
import { environment } from 'environments/environment';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { ckeditor5Conf } from 'app/shared/setting/ckeditor5';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';

@Component({
    selector: 'app-form-soal',
    templateUrl: './form-soal.component.html',
    styleUrls: ['./form-soal.component.scss'],
})
export class FormSoalComponent implements OnInit {
    isLoading: boolean = false;
    modules$: Observable<any[]>;
    moduleTyouts$: Observable<any[]>;
    tryoutTypes$: Observable<any[]>;
    modules: any[] = [];
    mapels: any[] = [];

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
        private _tryoutTypeService: TryoutTypeService
    ) {}

    public Editor = Editor;

    form: FormGroup;

    jawaban: any = [];
    jawabansDeleted = [];
    dlg: any;
    categories: any[] = [];

    topics$: any[] = [];
    subtopics$: any[] = [];

    ngOnInit(): void {
        const _this = this;

        this.modules$ = this._moduleService.modules$;
        this.tryoutTypes$ = this._tryoutTypeService.types$;

        this._tryoutTypeService.modules$.subscribe((res) => {
            this.tryoutModules = res;
        });

        this._moduleService.modules$.subscribe((res) => {
            this.modules = res;
        });

        this._tryoutTypeService.topics$.subscribe((topics) => {
            this.topics$ = topics;
        });
        this._tryoutTypeService.subtopics$.subscribe((subtopics) => {
            this.subtopics$ = subtopics;
        });

        this.dlg = { ...this.dialogData };

        this._soalService.jawabansDeleted$.subscribe((item) => {
            this.jawabansDeleted = item;
        });

        this._categoryService.soal_categorys$.subscribe((item) => {
            this.categories = item;
        });

        this.tryoutTopics = this.topics$;

        


        /**
         * Initial form
         */
        this.form = this.formBuilder.group({
            // title: '',
            content: '',
            instruction: '',
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            pembahasan: '',
            category_id: this._soalService.curentCategory,
            mapel_id: '',
            module_id: '',
            level: '',
            mark: '',
            tryout_module_id: '',
            tryout_subtopic_id: '',
            tryout_topic_id: '',
            tryout_type_id: '',
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

                if (res.tryout_module_id) {
                    this.tryoutTopics = this.topics$;
                }

                if (res.tryout_topic_id) {
                    this._tryoutTypeService.subtopics$.subscribe(
                        (subtopics) => {
                            this.tryoutTopics = subtopics.filter(
                                (item) => item.id_topic == res.tryout_topic_id
                            );
                        }
                    );
                }
            });
        }
    }

    /**Submit Form to API
     * @param f
     */
    submitForm(f: NgForm) {
        this.isLoading = true;
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
            const filterData = omitBy(data, (v) => v === '' || v === null);
            this._soalService.createSoal(filterData).subscribe((res) => {
                this._soalService.getSoals().subscribe();
                this.dialogRef.close();
                this.isLoading = false;
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

    get topics(){
        return this.topics$.filter((item)=>item.id_modul==this.form.value.tryout_module_id);
    }

    get subtopics(){
        return this.subtopics$.filter((item)=>item.id_topic==this.form.value.tryout_topic_id);
    }

    changeModule(module_id) {
        const module = this.modules.find((item) => item.id === module_id);
        if (module) {
            this.mapels = module.mapel;
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
