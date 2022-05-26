import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteComponent } from './site.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { Route, RouterModule } from '@angular/router';
import { SiteResolver } from './site.resolver';
import { CrudModule } from 'app/shared/crud/crud.module';
import { SharedFormModule } from 'app/shared/shared-form/shared-form.module';


const siteRoutes: Route[] = [
  {
    path: '',
    component: SiteComponent,
    children: [
      {
        path: '',
        resolve: {
          sites: SiteResolver
        },
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    SiteComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(siteRoutes),
    CrudModule,
    SharedFormModule
  ]
})
export class SiteModule { }
