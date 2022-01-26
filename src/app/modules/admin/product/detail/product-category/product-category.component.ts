import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductCategory } from 'app/store/product/category/product-category.model';
import { ProductCategoryState } from 'app/store/product/category/product-category.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  displayedColumns: string[] = ['categoryName', 'option'];

  categories$: Observable<ProductCategory[]>

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.categories$ = this.store.select(ProductCategoryState.getCategoryList);
  }

}
