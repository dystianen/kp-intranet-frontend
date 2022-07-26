import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { ProductStockComponent } from '../product-stock/product-stock.component';
import { ProductType, ProductTypeFactory } from '../product-type-factory';
import { ProductService } from '../product.service';
import { Product } from '../product.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  products$: Observable<Product[]>
  isLoading = false
  title: string = "Products"
  component$: Subject<boolean> = new Subject();
  productType: ProductType;

  constructor(private _service: ProductService, public dialog: MatDialog,private router:Router) {

  }

  ngOnInit(): void {

    const productTypeFactory = new ProductTypeFactory(this.router.url);
    this.products$ = this._service.products$;
    this.productType = productTypeFactory.getType();
  }

  /**
 * open edit dialog form
 * @param id 
 */
  editDialog(id: number) {
    const _this = this;
    const getSupplier = this._service.getProduct(id);
    getSupplier.subscribe(function (data) {
      const dialogRef = _this.dialog.open(FormComponent, {
        data: {
          formTitle: 'Edit Product',
          formType: 'edit'
        },
        autoFocus: false
      });
    });
  }

  /**
  * Open add dialog form
  */
  addDialog() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        formTitle: 'Add New Product',
        formType: 'add'
      },
      autoFocus: false
    });
  }

  addStockDialog(productId: number) {
    this.dialog.open(ProductStockComponent, {
      data: {
        formTitle: 'Add Stock',
        formType: 'add_stock',
        productId
      },
      autoFocus: false
    });
  }

  removeStockDialog(productId: number) {
    this.dialog.open(ProductStockComponent, {
      data: {
        formTitle: 'Remove Stock',
        formType: 'remove_stock',
        productId
      },
      autoFocus: false
    });
  }

  ngOnDestroy() {
    this.component$.next(true);
    this.component$.complete();
  }

}
