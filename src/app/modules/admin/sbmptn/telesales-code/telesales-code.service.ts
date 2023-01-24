import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TelesalesCodeService {

  constructor(private _httpClient: HttpClient) { }

  private _telesalescodes: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _telesalescode: BehaviorSubject<any> = new BehaviorSubject({});

  get telesalescodes$(): Observable<any[]> {
    return this._telesalescodes.asObservable();
  }

  get telesalescode$(): Observable<any> {
    return this._telesalescode.asObservable();
  }

  getTelesalesCodes(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.apiPtnUrl}/payment/ptn/CouponPaymentLinkPtn`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._telesalescodes.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  getTelesalesCode(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiPtnUrl}/admin/telesalescode/detail/${id}`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._telesalescode.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  createTelesalesCode(data: any): Observable<any> {
    return this.telesalescodes$.pipe(
      take(1),
      switchMap(sites => this._httpClient.post<any>(`${environment.apiPtnUrl}/payment/ptn/insertCouponPaymentLink`, data)
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

  updateTelesalesCode(id: number, data: any): Observable<any> {
    return this.telesalescode$.pipe(
      take(1),
      switchMap(sites => this._httpClient.patch<any>(`${environment.apiPtnUrl}/admin/telesalescode/${id}`, data)
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
