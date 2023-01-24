import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-form-setting',
  templateUrl: './form-setting.component.html',
  styleUrls: ['./form-setting.component.scss']
})
export class FormSettingComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<any>, private _settingService: SettingService) { }

  form: FormGroup;

  ngOnInit(): void {

    /**
     * Initial form
     */
    this.form = this.formBuilder.group({
      key: '',
      value: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      description: '',
    })

    /**
     * Fetch data by id from API
     */
    if (this.dialogData.type == 'edit') {
      this._settingService.getSetting(this.dialogData.id).subscribe((res) => {
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
      this._settingService.createSetting(f.value).subscribe((res) => {
        this.dialogRef.close();
      });
    }

    /**
     * Update data
     */
    if (this.dialogData.type == 'edit') {
      this._settingService.updateSetting(this.dialogData.id, f.value).subscribe((res) => {
        this.dialogRef.close();
      });
    }
  }
}
