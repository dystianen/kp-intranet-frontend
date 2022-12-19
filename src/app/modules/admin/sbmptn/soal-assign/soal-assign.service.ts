import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SoalAssignService {

  constructor(private _httpClient: HttpClient) { }

  private _soalAssigns: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _soalAssign: BehaviorSubject<any> = new BehaviorSubject({});

  get soalAssigns$(): Observable<any[]> {
    return this._soalAssigns.asObservable();
  }

  get soalAssign$(): Observable<any> {
    return this._soalAssign.asObservable();
  }

  getSoalAssigns(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.apiPtnUrl}/admin/soal/assign-soal`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._soalAssigns.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  getSoalAssign(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiPtnUrl}/admin/soalAssign/${id}`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._soalAssign.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  createSoalAssign(soal_id: any, dataUser: any={}): Observable<any> {
    return this.soalAssigns$.pipe(
      take(1),
      switchMap(sites => this._httpClient.post<any>(`${environment.apiPtnUrl}/admin/soal/assign-soal/`+soal_id, dataUser)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getSoalAssigns().subscribe();
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

  deleteSoalAssign(id: any, dataUser: any={}): Observable<any> {
    return this.soalAssigns$.pipe(
      take(1),
      switchMap(sites => this._httpClient.delete<any>(`${environment.apiPtnUrl}/admin/soal/assign-soal/`+id, dataUser??{})
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getSoalAssigns().subscribe();
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

  updateSoalAssign(id: number, data: any): Observable<any> {
    return this.soalAssign$.pipe(
      take(1),
      switchMap(sites => this._httpClient.patch<any>(`${environment.apiPtnUrl}/admin/soalAssign/${id}`, data)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getSoalAssigns().subscribe();
            return response.data;
          }
          return [];
        }))
      )
    )
  }


}
