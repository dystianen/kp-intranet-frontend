import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductStockService {

  constructor(private httpClient: HttpClient) { }

  addStock(productId: number, data: {}) {
    return this.httpClient.patch(
      `${environment.apiUrl}/admin/product/product-stock/${productId}`,
      { ...data, productId }
    );
  }
}
