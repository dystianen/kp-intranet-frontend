import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-form-schedule',
    templateUrl: './form-schedule.component.html',
    styleUrls: ['./form-schedule.component.scss'],
})
export class FormScheduleComponent implements OnInit {
    form: FormGroup;
    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
    });

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
    ) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            package_id: ''
        });
    }
}
