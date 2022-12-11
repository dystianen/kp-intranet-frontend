import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BabService {

  constructor(private _httpClient: HttpClient) { }

  private _babs: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _bab: BehaviorSubject<any> = new BehaviorSubject({});

  get babs$(): Observable<any[]> {
    return this._babs.asObservable();
  }

  get bab$(): Observable<any> {
    return this._bab.asObservable();
  }

  getBabs(soalUUID:string): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.apiPtnUrl}/latihan-soal/admin/bab/`+soalUUID).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._babs.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  getBab(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiPtnUrl}/latihan-soal/admin/bab/${id}`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._bab.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  createBab(dataUser: any): Observable<any> {
    return this.babs$.pipe(
      take(1),
      switchMap(sites => this._httpClient.post<any>(`${environment.apiPtnUrl}/latihan-soal/admin/bab`, dataUser)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
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

  updateBab(id: number, data: any): Observable<any> {
    return this.bab$.pipe(
      take(1),
      switchMap(sites => this._httpClient.patch<any>(`${environment.apiPtnUrl}/latihan-soal/admin/bab/${id}`, data)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
      )
    )
  }


}
