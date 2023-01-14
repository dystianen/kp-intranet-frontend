import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SoalCategoryService } from '../../soal-category/soal-category.service';
import { MapelService } from '../../mapel/mapel.service';
import { ModuleService } from '../../module/module.service';
import { SoalPreviewComponent } from '../soal-preview/soal-preview.component';
import { Observable } from 'rxjs';
import { SoalService } from '../soal.service';
import { TryoutTypeService } from '../../tryout-type/tryout-type.service';
import { uniqBy } from 'lodash';

@Component({
    selector: 'app-form-upload',
    templateUrl: './form-upload.component.html',
    styleUrls: ['./form-upload.component.scss'],
})
export class FormUploadComponent implements OnInit {
    isLoading : boolean = false;
    categories: any[] = [];
    modules$: Observable<any[]>;
    modules: any[] = [];
    mapels: any[] = [];
    form: FormGroup;
    isDisabled: boolean = false;
    filename: string;
    file: any;

    moduleTyouts$: Observable<any[]>;
    tryoutTypes$: Observable<any[]>;

    tryoutTypes: any[] = [];
    tryoutModules: any[] = [];
    tryoutTopics: any[] = [];
    tryoutSubtopics: any[] = [];
    
    tryoutModules$: any[] = [];
    tryoutTopics$: any[] = [];
    tryoutSubtopics$: any[] = [];


    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private _categoryService: SoalCategoryService,
        private _moduleService: ModuleService,
        private _mapelService: MapelService,
        private _soalService: SoalService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<FormUploadComponent>,
        private _tryoutTypeService: TryoutTypeService
    ) {}

    ngOnInit(): void {
        this.modules$ = this._moduleService.modules$;
        this._moduleService.modules$.subscribe((res) => {
            this.modules = res;
        });

        this._categoryService.soal_categorys$.subscribe((item) => {
            this.categories = item;
        });

        this.tryoutTypes$ = this._tryoutTypeService.types$;

        this._tryoutTypeService.modules$.subscribe((res) => {
            this.tryoutModules = res;
        });

        /**
         * Initial form
         */
        this.form = this.formBuilder.group({
            category_id: '',
            mapel_id: '',
            module_id: '',
            tryout_module_id: '',
            tryout_subtopic_id: '',
            tryout_topic_id: '',
            tryout_type_id: '',
        });
    }

    get toModules(){
        return uniqBy(this.tryoutModules$,'code');
    }

    get toTopics(){
        if(this.form.value.tryout_module_id){
            const moduleIds = this.tryoutModules$.filter((item)=>item.code==this.form.value.tryout_module_id).map((item)=>item.id);
            if(moduleIds){
                return uniqBy(this.tryoutTopics$.filter((item)=>moduleIds.includes(item.id_modul)),'code');
            }
        }
        return uniqBy(this.tryoutTopics$,'code');
    }

    get toSubTopics(){
        if(this.form.value.tryout_topic_id){
            const topicIds = this.tryoutTopics$.filter((item)=>item.code==this.form.value.tryout_topic_id).map((item)=>item.id);
            if(topicIds){
                return uniqBy(this.tryoutSubtopics$.filter((item)=>topicIds.includes(item.id_topic)),'code');
            }
        }
        return uniqBy(this.tryoutSubtopics$,'code');
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

    b64toBlob(b64Data, contentType, sliceSize = 512) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (
            let offset = 0;
            offset < byteCharacters.length;
            offset += sliceSize
        ) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    }

    selectFile(event: any): void {
        if (event.target.files && event.target.files[0]) {
            const type = event.target.files[0].name.substr(
                event.target.files[0].name.indexOf('.')
            );
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
                            url: file,
                        },
                        autoFocus: true,
                    });
                };
            } else {
                alert('Document type not matching!');
            }
        }
    }

    submitForm(f: NgForm) {
        this.isLoading = true;
        const data = {
            ...f.value,
        };
        const fd = new FormData();
        if (data.category_id) {
            fd.append('category_id', data.category_id);
        }
        if (data.module_id) {
            fd.append('module_id', data.module_id);
        }
        if (data.mapel_id) {
            fd.append('mapel_id', data.mapel_id);
        }
        if (data.tryout_module_id) {
            fd.append('tryout_module_id', data.tryout_module_id);
        }
        if (data.tryout_subtopic_id) {
            fd.append('tryout_subtopic_id', data.tryout_subtopic_id);
        }
        if (data.tryout_type_id) {
            fd.append('tryout_type_id', data.tryout_type_id);
        }

        if (data.tryout_topic_id) {
            fd.append('tryout_topic_id', data.tryout_topic_id);
        }
        if (this.file) {
            fd.append('file', this.file, this.filename);
        }

        this._soalService.createBulkSoal(fd).subscribe(() => {
            setTimeout(()=>{
                this.isLoading = false;
                this._soalService.getSoals().subscribe();
                this.dialogRef.close();
            },4000);
        });
    }
}
