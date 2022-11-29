import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private _sites: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    get sites$(): Observable<any> {
        return this._sites.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<any> {
        return this._httpClient.get(`${environment.apiUrl}/user/auth/profile`).pipe(
            tap((user) => {
                if (user.statusCode == 200) {
                    this._user.next(user.data);
                }
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }

    /**
     * 
     * @returns get sites based user
     */
    sites(): Observable<any> {
        return this._httpClient.get(`${environment.apiUrl}/admin/common/sites`).pipe(
            tap((sites) => {
                if (sites.statusCode == 200) {
                    const data = sites.data.map(function (item: any) {
                        return item.site ?? {};
                    })
                    this._sites.next(data);
                }
            })
        );
    }
}
