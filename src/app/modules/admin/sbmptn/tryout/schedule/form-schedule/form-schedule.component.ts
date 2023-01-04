import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { PackageService } from '../../package/package.service';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { ScheduleService } from '../schedule.service';
import { SoalService } from '../../../soal/soal.service';
import { TryoutTypeService } from '../../../tryout-type/tryout-type.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-form-schedule',
    templateUrl: './form-schedule.component.html',
    styleUrls: ['./form-schedule.component.scss'],
})
export class FormScheduleComponent implements OnInit {
    @ViewChild('picker') picker: any;

    public date: any;
    public disabled = false;
    public showSpinners = true;
    public showSeconds = false;
    public touchUi = false;
    public enableMeridian = false;
    public minDate: moment.Moment;
    public maxDate: moment.Moment;
    public stepHour = 1;
    public stepMinute = 1;
    public stepSecond = 1;
    public color: ThemePalette = 'primary';

    isPreview: boolean = true;

    public formGroup = new FormGroup({
        date: new FormControl(null, [Validators.required]),
        date2: new FormControl(null, [Validators.required]),
    });
    public dateControl = new FormControl(new Date(2021, 9, 4, 5, 6, 7));
    public dateControlMinMax = new FormControl(new Date());

    public options = [
        { value: true, label: 'True' },
        { value: false, label: 'False' },
    ];

    public listColors = ['primary', 'accent', 'warn'];

    public stepHours = [1, 2, 3, 4, 5];
    public stepMinutes = [1, 5, 10, 15, 20, 25];
    public stepSeconds = [1, 5, 10, 15, 20, 25];

    form: FormGroup;
    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
    });

    packages: any[] = [];
    soals$: any[] = [];

    moduleTyouts$: Observable<any[]>;
    tryoutTypes$: Observable<any[]>;

    tryoutTypes: any[] = [];
    tryoutModules: any[] = [];
    tryoutTopics: any[] = [];
    tryoutSubtopics: any[] = [];

    questionIds: any[] = [];

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<any>,
        private _packageService: PackageService,
        private _scheduleService: ScheduleService,
        private _soalService: SoalService,
        private _tryoutTypeService: TryoutTypeService
    ) {}

    ngOnInit() {
        this.date = new Date(2021, 9, 4, 5, 6, 7);
        this.form = this.formBuilder.group({
            title: '',
            soal_package_id: '',
            schedule_start: '',
            schedule_end: '',
            registration_start: '',
            registration_end: '',
            description: '',
            tryout_type_id: '',
            tryout_module_id: '',
            tryout_topic_id: '',
            tryout_subtopic_id: '',
        });

        this.tryoutTypes$ = this._tryoutTypeService.types$;

        this._packageService.tryoutPackages$.subscribe((item) => {
            this.packages = item;
        });

        this._soalService.soals$.subscribe((soals) => {
            this.soals$ = soals;
        });

        this._tryoutTypeService.types$.subscribe((res) => {
            this.tryoutTypes = res;
        });
    }

    /**Submit Form to API
     * @param f
     */
    submitForm(f: NgForm) {
        alert('aa');
        const form = f.value;
        const data = {
            ...form,
            questionIds: this.questionIds,
        };
        /**
         * Add new Destination
         */
        if (this.dialogData.type == 'add') {
            this._scheduleService.createSchedule(data).subscribe((res) => {
                this.dialogRef.close();
            });
        }

        /**
         * Update data
         */
        if (this.dialogData.type == 'edit') {
            this._scheduleService
                .updateSchedule(this.dialogData.id, data)
                .subscribe((res) => {
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

    isQuestionCheck(id) {
        return this.questionIds.includes(id);
    }
}
