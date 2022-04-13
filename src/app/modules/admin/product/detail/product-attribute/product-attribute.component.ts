import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductAttribute } from 'app/store/product/attribute/product-attribute.model';
import { ProductAttributeState } from 'app/store/product/attribute/product-attribute.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductHasAttributeService } from './product-attribute.service';
import _ from 'lodash';
import { ToastService } from 'app/shared/toast/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { FormProductAttributeComponent } from './form-product-attribute/form-product-attribute.component';
import { ProductHasAttributeModel } from 'app/model/producthasattribute.model';

@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrls: ['./product-attribute.component.scss']
})
export class ProductAttributeComponent implements OnInit {

  @Input() productId: number

  displayedColumns: string[] = ['attributeName', 'value', 'unit', 'option'];

  attributes$: Observable<ProductHasAttributeModel[]>
  productAttributes$: Observable<ProductHasAttributeModel[]>

  unit: any = [];
  value: any = [];

  constructor(private store: Store, private productHasAttributeService: ProductHasAttributeService, private toastService: ToastService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    const _this = this;
    this.productAttributes$ = this.productHasAttributeService.product_attribute$;

    // this.attributes$ = this.store.select(ProductAttributeState.getAttributeList).pipe(
    //   map(function (item: []) {
    //     if (item) {
    //       if (item.length >= 1) {
    //         return item.map(function (data: any) {
    //           data['value'] = "";
    //           data['unit'] = "";
    //           _this.productHasAttributeService.product_attribute$.subscribe(function (has_attribute: any) {
    //             if (has_attribute !== null) {
    //               const check =
    //                 has_attribute.find(
    //                   function (item: any) {
    //                     return (
    //                       item.productAttributeId == data.id
    //                     );
    //                   }
    //                 );
    //               if (check) {
    //                 data['value'] = check.value;
    //                 data['unit'] = check.unit;
    //               }
    //             }

    //           });
    //           return data;
    //         });
    //       }
    //     }
    //     return item;
    //   })
    // );

    this.productHasAttributeService
    .getProductAttribute(this.productId)
    .subscribe();

  }

  saveAttribute(id:number, attributeId: number, value: any) {
    const _this = this;
    this.productHasAttributeService
      .updateProductAttribute(id,{ value,productId:this.productId,productAttributeId:attributeId })
      .subscribe(function (data:any) {
        _this.productHasAttributeService
          .getProductAttribute(_this.productId)
          .subscribe();
        _this.toastService.message = data.message
        _this.toastService.open();
      });
  }

  deleteAttribute(id:number){
    const _this = this;
    this.productHasAttributeService
      .deleteProductAttribute(id)
      .subscribe(function (data:any) {
        _this.productHasAttributeService
          .getProductAttribute(_this.productId)
          .subscribe();
        _this.toastService.message = data.message
        _this.toastService.open();
      });
  }

  modalAdd(){
    this.dialog.open(FormProductAttributeComponent,{
      autoFocus:false,
      data:{
        productId: this.productId
      }
    })
  }

}
