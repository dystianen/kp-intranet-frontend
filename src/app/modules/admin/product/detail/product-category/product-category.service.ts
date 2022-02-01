import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProductCategoryService {
    private _product_category: BehaviorSubject<any[]> = new BehaviorSubject(
        null
    );

    constructor(private httpClient: HttpClient) {}
    get product_category$() {
        return this._product_category.asObservable();
    }

    /**
     * get product_category by product id
     * @param id
     * @returns
     */
    getProductCategory(productId: number): Observable<any[]> {
        this._product_category.next([]);
        return this.httpClient
            .get<any[]>(
                `${environment.apiUrl}/admin/product/product-has-category/${productId}`
            )
            .pipe(
                map((product_category: any) => {
                    if (product_category.statusCode == 200) {
                        this._product_category.next(product_category.data);
                        return product_category.data;
                    }
                    return [];
                })
            );
    }

    /**
     * add product_category
     * @param productId
     * @param siteId
     */
    addProductCategory(productId: number, categoryId: number) {
        return this.httpClient.patch(
            `${environment.apiUrl}/admin/product/product-has-category/${productId}/${categoryId}`,
            {}
        );
    }

}
