import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Otp } from 'app/model/otp';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private _httpClient: HttpClient) { }

  private _otp: BehaviorSubject<Otp | null> = new BehaviorSubject(null);

  get otp$() {
    return this._otp.asObservable();
  }

  getOtp(): Observable<any> {
    return this._httpClient.get<Otp>(`${environment.apiOtp}/setting`).pipe(map((role: any) => {
      if (role.statusCode == 200) {
        this._otp.next(role.data);
        return role.data;
      }
      return [];
    }));
  }
data
  updateOtp(data: Otp): Observable<Otp> {
    return this.otp$.pipe(
      take(1),
      switchMap(roles => this._httpClient.patch<Otp>(`${environment.apiOtp}/setting`, data)
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
