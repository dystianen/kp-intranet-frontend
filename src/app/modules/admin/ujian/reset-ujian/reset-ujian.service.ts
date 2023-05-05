import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Otp } from 'app/model/otp';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ResetUjianService {

    constructor(private _httpClient: HttpClient) {}

    private _logs: BehaviorSubject<any | null> = new BehaviorSubject(null);

    get logs$() {
        return this._logs.asObservable();
    }

    findUjian(data): Observable<any> {
        return this._httpClient
            .post(`${environment.apiExam}/ujian/find-exam`, data)
            .pipe(
                map((role: any) => {
                    if (role.data) {
                        return role.data;
                    }
                    return [];
                })
            );
    }

    resetUjian(data): Observable<any> {
        return this._httpClient
            .post(`${environment.apiExam}/ujian/reset-exam`, data)
            .pipe(
                map((role: any) => {
                    if (role.data) {
                        return role.data;
                    }
                    return [];
                })
            );
    }
}
