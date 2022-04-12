import { SupplierModel } from "./supplier.model";

export interface ProductModel {
    id?: number;
    name?: string
    sku?: string
    barcode?: string
    description?: string
    priceDefault?: string
    buyPricePerUnit?: string
    supplierId?: number
    thumbnail?: string
    thumbnailPath?: string
    supplier?: SupplierModel
}