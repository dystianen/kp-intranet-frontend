import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomVbComponent } from './zoom-vb.component';
import { ListZoomVbComponent } from './list-zoom-vb/list-zoom-vb.component';
import { FormZoomVbComponent } from './form-zoom-vb/form-zoom-vb.component';
import { RouterModule, Routes } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { ComponentsModule } from 'app/components/components.module';
import { ZoomVbResolver } from './zoom-vb.resolver';
import { SharedFormModule } from 'app/shared/shared-form/shared-form.module';

const routes : Routes = [
  {
    path:'',
    component: ZoomVbComponent,
    children:[
      {
        path:'',
        component: ListZoomVbComponent,
        resolve:{
          zoomvbs: ZoomVbResolver
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    ZoomVbComponent,
    ListZoomVbComponent,
    FormZoomVbComponent
  ],
  imports: [
    CommonModule,
    CrudModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    SharedFormModule
  ]
})
export class ZoomVbModule { }
