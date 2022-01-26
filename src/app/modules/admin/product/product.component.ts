import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { GetProductAttribute } from 'app/store/product/attribute/product-attribute.action';
import { GetProductCategory } from 'app/store/product/category/product-category.action';
import { Observable } from 'rxjs';
import { FormComponent } from './form/form.component';
import { ProductService } from './product.service';
import { Product } from './product.types';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isLoading = false
  showBackButton$ = false
  title$: string = "Products"

  constructor(public dialog: MatDialog, private _productService: ProductService, private store: Store) {

  }

  ngOnInit(): void {
    this.store.dispatch(new GetProductCategory()).subscribe();
    this.store.dispatch(new GetProductAttribute()).subscribe();
  }


}
