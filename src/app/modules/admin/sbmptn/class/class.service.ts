import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private _httpClient: HttpClient) { }

  private _class: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _clas: BehaviorSubject<any> = new BehaviorSubject({});

  get class$(): Observable<any[]> {
    return this._class.asObservable();
  }

  get clas$(): Observable<any> {
    return this._clas.asObservable();
  }

  getClasses(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.apiPtnUrl}/admin/class`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._class.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  getClass(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiPtnUrl}/admin/class/${id}`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._clas.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  createClass(dataUser: any): Observable<any> {
    return this.class$.pipe(
      take(1),
      switchMap(sites => this._httpClient.post<any>(`${environment.apiPtnUrl}/admin/class`, dataUser)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getClasses().subscribe();
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

  updateClass(id: number, data: any): Observable<any> {
    return this.clas$.pipe(
      take(1),
      switchMap(sites => this._httpClient.patch<any>(`${environment.apiPtnUrl}/admin/class/${id}`, data)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getClasses().subscribe();
            return response.data;
          }
          return [];
        }))
      )
    )
  }


}
