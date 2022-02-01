import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SupplierService } from '../../supplier/supplier.service';
import { Suppliers } from '../../supplier/suppliers.types';
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


  formApp = new FormGroup({
    productName: new FormControl(''),
    productSku: new FormControl(''),
    productBarcode: new FormControl(''),
    productDescription: new FormControl(''),
    priceDefault: new FormControl(''),
    buyPricePerUnit: new FormControl(''),
    supplierId: new FormControl(''),
    thumbnail: new FormControl('')
  });

  private _unsubscribeAll: Subject<any> = new Subject<any>()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private _changeDetectorRef: ChangeDetectorRef,
    private _service: ProductService,
    private _supplierService: SupplierService
  ) { }

  ngOnInit(): void {
    const _this = this;
    this.formAttribute = this.data;

    this._supplierService.suppliers$.pipe(takeUntil(this._unsubscribeAll))
      .subscribe((suppliers: Suppliers[]) => {
        this.suppliers = suppliers;
        this._changeDetectorRef.markForCheck()
      });

    if (this.data.formType == 'edit') {
      if (this._service.products$) {
        this._service.product$.subscribe(function (data: Product) {
          _this.Id = data.id;
          _this.formApp.setValue({
            productName: data.productName,
            productSku: data.productSku,
            productBarcode: data.productBarcode,
            productDescription: data.productDescription,
            priceDefault: data.priceDefault,
            buyPricePerUnit: data.buyPricePerUnit,
            supplierId: data.supplierId,
            thumbnail: data.thumbnail
          });
          const thumbnailPreview = document.getElementById("thumbnailPreview") as HTMLImageElement;
          if (data.thumbnailPath !== null) {
            try {

              thumbnailPreview.src = data.thumbnailPath
            } catch (error) {

            }
          } else {
            thumbnailPreview.src = "https://via.placeholder.com/250x150"

          }


        })
      }
    }

  }

  onChangeThumbnail(e) {
    const thumbnailPreview = document.getElementById("thumbnailPreview") as HTMLImageElement;
    const file = e.target.files[0];
    if (file) {
      thumbnailPreview.src = URL.createObjectURL(file);
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
    const formData = new FormData(<HTMLFormElement>document.getElementById('formApp'));
    formData.append('supplierId', form.supplierId);


    if (this.data.formType == 'add') {
      this._service.createProduct(formData).subscribe(function (data) {
        if (data) {
          _this.dialogRef.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Product has created',
            icon: 'success'
          })
          _this._service.getProducts().subscribe();
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
          _this._service.getProducts().subscribe();
        }
      });
    }
  }

}
