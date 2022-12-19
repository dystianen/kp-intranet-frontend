import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SoalCategoryService } from './soal-category.service';

@Injectable({
  providedIn: 'root'
})
export class SoalCategoryResolver implements Resolve<any> {

  constructor(private _soal_categoryService: SoalCategoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._soal_categoryService.getSoalCategorys();
  }
}
