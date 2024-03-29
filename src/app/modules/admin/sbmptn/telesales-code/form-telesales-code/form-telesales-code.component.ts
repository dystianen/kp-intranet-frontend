import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TelesalesCodeService } from '../telesales-code.service';

@Component({
    selector: 'app-form-telesales-code',
    templateUrl: './form-telesales-code.component.html',
    styleUrls: ['./form-telesales-code.component.scss'],
})
export class FormTelesalesCodeComponent implements OnInit {
    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<any>,
        private _teleSalesCodeService: TelesalesCodeService
    ) {}

    form: FormGroup;
    categories :any[]=[{
      code:'ptn',
      name:'PTN'
    },
    {
      code:'ptn_plus',
      name:'PTN Plus'
    }]

    ngOnInit(): void {
        /**
         * Initial form
         */
        this.form = this.formBuilder.group({
            code: '',
            package_category: '',
            // day: '',
            discount_amount: '',
            final_price: '',
            status: true,
        });

        /**
         * Fetch data by id from API
         */
        // if (this.dialogData.type == 'edit') {
        //   this._babService.getBab(this.dialogData.id).subscribe((res) => {
        //     this.form.patchValue(res);
        //   })
        // }
    }

    /**Submit Form to API
     * @param f
     */
    submitForm(f: NgForm) {
        /**
         * Add new Destination
         */
        if (this.dialogData.type == 'add') {
            this._teleSalesCodeService
                .createTelesalesCode(f.value)
                .subscribe((res) => {
                    this._teleSalesCodeService.getTelesalesCodes().subscribe();
                    this.dialogRef.close();
                });
        }

        /**
         * Update data
         */
        // if (this.dialogData.type == 'edit') {
        //   this._babService.updateBab(this.dialogData.id, f.value).subscribe((res) => {
        //     this._babService.getBabs(this.dialogData.mapel.uuid).subscribe();
        //     this.dialogRef.close();
        //   });
        // }
    }
}
