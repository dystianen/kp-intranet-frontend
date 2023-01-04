import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { PackageService } from '../../package/package.service';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';

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

    myDatePicker: any = '';

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

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private _packageService: PackageService
    ) {}

    ngOnInit() {
        this.date = new Date(2021, 9, 4, 5, 6, 7);
        this.form = this.formBuilder.group({
            package_id: '',
        });

        this._packageService.tryoutPackages$.subscribe((item) => {
            this.packages = item;
        });
    }

    toggleMinDate(evt: any) {
        if (evt.checked) {
            this._setMinDate();
        } else {
            this.minDate = null;
        }
    }

    toggleMaxDate(evt: any) {
        if (evt.checked) {
            this._setMaxDate();
        } else {
            this.maxDate = null;
        }
    }

    closePicker() {
        this.picker.cancel();
    }

    private _setMinDate() {
        const now = new Date();
        // this.minDate = new Date();
        // this.minDate.setDate(now.getDate() - 1);
    }

    private _setMaxDate() {
        const now = new Date();
        // this.maxDate = new Date();
        // this.maxDate.setDate(now.getDate() + 1);
    }
}
