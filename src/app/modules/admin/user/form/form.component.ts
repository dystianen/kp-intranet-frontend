import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { User } from '../user.types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _service: UserService, public dialogRef: MatDialogRef<any>) { }

  formApp = new FormGroup({
    name: new FormControl(''),
    email: new FormControl({ value: '', disabled: this.data.formType === 'edit' }),
    phone: new FormControl(''),
    password: new FormControl({ value: '', required: this.data.formType === 'add' })
  });

  ID: number

  public formAttribute: any;

  ngOnInit(): void {
    const _this = this;
    this.formAttribute = this.data
    if (this.data.formType == 'edit') {

      if (this._service.user$) {
        this._service.user$.subscribe(function (data: User) {
          _this.ID = data.id;
          _this.formApp.setValue({
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: ''
          });
        })
      }
    }
  }

  submitForm(f: NgForm) {
    const _this = this;
    if (!f.valid) {
      return;
    }
    const form = f.value;

    if (this.data.formType == 'add') {
      this._service.createUser(form).subscribe(function (data) {
        if (data) {
          _this.dialogRef.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Admin Account has created',
            icon: 'success'
          })
          _this._service.getUsers().subscribe();
        }
      });
    }
    if (this.data.formType == 'edit') {
      let id = _this.ID;
      this._service.updateUser(id, form).subscribe(function (data) {
        if (data) {
          _this.dialogRef.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Sites has updated',
            icon: 'success'
          })
          _this._service.getUsers().subscribe();
        }
      });
    }
  }

}
