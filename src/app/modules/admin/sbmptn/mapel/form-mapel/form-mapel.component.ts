import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ModuleService } from '../../module/module.service';
import { MapelService } from '../mapel.service';

@Component({
  selector: 'app-form-mapel',
  templateUrl: './form-mapel.component.html',
  styleUrls: ['./form-mapel.component.scss']
})
export class FormMapelComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<any>, private _mapelService: MapelService, private _moduleService: ModuleService) { }

  form: FormGroup;
  modules$: Observable<any[]>

  ngOnInit(): void {

    /**
     * Initial form
     */
    this.form = this.formBuilder.group({
      mapel_name: '',
      module_id: '',
      description: '',
    })

    this.modules$ = this._moduleService.modules$;

    /**
     * Fetch data by id from API
     */
    if (this.dialogData.type == 'edit') {
      this._mapelService.getMapel(this.dialogData.id).subscribe((res) => {
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
      this._mapelService.createMapel(f.value).subscribe((res) => {
        this.dialogRef.close();
      });
    }

    /**
     * Update data
     */
    if (this.dialogData.type == 'edit') {
      this._mapelService.updateMapel(this.dialogData.id, f.value).subscribe((res) => {
        this.dialogRef.close();
      });
    }
  }

}
