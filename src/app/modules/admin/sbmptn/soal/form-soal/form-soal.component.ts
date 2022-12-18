import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SoalService } from '../soal.service';

@Component({
  selector: 'app-form-soal',
  templateUrl: './form-soal.component.html',
  styleUrls: ['./form-soal.component.scss']
})
export class FormSoalComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<any>, private _soalService: SoalService) { }

  form: FormGroup;

  jawaban: any = []
  jawabansDeleted = [];
  dlg: any;

  ngOnInit(): void {

    this.dlg = { ...this.dialogData }

    this._soalService.jawabansDeleted$.subscribe((item) => {
      this.jawabansDeleted = item;
    })

    /**
     * Initial form
     */
    this.form = this.formBuilder.group({
      title: '',
      content: '',
      pembahasan: '',
      mapel_id: this.dlg.mapel.id
    })

    this._soalService._jawabans.subscribe((item) => {
      this.jawaban = item;
    })


    /**
     * Fetch data by id from API
     */
    if (this.dlg.type == 'editSoal') {
      this._soalService.getSoal(this.dialogData.id).subscribe((res) => {
        this.form.patchValue(res);
      })
    }
  }

  /**Submit Form to API
   * @param f 
   */
  submitForm(f: NgForm) {

    /**
     * Add new Destination
     */
    if (this.dlg.type == 'addSoal') {
      const data = {
        ...f.value, jawaban: {
          createMany: {
            data: this.jawaban
          }
        }
      };
      this._soalService.createSoal(data).subscribe((res) => {
        this._soalService.getSoals(this.dialogData.mapel.uuid).subscribe();
        this.dialogRef.close();
      });
    }

    /**
     * Update data
     */
    if (this.dlg.type === 'editSoal') {
      const delete_jawaban = this.jawabansDeleted.map((item) => {
        return item.key;
      });
      const data = {
        soal: f.value,
        jawaban: this.jawaban,
        delete_jawaban: delete_jawaban ?? []
      }
      this._soalService.updateSoal(this.dialogData.id, data).subscribe((res) => {
        this._soalService.getSoals(this.dialogData.mapel.uuid).subscribe();
        this.dialogRef.close();
      });
    }
  }

}
