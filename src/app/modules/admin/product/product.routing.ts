import { Route } from '@angular/router';
import { SupplierResolver } from '../supplier/supplier.resolver';
import { ListComponent } from './list/list.component';
import { ProductComponent } from './product.component';
import { ProductResolver } from './product.resolver';

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
                    suppliers: SupplierResolver
                }
            }
        ],
    }
];