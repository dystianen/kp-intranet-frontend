import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    formApp = new FormGroup({
        holiday: new FormControl(),
        description: new FormControl()
    });
    isHoliday: true;
    description: '';
    formAttribute = {
        formTitle: 'Buat Wording Tanya'
    };

    constructor() {
    }

    ngOnInit(): void {
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    submitForm(data: any) {
        console.log(data);
    }
}
