export interface OrderItemModel{
    id:number;
    order_id?:number;
    product_id?:number;
    detail?:string;
    item_price?:number;
    qty?:number;
    total_price?:number;
}
