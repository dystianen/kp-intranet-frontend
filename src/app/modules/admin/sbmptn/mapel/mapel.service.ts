import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapelService {

  constructor(private _httpClient: HttpClient) { }

  private _mapels: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _mapel: BehaviorSubject<any> = new BehaviorSubject({});

  get mapels$(): Observable<any[]> {
    return this._mapels.asObservable();
  }

  get mapel$(): Observable<any> {
    return this._mapel.asObservable();
  }

  getMapels(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.apiPtnUrl}/admin/mapel`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._mapels.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  getMapel(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiPtnUrl}/admin/mapel/${id}`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._mapel.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  createMapel(dataUser: any): Observable<any> {
    return this.mapels$.pipe(
      take(1),
      switchMap(sites => this._httpClient.post<any>(`${environment.apiPtnUrl}/admin/mapel`, dataUser)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getMapels().subscribe();
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

  updateMapel(id: number, data: any): Observable<any> {
    return this.mapel$.pipe(
      take(1),
      switchMap(sites => this._httpClient.patch<any>(`${environment.apiPtnUrl}/admin/mapel/${id}`, data)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getMapels().subscribe();
            return response.data;
          }
          return [];
        }))
      )
    )
  }


}
