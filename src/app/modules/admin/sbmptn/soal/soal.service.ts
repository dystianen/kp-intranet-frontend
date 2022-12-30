import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SoalService {

    constructor(private _httpClient: HttpClient) {
    }

    private _soals: BehaviorSubject<any[]> = new BehaviorSubject([]);
    private _soal: BehaviorSubject<any> = new BehaviorSubject({});
    public _jawabans: BehaviorSubject<any> = new BehaviorSubject([]);
    public jawabans: any = [];
    jawabansDeleted$: BehaviorSubject<any[]> = new BehaviorSubject([])
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

    getSoals(soalUUID: string = ""): Observable<any[]> {
        return this._httpClient.get<any[]>(`${environment.apiPtnUrl}/admin/soal`).pipe(
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
        return this._httpClient.get<any>(`${environment.apiPtnUrl}/admin/soal/detail/${id}`).pipe(
            map((response: any) => {
                if (response.statusCode == 200) {
                    this._soal.next(response.data);
                    if (response.data.jawaban) {
                        this._jawabans.next(response.data.jawaban);
                    }
                    return response.data;
                }
                return [];
            })
        )
    }

    createSoal(dataUser: any): Observable<any> {
        return this.soals$.pipe(
            take(1),
            switchMap(sites => this._httpClient.post<any>(`${environment.apiPtnUrl}/admin/soal`, dataUser)
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
            switchMap(sites => this._httpClient.patch<any>(`${environment.apiPtnUrl}/admin/soal/${id}`, data)
                .pipe(map((response: any) => {
                    if (response.statusCode === 200) {
                        return response.data;
                    }
                    return [];
                }))
            )
        );
    }

    createBulkSoal(data: any): Observable<any> {
        return this.soal$.pipe(
            take(1),
            switchMap(sites => this._httpClient.post<any>(`${environment.apiPtnUrl}/admin/soal/bulk-upload`, data)
                .pipe(map((response: any) => {
                    if (response.statusCode === 200) {
                        return response.data;
                    }
                    return [];
                }))
            )
        );
    }
}
