import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SiteService } from '../site.service';
import { Site } from '../site.types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formSite = new FormGroup({
    siteName: new FormControl(''),
    siteCode: new FormControl(''),
    siteType: new FormControl(''),
    description: new FormControl(''),
    contact: new FormControl(''),
  });

  logoPreview: string = ""

  idSite: number;

  public formAttribute: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>, private _siteService: SiteService) { }

  ngOnInit(): void {
    const _this = this;
    this.formAttribute = this.data;
    if (this.data.formType == 'edit') {
      if (this._siteService.sites$) {
        this._siteService.site$.subscribe(function (data: Site) {
          _this.idSite = data.id;
          _this.formSite.patchValue(data);
        })
      }
    }

  }

  /**
   * submit form
   * @param f 
   * @returns 
   */
  submitForm(f: NgForm) {
    const _this = this;
    if (!f.valid) {
      return;
    }
    const form = f.value;
    const formData = new FormData(<HTMLFormElement>document.getElementById('formSite'));

    if (this.data.formType == 'add') {
      this._siteService.createSite(formData).subscribe(function (data) {
        if (data) {
          _this.dialogRef.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Sites has created',
            icon: 'success'
          })
          _this._siteService.getSites().subscribe();
        }
      });
    }
    if (this.data.formType == 'edit') {
      let id = _this.idSite;
      this._siteService.updateSite(id, formData).subscribe(function (data) {
        if (data) {
          _this.dialogRef.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Sites has updated',
            icon: 'success'
          })
          _this._siteService.getSites().subscribe();
        }
      });
    }
  }

  changeImageUpload(e){
    
  }


}
