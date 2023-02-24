import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { OtpService } from './otp.service';

@Component({
    selector: 'app-otp',
    templateUrl: './otp.component.html',
    styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        private _otpService: OtpService
    ) {}

    form: FormGroup;

    providers = ['SANDEZA', 'TAPTALK'];

    otp: any;

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            isOn: false,
            provider: '',
        });

        this._otpService.otp$.subscribe((res) => {
          console.log(res)
            this.form.patchValue(res)
        });
    }

    submitForm(f: NgForm) {
        this._otpService.updateOtp(f.value).subscribe(()=>{

        })
    }
}
