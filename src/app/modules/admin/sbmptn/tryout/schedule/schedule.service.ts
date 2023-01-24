import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ScheduleService {
    constructor(private _httpClient: HttpClient) {}

    private _tryoutSchedules: BehaviorSubject<any[]> = new BehaviorSubject([]);
    private _tryoutSchedule: BehaviorSubject<any> = new BehaviorSubject({});

    get tryoutSchedules$(): Observable<any[]> {
        return this._tryoutSchedules.asObservable();
    }

    get tryoutSchedule$(): Observable<any> {
        return this._tryoutSchedule.asObservable();
    }

    getSchedules(): Observable<any[]> {
        return this._httpClient
            .get<any[]>(`${environment.apiPtnUrl}/admin/tryout-schedule`)
            .pipe(
                map((response: any) => {
                    if (response.statusCode == 200) {
                        this._tryoutSchedules.next(response.data);
                        return response.data;
                    }
                    return [];
                })
            );
    }

    getSchedule(id: number): Observable<any> {
        return this._httpClient
            .get<any>(`${environment.apiPtnUrl}/admin/tryout-schedule/${id}`)
            .pipe(
                map((response: any) => {
                    if (response.statusCode == 200) {
                        this._tryoutSchedule.next(response.data);
                        return response.data;
                    }
                    return [];
                })
            );
    }

    createSchedule(data: any): Observable<any> {
        console.log('abc', data);
        return this._httpClient
            .post<any>(`${environment.apiPtnUrl}/admin/tryout-schedule`, data)
            .pipe(
                map((response: any) => {
                    if (response.statusCode == 200) {
                        this.getSchedules().subscribe();
                        return response.data;
                    }
                    return [];
                })
            );
    }

    updateSchedule(id: number, data: any): Observable<any> {
        return this.tryoutSchedule$.pipe(
            take(1),
            switchMap((sites) =>
                this._httpClient
                    .patch<any>(
                        `${environment.apiPtnUrl}/admin/tryout-schedule/${id}`,
                        data
                    )
                    .pipe(
                        map((response: any) => {
                            if (response.statusCode == 200) {
                                this.getSchedules().subscribe();
                                return response.data;
                            }
                            return [];
                        })
                    )
            )
        );
    }
}
