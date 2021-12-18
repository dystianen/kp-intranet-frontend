import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RoleService } from '../../role/role.service';
import { RoleService as RoleService2 } from './role.service';
import { Role } from '../../role/role.types';
import Swal from 'sweetalert2';
import * as _ from 'lodash';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  public formAttribute: any;

  formApp: FormGroup
  roles$: any
  selectedUserId: number;
  userHasRole: []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _roleService: RoleService, private _roleService2: RoleService2, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {


    const _this = this;
    this.formAttribute = this.data;

    this._roleService.roles$.subscribe(function (data: []) {
      _this.roles$ = data;
    })
    const controls = this.roles$.map(c => new FormControl(false));

    if (this.data.selectedUserId) {
      this.selectedUserId = this.data.selectedUserId;
      this._roleService2.getRoleByUser(this.data.selectedUserId).subscribe(function (userRole: any) {
        _this.userHasRole = userRole;
        _this.userHasRole.forEach(function (_userHasRole: any) {
          const indexSelected = _.findIndex(_this.roles$, function (o: any) {
            return o.id == _userHasRole.id
          })
          controls[indexSelected].setValue(true);
        })
      })
    }

    // controls[0].setValue(true);
    this.formApp = this.formBuilder.group({
      roles: new FormArray(controls)
    })

  }

  get rolesFormArray() {
    return this.formApp.controls.roles as FormArray;
  }

  changeRole(roleId, value) {
    const _this = this;
    this._roleService2.updateRole(this.selectedUserId, roleId).subscribe(function (data) {
      // _this.dialogRef.close()
      Swal.fire({
        title: 'Sucess',
        text: 'Role has updated',
        icon: 'success'
      })
    });
    // console.log(this.selectedUserId,roleId);
  }

  submitForm(f: NgForm) {
    const selectedOrderIds = this.formApp.value.roles
      .map((v, i) => (v ? this.roles$[i].id : null))
      .filter((v) => v !== null);
    console.log(selectedOrderIds);
  }

}
