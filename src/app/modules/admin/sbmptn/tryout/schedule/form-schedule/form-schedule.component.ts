import {
    AfterViewInit,
    Component,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
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
import { uniqBy } from 'lodash';

@Component({
    selector: 'app-form-schedule',
    templateUrl: './form-schedule.component.html',
    styleUrls: ['./form-schedule.component.scss'],
})
export class FormScheduleComponent implements OnInit, AfterViewInit {
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
    isFilter: boolean = true;

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

    moduleTyouts$: any[] = [];
    topics$: any[] = [];
    subtopics$: any[] = [];
    tryoutTypes$: Observable<any[]>;

    tryoutTypes: any[] = [];
    // tryoutSubtopics: any[] = [];

    questionIds: any[] = [];

    inputTypeTryoutIds: any[] = [];
    inputModuleIds: any[] = [];
    inputTopicIds: any[] = [];
    inputSubtopicIds: any[] = [];

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
            schedule_start: '',
            schedule_end: '',
            registration_start: '',
            registration_end: '',
            description: ''
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
            this.inputTypeTryoutIds = res.map((id) => id.id);
        });

        this._tryoutTypeService.modules$.subscribe((res) => {
            this.moduleTyouts$ = res;
            this.inputModuleIds = res.map((id) => id.id);
        });

        this._tryoutTypeService.topics$.subscribe((res) => {
            this.topics$ = res;
        });

        this._tryoutTypeService.subtopics$.subscribe((res) => {
            this.subtopics$ = res;
        });
    }

    ngAfterViewInit() {
        this.inputTopicIds = this.tryoutTopics.map((topic) => topic.id);
        this.inputSubtopicIds = this.tryoutSubtopics.map((subtopic) => subtopic.id);
    }

    get tryoutModules() {
        let data = this.moduleTyouts$;
        if (this.inputTypeTryoutIds.length >= 1) {
            data = this.moduleTyouts$.filter((item) => {
                return this.inputTypeTryoutIds.includes(item.id_type);
            });
        } else {
            return [];
        }
        return uniqBy(data, 'code');
    }

    get tryoutTopics() {
        let data = this.topics$;
        if (this.inputTypeTryoutIds.length >= 1) {
            data = this.topics$.filter((item) => {
                return this.inputTypeTryoutIds.includes(item.id_type);
            });
        } else {
            return [];
        }
        return data;
    }

    get tryoutSubtopics() {
        let data = this.subtopics$;
        if (this.inputTopicIds.length >= 1) {
            data = this.subtopics$.filter((item) => {
                return this.inputTopicIds.includes(item.id_topic);
            });
        } else {
            return [];
        }
        return data;
    }

    /**
     * check type tryout
     * @param id
     * @returns
     */
    inputCheckTypeTryout(id) {
        return this.inputTypeTryoutIds.includes(id)??false;
    }
    /**
     * check topics
     * @param id
     */
    inputCheckTopics(id) {
        return this.inputTopicIds.includes(id)??false;
    }

    inputCheckSubtopics(id) {
        return this.inputSubtopicIds.includes(id)??false;
    }
    /**
     * Handle change tryout
     * @param e
     */
    handleChangeType(e) {
        if (e.checked == true) {
            this.inputTypeTryoutIds.push(e.value);
        } else {
            const index = this.inputTypeTryoutIds.indexOf(e.value);
            this.inputTypeTryoutIds.splice(index, 1);
        }
    }

    handleChangeTopic(e) {
        if (e.checked == true) {
            this.inputTopicIds.push(e.value);
        } else {
            const index = this.inputTopicIds.indexOf(e.value);
            this.inputTopicIds.splice(index, 1);
        }
    }

    handleChangeSubtopic(e) {
        if (e.checked == true) {
            this.inputSubtopicIds.push(e.value);
        } else {
            const index = this.inputSubtopicIds.indexOf(e.value);
            this.inputSubtopicIds.splice(index, 1);
        }
    }

    /**Submit Form to API
     * @param f
     */
    submitForm(f: NgForm) {
        const form = f.value;
        const data = {
            data: form,
            questionIds: this.questionIds,
            scheduleTypes: this.inputTypeTryoutIds
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
            if (this.inputSubtopicIds.length >= 1) {
                return (
                    item.category_id === 'tryout' &&
                    this.inputSubtopicIds.includes(item.tryout_subtopic_id)
                );
            }
            if (this.inputTypeTryoutIds.length >= 1) {
                return (
                    item.category_id === 'tryout' &&
                    this.inputTypeTryoutIds.includes(item.tryout_type_id)
                );
            }
            return item.category_id === 'tryout';
        });
    }

    changeTryoutType(id_type) {
        const module = this.tryoutTypes.find((item) => item.id === id_type);
        if (module) {
            // this.tryoutModules = module.type_modul;
        }
    }

    changeTryoutModule(id_module) {
        const module = this.tryoutModules.find((item) => item.id === id_module);
        if (module) {
            // this.tryoutTopics = module.topic;
        }
    }

    changeTryoutTopic(id) {
        // const module = this.tryoutTopics.find((item) => item.id === id);
        // if (module) {
        //     this.tryoutSubtopics = module.subtopic;
        // }
    }

    onPreview(status): void {
        this.isPreview = status;
    }
    changeFilterVisible(): void {
        if(this.isFilter==true){
            this.isFilter = false;
        }else{
            this.isFilter = true;
        }
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
    }

    isQuestionCheck(id) {
        return this.questionIds.includes(id);
    }
}
