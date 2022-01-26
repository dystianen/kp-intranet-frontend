import { Injectable } from "@angular/core";
import { Action, Selector, StateContext, State } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { GetProductAttribute } from "./product-attribute.action";
import { ProductAttribute } from "./product-attribute.model";
import { ProductAttributeServices } from "./product-attribute.service";


export class ProductAttributeModel {
    attributes: ProductAttribute[] = [];
}

@State<string[]>({
    name:'product_attribute',
    defaults:[]
})

@Injectable()
export class ProductAttributeState {

    constructor(private productAttributeService: ProductAttributeServices) { }

    @Selector()
    static getAttributeList(state: ProductAttributeModel) {
        return state.attributes;
    }

    @Action(GetProductAttribute)
    getProductAttribute({ getState, setState }: StateContext<ProductAttributeModel>) {
        return this.productAttributeService.getAttribute()
            .pipe(
                tap((result) => {
                    const state = getState();
                    setState({
                        ...state,
                        attributes: result
                    })
                }),
            )
    }

}