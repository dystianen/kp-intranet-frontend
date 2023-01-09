import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomEndMeetingComponent } from './zoom-end-meeting.component';
import { RouterModule, Routes } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';

const routes : Routes = [
  {
    path:'',
    component: ZoomEndMeetingComponent
  }
]

@NgModule({
  declarations: [
    ZoomEndMeetingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrudModule
  ]
})
export class ZoomEndMeetingModule { }
