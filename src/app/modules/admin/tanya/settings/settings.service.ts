import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor(private _httpClient: HttpClient) {
    }

    private _settings: BehaviorSubject<any[]> = new BehaviorSubject([]);

    get settings$(): Observable<any[]> {
        return this._settings.asObservable();
    }

    getSettings(): Observable<any[]> {
        return this._httpClient.get<any[]>(`${environment.apiUrl}/admin/tanya/settings`).pipe(
            map((response: any) => {
                if (response.statusCode === 200) {
                    this._settings.next(response.data);
                    return response.data;
                }
                return [];
            })
        );
    }
}
