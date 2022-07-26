import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductVariant } from 'app/model/product-variant.model';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, toArray } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SupplierService } from '../../supplier/supplier.service';
import { Suppliers } from '../../supplier/suppliers.types';
import { ProductType, ProductTypeFactory } from '../product-type-factory';
import { ProductVariantService } from '../product-variant.service';
import { ProductService } from '../product.service';
import { Product } from '../product.types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  protected Id: number;
  formAttribute: any;
  suppliers: Suppliers[]
  thumbnailPreview: any = ""
  uploadFile: File;
  imgPreview: string = ""
  variants$: Observable<ProductVariant[]>
  productType: ProductType


  formApp = new FormGroup({
    name: new FormControl(''),
    sku: new FormControl(''),
    barcode: new FormControl(''),
    description: new FormControl(''),
    sortDescription: new FormControl(''),
    additionalInfo: new FormControl(''),
    priceDefault: new FormControl(''),
    buyPricePerUnit: new FormControl(''),
    supplierId: new FormControl(''),
    thumbnail: new FormControl(''),
    product_variant_id: new FormControl('')
  });

  private _unsubscribeAll: Subject<any> = new Subject<any>()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private _changeDetectorRef: ChangeDetectorRef,
    private _service: ProductService,
    private _supplierService: SupplierService,
    private vartiantService: ProductVariantService,
    private router : Router
  ) { }

  ngOnInit(): void {
    const _this = this;
    this.formAttribute = this.data;

    const productTypeFactory = new ProductTypeFactory(this.router.url);
    this.productType = productTypeFactory.getType();

    this._supplierService.suppliers$.pipe(takeUntil(this._unsubscribeAll))
      .subscribe((suppliers: Suppliers[]) => {
        this.suppliers = suppliers;
        this._changeDetectorRef.markForCheck()
      });

      if(this.router.url=='/product'){
        this.variants$ = this.vartiantService.$productVariants.pipe(map((item)=>{return item.filter((data)=>data.id!=='bundling')}));
      }else{
        this.variants$ = this.vartiantService.$productVariants.pipe(map((item)=>{return item.filter((data)=>data.id=='bundling')}));
      }
    

    if (this.data.formType == 'edit') {
      if (this._service.products$) {
        this._service.product$.subscribe(function (data: Product) {
          _this.Id = data.id;
          _this.formApp.patchValue(data);
          if (data.thumbnailPath) {
            _this.imgPreview = data.thumbnailPath;
          }
        })
      }
    }

  }

  changeImageUpload(uploadFile: File) {
    this.uploadFile = uploadFile;
  }

  onChangeThumbnail(e) {
    const thumbnailPreview = document.getElementById("thumbnailPreview") as HTMLImageElement;
    const file = e.target.files[0];
    if (file) {
      thumbnailPreview.src = URL.createObjectURL(file);
    }
  }
  setDescription(description) {
    this.formApp.patchValue({ description: description });
  }
  setAdditionalInfo(additionalInfo) {
    this.formApp.patchValue({ additionalInfo: additionalInfo });
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
    const formData = new FormData(<HTMLFormElement>document.getElementById('formApp'));
    formData.append('supplierId', form.supplierId);
    formData.append('description', form.description);
    formData.append('additionalInfo', form.additionalInfo);
    formData.append('product_variant_id', form.product_variant_id);


    if (this.data.formType == 'add') {
      this._service.createProduct(formData).subscribe(function (data) {
        if (data) {
          _this.dialogRef.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Product has created',
            icon: 'success'
          })
          _this._service.getProducts(_this.productType.type).subscribe();
        }
      });
    }
    if (this.data.formType == 'edit') {
      let id = _this.Id;
      this._service.updateProduct(id, formData).subscribe(function (data) {
        if (data) {
          _this.dialogRef.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Product has updated',
            icon: 'success'
          })
          _this._service.getProducts(_this.productType.type).subscribe();
        }
      });
    }
  }

}
