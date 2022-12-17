import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private _httpClient: HttpClient) { }

  private _schedule: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _schedules: BehaviorSubject<any> = new BehaviorSubject({});

  get schedule$(): Observable<any[]> {
    return this._schedule.asObservable();
  }

  get _schedules$(): Observable<any> {
    return this._schedules.asObservable();
  }

  getSchedules(): Observable<any[]> {
    return this._httpClient.get<any[]>(`${environment.apiPtnUrl}/admin/schedule`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._schedule.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  getSchedule(id: number): Observable<any> {
    return this._httpClient.get<any>(`${environment.apiPtnUrl}/admin/schedule/${id}`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._schedules.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  createSchedule(dataUser: any): Observable<any> {
    return this.schedule$.pipe(
      take(1),
      switchMap(sites => this._httpClient.post<any>(`${environment.apiPtnUrl}/admin/schedule`, dataUser)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getSchedules().subscribe();
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

  updateSchedule(id: number, data: any): Observable<any> {
    return this._schedules$.pipe(
      take(1),
      switchMap(sites => this._httpClient.patch<any>(`${environment.apiPtnUrl}/admin/schedule/${id}`, data)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            this.getSchedules().subscribe();
            return response.data;
          }
          return [];
        }))
      )
    )
  }


}
