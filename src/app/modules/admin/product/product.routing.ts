import { Route } from '@angular/router';
import { SupplierResolver } from '../supplier/supplier.resolver';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { ProductTypeResolver } from './product-type.resolver';
import { ProductVariantResolver } from './product-variant.resolver';
import { ProductComponent } from './product.component';
import { ProductResolver } from './product.resolver';
import { ProductBySkuResolver } from './productBySku.resolver';

export const productRoutes: Route[] = [
    {
        path: '',
        component: ProductComponent,
        children: [
            {
                path: '',
                component: ListComponent,
                resolve: {
                    products: ProductResolver,
                    suppliers: SupplierResolver,
                    productTypes: ProductTypeResolver,
                    productVariants: ProductVariantResolver
                }
            },
            {
                path: ':sku',
                component: DetailComponent,
                resolve: {
                    product: ProductBySkuResolver
                }
            }
        ],
    }
];