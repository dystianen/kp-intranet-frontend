import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
    selector: 'app-zoom-end-meeting',
    templateUrl: './zoom-end-meeting.component.html',
    styleUrls: ['./zoom-end-meeting.component.scss'],
})
export class ZoomEndMeetingComponent implements OnInit {
    constructor(private formBuilder: FormBuilder) {}

    form: FormGroup;

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            meeting_number: '',
        });
    }

    submitForm(f: NgForm) {

    }

}
