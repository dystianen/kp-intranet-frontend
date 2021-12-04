import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AttributeService } from './attribute.service';
import { Attribute } from './attribute.types';

@Injectable({
  providedIn: 'root'
})
export class AttributeResolver implements Resolve<Attribute[]> {
  constructor(private _service: AttributeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Attribute[]> {
    return this._service.getAttributes();
  }
}
