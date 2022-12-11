import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BabService } from '../bab.service';

@Component({
  selector: 'app-form-bab',
  templateUrl: './form-bab.component.html',
  styleUrls: ['./form-bab.component.scss']
})
export class FormBabComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<any>, private _babService: BabService) { }

  form: FormGroup;

  ngOnInit(): void {

    /**
     * Initial form
     */
    this.form = this.formBuilder.group({
      bab_name: '',
      mapel_id: this.dialogData.mapel.id,
      description: '',
    })


    /**
     * Fetch data by id from API
     */
    if (this.dialogData.type == 'edit') {
      this._babService.getBab(this.dialogData.id).subscribe((res) => {
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
    if (this.dialogData.type == 'add') {
      this._babService.createBab(f.value).subscribe((res) => {
        this._babService.getBabs(this.dialogData.mapel.uuid).subscribe();
        this.dialogRef.close();
      });
    }

    /**
     * Update data
     */
    if (this.dialogData.type == 'edit') {
      this._babService.updateBab(this.dialogData.id, f.value).subscribe((res) => {
        this._babService.getBabs(this.dialogData.mapel.uuid).subscribe();
        this.dialogRef.close();
      });
    }
  }

}
