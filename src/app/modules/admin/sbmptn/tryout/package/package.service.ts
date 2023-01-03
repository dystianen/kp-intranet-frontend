import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private _httpClient: HttpClient) { }

  private _tryoutPackages: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _tryoutPackage: BehaviorSubject<any> = new BehaviorSubject({});

  get tryoutPackages$(): Observable<any[]> {
    return this._tryoutPackages.asObservable();
  }

  get tryoutPackage$(): Observable<any> {
    return this._tryoutPackage.asObservable();
  }

  getPackages(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.apiPtnUrl}/admin/tryout-package`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._tryoutPackages.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  getPackage(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiPtnUrl}/admin/tryout-package/${id}`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._tryoutPackage.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  createPackage(dataUser: any): Observable<any> {
    return this.tryoutPackages$.pipe(
      take(1),
      switchMap(sites => this._httpClient.post<any>(`${environment.apiPtnUrl}/admin/tryout-package`, dataUser)
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

  updatePackage(id: number, data: any): Observable<any> {
    return this.tryoutPackage$.pipe(
      take(1),
      switchMap(sites => this._httpClient.patch<any>(`${environment.apiPtnUrl}/admin/tryout-package/${id}`, data)
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
