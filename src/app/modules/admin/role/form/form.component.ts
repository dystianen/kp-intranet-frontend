import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { RoleService } from '../role.service';
import { Role } from '../role.types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formApp = new FormGroup({
    roleName: new FormControl(),
    description: new FormControl()
  })

  public formAttribute: any

  ID: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _service: RoleService, public dialog: MatDialogRef<any>) { }

  ngOnInit(): void {
    const _this = this;

    this.formAttribute = this.data;

    if (this.data.formType == 'edit') {
      if (this._service.roles$) {
        this._service.role$.subscribe(function (data: Role) {
          _this.ID = data.id;
          _this.formApp.setValue({
            roleName: data.roleName,
            description: data.description
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
      this._service.createRole(form).subscribe(function (data) {
        if (data) {
          _this.dialog.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Role has created',
            icon: 'success'
          })
          _this._service.getRoles().subscribe();
        }
      });
    }

    if (this.data.formType == 'edit') {
      let id = _this.ID;
      this._service.updateRole(id, form).subscribe(function (data) {
        if (data) {
          _this.dialog.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Role has updated',
            icon: 'success'
          })
          _this._service.getRoles().subscribe();
        }
      });
    }

  }
}
