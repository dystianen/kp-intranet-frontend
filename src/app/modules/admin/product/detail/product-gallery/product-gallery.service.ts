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

  createGallery(dataGallery: any): Observable<any> {
    return this.galleries$.pipe(
      take(1),
      switchMap(galleries => this.httpClient.post<[]>(`${environment.apiUrl}/admin/product/product`, dataGallery)
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
