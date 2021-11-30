import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SiteService } from './site.service';
import { Site } from './site.types';

@Injectable({
  providedIn: 'root'
})
export class SiteResolver implements Resolve<Site[]> {
  constructor(private _siteServices: SiteService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Site[]> {
    return this._siteServices.getSites();
  }
}
