import { OrderItemModel } from "./order-item.model";

export interface OrderModel{
    id:number;
    userId?:number;
    orderStatusId?:number;
    siteId?:number;
    amount?:number;
    orderNumber?:string;
    note?:string;
    order_items?: OrderItemModel[]
}
