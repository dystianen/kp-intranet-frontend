import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private _userHasRoles: BehaviorSubject<[]> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }

  get userHasRoles$(): Observable<[]> {
    return this._userHasRoles.asObservable();
  }

  updateRole(adminId: number, roleId: number): Observable<[]> {
    return this.userHasRoles$.pipe(
      take(1),
      switchMap(sites => this._httpClient.put<[]>(`${environment.apiUrl}/admin/user/add-role/${adminId}/${roleId}`, {})
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
      )
    )
  }

  getRoleByUser(adminId: number): Observable<[]> {
    return this._httpClient.get<[]>(`${environment.apiUrl}/admin/user/role/${adminId}`).pipe(map((roles: any) => {
      if (roles.statusCode == 200) {
        this._userHasRoles.next(roles.data);
        return roles.data;
      }
      return [];
    }))
  }
}
