import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { productRoutes } from './product.routing';
import { CrudModule } from 'app/shared/crud/crud.module';
import { QRCodeModule } from 'angularx-qrcode';
import { DetailComponent } from './detail/detail.component';




const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  declarations: [
    ProductComponent,
    ListComponent,
    FormComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    CrudModule,
    QRCodeModule
  ]
})
export class ProductModule { }
