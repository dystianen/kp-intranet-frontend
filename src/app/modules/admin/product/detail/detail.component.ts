import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product.types';
import { Store } from '@ngxs/store';
import { GetProductAttribute } from 'app/store/product/attribute/product-attribute.action';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  product$: Product

  constructor(private _productService: ProductService, private store: Store) {
    const _this = this;
    this._productService.product$.subscribe(function (product: Product) {
      _this.product$ = product;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetProductAttribute()).subscribe();
  }

}
