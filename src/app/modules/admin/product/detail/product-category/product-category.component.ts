import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductCategory } from 'app/store/product/category/product-category.model';
import { ProductCategoryState } from 'app/store/product/category/product-category.state';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductCategoryService } from './product-category.service';

@Component({
    selector: 'app-product-category',
    templateUrl: './product-category.component.html',
    styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {
    @Input() productId: number;

    displayedColumns: string[] = ['categoryName', 'option'];

    categories$: Observable<ProductCategory[]>;

    product_has_category$: [] = [];

    constructor(
        private store: Store,
        private productCategoryService: ProductCategoryService
    ) {
        const _this = this;


    }

    ngOnInit(): void {
        const _this = this;

        this.productCategoryService
            .getProductCategory(this.productId)
            .subscribe();

        this.categories$ = this.store
            .select(ProductCategoryState.getCategoryList)
            .pipe(
                map(function (item: []) {
                    if (item) {
                        if (item.length >= 1) {
                            return item.map(function (data: any) {
                                _this.productCategoryService.product_category$.subscribe(function (has_category: any) {
                                    if (has_category !== null) {
                                        const check =
                                            has_category.some(
                                                function (item: any) {
                                                    return (
                                                        item.productCategoryId == data.id
                                                    );
                                                }
                                            );
                                        if (check) {
                                            data['checked'] = true;
                                        } else {
                                            data['checked'] = false;
                                        }
                                    }

                                });
                                return data;
                            });
                        }
                    }
                    return item;
                })
            );
    }

    /**
     * User category
     * @param categoryId
     */
    useCategory(categoryId: number) {
        const _this = this;
        this.productCategoryService
            .addProductCategory(this.productId, categoryId)
            .subscribe(function (data) {
                _this.productCategoryService
                    .getProductCategory(_this.productId)
                    .subscribe();
            });
    }
}
