import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SoalCategoryService {

  constructor(private _httpClient: HttpClient) { }

  private _soal_categorys: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _soal_category: BehaviorSubject<any> = new BehaviorSubject({});

  get soal_categorys$(): Observable<any[]> {
    return this._soal_categorys.asObservable();
  }

  get soal_category$(): Observable<any> {
    return this._soal_category.asObservable();
  }

  getSoalCategorys(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.apiPtnUrl}/admin/soal-category`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._soal_categorys.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  getSoalCategory(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiPtnUrl}/admin/soal-category/${id}`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._soal_category.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  createSoalCategory(dataUser: any): Observable<any> {
    return this.soal_categorys$.pipe(
      take(1),
      switchMap(sites => this._httpClient.post<any>(`${environment.apiPtnUrl}/admin/soal-category`, dataUser)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getSoalCategorys().subscribe();
            return response.data;
          }
          return [];
        }))
        .pipe(
          map((newUser) => {
            return newUser;
          })
        ))
    );
  }

  updateSoalCategory(id: number, data: any): Observable<any> {
    return this.soal_category$.pipe(
      take(1),
      switchMap(sites => this._httpClient.patch<any>(`${environment.apiPtnUrl}/admin/soal-category/${id}`, data)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getSoalCategorys().subscribe();
            return response.data;
          }
          return [];
        }))
      )
    )
  }


}
