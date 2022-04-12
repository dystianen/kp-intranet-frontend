import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttributeModel } from 'app/model/attribute.model';
import Swal from 'sweetalert2';
import { AttributeService } from '../attribute.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  protected Id;
  public formAttribute: any;

  formApp = new FormGroup({
    attribute: new FormControl(''),
    attributeCode: new FormControl(''),
    description: new FormControl(''),
    unit: new FormControl(''),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>, private _service: AttributeService) { }

  ngOnInit(): void {
    const _this = this;
    this.formAttribute = this.data;

    if (this.data.formType == 'edit') {
      if (this._service.attributes$) {
        this._service.attribute$.subscribe(function (data: AttributeModel) {
          _this.Id = data.id;
          _this.formApp.patchValue(data);
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

    if (this.data.formType == 'add') {
      this._service.createAttribute(form).subscribe(function (data) {
        if (data) {
          _this.dialogRef.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Sites has created',
            icon: 'success'
          })
          _this._service.getAttributes().subscribe();
        }
      });
    }
    if (this.data.formType == 'edit') {
      let id = _this.Id;
      this._service.updateAttribute(id, form).subscribe(function (data) {
        if (data) {
          _this.dialogRef.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Sites has updated',
            icon: 'success'
          })
          _this._service.getAttributes().subscribe();
        }
      });
    }
  }

}
