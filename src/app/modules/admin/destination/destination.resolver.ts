import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { DestinationModel } from 'app/model/destination.model';
import { Observable, of } from 'rxjs';
import { DestinationService } from './destination.service';

@Injectable({
  providedIn: 'root'
})
export class DestinationResolver implements Resolve<DestinationModel[]> {
  constructor(private destinationService: DestinationService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DestinationModel[]> {
    return this.destinationService.getDestinations();
  }
}
