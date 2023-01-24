import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { findIndex } from 'lodash';
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
  jawabans: any[] = [];
  activeKey: string = "";


  ngOnInit(): void {

    this._soalService.jawabans$.subscribe((res) => {
      this.jawabans = res;
    })

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
      this.activeKey = this.dialogData.data.key ?? "";
      this.form.patchValue(this.dialogData.data);
    }
  }

  get keys$() {
    const _this = this;
    if (this.jawabans.length > 0) {
      return this.keys.filter((item) => {
        const keyData = _this.jawabans.map((item2) => {
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
    if (this.dialogData.type == 'add' && this.dialogRef.id === 'formJawaban') {
      this.jawabans.push({ ...f.value, is_true: false });
      this._soalService._jawabans.next(this.jawabans);
      this.dialogRef.close();
      this.activeKey = "";
    }

    /**
     * Update data
     */
    if (this.dialogData.type == 'edit' && this.dialogRef.id === 'formJawaban') {
      const jawabanIndex = findIndex(this.jawabans, ((item) => {
        return item.key === this.activeKey;
      }))
      this.jawabans[jawabanIndex]["content"] = f.value.content;
      this._soalService._jawabans.next(this.jawabans);
      this.activeKey = "";
      this.dialogRef.close();
    }
  }


}
