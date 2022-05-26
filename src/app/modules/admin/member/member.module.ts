import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { ListMemberComponent } from './list-member/list-member.component';
import { DetailMemberComponent } from './detail-member/detail-member.component';
import { CrudModule } from 'app/shared/crud/crud.module';


@NgModule({
  declarations: [
    MemberComponent,
    ListMemberComponent,
    DetailMemberComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    CrudModule
  ]
})
export class MemberModule { }
