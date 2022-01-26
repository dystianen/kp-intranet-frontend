import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { GetProductCategory } from "./product-category.action";
import { ProductCategory } from "./product-category.model";
import { ProductCategoryServices } from "./product-category.service";


export class ProductCategoryModel {
    categories: ProductCategory[] = [];
}

@State<string[]>({
    name: 'product_category',
    defaults: []
})
@Injectable()
export class ProductCategoryState {

    constructor(private productCategoryService: ProductCategoryServices) { }

    @Selector()
    static getCategoryList(state: ProductCategoryModel) {
        return state.categories;
    }

    @Action(GetProductCategory)
    getProductCategory({ getState, setState }: StateContext<ProductCategoryModel>) {
        return this.productCategoryService.getCategory()
            .pipe(
                tap((result) => {
                    const state = getState();
                    setState({
                        ...state,
                        categories: result
                    })
                }),
            )
    }

}