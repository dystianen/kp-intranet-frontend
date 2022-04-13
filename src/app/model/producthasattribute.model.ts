import { AttributeModel } from "./attribute.model";

export interface ProductHasAttributeModel {
    id: number;
    productId: number;
    productAttributeId: number;
    value?: string;
    product_attribute?: AttributeModel[]
}