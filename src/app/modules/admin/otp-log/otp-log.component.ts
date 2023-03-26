import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { identity, isNil, omitBy, pick, pickBy } from 'lodash';
import { Observable } from 'rxjs';
import { OtpService } from '../otp/otp.service';

@Component({
    selector: 'app-otp-log',
    templateUrl: './otp-log.component.html',
    styleUrls: ['./otp-log.component.scss'],
})
export class OtpLogComponent implements OnInit {
    form: FormGroup;

    logs: [] = [];

    constructor(
        private formBuilder: FormBuilder,
        private _otpService: OtpService
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            otp: '',
            phone: '',
            tag: '',
            message_id: '',
        });
    }

    submitForm(f: NgForm) {
        const data = pickBy(f.value, identity);
        this._otpService.fingLogs(data).subscribe((res) => {
            this.logs = res;
        });
    }
}
