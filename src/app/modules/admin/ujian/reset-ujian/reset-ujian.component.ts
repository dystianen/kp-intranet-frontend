import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { identity, pickBy } from 'lodash';
import { ResetUjianService } from './reset-ujian.service';

@Component({
    selector: 'app-reset-ujian',
    templateUrl: './reset-ujian.component.html',
    styleUrls: ['./reset-ujian.component.scss'],
})
export class ResetUjianComponent implements OnInit {
    form: FormGroup;
    isLoading: boolean = false;

    ujians: [] = [];

    constructor(
        private formBuilder: FormBuilder,
        private _resetUjianService: ResetUjianService
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: ''
        });
    }

    findData(f: NgForm) {
        if (!f.valid) {
            return;
        }
        this.isLoading = true;
        const data = pickBy(f.value, identity);
        this._resetUjianService.findUjian(data).subscribe((res) => {
            console.log('abc', res);
            this.ujians = res;
            this.isLoading = false;
        });
    }

    resetData(student_id: number, assign_auto_id: number) {
        this.isLoading = true;
        this._resetUjianService
            .resetUjian({ student_id, assign_auto_id })
            .subscribe((res) => {
                const form: any = this.form;
                this.findData(form);
                this.ujians = res;
                this.isLoading = false;
            });
    }
}
