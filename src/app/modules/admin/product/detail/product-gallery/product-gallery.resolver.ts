import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductGalleryService } from './product-gallery.service';

@Injectable({
  providedIn: 'root'
})
export class ProductGalleryResolver implements Resolve<boolean> {
  constructor(private productGalleryService: ProductGalleryService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true);
  }
}
