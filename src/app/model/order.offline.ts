export interface OrderOffline {
    id: number;
    siteId: number;
    orderNumber: string;
    amount: number;
    createdBy: number;
    charge: number;
    cash: number;
    note?: any;
    createdAt: string;
    updatedAt: string;
    order_offline_item: Orderofflineitem[];
  }
  
  export interface Orderofflineitem {
    id: number;
    orderId: number;
    productId: number;
    qty: number;
    price: number;
    total_amount: number;
    detail: Detail;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Detail {
    name: string;
  }