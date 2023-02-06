import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TryoutModuleService {

  constructor(private _httpClient: HttpClient) { }

  private _modules: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _module: BehaviorSubject<any> = new BehaviorSubject({});

  get modules$(): Observable<any[]> {
    return this._modules.asObservable();
  }

  get module$(): Observable<any> {
    return this._module.asObservable();
  }

  getTryoutModules(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.apiPtnUrl}/admin/tryout-module`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._modules.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  getTryoutModule(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiPtnUrl}/admin/tryout-module/${id}`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._module.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  createTryoutModule(dataUser: any): Observable<any> {
    return this.modules$.pipe(
      take(1),
      switchMap(sites => this._httpClient.post<any>(`${environment.apiPtnUrl}/admin/tryout-module`, dataUser)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getTryoutModules().subscribe();
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

  updateTryoutModule(id: number, data: any): Observable<any> {
    return this.module$.pipe(
      take(1),
      switchMap(sites => this._httpClient.patch<any>(`${environment.apiPtnUrl}/admin/tryout-module/${id}`, data)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getTryoutModules().subscribe();
            return response.data;
          }
          return [];
        }))
      )
    )
  }


}