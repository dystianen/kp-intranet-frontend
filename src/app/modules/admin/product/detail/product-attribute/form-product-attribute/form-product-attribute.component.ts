import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { AttributeModel } from 'app/model/attribute.model';
import { ProductAttributeState } from 'app/store/product/attribute/product-attribute.state';
import { Observable } from 'rxjs';
import { ProductHasAttributeService } from '../product-attribute.service';


@Component({
  selector: 'app-form-product-attribute',
  templateUrl: './form-product-attribute.component.html',
  styleUrls: ['./form-product-attribute.component.scss']
})
export class FormProductAttributeComponent implements OnInit {

  formApp: FormGroup;

  @Select(ProductAttributeState.getAttributeList) attributes$: Observable<AttributeModel[]>;

  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, private service: ProductHasAttributeService) { }

  ngOnInit(): void {
    const formControl = {
      productAttributeId: '',
      value: ''
    }

    this.formApp = this.formBuilder.group(formControl);
  }

  submitForm(f: NgForm) {
    const _this = this;
    if (!f.valid) {
      return;
    }
    const formData = { ...f.value, productId: this.data.productId };
    this.service.addProductAttribute(formData).subscribe((res) => {
      _this.service.getProductAttribute(_this.data.productId).subscribe()
      _this.dialogRef.close();
    })
  }

}
