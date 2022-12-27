import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

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
    url: 'https://docs.google.com/document/d/1xkoJ9y0GoQ6Uguy7hyFq1ahlChcG95AJJC6tT64Q60w/edit?usp=share_link';

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    submitForm(data: any) {
        console.log(data);
    }

    selectFile(event: any): void {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event: any) => {
                this.url = event.target.result;
            };
        }
    }
}
