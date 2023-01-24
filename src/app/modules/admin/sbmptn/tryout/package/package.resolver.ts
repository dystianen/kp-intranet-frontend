import { Injectable } from '@angular/core';
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PackageService } from './package.service';

@Injectable({
    providedIn: 'root',
})
export class PackageResolver implements Resolve<any> {
    constructor(private _packageService: PackageService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this._packageService.getPackages();
    }
}
