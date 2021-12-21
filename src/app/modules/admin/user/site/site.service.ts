import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private _userHasSites: BehaviorSubject<[]> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }

  get userHasSites$(): Observable<[]> {
    return this._userHasSites.asObservable();
  }

  updateSite(adminId: number, siteId: number, type: string = "add"): Observable<[]> {
    return this.userHasSites$.pipe(
      take(1),
      switchMap(sites => this._httpClient.put<[]>(`${environment.apiUrl}/admin/user/add-site/${adminId}/${siteId}/${type}`, {})
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
      )
    )
  }

  getSiteByUser(adminId: number): Observable<[]> {
    return this._httpClient.get<[]>(`${environment.apiUrl}/admin/user/site/${adminId}`).pipe(map((sites: any) => {
      if (sites.statusCode == 200) {
        this._userHasSites.next(sites.data);
        return sites.data;
      }
      return [];
    }))
  }
}
