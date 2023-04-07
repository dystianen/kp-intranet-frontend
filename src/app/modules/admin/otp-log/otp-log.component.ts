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
    isLoading: boolean = false;

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

    deleteLogs(f: NgForm) {
        this.isLoading = true;
        const data = pickBy(f.value, identity);
        this._otpService.deleteLogs(data).subscribe((res) => {
            this.logs = [];
            this.isLoading = false;
        });
    }

    submitForm(f: NgForm) {
        this.isLoading = true;
        const data = pickBy(f.value, identity);
        this._otpService.fingLogs(data).subscribe((res) => {
            this.logs = res;
            this.isLoading = false;
        });
    }
}
