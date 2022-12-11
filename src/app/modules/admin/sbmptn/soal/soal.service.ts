import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SoalService {

  constructor(private _httpClient: HttpClient) { }

  private _soals: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _soal: BehaviorSubject<any> = new BehaviorSubject({});
  public _jawabans: BehaviorSubject<any> = new BehaviorSubject([]);
  public jawabans: any = [];
  _keys: BehaviorSubject<string[]> = new BehaviorSubject(["A", "B", "C", "D", "E", "F"]);

  get soals$(): Observable<any[]> {
    return this._soals.asObservable();
  }

  get jawabans$(): Observable<any[]> {
    return this._jawabans.asObservable();
  }


  get soal$(): Observable<any> {
    return this._soal.asObservable();
  }

  getSoals(soalUUID: string): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.apiPtnUrl}/latihan-soal/admin/bab/` + soalUUID).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._soals.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  getSoal(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiPtnUrl}/latihan-soal/admin/bab/detail/${id}`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._soal.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  createSoal(dataUser: any): Observable<any> {
    return this.soals$.pipe(
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

  updateSoal(id: number, data: any): Observable<any> {
    return this.soal$.pipe(
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
