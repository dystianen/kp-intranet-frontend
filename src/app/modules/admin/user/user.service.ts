import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(null);
  private _user: BehaviorSubject<User | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) { }

  get users$(): Observable<any[]> {
    return this._users.asObservable();
  }

  get user$(): Observable<any> {
    return this._user.asObservable();
  }

  getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${environment.apiUrl}/user/user`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._users.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  getUser(id: number): Observable<User> {
    return this._httpClient.get<User[]>(`${environment.apiUrl}/user/user/${id}`).pipe(
      map((response: any) => {
        if (response.statusCode == 200) {
          this._user.next(response.data);
          return response.data;
        }
        return [];
      })
    )
  }

  /**
   * create user
   * @param dataUser 
   * @returns 
   */
  createUser(dataUser: any): Observable<any> {
    return this.users$.pipe(
      take(1),
      switchMap(sites => this._httpClient.post<User>(`${environment.apiUrl}/user/user`, dataUser)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
        .pipe(
          map((newUser) => {
            return newUser;
          })
        ))
    );
  }

  /**
   * update user
   * @param id 
   * @param dataUser 
   * @returns 
   */
  updateUser(id: number, dataUser: any): Observable<User> {
    return this.users$.pipe(
      take(1),
      switchMap(sites => this._httpClient.patch<User>(`${environment.apiUrl}/user/user/${id}`, dataUser)
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
