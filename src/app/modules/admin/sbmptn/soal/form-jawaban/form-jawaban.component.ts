import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SoalService } from '../soal.service';

@Component({
  selector: 'form-jawaban',
  templateUrl: './form-jawaban.component.html',
  styleUrls: ['./form-jawaban.component.scss']
})
export class FormJawabanComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<any>, private _soalService: SoalService) { }

  form: FormGroup;

  content: string = "";
  keys: any = [];


  ngOnInit(): void {

    /**
     * Initial form
     */
    this.form = this.formBuilder.group({
      key: '',
      content: ''
    })

    this._soalService._keys.subscribe((item) => {
      this.keys = item;
    })

    /**
     * Fetch data by id from API
     */
    if (this.dialogData.type == 'edit') {
      // this._soalService.getSoal(this.dialogData.id).subscribe((res) => {
      //   this.form.patchValue(res);
      // })
    }
  }

  get keys$() {
    const _this = this;
    if (this._soalService.jawabans.length > 0) {
      return this.keys.filter((item) => {
        const keyData = _this._soalService.jawabans.map((item2) => {
          return item2.key;
        });
        return !keyData.includes(item);
      })
    }
    return this.keys;
  }

  /**Submit Form to API
   * @param f 
   */
  submitForm(f: NgForm) {

    /**
     * Add new Destination
     */
    if (this.dialogData.type == 'add') {
      this._soalService.jawabans.push({ ...f.value, is_true: false });
      this._soalService._jawabans.next(this._soalService.jawabans);
    }

    /**
     * Update data
     */
    if (this.dialogData.type == 'edit') {

    }
  }


}
