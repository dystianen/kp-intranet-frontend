import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BullWorkerComponent } from './bull-worker.component';
import { Route, RouterModule } from '@angular/router';


const routes: Route[] = [
  {
    path: '',
    component: BullWorkerComponent
  }
]

@NgModule({
  declarations: [
    BullWorkerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BullWorkerModule { }
