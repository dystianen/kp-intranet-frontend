import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductAttribute } from 'app/store/product/attribute/product-attribute.model';
import { ProductAttributeState } from 'app/store/product/attribute/product-attribute.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrls: ['./product-attribute.component.scss']
})
export class ProductAttributeComponent implements OnInit {

  displayedColumns: string[] = ['attributeName','value', 'option'];

  attributes$: Observable<ProductAttribute[]>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.attributes$ = this.store.select(ProductAttributeState.getAttributeList);
  }

}
