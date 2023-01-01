import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TryoutTypeService {

  constructor(private _httpClient: HttpClient) { }

  private _types: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _type: BehaviorSubject<any> = new BehaviorSubject({});

  get types$(): Observable<any[]> {
    return this._types.asObservable();
  }

  get type$(): Observable<any> {
    return this._type.asObservable();
  }

  getTryoutTypes(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.apiPtnUrl}/admin/tryout-type`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._types.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  getTryoutType(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiPtnUrl}/admin/tryout-type/${id}`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._type.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  createTryoutType(dataUser: any): Observable<any> {
    return this.types$.pipe(
      take(1),
      switchMap(sites => this._httpClient.post<any>(`${environment.apiPtnUrl}/admin/tryout-type`, dataUser)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getTryoutTypes().subscribe();
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

  updateTryoutType(id: number, data: any): Observable<any> {
    return this.type$.pipe(
      take(1),
      switchMap(sites => this._httpClient.patch<any>(`${environment.apiPtnUrl}/admin/tryout-type/${id}`, data)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getTryoutTypes().subscribe();
            return response.data;
          }
          return [];
        }))
      )
    )
  }


}
