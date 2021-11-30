import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Site } from './site.types';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private _sites: BehaviorSubject<Site[] | null> = new BehaviorSubject(null);
  private _site: BehaviorSubject<Site | null> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }

  get sites$() {
    return this._sites.asObservable();
  }

  get site$() {
    return this._site.asObservable();
  }

  /**
   * get sites
   * @returns 
   */
  getSites(): Observable<Site[]> {
    return this._httpClient.get<Site[]>(`${environment.apiUrl}/admin/site`).pipe(map((sites: any) => {
      if (sites.statusCode == 200) {
        this._sites.next(sites.data);
        return sites.data;
      }
      return [];
    }))
  }

   /**
   * get sites
   * @param id 
   * @returns 
   */
    getSite(id): Observable<any> {
      return this._httpClient.get<Site>(`${environment.apiUrl}/admin/site/${id}`).pipe(map((site: any) => {
        if (site.statusCode == 200) {
          this._site.next(site.data);
          return site.data;
        }
        return [];
      }));
    }
  
    /**
     * Create Product
     * @returns 
     */
    createSite(dataSite: any): Observable<any> {
      return this.sites$.pipe(
        take(1),
        switchMap(sites => this._httpClient.post<Site>(`${environment.apiUrl}/admin/site`, dataSite)
          .pipe(map((response: any) => {
            if (response.statusCode == 200) {
              return response.data;
            }
            return [];
          }))
          .pipe(
            map((newSite) => {
              // Update the sites with the new product
              // this._sites.next([newSite.data, ...sites]);
              // Return the new product
              return newSite;
            })
          ))
      );
    }
  
    /**
     * update supplier
     * @param id 
     * @param dataSite 
     * @returns 
     */
    updateSite(id: number, dataSite: any): Observable<Site> {
      return this.sites$.pipe(
        take(1),
        switchMap(sites => this._httpClient.patch<Site>(`${environment.apiUrl}/admin/site/${id}`, dataSite)
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
