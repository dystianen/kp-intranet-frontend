import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Menu } from './menu.types';
import { arrayToTree } from 'performant-array-to-tree';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _menus: BehaviorSubject<Menu[] | null> = new BehaviorSubject(null);
  private _menusTree: BehaviorSubject<Menu[] | null> = new BehaviorSubject(null);
  private _menu: BehaviorSubject<Menu | null> = new BehaviorSubject(null);
  constructor(private _httpClient: HttpClient) { }

  get menus$() {
    return this._menus.asObservable();
  }

  get menusTree$() {
    return this._menusTree.asObservable();
  }

  get menu$() {
    return this._menu.asObservable();
  }

  /**
   * get menus
   * @returns 
   */
  getMenus(): Observable<Menu[]> {
    return this._httpClient.get<Menu[]>(`${environment.apiUrl}/admin/menu`).pipe(map((menus: any) => {
      if (menus.statusCode == 200) {
        this._menus.next(menus.data);
        const menuTree = menus.data.map(function (item) {
          item.name = item.menuName;
          return item;
        })
        this._menusTree.next(arrayToTree(menuTree, {
          id: 'id', parentId: 'parentId', childrenField: 'children', dataField: null
        }) as any);
        return menus.data;
      }
      return [];
    }))
  }

  /**
  * get menus
  * @param id 
  * @returns 
  */
  getMenu(id): Observable<any> {
    return this._httpClient.get<Menu>(`${environment.apiUrl}/admin/menu/${id}`).pipe(map((menu: any) => {
      if (menu.statusCode == 200) {
        this._menu.next(menu.data);
        return menu.data;
      }
      return [];
    }));
  }

  /**
   * Create Product
   * @returns 
   */
  createMenu(dataMenu: any): Observable<any> {
    return this.menus$.pipe(
      take(1),
      switchMap(menus => this._httpClient.post<Menu>(`${environment.apiUrl}/admin/menu`, dataMenu)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
        .pipe(
          map((newMenu) => {
            return newMenu;
          })
        ))
    );
  }

  /**
   * update menu
   * @param id 
   * @param dataMenu 
   * @returns 
   */
  updateMenu(id: number, dataMenu: any): Observable<Menu> {
    return this.menus$.pipe(
      take(1),
      switchMap(menus => this._httpClient.patch<Menu>(`${environment.apiUrl}/admin/menu/${id}`, dataMenu)
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
