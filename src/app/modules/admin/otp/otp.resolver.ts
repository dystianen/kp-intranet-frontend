import { Injectable } from '@angular/core';
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OtpService } from './otp.service';

@Injectable({
    providedIn: 'root',
})
export class OtpResolver implements Resolve<any> {
    constructor(private _otpService: OtpService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this._otpService.getOtp();
    }
}
