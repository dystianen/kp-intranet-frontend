import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZoomVbService } from '../zoom-vb.service';

@Component({
  selector: 'app-form-zoom-vb',
  templateUrl: './form-zoom-vb.component.html',
  styleUrls: ['./form-zoom-vb.component.scss']
})
export class FormZoomVbComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<any>, private _zoomVbService: ZoomVbService) { }

  form: FormGroup;
  imgPreview: string = "";
  uploadFile: File;

  ngOnInit(): void {

    /**
     * Initial form
     */
    this.form = this.formBuilder.group({
      title: '',
      description: '',
    })


    /**
     * Fetch data by id from API
     */
    if (this.dialogData.type == 'edit') {
      this._zoomVbService.getZoomVb(this.dialogData.id).subscribe((res) => {
        this.form.patchValue(res);
      })
    }
  }

  changeImageUpload(uploadFile: File) {
    this.uploadFile = uploadFile;
  }

  /**Submit Form to API
   * @param f 
   */
  submitForm(f: NgForm) {

    if (!f.valid) {
      return;
    }
    const form = f.value;
    const formData = new FormData(<HTMLFormElement>document.getElementById('formApp'));
    formData.append('title', form.title);
    formData.append('description', form.description);

    /**
     * Add new Destination
     */
    if (this.dialogData.type == 'add') {
      this._zoomVbService.createZoomVb(formData).subscribe((res) => {
        this._zoomVbService.getZoomVbs().subscribe();
        this.dialogRef.close();
      });
    }

    /**
     * Update data
     */
    if (this.dialogData.type == 'edit') {
      this._zoomVbService.updateZoomVb(this.dialogData.id, formData).subscribe((res) => {
        this._zoomVbService.getZoomVbs().subscribe();
        this.dialogRef.close();
      });
    }
  }


}
