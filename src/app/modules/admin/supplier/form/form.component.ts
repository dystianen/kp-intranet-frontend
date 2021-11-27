import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formProduct = new FormGroup({
    supplierName: new FormControl(''),
    supplierCode: new FormControl(''),
    address: new FormControl(''),
    description: new FormControl('')
  });

  public formAttribute: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef : MatDialogRef<any>, private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.formAttribute = this.data;
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
    this.supplierService.createSupplier(form).subscribe(function (data) {
      if (data.statusCode == 200) {
        _this.dialogRef.close()
      }
    });
  }


}
