import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMemberComponent } from './list-member/list-member.component';
import { MemberComponent } from './member.component';
import { MemberResolver } from './member.resolver';

const routes: Routes = [
  {
    path: '',
    component: MemberComponent,
    children: [
      {
        path: '',
        component: ListMemberComponent,
        resolve: {
          members: MemberResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
