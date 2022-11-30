import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Role } from './role.types';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private _roles: BehaviorSubject<Role[] | null> = new BehaviorSubject(null);
  private _role: BehaviorSubject<Role | null> = new BehaviorSubject(null);
  private _menus: BehaviorSubject<[] | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) { }

  get roles$() {
    return this._roles.asObservable();
  }

  get role$() {
    return this._role.asObservable();
  }

  get menus$() {
    return this._menus.asObservable();
  }

  /**
   * get roles
   * @returns 
   */
  getRoles(): Observable<Role[]> {
    return this._httpClient.get<Role[]>(`${environment.apiUrl}/mainapp/role`).pipe(map((roles: any) => {
      if (roles.statusCode == 200) {
        this._roles.next(roles.data);
        return roles.data;
      }
      return [];
    }))
  }

  /**
  * get roles
  * @param id 
  * @returns 
  */
  getRole(id): Observable<any> {
    return this._httpClient.get<Role>(`${environment.apiUrl}/mainapp/role/${id}`).pipe(map((role: any) => {
      if (role.statusCode == 200) {
        this._role.next(role.data);
        return role.data;
      }
      return [];
    }));
  }

  /**
   * Create Product
   * @returns 
   */
  createRole(dataRole: any): Observable<any> {
    return this.roles$.pipe(
      take(1),
      switchMap(roles => this._httpClient.post<Role>(`${environment.apiUrl}/mainapp/role`, dataRole)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
        .pipe(
          map((newRole) => {
            // Update the roles with the new product
            // this._roles.next([newRole.data, ...roles]);
            // Return the new product
            return newRole;
          })
        ))
    );
  }

  /**
   * update supplier
   * @param id 
   * @param dataRole 
   * @returns 
   */
  updateRole(id: number, dataRole: any): Observable<Role> {
    return this.roles$.pipe(
      take(1),
      switchMap(roles => this._httpClient.patch<Role>(`${environment.apiUrl}/mainapp/role/${id}`, dataRole)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
      )
    )
  }

  /**
   * add menu
   * @param roleId 
   * @param menuId 
   * @param type 
   * @returns 
   */
  addMenu(roleId: number, menuId: number, type: string) {
    return this._httpClient.put(`${environment.apiUrl}/mainapp/role/add-menu/${roleId}/${menuId}/${type}`, {})
      .pipe(map((response: any) => {
        if (response.statusCode == 200) {
          return response;
        }
        return [];
      }))
  }

  getMenu(roleId): Observable<any> {
    return this._httpClient.get<Role>(`${environment.apiUrl}/mainapp/role/menu/${roleId}`).pipe(map((menu: any) => {
      if (menu.statusCode == 200) {
        this._menus.next(menu.data);
        return menu.data;
      }
      return [];
    }));
  }

}
