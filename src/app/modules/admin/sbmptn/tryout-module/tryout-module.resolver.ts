import { Injectable } from '@angular/core';
import {
    Router,
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TryoutModuleService } from './tryout-module.service';

@Injectable({
    providedIn: 'root',
})
export class TryoutModuleResolver implements Resolve<any[]> {
    constructor(private _tryoutService: TryoutModuleService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this._tryoutService.getTryoutModules();
    }
}
