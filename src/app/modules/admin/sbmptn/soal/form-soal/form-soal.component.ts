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

  ngOnInit(): void {

    /**
     * Initial form
     */
    this.form = this.formBuilder.group({
      title: '',
      content: '',
      mapel_id: this.dialogData.mapel.id
    })

    this._soalService._jawabans.subscribe((item) => {
      this.jawaban = item;
    })


    /**
     * Fetch data by id from API
     */
    if (this.dialogData.type == 'edit') {
      this._soalService.getSoal(this.dialogData.id).subscribe((res) => {
        this.form.patchValue(res);
      })
    }
  }

  /**Submit Form to API
   * @param f 
   */
  submitForm(f: NgForm) {

    console.log('soal : ', f.value);
    console.log('jawaban : ', this.jawaban);
    // /**
    //  * Add new Destination
    //  */
    // if (this.dialogData.type == 'add') {
    //   this._soalService.createSoal(f.value).subscribe((res) => {
    //     this._soalService.getSoals(this.dialogData.mapel.uuid).subscribe();
    //     this.dialogRef.close();
    //   });
    // }

    // /**
    //  * Update data
    //  */
    // if (this.dialogData.type == 'edit') {
    //   this._soalService.updateSoal(this.dialogData.id, f.value).subscribe((res) => {
    //     this._soalService.getSoals(this.dialogData.mapel.uuid).subscribe();
    //     this.dialogRef.close();
    //   });
    // }
  }

}
