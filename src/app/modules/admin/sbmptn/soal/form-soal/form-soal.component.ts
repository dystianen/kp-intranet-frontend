import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { identity, omit, omitBy, pick } from 'lodash';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { MapelService } from '../../mapel/mapel.service';
import { ModuleService } from '../../module/module.service';
import { SoalCategoryService } from '../../soal-category/soal-category.service';
import { TryoutTypeService } from '../../tryout-type/tryout-type.service';
import { SoalService } from '../soal.service';
import Quill from 'quill';
import { VideoHandler, ImageHandler, Options } from 'ngx-quill-upload';
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'environments/environment';
import { ImageResize } from 'quill-image-resize-module';
// import { Validators, Editor, Toolbar } from 'ngx-editor';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

Quill.register('modules/imageHandler', ImageHandler);
Quill.register('modules/videoHandler', VideoHandler);
Quill.register('modules/blotFormatter', BlotFormatter);
// Quill.register('modules/imageResize', ImageResize);

// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
// import Image from '@ckeditor/ckeditor5-image/src/image';

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
        private _tryoutTypeService: TryoutTypeService
    ) {}

    public Editor = ClassicEditor;

    form: FormGroup;

    jawaban: any = [];
    jawabansDeleted = [];
    dlg: any;
    categories: any[] = [];

    ckeditor5Config = {
        placeholder: 'Type the content here!',
        // plugins: [ SimpleUploadAdapter],
        simpleUpload: {
            // The URL that the images are uploaded to.
            uploadUrl: `${environment.apiPtnUrl}/admin/soal/upload-media`,
        }
    }

    ckeditorConfig = {
        // ImageResize: true,
        // toolbar: [
        //     {
        //         name: 'document',
        //         items: ['Source', '-', 'NewPage', 'Preview', '-', 'Templates'],
        //     },
        //     {
        //         name: 'clipboard',
        //         items: [
        //             'Cut',
        //             'Copy',
        //             'Paste',
        //             'PasteText',
        //             'PasteFromWord',
        //             '-',
        //             'Undo',
        //             'Redo',
        //         ],
        //     },
        //     '/',
        //     { name: 'basicstyles', items: ['Bold', 'Italic'] },
        //     {
        //         name:'paragraph', items:['NumberedList','BulletedList']
        //     }
        // ],
    };

    // editor: Editor;
    // toolbar: Toolbar = [
    //   ['bold', 'italic'],
    //   ['underline', 'strike'],
    //   ['code', 'blockquote'],
    //   ['ordered_list', 'bullet_list'],
    //   [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    //   ['link', 'image'],
    //   ['text_color', 'background_color'],
    //   ['align_left', 'align_center', 'align_right', 'align_justify'],
    // ];

    modulesEditor = {
        // imageResize: true,
        blotFormatter: true,
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction

            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ['clean'],
            ['image'],
        ],
        imageHandler: {
            upload: (file) => {
                return new Promise((resolve, reject) => {
                    if (
                        file.type === 'image/jpeg' ||
                        file.type === 'image/png' ||
                        file.type === 'image/jpg'
                    ) {
                        // File types supported for image
                        if (file.size < 1000000) {
                            // Customize file size as per requirement

                            // Sample API Call
                            const uploadData = new FormData();
                            uploadData.append('file', file);
                            return this._soalService
                                .uploadFile(uploadData)
                                .then((result) => {
                                    setTimeout(() => {
                                        resolve(result.imageUrl);
                                    }, 2000);
                                })
                                .catch((error) => {
                                    reject('Upload failed');
                                    // Handle error control
                                    console.error('Error:', error);
                                });
                        } else {
                            reject('Size too large');
                            // Handle Image size large logic
                        }
                    } else {
                        reject('Unsupported type');
                        // Handle Unsupported type logic
                    }
                });
            },
            accepts: ['png', 'jpg', 'jpeg', 'jfif'],
        } as Options,
        videoHandler: {
            upload: (file) => {
                return; // your uploaded video URL as Promise<string>
            },
            accepts: ['mpeg', 'avi'], // Extensions to allow for videos (Optional) | Default - ['mp4', 'webm']
        } as Options,
    };

    editorConfig: any = {
        editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: '0',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter text here...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
            { class: 'arial', name: 'Arial' },
            { class: 'times-new-roman', name: 'Times New Roman' },
            { class: 'calibri', name: 'Calibri' },
            { class: 'comic-sans-ms', name: 'Comic Sans MS' },
        ],
        customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText',
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            },
        ],
        // uploadUrl: `${environment.apiPtnUrl}/admin/soal/upload-media`,
        // upload: (file) => {
        //     return new Promise((resolve, reject) => {
        //         if (
        //             file.type === 'image/jpeg' ||
        //             file.type === 'image/png' ||
        //             file.type === 'image/jpg'
        //         ) {
        //             // File types supported for image
        //             if (file.size < 1000000) {
        //                 // Customize file size as per requirement

        //                 // Sample API Call
        //                 const uploadData = new FormData();
        //                 uploadData.append('image', file);
        //                 return this._soalService
        //                     .uploadFile(uploadData)
        //                     .then((result) => {
        //                         resolve({imageUrl:'https://storage.googleapis.com/kp-sbmptn/media/temp/soal/081f410a-b935-4a18-9b16-1b2700c34a1fcircle.png'})
        //                         // resolve(result.data.url); // RETURN IMAGE URL from response
        //                     })
        //                     .catch((error) => {
        //                         reject('Upload failed');
        //                         // Handle error control
        //                         console.error('Error:', error);
        //                     });
        //             } else {
        //                 reject('Size too large');
        //                 // Handle Image size large logic
        //             }
        //         } else {
        //             reject('Unsupported type');
        //             // Handle Unsupported type logic
        //         }
        //     });
        // },
        uploadWithCredentials: false,
        sanitize: true,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
    };

    public onReady( editor ) {
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }

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
                    this.changeTryoutModule(res.tryout_type_id);
                }
                if (res.tryout_type_id) {
                    this.changeTryoutType(res.tryout_type_id);
                }
                if (res.tryout_topic_id) {
                    this.changeTryoutTopic(res.tryout_type_id);
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
            const filterData = omitBy(data, (v) => v === '' || v === null);
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
