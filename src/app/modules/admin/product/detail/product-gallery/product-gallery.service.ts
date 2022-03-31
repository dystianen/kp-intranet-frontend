import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductGalleryService {

  constructor(private httpClient: HttpClient) { }

  private galleries: BehaviorSubject<[] | null> = new BehaviorSubject(null)

  get galleries$() {
    return this.galleries.asObservable();
  }

  getGalleries(productId:number): Observable<[]> {
    return this.httpClient.get(`${environment.apiUrl}/admin/product/product-gallery/${productId}`).pipe(map((galleries: any) => {
      if (galleries.statusCode == 200) {
        this.galleries.next(galleries.data);
        return galleries.data;
      }
      return [];
    }))
  }

  createGallery(dataGallery: any): Observable<any> {
    return this.galleries$.pipe(
      take(1),
      switchMap(galleries => this.httpClient.post(`${environment.apiUrl}/admin/product/product-gallery`, dataGallery)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
        .pipe(
          map((data) => {
            return data;
          })
        ))
    );
  }

  updateGallery(dataGallery: any, id:number): Observable<any> {
    return this.galleries$.pipe(
      take(1),
      switchMap(galleries => this.httpClient.patch(`${environment.apiUrl}/admin/product/product-gallery/${id}`, dataGallery)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
        .pipe(
          map((data) => {
            return data;
          })
        ))
    );
  }
}
