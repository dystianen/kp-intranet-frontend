import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CategoryService } from './category.service';
import { Category } from './category.types';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve<Category[]> {
  constructor(private _categoryService: CategoryService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
    return this._categoryService.getCategories();
  }
}
