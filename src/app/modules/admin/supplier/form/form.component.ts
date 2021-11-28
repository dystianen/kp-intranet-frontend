import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupplierService } from '../supplier.service';
import { Suppliers } from '../suppliers.types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formProduct = new FormGroup({
    id: new FormControl(''),
    supplierName: new FormControl(''),
    supplierCode: new FormControl(''),
    address: new FormControl(''),
    description: new FormControl('')
  });

  public formAttribute: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>, private _supplierService: SupplierService) { }

  ngOnInit(): void {
    const _this = this;
    this.formAttribute = this.data;
    if (this.data.formType == 'edit') {
      if (this._supplierService.supplier$) {
        this._supplierService.supplier$.subscribe(function (data: Suppliers) {
          _this.formProduct.setValue({
            id: data.id,
            supplierName: data.supplierName,
            supplierCode: data.supplierCode,
            address: data.address,
            description: data.description
          });
        })
      }
    }
    if (this.data.formType == 'delete') {
      if (this._supplierService.supplier$) {
        this._supplierService.supplier$.subscribe(function (data: Suppliers) {
          console.log(data);
          _this.formProduct.setValue({
            id: data.id,
            supplierName: data.supplierName,
            supplierCode: data.supplierCode,
            address: data.address,
            description: data.description
          });
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
      this._supplierService.createSupplier(form).subscribe(function (data) {
        if (data.statusCode == 200) {
          _this.dialogRef.close()
        }
      });
    }
    if (this.data.formType == 'edit') {
      let id = form.id;
      this._supplierService.updateSupplier(id, form).subscribe(function (data) {
        if (data) {
          _this.dialogRef.close()
          _this._supplierService.getSuppliers().subscribe();
        }
      });
    }
  }


}
