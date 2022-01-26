import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProductCategoryModel } from "./product-category.state";

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryServices {

    constructor(private httpClient: HttpClient) {

    }
    getCategory(): Observable<[]> {
        return this.httpClient.get<ProductCategoryModel[]>(`${environment.apiUrl}/admin/product-category`).pipe(map((response: any) => {
            if (response.statusCode == 200) {
                return response.data;
            }
            return []
        }))
    }
}