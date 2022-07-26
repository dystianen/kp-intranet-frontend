import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface ProductType {
    type: string;
    title: string;
}
export class Bundling implements ProductType {

    public type = "bundling";
    public title = "Product Bundling";

}

export class Satuan implements ProductType {

    public type = "satuan";
    public title = "Product Satuan";

}

@Injectable({
    providedIn: 'root'
})
export class ProductTypeFactory {

    private routerUrl;

    constructor(routerUrl) {
        this.routerUrl = routerUrl;
    }

    getType(): ProductType {
        if (this.routerUrl == '/product-bundling') {
            return new Bundling();
        } else {
            return new Satuan();
        }
    }
}