import { NgxsModule } from '@ngxs/store';
import { ProductAttributeState } from './product/attribute/product-attribute.state';
import { ProductCategoryState } from './product/category/product-category.state';


export const StoreModule = NgxsModule.forRoot([
    ProductCategoryState,
    ProductAttributeState
])