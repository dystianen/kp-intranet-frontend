import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { identity, pickBy } from 'lodash';
import { ResetUjianService } from './reset-ujian.service';
import * as moment from 'moment-timezone';

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
            email: '',
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

    formatDate(d:string) {
        if(d){
            return new Date(d).toLocaleString('id-ID',{ timeZone: 'UTC' });
        }
        return "-";
        // const dd = new Date(d);
        // const day = dd.getDate()<10?'0'+(dd.getDate()-1):(dd.getDate()-1);
        // const month = dd.getMonth()<10?'0'+(dd.getMonth()+1):(dd.getMonth()+1);
        // return `${day}/${month}/${ moment(d).tz('Asia/Jakarta').format('Y H:s')}`;
    }
}
