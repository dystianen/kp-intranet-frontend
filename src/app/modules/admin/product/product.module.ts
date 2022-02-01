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
import { PricingComponent } from './detail/pricing/pricing.component';
import { ProductCategoryComponent } from './detail/product-category/product-category.component';
import { ProductAttributeComponent } from './detail/product-attribute/product-attribute.component';
import { PricingFormComponent } from './detail/pricing/pricing-form/pricing-form.component';
import { ProductStockComponent } from './product-stock/product-stock.component';




const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};

@NgModule({
  declarations: [
    ProductComponent,
    ListComponent,
    FormComponent,
    DetailComponent,
    PricingComponent,
    ProductCategoryComponent,
    ProductAttributeComponent,
    PricingFormComponent,
    ProductStockComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    CrudModule,
    QRCodeModule
  ]
})
export class ProductModule { }
