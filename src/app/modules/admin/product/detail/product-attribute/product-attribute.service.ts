import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductHasAttributeModel } from 'app/model/producthasattribute.model';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProductHasAttributeService {
    private _product_attribute: BehaviorSubject<ProductHasAttributeModel[]> = new BehaviorSubject(
        null
    );

    constructor(private httpClient: HttpClient) { }
    get product_attribute$() {
        return this._product_attribute.asObservable();
    }

    /**
     * get product_attribute by product id
     * @param id
     * @returns
     */
    getProductAttribute(productId: number): Observable<ProductHasAttributeModel[]> {
        this._product_attribute.next([]);
        return this.httpClient
            .get<ProductHasAttributeModel[]>(
                `${environment.apiUrl}/admin/product/product-has-attribute/${productId}`
            )
            .pipe(
                map((product_attribute: any) => {
                    if (product_attribute.statusCode == 200) {
                        this._product_attribute.next(product_attribute.data);
                        return product_attribute.data;
                    }
                    return [];
                })
            );
    }

    /**
     * add product_attribute
     * @param productId
     * @param siteId
     */
    addProductAttribute(data: {}) {
        return this.httpClient.post(
            `${environment.apiUrl}/admin/product/product-has-attribute`,
            data
        );
    }

    /**
     * Update attribute
     * @param id 
     * @param data 
     * @returns 
     */
    updateProductAttribute(id: number, data: {}) {
        return this.httpClient.patch(
            `${environment.apiUrl}/admin/product/product-has-attribute/${id}`,
            data
        );
    }

    /**
     * Delete attribute
     * @param id 
     * @returns 
     */

    deleteProductAttribute(id: number) {
        return this.httpClient.delete(
            `${environment.apiUrl}/admin/product/product-has-attribute/${id}`
        );
    }

}
