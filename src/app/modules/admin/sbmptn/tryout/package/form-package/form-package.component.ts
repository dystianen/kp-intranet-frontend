import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SoalCategoryService } from '../../../../sbmptn/soal-category/soal-category.service';
import { ModuleService } from '../../../../sbmptn/module/module.service';
import { MapelService } from '../../../../sbmptn/mapel/mapel.service';
import { TryoutTypeService } from '../../../tryout-type/tryout-type.service';
import { SoalService } from '../../../soal/soal.service';

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
    soals: any[] = [];

    tryoutTypes: any[] = [];
    tryoutModules: any[] = [];
    tryoutTopics: any[] = [];
    tryoutSubtopics: any[] = [];

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<any>,
        private _categoryService: SoalCategoryService,
        private _moduleService: ModuleService,
        private _mapelService: MapelService,
        private _tryoutTypeService: TryoutTypeService,
        private _soalService: SoalService
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
            this.soals = soals;
        });

        this.dlg = { ...this.dialogData };

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
    
    checkKey(jawaban){
        return jawaban.find((item)=>item.is_true==true).key??''
    }

}
