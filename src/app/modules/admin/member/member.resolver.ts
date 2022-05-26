import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { MemberModel } from 'app/model/member.model';
import { Observable, of } from 'rxjs';
import { MemberService } from './member.service';

@Injectable({
  providedIn: 'root'
})
export class MemberResolver implements Resolve<MemberModel[]> {

  constructor(private memberService: MemberService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MemberModel[]> {
    return this.memberService.getMembers();
  }

}
