import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberModel } from 'app/model/member.model';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient: HttpClient) { 

  }

  private _members: BehaviorSubject<MemberModel[] | null> = new BehaviorSubject(null);
  get members$() {
    return this._members.asObservable();
  }


  /**
   * get members
   * @returns 
   */
   getMembers(): Observable<MemberModel[]> {
    return this.httpClient.get<MemberModel[]>(`${environment.apiUrl}/admin/member`).pipe(map((members: any) => {
      if (members.statusCode == 200) {
        this._members.next(members.data);
        return members.data;
      }
      return [];
    }))
  }
}
