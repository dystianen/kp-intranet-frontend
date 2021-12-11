import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourierService } from '../courier.service';
import Swal from 'sweetalert2';
import { Courier } from '../courier.types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formApp = new FormGroup({
    courierName: new FormControl(),
    courierPhone: new FormControl(),
    courierAddress: new FormControl(),
  })

  public formAttribute: any

  ID: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _service: CourierService, public dialog: MatDialogRef<any>) { }

  ngOnInit(): void {
    const _this = this;

    this.formAttribute = this.data;

    if (this.data.formType == 'edit') {
      if (this._service.couriers$) {
        this._service.courier$.subscribe(function (data: Courier) {
          _this.ID = data.id;
          _this.formApp.setValue({
            courierName: data.courierName,
            courierPhone: data.courierPhone,
            courierAddress: data.courierAddress
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
      this._service.createCourier(form).subscribe(function (data) {
        if (data) {
          _this.dialog.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Courier has created',
            icon: 'success'
          })
          _this._service.getCouriers().subscribe();
        }
      });
    }

    if (this.data.formType == 'edit') {
      let id = _this.ID;
      this._service.updateCourier(id, form).subscribe(function (data) {
        if (data) {
          _this.dialog.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Sites has updated',
            icon: 'success'
          })
          _this._service.getCouriers().subscribe();
        }
      });
    }

  }

}
