import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZoomVbService {

  constructor(private _httpClient: HttpClient) { }

  private _zoomVbs: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _zoomVb: BehaviorSubject<any> = new BehaviorSubject({});

  get zoomVbs$(): Observable<any[]> {
    return this._zoomVbs.asObservable();
  }

  get zoomVb$(): Observable<any> {
    return this._zoomVb.asObservable();
  }

  getZoomVbs(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.apiPtnUrl}/admin/zoom-vb`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._zoomVbs.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  getZoomVb(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiPtnUrl}/admin/zoom-vb/${id}`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._zoomVb.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  createZoomVb(dataUser: any): Observable<any> {
    return this.zoomVbs$.pipe(
      take(1),
      switchMap(sites => this._httpClient.post<any>(`${environment.apiPtnUrl}/admin/zoom-vb`, dataUser)
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

  updateZoomVb(id: number, data: any): Observable<any> {
    return this.zoomVb$.pipe(
      take(1),
      switchMap(sites => this._httpClient.patch<any>(`${environment.apiPtnUrl}/admin/zoom-vb/${id}`, data)
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
