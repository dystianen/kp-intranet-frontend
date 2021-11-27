import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.formAttribute = this.data;
  }

  /**
   * submit form
   * @param f 
   * @returns 
   */
  submitForm(f: NgForm) {
    if (!f.valid) {
      return;
    }
    const form = f.value;
    const create = this.supplierService.createSupplier(form);
    create.subscribe(function (data) {
      console.log(data);
    });
  }


}
