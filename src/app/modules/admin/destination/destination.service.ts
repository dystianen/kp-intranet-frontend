import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from 'api/API';
import { DestinationModel } from 'app/model/destination.model';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {


  private _destinations: BehaviorSubject<DestinationModel[] | null> = new BehaviorSubject(null);
  private _destination: BehaviorSubject<DestinationModel | null> = new BehaviorSubject(null);
  constructor(private httpClient: HttpClient) { }

  get destinations$() {
    return this._destinations.asObservable();
  }

  get destination$() {
    return this._destination.asObservable();
  }

  /**
   * get destinations
   * @returns 
   */
  getDestinations(): Observable<DestinationModel[]> {
    return this.httpClient.get<DestinationModel[]>(`${environment.apiUrl}${API.GET_DESTINATION_URL}`).pipe(map((destinations: any) => {
      if (destinations.statusCode == 200) {
        this._destinations.next(destinations.data);
        return destinations.data;
      }
      return [];
    }))
  }

  /**
  * get destinations
  * @param id 
  * @returns 
  */
  getDestination(id): Observable<any> {
    return this.httpClient.get<DestinationModel>(`${environment.apiUrl}${API.GET_DESTINATION_URL}/${id}`).pipe(map((destination: any) => {
      if (destination.statusCode == 200) {
        this._destination.next(destination.data);
        return destination.data;
      }
      return [];
    }));
  }

  /**
   * Create Product
   * @returns 
   */
  createDestination(dataDestination: any): Observable<any> {
    return this.destinations$.pipe(
      take(1),
      switchMap(destinations => this.httpClient.post<DestinationModel>(`${environment.apiUrl}${API.GET_DESTINATION_URL}`, dataDestination)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
        .pipe(
          map((dataDestination) => {
            return dataDestination;
          })
        ))
    );
  }

  /**
   * update supplier
   * @param id 
   * @param dataDestination 
   * @returns 
   */
  updateDestination(id: number, dataDestination: any): Observable<DestinationModel> {
    return this.destinations$.pipe(
      take(1),
      switchMap(destinations => this.httpClient.patch<DestinationModel>(`${environment.apiUrl}${API.GET_DESTINATION_URL}/${id}`, dataDestination)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
      )
    )
  }

}
