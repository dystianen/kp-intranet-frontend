import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AttributeModel } from 'app/model/attribute.model';
import { Observable, of } from 'rxjs';
import { AttributeService } from './attribute.service';

@Injectable({
  providedIn: 'root'
})
export class AttributeResolver implements Resolve<AttributeModel[]> {
  constructor(private _service: AttributeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AttributeModel[]> {
    return this._service.getAttributes();
  }
}
