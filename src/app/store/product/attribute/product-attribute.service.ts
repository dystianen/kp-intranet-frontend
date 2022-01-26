import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProductAttributeModel } from "./product-attribute.state";

@Injectable({
    providedIn: 'root'
})
export class ProductAttributeServices {

    constructor(private httpClient: HttpClient) {

    }
    getAttribute(): Observable<[]> {
        return this.httpClient.get<ProductAttributeModel[]>(`${environment.apiUrl}/admin/product-attribute`).pipe(map((response: any) => {
            if (response.statusCode == 200) {
                return response.data;
            }
            return []
        }))
    }
}