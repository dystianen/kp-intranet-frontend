import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private _httpClient: HttpClient) { }

  private _setting: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _clas: BehaviorSubject<any> = new BehaviorSubject({});

  get setting$(): Observable<any[]> {
    return this._setting.asObservable();
  }

  get clas$(): Observable<any> {
    return this._clas.asObservable();
  }

  getSettings(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.apiPtnUrl}/admin/setting`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._setting.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  getSetting(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiPtnUrl}/admin/setting/${id}`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._clas.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  createSetting(dataUser: any): Observable<any> {
    return this.setting$.pipe(
      take(1),
      switchMap(sites => this._httpClient.post<any>(`${environment.apiPtnUrl}/admin/setting`, dataUser)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getSettings().subscribe();
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

  updateSetting(id: number, data: any): Observable<any> {
    return this.clas$.pipe(
      take(1),
      switchMap(sites => this._httpClient.patch<any>(`${environment.apiPtnUrl}/admin/setting/${id}`, data)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getSettings().subscribe();
            return response.data;
          }
          return [];
        }))
      )
    )
  }


}
